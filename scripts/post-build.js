const fs = require('fs'),
    path = require('path');

const dist = path.resolve(process.cwd(), 'dist');
const indexHtml = path.resolve(dist, 'index.html');
const configJs = path.resolve(dist, 'config.js');
try {
    fs.unlinkSync(configJs);
} catch (e) {
    console.log(`${configJs} not exists`);
}
const now = new Date();
const buffer = fs.readFileSync(indexHtml);
const indexHtmlContent = buffer.toString();

const newContent = indexHtmlContent.split('{BUILD_TIME}').join(now.getTime() + '');

fs.writeFileSync(indexHtml, newContent);

