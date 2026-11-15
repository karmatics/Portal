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

    if (window.location.hash && window.location.hash.startsWith('#/doc')) {
      this.mode = 'document';
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

    const btnKeys = makeElement('button', {
      className: 'pt-btn pt-btn-cyan',
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
      onclick: () => this.openInDocumentReader('luno')
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
          const code = prompt('Enter optional detail access code (e.g. "family" or "poa"):');
          if (code && SensitiveContextGate.unlockWithCode(code)) {
            this.refresh();
          } else if (code !== null) {
            alert('Access code not recognized.');
          }
        }
      }
    }, isUnlocked ? '🔓 Context Unlocked' : '🔒 Context Gate');

    return makeElement('header', { className: 'pt-topbar' }, [
      makeElement('div', { className: 'pt-brand', onclick: () => { this.activeCategory = 'all'; this.searchQuery = ''; this.refresh(); } }, [
        makeElement('span', { className: 'pt-brand-dot' }),
        makeElement('span', { className: 'pt-brand-title' }, 'ROB BROWN • LIVING PORTAL'),
        makeElement('span', { className: 'pt-brand-sub' }, 'Portal v1.0')
      ]),
      makeElement('div', { className: 'pt-actions' }, [btnKeys, btnJson, btnDoc, btnInspect, btnGate])
    ]);
  }

  _buildHeroSection() {
    const left = makeElement('div', {}, [
      makeElement('div', { className: 'pt-kicker' }, 'Unified Public Front Page • Cross-Linked Ecosystem'),
      makeElement('h1', { className: 'pt-hero-h1' }, 'One clear front door to the software, engineering record, and personal story.'),
      makeElement('p', { className: 'pt-hero-p' },
        'This portal connects six core areas: the Luno AI development cockpit, the Home Setup workstation fleet, 30 years of spatial CAD inventions (AccuDraw & SmartLine), financial valuation records, stabilized family & legal context, and post-labor economic research. Everything is structured so both human visitors and AI assistants can inspect, verify, and export cleanly.'
      ),
      makeElement('div', { className: 'pt-hero-keys-strip' }, [
        makeElement('button', { className: 'pt-btn pt-btn-cyan', onclick: () => PortalModals.openVisitorKeysDialog(this) }, '🔑 Get the Keys & AI Briefing'),
        makeElement('button', { className: 'pt-btn pt-btn-emerald', onclick: () => PortalModals.openSummaryJsonDialog() }, '⚙️ Generate Live summaries.json'),
        makeElement('a', { href: '../Opus/index.html', target: '_blank', className: 'pt-btn' }, '🏛️ Open Opus 4-Quadrant Router')
      ])
    ]);

    const right = makeElement('div', { className: 'pt-constellation-box' }, [
      this._buildConstellationSvg()
    ]);

    return makeElement('section', { className: 'pt-hero', 'data-block-id': 'portal_hero' }, [left, right]);
  }

  _buildConstellationSvg() {
    const svg = makeElement('svg:svg', {
      viewBox: '0 0 460 260',
      width: '100%',
      height: '250px',
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
      { id: 'luno', x: 75, y: 52, label: '🌙 Luno', col: '#00f2fe' },
      { id: 'homesetup', x: 385, y: 52, label: '🖥️ HomeSetup', col: '#10b981' },
      { id: 'career', x: 75, y: 132, label: '📐 Career/CAD', col: '#38bdf8' },
      { id: 'financial', x: 385, y: 132, label: '📊 Valuation', col: '#f59e0b' },
      { id: 'family', x: 115, y: 214, label: '⚖️ Family/Legal', col: '#c084fc' },
      { id: 'economics', x: 345, y: 214, label: '🤖 Economics', col: '#34d399' }
    ];

    const cx = 230, cy = 132;
    nodes.forEach(n => {
      svg.appendChild(makeElement('svg:line', {
        x1: cx, y1: cy, x2: n.x, y2: n.y,
        stroke: n.col, 'stroke-width': '1.5', 'stroke-dasharray': '4,3', opacity: '0.65'
      }));
    });

    const centerG = makeElement('svg:g', { transform: `translate(${cx - 48}, ${cy - 20})`, style: { cursor: 'pointer' } });
    centerG.appendChild(makeElement('svg:rect', {
      width: '96', height: '40', rx: '20', fill: '#082f49', stroke: '#00f2fe', 'stroke-width': '1.8', filter: 'url(#pt-glow)'
    }));
    centerG.appendChild(makeElement('svg:text', {
      x: '48', y: '24', fill: '#00f2fe', 'font-family': 'monospace', 'font-size': '11', 'font-weight': 'bold', 'text-anchor': 'middle'
    }, 'PORTAL HUB'));
    centerG.onclick = () => PortalModals.openVisitorKeysDialog(this);
    svg.appendChild(centerG);

    nodes.forEach(n => {
      const g = makeElement('svg:g', { transform: `translate(${n.x - 56}, ${n.y - 16})`, style: { cursor: 'pointer' } });
      g.appendChild(makeElement('svg:rect', {
        width: '112', height: '32', rx: '8', fill: '#0b101b', stroke: n.col, 'stroke-width': '1.4'
      }));
      g.appendChild(makeElement('svg:text', {
        x: '56', y: '20', fill: '#f8fafc', 'font-family': 'monospace', 'font-size': '10.5', 'font-weight': 'bold', 'text-anchor': 'middle'
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
    const categories = [
      { id: 'all', label: 'All Domains (6)' },
      { id: 'system', label: 'Luno & HomeSetup' },
      { id: 'career', label: 'Career & CAD' },
      { id: 'financial', label: 'Financial' },
      { id: 'personal', label: 'Family & Context' },
      { id: 'research', label: 'Economics & Opus' }
    ];

    const search = makeElement('input', {
      className: 'pt-search',
      type: 'text',
      value: this.searchQuery,
      placeholder: '🔍 Filter domains, patents, repos, or topics (e.g. Luno, AccuDraw, Port 8080, Daughter)...',
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
        makeElement('h3', { className: 'pt-card-title' }, `${p.icon} ${p.name}`),
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
      makeElement('a', { href: p.url, target: '_blank', className: 'pt-btn', style: { fontSize: '11px', padding: '4px 9px' } }, '↗ Open App'),
      makeElement('div', { style: { display: 'flex', gap: '6px' } }, [
        makeElement('button', {
          className: 'pt-btn',
          style: { fontSize: '11px', padding: '4px 9px', borderColor: `${p.accent}66`, color: p.accent },
          onclick: () => PortalModals.openPillarDialog(p, this)
        }, '🔍 Dig In'),
        makeElement('button', {
          className: 'pt-btn',
          style: { fontSize: '11px', padding: '4px 9px' },
          onclick: () => this.openInDocumentReader(p.docPageId)
        }, '📖 Doc')
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
      { id: 'luno', title: '1. Luno Workspace & Protocol', docClass: () => globalThis.PortalDocContent },
      { id: 'homesetup', title: '2. Home Setup & Fleet', docClass: () => globalThis.PortalDocContent },
      { id: 'career', title: '3. Career & CAD Inventions', docClass: () => globalThis.PortalDocContent },
      { id: 'financial', title: '4. Financial Valuation Record', docClass: () => globalThis.PortalDocContent },
      { id: 'family', title: '5. Family, Stability & Context', docClass: () => globalThis.PortalDocContent },
      { id: 'economics', title: '6. Post-Labor Economics', docClass: () => globalThis.PortalDocContent },
      { id: 'visitor_keys', title: '7. Keys to the System & AI Export', docClass: () => globalThis.PortalDocContent }
    ];

    // Map each single-page section cleanly using a lightweight wrapper per section
    const sectionPages = pages.map(p => ({
      id: p.id,
      title: p.title,
      docClass: () => ({
        name: 'PortalDocContent',
        getMeta: () => PortalDocContent.getMeta(),
        manifest: () => PortalDocContent.manifest().filter(s => s.section === p.id),
        ...Object.fromEntries(
          Object.getOwnPropertyNames(PortalDocContent)
            .filter(k => typeof PortalDocContent[k] === 'function')
            .map(k => [k, PortalDocContent[k].bind(PortalDocContent)])
        )
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

    const backBar = makeElement('div', { className: 'pt-doc-mode-bar' }, [
      makeElement('button', {
        className: 'pt-btn pt-btn-cyan',
        onclick: () => {
          this.mode = 'frontpage';
          this.refresh();
        }
      }, '🖥️ Back to Front Page')
    ]);
    this.rootElement.appendChild(backBar);
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
          this._populateDocSidePanel(pages);
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
}

globalThis.Portal = Portal;
if (typeof module !== 'undefined' && module.exports) module.exports = Portal;