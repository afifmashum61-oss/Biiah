const fs = require('fs');
const path = require('path');

const quiz = [];
let idCounter = 1;

// ==========================================
// BAB 1: السَّفَرُ وَالسِّيَاحَةُ (Wisata & Bepergian)
// ==========================================

// --- BAB 1 - MODEL 1: Mufrodat & Qira'ah / Hiwar (20 Soal: Q1-Q20) ---
const b1m1 = [
  {
    q: "مَا مَعْنَى كَلِمَة (سِيَاحَةٌ) فِي اللُّغَةِ الإِنْدُونِيسِيَّةِ؟",
    opts: ["Wisata / Pariwisata", "Perdagangan", "Pertanian", "Pendidikan"],
    ans: 0,
    exp: "سِيَاحَةٌ artinya Wisata atau Pariwisata."
  },
  {
    q: "مَا مَعْنَى كَلِمَة (غَارٌ) فِي بَابِ السَّفَرِ وَالسِّيَاحَةِ؟",
    opts: ["Sungai", "Gua / Goa", "Gunung", "Hutan"],
    ans: 1,
    exp: "غَارٌ artinya Gua atau Goa."
  },
  {
    q: "مَا مَعْنَى كَلِمَة (نَهْرٌ)؟",
    opts: ["Laut", "Danau", "Sungai", "Air Terjun"],
    ans: 2,
    exp: "نَهْرٌ artinya Sungai."
  },
  {
    q: "مَا مَعْنَى (تَزَحْلُفٌ) فِي نَشَاطِ السِّيَاحَةِ النَّهْرِيَّةِ؟",
    opts: ["Susur Sungai / Arung Jeram (Tubing)", "Mendaki Gunung", "Berenang di Kolam", "Bersepeda"],
    ans: 0,
    exp: "تَزَحْلُفٌ dalam wisata sungai artinya Susur Sungai / Tubing."
  },
  {
    q: "مَا مَعْنَى كَلِمَة (إِطَارَاتٌ) فِي التَّزَحْلُفِ النَّهْرِيِّ؟",
    opts: ["Tali Pengaman", "Ban Pelampung", "Dayung Kayu", "Kacamata Renang"],
    ans: 1,
    exp: "إِطَارَاتٌ artinya Ban Pelampung."
  },
  {
    q: "مَا مَعْنَى كَلِمَة (عَوَّامَةٌ) لِلسَّلاَمَةِ فِي الْمَاءِ؟",
    opts: ["Jaket Pelampung / Pelampung", "Perahu Karet", "Sepatu Boot", "Topي Pelindung"],
    ans: 0,
    exp: "عَوَّامَةٌ artinya Jaket Pelampung."
  },
  {
    q: "مَا مَعْنَى فِرَاسَة (مُرْشِدُ السِّيَاحَةِ)؟",
    opts: ["Pengemudi Bus", "Pemandu Wisata (Tour Guide)", "Penjual Tiket", "Pemilik Penginapan"],
    ans: 1,
    exp: "مُرْشِدُ السِّيَاحَةِ artinya Pemandu Wisata."
  },
  {
    q: "مَا مَعْنَى (جَوَازُ السَّفَرِ) عِنْدَ السَّفَرِ إِلَى الْخَارِجِ؟",
    opts: ["KTP", "Paspor Perjalanan", "Tiket Pesawat", "SIM"],
    ans: 1,
    exp: "جَوَازُ السَّفَرِ artinya Paspor Perjalanan."
  },
  {
    q: "مَا مَعْنَى (تَذْكِرَةُ السَّفَرِ)؟",
    opts: ["Tiket Perjalanan", "Kartu Kredit", "Surat Izin", "Peta Lokasi"],
    ans: 0,
    exp: "تَذْكِرَةُ السَّفَرِ artinya Tiket Perjalanan."
  },
  {
    q: "مَا مَعْنَى (شَاطِئُ الْبَحْرِ)؟",
    opts: ["Tengah Laut", "Pantai Laut", "Dermaga", "Muara Sungai"],
    ans: 1,
    exp: "شَاطِئُ الْبَحْرِ artinya Pantai Laut."
  },
  {
    q: "أَيْنَ ذَهَبَ فَاخِرٌ وَأُسْرَتُهُ فِي الْعُطْلَةِ الْمَاضِيَةِ كَمَا فِي الْقِرَاءَةِ؟",
    opts: ["إِلَى غَارِ فِيْنْدُوْل فِي يُوكْيَاكَرْتَا", "إِلَى شَاطِئِ لُوسَارِي", "إِلَى جَاكَرْتَا", "إِلَى بَالِي"],
    ans: 0,
    exp: "Sesuai Qira'ah 1 Bab 1: Fakhir dan keluarga pergi ke Gua Pindul Yogyakarta."
  },
  {
    q: "كَمْ سِعْرُ تَذْكِرَةِ الدُّخُولِ فِي غَارِ فِيْنْدُوْل لِكُلِّ فَرْدٍ؟",
    opts: ["خَمْسُونَ أَلْفَ رُوبِيَّةٍ (50.000)", "عِشْرُونَ أَلْفَ رُوبِيَّةٍ (20.000)", "مِائَةُ أَلْفَ رُوبِيَّةٍ (100.000)", "مَجَّانًا"],
    ans: 0,
    exp: "Sesuai Qira'ah 1: Tiket masuk seharga Rp 50.000 per orang."
  },
  {
    q: "أَيْنَ يَقَعُ شَاطِئُ لُوسَارِي (Losari) الْجَمِيلُ؟",
    opts: ["فِي يُوكْيَاكَرْتَا", "فِي مَكَّاسَار (Makassar)", "فِي جُومْبَانْج", "فِي بَالِي"],
    ans: 1,
    exp: "Sesuai Qira'ah 2 Bab 1: Pantai Losari terletak di kota Makassar."
  },
  {
    q: "أَيْنَ قَضَى نَبِيلٌ أَيَّامَ الْعُطْلَةِ الْمَاضِيَةِ فِي الْحِوَارِ؟",
    opts: ["فِي بَيْتِ جَدِّهِ فِي سُوكُوهَارْجُو", "فِي غَارِ فِيْنْدُوْل", "فِي الْمَدْرَسَةِ", "فِي الْقَاهِرَةِ"],
    ans: 0,
    exp: "Sesuai Hiwar 1 Bab 1: Nabil menghabiskan liburan di rumah kakeknya di Sukoharjo."
  },
  {
    q: "مَا مَعْنَى (حَافِلَةٌ سِيَاحِيَّةٌ)؟",
    opts: ["Sepeda Motor", "Bus Pariwisata", "Kapal Laut", "Kereta Cepat"],
    ans: 1,
    exp: "حَافِلَةٌ سِيَاحِيَّةٌ artinya Bus Pariwisata."
  },
  {
    q: "مَا هُوَ (الْمَطَارُ) فِي وِسَائِلِ النَّقْلِ؟",
    opts: ["Stasiun Kereta", "Bandara Udara", "Pelabuhan Laut", "Terminal Bus"],
    ans: 1,
    exp: "الْمَطَارُ artinya Bandara / Bandar Udara."
  },
  {
    q: "مَا هُوَ (الْمِينَاكُ / الْمِينَاءُ)؟",
    opts: ["Pelabuhan Laut", "Stasiun", "Bandara", "Halte"],
    ans: 0,
    exp: "الْمِينَاءُ artinya Pelabuhan Laut."
  },
  {
    q: "مَا هُوَ (الْفُنْدُقُ) لِلسُّيَّاحِ؟",
    opts: ["Restoran", "Hotel / Penginapan", "Museum", "Taman"],
    ans: 1,
    exp: "الْفُنْدُقُ artinya Hotel / Penginapan."
  },
  {
    q: "مَا مَعْنَى (مَحَطَّةُ الْقِطَارِ)؟",
    opts: ["Stasiun Kereta Api", "Bandara Udara", "Pelabuhan", "Terminal Bus"],
    ans: 0,
    exp: "مَحَطَّةُ الْقِطَارِ artinya Stasiun Kereta Api."
  },
  {
    q: "مَا مَعْنَى كَلِمَة (وَكِيلُ السَّفَرِ)؟",
    opts: ["Agen Perjalanan (Travel Agent)", "Supir Taksi", "Resepsionis", "Pilot"],
    ans: 0,
    exp: "وَكِيلُ السَّفَرِ artinya Agen Perjalanan."
  }
];

b1m1.forEach(item => {
  quiz.push({
    id: idCounter++,
    babId: "topik1",
    modelId: "model1",
    question: item.q,
    options: item.opts,
    correct: item.ans,
    explanation: item.exp
  });
});

