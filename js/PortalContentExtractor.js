class PortalContentExtractor {
  static _cache = new Map();

  static getCatalog() {
      return [
        {
          id: 'situation',
          title: 'Situation Dossier (Personal, Custody & Courts)',
          icon: '⚖️',
          accent: '#f43f5e',
          summaryFile: 'situation/js/SituationSummaries.js',
          sections: [
            { id: 'overview', label: 'Current Status (Nov 2026), Stella & Support', file: 'situation/js/OverviewPage.js', kind: 'page-class', cls: 'OverviewPage' },
            { id: 'court-filing', label: 'Daughter (Stella) & Court Filing Workspace', file: 'situation/js/CourtFilingPage.js', kind: 'page-class', cls: 'CourtFilingPage', sensitive: true },
            { id: 'elder-advocacy', label: 'Care Arrangements & Virginia Review', file: 'situation/js/ElderAdvocacyPage.js', kind: 'page-class', cls: 'ElderAdvocacyPage', sensitive: true },
            { id: 'caretaker-bias', label: 'Family Conflict & Exhibits', file: 'situation/js/CaretakerBiasPage.js', kind: 'page-class', cls: 'CaretakerBiasPage', sensitive: true },
            { id: 'ai-perspective', label: 'AI Automation & Career Timeline', file: 'situation/js/AiPerspectivePage.js', kind: 'page-class', cls: 'AiPerspectivePage' },
            { id: 'current-work', label: 'Current Work & Software Suite', file: 'situation/js/CurrentWorkPage.js', kind: 'page-class', cls: 'CurrentWorkPage' },
            { id: 'valuation', label: 'AccuDraw Value Assessment (4-Model)', file: 'situation/js/ValuationPage.js', kind: 'page-class', cls: 'ValuationPage' }
          ]
        },
        {
          id: 'ValuationOfAccudraw',
          title: 'Valuation of AccuDraw & SmartLine (Full Exhibits)',
          icon: '📊',
          accent: '#f59e0b',
          sections: [
            { id: 'overview', label: 'Counterfactual Market Cap Analysis & AI Transcripts', file: 'ValuationOfAccudraw/js/ValuationOfAccudraw.js', kind: 'page-class', cls: 'ValuationOfAccudraw' }
          ]
        },
        {
          id: 'Opus',
          title: 'Master Opus (4-Quadrant Archive & Verification)',
          icon: '🏛️',
          accent: '#a78bfa',
          summaryFile: 'Opus/js/OpusSummaries.js',
          sections: [
            { id: 'overview', label: '0. Master Gateway & 4-Quadrant Map', file: 'Opus/js/OpusOverviewContent.js', kind: 'doc-content', cls: 'OpusOverviewContent' },
            { id: 'verification', label: '1. Public Search Verification & Null Hypothesis', file: 'Opus/js/OpusVerificationContent.js', kind: 'doc-content', cls: 'OpusVerificationContent' },
            { id: 'q1_cad', label: '2. Q-I: Spatial CAD Inventions', file: 'Opus/js/OpusQ1CadContent.js', kind: 'doc-content', cls: 'OpusQ1CadContent' },
            { id: 'q2_narrative', label: '3. Q-II: Personal Narrative & Legal Reality', file: 'Opus/js/OpusQ2NarrativeContent.js', kind: 'doc-content', cls: 'OpusQ2NarrativeContent' },
            { id: 'q3_economics', label: '4. Q-III: Post-Labor Macro-Economics', file: 'Opus/js/OpusQ3EconomicsContent.js', kind: 'doc-content', cls: 'OpusQ3EconomicsContent' },
            { id: 'q4_cockpit', label: '5. Q-IV: Fleet Infrastructure & Cockpit', file: 'Opus/js/OpusQ4CockpitContent.js', kind: 'doc-content', cls: 'OpusQ4CockpitContent' },
            { id: 'strategy', label: '6. Grand Strategy & Living Agent Loop', file: 'Opus/js/OpusGrandStrategyContent.js', kind: 'doc-content', cls: 'OpusGrandStrategyContent' }
          ]
        },
        {
          id: 'EconomicsOfAutomation',
          title: 'Economics of Automation & Robot Dividend',
          icon: '🤖',
          accent: '#34d399',
          sections: [
            { id: 'dividend', label: '1. The Robot Dividend', file: 'EconomicsOfAutomation/js/ArticleContent.js', kind: 'doc-content', cls: 'ArticleContent' },
            { id: 'colony', label: '2. The 100,000 Colony', file: 'EconomicsOfAutomation/js/ColonyContent.js', kind: 'doc-content', cls: 'ColonyContent' },
            { id: 'earth', label: '3. Earth Transition', file: 'EconomicsOfAutomation/js/EarthContent.js', kind: 'doc-content', cls: 'EarthContent' },
            { id: 'statusquo', label: '4. The Status Quo Trap', file: 'EconomicsOfAutomation/js/KineticContent.js', kind: 'doc-content', cls: 'KineticContent' },
            { id: 'doomer', label: '5. The Doomer Loop', file: 'EconomicsOfAutomation/js/DoomerContent.js', kind: 'doc-content', cls: 'DoomerContent' },
            { id: 'paradigms', label: '6. The Three Visions', file: 'EconomicsOfAutomation/js/ParadigmsContent.js', kind: 'doc-content', cls: 'ParadigmsContent' },
            { id: 'objections', label: '7. The Adversarial Gauntlet', file: 'EconomicsOfAutomation/js/ObjectionsContent.js', kind: 'doc-content', cls: 'ObjectionsContent' },
            { id: 'gametheory', label: '8. Game Theory & The Law', file: 'EconomicsOfAutomation/js/GameTheoryContent.js', kind: 'doc-content', cls: 'GameTheoryContent' },
            { id: 'rules', label: '9. Discussion Ground Rules', file: 'EconomicsOfAutomation/js/RulesContent.js', kind: 'doc-content', cls: 'RulesContent' },
            { id: 'ai-rules', label: '10. AI Prompt Directives', file: 'EconomicsOfAutomation/js/AiRulesContent.js', kind: 'doc-content', cls: 'AiRulesContent' }
          ]
        },
        {
          id: 'JobsAndAI',
          title: 'Jobs & AI (Automation Horizon)',
          icon: '📈',
          accent: '#fb923c',
          sections: [
            { id: 'thesis', label: 'Why AI & Robotics Displace Human Labor', file: 'JobsAndAI/js/ThesisPage.js', kind: 'page-class', cls: 'ThesisPage' },
            { id: 'graphics-video', label: 'Graphics, VFX & Spatial Automation Evidence', file: 'JobsAndAI/js/GraphicsVideoPage.js', kind: 'page-class', cls: 'GraphicsVideoPage' }
          ]
        },
        {
          id: 'CadPlan',
          title: 'CadPlan (Executable CAD & AccuDraw Spec)',
          icon: '📐',
          accent: '#00f2fe',
          sections: [
            { id: 'meta', label: '0. Living Dossier & Methodology', file: 'CadPlan/js/CadPlanMetaContent.js', kind: 'doc-content', cls: 'CadPlanMetaContent' },
            { id: 'origins', label: '1. Origins & Playbook', file: 'CadPlan/js/CadOriginsContent.js', kind: 'doc-content', cls: 'CadOriginsContent' },
            { id: 'philosophy', label: '2. The Squircle Compass', file: 'CadPlan/js/AccuDrawPhilosophyContent.js', kind: 'doc-content', cls: 'AccuDrawPhilosophyContent' },
            { id: 'accucad', label: '3. Inside accuCad Kinematics', file: 'CadPlan/js/AccuCadAuditContent.js', kind: 'doc-content', cls: 'AccuCadAuditContent' },
            { id: 'shortcuts', label: '4. Key Command Engine', file: 'CadPlan/js/KeyCommandEngineContent.js', kind: 'doc-content', cls: 'KeyCommandEngineContent' },
            { id: 'curvedrawer', label: '5. Kinetic Curve Drawer', file: 'CadPlan/js/CadCurveDrawerContent.js', kind: 'doc-content', cls: 'CadCurveDrawerContent' },
            { id: 'architecture', label: '9. Headless Kernel & Architecture', file: 'CadPlan/js/CadArchitectureDecisionsContent.js', kind: 'doc-content', cls: 'CadArchitectureDecisionsContent' },
            { id: 'cadcraft', label: '10. ArtCraft CADCraft Integration', file: 'CadPlan/js/CadCraftIntegrationContent.js', kind: 'doc-content', cls: 'CadCraftIntegrationContent' },
            { id: 'itwin', label: '11. iTwin Parity & SmartLine', file: 'CadPlan/js/CadITwinParityContent.js', kind: 'doc-content', cls: 'CadITwinParityContent' },
            { id: 'interview', label: '12. Inventor Vision & Roadmap', file: 'CadPlan/js/CadVisionInterviewContent.js', kind: 'doc-content', cls: 'CadVisionInterviewContent' }
          ]
        },
        {
          id: 'accuCad',
          title: 'AccuCAD 3D Workstation Docs',
          icon: '🚀',
          accent: '#38bdf8',
          sections: [
            { id: 'architecture', label: 'I. Core Architecture & Coordinate Pipeline', file: 'accuCad/js/docs/AccuCadArchitectureDoc.js', kind: 'doc-content', cls: 'AccuCadArchitectureDoc' },
            { id: 'accudraw', label: 'II. AccuDraw Precision Engine', file: 'accuCad/js/docs/AccuDrawEngineDoc.js', kind: 'doc-content', cls: 'AccuDrawEngineDoc' },
            { id: 'tools', label: 'III. Drawing Primitives & Transforms', file: 'accuCad/js/docs/DrawingToolsDoc.js', kind: 'doc-content', cls: 'DrawingToolsDoc' },
            { id: 'networking', label: 'IV. P2P Wireless Protocol', file: 'accuCad/js/docs/P2PNetworkingDoc.js', kind: 'doc-content', cls: 'P2PNetworkingDoc' }
          ]
        },
        {
          id: 'TouchController',
          title: 'TouchController P2P Docs',
          icon: '📱',
          accent: '#38bdf8',
          sections: [
            { id: 'architecture', label: 'I. System Architecture', file: 'TouchController/js/docs/TouchControllerArchitectureDoc.js', kind: 'doc-content', cls: 'TouchControllerArchitectureDoc' },
            { id: 'navigation', label: 'II. Left Trackpad (Navigation & Inertia)', file: 'TouchController/js/docs/LeftTrackpadNavigationDoc.js', kind: 'doc-content', cls: 'LeftTrackpadNavigationDoc' },
            { id: 'controls', label: 'III. Right Trackpad (Sliders & Locks)', file: 'TouchController/js/docs/RightTrackpadControlsDoc.js', kind: 'doc-content', cls: 'RightTrackpadControlsDoc' },
            { id: 'networking', label: 'IV. WebRTC & Signaling Protocol', file: 'TouchController/js/docs/WebRTCClientNetworkingDoc.js', kind: 'doc-content', cls: 'WebRTCClientNetworkingDoc' }
          ]
        },
        {
          id: 'accudraw',
          title: 'AccuDraw Historical Archive (1994–1996)',
          icon: '📜',
          accent: '#60a5fa',
          sections: [
            { id: 'history', label: 'US Patent #5,754,182 & 1995–1996 Articles', file: 'accudraw/js/AccuDrawData.js', kind: 'data-js', cls: 'AccuDrawData' }
          ]
        },
        {
          id: 'HomeSetup',
          title: 'Home Setup, Fleet & Speech Architecture',
          icon: '🖥️',
          accent: '#10b981',
          summaryFile: 'HomeSetup/js/HomeSummaries.js',
          sections: [
            { id: 'topology', label: '0. Hardware Topology & Fleet Matrix', file: 'HomeSetup/js/HomeTopologyContent.js', kind: 'doc-content', cls: 'HomeTopologyContent' },
            { id: 'network', label: '1. Local Network & Connection Mesh', file: 'HomeSetup/js/HomeNetworkContent.js', kind: 'doc-content', cls: 'HomeNetworkContent' },
            { id: 'storage', label: '2. Shared Storage & Portable Drive', file: 'HomeSetup/js/HomeStorageContent.js', kind: 'doc-content', cls: 'HomeStorageContent' },
            { id: 'nodes', label: '3. Machine Workspaces & Luno Nodes', file: 'HomeSetup/js/HomeNodesContent.js', kind: 'doc-content', cls: 'HomeNodesContent' },
            { id: 'orchestration', label: '4. Cross-Wire LLM Orchestration', file: 'HomeSetup/js/HomeOrchestrationContent.js', kind: 'doc-content', cls: 'HomeOrchestrationContent' },
            { id: 'secrets', label: '5. Credentials & Safe Key Storage', file: 'HomeSetup/js/HomeSecretsContent.js', kind: 'doc-content', cls: 'HomeSecretsContent' },
            { id: 'handoff', label: '6. Thread Continuity & Active Handoff', file: 'HomeSetup/js/HomeHandoffContent.js', kind: 'doc-content', cls: 'HomeHandoffContent' },
            { id: 'dictation', label: '7. Universal Speech & Dictation', file: 'HomeSetup/js/HomeDictationContent.js', kind: 'doc-content', cls: 'HomeDictationContent' }
          ]
        },
        {
          id: 'Comments',
          title: 'Comments System & Community Oracle Spec',
          icon: '💬',
          accent: '#38bdf8',
          sections: [
            { id: 'overview', label: '0. Architecture & Modern Horizon', file: 'Comments/js/CommentsOverviewContent.js', kind: 'doc-content', cls: 'CommentsOverviewContent' },
            { id: 'styling', label: '1. Styling, Theming & Micro-Threads', file: 'Comments/js/CommentsStylingContent.js', kind: 'doc-content', cls: 'CommentsStylingContent' },
            { id: 'identity', label: '2. Identity & Discriminators', file: 'Comments/js/CommentsAuthIdentityContent.js', kind: 'doc-content', cls: 'CommentsAuthIdentityContent' },
            { id: 'threading', label: '3. Trees, Prominence & Reputation', file: 'Comments/js/CommentsThreadingContent.js', kind: 'doc-content', cls: 'CommentsThreadingContent' },
            { id: 'api_contract', label: '4. Supabase & Serverless API', file: 'Comments/js/CommentsApiContractContent.js', kind: 'doc-content', cls: 'CommentsApiContractContent' },
            { id: 'dom_anchoring', label: '5. Universal DOM Anchoring', file: 'Comments/js/CommentsDomAnchorContent.js', kind: 'doc-content', cls: 'CommentsDomAnchorContent' },
            { id: 'ai_moderation', label: '6. AI Moderation & Prominence', file: 'Comments/js/CommentsAiModerationContent.js', kind: 'doc-content', cls: 'CommentsAiModerationContent' },
            { id: 'federation', label: '7. Federation & Scale', file: 'Comments/js/CommentsFederationContent.js', kind: 'doc-content', cls: 'CommentsFederationContent' },
            { id: 'deployment_kit', label: '8. Drop-In Deployment Kit', file: 'Comments/js/CommentsDeploymentKitContent.js', kind: 'doc-content', cls: 'CommentsDeploymentKitContent' }
          ]
        },
        {
          id: 'QuoraToys',
          title: 'Kinetic Curve & Image Markup Studio',
          icon: '〰️',
          accent: '#c084fc',
          sections: [
            { id: 'studio', label: 'Optical Studio & Kinetic Curve Documentation', file: 'QuoraToys/js/QuoraToysContent.js', kind: 'doc-content', cls: 'QuoraStudioContent' }
          ]
        },
        {
          id: 'Portal',
          title: 'Portal Overview & Pillars',
          icon: '🌐',
          accent: '#38bdf8',
          sections: [
            { id: 'all_chapters', label: 'Portal Integrated Chapters (1–10)', file: 'Portal/js/PortalDocContent.js', kind: 'portal-doc', cls: 'PortalDocContent' }
          ]
        }
      ];
    }
  static async _fetchText(relPath) {
    if (this._cache.has(relPath)) return this._cache.get(relPath);
    const res = await PortalSummaryEngine._fetchText(relPath);
    if (res && res.ok) {
      this._cache.set(relPath, res.text);
      return res.text;
    }
    return null;
  }

  static _evalIsolatedClass(codeText, clsName) {
    try {
      const fn = new Function('window', 'globalThis', 'makeElement', 'SensitiveContextGate', 'PortalData',
        `${codeText}\nreturn typeof ${clsName} !== 'undefined' ? ${clsName} : null;`
      );
      return fn(window, globalThis, globalThis.makeElement, globalThis.SensitiveContextGate, globalThis.PortalData);
    } catch (e) {
      return null;
    }
  }

  static async getSectionBlocks(doc, sec) {
    const unlocked = typeof SensitiveContextGate !== 'undefined' && SensitiveContextGate.isUnlocked();
    const code = await this._fetchText(sec.file);
    if (!code) return [];

    if (sec.kind === 'portal-doc') {
      const blocks = [];
      PortalDocContent.manifest().forEach(m => {
        (m.blocks || []).forEach(b => {
          blocks.push({ id: b.id, title: `${m.title} (${b.id})`, type: b.type || 'p', sensitive: Boolean(b.sensitive) });
        });
      });
      return blocks;
    }

    if (sec.kind === 'doc-content') {
      const cls = this._evalIsolatedClass(code, sec.cls);
      const manifest = cls && typeof cls.manifest === 'function' ? cls.manifest() : [];
      const blocks = [];
      manifest.forEach(m => {
        (m.blocks || []).forEach(b => {
          if (b.type === 'component') return;
          blocks.push({
            id: b.id,
            title: b.title || m.title || b.id,
            type: b.type || 'p',
            sensitive: Boolean(b.sensitive || m.sensitive)
          });
        });
      });
      return blocks;
    }

    if (sec.kind === 'page-class') {
      const cls = this._evalIsolatedClass(code, sec.cls);
      if (cls) {
        try {
          const inst = new cls();
          if (typeof inst.render === 'function') {
            const stubApp = { viewMode: 'dark', currentTheme: 'dark', registerVideo: () => {}, getValuationStaticData: () => ({}) };
            const el = inst.render(stubApp);
            if (el) {
              const found = Array.from(el.querySelectorAll('[data-block-id]')).map(node => {
                const bId = node.getAttribute('data-block-id');
                const heading = node.querySelector('h2, h3, h4, strong');
                return {
                  id: bId,
                  title: (heading?.textContent || bId).trim().slice(0, 65),
                  type: 'p',
                  sensitive: Boolean(sec.sensitive && !unlocked)
                };
              });
              if (found.length > 0) return found;
            }
          }
        } catch (e) {}
      }
    }
    return [];
  }

  static _domToMarkdown(rootEl) {
    if (!rootEl) return '';
    const lines = [];
    const walk = (node) => {
      if (!node) return;
      if (node.nodeType === Node.TEXT_NODE) {
        const t = node.textContent.replace(/\s+/g, ' ');
        if (t.trim()) lines.push(t.trim());
        return;
      }
      if (node.nodeType !== Node.ELEMENT_NODE) return;
      const tag = node.tagName.toLowerCase();
      if (tag === 'button' || tag === 'svg' || tag === 'style' || tag === 'script') return;
      if (tag === 'h1') { lines.push(`\n# ${node.textContent.trim()}\n`); return; }
      if (tag === 'h2') { lines.push(`\n## ${node.textContent.trim()}\n`); return; }
      if (tag === 'h3' || tag === 'h4') { lines.push(`\n### ${node.textContent.trim()}\n`); return; }
      if (tag === 'li') { lines.push(`- ${node.textContent.replace(/\s+/g, ' ').trim()}`); return; }
      if (tag === 'p' || tag === 'blockquote') {
        const txt = node.textContent.replace(/\s+/g, ' ').trim();
        if (txt) lines.push(tag === 'blockquote' ? `> ${txt}` : txt, '');
        return;
      }
      Array.from(node.childNodes).forEach(walk);
    };
    walk(rootEl);
    return lines.join('\n').replace(/\n{3,}/g, '\n\n').trim();
  }

  static _docContentClassToMarkdown(docCls, unlocked = false, options = {}) {
    if (!docCls) return '';
    const coreOnly = Boolean(options.coreOnly);
    const excludeDevMeta = Boolean(options.excludeDevMeta);
    const onlyBlockIds = Array.isArray(options.onlyBlockIds) ? new Set(options.onlyBlockIds) : null;

    const meta = typeof docCls.getMeta === 'function' ? docCls.getMeta() : {};
    const manifest = typeof docCls.manifest === 'function' ? docCls.manifest() : [];
    const lines = [];
    if (meta.title && !onlyBlockIds) lines.push(`### ${meta.title}`);
    if (meta.subtitle && !coreOnly && !onlyBlockIds) lines.push(`*${meta.subtitle}*`, '');

    if (meta.sensitive && !unlocked) {
      lines.push(`> [Protected Context — Unlock in Portal to include full details]`);
      return lines.join('\n');
    }

    if (manifest.length === 0) {
      Object.getOwnPropertyNames(docCls).forEach(k => {
        if ((k.startsWith('p_') || k.startsWith('sidebar_') || k.startsWith('quote_')) && typeof docCls[k] === 'function') {
          if (onlyBlockIds && !onlyBlockIds.has(k)) return;
          if (coreOnly && k.startsWith('sidebar_')) return;
          const val = docCls[k]();
          const txt = Array.isArray(val) ? val.join('\n\n') : String(val);
          if (txt.trim()) lines.push(txt.trim(), '');
        }
      });
      return lines.join('\n').trim();
    }

    manifest.forEach(sec => {
      if (excludeDevMeta && !onlyBlockIds && typeof PartialDocumentEngine !== 'undefined' && PartialDocumentEngine.isDevMetaBlock('', sec.section)) {
        return;
      }
      const secLines = [];
      if (sec.sensitive && !unlocked) {
        secLines.push(`> [Protected Section — Unlock in Portal to include full details]`, '');
      } else {
        (sec.blocks || []).forEach(b => {
          if (onlyBlockIds && !onlyBlockIds.has(b.id)) return;
          if (coreOnly && b.type === 'sidebar') return;
          if (excludeDevMeta && !onlyBlockIds && typeof PartialDocumentEngine !== 'undefined' && PartialDocumentEngine.isDevMetaBlock(b.id, sec.section)) return;
          if (b.sensitive && !unlocked) {
            secLines.push(`> [${b.sensitiveLabel || 'Protected Block'} — Unlock in Portal to include]`, '');
            return;
          }
          if (b.type === 'component') return;
          if (typeof docCls[b.id] === 'function') {
            const val = docCls[b.id]();
            const txt = (Array.isArray(val) ? val.join('\n\n') : String(val)).trim();
            if (txt) {
              if (b.type === 'sidebar') secLines.push(`> **${b.title || 'Note'}:**\n> ${txt.replace(/\n/g, '\n> ')}`, '');
              else if (b.type === 'quote') secLines.push(`> ${txt}`, '');
              else secLines.push(txt, '');
            }
          }
        });
      }
      if (secLines.length > 0) {
        if (sec.title && !onlyBlockIds) lines.push(`#### ${sec.title}`, '');
        lines.push(...secLines);
      }
    });

    return lines.join('\n').replace(/\n{3,}/g, '\n\n').trim();
  }

  static async extractSectionSummary(doc, sec, unlocked = false) {
    if (sec.sensitive && !unlocked) {
      return `**[${sec.label}]** *(Protected context — unlock Sensitive Context in Portal if needed)*`;
    }
    if (doc.summaryFile) {
      const sumCode = await this._fetchText(doc.summaryFile);
      const parsed = sumCode ? PortalSummaryEngine._extractSummariesFromJs(sumCode) : null;
      if (parsed && parsed[sec.id]) {
        const s = parsed[sec.id];
        return `**${s.title || sec.label}:** ${s.tldr}`;
      }
    }
    const pillar = PortalData.getPillars().find(p => p.id.toLowerCase() === doc.id.toLowerCase() || p.url.includes(`/${doc.id}/`));
    if (doc.id === 'Portal') {
      return PortalData.getPillars().map(p => `- **${p.name}:** ${p.publicSummary}`).join('\n');
    }
    const code = await this._fetchText(sec.file);
    if (code && sec.kind === 'doc-content') {
      const cls = this._evalIsolatedClass(code, sec.cls);
      const meta = cls?.getMeta ? cls.getMeta() : null;
      if (meta) return `**${meta.title || sec.label}:** ${meta.subtitle || ''}`;
    }
    if (pillar) {
      return `**${sec.label}:** ${pillar.publicSummary}`;
    }
    return `**${sec.label}** (${doc.title})`;
  }

  static async extractSectionCore(doc, sec, unlocked = false, excludeDevMeta = true) {
    return await this._extractSectionInternal(doc, sec, unlocked, { coreOnly: true, excludeDevMeta });
  }

  static async extractSectionInDepth(doc, sec, unlocked = false, excludeDevMeta = false) {
    return await this._extractSectionInternal(doc, sec, unlocked, { coreOnly: false, excludeDevMeta });
  }

  static async extractSelectedBlocks(doc, sec, blockIds = [], unlocked = false, excludeDevMeta = false) {
    if (!blockIds || blockIds.length === 0) return '';
    return await this._extractSectionInternal(doc, sec, unlocked, { coreOnly: false, excludeDevMeta, onlyBlockIds: blockIds });
  }

  static async _extractSectionInternal(doc, sec, unlocked, opts = {}) {
    if (sec.sensitive && !unlocked) {
      return `### ${sec.label}\n*[Protected context — click "🔒 Sensitive Context" in the Portal header to unlock and include this section.]*`;
    }
    const code = await this._fetchText(sec.file);
    if (!code) {
      return await this.extractSectionSummary(doc, sec, unlocked);
    }

    const onlyBlockIds = Array.isArray(opts.onlyBlockIds) ? new Set(opts.onlyBlockIds) : null;

    if (sec.kind === 'portal-doc') {
      const all = PortalDocContent.manifest().map(m => {
        const parts = [];
        (m.blocks || []).forEach(b => {
          if (onlyBlockIds && !onlyBlockIds.has(b.id)) return;
          if (opts.coreOnly && b.type === 'sidebar') return;
          if (b.sensitive && !unlocked) {
            parts.push(`*[Protected context — unlock in Portal to include]*`);
          } else if (typeof PortalDocContent[b.id] === 'function') {
            const val = PortalDocContent[b.id]();
            parts.push(Array.isArray(val) ? val.join('\n\n') : String(val));
          }
        });
        if (parts.length === 0) return '';
        return (onlyBlockIds ? '' : `### ${m.partLabel ? m.partLabel + ' — ' : ''}${m.title}\n\n`) + parts.join('\n\n');
      }).filter(Boolean);
      return all.join('\n\n');
    }

    if (sec.kind === 'doc-content') {
      const cls = this._evalIsolatedClass(code, sec.cls);
      const md = this._docContentClassToMarkdown(cls, unlocked, opts);
      if (md) return md;
    }

    if (sec.kind === 'page-class') {
      const cls = this._evalIsolatedClass(code, sec.cls);
      if (cls) {
        try {
          const inst = new cls();
          if (typeof inst.render === 'function') {
            const stubApp = { viewMode: 'dark', currentTheme: 'dark', registerVideo: () => {}, getValuationStaticData: () => ({}) };
            const el = inst.render(stubApp);
            if (onlyBlockIds && el) {
              const parts = [];
              onlyBlockIds.forEach(bId => {
                const node = el.querySelector(`[data-block-id="${bId}"]`);
                if (node) parts.push(this._domToMarkdown(node));
              });
              if (parts.length > 0) return parts.join('\n\n');
            }
            const md = this._domToMarkdown(el);
            if (md && md.length > 40) return md;
          }
        } catch (e) {}
      }
      const strings = [];
      const regex = /(['"`])((?:\\.|(?!\1)[^\\]){45,})\1/g;
      let m;
      while ((m = regex.exec(code)) !== null) {
        const s = m[2].replace(/\\n/g, '\n').replace(/\\'/g, "'").replace(/\\"/g, '"').trim();
        if (!s.includes('display:') && !s.includes('background:') && !s.includes('border:') && !s.includes('class=')) {
          strings.push(s);
        }
      }
      if (strings.length > 0) return `### ${sec.label}\n\n` + strings.slice(0, 40).join('\n\n');
    }

    if (sec.kind === 'data-js') {
      const strings = [];
      const regex = /(['"`])((?:\\.|(?!\1)[^\\]){40,})\1/g;
      let m;
      while ((m = regex.exec(code)) !== null) {
        const s = m[2].replace(/\\n/g, '\n').replace(/\\'/g, "'").replace(/\\"/g, '"').trim();
        if (!s.includes('http') && !s.endsWith('.jpg') && !s.endsWith('.png')) strings.push(s);
      }
      if (strings.length > 0) return `### ${sec.label}\n\n` + strings.slice(0, 40).join('\n\n');
    }

    return await this.extractSectionSummary(doc, sec, unlocked);
  }
}

globalThis.PortalContentExtractor = PortalContentExtractor;
if (typeof module !== 'undefined' && module.exports) module.exports = PortalContentExtractor;