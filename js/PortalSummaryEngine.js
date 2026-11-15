class PortalSummaryEngine {
  static async _fetchText(relPath) {
    const clean = String(relPath || '').replace(/^\/+/, '');
    const isLocalHost = typeof window !== 'undefined' &&
      (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' || window.location.port === '8080');

    if (isLocalHost) {
      try {
        const parts = clean.split('/');
        const proj = parts[0] || '';
        const inner = parts.slice(1).join('/');
        const res = await fetch(`/api/fs/read?path=${encodeURIComponent(inner)}&project=${encodeURIComponent(proj)}`);
        if (res.ok) {
          const data = await res.json();
          if (data && data.success && typeof data.content === 'string') {
            return { ok: true, text: data.content, source: 'luno-api' };
          }
        }
      } catch (e) {}
    }

    try {
      const res = await fetch(`../${clean}`);
      if (res.ok) {
        const text = await res.text();
        if (!text.trim().startsWith('<!DOCTYPE') || clean.endsWith('.html')) {
          return { ok: true, text, source: 'http-static' };
        }
      }
    } catch (e) {}

    return { ok: false, text: '', source: 'unavailable' };
  }

  static _extractSummariesFromJs(jsText) {
    if (!jsText || typeof jsText !== 'string') return null;
    try {
      const match = jsText.match(/static\s+getAll\s*\(\s*\)\s*\{\s*return\s*(\{[\s\S]*?\});\s*\}/);
      if (match && match[1]) {
        const fn = new Function(`return (${match[1]});`);
        const obj = fn();
        if (obj && typeof obj === 'object') return obj;
      }
    } catch (e) {}
    return null;
  }

  static async generateSummaries(customTargets = null, options = {}) {
    const includeSensitive = Boolean(options.includeSensitive);
    const targets = Array.isArray(customTargets) && customTargets.length > 0
      ? customTargets
      : PortalData.getScanManifestTargets();

    const scannedFiles = [];
    const manifestsByProject = {};
    const extractedChapterSummaries = {};

    for (const t of targets) {
      const res = await this._fetchText(t.file);
      const entry = {
        file: t.file,
        project: t.project,
        kind: t.kind,
        fetched: res.ok,
        source: res.source,
        lines: res.ok ? res.text.split('\n').length : 0,
        bytes: res.ok ? res.text.length : 0
      };

      if (res.ok && t.kind === 'manifest') {
        try {
          const meta = JSON.parse(res.text);
          entry.name = meta.name || t.project;
          entry.version = meta.version || '1.0.0';
          entry.description = meta.description || '';
          entry.mainFilesCount = Array.isArray(meta.main) ? meta.main.length : 0;
          entry.libraryDepsCount = Array.isArray(meta.library) ? meta.library.length : 0;
          entry.visibilitySets = meta.visibilitySets ? Object.keys(meta.visibilitySets) : [];
          manifestsByProject[t.project] = entry;
        } catch (e) {}
      }

      if (res.ok && t.kind === 'summaries') {
        const parsed = this._extractSummariesFromJs(res.text);
        if (parsed) {
          extractedChapterSummaries[t.project] = parsed;
          entry.chapterCount = Object.keys(parsed).length;
        }
      }

      scannedFiles.push(entry);
    }

    const pillars = PortalData.getPillars().map(p => {
      const projManifest = manifestsByProject[p.id] || manifestsByProject[p.name] || null;
      const out = {
        id: p.id,
        name: p.name,
        category: p.category,
        subtitle: p.subtitle,
        url: p.url,
        publicSummary: p.publicSummary,
        calmNote: p.calmNote,
        facts: p.facts,
        targetFiles: p.targetFiles,
        crossLinks: p.crossLinks,
        liveManifest: projManifest ? {
          version: projManifest.version,
          description: projManifest.description,
          mainFilesCount: projManifest.mainFilesCount,
          libraryDepsCount: projManifest.libraryDepsCount,
          visibilitySets: projManifest.visibilitySets
        } : null
      };
      if (includeSensitive && p.sensitiveSummary) {
        out.protectedContext = p.sensitiveSummary;
      }
      return out;
    });

    return {
      schemaVersion: '1.0.0',
      generator: 'PortalSummaryEngine',
      generatedAt: new Date().toISOString(),
      sensitiveIncluded: includeSensitive,
      projectCount: Object.keys(manifestsByProject).length,
      scannedFileCount: scannedFiles.length,
      pillars,
      chapterSummaries: extractedChapterSummaries,
      scannedFiles
    };
  }

  static buildVisitorAiBriefing(summaryJson, options = {}) {
    const selectedIds = options.selectedIds || null;
    const pillars = (summaryJson?.pillars || PortalData.getPillars()).filter(p => !selectedIds || selectedIds.includes(p.id));
    const lines = [
      '# Rob Brown — Public Portal & Integrated Systems Briefing',
      `Generated: ${new Date().toISOString()}`,
      '',
      'This briefing summarizes an interconnected suite of web applications and living technical dossiers.',
      ''
    ];

    pillars.forEach((p, idx) => {
      lines.push(`## ${idx + 1}. ${p.name} — ${p.subtitle}`);
      lines.push(p.publicSummary);
      if (p.calmNote) lines.push(`*Note:* ${p.calmNote}`);
      if (p.protectedContext) lines.push(`*Additional Factual Context:* ${p.protectedContext}`);
      if (p.facts?.length) lines.push(`- **Key Facts:** ${p.facts.join(' | ')}`);
      if (p.targetFiles?.length) lines.push(`- **Primary Files:** \`${p.targetFiles.join('`, `')}\``);
      lines.push('');
    });

    lines.push('---');
    lines.push('### Independent Verification Prompt (No Prior Name Hint)');
    lines.push('> ' + PortalData.getUnprimedVerificationPrompt());
    return lines.join('\n').trim();
  }

  static async saveSummariesToWorkspace(jsonText) {
    try {
      const res = await fetch('/api/save?project=Portal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          project: 'Portal',
          files: [{ filePath: 'state/summaries.json', content: jsonText, action: 'direct' }]
        })
      });
      if (!res.ok) return { success: false, error: `HTTP ${res.status}` };
      return await res.json();
    } catch (e) {
      return { success: false, error: e.message };
    }
  }
}

globalThis.PortalSummaryEngine = PortalSummaryEngine;
if (typeof module !== 'undefined' && module.exports) module.exports = PortalSummaryEngine;