// --- BAB 1 - MODEL 2: Qawa'id - Taṣrīf Lugawī Fi'il Māḍy (20 Soal: Q21-Q40) ---
const b1m2 = [
  {
    q: "مَا صِيغَةُ الْفِعْلِ الْمَاضِي لِلضَّمِيرِ (أَنَا) مِنْ فِعْلِ (ذَهَبَ)؟",
    opts: ["ذَهَبْتُ", "ذَهَبْنَا", "ذَهَبَتْ", "ذَهَبُوا"],
    ans: 0,
    exp: "Taṣrīf Fi'il Māḍy damir أَنَا bersambung dengan Tu (تُ) di akhir: ذَهَبْتُ."
  },
  {
    q: "مَا صِيغَةُ الْفِعْلِ الْمَاضِي لِلضَّمِيرِ (نَحْنُ) مِنْ فِعْلِ (كَتَبَ)؟",
    opts: ["كَتَبْتُ", "كَتَبْنَا", "كَتَبُوا", "كَتَبَتْ"],
    ans: 1,
    exp: "Taṣrīf Fi'il Māḍy damir نَحْنُ bersambung dengan Naa (نَا): كَتَبْنَا."
  },
  {
    q: "مَا صِيغَةُ الْفِعْلِ الْمَاضِي لِلضَّمِيرِ (أَنْتَ) مِنْ فِعْلِ (قَرَأَ)؟",
    opts: ["قَرَأْتَ", "قَرَأْتِ", "قَرَأْتُ", "قَرَأُوا"],
    ans: 0,
    exp: "Taṣrīf Fi'il Māḍy damir أَنْتَ bersambung dengan Ta (تَ): قَرَأْتَ."
  },
  {
    q: "مَا صِيغَةُ الْفِعْلِ الْمَاضِي لِلضَّمِيرِ (أَنْتِ) مِنْ فِعْلِ (رَكِبَ)؟",
    opts: ["رَكِبْتَ", "رَكِبْتِ", "رَكِبْتُ", "رَكِبْنَ"],
    ans: 1,
    exp: "Taṣrīf Fi'il Māḍy damir أَنْتِ bersambung dengan Ti (تِ): رَكِبْتِ."
  },
  {
    q: "مَا صِيغَةُ الْفِعْلِ الْمَاضِي لِلضَّمِيرِ (هُمْ) مِنْ فِعْلِ (سَافَرَ)؟",
    opts: ["سَافَرَتْ", "سَافَرُوا", "سَافَرْنَ", "سَافَرْتُمْ"],
    ans: 1,
    exp: "Taṣrīf Fi'il Māḍy damir هُمْ bersambung dengan Wawu Sukun & Alif (وا): سَافَرُوا."
  },
  {
    q: "مَا صِيغَةُ الْفِعْلِ الْمَاضِي لِلضَّمِيرِ (هُنَّ) مِنْ فِعْلِ (وَصَلَ)؟",
    opts: ["وَصَلُوا", "وَصَلْنَ", "وَصَلَتْ", "وَصَلْتُنَّ"],
    ans: 1,
    exp: "Taṣrīf Fi'il Māḍy damir هُنَّ bersambung dengan Nun Niswah (نَ): وَصَلْنَ."
  },
  {
    q: "مَا صِيغَةُ الْفِعْلِ الْمَاضِي لِلضَّمِيرِ (هِيَ) مِنْ فِعْلِ (زَارَ)؟",
    opts: ["زَارَتْ", "زَارُوا", "زُرْتُ", "زُرْنَا"],
    ans: 0,
    exp: "Taṣrīf Fi'il Māḍy damir هِيَ bersambung dengan Ta' Ta'nith Sukun (تْ): زَارَتْ."
  },
  {
    q: "مَا صِيغَةُ الْفِعْلِ الْمَاضِي لِلضَّمِيرِ (أَنْتُمْ) مِنْ فِعْلِ (شَاهَدَ)؟",
    opts: ["شَاهَدْتُمْ", "شَاهَدْتُنَّ", "شَاهَدُوا", "شَاهَدْنَا"],
    ans: 0,
    exp: "Taṣrīf Fi'il Māḍy damir أَنْتُمْ bersambung dengan Tum (تُمْ): شَاهَدْتُمْ."
  },
  {
    q: "مَا صِيغَةُ الْفِعْلِ الْمَاضِي لِلضَّمِيرِ (أَنْتُنَّ) مِنْ فِعْلِ (رَجَعَ)؟",
    opts: ["رَجَعْتُنَّ", "رَجَعْتُمْ", "رَجَعْنَ", "رَجَعْتِ"],
    ans: 0,
    exp: "Taṣrīf Fi'il Māḍy damir أَنْتُنَّ bersambung dengan Tunna (تُنَّ): رَجَعْتُنَّ."
  },
  {
    q: "مَا صِيغَةُ الْفِعْلِ الْمَاضِي لِلضَّمِيرِ (أَنْتُمَا) مِنْ فِعْلِ (نَزَلَ)؟",
    opts: ["نَزَلْتُمَا", "نَزَلاَ", "نَزَلْتُمْ", "نَزَلْتُنَّ"],
    ans: 0,
    exp: "Taṣrīf Fi'il Māḍy damir أَنْتُمَا bersambung dengan Tumaa (تُمَا): نَزَلْتُمَا."
  },
  {
    q: "مَا صِيغَةُ الْفِعْلِ الْمَاضِي لِلضَّمِيرِ (هُمَا مُذَكَّر) مِنْ فِعْلِ (دَخَلَ)؟",
    opts: ["دَخَلاَ", "دَخَلَتَا", "دَخَلُوا", "دَخَلْنَ"],
    ans: 0,
    exp: "Taṣrīf Fi'il Māḍy damir هُمَا (mudzakkar) bersambung Alif Tathniyah: دَخَلاَ."
  },
  {
    q: "مَا صِيغَةُ الْفِعْلِ الْمَاضِي لِلضَّمِيرِ (هُمَا مُؤَنَّث) مِنْ فِعْلِ (خَرَجَ)؟",
    opts: ["خَرَجَتَا", "خَرَجَا", "خَرَجْنَ", "خَرَجْتُمَا"],
    ans: 0,
    exp: "Taṣrīf Fi'il Māḍy damir هُمَا (mu'annath) bersambung Ta' & Alif (تَا): خَرَجَتَا."
  },
  {
    q: "الْفِعْلُ الْمَاضِي كَلِمَةٌ تَدُلُّ عَلَى حَدَثٍ وَقَعَ فِي الزَّمَنِ...",
    opts: ["الْمَاضِي", "الْحَاضِرِ", "الْمُسْتَقْبَلِ", "الأَمْرِ"],
    ans: 0,
    exp: "Fi'il Madhy menunjukkan perbuatan yang telah lampau."
  },
  {
    q: "عَلاَمَةُ الْفِعْلِ الْمَاضِي لِلضَّمِيرِ (أَنَا) هِيَ زِيَادَةُ ... فِي آخِرِهِ.",
    opts: ["تُ (الـتَّاءُ الْمَضْمُومَةُ)", "تَ (الـتَّاءُ الْمَفْتُوحَةُ)", "تِ (الـتَّاءُ الْمَكْسُورَةُ)", "نَا"],
    ans: 0,
    exp: "Akhiran damir أَنَا pada Fi'il Madhy adalah huruf Taa' Ber-Dhammah (-تُ)."
  },
  {
    q: "عَلاَمَةُ الْفِعْلِ الْمَاضِي لِلضَّمِيرِ (أَنْتَ) هِيَ زِيَادَةُ ... فِي آخِرِهِ.",
    opts: ["تَ (الـتَّاءُ الْمَفْتُوحَةُ)", "تُ", "تِ", "تُمْ"],
    ans: 0,
    exp: "Akhiran damir أَنْتَ pada Fi'il Madhy adalah huruf Taa' Ber-Fathah (-تَ)."
  },
  {
    q: "عَلاَمَةُ الْفِعْلِ الْمَاضِي لِلضَّمِيرِ (أَنْتِ) هِيَ زِيَادَةُ ... فِي آخِرِهِ.",
    opts: ["تِ (الـتَّاءُ الْمَكْسُورَةُ)", "تَ", "تُ", "تُنَّ"],
    ans: 0,
    exp: "Akhiran damir أَنْتِ pada Fi'il Madhy adalah huruf Taa' Ber-Kasrah (-تِ)."
  },
  {
    q: "تَحْوِيلُ (سَافَرَ الطَّالِبُ) إِلَى الْجَمْعِ (الطُّلاَّبُ):",
    opts: ["سَافَرَ الطُّلاَّبُ / الطُّلاَّبُ سَافَرُوا", "سَافَرْنَ الطُّلاَّبُ", "سَافَرْتُمْ الطُّلاَّبُ", "سَافَرَتْ الطُّلاَّبُ"],
    ans: 0,
    exp: "Jika fi'il mendahului fa'il mufrad/jama', fi'il tetap mufrad (سَافَرَ الطُّلاَّبُ), jika fa'il di depan maka (الطُّلاَّبُ سَافَرُوا)."
  },
  {
    q: "مَا الضَّمِيرُ الْمُنَاسِبُ لِلْفِعْلِ الْمَاضِي (قَضَيْنَا)؟",
    opts: ["نَحْنُ", "أَنَا", "هُمْ", "أَنْتُمْ"],
    ans: 0,
    exp: "قَضَيْنَا bertanda -نَا maka damirnya adalah نَحْنُ."
  },
  {
    q: "مَا الضَّمِيرُ الْمُنَاسِبُ لِلْفِعْلِ الْمَاضِي (لَعِبْنَ)؟",
    opts: ["هُنَّ", "هُمْ", "أَنْتُنَّ", "هُمَا"],
    ans: 0,
    exp: "لَعِبْنَ bertanda Nun Niswah (-نَ) maka damirnya adalah هُنَّ."
  },
  {
    q: "مَا الضَّمِيرُ الْمُنَاسِبُ لِلْفِعْلِ الْمَاضِي (سَمِعْتُمْ)؟",
    opts: ["أَنْتُمْ", "هُمْ", "أَنْتُنَّ", "نَحْنُ"],
    ans: 0,
    exp: "سَمِعْتُمْ bertanda -تُمْ maka damirnya adalah أَنْتُمْ."
  }
];

b1m2.forEach(item => {
  quiz.push({
    id: idCounter++,
    babId: "topik1",
    modelId: "model2",
    question: item.q,
    options: item.opts,
    correct: item.ans,
    explanation: item.exp
  });
});

// ==========================================
// BAB 2: الصِّحَّةُ (Kesehatan & Olahraga)
// ==========================================

