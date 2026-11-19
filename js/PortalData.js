class PortalData {

  static getPillars() {
      const u = (proj, hash = '') => PortalData.resolveAppUrl(proj, hash);
      return [
        {
          id: 'family',
          projectName: 'situation',
          category: 'personal',
          name: 'Family, Stability & Personal Context (Situation)',
          icon: '⚖️',
          accent: '#f43f5e',
          badge: 'LIVING DOCUMENT • STABILIZED NOV 2026',
          openLabel: '📖 Open Situation',
          subtitle: 'Chico Stability, Out of Contact with Blood Relatives, Stella & Executive Function',
          url: u('situation'),
          docPageId: 'family',
          publicSummary: 'A calm, factual record as of November 2026: brother-in-law Jack helped stabilize Rob\'s move into a new Chico apartment and start Social Security (EBT phasing out), and Don remains a helpful contact on email. Rob is out of contact with all of his blood relatives—including his 94-year-old mother, the sister he used to speak with regularly, and his 12-year-old daughter Stella—a separation he did not initiate. Now stabilized, he is bringing unopened spring legal packages from Stella\'s mother\'s lawyer to therapy tomorrow (SF custody, 2017 primary custody) and preparing a San Mateo support modification (~$600/mo withheld from ~$1,900/mo SS after $6,000 paid a year ago).',
          calmNote: 'People often misunderstand Rob\'s career: he does extraordinarily well when placed in an environment suited to his visual/technical strengths, whereas forced, misaligned situations go poorly. Deeper custody-order details and June 2026 family/POA conflict exhibits stay behind SensitiveContextGate.',
          sensitiveSummary: 'Protected Layer: Detailed records of ex-wife blocking court-ordered daughter contact, June 2026 crisis conflict, Power of Attorney (POA) caregiving disputes, the therapy-initiated Virginia elder-welfare inquiry, and sister social-media conflict are stored behind the optional access gate.',
          facts: ['Chico Apartment + SS', 'Out of Contact (Not by Choice)', 'SF Custody / San Mateo Support', 'Executive Function & Stability'],
          targetFiles: ['situation/luno.json', 'situation/js/OverviewPage.js', 'Opus/js/OpusQ2NarrativeContent.js'],
          extraLinks: [
            { label: 'Situation Document', url: u('situation'), projName: 'situation' },
            { label: 'Opus Narrative Chapter', url: u('Opus', '#q2_narrative'), projName: 'Opus', pageId: 'q2_narrative' }
          ],
          crossLinks: [
            { label: 'Financial & Valuation Record', targetId: 'financial' },
            { label: 'Master Opus Document', targetId: 'economics' }
          ]
        },
        {
          id: 'financial',
          projectName: 'ValuationOfAccudraw',
          category: 'personal',
          name: 'Financial & Valuation Record',
          icon: '📊',
          accent: '#f59e0b',
          badge: 'LIVING DOCUMENT • VALUATION & REALITY',
          openLabel: '📖 Open Valuation',
          subtitle: 'Enterprise Value Attribution vs. Personal Financial Sovereignty',
          url: u('ValuationOfAccudraw'),
          docPageId: 'financial',
          publicSummary: 'Pairs quantitative counterfactual valuation models (ValuationOfAccudraw) with independent unprimed Google Search analyses attributing $1.2B–$5.54B+ ($2.3B 4-model midpoint) of Bentley Systems\' enterprise value to AccuDraw and SmartLine—showing how much value Rob produces in the right technical environment, contrasted transparently with personal financial circumstances and Social Security disability context.',
          calmNote: 'Includes verbatim unprimed search prompts so financial reviewers, family members, or counsel can independently verify every claim using any AI.',
          facts: ['$1.2B–$5.54B+ Attribution', '$2.3B 4-Model Midpoint', 'Blind Search Verification', 'Commercialization Path'],
          targetFiles: ['ValuationOfAccudraw/luno.json', 'situation/luno.json', 'Opus/js/OpusVerificationContent.js'],
          extraLinks: [
            { label: 'Valuation Document', url: u('ValuationOfAccudraw'), projName: 'ValuationOfAccudraw' },
            { label: 'Situation Document', url: u('situation'), projName: 'situation' }
          ],
          crossLinks: [
            { label: 'Family, Stability & Personal Context', targetId: 'family' },
            { label: 'AccuDraw & Aardvark Heritage', targetId: 'career' }
          ]
        },
        {
          id: 'luno',
          category: 'system',
          name: 'Luno Workspace & Code Generator',
          icon: '🌙',
          accent: '#00f2fe',
          badge: 'INTERACTIVE TOOL • PROMPT & CODE ENGINE',
          openLabel: '🚀 Open Luno App ↗',
          subtitle: 'Living Document Compiler, AST Patcher & AI Life-Organization Tool',
          url: u('Luno'),
          docPageId: 'luno',
          publicSummary: 'Luno is the interactive tool Rob uses behind every document and app in this archive. While visitors mainly use Portal to read or export a large Q&A prompt into ChatGPT, Claude, or Gemini, Rob uses Luno to edit these documents, patch code cleanly, and load his full life, legal, and career context into an AI without re-typing painful history.',
          calmNote: 'Treats web documents as a clean JavaScript subset of an app—powering HTML Container patching, Markdown exports, and 1-tap GitHub Pages publishing.',
          facts: ['Rob\'s Editing & Code Tool', 'Huge LLM Prompt Builder', 'Next-Step Life Organization', 'Acorn AST Code Generator'],
          targetFiles: ['Luno/luno.json', 'Luno/app/ClientApp.js', 'Luno/core/LunoClassPatcher.js', 'Luno/core/LunoServer.js'],
          crossLinks: [
            { label: 'Family, Stability & Personal Context', targetId: 'family' },
            { label: 'CadPlan Spec + Built-In App', targetId: 'cadplan_spec' }
          ]
        },
        {
          id: 'cadplan_spec',
          projectName: 'CadPlan',
          category: 'cad',
          name: 'CadPlan — Executable CAD Spec + Built-In 3D App',
          icon: '📐',
          accent: '#00f2fe',
          badge: 'LIVING DOCUMENT + BUILT-IN 3D APP',
          openLabel: '📖 Open CadPlan',
          subtitle: 'AccuDraw Background → Agent-Ready Blueprint for Open-Source AutoCAD & MicroStation Clones',
          url: u('CadPlan'),
          docPageId: 'spear_accucad',
          publicSummary: 'Built to establish my position in modern open-source CAD by pairing my AccuDraw & SmartLine invention heritage (US Patent #5,754,182) with a full, machine-readable specification document and working 3D app embedded inside.',
          calmNote: 'Shows both the finished interactive 3D instrument and the exact mathematical & code spec any AI agent or developer needs to integrate it.',
          facts: ['Spec Document + 3D App', 'Agent-Ready for CAD Clones', 'AccuDraw US #5,754,182', 'Large-Scale LLM Context'],
          targetFiles: ['CadPlan/luno.json', 'CadPlan/CadPlan.js', 'CadPlan/js/CadPlanMetaContent.js', 'CadPlan/js/CadCraftIntegrationContent.js'],
          extraLinks: [
            { label: 'CadPlan (Spec + 3D App)', url: u('CadPlan'), projName: 'CadPlan' },
            { label: 'AccuCAD 3D App', url: u('accuCad') }
          ],
          crossLinks: [
            { label: 'AccuCAD 3D Workstation', targetId: 'accucad_live' },
            { label: 'Luno Workspace', targetId: 'luno' }
          ]
        },
        {
          id: 'curve_drawing_spear',
          projectName: 'QuoraToys',
          category: 'spear',
          name: 'Kinetic Curve & Image Markup Studio',
          icon: '〰️',
          accent: '#c084fc',
          badge: 'INTERACTIVE WEB APP • LUNO-MODIFIABLE',
          openLabel: '📖 Open Curve Studio',
          subtitle: 'Social-Media Markup & Kinetic Curve App Easily Altered via Luno (QuoraToys)',
          url: u('QuoraToys'),
          docPageId: 'spear_drawing',
          publicSummary: 'An intuitive, everyday graphic app built for fast social media markup (Quora, X, Substack): drop or Ctrl+V paste any image, draw smooth curves with 32px kinetic string-tether dampening, bend segments directly, attach callouts, and copy PNG output.',
          calmNote: 'Combines broad everyday usefulness with clean code anyone can customize via Luno AI prompts.',
          facts: ['Social Media Markup App', 'Easy to Alter via Luno', '32px Kinetic Tether', 'Ctrl+V Paste & Copy PNG'],
          targetFiles: ['QuoraToys/luno.json', 'QuoraToys/js/QuoraToys.js', 'QuoraToys/js/QuoraAnnotationComponent.js', 'QuoraToys/js/QuoraToysContent.js'],
          extraLinks: [
            { label: 'Open Curve App', url: u('QuoraToys'), projName: 'QuoraToys' }
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
          badge: 'INTERACTIVE 3D WEB APP',
          openLabel: '🚀 Open 3D App ↗',
          subtitle: 'Browser WebGL Proof of Concept & Agent Reference Implementation',
          url: u('accuCad'),
          docPageId: 'spear_accucad',
          publicSummary: 'A live Three.js 3D drafting app built to demonstrate AccuDraw\'s floating kinetic compass, direction-cosine plane locks, tentative snapping, and SmartLine chaining in the browser.',
          calmNote: 'Runs standalone as a 3D app or embedded directly inside CadPlan\'s interactive specification chapters.',
          facts: ['Live 3D WebGL App', 'Agent Code Reference', 'Tentative Snapping', 'TouchController P2P'],
          targetFiles: ['accuCad/luno.json', 'CadPlan/luno.json', 'TouchController/luno.json'],
          extraLinks: [
            { label: 'Open AccuCAD 3D App', url: u('accuCad') },
            { label: 'CadPlan Spec + App', url: u('CadPlan'), projName: 'CadPlan' }
          ],
          crossLinks: [
            { label: 'CadPlan Spec + Built-In App', targetId: 'cadplan_spec' },
            { label: 'AccuDraw & Aardvark Heritage', targetId: 'career' }
          ]
        },
        {
          id: 'economics_spear',
          projectName: 'EconomicsOfAutomation',
          category: 'spear',
          name: 'Economics of Automation',
          icon: '🤖',
          accent: '#34d399',
          badge: 'LIVING DOCUMENT • ESSAY & SIMULATOR',
          openLabel: '📖 Open Essay',
          subtitle: 'Clear Visual Reading for Everyday Readers & Interactive Simulator',
          url: u('EconomicsOfAutomation'),
          docPageId: 'spear_economics',
          publicSummary: 'Accessible, plain-English reading material written for everyday readers—using the Colony of 100,000 thought experiment and an interactive tax & demand simulator to show how automated production can fund widespread prosperity through a Robot Dividend.',
          calmNote: 'Paired with the JobsAndAI document and full Markdown export so readers can test or debate the arguments with any AI.',
          facts: ['Written for Regular Readers', 'Colony of 100,000', 'Interactive Tax Simulator', 'Jobs & AI Companion'],
          targetFiles: ['EconomicsOfAutomation/luno.json', 'JobsAndAI/luno.json'],
          extraLinks: [
            { label: 'Read Visual Essay', url: u('EconomicsOfAutomation'), projName: 'EconomicsOfAutomation' },
            { label: 'Jobs & AI Document', url: u('JobsAndAI'), projName: 'JobsAndAI' }
          ],
          crossLinks: [
            { label: 'Luno Workspace', targetId: 'luno' },
            { label: 'Master Opus & Shared Library', targetId: 'economics' }
          ]
        },
        {
          id: 'career',
          projectName: 'accudraw',
          category: 'cad',
          name: 'AccuDraw & Aardvark Heritage',
          icon: '📜',
          accent: '#60a5fa',
          badge: 'LIVING DOCUMENT • CAREER & PATENTS',
          openLabel: '📖 Open Archive',
          subtitle: 'US Patent #5,754,182, SmartLine & 30-Year Engineering Archive',
          url: u('accudraw'),
          docPageId: 'career',
          publicSummary: 'Documents Rob Brown\'s foundational CAD inventions at Bentley Systems (1994–1997)—AccuDraw, SmartLine, and PowerSelector, earning US Patent #5,754,182—alongside original 1995–1996 MicroStation Manager reprints and his history creating widely shared web tools like Aardvark.',
          calmNote: 'Primary patent filings, historical reprints, and open spatial constraint documentation forming the track record behind CadPlan.',
          facts: ['US Patent #5,754,182', 'AccuDraw & SmartLine', '48/50 State DOT Standard', 'Aardvark Legacy'],
          targetFiles: ['accudraw/luno.json', 'CadPlan/luno.json'],
          extraLinks: [
            { label: 'Historical Archive Document', url: u('accudraw'), projName: 'accudraw' },
            { label: 'CadPlan Spec + App', url: u('CadPlan'), projName: 'CadPlan' }
          ],
          crossLinks: [
            { label: 'CadPlan Spec + Built-In App', targetId: 'cadplan_spec' },
            { label: 'Financial & Valuation Record', targetId: 'financial' }
          ]
        },
        {
          id: 'homesetup',
          projectName: 'HomeSetup',
          category: 'system',
          name: 'Home Setup & Fleet',
          icon: '🖥️',
          accent: '#10b981',
          badge: 'LIVING DOCUMENT • INFRASTRUCTURE',
          openLabel: '📖 Open HomeSetup',
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
          projectName: 'Opus',
          category: 'system',
          name: 'Master Opus & Shared Library',
          icon: '🏛️',
          accent: '#a78bfa',
          badge: 'LIVING DOCUMENT • DEEP ARCHIVE ROUTER',
          openLabel: '📖 Open Master Opus',
          subtitle: '4-Quadrant Living Router (Opus), Verification Stepper & Shared Modules',
          url: u('Opus'),
          docPageId: 'economics',
          publicSummary: 'While Portal is the clean front door, Master Opus (Opus) serves as the deep 4-quadrant architectural document router across CAD inventions, personal valuation, post-labor economics, and home fleet operations—paired with the shared Library.',
          calmNote: 'Includes the 4-turn Blind Query Convergence Stepper showing how neutral search sifts past founder bias directly to Rob Brown.',
          facts: ['Deep 4-Quadrant Document', 'Tier 0–3 AI Context', 'Zero-Copy Library', '4-Turn Sifting Stepper'],
          targetFiles: ['Opus/luno.json', 'Opus/js/OpusSummaries.js', 'Library/luno.json'],
          extraLinks: [
            { label: 'Master Opus Document', url: u('Opus'), projName: 'Opus' },
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

  static resolveSubPath(relPath) {
      if (!relPath) return '#';
      const clean = String(relPath).replace(/^\/+/, '');
      if (typeof window !== 'undefined' && window.location) {
        const host = window.location.hostname || '';
        if (host.endsWith('.github.io')) {
          const user = host.split('.')[0] || 'karmatics';
          return `https://${user}.github.io/${clean}`;
        }
        if (window.location.protocol === 'about:') {
          try {
            const pHost = window.parent?.location?.hostname || '';
            if (pHost.endsWith('.github.io')) {
              return `https://${pHost.split('.')[0] || 'karmatics'}.github.io/${clean}`;
            }
            if (window.parent?.location?.origin && window.parent.location.origin !== 'null') {
              return `${window.parent.location.origin}/${clean}`;
            }
          } catch (e) {}
          return `https://karmatics.github.io/${clean}`;
        }
      }
      return `../${clean}`;
    }

  static getSubNodes(pillarId) {
      const u = (proj, hash = '') => PortalData.resolveAppUrl(proj, hash);
      const sub = (rel) => PortalData.resolveSubPath(rel);

      const map = {
        family: [
          { id: 'sit_overview', label: 'Situation Document', sub: 'Chico Nov 2026 overview', url: u('situation'), kind: 'doc' },
          { id: 'sit_work', label: 'Current Stability', sub: 'Housing, SS & therapy', url: u('situation', '#current-work'), kind: 'doc' },
          { id: 'sit_court', label: 'SF Custody & Support', sub: '2017 primary & San Mateo', url: u('situation', '#court-filing'), kind: 'doc' },
          { id: 'pt_ch_family', label: 'Portal Chapter 8', sub: 'Read summary + gated layer', docPageId: 'family', kind: 'chapter' }
        ],
        financial: [
          { id: 'val_main', label: 'Valuation Dossier', sub: '$1.2B–$5.54B+ counterfactual', url: u('ValuationOfAccudraw'), kind: 'doc' },
          { id: 'opus_verify', label: 'Blind Search Proof', sub: '4-turn unprimed AI test', url: u('Opus', '#verification'), kind: 'doc' },
          { id: 'sit_val', label: 'Personal Finances', sub: 'SS, arrears & goals', url: u('situation', '#valuation'), kind: 'doc' },
          { id: 'blind_prompt', label: 'Copy Blind Prompt', sub: 'Test in incognito search', action: 'copy_blind', kind: 'action' }
        ],
        cadplan_spec: [
          { id: 'cp_main', label: 'CadPlan Spec + 3D', sub: '13-chapter live blueprint', url: u('CadPlan'), kind: 'app' },
          { id: 'cp_phil', label: 'AccuDraw Philosophy', sub: 'Direction cosines & locks', url: u('CadPlan', '#philosophy'), kind: 'doc' },
          { id: 'cp_cadcraft', label: 'CADCraft Blueprint', sub: 'Rust/Wasm clone integration', url: u('CadPlan', '#cadcraft'), kind: 'doc' },
          { id: 'cp_demos', label: 'Interactive 3D Labs', sub: 'Squircle & tentative snap', url: u('CadPlan', '#demos'), kind: 'app' }
        ],
        accucad_live: [
          { id: 'ac_app', label: 'AccuCAD 3D App', sub: 'Three.js WebGL workstation', url: u('accuCad'), kind: 'app' },
          { id: 'tc_app', label: 'TouchController P2P', sub: 'Mobile remote CAD pad', url: u('TouchController'), kind: 'app' },
          { id: 'cp_audit', label: 'AccuCAD Code Audit', sub: 'Agent reference code', url: u('CadPlan', '#accucad'), kind: 'doc' },
          { id: 'compass_sub', label: 'Squircle Compass Lab', sub: 'Standalone 8-arc morph', url: sub('Luno/CompassApp/index.html'), kind: 'app' }
        ],
        career: [
          { id: 'ad_archive', label: '30-Year Archive', sub: 'US Patent #5,754,182', url: u('accudraw'), kind: 'doc' },
          { id: 'ad_articles', label: '1995–96 Reprints', sub: 'MicroStation Manager', url: u('accudraw', '#articles'), kind: 'doc' },
          { id: 'cp_origins', label: 'SmartLine Origins', sub: '48/50 State DOT standard', url: u('CadPlan', '#origins'), kind: 'doc' },
          { id: 'pt_ch_career', label: 'Portal Chapter 6', sub: 'AccuDraw & Aardvark record', docPageId: 'career', kind: 'chapter' }
        ],
        luno: [
          { id: 'luno_app', label: 'Luno Cockpit', sub: 'Outbox, Inbox & AST patcher', url: u('Luno'), kind: 'app' },
          { id: 'luno_compass', label: 'CompassApp Lab', sub: 'Standalone 3D squircle', url: sub('Luno/CompassApp/index.html'), kind: 'app' },
          { id: 'luno_keys', label: 'KeyCommandApp', sub: 'Single-stroke CAD keys', url: sub('Luno/KeyCommandApp/index.html'), kind: 'app' },
          { id: 'pt_ch_luno', label: 'Portal Chapter 4', sub: 'HTML Container Protocol', docPageId: 'luno', kind: 'chapter' }
        ],
        homesetup: [
          { id: 'hs_main', label: 'HomeSetup Dossier', sub: 'Workstations & drives', url: u('HomeSetup'), kind: 'doc' },
          { id: 'hs_topo', label: 'Port 8080 Mesh', sub: 'Mac .226 ↔ Linux .245', url: u('HomeSetup', '#topology'), kind: 'doc' },
          { id: 'hs_dict', label: 'Universal Dictation', sub: 'Voice widget & vocab rules', url: u('HomeSetup', '#dictation'), kind: 'doc' },
          { id: 'pt_ch_hs', label: 'Portal Chapter 5', sub: 'Zero-leak secret boundary', docPageId: 'homesetup', kind: 'chapter' }
        ],
        economics: [
          { id: 'opus_main', label: 'Master Opus Router', sub: '4-quadrant Tier 0–3 hub', url: u('Opus'), kind: 'doc' },
          { id: 'opus_q1', label: 'Q1: CAD & AccuDraw', sub: 'Spatial constraints', url: u('Opus', '#q1_cad'), kind: 'doc' },
          { id: 'opus_q3', label: 'Q3: Post-Labor Econ', sub: 'Automation & dividends', url: u('Opus', '#q3_economics'), kind: 'doc' },
          { id: 'lib_hub', label: 'Shared Library Hub', sub: 'UITools, Reader, Dictation', url: u('Library'), kind: 'doc' }
        ],
        curve_drawing_spear: [
          { id: 'qt_app', label: 'Kinetic Curve App', sub: '32px tether & Ctrl+V', url: u('QuoraToys'), kind: 'app' },
          { id: 'qt_ann', label: 'Vector Annotations', sub: 'Callouts & arrow engine', url: u('QuoraToys', '#annotation'), kind: 'doc' },
          { id: 'qt_studio', label: 'Image Comparator', sub: 'Spot-the-difference tool', url: u('QuoraToys', '#studio'), kind: 'app' },
          { id: 'pt_ch_curve', label: 'Portal Chapter 1', sub: 'Modify easily via Luno', docPageId: 'spear_drawing', kind: 'chapter' }
        ],
        economics_spear: [
          { id: 'econ_essay', label: 'Visual Essay & Sim', sub: 'Robot Dividend simulator', url: u('EconomicsOfAutomation'), kind: 'doc' },
          { id: 'econ_colony', label: 'Colony of 100,000', sub: 'Core thought experiment', url: u('EconomicsOfAutomation', '#colony'), kind: 'doc' },
          { id: 'jobs_ai', label: 'Jobs & AI Companion', sub: 'Labor transition thesis', url: u('JobsAndAI'), kind: 'doc' },
          { id: 'pt_ch_econ', label: 'Portal Chapter 2', sub: 'Plain-English overview', docPageId: 'spear_economics', kind: 'chapter' }
        ]
      };

      return map[pillarId] || [];
    }
}

globalThis.PortalData = PortalData;
if (typeof module !== 'undefined' && module.exports) module.exports = PortalData;