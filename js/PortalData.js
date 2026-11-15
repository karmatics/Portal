class PortalData {
  static getPillars() {
    return [
      {
        id: 'luno',
        category: 'system',
        name: 'Luno Workspace',
        icon: '🌙',
        accent: '#00f2fe',
        badge: 'PLATFORM CORE',
        subtitle: 'Phone-First Dual-Mode AI Development Cockpit',
        url: '../Luno/index.html',
        docPageId: 'luno',
        publicSummary: 'Luno is the zero-token clipboard development environment that powers this entire ecosystem. Instead of rewriting whole files or burning cloud tokens, it executes surgical ES6 AST method patches via HTML containers, synchronizes peer machines over Port 8080, and publishes independent projects to GitHub Pages with one click.',
        calmNote: 'Open-architecture browser + Node.js workstation. Runs locally on Mac & Ubuntu and statically on GitHub Pages.',
        facts: ['HTML Container Protocol', 'Acorn AST Method Patching', '1-Tap GitHub Pages Deploy', 'Phone-First Outbox/Inbox'],
        targetFiles: ['Luno/luno.json', 'Luno/app/ClientApp.js', 'Luno/core/LunoClassPatcher.js', 'Luno/core/LunoServer.js'],
        crossLinks: [
          { label: 'HomeSetup Infrastructure', targetId: 'homesetup' },
          { label: 'Shared Library Hub', targetId: 'career' }
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
        url: '../HomeSetup/index.html',
        docPageId: 'homesetup',
        publicSummary: 'Documents the physical workstation fleet—an Apple Silicon Mac Mini, a portable Ubuntu demo laptop, a tethered Windows machine, two smartphones where Luno originated, and a roving exFAT drive—plus a zero-leak credential boundary and the universal voice dictation engine.',
        calmNote: '60 workspace projects and 50+ Git repositories synchronized safely between Mac (10.0.0.226) and Linux (10.0.0.245).',
        facts: ['Universal Port 8080 Mesh', '60 Projects / 50+ Repos', 'Zero-Leak Secret Policy', 'DictationWidget & Lattice'],
        targetFiles: ['HomeSetup/luno.json', 'HomeSetup/js/HomeSummaries.js', 'HomeSetup/HomeSetup.js', 'HomeSetup/js/HomeHandoffContent.js'],
        crossLinks: [
          { label: 'Luno Cockpit', targetId: 'luno' },
          { label: 'Master Opus Router', targetId: 'economics' }
        ]
      },
      {
        id: 'career',
        category: 'career',
        name: 'Career & CAD Inventions',
        icon: '📐',
        accent: '#38bdf8',
        badge: 'CAREER & PATENTS',
        subtitle: 'AccuDraw, SmartLine & 3D WebGL Drafting (US Patent #5,754,182)',
        url: '../CadPlan/index.html',
        docPageId: 'career',
        publicSummary: 'Documents Rob Brown’s work at Bentley Systems (1994–1997), where he invented AccuDraw, SmartLine, and PowerSelector for MicroStation—earning Bentley’s first corporate patent (US #5,754,182)—and presents modern open-source 3D WebGL implementations (`CadPlan`, `accuCad`, `accudraw`).',
        calmNote: 'Includes primary patent records, 1995–1996 technical reprints, and live interactive 3D constraint demos.',
        facts: ['US Patent #5,754,182', 'AccuDraw & SmartLine', '48/50 State DOT Standard', 'Live 3D WebGL Studios'],
        targetFiles: ['CadPlan/luno.json', 'accuCad/luno.json', 'accudraw/luno.json'],
        extraLinks: [
          { label: 'CadPlan Spec', url: '../CadPlan/index.html' },
          { label: 'accuCad 3D', url: '../accuCad/index.html' },
          { label: 'Historical Archive', url: '../accudraw/index.html' }
        ],
        crossLinks: [
          { label: 'Financial Valuation Model', targetId: 'financial' },
          { label: 'Luno & Library Hub', targetId: 'luno' }
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
        url: '../ValuationOfAccudraw/index.html',
        docPageId: 'financial',
        publicSummary: 'Pairs quantitative counterfactual valuation models (`ValuationOfAccudraw`) with independent unprimed Google Search analyses attributing $1.2B–$5.54B+ ($2.3B 4-model midpoint) of Bentley Systems’ enterprise value to AccuDraw and SmartLine—contrasted transparently with personal financial hardship and current commercialization goals.',
        calmNote: 'Includes verbatim unprimed search prompts so any reader, evaluator, or counsel can independently reproduce the findings.',
        facts: ['$1.2B–$5.54B+ Attribution', '$2.3B 4-Model Midpoint', 'Unprimed Search Test', 'Commercialization Path'],
        targetFiles: ['ValuationOfAccudraw/luno.json', 'situation/luno.json', 'Opus/js/OpusVerificationContent.js'],
        extraLinks: [
          { label: 'Valuation Model', url: '../ValuationOfAccudraw/index.html' },
          { label: 'Executive Dossier', url: '../situation/index.html' }
        ],
        crossLinks: [
          { label: 'Career & CAD Inventions', targetId: 'career' },
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
        subtitle: 'Calm Factual Record, Daughter Documentation & Gated Deeper Context',
        url: '../situation/index.html',
        docPageId: 'family',
        publicSummary: 'Presents a calm, factual overview of personal circumstances as of November 2026: day-to-day housing and utilities are stable, Rob is not a caregiver, and current personal focus is preparing constructive court documentation concerning his daughter while advancing software commercialization.',
        calmNote: 'Deeper family and Power of Attorney (POA) administrative background is intentionally kept behind a respectful detail gate rather than broadcast on the front page—remaining openly inspectable via the gate or repository source.',
        sensitiveSummary: 'Additional Factual Context (Protected Layer): Rob is not a caregiver; his sister serves as caregiver and holds Power of Attorney (POA) over their mother’s affairs. While their mother has expressed her desire to support Rob financially, POA control blocked direct support and contributed to avoidable past financial hardship documented in the situation dossier.',
        facts: ['Nov 2026 Housing Stabilized', 'Not a Caregiver', 'Daughter Court Prep', 'Gated POA Background'],
        targetFiles: ['situation/luno.json', 'Opus/js/OpusQ2NarrativeContent.js'],
        extraLinks: [
          { label: 'Situation Dossier', url: '../situation/index.html' },
          { label: 'Opus Q2 Chapter', url: '../Opus/index.html#q2_narrative' }
        ],
        crossLinks: [
          { label: 'Financial & Valuation Record', targetId: 'financial' },
          { label: 'Visitor Keys & AI Export', targetId: 'economics' }
        ]
      },
      {
        id: 'economics',
        category: 'research',
        name: 'Post-Labor Economics & Opus',
        icon: '🤖',
        accent: '#34d399',
        badge: 'MACRO & PORTAL',
        subtitle: 'The Robot Dividend, Jobs & AI, and the 4-Quadrant Opus',
        url: '../EconomicsOfAutomation/index.html',
        docPageId: 'economics',
        publicSummary: 'Explores how society transitions peacefully when AI and robotics decouple production from human labor hours—through the Colony of 100,000 thought experiment and the Robot Dividend—alongside the internal 4-Quadrant Opus router and Quora archival tools.',
        calmNote: 'Interactive tax and demand simulators paired with empirical AI displacement analysis.',
        facts: ['The Robot Dividend', 'Colony of 100,000', 'Game-Theoretic Proofs', 'Opus 4-Quadrant Hub'],
        targetFiles: ['EconomicsOfAutomation/luno.json', 'JobsAndAI/luno.json', 'Opus/luno.json', 'Opus/js/OpusSummaries.js', 'QuoraToys/luno.json'],
        extraLinks: [
          { label: 'Economics Simulator', url: '../EconomicsOfAutomation/index.html' },
          { label: 'Jobs & AI', url: '../JobsAndAI/index.html' },
          { label: 'Master Opus', url: '../Opus/index.html' }
        ],
        crossLinks: [
          { label: 'Home Setup & Fleet', targetId: 'homesetup' },
          { label: 'Career & CAD Inventions', targetId: 'career' }
        ]
      }
    ];
  }

  static getScanManifestTargets() {
    return [
      { project: 'Portal', file: 'Portal/luno.json', kind: 'manifest' },
      { project: 'Luno', file: 'Luno/luno.json', kind: 'manifest' },
      { project: 'HomeSetup', file: 'HomeSetup/luno.json', kind: 'manifest' },
      { project: 'HomeSetup', file: 'HomeSetup/js/HomeSummaries.js', kind: 'summaries' },
      { project: 'Opus', file: 'Opus/luno.json', kind: 'manifest' },
      { project: 'Opus', file: 'Opus/js/OpusSummaries.js', kind: 'summaries' },
      { project: 'situation', file: 'situation/luno.json', kind: 'manifest' },
      { project: 'ValuationOfAccudraw', file: 'ValuationOfAccudraw/luno.json', kind: 'manifest' },
      { project: 'CadPlan', file: 'CadPlan/luno.json', kind: 'manifest' },
      { project: 'accuCad', file: 'accuCad/luno.json', kind: 'manifest' },
      { project: 'accudraw', file: 'accudraw/luno.json', kind: 'manifest' },
      { project: 'EconomicsOfAutomation', file: 'EconomicsOfAutomation/luno.json', kind: 'manifest' },
      { project: 'JobsAndAI', file: 'JobsAndAI/luno.json', kind: 'manifest' },
      { project: 'QuoraToys', file: 'QuoraToys/luno.json', kind: 'manifest' },
      { project: 'Library', file: 'Library/luno.json', kind: 'manifest' }
    ];
  }

  static getUnprimedVerificationPrompt() {
    return 'Tell me about Accudraw and smartline in MicroStation and who invented them and what the impact has been on Bentley systems and computer aided design. I’d specifically like to know how much this inventor created in economic value, in other words how much their being hired added to the current market capitalization of Bentley systems. Please give a range estimate in dollars as a speculative counterfactual. please do deep research to avoid hallucination, make sure you know the history.';
  }
}

globalThis.PortalData = PortalData;
if (typeof module !== 'undefined' && module.exports) module.exports = PortalData;