// --- BAB 2 - MODEL 1: Mufrodat & Qira'ah / Hiwar (20 Soal: Q41-Q60) ---
const b2m1 = [
  {
    q: "أَكْمِلْ الْجُمْلَةَ: (أَشْتَرِي الدَّوَاءَ مِنَ ... )",
    opts: ["الْمَطَارِ", "السُّوقِ", "الصَّيْدَلِيَّةِ", "الْمَدْرَسَةِ"],
    ans: 2,
    exp: "Obat dibeli di Apotek (الصَّيْدَلِيَّةِ)."
  },
  {
    q: "يَفْحَصُ الْمَرِيضَ فِي الْمُسْتَشْفَى ...",
    opts: ["الْمُهَنْدِسُ", "الطَّبِيبُ", "الفَلاَّحُ", "الْمُعَلِّمُ"],
    ans: 1,
    exp: "Dokter (الطَّبِيبُ) memeriksa pasien di rumah sakit."
  },
  {
    q: "مَا مَعْنَى كَلِمَة (صُدَاعٌ) فِي اللُّغَةِ الإِنْدُونِيسِيَّةِ؟",
    opts: ["Sakit Gigi", "Sakit Kepala / Pusing", "Sakit Perut", "Batuk"],
    ans: 1,
    exp: "صُدَاعٌ artinya Sakit Kepala."
  },
  {
    q: "مَا مَعْنَى كَلِمَة (حُمَّى) فِي الأَمْرَاضِ؟",
    opts: ["Flu / Pilek", "Demam / Panas Tinggi", "Sesak Napas", "Diare"],
    ans: 1,
    exp: "حُمَّى artinya Demam / Panas Tinggi."
  },
  {
    q: "تُسَاعِدُ الطَّبِيبَ فِي الْعِيَادَةِ وَالْمُسْتَشْفَى ...",
    opts: ["الْمُمَرِّضَةُ", "الْمُدَرِّسَةُ", "الْمُوَظَّفَةُ", "الخَادِمَةُ"],
    ans: 0,
    exp: "Perawat perempuan (الْمُمَرِّضَةُ) membantu dokter."
  },
  {
    q: "مَاذَا قَالَ الْحُكَمَاءُ عَنِ الصِّحَّةِ فِي قِرَاءَةِ بَابِ 2؟",
    opts: [
      "الصِّحَّةُ تَاجٌ عَلَى رُؤُوسِ الأَصِحَّاءِ لاَ يَعْرِفُهُ إِلاَّ الْمَرْضَى",
      "الصِّحَّةُ لاَ تَفِيدُ شَيْئًا",
      "الْمَالُ أَهَمُّ مِنَ الصِّحَّةِ",
      "الصِّحَّةُ لِلأَطْفَالِ فَقَطْ"
    ],
    ans: 0,
    exp: "Kesehatan adalah mahkota di atas kepala orang sehat yang hanya diketahui oleh orang sakit."
  },
  {
    q: "مَاذَا يَفْعَلُ نَبِيلٌ وَنَوْفَلٌ كُلَّ صَبَاحٍ لِلْحِفَاظِ عَلَى الصِّحَّةِ؟",
    opts: ["يَنَامَانِ طَوِيلاً", "يَجْرِيَانِ كُلَّ صَبَاحٍ (الرَّكْضُ)", "يَأْكُلاَنِ الْحَلْوَى", "يَشْرَبَانِ الْقَهْوَةَ"],
    ans: 1,
    exp: "Sesuai Hiwar Bab 2: Nabil dan Naufal berlari pagi (الرَّكْضُ / JOGGING) untuk menjaga kesehatan."
  },
  {
    q: "مَنْ زَارَتْ رِيتَا فِي الْمُسْتَشْفَى عِنْدَمَا كَانَتْ مَرِيضَةً؟",
    opts: ["صَدِيقَاتُهَا", "مُعَلِّمُهَا", "جَارُهَا", "لاَ أَحَدَ"],
    ans: 0,
    exp: "Teman-temannya (صَدِيقَاتُهَا) menjenguk Rita di rumah sakit."
  },
  {
    q: "بِمَ يَشْعُرُ الْمَرِيضُ فِي مَعِدَتِهِ عِنْدَمَا يَذْهَبُ إِلَى الطَّبِيبِ؟",
    opts: ["يَشْعُرُ بِالْفَرَحِ", "يَشْعُرُ بِأَلَمٍ شَدِيدٍ", "يَشْعُرُ بِالْجُوعِ", "لاَ يَشْعُرُ بِشَيْءٍ"],
    ans: 1,
    exp: "Pasien merasa sakit perut hebat (أَلَمٌ شَدِيدٌ)."
  },
  {
    q: "مَاذَا يُعْطِي الطَّبِيبُ لِلْمَرِيضِ لِشِرَاءِ الدَّوَاءِ مِنَ الصَّيْدَلِيَّةِ؟",
    opts: ["وَصْفَةَ الطَّبِيبِ", "تَذْكِرَةَ السَّفَرِ", "بِطَاقَةَ الدُّخُولِ", "الْكِتَابَ"],
    ans: 0,
    exp: "Dokter memberikan resep obat (وَصْفَةُ الطَّبِيبِ)."
  },
  {
    q: "مَا مَعْنَى كَلِمَة (السُّكَّرِيُّ) فِي الأَمْرَاضِ؟",
    opts: ["Penyakit Jantung", "Penyakit Gula / Diabetes", "Penyakit Paru-paru", "Sakit Mata"],
    ans: 1,
    exp: "السُّكَّرِيُّ artinya Diabetes / Penyakit Gula."
  },
  {
    q: "مَا مَعْنَى كَلِمَة (الرِّيَاضَةُ) فِي حَيَاتِنَا؟",
    opts: ["Pelajaran Matematika", "Olahraga Olah Tubuh", "Seni Musik", "Membaca Buku"],
    ans: 1,
    exp: "الرِّيَاضَةُ artinya Olahraga."
  },
  {
    q: "مَا مَعْنَى كَلِمَة (وَجَبَةٌ غِذَائِيَّةٌ مُتَوَازِنَةٌ)؟",
    opts: ["Makanan Ringan", "Menu Makanan Bergizi Seimbang", "Makanan Cepat Saji", "Minuman Manis"],
    ans: 1,
    exp: "وَجَبَةٌ غِذَائِيَّةٌ مُتَوَازِنَةٌ artinya Menu Makanan Bergizi Seimbang."
  },
  {
    q: "أَيْنَ يَعْمَلُ الطَّبِيبُ وَالْمُمَرِّضَةُ لِعِلاَجِ الْمَرْضَى؟",
    opts: ["فِي الْمُسْتَشْفَى أَوِ الْعِيَادَةِ", "فِي الْمَطَارِ", "فِي الْمَحَطَّةِ", "فِي السُّوقِ"],
    ans: 0,
    exp: "Dokter dan perawat bekerja di Rumah Sakit (الْمُسْتَشْفَى) atau Klinik (الْعِيَادَةُ)."
  },
  {
    q: "مَا مَعْنَى (ضَغْطُ الدَّمِ) فِي الْفَحْصِ الطِّبِّيِّ؟",
    opts: ["Tekanan Darah", "Gula Darah", "Denyut Nadi", "Suhu Tubuh"],
    ans: 0,
    exp: "ضَغْطُ الدَّمِ artinya Tekanan Darah."
  },
  {
    q: "مَا مَعْنَى (كُرَةُ الْقَدَمِ) فِي الأَلْعَابِ الرِّيَاضِيَّةِ؟",
    opts: ["Bola Voli", "Sepak Bola", "Bola Basket", "Bulutangkis"],
    ans: 1,
    exp: "كُرَةُ الْقَدَمِ artinya Sepak Bola."
  },
  {
    q: "مَا مَعْنَى (الـسِّبَاحَةُ)؟",
    opts: ["Renang / Berenang", "Lari", "Bersepeda", "Senam"],
    ans: 0,
    exp: "السِّبَاحَةُ artinya Olahraga Berenang."
  },
  {
    q: "مَا مَعْنَى (سُعَالٌ) فِي الأَعْرَاضِ الطِّبِّيَّةِ؟",
    opts: ["Pilek", "Batuk", "Pusing", "Mual"],
    ans: 1,
    exp: "سُعَالٌ artinya Batuk."
  },
  {
    q: "مَا مَعْنَى (زُكَامٌ)؟",
    opts: ["Flu / Pilek / Flu", "Sakit Gigi", "Demam", "Luka"],
    ans: 0,
    exp: "زُكَامٌ artinya Flu atau Pilek."
  },
  {
    q: "مَا مَعْنَى (مِقْيَاسُ الْحَرَارَةِ)؟",
    opts: ["Stetoskop", "Termometer (Alat Pengukur Suhu)", "Tensi Darah", "Timbangan"],
    ans: 1,
    exp: "مِقْيَاسُ الْحَرَارَةِ artinya Termometer."
  }
];

b2m1.forEach(item => {
  quiz.push({
    id: idCounter++,
    babId: "topik2",
    modelId: "model1",
    question: item.q,
    options: item.opts,
    correct: item.ans,
    explanation: item.exp
  });
});

