class PortalModals {
  static _makeDialogBox(title, w, h, innerEl, onClose = null) {
    const outer = makeElement('div', {
      style: {
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        height: '100%',
        color: '#e2e8f0',
        fontFamily: 'var(--pt-sans, system-ui, sans-serif)',
        boxSizing: 'border-box'
      }
    });
    outer.appendChild(innerEl);

    const dlgW = Math.min(w, window.innerWidth - 24);
    const dlgH = Math.min(h, window.innerHeight - 36);
    const dlg = UITools.makeDialog({
      title,
      size: [dlgW, dlgH],
      position: [Math.max(12, Math.floor((window.innerWidth - dlgW) / 2)), Math.max(18, Math.floor((window.innerHeight - dlgH) / 2))],
      contentElement: outer,
      appendTo: document.body,
      onClose
    });

    if (dlg && dlg.element) {
      dlg.element.style.backgroundColor = '#080c16';
      dlg.element.style.border = '1.5px solid #00f2fe';
      dlg.element.style.boxShadow = '0 24px 60px rgba(0,0,0,0.85), 0 0 28px rgba(0, 242, 254, 0.22)';
    }
    return dlg;
  }

  static openPillarDialog(pillar, portalApp) {
      const isUnlocked = typeof SensitiveContextGate !== 'undefined' && SensitiveContextGate.isUnlocked();
      const body = makeElement('div', {
        style: { display: 'flex', flexDirection: 'column', gap: '14px', padding: '4px' }
      });

      const head = makeElement('div', {
        style: {
          borderLeft: `4px solid ${pillar.accent}`,
          paddingLeft: '14px',
          display: 'flex',
          flexDirection: 'column',
          gap: '4px'
        }
      }, [
        makeElement('span', { style: { fontFamily: 'var(--pt-mono)', fontSize: '10.5px', fontWeight: '800', color: pillar.accent } }, pillar.badge),
        makeElement('h2', { style: { fontSize: '1.3rem', fontWeight: '800', color: '#f8fafc', margin: 0 } }, `${pillar.icon} ${pillar.name}`),
        makeElement('div', { style: { fontSize: '12.5px', color: '#94a3b8' } }, pillar.subtitle)
      ]);

      const summaryBox = makeElement('div', {
        style: {
          backgroundColor: '#0c1322',
          border: '1px solid #1e293b',
          borderRadius: '8px',
          padding: '14px 16px',
          fontSize: '13.5px',
          lineHeight: '1.65',
          color: '#e2e8f0'
        }
      }, pillar.publicSummary);

      const calmBanner = makeElement('div', {
        style: {
          backgroundColor: '#07121c',
          border: '1px solid rgba(56, 189, 248, 0.28)',
          borderRadius: '8px',
          padding: '10px 14px',
          fontSize: '12px',
          color: '#94a3b8',
          lineHeight: '1.5'
        }
      }, `💡 ${pillar.calmNote}`);

      body.append(head, summaryBox, calmBanner);

      if (pillar.sensitiveSummary) {
        if (isUnlocked) {
          body.appendChild(makeElement('div', {
            style: {
              backgroundColor: '#130e24',
              border: '1px solid rgba(192, 132, 252, 0.45)',
              borderRadius: '8px',
              padding: '12px 14px',
              fontSize: '12.5px',
              lineHeight: '1.6',
              color: '#e9d5ff'
            }
          }, [
            makeElement('strong', { style: { display: 'block', color: '#d8b4fe', marginBottom: '4px', fontSize: '11px', fontFamily: 'var(--pt-mono)' } }, '🔓 SENSITIVE FAMILY CONTEXT (UNLOCKED):'),
            pillar.sensitiveSummary
          ]));
        } else if (typeof SensitiveContextGate !== 'undefined') {
          body.appendChild(SensitiveContextGate.renderLockedBlock(
            { id: 'modal_sensitive_family', sensitiveLabel: 'Sensitive Family Context' },
            () => {
              dlg.close();
              PortalModals.openPillarDialog(pillar, portalApp);
              if (portalApp) portalApp.refresh();
            }
          ));
        }
      }

      const metaGrid = makeElement('div', {
        style: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '10px' }
      });

