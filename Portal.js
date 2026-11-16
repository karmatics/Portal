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
      this.heroVisualTab = this.heroVisualTab || 'curve';
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
      const left = makeElement('div', { style: { display: 'flex', flexDirection: 'column', justifyContent: 'space-between' } }, [
        makeElement('div', {}, [
          makeElement('div', { className: 'pt-kicker' }, 'Rob Brown • Public Workspace & Living Archive'),
          makeElement('h1', { className: 'pt-hero-h1' }, 'Welcome — Live Tools, Original Engineering, and an Open Book.'),
          makeElement('p', { className: 'pt-hero-p' },
            'Everything I am building and documenting connects right here: a free Kinetic Curve & Image Markup Studio (rethinking the Illustrator Pen tool for instant web use), the Economics of Automation visual essay for everyday readers, my 3D AccuCAD & AccuDraw engineering record, the Luno AI cockpit behind it all, and an open personal overview.'
          )
        ]),
        makeElement('div', { className: 'pt-hero-keys-strip' }, [
          makeElement('button', { className: 'pt-btn pt-btn-cyan', onclick: () => PortalModals.openGuidedTourDialog(this) }, '✨ Take a 4-Step Tour'),
          makeElement('a', { href: PortalData.resolveAppUrl('QuoraToys'), target: '_blank', rel: 'noopener noreferrer', className: 'pt-btn pt-btn-purple' }, '〰️ Launch Curve & Markup App ↗'),
          makeElement('a', { href: PortalData.resolveAppUrl('accuCad'), target: '_blank', rel: 'noopener noreferrer', className: 'pt-btn' }, '📐 Launch AccuCAD 3D ↗'),
          makeElement('a', { href: PortalData.resolveAppUrl('EconomicsOfAutomation'), target: '_blank', rel: 'noopener noreferrer', className: 'pt-btn pt-btn-emerald' }, '🤖 Read Economics Essay ↗')
        ])
      ]);

      const tabCurve = makeElement('button', {
        className: `pt-visual-tab-btn ${this.heroVisualTab === 'curve' ? 'active' : ''}`,
        onclick: () => { this.heroVisualTab = 'curve'; renderVisual(); }
      }, '〰️ Live Curve Sandbox');

      const tabMap = makeElement('button', {
        className: `pt-visual-tab-btn ${this.heroVisualTab === 'map' ? 'active' : ''}`,
        onclick: () => { this.heroVisualTab = 'map'; renderVisual(); }
      }, '🕸️ Ecosystem Map');

      const visualStage = makeElement('div', { style: { flex: '1' } });
      const renderVisual = () => {
        tabCurve.classList.toggle('active', this.heroVisualTab === 'curve');
        tabMap.classList.toggle('active', this.heroVisualTab === 'map');
        visualStage.innerHTML = '';
        visualStage.appendChild(
          this.heroVisualTab === 'curve' ? this._buildLiveCurveToy() : this._buildConstellationSvg()
        );
      };
      renderVisual();

      const right = makeElement('div', { className: 'pt-constellation-box' }, [
        makeElement('div', { className: 'pt-visual-tabs' }, [
          makeElement('div', { style: { display: 'flex', gap: '4px' } }, [tabCurve, tabMap]),
          makeElement('span', { style: { fontFamily: 'var(--pt-mono)', fontSize: '10px', color: '#64748b' } }, 'Interactive')
        ]),
        visualStage
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
        { id: 'curve_drawing_spear', x: 78, y: 30, label: '〰️ Curve Studio', col: '#00f2fe' },
        { id: 'economics_spear', x: 382, y: 30, label: '🤖 Econ Essay', col: '#34d399' },
        { id: 'accucad_live', x: 64, y: 94, label: '📐 AccuCAD 3D', col: '#38bdf8' },
        { id: 'luno', x: 396, y: 94, label: '🌙 Luno', col: '#38bdf8' },
        { id: 'career', x: 64, y: 158, label: '📜 Patents', col: '#60a5fa' },
        { id: 'homesetup', x: 396, y: 158, label: '🖥️ HomeSetup', col: '#10b981' },
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

      const centerG = makeElement('svg:g', { transform: `translate(${cx - 46}, ${cy - 18})`, style: { cursor: 'pointer' } });
      centerG.appendChild(makeElement('svg:rect', {
        width: '92', height: '36', rx: '18', fill: '#082f49', stroke: '#00f2fe', 'stroke-width': '1.6', filter: 'url(#pt-glow)'
      }));
      centerG.appendChild(makeElement('svg:text', {
        x: '46', y: '22', fill: '#00f2fe', 'font-family': 'monospace', 'font-size': '10.5', 'font-weight': 'bold', 'text-anchor': 'middle'
      }, 'PORTAL HUB'));
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
      makeElement('div', { style: { flex: '1 1 420px' } }, [
        makeElement('strong', { style: { color: '#34d399', fontFamily: 'var(--pt-mono)', fontSize: '12.5px', display: 'block', marginBottom: '4px' } },
          '🤝 OPEN TRANSPARENCY & AI EXPORT TOOLS'
        ),
        makeElement('div', { style: { fontSize: '13px', color: '#cbd5e1', lineHeight: '1.5' } },
          'New to this system? Every summary below links to full interactive documents you can export as Markdown (`Export MD`), inspect in-situ (`Inspect`), or query independently with any AI model.'
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
        { id: 'spear_accucad', num: '3', label: 'AccuCAD 3D Workstation', col: '#38bdf8' },
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
      const pts = [
        { x: 44, y: 186, col: '#00f2fe', label: 'P0' },
        { x: 145, y: 38, col: '#38bdf8', label: 'H1' },
        { x: 315, y: 212, col: '#c084fc', label: 'H2' },
        { x: 416, y: 64, col: '#34d399', label: 'P1' }
      ];

      const wrap = makeElement('div', { style: { display: 'flex', flexDirection: 'column', gap: '6px' } });
      const svg = makeElement('svg:svg', {
        viewBox: '0 0 460 232',
        width: '100%',
        height: '216px',
        style: { display: 'block', touchAction: 'none', userSelect: 'none', cursor: 'crosshair' }
      });

      svg.appendChild(makeElement('svg:defs', {}, [
        makeElement('svg:filter', { id: 'pt-curve-glow' }, [
          makeElement('svg:feGaussianBlur', { stdDeviation: '3.5', result: 'blur' }),
          makeElement('svg:feMerge', {}, [
            makeElement('svg:feMergeNode', { in: 'blur' }),
            makeElement('svg:feMergeNode', { in: 'SourceGraphic' })
          ])
        ])
      ]));

      const hLine1 = makeElement('svg:line', { stroke: '#38bdf8', 'stroke-width': '1.2', 'stroke-dasharray': '4,3', opacity: '0.65' });
      const hLine2 = makeElement('svg:line', { stroke: '#c084fc', 'stroke-width': '1.2', 'stroke-dasharray': '4,3', opacity: '0.65' });
      const curveGlow = makeElement('svg:path', { fill: 'none', stroke: '#00f2fe', 'stroke-width': '4.5', opacity: '0.45', filter: 'url(#pt-curve-glow)' });
      const curveCore = makeElement('svg:path', { fill: 'none', stroke: '#f8fafc', 'stroke-width': '2', 'stroke-linecap': 'round' });
      svg.append(hLine1, hLine2, curveGlow, curveCore);

      const handles = pts.map((p, idx) => {
        const g = makeElement('svg:g', { style: { cursor: 'grab' } });
        const ring = makeElement('svg:circle', { r: '11', fill: `${p.col}22`, stroke: p.col, 'stroke-width': '1.5' });
        const dot = makeElement('svg:circle', { r: '4.5', fill: p.col });
        g.append(ring, dot);
        svg.appendChild(g);
        return { g, p, idx };
      });

      const updateCurve = () => {
        const [p0, h1, h2, p1] = pts;
        const d = `M ${p0.x} ${p0.y} C ${h1.x} ${h1.y}, ${h2.x} ${h2.y}, ${p1.x} ${p1.y}`;
        curveGlow.setAttribute('d', d);
        curveCore.setAttribute('d', d);
        hLine1.setAttribute('x1', p0.x); hLine1.setAttribute('y1', p0.y);
        hLine1.setAttribute('x2', h1.x); hLine1.setAttribute('y2', h1.y);
        hLine2.setAttribute('x1', p1.x); hLine2.setAttribute('y1', p1.y);
        hLine2.setAttribute('x2', h2.x); hLine2.setAttribute('y2', h2.y);
        handles.forEach(({ g, p }) => g.setAttribute('transform', `translate(${p.x}, ${p.y})`));
      };
      updateCurve();

      let activeIdx = -1;
      const toSvgPt = (e) => {
        const rect = svg.getBoundingClientRect();
        return {
          x: Math.max(14, Math.min(446, ((e.clientX - rect.left) / rect.width) * 460)),
          y: Math.max(14, Math.min(218, ((e.clientY - rect.top) / rect.height) * 232))
        };
      };

      handles.forEach(({ g, idx }) => {
        g.addEventListener('pointerdown', (e) => {
          e.preventDefault();
          activeIdx = idx;
          g.setPointerCapture?.(e.pointerId);
        });
      });

      svg.addEventListener('pointermove', (e) => {
        if (activeIdx === -1) return;
        const pt = toSvgPt(e);
        pts[activeIdx].x = pt.x;
        pts[activeIdx].y = pt.y;
        updateCurve();
      });

      const stopDrag = () => { activeIdx = -1; };
      svg.addEventListener('pointerup', stopDrag);
      window.addEventListener('pointerup', stopDrag);

      const footer = makeElement('div', {
        style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '10.5px', fontFamily: 'var(--pt-mono)', color: '#94a3b8' }
      }, [
        makeElement('span', {}, 'Drag any glowing point to shape the curve'),
        makeElement('a', { href: PortalData.resolveAppUrl('QuoraToys'), target: '_blank', rel: 'noopener noreferrer', style: { color: '#00f2fe', textDecoration: 'none', fontWeight: 'bold' } }, 'Open Full Studio ↗')
      ]);

      wrap.append(svg, footer);
      return wrap;
    }

  _buildQuickDoors() {
      const doors = [
        {
          title: '〰️ Kinetic Curve & Image Markup Studio',
          desc: 'Paste an image (Ctrl+V), draw effortless kinetic curves, arrows, and callouts, and copy straight back to Quora or social media.',
          col: '#00f2fe',
          btnText: 'Launch Curve & Markup App ↗',
          url: PortalData.resolveAppUrl('QuoraToys')
        },
        {
          title: '📐 Launch AccuCAD 3D Workstation',
          desc: 'See precision 3D WebGL drafting, tentative snapping, and AccuDraw orientation locks running live in your browser.',
          col: '#38bdf8',
          btnText: 'Open AccuCAD 3D ↗',
          url: PortalData.resolveAppUrl('accuCad')
        },
        {
          title: '🤖 Read Economics of Automation',
          desc: 'Approachable visual reading and interactive tax/dividend charts written for everyday readers.',
          col: '#34d399',
          btnText: 'Open Visual Essay ↗',
          url: PortalData.resolveAppUrl('EconomicsOfAutomation')
        }
      ];

      return makeElement('section', { className: 'pt-doors-grid', 'data-block-id': 'portal_quick_doors' },
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