// Data Materi Bahasa Arab Kelas 9: الحفاظ على البيئة (Pelestarian Lingkungan)

const ARABIC_DATA = {
  meta: {
    title: "الحفاظ على البيئة",
    subtitle: "Media Pembelajaran Bahasa Arab Kelas 9 MTs Darussalam Jombang",
    theme: "Saymana Modern Islamic Green"
  },
  
  vocabularies: [
    {
      id: 1,
      arabic: "تَشْجِيْرٌ",
      latin: "Tasyjīrun",
      meaning: "Reboisasi / Penanaman Pohon",
      category: "Solusi",
      sentence: "التَّشْجِيرُ يُسَاعِدُ عَلَى تَنْقِيَةِ الْهَوَاءِ وَإِعَادَةِ الْحَيَاةِ لِلْغَابَةِ.",
      sentenceTranslation: "Reboisasi membantu menyegarkan udara dan mengembalikan kehidupan hutan.",
      svgKey: "reboisasi",
      image: "img-reboisasi.jpg",
      imagePosition: "center center"
    },
    {
      id: 2,
      arabic: "إِحْرَاقُ الْغَابَةِ",
      latin: "Iḥrāqul-Ġābah",
      meaning: "Pembakaran Hutan",
      category: "Masalah",
      sentence: "إِحْرَاقُ الْغَابَةِ يُسَبِّبُ تَلَوُّثَ الْهَوَاءِ وَتَدْمِيرَ الْبِيئَةِ.",
      sentenceTranslation: "Pembakaran hutan menyebabkan pencemaran udara dan kerusakan lingkungan.",
      svgKey: "pembakaran_hutan",
      image: "img-pembakaran-hutan.jpg"
    },
    {
      id: 3,
      arabic: "تَلَوُّثٌ",
      latin: "Talawwuṡun",
      meaning: "Polusi / Pencemaran",
      category: "Masalah",
      sentence: "تَلَوُّثُ الْهَوَاءِ وَالْمَاءِ يُهَدِّدُ حَيَاةَ الْكَائِنَاتِ الْحَيَّةِ.",
      sentenceTranslation: "Polusi udara dan air mengancam kehidupan makhluk hidup.",
      svgKey: "polusi",
      image: "img-polusi.jpg"
    },
    {
      id: 4,
      arabic: "الإِحْتِبَاسُ الْحَرَارِيُّ",
      latin: "Al-Iḥtibāsul-Ḥarāriyyu",
      meaning: "Pemanasan Global",
      category: "Masalah",
      sentence: "الإِحْتِبَاسُ الْحَرَارِيُّ يُؤَدِّي إِلَى ارْتِفَاعِ دَرَجَةِ حَرَارَةِ الأَرْضِ.",
      sentenceTranslation: "Pemanasan global menyebabkan kenaikan suhu bumi.",
      svgKey: "pemanasan_global",
      image: "img-pemanasan-global.jpg"
    },
    {
      id: 5,
      arabic: "فَيَضَانٌ",
      latin: "Fayaḍānun",
      meaning: "Banjir",
      category: "Bencana",
      sentence: "يَحْدُثُ الْفَيَضَانُ عِنْدَمَا تَكْثُرُ الأَمْطَارُ وَتُنْسَدُّ الْمَجَارِي.",
      sentenceTranslation: "Banjir terjadi saat curah hujan tinggi dan saluran air tersumbat.",
      svgKey: "banjir",
      image: "img-banjir.jpg"
    },
    {
      id: 6,
      arabic: "الْمَوَادُّ الْكِيْمِيَاوِيَّةُ",
      latin: "Al-Mawāddul-Kīmiyā'iyyah",
      meaning: "Bahan-Bahan Kimia",
      category: "Masalah",
      sentence: "الْمَوَادُّ الْكِيْمِيَاوِيَّةُ السَّامَّةُ تُلَوِّثُ التُّرْبَةَ وَالْمِيَاهَ.",
      sentenceTranslation: "Bahan-bahan kimia beracun mencemari tanah dan air.",
      svgKey: "bahan_kimia",
      image: "img-bahan-kimia.jpg"
    },
    {
      id: 7,
      arabic: "تَصَحُّرٌ",
      latin: "Taṣaḥḥurun",
      meaning: "Penebangan Hutan / Deforestasi",
      category: "Masalah",
      sentence: "تَصَحُّرُ الأَرَاضِي يَنْتُجُ عَنْ قَطْعِ الأَشْجَارِ الْعَشْوَائِيِّ.",
      sentenceTranslation: "Penebangan hutan secara liar menyebabkan penggundulan lahan.",
      svgKey: "penebangan_hutan",
      image: "img-penebangan-hutan.jpg"
    },
    {
      id: 8,
      arabic: "مِيَاهُ الصَّرْفِ",
      latin: "Miyāhuṣ-Ṣarfi",
      meaning: "Air Limbah",
      category: "Masalah",
      sentence: "مِيَاهُ الصَّرْفِ الصِّنَاعِيَّةِ يَجِبُ مُعَالَجَتُهَا قَبْلَ صَبِّهَا فِي النَّهْرِ.",
      sentenceTranslation: "Air limbah industri harus diolah sebelum dialirkan ke sungai.",
      svgKey: "air_limbah",
      image: "img-air-limbah.jpg"
    },
    {
      id: 9,
      arabic: "نُفَايَةٌ",
      latin: "Nufāyatun",
      meaning: "Sampah / Limbah",
      category: "Masalah",
      sentence: "يَجِبُ وَضْعُ النُّفَايَةِ فِي كِيسٍ مُغْلَقٍ وَرَمْيُهَا فِي سَلَّةِ الْمُهْمَلاَتِ.",
      sentenceTranslation: "Sampah harus dimasukkan ke kantong tertutup dan dibuang di tempat sampah.",
      svgKey: "sampah",
      image: "img-sampah.jpg"
    },
    {
      id: 10,
      arabic: "مَاءٌ نَقِيٌّ",
      latin: "Mā'un Naqiyyun",
      meaning: "Air Bersih",
      category: "Kondisi",
      sentence: "الْمَاءُ النَّقِيُّ ضَرُورِيٌّ لِلشُّرْبِ وَالْحَيَاةِ الصِّحِّيَّةِ.",
      sentenceTranslation: "Air bersih sangat penting untuk konsumsi dan hidup sehat.",
      svgKey: "air_bersih",
      image: "img-air-bersih.jpg"
    },
    {
      id: 11,
      arabic: "الْبِيئَةُ",
      latin: "Al-Bī'ah",
      meaning: "Lingkungan Hidup",
      category: "Umum",
      sentence: "الْبِيئَةُ النَّظِيفَةُ تَجْعَلُ الْحَيَاةَ صِحِّيَّةً.",
      sentenceTranslation: "Lingkungan yang bersih membuat kehidupan menjadi sehat.",
      svgKey: "lingkungan",
      image: "img-lingkungan.jpg"
    },
    {
      id: 12,
      arabic: "الْحِفَاظُ عَلَى الْبِيئَةِ",
      latin: "Al-Ḥifāẓu 'ala al-bī'ah",
      meaning: "Pelestarian Lingkungan",
      category: "Aksi",
      sentence: "الْحِفَاظُ عَلَى الْبِيئَةِ وَاجِبٌ عَلَى كُلِّ إِ نْسَانٍ.",
      sentenceTranslation: "Pelestarian lingkungan adalah kewajiban bagi setiap manusia.",
      svgKey: "pelestarian",
      image: "img-lingkungan.jpg"
    },
    {
      id: 13,
      arabic: "النَّظَافَةُ",
      latin: "An-Naẓāfah",
      meaning: "Kebersihan",
      category: "Nilai",
      sentence: "النَّظَافَةُ مِنَ الإِيمَانِ.",
      sentenceTranslation: "Kebersihan itu sebagian dari iman.",
      svgKey: "kebersihan",
      image: "img-kebersihan.jpg"
    },
    {
      id: 14,
      arabic: "غَرْسُ الأَشْجَارِ",
      latin: "Ġarsul Asy-jār",
      meaning: "Menanam Pohon / Penghijauan",
      category: "Aksi",
      sentence: "يَقُومُ الطُّلاَّبُ بِغَرْسِ الأَشْجَارِ فِي حَدِيقَةِ الْمَدْرَسَةِ.",
      sentenceTranslation: "Para siswa melakukan penanaman pohon di taman sekolah.",
      svgKey: "reboisasi",
      image: "img-menanam-pohon.jpg"
    },
    {
      id: 15,
      arabic: "تَدْوِيرُ النَّفَايَاتِ",
      latin: "Tadwīrul Nafāyāt",
      meaning: "Daur Ulang Sampah",
      category: "Solusi",
      sentence: "تَدْوِيرُ النَّفَايَاتِ يُقَلِّلُ مِنَ التَّلَوُّثِ.",
      sentenceTranslation: "Daur ulang sampah mengurangi pencemaran.",
      svgKey: "sampah",
      image: "img-daur-ulang.jpg"
    },
    {
      id: 16,
      arabic: "تَرْشِيدُ اسْتِهْلاَكِ الْمَاءِ",
      latin: "Tarsyīdu istihlākil mā'",
      meaning: "Penghematan Air",
      category: "Solusi",
      sentence: "يَجِبُ عَلَيْنَا تَرْشِيدُ اسْتِهْلاَكِ الْمَاءِ كُلَّ يَوْمٍ.",
      sentenceTranslation: "Kita harus menghemat penggunaan air setiap hari.",
      svgKey: "air_bersih",
      image: "img-penghematan-air.jpg"
    },
    {
      id: 17,
      arabic: "سَلَّةُ الْمُهْمَلاَتِ",
      latin: "Sallatul Muhmalāt",
      meaning: "Tempat Sampah",
      category: "Alat",
      sentence: "تُوجَدُ سَلَّةُ الْمُهْمَلاَتِ فِي كُلِّ فَصْلٍ.",
      sentenceTranslation: "Terdapat tempat sampah di setiap kelas.",
      svgKey: "sampah",
      image: "img-tempat-sampah.jpg"
    }
  ],

  reading: {
    title: "الْحِفَاظُ عَلَى الْبِيئَةِ",
    titleTranslation: "Pelestarian Lingkungan Hidup",
    paragraphs: [
      {
        section: "امر الإسلام بالحفاظ على البيئة",
        arabic: "أَمَرَ الإِسْلاَمُ بِالْحِفَاظِ عَلَى الْبِيئَةِ وَنَهَى عَنْ إِفْسَادِهَا، وَإِفْسَادُ الْبِيئَةِ لَهُ صُوَرٌ مُتَعَدِّدَةٌ، مِنْهَا:\n• رَمْيُ النُّفَايَاتِ فِي النَّهْرِ أَوْ فِي الْبَحْرِ\n• رَمْيُ مِيَاهِ الصَّرْفِ فِي النَّهْرِ\n• إِحْرَاقُ الْغَابَاتِ وَالأَشْجَارِ لِغَيْرِ الْحَاجَةِ الضَّرُورِيَّةِ\nوَكُلُّ هَذِهِ الْمُمَارَسَاتِ تُفْسِدُ الْبِيئَةَ.",
        translation: "Islam memerintahkan untuk menjaga pelestarian lingkungan hidup dan melarang merusaknya. Kerusakan lingkungan memiliki berbagai bentuk, di antaranya:\n• Membuang sampah di sungai atau di laut\n• Membuang air limbah di sungai\n• Pembakaran hutan dan pepohonan tanpa kebutuhan yang mendesak\nDan seluruh tindakan ini merusak lingkungan hidup.",
        tokens: [
          { word: "أَمَرَ", color: "emerald", role: "فِعْلٌ مَاضٍ", roleDesc: "Kata Kerja Lampau (Fi'il Madhi)", irob: "فِعْلٌ مَاضٍ مَبْنِيٌّ عَلَى الْفَتْحِ الظَّاهِرِ عَلَى آخِرِهِ", meaning: "Telah memerintahkan" },
          { word: "الإِسْلاَمُ", color: "blue", role: "فَاعِلٌ (Subjek)", roleDesc: "Subjek pelaku dari 'Amara'", irob: "فَاعِلٌ مَرْفُوعٌ وَعَلاَمَةُ رَفْعِهِ الضَّمَّةُ الظَّاهِرَةُ عَلَى آخِرِهِ", meaning: "Agama Islam" },
          { word: "بِالْحِفَاظِ", color: "amber", role: "جَارٌّ وَمَجْرُورٌ", roleDesc: "Huruf Jar (الباء) + Isim Majrur", irob: "البَاءُ حَرْفُ جَرٍّ، الْحِفَاظِ اِسْمٌ مَجْرُورٌ بِالْبَاءِ وَعَلاَمَةُ جَرِّهِ الْكَسْرَةُ", meaning: "Dengan pelestarian" },
          { word: "عَلَى الْبِيئَةِ", color: "amber", role: "جَارٌّ وَمَجْرُورٌ", roleDesc: "Huruf Jar (على) + Isim Majrur", irob: "عَلَى حَرْفُ جَرٍّ، الْبِيئَةِ اِسْمٌ مَجْرُورٌ بِعَلَى وَعَلاَمَةُ جَرِّهِ الْكَسْرَةُ", meaning: "Atas lingkungan hidup" },
          { word: "وَنَهَى", color: "emerald", role: "حَرْفُ عَطْفٍ + فِعْلٌ مَاضٍ", roleDesc: "Kata Kerja Lampau (Melarang)", irob: "الوَاوُ حَرْفُ عَطْفٍ، نَهَى فِعْلٌ مَاضٍ مَبْنِيٌّ عَلَى الْفَتْحِ الْمُقَدَّرِ", meaning: "Dan telah melarang" },
          { word: "عَنْ إِفْسَادِهَا", color: "amber", role: "جَارٌّ وَمَجْرُورٌ وَمُضَافٌ إِلَيْهِ", roleDesc: "Huruf Jar (عن) + Majrur Mudhaf + Dhamir", irob: "عَنْ حَرْفُ جَرٍّ، إِفْسَادِ اِسْمٌ مَجْرُورٌ وَهُوَ مُضَافٌ، وَ(هَا) ضَمِيرٌ مُتَّصِلٌ فِي مَحَلِّ جَرِّ مُضَافٌ إِلَيْهِ", meaning: "Dari merusaknya" },
          { word: "وَإِفْسَادُ الْبِيئَةِ", color: "cyan", role: "مُبْتَدَأٌ + مُضَافٌ إِلَيْهِ", roleDesc: "Mubtada' Marfu' + Mudhaf Ilaih", irob: "إِفْسَادُ مُبْتَدَأٌ مَرْفُوعٌ بِالضَّمَّةِ وَهُوَ مُضَافٌ، الْبِيئَةِ مُضَافٌ إِلَيْهِ مَجْرُورٌ بِالْكَسْرَةِ", meaning: "Dan pengerusakan lingkungan" },
          { word: "لَهُ صُوَرٌ مُتَعَدِّدَةٌ، مِنْهَا:", color: "purple", role: "خَبَرُ الْمُبْتَدَأِ (مُؤَخَّرٌ) + نَعْتٌ + جَارٌّ وَمَجْرُورٌ", roleDesc: "Khabar Mu'akhkhar + Na'at (Di antaranya:)", irob: "صُوَرٌ مُبْتَدَأٌ مُؤَخَّرٌ مَرْفُوعٌ بِالضَّمَّةِ، مُتَعَدِّدَةٌ نَعْتٌ مَرْفُوعٌ، مِنْهَا جَارٌّ وَمَجْرُورٌ", meaning: "Memiliki bermacam-macam bentuk, di antaranya:" },
          { word: "• رَمْيُ النُّفَايَاتِ فِي النَّهْرِ أَوْ فِي الْبَحْرِ", color: "rose", role: "بَدَلٌ + مُضَافٌ إِلَيْهِ + جَارٌّ وَمَجْرُورٌ", roleDesc: "Bentuk Kerusakan 1", irob: "رَمْيُ بَدَلٌ مَرْفُوعٌ، النُّفَايَاتِ مُضَافٌ إِلَيْهِ، فِي النَّهْرِ جَارٌّ وَمَجْرُورٌ، أَوْ حَرْفُ عَطْفٍ", meaning: "Membuang sampah di sungai atau di laut" },
          { word: "• رَمْيُ مِيَاهِ الصَّرْفِ فِي النَّهْرِ", color: "rose", role: "بَدَلٌ + مُضَافٌ إِلَيْهِ ثَانٍ + جَارٌّ وَمَجْرُورٌ", roleDesc: "Bentuk Kerusakan 2", irob: "رَمْيُ بَدَلٌ مَرْفُوعٌ، مِيَاهِ مُضَافٌ إِلَيْهِ، الصَّرْفِ مُضَافٌ إِلَيْهِ ثَانٍ، فِي النَّهْرِ جَارٌّ وَمَجْرُورٌ", meaning: "Membuang air limbah di sungai" },
          { word: "• إِحْرَاقُ الْغَابَاتِ وَالأَشْجَارِ لِغَيْرِ الْحَاجَةِ الضَّرُورِيَّةِ", color: "rose", role: "بَدَلٌ + مَعْطُوفٌ + نَعْتٌ", roleDesc: "Bentuk Kerusakan 3", irob: "إِحْرَاقُ بَدَلٌ مَرْفُوعٌ، الْغَابَاتِ مُضَافٌ إِلَيْهِ، الأَشْجَارِ مَعْطُوفٌ، لِغَيْرِ جَارٌّ وَمَجْرُورٌ، الضَّرُورِيَّةِ نَعْتٌ", meaning: "Pembakaran hutan dan pepohonan tanpa kebutuhan mendesak" },
          { word: "وَكُلُّ هَذِهِ الْمُمَارَسَاتِ تُفْسِدُ الْبِيئَةَ", color: "emerald", role: "مُبْتَدَأٌ + بَدَلٌ + فِعْلٌ وَمَفْعُولٌ (خَبَرٌ)", roleDesc: "Kesimpulan: Seluruh tindakan ini merusak lingkungan", irob: "كُلُّ مُبْتَدَأٌ مَرْفُوعٌ، هَذِهِ اِسْمُ إِشَارَةٍ، الْمُمَارَسَاتِ بَدَلٌ، تُفْسِدُ فِعْلٌ، الْبِيئَةَ مَفْعُولٌ بِهِ", meaning: "Dan seluruh tindakan ini merusak lingkungan hidup" }
        ]
      },
      {
        section: "المشكلات البيئية عَالَمِيَّةٌ وأقسام التلوث",
        arabic: "وَفِي هَذَا الْعَصْرِ أَصْبَحَتِ الْبِيئَةُ تُوَاجِهُ مُشْكِلاَتٍ بِيئِيَّةً عَالَمِيَّةً، مِنْهَا: التَّصَحُّرُ، وَالتَّلَوُّثُ الْبِيئِيُّ، وَالإِحْتِبَاسُ الْحَرَارِيُّ. وَتَلَوُّثُ الْبِيئَةِ يُنْقَسِمُ إِلَى ثَلاَثَةِ أَقْسَامٍ، وَهِيَ: تَلَوُّثُ الْمَاءِ، وَتَلَوُّثُ الْهَوَاءِ، وَتَلَوُّثُ التُّرْبَةِ.",
        translation: "Di era modern ini, lingkungan hidup menghadapi permasalahan lingkungan global, di antaranya: penebangan hutan/deforestasi, pencemaran lingkungan, dan pemanasan global. Pencemaran lingkungan terbagi menjadi tiga jenis, yaitu: pencemaran air, pencemaran udara, dan pencemaran tanah.",
        tokens: [
          { word: "وَفِي هَذَا الْعَصْرِ", color: "amber", role: "جَارٌّ وَمَجْرُورٌ وَبَدَلٌ", roleDesc: "Keterangan Waktu (Di era modern ini)", irob: "فِي حَرْفُ جَرٍّ، هَذَا اِسْمُ إِشَارَةٍ مَبْنِيٌّ فِي مَحَلِّ جَرٍّ، الْعَصْرِ بَدَلٌ مَجْرُورٌ", meaning: "Dan di era modern ini" },
          { word: "أَصْبَحَتِ الْبِيئَةُ", color: "cyan", role: "فِعْلٌ نَاقِصٌ + اِسْمُ (أَصْبَحَ)", roleDesc: "Fi'il Naqis (Asbahat) + Isim Asbahat Marfu'", irob: "أَصْبَحَتِ فِعْلٌ مَاضٍ نَاقِصٌ، وَالتَّاءُ لِلتَّأْنِيثِ، الْبِيئَةُ اِسْمُ (أَصْبَحَ) مَرْفُوعٌ بِالضَّمَّةِ", meaning: "Lingkungan hidup menjadi" },
          { word: "تُوَاجِهُ مُشْكِلاَتٍ بِيئِيَّةً عَالَمِيَّةً", color: "emerald", role: "فِعْلٌ مُضَارِعٌ + مَفْعُولٌ بِهِ + نَعْتٌ", roleDesc: "Fi'il Mudhari' + Maf'ul Bih Manshub + Na'at (Sifat)", irob: "تُوَاجِهُ فِعْلٌ مُضَارِعٌ، مُشْكِلاَتٍ مَفْعُولٌ بِهِ مَنْصُوبٌ بِالْكَسْرَةِ (جَمْعُ مُؤَنَّثٍ سَالِمٍ)، بِيئِيَّةً عَالَمِيَّةً نَعْتَانِ مَنْصُوبَانِ", meaning: "Menghadapi permasalahan lingkungan global" },
          { word: "مِنْهَا: التَّصَحُّرُ، وَالتَّلَوُّثُ الْبِيئِيُّ، وَالإِحْتِبَاسُ الْحَرَارِيُّ", color: "purple", role: "خَبَرٌ مُقَدَّمٌ + مُبْتَدَأٌ مُؤَخَّرٌ + مَعْطُوفٌ", roleDesc: "Rincian Masalah Global (Deforestasi, Polusi, Pemanasan Global)", irob: "مِنْهَا جَارٌّ وَمَجْرُورٌ خَبَرٌ مُقَدَّمٌ، التَّصَحُّرُ مُبْتَدَأٌ مُؤَخَّرٌ مَرْفُوعٌ، التَّلَوُّثُ وَالإِحْتِبَاسُ مَعْطُوفَانِ مَرْفُوعَانِ", meaning: "Di antaranya: deforestasi, pencemaran lingkungan, dan pemanasan global" },
          { word: "وَتَلَوُّثُ الْبِيئَةِ", color: "cyan", role: "مُبْتَدَأٌ + مُضَافٌ إِلَيْهِ", roleDesc: "Mubtada' Marfu' + Mudhaf Ilaih", irob: "تَلَوُّثُ مُبْتَدَأٌ مَرْفُوعٌ بِالضَّمَّةِ وَهُوَ مُضَافٌ، الْبِيئَةِ مُضَافٌ إِلَيْهِ مَجْرُورٌ", meaning: "Dan pencemaran lingkungan" },
          { word: "يُنْقَسِمُ إِلَى ثَلاَثَةِ أَقْسَامٍ", color: "emerald", role: "فِعْلٌ مُضَارِعٌ + جَارٌّ وَمَجْرُورٌ (خَبَرٌ)", roleDesc: "Fi'il Mudhari' + Jar Majrur Mudhaf Ilaih", irob: "يُنْقَسِمُ فِعْلٌ مُضَارِعٌ مَرْفُوعٌ، إِلَى ثَلاَثَةِ جَارٌّ وَمَجْرُورٌ وَهُوَ مُضَافٌ، أَقْسَامٍ مُضَافٌ إِلَيْهِ مَجْرُورٌ", meaning: "Terbagi menjadi tiga jenis" },
          { word: "تَلَوُّثُ الْمَاءِ، وَتَلَوُّثُ الْهَوَاءِ، وَتَلَوُّثُ التُّرْبَةِ", color: "amber", role: "بَدَلٌ + مَعْطُوفَاتٌ", roleDesc: "Rincian 3 Jenis Polusi (Air, Udara, Tanah)", irob: "تَلَوُّثُ بَدَلٌ مَرْفُوعٌ، الْمَاءِ مُضَافٌ إِلَيْهِ، تَلَوُّثُ الْهَوَاءِ وَالتُّرْبَةِ مَعْطُوفَانِ", meaning: "Pencemaran air, pencemaran udara, dan pencemaran tanah" }
        ]
      },
      {
        section: "١. تَلَوُّثُ الْمَاءِ",
        arabic: "١. تَلَوُّثُ الْمَاءِ:\nظَهَرَ تَلَوُّثُ الْمَاءِ بِسَبَبِ رَمْيِ النُّفَايَاتِ وَمِيَاهِ الصَّرْفِ فِي النَّهْرِ أَوْ فِي الْبَحْرِ، وَهَذَا أَدَّى إِلَى قِلَّةِ الْمَاءِ النَّقِيِّ.",
        translation: "1. Pencemaran Air:\nPencemaran air muncul akibat pembuangan sampah dan air limbah di sungai atau laut, dan hal ini menyebabkan berkurangnya ketersediaan air bersih.",
        tokens: [
          { word: "١. تَلَوُّثُ الْمَاءِ", color: "cyan", role: "مُبْتَدَأٌ + مُضَافٌ إِلَيْهِ", roleDesc: "Judul Bagian 1: Pencemaran Air", irob: "تَلَوُّثُ مُبْتَدَأٌ مَرْفُوعٌ بِالضَّمَّةِ، الْمَاءِ مُضَافٌ إِلَيْهِ مَجْرُورٌ", meaning: "1. Pencemaran Air" },
          { word: "ظَهَرَ تَلَوُّثُ الْمَاءِ", color: "emerald", role: "فِعْلٌ مَاضٍ + فَاعِلٌ + مُضَافٌ إِلَيْهِ", roleDesc: "Fi'il Madhi (Muncul) + Fa'il (Pencemaran Air)", irob: "ظَهَرَ فِعْلٌ مَاضٍ مَبْنِيٌّ عَلَى الْفَتْحِ، تَلَوُّثُ فَاعِلٌ مَرْفُوعٌ، الْمَاءِ مُضَافٌ إِلَيْهِ مَجْرُورٌ", meaning: "Pencemaran air muncul" },
          { word: "بِسَبَبِ رَمْيِ النُّفَايَاتِ وَمِيَاهِ الصَّرْفِ", color: "amber", role: "جَارٌّ وَمَجْرُورٌ + مُضَافٌ إِلَيْهِ", roleDesc: "Sebab: Akibat pembuangan sampah & air limbah", irob: "البَاءُ حَرْفُ جَرٍّ، سَبَبِ مَجْرُورٌ وَهُوَ مُضَافٌ، رَمْيِ مُضَافٌ إِلَيْهِ وَهُوَ مُضَافٌ، النُّفَايَاتِ مُضَافٌ إِلَيْهِ", meaning: "Akibat pembuangan sampah dan air limbah" },
          { word: "فِي النَّهْرِ أَوْ فِي الْبَحْرِ", color: "amber", role: "جَارٌّ وَمَجْرُورٌ وَمَعْطُوفٌ", roleDesc: "Keterangan Tempat Pembuangan", irob: "فِي النَّهْرِ جَارٌّ وَمَجْرُورٌ، أَوْ حَرْفُ عَطْفٍ، فِي الْبَحْرِ مَعْطُوفٌ", meaning: "Di sungai atau di laut" },
          { word: "وَهَذَا أَدَّى إِلَى قِلَّةِ الْمَاءِ النَّقِيِّ", color: "purple", role: "اِسْمُ إِشَارَةٍ + فِعْلٌ + جَارٌّ وَمَجْرُورٌ + نَعْتٌ", roleDesc: "Dampak: Menyebabkan berkurangnya air bersih", irob: "هَذَا مُبْتَدَأٌ، أَدَّى فِعْلٌ مَاضٍ، إِلَى قِلَّةِ جَارٌّ وَمَجْرُورٌ، الْمَاءِ مُضَافٌ إِلَيْهِ، النَّقِيِّ نَعْتٌ مَجْرُورٌ", meaning: "Dan hal ini menyebabkan berkurangnya ketersediaan air bersih" }
        ]
      },
      {
        section: "٢. تَلَوُّثُ الْهَوَاءِ",
        arabic: "٢. تَلَوُّثُ الْهَوَاءِ:\nظَهَرَ تَلَوُّثُ الْهَوَاءِ بِسَبَبِ الدُّخَانِ وَالأَبْخِرَةِ الْمُتَصَاعِدَةِ مِنَ الْمَصَانِعِ وَمُحَرِّكَاتِ السَّيَّارَاتِ وَالطَّائِرَاتِ وَغَيْرِهَا، وَيَزْدَادُ ظُهُورُ هَذَا التَّلَوُّثِ فِي الْمُدُنِ الصِّنَاعِيَّةِ.",
        translation: "2. Pencemaran Udara:\nPencemaran udara muncul akibat asap dan uap yang membumbung dari pabrik-pabrik, mesin kendaraan bermotor, pesawat terbang, dan lainnya. Pencemaran ini semakin meningkat di kota-kota industri.",
        tokens: [
          { word: "٢. تَلَوُّثُ الْهَوَاءِ", color: "cyan", role: "مُبْتَدَأٌ + مُضَافٌ إِلَيْهِ", roleDesc: "Judul Bagian 2: Pencemaran Udara", irob: "تَلَوُّثُ مُبْتَدَأٌ مَرْفُوعٌ، الْهَوَاءِ مُضَافٌ إِلَيْهِ مَجْرُورٌ", meaning: "2. Pencemaran Udara" },
          { word: "ظَهَرَ تَلَوُّثُ الْهَوَاءِ", color: "emerald", role: "فِعْلٌ مَاضٍ + فَاعِلٌ + مُضَافٌ إِلَيْهِ", roleDesc: "Fi'il Madhi + Fa'il", irob: "ظَهَرَ فِعْلٌ مَاضٍ، تَلَوُّثُ فَاعِلٌ مَرْفُوعٌ، الْهَوَاءِ مُضَافٌ إِلَيْهِ", meaning: "Pencemaran udara muncul" },
          { word: "بِسَبَبِ الدُّخَانِ وَالأَبْخِرَةِ الْمُتَصَاعِدَةِ", color: "amber", role: "جَارٌّ وَمَجْرُورٌ + نَعْتٌ", roleDesc: "Sebab: Asap dan uap yang membumbung", irob: "بِسَبَبِ جَارٌّ وَمَجْرُورٌ وَهُوَ مُضَافٌ، الدُّخَانِ مُضَافٌ إِلَيْهِ، الأَبْخِرَةِ مَعْطُوفٌ، الْمُتَصَاعِدَةِ نَعْتٌ", meaning: "Akibat asap dan uap yang membumbung" },
          { word: "مِنَ الْمَصَانِعِ وَمُحَرِّكَاتِ السَّيَّارَاتِ وَالطَّائِرَاتِ", color: "purple", role: "جَارٌّ وَمَجْرُورٌ وَمَعْطُوفَاتٌ", roleDesc: "Sumber Polusi (Pabrik, Mesin Mobil, Pesawat)", irob: "مِنَْ الْمَصَانِعِ جَارٌّ وَمَجْرُورٌ، وَمُحَرِّكَاتِ مَعْطُوفٌ وَهُوَ مُضَافٌ، السَّيَّارَاتِ وَالطَّائِرَاتِ مُضَافٌ إِلَيْهِ وَمَعْطُوفٌ", meaning: "Dari pabrik-pabrik, mesin mobil, dan pesawat terbang" },
          { word: "وَيَزْدَادُ ظُهُورُ هَذَا التَّلَوُّثِ فِي الْمُدُنِ الصِّنَاعِيَّةِ", color: "emerald", role: "فِعْلٌ مُضَارِعٌ + فَاعِلٌ + جَارٌّ وَمَجْرُورٌ + نَعْتٌ", roleDesc: "Meningkatnya polusi di kota industri", irob: "يَزْدَادُ فِعْلٌ مُضَارِعٌ مَرْفُوعٌ، ظُهُورُ فَاعِلٌ مَرْفُوعٌ، فِي الْمُدُنِ جَارٌّ وَمَجْرُورٌ، الصِّنَاعِيَّةِ نَعْتٌ مَجْرُورٌ", meaning: "Dan pencemaran ini semakin meningkat di kota-kota industri" }
        ]
      },
      {
        section: "٣. تَلَوُّثُ التُّرْبَةِ",
        arabic: "٣. تَلَوُّثُ التُّرْبَةِ:\nظَهَرَ تَلَوُّثُ التُّرْبَةِ بِسَبَبِ النُّفَايَاتِ أَوِ الْمَوَادِّ الْكِيْمِيَاوِيَّةِ الَّتِي تُلْقَى أَوْ تُدْفَنُ فِي الأَرْضِ.",
        translation: "3. Pencemaran Tanah:\nPencemaran tanah muncul akibat sampah atau bahan-bahan kimia yang dibuang atau ditimbun di dalam tanah.",
        tokens: [
          { word: "٣. تَلَوُّثُ التُّرْبَةِ", color: "cyan", role: "مُبْتَدَأٌ + مُضَافٌ إِلَيْهِ", roleDesc: "Judul Bagian 3: Pencemaran Tanah", irob: "تَلَوُّثُ مُبْتَدَأٌ مَرْفُوعٌ، التُّرْبَةِ مُضَافٌ إِلَيْهِ مَجْرُورٌ", meaning: "3. Pencemaran Tanah" },
          { word: "ظَهَرَ تَلَوُّثُ التُّرْبَةِ", color: "emerald", role: "فِعْلٌ مَاضٍ + فَاعِلٌ", roleDesc: "Fi'il Madhi + Fa'il", irob: "ظَهَرَ فِعْلٌ مَاضٍ مَبْنِيٌّ، تَلَوُّثُ فَاعِلٌ مَرْفُوعٌ، التُّرْبَةِ مُضَافٌ إِلَيْهِ", meaning: "Pencemaran tanah muncul" },
          { word: "بِسَبَبِ النُّفَايَاتِ أَوِ الْمَوَادِّ الْكِيْمِيَاوِيَّةِ", color: "amber", role: "جَارٌّ وَمَجْرُورٌ + نَعْتٌ", roleDesc: "Sebab: Sampah atau bahan kimia", irob: "بِسَبَبِ جَارٌّ وَمَجْرُورٌ، النُّفَايَاتِ مُضَافٌ إِلَيْهِ، أَوِ حَرْفُ عَطْفٍ، الْمَوَادِّ مَعْطُوفٌ، الْكِيْمِيَاوِيَّةِ نَعْتٌ", meaning: "Akibat sampah atau bahan-bahan kimia" },
          { word: "الَّتِي تُلْقَى أَوْ تُدْفَنُ فِي الأَرْضِ", color: "purple", role: "اِسْمٌ مَوْصُولٌ + فِعْلٌ مَبْنِيٌّ لِلْمَجْهُولِ + جَارٌّ وَمَجْرُورٌ", roleDesc: "Isim Maushul + Fi'il Majhul (Dibuang / Ditimbun)", irob: "الَّتِي اِسْمٌ مَوْصُولٌ، تُلْقَى فِعْلٌ مُضَارِعٌ مَبْنِيٌّ لِلْمَجْهُولِ، فِي الأَرْضِ جَارٌّ وَمَجْرُورٌ", meaning: "Yang dibuang atau ditimbun di dalam tanah" }
        ]
      },
      {
        section: "مسؤولية الشباب في حماية البيئة",
        arabic: "وَلِلشَّبَابِ مَسْؤُولِيَّةٌ عَظِيمَةٌ لِحِمَايَةِ الْبِيئَةِ وَالْعَمَلِ عَلَيْهَا. الشَّبَابُ هُوَ أَهَمُّ عُنْصُرٍ فِي عَمَلِيَّةِ التَّنْمِيَةِ الإِجْتِمَاعِيَّةِ الْمُعَاصِرَةِ. وَمِنْ أَهَمِّهَا هُوَ الْحِفَاظُ عَلَى الْبِيئَةِ وَحِمَايَتُهَا.",
        translation: "Pemuda memiliki tanggung jawab yang besar untuk melindungi lingkungan hidup dan mengupayakannya. Pemuda merupakan elemen terpenting dalam proses pembangunan sosial modern, dan salah satu yang terpenting adalah menjaga dan melindungi lingkungan hidup.",
        tokens: [
          { word: "وَلِلشَّبَابِ مَسْؤُولِيَّةٌ عَظِيمَةٌ", color: "blue", role: "خَبَرٌ مُقَدَّمٌ + مُبْتَدَأٌ مُؤَخَّرٌ + نَعْتٌ", roleDesc: "Tanggung Jawab Pemuda (Mubtada' Mu'akhkhar + Khabar)", irob: "لِلشَّبَابِ جَارٌّ وَمَجْرُورٌ خَبَرٌ مُقَدَّمٌ، مَسْؤُولِيَّةٌ مُبْتَدَأٌ مُؤَخَّرٌ مَرْفُوعٌ، عَظِيمَةٌ نَعْتٌ مَرْفُوعٌ", meaning: "Dan pemuda memiliki tanggung jawab yang besar" },
          { word: "لِحِمَايَةِ الْبِيئَةِ وَالْعَمَلِ عَلَيْهَا", color: "amber", role: "جَارٌّ وَمَجْرُورٌ + مَعْطُوفٌ", roleDesc: "Tujuan: Untuk melindungi lingkungan hidup", irob: "لِحِمَايَةِ جَارٌّ وَمَجْرُورٌ وَهُوَ مُضَافٌ، الْبِيئَةِ مُضَافٌ إِلَيْهِ، وَالْعَمَلِ مَعْطُوفٌ، عَلَيْهَا جَارٌّ وَمَجْرُورٌ", meaning: "Untuk melindungi lingkungan hidup dan mengupayakannya" },
          { word: "الشَّبَابُ هُوَ أَهَمُّ عُنْصُرٍ", color: "cyan", role: "مُبْتَدَأٌ + ضَمِيرُ فَصْلٍ + خَبَرٌ (إِسْمُ تَفْضِيْلٍ)", roleDesc: "Isim Tafdhil Superlatif (Pemuda adalah elemen terpenting)", irob: "الشَّبَابُ مُبْتَدَأٌ، هُوَ ضَمِيرُ فَصْلٍ، أَهَمُّ خَبَرٌ مَرْفُوعٌ (إِسْمُ تَفْضِيْلٍ) وَهُوَ مُضَافٌ، عُنْصُرٍ مُضَافٌ إِلَيْهِ", meaning: "Pemuda merupakan elemen terpenting" },
          { word: "فِي عَمَلِيَّةِ التَّنْمِيَةِ الإِجْتِمَاعِيَّةِ الْمُعَاصِرَةِ", color: "purple", role: "جَارٌّ وَمَجْرُورٌ + مُضَافٌ إِلَيْهِ + نَعْتَانِ", roleDesc: "Dalam proses pembangunan sosial modern", irob: "فِي عَمَلِيَّةِ جَارٌّ وَمَجْرُورٌ، التَّنْمِيَةِ مُضَافٌ إِلَيْهِ، الإِجْتِمَاعِيَّةِ وَالْمُعَاصِرَةِ نَعْتَانِ مَجْرُورَانِ", meaning: "Dalam proses pembangunan sosial modern" },
          { word: "وَمِنْ أَهَمِّهَا هُوَ الْحِفَاظُ عَلَى الْبِيئَةِ وَحِمَايَتُهَا", color: "emerald", role: "خَبَرٌ مُقَدَّمٌ + مُبْتَدَأٌ مُؤَخَّرٌ + مَعْطُوفٌ", roleDesc: "Salah satu terpenting adalah menjaga lingkungan", irob: "مِنْ أَهَمِّهَا خَبَرٌ مُقَدَّمٌ، الْحِفَاظُ مُبْتَدَأٌ مُؤَخَّرٌ مَرْفُوعٌ، عَلَى الْبِيئَةِ جَارٌّ وَمَجْرُورٌ، وَحِمَايَتُهَا مَعْطُوفٌ", meaning: "Dan salah satu yang terpenting adalah menjaga dan melindungi lingkungan hidup" }
        ]
      }
    ]
  },

  grammar: {
    title: "القواعد: فِعْلُ الأَمْرِ، فِعْلُ النَّهْيِ، وَإِسْمُ التَّفْضِيْلِ",
    subtitle: "Grammar Bahasa Arab: Kata Kerja Perintah (Fi'il Amr), Larangan (Fi'il Nahi), & Isim Tafdhil",
    explanation: "Dalam tema Pelestarian Lingkungan, kita menguasai Kalimat Perintah untuk mengajak kebaikan, Kalimat Larangan untuk mencegah kerusakan, serta Isim Tafdhil untuk membandingkan tingkat sifat (lebih / paling).",
    sections: [
      {
        type: "Fi'il Amr (فِعْلُ الأَمْرِ)",
        theme: "emerald",
        desc: "Kata kerja yang digunakan untuk memerintah/meminta seseorang melakukan tindakan pelestarian lingkungan.",
        badge: "Pola: فِعْلُ الأَمْرِ (Perintah)",
        examples: [
          {
            arabic: "احْرِصْ عَلَى النَّظَافَةِ!",
            targetArabic: "احْرِصْ",
            targetRole: "فِعْلُ أَمْرٍ",
            roleDesc: "Kata Kerja Perintah (Mabni 'ala Sukun)",
            latin: "Iḥriṣ 'alan-naẓāfah!",
            targetLatin: "Iḥriṣ",
            indonesian: "Jagalah kebersihan!",
            targetIndonesian: "Jagalah",
            explanation: "Kata «احْرِصْ» adalah Fi'il Amr yang menunjukkan perintah langsung: 'Jagalah!' (untuk mufrad mudzakkar)."
          },
          {
            arabic: "اِغْرِسِ الأَشْجَارَ فِي الْحَدِيقَةِ!",
            targetArabic: "اِغْرِسِ",
            targetRole: "فِعْلُ أَمْرٍ",
            roleDesc: "Kata Kerja Perintah (Dikasrahkan karena washal/pertemuan dua sukun)",
            latin: "Iġrisil-asy-jāra fil-ḥadīqah!",
            targetLatin: "Iġris",
            indonesian: "Tanamlah pohon di taman!",
            targetIndonesian: "Tanamlah",
            explanation: "Kata «اِغْرِسِ» adalah Fi'il Amr: 'Tanamlah!'. Harakat asalnya sukun, berubah kasrah untuk menyambung alif lam."
          },
          {
            arabic: "حَافِظُوا عَلَى نَظَافَةِ الْمَدْرَسَةِ!",
            targetArabic: "حَافِظُوا",
            targetRole: "فِعْلُ أَمْرٍ لِلْجَمْعِ",
            roleDesc: "Kata Kerja Perintah Jamak (Mabni Hadzf Nun)",
            latin: "Ḥāfiẓū 'alā naẓāfatil-madrasah!",
            targetLatin: "Ḥāfiẓū",
            indonesian: "Jagalah (kalian) kebersihan sekolah!",
            targetIndonesian: "Jagalah (kalian)",
            explanation: "Kata «حَافِظُوا» adalah Fi'il Amr untuk dhomir Jamak (Antum / kalian): 'Jagalah kalian!'."
          }
        ]
      },
      {
        type: "Fi'il Nahi (فِعْلُ النَّهْيِ)",
        theme: "rose",
        desc: "Kata kerja yang digunakan untuk melarang seseorang merusak lingkungan (Pola: لاَ + الفعل المضارع المجزوم).",
        badge: "Pola: لاَ النَّاهِيَة + مُضَارِع مَجْزُوم",
        examples: [
          {
            arabic: "لاَ تَرْمِ الْقُمَامَةَ فِي الشَّارِعِ!",
            targetArabic: "لاَ تَرْمِ",
            targetRole: "فِعْلُ نَهْيٍ",
            roleDesc: "Larangan (Jazm dengan membuang huruf 'illat)",
            latin: "Lā tarmi al-qumāmata fisy-syāri'!",
            targetLatin: "Lā tarmi",
            indonesian: "Jangan buang sampah di jalan!",
            targetIndonesian: "Jangan buang",
            explanation: "Frasa «لاَ تَرْمِ» adalah Fi'il Nahi: 'Jangan membuang!'. Huruf ya' di akhir dibuang karena jazm."
          },
          {
            arabic: "لاَ تُسْرِفْ فِي اسْتِهْلاَكِ الْمَاءِ!",
            targetArabic: "لاَ تُسْرِفْ",
            targetRole: "فِعْلُ نَهْيٍ",
            roleDesc: "Larangan (Jazm dengan tanda sukun)",
            latin: "Lā tusrif fī istihlākil-mā'!",
            targetLatin: "Lā tusrif",
            indonesian: "Jangan boros dalam menggunakan air!",
            targetIndonesian: "Jangan boros",
            explanation: "Frasa «لاَ تُسْرِفْ» adalah Fi'il Nahi: 'Jangan berlebih-lebihan/boros!'. Huruf fa' disukunkan karena jazm."
          },
          {
            arabic: "لاَ تَقْطَعُوا الأَشْجَارَ عَبَثًا!",
            targetArabic: "لاَ تَقْطَعُوا",
            targetRole: "فِعْلُ نَهْيٍ لِلْجَمْعِ",
            roleDesc: "Larangan Jamak (Jazm dengan membuang nun)",
            latin: "Lā taqṭa'ūl-asy-jāra 'abaṡan!",
            targetLatin: "Lā taqṭa'ū",
            indonesian: "Janganlah kalian memotong pohon sembarangan!",
            targetIndonesian: "Janganlah kalian memotong",
            explanation: "Frasa «لاَ تَقْطَعُوا» adalah Fi'il Nahi Jamak untuk kalian: 'Janganlah kalian memotong!'."
          }
        ]
      }
    ],
    tafdhil: {
      badge: "لَاحِظْ",
      title: "إِسْمُ التَّفْضِيْلِ",
      source: "الشيخ مصطفى الغلاييني - جامع الدروس العربية، بيروت: دار الكتب العلمية، ٢٠١٢",
      instruction: "Perhatikan contoh kalimat pada kedua kolom di bawah ini! Fokuskan perhatian pada kata/frasa yang disorot warna:",
      pattern: "أَفْعَلُ",
      columnA: {
        title: "A",
        label: "Bentuk Komparatif (Lebih ... dari ...)",
        color: "amber",
        rule: "أَفْعَلُ + مِنْ + إِسْمٌ",
        ruleDesc: "Isim Tafdhil + Harf Jar مِنْ + Isim Pembanding",
        meaningGuide: "Menyatakan bahwa suatu hal memiliki kelebihan sifat dibandingkan obyek lainnya.",
        examples: [
          {
            arabic: "أَنَا أَجْمَلُ مِنْكَ",
            targetArabic: "أَجْمَلُ مِنْ",
            targetRole: "إِسْمُ تَفْضِيْلٍ + مِنْ",
            roleDesc: "Pola Komparatif: أَفْعَلُ مِنْ (Lebih tampan/indah dari)",
            indonesian: "Aku lebih tampan/indah dari kamu.",
            targetIndonesian: "lebih tampan/indah dari",
            breakdown: [
              { label: "Mufadhdhal (Subjek)", text: "أَنَا", desc: "Pihak yang diunggulkan (Aku)" },
              { label: "Isim Tafdhil", text: "أَجْمَلُ", desc: "Wazan أَفْعَلُ (lebih tampan/indah)" },
              { label: "Harf Pembanding", text: "مِنْ", desc: "Huruf jar pembanding (daripada/dari)" },
              { label: "Mufadhdhal 'Alaih", text: "كَ", desc: "Obyek pembanding (kamu)" }
            ]
          },
          {
            arabic: "خَالِدٌ أَكْبَرُ مِنْ أَخِيْهِ",
            targetArabic: "أَكْبَرُ مِنْ",
            targetRole: "إِسْمُ تَفْضِيْلٍ + مِنْ",
            roleDesc: "Pola Komparatif: أَفْعَلُ مِنْ (Lebih besar dari)",
            indonesian: "Khalid lebih besar dari saudaranya.",
            targetIndonesian: "lebih besar dari",
            breakdown: [
              { label: "Mufadhdhal (Subjek)", text: "خَالِدٌ", desc: "Pihak yang diunggulkan (Khalid)" },
              { label: "Isim Tafdhil", text: "أَكْبَرُ", desc: "Wazan أَفْعَلُ (lebih besar)" },
              { label: "Harf Pembanding", text: "مِنْ", desc: "Huruf jar pembanding (daripada/dari)" },
              { label: "Mufadhdhal 'Alaih", text: "أَخِيْهِ", desc: "Obyek pembanding (saudaranya)" }
            ]
          },
          {
            arabic: "مَدْرَسَتِيْ أَوْسَعُ مِنْ مَدْرَسَتِكَ",
            targetArabic: "أَوْسَعُ مِنْ",
            targetRole: "إِسْمُ تَفْضِيْلٍ + مِنْ",
            roleDesc: "Pola Komparatif: أَفْعَلُ مِنْ (Lebih luas dari)",
            indonesian: "Sekolahku lebih luas dari sekolahmu.",
            targetIndonesian: "lebih luas dari",
            breakdown: [
              { label: "Mufadhdhal (Subjek)", text: "مَدْرَسَتِيْ", desc: "Pihak yang diunggulkan (Sekolahku)" },
              { label: "Isim Tafdhil", text: "أَوْسَعُ", desc: "Wazan أَفْعَلُ (lebih luas)" },
              { label: "Harf Pembanding", text: "مِنْ", desc: "Huruf jar pembanding (daripada/dari)" },
              { label: "Mufadhdhal 'Alaih", text: "مَدْرَسَتِكَ", desc: "Obyek pembanding (sekolahmu)" }
            ]
          }
        ]
      },
      columnB: {
        title: "B",
        label: "Bentuk Superlatif (Paling / Ter...)",
        color: "emerald",
        rule: "أَفْعَلُ + جَمْعٌ",
        ruleDesc: "Isim Tafdhil + Isim Jamak (Mudhaf Ilaih Majrur)",
        meaningGuide: "Menyatakan bahwa suatu hal memiliki sifat PALING / TER- di antara seluruh anggota kelompoknya.",
        examples: [
          {
            arabic: "فَصْلِيْ أَوْسَعُ الْفُصُوْلِ فِي الْمَدْرَسَةِ",
            targetArabic: "أَوْسَعُ الْفُصُوْلِ",
            targetRole: "إِسْمُ تَفْضِيْلٍ + جَمْعٌ",
            roleDesc: "Pola Superlatif: أَفْعَلُ + Jamak (Paling luas / terluas)",
            indonesian: "Kelasku adalah kelas paling luas di sekolah.",
            targetIndonesian: "paling luas",
            breakdown: [
              { label: "Mufadhdhal (Subjek)", text: "فَصْلِيْ", desc: "Pihak yang diunggulkan (Kelasku)" },
              { label: "Isim Tafdhil", text: "أَوْسَعُ", desc: "Wazan أَفْعَلُ (paling luas/terluas)" },
              { label: "Jamak (Mudhaf Ilaih)", text: "الْفُصُوْلِ", desc: "Kelompok pembanding (kelas-kelas)" },
              { label: "Keterangan", text: "فِي الْمَدْرَسَةِ", desc: "Lingkup di lingkungan sekolah" }
            ]
          },
          {
            arabic: "أَنَا أَجْمَلُ التَّلَامِيْذِ فِي الْفَصْلِ",
            targetArabic: "أَجْمَلُ التَّلَامِيْذِ",
            targetRole: "إِسْمُ تَفْضِيْلٍ + جَمْعٌ",
            roleDesc: "Pola Superlatif: أَفْعَلُ + Jamak (Paling tampan / tertampan)",
            indonesian: "Aku murid paling tampan di kelas.",
            targetIndonesian: "paling tampan",
            breakdown: [
              { label: "Mufadhdhal (Subjek)", text: "أَنَا", desc: "Pihak yang diunggulkan (Aku)" },
              { label: "Isim Tafdhil", text: "أَجْمَلُ", desc: "Wazan أَفْعَلُ (paling tampan/tertampan)" },
              { label: "Jamak (Mudhaf Ilaih)", text: "التَّلَامِيْذِ", desc: "Kelompok pembanding (murid-murid)" },
              { label: "Keterangan", text: "فِي الْفَصْلِ", desc: "Lingkup di dalam kelas" }
            ]
          },
          {
            arabic: "سُوْرَبَايَا أَكْبَرُ الْمُدُنِ فِي جَاوَى الشَّرْقِيَّةِ",
            targetArabic: "أَكْبَرُ الْمُدُنِ",
            targetRole: "إِسْمُ تَفْضِيْلٍ + جَمْعٌ",
            roleDesc: "Pola Superlatif: أَفْعَلُ + Jamak (Kota terbesar)",
            indonesian: "Surabaya adalah kota terbesar di Jawa Timur.",
            targetIndonesian: "terbesar",
            breakdown: [
              { label: "Mufadhdhal (Subjek)", text: "سُوْرَبَايَا", desc: "Pihak yang diunggulkan (Kota Surabaya)" },
              { label: "Isim Tafdhil", text: "أَكْبَرُ", desc: "Wazan أَفْعَلُ (terbesar / paling besar)" },
              { label: "Jamak (Mudhaf Ilaih)", text: "الْمُدُنِ", desc: "Kelompok pembanding (kota-kota)" },
              { label: "Keterangan", text: "فِي جَاوَى الشَّرْقِيَّةِ", desc: "Lingkup di wilayah Jawa Timur" }
            ]
          }
        ]
      },
      keterangan: [
        {
          num: 1,
          text: "Untuk menyatakan arti kata LEBIH atau PALING/TER, maka harus menggunakan isim tafdhil dengan bentuk (wazan) sebagai berikut:",
          pattern: "أَفْعَلُ",
          derivations: [
            { base: "مَاهِرٌ", tafdhil: "أَمْهَرُ", meaning: "Mahir / Pintar → Lebih / Paling Pintar" },
            { base: "وَاسِعٌ", tafdhil: "أَوْسَعُ", meaning: "Luas → Lebih / Paling Luas" },
            { base: "جَمِيْلٌ", tafdhil: "أَجْمَلُ", meaning: "Indah/Tampan → Lebih / Paling Indah" }
          ]
        },
        {
          num: 2,
          text: "Adapun susunan kalimat pada kolom (A) [Komparatif], yaitu pola perbandingan dua hal:",
          formula: "أَفْعَلُ + مِنْ + إِسْمٌ",
          formulaParts: [
            { badge: "أَفْعَلُ", title: "Isim Tafdhil" },
            { badge: "+", title: "" },
            { badge: "مِنْ", title: "Huruf Pembanding (Daripada)" },
            { badge: "+", title: "" },
            { badge: "إِسْمٌ", title: "Obyek Pembanding" }
          ],
          meaning: "Isim Tafdhil + مِنْ + Isim (Bermakna: LEBIH ... DARI ...)",
          exampleFormula: "Contoh: مَدْرَسَتِيْ (أَوْسَعُ مِنْ) مَدْرَسَتِكَ = Sekolahku LEBIH LUAS DARI sekolahmu."
        },
        {
          num: 3,
          text: "Dan susunan kalimat pada kolom (B) [Superlatif], yaitu pola sifat tertinggi dalam kelompok:",
          formula: "أَفْعَلُ + جَمْعٌ",
          formulaParts: [
            { badge: "أَفْعَلُ", title: "Isim Tafdhil" },
            { badge: "+", title: "" },
            { badge: "جَمْعٌ", title: "Kata Jamak (Mudhaf Ilaih)" }
          ],
          meaning: "Isim Tafdhil + Kata Jamak (Bermakna: PALING / TER...)",
          exampleFormula: "Contoh: فَصْلِيْ (أَوْسَعُ الْفُصُوْلِ) = Kelasku PALING LUAS di antara seluruh kelas."
        }
      ]
    }
  },

  dialogues: [
    {
      id: 1,
      title: "الْحِوَارُ",
      instruction: "أُنْظُرْ وَاسْتَمِعْ وَ أَعِدْ.",
      instructionTranslation: "Lihat, dengarkan, dan ulangi.",
      topicImages: [
        {
          title: "الصُّوْرَةُ الأُولَى: التَّصَحُّرُ",
          translation: "Gambar Pertama: Deforestasi / Penggundulan Hutan",
          url: "img-penebangan-hutan.jpg",
          fallbackSvg: "penebangan"
        },
        {
          title: "الصُّوْرَةُ الثَّانِيَةُ: الْفَيَضَانُ",
          translation: "Gambar Kedua: Bencana Banjir",
          url: "img-banjir.jpg",
          fallbackSvg: "banjir"
        }
      ],
      lines: [
        {
          id: 1,
          speaker: "الْأُسْتَاذُ",
          role: "Guru (Ustadz)",
          avatar: "avatar-guru.jpg",
          bubbleColor: "amber",
          arabic: "أَيُّهَا التَّلاَمِيْذُ، أُنْظُرُوا إِلَى الصُّوْرَتَيْنِ.",
          translation: "Wahai murid-murid, lihatlah kedua gambar ini!"
        },
        {
          id: 2,
          speaker: "الْأُسْتَاذُ",
          role: "Guru (Ustadz)",
          avatar: "avatar-guru.jpg",
          bubbleColor: "red",
          arabic: "يَا حَمْزَةُ، مَاذَا تَرَى فِي الصُّوْرَةِ الأُولَى؟",
          translation: "Wahai Hamzah, apa yang kamu lihat pada gambar pertama?"
        },
        {
          id: 3,
          speaker: "حَمْزَةُ",
          role: "Siswa (Hamzah)",
          avatar: "avatar-siswa.jpg",
          bubbleColor: "emerald",
          arabic: "التَّصَحُّرُ.",
          translation: "Penggundulan hutan / Deforestasi."
        },
        {
          id: 4,
          speaker: "الْأُسْتَاذُ",
          role: "Guru (Ustadz)",
          avatar: "avatar-guru.jpg",
          bubbleColor: "emerald",
          arabic: "يَا عَبْدَ اللهِ، مَا رَأْيُكَ فِي الصُّوْرَةِ الأُولَى وَالثَّانِيَةِ؟",
          translation: "Wahai Abdullah, bagaimana pendapatmu tentang gambar pertama dan gambar kedua?"
        },
        {
          id: 5,
          speaker: "عَبْدُ اللهِ",
          role: "Siswa (Abdullah)",
          avatar: "avatar-siswa.jpg",
          bubbleColor: "blue",
          arabic: "كِلاَهُمَا بِمَا كَسَبَتْ أَيْدِي النَّاسِ.",
          translation: "Kedua bencana tersebut terjadi akibat ulah perbuatan tangan manusia."
        },
        {
          id: 6,
          speaker: "الْأُسْتَاذُ",
          role: "Guru (Ustadz)",
          avatar: "avatar-guru.jpg",
          bubbleColor: "purple",
          arabic: "صَحِيْحٌ يَا عَبْدَ اللهِ. حَمْدَانُ، أُذْكُرْ بَعْضَ الْوَسَائِلِ لِلْحِفَاظِ عَلَى الْبِيئَةِ.",
          translation: "Benar wahai Abdullah. Hamdan, sebutkan beberapa cara untuk melestarikan lingkungan!"
        },
        {
          id: 7,
          speaker: "حَمْدَانُ",
          role: "Siswa (Hamdan)",
          avatar: "avatar-siswa.jpg",
          bubbleColor: "orange",
          arabic: "أَوَّلاً – تَثْقِيْفُ الْمُجْتَمَعِ لِلْحِفَاظِ عَلَى الْبِيئَةِ.\nثَانِيًا – الاِسْتِفَادَةُ مِنَ الْمَوَارِدِ الطَّبِيعِيَّةِ بِدُونِ إِسْرَافٍ.\nثَالِثًا – الْمُحَافَظَةُ عَلَى الْبِيئَةِ مِنَ التَّلَوُّثِ.\nرَابِعًا – التَّشْجِيْرُ.",
          translation: "Pertama – Mengedukasi masyarakat untuk menjaga lingkungan.\nKedua – Memanfaatkan sumber daya alam tanpa pemborosan.\nKetiga – Menjaga lingkungan hidup dari pencemaran.\nKeempat – Penghijauan / Reboisasi."
        },
        {
          id: 8,
          speaker: "الْأُسْتَاذُ",
          role: "Guru (Ustadz)",
          avatar: "avatar-guru.jpg",
          bubbleColor: "sky",
          arabic: "أَحْسَنْتَ يَا حَمْدَانُ. لِذَلِكَ أَيُّهَا التَّلاَمِيْذُ، الْبِيئَةُ تَنْتَظِرُ دَوْرَكُمْ. عَلَيْكُمْ أَنْ تُحَافِظُوا عَلَى الْبِيئَةِ.",
          translation: "Bagus sekali wahai Hamdan! Oleh karena itu wahai murid-murid, lingkungan hidup menunggu peran kalian. Hendaknya kalian melestarikan lingkungan hidup."
        }
      ]
    }
  ],

  quizzes: [
    {
      id: 1,
      question: "مَا مَعْنَى كَلِمَةِ «الْبِيئَةِ» فِي اللُّغَةِ الْعَرَبِيَّةِ؟",
      options: [
        "النَّظَافَةُ وَالشَّوَارِعُ",
        "الْمَكَانُ وَالْمُحِيطُ الَّذِي يَعِيشُ فِيهِ الْإِنْسَانُ",
        "الْمَدْرَسَةُ وَالْفَصْلُ",
        "الْأَسْمَاكُ فِي الْبَحْرِ"
      ],
      answer: 1,
      explanation: "«الْبِيئَةُ» هِيَ الْمَكَانُ وَالْمُحِيطُ الَّذِي يَعِيشُ فِيهِ الْإِنْسَانُ وَالْحَيَوَانُ وَالنَّبَاتُ."
    },
    {
      id: 2,
      question: "مَا هِيَ الْكَلِمَةُ الْمُنَاسِبَةُ لِـ (قطع الأشجار وتعرية الغابات)؟",
      options: [
        "التَّصَحُّرُ",
        "التَّدْوِيرُ",
        "التَّشْجِيرُ",
        "النَّظَافَةُ"
      ],
      answer: 0,
      explanation: "«التَّصَحُّرُ» يَعْنِي قَطْعَ الْأَشْجَارِ وَتَحَوُّلَ الْأَرَاضِيِ إِلَى صَحْرَاءَ."
    },
    {
      id: 3,
      question: "عَيِّنِ الْجُمْلَةَ الَّتِي تَحْتَوِي عَلَى (فِعْلِ الْأَمْرِ) لِلْحِفَاظِ عَلَى الْبِيئَةِ:",
      options: [
        "لَا تَرْمِ الْقُمَامَةَ فِي النَّهْرِ",
        "احْرِصْ عَلَى نَظَافَةِ مَدْرَسَتِكَ",
        "الْأُسْتَاذُ يَغْرِسُ الْأَشْجَارَ",
        "التَّلَوُّثُ خَطِيرٌ جِدًّا"
      ],
      answer: 1,
      explanation: "«احْرِصْ» هُوَ فِعْلُ أَمْرٍ لِلْمُفَرَدِ الْمُذَكَّرِ لِلْحَثِّ عَلَى النَّظَافَةِ."
    },
    {
      id: 4,
      question: "أَيُّ جُمْلَةٍ مِمَّا يَلِي تُعَبِّرُ عَنْ (فِعْلِ النَّهْيِ)؟",
      options: [
        "اِغْرِسِ الْأَشْجَارَ فِي الْحَدِيقَةِ",
        "أَنَا أُحِبُّ الْبِيئَةَ النَّظِيفَةَ",
        "لَا تُسْرِفْ فِي اسْتِهْلَاكِ الْمَاءِ",
        "فَصْلِي أَوْسَعُ الْفُصُولِ"
      ],
      answer: 2,
      explanation: "«لَا تُسْرِفْ» هُوَ فِعْلُ نَهْيٍ يَبْدَأُ بِـ (لَا النَّاهِيَةِ) وَيُفِيدُ النَّهْيَ عَنِ الْإِسْرَافِ."
    },
    {
      id: 5,
      question: "اخْتَرِ الصِّيغَةَ الصَّحِيحَةَ لِـ (إِسْمِ التَّفْضِيلِ) فِي الْجُمْلَةِ الْآتِيَةِ:\n«مَدْرَسَتِي ... مِنْ مَدْرَسَتِكَ»",
      options: [
        "وَاسِعٌ",
        "أَوْسَعُ",
        "تَوْسِيعٌ",
        "وَاسِعَةٌ"
      ],
      answer: 1,
      explanation: "يُصَاغُ إِسْمُ التَّفْضِيلِ عَلَى وَزْنِ (أَفْعَلُ)، فَالْكَلِمَةُ الصَّحِيحَةُ هِيَ «أَوْسَعُ»."
    },
    {
      id: 6,
      question: "مَا هُوَ التَّرْكِيبُ الصَّحِيحُ لِلْمُفَاضَلَةِ الْعُلْيَا (Superlative)؟",
      options: [
        "فَصْلِي أَوْسَعُ الْفُصُولِ فِي الْمَدْرَسَةِ",
        "فَصْلِي أَوْسَعُ مِنْ فَصْلِكَ",
        "فَصْلِي وَاسِعٌ جِدًّا",
        "فَصْلِي لَيْسَ وَاسِعًا"
      ],
      answer: 0,
      explanation: "صِيغَةُ (أَفْعَلُ + جَمْعٌ / مُضَاف إِلَيْهِ) تُفِيدُ مَعْنَى (الْأَكْثَر / الْأَعْظَم / الْأَوْسَع)."
    },
    {
      id: 7,
      question: "مَا هُوَ السَّبَبُ الرَّئِيسِيُّ لِـ (تَلَوُّثِ الْمَاءِ)؟",
      options: [
        "غَرْسُ الْأَشْجَارِ فِي الْحَدِيقَةِ",
        "رَمْيُ النُّفَايَاتِ وَالصَّرْفِ الصِّحِّيِّ فِي النَّهْرِ",
        "تَرْشِيدُ اسْتِهْلَاكِ الْمَاءِ",
        "تَدْوِيرُ النَّفَايَاتِ"
      ],
      answer: 1,
      explanation: "يَظْهَرُ تَلَوُّثُ الْمَاءِ بِسَبَبِ رَمْيِ النُّفَايَاتِ وَمِيَاهِ الصَّرْفِ فِي الْأَنْهَارِ وَالْبِحَارِ."
    },
    {
      id: 8,
      question: "يَظْهَرُ تَلَوُّثُ الْهَوَاءِ بِسَبَبِ:",
      options: [
        "الدُّخَانِ وَالْأَبْخِرَةِ الْمُتَصَاعِدَةِ مِنَ الْمَصَانِعِ وَالسَّيَّارَاتِ",
        "زِرَاعَةِ الزُّهُورِ",
        "اسْتِخْدَامِ الدَّرَّاجَاتِ الْهَوَائِيَّةِ",
        "تَنْظِيفِ الشَّوَارِعِ"
      ],
      answer: 0,
      explanation: "دُخَانُ الْمَصَانِعِ وَمُحَرِّكَاتِ السَّيَّارَاتِ يَتَسَبَّبُ فِي تَلَوُّثِ الْهَوَاءِ."
    },
    {
      id: 9,
      question: "أَكْمِلِ الْجُمْلَةَ بِفِعْلِ النَّهْيِ الْمُنَاسِبِ لِلْجَمْعِ:\n«يَا طُلَّابُ، ... الْأَشْجَارَ عَبَثًا»",
      options: [
        "لَا تَقْطَعْ",
        "لَا تَقْطَعُوا",
        "اقْطَعُوا",
        "تَقْطَعُونَ"
      ],
      answer: 1,
      explanation: "عِنْدَ نَهْيِ جَمْعِ الْمُذَكَّرِ نَسْتَخْدِمُ (لَا تَقْطَعُوا) بِحَذْفِ النُّونِ."
    },
    {
      id: 10,
      question: "مَا هُوَ دَوْرُ الشَّبَابِ فِي حِمَايَةِ الْبِيئَةِ؟",
      options: [
        "إِهْمَالُ النَّظَافَةِ",
        "الشَّبَابُ هُوَ أَهَمُّ عُنْصُرٍ فِي حِمَايَةِ الْبِيئَةِ وَتَنْمِيَتِهَا",
        "حَرْقُ الْغَابَاتِ",
        "إِلْقَاءُ الْقُمَامَةِ"
      ],
      answer: 1,
      explanation: "الشَّبَابُ هُوَ الْعُنْصُرُ الْأَهَمُّ فِي التَّنْمِيَةِ وَالْمُحَافَظَةِ عَلَى الْبِيئَةِ."
    },
    {
      id: 11,
      question: "مَا مَعْنَى كَلِمَةِ «سَلَّةُ الْمُهْمَلَاتِ» فِي اللُّغَةِ الْإِنْدُونِيسِيَّةِ؟",
      options: [
        "Tempat Sampah",
        "Air Bersih",
        "Pemanasan Global",
        "Hutan Rindang"
      ],
      answer: 0,
      explanation: "«سَلَّةُ الْمُهْمَلَاتِ» تَعْنِي فِي اللُّغَةِ الْإِنْدُونِيسِيَّةِ Tempat Sampah."
    },
    {
      id: 12,
      question: "مَا هُوَ الْوَزْنُ الصَّرْفِيُّ لِإِسْمِ التَّفْضِيلِ مِنْ كَلِمَةِ (جَمِيلٌ)؟",
      options: [
        "أَفْعَلُ (أَجْمَلُ)",
        "فَاعِلٌ (جَامِلٌ)",
        "مَفْعُولٌ (مَجْمُولٌ)",
        "فَعِيلٌ (جَمِيلٌ)"
      ],
      answer: 0,
      explanation: "يُصَاغُ إِسْمُ التَّفْضِيلِ عَلَى وَزْنِ (أَفْعَلُ)، مِثْلُ: جَمِيلٌ ← أَجْمَلُ."
    },
    {
      id: 13,
      question: "مَا الْمَقْصُودُ بِعِبَارَةِ «تَدْوِيرُ النَّفَايَاتِ»؟",
      options: [
        "إِحْرَاقُ الْقُمَامَةِ فِي الشَّارِعِ",
        "إِعَادَةُ تَصْنِيعِ النَّفَايَاتِ لِلِاسْتِفَادَةِ مِنْهَا",
        "رَمْيُ الْقُمَامَةِ فِي الْبَحْرِ",
        "قَطْعُ الْأَشْجَارِ"
      ],
      answer: 1,
      explanation: "تَدْوِيرُ النَّفَايَاتِ (Daur Ulang) يَعْنِي إِعَادَةَ اسْتِخْدَامِ الْمَوَادِّ الْمُهْمَلَةِ."
    },
    {
      id: 14,
      question: "حَوِّلْ فِعْلَ الْأَمْرِ (احْرِصْ) لِلْمُفَرَدَةِ الْمُؤَنَّثَةِ (أَنْتِ):",
      options: [
        "احْرِصِي",
        "احْرِصُوا",
        "احْرِصْنَ",
        "احْرِصَا"
      ],
      answer: 0,
      explanation: "فِعْلُ الْأَمْرِ لِلْمُفَرَدَةِ الْمُؤَنَّثَةِ يُزَادُ فِي آخِرِهِ يَاءُ الْمُخَاطَبَةِ (احْرِصِي)."
    },
    {
      id: 15,
      question: "مَا هُوَ الْمُرَادِفُ لِكَلِمَةِ «الْمَاء النَّقِيّ»؟",
      options: [
        "الْمَاءُ الصَّافِي وَالنَّظِيفُ",
        "الْمَاءُ الْمُتَلَوِّثُ",
        "مِيَاهُ الصَّرْفِ",
        "الْمَاءُ الْمَالِحُ"
      ],
      answer: 0,
      explanation: "الْمَاءُ النَّقِيُّ هُوَ الْمَاءُ الصَّافِي الْخَالِي مِنَ التَّلَوُّثِ."
    },
    {
      id: 16,
      question: "مِنْ صُوَرِ إِفْسَادِ الْبِيئَةِ فِي الْإِسْلَامِ:",
      options: [
        "غَرْسُ الْأَشْجَارِ فِي الْمَدْرَسَةِ",
        "إِحْرَاقُ الْغَابَاتِ لِغَيْرِ الْحَاجَةِ",
        "تَنْظِيفُ الْمَسَاجِدِ",
        "تَوْفِيرُ الْمَاءِ النَّقِيِّ"
      ],
      answer: 1,
      explanation: "إِحْرَاقُ الْغَابَاتِ بِدُونِ حَاجَةٍ يُعْتَبَرُ مِنْ صُوَرِ إِفْسَادِ الْبِيئَةِ."
    },
    {
      id: 17,
      question: "حَرْفُ الْجَرِّ الَّذِي يُسْتَخْدَمُ مَعَ إِسْمِ التَّفْضِيلِ لِلْمُقَارَنَةِ بَيْنَ شَيْئَيْنِ هُوَ:",
      options: [
        "إِلَى",
        "عَلَى",
        "مِنْ",
        "فِي"
      ],
      answer: 2,
      explanation: "نَسْتَخْدِمُ حَرْفَ (مِنْ) بَعْدَ إِسْمِ التَّفْضِيلِ لِلْمُقَارَنَةِ (أَفْعَلُ + مِنْ)."
    },
    {
      id: 18,
      question: "مَا هِيَ الْكَلِمَةُ الدَّالَّةُ عَلَى (Penghijauan / Reboisasi)؟",
      options: [
        "التَّشْجِيرُ (غَرْسُ الْأَشْجَارِ)",
        "التَّصَحُّرُ",
        "التَّلَوُّثُ",
        "الْإِسْرَافُ"
      ],
      answer: 0,
      explanation: "«التَّشْجِيرُ» هُوَ زِرَاعَةُ الْأَشْجَارِ لِزِيَادَةِ الْمِسَاحَاتِ الْخَضْرَاءِ."
    },
    {
      id: 19,
      question: "اخْتَرِ الْجُمْلَةَ الصَّحِيحَةَ لُغَوِيًّا:",
      options: [
        "خَالِدٌ أَكْبَرُ مِنْ أَخِيهِ",
        "خَالِدٌ كَبِيرٌ مِنْ أَخِيهِ",
        "خَالِدٌ أَكْبَرُ فِي أَخِيهِ",
        "خَالِدٌ كَبُرَ إِلَى أَخِيهِ"
      ],
      answer: 0,
      explanation: "الْجُمْلَةُ الصَّحِيحَةُ تَسْتَخْدِمُ إِسْمَ التَّفْضِيلِ (أَكْبَرُ) مَعَ حَرْفِ (مِنْ)."
    },
    {
      id: 20,
      question: "مَا هُوَ مَعْنَى الْحَدِيثِ الشَّرِيفِ: «النَّظَافَةُ مِنَ الْإِيمَانِ»؟",
      options: [
        "الْمُحَافَظَةُ عَلَى النَّظَافَةِ جُزْءٌ مِنَ الْإِيمَانِ وَالدِّينِ",
        "النَّظَافَةُ لَيْسَتْ مُهِمَّةً",
        "الْإِيمَانُ يَتَعَلَّقُ بِالصَّلَاةِ فَقَطْ",
        "النَّظَافَةُ لِلْمَدْرَسَةِ فَقَطْ"
      ],
      answer: 0,
      explanation: "الْإِسْلَامُ يَحُثُّ عَلَى النَّظَافَةِ وَيَجْعَلُهَا مِنْ كَمَالِ إِيمَانِ الْمُسْلِمِ."
    }
  ],

  initialStudents: [
    { 
      id: 101, 
      name: "Ahmad Fauzi", 
      class: "IX-A", 
      score: 95, 
      istimaScore: 90, 
      kalamScore: 94, 
      duelScore: 540, 
      matchGameScore: 100, 
      averageScore: 95, 
      progress: 100, 
      lastActive: "Hari ini 07:12 WIB",
      submissions: [
        { activityType: "Latihan Kuis Interaktif (Kahoot)", category: "latihan", score: 95, maxScore: 100, details: "19 dari 20 Soal Benar (4,850 Pts)", time: "07:12 WIB" },
        { activityType: "Game Duel 1v1", category: "game", score: 540, maxScore: 1000, details: "Menang vs Ustadz AI (Combo x5)", time: "07:05 WIB" },
        { activityType: "Praktik Kalam (Berbicara AI)", category: "latihan", score: 94, maxScore: 100, details: "Akurasi Pelafalan: Mumtaz", time: "06:50 WIB" }
      ]
    },
    { 
      id: 102, 
      name: "Siti Rahma", 
      class: "IX-A", 
      score: 88, 
      istimaScore: 85, 
      kalamScore: 92, 
      duelScore: 460, 
      matchGameScore: 90, 
      averageScore: 89, 
      progress: 90, 
      lastActive: "Hari ini 06:58 WIB",
      submissions: [
        { activityType: "Latihan Menyimak (Istima')", category: "latihan", score: 85, maxScore: 100, details: "8 dari 10 Soal Menyimak Benar", time: "06:58 WIB" },
        { activityType: "Game Duel 1v1", category: "game", score: 460, maxScore: 1000, details: "Menang vs Siswa Teman", time: "06:40 WIB" }
      ]
    },
    { 
      id: 103, 
      name: "Muhammad Rizky", 
      class: "IX-B", 
      score: 92, 
      istimaScore: 95, 
      kalamScore: 88, 
      duelScore: 580, 
      matchGameScore: 100, 
      averageScore: 94, 
      progress: 95, 
      lastActive: "Kemarin 16:30 WIB",
      submissions: [
        { activityType: "Game Duel 1v1", category: "game", score: 580, maxScore: 1000, details: "Skor Tertinggi Kelas (Menang vs Ustadz AI)", time: "Kemarin" },
        { activityType: "Latihan Kuis Interaktif (Kahoot)", category: "latihan", score: 92, maxScore: 100, details: "18 dari 20 Soal Benar", time: "Kemarin" }
      ]
    },
    { 
      id: 104, 
      name: "Aisyah Putri", 
      class: "IX-A", 
      score: 78, 
      istimaScore: 80, 
      kalamScore: 82, 
      duelScore: 320, 
      matchGameScore: 80, 
      averageScore: 80, 
      progress: 75, 
      lastActive: "2 hari lalu",
      submissions: [
        { activityType: "Latihan Kuis Interaktif (Kahoot)", category: "latihan", score: 78, maxScore: 100, details: "15 dari 20 Soal Benar", time: "2 hari lalu" }
      ]
    },
    { 
      id: 105, 
      name: "Bilal Ramadhan", 
      class: "IX-B", 
      score: 85, 
      istimaScore: 80, 
      kalamScore: 86, 
      duelScore: 410, 
      matchGameScore: 90, 
      averageScore: 85, 
      progress: 85, 
      lastActive: "Hari ini 06:20 WIB",
      submissions: [
        { activityType: "Game Tebak Gambar Audio", category: "game", score: 90, maxScore: 100, details: "Semua Pasangan Gambar Cocok", time: "06:20 WIB" }
      ]
    }
  ],

  initialSubmissions: [
    { id: "sub_1", studentName: "Ahmad Fauzi", class: "IX-A", activityType: "Latihan Kuis Interaktif (Kahoot)", category: "latihan", score: 95, maxScore: 100, details: "19 dari 20 Soal Benar (4,850 Pts)", createdAtFormatted: "Hari ini 07:12 WIB", timestamp: { seconds: Math.floor(Date.now() / 1000) - 300 } },
    { id: "sub_2", studentName: "Ahmad Fauzi", class: "IX-A", activityType: "Game Duel 1v1", category: "game", score: 540, maxScore: 1000, details: "Menang vs Ustadz AI (Combo x5)", createdAtFormatted: "Hari ini 07:05 WIB", timestamp: { seconds: Math.floor(Date.now() / 1000) - 600 } },
    { id: "sub_3", studentName: "Siti Rahma", class: "IX-A", activityType: "Latihan Menyimak (Istima')", category: "latihan", score: 85, maxScore: 100, details: "8 dari 10 Soal Menyimak Benar", createdAtFormatted: "Hari ini 06:58 WIB", timestamp: { seconds: Math.floor(Date.now() / 1000) - 900 } },
    { id: "sub_4", studentName: "Ahmad Fauzi", class: "IX-A", activityType: "Praktik Kalam (Berbicara AI)", category: "latihan", score: 94, maxScore: 100, details: "Akurasi Pelafalan: Mumtaz", createdAtFormatted: "Hari ini 06:50 WIB", timestamp: { seconds: Math.floor(Date.now() / 1000) - 1400 } },
    { id: "sub_5", studentName: "Siti Rahma", class: "IX-A", activityType: "Game Duel 1v1", category: "game", score: 460, maxScore: 1000, details: "Menang vs Siswa Teman", createdAtFormatted: "Hari ini 06:40 WIB", timestamp: { seconds: Math.floor(Date.now() / 1000) - 2000 } },
    { id: "sub_6", studentName: "Bilal Ramadhan", class: "IX-B", activityType: "Game Tebak Gambar Audio", category: "game", score: 90, maxScore: 100, details: "Semua Pasangan Gambar Cocok", createdAtFormatted: "Hari ini 06:20 WIB", timestamp: { seconds: Math.floor(Date.now() / 1000) - 3200 } }
  ],

  initialTeachers: [
    { id: 201, name: "Ustadz Abdullah, S.Pd.I", nip: "198503152010011002", subject: "Bahasa Arab", status: "Aktif" },
    { id: 202, name: "Ustadzah Fatimah, M.Pd", nip: "199008202015022005", subject: "Bahasa Arab & Nahwu", status: "Aktif" }
  ],

  listening: {
    title: "مَهَارَةُ الاِسْتِمَاعِ",
    subtitle: "Pembelajaran Menyimak Video & Audio Bahasa Arab Interaktif",
    video: {
      title: "فِيدْيُو مَهَارَةِ الاِسْتِمَاعِ (Video Pembelajaran Istima')",
      subtitle: "Materi Pembelajaran Bahasa Arab Kelas 9 MTs Darussalam Jombang (الحفاظ على البيئة)",
      youtubeId: "CP2SheSB2mU",
      embedUrl: "https://www.youtube.com/embed/CP2SheSB2mU",
      youtubeUrl: "https://www.youtube.com/watch?v=CP2SheSB2mU"
    },
    sections: [
      {
        id: "repeat",
        title: "الاسْتِمَاعُ وَالتَّكْرَارُ",
        desc: "Dengarkan pelafalan kosakata dan ungkapan penting tentang pelestarian lingkungan, lalu tirukan dengan fasih.",
        items: [
          { id: 1, arabic: "الْحِفَاظُ عَلَى الْبِيئَةِ", meaning: "Pelestarian Lingkungan Hidup", latin: "Al-Ḥifāẓu 'alal bī'ah" },
          { id: 2, arabic: "غَرْسُ الأَشْجَارِ فِي الْحَدِيقَةِ", meaning: "Menanam Pohon di Taman", latin: "Ġarsul asy-jāri fil ḥadīqah" },
          { id: 3, arabic: "تَدْوِيرُ النَّفَايَاتِ يُقَلِّلُ التَّلَوُّثَ", meaning: "Daur Ulang Sampah Mengurangi Polusi", latin: "Tadwīrul nafāyāti yuqallilut talawwuşa" },
          { id: 4, arabic: "لاَ تَرْمِ الْقُمَامَةَ فِي النَّهْرِ!", meaning: "Jangan Buang Sampah di Sungai!", latin: "Lā tarmi al-qumāmata fin-nahr!" },
          { id: 5, arabic: "النَّظَافَةُ مِنَ الإِيمَانِ", meaning: "Kebersihan Sebagian dari Iman", latin: "An-Naẓāfatu minal īmān" }
        ]
      },
      {
        id: "quiz",
        title: "الاسْتِمَاعُ وَالإِجَابَةُ",
        desc: "Dengarkan rekaman suara cerita/percakapan pendek, lalu pilih jawaban yang tepat sesuai audio yang didengar!",
                questions: [
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
        ]
      },
      {
        id: "match",
        title: "الاسْتِمَاعُ وَالرَّبْطُ",
        desc: "Dengarkan ungkapan suara yang diputar, lalu klik gambar yang paling tepat mewakili ungkapan tersebut!",
        games: [
          {
            id: 1,
            audioText: "غَرْسُ الأَشْجَارِ وَالتَّشْجِيرُ",
            title: "Penanaman Pohon / Penghijauan",
            image: "img-menanam-pohon.jpg",
            fallbackSvg: "reboisasi",
            options: [
              { title: "Penanaman Pohon", correct: true, image: "img-menanam-pohon.jpg", fallbackSvg: "reboisasi" },
              { title: "Banjir Bandang", correct: false, image: "img-banjir.jpg", fallbackSvg: "banjir" },
              { title: "Polusi Asap Pabrik", correct: false, image: "img-polusi.jpg", fallbackSvg: "polusi" }
            ]
          },
          {
            id: 2,
            audioText: "رَمْيُ النُّفَايَاتِ فِي سَلَّةِ الْمُهْمَلاَتِ",
            title: "Membuang Sampah di Tempatnya",
            image: "img-tempat-sampah.jpg",
            fallbackSvg: "sampah",
            options: [
              { title: "Bahan Kimia", correct: false, image: "img-bahan-kimia.jpg", fallbackSvg: "bahan_kimia" },
              { title: "Membuang Sampah", correct: true, image: "img-tempat-sampah.jpg", fallbackSvg: "sampah" },
              { title: "Pemanasan Global", correct: false, image: "img-pemanasan-global.jpg", fallbackSvg: "pemanasan_global" }
            ]
          }
        ]
      }
    ]
  },

  kalam: {
    meta: {
      title: "مَهَارَةُ الكَلَامِ",
      titleLatin: "Maharah Kalam (Kemahiran Berbicara)",
      subtitle: "Latihan Melafalkan Teks Bahasa Arab dengan Evaluasi Suara Real-time",
      instructions: "Dengarkan pelafalan asli (Ustadz), tekan tombol mikrofon untuk merekam suara Anda, lalu sistem AI akan mengevaluasi persentase kemiripan pelafalan Anda secara otomatis!"
    },
    categories: [
      { id: "all", name: "الْكُلُّ", label: "Semua Latihan", count: 15 },
      { id: "dasar", name: "عِبَارَاتٌ رَئِيْسِيَّةٌ", label: "Frasa Kunci", count: 4 },
      { id: "amr_nahyi", name: "الأَمْرُ وَالنَّهْيُ", label: "Perintah & Larangan", count: 5 },
      { id: "kalimat", name: "جُمَلٌ مُفِيْدَةٌ", label: "Kalimat Lengkap", count: 4 },
      { id: "hiwar", name: "حِوَارٌ قَصِيْرٌ", label: "Percakapan Pendek", count: 2 }
    ],
    items: [
      {
        id: 1,
        category: "dasar",
        categoryName: "Frasa Kunci",
        arabic: "التَّشْجِيْرُ خَيْرٌ لِلْبِيئَةِ",
        latin: "At-tasyjīru khairun lil-bī'ah.",
        translation: "Reboisasi (penanaman pohon) itu baik untuk kelestarian lingkungan.",
        phoneticTip: "Fokus pada huruf Syin (ش) ber-tasydid dan Ta Marbutah di akhir kata.",
        difficulty: "Mudah",
        targetClean: "التشجير خير للبيئة"
      },
      {
        id: 2,
        category: "dasar",
        categoryName: "Frasa Kunci",
        arabic: "نَظَافَةُ الْمَدْرَسَةِ وَاجِبَةٌ عَلَى الْجَمِيْعِ",
        latin: "Naẓāfatul-madrasati wājibatun 'alal-jamī'.",
        translation: "Kebersihan sekolah adalah kewajiban bagi semua orang.",
        phoneticTip: "Perhatikan huruf Zha (ظ) makhraj ujung lidah dengan gigi seri atas.",
        difficulty: "Mudah",
        targetClean: "نظافة المدرسة واجبة على الجميع"
      },
      {
        id: 3,
        category: "dasar",
        categoryName: "Frasa Kunci",
        arabic: "الْمَاءُ النَّقِيُّ ضَرُورِيٌّ لِلْحَيَاةِ",
        latin: "Al-mā'un-naqiyyu ḍarūriyyun lil-ḥayāh.",
        translation: "Air bersih sangat penting bagi kelangsungan hidup.",
        phoneticTip: "Fokus pada makhraj Qaf (ق) dan Dhad (ض) dengan suara tebal (isti'la).",
        difficulty: "Mudah",
        targetClean: "الماء النقي ضروري للحياة"
      },
      {
        id: 4,
        category: "dasar",
        categoryName: "Frasa Kunci",
        arabic: "الْبِيئَةُ النَّظِيفَةُ تَجْعَلُنَا أَصِحَّاءَ",
        latin: "Al-bī'atun-naẓīfatu taj'alunā aṣiḥḥā'.",
        translation: "Lingkungan yang bersih membuat kita senantiasa sehat.",
        phoneticTip: "Fokus pada huruf Ha (ح) bersih dan Hamzah ber-madd di akhir kata.",
        difficulty: "Sedang",
        targetClean: "البيئة النظيفة تجعلنا اصحاء"
      },
      {
        id: 5,
        category: "amr_nahyi",
        categoryName: "Perintah & Larangan",
        arabic: "اِزْرَعِ الأَشْجَارَ فِي حَدِيقَةِ الْمَدْرَسَةِ!",
        latin: "Izra'il-asyjāra fī ḥadīqatil-madrasah!",
        translation: "Tanamlah pohon-pohon di taman sekolah! (Fi'il Amr)",
        phoneticTip: "Ucapkan Fi'il Amr 'Izra'' dengan huruf 'Ain (ع) di ujung kata secara mantap.",
        difficulty: "Sedang",
        targetClean: "ازرع الاشجار في حديقة المدرسة"
      },
      {
        id: 6,
        category: "amr_nahyi",
        categoryName: "Perintah & Larangan",
        arabic: "اِرْمِ الْقُمَامَةَ فِي سَلَّةِ الْمُهْمَلَاتِ!",
        latin: "Irmil-qumāmata fī sallatil-muhmalāt!",
        translation: "Buanglah sampah ke dalam tempat sampah! (Fi'il Amr)",
        phoneticTip: "Kasrah pada 'Irmi' pendek karena pembuangan huruf 'Illat pada Fi'il Amr mu'tal.",
        difficulty: "Sedang",
        targetClean: "ارم القمامة في سلة المهملات"
      },
      {
        id: 7,
        category: "amr_nahyi",
        categoryName: "Perintah & Larangan",
        arabic: "لاَ تَرْمِ النِّفَايَاتِ فِي النَّهْرِ!",
        latin: "Lā tarmin-nifāyāti fīn-nahr!",
        translation: "Janganlah kamu membuang sampah limbah ke dalam sungai! (Fi'il Nahyi)",
        phoneticTip: "Nada larangan tegas, perhatikan pelafalan Fa (ف) dan Nun ber-tasydid.",
        difficulty: "Sedang",
        targetClean: "لا ترم النفايات في النهر"
      },
      {
        id: 8,
        category: "amr_nahyi",
        categoryName: "Perintah & Larangan",
        arabic: "لاَ تُفْسِدُوا فِي الأَرْضِ بَعْدَ إِصْلاَحِهَا!",
        latin: "Lā tufsidū fīl-arḍi ba'da iṣlāḥihā!",
        translation: "Janganlah kamu membuat kerusakan di muka bumi setelah perbaikannya! (Fi'il Nahyi Jamak)",
        phoneticTip: "Kutipan ayat Al-Qur'an, lafalkan Dhad (ض) dan Shod (ص) dengan jelas.",
        difficulty: "Tantangan",
        targetClean: "لا تفسدوا في الارض بعد اصلاحها"
      },
      {
        id: 9,
        category: "amr_nahyi",
        categoryName: "Perintah & Larangan",
        arabic: "حَافِظْ عَلَى نَظَافَةِ فَصْلِكَ يَا أَحْمَدُ!",
        latin: "Ḥāfiẓ 'alā naẓāfati faṣlika yā Aḥmad!",
        translation: "Jagalah kebersihan kelasmu wahai Ahmad! (Fi'il Amr)",
        phoneticTip: "Huruf Ha (ح) dan Zha (ظ) sukun, diucapkan dengan makhraj yang tepat.",
        difficulty: "Sedang",
        targetClean: "حافظ على نظافة فصلك يا احمد"
      },
      {
        id: 10,
        category: "kalimat",
        categoryName: "Kalimat Lengkap",
        arabic: "يَجِبُ عَلَيْنَا أَنْ نُحَافِظَ عَلَى نَظَافَةِ الْبِيئَةِ",
        latin: "Yajibu 'alainā an nuḥāfiẓa 'alā naẓāfatil-bī'ah.",
        translation: "Wajib bagi kita semua untuk menjaga kebersihan lingkungan hidup.",
        phoneticTip: "Gunakan intonasi mengalir, idgham pada 'an nuḥāfiẓa'.",
        difficulty: "Tantangan",
        targetClean: "يجب علينا ان نحافظ على نظافة البيئة"
      },
      {
        id: 11,
        category: "kalimat",
        categoryName: "Kalimat Lengkap",
        arabic: "إِحْرَاقُ الْغَابَةِ يُسَبِّبُ تَلَوُّثَ الْهَوَاءِ الشَّدِيدِ",
        latin: "Iḥrāqul-ġābati yusabbibu talawwuṡal-hawā'isy-syadīd.",
        translation: "Pembakaran hutan menyebabkan pencemaran udara yang parah.",
        phoneticTip: "Huruf Ghain (غ) tenggorokan atas dan Tsa (ث) lidah menyentuh gigi depan.",
        difficulty: "Tantangan",
        targetClean: "احراق الغابة يسبب تلوث الهواء الشديد"
      },
      {
        id: 12,
        category: "kalimat",
        categoryName: "Kalimat Lengkap",
        arabic: "هَيَّا بِنَا نُنَظِّفُ سَاحَةَ الْمَدْرَسَةِ مَعًا!",
        latin: "Hayyā binā nunaẓẓifu sāḥatal-madrasati ma'an!",
        translation: "Ayo kita bersihkan halaman sekolah bersama-sama!",
        phoneticTip: "Ungkapan ajakan bersemangat, tasydid pada Ya (ي) dan Zha (ظ).",
        difficulty: "Sedang",
        targetClean: "هيا بنا ننظف ساحة المدرسة معا"
      },
      {
        id: 13,
        category: "kalimat",
        categoryName: "Kalimat Lengkap",
        arabic: "النَّظَافَةُ مِنَ الإِيمَانِ وَهِيَ شِعَارُ الْمُسْلِمِ",
        latin: "An-naẓāfatu minal-īmān wa hiya syi'ārul-muslim.",
        translation: "Kebersihan itu sebagian dari iman dan merupakan syiar seorang muslim.",
        phoneticTip: "Hadits dan semboyan Islam tentang kebersihan, lafalkan dengan tartil.",
        difficulty: "Sedang",
        targetClean: "النظافة من الايمان وهي شعار المسلم"
      },
      {
        id: 14,
        category: "hiwar",
        categoryName: "Percakapan Pendek",
        arabic: "مَاذَا تَفْعَلُ يَا عَلِيُّ؟ - أَنَا أَغْرِسُ شَجَرَةً جَدِيدَةً",
        latin: "Māżā taf'alu yā 'Aliyyu? - Anā aġrisu syajaratan jadīdah.",
        translation: "Apa yang sedang kamu lakukan wahai Ali? - Saya sedang menanam pohon baru.",
        phoneticTip: "Percakapan tanya-jawab, bedakan intonasi bertanya dan menjawab.",
        difficulty: "Sedang",
        targetClean: "ماذا تفعل يا علي انا اغرس شجرة جديدة"
      },
      {
        id: 15,
        category: "hiwar",
        categoryName: "Percakapan Pendek",
        arabic: "أَيْنَ نَضَعُ هَذِهِ النُّفَايَاتِ؟ - فِي صُنْدُوقِ الْقُمَامَةِ",
        latin: "Aina naḍa'u hażihin-nufāyāt? - Fī ṣundūqil-qumāmah.",
        translation: "Di mana kita membuang sampah ini? - Di dalam kotak/tong sampah.",
        phoneticTip: "Perhatikan huruf Dhad (ض) dan Qaf (ق).",
        difficulty: "Sedang",
        targetClean: "اين نضع هذه النفايات في صندوق القمامة"
      }
    ]
  },

  duelQuestionSets: [
  {
    "id": "level_1",
    "title": "Level 1: 🌿 Kosa Kata Lingkungan & Fi'il Amr Dasar",
    "badge": "Level 1 (Pemula)",
    "botName": "Bot Santri Zaid 🤖",
    "botAvatar": "🤖",
    "botRole": "Santri Pemula (AI)",
    "botDifficulty": "Mudah (50%)",
    "botAccuracy": 0.5,
    "description": "Latihan dasar kosa kata pelestarian lingkungan dan pembentukan kata kerja perintah (Fi'il Amr) sederhana.",
    "questions": [
      {
        "id": 101,
        "question": "Arti dari kosakata «التَّشْجِيرُ» dalam tema pelestarian lingkungan adalah:",
        "options": [
          "Penggundulan Hutan",
          "Penghijauan / Reboisasi",
          "Pencemaran Udara",
          "Banjir Bandang"
        ],
        "answer": 1,
        "explanation": "«التَّشْجِيرُ» berarti Penghijauan atau Penanaman Pohon kembali (Reboisasi)."
      },
      {
        "id": 102,
        "question": "Manakah fi'il amr (kata kerja perintah) yang bermakna \"Tanamlah!\" untuk kamu satu laki-laki (أَنْتَ)?",
        "options": [
          "اِقْرَأْ",
          "اُكْتُبْ",
          "اِزْرَعْ",
          "اِجْلِسْ"
        ],
        "answer": 2,
        "explanation": "«اِزْرَعْ» adalah Fi'il Amr dari kata «زَرَعَ - يَزْرَعُ» yang berarti \"Tanamlah!\"."
      },
      {
        "id": 103,
        "question": "Arti kata «الْبِيئَةُ» dalam bahasa Indonesia adalah:",
        "options": [
          "Lingkungan Hidup",
          "Kebun Binatang",
          "Ruang Perpustakaan",
          "Pabrik Industri"
        ],
        "answer": 0,
        "explanation": "«الْبِيئَةُ» dalam bahasa Arab berarti Lingkungan Hidup."
      },
      {
        "id": 104,
        "question": "Fi'il amr untuk menyuruh seorang siswa laki-laki membersihkan kelas adalah:",
        "options": [
          "نَظَّفَ",
          "يُنَظِّفُ",
          "تَنْظِيفٌ",
          "نَظِّفْ"
        ],
        "answer": 3,
        "explanation": "«نَظِّفْ» adalah Fi'il Amr (perintah bersihkanlah!) untuk dhamir أَنْتَ."
      },
      {
        "id": 105,
        "question": "Kosakata «النِّفَايَاتُ» atau «الْقُمَامَةُ» memiliki arti:",
        "options": [
          "Pohon Rindang",
          "Sampah / Limbah",
          "Sungai Mengalir",
          "Tanaman Hias"
        ],
        "answer": 1,
        "explanation": "«النِّفَايَاتُ» dan «الْقُمَامَةُ» berarti sampah atau limbah buangan."
      },
      {
        "id": 106,
        "question": "Terjemahan dari «نَظَّفَ - يُنَظِّفُ - نَظِّفْ» secara berurutan adalah:",
        "options": [
          "Telah membersihkan - Sedang membersihkan - Bersihkanlah!",
          "Sedang membersihkan - Bersihkanlah - Telah membersihkan",
          "Bersihkanlah! - Telah membersihkan - Sedang membersihkan",
          "Pembersih - Kebersihan - Membersihkan"
        ],
        "answer": 0,
        "explanation": "Urutan tasrif fi'il madhi - mudhari' - amr yang tepat adalah: Telah membersihkan - Sedang membersihkan - Bersihkanlah!"
      },
      {
        "id": 107,
        "question": "Kosakata «الْفَيَضَانُ» bermakna bencana alam berupa:",
        "options": [
          "Gunung Meletus",
          "Gempa Bumi",
          "Banjir",
          "Angin Topan"
        ],
        "answer": 2,
        "explanation": "«الْفَيَضَانُ» dalam bahasa Arab berarti bencana banjir."
      },
      {
        "id": 108,
        "question": "Maksud dari kalimat perintah «اِقْصِدْ فِي اسْتِخْدَامِ الْمَاءِ!» adalah:",
        "options": [
          "Minumlah air yang banyak!",
          "Tumpahkanlah air di lantai!",
          "Jangan pernah mencuci tangan!",
          "Hematlah dalam menggunakan air!"
        ],
        "answer": 3,
        "explanation": "«اِقْصِدْ» bermakna berhemat atau bersikap bijak dan tidak boros."
      },
      {
        "id": 109,
        "question": "Arti dari istilah «تَدْوِيرُ النَّفَايَاتِ» adalah:",
        "options": [
          "Membakar Sampah",
          "Daur Ulang Sampah",
          "Menumpuk Sampah",
          "Menimbun Sampah"
        ],
        "answer": 1,
        "explanation": "«تَدْوِيرُ النَّفَايَاتِ» bermakna daur ulang sampah (recycling)."
      },
      {
        "id": 110,
        "question": "Kalimat perintah «احْرِصْ عَلَى النَّظَافَةِ!» ditujukan untuk subjek:",
        "options": [
          "Kalian banyak laki-laki",
          "Kamu satu perempuan (أَنْتِ)",
          "Kamu satu laki-laki (أَنْتَ)",
          "Mereka berdua"
        ],
        "answer": 2,
        "explanation": "«احْرِصْ» bersukun tanpa akhiran tambahan adalah untuk dhamir أَنْتَ (kamu satu laki-laki)."
      }
    ]
  },
  {
    "id": "level_2",
    "title": "Level 2: 🛑 Fi'il Amr & Fi'il Nahi (Perintah & Larangan)",
    "badge": "Level 2 (Dasar)",
    "botName": "Bot Ustazah Fatimah 🧕",
    "botAvatar": "🧕",
    "botRole": "Guru Pembimbing (AI)",
    "botDifficulty": "Dasar (65%)",
    "botAccuracy": 0.65,
    "description": "Latihan membedakan perintah merawat alam dan larangan merusak lingkungan (Laa Nahiyah) sesuai dhomir.",
    "questions": [
      {
        "id": 201,
        "question": "Bentuk fi'il nahi (larangan) membuang sampah sembarangan di jalan yang tepat adalah:",
        "options": [
          "اِرْمِ الْقُمَامَةَ فِي الشَّارِعِ!",
          "تَرْمِي الْقُمَامَةَ فِي الشَّارِعِ",
          "لاَ تَرْمِ الْقُمَامَةَ فِي الشَّارِعِ!",
          "رَمَى الْقُمَامَةَ فِي الشَّارِعِ"
        ],
        "answer": 2,
        "explanation": "«لاَ تَرْمِ» menggunakan La Nahiyah yang menjazemkan fi'il mudhari' (membuang huruf 'illat ya)."
      },
      {
        "id": 202,
        "question": "Fi'il nahi «لاَ تُسْرِفُوا فِي الْمَاءِ!» ditujukan untuk dhamir:",
        "options": [
          "أَنْتُمْ (Kalian banyak laki-laki)",
          "أَنْتَ (Kamu satu laki-laki)",
          "أَنْتِ (Kamu satu perempuan)",
          "أَنْتُمَا (Kalian berdua)"
        ],
        "answer": 0,
        "explanation": "Wawu jama'ah (وا) pada «لاَ تُسْرِفُوا» menandakan subjek jamak mudzakkar: أَنْتُمْ."
      },
      {
        "id": 203,
        "question": "Bentuk larangan \"Janganlah kamu (perempuan) mematikan lampu!\" yang benar adalah:",
        "options": [
          "لاَ تُطْفِئُ النُّورَ!",
          "لاَ تُطْفِئْ النُّورَ!",
          "لاَ تُطْفِئُوا النُّورَ!",
          "لاَ تُطْفِئِي النُّورَ!"
        ],
        "answer": 3,
        "explanation": "Untuk dhamir أَنْتِ, fi'il nahi berakhiran ya mukhatabah (membuang huruf nun): «لاَ تُطْفِئِي»."
      },
      {
        "id": 204,
        "question": "Ubah fi'il amr «احْرِصْ» jika ditujukan kepada seorang siswi perempuan (أَنْتِ):",
        "options": [
          "احْرِصُوا",
          "احْرِصِي",
          "احْرِصْنَ",
          "احْرِصَا"
        ],
        "answer": 1,
        "explanation": "Untuk dhamir mu'annats (أَنْتِ), fi'il amr ditambahkan ya mukhatabah di akhir: «احْرِصِي»."
      },
      {
        "id": 205,
        "question": "Larangan menebang pohon secara liar dalam bahasa Arab yang tepat adalah:",
        "options": [
          "اِقْطَعِ الأَشْجَارَ دُونَ إِذْنٍ!",
          "قَطَعَ الأَشْجَارَ دُونَ إِذْنٍ",
          "لاَ تَقْطَعِ الأَشْجَارَ دُونَ إِذْنٍ!",
          "تَقْطَعُ الأَشْجَارَ دُونَ إِذْنٍ"
        ],
        "answer": 2,
        "explanation": "«لاَ تَقْطَعِ» (jangan tebang) adalah fi'il nahi untuk mencegah perusakan alam."
      },
      {
        "id": 206,
        "question": "Lengkapi kalimat perintah untuk banyak murid: «يَا طُلاَّبُ، ...... عَلَى نَظَافَةِ الْمَدْرَسَةِ!»",
        "options": [
          "حَافِظْ",
          "حَافِظُوا",
          "حَافِظِي",
          "تُحَافِظُونَ"
        ],
        "answer": 1,
        "explanation": "«يَا طُلاَّبُ» adalah panggilan jamak (banyak siswa), maka fi'il amr ber-wawu jama'ah: «حَافِظُوا»."
      },
      {
        "id": 207,
        "question": "Manakah fi'il amr yang benar untuk mengajak 2 orang (أَنْتُمَا) menyiram tanaman?",
        "options": [
          "اِسْقِيَا النَّبَاتَاتِ!",
          "اِسْقِ النَّبَاتَاتِ!",
          "اِسْقُوا النَّبَاتَاتِ!",
          "اِسْقِينَ النَّبَاتَاتِ!"
        ],
        "answer": 0,
        "explanation": "Untuk dhamir mutsanna (dua orang / أَنْتُمَا), fi'il amr diakhiri alif tasniyah: «اِسْقِيَا»."
      },
      {
        "id": 208,
        "question": "Bentuk fi'il amr dari kata «شَرِبَ - يَشْرَبُ» untuk menyuruh meminum air bersih adalah:",
        "options": [
          "شَارِبٌ",
          "يَشْرَبُ",
          "تَشْرَبُ",
          "اِشْرَبْ"
        ],
        "answer": 3,
        "explanation": "Fi'il amr dari «شَرِبَ» adalah «اِشْرَبْ» (minumlah!)."
      },
      {
        "id": 209,
        "question": "Tanda jazem pada fi'il nahi mufrad shahih akhir seperti «لاَ تُفْسِدْ فِي الأَرْضِ» adalah:",
        "options": [
          "Kasrah",
          "Fathah",
          "Sukun (ـْ)",
          "Dhommah"
        ],
        "answer": 2,
        "explanation": "Fi'il mudhari' shahih akhir dijazemkan dengan tanda sukun (ـْ) pada huruf terakhirnya."
      },
      {
        "id": 210,
        "question": "Ubah larangan «لاَ تُهْمِلْ» (jangan lalai) untuk rombongan siswi perempuan (أَنْتُنَّ):",
        "options": [
          "لاَ تُهْمِلُوا",
          "لاَ تُهْمِلْنَ",
          "لاَ تُهْمِلِي",
          "لاَ تُهْمِلاَ"
        ],
        "answer": 1,
        "explanation": "Untuk dhamir jamak mu'annats (أَنْتُنَّ), fi'il nahi diakhiri nun niswah: «لاَ تُهْمِلْنَ»."
      }
    ]
  },
  {
    "id": "level_3",
    "title": "Level 3: ⚖️ Isim Tafdhil & Na't Man'ut (Perbandingan & Sifat)",
    "badge": "Level 3 (Menengah)",
    "botName": "Bot Ust. Farhan AI 👨‍🏫",
    "botAvatar": "👨‍🏫",
    "botRole": "Ustadz Muda Qawa'id (AI)",
    "botDifficulty": "Menengah (75%)",
    "botAccuracy": 0.75,
    "description": "Latihan pembentukan Isim Tafdhil (أَفْعَلُ مِنْ) dan kesesuaian kata sifat (Na't) dengan yang disifati (Man'ut).",
    "questions": [
      {
        "id": 301,
        "question": "Bentuk Isim Tafdhil Mu'annas (feminin) dari kata «أَكْبَرُ» adalah:",
        "options": [
          "أَكْبَرَةٌ",
          "كَبِيرَةٌ",
          "كِبَارٌ",
          "كُبْرَى"
        ],
        "answer": 3,
        "explanation": "Wazan Isim Tafdhil untuk mu'annas adalah «فُعْلَى», sehingga «أَكْبَرُ» menjadi «كُبْرَى»."
      },
      {
        "id": 302,
        "question": "Bentuk Isim Tafdhil dari kata «كَبِيرٌ» (besar) adalah:",
        "options": [
          "تَكْبِيرٌ",
          "أَكْبَرُ",
          "كُبَرَاءُ",
          "مُتَكَبِّرٌ"
        ],
        "answer": 1,
        "explanation": "Isim Tafdhil mengikuti wazan «أَفْعَلُ», sehingga «كَبِيرٌ» menjadi «أَكْبَرُ» (lebih besar)."
      },
      {
        "id": 303,
        "question": "Susunan Na't & Man'ut (kata sifat dan yang disifati) yang benar berikut ini adalah:",
        "options": [
          "بِيئَةٌ النَّظِيفَةُ",
          "الْبِيئَةُ نَظِيفَةٌ",
          "بِيئَةٌ نَظِيفَةٌ",
          "نَظِيفَةٌ بِيئَةٌ"
        ],
        "answer": 2,
        "explanation": "Na't harus mengikuti Man'ut dalam hal mudzakkar/mu'annas dan nakirah/makrifah: keduanya nakirah dan mu'annats «بِيئَةٌ نَظِيفَةٌ»."
      },
      {
        "id": 304,
        "question": "Lengkapi kalimat perbandingan: «الشَّجَرَةُ ...... مِنَ الزَّهْرَةِ» (Pohon lebih tinggi dari bunga):",
        "options": [
          "أَطْوَلُ",
          "طَوِيلَةٌ",
          "أَقْصَرُ",
          "طُولٌ"
        ],
        "answer": 0,
        "explanation": "Untuk menyatakan \"lebih tinggi daripada\", gunakan Isim Tafdhil «أَطْوَلُ مِنْ»."
      },
      {
        "id": 305,
        "question": "Pada frase «الْهَوَاءُ النَّقِيُّ», kata «النَّقِيُّ» berkedudukan sebagai:",
        "options": [
          "Mudhaf Ilaihi",
          "Na't (Kata Sifat)",
          "Mubtada'",
          "Khabar"
        ],
        "answer": 1,
        "explanation": "«النَّقِيُّ» menjelaskan sifat dari «الْهَوَاءُ», sehingga berkedudukan sebagai Na't."
      },
      {
        "id": 306,
        "question": "Manakah kalimat yang menggunakan Isim Tafdhil bermakna \"PALING / TER\" (Superlatif)?",
        "options": [
          "الْغَابَةُ جَمِيلَةٌ",
          "الْغَابَةُ أَجْمَلُ مِنَ الْحَدِيقَةِ",
          "الْغَابَةُ أَجْمَلُ أَمَاكِنِ الطَّبِيعَةِ",
          "الْغَابَةُ لَيْسَتْ جَمِيلَةً"
        ],
        "answer": 2,
        "explanation": "Isim Tafdhil yang disandarkan pada isim ma'rifah («أَجْمَلُ أَمَاكِنِ») bermakna superlatif (paling indah)."
      },
      {
        "id": 307,
        "question": "Terjemahkan ke Bahasa Arab: \"Matahari lebih besar daripada Bumi\":",
        "options": [
          "الشَّمْسُ كَبِيرَةٌ فِي الأَرْضِ",
          "الأَرْضُ أَكْبَرُ مِنَ الشَّمْسِ",
          "الشَّمْسُ كَبِيرٌ جِدًّا",
          "الشَّمْسُ أَكْبَرُ مِنَ الأَرْضِ"
        ],
        "answer": 3,
        "explanation": "«الشَّمْسُ أَكْبَرُ مِنَ الأَرْضِ» adalah struktur perbandingan yang tepat."
      },
      {
        "id": 308,
        "question": "Bentuk Isim Tafdhil dari kata «نَظِيفٌ» (bersih) adalah:",
        "options": [
          "أَنْظَفُ",
          "نَظَاَفَةٌ",
          "مُنَظَّفٌ",
          "تَنْظِيفٌ"
        ],
        "answer": 0,
        "explanation": "«نَظِيفٌ» mengikuti wazan «أَفْعَلُ» menjadi «أَنْظَفُ» (lebih bersih)."
      },
      {
        "id": 309,
        "question": "Pilih kalimat Na't Man'ut berbentuk Makrifah (ber-AL) yang benar dan serasi:",
        "options": [
          "الْمَاءُ نَقِيٌّ مُفِيدٌ",
          "الْمَاءُ النَّقِيُّ مُفِيدٌ لِلصِّحَّةِ",
          "مَاءٌ النَّقِيُّ مُفِيدٌ",
          "الْمَاءُ النَّقِيَةُ مُفِيدٌ"
        ],
        "answer": 1,
        "explanation": "Keduanya sama-sama ber-AL dan mudzakkar: «الْمَاءُ النَّقِيُّ»."
      },
      {
        "id": 310,
        "question": "Kalimat «الْحَدِيقَةُ أَوْسَعُ مِنَ الْفِنَاءِ» memiliki arti:",
        "options": [
          "Halaman lebih luas dari taman",
          "Taman sama luasnya dengan halaman",
          "Taman lebih luas daripada halaman",
          "Taman sangat sempit di halaman"
        ],
        "answer": 2,
        "explanation": "«أَوْسَعُ مِنْ» adalah Isim Tafdhil yang berarti \"lebih luas daripada\"."
      }
    ]
  },
  {
    "id": "level_4",
    "title": "Level 4: 🌊 Al-Idhafah & Dharaf Makan/Zaman",
    "badge": "Level 4 (Mahir)",
    "botName": "Bot Ust. Khalid AI ⚡",
    "botAvatar": "⚡",
    "botRole": "Ahli Sintaksis Arab (AI)",
    "botDifficulty": "Mahir (85%)",
    "botAccuracy": 0.85,
    "description": "Latihan susunan Mudhaf & Mudhaf Ilaihi serta penempatan keterangan tempat dan waktu dalam konteks lingkungan.",
    "questions": [
      {
        "id": 401,
        "question": "Arti dari kata keterangan tempat (Dharaf Makan) «أَمَامَ» adalah:",
        "options": [
          "Di depan",
          "Di belakang",
          "Di samping",
          "Di atas"
        ],
        "answer": 0,
        "explanation": "«أَمَامَ» adalah kata keterangan tempat yang bermakna \"Di depan\"."
      },
      {
        "id": 402,
        "question": "Pada frase «تَلَوُّثُ الْهَوَاءِ» (pencemaran udara), kata «الْهَوَاءِ» berkedudukan sebagai:",
        "options": [
          "Mudhaf",
          "Na't",
          "Mudhaf Ilaihi",
          "Maf'ul Bih"
        ],
        "answer": 2,
        "explanation": "«الْهَوَاءِ» adalah kata kedua dari susunan Idhafah, berkedudukan sebagai Mudhaf Ilaihi (berharakat kasrah)."
      },
      {
        "id": 403,
        "question": "Manakah contoh susunan Mudhaf & Mudhaf Ilaihi (Al-Idhafah) yang benar?",
        "options": [
          "الْحَدِيقَةُ الْمَدْرَسَةِ",
          "حَدِيقَةُ الْمَدْرَسَةِ",
          "حَدِيقَةٌ الْمَدْرَسَةِ",
          "حَدِيقَةُ مَدْرَسَةٌ"
        ],
        "answer": 1,
        "explanation": "Mudhaf tidak boleh ber-AL dan tidak bertanwin, sedangkan Mudhaf Ilaihi berharakat majrur (kasrah): «حَدِيقَةُ الْمَدْرَسَةِ»."
      },
      {
        "id": 404,
        "question": "Lengkapi kalimat: «يَزْرَعُ الطَّالِبُ الأَشْجَارَ ...... الْمَدْرَسَةِ» (di belakang sekolah):",
        "options": [
          "فَوْقَ",
          "تَحْتَ",
          "مَعَ",
          "وَرَاءَ"
        ],
        "answer": 3,
        "explanation": "Dharaf Makan untuk \"di belakang\" adalah «وَرَاءَ» atau «خَلْفَ»."
      },
      {
        "id": 405,
        "question": "Pilih bentuk Idhafah dengan makna \"Air Limbah Sungai\" yang tepat:",
        "options": [
          "المِيَاهُ الصَّرْفِ النَّهْرِ",
          "مِيَاهٌ صَرْفٌ نَهْرٌ",
          "مِيَاهُ صَرْفِ النَّهْرِ",
          "مِيَاهُ النَّهْرِ صَرْفًا"
        ],
        "answer": 2,
        "explanation": "Susunan Idhafah bertingkat yang benar adalah: «مِيَاهُ صَرْفِ النَّهْرِ»."
      },
      {
        "id": 406,
        "question": "Ketentuan tata bahasa bagi kata yang berkedudukan sebagai Mudhaf adalah:",
        "options": [
          "Wajib memakai AL",
          "Tidak boleh memakai AL dan Tanwin",
          "Wajib memakai Tanwin",
          "Harus berharakat kasrah selalu"
        ],
        "answer": 1,
        "explanation": "Syarat Mudhaf: Tanwin dan Alif-Lam (AL) harus dibuang."
      },
      {
        "id": 407,
        "question": "Manakah kata yang merupakan Dharaf Zaman (Keterangan Waktu)?",
        "options": [
          "صَبَاحًا (Di pagi hari)",
          "تَحْتَ (Di bawah)",
          "أَمَامَ (Di depan)",
          "بَيْنَ (Di antara)"
        ],
        "answer": 0,
        "explanation": "«صَبَاحًا» menunjukkan keterangan waktu (di pagi hari)."
      },
      {
        "id": 408,
        "question": "Lengkapi susunan Idhafah: «رَئِيسُ ...... يَدْعُو لِحِمَايَةِ الْبِيئَةِ» (Ketua Organisasi):",
        "options": [
          "جَمْعِيَّةٌ",
          "الْجَمْعِيَّةُ",
          "الْجَمْعِيَّةِ",
          "جَمْعِيَّةً"
        ],
        "answer": 2,
        "explanation": "Mudhaf Ilaihi harus majrur berharakat kasrah: «الْجَمْعِيَّةِ»."
      },
      {
        "id": 409,
        "question": "Kalimat «نُنَظِّفُ الشَّاطِئَ يَوْمَ الأَحَدِ», kata «يَوْمَ» berkedudukan sebagai:",
        "options": [
          "Dharaf Makan",
          "Na't",
          "Mubtada'",
          "Dharaf Zaman (Keterangan Waktu)"
        ],
        "answer": 3,
        "explanation": "«يَوْمَ» menyatakan waktu pelaksanaan kegiatan (hari Ahad/Minggu)."
      },
      {
        "id": 410,
        "question": "\"Di bawah naungan pohon\" dalam Bahasa Arab disajikan dengan susunan Dharaf & Idhafah:",
        "options": [
          "فَوْقَ ظِلِّ الشَّجَرَةِ",
          "تَحْتَ ظِلِّ الشَّجَرَةِ",
          "أَمَامَ ظِلِّ الشَّجَرَةِ",
          "وَرَاءَ ظِلِّ الشَّجَرَةِ"
        ],
        "answer": 1,
        "explanation": "«تَحْتَ» (di bawah) + «ظِلِّ الشَّجَرَةِ» (naungan pohon)."
      }
    ]
  },
  {
    "id": "level_5",
    "title": "Level 5: 🏆 Master Qawa'id & Analisis Kalimat (Boss Level)",
    "badge": "Level 5 (Master)",
    "botName": "Bot Syaikhul Lughah AI 👑",
    "botAvatar": "👑",
    "botRole": "Pakar Bahasa Arab Tertinggi (AI Boss)",
    "botDifficulty": "Master Boss (92%)",
    "botAccuracy": 0.92,
    "description": "Ujian puncak menyeluruh: gabungan tarkib Qawa'id, analisis kedudukan kata (i'rab dasar), dan terjemah kontekstual tingkat lanjut.",
    "questions": [
      {
        "id": 501,
        "question": "Perhatikan kalimat: «إِنَّ حِمَايَةَ الْبِيئَةِ وَاجِبٌ دِينِيٌّ». Susunan «وَاجِبٌ دِينِيٌّ» berkedudukan sebagai:",
        "options": [
          "Mudhaf & Mudhaf Ilaihi",
          "Khabar Inna berupa susunan Na't & Man'ut",
          "Mubtada' Muakhkhar",
          "Dharaf Zaman"
        ],
        "answer": 1,
        "explanation": "«وَاجِبٌ» adalah Khabar Inna (marfu'), dan «دِينِيٌّ» adalah sifat (Na't) yang mengikutinya."
      },
      {
        "id": 502,
        "question": "Lengkapi kalimat perintah dan larangan seimbang: «...... عَلَى نَظَافَةِ الْمَاءِ، وَ...... فِيهِ النِّفَايَاتِ!»",
        "options": [
          "حَافِظِي - لاَ تَرْمُوا",
          "حَافِظُوا - تَرْمِي",
          "تُحَافِظُ - تَرْمِ",
          "احْرِصْ - لاَ تَرْمِ"
        ],
        "answer": 3,
        "explanation": "Keduanya seimbang untuk dhamir أَنْتَ: «احْرِصْ» (jagalah) dan «لاَ تَرْمِ» (jangan buang)."
      },
      {
        "id": 503,
        "question": "Manakah kalimat yang memadukan Isim Tafdhil dan Idhafah dengan kaidah yang sempurna?",
        "options": [
          "مَاءُ النَّهْرِ أَنْظَفُ مِيَاهِ الْمَدِينَةِ",
          "مَاءُ النَّهْرِ الأَنْظَفُ مِنْ مِيَاهِ",
          "مَاءٌ نَهْرٌ أَنْظَفُ مِيَاهٌ",
          "الْمَاءُ النَّهْرِ نَظِيفٌ مِيَاهِ"
        ],
        "answer": 0,
        "explanation": "«مَاءُ النَّهْرِ» adalah Idhafah, dan «أَنْظَفُ مِيَاهِ الْمَدِينَةِ» adalah Isim Tafdhil mudhaf ke ma'rifah (paling bersih)."
      },
      {
        "id": 504,
        "question": "Pada kalimat «يَا مُسْلِمُونَ، لاَ تُفْسِدُوا فِي الأَرْضِ», tanda jazem pada «لاَ تُفْسِدُوا» adalah:",
        "options": [
          "Sukun",
          "Fathah",
          "Membuang huruf Nun (حَذْفُ النُّونِ)",
          "Membuang huruf 'Illat"
        ],
        "answer": 2,
        "explanation": "Af'alul Khamsah (أَنْتُمْ) dijazemkan dengan membuang huruf nun (asalnya: تُفْسِدُونَ)."
      },
      {
        "id": 505,
        "question": "Lengkapi kalimat: «تَقْتَصِدُ الدُّوَلُ فِي اسْتِهْلَاكِ الطَّاقَةِ لِأَنَّهَا ...... تَكْلُفَةً» (lebih murah biayanya):",
        "options": [
          "أَغْلَى",
          "أَكْبَرُ",
          "أَثْقَلُ",
          "أَرْخَصُ"
        ],
        "answer": 3,
        "explanation": "«أَرْخَصُ» adalah Isim Tafdhil dari «رَخِيصٌ» yang berarti \"lebih murah\"."
      },
      {
        "id": 506,
        "question": "Manakah i'rab yang benar untuk kata «أَشَدُّ» pada kalimat «تَلَوُّثُ الْهَوَاءِ أَشَدُّ ضَرَرًا مِنَ النِّفَايَاتِ»?",
        "options": [
          "Khabar Mubtada' marfu' dengan dhommah",
          "Na't manshub dengan fathah",
          "Mudhaf Ilaihi majrur dengan kasrah",
          "Fa'il marfu' dengan dhommah"
        ],
        "answer": 0,
        "explanation": "«تَلَوُّثُ» adalah Mubtada', dan «أَشَدُّ» adalah Khabar Mubtada' yang menerangkan tingkat bahayanya."
      },
      {
        "id": 507,
        "question": "Pada frase «مَشْرُوعُ التَّشْجِيرِ الْجَدِيدُ», kata «الْجَدِيدُ» adalah sifat (Na't) untuk kata:",
        "options": [
          "التَّشْجِيرِ",
          "مَشْرُوعُ",
          "Al-Bi'ah",
          "Mustamir"
        ],
        "answer": 1,
        "explanation": "«الْجَدِيدُ» berharakat dhommah marfu' mengikuti harakat mudhaf «مَشْرُوعُ», bukan «التَّشْجِيرِ» yang majrur."
      },
      {
        "id": 508,
        "question": "Konjugasi fi'il amr yang benar untuk mengajak rombongan siswi (أَنْتُنَّ) merawat kebun adalah:",
        "options": [
          "اِزْرَعُوا الْحَدِيقَةَ!",
          "اِزْرَعِي الْحَدِيقَةَ!",
          "اِزْرَعْنَ الْحَدِيقَةَ!",
          "اِزْرَعَا الْحَدِيقَةَ!"
        ],
        "answer": 2,
        "explanation": "Untuk jamak mu'annats (أَنْتُنَّ), fi'il amr menggunakan nun niswah: «اِزْرَعْنَ»."
      },
      {
        "id": 509,
        "question": "Kalimat «تَجْتَمِعُ لَجْنَةُ الْبِيئَةِ عَصْرًا خَلْفَ مَكْتَبَةِ الْمَدْرَسَةِ» mengandung:",
        "options": [
          "Hanya Dharaf Makan saja",
          "Dharaf Zaman («عَصْرًا») dan Dharaf Makan («خَلْفَ»)",
          "Hanya Dharaf Zaman saja",
          "Susunan Na't Man'ut tanpa Dharaf"
        ],
        "answer": 1,
        "explanation": "«عَصْرًا» adalah keterangan waktu (Zaman) dan «خَلْفَ» adalah keterangan tempat (Makan)."
      },
      {
        "id": 510,
        "question": "Lengkapi percakapan: «هَلِ الْهَوَاءُ فِي الْقَرْيَةِ أَنْقَى مِنَ الْمَدِينَةِ؟» - «نَعَمْ، الْهَوَاءُ فِي الْقَرْيَةِ ......»:",
        "options": [
          "أَكْثَرُ تَلَوُّثًا",
          "أَقَلُّ نَقَاءً",
          "أَنْقَى وَأَنْعَشُ",
          "مُلَوَّثٌ جِدًّا"
        ],
        "answer": 2,
        "explanation": "Udara di desa lebih murni dan menyegarkan: «أَنْقَى وَأَنْعَشُ»."
      }
    ]
  }
]
};

ARABIC_DATA.duelQuestions = ARABIC_DATA.duelQuestionSets[0].questions;

if (typeof module !== 'undefined' && module.exports) {
  module.exports = ARABIC_DATA;
}