      const filesCard = makeElement('div', {
        style: { backgroundColor: '#05080f', border: '1px solid #1e293b', borderRadius: '8px', padding: '10px 12px' }
      }, [
        makeElement('div', { style: { fontSize: '10.5px', fontFamily: 'var(--pt-mono)', color: '#38bdf8', fontWeight: 'bold', marginBottom: '6px' } }, '📁 PRIMARY SOURCE FILES:'),
        ...pillar.targetFiles.map(f => makeElement('div', { style: { fontSize: '11px', fontFamily: 'var(--pt-mono)', color: '#cbd5e1', padding: '2px 0' } }, `• ${f}`))
      ]);

      const linksCard = makeElement('div', {
        style: { backgroundColor: '#05080f', border: '1px solid #1e293b', borderRadius: '8px', padding: '10px 12px' }
      }, [
        makeElement('div', { style: { fontSize: '10.5px', fontFamily: 'var(--pt-mono)', color: '#10b981', fontWeight: 'bold', marginBottom: '6px' } }, '🔗 CONNECTED DOSSIERS:'),
        makeElement('div', { style: { display: 'flex', flexWrap: 'wrap', gap: '6px' } },
          (pillar.crossLinks || []).map(cl => makeElement('button', {
            className: 'pt-btn',
            style: { fontSize: '10.5px', padding: '4px 8px' },
            onclick: () => {
              const target = PortalData.getPillars().find(p => p.id === cl.targetId);
              if (target) {
                dlg.close();
                PortalModals.openPillarDialog(target, portalApp);
              }
            }
          }, `→ ${cl.label}`))
        )
      ]);

      metaGrid.append(filesCard, linksCard);
      body.appendChild(metaGrid);

      const footer = makeElement('div', {
        style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px', paddingTop: '10px', borderTop: '1px solid #1e293b' }
      }, [
        makeElement('div', { style: { display: 'flex', gap: '6px', flexWrap: 'wrap' } }, [
          makeElement('a', { href: pillar.url, target: '_blank', rel: 'noopener noreferrer', className: 'pt-btn pt-btn-cyan' }, `↗ Open ${pillar.name}`),
          ...(pillar.extraLinks || []).map(el => makeElement('a', { href: el.url, target: '_blank', rel: 'noopener noreferrer', className: 'pt-btn' }, `↗ ${el.label}`))
        ]),
        makeElement('div', { style: { display: 'flex', gap: '6px' } }, [
          makeElement('button', {
            className: 'pt-btn pt-btn-emerald',
            onclick: () => {
              if (portalApp) {
                dlg.close();
                portalApp.openInDocumentReader(pillar.docPageId);
              }
            }
          }, '📖 Open in Doc Reader'),
          makeElement('button', {
            className: 'pt-btn',
            onclick: () => {
              const md = PortalSummaryEngine.buildVisitorAiBriefing(null, { selectedIds: [pillar.id] });
              navigator.clipboard?.writeText(md).then(() => alert(`✓ Copied AI Briefing for [${pillar.name}] to clipboard!`));
            }
          }, '📋 Copy AI Summary')
        ])
      ]);
      body.appendChild(footer);