// --- BAB 2 - MODEL 2: Qawa'id - Taṣrīf Lugawī Fi'il Muḍāri' (20 Soal: Q61-Q80) ---
const b2m2 = [
  {
    q: "مَا صِيغَةُ الْفِعْلِ الْمُضَارِعِ لِلضَّمِيرِ (أَنَا) مِنْ فِعْلِ (شَرِبَ - يَشْرَبُ)؟",
    opts: ["تَشْرَبُ", "أَشْرَبُ", "نَشْرَبُ", "يَشْرَبُونَ"],
    ans: 1,
    exp: "Fi'il Mudhari' damir أَنَا berawalan Hamzah (أَ): أَشْرَبُ."
  },
  {
    q: "مَا صِيغَةُ الْفِعْلِ الْمُضَارِعِ لِلضَّمِيرِ (نَحْنُ) مِنْ فِعْلِ (لَعِبَ - يَلْعَبُ)؟",
    opts: ["أَلْعَبُ", "تَلْعَبُ", "نَلْعَبُ", "يَلْعَبُونَ"],
    ans: 2,
    exp: "Fi'il Mudhari' damir نَحْنُ berawalan Nun (نَ): نَلْعَبُ."
  },
  {
    q: "مَا صِيغَةُ الْفِعْلِ الْمُضَارِعِ لِلضَّمِيرِ (أَنْتُمْ) مِنْ فِعْلِ (ذَهَبَ - يَذْهَبُ)؟",
    opts: ["تَذْهَبِينَ", "تَذْهَبُونَ", "يَذْهَبُونَ", "تَذْهَبْنَ"],
    ans: 1,
    exp: "Fi'il Mudhari' damir أَنْتُمْ berawalan Ta' dan berakhiran Wawu Nun (ـُونَ): تَذْهَبُونَ."
  },
  {
    q: "مَا صِيغَةُ الْفِعْلِ الْمُضَارِعِ لِلضَّمِيرِ (هِيَ) مِنْ فِعْلِ (فَحَصَ - يَفْحَصُ)؟",
    opts: ["يَفْحَصُ", "تَفْحَصُ", "أَفْحَصُ", "نَفْحَصُ"],
    ans: 1,
    exp: "Fi'il Mudhari' damir هِيَ berawalan Ta' (تَ): تَفْحَصُ."
  },
  {
    q: "مَا صِيغَةُ الْفِعْلِ الْمُضَارِعِ لِلضَّمِيرِ (أَنْتِ) مِنْ فِعْلِ (أَكَلَ - يَأْكُلُ)؟",
    opts: ["تَأْكُلِينَ", "تَأْكُلُونَ", "يَأْكُلْنَ", "تَأْكُلُ"],
    ans: 0,
    exp: "Fi'il Mudhari' damir أَنْتِ berawalan Ta' dan berakhiran Ya' Nun (ـِينَ): تَأْكُلِينَ."
  },
  {
    q: "مَا صِيغَةُ الْفِعْلِ الْمُضَارِعِ لِلضَّمِيرِ (هُمْ) مِنْ فِعْلِ (يَعْمَلُ)؟",
    opts: ["تَعْمَلُونَ", "يَعْمَلُونَ", "يَعْمَلْنَ", "أَعْمَلُ"],
    ans: 1,
    exp: "Fi'il Mudhari' damir هُمْ berawalan Ya' dan berakhiran Wawu Nun (ـُونَ): يَكْمَلُونَ."
  },
  {
    q: "مَا صِيغَةُ الْفِعْلِ الْمُضَارِعِ لِلضَّمِيرِ (هُنَّ) مِنْ فِعْلِ (يَجْلِسُ)؟",
    opts: ["يَجْلِسُونَ", "يَجْلِسْنَ", "تَجْلِسْنَ", "تَجْلِسُونَ"],
    ans: 1,
    exp: "Fi'il Mudhari' damir هُنَّ berawalan Ya' dan berakhiran Nun Sukun Niswah (ـْنَ): يَجْلِسْنَ."
  },
  {
    q: "مَا صِيغَةُ الْفِعْلِ الْمُضَارِعِ لِلضَّمِيرِ (أَنْتُنَّ) مِنْ فِعْلِ (يَفْهَمُ)؟",
    opts: ["تَفْهَمْنَ", "يَفْهَمْنَ", "تَفْهَمُونَ", "تَفْهَمِينَ"],
    ans: 0,
    exp: "Fi'il Mudhari' damir أَنْتُنَّ berawalan Ta' dan berakhiran Nun Niswah (ـْنَ): تَفْهَمْنَ."
  },
  {
    q: "مَا صِيغَةُ الْفِعْلِ الْمُضَارِعِ لِلضَّمِيرِ (أَنْتَ) مِنْ فِعْلِ (تَنَاوَلَ - يَتَنَاوَلُ)؟",
    opts: ["أَتَنَاوَلُ", "تَتَنَاوَلُ", "يَتَنَاوَلُ", "نَتَنَاوَلُ"],
    ans: 1,
    exp: "Fi'il Mudhari' damir أَنْتَ berawalan Ta': تَتَنَاوَلُ."
  },
  {
    q: "مَا صِيغَةُ الْفِعْلِ الْمُضَارِعِ لِلضَّمِيرِ (هُمَا مُذَكَّر) مِنْ فِعْلِ (يَكْتُبُ)؟",
    opts: ["يَكْتُبَانِ", "تَكْتُبَانِ", "يَكْتُبُونَ", "تَكْتُبُونَ"],
    ans: 0,
    exp: "Fi'il Mudhari' damir هُمَا mudzakkar: يَكْتُبَانِ."
  },
  {
    q: "مَا صِيغَةُ الْفِعْلِ الْمُضَارِعِ لِلضَّمِيرِ (هُمَا مُؤَنَّث) مِنْ فِعْلِ (يَقْرَأُ)؟",
    opts: ["تَقْرَأَانِ", "يَقْرَأَانِ", "تَقْرَأُونَ", "يَقْرَأْنَ"],
    ans: 0,
    exp: "Fi'il Mudhari' damir هُمَا mu'annath: تَقْرَأَانِ."
  },
  {
    q: "حُرُوفُ الْمُضَارَعَةِ الأَرْبَعَةُ الْمَجْمُوعَةُ فِي كَلِمَةِ (أَنَيْتُ) هِيَ:",
    opts: ["أ ، ن ، ي ، ت", "أ ، ب ، ت ، ث", "م ، ن ، و ، ي", "ج ، ح ، خ ، د"],
    ans: 0,
    exp: "Huruf Mudhara'ah ada 4 disingkat (أَنَيْتُ): Hamzah, Nun, Ya', Ta'."
  },
  {
    q: "الْفِعْلُ الْمُضَارِعُ يَدُلُّ عَلَى الْحَدَثِ فِي الزَّمَنِ...",
    opts: ["الْمَاضِي فَقَطْ", "الْحَاضِرِ أَوِ الْمُسْتَقْبَلِ", "الأَمْرِ فَقَطْ", "الْبَعِيدِ"],
    ans: 1,
    exp: "Fi'il Mudhari' menunjukkan peristiwa masa sekarang (Hal) atau akan datang (Istaqbal)."
  },
  {
    q: "مَا الضَّمِيرُ الْمُنَاسِبُ لِلْفِعْلِ (يَشْعُرُونَ)؟",
    opts: ["هُمْ", "أَنْتُمْ", "هُنَّ", "أَنْتُنَّ"],
    ans: 0,
    exp: "يَشْعُرُونَ berawalan Ya' dan akhiran -ُونَ maka damirnya adalah هُمْ."
  },
  {
    q: "مَا الضَّمِيرُ الْمُنَاسِبُ لِلْفِعْلِ (تَسْتَرِيحِينَ)؟",
    opts: ["أَنْتِ", "أَنْتُمْ", "هِيَ", "أَنَا"],
    ans: 0,
    exp: "تَسْتَرِيحِينَ berawalan Ta' dan akhiran -ِينَ maka damirnya adalah أَنْتِ."
  },
  {
    q: "مَا الضَّمِيرُ الْمُنَاسِبُ لِلْفِعْلِ (نُمَارِسُ)؟",
    opts: ["نَحْنُ", "أَنَا", "هُمْ", "أَنْتَ"],
    ans: 0,
    exp: "نُمَارِسُ berawalan Nun (نـ) maka damirnya adalah نَحْنُ."
  },
  {
    q: "مَا الضَّمِيرُ الْمُنَاسِبُ لِلْفِعْلِ (أَزُورُ)؟",
    opts: ["أَنَا", "نَحْنُ", "هُوَ", "أَنْتَ"],
    ans: 0,
    exp: "أَزُورُ berawalan Hamzah (أـ) maka damirnya adalah أَنَا."
  },
  {
    q: "حَوِّلْ الْجُمْلَةَ (أَحْمَدُ يَذْهَبُ إِلَى الْمُسْتَشْفَى) إِلَى الْمُؤَنَّثِ (فَاطِمَةُ ...):",
    opts: ["فَاطِمَةُ تَذْهَبُ إِلَى الْمُسْتَشْفَى", "فَاطِمَةُ يَذْهَبُ", "فَاطِمَةُ أَذْهَبُ", "فَاطِمَةُ نَذْهَبُ"],
    ans: 0,
    exp: "Subjek Fatimah (mu'annath / هِيَ) mengunakan تَذْهَبُ."
  },
  {
    q: "مَا صِيغَةُ (يَعْرِفُ) عِنْدَ إِضَافَةِ الضَّمِيرِ (أَنْتُمَا)؟",
    opts: ["تَعْرِفَانِ", "يَعْرِفَانِ", "تَعْرِفُونَ", "تَعْرِفْنَ"],
    ans: 0,
    exp: "Damir أَنْتُمَا pada Fi'il Mudhari': تَعْرِفَانِ."
  },
  {
    q: "أَيُّ كَلِمَةٍ مِنَ الْكَلِمَاتِ الآتِيَةِ لَيْسَتْ فِعْلاً مُضَارِعًا؟",
    opts: ["شَرِبَ", "يَشْرَبُ", "تَشْرَبُ", "أَشْرَبُ"],
    ans: 0,
    exp: "شَرِبَ adalah Fi'il Madhy (bukan Fi'il Mudhari')."
  }
];

b2m2.forEach(item => {
  quiz.push({
    id: idCounter++,
    babId: "topik2",
    modelId: "model2",
    question: item.q,
    options: item.opts,
    correct: item.ans,
    explanation: item.exp
  });
});

// ==========================================
// BAB 3: الحَجُّ وَالعُمْرَةُ (Haji & Umrah)
// ==========================================

