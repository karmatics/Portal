class PortalConstellationStage {
  static PREF_KEY = 'pt_open_preference';
  static _activeStage = null;

  static getOpenPreference() {
    try {
      const val = localStorage.getItem(this.PREF_KEY);
      if (val === 'split' || val === 'iframe' || val === 'newtab' || val === 'reader') return val;
    } catch (e) {}
    return 'split';
  }

  static setOpenPreference(pref) {
    const allowed = ['split', 'iframe', 'newtab', 'reader'];
    const clean = allowed.includes(pref) ? pref : 'split';
    try { localStorage.setItem(this.PREF_KEY, clean); } catch (e) {}
    return clean;
  }

  static getCommentStats(targetId) {
    let discussionCount = 0;
    let directiveCount = 0;
    try {
      const threadRaw = localStorage.getItem(`local_thread_thread_Portal_frontpage_${targetId}`);
      if (threadRaw) {
        const arr = JSON.parse(threadRaw);
        if (Array.isArray(arr)) discussionCount = arr.length;
      }
    } catch (e) {}

    try {
      if (typeof CadPlanItemNotes !== 'undefined' && typeof CadPlanItemNotes.getLocalMap === 'function') {
        const map = CadPlanItemNotes.getLocalMap();
        const key = `Portal:frontpage:${targetId}`;
        if (Array.isArray(map[key])) {
          directiveCount = map[key].filter(n => n && n.status !== 'resolved').length;
        }
      }
    } catch (e) {}

    return {
      discussionCount,
      directiveCount,
      total: discussionCount + directiveCount
    };
  }

  static _injectStyles() {
    if (typeof applyCss !== 'function') return;
    const css = `
      @keyframes pt-flow-dash {
        0% { stroke-dashoffset: 32; }
        100% { stroke-dashoffset: 0; }
      }
      @keyframes pt-subnode-pop {
        0% { opacity: 0; transform: scale(0.9); }
        100% { opacity: 1; transform: scale(1); }
      }
      .pt-hero.pt-hero-stage-layout {
        display: flex;
        flex-direction: column;
        gap: 18px;
        padding: 22px 24px;
      }
      .pt-hero-top-grid {
        display: flex;
        flex-direction: column;
        gap: 12px;
      }
      .pt-hero-svg-shell {
        background: radial-gradient(circle at 50% 48%, rgba(12, 22, 42, 0.92) 0%, #050810 85%);
        border: 1.5px solid rgba(0, 242, 254, 0.28);
        border-radius: 12px;
        padding: 12px 14px;
        box-shadow: inset 0 0 36px rgba(0, 242, 254, 0.06), 0 12px 32px rgba(0, 0, 0, 0.45);
        display: flex;
        flex-direction: column;
        gap: 10px;
      }
      .pt-hero-node {
        cursor: pointer;
        transition: opacity 0.18s ease, filter 0.18s ease;
      }
      .pt-hero-node:hover {
        filter: drop-shadow(0 0 9px rgba(0, 242, 254, 0.68));
      }
      .pt-hero-edge-active {
        stroke-dasharray: 6, 4;
        animation: pt-flow-dash 1.15s linear infinite;
      }
      .pt-inline-sub-drawer {
        background: rgba(8, 13, 25, 0.94);
        border: 1px solid rgba(0, 242, 254, 0.3);
        border-radius: 10px;
        padding: 10px 14px;
        display: flex;
        flex-direction: column;
        gap: 8px;
        animation: pt-subnode-pop 0.2s cubic-bezier(0.16, 1, 0.3, 1);
      }
      .pt-stage-backdrop {
        position: fixed;
        inset: 0;
        z-index: 9400;
        background: rgba(3, 6, 13, 0.8);
        backdrop-filter: blur(14px);
        -webkit-backdrop-filter: blur(14px);
        opacity: 0;
        transition: opacity 0.32s cubic-bezier(0.16, 1, 0.3, 1);
      }
      .pt-stage-backdrop.open {
        opacity: 1;
      }
      .pt-stage-shell {
        position: fixed;
        z-index: 9450;
        background: linear-gradient(160deg, rgba(8, 13, 25, 0.99) 0%, rgba(5, 8, 16, 0.99) 100%);
        border: 1.5px solid rgba(0, 242, 254, 0.6);
        border-radius: 16px;
        box-shadow: 0 32px 90px rgba(0, 0, 0, 0.9), 0 0 46px rgba(0, 242, 254, 0.2);
        display: flex;
        flex-direction: column;
        overflow: hidden;
        font-family: var(--pt-sans, system-ui, sans-serif);
        color: #f1f5f9;
        transition: top 0.36s cubic-bezier(0.16, 1, 0.3, 1),
                    left 0.36s cubic-bezier(0.16, 1, 0.3, 1),
                    width 0.36s cubic-bezier(0.16, 1, 0.3, 1),
                    height 0.36s cubic-bezier(0.16, 1, 0.3, 1),
                    opacity 0.24s ease;
      }
      .pt-stage-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-wrap: wrap;
        gap: 8px;
        padding: 10px 14px;
        background: rgba(11, 17, 30, 0.96);
        border-bottom: 1px solid #1e293b;
        flex-shrink: 0;
      }
      .pt-stage-filters {
        display: flex;
        align-items: center;
        gap: 5px;
        flex-wrap: wrap;
      }
      .pt-stage-filter-btn {
        background: rgba(15, 23, 42, 0.85);
        color: #94a3b8;
        border: 1px solid #1e293b;
        border-radius: 14px;
        padding: 4px 10px;
        font-family: var(--pt-mono, monospace);
        font-size: 10.5px;
        font-weight: 700;
        cursor: pointer;
        transition: all 0.14s ease;
      }
      .pt-stage-filter-btn:hover {
        color: #f8fafc;
        border-color: rgba(0, 242, 254, 0.45);
      }
      .pt-stage-filter-btn.active {
        background: rgba(0, 242, 254, 0.14);
        color: #00f2fe;
        border-color: #00f2fe;
        box-shadow: 0 0 12px rgba(0, 242, 254, 0.2);
      }
      .pt-pref-segmented {
        display: inline-flex;
        align-items: center;
        background: #050810;
        border: 1px solid #1e293b;
        border-radius: 16px;
        padding: 2px;
        gap: 2px;
      }
      .pt-pref-opt {
        background: transparent;
        color: #94a3b8;
        border: none;
        border-radius: 14px;
        padding: 4px 8px;
        font-family: var(--pt-mono, monospace);
        font-size: 10px;
        font-weight: 700;
        cursor: pointer;
        transition: all 0.14s ease;
      }
      .pt-pref-opt:hover { color: #f8fafc; }
      .pt-pref-opt.active {
        background: linear-gradient(135deg, #0284c7 0%, #00f2fe 100%);
        color: #060911;
      }
      .pt-stage-workspace {
        flex: 1;
        min-height: 0;
        display: flex;
        position: relative;
        overflow: hidden;
      }
      .pt-stage-canvas-wrap {
        flex: 1;
        min-width: 0;
        min-height: 0;
        position: relative;
        background: radial-gradient(circle at 50% 48%, rgba(14, 24, 44, 0.92) 0%, rgba(5, 8, 16, 0.99) 80%);
        overflow: hidden;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .pt-stage-svg {
        width: 100%;
        height: 100%;
        display: block;
        user-select: none;
      }
      .pt-stage-svg-node {
        cursor: pointer;
        transition: opacity 0.2s ease, filter 0.18s ease;
      }
      .pt-stage-svg-node:hover {
        filter: drop-shadow(0 0 10px rgba(0, 242, 254, 0.6));
      }
      .pt-stage-subnode {
        cursor: pointer;
        transform-box: fill-box;
        transform-origin: center;
        animation: pt-subnode-pop 0.24s cubic-bezier(0.16, 1, 0.3, 1) backwards;
      }
      .pt-stage-subnode:hover rect.pt-subnode-bg {
        stroke-width: 2;
        filter: drop-shadow(0 0 8px rgba(0, 242, 254, 0.55));
      }
      .pt-stage-svg-legend {
        position: absolute;
        bottom: 10px;
        left: 12px;
        display: flex;
        gap: 6px;
        flex-wrap: wrap;
        pointer-events: none;
      }
      .pt-legend-chip {
        background: rgba(6, 10, 19, 0.88);
        border: 1px solid #1e293b;
        color: #94a3b8;
        padding: 3px 9px;
        border-radius: 14px;
        font-family: var(--pt-mono, monospace);
        font-size: 9.8px;
      }
      .pt-stage-drawer {
        width: 455px;
        max-width: 48vw;
        background: rgba(8, 13, 24, 0.97);
        border-left: 1px solid #1e293b;
        display: flex;
        flex-direction: column;
        flex-shrink: 0;
        min-height: 0;
        z-index: 10;
        transition: width 0.24s ease;
      }
      .pt-stage-drawer.wide {
        width: 600px;
        max-width: 56vw;
      }
      .pt-drawer-tabs {
        display: flex;
        padding: 8px 10px;
        gap: 5px;
        border-bottom: 1px solid #1e293b;
        background: rgba(6, 9, 17, 0.8);
        align-items: center;
      }
      .pt-drawer-tab {
        flex: 1;
        background: #0b111f;
        color: #94a3b8;
        border: 1px solid #1e293b;
        border-radius: 8px;
        padding: 6px 8px;
        font-family: var(--pt-mono, monospace);
        font-size: 10.5px;
        font-weight: 700;
        cursor: pointer;
        transition: all 0.14s ease;
        white-space: nowrap;
      }
      .pt-drawer-tab.active {
        background: rgba(0, 242, 254, 0.14);
        color: #00f2fe;
        border-color: #00f2fe;
      }
      .pt-drawer-body {
        flex: 1;
        overflow-y: auto;
        padding: 14px;
        display: flex;
        flex-direction: column;
        gap: 12px;
      }
      .pt-reader-content-box {
        background: rgba(6, 10, 19, 0.82);
        border: 1px solid #1e293b;
        border-radius: 10px;
        padding: 12px 14px;
        display: flex;
        flex-direction: column;
        gap: 10px;
      }
      .pt-reader-sec-title {
        font-family: var(--pt-mono, monospace);
        font-size: 11px;
        font-weight: 800;
        color: #38bdf8;
        margin-top: 4px;
      }
      .pt-reader-para {
        font-size: 12.8px;
        line-height: 1.62;
        color: #e2e8f0;
        margin: 0;
      }
      .pt-stage-frame-layer {
        position: absolute;
        inset: 10px;
        z-index: 30;
        background: #050810;
        border: 1.5px solid #00f2fe;
        border-radius: 12px;
        box-shadow: 0 22px 60px rgba(0, 0, 0, 0.9), 0 0 28px rgba(0, 242, 254, 0.25);
        display: flex;
        flex-direction: column;
        overflow: hidden;
        animation: pt-subnode-pop 0.2s cubic-bezier(0.16, 1, 0.3, 1);
      }
      .pt-stage-split-frame {
        flex: 1.15;
        min-width: 420px;
        background: #050810;
        border-left: 1.5px solid #00f2fe;
        display: flex;
        flex-direction: column;
        overflow: hidden;
        animation: pt-subnode-pop 0.2s cubic-bezier(0.16, 1, 0.3, 1);
      }
      .pt-stage-frame-bar {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 8px;
        padding: 8px 12px;
        background: #0a101d;
        border-bottom: 1px solid #1e293b;
        flex-wrap: wrap;
      }
      .pt-demo-hud {
        position: fixed;
        bottom: 18px;
        left: 50%;
        transform: translateX(-50%);
        z-index: 9995;
        background: rgba(6, 10, 19, 0.96);
        border: 1.5px solid #00f2fe;
        border-radius: 14px;
        padding: 10px 16px;
        min-width: 340px;
        max-width: min(700px, 92vw);
        box-shadow: 0 18px 46px rgba(0, 0, 0, 0.88), 0 0 26px rgba(0, 242, 254, 0.28);
        display: flex;
        flex-direction: column;
        gap: 8px;
        backdrop-filter: blur(16px);
      }
      .pt-comment-mode-hud {
        position: fixed;
        bottom: 20px;
        left: 50%;
        transform: translateX(-50%);
        z-index: 999996;
        background: rgba(8, 15, 29, 0.96);
        border: 1.5px solid #10b981;
        border-radius: 26px;
        padding: 7px 16px;
        display: flex;
        align-items: center;
        gap: 10px;
        box-shadow: 0 14px 36px rgba(0, 0, 0, 0.85), 0 0 22px rgba(16, 185, 129, 0.3);
        font-family: var(--pt-mono, monospace);
        font-size: 11px;
        color: #f8fafc;
        max-width: calc(100vw - 24px);
      }
      @media (max-width: 960px) {
        .pt-stage-workspace { flex-direction: column; }
        .pt-stage-drawer, .pt-stage-drawer.wide {
          width: 100%;
          max-width: 100%;
          height: 46%;
          border-left: none;
          border-top: 1px solid #1e293b;
        }
        .pt-stage-split-frame {
          min-width: 100%;
          height: 50%;
          border-left: none;
          border-top: 1.5px solid #00f2fe;
        }
      }
    `;
    applyCss(css, 'PortalConstellationStageStyles');
  }

  static renderHeroBox(portalApp) {
    this._injectStyles();
    const box = makeElement('div', { className: 'pt-hero-svg-shell', id: 'pt-hero-constellation-box' });

    const state = {
      activeCat: 'all',
      expandedId: null,
      hoverId: null
    };

    const readoutEl = makeElement('span', {
      id: 'pt-hero-svg-readout',
      style: { overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', flex: '1' }
    }, 'Click [+] on any node to expand sub-links inline, or click any card to launch the Full Spatial Map & Content Viewer');

    const inlineSubDrawer = makeElement('div', { className: 'pt-inline-sub-drawer', style: { display: 'none' } });
    const svgHost = makeElement('div', { style: { width: '100%' } });

    const renderInlineDrawer = () => {
      if (!state.expandedId) {
        inlineSubDrawer.style.display = 'none';
        inlineSubDrawer.innerHTML = '';
        return;
      }
      const p = PortalData.getPillars().find(x => x.id === state.expandedId);
      if (!p) return;
      const subs = PortalData.getSubNodes(p.id);
      inlineSubDrawer.style.display = 'flex';
      inlineSubDrawer.innerHTML = '';
      inlineSubDrawer.style.borderColor = `${p.accent}66`;

      inlineSubDrawer.append(
        makeElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' } }, [
          makeElement('div', {}, [
            makeElement('strong', { style: { color: p.accent, fontFamily: 'var(--pt-mono)', fontSize: '12px' } }, `${p.icon} ${p.name} — Subcategories & Quick Jump`),
            makeElement('div', { style: { fontSize: '12px', color: '#cbd5e1', marginTop: '2px' } }, p.publicSummary.slice(0, 210) + (p.publicSummary.length > 210 ? '…' : ''))
          ]),
          makeElement('div', { style: { display: 'flex', gap: '6px' } }, [
            makeElement('button', {
              className: 'pt-btn pt-btn-cyan',
              style: { fontSize: '10.5px', padding: '4px 10px' },
              onclick: () => this.openExpandedStage(portalApp, { originEl: box, initialPillarId: p.id })
            }, '⛶ View Full Contents & Map'),
            makeElement('button', {
              className: 'pt-btn',
              style: { fontSize: '10.5px', padding: '4px 8px' },
              onclick: () => { state.expandedId = null; redrawHeroSvg(); renderInlineDrawer(); }
            }, '✕')
          ])
        ]),
        makeElement('div', { style: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: '8px' } },
          subs.map(sub => makeElement('div', {
            style: {
              background: '#060a14', border: `1px solid ${p.accent}44`, borderRadius: '8px',
              padding: '7px 10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '8px'
            }
          }, [
            makeElement('div', {
              style: { cursor: 'pointer', minWidth: 0, flex: '1' },
              onclick: () => this.openExpandedStage(portalApp, { originEl: box, initialPillarId: p.id, initialSubNodeId: sub.id })
            }, [
              makeElement('strong', { style: { color: '#f8fafc', fontSize: '11.5px', display: 'block' } }, sub.label),
              makeElement('span', { style: { color: '#94a3b8', fontSize: '10px' } }, sub.sub || '')
            ]),
            makeElement('div', { style: { display: 'flex', gap: '4px' } }, [
              makeElement('button', {
                className: 'pt-btn',
                style: { padding: '2px 7px', fontSize: '10px', color: p.accent, borderColor: `${p.accent}66` },
                title: 'View inside Spatial Stage',
                onclick: () => this.openExpandedStage(portalApp, { originEl: box, initialPillarId: p.id, initialSubNodeId: sub.id })
              }, '🪟'),
              sub.url ? makeElement('a', {
                href: sub.url,
                target: '_blank',
                rel: 'noopener noreferrer',
                className: 'pt-btn',
                style: { padding: '2px 7px', fontSize: '10px' },
                title: 'Open in separate window/tab'
              }, '↗') : null
            ].filter(Boolean))
          ]))
        )
      );
    };

    const redrawHeroSvg = () => {
      svgHost.innerHTML = '';
      svgHost.appendChild(this._buildRichHeroSvg(portalApp, box, readoutEl, state, () => {
        redrawHeroSvg();
        renderInlineDrawer();
      }));
    };

    const cats = [
      { id: 'all', label: 'All (10)' },
      { id: 'personal', label: '⚖️ Family & Financial' },
      { id: 'cad', label: '📐 CAD & Patents' },
      { id: 'system', label: '🌙 Luno & Fleet' },
      { id: 'spear', label: '🎯 Apps & Essays' }
    ];
    const catBtns = {};
    const catRow = makeElement('div', { className: 'pt-stage-filters' },
      cats.map(c => {
        const b = makeElement('button', {
          className: `pt-stage-filter-btn ${state.activeCat === c.id ? 'active' : ''}`,
          onclick: () => {
            state.activeCat = c.id;
            Object.entries(catBtns).forEach(([k, btn]) => btn.classList.toggle('active', k === c.id));
            redrawHeroSvg();
          }
        }, c.label);
        catBtns[c.id] = b;
        return b;
      })
    );

    const topBar = makeElement('div', {
      style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px', borderBottom: '1px solid #151f30', paddingBottom: '8px' }
    }, [
      makeElement('div', { style: { display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' } }, [
        makeElement('span', { style: { fontFamily: 'var(--pt-mono)', fontSize: '11.5px', fontWeight: '800', color: '#00f2fe' } }, '🕸️ INTERACTIVE ECOSYSTEM ARCHITECTURE'),
        catRow
      ]),
      makeElement('div', { style: { display: 'flex', gap: '6px', flexWrap: 'wrap' } }, [
        makeElement('button', {
          className: 'pt-btn pt-btn-purple',
          style: { padding: '4px 10px', fontSize: '10.5px' },
          onclick: () => this.runDemo30s(portalApp, box)
        }, '▶ 30s Demo'),
        makeElement('button', {
          className: 'pt-btn pt-btn-cyan',
          style: { padding: '4px 11px', fontSize: '10.5px' },
          onclick: () => this.openExpandedStage(portalApp, { originEl: box })
        }, '⛶ Pop Out Full Workspace')
      ])
    ]);

    const statusStrip = makeElement('div', {
      style: {
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        background: 'rgba(10, 16, 29, 0.92)', border: '1px solid #1e293b',
        borderRadius: '7px', padding: '5px 10px', fontFamily: 'var(--pt-mono)', fontSize: '10.5px',
        color: '#cbd5e1', gap: '8px', flexWrap: 'wrap'
      }
    }, [
      readoutEl,
      makeElement('div', { style: { display: 'flex', gap: '10px', flexShrink: '0' } }, [
        makeElement('span', { style: { color: '#38bdf8', cursor: 'pointer', fontWeight: 'bold' }, onclick: () => this.openExpandedStage(portalApp, { originEl: box, expandAll: true }) }, '⊞ Expand All Nodes'),
        makeElement('span', { style: { color: '#10b981', cursor: 'pointer', fontWeight: 'bold' }, onclick: () => portalApp.startCommentOnAnythingMode() }, '💬 Comment on Anything')
      ])
    ]);

    redrawHeroSvg();
    box.append(topBar, svgHost, inlineSubDrawer, statusStrip);
    return box;
  }

  static _buildRichHeroSvg(portalApp, boxEl, readoutEl, state, onInlineToggle) {
    const pillars = PortalData.getPillars();
    const byId = Object.fromEntries(pillars.map(p => [p.id, p]));

    const layout = {
      family:              { x: 142, y: 64,  w: 250, h: 56, title: '⚖️ Family, Situation & Stella', sub: 'Chico Nov 2026 • Out of Contact • Custody' },
      financial:           { x: 356, y: 132, w: 238, h: 56, title: '📊 Financial Valuation Record', sub: '$1.2B–$5.54B+ Value vs Personal Reality' },
      cadplan_spec:        { x: 142, y: 228, w: 250, h: 56, title: '📐 CadPlan Spec + 3D App', sub: 'Executable Spec for CAD Clones' },
      accucad_live:        { x: 356, y: 308, w: 238, h: 56, title: '🚀 AccuCAD 3D Workstation', sub: 'WebGL Constraints & Tentative Snap' },
      career:              { x: 142, y: 382, w: 250, h: 56, title: '📜 AccuDraw & Aardvark', sub: 'US Patent #5,754,182 • 30-Yr Archive' },

      homesetup:           { x: 978, y: 64,  w: 250, h: 56, title: '🖥️ Home Setup & Port 8080', sub: 'Mac .226 ↔ Linux .245 • Dictation' },
      luno:                { x: 764, y: 132, w: 238, h: 56, title: '🌙 Luno Workspace & Prompts', sub: 'Life Org, AST Code & Doc Engine' },
      economics:           { x: 978, y: 228, w: 250, h: 56, title: '🏛️ Master Opus & Library', sub: '4-Quadrant Router • Blind Stepper' },
      curve_drawing_spear: { x: 764, y: 308, w: 238, h: 56, title: '〰️ Kinetic Curve & Markup', sub: '32px Tether • Social Media App' },
      economics_spear:     { x: 978, y: 382, w: 250, h: 56, title: '🤖 Economics of Automation', sub: 'Colony of 100k & Robot Dividend' }
    };

    const svg = makeElement('svg:svg', {
      viewBox: '0 0 1120 442',
      width: '100%',
      style: { display: 'block', height: 'auto', maxHeight: '440px' }
    });

    const defs = makeElement('svg:defs', {}, [
      makeElement('svg:pattern', { id: 'pt-h-grid', width: '28', height: '28', patternUnits: 'userSpaceOnUse' }, [
        makeElement('svg:circle', { cx: '1.5', cy: '1.5', r: '0.85', fill: 'rgba(148, 163, 184, 0.16)' })
      ]),
      makeElement('svg:filter', { id: 'pt-h-glow', x: '-25%', y: '-25%', width: '150%', height: '150%' }, [
        makeElement('svg:feGaussianBlur', { stdDeviation: '3.2', result: 'blur' }),
        makeElement('svg:feMerge', {}, [
          makeElement('svg:feMergeNode', { in: 'blur' }),
          makeElement('svg:feMergeNode', { in: 'SourceGraphic' })
        ])
      ])
    ]);
    svg.appendChild(defs);
    svg.appendChild(makeElement('svg:rect', { width: '1120', height: '442', rx: '8', fill: 'url(#pt-h-grid)' }));

    const cx = 560, cy = 221;
    const quadrantLabels = [
      { text: '⚖️ FAMILY & FINANCIAL RECORD', x: 22, y: 22, col: '#f43f5e', anchor: 'start' },
      { text: '🌙 LUNO & WORKSTATION FLEET', x: 1098, y: 22, col: '#00f2fe', anchor: 'end' },
      { text: '📐 CAD, PATENTS & 3D APPS', x: 22, y: 430, col: '#38bdf8', anchor: 'start' },
      { text: '🎯 PUBLIC APPS & ECONOMIC WRITING', x: 1098, y: 430, col: '#c084fc', anchor: 'end' }
    ];
    quadrantLabels.forEach(q => {
      svg.appendChild(makeElement('svg:text', {
        x: String(q.x), y: String(q.y), fill: q.col, 'font-family': 'monospace',
        'font-size': '10.5', 'font-weight': '800', 'text-anchor': q.anchor, opacity: '0.85'
      }, q.text));
    });

    svg.appendChild(makeElement('svg:ellipse', {
      cx: String(cx), cy: String(cy), rx: '420', ry: '175',
      fill: 'none', stroke: 'rgba(56, 189, 248, 0.1)', 'stroke-width': '1', 'stroke-dasharray': '4,5'
    }));

    const edgesLayer = makeElement('svg:g', {});
    const nodesLayer = makeElement('svg:g', {});
    svg.append(edgesLayer, nodesLayer);

    const edgeEls = [];
    const seenPairs = new Set();

    Object.entries(layout).forEach(([id, pos]) => {
      const p = byId[id];
      if (!p) return;
      const spoke = makeElement('svg:path', {
        d: `M ${cx} ${cy} Q ${(cx + pos.x) / 2} ${cy} ${pos.x} ${pos.y}`,
        fill: 'none', stroke: p.accent, 'stroke-width': '1.2', opacity: '0.28'
      });
      edgesLayer.appendChild(spoke);
      edgeEls.push({ el: spoke, a: id, b: 'center', baseOpacity: '0.28' });

      (p.crossLinks || []).forEach(cl => {
        const tPos = layout[cl.targetId];
        if (!tPos) return;
        const key = [id, cl.targetId].sort().join('::');
        if (seenPairs.has(key)) return;
        seenPairs.add(key);

        const mx = (pos.x + tPos.x) / 2 + (cx - (pos.x + tPos.x) / 2) * 0.3;
        const my = (pos.y + tPos.y) / 2 + (cy - (pos.y + tPos.y) / 2) * 0.3;
        const arc = makeElement('svg:path', {
          d: `M ${pos.x} ${pos.y} Q ${mx} ${my} ${tPos.x} ${tPos.y}`,
          fill: 'none', stroke: p.accent, 'stroke-width': '1.2', opacity: '0.2'
        });
        edgesLayer.appendChild(arc);
        edgeEls.push({ el: arc, a: id, b: cl.targetId, baseOpacity: '0.2' });
      });
    });

    const centerG = makeElement('svg:g', {
      transform: `translate(${cx - 72}, ${cy - 24})`,
      className: 'pt-hero-node',
      onclick: () => this.openExpandedStage(portalApp, { originEl: boxEl })
    });
    centerG.appendChild(makeElement('svg:rect', {
      width: '144', height: '48', rx: '24', fill: '#071b2e', stroke: '#00f2fe', 'stroke-width': '1.8', filter: 'url(#pt-h-glow)'
    }));
    centerG.appendChild(makeElement('svg:text', {
      x: '72', y: '22', fill: '#00f2fe', 'font-family': 'monospace', 'font-size': '10.5', 'font-weight': 'bold', 'text-anchor': 'middle'
    }, 'ROB • PORTAL'));
    centerG.appendChild(makeElement('svg:text', {
      x: '72', y: '35', fill: '#94a3b8', 'font-family': 'monospace', 'font-size': '8.5', 'text-anchor': 'middle'
    }, '⛶ Pop Out Full Map'));
    nodesLayer.appendChild(centerG);

    const highlightEdges = (targetId) => {
      edgeEls.forEach(item => {
        if (!targetId) {
          item.el.setAttribute('opacity', item.baseOpacity);
          item.el.setAttribute('stroke-width', item.b === 'center' ? '1.2' : '1.2');
          item.el.classList.remove('pt-hero-edge-active');
        } else {
          const match = item.a === targetId || item.b === targetId;
          item.el.setAttribute('opacity', match ? '0.96' : '0.07');
          item.el.setAttribute('stroke-width', match ? '2.2' : '1');
          if (match) item.el.classList.add('pt-hero-edge-active');
          else item.el.classList.remove('pt-hero-edge-active');
        }
      });
    };

    Object.entries(layout).forEach(([id, pos]) => {
      const p = byId[id];
      if (!p) return;
      const subs = PortalData.getSubNodes(id);
      const stats = this.getCommentStats(id);
      const isExpanded = state.expandedId === id;
      const catDim = state.activeCat !== 'all' && p.category !== state.activeCat;

      const g = makeElement('svg:g', {
        transform: `translate(${pos.x - pos.w / 2}, ${pos.y - pos.h / 2})`,
        className: 'pt-hero-node',
        opacity: catDim ? '0.32' : '1',
        onmouseenter: () => {
          highlightEdges(id);
          if (readoutEl) {
            const linksList = (p.crossLinks || []).map(c => c.label).join(' • ');
            readoutEl.textContent = `${p.icon} ${p.name}: ${subs.length} sub-links${linksList ? ` • Linked to: ${linksList}` : ''}`;
          }
        },
        onmouseleave: () => {
          highlightEdges(state.expandedId);
          if (readoutEl) {
            readoutEl.textContent = 'Click [+] on any node to expand sub-links inline, or click any card to launch the Full Spatial Map & Content Viewer';
          }
        },
        onclick: () => this.openExpandedStage(portalApp, { originEl: boxEl, initialPillarId: id })
      });

      g.appendChild(makeElement('svg:rect', {
        width: String(pos.w), height: String(pos.h), rx: '10',
        fill: isExpanded ? '#0c1c36' : '#070b15',
        stroke: p.accent,
        'stroke-width': isExpanded ? '2.2' : '1.4',
        filter: isExpanded ? 'url(#pt-h-glow)' : 'none'
      }));

      g.appendChild(makeElement('svg:text', {
        x: '11', y: '22', fill: '#f8fafc', 'font-family': 'system-ui, -apple-system, sans-serif',
        'font-size': '11.8', 'font-weight': '700'
      }, pos.title));

      g.appendChild(makeElement('svg:text', {
        x: '11', y: '41', fill: '#94a3b8', 'font-family': 'monospace', 'font-size': '9.2'
      }, pos.sub));

      // Inline Expand [+] button on the SVG node
      const expBtn = makeElement('svg:g', {
        transform: `translate(${pos.w - 38}, ${pos.h - 21})`,
        style: { cursor: 'pointer' },
        onclick: (e) => {
          e.stopPropagation();
          state.expandedId = isExpanded ? null : id;
          onInlineToggle();
        }
      });
      expBtn.appendChild(makeElement('svg:rect', {
        width: '30', height: '16', rx: '8',
        fill: isExpanded ? p.accent : 'rgba(15, 23, 42, 0.95)',
        stroke: p.accent, 'stroke-width': '1'
      }));
      expBtn.appendChild(makeElement('svg:text', {
        x: '15', y: '11.2',
        fill: isExpanded ? '#060911' : p.accent,
        'font-family': 'monospace', 'font-size': '8.5', 'font-weight': 'bold', 'text-anchor': 'middle'
      }, isExpanded ? '▾' : `+${subs.length}`));
      g.appendChild(expBtn);

      // Live comment chip
      const chatBtn = makeElement('svg:g', {
        transform: `translate(${pos.w - 30}, -7)`,
        style: { cursor: 'pointer' },
        onclick: (e) => {
          e.stopPropagation();
          this.openExpandedStage(portalApp, { originEl: boxEl, initialPillarId: id, initialTab: 'comments' });
        }
      });
      chatBtn.appendChild(makeElement('svg:rect', {
        width: '28', height: '16', rx: '8',
        fill: stats.total > 0 ? '#10b981' : '#0b1220',
        stroke: stats.total > 0 ? '#34d399' : '#334155', 'stroke-width': '1'
      }));
      chatBtn.appendChild(makeElement('svg:text', {
        x: '14', y: '11',
        fill: stats.total > 0 ? '#060911' : '#cbd5e1',
        'font-family': 'monospace', 'font-size': '8.2', 'font-weight': 'bold', 'text-anchor': 'middle'
      }, stats.total > 0 ? `💬${stats.total}` : '💬'));
      g.appendChild(chatBtn);

      nodesLayer.appendChild(g);
    });

    if (state.expandedId) highlightEdges(state.expandedId);
    return svg;
  }

  static openExpandedStage(portalApp, options = {}) {
    if (this._activeStage) {
      this._activeStage.close(true);
    }
    try { if (typeof GlowingTooltip !== 'undefined') GlowingTooltip.hide(true); } catch (e) {}

    const stage = new PortalConstellationStage(portalApp, options);
    this._activeStage = stage;
    stage.open();
    return stage;
  }

  static async runDemo30s(portalApp, originEl = null) {
    const stage = this.openExpandedStage(portalApp, {
      originEl: originEl || document.getElementById('pt-hero-constellation-box'),
      initialPillarId: 'family'
    });
    await stage.startDemo30s();
    return stage;
  }

  constructor(portalApp, options = {}) {
    this.portalApp = portalApp;
    this.options = options || {};
    this.pillars = PortalData.getPillars();
    this.byId = Object.fromEntries(this.pillars.map(p => [p.id, p]));
    this.selectedPillarId = options.initialPillarId || 'family';
    this.selectedSubNodeId = options.initialSubNodeId || null;
    this.activeCategory = 'all';
    this.expandAllMode = Boolean(options.expandAll);
    this.drawerTab = options.initialTab || 'contents'; // 'contents' | 'links' | 'comments'
    this.drawerWide = false;
    this.openPref = PortalConstellationStage.getOpenPreference();
    this.splitPreview = null; // { url, title, targetId }
    this.demoState = null;

    this.backdrop = null;
    this.shell = null;
    this.svgEl = null;
    this.drawerBody = null;
    this.splitFrameHost = null;
    this.frameLayer = null;
    this.demoHud = null;
    this._escHandler = null;
    this._commentsUpdatedHandler = null;
  }

  open() {
    PortalConstellationStage._injectStyles();
    const originEl = this.options.originEl || document.getElementById('pt-hero-constellation-box');
    const startRect = originEl ? originEl.getBoundingClientRect() : {
      left: 40, top: 180, width: Math.min(900, window.innerWidth - 80), height: 340
    };

    const targetW = Math.min(1440, window.innerWidth - 24);
    const targetH = Math.min(860, window.innerHeight - 32);
    const targetLeft = Math.max(12, Math.floor((window.innerWidth - targetW) / 2));
    const targetTop = Math.max(16, Math.floor((window.innerHeight - targetH) / 2));

    this.backdrop = makeElement('div', {
      className: 'pt-stage-backdrop',
      'data-aardvark-ignore': 'true',
      onclick: () => this.close()
    });

    this.shell = makeElement('div', {
      className: 'pt-stage-shell',
      'data-aardvark-ignore': 'true',
      style: {
        left: `${Math.round(startRect.left)}px`,
        top: `${Math.round(startRect.top)}px`,
        width: `${Math.round(startRect.width)}px`,
        height: `${Math.round(startRect.height)}px`,
        opacity: '0.75'
      }
    });

    this._buildStageContents();
    document.body.append(this.backdrop, this.shell);

    requestAnimationFrame(() => {
      this.backdrop.classList.add('open');
      Object.assign(this.shell.style, {
        left: `${targetLeft}px`,
        top: `${targetTop}px`,
        width: `${targetW}px`,
        height: `${targetH}px`,
        opacity: '1'
      });
    });

    this._escHandler = (e) => {
      if (e.key === 'Escape') {
        if (this.demoState && this.demoState.running) this.stopDemo30s();
        else if (this.frameLayer) this.closeInlineFrame();
        else if (this.splitPreview) this.closeSplitPreview();
        else this.close();
      }
    };
    window.addEventListener('keydown', this._escHandler);

    this._commentsUpdatedHandler = () => {
      this._renderSvg();
      if (this.drawerTab === 'comments') this._renderDrawer();
    };
    window.addEventListener('portal-comments-updated', this._commentsUpdatedHandler);

    if (this.selectedSubNodeId) {
      const p = this.byId[this.selectedPillarId];
      const sub = PortalData.getSubNodes(this.selectedPillarId).find(s => s.id === this.selectedSubNodeId);
      if (p && sub) {
        setTimeout(() => this._launchSubNode(sub, p), 140);
      }
    }
  }

  close(immediate = false) {
    this.stopDemo30s();
    if (this._escHandler) {
      window.removeEventListener('keydown', this._escHandler);
      this._escHandler = null;
    }
    if (this._commentsUpdatedHandler) {
      window.removeEventListener('portal-comments-updated', this._commentsUpdatedHandler);
      this._commentsUpdatedHandler = null;
    }
    if (PortalConstellationStage._activeStage === this) {
      PortalConstellationStage._activeStage = null;
    }

    if (immediate || !this.shell) {
      this.backdrop?.remove();
      this.shell?.remove();
      return;
    }

    const originEl = document.getElementById('pt-hero-constellation-box');
    const backRect = originEl ? originEl.getBoundingClientRect() : null;
    this.backdrop?.classList.remove('open');
    if (backRect && backRect.width > 40) {
      Object.assign(this.shell.style, {
        left: `${Math.round(backRect.left)}px`,
        top: `${Math.round(backRect.top)}px`,
        width: `${Math.round(backRect.width)}px`,
        height: `${Math.round(backRect.height)}px`,
        opacity: '0'
      });
    } else {
      this.shell.style.opacity = '0';
    }

    setTimeout(() => {
      this.backdrop?.remove();
      this.shell?.remove();
    }, 320);
  }

  _buildStageContents() {
    this.shell.innerHTML = '';

    const clusters = [
      { id: 'all', label: 'All (10)' },
      { id: 'personal', label: '⚖️ Family & Fin' },
      { id: 'cad', label: '📐 CAD & Patents' },
      { id: 'system', label: '🌙 Luno & Fleet' },
      { id: 'spear', label: '🎯 Apps & Econ' }
    ];

    this.filterBtns = {};
    const filterRow = makeElement('div', { className: 'pt-stage-filters' },
      clusters.map(c => {
        const b = makeElement('button', {
          className: `pt-stage-filter-btn ${this.activeCategory === c.id ? 'active' : ''}`,
          onclick: () => {
            this.activeCategory = c.id;
            Object.entries(this.filterBtns).forEach(([k, btn]) => btn.classList.toggle('active', k === c.id));
            if (c.id !== 'all') {
              const firstInCat = this.pillars.find(p => p.category === c.id);
              if (firstInCat) this.selectPillar(firstInCat.id);
            } else {
              this._renderSvg();
            }
          }
        }, c.label);
        this.filterBtns[c.id] = b;
        return b;
      })
    );

    this.expandAllBtn = makeElement('button', {
      className: `pt-btn ${this.expandAllMode ? 'pt-btn-cyan' : ''}`,
      style: { padding: '4px 10px', fontSize: '10.5px' },
      title: 'Expand all 10 pillars and all subcategories simultaneously inside the SVG',
      onclick: () => {
        this.expandAllMode = !this.expandAllMode;
        this.expandAllBtn.classList.toggle('pt-btn-cyan', this.expandAllMode);
        this.expandAllBtn.textContent = this.expandAllMode ? '◎ Orbit View' : '⊞ Expand All';
        this._renderSvg();
      }
    }, this.expandAllMode ? '◎ Orbit View' : '⊞ Expand All');

    this.prefBtns = {};
    const prefOptions = [
      { id: 'split', label: '◧ Split', title: 'Keep SVG map on left & view live document/app on right' },
      { id: 'iframe', label: '🪟 Frame', title: 'Open live document/app across the stage' },
      { id: 'newtab', label: '↗ Tab', title: 'Open in a separate browser window/tab' },
      { id: 'reader', label: '📖 Reader', title: 'Open in Portal Chapter View' }
    ];
    const prefSwitch = makeElement('div', { className: 'pt-pref-segmented' },
      prefOptions.map(opt => {
        const b = makeElement('button', {
          className: `pt-pref-opt ${this.openPref === opt.id ? 'active' : ''}`,
          title: opt.title,
          onclick: () => {
            this.openPref = PortalConstellationStage.setOpenPreference(opt.id);
            Object.entries(this.prefBtns).forEach(([k, btn]) => btn.classList.toggle('active', k === opt.id));
            this._renderDrawer();
          }
        }, opt.label);
        this.prefBtns[opt.id] = b;
        return b;
      })
    );

    this.demoBtn = makeElement('button', {
      className: 'pt-btn pt-btn-purple',
      style: { padding: '4px 10px', fontSize: '10.5px' },
      onclick: () => {
        if (this.demoState?.running) this.stopDemo30s();
        else this.startDemo30s();
      }
    }, '▶ 30s Demo');

    const commentPickBtn = makeElement('button', {
      className: 'pt-btn pt-btn-emerald',
      style: { padding: '4px 10px', fontSize: '10.5px' },
      title: 'Minimize stage & click ANY element on the Portal page to comment',
      onclick: () => {
        this.close();
        setTimeout(() => this.portalApp.startCommentOnAnythingMode(), 260);
      }
    }, '💬 Comment on Anything');

    const closeBtn = makeElement('button', {
      className: 'pt-btn',
      style: { padding: '4px 10px', fontSize: '11px', color: '#f87171', borderColor: 'rgba(248, 113, 113, 0.4)' },
      onclick: () => this.close()
    }, '✕ Close');

    const header = makeElement('header', { className: 'pt-stage-header' }, [
      makeElement('div', { style: { display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' } }, [
        makeElement('span', { style: { fontFamily: 'var(--pt-mono)', fontSize: '11.5px', fontWeight: '800', color: '#00f2fe' } }, '🕸️ SPATIAL MAP'),
        filterRow
      ]),
      makeElement('div', { style: { display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' } }, [
        this.expandAllBtn,
        makeElement('div', { style: { display: 'inline-flex', alignItems: 'center', gap: '4px' } }, [
          makeElement('span', { style: { fontFamily: 'var(--pt-mono)', fontSize: '9.8px', color: '#64748b' } }, 'Open:'),
          prefSwitch
        ]),
        commentPickBtn,
        this.demoBtn,
        closeBtn
      ])
    ]);

    this.canvasWrap = makeElement('div', { className: 'pt-stage-canvas-wrap' });
    this.svgEl = makeElement('svg:svg', { className: 'pt-stage-svg', preserveAspectRatio: 'xMidYMid meet' });

    const legend = makeElement('div', { className: 'pt-stage-svg-legend' }, [
      makeElement('span', { className: 'pt-legend-chip' }, 'Click pillar to read contents & fan sub-links'),
      makeElement('span', { className: 'pt-legend-chip' }, 'Click sub-node to view live'),
      makeElement('span', { className: 'pt-legend-chip' }, 'Click 💬 for tethered comments')
    ]);
    this.canvasWrap.append(this.svgEl, legend);

    this.tabContentsBtn = makeElement('button', {
      className: `pt-drawer-tab ${this.drawerTab === 'contents' ? 'active' : ''}`,
      onclick: () => { this.drawerTab = 'contents'; this._syncDrawerTabs(); this._renderDrawer(); }
    }, '📖 Contents');

    this.tabLinksBtn = makeElement('button', {
      className: `pt-drawer-tab ${this.drawerTab === 'links' ? 'active' : ''}`,
      onclick: () => { this.drawerTab = 'links'; this._syncDrawerTabs(); this._renderDrawer(); }
    }, '🔗 Sub-Links');

    this.tabCommentsBtn = makeElement('button', {
      className: `pt-drawer-tab ${this.drawerTab === 'comments' ? 'active' : ''}`,
      onclick: () => { this.drawerTab = 'comments'; this._syncDrawerTabs(); this._renderDrawer(); }
    }, '💬 Comments');

    const widenBtn = makeElement('button', {
      className: 'pt-btn',
      style: { padding: '4px 7px', fontSize: '10px' },
      title: 'Toggle wider content reading pane',
      onclick: () => {
        this.drawerWide = !this.drawerWide;
        this.drawer.classList.toggle('wide', this.drawerWide);
        widenBtn.textContent = this.drawerWide ? '⇥' : '⇤';
      }
    }, '⇤');

    this.drawerBody = makeElement('div', { className: 'pt-drawer-body' });
    this.drawer = makeElement('aside', { className: 'pt-stage-drawer' }, [
      makeElement('div', { className: 'pt-drawer-tabs' }, [this.tabContentsBtn, this.tabLinksBtn, this.tabCommentsBtn, widenBtn]),
      this.drawerBody
    ]);

    this.workspace = makeElement('div', { className: 'pt-stage-workspace' }, [this.canvasWrap, this.drawer]);
    this.shell.append(header, this.workspace);

    this._renderSvg();
    this._renderDrawer();
  }

  _syncDrawerTabs() {
    this.tabContentsBtn?.classList.toggle('active', this.drawerTab === 'contents');
    this.tabLinksBtn?.classList.toggle('active', this.drawerTab === 'links');
    this.tabCommentsBtn?.classList.toggle('active', this.drawerTab === 'comments');
    this._renderSvg();
  }

  selectPillar(pillarId, targetTab = null) {
    this.selectedPillarId = pillarId;
    this.selectedSubNodeId = null;
    if (targetTab) this.drawerTab = targetTab;
    this._syncDrawerTabs();
    this._renderDrawer();
  }

  _renderSvg() {
    if (!this.svgEl) return;
    this.svgEl.innerHTML = '';
    if (this.expandAllMode) this._renderBlueprintSvg();
    else this._renderOrbitSvg();
  }

  _buildCommonSvgDefs(gridId, glowId) {
    return makeElement('svg:defs', {}, [
      makeElement('svg:pattern', { id: gridId, width: '32', height: '32', patternUnits: 'userSpaceOnUse' }, [
        makeElement('svg:circle', { cx: '1.5', cy: '1.5', r: '0.9', fill: 'rgba(148, 163, 184, 0.16)' })
      ]),
      makeElement('svg:filter', { id: glowId, x: '-30%', y: '-30%', width: '160%', height: '160%' }, [
        makeElement('svg:feGaussianBlur', { stdDeviation: '4', result: 'blur' }),
        makeElement('svg:feMerge', {}, [
          makeElement('svg:feMergeNode', { in: 'blur' }),
          makeElement('svg:feMergeNode', { in: 'SourceGraphic' })
        ])
      ])
    ]);
  }

  _renderOrbitSvg() {
    this.svgEl.setAttribute('viewBox', '0 0 1040 660');
    this.svgEl.appendChild(this._buildCommonSvgDefs('pt-orb-grid', 'pt-orb-glow'));
    this.svgEl.appendChild(makeElement('svg:rect', { width: '1040', height: '660', fill: 'url(#pt-orb-grid)' }));

    const cx = 520, cy = 330;
    const coords = {
      family:              { x: 145, y: 108, w: 212, h: 48, title: '⚖️ Family, Situation & Stella', sub: 'Chico Nov 2026 • Custody' },
      financial:           { x: 382, y: 66,  w: 204, h: 48, title: '📊 Financial Valuation', sub: '$1.2B–$5.54B+ vs Reality' },
      luno:                { x: 658, y: 66,  w: 204, h: 48, title: '🌙 Luno Workspace', sub: 'Life Org & AST Patcher' },
      homesetup:           { x: 895, y: 108, w: 212, h: 48, title: '🖥️ Home Setup & Fleet', sub: 'Mac .226 ↔ Linux .245' },
      economics:           { x: 905, y: 326, w: 212, h: 48, title: '🏛️ Master Opus & Library', sub: '4-Quadrant Router' },
      curve_drawing_spear: { x: 895, y: 536, w: 212, h: 48, title: '〰️ Kinetic Curve App', sub: '32px Tether • Markup' },
      economics_spear:     { x: 658, y: 588, w: 204, h: 48, title: '🤖 Economics Essay', sub: 'Colony of 100k & Sim' },
      career:              { x: 382, y: 588, w: 204, h: 48, title: '📜 AccuDraw & Aardvark', sub: 'US Patent #5,754,182' },
      accucad_live:        { x: 145, y: 536, w: 212, h: 48, title: '🚀 AccuCAD 3D App', sub: 'WebGL Spatial Drafting' },
      cadplan_spec:        { x: 135, y: 326, w: 212, h: 48, title: '📐 CadPlan Spec + 3D', sub: 'Agent Blueprint & Labs' }
    };

    const bgLayer = makeElement('svg:g', {});
    const edgeLayer = makeElement('svg:g', {});
    const nodeLayer = makeElement('svg:g', {});
    const focalLayer = makeElement('svg:g', {});
    this.svgEl.append(bgLayer, edgeLayer, nodeLayer, focalLayer);

    bgLayer.appendChild(makeElement('svg:ellipse', {
      cx: String(cx), cy: String(cy), rx: '378', ry: '245',
      fill: 'none', stroke: 'rgba(56, 189, 248, 0.12)', 'stroke-width': '1.2', 'stroke-dasharray': '5,6'
    }));

    const domainLabels = [
      { id: 'personal', text: '⚖️ FAMILY & FINANCIAL RECORD', x: 36, y: 30, col: '#f43f5e' },
      { id: 'system', text: '🌙 LUNO & HOME FLEET', x: 1004, y: 30, col: '#00f2fe', anchor: 'end' },
      { id: 'cad', text: '📐 CAD, PATENTS & 3D', x: 36, y: 638, col: '#38bdf8' },
      { id: 'spear', text: '🎯 PUBLIC APPS & ESSAYS', x: 1004, y: 638, col: '#c084fc', anchor: 'end' }
    ];
    domainLabels.forEach(dl => {
      bgLayer.appendChild(makeElement('svg:text', {
        x: String(dl.x), y: String(dl.y),
        fill: dl.col, 'font-family': 'monospace', 'font-size': '11', 'font-weight': '800',
        'text-anchor': dl.anchor || 'start', opacity: '0.84', style: { cursor: 'pointer' },
        onclick: () => {
          this.activeCategory = dl.id;
          Object.entries(this.filterBtns || {}).forEach(([k, btn]) => btn.classList.toggle('active', k === dl.id));
          const first = this.pillars.find(p => p.category === dl.id);
          if (first) this.selectPillar(first.id);
        }
      }, dl.text));
    });

    const selectedPillar = this.byId[this.selectedPillarId] || this.pillars[0];
    const connectedIds = new Set([selectedPillar.id, ...(selectedPillar.crossLinks || []).map(c => c.targetId)]);

    const seenPairs = new Set();
    this.pillars.forEach(p => {
      const pos = coords[p.id];
      if (!pos) return;
      const isFocused = p.id === selectedPillar.id;
      const spoke = makeElement('svg:line', {
        x1: String(cx), y1: String(cy), x2: String(pos.x), y2: String(pos.y),
        stroke: p.accent, 'stroke-width': isFocused ? '2' : '1', opacity: isFocused ? '0.68' : '0.18'
      });
      if (isFocused) spoke.classList.add('pt-hero-edge-active');
      edgeLayer.appendChild(spoke);

      (p.crossLinks || []).forEach(cl => {
        const targetPos = coords[cl.targetId];
        if (!targetPos) return;
        const pairKey = [p.id, cl.targetId].sort().join('::');
        if (seenPairs.has(pairKey)) return;
        seenPairs.add(pairKey);

        const touchesSelected = p.id === selectedPillar.id || cl.targetId === selectedPillar.id;
        const mx = (pos.x + targetPos.x) / 2 + (cx - (pos.x + targetPos.x) / 2) * 0.28;
        const my = (pos.y + targetPos.y) / 2 + (cy - (pos.y + targetPos.y) / 2) * 0.28;
        const path = makeElement('svg:path', {
          d: `M ${pos.x} ${pos.y} Q ${mx} ${my} ${targetPos.x} ${targetPos.y}`,
          fill: 'none',
          stroke: touchesSelected ? selectedPillar.accent : '#334155',
          'stroke-width': touchesSelected ? '2.2' : '1',
          opacity: touchesSelected ? '0.92' : '0.16'
        });
        if (touchesSelected) path.classList.add('pt-hero-edge-active');
        edgeLayer.appendChild(path);
      });
    });

    const centerG = makeElement('svg:g', {
      transform: `translate(${cx - 66}, ${cy - 22})`,
      className: 'pt-stage-svg-node',
      onclick: () => {
        this.expandAllMode = true;
        this.expandAllBtn.classList.add('pt-btn-cyan');
        this.expandAllBtn.textContent = '◎ Orbit View';
        this._renderSvg();
      }
    });
    centerG.appendChild(makeElement('svg:rect', {
      width: '132', height: '44', rx: '22', fill: '#071b2e', stroke: '#00f2fe', 'stroke-width': '1.6', filter: 'url(#pt-orb-glow)'
    }));
    centerG.appendChild(makeElement('svg:text', {
      x: '66', y: '20', fill: '#00f2fe', 'font-family': 'monospace', 'font-size': '10.2', 'font-weight': 'bold', 'text-anchor': 'middle'
    }, 'ROB • PORTAL'));
    centerG.appendChild(makeElement('svg:text', {
      x: '66', y: '33', fill: '#94a3b8', 'font-family': 'monospace', 'font-size': '8.2', 'text-anchor': 'middle'
    }, '⊞ Click to Expand All'));
    nodeLayer.appendChild(centerG);

    const drawPillarNode = (p, targetLayer) => {
      const pos = coords[p.id];
      if (!pos) return;
      const isSelected = p.id === selectedPillar.id;
      const catMatch = this.activeCategory === 'all' || p.category === this.activeCategory;
      const dimmed = !isSelected && (!catMatch || (!connectedIds.has(p.id) && this.activeCategory === 'all'));
      const stats = PortalConstellationStage.getCommentStats(p.id);

      const g = makeElement('svg:g', {
        transform: `translate(${pos.x - pos.w / 2}, ${pos.y - pos.h / 2})`,
        className: 'pt-stage-svg-node',
        opacity: isSelected ? '1' : (dimmed ? '0.46' : '0.94'),
        onclick: () => this.selectPillar(p.id)
      });

      g.appendChild(makeElement('svg:rect', {
        width: String(pos.w), height: String(pos.h), rx: '10',
        fill: isSelected ? '#0b182d' : '#070b14',
        stroke: p.accent,
        'stroke-width': isSelected ? '2.4' : '1.3',
        filter: isSelected ? 'url(#pt-orb-glow)' : 'none'
      }));

      g.appendChild(makeElement('svg:text', {
        x: '11', y: '19.5', fill: '#f8fafc', 'font-family': 'system-ui, -apple-system, sans-serif',
        'font-size': '11.2', 'font-weight': '700'
      }, pos.title));

      g.appendChild(makeElement('svg:text', {
        x: '11', y: '36.5', fill: isSelected ? p.accent : '#94a3b8', 'font-family': 'monospace', 'font-size': '8.8'
      }, pos.sub));

      const chatChip = makeElement('svg:g', {
        transform: `translate(${pos.w - 30}, -9)`,
        style: { cursor: 'pointer' },
        onclick: (e) => {
          e.stopPropagation();
          this.selectPillar(p.id, 'comments');
        }
      });
      chatChip.appendChild(makeElement('svg:rect', {
        width: '32', height: '18', rx: '9',
        fill: stats.total > 0 ? '#10b981' : '#0f172a',
        stroke: stats.total > 0 ? '#34d399' : '#334155', 'stroke-width': '1.2'
      }));
      chatChip.appendChild(makeElement('svg:text', {
        x: '16', y: '12.5',
        fill: stats.total > 0 ? '#060911' : '#cbd5e1',
        'font-family': 'monospace', 'font-size': '8.8', 'font-weight': 'bold', 'text-anchor': 'middle'
      }, stats.total > 0 ? `💬${stats.total}` : '💬'));
      g.appendChild(chatChip);

      targetLayer.appendChild(g);
    };

    this.pillars.forEach(p => {
      if (p.id !== selectedPillar.id) drawPillarNode(p, nodeLayer);
    });

    const selPos = coords[selectedPillar.id];
    const subNodes = PortalData.getSubNodes(selectedPillar.id);
    if (selPos && subNodes.length > 0) {
      const baseAngle = Math.atan2(cy - selPos.y, cx - selPos.x);
      const count = subNodes.length;
      const spread = Math.min(2.15, 0.68 * (count - 1));
      const subW = 152, subH = 38;

      subNodes.forEach((sub, idx) => {
        const t = count === 1 ? 0 : (idx / (count - 1)) - 0.5;
        const angle = baseAngle + t * spread;
        const radius = (idx % 2 === 1 && count >= 3) ? 206 : 160;

        let sx = selPos.x + Math.cos(angle) * radius;
        let sy = selPos.y + Math.sin(angle) * radius;
        sx = Math.max(92, Math.min(948, sx));
        sy = Math.max(58, Math.min(602, sy));

        const dxHub = sx - cx;
        const dyHub = sy - cy;
        const distHub = Math.hypot(dxHub, dyHub);
        if (distHub < 116 && distHub > 0.1) {
          sx = cx + (dxHub / distHub) * 120;
          sy = cy + (dyHub / distHub) * 120;
        }

        const cpx = (selPos.x + sx) / 2;
        const cpy = selPos.y + (sy - selPos.y) * 0.25;
        const stem = makeElement('svg:path', {
          d: `M ${selPos.x} ${selPos.y} Q ${cpx} ${cpy} ${sx} ${sy}`,
          fill: 'none', stroke: selectedPillar.accent, 'stroke-width': '1.6', opacity: '0.88'
        });
        stem.classList.add('pt-hero-edge-active');
        focalLayer.appendChild(stem);

        const isSubSelected = this.selectedSubNodeId === sub.id;
        const subG = makeElement('svg:g', {
          transform: `translate(${sx - subW / 2}, ${sy - subH / 2})`,
          className: 'pt-stage-subnode',
          style: { animationDelay: `${idx * 45}ms` },
          onclick: (e) => {
            e.stopPropagation();
            this.selectedSubNodeId = sub.id;
            this._launchSubNode(sub, selectedPillar);
          }
        });

        subG.appendChild(makeElement('svg:rect', {
          className: 'pt-subnode-bg',
          width: String(subW), height: String(subH), rx: '8',
          fill: isSubSelected ? '#0f253e' : '#080e1c',
          stroke: isSubSelected ? '#00f2fe' : selectedPillar.accent,
          'stroke-width': isSubSelected ? '2' : '1.3'
        }));

        const kindTag = sub.kind === 'app' ? '🚀' : (sub.kind === 'chapter' ? '📖' : (sub.kind === 'action' ? '🔎' : '📄'));
        subG.appendChild(makeElement('svg:text', {
          x: '9', y: '15.5', fill: '#f8fafc', 'font-family': 'system-ui, -apple-system, sans-serif',
          'font-size': '10.2', 'font-weight': '700'
        }, `${kindTag} ${sub.label}`));
        subG.appendChild(makeElement('svg:text', {
          x: '9', y: '29.5', fill: '#94a3b8', 'font-family': 'monospace', 'font-size': '8.2'
        }, sub.sub || ''));

        focalLayer.appendChild(subG);
      });
    }

    drawPillarNode(selectedPillar, focalLayer);

    if (selPos && this.drawerTab === 'comments') {
      const tether = makeElement('svg:path', {
        d: `M ${selPos.x + selPos.w / 2} ${selPos.y} C ${(selPos.x + 1040) / 2} ${selPos.y}, 980 160, 1040 135`,
        fill: 'none', stroke: '#10b981', 'stroke-width': '2', 'stroke-dasharray': '5,4', opacity: '0.9'
      });
      tether.classList.add('pt-hero-edge-active');
      focalLayer.appendChild(tether);
    }
  }

  _renderBlueprintSvg() {
    this.svgEl.setAttribute('viewBox', '0 0 1180 760');
    this.svgEl.appendChild(this._buildCommonSvgDefs('pt-bp-grid', 'pt-bp-glow'));
    this.svgEl.appendChild(makeElement('svg:rect', { width: '1180', height: '760', fill: 'url(#pt-bp-grid)' }));

    const cx = 590, cy = 380;
    const leftOrder = ['family', 'financial', 'cadplan_spec', 'accucad_live', 'career'];
    const rightOrder = ['luno', 'homesetup', 'economics', 'curve_drawing_spear', 'economics_spear'];

    const titles = {
      family: '⚖️ Family, Situation & Stella',
      financial: '📊 Financial Valuation',
      cadplan_spec: '📐 CadPlan Spec + 3D',
      accucad_live: '🚀 AccuCAD 3D App',
      career: '📜 AccuDraw & Aardvark',
      luno: '🌙 Luno Workspace',
      homesetup: '🖥️ Home Setup & Fleet',
      economics: '🏛️ Master Opus & Lib',
      curve_drawing_spear: '〰️ Kinetic Curve App',
      economics_spear: '🤖 Economics Essay'
    };

    const edgeLayer = makeElement('svg:g', {});
    const nodeLayer = makeElement('svg:g', {});
    this.svgEl.append(edgeLayer, nodeLayer);

    const centerG = makeElement('svg:g', {
      transform: `translate(${cx - 66}, ${cy - 22})`,
      className: 'pt-stage-svg-node',
      onclick: () => {
        this.expandAllMode = false;
        this.expandAllBtn.classList.remove('pt-btn-cyan');
        this.expandAllBtn.textContent = '⊞ Expand All';
        this._renderSvg();
      }
    });
    centerG.appendChild(makeElement('svg:rect', {
      width: '132', height: '44', rx: '22', fill: '#071b2e', stroke: '#00f2fe', 'stroke-width': '1.6', filter: 'url(#pt-bp-glow)'
    }));
    centerG.appendChild(makeElement('svg:text', {
      x: '66', y: '26', fill: '#00f2fe', 'font-family': 'monospace', 'font-size': '10.2', 'font-weight': 'bold', 'text-anchor': 'middle'
    }, '◎ ORBIT VIEW'));
    nodeLayer.appendChild(centerG);

    const renderRackColumn = (ids, isLeft) => {
      ids.forEach((id, rowIdx) => {
        const p = this.byId[id];
        if (!p) return;
        const yBand = 86 + rowIdx * 145;
        const px = isLeft ? 268 : 722;
        const pw = 190, ph = 44;
        const pCenterX = px + pw / 2;
        const isSel = this.selectedPillarId === id;
        const stats = PortalConstellationStage.getCommentStats(id);

        const busPath = makeElement('svg:path', {
          d: `M ${cx} ${cy} C ${(cx + pCenterX) / 2} ${cy}, ${(cx + pCenterX) / 2} ${yBand}, ${isLeft ? px + pw : px} ${yBand}`,
          fill: 'none', stroke: p.accent, 'stroke-width': isSel ? '2.2' : '1.2', opacity: isSel ? '0.95' : '0.35'
        });
        if (isSel) busPath.classList.add('pt-hero-edge-active');
        edgeLayer.appendChild(busPath);

        const pg = makeElement('svg:g', {
          transform: `translate(${px}, ${yBand - ph / 2})`,
          className: 'pt-stage-svg-node',
          onclick: () => this.selectPillar(id)
        });
        pg.appendChild(makeElement('svg:rect', {
          width: String(pw), height: String(ph), rx: '9',
          fill: isSel ? '#0b182d' : '#070b14', stroke: p.accent, 'stroke-width': isSel ? '2.2' : '1.3',
          filter: isSel ? 'url(#pt-bp-glow)' : 'none'
        }));
        pg.appendChild(makeElement('svg:text', {
          x: '10', y: '18.5', fill: '#f8fafc', 'font-family': 'system-ui, -apple-system, sans-serif', 'font-size': '10.5', 'font-weight': '700'
        }, titles[id] || p.name));
        pg.appendChild(makeElement('svg:text', {
          x: '10', y: '34', fill: p.accent, 'font-family': 'monospace', 'font-size': '8.4'
        }, `${stats.total > 0 ? `💬 ${stats.total} • ` : ''}Click to read contents`));
        nodeLayer.appendChild(pg);

        const subs = PortalData.getSubNodes(id);
        const subX = isLeft ? 18 : 950;
        const subW = 212, subH = 26, gap = 5;
        const totalH = subs.length * subH + (subs.length - 1) * gap;
        const startY = yBand - totalH / 2;

        subs.forEach((sub, sIdx) => {
          const sy = startY + sIdx * (subH + gap);
          const sCenterY = sy + subH / 2;
          const traceStart = isLeft ? px : px + pw;
          const traceEnd = isLeft ? subX + subW : subX;
          edgeLayer.appendChild(makeElement('svg:path', {
            d: `M ${traceStart} ${yBand} C ${(traceStart + traceEnd) / 2} ${yBand}, ${(traceStart + traceEnd) / 2} ${sCenterY}, ${traceEnd} ${sCenterY}`,
            fill: 'none', stroke: p.accent, 'stroke-width': '1', opacity: isSel ? '0.82' : '0.32'
          }));

          const sg = makeElement('svg:g', {
            transform: `translate(${subX}, ${sy})`,
            className: 'pt-stage-subnode',
            onclick: () => {
              this.selectedPillarId = id;
              this.selectedSubNodeId = sub.id;
              this._launchSubNode(sub, p);
            }
          });
          sg.appendChild(makeElement('svg:rect', {
            className: 'pt-subnode-bg',
            width: String(subW), height: String(subH), rx: '6',
            fill: '#080d19', stroke: p.accent, 'stroke-width': '1.1'
          }));
          const kTag = sub.kind === 'app' ? '🚀' : (sub.kind === 'chapter' ? '📖' : (sub.kind === 'action' ? '🔎' : '📄'));
          sg.appendChild(makeElement('svg:text', {
            x: '8', y: '16.5', fill: '#e2e8f0', 'font-family': 'system-ui, -apple-system, sans-serif', 'font-size': '9.8', 'font-weight': '600'
          }, `${kTag} ${sub.label}`));
          nodeLayer.appendChild(sg);
        });
      });
    };

    renderRackColumn(leftOrder, true);
    renderRackColumn(rightOrder, false);
  }

  _launchSubNode(sub, pillar, forceMode = null) {
    if (!sub) return;
    if (sub.action === 'copy_blind') {
      navigator.clipboard?.writeText(PortalData.getUnprimedVerificationPrompt()).then(() => {
        this._flashStageNotice('✓ Copied blind verification prompt! Paste into incognito Google Search or Gemini.');
      });
      return;
    }

    const mode = forceMode || this.openPref;
    if (mode === 'reader' && (sub.docPageId || pillar?.docPageId)) {
      const targetDocPage = sub.docPageId || pillar.docPageId;
      this.close(true);
      this.portalApp.openInDocumentReader(targetDocPage);
      return;
    }

    if (!sub.url && sub.docPageId) {
      this.drawerTab = 'contents';
      this.closeSplitPreview();
      this._syncDrawerTabs();
      this._renderDrawer();
      return;
    }

    const url = sub.url || pillar?.url;
    if (!url) return;

    if (mode === 'newtab') {
      window.open(url, '_blank', 'noopener,noreferrer');
      return;
    }

    if (mode === 'split') {
      this.openSplitPreview(url, `${pillar?.icon || '📄'} ${sub.label}`, sub.id || pillar?.id);
      return;
    }

    this.openInlineFrame(url, `${pillar?.icon || '📄'} ${sub.label}`, sub.id || pillar?.id);
  }

  openSplitPreview(url, title, targetId) {
    this.closeInlineFrame();
    this.closeSplitPreview();

    const iframe = makeElement('iframe', {
      src: url,
      title: title || 'Live Document',
      style: { flex: '1', width: '100%', height: '100%', border: 'none', background: '#060911' }
    });

    const bar = makeElement('div', { className: 'pt-stage-frame-bar' }, [
      makeElement('div', { style: { display: 'flex', alignItems: 'center', gap: '8px', minWidth: 0 } }, [
        makeElement('strong', { style: { fontSize: '12px', color: '#00f2fe', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' } }, title),
        makeElement('span', { style: { fontFamily: 'var(--pt-mono)', fontSize: '9.5px', color: '#64748b', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' } }, url)
      ]),
      makeElement('div', { style: { display: 'flex', gap: '5px', flexWrap: 'wrap' } }, [
        makeElement('button', {
          className: 'pt-btn pt-btn-emerald',
          style: { padding: '3px 8px', fontSize: '10px' },
          onclick: () => {
            this.closeSplitPreview();
            this.drawerTab = 'comments';
            this._syncDrawerTabs();
            this._renderDrawer();
          }
        }, '💬 Comment'),
        makeElement('button', {
          className: 'pt-btn pt-btn-cyan',
          style: { padding: '3px 8px', fontSize: '10px' },
          onclick: () => this.openInlineFrame(url, title, targetId)
        }, '⛶ Full Frame'),
        makeElement('a', {
          href: url, target: '_blank', rel: 'noopener noreferrer',
          className: 'pt-btn pt-btn-amber', style: { padding: '3px 8px', fontSize: '10px' }
        }, '↗ Tab'),
        makeElement('button', {
          className: 'pt-btn',
          style: { padding: '3px 8px', fontSize: '10px', color: '#f87171' },
          onclick: () => this.closeSplitPreview()
        }, '✕')
      ])
    ]);

    this.splitPreview = makeElement('div', { className: 'pt-stage-split-frame' }, [bar, iframe]);
    if (this.drawer) this.drawer.style.display = 'none';
    this.workspace.appendChild(this.splitPreview);
  }

  closeSplitPreview() {
    if (this.splitPreview) {
      this.splitPreview.remove();
      this.splitPreview = null;
    }
    if (this.drawer) this.drawer.style.display = 'flex';
  }

  openInlineFrame(url, title, commentTargetId) {
    this.closeSplitPreview();
    this.closeInlineFrame();
    const iframe = makeElement('iframe', {
      src: url,
      title: title || 'Document Preview',
      style: { flex: '1', width: '100%', height: '100%', border: 'none', background: '#060911' }
    });

    const bar = makeElement('div', { className: 'pt-stage-frame-bar' }, [
      makeElement('div', { style: { display: 'flex', alignItems: 'center', gap: '10px', minWidth: 0 } }, [
        makeElement('button', {
          className: 'pt-btn pt-btn-cyan',
          onclick: () => this.closeInlineFrame()
        }, '← Back to Spatial Map'),
        makeElement('strong', { style: { fontSize: '12.5px', color: '#f8fafc', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' } }, title),
        makeElement('span', { style: { fontFamily: 'var(--pt-mono)', fontSize: '10px', color: '#64748b', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' } }, url)
      ]),
      makeElement('div', { style: { display: 'flex', gap: '6px', flexWrap: 'wrap' } }, [
        makeElement('button', {
          className: 'pt-btn',
          onclick: () => this.openSplitPreview(url, title, commentTargetId)
        }, '◧ Side-by-Side'),
        makeElement('button', {
          className: 'pt-btn pt-btn-emerald',
          onclick: () => {
            this.closeInlineFrame();
            this.drawerTab = 'comments';
            this._syncDrawerTabs();
            this._renderDrawer();
          }
        }, '💬 Comment'),
        makeElement('button', {
          className: 'pt-btn',
          onclick: () => { iframe.src = url; }
        }, '↻ Reload'),
        makeElement('a', {
          href: url, target: '_blank', rel: 'noopener noreferrer', className: 'pt-btn pt-btn-amber'
        }, '↗ Pop Out Tab')
      ])
    ]);

    this.frameLayer = makeElement('div', { className: 'pt-stage-frame-layer' }, [bar, iframe]);
    this.workspace.appendChild(this.frameLayer);
  }

  closeInlineFrame() {
    if (this.frameLayer) {
      this.frameLayer.remove();
      this.frameLayer = null;
    }
  }

  _flashStageNotice(msg) {
    const notice = makeElement('div', {
      style: {
        position: 'absolute', top: '14px', left: '50%', transform: 'translateX(-50%)',
        background: '#062b20', color: '#34d399', border: '1px solid #10b981',
        borderRadius: '18px', padding: '6px 14px', fontFamily: 'var(--pt-mono)',
        fontSize: '11px', fontWeight: 'bold', zIndex: 50, boxShadow: '0 8px 24px rgba(0,0,0,0.6)'
      }
    }, msg);
    this.canvasWrap?.appendChild(notice);
    setTimeout(() => notice.remove(), 2800);
  }

  async _renderDrawer() {
    if (!this.drawerBody) return;
    const p = this.byId[this.selectedPillarId] || this.pillars[0];
    if (!p) return;

    const stats = PortalConstellationStage.getCommentStats(p.id);
    if (this.tabCommentsBtn) {
      this.tabCommentsBtn.textContent = stats.total > 0 ? `💬 (${stats.total})` : '💬 Comments';
    }

    this.drawerBody.innerHTML = '';

    if (this.drawerTab === 'comments') {
      await this._renderCommentsDrawer(p);
      return;
    }

    if (this.drawerTab === 'links') {
      this._renderLinksDrawer(p, stats);
      return;
    }

    this._renderContentsDrawer(p, stats);
  }

  _renderContentsDrawer(p, stats) {
    const head = makeElement('div', {
      style: { borderLeft: `3.5px solid ${p.accent}`, paddingLeft: '11px', display: 'flex', flexDirection: 'column', gap: '3px' }
    }, [
      makeElement('span', { style: { fontFamily: 'var(--pt-mono)', fontSize: '9.5px', fontWeight: '800', color: p.accent } }, p.badge),
      makeElement('h3', { style: { fontSize: '16px', fontWeight: '800', color: '#f8fafc', margin: 0 } }, `${p.icon} ${p.name}`),
      makeElement('div', { style: { fontSize: '11.5px', color: '#94a3b8' } }, p.subtitle)
    ]);

    const actions = makeElement('div', { style: { display: 'flex', gap: '6px', flexWrap: 'wrap' } }, [
      makeElement('button', {
        className: 'pt-btn pt-btn-cyan',
        style: { flex: '1', justifyContent: 'center' },
        onclick: () => this.openSplitPreview(p.url, `${p.icon} ${p.name}`, p.id)
      }, '◧ View Live Side-by-Side'),
      makeElement('a', {
        href: p.url, target: '_blank', rel: 'noopener noreferrer', className: 'pt-btn'
      }, '↗ Tab'),
      makeElement('button', {
        className: 'pt-btn pt-btn-emerald',
        onclick: () => { this.drawerTab = 'comments'; this._syncDrawerTabs(); this._renderDrawer(); }
      }, `💬 (${stats.total})`)
    ]);

    const contentBox = makeElement('div', { className: 'pt-reader-content-box' });

    const docPageId = p.docPageId;
    const hasDocContent = typeof PortalDocContent !== 'undefined' && typeof PortalDocContent.manifest === 'function';
    const secDefs = hasDocContent ? PortalDocContent.manifest().filter(s => s.section === docPageId) : [];

    if (secDefs.length > 0) {
      secDefs.forEach(sec => {
        if (sec.title) contentBox.appendChild(makeElement('div', { className: 'pt-reader-sec-title' }, sec.title));
        (sec.blocks || []).forEach(b => {
          if (b.sensitive && typeof SensitiveContextGate !== 'undefined' && !SensitiveContextGate.isUnlocked()) {
            contentBox.appendChild(SensitiveContextGate.renderLockedBlock(b, () => this._renderDrawer()));
            return;
          }
          if (typeof PortalDocContent[b.id] === 'function') {
            const items = PortalDocContent[b.id]();
            const arr = Array.isArray(items) ? items : [items];
            if (b.semiSensitive) {
              const det = makeElement('details', {
                style: { background: 'rgba(15,23,42,0.7)', border: '1px solid #1e293b', borderRadius: '6px', padding: '8px 10px' }
              }, [
                makeElement('summary', { style: { cursor: 'pointer', fontSize: '11.5px', fontWeight: '700', color: '#94a3b8' } }, `▸ ${b.semiSensitiveLabel || 'Additional Context'}`),
                ...arr.map(t => makeElement('p', { className: 'pt-reader-para', style: { marginTop: '8px' } }, String(t).replace(/\*\*/g, '')))
              ]);
              contentBox.appendChild(det);
            } else {
              arr.forEach(t => {
                contentBox.appendChild(makeElement('p', { className: 'pt-reader-para' }, String(t).replace(/\*\*/g, '')));
              });
            }
          }
        });
      });
    } else {
      contentBox.appendChild(makeElement('p', { className: 'pt-reader-para' }, p.publicSummary));
    }

    if (p.calmNote) {
      contentBox.appendChild(makeElement('div', {
        style: { fontSize: '11.5px', color: '#94a3b8', background: '#09101e', border: '1px solid #1e293b', borderRadius: '6px', padding: '8px 10px', lineHeight: '1.45' }
      }, `💡 ${p.calmNote}`));
    }

    const subNodes = PortalData.getSubNodes(p.id);
    const quickSubs = makeElement('div', { style: { display: 'flex', flexDirection: 'column', gap: '5px' } }, [
      makeElement('strong', { style: { fontFamily: 'var(--pt-mono)', fontSize: '10px', color: '#38bdf8' } }, `SUBCATEGORIES & LIVE TARGETS (${subNodes.length})`),
      makeElement('div', { style: { display: 'flex', flexWrap: 'wrap', gap: '6px' } },
        subNodes.map(sub => makeElement('button', {
          className: 'pt-btn',
          style: { fontSize: '10.5px', padding: '4px 9px', borderColor: `${p.accent}55` },
          onclick: () => this._launchSubNode(sub, p)
        }, `${sub.label} ↗`))
      )
    ]);

    const crossSection = makeElement('div', { style: { display: 'flex', flexDirection: 'column', gap: '5px', paddingTop: '6px', borderTop: '1px solid #1e293b' } }, [
      makeElement('strong', { style: { fontFamily: 'var(--pt-mono)', fontSize: '10px', color: '#c084fc' } }, '🔗 CONNECTED PILLARS'),
      makeElement('div', { style: { display: 'flex', gap: '6px', flexWrap: 'wrap' } },
        (p.crossLinks || []).map(cl => makeElement('button', {
          className: 'pt-btn',
          style: { fontSize: '10.5px', padding: '4px 9px' },
          onclick: () => this.selectPillar(cl.targetId)
        }, `→ ${cl.label}`))
      )
    ]);

    this.drawerBody.append(head, actions, contentBox, quickSubs, crossSection);
  }

  _renderLinksDrawer(p, stats) {
    const subNodes = PortalData.getSubNodes(p.id);
    const head = makeElement('div', {
      style: { borderLeft: `3.5px solid ${p.accent}`, paddingLeft: '11px' }
    }, [
      makeElement('strong', { style: { color: '#f8fafc', fontSize: '14px', display: 'block' } }, `${p.icon} ${p.name}`),
      makeElement('span', { style: { color: '#94a3b8', fontSize: '11px' } }, `${subNodes.length} Sub-Links • ${(p.targetFiles || []).length} Source Files`)
    ]);

    const subSection = makeElement('div', { style: { display: 'flex', flexDirection: 'column', gap: '7px' } },
      subNodes.map(sub => makeElement('div', {
        style: {
          background: '#070c17', border: '1px solid #1e293b', borderRadius: '8px',
          padding: '8px 10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '8px'
        }
      }, [
        makeElement('div', { style: { minWidth: 0, cursor: 'pointer', flex: '1' }, onclick: () => this._launchSubNode(sub, p) }, [
          makeElement('strong', { style: { fontSize: '12px', color: '#f8fafc', display: 'block' } }, sub.label),
          makeElement('span', { style: { fontSize: '10.5px', color: '#94a3b8' } }, sub.sub || '')
        ]),
        makeElement('div', { style: { display: 'flex', gap: '4px', flexShrink: 0 } }, [
          makeElement('button', {
            className: 'pt-btn',
            style: { padding: '3px 7px', fontSize: '10px', borderColor: `${p.accent}66`, color: p.accent },
            title: 'Open with current mode preference',
            onclick: () => this._launchSubNode(sub, p)
          }, '◧ View'),
          sub.url ? makeElement('a', {
            href: sub.url, target: '_blank', rel: 'noopener noreferrer',
            className: 'pt-btn', style: { padding: '3px 7px', fontSize: '10px' }, title: 'Open in separate window/tab'
          }, '↗') : null
        ].filter(Boolean))
      ]))
    );

    const filesCard = makeElement('div', {
      style: { background: '#05080f', border: '1px solid #1e293b', borderRadius: '8px', padding: '10px 12px' }
    }, [
      makeElement('div', { style: { fontFamily: 'var(--pt-mono)', fontSize: '10px', color: '#38bdf8', fontWeight: 'bold', marginBottom: '5px' } }, '📁 PRIMARY WORKSPACE FILES:'),
      ...(p.targetFiles || []).map(f => makeElement('div', { style: { fontFamily: 'var(--pt-mono)', fontSize: '10.5px', color: '#cbd5e1', padding: '2px 0' } }, `• ${f}`))
    ]);

    this.drawerBody.append(head, subSection, filesCard);
  }

  async _renderCommentsDrawer(p) {
    const threadId = `thread_Portal_frontpage_${p.id}`;
    const adapter = typeof SupabaseCommentsAdapter !== 'undefined' ? new SupabaseCommentsAdapter() : null;

    const banner = makeElement('div', {
      style: {
        background: 'rgba(16, 185, 129, 0.08)', border: '1px solid rgba(16, 185, 129, 0.35)',
        borderRadius: '8px', padding: '10px 12px', display: 'flex', flexDirection: 'column', gap: '6px'
      }
    }, [
      makeElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' } }, [
        makeElement('strong', { style: { fontFamily: 'var(--pt-mono)', fontSize: '11px', color: '#34d399' } }, `💬 TETHERED THREAD • ${p.icon} ${p.name}`),
        makeElement('span', { style: { fontFamily: 'var(--pt-mono)', fontSize: '9.5px', color: '#94a3b8' } }, adapter && !adapter.isLocalFallback ? '☁️ Supabase' : '💾 Local + Sync')
      ]),
      makeElement('button', {
        className: 'pt-btn pt-btn-emerald',
        style: { width: '100%', justifyContent: 'center', fontSize: '10.5px' },
        onclick: () => {
          this.close();
          setTimeout(() => this.portalApp.startCommentOnAnythingMode(), 260);
        }
      }, '🎯 Pick Any Element on Front Page to Comment')
    ]);

    const listEl = makeElement('div', {
      style: { flex: '1', minHeight: '140px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '8px' }
    });

    const loadComments = async () => {
      listEl.innerHTML = '';
      let posts = [];
      if (adapter) posts = await adapter.fetchComments(threadId);
      let directives = [];
      if (typeof CadPlanItemNotes !== 'undefined' && typeof CadPlanItemNotes.getNotesForBlock === 'function') {
        directives = (await CadPlanItemNotes.getNotesForBlock('frontpage', p.id, 'Portal')).filter(n => n.status !== 'resolved');
      }

      if (posts.length === 0 && directives.length === 0) {
        listEl.appendChild(makeElement('div', {
          style: { padding: '20px 12px', textAlign: 'center', color: '#64748b', fontSize: '12px', fontStyle: 'italic', border: '1px dashed #1e293b', borderRadius: '8px' }
        }, `No comments on "${p.name}" yet. Write one below—or click "Pick Any Element" to comment on any paragraph, card, or link.`));
        return;
      }

      directives.forEach(d => {
        listEl.appendChild(makeElement('div', {
          style: { background: 'rgba(0, 242, 254, 0.06)', border: '1px solid rgba(0, 242, 254, 0.35)', borderLeft: '3px solid #00f2fe', borderRadius: '6px', padding: '8px 10px' }
        }, [
          makeElement('div', { style: { display: 'flex', justifyContent: 'space-between', fontSize: '10px', color: '#00f2fe', marginBottom: '3px' } }, [
            makeElement('strong', {}, `📝 ${d.author || 'Author'} Directive`),
            makeElement('span', { style: { color: '#64748b' } }, new Date(d.timestamp).toLocaleTimeString())
          ]),
          makeElement('div', { style: { fontSize: '12px', color: '#f1f5f9', lineHeight: '1.45' } }, d.text)
        ]));
      });

      posts.forEach(c => {
        listEl.appendChild(makeElement('div', {
          style: { background: 'rgba(255, 255, 255, 0.03)', border: '1px solid #1e293b', borderLeft: '3px solid #10b981', borderRadius: '6px', padding: '8px 10px' }
        }, [
          makeElement('div', { style: { display: 'flex', justifyContent: 'space-between', fontSize: '10px', color: '#94a3b8', marginBottom: '3px' } }, [
            makeElement('strong', { style: { color: '#34d399' } }, c.author_name || 'Guest Reader'),
            makeElement('span', {}, c.created_at ? new Date(c.created_at).toLocaleTimeString() : '')
          ]),
          makeElement('div', { style: { fontSize: '12px', color: '#f1f5f9', lineHeight: '1.45' } }, c.text)
        ]));
      });
    };

    const authorInput = makeElement('input', {
      type: 'text', placeholder: 'Your name...',
      value: localStorage.getItem('dr_comment_author') || 'Rob Brown',
      style: {
        background: '#050811', color: '#f8fafc', border: '1px solid #1e293b',
        borderRadius: '6px', padding: '6px 10px', fontSize: '11.5px', outline: 'none'
      }
    });

    const composerArea = makeElement('textarea', {
      id: 'pt-stage-comment-input',
      placeholder: `Add a comment on ${p.name}...`,
      style: {
        width: '100%', minHeight: '72px', background: '#050811', color: '#f8fafc',
        border: '1px solid #1e293b', borderRadius: '8px', padding: '8px 10px',
        fontSize: '12px', lineHeight: '1.45', resize: 'vertical', outline: 'none'
      }
    });
    const composerWrap = makeElement('div', { style: { position: 'relative' } }, [composerArea]);
    if (typeof DictationWidget !== 'undefined' && typeof DictationWidget.attach === 'function') {
      setTimeout(() => DictationWidget.attach(composerArea), 20);
    }

    const postBtn = makeElement('button', {
      className: 'pt-btn pt-btn-emerald',
      style: { flex: '1', justifyContent: 'center' },
      onclick: async () => {
        const txt = composerArea.value.trim();
        if (!txt) return;
        const authorName = authorInput.value.trim() || 'Guest Reader';
        try { localStorage.setItem('dr_comment_author', authorName); } catch (e) {}
        if (adapter) await adapter.postComment({ threadId, authorName, text: txt });
        composerArea.value = '';
        await loadComments();
        this._renderSvg();
        window.dispatchEvent(new CustomEvent('portal-comments-updated'));
      }
    }, '💬 Post Comment');

    const directiveBtn = makeElement('button', {
      className: 'pt-btn pt-btn-cyan',
      title: 'Also save as an AI-compilable Living Directive in Luno',
      onclick: async () => {
        const txt = composerArea.value.trim();
        if (!txt || typeof CadPlanItemNotes === 'undefined') return;
        await CadPlanItemNotes.addNote('frontpage', p.id, txt, {
          dossierId: 'Portal',
          author: authorInput.value.trim() || 'Rob Brown',
          blockPreview: p.publicSummary.slice(0, 140)
        });
        composerArea.value = '';
        await loadComments();
        this._renderSvg();
        window.dispatchEvent(new CustomEvent('portal-comments-updated'));
      }
    }, '⚡ Pin Directive');

    this.drawerBody.append(
      banner,
      listEl,
      makeElement('div', { style: { display: 'flex', flexDirection: 'column', gap: '6px', paddingTop: '8px', borderTop: '1px solid #1e293b' } }, [
        authorInput,
        composerWrap,
        makeElement('div', { style: { display: 'flex', gap: '6px' } }, [postBtn, directiveBtn])
      ])
    );

    await loadComments();
  }

  async startDemo30s() {
    this.stopDemo30s();
    this.demoState = { running: true, paused: false, stepIdx: 0, timer: null };
    if (this.demoBtn) this.demoBtn.textContent = '⏹ Stop Demo';

    const steps = [
      {
        duration: 5000,
        title: '1 / 5 • Dynamic Ecosystem SVG & Contents',
        caption: 'The full-width Portal SVG expands smoothly into an elevated workspace—showing full node titles, cross-links, and readable chapter contents.',
        run: () => {
          this.expandAllMode = false;
          this.expandAllBtn.classList.remove('pt-btn-cyan');
          this.expandAllBtn.textContent = '⊞ Expand All';
          this.closeInlineFrame();
          this.closeSplitPreview();
          this.selectPillar('family', 'contents');
        }
      },
      {
        duration: 6000,
        title: '2 / 5 • Sub-Nodes Fan Out & Cross-Link Navigation',
        caption: 'Selecting any pillar fans its subcategories onto curved vector stems and illuminates connected nodes across domains.',
        run: () => {
          this.selectPillar('cadplan_spec', 'contents');
        }
      },
      {
        duration: 6500,
        title: '3 / 5 • Expand All & Side-by-Side Live Preview',
        caption: 'Toggle Expand All to see every link at once, or open any app/document side-by-side right next to the SVG map without leaving Portal.',
        run: () => {
          this.expandAllMode = true;
          this.expandAllBtn.classList.add('pt-btn-cyan');
          this.expandAllBtn.textContent = '◎ Orbit View';
          this._renderSvg();
          setTimeout(() => {
            if (!this.demoState?.running || this.demoState.paused) return;
            const curve = this.byId['curve_drawing_spear'];
            if (curve) this.openSplitPreview(curve.url, '〰️ Kinetic Curve & Markup Studio', curve.id);
          }, 2400);
        }
      },
      {
        duration: 7000,
        title: '4 / 5 • Comment on Anything (Tethered & Page-Wide)',
        caption: 'Click 💬 on any SVG node for a tethered thread, or use "Comment on Anything" to inspect and comment on any element anywhere on screen.',
        run: () => {
          this.closeSplitPreview();
          this.expandAllMode = false;
          this.expandAllBtn.classList.remove('pt-btn-cyan');
          this.expandAllBtn.textContent = '⊞ Expand All';
          this.selectPillar('accucad_live', 'comments');
        }
      },
      {
        duration: 5000,
        title: '5 / 5 • Ready to Explore',
        caption: 'Demo complete. Click any node to read its contents, switch Open Mode (◧ Split / 🪟 Frame / ↗ Tab / 📖 Reader), or post a comment.',
        run: () => {
          this.selectPillar('family', 'contents');
        }
      }
    ];

    const totalDuration = steps.reduce((acc, s) => acc + s.duration, 0);
    this._renderDemoHud(steps, totalDuration);

    const runStep = (idx) => {
      if (!this.demoState || !this.demoState.running) return;
      if (idx >= steps.length) {
        this.stopDemo30s(true);
        return;
      }
      this.demoState.stepIdx = idx;
      const s = steps[idx];
      s.run();
      this._updateDemoHud(steps, idx);

      clearTimeout(this.demoState.timer);
      if (!this.demoState.paused) {
        this.demoState.timer = setTimeout(() => runStep(idx + 1), s.duration);
      }
    };

    runStep(0);
  }

  _renderDemoHud(steps, totalDuration) {
    this.demoHud?.remove();
    this.demoHud = makeElement('div', { className: 'pt-demo-hud', 'data-aardvark-ignore': 'true' });

    this._demoTitleEl = makeElement('strong', { style: { fontFamily: 'var(--pt-mono)', fontSize: '11px', color: '#00f2fe' } }, '');
    this._demoTimeEl = makeElement('span', { style: { fontFamily: 'var(--pt-mono)', fontSize: '10.5px', color: '#94a3b8' } }, `~${Math.round(totalDuration / 1000)}s Tour`);
    this._demoCaptionEl = makeElement('div', { style: { fontSize: '12px', color: '#e2e8f0', lineHeight: '1.45' } }, '');
    this._demoBarFill = makeElement('div', {
      style: { height: '100%', width: '0%', background: 'linear-gradient(90deg, #00f2fe, #10b981)', transition: 'width 0.4s ease' }
    });

    this._demoPauseBtn = makeElement('button', {
      className: 'pt-btn',
      style: { padding: '3px 9px', fontSize: '10.5px' },
      onclick: () => {
        if (!this.demoState) return;
        this.demoState.paused = !this.demoState.paused;
        this._demoPauseBtn.textContent = this.demoState.paused ? '▶ Resume' : '⏸ Pause';
        if (this.demoState.paused) {
          clearTimeout(this.demoState.timer);
        } else {
          const cur = this.demoState.stepIdx;
          const dur = steps[cur]?.duration || 5000;
          this.demoState.timer = setTimeout(() => this._advanceDemoFrom(steps, cur + 1), dur);
        }
      }
    }, '⏸ Pause');

    const nextBtn = makeElement('button', {
      className: 'pt-btn pt-btn-cyan',
      style: { padding: '3px 9px', fontSize: '10.5px' },
      onclick: () => {
        if (!this.demoState) return;
        clearTimeout(this.demoState.timer);
        this._advanceDemoFrom(steps, this.demoState.stepIdx + 1);
      }
    }, '⏭ Next');

    const exitBtn = makeElement('button', {
      className: 'pt-btn',
      style: { padding: '3px 9px', fontSize: '10.5px', color: '#f87171' },
      onclick: () => this.stopDemo30s()
    }, '✕ Stop');

    this.demoHud.append(
      makeElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '10px' } }, [
        this._demoTitleEl,
        makeElement('div', { style: { display: 'flex', alignItems: 'center', gap: '6px' } }, [this._demoTimeEl, this._demoPauseBtn, nextBtn, exitBtn])
      ]),
      this._demoCaptionEl,
      makeElement('div', { style: { height: '4px', width: '100%', background: '#1e293b', borderRadius: '4px', overflow: 'hidden' } }, [this._demoBarFill])
    );

    document.body.appendChild(this.demoHud);
  }

  _advanceDemoFrom(steps, idx) {
    if (!this.demoState || !this.demoState.running) return;
    if (idx >= steps.length) {
      this.stopDemo30s(true);
      return;
    }
    this.demoState.stepIdx = idx;
    steps[idx].run();
    this._updateDemoHud(steps, idx);
    if (!this.demoState.paused) {
      this.demoState.timer = setTimeout(() => this._advanceDemoFrom(steps, idx + 1), steps[idx].duration);
    }
  }

  _updateDemoHud(steps, idx) {
    const s = steps[idx];
    if (!s) return;
    if (this._demoTitleEl) this._demoTitleEl.textContent = s.title;
    if (this._demoCaptionEl) this._demoCaptionEl.textContent = s.caption;
    const pct = Math.round(((idx + 1) / steps.length) * 100);
    if (this._demoBarFill) this._demoBarFill.style.width = `${pct}%`;
  }

  stopDemo30s(completed = false) {
    if (this.demoState?.timer) clearTimeout(this.demoState.timer);
    if (this.demoState) this.demoState.running = false;
    this.demoState = null;
    if (this.demoBtn) this.demoBtn.textContent = '▶ 30s Demo';
    if (this.demoHud) {
      this.demoHud.remove();
      this.demoHud = null;
    }
    if (completed) {
      this._flashStageNotice('✓ 30s Walkthrough Complete — Explore any node or 💬 Comment freely!');
    }
  }
}

globalThis.PortalConstellationStage = PortalConstellationStage;
if (typeof module !== 'undefined' && module.exports) module.exports = PortalConstellationStage;