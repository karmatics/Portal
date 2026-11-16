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

        this.env = env;
        this.rootElement = env.container;
        globalThis._portalInstance = this;
        globalThis._cadPlanInstance = this;

        document.documentElement.style.overflowY = 'auto';
        document.body.style.overflowY = 'auto';
        this.rootElement.style.width = '100%';
        this.rootElement.style.minHeight = '100vh';

        const docPages = ['spear_drawing', 'spear_economics', 'spear_accucad', 'luno', 'homesetup', 'career', 'financial', 'family', 'economics', 'visitor_keys'];
        const rawHash = (window.location.hash || '').replace(/^#\/?/, '').split('/')[0];
        if (rawHash === 'doc' || docPages.includes(rawHash)) {
          this.mode = 'document';
          if (docPages.includes(rawHash)) this.pendingDocPageId = rawHash;
        }

        this.refresh();
        return this;
      }
  refresh() {
    if (!this.rootElement) return;
    if (this.mode === 'document') {
      this._renderDocumentMode();
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
      this.rootElement.innerHTML = '';

      const shell = makeElement('div', { className: 'pt-root' });
      shell.appendChild(this._buildTopBar());

      const container = makeElement('main', { className: 'pt-container' });
      container.appendChild(this._buildHeroSection());
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
      }
    }

  _buildTopBar() {
      const isUnlocked = typeof SensitiveContextGate !== 'undefined' && SensitiveContextGate.isUnlocked();

      const btnTour = makeElement('button', {
        className: 'pt-btn pt-btn-cyan',
        onclick: () => PortalModals.openGuidedTourDialog(this)
      }, '✨ Guided Tour');
      this._bindGlowTip(btnTour, '4-step interactive walkthrough of the apps, reading, and verification tools');

      const btnKeys = makeElement('button', {
        className: 'pt-btn',
        onclick: () => PortalModals.openVisitorKeysDialog(this)
      }, '🔑 Keys & AI Export');
      this._bindGlowTip(btnKeys, 'Export clean Markdown & learn how to query this whole archive with any AI');

      const btnJson = makeElement('button', {
        className: 'pt-btn pt-btn-emerald',
        onclick: () => PortalModals.openSummaryJsonDialog()
      }, '⚙️ Summary JSON');
      this._bindGlowTip(btnJson, 'Scan live project files and generate a structured summaries.json bundle');

      const btnDoc = makeElement('button', {
        className: 'pt-btn',
        onclick: () => this.openInDocumentReader('spear_drawing')
      }, '📖 Document View');

      const btnInspect = makeElement('button', {
        className: 'pt-btn pt-btn-purple',
        onclick: () => {
          if (this.aardvark) this.aardvark.toggle();
        }
      }, '🔍 Inspect');

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
      }, isUnlocked ? '🔓 Sensitive Unlocked' : '🔒 Sensitive Context');

      return makeElement('header', { className: 'pt-topbar' }, [
        makeElement('div', { className: 'pt-brand', onclick: () => { this.activeCategory = 'all'; this.searchQuery = ''; this.refresh(); } }, [
          makeElement('span', { className: 'pt-brand-dot' }),
          makeElement('span', { className: 'pt-brand-title' }, 'ROB BROWN • LIVING PORTAL'),
          makeElement('span', { className: 'pt-brand-sub' }, 'Portal v1.1')
        ]),
        makeElement('div', { className: 'pt-actions' }, [btnTour, btnKeys, btnJson, btnDoc, btnInspect, btnGate])
      ]);
    }

  _buildHeroSection() {
        const left = makeElement('div', { style: { display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '14px' } }, [
          makeElement('div', {}, [
            makeElement('div', { className: 'pt-kicker' }, 'Rob Brown • Living Specification System, Luno AI Cockpit & Public Record'),
            makeElement('h1', { className: 'pt-hero-h1' }, 'Living Documents Built for People—and Large-Scale AI Collaboration.'),
            makeElement('p', { className: 'pt-hero-p' },
              'Every initiative here—my primary Luno code-generation & prompt workspace, the CadPlan 3D CAD specification & built-in AccuCAD app, the Kinetic Curve social-media markup studio, the Economics of Automation essay, and my patent, valuation, and personal stability records—shares a single living format. It is built so any reader can inspect my work directly, and just as importantly, export massive, structured prompts into ChatGPT, Claude, or Gemini to organize life, steer career strategy, and generate or modify software.'
            )
          ]),
          makeElement('div', { className: 'pt-hero-keys-strip' }, [
            makeElement('a', { href: PortalData.resolveAppUrl('CadPlan'), target: '_blank', rel: 'noopener noreferrer', className: 'pt-btn pt-btn-cyan' }, '📐 CadPlan (Spec + 3D App) ↗'),
            makeElement('a', { href: PortalData.resolveAppUrl('Luno'), target: '_blank', rel: 'noopener noreferrer', className: 'pt-btn' }, '🌙 Luno AI Cockpit ↗'),
            makeElement('a', { href: PortalData.resolveAppUrl('QuoraToys'), target: '_blank', rel: 'noopener noreferrer', className: 'pt-btn pt-btn-purple' }, '〰️ Kinetic Curve Studio ↗'),
            makeElement('a', { href: PortalData.resolveAppUrl('accuCad'), target: '_blank', rel: 'noopener noreferrer', className: 'pt-btn' }, '🚀 AccuCAD 3D ↗'),
            makeElement('a', { href: PortalData.resolveAppUrl('EconomicsOfAutomation'), target: '_blank', rel: 'noopener noreferrer', className: 'pt-btn pt-btn-emerald' }, '🤖 Economics Essay ↗'),
            makeElement('button', { className: 'pt-btn', onclick: () => PortalModals.openGuidedTourDialog(this) }, '✨ System Tour')
          ])
        ]);

        const right = makeElement('div', { className: 'pt-constellation-box' }, [
          makeElement('div', { className: 'pt-visual-tabs' }, [
            makeElement('span', { style: { fontFamily: 'var(--pt-mono)', fontSize: '11px', fontWeight: '800', color: '#00f2fe' } }, '🕸️ Ecosystem Constellation Map'),
            makeElement('span', { style: { fontFamily: 'var(--pt-mono)', fontSize: '10px', color: '#94a3b8' } }, 'Click any node to inspect')
          ]),
          makeElement('div', { style: { flex: '1', display: 'flex', alignItems: 'center' } }, [
            this._buildConstellationSvg()
          ])
        ]);

        return makeElement('section', { className: 'pt-hero', 'data-block-id': 'portal_hero' }, [left, right]);
      }

  _buildConstellationSvg() {
        const svg = makeElement('svg:svg', {
          viewBox: '0 0 460 232',
          width: '100%',
          height: '216px',
          style: { display: 'block' }
        });

        const defs = makeElement('svg:defs', {}, [
          makeElement('svg:filter', { id: 'pt-glow' }, [
            makeElement('svg:feGaussianBlur', { stdDeviation: '3', result: 'blur' }),
            makeElement('svg:feMerge', {}, [
              makeElement('svg:feMergeNode', { in: 'blur' }),
              makeElement('svg:feMergeNode', { in: 'SourceGraphic' })
            ])
          ])
        ]);
        svg.appendChild(defs);

        const nodes = [
          { id: 'cadplan_spec', x: 230, y: 20, label: '📐 CadPlan Spec', col: '#00f2fe' },
          { id: 'curve_drawing_spear', x: 62, y: 36, label: '〰️ Curve Studio', col: '#c084fc' },
          { id: 'luno', x: 398, y: 36, label: '🌙 Luno Core', col: '#00f2fe' },
          { id: 'accucad_live', x: 60, y: 94, label: '🚀 AccuCAD 3D', col: '#38bdf8' },
          { id: 'economics_spear', x: 400, y: 94, label: '🤖 Econ Essay', col: '#34d399' },
          { id: 'career', x: 62, y: 152, label: '📜 Patents', col: '#60a5fa' },
          { id: 'homesetup', x: 398, y: 152, label: '🖥️ HomeSetup', col: '#10b981' },
          { id: 'financial', x: 132, y: 206, label: '📊 Valuation', col: '#f59e0b' },
          { id: 'family', x: 328, y: 206, label: '⚖️ Family/Ctx', col: '#c084fc' }
        ];

        const cx = 230, cy = 116;
        nodes.forEach(n => {
          svg.appendChild(makeElement('svg:line', {
            x1: cx, y1: cy, x2: n.x, y2: n.y,
            stroke: n.col, 'stroke-width': '1.4', 'stroke-dasharray': '4,3', opacity: '0.65'
          }));
        });

        const centerG = makeElement('svg:g', { transform: `translate(${cx - 50}, ${cy - 18})`, style: { cursor: 'pointer' } });
        centerG.appendChild(makeElement('svg:rect', {
          width: '100', height: '36', rx: '18', fill: '#082f49', stroke: '#00f2fe', 'stroke-width': '1.6', filter: 'url(#pt-glow)'
        }));
        centerG.appendChild(makeElement('svg:text', {
          x: '50', y: '22', fill: '#00f2fe', 'font-family': 'monospace', 'font-size': '10', 'font-weight': 'bold', 'text-anchor': 'middle'
        }, 'LUNO • PORTAL'));
        centerG.onclick = () => PortalModals.openGuidedTourDialog(this);
        svg.appendChild(centerG);

        nodes.forEach(n => {
          const g = makeElement('svg:g', { transform: `translate(${n.x - 56}, ${n.y - 13})`, style: { cursor: 'pointer' } });
          g.appendChild(makeElement('svg:rect', {
            width: '112', height: '26', rx: '7', fill: '#0b101b', stroke: n.col, 'stroke-width': '1.3'
          }));
          g.appendChild(makeElement('svg:text', {
            x: '56', y: '17', fill: '#f8fafc', 'font-family': 'monospace', 'font-size': '9.5', 'font-weight': 'bold', 'text-anchor': 'middle'
          }, n.label));
          g.onclick = () => {
            const pillar = PortalData.getPillars().find(p => p.id === n.id);
            if (pillar) PortalModals.openPillarDialog(pillar, this);
          };
          svg.appendChild(g);
        });

        return svg;
      }

  _buildKeysBanner() {
      return makeElement('section', { className: 'pt-keys-panel', 'data-block-id': 'portal_keys_banner' }, [
        makeElement('div', { style: { flex: '1 1 460px' } }, [
          makeElement('strong', { style: { color: '#34d399', fontFamily: 'var(--pt-mono)', fontSize: '12.5px', display: 'block', marginBottom: '4px' } },
            '🧠 DUAL-PURPOSE LIVING DOCUMENTS: HUMAN CLARITY + LARGE-SCALE LLM PROMPTS'
          ),
          makeElement('div', { style: { fontSize: '13px', color: '#cbd5e1', lineHeight: '1.55' } },
            'Beyond reading in the browser, the core purpose of this living document architecture (built on my Luno code-generation system) is generating huge, structured prompts for ChatGPT, Claude, or Gemini—allowing me to organize my life, map my career direction, and let AI agents inspect, alter, or port software cleanly via `Export MD`, `Summary JSON`, and `Inspect`.'
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
              navigator.clipboard?.writeText(md).then(() => alert('✓ Copied full Markdown briefing to clipboard!'));
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
        placeholder: '🔍 Filter initiatives, apps, patents, repos (e.g. AccuCAD, DrawingApp, Economics, Luno)...',
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
        }, `🚀 Open App ↗`),
        makeElement('div', { style: { display: 'flex', gap: '6px' } }, [
          makeElement('button', {
            className: 'pt-btn',
            style: { fontSize: '11px', padding: '4px 9px' },
            onclick: () => PortalModals.openPillarDialog(p, this)
          }, '🔍 Details'),
          makeElement('button', {
            className: 'pt-btn',
            style: { fontSize: '11px', padding: '4px 9px' },
            onclick: () => this.openInDocumentReader(p.docPageId)
          }, '📖 Chapter')
        ])
      ]));

      return card;
    }
  async openInDocumentReader(pageId = 'luno') {
    this.mode = 'document';
    this.pendingDocPageId = pageId;
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
        brandTitle: 'Portal • Integrated Document View',
        brandIcon: '🏛️',
        dossierId: 'Portal',
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
        onclick: () => { this.mode = 'frontpage'; this.refresh(); }
      }, '🖥️ Front Page Interface'));

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
    if (this.sidePanel) {
      this.sidePanel.destroy();
      this.sidePanel = null;
    }
    if (this.reader && typeof this.reader.destroy === 'function') {
      try { this.reader.destroy(); } catch (e) {}
      this.reader = null;
    }
  }

  destroy() {
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
          onclick: () => {
            this.mode = 'frontpage';
            this.refresh();
          }
        }, '🖥️ Front Page')
      ]);
      this.rootElement.appendChild(bar);
    }

  _buildLiveCurveToy() {
        return this._buildConstellationSvg();
      }

  _buildQuickDoors() {
        const doors = [
          {
            title: '📐 CadPlan: Executable Spec + Built-In 3D App',
            desc: 'Built on my AccuDraw & SmartLine heritage (US Patent #5,754,182). Combines full architecture prose, code, and live 3D WebGL viewports inside the document so AI agents can insert AccuDraw into open-source AutoCAD & MicroStation clones.',
            col: '#00f2fe',
            btnText: 'Open CadPlan (Spec + App) ↗',
            url: PortalData.resolveAppUrl('CadPlan')
          },
          {
            title: '🌙 Luno: Code Generator & LLM Prompt Engine',
            desc: 'My primary initiative: turns living documents into very large, structured prompts for ChatGPT, Claude, or Gemini and compiles AI code patches directly into apps—powering both software creation and personal/career organization.',
            col: '#38bdf8',
            btnText: 'Open Luno Workspace ↗',
            url: PortalData.resolveAppUrl('Luno')
          },
          {
            title: '〰️ Kinetic Curve & Image Markup Studio',
            desc: 'Easy visual markup for social media using kinetic string-tether smoothing, point pulling, and instant text callouts—plus modular code designed to be altered and customized effortlessly inside Luno.',
            col: '#c084fc',
            btnText: 'Launch Curve Studio ↗',
            url: PortalData.resolveAppUrl('QuoraToys')
          },
          {
            title: '🚀 AccuCAD 3D Workstation',
            desc: 'Standalone Three.js 3D drafting app demonstrating the AccuDraw kinetic compass, direction cosines, and tentative snapping live in the browser as a clean reference for AI agents and CAD users.',
            col: '#10b981',
            btnText: 'Open AccuCAD 3D ↗',
            url: PortalData.resolveAppUrl('accuCad')
          }
        ];

        return makeElement('section', {
          className: 'pt-doors-grid',
          'data-block-id': 'portal_quick_doors',
          style: { gridTemplateColumns: 'repeat(auto-fit, minmax(245px, 1fr))' }
        },
          doors.map(d => makeElement('div', {
            className: 'pt-door-card',
            style: { borderTop: `3px solid ${d.col}`, boxShadow: `0 8px 24px rgba(0,0,0,0.4), 0 0 14px ${d.col}12` }
          }, [
            makeElement('div', {}, [
              makeElement('strong', { style: { color: '#f8fafc', fontSize: '13.5px', display: 'block', marginBottom: '4px' } }, d.title),
              makeElement('div', { style: { fontSize: '12.5px', color: '#94a3b8', lineHeight: '1.5' } }, d.desc)
            ]),
            makeElement('a', {
              href: d.url,
              target: '_blank',
              rel: 'noopener noreferrer',
              className: 'pt-btn',
              style: { alignSelf: 'flex-start', borderColor: `${d.col}66`, color: d.col }
            }, d.btnText)
          ]))
        );
      }
}

globalThis.Portal = Portal;
if (typeof module !== 'undefined' && module.exports) module.exports = Portal;