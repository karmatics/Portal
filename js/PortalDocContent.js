class PortalDocContent {
  static getMeta() {
    return {
      kicker: 'Integrated Living Archive',
      title: 'Rob Brown — Public Portal & Connected Dossiers',
      subtitle: 'A unified, cross-referenced guide to Luno, HomeSetup, Career & CAD Inventions, Financial Valuation, Family Context, and Post-Labor Economics.'
    };
  }

  static manifest() {
    return [
      {
        section: 'luno',
        partLabel: 'Part 1 • Development Engine',
        title: 'Luno Workspace & The HTML Container Protocol',
        blocks: [
          { id: 'p_doc_luno', type: 'p' },
          { id: 'sidebar_doc_luno', type: 'sidebar', kicker: 'Core Capabilities', title: 'How Luno Powers Every Project' }
        ]
      },
      {
        section: 'homesetup',
        partLabel: 'Part 2 • Infrastructure & Speech',
        title: 'Home Setup, Port 8080 Fleet & Universal Dictation',
        blocks: [
          { id: 'p_doc_homesetup', type: 'p' },
          { id: 'sidebar_doc_homesetup', type: 'sidebar', kicker: 'Fleet & Safety', title: 'Multi-Node Sync & Zero-Leak Secrets' }
        ]
      },
      {
        section: 'career',
        partLabel: 'Part 3 • Engineering & Patents',
        title: 'Career, AccuDraw (US Patent #5,754,182) & Spatial CAD',
        blocks: [
          { id: 'p_doc_career', type: 'p' }
        ]
      },
      {
        section: 'financial',
        partLabel: 'Part 4 • Economic Attribution',
        title: 'Financial Valuation Record & Independent Verification',
        blocks: [
          { id: 'p_doc_financial', type: 'p' }
        ]
      },
      {
        section: 'family',
        partLabel: 'Part 5 • Personal & Legal Stability',
        title: 'Family Situation, Stability (Nov 2026) & Gated Context',
        blocks: [
          { id: 'p_doc_family_public', type: 'p' },
          { id: 'p_doc_family_poa', type: 'p', sensitive: true, sensitiveLabel: 'Additional Family & POA Context' }
        ]
      },
      {
        section: 'economics',
        partLabel: 'Part 6 • Post-Labor Macroeconomics',
        title: 'The Robot Dividend & Economics of Automation',
        blocks: [
          { id: 'p_doc_economics', type: 'p' }
        ]
      },
      {
        section: 'visitor_keys',
        partLabel: 'Part 7 • Transparency & AI Export',
        title: 'Keys to the System: Using Export & Annotations With Any AI',
        blocks: [
          { id: 'p_doc_keys', type: 'p' },
          { id: 'sidebar_doc_keys', type: 'sidebar', kicker: 'Visitor Guide', title: 'How Anyone Can Inspect, Export & Verify' }
        ]
      }
    ];
  }

  static p_doc_luno() {
    return [
      "Every project in this ecosystem is authored and maintained inside **Luno Workspace** (`../Luno/index.html`). Luno replaces bloated build pipelines and repetitive full-file rewrites with a **phone-first HTML Container Protocol**.",
      "AI collaborators return surgical `<script data-file=\"...\" data-method=\"...\" data-action=\"patch\">` containers. Luno validates and splices those methods using an in-browser Acorn AST engine, maintains local snapshots, and deploys static sites to GitHub Pages in one tap."
    ];
  }

  static sidebar_doc_luno() {
    return [
      "Luno Cross-References:\n" +
      "• Primary Workspace: `../Luno/index.html`\n" +
      "• Shared Dependencies: `../Library/index.html` (`DomBasics`, `UITools`, `DocumentReader`, `DictationWidget`)\n" +
      "• Protocol Docs: See `Luno/docs/LunoWorkspaceHandoff.md`"
    ];
  }

  static p_doc_homesetup() {
    return [
      "The physical development fleet (`../HomeSetup/index.html`) links an Apple Silicon **Mac Mini** (`10.0.0.226:8080`), a portable **Ubuntu laptop** (`10.0.0.245:8080`), a tethered Windows workstation, two smartphones (where Luno was originally created via voice dictation), and a roving exFAT hard drive.",
      "A strict **Zero-Leak Boundary** keeps all credentials in local OS environment files and keychains so secrets never enter AI prompts or tracked repositories."
    ];
  }

  static sidebar_doc_homesetup() {
    return [
      "HomeSetup Cross-References:\n" +
      "• Fleet Matrix & Port 8080 Mesh: `../HomeSetup/index.html#topology`\n" +
      "• Universal Speech Engine: `../HomeSetup/index.html#dictation`\n" +
      "• Portal Forking & Continuity Spec: `../HomeSetup/index.html#handoff`"
    ];
  }

  static p_doc_career() {
    return [
      "Between 1994 and 1997 at Bentley Systems, Rob Brown designed and implemented **AccuDraw**, **SmartLine**, and **PowerSelector** for MicroStation—resulting in **US Patent #5,754,182** (Bentley's first corporate patent) and establishing the heads-up drafting standard across 48 of 50 U.S. State DOTs.",
      "With the original patents expired, `CadPlan` (`../CadPlan/index.html`), `accuCad` (`../accuCad/index.html`), and `accudraw` (`../accudraw/index.html`) preserve the 30-year historical record alongside live 3D WebGL constraint implementations."
    ];
  }

  static p_doc_financial() {
    return [
      "Quantitative modeling in `ValuationOfAccudraw` (`../ValuationOfAccudraw/index.html`) and unprimed public search analyses in `Opus` (`../Opus/index.html#verification`) estimate that AccuDraw and SmartLine anchored **$1.2 Billion to $5.54+ Billion** (with a **$2.3 Billion** 4-model midpoint) of Bentley Systems' enterprise market capitalization.",
      "Despite creating that industrial moat, personal circumstances required surviving on family assistance, SNAP, and partial Social Security—making transparent public attribution and software commercialization essential."
    ];
  }

  static p_doc_family_public() {
    return [
      "As of **November 2026**, day-to-day housing and utilities are stable following mid-2026 transitions. Current personal and legal focus centers on preparing well-documented court filings concerning Rob's daughter while advancing open-source and commercial software work.",
      "To clarify roles accurately: **Rob is not a caregiver.** While this system hides nothing—every underlying document and source file in the repository is openly inspectable—detailed family and Power of Attorney (POA) administrative background is kept in an optional protected layer (`SensitiveContextGate`) rather than placed as front-page headlines."
    ];
  }

  static p_doc_family_poa() {
    return [
      "Additional Family & POA Context: Rob's sister serves as caregiver and holds Power of Attorney (POA) over their mother's affairs. Although their mother has expressed her desire to support Rob financially, POA authority was used to block direct financial assistance, contributing to past hardship documented in `../situation/index.html`."
    ];
  }

  static p_doc_economics() {
    return [
      "In `EconomicsOfAutomation` (`../EconomicsOfAutomation/index.html`) and `JobsAndAI` (`../JobsAndAI/index.html`), Rob extends first-principles engineering to macroeconomics: proving via the **Colony of 100,000** thought experiment that automated production requires a universal **Robot Dividend** so citizens remain solvent consumers."
    ];
  }

  static p_doc_keys() {
    return [
      "Every visitor—whether a collaborator, journalist, friend, or opposing legal counsel—is given the keys to inspect, verify, and export this documentation. You do not have to trust summaries on faith: you can export any dossier to Markdown, generate a live `summaries.json` from the repository files, or copy an unprimed search prompt to test independently."
    ];
  }

  static sidebar_doc_keys() {
    return [
      "Visitor Verification Toolkit:\n" +
      "1. Click `📤 Export MD` in Document View to extract complete clean Markdown for ChatGPT, Claude, or Gemini.\n" +
      "2. Click `⚙️ Summary JSON` on the Front Page to scan workspace files and inspect the live JSON manifest.\n" +
      "3. Click `🔍 Inspect` (Aardvark) to attach directives or inspect DOM elements in-situ.\n" +
      "4. Click `🔒 Context Gate` if you want to view or re-lock sensitive family/POA notes."
    ];
  }
}

globalThis.PortalDocContent = PortalDocContent;
if (typeof module !== 'undefined' && module.exports) module.exports = PortalDocContent;