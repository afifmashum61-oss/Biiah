const fs = require('fs');

const appPath = 'C:/Users/HP/Documents/media-pembelajaran-bahasa-arab/app.js';
let appCode = fs.readFileSync(appPath, 'utf8');

const target = `          \${isGuru ? \`
            <button id="add-vocab-modal-btn" class="px-4 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold shadow-md flex items-center gap-2">
              <i class="fa-solid fa-plus"></i>
              <span>Tambah Kosakata Baru</span>
            </button>
          \` : ''}`;

if (appCode.includes(target)) {
  appCode = appCode.replace(target, '');
  fs.writeFileSync(appPath, appCode, 'utf8');
  console.log('Successfully removed "+ Tambah Kosakata Baru" button!');
} else {
  // Regex fallback
  const reg = /\$\{isGuru \? `\s*<button id="add-vocab-modal-btn"[\s\S]*?Tambah Kosakata Baru<\/span>\s*<\/button>\s*` : ''\}/;
  if (reg.test(appCode)) {
    appCode = appCode.replace(reg, '');
    fs.writeFileSync(appPath, appCode, 'utf8');
    console.log('Successfully removed via regex!');
  } else {
    console.error('Could not find add-vocab-modal-btn element in app.js');
    process.exit(1);
  }
}
