import fs from 'fs';
import path from 'path';

const distClientDir = path.resolve(process.cwd(), 'dist', 'client');
const assetsDir = path.join(distClientDir, 'assets');

if (!fs.existsSync(distClientDir)) {
  throw new Error(`Missing dist client directory: ${distClientDir}`);
}
if (!fs.existsSync(assetsDir)) {
  throw new Error(`Missing dist client assets directory: ${assetsDir}`);
}

const assetFiles = fs.readdirSync(assetsDir);
const jsFiles = assetFiles.filter((file) => file.endsWith('.js'));
const cssFile = assetFiles.find((file) => file.startsWith('styles-') && file.endsWith('.css'));

const mainJsFile = jsFiles.find((file) => {
  const content = fs.readFileSync(path.join(assetsDir, file), 'utf8');
  return content.includes('hydrateRoot(') || content.includes('createRoot(') || content.includes('document,$');
});

if (!mainJsFile) {
  throw new Error(`Unable to locate the client entry JS file in ${assetsDir}. Found JS files: ${jsFiles.join(', ')}`);
}

const htmlContent = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>S.R. Photo Studio</title>
    ${cssFile ? `<link rel="stylesheet" href="/assets/${cssFile}" />` : ''}
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/assets/${mainJsFile}"></script>
  </body>
</html>
`;

fs.writeFileSync(path.join(distClientDir, 'index.html'), htmlContent);
console.log(`Generated index.html using /assets/${mainJsFile}${cssFile ? ` and /assets/${cssFile}` : ''}`);
