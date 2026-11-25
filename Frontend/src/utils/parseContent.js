// blank line = new paragraph | "# Title" = heading | lines starting "- " = bullet list
export function parseContent(text = '') {
  const blocks = [];

  String(text)
    .replace(/\r/g, '')
    .split(/\n{2,}/)
    .forEach((chunk) => {
      const lines = chunk.split('\n').map((l) => l.trim()).filter(Boolean);
      if (!lines.length) return;

      if (lines.every((l) => /^[-*•] /.test(l))) {
        blocks.push({ type: 'ul', items: lines.map((l) => l.replace(/^[-*•] /, '')) });
      } else if (/^#{1,3} /.test(lines[0])) {
        blocks.push({ type: 'h', text: lines[0].replace(/^#{1,3} /, '') });
        if (lines.length > 1) blocks.push({ type: 'p', text: lines.slice(1).join(' ') });
      } else {
        blocks.push({ type: 'p', text: lines.join(' ') });
      }
    });

  return blocks;
}