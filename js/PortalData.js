class PortalData {

  static getPillars() {
        const u = (proj, hash = '') => PortalData.resolveAppUrl(proj, hash);
        return [
          {
            id: 'cadplan_spec',
            category: 'cad',
            name: 'CadPlan — Executable CAD Spec + Built-In 3D App',
            icon: '📐',
            accent: '#00f2fe',
            badge: 'CAREER FLAGSHIP • SPEC + BUILT-IN APP',
            subtitle: 'AccuDraw Background → Agent-Ready Blueprint for Open-Source AutoCAD & MicroStation Clones',
            url: u('CadPlan'),
            docPageId: 'spear_accucad',
            publicSummary: 'Built to establish my position in modern open-source CAD by pairing my AccuDraw & SmartLine invention heritage (US Patent #5,754,182) with a full, machine-readable specification and working 3D app embedded inside the document. Rather than a static paper, CadPlan combines complete architectural prose, reference code, and live 3D WebGL viewports so AI coding agents can insert AccuDraw directly into open-source AutoCAD and MicroStation clones (such as Rust/Wasm CADCraft).',
            calmNote: 'Shows both the finished interactive 3D instrument and the exact mathematical & code spec any AI agent or developer needs to integrate it.',
            facts: ['Spec + Live 3D App', 'Agent-Ready for CAD Clones', 'AccuDraw US #5,754,182', 'Large-Scale LLM Context'],
            targetFiles: ['CadPlan/luno.json', 'CadPlan/CadPlan.js', 'CadPlan/js/CadPlanMetaContent.js', 'CadPlan/js/CadCraftIntegrationContent.js'],
            extraLinks: [
              { label: 'Open CadPlan (Spec + App)', url: u('CadPlan') },
              { label: 'Launch Standalone AccuCAD 3D', url: u('accuCad') }
            ],
            crossLinks: [
              { label: 'AccuCAD 3D Workstation', targetId: 'accucad_live' },
              { label: 'Luno Workspace', targetId: 'luno' }
            ]
          },
          {
            id: 'luno',
            category: 'system',
            name: 'Luno Workspace & Code Generator',
            icon: '🌙',
            accent: '#00f2fe',
            badge: 'PRIMARY INITIATIVE • PROMPT & CODE ENGINE',
            subtitle: 'Freeform Living Document Compiler, AST Patcher & AI Life/Career Cockpit',
            url: u('Luno'),
            docPageId: 'luno',
            publicSummary: 'Luno is my primary initiative and the engine behind every project in this archive. It pairs a living document system with an AST method-patching code generator so I can assemble very large, coherent prompts for ChatGPT, Claude, or Gemini—using AI in a freeform, structured way both to organize my life and career direction and to build, customize, and deploy working software with zero token waste.',
            calmNote: 'Powers the HTML Container Protocol, In-Situ Aardvark directives, Markdown prompt compilation, and 1-tap GitHub Pages publishing.',
            facts: ['Primary Initiative', 'Huge LLM Prompt Builder', 'Acorn AST Code Generator', 'Life & Software Organization'],
            targetFiles: ['Luno/luno.json', 'Luno/app/ClientApp.js', 'Luno/core/LunoClassPatcher.js', 'Luno/core/LunoServer.js'],
            crossLinks: [
              { label: 'CadPlan Spec + Built-In App', targetId: 'cadplan_spec' },
              { label: 'Kinetic Curve Studio', targetId: 'curve_drawing_spear' }
            ]
          },
          {
            id: 'curve_drawing_spear',
            category: 'spear',
            name: 'Kinetic Curve & Image Markup Studio',
            icon: '〰️',
            accent: '#c084fc',
            badge: 'PUBLIC WEB APP • LUNO-MODIFIABLE',
            subtitle: 'Social-Media Markup & Kinetic Curve App Easily Altered via Luno (QuoraToys)',
            url: u('QuoraToys'),
            docPageId: 'spear_drawing',
            publicSummary: 'An intuitive, everyday graphic studio built for fast social media markup (Quora, X, Substack): drop or Ctrl+V paste any image, draw smooth curves with 32px kinetic string-tether dampening (avoiding traditional Bezier handle headaches), bend segments directly, attach callouts, and copy PNG output—while remaining cleanly modular so anyone can alter or extend its tools inside Luno.',
            calmNote: 'Combines broad everyday usefulness (in the spirit of my Aardvark Firefox extension) with clean code anyone can customize via Luno AI prompts.',
            facts: ['Social Media Markup', 'Easy to Alter via Luno', '32px Kinetic Tether', 'Ctrl+V Paste & Copy PNG'],
            targetFiles: ['QuoraToys/luno.json', 'QuoraToys/js/QuoraToys.js', 'QuoraToys/js/QuoraAnnotationComponent.js', 'QuoraToys/js/QuoraToysContent.js'],
            extraLinks: [
              { label: 'Launch Curve & Markup App', url: u('QuoraToys') }
            ],
            crossLinks: [
              { label: 'Luno Workspace', targetId: 'luno' },
              { label: 'CadPlan Spec + Built-In App', targetId: 'cadplan_spec' }
            ]
          },
          {
            id: 'accucad_live',
            category: 'cad',
            name: 'AccuCAD 3D Workstation',
            icon: '🚀',
            accent: '#38bdf8',
            badge: 'LIVE 3D CAD REFERENCE',
            subtitle: 'Browser WebGL Proof of Concept & Agent Reference Implementation',
            url: u('accuCad'),
            docPageId: 'spear_accucad',
            publicSummary: 'A live Three.js 3D drafting workstation built to demonstrate AccuDraw’s floating kinetic compass, direction-cosine plane locks, tentative snapping, and SmartLine chaining in the browser—and to serve as clean reference code that AI agents can inspect alongside CadPlan when integrating AccuDraw into open-source AutoCAD or MicroStation clones.',
            calmNote: 'Runs standalone or embedded directly inside CadPlan’s interactive specification chapters.',
            facts: ['Live 3D WebGL Viewport', 'Agent Code Reference', 'Tentative Snapping', 'TouchController P2P'],
            targetFiles: ['accuCad/luno.json', 'CadPlan/luno.json', 'TouchController/luno.json'],
            extraLinks: [
              { label: 'Launch AccuCAD 3D', url: u('accuCad') },
              { label: 'Open CadPlan Spec + App', url: u('CadPlan') },
              { label: 'TouchController', url: u('TouchController') }
            ],
            crossLinks: [
              { label: 'CadPlan Spec + Built-In App', targetId: 'cadplan_spec' },
              { label: 'AccuDraw & Aardvark Heritage', targetId: 'career' }
            ]
          },
          {
            id: 'economics_spear',
            category: 'spear',
            name: 'Economics of Automation',
            icon: '🤖',
            accent: '#34d399',
            badge: 'PUBLIC ESSAY & SIMULATOR',
            subtitle: 'Clear Visual Reading for Everyday Readers & Interactive Simulator',
            url: u('EconomicsOfAutomation'),
            docPageId: 'spear_economics',
            publicSummary: 'Accessible, plain-English reading material written for everyday readers—using the Colony of 100,000 thought experiment and an interactive tax & demand simulator to show how automated production can fund widespread prosperity through a Robot Dividend.',
            calmNote: 'Paired with JobsAndAI empirical analysis and full Markdown LLM export so readers can test or debate the arguments with any AI.',
            facts: ['Written for Regular Readers', 'Colony of 100,000', 'Interactive Tax Simulator', 'Jobs & AI Companion'],
            targetFiles: ['EconomicsOfAutomation/luno.json', 'JobsAndAI/luno.json'],
            extraLinks: [
              { label: 'Open Visual Essay', url: u('EconomicsOfAutomation') },
              { label: 'Jobs & AI Horizon', url: u('JobsAndAI') }
            ],
            crossLinks: [
              { label: 'Luno Workspace', targetId: 'luno' },
              { label: 'Master Opus & Shared Library', targetId: 'economics' }
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
            publicSummary: 'Documents Rob Brown’s foundational CAD inventions at Bentley Systems (1994–1997)—AccuDraw, SmartLine, and PowerSelector, earning US Patent #5,754,182—alongside original 1995–1996 MicroStation Manager reprints and his history creating widely shared web tools like Aardvark.',
            calmNote: 'Primary patent filings, historical reprints, and open spatial constraint documentation forming the track record behind CadPlan.',
            facts: ['US Patent #5,754,182', 'AccuDraw & SmartLine', '48/50 State DOT Standard', 'Aardvark Legacy'],
            targetFiles: ['accudraw/luno.json', 'CadPlan/luno.json'],
            extraLinks: [
              { label: 'Historical Archive', url: u('accudraw') },
              { label: 'CadPlan Spec + App', url: u('CadPlan') }
            ],
            crossLinks: [
              { label: 'CadPlan Spec + Built-In App', targetId: 'cadplan_spec' },
              { label: 'Financial & Valuation Record', targetId: 'financial' }
            ]
          },
          {
            id: 'financial',
            category: 'personal',
            name: 'Financial & Valuation Record',
            icon: '📊',
            accent: '#f59e0b',
            badge: 'VALUATION & FINANCIAL REALITY',
            subtitle: 'Enterprise Value Attribution vs. Personal Financial Sovereignty',
            url: u('ValuationOfAccudraw'),
            docPageId: 'financial',
            publicSummary: 'Pairs quantitative counterfactual valuation models (`ValuationOfAccudraw`) with independent unprimed Google Search analyses attributing $1.2B–$5.54B+ ($2.3B 4-model midpoint) of Bentley Systems’ enterprise value to AccuDraw and SmartLine—contrasted transparently with personal financial circumstances and current commercialization paths.',
            calmNote: 'Includes verbatim unprimed search prompts so financial reviewers, family members, or counsel can independently verify every claim.',
            facts: ['$1.2B–$5.54B+ Attribution', '$2.3B 4-Model Midpoint', 'Blind Search Verification', 'Commercialization Path'],
            targetFiles: ['ValuationOfAccudraw/luno.json', 'situation/luno.json', 'Opus/js/OpusVerificationContent.js'],
            extraLinks: [
              { label: 'Valuation Model', url: u('ValuationOfAccudraw') },
              { label: 'Executive Dossier', url: u('situation') }
            ],
            crossLinks: [
              { label: 'AccuDraw & Aardvark Heritage', targetId: 'career' },
              { label: 'Family, Stability & Personal Context', targetId: 'family' }
            ]
          },
          {
            id: 'family',
            category: 'personal',
            name: 'Family, Stability & Personal Context',
            icon: '⚖️',
            accent: '#c084fc',
            badge: 'STABILIZED NOV 2026',
            subtitle: 'Calm Factual Overview, Custody Documentation & Protected Layer',
            url: u('situation'),
            docPageId: 'family',
            publicSummary: 'Presents a calm, factual record as of November 2026 showing what Rob is building daily, how his time is structured across software engineering and career initiatives, and how day-to-day housing and utilities are stabilized—while preparing accurate documentation concerning his daughter.',
            calmNote: 'Deeper sensitive family context is kept behind an optional detail gate rather than broadcast on the front page, while remaining openly inspectable.',
            sensitiveSummary: 'Additional Sensitive Context (Protected Layer): Detailed family conflict records and Power of Attorney (POA) administrative background regarding Rob’s sister and mother are documented in the situation dossier.',
            facts: ['Nov 2026 Housing Stabilized', 'Daughter & Custody Prep', 'Daily Work Record', 'Gated Sensitive Context'],
            targetFiles: ['situation/luno.json', 'Opus/js/OpusQ2NarrativeContent.js'],
            extraLinks: [
              { label: 'Situation Dossier', url: u('situation') },
              { label: 'Opus Narrative Chapter', url: u('Opus', '#q2_narrative') }
            ],
            crossLinks: [
              { label: 'Financial & Valuation Record', targetId: 'financial' },
              { label: 'Luno Workspace', targetId: 'luno' }
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
            id: 'economics',
            category: 'system',
            name: 'Master Opus & Shared Library',
            icon: '🏛️',
            accent: '#a78bfa',
            badge: 'LLM PROMPT ROUTER & LIBRARY',
            subtitle: '4-Quadrant Living Router, Large Prompt Assembly & Zero-Copy Modules',
            url: u('Opus'),
            docPageId: 'economics',
            publicSummary: 'Unites the 4-quadrant living knowledge router (`Opus`) with the shared `Library` (`DocumentReader`, `UITools`, `ThreeJSLoader`, `DictationWidget`, `SensitiveContextGate`)—explicitly designed to compile large, multi-project context bundles for ChatGPT/Claude/Gemini so AI can assist across code, career strategy, and personal organization.',
            calmNote: 'Provides tiered AI context routing (Tiers 0–3), full Markdown exports, and cross-referenced file pointers across all repositories.',
            facts: ['Large LLM Prompt Compiler', 'Opus 4-Quadrant Router', 'Zero-Copy Library', 'Living Notes & Aardvark'],
            targetFiles: ['Opus/luno.json', 'Opus/js/OpusSummaries.js', 'Library/luno.json'],
            extraLinks: [
              { label: 'Master Opus', url: u('Opus') },
              { label: 'Shared Library', url: u('Library') }
            ],
            crossLinks: [
              { label: 'Luno Workspace', targetId: 'luno' },
              { label: 'Home Setup & Fleet', targetId: 'homesetup' }
            ]
          }
        ];
      }
  static getScanManifestTargets() {
      return [
        { project: 'Portal', file: 'Portal/luno.json', kind: 'manifest' },
        { project: 'QuoraToys', file: 'QuoraToys/luno.json', kind: 'manifest' },
        { project: 'accuCad', file: 'accuCad/luno.json', kind: 'manifest' },
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
          { id: 'all', label: 'All Areas (10)' },
          { id: 'spear', label: '🎯 Tip of the Spear (2)' },
          { id: 'cad', label: '📐 CAD & CadPlan (3)' },
          { id: 'system', label: '🌙 Luno & HomeSetup (3)' },
          { id: 'personal', label: '⚖️ Financial & Family (2)' }
        ];
      }
}

globalThis.PortalData = PortalData;
if (typeof module !== 'undefined' && module.exports) module.exports = PortalData;