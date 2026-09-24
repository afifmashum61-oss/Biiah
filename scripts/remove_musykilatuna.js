const fs = require('fs');

// 1. Update index.html
const indexPath = 'C:/Users/HP/Documents/media-pembelajaran-bahasa-arab/index.html';
let indexContent = fs.readFileSync(indexPath, 'utf8');

const targetHeader = `        <div>
          <div class="font-bold text-xl text-emerald-950 flex items-center gap-2 font-arabic">
            <span>مشكلتنا</span>
            <span class="text-xs font-sans bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-md font-semibold">Kelas 9</span>
          </div>
          <p class="text-xs text-emerald-600 font-arabic font-bold">الحفاظ على البيئة</p>
        </div>`;

const newHeader = `        <div>
          <h1 class="font-bold text-xl sm:text-2xl text-emerald-950 font-arabic">الحفاظ على البيئة</h1>
        </div>`;

if (indexContent.includes(targetHeader)) {
  indexContent = indexContent.replace(targetHeader, newHeader);
  console.log('Successfully updated brand header in index.html');
} else {
  // Try regex
  const reg = /<div>\s*<div class="font-bold text-xl text-emerald-950 flex items-center gap-2 font-arabic">\s*<span>مشكلتنا<\/span>\s*<span[^>]*>Kelas 9<\/span>\s*<\/div>\s*<p[^>]*>الحفاظ على البيئة<\/p>\s*<\/div>/;
  if (reg.test(indexContent)) {
    indexContent = indexContent.replace(reg, newHeader);
    console.log('Successfully updated brand header via regex in index.html');
  } else {
    console.error('Could not find target brand header in index.html');
  }
}

// Also update drawer header in index.html
indexContent = indexContent.replace('مشكلتنا: الحفاظ على البيئة', 'الحفاظ على البيئة');
fs.writeFileSync(indexPath, indexContent, 'utf8');

// 2. Update app.js
const appPath = 'C:/Users/HP/Documents/media-pembelajaran-bahasa-arab/app.js';
let appContent = fs.readFileSync(appPath, 'utf8');

appContent = appContent.replace('مشكلتنا: الحفاظ على البيئة', 'الحفاظ على البيئة');
appContent = appContent.replace('الوحدة الرابعة: مشكلتنا (الحفاظ على البيئة)', 'الوحدة الرابعة: الحفاظ على البيئة');
appContent = appContent.replace('>مشكلتنا<', '>الحفاظ على البيئة<');

fs.writeFileSync(appPath, appContent, 'utf8');
console.log('Successfully updated index.html and app.js!');
