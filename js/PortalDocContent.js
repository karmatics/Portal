class PortalDocContent {

  static getMeta(pageId = null) {
        const metas = {
          spear_drawing: {
            kicker: 'Chapter 1 • Tip of the Spear (Free Web App)',
            title: '1. Kinetic Curve & Image Markup Studio (QuoraToys)',
            subtitle: 'A modern, intuitive replacement for the 1980s Illustrator Pen tool—paste images, draw clean curves & arrows, and copy straight to clipboard.'
          },
          spear_economics: {
            kicker: 'Chapter 2 • Tip of the Spear (Public Reading)',
            title: '2. Economics of Automation & The Robot Dividend',
            subtitle: 'Clear, accessible reading and interactive simulations showing how society thrives as AI and robotics scale.'
          },
          spear_accucad: {
            kicker: 'Chapter 3 • Flagship Spec + Built-In 3D App',
            title: '3. CadPlan Living Spec & AccuCAD 3D Workstation',
            subtitle: 'Putting Rob’s AccuDraw background on the map: an executable CAD specification with the live 3D app and interactive labs built inside.'
          },
          luno: {
            kicker: 'Chapter 4 • Platform Core',
            title: '4. Luno Workspace & The HTML Container Protocol',
            subtitle: 'The phone-first AI development cockpit and in-browser AST patching engine powering all projects.'
          },
          homesetup: {
            kicker: 'Chapter 5 • Infrastructure & Speech',
            title: '5. Home Setup, Port 8080 Fleet & Universal Dictation',
            subtitle: 'Multi-node Mac/Ubuntu synchronization, zero-leak credential storage, and speech-to-text tools.'
          },
          career: {
            kicker: 'Chapter 6 • Engineering & Patents',
            title: '6. AccuDraw (US Patent #5,754,182) & Aardvark Heritage',
            subtitle: 'Historical Bentley Systems archives, primary patent filings, and lightweight web-tool pedigree.'
          },
          financial: {
            kicker: 'Chapter 7 • Economic Attribution',
            title: '7. Financial Valuation Record & Independent Verification',
            subtitle: 'Forensic $1.2B–$5.54B+ enterprise value counterfactuals contrasted transparently with personal reality.'
          },
          family: {
            kicker: 'Chapter 8 • Personal Stability & Context',
            title: '8. Family Situation, Stability (Nov 2026) & Protected Layer',
            subtitle: 'Stabilized living overview, daughter documentation priorities, and gated sensitive family context.'
          },
          economics: {
            kicker: 'Chapter 9 • Architecture Hub',
            title: '9. Master Opus Router & Shared Library Hub',
            subtitle: 'How the 4-Quadrant Opus and zero-copy Library tie every repository together.'
          },
          visitor_keys: {
            kicker: 'Chapter 10 • Transparency & AI Export',
            title: '10. Keys to the System: Using Export & Annotations With Any AI',
            subtitle: 'Step-by-step tools for family, collaborators, researchers, and counsel to export, query, and verify.'
          }
        };
        return metas[pageId] || {
          kicker: 'Integrated Living Archive',
          title: 'Rob Brown — Public Portal & Connected Dossiers',
          subtitle: 'A unified, cross-referenced guide to live apps, engineering records, personal stability, and economic research.'
        };
      }
  static manifest() {
      return [
        {
          section: 'spear_drawing',
          partLabel: 'Tip of the Spear • New Initiative',
          title: 'Freeform Curve Drawing Studio',
          blocks: [
            { id: 'p_doc_spear_drawing', type: 'p' }
          ]
        },
        {
          section: 'spear_economics',
          partLabel: 'Tip of the Spear • Public Reading',
          title: 'Economics of Automation & The Robot Dividend',
          blocks: [
            { id: 'p_doc_spear_economics', type: 'p' }
          ]
        },
        {
          section: 'spear_accucad',
          partLabel: 'Live 3D Engineering',
          title: 'AccuCAD 3D Workstation',
          blocks: [
            { id: 'p_doc_spear_accucad', type: 'p' }
          ]
        },
        {
          section: 'luno',
          partLabel: 'Part 4 • Development Engine',
          title: 'Luno Workspace & The HTML Container Protocol',
          blocks: [
            { id: 'p_doc_luno', type: 'p' },
            { id: 'sidebar_doc_luno', type: 'sidebar', kicker: 'Core Capabilities', title: 'How Luno Powers Every Project' }
          ]
        },
        {
          section: 'homesetup',
          partLabel: 'Part 5 • Infrastructure & Speech',
          title: 'Home Setup, Port 8080 Fleet & Universal Dictation',
          blocks: [
            { id: 'p_doc_homesetup', type: 'p' },
            { id: 'sidebar_doc_homesetup', type: 'sidebar', kicker: 'Fleet & Safety', title: 'Multi-Node Sync & Zero-Leak Secrets' }
          ]
        },
        {
          section: 'career',
          partLabel: 'Part 6 • Engineering & Patents',
          title: 'AccuDraw (US Patent #5,754,182) & Aardvark Heritage',
          blocks: [
            { id: 'p_doc_career', type: 'p' }
          ]
        },
        {
          section: 'financial',
          partLabel: 'Part 7 • Economic Attribution',
          title: 'Financial Valuation Record & Independent Verification',
          blocks: [
            { id: 'p_doc_financial', type: 'p' }
          ]
        },
        {
          section: 'family',
          partLabel: 'Part 8 • Personal Stability',
          title: 'Family Situation, Stability (Nov 2026) & Protected Layer',
          blocks: [
            { id: 'p_doc_family_public', type: 'p' },
            { id: 'p_doc_family_poa', type: 'p', sensitive: true, sensitiveLabel: 'Sensitive Family Context' }
          ]
        },
        {
          section: 'economics',
          partLabel: 'Part 9 • Architecture Hub',
          title: 'Master Opus Router & Shared Library Hub',
          blocks: [
            { id: 'p_doc_economics', type: 'p' }
          ]
        },
        {
          section: 'visitor_keys',
          partLabel: 'Part 10 • Transparency & AI Export',
          title: 'Keys to the System: Using Export & Annotations With Any AI',
          blocks: [
            { id: 'p_doc_keys', type: 'p' },
            { id: 'sidebar_doc_keys', type: 'sidebar', kicker: 'Visitor Guide', title: 'How Anyone Can Inspect, Export & Verify' }
          ]
        }
      ];
    }

  static p_doc_luno() {
        const lunoUrl = PortalData.resolveAppUrl('Luno');
        return [
          `**[Luno Workspace](${lunoUrl})** is Rob Brown's primary development initiative and the backbone behind every project in this archive. Rather than just a web IDE, Luno pairs a zero-token clipboard code generator with a living document architecture designed to compile **very large, structured prompts for ChatGPT, Claude, and Gemini**—making it possible to get high-leverage AI assistance for organizing life, navigating financial and custody documentation, planning career direction, and building software in one freeform environment.`,
          "When collaborating on code, AI models return surgical `<script data-file=\"...\" data-method=\"...\" data-action=\"patch\">` containers. Luno validates and splices those methods using an in-browser Acorn AST engine, maintains local snapshots, and publishes independent projects to GitHub Pages in one tap."
        ];
      }
  static sidebar_doc_luno() {
      return [
        "Luno Cross-References:\n" +
        `• Primary Workspace: [Luno Workspace](${PortalData.resolveAppUrl('Luno')})\n` +
        `• Shared Dependencies: [Library Hub](${PortalData.resolveAppUrl('Library')}) (\`DomBasics\`, \`UITools\`, \`DocumentReader\`, \`DictationWidget\`)\n` +
        "• Protocol Spec: `Luno/docs/LunoWorkspaceHandoff.md`"
      ];
    }
  static p_doc_homesetup() {
      const hsUrl = PortalData.resolveAppUrl('HomeSetup');
      return [
        `The physical development fleet ([HomeSetup](${hsUrl})) links an Apple Silicon **Mac Mini** (\`10.0.0.226:8080\`), a portable **Ubuntu laptop** (\`10.0.0.245:8080\`), a tethered Windows workstation, two smartphones (where Luno was originally created via voice dictation), and a roving exFAT hard drive.`,
        "A strict **Zero-Leak Boundary** keeps all credentials in local OS environment files and keychains so secrets never enter AI prompts or tracked repositories."
      ];
    }

  static sidebar_doc_homesetup() {
      return [
        "HomeSetup Cross-References:\n" +
        `• Fleet Matrix & Port 8080 Mesh: [HomeSetup Topology](${PortalData.resolveAppUrl('HomeSetup', '#topology')})\n` +
        `• Universal Speech Engine: [HomeSetup Dictation](${PortalData.resolveAppUrl('HomeSetup', '#dictation')})\n` +
        `• Continuity & Handoff: [HomeSetup Handoff](${PortalData.resolveAppUrl('HomeSetup', '#handoff')})`
      ];
    }
  static p_doc_career() {
      return [
        "Between 1994 and 1997 at Bentley Systems, Rob Brown designed and implemented **AccuDraw**, **SmartLine**, and **PowerSelector** for MicroStation—resulting in **US Patent #5,754,182** (Bentley's first corporate patent) and establishing the heads-up drafting standard across 48 of 50 U.S. State DOTs.",
        `With the original patents expired, [CadPlan](${PortalData.resolveAppUrl('CadPlan')}), [accuCad](${PortalData.resolveAppUrl('accuCad')}), and [accudraw](${PortalData.resolveAppUrl('accudraw')}) preserve the 30-year historical record alongside live 3D WebGL constraint implementations.`
      ];
    }

  static p_doc_financial() {
      return [
        `Quantitative modeling in [ValuationOfAccudraw](${PortalData.resolveAppUrl('ValuationOfAccudraw')}) and unprimed public search analyses in [Opus](${PortalData.resolveAppUrl('Opus', '#verification')}) estimate that AccuDraw and SmartLine anchored **$1.2 Billion to $5.54+ Billion** (with a **$2.3 Billion** 4-model midpoint) of Bentley Systems' enterprise market capitalization.`,
        "Despite creating that industrial moat, personal circumstances required surviving on family assistance, SNAP, and partial Social Security—making transparent public attribution and software commercialization essential."
      ];
    }

  static p_doc_family_public() {
      return [
        "As of **November 2026**, day-to-day housing and utilities are stable following mid-2026 transitions. Current personal focus centers on preparing accurate, constructive documentation concerning Rob's daughter while advancing open-source and commercial software work.",
        "While nothing in this repository is concealed—every underlying document and source file is openly inspectable—sensitive family background is kept in an optional protected layer (`SensitiveContextGate`) rather than placed as front-page headlines."
      ];
    }
  static p_doc_family_poa() {
    return [
      "Additional Family & POA Context: Rob's sister serves as caregiver and holds Power of Attorney (POA) over their mother's affairs. Although their mother has expressed her desire to support Rob financially, POA authority was used to block direct financial assistance, contributing to past hardship documented in `../situation/index.html`."
    ];
  }

  static p_doc_economics() {
      return [
        `**[Opus](${PortalData.resolveAppUrl('Opus')})** serves as the internal 4-quadrant architectural router across CAD inventions, personal valuation, post-labor economics, and home fleet operations, while **[Library](${PortalData.resolveAppUrl('Library')})** houses the shared UI, 3D loader, dictation, and living-document modules used by every project.`
      ];
    }

  static p_doc_keys() {
      return [
        "The primary idea behind this living document architecture—on equal footing with human readability—is providing clean, massive, structured output that goes straight into an LLM (ChatGPT, Claude, or Gemini). By building large, coherent prompts directly out of living documents via Luno, Rob can work with AI to organize his life, document financial and custody records accurately, map career moves, and generate or patch software across every project."
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

  static p_doc_spear_drawing() {
        return [
          `Launch the **[Kinetic Curve & Image Markup Studio](${PortalData.resolveAppUrl('QuoraToys')})** right in your browser. Designed for effortless everyday social-media markup (Quora, X, Substack), it replaces clunky 1980s Bezier handles with physical **32px kinetic string-tether smoothing** and direct rubber-wire bending: drop or **Ctrl+V** paste any image, draw smooth curves, concave arrows, and crisp text callouts, and copy the finished graphic straight back to your clipboard.`,
          `Equally important, its clean modular architecture makes it easy for anyone—or any AI collaborator inside **[Luno Workspace](${PortalData.resolveAppUrl('Luno')})**—to alter, customize, or add new tools via surgical prompt patches, carrying forward the lightweight web-tool spirit of **Aardvark**.`
        ];
      }
  static p_doc_spear_economics() {
      return [
        `For everyday readers who want clear, approachable reading material rather than CAD tools, **[Economics of Automation](${PortalData.resolveAppUrl('EconomicsOfAutomation')})** presents the **Colony of 100,000** thought experiment and an interactive tax & demand simulator.`,
        `Together with **[Jobs & AI](${PortalData.resolveAppUrl('JobsAndAI')})**, it explains why automating labor creates abundance only when paired with a universal **Robot Dividend**—and links readers directly into the rest of the living archive.`
      ];
    }

  static p_doc_spear_accucad() {
        return [
          `**[CadPlan](${PortalData.resolveAppUrl('CadPlan')})** is the flagship career specification built on Rob Brown's **AccuDraw & SmartLine** heritage (US Patent #5,754,182) to put open-source 3D spatial drafting on the map. The document itself IS both a rigorous technical specification (combining prose and working code) AND a live interactive application—embedding working 3D WebGL viewports, animated squircle compasses, and on-curve spline labs directly inside its 13 chapters.`,
          `Just as importantly, CadPlan and the standalone **[AccuCAD 3D Workstation](${PortalData.resolveAppUrl('accuCad')})** are structured so **AI coding agents can read the spec + reference code and insert AccuDraw's 3D constraint engine directly into modern open-source AutoCAD and MicroStation clones** (such as ArtCraft's pure-Rust/WebAssembly CADCraft).`
        ];
      }
}

globalThis.PortalDocContent = PortalDocContent;
if (typeof module !== 'undefined' && module.exports) module.exports = PortalDocContent;