      const dlg = this._makeDialogBox(`${pillar.icon} ${pillar.name} — Deep-Dive Inspector`, 700, 560, body);
      return dlg;
    }
  static openVisitorKeysDialog(portalApp) {
    const body = makeElement('div', {
      style: { display: 'flex', flexDirection: 'column', gap: '14px', padding: '4px' }
    });

    body.appendChild(makeElement('div', {
      style: { backgroundColor: '#0c1322', border: '1px solid rgba(0, 242, 254, 0.35)', borderRadius: '8px', padding: '14px 16px' }
    }, [
      makeElement('strong', { style: { color: '#00f2fe', fontSize: '13.5px', display: 'block', marginBottom: '6px' } }, '🔑 Giving Every Visitor the Keys to This Documentation'),
      makeElement('p', { style: { fontSize: '13px', lineHeight: '1.6', color: '#cbd5e1', margin: 0 } },
        'Whether you are a friend, technical collaborator, journalist, or legal counsel reviewing my record, you can export clean Markdown directly into ChatGPT, Claude, or Gemini to ask questions, verify claims, or help organize next steps.'
      )
    ]));

    const steps = [
      {
        title: '1. Copy Complete Multi-Domain AI Briefing',
        desc: 'Compiles calm, factual summaries of Luno, HomeSetup, Career/AccuDraw, Financial Valuation, Family Status, and Economics into a single clipboard prompt.',
        btnText: '📋 Copy Complete AI Briefing',
        btnCls: 'pt-btn pt-btn-cyan',
        action: async () => {
          const sumJson = await PortalSummaryEngine.generateSummaries(null, {
            includeSensitive: typeof SensitiveContextGate !== 'undefined' && SensitiveContextGate.isUnlocked()
          });
          const md = PortalSummaryEngine.buildVisitorAiBriefing(sumJson);
          await navigator.clipboard.writeText(md);
          alert('✓ Copied complete AI briefing to clipboard! Paste it into any AI assistant.');
        }
      },
      {
        title: '2. Run the Blind Unprimed Google Search Verification',
        desc: 'Copies a neutral search prompt that never mentions Rob Brown’s name, letting you verify the US Patent #5,754,182 attribution and Bentley Systems valuation independently.',
        btnText: '🔎 Copy Unprimed Search Prompt',
        btnCls: 'pt-btn pt-btn-amber',
        action: async () => {
          await navigator.clipboard.writeText(PortalData.getUnprimedVerificationPrompt());
          alert('✓ Copied unprimed search prompt! Open an incognito window on Google or Gemini and paste it.');
        }
      },
      {
        title: '3. Open Integrated Document Reader & Export MD',
        desc: 'Switches into full DocumentReader mode with SidePanel chapters, in-situ Aardvark element inspection, note attachment, and full Markdown export.',
        btnText: '📖 Enter Document Mode',
        btnCls: 'pt-btn pt-btn-emerald',
        action: () => {
          dlg.close();
          if (portalApp) portalApp.openInDocumentReader('frontpage');
        }
      }
    ];

    steps.forEach(s => {
      body.appendChild(makeElement('div', {
        style: {
          backgroundColor: '#070b14',
          border: '1px solid #1e293b',
          borderRadius: '8px',
          padding: '12px 14px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '12px',
          flexWrap: 'wrap'
        }
      }, [
        makeElement('div', { style: { flex: '1 1 280px' } }, [
          makeElement('strong', { style: { color: '#f8fafc', fontSize: '13px', display: 'block', marginBottom: '3px' } }, s.title),
          makeElement('div', { style: { color: '#94a3b8', fontSize: '12px', lineHeight: '1.45' } }, s.desc)
        ]),
        makeElement('button', { className: s.btnCls, onclick: s.action }, s.btnText)
      ]));
    });

    const dlg = this._makeDialogBox('🔑 Keys to the System — Visitor & AI Export Guide', 680, 520, body);
    return dlg;
  }

  static async openSummaryJsonDialog() {
    const body = makeElement('div', {
      style: { display: 'flex', flexDirection: 'column', gap: '10px', height: '100%' }
    });

    const statusBar = makeElement('div', {
      style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '11.5px', fontFamily: 'var(--pt-mono)', color: '#00f2fe', flexWrap: 'wrap', gap: '8px' }
    }, [
      makeElement('span', {}, '⚡ Scanning workspace manifests & summary modules...'),
      makeElement('span', { style: { color: '#10b981' } }, 'JSON Generator Active')
    ]);

    const jsonBox = makeElement('textarea', {
      spellcheck: 'false',
      style: {
        flex: '1',
        minHeight: '320px',
        width: '100%',
        backgroundColor: '#04070d',
        color: '#7ee787',
        border: '1px solid #1e293b',
        borderRadius: '8px',
        padding: '12px',
        fontFamily: 'var(--pt-mono)',
        fontSize: '11.5px',
        lineHeight: '1.5',
        resize: 'vertical',
        outline: 'none'
      }
    });
    jsonBox.value = '// Scanning target files...';

    const btnSaveDisk = makeElement('button', { className: 'pt-btn pt-btn-emerald' }, '💾 Save Portal/state/summaries.json');
    const btnDownload = makeElement('button', { className: 'pt-btn' }, '⬇️ Download .json');
    const btnCopy = makeElement('button', { className: 'pt-btn pt-btn-cyan' }, '📋 Copy JSON');

    const footer = makeElement('div', {
      style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }
    }, [
      makeElement('span', { style: { fontSize: '11px', color: '#94a3b8' } }, 'Reads live luno.json & Summaries modules across sibling apps.'),
      makeElement('div', { style: { display: 'flex', gap: '6px', flexWrap: 'wrap' } }, [btnSaveDisk, btnDownload, btnCopy])
    ]);

    body.append(statusBar, jsonBox, footer);
    this._makeDialogBox('⚙️ Live Summary JSON Generator', 760, 560, body);

    const includeSensitive = typeof SensitiveContextGate !== 'undefined' && SensitiveContextGate.isUnlocked();
    const result = await PortalSummaryEngine.generateSummaries(null, { includeSensitive });
    const formatted = JSON.stringify(result, null, 2);
    jsonBox.value = formatted;

    const okCount = result.scannedFiles.filter(f => f.fetched).length;
    statusBar.firstChild.textContent = `✓ Scanned ${result.scannedFileCount} target files (${okCount} live reads across ${result.projectCount} projects)`;

    btnCopy.onclick = () => {
      navigator.clipboard?.writeText(jsonBox.value).then(() => {
        btnCopy.textContent = '✓ Copied!';
        setTimeout(() => { btnCopy.textContent = '📋 Copy JSON'; }, 1800);
      });
    };

    btnDownload.onclick = () => {
      const blob = new Blob([jsonBox.value], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = makeElement('a', { href: url, download: 'summaries.json' });
      a.click();
      URL.revokeObjectURL(url);
    };

    btnSaveDisk.onclick = async () => {
      const r = await PortalSummaryEngine.saveSummariesToWorkspace(jsonBox.value);
      if (r && r.success) {
        alert('✓ Saved live output to Portal/state/summaries.json!');
      } else {
        alert(`Notice: Could not write to local server (${r?.error || 'static mode'}). Use Download .json or Copy JSON instead.`);
      }
    };
  }

  static openGuidedTourDialog(portalApp) {
      let step = 0;
      const steps = [
        {
          title: '1. Welcome — What This Whole System Is',
          accent: '#00f2fe',
          body: 'This is a live, self-documenting software workspace and public archive. Instead of scattered links or static PDFs, every initiative, technical specification, and personal record lives as an interactive web application powered by Luno.',
          actions: [
            { label: '⚙️ Generate Live summaries.json', cls: 'pt-btn pt-btn-emerald', fn: () => PortalModals.openSummaryJsonDialog() }
          ]
        },
        {
          title: '2. Two Public "Tip of the Spear" Initiatives',
          accent: '#34d399',
          body: 'Start with whichever entry point fits you best: try the free Kinetic Curve & Image Markup Studio (an intuitive Pen-tool replacement where you Ctrl+V paste an image, draw smooth curves/arrows/text, and copy straight to social media—in the accessible spirit of Aardvark), or read Economics of Automation (plain-English visual essays and simulators for everyday readers).',
          actions: [
            { label: '〰️ Open Curve & Markup Studio ↗', cls: 'pt-btn pt-btn-cyan', url: PortalData.resolveAppUrl('QuoraToys') },
            { label: '🤖 Read Economics of Automation ↗', cls: 'pt-btn pt-btn-emerald', url: PortalData.resolveAppUrl('EconomicsOfAutomation') }
          ]
        },
        {
          title: '3. Precision 3D CAD & Patent Track Record',
          accent: '#38bdf8',
          body: 'Launch AccuCAD 3D right in your browser to see precision WebGL drafting, kinetic compass locks, and tentative snapping—or review the 30-year US Patent #5,754,182 historical archive and independent valuation models.',
          actions: [
            { label: '📐 Launch AccuCAD 3D ↗', cls: 'pt-btn pt-btn-cyan', url: PortalData.resolveAppUrl('accuCad') },
            { label: '📊 View Valuation Model ↗', cls: 'pt-btn pt-btn-amber', url: PortalData.resolveAppUrl('ValuationOfAccudraw') }
          ]
        },
        {
          title: '4. Inspect Everything & Export to Any AI',
          accent: '#c084fc',
          body: 'Nothing here asks you to take claims on faith. You can export the entire documentation set into ChatGPT, Claude, or Gemini, inspect any page element with Aardvark, or copy an unprimed Google Search prompt to verify the patent and valuation record yourself.',
          actions: [
            { label: '🔑 Open Keys & AI Export', cls: 'pt-btn pt-btn-purple', fn: () => { dlg.close(); PortalModals.openVisitorKeysDialog(portalApp); } },
            { label: '📖 Open Document View', cls: 'pt-btn', fn: () => { dlg.close(); if (portalApp) portalApp.openInDocumentReader('spear_drawing'); } }
          ]
        }
      ];

      const wrap = makeElement('div', {
        style: { display: 'flex', flexDirection: 'column', gap: '14px', padding: '4px', height: '100%' }
      });
      const stepHost = makeElement('div', { style: { flex: '1', display: 'flex', flexDirection: 'column', gap: '12px' } });
      const navFooter = makeElement('div', {
        style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '10px', borderTop: '1px solid #1e293b' }
      });

      const renderStep = () => {
        const s = steps[step];
        stepHost.innerHTML = '';
        stepHost.appendChild(makeElement('div', {
          style: { borderLeft: `4px solid ${s.accent}`, paddingLeft: '12px' }
        }, [
          makeElement('div', { style: { fontFamily: 'var(--pt-mono)', fontSize: '10.5px', color: s.accent, fontWeight: 'bold' } }, `STEP ${step + 1} OF ${steps.length}`),
          makeElement('h3', { style: { fontSize: '1.2rem', fontWeight: '800', color: '#f8fafc', margin: '4px 0 0 0' } }, s.title)
        ]));

        stepHost.appendChild(makeElement('div', {
          style: { backgroundColor: '#0c1322', border: '1px solid #1e293b', borderRadius: '8px', padding: '14px 16px', fontSize: '13.5px', lineHeight: '1.65', color: '#cbd5e1' }
        }, s.body));

        stepHost.appendChild(makeElement('div', { style: { display: 'flex', gap: '8px', flexWrap: 'wrap' } },
          s.actions.map(a => a.url
            ? makeElement('a', { href: a.url, target: '_blank', rel: 'noopener noreferrer', className: a.cls }, a.label)
            : makeElement('button', { className: a.cls, onclick: a.fn }, a.label)
          )
        ));

        navFooter.innerHTML = '';
        navFooter.append(
          makeElement('button', {
            className: 'pt-btn',
            disabled: step === 0,
            style: { opacity: step === 0 ? '0.45' : '1' },
            onclick: () => { if (step > 0) { step--; renderStep(); } }
          }, '◀ Previous'),
          makeElement('div', { style: { display: 'flex', gap: '6px' } },
            steps.map((_, i) => makeElement('span', {
              style: {
                width: '8px', height: '8px', borderRadius: '50%', cursor: 'pointer',
                backgroundColor: i === step ? '#00f2fe' : '#334155',
                boxShadow: i === step ? '0 0 8px #00f2fe' : 'none'
              },
              onclick: () => { step = i; renderStep(); }
            }))
          ),
          step < steps.length - 1
            ? makeElement('button', { className: 'pt-btn pt-btn-cyan', onclick: () => { step++; renderStep(); } }, 'Next ▶')
            : makeElement('button', { className: 'pt-btn pt-btn-emerald', onclick: () => dlg.close() }, '✓ Start Exploring')
        );
      };

      wrap.append(stepHost, navFooter);
      const dlg = this._makeDialogBox('✨ Welcome — Guided Tour of Rob Brown’s Portal', 640, 390, wrap);
      renderStep();
      return dlg;
    }
}

globalThis.PortalModals = PortalModals;
if (typeof module !== 'undefined' && module.exports) module.exports = PortalModals;