// --- BAB 3 - MODEL 1: Mufrodat & Qira'ah / Hiwar (20 Soal: Q81-Q100) ---
const b3m1 = [
  {
    q: "مَا هِيَ الْكَعْبَةُ الْمُشَرَّفَةُ فِي مَكَّةَ الْمُكَرَّمَةِ؟",
    opts: ["قِبْلَةُ الْمُسْلِمِينَ فِي الصَّلاَةِ", "مَسْجِدٌ فِي الْمَدِينَةِ", "جَبَلٌ فِي عَرَفَاتٍ", "مَكَانٌ فِي مِنًى"],
    ans: 0,
    exp: "Ka'bah adalah Kiblat Umat Islam dalam shalat."
  },
  {
    q: "مَا مَعْنَى (الطَّوَافُ) فِي الْحَجِّ وَالْعُمْرَةِ؟",
    opts: ["الدَّوَرَانُ حَوْلَ الْكَعْبَةِ سَبْعَةَ أَشْوَاطٍ", "الْمَشْيُ بَيْنَ الصَّفَا وَالْمَرْوَةِ", "الْوُقُوفُ بِعَرَفَةَ", "رَمْيُ الْجَمَرَاتِ"],
    ans: 0,
    exp: "Tawaf adalah mengelilingi Ka'bah sebanyak 7 kali putaran."
  },
  {
    q: "مَا مَعْنَى (السَّعْيُ) فِي الْمَنَاسِكِ؟",
    opts: ["الْمَشْيُ بَيْنَ الصَّفَا وَالْمَرْوَةِ سَبْعَةَ أَشْوَاطٍ", "الدَّوَرَانُ حَوْلَ الْكَعْبَةِ", "حَلْقُ الشَّعْرِ", "ذَبْحُ الْهَدْيِ"],
    ans: 0,
    exp: "Sa'i adalah berjalan/berlari kecil antara bukit Safa dan Marwah 7 kali."
  },
  {
    q: "مَا مَعْنَى (التَّحَلُّلُ) بَعْدَ أَدَاءِ الْمَنَاسِكِ؟",
    opts: ["قَصُّ الشَّعْرِ أَوْ حَلْقُهُ", "لُبْسُ مَلاَبِسِ الإِحْرَامِ", "قِرَاءَةُ التَّلْبِيَةِ", "الْمَبِيتُ فِي مُزْدَلِفَةَ"],
    ans: 0,
    exp: "Tahallul adalah mencukur atau memotong sebagian rambut kepala."
  },
  {
    q: "مَا هُوَ الإِحْرَامُ فِي الْحَجِّ وَالْعُمْرَةِ؟",
    opts: ["نِيَّةُ الدُّخُولِ فِي النُّسُكِ مَعَ لُبْسِ مَلاَبِسِ الإِحْرَامِ", "الرُّجُوعُ إِلَى الْوَطَنِ", "شُرْبُ مَاءِ زَمْزَمَ", "الصَّلاَةُ فِي الْمَسْجِدِ"],
    ans: 0,
    exp: "Ihram adalah berniat masuk dalam ibadah haji/umrah dengan mengenakan pakaian ihram."
  },
  {
    q: "مَعَ مَنْ ذَهَبَ سَلْمَانُ لِلأَدَاءِ مَنَاسِكِ الْحَجِّ فِي القِرَاءَةِ؟",
    opts: ["مَعَ عَمِّهِ أَحْمَدَ", "مَعَ أُسْرَتِهِ", "مَعَ صَدِيقِهِ", "مُفْرَدًا"],
    ans: 0,
    exp: "Sesuai Qira'ah Bab 3: Salman berhaji bersama pamannya Ahmad (عَمُّهُ أَحْمَدُ)."
  },
  {
    q: "أَيْنَ يَقِفُ الْحُجَّاجُ فِي الْيَوْمِ التَّاسِعِ مِنْ ذِي الْحِجَّةِ؟",
    opts: ["فِي عَرَفَاتٍ (جَبَلِ عَرَفَةَ)", "فِي الْمَدِينَةِ", "فِي جُدَّةَ", "فِي الطَّائِفِ"],
    ans: 0,
    exp: "Jamaah haji melaksanakan wukuf di Arafah pada 9 Dzulhijjah."
  },
  {
    q: "مَاذَا قَالَ النَّبِيُّ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ عَنِ الْعُمْرَةِ فِي رَمَضَانَ؟",
    opts: [
      "عُمْرَةٌ فِي رَمَضَانَ تَعْدِلُ حَجَّةً",
      "الْعُمْرَةُ غَيْرُ مُسْتَحَبَّةٍ فِي رَمَضَانَ",
      "الْعُمْرَةُ تُكَرَّهُ فِي رَمَضَانَ",
      "لاَ فَضْلَ لِلْعُمْرَةِ فِي رَمَضَانَ"
    ],
    ans: 0,
    exp: "Sabda Nabi SAW: Umrah di bulan Ramadan pahalanya setara dengan ibadah haji."
  },
  {
    q: "أَيْنَ تَقَعُ الْكَعْبَةُ الْمُشَرَّفَةُ؟",
    opts: ["فِي الْمَسْجِدِ الْحَرَامِ بِمَكَّةَ الْمُكَرَّمَةِ", "فِي الْمَسْجِدِ النَّبَوِيِّ", "فِي الْمَسْجِدِ الأَقْصَى", "فِي الْقَاهِرَةِ"],
    ans: 0,
    exp: "Ka'bah terletak di dalam Masjidil Haram, Makkah Al-Mukarramah."
  },
  {
    q: "مَا لَوْنُ الْحَجَرِ الأَسْوَدِ حِينَ نَزَلَ مِنَ الْجَنَّةِ كَمَا فِي الْحِوَارِ؟",
    opts: ["نَاصِعُ الْبَيَاضِ (أَبْيَضُ)", "أَسْوَدُ قَاتِمٌ", "أَحْمَرُ", "أَخْضَرُ"],
    ans: 0,
    exp: "Hajar Aswad ketika diturunkan dari Surga berwarna putih bersih (نَاصِعُ الْبَيَاضِ)."
  },
  {
    q: "أَيْنَ يَقُومُ الْحُجَّاجُ بِرَمْيِ الْجَمَرَاتِ؟",
    opts: ["فِي مِنًى", "فِي عَرَفَةَ", "فِي الْمَطَارِ", "فِي الْمَدِينَةِ"],
    ans: 0,
    exp: "Lempar Jumrah dilaksanakan di Mina (مِنًى)."
  },
  {
    q: "مَا هُوَ مَقَامُ إِبْرَاهِيمَ فِي الْمَسْجِدِ الْحَرَامِ؟",
    opts: [
      "الْمَكَانُ الَّذِي وَقَفَ عَلَيْهِ إِبْرَاهِيمُ عِنْدَ بِنَاءِ الْكَعْبَةِ",
      "قَبْرُ إِبْرَاهِيمَ",
      "جَبَلٌ كَبِيرٌ",
      "بِئْرُ زَمْزَمَ"
    ],
    ans: 0,
    exp: "Maqam Ibrahim adalah batu tempat berpijak Nabi Ibrahim AS saat membangun Ka'bah."
  },
  {
    q: "مَا مَعْنَى (الْمِيقَاتُ الْمَكَانِيُّ) فِي الْحَجِّ؟",
    opts: [
      "الْمَكَانُ الَّذِي يُحْرِمُ مِنْهُ الْحَاجُّ أَوْ الْمُعْتَمِرُ",
      "وَقْتُ صَلاَةِ الْعِيدِ",
      "فُنْدُقُ الْحُجَّاجِ",
      "مَطَارُ جُدَّةَ"
    ],
    ans: 0,
    exp: "Miqat Makani adalah batas tempat dimulainya niat ihram haji atau umrah."
  },
  {
    q: "مَا مَعْنَى (التَّلْبِيَةُ) فِي الْحَجِّ (لَبَّيْكَ اللَّهُمَّ لَبَّيْكَ...)؟",
    opts: ["قِرَاءَةُ ذِكْرِ الإِجَابَةِ لِلَّهِ", "الدُّعَاءُ لِلْوَالِدَيْنِ", "قِرَاءَةُ السُّورَةِ", "الْخُطْبَةُ"],
    ans: 0,
    exp: "Talbiyah adalah ucapan kalimat 'Labbaykallahumma labbayk' menjawab panggilan Allah."
  },
  {
    q: "مَا هُوَ (مَاءُ زَمْزَمَ)؟",
    opts: ["مَاءٌ مُبَارَكٌ فِي مَكَّةَ", "مَاءُ النَّهْرِ", "مَاءُ الْبَحْرِ", "مَاءُ الْمَطَرِ"],
    ans: 0,
    exp: "Air Zamzam adalah air suci penuh berkah di Makkah."
  },
  {
    q: "أَيْنَ يَمْبُتُ الْحُجَّاجُ فِي لَيْلَةِ الْعَاشِرِ مِنْ ذِي الْحِجَّةِ بَعْدَ عَرَفَةَ؟",
    opts: ["فِي مُزْدَلِفَةَ", "فِي جُدَّةَ", "فِي الْمَدِينَةِ", "فِي الرِّيَاضِ"],
    ans: 0,
    exp: "Setelah Arafah, jamaah bermalam (mabit) di Muzdalifah."
  },
  {
    q: "مَا هِيَ (الْمَدِينَةُ الْمُنَوَّرَةُ) فِي السَّفَرِ لِلْحَجِّ؟",
    opts: ["مَدِينَةُ الرَّسُولِ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ وَفِيهَا الْمَسْجِدُ النَّبَوِيُّ", "عَاصِمَةُ مِصْرَ", "مَكَانُ الْكَعْبَةِ", "مِينَاكُ جُدَّةَ"],
    ans: 0,
    exp: "Madinah Al-Munawwarah adalah kota Nabi SAW tempat Masjid Nabawi berada."
  },
  {
    q: "مَا هِيَ (الرَّوْضَةُ الشَّرِيفَةُ) فِي الْمَسْجِدِ النَّبَوِيِّ؟",
    opts: ["مَكَانٌ بَيْنَ بَيْتِ النَّبِيِّ وَمِنْبَرِهِ وَهُوَ رَوْضَةٌ مِنْ رِيَاضِ الْجَنَّةِ", "سُوقٌ فِي الْمَدِينَةِ", "جَبَلُ أُحُدٍ", "مَطَارُ الْمَدِينَةِ"],
    ans: 0,
    exp: "Raudaah Syarifah adalah area antara rumah dan mimbar Nabi SAW di Masjid Nabawi."
  },
  {
    q: "مَا هُوَ (طَوَافُ الْوَدَاعِ)؟",
    opts: ["طَوَافٌ يَقُومُ بِهِ الْحَاجُّ عِنْدَ مُغَادَرَةِ مَكَّةَ", "طَوَافٌ عِنْدَ الوُصُولِ", "طَوَافُ الرُّكْنِ", "طَوَافُ النَّفْلِ"],
    ans: 0,
    exp: "Tawaf Wada' adalah tawaf perpisahan saat hendak meninggalkan Makkah."
  },
  {
    q: "مَا هُوَ الرُّكْنُ الأَوَّلُ مِنْ أَرْكَانِ الْحَجِّ؟",
    opts: ["الإِحْرَامُ", "الطَّوَافُ", "السَّعْيُ", "الْوُقُوفُ"],
    ans: 0,
    exp: "Rukun haji pertama adalah Niat Ihram."
  }
];

b3m1.forEach(item => {
  quiz.push({
    id: idCounter++,
    babId: "topik3",
    modelId: "model1",
    question: item.q,
    options: item.opts,
    correct: item.ans,
    explanation: item.exp
  });
});

