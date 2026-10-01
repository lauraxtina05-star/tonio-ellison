import { cp, mkdir, rm, readFile, writeFile } from 'node:fs/promises';
import vm from 'node:vm';

await rm('dist', { recursive: true, force: true });
await mkdir('dist', { recursive: true });
await cp('public', 'dist', { recursive: true });

// Render centralized event copy into HTML too, so it remains readable without JS.
const context = { window: {} };
vm.runInNewContext(await readFile('public/content.js', 'utf8'), context);
const { event } = context.window.SITE_CONTENT;
const escapeHTML = value => String(value).replace(/[&<>"']/g, character => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
}[character]));
let html = await readFile('dist/index.html', 'utf8');
html = html.replace(/(<p[^>]*data-event="([a-zA-Z]+)"[^>]*>)[\s\S]*?(<\/p>)/g,
  (_, opening, field, closing) => `${opening}${escapeHTML(event[field])}${closing}`);
html = html.replace('data-event-link>', `data-event-link href="${escapeHTML(event.url)}">`);
await writeFile('dist/index.html', html);
console.log('Built static website in dist/');
