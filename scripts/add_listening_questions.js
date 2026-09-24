const fs = require('fs');
const path = require('path');

const dataPath = 'C:/Users/HP/Documents/media-pembelajaran-bahasa-arab/data.js';
let content = fs.readFileSync(dataPath, 'utf8');

const tenQuestions = `        questions: [
          {
            id: 1,
            audioText: "أَمَرَ الإِسْلاَمُ بِالْحِفَاظِ عَلَى الْبِيئَةِ وَنَهَى عَنْ إِفْسَادِهَا.",
            question: "Dengarkan audio di atas! Apa yang diperintahkan oleh Islam?",
            options: [
              "الْحِفَاظُ عَلَى الْبِيئَةِ (Menjaga Lingkungan)",
              "إِحْرَاقُ الْغَابَاتِ (Membakar Hutan)",
              "رَمْيُ النُّفَايَاتِ (Membuang Sampah)",
              "قَطْعُ الأَشْجَارِ (Menebang Pohon)"
            ],
            answer: 0,
            explanation: "Sesuai audio yang didengar: «أَمَرَ الإِسْلاَمُ بِالْحِفَاظِ عَلَى الْبِيئَةِ»."
          },
          {
            id: 2,
            audioText: "يَقُومُ الطُّلاَّبُ بِغَرْسِ الأَشْجَارِ فِي حَدِيقَةِ الْمَدْرَسَةِ كُلَّ يَوْمِ الْجُمُعَةِ.",
            question: "Di manakah para siswa menanam pohon sesuai audio?",
            options: [
              "فِي الشَّارِعِ (Di Jalan)",
              "فِي حَدِيقَةِ الْمَدْرَسَةِ (Di Taman Sekolah)",
              "فِي الْبَحْرِ (Di Laut)",
              "فِي الْمَصْنَعِ (Di Pabrik)"
            ],
            answer: 1,
            explanation: "Audio menyebutkan: «فِي حَدِيقَةِ الْمَدْرَسَةِ» (di taman sekolah)."
          },
          {
            id: 3,
            audioText: "التَّلَوُّثُ يُنْقَسِمُ إِلَى ثَلاَثَةِ أَقْسَامٍ: تَلَوُّثُ الْمَاءِ، وَالْهَوَاءِ، وَالتُّرْبَةِ.",
            question: "Berapa jumlah jenis pencemaran lingkungan yang disebutkan dalam audio?",
            options: [
              "قِسْمَانِ (2 Jenis)",
              "ثَلاَثَةُ أَقْسَامٍ (3 Jenis)",
              "أَرْبَعَةُ أَقْسَامٍ (4 Jenis)",
              "خَمْسَةُ أَقْسَامٍ (5 Jenis)"
            ],
            answer: 1,
            explanation: "Audio menyebutkan: 3 jenis polusi (Air, Udara, dan Tanah)."
          },
          {
            id: 4,
            audioText: "احْرِصْ عَلَى النَّظَافَةِ وَلاَ تُسْرِفْ فِي اسْتِهْلاَكِ الْمَاءِ!",
            question: "Apa pesan utama kalimat perintah dan larangan dalam audio?",
            options: [
              "Jagalah kebersihan dan jangan boros air!",
              "Buanglah sampah di sungai!",
              "Tebanglah pepohonan!",
              "Bikinlah asap pabrik!"
            ],
            answer: 0,
            explanation: "Sesuai audio: «احْرِصْ عَلَى النَّظَافَةِ وَلاَ تُسْرِفْ فِي اسْتِهْلاَكِ الْمَاءِ»."
          },
          {
            id: 5,
            audioText: "إِعَادَةُ تَدْوِيرِ النُّفَايَاتِ تُسَاعِدُ فِي تَقْلِيلِ التَّلَوُّثِ الْبِيئِيِّ.",
            question: "Apa manfaat dari daur ulang sampah (إِعَادَةُ تَدْوِيرِ النُّفَايَاتِ) berdasarkan audio?",
            options: [
              "زِيَادَةُ الأَوْسَاخِ (Menambah Kotoran)",
              "تَقْلِيلُ التَّلَوُّثِ الْبِيئِيِّ (Mengurangi Pencemaran)",
              "تَلْوِيثُ مِيَاهِ النَّهْرِ (Mencemari Air Sungai)",
              "إِتْلاَفُ التُّرْبَةِ (Merusak Tanah)"
            ],
            answer: 1,
            explanation: "Berdasarkan audio: «إِعَادَةُ تَدْوِيرِ النُّفَايَاتِ تُسَاعِدُ فِي تَقْلِيلِ التَّلَوُّثِ الْبِيئِيِّ»."
          },
          {
            id: 6,
            audioText: "يَظْهَرُ تَلَوُّثُ الْهَوَاءِ بِسَبَبِ دُخَانِ الْمَصَانِعِ وَالسَّيَّارَاتِ.",
            question: "Apa penyebab terjadinya pencemaran udara menurut audio yang didengar?",
            options: [
              "دُخَانُ الْمَصَانِعِ وَالسَّيَّارَاتِ (Asap Pabrik & Mobil)",
              "غَرْسُ الأَشْجَارِ (Penanaman Pohon)",
              "تَنْظِيفُ الْحَدِيقَةِ (Membersihkan Taman)",
              "تَسَاقُطُ الأَمْطَارِ (Turunnya Hujan)"
            ],
            answer: 0,
            explanation: "Berdasarkan audio: «بِسَبَبِ دُخَانِ الْمَصَانِعِ وَالسَّيَّارَاتِ» (akibat asap pabrik dan kendaraan bermotor)."
          },
          {
            id: 7,
            audioText: "يَجِبُ عَلَيْنَا أَنْ نُلْقِيَ الْقُمَامَةَ فِي سَلَّةِ الْمُهْمَلاَتِ.",
            question: "Di manakah kita seharusnya membuang sampah menurut rekaman audio?",
            options: [
              "فِي مِيَاهِ النَّهْرِ (Di Air Sungai)",
              "فِي وَسَطِ الشَّارِعِ (Di Tengah Jalan)",
              "فِي سَلَّةِ الْمُهْمَلاَتِ (Di Tempat Sampah)",
              "فِي مَلْعَبِ الْكُرَةِ (Di Lapangan Bola)"
            ],
            answer: 2,
            explanation: "Audio menyatakan kewajiban membuang sampah: «فِي سَلَّةِ الْمُهْمَلاَتِ» (di tempat sampah)."
          },
          {
            id: 8,
            audioText: "لِلشَّبَابِ مَسْؤُولِيَّةٌ كَبِيرَةٌ فِي حِمَايَةِ الْبِيئَةِ الطَّبِيعِيَّةِ.",
            question: "Siapakah yang memiliki tanggung jawab besar dalam menjaga lingkungan hidup?",
            options: [
              "الأَطْفَالُ الصِّغَارُ فَقَطْ (Anak-anak Kecil Saja)",
              "الشَّبَابُ (Para Pemuda / Generasi Muda)",
              "التُّجَّارُ وَأَصْحَابُ الْمَالِ (Para Pedagang)",
              "السُّيَّاحُ الأَجَانِبُ (Wisatawan Asing)"
            ],
            answer: 1,
            explanation: "Sesuai rekaman suara: «لِلشَّبَابِ مَسْؤُولِيَّةٌ كَبِيرَةٌ فِي حِمَايَةِ الْبِيئَةِ» (Pemuda memiliki tanggung jawab besar)."
          },
          {
            id: 9,
            audioText: "يَا أَخِي، لاَ تُحْرِقِ الْغَابَةَ؛ لِأَنَّهَا تُسَبِّبُ مَوْتَ الْحَيَوَانَاتِ!",
            question: "Mengapa kita dilarang membakar hutan menurut alasan di dalam audio?",
            options: [
              "لِأَنَّهَا تُسَبِّبُ مَوْتَ الْحَيَوَانَاتِ (Menyebabkan Kematian Hewan)",
              "لِأَنَّهَا تُوَفِّرُ الْهَوَاءَ النَّقِيَّ (Menyediakan Udara Segar)",
              "لِأَنَّهَا تُسَاعِدُ عَلَى الزِّرَاعَةِ (Membantu Pertanian)",
              "لِأَنَّهَا تَزِيدُ مِنَ الأَمْطَارِ (Menambah Curah Hujan)"
            ],
            answer: 0,
            explanation: "Audio menyebutkan larangan: «لاَ تُحْرِقِ الْغَابَةَ؛ لِأَنَّهَا تُسَبِّبُ مَوْتَ الْحَيَوَانَاتِ»."
          },
          {
            id: 10,
            audioText: "تَرْشِيدُ اسْتِهْلاَكِ الْمَاءِ يَحْفَظُ حَيَاةَ الأَجْيَالِ الْقَادِمَةِ.",
            question: "Apa tujuan penting dari penghematan air (تَرْشِيدُ اسْتِهْلاَكِ الْمَاءِ) berdasarkan audio?",
            options: [
              "تَجْفِيفُ مِيَاهِ الآبَارِ (Mengeringkan Sumur)",
              "حِفْظُ حَيَاةِ الأَجْيَالِ الْقَادِمَةِ (Menjaga Masa Depan Generasi Mendatang)",
              "زِيَادَةُ كُلْفَةِ الْمَعِيشَةِ (Menaikkan Biaya Hidup)",
              "تَعْطِيلُ مَحَطَّاتِ الْمِيَاهِ (Menghentikan Distribusi Air)"
            ],
            answer: 1,
            explanation: "Sesuai audio: «تَرْشِيدُ اسْتِهْلاَكِ الْمَاءِ يَحْفَظُ حَيَاةَ الأَجْيَالِ الْقَادِمَةِ» (Menjaga masa depan generasi mendatang)."
          }
        ]`;

const pattern = /questions:\s*\[[\s\S]*?id:\s*4[\s\S]*?explanation:[\s\S]*?\}\s*\]/;

if (pattern.test(content)) {
  content = content.replace(pattern, tenQuestions);
  fs.writeFileSync(dataPath, content, 'utf8');
  console.log('Successfully updated listening questions to 10 in data.js!');
} else {
  console.error('Could not find existing questions pattern in data.js');
  process.exit(1);
}
