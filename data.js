// Data Materi Bahasa Arab Kelas 9: الحفاظ على البيئة (Pelestarian Lingkungan)

const ARABIC_DATA = {
  meta: {
    title: "الحفاظ على البيئة",
    subtitle: "Media Pembelajaran Bahasa Arab Kelas 9 MTs / SMP Islam",
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
          { word: "لَهُ صُوَرٌ مُتَعَدِّدَةٌ", color: "purple", role: "خَبَرُ الْمُبْتَدَأِ (مُؤَخَّرٌ) + نَعْتٌ", roleDesc: "Khabar Mu'akhkhar + Na'at (Sifat)", irob: "صُوَرٌ مُبْتَدَأٌ مُؤَخَّرٌ مَرْفُوعٌ بِالضَّمَّةِ، مُتَعَدِّدَةٌ نَعْتٌ مَرْفُوعٌ بِالضَّمَّةِ", meaning: "Memiliki bermacam-macam bentuk" },
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
        desc: "Kata kerja yang digunakan untuk memerintah/meminta seseorang melakukan tindakan pelestarian lingkungan.",
        examples: [
          { arabic: "احْرِصْ عَلَى النَّظَافَةِ!", latin: "Iḥriṣ 'alan-naẓāfah!", indonesian: "Jagalah kebersihan!" },
          { arabic: "اِغْرِسِ الأَشْجَارَ فِي الْحَدِيقَةِ!", latin: "Iġrisil-asy-jāra fil-ḥadīqah!", indonesian: "Tanamlah pohon di taman!" },
          { arabic: "حَافِظُوا عَلَى نَظَافَةِ الْمَدْرَسَةِ!", latin: "Ḥāfiẓū 'alā naẓāfatil-madrasah!", indonesian: "Jagalah (kalian) kebersihan sekolah!" }
        ]
      },
      {
        type: "Fi'il Nahi (فِعْلُ النَّهْيِ)",
        desc: "Kata kerja yang digunakan untuk melarang seseorang merusak lingkungan (Pola: لاَ + الفعل المضارع المجزوم).",
        examples: [
          { arabic: "لاَ تَرْمِ الْقُمَامَةَ فِي الشَّارِعِ!", latin: "Lā tarmi al-qumāmata fisy-syāri'!", indonesian: "Jangan buang sampah di jalan!" },
          { arabic: "لاَ تُسْرِفْ فِي اسْتِهْلاَكِ الْمَاءِ!", latin: "Lā tusrif fī istihlākil-mā'!", indonesian: "Jangan boros dalam menggunakan air!" },
          { arabic: "لاَ تَقْطَعُوا الأَشْجَارَ عَبَثًا!", latin: "Lā taqṭa'ūl-asy-jāra 'abaṡan!", indonesian: "Janganlah kalian memotong pohon sembarangan!" }
        ]
      }
    ],
    tafdhil: {
      badge: "لَاحِظْ",
      title: "إِسْمُ التَّفْضِيْلِ",
      source: "الشيخ مصطفى الغلاييني - جامع الدروس العربية، بيروت: دار الكتب العلمية، ٢٠١٢",
      instruction: "Perhatikan contoh kalimat pada kedua kolom di bawah ini!",
      pattern: "أَفْعَلُ",
      columnA: {
        title: "A",
        label: "_lebih dari_",
        color: "amber",
        examples: [
          { arabic: "أَنَا أَجْمَلُ مِنْكَ", indonesian: "Aku lebih tampan/indah dari kamu." },
          { arabic: "خَالِدٌ أَكْبَرُ مِنْ أَخِيْهِ", indonesian: "Khalid lebih besar dari saudaranya." },
          { arabic: "مَدْرَسَتِيْ أَوْسَعُ مِنْ مَدْرَسَتِكَ", indonesian: "Sekolahku lebih luas dari sekolahmu." }
        ],
        rule: "أَفْعَلُ + مِنْ + إِسْمٌ"
      },
      columnB: {
        title: "B",
        label: "_paling/ter_",
        color: "emerald",
        examples: [
          { arabic: "فَصْلِيْ أَوْسَعُ الْفُصُوْلِ فِي الْمَدْرَسَةِ", indonesian: "Kelasku adalah kelas paling luas di sekolah." },
          { arabic: "أَنَا أَجْمَلُ التَّلَامِيْذِ فِي الْفَصْلِ", indonesian: "Aku murid paling tampan di kelas." },
          { arabic: "سُوْرَبَايَا أَكْبَرُ الْمُدُنِ فِي جَاوَى الشَّرْقِيَّةِ", indonesian: "Surabaya adalah kota terbesar di Jawa Timur." }
        ],
        rule: "أَفْعَلُ + جَمْعٌ"
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
          text: "Adapun susunan kalimat pada kolom (a), yaitu pada contoh (a):",
          formula: "أَفْعَلُ + مِنْ + إِسْمٌ",
          meaning: "Isim Tafdhil + MIN + Isim (Bermakna LEBIH ... DARI ...)"
        },
        {
          num: 3,
          text: "Dan susunan kalimat pada kolom (b), yaitu pada contoh (b):",
          formula: "أَفْعَلُ + جَمْعٌ",
          meaning: "Isim Tafdhil + Kata Jamak (Mudhaf Ilaihi) (Bermakna PALING / TER...)"
        }
      ]
    }
  },

  dialogues: [
    {
      id: 1,
      title: "الْحِوَارُ الأَوَّلُ",
      subtitle: "Percakapan 1: Antara Ustadzah (Guru) dan Para Siswa",
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
          speaker: "الْأُسْتَاذَةُ",
          role: "Guru (Ustadzah)",
          avatar: "avatar-ustadzah.jpg",
          bubbleColor: "amber",
          arabic: "أَيُّهَا التَّلاَمِيْذُ، أُنْظُرُوا إِلَى الصُّوْرَتَيْنِ.",
          translation: "Wahai murid-murid, lihatlah kedua gambar ini!"
        },
        {
          id: 2,
          speaker: "الْأُسْتَاذَةُ",
          role: "Guru (Ustadzah)",
          avatar: "avatar-ustadzah.jpg",
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
          speaker: "الْأُسْتَاذَةُ",
          role: "Guru (Ustadzah)",
          avatar: "avatar-ustadzah.jpg",
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
          speaker: "الْأُسْتَاذَةُ",
          role: "Guru (Ustadzah)",
          avatar: "avatar-ustadzah.jpg",
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
          speaker: "الْأُسْتَاذَةُ",
          role: "Guru (Ustadzah)",
          avatar: "avatar-ustadzah.jpg",
          bubbleColor: "sky",
          arabic: "أَحْسَنْتَ يَا حَمْدَانُ. لِذَلِكَ أَيُّهَا التَّلاَمِيْذُ، الْبِيئَةُ تَنْتَظِرُ دَوْرَكُمْ. عَلَيْكُمْ أَنْ تُحَافِظُوا عَلَى الْبِيئَةِ.",
          translation: "Bagus sekali wahai Hamdan! Oleh karena itu wahai murid-murid, lingkungan hidup menunggu peran kalian. Hendaknya kalian melestarikan lingkungan hidup."
        }
      ]
    },
    {
      id: 2,
      title: "الْحِوَارُ الثَّانِي",
      subtitle: "Percakapan 2: Antara Dua Siswi (Salma & Aisyah)",
      instruction: "أُنْظُرْ وَاسْتَمِعْ وَ أَعِدْ.",
      instructionTranslation: "Lihat, dengarkan, dan ulangi.",
      lines: [
        {
          id: 1,
          speaker: "سَلْمَى",
          role: "Siswi (Salma)",
          avatar: "avatar-siswi.jpg",
          bubbleColor: "purple",
          arabic: "هَلْ تُحِبِّيْنَ الْبِيئَةَ النَّظِيْفَةَ؟",
          translation: "Apakah kamu menyukai lingkungan yang bersih?"
        },
        {
          id: 2,
          speaker: "عَائِشَةُ",
          role: "Siswi (Aisyah)",
          avatar: "avatar-siswi.jpg",
          bubbleColor: "blue",
          arabic: "نَعَمْ، أُحِبُّهَا. يَجِبُ عَلَيْنَا أَنْ نُحَافِظَ عَلَيْهَا.",
          translation: "Ya, aku sangat menyukainya. Wajib bagi kita untuk melestarikannya."
        },
        {
          id: 3,
          speaker: "سَلْمَى",
          role: "Siswi (Salma)",
          avatar: "avatar-siswi.jpg",
          bubbleColor: "emerald",
          arabic: "كَيْفَ نُحَافِظُ عَلَى الْبِيئَةِ؟",
          translation: "Bagaimana cara kita menjaga dan melestarikan lingkungan?"
        },
        {
          id: 4,
          speaker: "عَائِشَةُ",
          role: "Siswi (Aisyah)",
          avatar: "avatar-siswi.jpg",
          bubbleColor: "amber",
          arabic: "مِنْهَا:\n✓ نَرْمِي الْقُمَامَةَ فِي الْمَزْبَلَةِ\n✓ نَزْرَعُ الأَشْجَارَ\n✓ نُقَلِّلُ الْبَلاَسْتِيْكَ",
          translation: "Di antaranya:\n✓ Membuang sampah di tempat sampah\n✓ Menanam pohon\n✓ Mengurangi penggunaan plastik"
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
        "لَا تَرْمِ الْقُمَامَةَ فِي النَّهْرِ!",
        "احْرِصْ عَلَى نَظَافَةِ مَدْرَسَتِكَ!",
        "الْأُسْتَاذُ يَغْرِسُ الْأَشْجَارَ.",
        "التَّلَوُّثُ خَطِيرٌ جِدًّا."
      ],
      answer: 1,
      explanation: "«احْرِصْ» هُوَ فِعْلُ أَمْرٍ لِلْمُفَرَدِ الْمُذَكَّرِ لِلْحَثِّ عَلَى النَّظَافَةِ."
    },
    {
      id: 4,
      question: "أَيُّ جُمْلَةٍ مِمَّا يَلِي تُعَبِّرُ عَنْ (فِعْلِ النَّهْيِ)؟",
      options: [
        "اِغْرِسِ الْأَشْجَارَ فِي الْحَدِيقَةِ!",
        "أَنَا أُحِبُّ الْبِيئَةَ النَّظِيفَةَ.",
        "لَا تُسْرِفْ فِي اسْتِهْلَاكِ الْمَاءِ!",
        "فَصْلِي أَوْسَعُ الْفُصُولِ."
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
      question: "أَكْمِلِ الْجُمْلَةَ بِفِعْلِ النَّهْيِ الْمُنَاسِبِ لِلْجَمْعِ:\n«يَا طُلَّابُ، ... الْأَشْجَارَ عَبَثًا!»",
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
    { id: 101, name: "Ahmad Fauzi", class: "IX-A", score: 95, progress: 100, lastActive: "Hari ini" },
    { id: 102, name: "Siti Rahma", class: "IX-A", score: 88, progress: 90, lastActive: "Hari ini" },
    { id: 103, name: "Muhammad Rizky", class: "IX-B", score: 92, progress: 95, lastActive: "Kemarin" },
    { id: 104, name: "Aisyah Putri", class: "IX-A", score: 78, progress: 75, lastActive: "2 hari lalu" },
    { id: 105, name: "Bilal Ramadhan", class: "IX-B", score: 85, progress: 85, lastActive: "Hari ini" }
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
      subtitle: "Materi Pembelajaran Bahasa Arab Kelas 9 MTs (الحفاظ على البيئة)",
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
            image: "img-reboisasi.jpg",
            fallbackSvg: "reboisasi",
            options: [
              { title: "Penanaman Pohon", correct: true, image: "img-reboisasi.jpg", fallbackSvg: "reboisasi" },
              { title: "Banjir Bandang", correct: false, image: "img-banjir.jpg", fallbackSvg: "banjir" },
              { title: "Polusi Asap Pabrik", correct: false, image: "img-polusi.jpg", fallbackSvg: "polusi" }
            ]
          },
          {
            id: 2,
            audioText: "رَمْيُ النُّفَايَاتِ فِي سَلَّةِ الْمُهْمَلاَتِ",
            title: "Membuang Sampah di Tempatnya",
            image: "img-sampah.jpg",
            fallbackSvg: "sampah",
            options: [
              { title: "Bahan Kimia", correct: false, image: "img-bahan-kimia.jpg", fallbackSvg: "bahan_kimia" },
              { title: "Membuang Sampah", correct: true, image: "img-sampah.jpg", fallbackSvg: "sampah" },
              { title: "Pemanasan Global", correct: false, image: "img-pemanasan-global.jpg", fallbackSvg: "pemanasan_global" }
            ]
          }
        ]
      }
    ]
  },

  duelQuestionSets: [
    {
      id: "paket_a",
      title: "Paket A: 🌿 Pelestarian Lingkungan & Fi'il Amr",
      badge: "Paket 1 (10 Soal)",
      description: "Soal seputar kosa kata lingkungan, perintah menjaga kebersihan, dan Fi'il Amr.",
      questions: [
        {
          id: 201,
          question: "Manakah fi'il amr (perintah) yang benar untuk menjaga kebersihan?",
          options: ["احْرِصْ عَلَى النَّظَافَةِ!", "لاَ تُسْرِفْ فِي الْمَاءِ!", "النَّظَافَةُ جَمِيلَةٌ", "يُحَافِظُ عَلَى البيئة"],
          answer: 0,
          explanation: "«احْرِصْ» adalah Fi'il Amr (perintah) dari fi'il tsulatsi untuk menyuruh menjaga kebersihan."
        },
        {
          id: 202,
          question: "Bentuk fi'il nahi (larangan) membuang sampah sembarangan yang tepat adalah:",
          options: ["لاَ تَرْمِ الْقُمَامَةَ فِي الشَّارِعِ!", "ارْمِ الْقُمَامَةَ فِي السَّلَّةِ!", "الْقُمَامَةُ كَثِيرَةٌ", "رَمَى الْقُمَامَةَ"],
          answer: 0,
          explanation: "«لاَ تَرْمِ» menggunakan La Nahiyah untuk melarang membuang sampah sembarangan."
        },
        {
          id: 203,
          question: "Ubah fi'il amr «احْرِصْ» untuk kamu perempuan (أَنْتِ):",
          options: ["احْرِصِي", "احْرِصُوا", "احْرِصْنَ", "احْرِصَا"],
          answer: 0,
          explanation: "Untuk Dhamir Mu'annas (أَنْتِ), Fi'il Amr ditambahkan Yaa Mukhatabah di akhiran: «احْرِصِي»."
        },
        {
          id: 204,
          question: "Arti dari kosakata «التَّشْجِيرُ» dalam tema lingkungan adalah:",
          options: ["Penghijauan / Reboisasi", "Penggundulan Hutan", "Pencemaran Udara", "Bencana Banjir"],
          answer: 0,
          explanation: "«التَّشْجِيرُ» berarti Penghijauan atau Penanaman Pohon kembali (Reboisasi)."
        },
        {
          id: 205,
          question: "Fi'il Nahi «لاَ تُسْرِفُوا فِي الْمَاءِ» ditujukan untuk dhamir:",
          options: ["أَنْتُمْ (Kalian banyak laki-laki)", "أَنْتَ (Kamu satu laki-laki)", "أَنْتِ (Kamu satu perempuan)", "أَنْتُمَا (Kalian berdua)"],
          answer: 0,
          explanation: "Adanya Wawu Al-Jama'ah (وا) pada «تُسْرِفُوا» menandakan subjek (أَنْتُمْ)."
        },
        {
          id: 206,
          question: "Arti dari ungkapan «تَدْوِيرُ النَّفَايَاتِ» adalah:",
          options: ["Daur Ulang Sampah", "Membakar Sampah", "Menumpuk Sampah", "Menjual Sampah"],
          answer: 0,
          explanation: "«تَدْوِيرُ النَّفَايَاتِ» berarti Recycling / Daur Ulang Sampah."
        },
        {
          id: 207,
          question: "Lengkapi kalimat perintah: «يَا طُلاَّبُ، ...... عَلَى نَظَافَةِ الْمَدْرَسَةِ!»",
          options: ["حَافِظُوا", "حَافِظْ", "حَافِظِي", "تُحَافِظُونَ"],
          answer: 0,
          explanation: "Karena munada berupa jamak «يَا طُلاَّبُ», gunakan fi'il amr jamak mudzakkar «حَافِظُوا»."
        },
        {
          id: 208,
          question: "Manakah fi'il amr yang bermakna \"Tanamlah!\" untuk kamu 1 orang laki-laki (أَنْتَ)?",
          options: ["اِزْرَعْ", "اِزْرَعِي", "اِزْرَعُوا", "تَزْرَعُ"],
          answer: 0,
          explanation: "Fi'il amr dari «زَرَعَ - يَزْرَعُ» untuk (أَنْتَ) adalah «اِزْرَعْ» (sukun di akhir)."
        },
        {
          id: 209,
          question: "Bentuk larangan \"Janganlah kamu (perempuan) mematikan lampu!\" yang benar:",
          options: ["لاَ تُطْفِئِي النُّورَ!", "لاَ تُطْفِئْ النُّورَ!", "أَطْفِئِي النُّورَ!", "لاَ تُطْفِئُوا النُّورَ!"],
          answer: 0,
          explanation: "Untuk (أَنْتِ), fi'il nahi berakhiran yaa sukun: «لاَ تُطْفِئِي»."
        },
        {
          id: 210,
          question: "Terjemahan dari «نَظَّفَ - يُنَظِّفُ - نَظِّفْ» secara berurutan adalah:",
          options: ["Telah membersihkan - Sedang membersihkan - Bersihkanlah!", "Sedang membersihkan - Telah membersihkan - Jangan bersihkan!", "Bersihkanlah! - Telah membersihkan - Sedang membersihkan", "Membersihkan - Kebersihan - Orang yang bersih"],
          answer: 0,
          explanation: "Bentuk Fi'il Madhi, Mudhari', dan Amr berturut-turut."
        }
      ]
    },
    {
      id: "paket_b",
      title: "Paket B: 📚 Tata Bahasa Isim Tafdhil & Na't Man'ut",
      badge: "Paket 2 (10 Soal)",
      description: "Soal seputar kata perbandingan (Isim Tafdhil) dan kata sifat (Na't & Man'ut).",
      questions: [
        {
          id: 301,
          question: "Bentuk Isim Tafdhil dari kata «كَبِيرٌ» (besar) adalah:",
          options: ["أَكْبَرُ", "كُبْرَى", "تَكْبِيرٌ", "كَبِيرَةٌ"],
          answer: 0,
          explanation: "Wazan Isim Tafdhil Mudzakkar adalah «أَفْعَلُ» (كَبِيرٌ → أَكْبَرُ)."
        },
        {
          id: 302,
          question: "Kalimat «جَاوَةُ أَكْبَرُ مِنَ الْمَدِينَةِ» memiliki arti:",
          options: ["Jawa lebih besar daripada kota tersebut", "Jawa adalah kota paling besar", "Kota tersebut sangat besar", "Jawa kota yang indah"],
          answer: 0,
          explanation: "Pola Isim Tafdhil + «مِنْ» menyatakan perbandingan \"lebih ... daripada\"."
        },
        {
          id: 303,
          question: "Manakah kalimat yang menggunakan Isim Tafdhil bermakna \"PALING / TER\" (Superlative)?",
          options: ["الْغَابَةُ أَجْمَلُ أَمَاكِنِ الطَّبِيعَةِ", "الْغَابَةُ أَجْمَلُ مِنْ حَدِيقَةِ الْبَيْتِ", "الْغَابَةُ جَمِيلَةٌ جِدًّا", "هَذِهِ غَابَةٌ جَمِيلَةٌ"],
          answer: 0,
          explanation: "Isim Tafdhil yang dimudhafkan ke isim makrifah/jamak bermakna \"Paling / Ter-\"."
        },
        {
          id: 304,
          question: "Susunan Na't & Man'ut (kata sifat dan yang disifati) yang benar adalah:",
          options: ["بِيئَةٌ نَظِيفَةٌ", "بِيئَةٌ النَّظِيفَةُ", "الْبِيئَةُ نَظِيفَةٌ", "نَظِيفَةٌ بِيئَةٌ"],
          answer: 0,
          explanation: "Na't harus mengikuti Man'ut dalam hal mudzakkar/mu'annas dan nakirah/makrifah."
        },
        {
          id: 305,
          question: "Bentuk Isim Tafdhil dari kata «نَظِيفٌ» (bersih) adalah:",
          options: ["أَنْظَفُ", "نَظَاَفَةٌ", "مُنَظَّفٌ", "تَنْظِيفٌ"],
          answer: 0,
          explanation: "«نَظِيفٌ» mengikuti wazan «أَفْعَلُ» menjadi «أَنْظَفُ» (lebih bersih)."
        },
        {
          id: 306,
          question: "Pada kalimat «الْهَوَاءِ النَّقِيِّ», kata «النَّقِيِّ» kedudukannya sebagai:",
          options: ["Na't (Sifat)", "Man'ut (Yang disifati)", "Mubtada'", "Khabar"],
          answer: 0,
          explanation: "«النَّقِيِّ» menjelaskan sifat dari «الْهَوَاءِ», sehingga berkedudukan sebagai Na't."
        },
        {
          id: 307,
          question: "Lengkapi kalimat perbandingan: «الشَّجَرَةُ ...... مِنَ الزَّهْرَةِ»",
          options: ["أَطْوَلُ", "طَوِيلَةٌ", "طَوِيلٌ", "طُولٌ"],
          answer: 0,
          explanation: "Untuk perbandingan \"lebih tinggi daripada\", gunakan Isim Tafdhil «أَطْوَلُ مِنْ»."
        },
        {
          id: 308,
          question: "Manakah bentuk Isim Tafdhil Mu'annas (feminin) dari «أَكْبَرُ»?",
          options: ["كُبْرَى", "كَبِيرَةٌ", "أَكْبَرَةٌ", "كِبَارٌ"],
          answer: 0,
          explanation: "Wazan Isim Tafdhil mu'annas adalah «فُعْلَى» (أَكْبَرُ → كُبْرَى)."
        },
        {
          id: 309,
          question: "Pilih kalimat Na't Man'ut berbentuk Makrifah (ber-AL) yang benar:",
          options: ["الْمَاءُ النَّقِيُّ مُفِيدٌ لِلصِّحَّةِ", "الْمَاءُ نَقِيٌّ مُفِيدٌ", "مَاءٌ النَّقِيُّ مُفِيدٌ", "الْمَاءُ النَّقِيَةُ مُفِيدٌ"],
          answer: 0,
          explanation: "Keduanya ber-AL dan mudzakkar: «الْمَاءُ النَّقِيُّ»."
        },
        {
          id: 310,
          question: "Terjemahkan ke Bahasa Arab: \"Matahari lebih besar daripada Bumi.\"",
          options: ["الشَّمْسُ أَكْبَرُ مِنَ الأَرْضِ", "الشَّمْسُ كَبِيرَةٌ فِي الأَرْضِ", "الأَرْضُ أَكْبَرُ مِنَ الشَّمْسِ", "الشَّمْسُ كَبِيرٌ جِدًّا"],
          answer: 0,
          explanation: "«الشَّمْسُ أَكْبَرُ مِنَ الأَرْضِ» adalah struktur perbandingan yang tepat."
        }
      ]
    },
    {
      id: "paket_c",
      title: "Paket C: 🌊 Al-Idhafah & Dharaf Makan/Zaman",
      badge: "Paket 3 (10 Soal)",
      description: "Soal seputar susunan Idhafah (Mudhaf & Mudhaf Ilaihi) serta keterangan waktu dan tempat.",
      questions: [
        {
          id: 401,
          question: "Manakah contoh susunan Mudhaf & Mudhaf Ilaihi (Al-Idhafah) yang benar?",
          options: ["حَدِيقَةُ الْمَدْرَسَةِ", "حَدِيقَةٌ الْمَدْرَسَةِ", "الْحَدِيقَةُ الْمَدْرَسَةِ", "حَدِيقَةُ مَدْرَسَةٌ"],
          answer: 0,
          explanation: "Mudhaf tidak boleh ber-AL dan tidak bertanwin, sedangkan Mudhaf Ilaihi berharakat majrur (kasrah)."
        },
        {
          id: 402,
          question: "Pada frase «تَلَوُّثُ الْهَوَاءِ», harakat akhir kata «الْهَوَاءِ» adalah kasrah karena kedudukannya sebagai:",
          options: ["Mudhaf Ilaihi", "Mudhaf", "Na't", "Fa'il"],
          answer: 0,
          explanation: "Setiap Mudhaf Ilaihi hukumnya majrur (berharakat kasrah)."
        },
        {
          id: 403,
          question: "Arti dari Dharaf Makan «أَمَامَ» adalah:",
          options: ["Di depan", "Di belakang", "Di atas", "Di bawah"],
          answer: 0,
          explanation: "«أَمَامَ» adalah kata keterangan tempat yang berarti \"Di depan\"."
        },
        {
          id: 404,
          question: "Lengkapi kalimat: «يَزْرَعُ الطَّالِبُ الأَشْجَارَ ...... الْمَدْرَسَةِ» (di belakang sekolah)",
          options: ["وَرَاءَ", "فَوْقَ", "تَحْتَ", "مَعَ"],
          answer: 0,
          explanation: "Dharaf Makan \"di belakang\" adalah «وَرَاءَ» atau «خَلْفَ»."
        },
        {
          id: 405,
          question: "Ketentuan Mudhaf dalam tata bahasa Arab adalah:",
          options: ["Tidak boleh memakai AL dan Tanwin", "Wajib memakai AL", "Wajib memakai Tanwin", "Harus berharakat fathah selalu"],
          answer: 0,
          explanation: "Syarat Mudhaf: Tanwin dan Alif-Lam (AL) harus dibuang."
        },
        {
          id: 406,
          question: "Manakah kata yang merupakan Dharaf Zaman (Keterangan Waktu)?",
          options: ["صَبَاحًا", "تَحْتَ", "أَمَامَ", "بَيْنَ"],
          answer: 0,
          explanation: "«صَبَاحًا» menunjukkan keterangan waktu (di pagi hari)."
        },
        {
          id: 407,
          question: "Lengkapi Idhafah: «رَئِيسُ ...... يَحْمِي الْبِيئَةَ» (Ketua Organisasi)",
          options: ["الْجَمْعِيَّةِ", "جَمْعِيَّةٌ", "الْجَمْعِيَّةُ", "جَمْعِيَّةً"],
          answer: 0,
          explanation: "Mudhaf Ilaihi harus majrur ber-AL: «الْجَمْعِيَّةِ»."
        },
        {
          id: 408,
          question: "\"Di bawah naungan pohon\" dalam Bahasa Arab disajikan dengan susunan Dharaf & Idhafah:",
          options: ["تَحْتَ ظِلِّ الشَّجَرَةِ", "فَوْقَ ظِلِّ الشَّجَرَةِ", "أَمَامَ ظِلِّ الشَّجَرَةِ", "وَرَاءَ ظِلِّ الشَّجَرَةِ"],
          answer: 0,
          explanation: "«تَحْتَ» (di bawah) + «ظِلِّ الشَّجَرَةِ» (naungan pohon)."
        },
        {
          id: 409,
          question: "Kalimat «نُنَظِّفُ الشَّاطِئَ يَوْمَ الأَحَدِ», kata «يَوْمَ» berkedudukan sebagai:",
          options: ["Dharaf Zaman (Keterangan Waktu)", "Dharaf Makan (Keterangan Tempat)", "Na't", "Mubtada'"],
          answer: 0,
          explanation: "«يَوْمَ» menyatakan waktu pelaksanaan kegiatan (hari Minggu)."
        },
        {
          id: 410,
          question: "Pilih bentuk Idhafah dengan makna \"Air Limbah Sungai\" yang tepat:",
          options: ["مِيَاهُ صَرْفِ النَّهْرِ", "المِيَاهُ الصَّرْفِ النَّهْرِ", "مِيَاهٌ صَرْفٌ نَهْرٌ", "مِيَاهُ النَّهْرِ صَرْفًا"],
          answer: 0,
          explanation: "Idhafah bertingkat: «مِيَاهُ صَرْفِ النَّهْرِ»."
        }
      ]
    }
  ]
};

ARABIC_DATA.duelQuestions = ARABIC_DATA.duelQuestionSets[0].questions;

if (typeof module !== 'undefined' && module.exports) {
  module.exports = ARABIC_DATA;
}
