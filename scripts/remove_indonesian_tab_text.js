const fs = require('fs');

// 1. Update app.js
const appPath = 'C:/Users/HP/Documents/media-pembelajaran-bahasa-arab/app.js';
let appCode = fs.readFileSync(appPath, 'utf8');

appCode = appCode.replace('<span>١. الاستماع والتكرار (Dengar & Tirukan)</span>', '<span>١. الاستماع والتكرار</span>');
appCode = appCode.replace('<span>٢. الاستماع والإجابة (Kuis Menyimak)</span>', '<span>٢. الاستماع والإجابة</span>');
appCode = appCode.replace('<span>٣. الاستماع والربط (Cocokkan Gambar)</span>', '<span>٣. الاستماع والربط</span>');

fs.writeFileSync(appPath, appCode, 'utf8');
console.log('Successfully updated app.js tab buttons!');

// 2. Update data.js
const dataPath = 'C:/Users/HP/Documents/media-pembelajaran-bahasa-arab/data.js';
let dataCode = fs.readFileSync(dataPath, 'utf8');

dataCode = dataCode.replace('title: "الاسْتِمَاعُ وَالتَّكْرَارُ (Menyimak & Menirukan)",', 'title: "الاسْتِمَاعُ وَالتَّكْرَارُ",');
dataCode = dataCode.replace('title: "الاسْتِمَاعُ وَالإِجَابَةُ (Kuis Menyimak Audio)",', 'title: "الاسْتِمَاعُ وَالإِجَابَةُ",');
dataCode = dataCode.replace('title: "الاسْتِمَاعُ وَالرَّبْطُ (Cocokkan Audio dengan Gambar)",', 'title: "الاسْتِمَاعُ وَالرَّبْطُ",');

fs.writeFileSync(dataPath, dataCode, 'utf8');
console.log('Successfully updated data.js section titles!');
