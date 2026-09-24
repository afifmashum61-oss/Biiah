const fs = require('fs');
const path = require('path');

const appPath = 'C:/Users/HP/Documents/media-pembelajaran-bahasa-arab/app.js';
let content = fs.readFileSync(appPath, 'utf8');

const targetStr = `                <a href="\${listening.video.youtubeUrl}" target="_blank" rel="noopener noreferrer" class="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold shadow transition-all flex items-center gap-2 self-start sm:self-auto">
                  <i class="fa-brands fa-youtube text-sm"></i>
                  <span>Buka di YouTube</span>
                </a>`;

if (content.includes(targetStr)) {
  content = content.replace(targetStr, '');
  fs.writeFileSync(appPath, content, 'utf8');
  console.log('Successfully removed "Buka di YouTube" button!');
} else {
  console.log('Target string not found, attempting regex replace...');
  const regex = /<a href="\$\{listening\.video\.youtubeUrl\}"[\s\S]*?Buka di YouTube<\/span>\s*<\/a>/;
  if (regex.test(content)) {
    content = content.replace(regex, '');
    fs.writeFileSync(appPath, content, 'utf8');
    console.log('Successfully removed using regex!');
  } else {
    console.error('Could not find Buka di YouTube element in app.js');
    process.exit(1);
  }
}