// --- BAB 3 - MODEL 2: Qawa'id - Fi'il 'Amr & Munādā (20 Soal: Q101-Q120) ---
const b3m2 = [
  {
    q: "مَا صِيغَةُ فِعْلِ الأَمْرِ لِلضَّمِيرِ (أَنْتَ) مِنْ فِعْلِ (كَتَبَ - يَكْتُبُ)؟",
    opts: ["اكْتُبِي", "اكْتُبْ", "اكْتُبُوا", "لاَ تَكْتُبْ"],
    ans: 1,
    exp: "Fi'il Amr damir أَنْتَ berakhiran sukun: اكْتُبْ."
  },
  {
    q: "مَا صِيغَةُ فِعْلِ الأَمْرِ لِلضَّمِيرِ (أَنْتُمْ) مِنْ فِعْلِ (فَتَحَ - يَفْتَحُ)؟",
    opts: ["افْتَحْ", "افْتَحِي", "افْتَحُوا", "افْتَحْنَ"],
    ans: 2,
    exp: "Fi'il Amr damir أَنْتُمْ berakhiran Wawu Sukun & Alif (ـُوا): افْتَحُوا."
  },
  {
    q: "مَا صِيغَةُ فِعْلِ الأَمْرِ لِلضَّمِيرِ (أَنْتِ) مِنْ فِعْلِ (جَلَسَ - يَجْلِسُ)؟",
    opts: ["اجْلِسْ", "اجْلِسِي", "اجْلِسُوا", "اجْلِسْنَ"],
    ans: 1,
    exp: "Fi'il Amr damir أَنْتِ berakhiran Ya' Sukun (ـِي): اجْلِسِي."
  },
  {
    q: "مَا صِيغَةُ فِعْلِ الأَمْرِ لِلضَّمِيرِ (أَنْتُنَّ) مِنْ فِعْلِ (فَكَّرَ - يُفَكِّرُ)؟",
    opts: ["فَكِّرْ", "فَكِّرُوا", "فَكِّرْنَ", "فَكِّرِي"],
    ans: 2,
    exp: "Fi'il Amr damir أَنْتُنَّ berakhiran Nun Niswah Fathah (ـْنَ): فَكِّرْنَ."
  },
  {
    q: "إِذَا كَانَ الْمُنَادَى اسْمَ عَلَمٍ مُفْرَدًا (مِثْلُ: يَا زَيْدُ)، فَإِنَّهُ يُبْنَى عَلَى...",
    opts: ["الضَّمِّ", "الْفَتْحِ", "الْكَسْرِ", "السُّكُونِ"],
    ans: 0,
    exp: "Munada Nama Tunggal (Mufrad 'Alam) dibaca Mabni Dhammah: يَا زَيْدُ."
  },
  {
    q: "إِذَا كَانَ الْمُنَادَى مُضَافًا (مِثْلُ: يَا عَبْدَ اللهِ)، فَإِنَّ حُكْمَهُ...",
    opts: ["النَّصْبُ (Mansub / Fathah)", "الرَّفْعُ", "الْجَرُّ", "الْجَزْمُ"],
    ans: 0,
    exp: "Munada Mudhaf hukumnya Mansub (Fathah): يَا عَبْدَ اللهِ."
  },
  {
    q: "فِعْلُ الأَمْرِ يُصَاغُ فَقَطْ لِـ...",
    opts: ["ضَمَائِرِ الْمُخَاطَبِ (أَنْتَ، أَنْتُمَا، أَنْتُمْ، أَنْتِ، أَنْتُمَا، أَنْتُنَّ)", "ضَمَائِرِ الْغَائِبِ", "ضَمَائِرِ الْمُتَكَلِّمِ", "كُلِّ الضَّمَائِرِ"],
    ans: 0,
    exp: "Fi'il Amr hanya dibuat untuk 6 Dhamir Mukhatab (orang kedua)."
  },
  {
    q: "مَا صِيغَةُ فِعْلِ الأَمْرِ لِلضَّمِيرِ (أَنْتُمَا) مِنْ فِعْلِ (ذَهَبَ)؟",
    opts: ["اذْهَبَا", "اذْهَبْ", "اذْهَبُوا", "اذْهَبْنَ"],
    ans: 0,
    exp: "Fi'il Amr damir أَنْتُمَا berakhiran Alif (ـَا): اذْهَبَا."
  },
  {
    q: "أَيُّ جُمْلَةٍ فِيهَا مُنَادَى مُبْنَى عَلَى الضَّمِّ؟",
    opts: ["يَا مُحَمَّدُ، اقْرَأِ الْكِتَابَ", "يَا طَالِبَ الْعِلْمِ، اجْتَهِدْ", "يَا عَبْدَ الرَّحْمَنِ، تَعَالَ", "يَا رَبَّ الْعَالَمِينَ"],
    ans: 0,
    exp: "يَا مُحَمَّدُ adalah Munada Mufrad 'Alam maka Mabni Dhammah."
  },
  {
    q: "أَيُّ جُمْلَةٍ فِيهَا مُنَادَى مَنْصُوبٌ لِأَنَّهُ مُضَافٌ؟",
    opts: ["يَا أَهْلَ مَكَّةَ، أَهْلاً بِكُمْ", "يَا خَالِدُ، اقْتَرِبْ", "يَا مَرْيَمُ، اشْرَبِي", "يَا رَجُلُ، انْتَظِرْ"],
    ans: 0,
    exp: "يَا أَهْلَ مَكَّةَ adalah Munada Mudhaf (أَهْلَ dipatahkan/mansub)."
  },
  {
    q: "عِنْدَ نِدَاءِ الاسْمِ الْمُقْتَرِنِ بِـ (الـ) لِلْمُذَكَّرِ، نَسْتَخْدِمُ...",
    opts: ["يَا أَيُّهَا (مِثْلُ: يَا أَيُّهَا النَّبِيُّ)", "يَا أَيَّتُهَا", "يَا هَذِهِ", "يَا تِلْكَ"],
    ans: 0,
    exp: "Memanggil Isim ber-AL mudzakkar menggunakan kata panggil: يَا أَيُّهَا."
  },
  {
    q: "عِنْدَ نِدَاءِ الاسْمِ الْمُقْتَرِنِ بِـ (الـ) لِلْمُؤَنَّثِ، نَسْتَخْدِمُ...",
    opts: ["يَا أَيَّتُهَا (مِثْلُ: يَا أَيَّتُهَا النَّفْسُ)", "يَا أَيُّهَا", "يَا هَذَا", "يَا هُوَ"],
    ans: 0,
    exp: "Memanggil Isim ber-AL mu'annath menggunakan kata panggil: يَا أَيَّتُهَا."
  },
  {
    q: "مَا صِيغَةُ فِعْلِ الأَمْرِ مِنْ (قَالَ - يَقُولُ) لِلضَّمِيرِ (أَنْتَ)؟",
    opts: ["قُلْ", "قُولُوا", "قُولِي", "قُولاَ"],
    ans: 0,
    exp: "Fi'il Amr dari قَالَ - يَقُولُ untuk أَنْتَ adalah: قُلْ."
  },
  {
    q: "مَا صِيغَةُ فِعْلِ الأَمْرِ مِنْ (قَامَ - يَقُومُ) لِلضَّمِيرِ (أَنْتُمْ)؟",
    opts: ["قُومُوا", "قُمْ", "قُومِي", "قُمْنَ"],
    ans: 0,
    exp: "Fi'il Amr dari قَامَ - يَقُومُ untuk أَنْتُمْ adalah: قُومُوا."
  },
  {
    q: "مَا صِيغَةُ فِعْلِ الأَمْرِ مِنْ (نَظَرَ - يَنْظُرُ) لِلضَّمِيرِ (أَنْتِ)؟",
    opts: ["انْظُرِي", "انْظُرْ", "انْظُرُوا", "انْظُرْنَ"],
    ans: 0,
    exp: "Fi'il Amr dari نَظَرَ untuk أَنْتِ adalah: انْظُرِي."
  },
  {
    q: "مَا هُوَ حَرْفُ النِّدَاءِ الأَكْثَرُ اسْتِعْمَالاً فِي اللُّغَةِ الْعَرَبِيَّةِ؟",
    opts: ["يَا", "أَيْ", "أَيَا", "هَيَا"],
    ans: 0,
    exp: "Huruf nida' paling populer adalah يَا."
  },
  {
    q: "حَوِّلْ (اكْتُبْ يَا أَحْمَدُ) إِلَى الْمُؤَنَّثِ (فَاطِمَةُ):",
    opts: ["اكْتُبِي يَا فَاطِمَةُ", "اكْتُبْ يَا فَاطِمَةُ", "اكْتُبُوا يَا فَاطِمَةُ", "اكْتُبْنَ يَا فَاطِمَةُ"],
    ans: 0,
    exp: "Untuk Fatimah (أَنْتِ) bentuk perintahnya: اكْتُبِي."
  },
  {
    q: "مَا صِيغَةُ فِعْلِ الأَمْرِ مِنْ (سَمِعَ - يَسْمَعُ) لِلضَّمِيرِ (أَنْتُمْ)؟",
    opts: ["اسْمَعُوا", "اسْمَعْ", "اسْمَعِي", "اسْمَعْنَ"],
    ans: 0,
    exp: "Fi'il Amr dari سَمِعَ untuk أَنْتُمْ adalah: اسْمَعُوا."
  },
  {
    q: "مَا حُكْمُ المُنَادَى النَّكِرَةِ المَقْصُودَةِ (مِثْلُ: يَا رَجُلُ)؟",
    opts: ["مُبْنَى عَلَى الضَّمِّ", "مَنْصُوبٌ", "مَجْرُورٌ", "مَجْزُومٌ"],
    ans: 0,
    exp: "Nakirah Maqsudah bermakna khusus dibangun atas Dhammah (Mabni Dhammah)."
  },
  {
    q: "مَا صِيغَةُ فِعْلِ الأَمْرِ مِنْ (أَكَلَ - يَأْكُلُ) لِلضَّمِيرِ (أَنْتَ)؟",
    opts: ["كُلْ", "أُكُلْ", "كُلُوا", "كُلِي"],
    ans: 0,
    exp: "Fi'il Amr dari أَكَلَ untuk أَنْتَ adalah: كُلْ."
  }
];

b3m2.forEach(item => {
  quiz.push({
    id: idCounter++,
    babId: "topik3",
    modelId: "model2",
    question: item.q,
    options: item.opts,
    correct: item.ans,
    explanation: item.exp
  });
});

// ==========================================
// BAB 4: الأَدْيَانُ فِي إِنْدُونِيسِيَا (Agama-agama di Indonesia)
// ==========================================

