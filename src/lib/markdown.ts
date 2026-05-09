// Minimal, dependency-free markdown renderer for article bodies.
// Supports: headings (#, ##, ###), bold (**text**), italic (*text*),
// ordered & unordered lists, paragraphs, line breaks, links, and code spans.

const escapeHtml = (str: string) =>
  str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

const inline = (line: string) => {
  let s = escapeHtml(line);
  s = s.replace(/`([^`]+)`/g, '<code class="bg-black/5 px-1.5 py-0.5 text-[0.9em]">$1</code>');
  s = s.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  s = s.replace(/\*([^*]+)\*/g, '<em>$1</em>');
  s = s.replace(
    /\[([^\]]+)\]\(([^)]+)\)/g,
    '<a href="$2" class="text-[#D61F1F] underline underline-offset-4 hover:no-underline">$1</a>'
  );
  return s;
};

export function renderMarkdown(md: string): string {
  if (!md) return '';
  const lines = md.replace(/\r\n/g, '\n').split('\n');
  const out: string[] = [];
  let i = 0;

  const flushPara = (buf: string[]) => {
    if (!buf.length) return;
    out.push(`<p class="mb-6 leading-relaxed text-[#2A2A2A]">${buf.map(inline).join(' ')}</p>`);
    buf.length = 0;
  };

  let para: string[] = [];

  while (i < lines.length) {
    const line = lines[i];

    if (/^\s*$/.test(line)) {
      flushPara(para);
      i++;
      continue;
    }

    const h3 = /^###\s+(.*)$/.exec(line);
    const h2 = /^##\s+(.*)$/.exec(line);
    const h1 = /^#\s+(.*)$/.exec(line);
    if (h1 || h2 || h3) {
      flushPara(para);
      if (h1) out.push(`<h2 class="font-serif text-3xl lg:text-4xl mt-12 mb-5 text-[#111]">${inline(h1[1])}</h2>`);
      else if (h2) out.push(`<h3 class="font-serif text-2xl lg:text-3xl mt-10 mb-4 text-[#111]">${inline(h2[1])}</h3>`);
      else if (h3) out.push(`<h4 class="font-serif text-xl mt-8 mb-3 text-[#111]">${inline(h3![1])}</h4>`);
      i++;
      continue;
    }

    if (/^\s*[-*]\s+/.test(line)) {
      flushPara(para);
      const items: string[] = [];
      while (i < lines.length && /^\s*[-*]\s+/.test(lines[i])) {
        items.push(lines[i].replace(/^\s*[-*]\s+/, ''));
        i++;
      }
      out.push(
        `<ul class="list-disc pl-6 mb-6 space-y-2 text-[#2A2A2A] leading-relaxed">${items
          .map((it) => `<li>${inline(it)}</li>`)
          .join('')}</ul>`
      );
      continue;
    }

    if (/^\s*\d+\.\s+/.test(line)) {
      flushPara(para);
      const items: string[] = [];
      while (i < lines.length && /^\s*\d+\.\s+/.test(lines[i])) {
        items.push(lines[i].replace(/^\s*\d+\.\s+/, ''));
        i++;
      }
      out.push(
        `<ol class="list-decimal pl-6 mb-6 space-y-2 text-[#2A2A2A] leading-relaxed">${items
          .map((it) => `<li>${inline(it)}</li>`)
          .join('')}</ol>`
      );
      continue;
    }

    if (/^>\s+/.test(line)) {
      flushPara(para);
      out.push(
        `<blockquote class="border-l-4 border-[#D61F1F] pl-6 italic text-[#444] my-8 text-lg">${inline(line.replace(/^>\s+/, ''))}</blockquote>`
      );
      i++;
      continue;
    }

    para.push(line);
    i++;
  }
  flushPara(para);

  return out.join('\n');
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .slice(0, 80);
}
