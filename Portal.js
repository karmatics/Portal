class Portal {
  constructor() {
    this.rootElement = null;
    this.mode = 'frontpage'; // 'frontpage' | 'document'
    this.activeCategory = 'all';
    this.searchQuery = '';
    this.reader = null;
    this.sidePanel = null;
    this.aardvark = null;
  }

  async run(env) {
      if (this.rootElement) this.destroy();
      if (!env || !env.container) {
        throw new Error('[Portal] run() requires an environment object with a valid container.');
      }

      if (typeof DomBasics !== 'undefined' && typeof DomBasics.run === 'function') {
        DomBasics.run();
      }

      if (typeof LunoLoader !== 'undefined') {
        if (typeof LunoLoader.ensureCommentsLoaded === 'function') {
          try { await LunoLoader.ensureCommentsLoaded(); } catch (e) {}
        }
        if (typeof LunoLoader.ensurePartialEngineLoaded === 'function') {
          try { await LunoLoader.ensurePartialEngineLoaded(); } catch (e) {}
        }
      }

      this.env = env;
      this.rootElement = env.container;
      this.activeInPlaceApp = null;
      this.activeInPlaceProject = null;
      globalThis._portalInstance = this;
      globalThis._cadPlanInstance = this;

      document.documentElement.style.overflowY = 'auto';
      document.body.style.overflowY = 'auto';
      this.rootElement.style.width = '100%';
      this.rootElement.style.minHeight = '100vh';

      const route = this._getHashRoute();
      this.mode = route.mode;
      this.pendingDocPageId = route.pageId;
      this.pendingAnchorId = route.anchorId;
      this.pendingProjectName = route.projectName;

      this._routeSyncHandler = () => this._syncFromUrl();
      window.addEventListener('hashchange', this._routeSyncHandler);
      window.addEventListener('popstate', this._routeSyncHandler);

      await this.refresh();
      return this;
    }

  async refresh() {
      if (!this.rootElement) return;
      if (this.mode === 'document') {
        await this._renderDocumentMode();
      } else if (this.mode === 'composed') {
        await this._renderComposedPageMode();
      } else if (this.mode === 'project' && this.pendingProjectName) {
        await this._renderInPlaceProject(this.pendingProjectName, this.pendingDocPageId, this.pendingAnchorId);
      } else {
        this._renderFrontPageMode();
      }
    }
  _bindGlowTip(el, text, rgb = [0, 242, 254]) {
    if (!el || typeof GlowingTooltip === 'undefined') return;
    el.addEventListener('mouseenter', () => {
      try {
        if (typeof globalThis.makeElement === 'function') {
          GlowingTooltip.show(el, text, { color: rgb, maxWidth: 230, fontSize: 11.5, pointerHeight: 46 });
        }
      } catch (e) {}
    });
    el.addEventListener('mouseleave', () => {
      try { GlowingTooltip.hide(true); } catch (e) {}
    });
  }

  _renderFrontPageMode() {
        this._teardownDocumentReader();
        document.body.classList.remove('theme-dark', 'theme-blueprint', 'theme-phosphor');
        this.rootElement.innerHTML = '';

        const shell = makeElement('div', { className: 'pt-root' });
        shell.appendChild(this._buildTopBar());

        const container = makeElement('main', { className: 'pt-container' });
        container.appendChild(this._buildHeroSection());
        container.appendChild(this._buildEcosystemStrip());
        container.appendChild(this._buildQuickDoors());
        container.appendChild(this._buildChapterDirectory());
        container.appendChild(this._buildKeysBanner());
        container.appendChild(this._buildToolbar());

        const grid = makeElement('div', { className: 'pt-grid', id: 'pt-pillars-grid' });
        this._populateGrid(grid);
        container.appendChild(grid);

        shell.appendChild(container);
        this.rootElement.appendChild(shell);

        if (typeof CadPlanAardvark !== 'undefined' && !this.aardvark) {
          this.aardvark = new CadPlanAardvark({
            container: this.rootElement,
            dossierId: 'Portal',
            documentReader: null
          });
          this.aardvark.init();
          const origOpen = this.aardvark._openNoteOnSelected.bind(this.aardvark);
          this.aardvark._openNoteOnSelected = (tab) => {
            return origOpen(tab || this.aardvark._preferredTab || 'note');
          };
        }

        if (!this._frontCommentsSyncBound) {
          this._frontCommentsSyncBound = true;
          window.addEventListener('portal-comments-updated', () => {
            if (this.mode === 'frontpage') {
              const gridEl = document.getElementById('pt-pillars-grid');
              if (gridEl) this._populateGrid(gridEl);
            }
          });
        }
      }

  _buildTopBar() {
        const isUnlocked = typeof SensitiveContextGate !== 'undefined' && SensitiveContextGate.isUnlocked();

        const btnMap = makeElement('button', {
          className: 'pt-btn pt-btn-cyan',
          onclick: () => {
            if (typeof PortalConstellationStage !== 'undefined') {
              PortalConstellationStage.openExpandedStage(this, { originEl: document.getElementById('pt-hero-constellation-box') });
            }
          }
        }, '🕸️ Spatial Map');
        this._bindGlowTip(btnMap, 'Expand the interactive SVG map to view full contents, live split previews & tethered comments');

        const btnDemo = makeElement('button', {
          className: 'pt-btn pt-btn-purple',
          onclick: () => {
            if (typeof PortalConstellationStage !== 'undefined') {
              PortalConstellationStage.runDemo30s(this, document.getElementById('pt-hero-constellation-box'));
            }
          }
        }, '▶ 30s Demo');
        this._bindGlowTip(btnDemo, 'Play a 30-second animated tour of the expanding map, live document viewer & commenting');

        const btnCommentAny = makeElement('button', {
          className: 'pt-btn pt-btn-emerald',
          onclick: () => this.startCommentOnAnythingMode()
        }, '💬 Comment on Anything');
        this._bindGlowTip(btnCommentAny, 'Click any card, paragraph, or element on this page to leave a comment or directive');

        const btnTour = makeElement('button', {
          className: 'pt-btn',
          onclick: () => PortalModals.openGuidedTourDialog(this)
        }, '✨ Tour');

        const btnKeys = makeElement('button', {
          className: 'pt-btn',
          onclick: () => PortalModals.openVisitorKeysDialog(this)
        }, '🔑 Keys & AI');

        const btnJson = makeElement('button', {
          className: 'pt-btn',
          onclick: () => PortalModals.openSummaryJsonDialog()
        }, '⚙️ JSON');

        const btnDoc = makeElement('button', {
          className: 'pt-btn',
          onclick: () => this.openInDocumentReader('spear_drawing')
        }, '📖 Doc View');

        const btnGate = makeElement('button', {
          className: isUnlocked ? 'pt-btn pt-btn-amber' : 'pt-btn',
          onclick: () => {
            if (typeof SensitiveContextGate === 'undefined') return;
            if (SensitiveContextGate.isUnlocked()) {
              SensitiveContextGate.lock();
              this.refresh();
            } else {
              const code = prompt('Enter optional access code to view sensitive family context:');
              if (code && SensitiveContextGate.unlockWithCode(code)) {
                this.refresh();
              } else if (code !== null) {
                alert('Access code not recognized.');
              }
            }
          }
        }, isUnlocked ? '🔓 Unlocked' : '🔒 Sensitive');

        return makeElement('header', { className: 'pt-topbar' }, [
          makeElement('div', { className: 'pt-brand', onclick: () => { this.activeCategory = 'all'; this.searchQuery = ''; this.refresh(); } }, [
            makeElement('span', { className: 'pt-brand-dot' }),
            makeElement('span', { className: 'pt-brand-title' }, 'ROB BROWN • LIVING PORTAL'),
            makeElement('span', { className: 'pt-brand-sub' }, 'Portal v1.1')
          ]),
          makeElement('div', { className: 'pt-actions' }, [btnMap, btnDemo, btnCommentAny, btnTour, btnKeys, btnJson, btnDoc, btnGate])
        ]);
      }

  _buildHeroSection() {
        const topIntro = makeElement('div', { className: 'pt-hero-top-grid' }, [
          makeElement('div', {}, [
            makeElement('div', { className: 'pt-kicker' }, 'Rob Brown • Family Situation, Personal Record & Work (Updated Nov 2026)'),
            makeElement('h1', { className: 'pt-hero-h1' }, 'Rob Brown: Family Situation, Financial Record & Life\'s Work.'),
            makeElement('p', { className: 'pt-hero-p' },
              'Everything in one place—starting with my current situation (housing stabilized in Chico as of November 2026, while remaining out of contact—not by my choice—with all of my blood relatives, including my 94-year-old mother, the sister I used to speak with regularly, and my 12-year-old daughter Stella in San Francisco). Carrying those twin separations at the same time weighed heavily enough to push me into an unstable mental-health crisis I nearly didn\'t survive. Alongside that is the documented record of my career—I have done very well in environments suited to my technical strengths (creating billions in value at Bentley Systems), while misaligned situations go poorly—and my active software and writing.'
            ),
            makeElement('div', { className: 'pt-hero-subnote' }, [
              makeElement('div', { style: { marginBottom: '4px' } }, [
                makeElement('strong', { style: { color: '#00f2fe' } }, 'For Visitors: '),
                'Use the interactive map below to expand any domain, read full document contents right inside the workspace, comment on anything, or copy a single briefing prompt into ChatGPT, Claude, or Gemini.'
              ]),
              makeElement('div', {}, [
                makeElement('strong', { style: { color: '#34d399' } }, 'Why I Built This (Stability & Next Steps): '),
                'My mental health and stability come first. Executive dysfunction and avoiding overwhelming paperwork (such as leaving legal mail unopened during a breakdown, part of what my Social Security disability claim addresses) have gotten me into real trouble—so I keep everything structured here to load into an AI without re-explaining painful history, get clear next steps, and update documents or software via Luno.'
              ])
            ])
          ]),
          makeElement('div', { className: 'pt-hero-keys-strip' }, [
            makeElement('a', { href: PortalData.resolveAppUrl('situation'), target: '_blank', rel: 'noopener noreferrer', className: 'pt-btn pt-btn-amber' }, '⚖️ Situation Document ↗'),
            makeElement('a', { href: PortalData.resolveAppUrl('ValuationOfAccudraw'), target: '_blank', rel: 'noopener noreferrer', className: 'pt-btn pt-btn-emerald' }, '📊 Valuation Document ↗'),
            makeElement('a', { href: PortalData.resolveAppUrl('Opus'), target: '_blank', rel: 'noopener noreferrer', className: 'pt-btn' }, '🏛️ Master Opus Document ↗'),
            makeElement('a', { href: PortalData.resolveAppUrl('Luno'), target: '_blank', rel: 'noopener noreferrer', className: 'pt-btn pt-btn-cyan' }, '🌙 Luno Workspace ↗'),
            makeElement('a', { href: PortalData.resolveAppUrl('CadPlan'), target: '_blank', rel: 'noopener noreferrer', className: 'pt-btn' }, '📐 CadPlan (Spec + 3D) ↗'),
            makeElement('a', { href: PortalData.resolveAppUrl('QuoraToys'), target: '_blank', rel: 'noopener noreferrer', className: 'pt-btn pt-btn-purple' }, '〰️ Curve App ↗'),
            makeElement('button', { className: 'pt-btn pt-btn-emerald', onclick: () => this.startCommentOnAnythingMode() }, '💬 Comment on Anything')
          ])
        ]);

        const svgStageBox = this._buildConstellationSvg();
        return makeElement('section', { className: 'pt-hero pt-hero-stage-layout', 'data-block-id': 'portal_hero' }, [topIntro, svgStageBox]);
      }

  _buildConstellationSvg() {
        if (typeof PortalConstellationStage !== 'undefined') {
          return PortalConstellationStage.renderHeroBox(this);
        }
        return makeElement('div', { id: 'pt-hero-constellation-box' }, 'Loading Spatial Map...');
      }
  _buildKeysBanner() {
      return makeElement('section', { className: 'pt-keys-panel', 'data-block-id': 'portal_keys_banner' }, [
        makeElement('div', { style: { flex: '1 1 460px' } }, [
          makeElement('strong', { style: { color: '#34d399', fontFamily: 'var(--pt-mono)', fontSize: '12px', display: 'block', marginBottom: '4px' } },
            '🧠 FOR VISITORS: PASTE INTO AN AI TO ASK QUESTIONS • FOR ROB: NO MORE PAPERWORK PARALYSIS'
          ),
          makeElement('div', { style: { fontSize: '13px', color: '#cbd5e1', lineHeight: '1.58' } },
            'Most items here are living web documents (a document subset inside the JavaScript/Luno system), alongside a few interactive apps. Visitors can click "Copy Full Briefing MD" or "Keys & AI Export" to paste a complete prompt into ChatGPT, Claude, or Gemini and ask questions directly. For me, having everything structured here prevents paperwork avoidance—letting me load my whole situation into an AI without re-typing stressful history so it can tell me the next step, while also using Luno to edit documents and software.'
          )
        ]),
        makeElement('div', { style: { display: 'flex', gap: '8px', flexWrap: 'wrap' } }, [
          makeElement('button', {
            className: 'pt-btn pt-btn-emerald',
            onclick: async () => {
              const sumJson = await PortalSummaryEngine.generateSummaries(null, {
                includeSensitive: typeof SensitiveContextGate !== 'undefined' && SensitiveContextGate.isUnlocked()
              });
              const md = PortalSummaryEngine.buildVisitorAiBriefing(sumJson);
              navigator.clipboard?.writeText(md).then(() => alert('✓ Copied full Markdown briefing to clipboard! Paste it into any AI to ask questions.'));
            }
          }, '📋 Copy Full Briefing MD'),
          makeElement('button', {
            className: 'pt-btn pt-btn-amber',
            onclick: () => navigator.clipboard?.writeText(PortalData.getUnprimedVerificationPrompt()).then(() => alert('✓ Copied blind verification prompt!'))
          }, '🔎 Copy Verification Prompt')
        ])
      ]);
    }

  _buildToolbar() {
      const categories = PortalData.getCategories();

      const search = makeElement('input', {
        className: 'pt-search',
        type: 'text',
        value: this.searchQuery,
        placeholder: '🔍 Filter documents, apps, patents, topics (e.g. Situation, Stella, Valuation, Curve, Luno)...',
        oninput: (e) => {
          this.searchQuery = e.target.value.toLowerCase().trim();
          const grid = document.getElementById('pt-pillars-grid');
          if (grid) this._populateGrid(grid);
        }
      });

      const chips = makeElement('div', { className: 'pt-filter-chips' },
        categories.map(c => makeElement('button', {
          className: `pt-chip ${this.activeCategory === c.id ? 'active' : ''}`,
          onclick: () => {
            this.activeCategory = c.id;
            this.refresh();
          }
        }, c.label))
      );

      return makeElement('section', { className: 'pt-toolbar' }, [search, chips]);
    }
  _populateGrid(grid) {
    grid.innerHTML = '';
    const pillars = PortalData.getPillars().filter(p => {
      if (this.activeCategory !== 'all' && p.category !== this.activeCategory) return false;
      if (!this.searchQuery) return true;
      return `${p.name} ${p.subtitle} ${p.publicSummary} ${p.calmNote} ${p.facts.join(' ')}`.toLowerCase().includes(this.searchQuery);
    });

    if (pillars.length === 0) {
      grid.appendChild(makeElement('div', {
        style: { gridColumn: '1/-1', textAlign: 'center', padding: '32px', color: '#64748b', fontFamily: 'var(--pt-mono)' }
      }, 'No matching domain summaries found.'));
      return;
    }

    pillars.forEach(p => grid.appendChild(this._buildPillarCard(p)));
  }

  _buildPillarCard(p) {
        const stats = typeof PortalConstellationStage !== 'undefined'
          ? PortalConstellationStage.getCommentStats(p.id)
          : { total: 0 };

        const card = makeElement('article', {
          className: 'pt-card',
          'data-block-id': `pillar_${p.id}`,
          style: {
            borderLeft: `4px solid ${p.accent}`,
            boxShadow: `0 10px 28px rgba(0,0,0,0.45), 0 0 18px ${p.accent}14`
          }
        });

        card.appendChild(makeElement('div', { className: 'pt-card-head' }, [
          makeElement('div', {}, [
            makeElement('div', { style: { fontFamily: 'var(--pt-mono)', fontSize: '10px', fontWeight: '800', color: p.accent } }, p.badge),
            makeElement('a', {
              href: p.url,
              target: '_blank',
              rel: 'noopener noreferrer',
              style: { textDecoration: 'none', color: 'inherit', display: 'inline-block' }
            }, [
              makeElement('h3', { className: 'pt-card-title', style: { cursor: 'pointer' } }, `${p.icon} ${p.name} ↗`)
            ]),
            makeElement('div', { className: 'pt-card-sub', style: { color: '#94a3b8' } }, p.subtitle)
          ])
        ]));

        card.appendChild(makeElement('p', { className: 'pt-card-summary' }, p.publicSummary));
        card.appendChild(makeElement('div', {
          style: { fontSize: '11.5px', color: '#94a3b8', backgroundColor: '#090e19', border: '1px solid #1a2333', borderRadius: '6px', padding: '8px 10px', lineHeight: '1.45' }
        }, p.calmNote));

        card.appendChild(makeElement('div', { className: 'pt-tags' },
          p.facts.map(f => makeElement('span', { className: 'pt-tag' }, f))
        ));

        card.appendChild(makeElement('div', { className: 'pt-card-footer' }, [
          makeElement('a', {
            href: p.url,
            target: '_blank',
            rel: 'noopener noreferrer',
            className: 'pt-btn',
            style: { fontSize: '11px', padding: '5px 10px', borderColor: `${p.accent}88`, color: p.accent }
          }, p.openLabel || '📄 Open Document ↗'),
          makeElement('div', { style: { display: 'flex', gap: '6px', flexWrap: 'wrap' } }, [
            makeElement('button', {
              className: `pt-btn ${stats.total > 0 ? 'pt-btn-emerald' : ''}`,
              style: { fontSize: '11px', padding: '4px 9px' },
              onclick: (e) => this.openPillarComments(p, e.currentTarget)
            }, stats.total > 0 ? `💬 ${stats.total}` : '💬 Comment'),
            makeElement('button', {
              className: 'pt-btn',
              style: { fontSize: '11px', padding: '4px 9px' },
              onclick: () => {
                if (typeof PortalConstellationStage !== 'undefined') {
                  PortalConstellationStage.openExpandedStage(this, { originEl: card, initialPillarId: p.id });
                } else {
                  PortalModals.openPillarDialog(p, this);
                }
              }
            }, '🕸️ Map & Read'),
            makeElement('button', {
              className: 'pt-btn',
              style: { fontSize: '11px', padding: '4px 9px' },
              onclick: () => this.openInDocumentReader(p.docPageId)
            }, '📖 Chapter')
          ])
        ]));

        return card;
      }
  async openInDocumentReader(pageId = 'spear_drawing', updateUrl = true) {
      if (this.mode === 'document' && this.reader) {
        this.reader.switchPage(pageId, updateUrl);
        return;
      }
      this.mode = 'document';
      this.pendingDocPageId = pageId;
      if (updateUrl) {
        this._setUrlHash(pageId);
      }
      await this._renderDocumentMode();
    }

  async _renderDocumentMode() {
      this._teardownDocumentReader();
      if (this.aardvark) {
        this.aardvark.destroy();
        this.aardvark = null;
      }
      this.rootElement.innerHTML = '';

      const pages = [
        { id: 'spear_drawing', title: '1. Freeform Curve Drawing' },
        { id: 'spear_economics', title: '2. Economics of Automation' },
        { id: 'spear_accucad', title: '3. AccuCAD 3D Workstation' },
        { id: 'luno', title: '4. Luno Workspace & Protocol' },
        { id: 'homesetup', title: '5. Home Setup & Fleet' },
        { id: 'career', title: '6. AccuDraw & Aardvark Record' },
        { id: 'financial', title: '7. Financial Valuation Record' },
        { id: 'family', title: '8. Family & Stability Context' },
        { id: 'economics', title: '9. Master Opus & Library Hub' },
        { id: 'visitor_keys', title: '10. Keys to the System & AI Export' }
      ];

      const methodMap = {};
      Object.getOwnPropertyNames(PortalDocContent).forEach(k => {
        if (typeof PortalDocContent[k] === 'function' && k !== 'getMeta' && k !== 'manifest') {
          methodMap[k] = PortalDocContent[k].bind(PortalDocContent);
        }
      });

      const sectionPages = pages.map(p => ({
        id: p.id,
        title: p.title,
        docClass: () => ({
          name: 'PortalDocContent',
          getMeta: () => PortalDocContent.getMeta(p.id),
          manifest: () => PortalDocContent.manifest().filter(s => s.section === p.id),
          ...methodMap
        })
      }));

      this.reader = new DocumentReader({
        container: this.rootElement,
        brandTitle: 'Portal • Document View',
        brandIcon: '🏛️',
        dossierId: 'Portal',
        disableEmptyHashFallback: true,
        pages: sectionPages,
        itemNotes: globalThis.CadPlanItemNotes || null,
        itemNotesClass: globalThis.CadPlanItemNotes || null,
        editorClass: globalThis.CadPlanDocumentEditor || null
      });

      if (this.pendingDocPageId && sectionPages.some(p => p.id === this.pendingDocPageId)) {
        this.reader.currentPageId = this.pendingDocPageId;
      }

      const origSwitchPage = this.reader.switchPage.bind(this.reader);
      this.reader.switchPage = (pageId, updateUrl = true) => {
        origSwitchPage(pageId, updateUrl);
        this._populateDocSidePanel(sectionPages);
        this._renderDocNavBar(sectionPages);
      };

      await this.reader.init();

      if (this.reader.navBar) {
        const leftNavGroup = this.reader.navBar.firstElementChild;
        if (leftNavGroup) {
          const backPortalBtn = makeElement('button', {
            className: 'dr-nav-btn',
            id: 'pt-doc-back-portal-btn',
            title: 'Return to Portal Front Page',
            style: {
              padding: '5px 12px',
              fontSize: '0.78rem',
              fontWeight: '800',
              color: '#070a13',
              background: 'linear-gradient(135deg, #0284c7 0%, #00f2fe 100%)',
              border: 'none',
              borderRadius: '20px'
            },
            onclick: () => this.goToFrontPage(true)
          }, '← Portal');
          leftNavGroup.insertBefore(backPortalBtn, leftNavGroup.firstChild);

          const brandEl = leftNavGroup.querySelector('.dr-brand');
          if (brandEl) {
            brandEl.onclick = () => this.goToFrontPage(true);
          }
        }
      }

      if (typeof CadPlanAardvark !== 'undefined') {
        this.aardvark = new CadPlanAardvark({
          container: this.rootElement,
          dossierId: 'Portal',
          itemNotes: globalThis.CadPlanItemNotes || null,
          documentReader: this.reader
        });
        this.aardvark.init();
        this.reader.aardvark = this.aardvark;
      }

      if (typeof SidePanel !== 'undefined') {
        this.sidePanel = new SidePanel('left', 300, null);
        this.reader.options.sidePanel = this.sidePanel;
        this._populateDocSidePanel(sectionPages);
        if (window.innerWidth >= 860) this.sidePanel.open();
      }

      this._renderDocNavBar(sectionPages);

      if (this.pendingAnchorId) {
        const anchor = this.pendingAnchorId;
        this.pendingAnchorId = null;
        setTimeout(() => this.reader?.highlightTarget(anchor), 250);
      }
    }

  _populateDocSidePanel(pages) {
      if (!this.sidePanel) return;
      this.sidePanel.header.innerHTML = '';
      this.sidePanel.header.append(
        makeElement('span', { style: { fontFamily: 'monospace', fontSize: '11px', fontWeight: '800', color: '#00f2fe', flex: 1 } }, '🏛️ Portal Chapters'),
        makeElement('button', { className: 'pt-btn', style: { padding: '2px 8px', fontSize: '10px' }, onclick: () => this.sidePanel.close() }, '✕')
      );

      const c = this.sidePanel.contentContainer;
      c.innerHTML = '';
      c.style.cssText = 'flex:1; overflow-y:auto; padding:12px; display:flex; flex-direction:column; gap:8px;';

      c.appendChild(makeElement('button', {
        className: 'pt-btn pt-btn-cyan',
        style: { width: '100%', justifyContent: 'center' },
        onclick: () => this.goToFrontPage(true)
      }, '🖥️ ← Portal Front Page'));

      pages.forEach(p => {
        const isCur = this.reader && this.reader.currentPageId === p.id;
        c.appendChild(makeElement('button', {
          className: `pt-btn ${isCur ? 'pt-btn-emerald' : ''}`,
          style: { width: '100%', justifyContent: 'flex-start', textAlign: 'left' },
          onclick: () => {
            this.reader.switchPage(p.id, true);
            if (window.innerWidth < 860 && this.sidePanel) {
              this.sidePanel.close();
            }
          }
        }, p.title));
      });
    }

  _teardownDocumentReader() {
      const navBar = document.getElementById('pt-doc-nav-bar');
      if (navBar) navBar.remove();

      if (this.sidePanel) {
        this.sidePanel.destroy();
        this.sidePanel = null;
      }
      if (typeof SidePanel !== 'undefined' && typeof SidePanel.updateGlobalSafeArea === 'function') {
        SidePanel.updateGlobalSafeArea();
      }
      if (this.reader && typeof this.reader.destroy === 'function') {
        try { this.reader.destroy(); } catch (e) {}
        this.reader = null;
      }
      if (this.aardvark) {
        this.aardvark.destroy();
        this.aardvark = null;
      }
    }

  destroy() {
        if (typeof PortalConstellationStage !== 'undefined' && PortalConstellationStage._activeStage) {
          PortalConstellationStage._activeStage.close(true);
        }
        const commentHud = document.getElementById('pt-comment-mode-hud');
        if (commentHud) commentHud.remove();
        if (this._routeSyncHandler) {
          window.removeEventListener('hashchange', this._routeSyncHandler);
          window.removeEventListener('popstate', this._routeSyncHandler);
          this._routeSyncHandler = null;
        }
        this._teardownDocumentReader();
        if (this.aardvark) {
          this.aardvark.destroy();
          this.aardvark = null;
        }
        if (globalThis._portalInstance === this) globalThis._portalInstance = null;
        if (globalThis._cadPlanInstance === this) globalThis._cadPlanInstance = null;
        this.rootElement = null;
      }
  _buildChapterDirectory() {
        const chapters = [
          { id: 'spear_drawing', num: '1', label: 'Kinetic Curve & Markup Studio', col: '#00f2fe' },
          { id: 'spear_economics', num: '2', label: 'Economics of Automation', col: '#34d399' },
          { id: 'spear_accucad', num: '3', label: 'CadPlan Spec & AccuCAD 3D', col: '#38bdf8' },
          { id: 'luno', num: '4', label: 'Luno Workspace & Protocol', col: '#38bdf8' },
          { id: 'homesetup', num: '5', label: 'Home Setup & Fleet', col: '#10b981' },
          { id: 'career', num: '6', label: 'AccuDraw & Aardvark Record', col: '#60a5fa' },
          { id: 'financial', num: '7', label: 'Financial Valuation Record', col: '#f59e0b' },
          { id: 'family', num: '8', label: 'Family & Stability Context', col: '#c084fc' },
          { id: 'economics', num: '9', label: 'Opus Router & Library', col: '#a78bfa' },
          { id: 'visitor_keys', num: '10', label: 'Keys & AI Export Guide', col: '#00f2fe' }
        ];

        return makeElement('section', { className: 'pt-chapter-strip', 'data-block-id': 'portal_chapter_index' }, [
          makeElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' } }, [
            makeElement('strong', { style: { fontFamily: 'var(--pt-mono)', fontSize: '12px', color: '#00f2fe' } }, '📖 PORTAL DOCUMENT CHAPTERS (Click any numbered chapter to open & read)'),
            makeElement('span', { style: { fontFamily: 'var(--pt-mono)', fontSize: '10.5px', color: '#94a3b8' } }, '10 Integrated Chapters')
          ]),
          makeElement('div', { className: 'pt-chapter-grid' },
            chapters.map(ch => makeElement('button', {
              className: 'pt-chapter-pill',
              onclick: () => this.openInDocumentReader(ch.id)
            }, [
              makeElement('span', { style: { color: ch.col, fontWeight: '800' } }, `${ch.num}.`),
              makeElement('span', { style: { overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' } }, ch.label)
            ]))
          )
        ]);
      }

  _renderDocNavBar(pages) {
      const existing = document.getElementById('pt-doc-nav-bar');
      if (existing) existing.remove();

      const idx = pages.findIndex(p => p.id === this.reader?.currentPageId);
      const prevPage = idx > 0 ? pages[idx - 1] : null;
      const nextPage = (idx >= 0 && idx < pages.length - 1) ? pages[idx + 1] : null;

      const bar = makeElement('div', { className: 'pt-doc-mode-bar', id: 'pt-doc-nav-bar' }, [
        prevPage ? makeElement('button', {
          className: 'pt-btn',
          onclick: () => this.reader.switchPage(prevPage.id, true)
        }, `◀ ${prevPage.title.split('.')[0]}.`) : null,
        nextPage ? makeElement('button', {
          className: 'pt-btn pt-btn-emerald',
          onclick: () => this.reader.switchPage(nextPage.id, true)
        }, `${nextPage.title.split('.')[0]}. ▶`) : null,
        makeElement('button', {
          className: 'pt-btn pt-btn-cyan',
          onclick: () => this.goToFrontPage(true)
        }, '🖥️ ← Portal')
      ].filter(Boolean));
      this.rootElement.appendChild(bar);
    }
  _buildLiveCurveToy() {
        return this._buildConstellationSvg();
      }

  _buildQuickDoors() {
      const highlights = [
        {
          kicker: 'PERSONAL & FAMILY RECORD (NOV 2026)',
          title: '⚖️ Family, Stella & Current Situation',
          desc: 'Chico apartment & Social Security stabilized (Jack helped move; Don on email). Out of contact—not by choice—with all blood relatives (my 94-year-old mother, the sister I talked to regularly, and my 12-year-old daughter Stella in SF). Bringing spring legal mail to therapy tomorrow; deeper June 2026 & custody records live in Situation.',
          col: '#f43f5e',
          primaryText: '📖 Open Situation In-Place',
          projName: 'situation',
          primaryUrl: PortalData.resolveAppUrl('situation'),
          chapterId: 'family'
        },
        {
          kicker: 'VERIFIABLE ECONOMIC RECORD',
          title: '📊 $1.2B–$5.54B+ Value Created vs. Reality',
          desc: 'Unprimed Google Search & 4 independent AIs ($2.3B midpoint) attribute a massive share of Bentley Systems\' anti-churn moat to AccuDraw & SmartLine—showing how well I perform in the right technical environment, contrasted with my current financial reality.',
          col: '#f59e0b',
          primaryText: '📖 Open Valuation In-Place',
          projName: 'ValuationOfAccudraw',
          primaryUrl: PortalData.resolveAppUrl('ValuationOfAccudraw'),
          copyPrompt: true,
          chapterId: 'financial'
        },
        {
          kicker: 'PRIMARY ORGANIZING & CODE TOOL',
          title: '🌙 Luno: Life Organization, AI Prompts & Code',
          desc: 'My personal workspace for editing these living documents, building/modifying software, and compiling huge structured prompts—so I can load my situation into an AI without re-typing everything and get clear next steps despite executive dysfunction.',
          col: '#00f2fe',
          primaryText: '🚀 Open Luno Tool ↗',
          primaryUrl: PortalData.resolveAppUrl('Luno'),
          chapterId: 'luno'
        },
        {
          kicker: 'CAREER & CAD HERITAGE (US #5,754,182)',
          title: '📐 CadPlan Document + AccuCAD 3D App',
          desc: 'Built on my AccuDraw & SmartLine inventions at Bentley Systems. Pairs an architectural specification document with a live 3D WebGL app embedded inside so AI agents can insert AccuDraw into open-source AutoCAD/MicroStation clones.',
          col: '#38bdf8',
          primaryText: '📖 Open CadPlan In-Place',
          projName: 'CadPlan',
          primaryUrl: PortalData.resolveAppUrl('CadPlan'),
          secondaryText: '🚀 AccuCAD 3D ↗',
          secondaryUrl: PortalData.resolveAppUrl('accuCad'),
          chapterId: 'spear_accucad'
        },
        {
          kicker: 'INTERACTIVE APP & PUBLIC ESSAY',
          title: '〰️ Kinetic Curve App & 🤖 Economics Document',
          desc: 'An everyday social-media image markup app with 32px kinetic smoothing (modifiable via Luno), alongside the plain-English Economics of Automation visual essay and simulator on the Robot Dividend.',
          col: '#c084fc',
          primaryText: '📖 Open Economics In-Place',
          projName: 'EconomicsOfAutomation',
          primaryUrl: PortalData.resolveAppUrl('EconomicsOfAutomation'),
          secondaryText: '〰️ Curve App',
          secondaryProj: 'QuoraToys',
          secondaryUrl: PortalData.resolveAppUrl('QuoraToys'),
          chapterId: 'spear_drawing'
        },
        {
          kicker: 'DEEP ARCHIVE & INFRASTRUCTURE',
          title: '🏛️ Master Opus & 🖥️ HomeSetup Documents',
          desc: 'Opus unites all 4 life quadrants with Tier 0–3 AI context depth and a 4-turn hallucination-to-truth stepper, backed by the HomeSetup fleet document covering the Mac Mini & Ubuntu Port 8080 setup.',
          col: '#10b981',
          primaryText: '📖 Open Master Opus In-Place',
          projName: 'Opus',
          primaryUrl: PortalData.resolveAppUrl('Opus'),
          secondaryText: '🖥️ HomeSetup',
          secondaryProj: 'HomeSetup',
          secondaryUrl: PortalData.resolveAppUrl('HomeSetup'),
          chapterId: 'economics'
        }
      ];

      return makeElement('section', {
        className: 'pt-highlights-wrap',
        'data-block-id': 'portal_quick_doors'
      }, [
        makeElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px', marginBottom: '10px' } }, [
          makeElement('strong', { style: { fontFamily: 'var(--pt-mono)', fontSize: '12px', color: '#00f2fe', letterSpacing: '0.06em' } }, '⭐ IMPORTANT AT A GLANCE — OPEN ANY DOCUMENT IN-PLACE'),
          makeElement('span', { style: { fontFamily: 'var(--pt-mono)', fontSize: '10.5px', color: '#94a3b8' } }, 'Opens inside this SPA (use ↗ icon on cards if you want a separate tab)')
        ]),
        makeElement('div', { className: 'pt-highlights-grid' },
          highlights.map(h => makeElement('div', {
            className: 'pt-highlight-card',
            style: { borderTop: `3px solid ${h.col}`, boxShadow: `0 10px 26px rgba(0,0,0,0.45), 0 0 16px ${h.col}14` }
          }, [
            makeElement('div', {}, [
              makeElement('span', { style: { fontFamily: 'var(--pt-mono)', fontSize: '9.5px', fontWeight: '800', color: h.col, letterSpacing: '0.08em', display: 'block', marginBottom: '4px' } }, h.kicker),
              makeElement('strong', { style: { color: '#f8fafc', fontSize: '14px', display: 'block', marginBottom: '6px', lineHeight: '1.3' } }, h.title),
              makeElement('div', { style: { fontSize: '12.5px', color: '#cbd5e1', lineHeight: '1.52' } }, h.desc)
            ]),
            makeElement('div', { style: { display: 'flex', flexWrap: 'wrap', gap: '6px', paddingTop: '8px', borderTop: '1px solid #1a2333' } }, [
              h.projName ? makeElement('button', {
                className: 'pt-btn',
                style: { fontSize: '11px', padding: '5px 10px', borderColor: `${h.col}77`, color: h.col },
                onclick: () => this.openProjectInPlace(h.projName)
              }, h.primaryText) : makeElement('a', {
                href: h.primaryUrl,
                target: '_blank',
                rel: 'noopener noreferrer',
                className: 'pt-btn',
                style: { fontSize: '11px', padding: '5px 10px', borderColor: `${h.col}77`, color: h.col }
              }, h.primaryText),
              h.secondaryProj ? makeElement('button', {
                className: 'pt-btn',
                style: { fontSize: '11px', padding: '5px 10px' },
                onclick: () => this.openProjectInPlace(h.secondaryProj)
              }, h.secondaryText) : (h.secondaryUrl ? makeElement('a', {
                href: h.secondaryUrl,
                target: '_blank',
                rel: 'noopener noreferrer',
                className: 'pt-btn',
                style: { fontSize: '11px', padding: '5px 10px' }
              }, h.secondaryText) : null),
              h.copyPrompt ? makeElement('button', {
                className: 'pt-btn pt-btn-amber',
                style: { fontSize: '11px', padding: '5px 10px' },
                onclick: () => navigator.clipboard?.writeText(PortalData.getUnprimedVerificationPrompt()).then(() => alert('✓ Copied blind verification prompt!'))
              }, '🔎 Copy Blind Test') : null,
              makeElement('button', {
                className: 'pt-btn',
                style: { fontSize: '11px', padding: '5px 10px' },
                onclick: () => this.openInDocumentReader(h.chapterId)
              }, '📄 Summary')
            ].filter(Boolean))
          ]))
        )
      ]);
    }

  _getHashRoute() {
      const docPages = ['spear_drawing', 'spear_economics', 'spear_accucad', 'luno', 'homesetup', 'career', 'financial', 'family', 'economics', 'visitor_keys'];
      const rawHash = (window.location.hash || '').replace(/^#\/?/, '');
      if (!rawHash || rawHash === 'frontpage') {
        return { mode: 'frontpage', pageId: null, anchorId: null, projectName: null };
      }
      const parts = rawHash.split('/').filter(Boolean);
      const first = parts[0] || '';
      if (first === 'composed') {
        return { mode: 'composed', pageId: parts[1] || 'all', anchorId: null, projectName: null };
      }
      if (first === 'app' && parts[1]) {
        return { mode: 'project', projectName: parts[1], pageId: parts[2] || null, anchorId: parts[3] || null };
      }
      if (first === 'doc') {
        const p = docPages.includes(parts[1]) ? parts[1] : 'spear_drawing';
        return { mode: 'document', pageId: p, anchorId: parts[2] || null, projectName: null };
      }
      if (docPages.includes(first)) {
        return { mode: 'document', pageId: first, anchorId: parts[1] || null, projectName: null };
      }
      return { mode: 'frontpage', pageId: null, anchorId: null, projectName: null };
    }
  _setUrlHash(pageId = '') {
      const targetHash = pageId ? `#${pageId}` : '';
      const curHash = window.location.hash || '';
      if (targetHash === '' && (curHash === '' || curHash === '#' || curHash === '#/' || curHash === '#frontpage')) {
        return;
      }
      if (targetHash && curHash === targetHash) {
        return;
      }

      try {
        if (window.location.protocol !== 'about:' && window.history && typeof window.history.pushState === 'function') {
          const nextUrl = targetHash || (window.location.pathname + window.location.search);
          window.history.pushState({ portalMode: pageId ? 'document' : 'frontpage', pageId: pageId || null }, '', nextUrl);
        } else {
          window.location.hash = targetHash || '#frontpage';
        }
      } catch (e) {
        try { window.location.hash = targetHash || '#frontpage'; } catch (err) {}
      }
    }

  async _syncFromUrl() {
      if (this._isSyncingRoute || !this.rootElement) return;
      this._isSyncingRoute = true;
      try {
        const route = this._getHashRoute();
        if (route.mode === 'frontpage') {
          if (this.mode === 'project' && this.activeInPlaceApp) {
            // Allow internal Group 2 sub-routes like #/court-filing without tearing down SituationApp
            const raw = (window.location.hash || '').replace(/^#\/?/, '');
            if (raw && raw !== 'frontpage' && !raw.startsWith('app/')) return;
          }
          if (this.mode !== 'frontpage') {
            this.mode = 'frontpage';
            this.pendingDocPageId = null;
            this.pendingAnchorId = null;
            this.pendingProjectName = null;
            await this.refresh();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
        } else if (route.mode === 'composed') {
          this.mode = 'composed';
          await this.refresh();
        } else if (route.mode === 'project') {
          if (this.mode !== 'project' || this.activeInPlaceProject !== route.projectName) {
            await this.openProjectInPlace(route.projectName, route.pageId, route.anchorId, false);
          }
        } else {
          if (this.mode !== 'document') {
            this.pendingAnchorId = route.anchorId || null;
            await this.openInDocumentReader(route.pageId, false);
          } else if (this.reader) {
            if (this.reader.currentPageId !== route.pageId) {
              this.reader.switchPage(route.pageId, false);
            }
            if (route.anchorId) {
              setTimeout(() => this.reader?.highlightTarget(route.anchorId), 200);
            }
          }
        }
      } finally {
        this._isSyncingRoute = false;
      }
    }

  async goToFrontPage(updateUrl = true) {
      this.mode = 'frontpage';
      this.pendingDocPageId = null;
      this.pendingAnchorId = null;
      this.pendingProjectName = null;
      if (updateUrl) {
        this._setUrlHash('');
      }
      await this.refresh();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  _buildEcosystemStrip() {
      const items = [
        {
          badge: '🌐 PORTAL (HERE)',
          col: '#00f2fe',
          text: 'Clean public front door calling out every pillar, blind valuation test, and 10 readable chapters.'
        },
        {
          badge: '🏛️ MASTER OPUS',
          col: '#a78bfa',
          text: 'Deep 4-quadrant knowledge router (Tiers 0–3), 4-turn AI verification stepper, and cross-repo file viewer.'
        },
        {
          badge: '⚖️ SITUATION DOSSIER',
          col: '#f59e0b',
          text: 'Detailed personal & family record: Nov 2026 Chico stability, Stella court prep, June 2026 context, and gated family/mother-contact exhibits.'
        }
      ];

      return makeElement('section', { className: 'pt-ecosystem-strip', 'data-block-id': 'portal_ecosystem_roles' },
        items.map(it => makeElement('div', { className: 'pt-eco-pill', style: { borderLeft: `3px solid ${it.col}` } }, [
          makeElement('strong', { style: { fontFamily: 'var(--pt-mono)', fontSize: '11px', color: it.col, display: 'block', marginBottom: '2px' } }, it.badge),
          makeElement('span', { style: { fontSize: '12px', color: '#cbd5e1', lineHeight: '1.45' } }, it.text)
        ]))
      );
    }

  async openProjectInPlace(projectName, pageId = null, anchorId = null, updateUrl = true) {
      if (!projectName) return;
      if (projectName === 'Luno') {
        window.open(PortalData.resolveAppUrl('Luno'), '_blank', 'noopener,noreferrer');
        return;
      }
      this.mode = 'project';
      this.pendingProjectName = projectName;
      this.pendingDocPageId = pageId || null;
      this.pendingAnchorId = anchorId || null;
      if (updateUrl) {
        const target = pageId ? `app/${projectName}/${pageId}` : `app/${projectName}`;
        this._setUrlHash(target);
      }
      await this._renderInPlaceProject(projectName, pageId, anchorId);
    }

  async openComposedPage(updateUrl = true) {
      this.mode = 'composed';
      if (updateUrl) {
        this._setUrlHash('composed');
      }
      await this._renderComposedPageMode();
    }

  async _renderInPlaceProject(projectName, pageId = null, anchorId = null) {
        this._teardownActiveSubView();
        if (this.aardvark) {
          this.aardvark.destroy();
          this.aardvark = null;
        }

        this.rootElement.innerHTML = '';
        const loadingCard = makeElement('div', {
          style: { padding: '48px 20px', textAlign: 'center', fontFamily: 'var(--pt-mono)', color: '#00f2fe', fontSize: '14px' }
        }, `⚡ Loading [${projectName}] in-place into Portal SPA...`);
        this.rootElement.appendChild(loadingCard);

        try {
          globalThis._lunoSpaHostContext = {
            activeProject: projectName,
            hashPrefix: `app/${projectName}/`,
            onNavigateHome: () => this.goToFrontPage(true),
            onOpenComposed: () => this.openComposedPage(true)
          };

          const { EntryClass, methodName, meta } = await LunoLoader.loadProjectIntoSpa(projectName);
          if (!EntryClass) {
            throw new Error(`Entrypoint class for [${projectName}] could not be loaded.`);
          }

          this.rootElement.innerHTML = '';
          const hostWrap = makeElement('div', {
            id: 'pt-spa-host-wrap',
            style: { width: '100%', minHeight: '100vh', position: 'relative' }
          });

          const docReaderApps = new Set(['Opus', 'HomeSetup', 'CadPlan', 'EconomicsOfAutomation', 'QuoraToys', 'Comments']);
          const isDocReaderApp = docReaderApps.has(projectName);

          if (!isDocReaderApp) {
            hostWrap.appendChild(this._buildInPlaceSpaBar(projectName));
          }

          const appMount = makeElement('div', {
            id: 'pt-spa-app-mount',
            style: { width: '100%', minHeight: isDocReaderApp ? '100vh' : 'calc(100vh - 54px)', position: 'relative' }
          });
          hostWrap.appendChild(appMount);
          this.rootElement.appendChild(hostWrap);

          if (!isDocReaderApp) {
            this._installRelativeAssetRewriter(appMount, projectName);
          }

          const inst = new EntryClass();
          this.activeInPlaceApp = inst;
          this.activeInPlaceProject = projectName;

          if (typeof inst[methodName] === 'function') {
            await inst[methodName]({ container: appMount, meta });
          } else if (typeof EntryClass[methodName] === 'function') {
            await EntryClass[methodName]({ container: appMount, meta });
          }

          if (meta && meta.universalComments && typeof LunoLoader !== 'undefined' && typeof LunoLoader.ensureCommentsLoaded === 'function') {
            LunoLoader.ensureCommentsLoaded().then(() => {
              if (typeof UniversalCommentsOverlay !== 'undefined' && appMount.isConnected) {
                UniversalCommentsOverlay.attach(appMount, { dossierId: projectName, pageId: 'overview' });
              }
            }).catch(() => {});
          }

          if (pageId && inst.reader && typeof inst.reader.switchPage === 'function' && inst.reader.currentPageId !== pageId) {
            inst.reader.switchPage(pageId, false);
          }
          if (anchorId && inst.reader && typeof inst.reader.highlightTarget === 'function') {
            setTimeout(() => inst.reader.highlightTarget(anchorId), 260);
          }
        } catch (err) {
          this.rootElement.innerHTML = '';
          this.rootElement.appendChild(this._buildInPlaceSpaBar(projectName));
          this.rootElement.appendChild(makeElement('div', {
            style: { maxWidth: '720px', margin: '40px auto', padding: '20px', background: '#2c080a', border: '2px solid #f85149', borderRadius: '10px', color: '#ff7b72', fontFamily: 'monospace' }
          }, [
            makeElement('h3', {}, `⚠️ Could not load [${projectName}] in-place`),
            makeElement('pre', { style: { whiteSpace: 'pre-wrap', marginTop: '10px', fontSize: '12px' } }, err.stack || err.message),
            makeElement('div', { style: { marginTop: '14px', display: 'flex', gap: '8px' } }, [
              makeElement('button', { className: 'pt-btn pt-btn-cyan', onclick: () => this.goToFrontPage(true) }, '← Back to Portal'),
              makeElement('a', { href: PortalData.resolveAppUrl(projectName), target: '_blank', className: 'pt-btn' }, `↗ Open ${projectName} in New Tab`)
            ])
          ]));
        }
      }
  _buildInPlaceSpaBar(activeProj) {
        const projects = [
          { id: 'situation', label: '⚖️ Situation' },
          { id: 'ValuationOfAccudraw', label: '📊 Valuation' },
          { id: 'Opus', label: '🏛️ Master Opus' },
          { id: 'CadPlan', label: '📐 CadPlan' },
          { id: 'accudraw', label: '📜 AccuDraw Archive' },
          { id: 'EconomicsOfAutomation', label: '🤖 Economics' },
          { id: 'JobsAndAI', label: '📈 Jobs & AI' },
          { id: 'HomeSetup', label: '🖥️ HomeSetup' },
          { id: 'QuoraToys', label: '〰️ Curve App' },
          { id: 'Comments', label: '💬 Comments Docs' },
          { id: 'TouchController', label: '📱 TouchController' }
        ];

        const switcher = makeElement('select', {
          style: {
            background: '#05080f', color: '#00f2fe', border: '1px solid #1e293b',
            borderRadius: '6px', padding: '5px 10px', fontFamily: 'var(--pt-mono)', fontSize: '11.5px', fontWeight: '700'
          },
          onchange: (e) => {
            if (e.target.value) this.openProjectInPlace(e.target.value);
          }
        }, projects.map(p => makeElement('option', { value: p.id, selected: p.id === activeProj }, p.label)));

        return makeElement('div', {
          className: 'pt-topbar',
          id: 'pt-inplace-spa-bar',
          style: { borderBottom: '1px solid rgba(0, 242, 254, 0.3)' }
        }, [
          makeElement('div', { style: { display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' } }, [
            makeElement('button', { className: 'pt-btn pt-btn-cyan', onclick: () => this.goToFrontPage(true) }, '← Portal Home'),
            switcher
          ]),
          makeElement('div', { style: { display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' } }, [
            makeElement('button', { className: 'pt-btn pt-btn-emerald', onclick: () => this.openComposedPage(true) }, '🧩 Composed Page'),
            makeElement('button', {
              className: 'pt-btn pt-btn-purple',
              onclick: () => DocumentReader.openCommentsHub({ dossierId: activeProj })
            }, '💬 Comments Hub'),
            makeElement('a', {
              href: PortalData.resolveAppUrl(activeProj),
              target: '_blank',
              rel: 'noopener noreferrer',
              className: 'pt-btn'
            }, '↗ Pop Out Tab')
          ])
        ]);
      }
  _installRelativeAssetRewriter(mountEl, projectName) {
      const rewrite = () => {
        mountEl.querySelectorAll('img[src]').forEach(img => {
          const raw = img.getAttribute('src') || '';
          if (!raw || raw.startsWith('http') || raw.startsWith('data:') || raw.startsWith('/') || raw.startsWith('../')) return;
          img.setAttribute('src', LunoLoader.resolveScriptUrl(`../${projectName}/${raw}`));
        });
      };
      rewrite();
      this._assetObserver = new MutationObserver(rewrite);
      this._assetObserver.observe(mountEl, { childList: true, subtree: true });
    }

  async _renderComposedPageMode() {
      this._teardownActiveSubView();
      if (this.aardvark) {
        this.aardvark.destroy();
        this.aardvark = null;
      }
      this.rootElement.innerHTML = '';

      if (typeof PartialDocumentEngine === 'undefined') {
        this._renderFrontPageMode();
        return;
      }

      const compiled = await PartialDocumentEngine.compileComposition();
      const comp = compiled.composition;

      const virtualPages = compiled.segments.length > 0
        ? compiled.segments.map((seg, idx) => ({
            id: `seg_${idx}`,
            title: `${idx + 1}. ${seg.docIcon} ${seg.secLabel}`,
            docClass: () => ({
              name: 'ComposedPartialDoc',
              getMeta: () => ({
                kicker: `${seg.docTitle} • ${seg.modeLabel} SLICE`,
                title: `${idx + 1}. ${seg.secLabel}`,
                subtitle: `Compiled live from [${seg.docId} → ${seg.secId}]`
              }),
              manifest: () => [
                {
                  section: `composed_${idx}`,
                  partLabel: `Source: ${seg.docId}`,
                  title: seg.secLabel,
                  blocks: [{ id: `blk_composed_${idx}`, type: 'p' }]
                }
              ],
              [`blk_composed_${idx}`]: () => [seg.markdown]
            })
          }))
        : [{
            id: 'empty',
            title: '0. Empty Composition',
            docClass: () => ({
              name: 'ComposedPartialDoc',
              getMeta: () => ({ kicker: 'Composed Partial Page', title: 'No Slices Selected Yet', subtitle: 'Return to Portal Front Page to select Summary, Core, or In-Depth slices.' }),
              manifest: () => [{ section: 'empty', partLabel: 'Guide', title: 'How to Compose', blocks: [{ id: 'p_empty', type: 'p' }] }],
              p_empty: () => ['Go back to **Portal Home** and select any documents, sections, or blocks in the Partial Document Builder, or click **🧩 +Partial** while reading inside any document.']
            })
          }];

      // Prepend a unified All-In-One overview page showing the entire composed Markdown together!
      if (compiled.segments.length > 0) {
        virtualPages.unshift({
          id: 'all',
          title: `0. Full Composed Page (${compiled.segments.length} slices)`,
          docClass: () => ({
            name: 'ComposedPartialAll',
            getMeta: () => ({
              kicker: `Composed Partial Document • ${comp.name || 'Custom'}`,
              title: comp.question?.trim() ? comp.question.trim() : `Composed Multi-Document Page (${compiled.segments.length} Slices)`,
              subtitle: `${compiled.words.toLocaleString()} words • ~${compiled.approxTokens.toLocaleString()} tokens • Standard Non-Luno Markdown`
            }),
            manifest: () => compiled.segments.map((seg, idx) => ({
              section: `slice_${idx}`,
              partLabel: `${seg.docIcon} ${seg.docTitle} (${seg.modeLabel})`,
              title: `${idx + 1}. ${seg.secLabel}`,
              blocks: [{ id: `slice_blk_${idx}`, type: 'p' }]
            })),
            ...Object.fromEntries(compiled.segments.map((seg, idx) => [`slice_blk_${idx}`, () => [seg.markdown]]))
          })
        });
      }

      globalThis._lunoSpaHostContext = {
        activeProject: null,
        hashPrefix: 'composed/',
        onNavigateHome: () => this.goToFrontPage(true)
      };

      this.reader = new DocumentReader({
        container: this.rootElement,
        brandTitle: `Composed: ${comp.name || 'Partial Page'}`,
        brandIcon: '🧩',
        dossierId: 'PortalComposed',
        disableEmptyHashFallback: true,
        pages: virtualPages,
        itemNotes: globalThis.CadPlanItemNotes || null,
        itemNotesClass: globalThis.CadPlanItemNotes || null,
        editorClass: globalThis.CadPlanDocumentEditor || null
      });

      await this.reader.init();

      if (typeof SidePanel !== 'undefined') {
        this.sidePanel = new SidePanel('left', 300, null);
        this.reader.options.sidePanel = this.sidePanel;
        this._populateDocSidePanel(virtualPages);
        if (window.innerWidth >= 860) this.sidePanel.open();
      }
    }

  _teardownActiveSubView() {
        if (typeof UniversalCommentsOverlay !== 'undefined' && this.rootElement) {
          const prevShell = this.rootElement.querySelector('.pt-root');
          if (prevShell) UniversalCommentsOverlay.detach(prevShell);
          UniversalCommentsOverlay.detach(this.rootElement);
        }
        if (this._assetObserver) {
          this._assetObserver.disconnect();
          this._assetObserver = null;
        }
        if (this.activeInPlaceApp && typeof this.activeInPlaceApp.destroy === 'function') {
          try { this.activeInPlaceApp.destroy(); } catch (e) {}
        }
        this.activeInPlaceApp = null;
        this.activeInPlaceProject = null;
        globalThis._lunoSpaHostContext = null;
        if (typeof LunoLoader !== 'undefined' && typeof LunoLoader.unloadSpaStyles === 'function') {
          LunoLoader.unloadSpaStyles();
        }
        this._teardownDocumentReader();
      }

  startCommentOnAnythingMode() {
      if (!this.aardvark) return;
      if (typeof PortalConstellationStage !== 'undefined' && PortalConstellationStage._activeStage) {
        PortalConstellationStage._activeStage.close(true);
      }

      const existingHud = document.getElementById('pt-comment-mode-hud');
      if (this.aardvark.isActive) {
        this.aardvark.deactivate();
        this.aardvark._preferredTab = 'note';
        existingHud?.remove();
        return;
      }

      this.aardvark._preferredTab = 'thread';
      this.aardvark.activate();
      if (this.aardvark.hudElement) {
        this.aardvark.hudElement.style.display = 'none';
      }

      existingHud?.remove();
      const hud = makeElement('div', {
        id: 'pt-comment-mode-hud',
        className: 'pt-comment-mode-hud',
        'data-aardvark-ignore': 'true'
      }, [
        makeElement('span', { style: { color: '#34d399', fontWeight: '800' } }, '💬 Comment on Anything:'),
        makeElement('span', { style: { color: '#cbd5e1' } }, 'Click any card, paragraph, or button to comment • [W] Wider • [N] Narrower'),
        makeElement('button', {
          className: 'pt-btn',
          style: { padding: '3px 10px', fontSize: '10.5px', color: '#f87171', borderColor: 'rgba(248,113,113,0.45)' },
          onclick: () => {
            this.aardvark?.deactivate();
            if (this.aardvark) this.aardvark._preferredTab = 'note';
            hud.remove();
          }
        }, '✓ Done')
      ]);
      document.body.appendChild(hud);
    }

  openPillarComments(pillar, triggerEl = null) {
      if (!pillar) return;
      if (typeof CadPlanItemNotes !== 'undefined' && typeof CadPlanItemNotes.openBlockNotesDialog === 'function') {
        const cardEl = triggerEl?.closest('.pt-card') || triggerEl;
        CadPlanItemNotes.openBlockNotesDialog(
          'frontpage',
          pillar.id,
          { name: 'Portal', [pillar.id]: () => [pillar.publicSummary] },
          () => {
            window.dispatchEvent(new CustomEvent('portal-comments-updated'));
          },
          { options: { dossierId: 'Portal' } },
          {
            defaultTab: 'thread',
            dossierId: 'Portal',
            targetElement: cardEl,
            locator: { key: pillar.id, textSnippet: pillar.publicSummary.slice(0, 120) }
          }
        );
      } else if (typeof PortalConstellationStage !== 'undefined') {
        PortalConstellationStage.openExpandedStage(this, {
          originEl: triggerEl,
          initialPillarId: pillar.id,
          initialTab: 'comments'
        });
      }
    }
}

globalThis.Portal = Portal;
if (typeof module !== 'undefined' && module.exports) module.exports = Portal;