// --- BAB 4 - MODEL 1: Mufrodat & Qira'ah / Hiwar (20 Soal: Q121-Q140) ---
const b4m1 = [
  {
    q: "كَمْ عَدَدُ الأَدْيَانِ الرَّسْمِيَّةِ فِي إِنْدُونِيسِيَا؟",
    opts: ["٤ أَدْيَانٍ", "٥ أَدْيَانٍ", "٦ أَدْيَانٍ", "٧ أَدْيَانٍ"],
    ans: 2,
    exp: "Sesuai teks Bab 4: Ada 6 agama resmi di Indonesia."
  },
  {
    q: "مَا هُوَ مَكَانُ عِبَادَةِ الْمُسْلِمِينَ؟",
    opts: ["الْمَسْجِدُ", "الْكَنِيسَةُ", "فُورَا", "فِهَارَا"],
    ans: 0,
    exp: "Tempat ibadah Umat Islam adalah Masjid (الْمَسْجِدُ)."
  },
  {
    q: "مَا هُوَ مَكَانُ عِبَادَةِ الْمَسِيحِيِّينَ (الْكَاثُولِيكِ وَالْبُرُوتِسْتَانْتِ)؟",
    opts: ["الْكَنِيسَةُ", "الْمَسْجِدُ", "الْمَعْبَدُ", "فُورَا"],
    ans: 0,
    exp: "Tempat ibadah Umat Kristiani adalah Gereja (الْكَنِيسَةُ)."
  },
  {
    q: "مَا هُوَ مَكَانُ عِبَادَةِ الْهِنْدُوسِيِّينَ فِي بَالِي وَغَيْرِهَا؟",
    opts: ["فُورَا", "فِهَارَا", "الْمَسْجِدُ", "الْكَنِيسَةُ"],
    ans: 0,
    exp: "Tempat ibadah Umat Hindu adalah Pura (فُورَا)."
  },
  {
    q: "مَا هُوَ مَكَانُ عِبَادَةِ الْبُوذِيِّينَ؟",
    opts: ["فِهَارَا", "فُورَا", "الْمَسْجِدُ", "الْكَنِيسَةُ"],
    ans: 0,
    exp: "Tempat ibadah Umat Buddha adalah Vihara (فِهَارَا)."
  },
  {
    q: "مَا هُوَ مَكَانُ عِبَادَةِ الْكُونْفُوشِيِّينَ؟",
    opts: ["الْمَعْبَدُ / الْكِلِنْتِينْج", "الْمَسْجِدُ", "الْكَنِيسَةُ", "فُورَا"],
    ans: 0,
    exp: "Tempat ibadah Umat Khonghucu adalah Klenteng (الْمَعْبَدُ)."
  },
  {
    q: "مَا مَعْنَى كَلِمَة (التَّسَامُحُ) فِي الْمُجْتَمَعِ؟",
    opts: ["Toleransi / Saling Menghormati", "Perselisihan", "Perpisahan", "Perdebatan"],
    ans: 0,
    exp: "التَّسَامُحُ artinya Toleransi dan saling menghormati antar umat beragama."
  },
  {
    q: "مَا هُوَ (بَانْتَجَاسِيلاَ) فِي إِنْدُونِيسِيَا؟",
    opts: ["أَسَاسُ الدَّوْلَةِ الإِنْدُونِيسِيَّةِ", "اسْمُ مَدِينَةٍ", "اسْمُ جَبَلٍ", "عَمَلَةٌ نَقْدِيَّةٌ"],
    ans: 0,
    exp: "Pancasila (بَانْتَجَاسِيلاَ) adalah Dasar Negara Indonesia."
  },
  {
    q: "أَيْنَ يَسْكُنُ خَالِدٌ وَسُونَاَرْطُو وَفْرَانْسِيسْكُوسْ فِي نَصِّ الْقِرَاءَةِ؟",
    opts: ["فِي جُومْبَانْج (Jombang)", "فِي سُورَابَايَا", "فِي بَالِي", "فِي جَاكَرْتَا"],
    ans: 0,
    exp: "Sesuai Qira'ah Bab 4: Khalid dkk tinggal di Jombang Jawa Timur."
  },
  {
    q: "كَمْ نِسْبَةُ الْمُسْلِمِينَ فِي إِنْدُونِيسِيَا حَسَبَ نَصِّ الْقِرَاءَةِ؟",
    opts: ["٨٧,٢ %", "٥٠ %", "٦,٩ %", "٠,٧ %"],
    ans: 0,
    exp: "Sesuai data teks Bab 4: Jumlah Umat Islam sekitar 87,2 %."
  },
  {
    q: "مَا اسْمُ الْمَعْبَدِ الَّذِي يَتَعَبَّدُ فِيهِ سُونَاَرْطُو فِي جُومْبَانْج؟",
    opts: ["مَعْبَدُ هُوكْ لِيُؤْنْج كِيُؤْنْج", "فُورَا بَسَاكِيْه", "الْمَسْجِدُ الْكَبِيرُ", "كَنِيسَةُ جُومْبَانْج"],
    ans: 0,
    exp: "Sesuai teks Bab 4: Klenteng Hok Liong Kiong di Jombang."
  },
  {
    q: "مَا هُوَ شِعَارُ إِنْدُونِيسِيَا فِي التَّنَوُّعِ الدِّينِيِّ وَالثَّقَافِيِّ؟",
    opts: ["الْوَحْدَةُ فِي التَّنَوُّعِ (Bhinneka Tunggal Ika)", "التَّنَوُّعُ فَقَطْ", "الإِسْلَامُ فَقَطْ", "السَّلاَمُ"],
    ans: 0,
    exp: "Semboyan Indonesia adalah Bhinneka Tunggal Ika (الْوَحْدَةُ فِي التَّنَوُّعِ)."
  },
  {
    q: "مَنْ هُوَ مُصَمِّمُ وَمُؤَلِّفُ هَذِهِ الْمَادَّةِ التَّعْلِيمِيَّةِ التَّفَاعُلِيَّةِ؟",
    opts: [
      "Yosi, S. Ag, M. Pd. (MAN 1 Pontianak)",
      "Ahmad, S. Pd. (MAN 2 Jakarta)",
      "Fatimah, M. Ag. (MTsN 1 Surabaya)",
      "Ustadz Syarif (Ponpes Pontianak)"
    ],
    ans: 0,
    exp: "Penyusun & Pemilik Media: Yosi, S. Ag, M. Pd. (MAN 1 Pontianak)."
  },
  {
    q: "مَا مَعْنَى (حُرِّيَّةُ التَّعَبُّدِ) فِي الدُّسْتُورِ؟",
    opts: ["Kebebasan Beribadah", "Kebebasan Berdagang", "Hak Pilih", "Kewajiban Pajak"],
    ans: 0,
    exp: "حُرِّيَّةُ التَّعَبُّدِ artinya Kebebasan Beribadah sesuai keyakinan."
  },
  {
    q: "مَا مَعْنَى (الإِخَاءُ الإِنْسَانِيُّ)؟",
    opts: ["Persaudaraan Kemanusiaan", "Persaingan Ekonomi", "Perbedaan Ras", "Tingkat Pendidikan"],
    ans: 0,
    exp: "الإِخَاءُ الإِنْسَانِيُّ artinya Persaudaraan Kemanusiaan."
  },
  {
    q: "أَيْنَ تَقَعُ كَنِيسَةُ (إِيمَانُوئِيلْ) فِي نَصِّ الْقِرَاءَةِ؟",
    opts: ["فِي جُومْبَانْج", "فِي جَاكَرْتَا", "فِي بَالِي", "فِي مَدَانْ"],
    ans: 0,
    exp: "Gereja Immanuel bertempat di Jombang."
  },
  {
    q: "مَا هُوَ (الْعِيدُ) الأَكْبَرُ لِلْمُسْلِمِينَ بَعْدَ صَوْمِ رَمَضَانَ؟",
    opts: ["عِيدُ الْفِطْرِ", "عِيدُ المِيلاَدِ", "عِيدُ النَّيْرُوزِ", "عِيدُ اسْتِقْلاَلِ"],
    ans: 0,
    exp: "Hari raya Umat Islam setelah Ramadan adalah Idul Fitri (عِيدُ الْفِطْرِ)."
  },
  {
    q: "مَا هُوَ الْكِتَابُ الْمُقَدَّسُ لِلْمُسْلِمِينَ؟",
    opts: ["الْقُرْآنُ الْكَرِيمُ", "الإِنْجِيلُ", "التَّوْرَاةُ", "الْفِيدَا"],
    ans: 0,
    exp: "Kitab suci Umat Islam adalah Al-Qur'an Al-Karim."
  },
  {
    q: "مَا مَعْنَى كَلِمَة (الْمُوَاطَنَةُ) فِي بَابِ الأَدْيَانِ؟",
    opts: ["Kewarganegaraan", "Kebebasan", "Keamanan", "Kedamaian"],
    ans: 0,
    exp: "الْمُوَاطَنَةُ artinya Kewarganegaraan."
  },
  {
    q: "مَا مَعْنَى كَلِمَة (الـسَّلاَمُ) فِي الْمُجْتَمَعِ؟",
    opts: ["Kedamaian / Perdamaian", "Kekerasan", "Permusuhan", "Perdebatan"],
    ans: 0,
    exp: "السَّلاَمُ artinya Kedamaian / Perdamaian."
  }
];

b4m1.forEach(item => {
  quiz.push({
    id: idCounter++,
    babId: "topik4",
    modelId: "model1",
    question: item.q,
    options: item.opts,
    correct: item.ans,
    explanation: item.exp
  });
});

