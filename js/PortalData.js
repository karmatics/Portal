class PortalData {

  static getPillars() {
      const u = (proj, hash = '') => PortalData.resolveAppUrl(proj, hash);
      return [
        {
          id: 'curve_drawing_spear',
          category: 'spear',
          name: 'Freeform Curve Drawing Studio',
          icon: '〰️',
          accent: '#00f2fe',
          badge: 'TIP OF THE SPEAR • NEW INITIATIVE',
          subtitle: 'Controllable Web Curves in the Lightweight Spirit of Aardvark',
          url: u('QuoraToys'),
          docPageId: 'spear_drawing',
          publicSummary: 'A brand-new, web-first drawing initiative focused on smooth, deeply controllable freeform curves that feel effortless right inside any browser page—continuing the lightweight, approachable spirit of Aardvark (Rob’s widely known Firefox extension) rather than requiring heavy desktop CAD software.',
          calmNote: 'Separate from 3D AccuDraw: built for expressive, immediate web drawing, illustration, and annotation.',
          facts: ['Freeform Curve Control', 'Aardvark-Inspired UX', 'Instant Web Embed', 'DrawingApp & Overlay'],
          targetFiles: ['QuoraToys/luno.json', 'DrawingApp/luno.json', 'Library/GlowingTooltip.js'],
          extraLinks: [
            { label: 'Open Curve Studio', url: u('QuoraToys') },
            { label: 'DrawingApp', url: u('DrawingApp') }
          ],
          crossLinks: [
            { label: 'AccuCAD 3D Workstation', targetId: 'accucad_live' },
            { label: 'Economics of Automation', targetId: 'economics_spear' }
          ]
        },
        {
          id: 'economics_spear',
          category: 'spear',
          name: 'Economics of Automation',
          icon: '🤖',
          accent: '#34d399',
          badge: 'TIP OF THE SPEAR • PUBLIC READING',
          subtitle: 'Clear Visual Reading for Everyday Readers & Interactive Simulator',
          url: u('EconomicsOfAutomation'),
          docPageId: 'spear_economics',
          publicSummary: 'Accessible, plain-English reading material written for regular people—using the Colony of 100,000 thought experiment and an interactive tax & demand simulator to show how automated production can fund widespread prosperity through a Robot Dividend.',
          calmNote: 'Paired with JobsAndAI empirical analysis so readers can explore the full argument visually or via live charts.',
          facts: ['Written for Regular Readers', 'Colony of 100,000', 'Interactive Tax Simulator', 'Jobs & AI Companion'],
          targetFiles: ['EconomicsOfAutomation/luno.json', 'JobsAndAI/luno.json'],
          extraLinks: [
            { label: 'Open Visual Essay', url: u('EconomicsOfAutomation') },
            { label: 'Jobs & AI Horizon', url: u('JobsAndAI') }
          ],
          crossLinks: [
            { label: 'Freeform Curve Drawing Studio', targetId: 'curve_drawing_spear' },
            { label: 'Luno Workspace', targetId: 'luno' }
          ]
        },
        {
          id: 'accucad_live',
          category: 'cad',
          name: 'AccuCAD 3D Workstation',
          icon: '📐',
          accent: '#38bdf8',
          badge: 'LIVE 3D CAD APP',
          subtitle: 'Precision 3D WebGL Drafting with AccuDraw Kinetic Compass',
          url: u('accuCad'),
          docPageId: 'spear_accucad',
          publicSummary: 'If you want to see a full 3D engineering application running live in the browser, open AccuCAD—a Three.js drafting studio demonstrating precision 3D orientation locks, tentative snapping, direction-cosine axes, and wireless mobile pairing.',
          calmNote: 'Shows the precision 3D CAD craft behind AccuDraw running smoothly with zero installation.',
          facts: ['Live 3D WebGL Viewport', 'AccuDrawLogic Engine', 'Tentative Snapping', 'TouchController P2P'],
          targetFiles: ['accuCad/luno.json', 'CadPlan/luno.json', 'TouchController/luno.json'],
          extraLinks: [
            { label: 'Launch AccuCAD 3D', url: u('accuCad') },
            { label: 'CadPlan Spec', url: u('CadPlan') },
            { label: 'TouchController', url: u('TouchController') }
          ],
          crossLinks: [
            { label: 'AccuDraw Patent Record', targetId: 'career' },
            { label: 'Freeform Curve Drawing Studio', targetId: 'curve_drawing_spear' }
          ]
        },
        {
          id: 'career',
          category: 'cad',
          name: 'AccuDraw & Aardvark Heritage',
          icon: '📜',
          accent: '#60a5fa',
          badge: 'CAREER & PATENTS',
          subtitle: 'US Patent #5,754,182, SmartLine & 30-Year Engineering Archive',
          url: u('accudraw'),
          docPageId: 'career',
          publicSummary: 'Documents Rob Brown’s foundational CAD inventions at Bentley Systems (1994–1997)—AccuDraw, SmartLine, and PowerSelector, earning US Patent #5,754,182—alongside original 1995–1996 MicroStation Manager reprints and his history creating viral web utilities like Aardvark.',
          calmNote: 'Primary patent filings, historical reprints, and open spatial constraint documentation.',
          facts: ['US Patent #5,754,182', 'AccuDraw & SmartLine', '48/50 State DOT Standard', 'Aardvark Legacy'],
          targetFiles: ['accudraw/luno.json', 'CadPlan/luno.json'],
          extraLinks: [
            { label: 'Historical Archive', url: u('accudraw') },
            { label: 'CadPlan Spec', url: u('CadPlan') }
          ],
          crossLinks: [
            { label: 'Financial & Valuation Record', targetId: 'financial' },
            { label: 'AccuCAD 3D Workstation', targetId: 'accucad_live' }
          ]
        },
        {
          id: 'luno',
          category: 'system',
          name: 'Luno Workspace',
          icon: '🌙',
          accent: '#00f2fe',
          badge: 'PLATFORM CORE',
          subtitle: 'Phone-First Dual-Mode AI Development Cockpit',
          url: u('Luno'),
          docPageId: 'luno',
          publicSummary: 'Luno is the zero-token clipboard development environment that builds and maintains this entire ecosystem. It executes surgical ES6 AST method patches via HTML containers, synchronizes peer machines over Port 8080, and publishes independent projects to GitHub Pages in one tap.',
          calmNote: 'Open-architecture browser + Node.js workstation running locally on Mac & Ubuntu and statically on GitHub Pages.',
          facts: ['HTML Container Protocol', 'Acorn AST Method Patching', '1-Tap GitHub Pages Deploy', 'Phone-First Outbox/Inbox'],
          targetFiles: ['Luno/luno.json', 'Luno/app/ClientApp.js', 'Luno/core/LunoClassPatcher.js', 'Luno/core/LunoServer.js'],
          crossLinks: [
            { label: 'Home Setup & Fleet', targetId: 'homesetup' },
            { label: 'Freeform Curve Drawing Studio', targetId: 'curve_drawing_spear' }
          ]
        },
        {
          id: 'homesetup',
          category: 'system',
          name: 'Home Setup & Fleet',
          icon: '🖥️',
          accent: '#10b981',
          badge: 'INFRASTRUCTURE',
          subtitle: 'Multi-Node Port 8080 Federation & Universal Dictation',
          url: u('HomeSetup'),
          docPageId: 'homesetup',
          publicSummary: 'Documents the physical workstation fleet—an Apple Silicon Mac Mini, a portable Ubuntu demo laptop, a tethered Windows machine, two smartphones where Luno originated, and a roving exFAT drive—plus a zero-leak credential boundary and the universal voice dictation engine.',
          calmNote: '60 workspace projects and 50+ Git repositories synchronized cleanly between Mac (10.0.0.226) and Linux (10.0.0.245).',
          facts: ['Universal Port 8080 Mesh', '60 Projects / 50+ Repos', 'Zero-Leak Secret Policy', 'DictationWidget & Lattice'],
          targetFiles: ['HomeSetup/luno.json', 'HomeSetup/js/HomeSummaries.js', 'HomeSetup/HomeSetup.js', 'HomeSetup/js/HomeHandoffContent.js'],
          crossLinks: [
            { label: 'Luno Workspace', targetId: 'luno' },
            { label: 'Master Opus & Shared Library', targetId: 'economics' }
          ]
        },
        {
          id: 'financial',
          category: 'personal',
          name: 'Financial & Valuation Record',
          icon: '📊',
          accent: '#f59e0b',
          badge: 'VALUATION & REALITY',
          subtitle: 'Enterprise Value Attribution vs. Personal Financial Sovereignty',
          url: u('ValuationOfAccudraw'),
          docPageId: 'financial',
          publicSummary: 'Pairs quantitative counterfactual valuation models (`ValuationOfAccudraw`) with independent unprimed Google Search analyses attributing $1.2B–$5.54B+ ($2.3B 4-model midpoint) of Bentley Systems’ enterprise value to AccuDraw and SmartLine—contrasted transparently with personal financial hardship and current commercialization goals.',
          calmNote: 'Includes verbatim unprimed search prompts so any reader, evaluator, or family reviewer can independently reproduce the findings.',
          facts: ['$1.2B–$5.54B+ Attribution', '$2.3B 4-Model Midpoint', 'Unprimed Search Test', 'Commercialization Path'],
          targetFiles: ['ValuationOfAccudraw/luno.json', 'situation/luno.json', 'Opus/js/OpusVerificationContent.js'],
          extraLinks: [
            { label: 'Valuation Model', url: u('ValuationOfAccudraw') },
            { label: 'Executive Dossier', url: u('situation') }
          ],
          crossLinks: [
            { label: 'AccuDraw & Aardvark Heritage', targetId: 'career' },
            { label: 'Family, Stability & Context', targetId: 'family' }
          ]
        },
        {
          id: 'family',
          category: 'personal',
          name: 'Family, Stability & Personal Context',
          icon: '⚖️',
          accent: '#c084fc',
          badge: 'STABILIZED NOV 2026',
          subtitle: 'Calm Factual Overview, Daughter Focus & Protected Layer',
          url: u('situation'),
          docPageId: 'family',
          publicSummary: 'Presents a calm, constructive overview as of November 2026: day-to-day housing and utilities are stable, and current personal focus is preparing accurate documentation concerning his daughter while advancing software commercialization.',
          calmNote: 'Deeper sensitive family context is kept behind an optional detail gate rather than broadcast on the front page, while remaining openly inspectable in the underlying repository.',
          sensitiveSummary: 'Additional Sensitive Context (Protected Layer): Detailed family conflict records and Power of Attorney (POA) administrative background regarding Rob’s sister and mother are documented in the situation dossier.',
          facts: ['Nov 2026 Housing Stabilized', 'Daughter Focus', 'Constructive Record', 'Gated Sensitive Context'],
          targetFiles: ['situation/luno.json', 'Opus/js/OpusQ2NarrativeContent.js'],
          extraLinks: [
            { label: 'Situation Dossier', url: u('situation') },
            { label: 'Opus Narrative Chapter', url: u('Opus', '#q2_narrative') }
          ],
          crossLinks: [
            { label: 'Financial & Valuation Record', targetId: 'financial' },
            { label: 'Master Opus & Shared Library', targetId: 'economics' }
          ]
        },
        {
          id: 'economics',
          category: 'system',
          name: 'Master Opus & Shared Library',
          icon: '🏛️',
          accent: '#a78bfa',
          badge: 'ARCHITECTURE HUB',
          subtitle: '4-Quadrant Living Router & Zero-Copy Shared Modules',
          url: u('Opus'),
          docPageId: 'economics',
          publicSummary: 'Unites the 4-quadrant living specification (`Opus`) with the central `Library` hub (`DocumentReader`, `UITools`, `GlowingTooltip`, `ThreeJSLoader`, `DictationWidget`, `SensitiveContextGate`) powering every application with zero duplicated code.',
          calmNote: 'Provides tiered AI context routing (Tiers 0–3) and cross-referenced file pointers across all repositories.',
          facts: ['Opus 4-Quadrant Router', 'Zero-Copy Library', 'Tier 0–3 Context Depth', 'Living Notes & Aardvark'],
          targetFiles: ['Opus/luno.json', 'Opus/js/OpusSummaries.js', 'Library/luno.json'],
          extraLinks: [
            { label: 'Master Opus', url: u('Opus') },
            { label: 'Shared Library', url: u('Library') }
          ],
          crossLinks: [
            { label: 'Home Setup & Fleet', targetId: 'homesetup' },
            { label: 'Luno Workspace', targetId: 'luno' }
          ]
        }
      ];
    }
  static getScanManifestTargets() {
      return [
        { project: 'Portal', file: 'Portal/luno.json', kind: 'manifest' },
        { project: 'accuCad', file: 'accuCad/luno.json', kind: 'manifest' },
        { project: 'DrawingApp', file: 'DrawingApp/luno.json', kind: 'manifest' },
        { project: 'CadPlan', file: 'CadPlan/luno.json', kind: 'manifest' },
        { project: 'accudraw', file: 'accudraw/luno.json', kind: 'manifest' },
        { project: 'EconomicsOfAutomation', file: 'EconomicsOfAutomation/luno.json', kind: 'manifest' },
        { project: 'JobsAndAI', file: 'JobsAndAI/luno.json', kind: 'manifest' },
        { project: 'Luno', file: 'Luno/luno.json', kind: 'manifest' },
        { project: 'HomeSetup', file: 'HomeSetup/luno.json', kind: 'manifest' },
        { project: 'HomeSetup', file: 'HomeSetup/js/HomeSummaries.js', kind: 'summaries' },
        { project: 'Opus', file: 'Opus/luno.json', kind: 'manifest' },
        { project: 'Opus', file: 'Opus/js/OpusSummaries.js', kind: 'summaries' },
        { project: 'situation', file: 'situation/luno.json', kind: 'manifest' },
        { project: 'ValuationOfAccudraw', file: 'ValuationOfAccudraw/luno.json', kind: 'manifest' },
        { project: 'QuoraToys', file: 'QuoraToys/luno.json', kind: 'manifest' },
        { project: 'TouchController', file: 'TouchController/luno.json', kind: 'manifest' },
        { project: 'Library', file: 'Library/luno.json', kind: 'manifest' }
      ];
    }
  static getUnprimedVerificationPrompt() {
    return 'Tell me about Accudraw and smartline in MicroStation and who invented them and what the impact has been on Bentley systems and computer aided design. I’d specifically like to know how much this inventor created in economic value, in other words how much their being hired added to the current market capitalization of Bentley systems. Please give a range estimate in dollars as a speculative counterfactual. please do deep research to avoid hallucination, make sure you know the history.';
  }

  static resolveAppUrl(projectName, hash = '') {
      if (!projectName) return '#';
      const cleanHash = hash ? (hash.startsWith('#') ? hash : `#${hash}`) : '';
      if (typeof window !== 'undefined' && window.location) {
        const host = window.location.hostname || '';
        if (host.endsWith('.github.io')) {
          const user = host.split('.')[0] || 'karmatics';
          return `https://${user}.github.io/${projectName}/index.html${cleanHash}`;
        }
        if (window.location.protocol === 'about:') {
          try {
            const pHost = window.parent?.location?.hostname || '';
            if (pHost.endsWith('.github.io')) {
              const user = pHost.split('.')[0] || 'karmatics';
              return `https://${user}.github.io/${projectName}/index.html${cleanHash}`;
            }
            if (window.parent?.location?.origin && window.parent.location.origin !== 'null') {
              return `${window.parent.location.origin}/${projectName}/index.html${cleanHash}`;
            }
          } catch (e) {}
          return `https://karmatics.github.io/${projectName}/index.html${cleanHash}`;
        }
      }
      return `../${projectName}/index.html${cleanHash}`;
    }

  static getCategories() {
      return [
        { id: 'all', label: 'All Areas (9)' },
        { id: 'spear', label: '🎯 Tip of the Spear (2)' },
        { id: 'cad', label: '📐 CAD & Drawing (2)' },
        { id: 'system', label: '🌙 Luno & HomeSetup (3)' },
        { id: 'personal', label: '⚖️ Financial & Family (2)' }
      ];
    }
}

globalThis.PortalData = PortalData;
if (typeof module !== 'undefined' && module.exports) module.exports = PortalData;