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
            partLabel: 'Part 8 • Personal Stability & Court Context',
            title: 'Family Situation, Stability (Nov 2026) & Protected Layer',
            blocks: [
              { id: 'p_doc_family_public', type: 'p' },
              {
                id: 'p_doc_family_jack_and_june',
                type: 'p',
                semiSensitive: true,
                semiSensitiveLabel: 'Additional Context: Conversations with Jack & June 2026 Background (Expandable / AI Q&A)'
              },
              {
                id: 'p_doc_family_poa',
                type: 'p',
                sensitive: true,
                sensitiveLabel: 'Additional Family, Caregiving & Legal Context',
                sensitiveSummary: 'Protected family, caregiving, and dispute records kept out of default view (enter access code to view).'
              }
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
        "As of **November 2026**, day-to-day housing in **Chico, CA** has stabilized after Jack came out to assist with moving into a new apartment and setting up Social Security (with EBT phasing out as Social Security begins). Upfront for clarity: Rob is **out of contact with all of his blood relatives**—including his 94-year-old mother, the sister he used to speak with regularly, and his 12-year-old daughter Stella. This separation is not something Rob initiated or chose: earlier efforts to speak with his mother were restricted or supervised over what could be discussed, leaving communication strained and deeply uncomfortable. His brother-in-law **Jack** is the only family-side contact he interacts with right now, alongside **Don**, an investigator Jack originally hired for a wellness check who remains on email and helped preserve communication between Rob and Jack.",
        "**Mental Health, Executive Dysfunction & Career Environment:** Carrying the weight of being cut off from both his daughter and his mother's family at the same time—despite completely different causes—pushed Rob into an unstable mental-health crisis he nearly did not survive, making stability and mental health his top priority. People also often misunderstand how his career works: he has done very well when placed in an environment suited to his visual and technical strengths, whereas forcing him into misaligned situations goes poorly. Alongside that, he is applying for Social Security disability related to **executive dysfunction** and chronic avoidance of overwhelming paperwork—which is why keeping every fact structured here lets him load the full context into an AI without re-explaining painful history and get calm, step-by-step guidance.",
        "Rob's central personal and legal priority concerns his 12-year-old daughter **Stella** (custody and divorce filed in **San Francisco Superior Court**). Rob won **primary custody** in **2017** after supporting Stella's mother for ~3 years while she completed a degree, and later stepped back from career advancement during custody demands before Stella's mother relocated back to San Francisco around kindergarten. Rob has now been separated from Stella for over a year. Early this spring, Rob received thick packages from Stella's mother's lawyer during severe housing and family collapse when executive dysfunction and mental-health breakdown left him unable to open them; now stabilized, he is **bringing those unopened packages to therapy tomorrow** to review and address them constructively.",
        "On the financial and employment side, Rob returned briefly to Bentley Systems in a coding role but was fired roughly three years ago amid early post-ChatGPT AI tool bans, leading to depression and prolonged lack of traditional employment. Because an older Bentley-era child support order enforced by **San Mateo County** was never modified downward, arrears accumulated even after **$6,000** was paid a year ago for his Chico apartment move—resulting in roughly **$600/month withheld from his ~$1,900/month Social Security** while Stella's mother is employed. Rob is preparing a San Mateo modification filing while pursuing software and AI commercialization so he can rebuild independent income and contribute to Stella's future.",
        "In June 2026, during acute instability—when power was cut off, computer access was lost, he felt completely abandoned, and he was calling out his sister's actions—Rob recorded and shared videos that Jack noted offended people and drew family pushback. Rob recognizes how destabilizing that period was and is communicating much more carefully now. Detailed custody-order disputes, June 2026 conflict, POA, Virginia elder-welfare inquiry, and sister social-media records remain behind `SensitiveContextGate` in the `situation` document and below rather than out front."
      ];
    }
  static p_doc_family_poa() {
      return [
        "Protected Family, POA, Virginia Inquiry & Social Media Context: Rob's sister serves as caregiver and holds Power of Attorney (POA) over their 94-year-old mother's affairs. Although their mother expressed a desire to support Rob financially, POA authority was used to block direct help and cut off communication. When Rob discussed in therapy that his sister was blocking contact with his mother, his therapist stated she had to report it and filed an elder-welfare report in Virginia; Virginia followed up, leaving Rob conflicted between explaining how blocked contact isolates a 94-year-old parent (preventing him from sharing career progress or family bias) and fearing backlash while the family worked on a trust—especially after relatives reacted angrily to his earlier legal objections as if he were threatening to sue his mother. Detailed records of that conflict and sister social-media statements are maintained behind the protected gate in `../situation/index.html`."
      ];
    }
  static p_doc_economics() {
      return [
        `**[Opus](${PortalData.resolveAppUrl('Opus')})** serves as the internal 4-quadrant architectural router across CAD inventions, personal valuation, post-labor economics, and home fleet operations, while **[Library](${PortalData.resolveAppUrl('Library')})** houses the shared UI, 3D loader, dictation, and living-document modules used by every project.`
      ];
    }

  static p_doc_keys() {
      return [
        "This system serves two distinct purposes cleanly. **For visitors** (family members, legal counsel, therapists, or technical reviewers), every document here can be read directly in the browser—or exported as a single large, structured prompt (`Export MD` / `Copy Full Briefing MD`) to paste into **ChatGPT, Claude, or Gemini** so you can ask questions and explore details conversationally.",
        "**For Rob**, keeping his life, legal, financial, and software records inside this structured living-document format (powered by Luno) solves a critical personal challenge: overcoming executive dysfunction and paperwork avoidance. Instead of staring at scattered legal mail or having to re-explain painful history from scratch, Rob can load the complete, up-to-date context into an AI in seconds and ask it for the next clear, manageable step—while also using Luno to edit these documents and build or update software."
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

  static p_doc_family_jack_and_june() {
      return [
        "**Semi-Sensitive Context (For Difficult Conversations & AI Q&A):** While Rob appreciates Jack's recent help stabilizing housing in Chico and Social Security—and Don's steadying presence on email—a serious gap remains: Jack has not shared a full long-term plan, and both Jack and Don do not understand software technology or where Rob actually excels. Rob has done exceptionally well when placed in the right technical environment, whereas forcing him into misaligned jobs or unsustainable pressures goes poorly; pushing purely toward disability without backing his strengths overlooks what he can actually build.",
        "Specifically, Jack rejects the independent AI and Google Search valuations estimating Rob's past Bentley Systems work generated billions in enterprise value, claiming he could make an AI say that about anyone. Rob specifically structured those queries blind (without naming himself) to rule out sycophancy, and built this entire Luno/CadPlan AI-orchestration system himself—so he knows how to prevent AI flattery. Keeping this context tucked into the expandable/AI-readable layer prevents unnecessary front-page friction while ensuring that if Jack, Don, Stella's mother's counsel, or an AI mediating these discussions asks questions, the reasoning is clear and complete."
      ];
    }
}

globalThis.PortalDocContent = PortalDocContent;
if (typeof module !== 'undefined' && module.exports) module.exports = PortalDocContent;