// --- BAB 4 - MODEL 2: Qawa'id - Na'at Man'ut (5 jenis) & Idhafah (20 Soal: Q141-Q160) ---
const b4m2 = [
  {
    q: "فِي جُمْلَةِ (يَجِبُ عَلَى الْمُسْلِمِينَ أَنْ يَجْتَنِبُوا الأَعْمَالَ السَّيِّئَةَ)، أَيْنَ النَّعْتُ؟",
    opts: ["السَّيِّئَةَ", "الأَعْمَالَ", "الْمُسْلِمِينَ", "يَجِبُ"],
    ans: 0,
    exp: "السَّيِّئَةَ adalah Na'at Mufrad yang menyifati Man'ut (الأَعْمَالَ)."
  },
  {
    q: "مَا نَوْعُ النَّعْتِ فِي جُمْلَةِ (تَرَكَ الشَّافِعِيُّ مُؤَلَّفَاتٍ نَفْعُهَا عَظِيمٌ)؟",
    opts: ["نَعْتُ جُمْلَةٍ إِسْمِيَّةٍ", "نَعْتٌ مُفْرَدٌ", "نَعْتُ جُمْلَةٍ فِعْلِيَّةٍ", "نَعْتُ شِبْهِ الْجُمْلَةِ"],
    ans: 0,
    exp: "نَفْعُهَا عَظِيمٌ adalah Na'at Jumlah Ismiyah yang menyifati kata nakirah مُؤَلَّفَاتٍ."
  },
  {
    q: "مَا نَوْعُ النَّعْتِ فِي جُمْلَةِ (خَلَّفَ الشَّافِعِيُّ مَذْهَبًا يَحْتَرِمُهُ الْمُسْلِمُونَ)؟",
    opts: ["نَعْتُ جُمْلَةٍ فِعْلِيَّةٍ", "نَعْتٌ مُفْرَدٌ", "نَعْتُ جُمْلَةٍ إِسْمِيَّةٍ", "نَعْتُ شِبْهِ الْجُمْلَةِ"],
    ans: 0,
    exp: "يَحْتَرِمُهُ الْمُسْلِمُونَ adalah Na'at Jumlah Fi'liyah yang menyifati kata nakirah مَذْهَبًا."
  },
  {
    q: "مَا نَوْعُ النَّعْتِ فِي جُمْلَةِ (رَأَيْتُ طَائِرًا فَوْقَ الشَّجَرَةِ)؟",
    opts: ["نَعْتُ شِبْهِ الْجُمْلَةِ (ظَرْفٌ)", "نَعْتٌ مُفْرَدٌ", "نَعْتُ جُمْلَةٍ إِسْمِيَّةٍ", "نَعْتُ جُمْلَةٍ فِعْلِيَّةٍ"],
    ans: 0,
    exp: "فَوْقَ الشَّجَرَةِ adalah Na'at Syibhil Jumlah (Keterangan Tempat Zharaf) menyifati طَائِرًا."
  },
  {
    q: "مَا نَوْعُ النَّعْتِ فِي جُمْلَةِ (شَاهَدْتُ رَجُلاً فِي الْمَسْجِدِ)؟",
    opts: ["نَعْتُ شِبْهِ الْجُمْلَةِ (جَارٌّ وَمَجْرُورٌ)", "نَعْتٌ مُفْرَدٌ", "نَعْتُ جُمْلَةٍ إِسْمِيَّةٍ", "نَعْتُ جُمْلَةٍ فِعْلِيَّةٍ"],
    ans: 0,
    exp: "فِي الْمَسْجِدِ adalah Na'at Syibhil Jumlah (Jar Majrur) yang menyifati رَجُلاً."
  },
  {
    q: "تَتَكَوَّنُ الإِضَافَةُ مِنْ رُكْنَيْنِ هُمَا...",
    opts: ["الْمُضَافُ وَالْمُضَافُ إِلَيْهِ", "الْفِعْلُ وَالْفَاعِلُ", "الْمُبْتَدَأُ وَالْخَبَرُ", "النَّعْتُ وَالْمَنْعُوتُ"],
    ans: 0,
    exp: "Susunan Idhafah terdiri dari Mudhaf dan Mudhaf Ilaih."
  },
  {
    q: "مَا حُكْمُ الْمُضَافِ إِلَيْهِ دَائِمًا فِي الإِعْرَابِ؟",
    opts: ["الْمَجْرُورُ (Majrur / Kasrah)", "الْمَرْفُوعُ", "الْمَنْصُوبُ", "الْمَجْزُومُ"],
    ans: 0,
    exp: "Mudhaf Ilaih selalu berhukum Majrur (dengan Kasrah atau Ya')."
  },
  {
    q: "شَرْطُ الْمُضَافِ فِي الإِضَافَةِ أَنْ لاَ يَكُونَ فِيهِ...",
    opts: ["أَلْفُ اللاَّمْ (الـ) وَالتَّنْوِينُ", "الْحَرَكَةُ", "الْحُرُوفُ", "الضَّمِيرُ"],
    ans: 0,
    exp: "Syarat Mudhaf tidak boleh ber-AL dan tidak boleh ber-Tanwin."
  },
  {
    q: "فِي جُمْلَةِ (كِتَابُ الطَّالِبِ جَدِيدٌ)، أَيْنَ الْمُضَافُ إِلَيْهِ؟",
    opts: ["الطَّالِبِ", "كِتَابُ", "جَدِيدٌ", "لاَ يُوجَدُ"],
    ans: 0,
    exp: "الطَّالِبِ adalah Mudhaf Ilaih (berbaris Kasrah/majrur)."
  },
  {
    q: "فِي جُمْلَةِ (مَدْرَسَةُ الْقَرِيَةِ كَبِيرَةٌ)، أَيْنَ الْمُضَافُ؟",
    opts: ["مَدْرَسَةُ", "الْقَرِيَةِ", "كَبِيرَةٌ", "مَدْرَسَةُ الْقَرِيَةِ"],
    ans: 0,
    exp: "مَدْرَسَةُ adalah Mudhaf (tanpa AL dan tanpa Tanwin)."
  },
  {
    q: "الْقَاعِدَةُ النَّحْوِيَّةُ: (الْجُمَلُ وَشِبْهُ الْجُمَلِ بَعْدَ النَّكِرَاتِ...)",
    opts: ["صِفَاتٌ (نَعْتٌ)", "أَحْوَالٌ (حَالٌ)", "أَخْبَارٌ (خَبَرٌ)", "أَفْعَالٌ"],
    ans: 0,
    exp: "Kaidah: Kalimat/Syibhul Jumlah setelah Kata Nakirah berposisi sebagai Sifat (Na'at)."
  },
  {
    q: "الْقَاعِدَةُ النَّحْوِيَّةُ: (الْجُمَلُ وَشِبْهُ الْجُمَلِ بَعْدَ الْمَعَارِفِ...)",
    opts: ["أَحْوَالٌ (حَالٌ)", "صِفَاتٌ (نَعْتٌ)", "أَخْبَارٌ", "أَفْعَالٌ"],
    ans: 0,
    exp: "Kaidah: Kalimat/Syibhul Jumlah setelah Kata Ma'rifah berposisi sebagai Hal."
  },
  {
    q: "يَتْبَعُ النَّعْتُ الْمُفْرَدُ مَنْعُوتَهُ فِي ٤ أَشْيَاءَ هِيَ:",
    opts: [
      "الإِعْرَابُ، التَّذْكِيرُ/التَّأْنِيثُ، الإِفْرَادُ/التَّثْنِيَةُ/الْجَمْعُ، التَّعْرِيفُ/التَّنْكِيرُ",
      "الإِعْرَابُ فَقَطْ",
      "التَّأْنِيثُ فَقَطْ",
      "الْعَدَدُ فَقَطْ"
    ],
    ans: 0,
    exp: "Na'at Mufrad mengikuti Man'ut dalam 4 hal: I'rab, Gender, Jumlah, dan Ma'rifah/Nakirah."
  },
  {
    q: "أَيُّ جُمْلَةٍ فِيهَا نَعْتٌ مُفْرَدٌ مَرْفُوعٌ؟",
    opts: ["جَاءَ الطَّالِبُ النَّشِيطُ", "رَأَيْتُ الطَّالِبَ النَّشِيطَ", "مَرَرْتُ بِالطَّالِبِ النَّشِيطِ", "الطَّالِبُ نَشِيطٌ"],
    ans: 0,
    exp: "النَّشِيطُ adalah Na'at Mufrad Marfu' mengikuti Man'ut Marfu' (الطَّالِبُ)."
  },
  {
    q: "أَيُّ جُمْلَةٍ فِيهَا نَعْتٌ مُفْرَدٌ مَنْصُوبٌ؟",
    opts: ["رَأَيْتُ الطَّالِبَ النَّشِيطَ", "جَاءَ الطَّالِبُ النَّشِيطُ", "مَرَرْتُ بِالطَّالِبِ النَّشِيطِ", "النَّشِيطُ طَالِبٌ"],
    ans: 0,
    exp: "النَّشِيطَ adalah Na'at Mansub mengikuti Man'ut (الطَّالِبَ)."
  },
  {
    q: "أَيُّ جُمْلَةٍ فِيهَا نَعْتٌ مُفْرَدٌ مَجْرُورٌ؟",
    opts: ["مَرَرْتُ بِالطَّالِبِ النَّشِيطِ", "جَاءَ الطَّالِبُ النَّشِيطُ", "رَأَيْتُ الطَّالِبَ النَّشِيطَ", "الطَّالِبُ النَّشِيطُ"],
    ans: 0,
    exp: "النَّشِيطِ adalah Na'at Majrur mengikuti Man'ut (بِالطَّالِبِ)."
  },
  {
    q: "عِنْدَ إِضَافَةِ الْمُثَنَّى (مِثْلُ: كِتَابَانِ)، فَمَاذَا يَحْدُثُ لِلنُّونِ؟",
    opts: ["تُحْذَفُ النُّونُ (كِتَابَا الطَّالِبِ)", "تَبْقَى النُّونُ", "تُبْدَلُ مِيمًا", "تُبْدَلُ وَاوًا"],
    ans: 0,
    exp: "Nun pada Isim Muthanna/Jama' Mudzakkar Salim dihapus saat di-Idhafahkan (كِتَابَا الطَّالِبِ)."
  },
  {
    q: "عِنْدَ إِضَافَةِ جَمْعِ الْمُذَكَّرِ السَّالِمِ (مِثْلُ: مُعَلِّمُونَ)، كَيْفَ تُكْتَبُ (مُعَلِّمُو الْمَدْرَسَةِ)؟",
    opts: ["مُعَلِّمُو الْمَدْرَسَةِ (بِحَذْفِ النُّونِ)", "مُعَلِّمُونَ الْمَدْرَسَةِ", "الْمُعَلِّمُونَ الْمَدْرَسَةِ", "مُعَلِّمِينَ الْمَدْرَسَةِ"],
    ans: 0,
    exp: "Nun Jama' Mudzakkar Salim dibuang saat menjadi Mudhaf: مُعَلِّمُو الْمَدْرَسَةِ."
  },
  {
    q: "أَيُّ مِثَالٍ صَحِيحٌ لِلإِضَافَةِ فِي اللُّغَةِ الْعَرَبِيَّةِ؟",
    opts: ["قَلَمُ الْمُدَرِّسِ", "الْقَلَمُ الْمُدَرِّسُ", "قَلَمٌ مُدَرِّسٌ", "الْقَلَمُ المـُدَرِّسِ"],
    ans: 0,
    exp: "قَلَمُ الْمُدَرِّسِ adalah susunan Idhafah yang benar (Mudhaf + Mudhaf Ilaih)."
  },
  {
    q: "مَا الإِعْرَابُ الصَّحِيحُ لِكَلِمَةِ (اللهِ) فِي جُمْلَةِ (عَبْدُ اللهِ)؟",
    opts: ["مُضَافٌ إِلَيْهِ مَجْرُورٌ بِالْكَسْرَةِ", "فَاعِلٌ مَرْفُوعٌ", "مَفْعُولٌ بِهِ مَنْصُوبٌ", "نَعْتٌ مَرْفُوعٌ"],
    ans: 0,
    exp: "Lafdzul Jalaalah (اللهِ) sebagai Mudhaf Ilaih Majrur dengan Kasrah."
  }
];

b4m2.forEach(item => {
  quiz.push({
    id: idCounter++,
    babId: "topik4",
    modelId: "model2",
    question: item.q,
    options: item.opts,
    correct: item.ans,
    explanation: item.exp
  });
});

console.log('Total generated questions:', quiz.length);

if (quiz.length !== 160) {
  console.error('Error: Expected 160 questions, but generated', quiz.length);
  process.exit(1);
}

// Update js/data.js file
const dataPath = path.join(__dirname, '../js/data.js');
let dataContent = fs.readFileSync(dataPath, 'utf8');

// Find quiz: [ ... ] section
const quizStartIndex = dataContent.indexOf('quiz: [');
if (quizStartIndex === -1) {
  console.error('Could not find quiz array in data.js');
  process.exit(1);
}

const quizEndIndex = dataContent.lastIndexOf(']');
const newQuizString = 'quiz: ' + JSON.stringify(quiz, null, 2);

const updatedContent = dataContent.substring(0, quizStartIndex) + newQuizString + dataContent.substring(quizEndIndex + 1);

fs.writeFileSync(dataPath, updatedContent, 'utf8');
console.log('Successfully updated js/data.js with 160 questions!');
