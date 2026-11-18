class PortalPromptBuilder {
  static _expandedDocs = { situation: true, CadPlan: true, Portal: true };
  static _expandedSecs = {};
  static _sectionBlocksCache = {};
  static _commentCountsByDoc = {};
  static _filterQuery = '';
  static _focusedDocId = null;

  static _ensureStyles() {
    if (typeof applyCss !== 'function') return;
    applyCss(`
      .pt-tree-toolbar {
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-wrap: wrap;
        gap: 8px;
      }
      .pt-tree-list {
        display: flex;
        flex-direction: column;
        gap: 8px;
        max-height: 480px;
        overflow-y: auto;
        padding-right: 4px;
      }
      .pt-tree-children {
        margin-left: 12px;
        padding-left: 12px;
        border-left: 1.5px dashed #334155;
        display: flex;
        flex-direction: column;
        gap: 6px;
        margin-top: 6px;
      }
      .pt-tree-blocks {
        margin-left: 12px;
        padding-left: 10px;
        border-left: 1.5px dotted #1e3a5f;
        display: flex;
        flex-direction: column;
        gap: 4px;
        margin-top: 4px;
        margin-bottom: 4px;
      }
      .pt-tree-action-bar {
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-wrap: wrap;
        gap: 10px;
        padding-top: 10px;
        border-top: 1px solid #1e293b;
      }
      .pt-built-drawer {
        display: flex;
        flex-direction: column;
        gap: 8px;
        background: #04070d;
        border: 1.5px solid rgba(52, 211, 153, 0.45);
        border-radius: 10px;
        padding: 12px 14px;
      }
    `, 'PortalTreeBuilderStyles');
  }

  static focusProject(docId) {
    if (!docId) return;
    this._expandedDocs[docId] = true;
    this._focusedDocId = docId;

    if (typeof PartialDocumentEngine !== 'undefined') {
      PartialDocumentEngine._notify();
    }

    const mount = document.getElementById('pt-selective-builder-mount');
    if (mount) {
      mount.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    setTimeout(() => {
      const targetRow = document.querySelector(`.pt-builder-doc-card[data-doc-id="${docId}"]`);
      if (targetRow) {
        targetRow.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        targetRow.style.boxShadow = '0 0 0 2px #00f2fe, 0 0 18px rgba(0, 242, 254, 0.35)';
        setTimeout(() => { if (targetRow.isConnected) targetRow.style.boxShadow = ''; }, 2200);
      }
    }, 80);
  }

  static _getSelectionSummary(catalog, comp) {
    let activeDocs = 0;
    let activeSecs = 0;
    let pickedBlocks = 0;

    catalog.forEach(doc => {
      let docHasActive = false;
      (doc.sections || []).forEach(sec => {
        const m = PartialDocumentEngine.getSectionMode(doc.id, sec.id, comp);
        const blkCount = Object.keys(comp.blockSelections || {})
          .filter(k => k.startsWith(`${doc.id}:${sec.id}:`) && comp.blockSelections[k] === 'include').length;
        pickedBlocks += blkCount;
        if (m !== 'off' || blkCount > 0) {
          activeSecs++;
          docHasActive = true;
        }
      });
      if (docHasActive) activeDocs++;
    });

    return { activeDocs, activeSecs, pickedBlocks };
  }

  static render(container, portalApp = null) {
    if (!container) return;
    container.innerHTML = '';
    this._ensureStyles();

    if (typeof PartialDocumentEngine === 'undefined') {
      container.innerHTML = '<div style="padding:16px;color:#f59e0b;">PartialDocumentEngine loading...</div>';
      return;
    }

    const catalog = PortalContentExtractor.getCatalog();
    const wrap = makeElement('section', {
      className: 'pt-builder-wrap',
      'data-block-id': 'portal_selective_prompt_builder'
    });

    const docsListEl = makeElement('div', { className: 'pt-tree-list' });
    const statsBadge = makeElement('span', { className: 'pt-builder-stats' });
    const drawerMount = makeElement('div', { style: { display: 'none' } });
    const builtTextarea = makeElement('textarea', {
      className: 'pt-builder-preview',
      style: { minHeight: '280px' },
      spellcheck: 'false'
    });
    const builtStatsEl = makeElement('span', { className: 'pt-builder-stats' }, '');

    const comp = PartialDocumentEngine.getActiveComposition();
    const questionInput = makeElement('input', {
      type: 'text',
      className: 'pt-search',
      style: { flex: '1 1 340px' },
      value: comp.question || '',
      placeholder: 'Optional instruction/question at top of prompt (e.g. "Summarize next steps from these parts...")',
      oninput: (e) => {
        PartialDocumentEngine.updateActiveComposition(c => { c.question = e.target.value; });
      }
    });

    const filterInput = makeElement('input', {
      type: 'text',
      className: 'pt-search',
      style: { flex: '1 1 240px' },
      value: this._filterQuery,
      placeholder: '🔍 Filter documents or chapters in tree...',
      oninput: (e) => {
        this._filterQuery = e.target.value.toLowerCase().trim();
        renderDocRows();
      }
    });

    const updateSelectionBadge = () => {
      const curComp = PartialDocumentEngine.getActiveComposition();
      const s = this._getSelectionSummary(catalog, curComp);
      const totalCmt = Object.values(this._commentCountsByDoc).reduce((a, b) => a + b, 0);
      const parts = [
        `${s.activeDocs} doc${s.activeDocs === 1 ? '' : 's'}`,
        `${s.activeSecs} section${s.activeSecs === 1 ? '' : 's'}`
      ];
      if (s.pickedBlocks > 0) parts.push(`${s.pickedBlocks} block${s.pickedBlocks === 1 ? '' : 's'}`);
      if (curComp.includeComments && totalCmt > 0) parts.push(`💬 ${totalCmt} comment${totalCmt === 1 ? '' : 's'}`);
      statsBadge.textContent = s.activeSecs === 0 && !curComp.includeComments
        ? 'Nothing selected yet'
        : `Selected: ${parts.join(' • ')}`;
    };

    const renderDocRows = () => {
      const curComp = PartialDocumentEngine.getActiveComposition();
      docsListEl.innerHTML = '';

      const filteredDocs = catalog.filter(doc => {
        if (!this._filterQuery) return true;
        const secTxt = (doc.sections || []).map(s => s.label).join(' ');
        return `${doc.title} ${doc.id} ${secTxt}`.toLowerCase().includes(this._filterQuery);
      });

      if (filteredDocs.length === 0) {
        docsListEl.appendChild(makeElement('div', {
          style: { padding: '18px', textAlign: 'center', color: '#64748b', fontFamily: 'var(--pt-mono)', fontSize: '12px' }
        }, 'No documents or chapters match your tree filter.'));
        updateSelectionBadge();
        return;
      }

      filteredDocs.forEach(doc => {
        const docMode = (curComp.docModes && curComp.docModes[doc.id]) || 'off';
        const isExpanded = Boolean(this._expandedDocs[doc.id] || this._filterQuery);
        const activeSecsCount = doc.sections.filter(s => {
          const sm = PartialDocumentEngine.getSectionMode(doc.id, s.id, curComp);
          const hasBlocks = Object.keys(curComp.blockSelections || {})
            .some(k => k.startsWith(`${doc.id}:${s.id}:`) && curComp.blockSelections[k] === 'include');
          return sm !== 'off' || hasBlocks;
        }).length;
        const cCount = this._commentCountsByDoc[doc.id] || 0;

        const row = makeElement('div', {
          className: 'pt-builder-doc-card',
          'data-doc-id': doc.id,
          style: {
            borderLeft: `4px solid ${doc.accent}`,
            backgroundColor: docMode !== 'off' ? 'rgba(0, 242, 254, 0.04)' : '#070b14'
          }
        });

        const modePill = (mode, label) => makeElement('button', {
          className: `pt-mode-pill ${docMode === mode ? 'active' : ''}`,
          onclick: () => PartialDocumentEngine.setDocMode(doc, mode)
        }, label);

        const top = makeElement('div', { className: 'pt-builder-doc-head' }, [
          makeElement('div', {
            style: { flex: 1, minWidth: 0, cursor: 'pointer' },
            onclick: () => {
              this._expandedDocs[doc.id] = !isExpanded;
              renderDocRows();
            }
          }, [
            makeElement('strong', { style: { fontSize: '12.5px', color: '#f8fafc', display: 'block' } }, `${isExpanded ? '▾' : '▸'} ${doc.icon} ${doc.title}`),
            makeElement('span', { style: { fontSize: '10.5px', color: '#94a3b8', fontFamily: 'var(--pt-mono)' } },
              `${activeSecsCount}/${doc.sections.length} section${doc.sections.length === 1 ? '' : 's'} included` + (cCount > 0 ? ` • 💬 ${cCount} active` : '')
            )
          ]),
          makeElement('div', { style: { display: 'flex', gap: '6px', alignItems: 'center', flexWrap: 'wrap' } }, [
            portalApp ? makeElement('button', {
              className: 'pt-btn',
              style: { padding: '2px 8px', fontSize: '10px', color: doc.accent, borderColor: `${doc.accent}55` },
              title: `Open ${doc.id} in-place inside Portal`,
              onclick: (e) => {
                e.stopPropagation();
                if (doc.id === 'Portal') portalApp.openInDocumentReader('spear_drawing');
                else portalApp.openProjectInPlace(doc.id);
              }
            }, '📖 Open') : null,
            makeElement('div', { className: 'pt-mode-group' }, [
              modePill('off', 'Off'),
              modePill('summary', 'Sum'),
              modePill('core', 'Core'),
              modePill('indepth', 'Full')
            ])
          ].filter(Boolean))
        ]);
        row.appendChild(top);

        if (isExpanded) {
          const secList = makeElement('div', { className: 'pt-tree-children' });
          doc.sections.forEach(sec => {
            if (this._filterQuery && !sec.label.toLowerCase().includes(this._filterQuery) && !doc.title.toLowerCase().includes(this._filterQuery)) {
              return;
            }
            const sm = PartialDocumentEngine.getSectionMode(doc.id, sec.id, curComp);
            const secKey = `${doc.id}:${sec.id}`;
            const isSecExp = Boolean(this._expandedSecs[secKey]);
            const sBtn = (m, lbl) => makeElement('button', {
              className: `pt-mode-pill pt-mode-mini ${sm === m ? 'active' : ''}`,
              onclick: () => PartialDocumentEngine.setSectionMode(doc, sec, m)
            }, lbl);

            const secRow = makeElement('div', { className: 'pt-builder-sec-row' }, [
              makeElement('span', {
                style: { fontSize: '11.5px', color: sm === 'off' ? '#94a3b8' : '#f8fafc', flex: 1, cursor: 'pointer' },
                title: 'Click to expand individual blocks in this section',
                onclick: async () => {
                  this._expandedSecs[secKey] = !isSecExp;
                  if (this._expandedSecs[secKey] && !this._sectionBlocksCache[secKey]) {
                    this._sectionBlocksCache[secKey] = await PortalContentExtractor.getSectionBlocks(doc, sec);
                  }
                  renderDocRows();
                }
              }, `${isSecExp ? '▾' : '▸'} ${sec.sensitive ? '🔒 ' : ''}${sec.label}`),
              makeElement('div', { className: 'pt-mode-group' }, [
                sBtn('off', 'Off'),
                sBtn('summary', 'Sum'),
                sBtn('core', 'Core'),
                sBtn('indepth', 'Full')
              ])
            ]);
            secList.appendChild(secRow);

            if (isSecExp) {
              const blocks = this._sectionBlocksCache[secKey] || [];
              const blkBox = makeElement('div', { className: 'pt-tree-blocks' });
              if (blocks.length === 0) {
                blkBox.appendChild(makeElement('span', { style: { fontSize: '10px', color: '#64748b', fontStyle: 'italic' } }, 'Single-block section (choose Sum / Core / Full on the right).'));
              } else {
                blocks.forEach(b => {
                  const isPicked = PartialDocumentEngine.isBlockExplicitlySelected(doc.id, sec.id, b.id, curComp);
                  blkBox.appendChild(makeElement('label', {
                    style: { display: 'flex', alignItems: 'center', gap: '6px', fontSize: '10.5px', color: isPicked ? '#00f2fe' : '#cbd5e1', cursor: 'pointer' }
                  }, [
                    makeElement('input', {
                      type: 'checkbox',
                      checked: isPicked,
                      style: { accentColor: '#00f2fe', cursor: 'pointer' },
                      onchange: () => PartialDocumentEngine.toggleBlock(doc.id, sec.id, b.id, b.title)
                    }),
                    makeElement('span', {}, `${b.sensitive ? '🔒 ' : ''}${b.title}`)
                  ]));
                });
              }
              secList.appendChild(blkBox);
            }
          });
          row.appendChild(secList);
        }

        docsListEl.appendChild(row);
      });

      updateSelectionBadge();
    };

    const st = PartialDocumentEngine.getState();
    const savedSelect = makeElement('select', {
      style: { background: '#05080f', color: '#00f2fe', border: '1px solid #1e293b', borderRadius: '6px', padding: '4px 8px', fontFamily: 'var(--pt-mono)', fontSize: '11px' },
      onchange: (e) => {
        PartialDocumentEngine.switchComposition(e.target.value);
        const nextComp = PartialDocumentEngine.getActiveComposition();
        questionInput.value = nextComp.question || '';
      }
    }, Object.values(st.compositions).map(c => makeElement('option', { value: c.id, selected: c.id === st.activeId }, `📑 ${c.name}`)));

    const commentsChk = makeElement('input', {
      type: 'checkbox',
      checked: Boolean(comp.includeComments),
      style: { accentColor: '#00f2fe', cursor: 'pointer' },
      onchange: () => PartialDocumentEngine.updateActiveComposition(c => { c.includeComments = commentsChk.checked; })
    });

    const excludeMetaChk = makeElement('input', {
      type: 'checkbox',
      checked: comp.excludeDevMeta !== false,
      style: { accentColor: '#34d399', cursor: 'pointer' },
      onchange: () => PartialDocumentEngine.updateActiveComposition(c => { c.excludeDevMeta = excludeMetaChk.checked; })
    });

    const headerBar = makeElement('div', { className: 'pt-builder-header' }, [
      makeElement('div', {}, [
        makeElement('strong', { style: { color: '#00f2fe', fontFamily: 'var(--pt-mono)', fontSize: '12.5px', display: 'block' } }, '🌳 PARTIAL DOCUMENT TREE & LLM PROMPT BUILDER'),
        makeElement('span', { style: { fontSize: '12px', color: '#94a3b8' } }, '1) Pick documents, sections, or blocks in the tree (or click nodes on the SVG ring above) • 2) Click Build Prompt when ready.')
      ]),
      makeElement('div', { style: { display: 'flex', gap: '6px', flexWrap: 'wrap', alignItems: 'center' } }, [
        savedSelect,
        makeElement('button', {
          className: 'pt-btn',
          onclick: () => {
            const name = prompt('Save current selection as a named composed page:');
            if (name) PartialDocumentEngine.saveNamedComposition(name);
          }
        }, '💾 Save As'),
        makeElement('button', { className: 'pt-btn pt-btn-amber', onclick: () => PartialDocumentEngine.applyPreset('legal', catalog) }, '⚖️ Legal'),
        makeElement('button', { className: 'pt-btn', onclick: () => PartialDocumentEngine.applyPreset('family', catalog) }, '👨‍👩‍👧 Family'),
        makeElement('button', { className: 'pt-btn pt-btn-cyan', onclick: () => PartialDocumentEngine.applyPreset('career', catalog) }, '📐 Career'),
        makeElement('button', { className: 'pt-btn pt-btn-emerald', onclick: () => PartialDocumentEngine.applyPreset('econ', catalog) }, '🤖 Econ'),
        makeElement('button', { className: 'pt-btn', onclick: () => PartialDocumentEngine.applyPreset('all_summaries', catalog) }, '🌐 All Sum'),
        makeElement('button', { className: 'pt-btn', onclick: () => PartialDocumentEngine.applyPreset('clear', catalog) }, '🧹 Clear')
      ])
    ]);

    const treeControls = makeElement('div', { className: 'pt-tree-toolbar' }, [
      filterInput,
      makeElement('div', { style: { display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' } }, [
        makeElement('button', {
          className: 'pt-btn',
          style: { fontSize: '10.5px', padding: '4px 9px' },
          onclick: () => {
            const allOpen = catalog.every(d => this._expandedDocs[d.id]);
            catalog.forEach(d => { this._expandedDocs[d.id] = !allOpen; });
            renderDocRows();
          }
        }, '⇅ Expand / Collapse All'),
        makeElement('label', { style: { display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px', color: '#cbd5e1', cursor: 'pointer' } }, [excludeMetaChk, 'Skip Dev/Luno Meta']),
        makeElement('label', { style: { display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px', color: '#cbd5e1', cursor: 'pointer' } }, [commentsChk, '💬 Include Comments'])
      ])
    ]);

    const buildAndShow = async (copyImmediately = false, triggerBtn = null) => {
      if (triggerBtn) triggerBtn.textContent = '⏳ Building...';
      const compiled = await PartialDocumentEngine.compileComposition();
      builtTextarea.value = compiled.markdown;
      builtStatsEl.textContent = `${compiled.selectedCount} section${compiled.selectedCount === 1 ? '' : 's'} • ${compiled.words.toLocaleString()} words (~${compiled.approxTokens.toLocaleString()} tokens)`;
      drawerMount.style.display = 'block';

      if (copyImmediately) {
        try {
          await navigator.clipboard.writeText(compiled.markdown);
          if (triggerBtn) {
            triggerBtn.textContent = '✓ Built & Copied!';
            setTimeout(() => { triggerBtn.textContent = '📋 Build & Copy Prompt'; }, 1800);
          }
        } catch (e) {
          if (triggerBtn) triggerBtn.textContent = '📋 Build & Copy Prompt';
        }
      } else {
        if (triggerBtn) triggerBtn.textContent = '⚡ Build & View Prompt';
        drawerMount.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    };

    const btnBuildView = makeElement('button', {
      className: 'pt-btn pt-btn-emerald',
      onclick: () => buildAndShow(false, btnBuildView)
    }, '⚡ Build & View Prompt');

    const btnBuildCopy = makeElement('button', {
      className: 'pt-btn pt-btn-cyan',
      onclick: () => buildAndShow(true, btnBuildCopy)
    }, '📋 Build & Copy Prompt');

    const btnReadComposed = makeElement('button', {
      className: 'pt-btn pt-btn-purple',
      onclick: () => {
        if (portalApp && typeof portalApp.openComposedPage === 'function') {
          portalApp.openComposedPage();
        }
      }
    }, '📖 Read as Living Page');

    const actionBar = makeElement('div', { className: 'pt-tree-action-bar' }, [
      makeElement('div', { style: { display: 'flex', alignItems: 'center', gap: '10px', flex: '1 1 320px', flexWrap: 'wrap' } }, [
        statsBadge,
        questionInput
      ]),
      makeElement('div', { style: { display: 'flex', gap: '8px', flexWrap: 'wrap' } }, [
        btnReadComposed,
        btnBuildView,
        btnBuildCopy
      ])
    ]);

    const drawerCopyBtn = makeElement('button', {
      className: 'pt-btn pt-btn-cyan',
      onclick: () => {
        navigator.clipboard?.writeText(builtTextarea.value).then(() => {
          drawerCopyBtn.textContent = '✓ Copied!';
          setTimeout(() => { drawerCopyBtn.textContent = '📋 Copy'; }, 1600);
        });
      }
    }, '📋 Copy');

    drawerMount.appendChild(makeElement('div', { className: 'pt-built-drawer' }, [
      makeElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' } }, [
        makeElement('div', { style: { display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' } }, [
          makeElement('strong', { style: { color: '#34d399', fontFamily: 'var(--pt-mono)', fontSize: '12px' } }, '✓ BUILT LLM PROMPT (Markdown + Selected Comments)'),
          builtStatsEl
        ]),
        makeElement('div', { style: { display: 'flex', gap: '6px' } }, [
          drawerCopyBtn,
          makeElement('button', {
            className: 'pt-btn',
            onclick: () => {
              const blob = new Blob([builtTextarea.value], { type: 'text/markdown;charset=utf-8' });
              const url = URL.createObjectURL(blob);
              const a = document.createElement('a');
              a.href = url;
              a.download = `RobBrown_Composed_${Date.now()}.md`;
              a.click();
              URL.revokeObjectURL(url);
            }
          }, '⬇️ .md'),
          makeElement('button', {
            className: 'pt-btn',
            onclick: () => { drawerMount.style.display = 'none'; }
          }, '✕ Hide')
        ])
      ]),
      builtTextarea
    ]));

    wrap.append(headerBar, treeControls, docsListEl, actionBar, drawerMount);
    container.appendChild(wrap);

    // Render tree immediately (synchronously!) so there is never an empty gap
    renderDocRows();

    // Non-blocking background sync for comment counts
    const syncCommentCounts = () => {
      if (typeof MockServerAPI === 'undefined') return;
      MockServerAPI.getSharedInstance().getAllThreadsSummary(null).then(allThreads => {
        const next = {};
        allThreads.filter(t => t.status !== 'resolved').forEach(t => {
          next[t.dossierId] = (next[t.dossierId] || 0) + t.commentCount;
        });
        if (JSON.stringify(next) !== JSON.stringify(this._commentCountsByDoc)) {
          this._commentCountsByDoc = next;
          if (wrap.isConnected) renderDocRows();
        }
      }).catch(() => {});
    };
    syncCommentCounts();

    if (this._unsubPartial) this._unsubPartial();
    this._unsubPartial = PartialDocumentEngine.subscribe(() => {
      if (!wrap.isConnected) return;
      const curSt = PartialDocumentEngine.getState();
      savedSelect.innerHTML = '';
      Object.values(curSt.compositions).forEach(c => {
        savedSelect.appendChild(makeElement('option', { value: c.id, selected: c.id === curSt.activeId }, `📑 ${c.name}`));
      });
      renderDocRows();
    });

    if (typeof MockServerAPI !== 'undefined' && typeof MockServerAPI.subscribe === 'function') {
      if (this._unsubBuilderComments) this._unsubBuilderComments();
      this._unsubBuilderComments = MockServerAPI.subscribe(() => {
        if (wrap.isConnected) syncCommentCounts();
      });
    }
  }
}

globalThis.PortalPromptBuilder = PortalPromptBuilder;
if (typeof module !== 'undefined' && module.exports) module.exports = PortalPromptBuilder;