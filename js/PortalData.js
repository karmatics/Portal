class PortalData {

  static getPillars() {
      const u = (proj, hash = '') => PortalData.resolveAppUrl(proj, hash);
      return [
        {
          id: 'drawing_spear',
          category: 'spear',
          name: 'Drawing App & AccuCAD 3D',
          icon: '🎯',
          accent: '#00f2fe',
          badge: 'TIP OF THE SPEAR • LIVE APP',
          subtitle: 'Flagship Live Software: AccuCAD 3D Workstation & DrawingApp',
          url: u('accuCad'),
          docPageId: 'spear_drawing',
          publicSummary: 'If you want to see a working, sophisticated application right now, launch AccuCAD—a full 3D WebGL CAD workstation built around AccuDraw’s floating kinetic compass, tentative snapping, and precision vector drafting—or open DrawingApp for spline/Bezier drawing and color-ring tools.',
          calmNote: 'Designed as a flagship public launch initiative to demonstrate engineering quality firsthand and draw attention to Luno and the broader ecosystem.',
          facts: ['Live 3D AccuCAD App', 'DrawingApp Splines', 'AccuDraw Kinetic Compass', 'Zero Install WebGL'],
          targetFiles: ['accuCad/luno.json', 'DrawingApp/luno.json', 'CadPlan/luno.json', 'QuoraToys/luno.json'],
          extraLinks: [
            { label: 'Launch AccuCAD 3D', url: u('accuCad') },
            { label: 'DrawingApp', url: u('DrawingApp') },
            { label: 'CadPlan Spec', url: u('CadPlan') },
            { label: 'QuoraToys Studio', url: u('QuoraToys') }
          ],
          crossLinks: [
            { label: 'Economics of Automation', targetId: 'economics_spear' },
            { label: 'Career & CAD Patents', targetId: 'career' }
          ]
        },
        {
          id: 'economics_spear',
          category: 'spear',
          name: 'Economics of Automation',
          icon: '🚀',
          accent: '#34d399',
          badge: 'TIP OF THE SPEAR • PUBLIC READING',
          subtitle: 'Accessible Visual Essay & Interactive Robot Dividend Simulator',
          url: u('EconomicsOfAutomation'),
          docPageId: 'spear_economics',
          publicSummary: 'If you want clear, well-documented reading material made for regular people, start here. Uses the Colony of 100,000 thought experiment, visual storytelling, and an interactive tax/demand simulator to show how society thrives through automation via a Robot Dividend.',
          calmNote: 'Paired with JobsAndAI empirical analysis to spark broad public discussion and introduce readers to the rest of this system.',
          facts: ['Written for Regular Readers', 'Colony of 100,000', 'Interactive Tax Simulator', 'Jobs & AI Companion'],
          targetFiles: ['EconomicsOfAutomation/luno.json', 'JobsAndAI/luno.json'],
          extraLinks: [
            { label: 'Open Visual Essay', url: u('EconomicsOfAutomation') },
            { label: 'Jobs & AI Horizon', url: u('JobsAndAI') }
          ],
          crossLinks: [
            { label: 'Drawing App & AccuCAD', targetId: 'drawing_spear' },
            { label: 'Luno Workspace', targetId: 'luno' }
          ]
        },
        {
          id: 'luno',
          category: 'system',
          name: 'Luno Workspace',
          icon: '🌙',
          accent: '#38bdf8',
          badge: 'PLATFORM CORE',
          subtitle: 'Phone-First Dual-Mode AI Development Cockpit',
          url: u('Luno'),
          docPageId: 'luno',
          publicSummary: 'Luno is the zero-token clipboard development environment that powers every project here. Instead of rewriting whole files or burning cloud tokens, it executes surgical ES6 AST method patches via HTML containers, synchronizes peer machines over Port 8080, and publishes independent projects to GitHub Pages with one click.',
          calmNote: 'Open-architecture browser + Node.js workstation. Runs locally on Mac & Ubuntu and statically on GitHub Pages.',
          facts: ['HTML Container Protocol', 'Acorn AST Method Patching', '1-Tap GitHub Pages Deploy', 'Phone-First Outbox/Inbox'],
          targetFiles: ['Luno/luno.json', 'Luno/app/ClientApp.js', 'Luno/core/LunoClassPatcher.js', 'Luno/core/LunoServer.js'],
          crossLinks: [
            { label: 'HomeSetup Infrastructure', targetId: 'homesetup' },
            { label: 'Drawing App & AccuCAD', targetId: 'drawing_spear' }
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
          calmNote: '60 workspace projects and 50+ Git repositories synchronized safely between Mac (10.0.0.226) and Linux (10.0.0.245).',
          facts: ['Universal Port 8080 Mesh', '60 Projects / 50+ Repos', 'Zero-Leak Secret Policy', 'DictationWidget & Lattice'],
          targetFiles: ['HomeSetup/luno.json', 'HomeSetup/js/HomeSummaries.js', 'HomeSetup/HomeSetup.js', 'HomeSetup/js/HomeHandoffContent.js'],
          crossLinks: [
            { label: 'Luno Cockpit', targetId: 'luno' },
            { label: 'Master Opus & Library', targetId: 'economics' }
          ]
        },
        {
          id: 'career',
          category: 'career',
          name: 'Career & CAD Patent Record',
          icon: '📜',
          accent: '#38bdf8',
          badge: 'CAREER & PATENTS',
          subtitle: 'AccuDraw, SmartLine & 30-Year Archive (US Patent #5,754,182)',
          url: u('accudraw'),
          docPageId: 'career',
          publicSummary: 'Documents Rob Brown’s work at Bentley Systems (1994–1997), where he invented AccuDraw, SmartLine, and PowerSelector for MicroStation—earning Bentley’s first corporate patent (US #5,754,182)—with original 1995–1996 MicroStation Manager reprints and modern open-source 3D CAD specs.',
          calmNote: 'Includes primary patent records, historical articles, and public-domain spatial constraint mathematics.',
          facts: ['US Patent #5,754,182', 'AccuDraw & SmartLine', '48/50 State DOT Standard', '1995–1996 Reprints'],
          targetFiles: ['accudraw/luno.json', 'CadPlan/luno.json', 'accuCad/luno.json'],
          extraLinks: [
            { label: 'Historical Archive', url: u('accudraw') },
            { label: 'AccuCAD 3D', url: u('accuCad') },
            { label: 'CadPlan Spec', url: u('CadPlan') }
          ],
          crossLinks: [
            { label: 'Financial Valuation Record', targetId: 'financial' },
            { label: 'Drawing App & AccuCAD', targetId: 'drawing_spear' }
          ]
        },
        {
          id: 'financial',
          category: 'financial',
          name: 'Financial & Valuation Record',
          icon: '📊',
          accent: '#f59e0b',
          badge: 'VALUATION & REALITY',
          subtitle: 'Enterprise Value Attribution vs. Personal Financial Sovereignty',
          url: u('ValuationOfAccudraw'),
          docPageId: 'financial',
          publicSummary: 'Pairs quantitative counterfactual valuation models (`ValuationOfAccudraw`) with independent unprimed Google Search analyses attributing $1.2B–$5.54B+ ($2.3B 4-model midpoint) of Bentley Systems’ enterprise value to AccuDraw and SmartLine—contrasted transparently with personal financial hardship and current commercialization goals.',
          calmNote: 'Includes verbatim unprimed search prompts so any reader, evaluator, or counsel can independently reproduce the findings.',
          facts: ['$1.2B–$5.54B+ Attribution', '$2.3B 4-Model Midpoint', 'Unprimed Search Test', 'Commercialization Path'],
          targetFiles: ['ValuationOfAccudraw/luno.json', 'situation/luno.json', 'Opus/js/OpusVerificationContent.js'],
          extraLinks: [
            { label: 'Valuation Model', url: u('ValuationOfAccudraw') },
            { label: 'Executive Dossier', url: u('situation') }
          ],
          crossLinks: [
            { label: 'Career & CAD Patents', targetId: 'career' },
            { label: 'Family & Personal Context', targetId: 'family' }
          ]
        },
        {
          id: 'family',
          category: 'personal',
          name: 'Family, Stability & Legal Context',
          icon: '⚖️',
          accent: '#c084fc',
          badge: 'STABILIZED NOV 2026',
          subtitle: 'Factual Record, Daughter Documentation & Gated Deeper Context',
          url: u('situation'),
          docPageId: 'family',
          publicSummary: 'Presents a calm, factual overview of personal circumstances as of November 2026: day-to-day housing and utilities are stable, and current personal focus is preparing constructive court documentation concerning his daughter while advancing software commercialization.',
          calmNote: 'Deeper family and Power of Attorney (POA) administrative background is intentionally kept behind an optional detail gate rather than broadcast on the front page—remaining openly inspectable via the gate or repository source.',
          sensitiveSummary: 'Additional Factual Context (Protected Layer): Rob’s sister serves as their mother’s caregiver and holds Power of Attorney (POA) over her affairs. While their mother expressed her desire to support Rob financially, POA control blocked direct support and contributed to avoidable past financial hardship documented in the situation dossier.',
          facts: ['Nov 2026 Housing Stabilized', 'Factual Record', 'Daughter Court Prep', 'Gated POA Background'],
          targetFiles: ['situation/luno.json', 'Opus/js/OpusQ2NarrativeContent.js'],
          extraLinks: [
            { label: 'Situation Dossier', url: u('situation') },
            { label: 'Opus Q2 Chapter', url: u('Opus', '#q2_narrative') }
          ],
          crossLinks: [
            { label: 'Financial & Valuation Record', targetId: 'financial' },
            { label: 'Master Opus & Library', targetId: 'economics' }
          ]
        },
        {
          id: 'economics',
          category: 'research',
          name: 'Master Opus & Shared Library',
          icon: '🏛️',
          accent: '#a78bfa',
          badge: 'ARCHITECTURE HUB',
          subtitle: '4-Quadrant Living Router & Zero-Copy Shared Modules',
          url: u('Opus'),
          docPageId: 'economics',
          publicSummary: 'Unites the entire 4-quadrant living specification (`Opus`) with the central `Library` hub (`DocumentReader`, `UITools`, `ThreeJSLoader`, `DictationWidget`, `SensitiveContextGate`) that powers every application across the workspace with zero duplicated library code.',
          calmNote: 'Provides tiered AI context routing (Tiers 0–3) and cross-referenced file pointers across all repositories.',
          facts: ['Opus 4-Quadrant Router', 'Zero-Copy Library', 'Tier 0–3 Context Depth', 'TouchController P2P'],
          targetFiles: ['Opus/luno.json', 'Opus/js/OpusSummaries.js', 'Library/luno.json', 'TouchController/luno.json'],
          extraLinks: [
            { label: 'Master Opus', url: u('Opus') },
            { label: 'Shared Library', url: u('Library') },
            { label: 'TouchController', url: u('TouchController') }
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
        { id: 'all', label: 'All Initiatives (8)' },
        { id: 'spear', label: '🎯 Tip of the Spear (2)' },
        { id: 'system', label: 'Luno & HomeSetup' },
        { id: 'career', label: 'Career & Patents' },
        { id: 'financial', label: 'Financial' },
        { id: 'personal', label: 'Family & Context' },
        { id: 'research', label: 'Opus & Library' }
      ];
    }
}

globalThis.PortalData = PortalData;
if (typeof module !== 'undefined' && module.exports) module.exports = PortalData;