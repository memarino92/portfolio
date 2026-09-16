import { mkdir, writeFile, access } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const args = process.argv.slice(2);
const title = args.filter(arg => arg !== '--mdx').join(' ').trim();
if (!title) {
  console.error('Usage: npm run new:post -- "Your article title" [--mdx]');
  process.exit(1);
}
const slug = title.normalize('NFKD').replace(/\p{Mark}/gu, '').toLowerCase()
  .replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
if (!slug) {
  console.error('The title must contain at least one letter from a–z or a number.');
  process.exit(1);
}
const content = new URL('../src/content/blog/', import.meta.url);
const directory = new URL(slug + '/', content);
const file = new URL(args.includes('--mdx') ? 'index.mdx' : 'index.md', directory);
const date = new Date().toISOString().slice(0, 10);
try {
  for (const extension of ['md', 'mdx']) {
    try { await access(new URL(slug + '.' + extension, content)); }
    catch (error) { if (error.code === 'ENOENT') continue; throw error; }
    throw Object.assign(new Error('Existing post'), { code: 'EEXIST' });
  }
  await mkdir(directory);
  await writeFile(file, '---\ntitle: ' + JSON.stringify(title) + '\ndescription: ""\npubDate: ' + date + '\ntags: []\ndraft: true\n---\n\nStart writing here.\n', { flag: 'wx' });
  console.log('Created ' + fileURLToPath(file) + '\nPreview with npm run dev. Set draft: false when ready to publish.');
} catch (error) {
  console.error(error.code === 'EEXIST' ? 'A post named "' + slug + '" already exists. Choose another title.' : error.message);
  process.exit(1);
}
