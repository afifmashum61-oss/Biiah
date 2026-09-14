/**
 * Data Material Bahasa Arab Kelas 11 MA
 * Pemilik / Penyusun: Yosi, S. Ag, M. Pd. (MAN 1 Pontianak)
 */

const ARABIC_DATA = {
  identity: {
    name: "Yosi, S. Ag, M. Pd.",
    title: "Guru Bahasa Arab",
    school: "MAN 1 Pontianak",
    subject: "Bahasa Arab - Kelas XI MA",
    year: "2026",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=300&auto=format&fit=crop"
  },

  topics: [
    { id: "topik1", title: "BAB 1: السَّفَرُ وَالسِّيَاحَةُ (Wisata & Bepergian)", icon: "compass" },
    { id: "topik2", title: "BAB 2: الصِّحَّةُ (Kesehatan)", icon: "activity" },
    { id: "topik3", title: "BAB 3: الحَجُّ وَالعُمْرَةُ (Haji & Umrah)", icon: "moon" },
    { id: "topik4", title: "BAB 4: الأَدْيَانُ فِي إِنْدُونِيسِيَا (Agama di Indonesia)", icon: "globe" }
  ],

  mufrodat: [
    // --- BAB 1: السَّفَرُ وَالسِّيَاحَةُ (Bepergian & Wisata) ---
    {
      id: 1,
      topicId: "topik1",
      arabic: "سِيَاحَةٌ",
      latin: "Siyaahatun",
      indonesian: "Wisata / Pariwisata",
      exampleArabic: "السِّيَاحَةُ نَشَاطٌ مُهِمٌّ فِي أَيَّامِ الْعُطْلَةِ.",
      exampleIndo: "Wisata adalah kegiatan penting di hari libur.",
      type: "Nomina (Isim)",
      image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=400&auto=format&fit=crop"
    },
    {
      id: 2,
      topicId: "topik1",
      arabic: "غَارٌ",
      latin: "Ghaarun",
      indonesian: "Gua / Goa",
      exampleArabic: "ذَهَبْنَا إِلَى غَارِ فِيْنْدُوْل فِي يُوْكِيَاكِرْتَا.",
      exampleIndo: "Kami pergi ke Goa Pindul di Yogyakarta.",
      type: "Nomina (Isim)",
      image: "https://images.unsplash.com/photo-1508873696983-2df515122519?q=80&w=400&auto=format&fit=crop"
    },
    {
      id: 3,
      topicId: "topik1",
      arabic: "نَهْرٌ",
      latin: "Nahrun",
      indonesian: "Sungai",
      exampleArabic: "يَجْرِي الْمَاءُ فِي النَّهْرِ بِنَظَافَةٍ.",
      exampleIndo: "Air mengalir bersih di sungai.",
      type: "Nomina (Isim)",
      image: "https://images.unsplash.com/photo-1444464666168-49d633b86797?q=80&w=400&auto=format&fit=crop"
    },
    {
      id: 4,
      topicId: "topik1",
      arabic: "تَزَحْلُفٌ",
      latin: "Tazahlufun",
      indonesian: "Susur Sungai / Arung Jeram (Tubing)",
      exampleArabic: "مَارَسْنَا التَّزَحْلُفَ فِي النَّهْرِ.",
      exampleIndo: "Kami melakukan susur sungai di gua.",
      type: "Nomina (Isim)",
      image: "https://images.unsplash.com/photo-1530541930197-ff16ac917b0e?q=80&w=400&auto=format&fit=crop"
    },
    {
      id: 5,
      topicId: "topik1",
      arabic: "إِطَارَاتٌ",
      latin: "Ithaaraatun",
      indonesian: "Ban Pelampung / Ban",
      exampleArabic: "اسْتَخْدَمْنَا الإِطَارَاتِ لِلتَّزَحْلُفِ.",
      exampleIndo: "Kami menggunakan ban pelampung untuk susur sungai.",
      type: "Nomina (Isim)",
      image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=400&auto=format&fit=crop"
    },
    {
      id: 6,
      topicId: "topik1",
      arabic: "عَوَّامَةٌ",
      latin: "'Awwaamatun",
      indonesian: "Jaket Pelampung / Pelampung",
      exampleArabic: "لَبِسَ السَّائِحُ الْعَوَّامَةَ لِلأَمَانِ.",
      exampleIndo: "Wisatawan mengenakan pelampung demi keselamatan.",
      type: "Nomina (Isim)",
      image: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?q=80&w=400&auto=format&fit=crop"
    },
    {
      id: 7,
      topicId: "topik1",
      arabic: "مُرْشِدُ السِّيَاحَةِ",
      latin: "Murshid us-Siyaahati",
      indonesian: "Pemandu Wisata (Tour Guide)",
      exampleArabic: "شَرَحَ مُرْشِدُ السِّيَاحَةِ تَارِيخَ الْمَكَانِ.",
      exampleIndo: "Pemandu wisata menjelaskan sejarah tempat itu.",
      type: "Frasa Nomina",
      image: "https://images.unsplash.com/photo-1539635278303-d4002c07eae3?q=80&w=400&auto=format&fit=crop"
    },
    {
      id: 8,
      topicId: "topik1",
      arabic: "تَذْكِرَةٌ",
      latin: "Tadhkiratun",
      indonesian: "Tiket",
      exampleArabic: "حَجَزْتُ تَذْكِرَةَ الدُّخُولِ لِلْمَتْحَفِ.",
      exampleIndo: "Saya memesan tiket masuk ke museum.",
      type: "Nomina (Isim)",
      image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=400&auto=format&fit=crop"
    },
    {
      id: 9,
      topicId: "topik1",
      arabic: "شُبَّاكُ التَّذَاكِرِ",
      latin: "Shubbaak ut-Tadhaakiri",
      indonesian: "Loket Tiket",
      exampleArabic: "اِشْتَرَيْنَا التَّذَاكِرَ مِنْ شُبَّاكِ التَّذَاكِرِ.",
      exampleIndo: "Kami membeli tiket dari loket tiket.",
      type: "Frasa Nomina",
      image: "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?q=80&w=400&auto=format&fit=crop"
    },
    {
      id: 10,
      topicId: "topik1",
      arabic: "سُيَّاحٌ",
      latin: "Suyyaahun",
      indonesian: "Wisatawan / Turis",
      exampleArabic: "وَصَلَ السُّيَّاحُ إِلَى الْمَطَارِ صَبَاحًا.",
      exampleIndo: "Para wisatawan tiba di bandara pada pagi hari.",
      type: "Nomina (Isim Jamak)",
      image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=400&auto=format&fit=crop"
    },
    {
      id: 11,
      topicId: "topik1",
      arabic: "لُهْنَةٌ / هَدِيَّةٌ",
      latin: "Luhnatun / Hadiyyatun",
      indonesian: "Oleh-oleh / Souvenir",
      exampleArabic: "اِشْتَرَيْتُ لُهْنَةً جَمِيلَةً لِلأَصْدِقَاءِ.",
      exampleIndo: "Saya membeli oleh-oleh indah untuk teman-teman.",
      type: "Nomina (Isim)",
      image: "https://images.unsplash.com/photo-1513885535751-8b9238bd345a?q=80&w=400&auto=format&fit=crop"
    },
    {
      id: 12,
      topicId: "topik1",
      arabic: "بِطَاقَةُ الْمُرُورِ الإِلِكْتُرُونِيَّةُ",
      latin: "Bithaaqat ul-Muruur il-Elektroniyyah",
      indonesian: "Kartu Elektronik (E-Money / Pass)",
      exampleArabic: "اسْتَخْدَمْتُ بِطَاقَةَ الْمُرُورِ لِلدُّخُولِ.",
      exampleIndo: "Saya menggunakan kartu elektronik untuk masuk.",
      type: "Frasa Nomina",
      image: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?q=80&w=400&auto=format&fit=crop"
    },
    {
      id: 13,
      topicId: "topik1",
      arabic: "ضِفَّةُ النَّهْرِ",
      latin: "Dhiffat un-Nahri",
      indonesian: "Tepi Sungai / Bantaran Sungai",
      exampleArabic: "جَلَسْنَا عَلَى ضِفَّةِ النَّهْرِ نَسْتَمْتِعُ بِالْمَنَاظِرِ.",
      exampleIndo: "Kami duduk di tepi sungai menikmati pemandangan.",
      type: "Frasa Nomina",
      image: "https://images.unsplash.com/photo-1448375240586-882707db888b?q=80&w=400&auto=format&fit=crop"
    },
    {
      id: 14,
      topicId: "topik1",
      arabic: "رَكِبَ - يَرْكَبُ",
      latin: "Rakiba - Yarkabu",
      indonesian: "Naik / Mengendarai",
      exampleArabic: "رَكِبْنَا السَّيَّارَةَ إِلَى الْجَبَلِ.",
      exampleIndo: "Kami naik mobil ke gunung.",
      type: "Verba (Fi'il)",
      image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=400&auto=format&fit=crop"
    },
    {
      id: 15,
      topicId: "topik1",
      arabic: "ذَهَبَ - يَذْهَبُ",
      latin: "Dhahaba - Yadhhabu",
      indonesian: "Pergi",
      exampleArabic: "ذَهَبَ الطَّالِبُ إِلَى الْمَدْرَسَةِ صَبَاحًا.",
      exampleIndo: "Siswa itu pergi ke sekolah di pagi hari.",
      type: "Verba (Fi'il)",
      image: "https://images.unsplash.com/photo-1476514525535-ce74f45814d0?q=80&w=400&auto=format&fit=crop"
    },
    {
      id: 16,
      topicId: "topik1",
      arabic: "إِسْتَعَدَّ - يَسْتَعِدُّ",
      latin: "Ista'adda - Yasta'iddu",
      indonesian: "Bersiap-siap / Persiapan",
      exampleArabic: "إِسْتَعَدَّ الْمُسَافِرُونَ لِلسَّفَرِ.",
      exampleIndo: "Para musafir bersiap-siap untuk bepergian.",
      type: "Verba (Fi'il)",
      image: "https://images.unsplash.com/photo-1501555088652-021faa106b9b?q=80&w=400&auto=format&fit=crop"
    },
    {
      id: 17,
      topicId: "topik1",
      arabic: "وَصَلَتْ - تَصِلُ",
      latin: "Wasalat - Tasilu",
      indonesian: "Tiba / Sampai",
      exampleArabic: "وَصَلَتْ حَفْصَةُ إِلَى الْفُنْدُقِ سَالِمَةً.",
      exampleIndo: "Hafshah telah tiba di hotel dengan selamat.",
      type: "Verba (Fi'il)",
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=400&auto=format&fit=crop"
    },
    {
      id: 18,
      topicId: "topik1",
      arabic: "مَكَثَ - يَمْكُثُ",
      latin: "Makatha - Yamkuthu",
      indonesian: "Tinggal / Menetap",
      exampleArabic: "مَكَّثْنَا فِي سُوكُوهَارْجُو ثَلاَثَةَ أَيَّامٍ.",
      exampleIndo: "Kami tinggal di Sukoharjo selama tiga hari.",
      type: "Verba (Fi'il)",
      image: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?q=80&w=400&auto=format&fit=crop"
    },
    {
      id: 19,
      topicId: "topik1",
      arabic: "مَشَى - يَمْشِي",
      latin: "Mashaa - Yamshii",
      indonesian: "Berjalan Kaki",
      exampleArabic: "مَشَى السُّيَّاحُ فِي الشَّارِعِ الْقَدِيمِ.",
      exampleIndo: "Para turis berjalan kaki di jalan tua.",
      type: "Verba (Fi'il)",
      image: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=400&auto=format&fit=crop"
    },
    {
      id: 20,
      topicId: "topik1",
      arabic: "اِسْتَخْدَمَ (عَوَّامَةً)",
      latin: "Istakhdama ('Awwaamatan)",
      indonesian: "Menggunakan / Memakai (Pelampung)",
      exampleArabic: "اِسْتَخْدَمَ السَّائِحُ الْعَوَّامَةَ فِي النَّهْرِ.",
      exampleIndo: "Wisatawan itu menggunakan pelampung di sungai.",
      type: "Verba (Fi'il)",
      image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=400&auto=format&fit=crop"
    },
    {
      id: 21,
      topicId: "topik1",
      arabic: "شَاهَدَ الْمَنَاظِرَ الْجَمِيلَةَ",
      latin: "Shaahada al-Manaadhira al-Jamiilah",
      indonesian: "Melihat Pemandangan Indah",
      exampleArabic: "شَاهَدْنَا الْمَنَاظِرَ الْجَمِيلَةَ مِنَ الْجَبَلِ.",
      exampleIndo: "Kami menyaksikan pemandangan indah dari gunung.",
      type: "Frasa Verba",
      image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=400&auto=format&fit=crop"
    },
    {
      id: 22,
      topicId: "topik1",
      arabic: "شَاطِئٌ",
      latin: "Shaati'un",
      indonesian: "Pantai",
      exampleArabic: "ذَهَبْنَا إِلَى شَاطِئِ الْبَحْرِ فِي الْعُطْلَةِ.",
      exampleIndo: "Kami pergi ke pantai laut pada hari libur.",
      type: "Nomina (Isim)",
      image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=400&auto=format&fit=crop"
    },
    {
      id: 23,
      topicId: "topik1",
      arabic: "فِرَاشٌ",
      latin: "Firaashun",
      indonesian: "Matras / Alas / Tikar",
      exampleArabic: "بَسَطْنَا الْفِرَاشَ عَلَى الشَّاطِئِ.",
      exampleIndo: "Kami membentangkan alas di pantai.",
      type: "Nomina (Isim)",
      image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=400&auto=format&fit=crop"
    },
    {
      id: 24,
      topicId: "topik1",
      arabic: "رِمَالٌ بَيْضَاءُ",
      latin: "Rimaalun Baidhaa'u",
      indonesian: "Pasir Putih",
      exampleArabic: "يَمْشِي الأَطْفَالُ عَلَى الرِّمَالِ الْبَيْضَاءِ.",
      exampleIndo: "Anak-anak berjalan di atas pasir putih.",
      type: "Frasa Nomina",
      image: "https://images.unsplash.com/photo-1519046904884-53103b34b206?q=80&w=400&auto=format&fit=crop"
    },
    {
      id: 25,
      topicId: "topik1",
      arabic: "بَسَطَ - يَبْسُطُ",
      latin: "Basatha - Yabsuthu",
      indonesian: "Membentangkan (Alas / Tikar)",
      exampleArabic: "بَسَطَ عَلِيٌّ الْفِرَاشَ عَلَى الرَّمْلِ.",
      exampleIndo: "Ali membentangkan tikar di atas pasir.",
      type: "Verba (Fi'il)",
      image: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?q=80&w=400&auto=format&fit=crop"
    },
    {
      id: 26,
      topicId: "topik1",
      arabic: "تَشَمَّسَ - يَتَشَمَّسُ",
      latin: "Tashammasa - Yatashammasu",
      indonesian: "Berjemur (di bawah sinar matahari)",
      exampleArabic: "يَتَشَمَّسُ السَّائِحُ عَلَى الشَّاطِئِ.",
      exampleIndo: "Turis itu berjemur di pantai.",
      type: "Verba (Fi'il)",
      image: "https://images.unsplash.com/photo-1510414842594-a61c69b5ae57?q=80&w=400&auto=format&fit=crop"
    },
    {
      id: 27,
      topicId: "topik1",
      arabic: "لَعِبَ - يَلْعَبُ",
      latin: "La'iba - Yal'abu",
      indonesian: "Bermain",
      exampleArabic: "لَعِبَ الأَطْفَالُ بِالرِّمَالِ البَيْضَاءِ.",
      exampleIndo: "Anak-anak bermain pasir putih.",
      type: "Verba (Fi'il)",
      image: "https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?q=80&w=400&auto=format&fit=crop"
    },

    // --- BAB 2: الصِّحَّةُ (Kesehatan & Olahraga) ---
    {
      id: 28,
      topicId: "topik2",
      arabic: "دَرَّاجَةٌ",
      latin: "Darraajatun",
      indonesian: "Sepeda",
      exampleArabic: "يَرْكَبُ الطَّالِبُ الدَّرَّاجَةَ إِلَى الْمَدْرَسَةِ.",
      exampleIndo: "Siswa itu naik sepeda ke sekolah.",
      type: "Nomina (Isim)",
      image: "https://images.unsplash.com/photo-1485965120184-e220f721d03e?q=80&w=400&auto=format&fit=crop"
    },
    {
      id: 29,
      topicId: "topik2",
      arabic: "رِيَاضَةٌ",
      latin: "Riyaadhatun",
      indonesian: "Olahraga",
      exampleArabic: "الرِّيَاضَةُ تُقَوِّي الْجِسْمَ وَتُنَمِّي الْعَقْلَ.",
      exampleIndo: "Olahraga menguatkan tubuh dan mengasah akal.",
      type: "Nomina (Isim)",
      image: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=400&auto=format&fit=crop"
    },
    {
      id: 30,
      topicId: "topik2",
      arabic: "كُرَةُ الْقَدَمِ",
      latin: "Kuratu al-Qadami",
      indonesian: "Sepak Bola",
      exampleArabic: "يَلْعَبُ الأَوْلاَدُ كُرَةَ الْقَدَمِ فِي الْمَلْعَبِ.",
      exampleIndo: "Anak-anak bermain sepak bola di lapangan.",
      type: "Frasa Nomina",
      image: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?q=80&w=400&auto=format&fit=crop"
    },
    {
      id: 31,
      topicId: "topik2",
      arabic: "سِبَاحَةٌ",
      latin: "Sibaahatun",
      indonesian: "Berenang / Renang",
      exampleArabic: "السِّبَاحَةُ رِيَاضَةٌ مُفِيدَةٌ لِلصِّحَّةِ.",
      exampleIndo: "Berenang adalah olahraga yang bermanfaat untuk kesehatan.",
      type: "Nomina (Isim)",
      image: "https://images.unsplash.com/photo-1530549387789-4c1017266635?q=80&w=400&auto=format&fit=crop"
    },
    {
      id: 32,
      topicId: "topik2",
      arabic: "مَلْعَبُ الْقَرْيَةِ",
      latin: "Mal'abu al-Qaryati",
      indonesian: "Lapangan Desa",
      exampleArabic: "نَلْعَبُ كُرَةَ الْقَدَمِ فِي مَلْعَبِ الْقَرْيَةِ.",
      exampleIndo: "Kami bermain sepak bola di lapangan desa.",
      type: "Frasa Nomina",
      image: "https://images.unsplash.com/photo-1529900748604-07564a03e7a6?q=80&w=400&auto=format&fit=crop"
    },
    {
      id: 33,
      topicId: "topik2",
      arabic: "جَرْيٌ",
      latin: "Jaryun",
      indonesian: "Lari / Lari Pagi",
      exampleArabic: "الجَرْيُ فِي الصَّبَاحِ يُنَشِّطُ الْجِسْمَ.",
      exampleIndo: "Lari di pagi hari menyegarkan tubuh.",
      type: "Nomina (Isim)",
      image: "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?q=80&w=400&auto=format&fit=crop"
    },
    {
      id: 34,
      topicId: "topik2",
      arabic: "حَكِيمٌ ج حُكَمَاءُ",
      latin: "Hakiimun j Hukamaa'u",
      indonesian: "Orang Bijak / Dokter",
      exampleArabic: "الْحَكِيمُ يُقَدِّمُ النَّصِيحَةَ الطَّيِّبَةَ.",
      exampleIndo: "Orang bijak menyampaikan nasihat yang baik.",
      type: "Nomina (Isim)",
      image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?q=80&w=400&auto=format&fit=crop"
    },
    {
      id: 35,
      topicId: "topik2",
      arabic: "صَحِيحٌ ج أَصِحَّاءُ",
      latin: "Sahiihun j Asihhaa'u",
      indonesian: "Orang Sehat",
      exampleArabic: "الْعَقْلُ السَّلِيمُ فِي الْجِسْمِ الصَّحِيحِ.",
      exampleIndo: "Akal yang sehat terdapat pada tubuh yang sehat.",
      type: "Adjektiva (Sifat)",
      image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?q=80&w=400&auto=format&fit=crop"
    },
    {
      id: 36,
      topicId: "topik2",
      arabic: "مَرِيضٌ ج مَرْضَى",
      latin: "Mariidhun j Mardhaa",
      indonesian: "Pasien / Orang Sakit",
      exampleArabic: "يَزُورُ الطَّبِيبُ الْمَرِيضَ فِي الْمُسْتَشْفَى.",
      exampleIndo: "Dokter mengunjungi pasien di rumah sakit.",
      type: "Nomina (Isim)",
      image: "https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?q=80&w=400&auto=format&fit=crop"
    },
    {
      id: 37,
      topicId: "topik2",
      arabic: "صُدَاعٌ",
      latin: "Shudaa'un",
      indonesian: "Sakit Kepala / Pusing",
      exampleArabic: "أَصَابَنِي الصُّدَاعُ فِي هَذَا الصَّبَاحِ.",
      exampleIndo: "Saya mengalami sakit kepala pagi ini.",
      type: "Nomina (Isim)",
      image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=400&auto=format&fit=crop"
    },
    {
      id: 38,
      topicId: "topik2",
      arabic: "أَلَمٌ فِي الصَّدْرِ",
      latin: "Alamun fii as-Sadri",
      indonesian: "Nyeri / Sakit Dada",
      exampleArabic: "يَشْعُرُ الْمَرِيضُ بِأَلَمٍ فِي الصَّدْرِ.",
      exampleIndo: "Pasien merasakan nyeri pada dadanya.",
      type: "Frasa Nomina",
      image: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?q=80&w=400&auto=format&fit=crop"
    },
    {
      id: 39,
      topicId: "topik2",
      arabic: "عَدَمُ وُضُوحِ الرُّؤْيَةِ",
      latin: "'Adamu Wudhuuh ir-Ru'yati",
      indonesian: "Pandangan Kabur / Tidak Jelas",
      exampleArabic: "يَعَانِي الْمَرِيضُ مِنْ عَدَمِ وُضُوحِ الرُّؤْيَةِ.",
      exampleIndo: "Pasien menderita pandangan yang kabur.",
      type: "Frasa Nomina",
      image: "https://images.unsplash.com/photo-1516714435131-44d6b64dc6a2?q=80&w=400&auto=format&fit=crop"
    },
    {
      id: 40,
      topicId: "topik2",
      arabic: "طَعَامٌ مَالِحٌ",
      latin: "Tha'aamun Maalihun",
      indonesian: "Makanan Asin",
      exampleArabic: "تَجَنَّبْ تَنَاوُلَ الطَّعَامِ الْمَالِحِ لِصِحَّتِكَ.",
      exampleIndo: "Hindari mengonsumsi makanan asin demi kesehatanmu.",
      type: "Frasa Nomina",
      image: "https://images.unsplash.com/photo-1518013038568-ce1149756050?q=80&w=400&auto=format&fit=crop"
    },
    {
      id: 41,
      topicId: "topik2",
      arabic: "طَعَامٌ حُلْوٌ",
      latin: "Tha'aamun Hulwun",
      indonesian: "Makanan Manis",
      exampleArabic: "لاَ تُكْثِرْ مِنْ أَكْلِ الطَّعَامِ الْحُلْوِ.",
      exampleIndo: "Jangan terlalu banyak makan makanan manis.",
      type: "Frasa Nomina",
      image: "https://images.unsplash.com/photo-1551024709-8f23befc6f87?q=80&w=400&auto=format&fit=crop"
    },
    {
      id: 42,
      topicId: "topik2",
      arabic: "طَعَامٌ مَقْلِيٌّ",
      latin: "Tha'aamun Maqliyyun",
      indonesian: "Makanan Gorengan / Digoreng",
      exampleArabic: "الطَّعَامُ الْمَقْلِيُّ يَحْتَوِي عَلَى الزَّيْتِ الْكَثِيرِ.",
      exampleIndo: "Makanan gorengan mengandung banyak minyak.",
      type: "Frasa Nomina",
      image: "https://images.unsplash.com/photo-1562967914-608f82629710?q=80&w=400&auto=format&fit=crop"
    },
    {
      id: 43,
      topicId: "topik2",
      arabic: "لُحُومٌ مُصَنَّعَةٌ",
      latin: "Luhuumun Musanna'atun",
      indonesian: "Daging Olahan (Sosis, dsb.)",
      exampleArabic: "اللُّهُومُ الْمُصَنَّعَةُ لَيْسَتْ جَيِّدَةً لِلصِّحَّةِ.",
      exampleIndo: "Daging olahan kurang baik untuk kesehatan.",
      type: "Frasa Nomina",
      image: "https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?q=80&w=400&auto=format&fit=crop"
    },
    {
      id: 44,
      topicId: "topik2",
      arabic: "جِلْدُ الدَّجَاجِ",
      latin: "Jildu ad-Dajaaji",
      indonesian: "Kulit Ayam",
      exampleArabic: "جِلْدُ الدَّجَاجِ يَحْتَوِي عَلَى الدُّهُونِ.",
      exampleIndo: "Kulit ayam mengandung banyak lemak.",
      type: "Frasa Nomina",
      image: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?q=80&w=400&auto=format&fit=crop"
    },
    {
      id: 45,
      topicId: "topik2",
      arabic: "جِهَازُ قِيَاسِ ضَغْطِ الدَّمِ",
      latin: "Jihaazu Qiyaasi Dhagti ad-Dami",
      indonesian: "Alat Ukur Tekanan Darah (Tensi)",
      exampleArabic: "يَسْتَخْدِمُ الطَّبِيبُ جِهَازَ قِيَاسِ ضَغْطِ الدَّمِ.",
      exampleIndo: "Dokter menggunakan alat ukur tekanan darah.",
      type: "Frasa Nomina",
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=400&auto=format&fit=crop"
    },
    {
      id: 46,
      topicId: "topik2",
      arabic: "دَوَاءٌ",
      latin: "Dawaa'un",
      indonesian: "Obat",
      exampleArabic: "يَتَنَاوَلُ الْمَرِيضُ الدَّوَاءَ فِي الْوَقْتِ الْمُحَدَّدِ.",
      exampleIndo: "Pasien meminum obat pada waktu yang ditentukan.",
      type: "Nomina (Isim)",
      image: "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?q=80&w=400&auto=format&fit=crop"
    },
    {
      id: 47,
      topicId: "topik2",
      arabic: "صَيْدَلِيَّةٌ",
      latin: "Saydaliyyatun",
      indonesian: "Apotek",
      exampleArabic: "نَشْتَرِي الدَّوَاءَ مِنَ الصَّيْدَلِيَّةِ.",
      exampleIndo: "Kita membeli obat dari apotek.",
      type: "Nomina (Isim)",
      image: "https://images.unsplash.com/photo-1586015555751-63bb77f4322a?q=80&w=400&auto=format&fit=crop"
    },
    {
      id: 48,
      topicId: "topik2",
      arabic: "مُسْتَشْفَى",
      latin: "Mustashfaa",
      indonesian: "Rumah Sakit",
      exampleArabic: "الْمُسْتَشْفَى مَكَانٌ لِعِلاَجِ الْمَرْضَى.",
      exampleIndo: "Rumah sakit adalah tempat untuk mengobati orang sakit.",
      type: "Nomina (Isim)",
      image: "https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?q=80&w=400&auto=format&fit=crop"
    },
    {
      id: 49,
      topicId: "topik2",
      arabic: "صَيْدَلِيٌّ",
      latin: "Saydaliyyun",
      indonesian: "Apoteker",
      exampleArabic: "يُعْطِي الصَّيْدَلِيُّ الدَّوَاءَ لِلْمَرِيضِ.",
      exampleIndo: "Apoteker memberikan obat kepada pasien.",
      type: "Nomina (Isim)",
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=400&auto=format&fit=crop"
    },
    {
      id: 50,
      topicId: "topik2",
      arabic: "طَبِيبٌ",
      latin: "Thabiibun",
      indonesian: "Dokter",
      exampleArabic: "يَفْحَصُ الطَّبِيبُ الْمَرِيضَ بِعِنَايَةٍ.",
      exampleIndo: "Dokter memeriksa pasien dengan cermat.",
      type: "Nomina (Isim)",
      image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=400&auto=format&fit=crop"
    },
    {
      id: 51,
      topicId: "topik2",
      arabic: "فَوَاكِهُ",
      latin: "Fawaakihu",
      indonesian: "Buah-buahan",
      exampleArabic: "الْفَوَاكِهُ غَنِيَّةٌ بِالْفِيتَامِينَاتِ.",
      exampleIndo: "Buah-buahan kaya akan vitamin.",
      type: "Nomina (Isim)",
      image: "https://images.unsplash.com/photo-1619566636858-adf3ef46400b?q=80&w=400&auto=format&fit=crop"
    },
    {
      id: 52,
      topicId: "topik2",
      arabic: "مَوْزٌ",
      latin: "Mauzun",
      indonesian: "Pisang",
      exampleArabic: "الْمَوْزُ فَاكِهَةٌ لَذِيذَةٌ وَمُفِيدَةٌ.",
      exampleIndo: "Pisang adalah buah yang lezat dan bergizi.",
      type: "Nomina (Isim)",
      image: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?q=80&w=400&auto=format&fit=crop"
    },
    {
      id: 53,
      topicId: "topik2",
      arabic: "بُرْتُقَالٌ",
      latin: "Burtuqaalun",
      indonesian: "Jeruk",
      exampleArabic: "الْبُرْتُقَالُ يَحْتَوِي عَلَى فِيتَامِين ج.",
      exampleIndo: "Jeruk mengandung banyak vitamin C.",
      type: "Nomina (Isim)",
      image: "https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?q=80&w=400&auto=format&fit=crop"
    },
    {
      id: 54,
      topicId: "topik2",
      arabic: "خَضْرَاوَاتٌ",
      latin: "Khadhraawaatun",
      indonesian: "Sayur-sayuran",
      exampleArabic: "تَأْكُلُ الأُسْرَةُ الْخَضْرَاوَاتِ الطَّازَجَةَ.",
      exampleIndo: "Keluarga makan sayur-sayuran yang segar.",
      type: "Nomina (Isim)",
      image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?q=80&w=400&auto=format&fit=crop"
    },
    {
      id: 55,
      topicId: "topik2",
      arabic: "سَمَكٌ",
      latin: "Samakun",
      indonesian: "Ikan",
      exampleArabic: "السَّمَكُ طَعَامٌ صِحِّيٌّ مُمْتَازٌ.",
      exampleIndo: "Ikan adalah makanan sehat yang sangat baik.",
      type: "Nomina (Isim)",
      image: "https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?q=80&w=400&auto=format&fit=crop"
    },
    {
      id: 56,
      topicId: "topik2",
      arabic: "لَبَنٌ مُصَفًّى",
      latin: "Labanun Musaffaa",
      indonesian: "Yogurt / Susu Murni",
      exampleArabic: "اللَّبَنُ الْمُصَفَّى مُفِيدٌ لِلْهَضْمِ.",
      exampleIndo: "Yogurt sangat bermanfaat untuk pencernaan.",
      type: "Frasa Nomina",
      image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?q=80&w=400&auto=format&fit=crop"
    },
    {
      id: 57,
      topicId: "topik2",
      arabic: "بِلاَ سُكَّرٍ",
      latin: "Bilaa Sukkarin",
      indonesian: "Tanpa Gula / Bebas Gula",
      exampleArabic: "أَشْرَبُ الشَّايَ بِلاَ سُكَّرٍ.",
      exampleIndo: "Saya minum teh tanpa gula.",
      type: "Frasa Nomina",
      image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=400&auto=format&fit=crop"
    },

    // --- BAB 3: الحَجُّ وَالعُمْرَةُ (Haji & Umrah) ---
    {
      id: 58,
      topicId: "topik3",
      arabic: "الْحَجُّ / الْعُمْرَةُ",
      latin: "Al-Hajju / Al-Umratu",
      indonesian: "Haji / Umrah",
      exampleArabic: "الْحَجُّ رُكْنٌ مِنْ أَرْكَانِ الإِسْلاَمِ.",
      exampleIndo: "Haji adalah salah satu rukun Islam.",
      type: "Nomina (Isim)",
      image: "https://images.unsplash.com/photo-1565552645632-d725f8bfc19a?q=80&w=400&auto=format&fit=crop"
    },
    {
      id: 59,
      topicId: "topik3",
      arabic: "الْكَعْبَةُ الْمُشَرَّفَةُ",
      latin: "Al-Ka'bat ul-Musharrafah",
      indonesian: "Ka'bah Al-Musharrafah",
      exampleArabic: "يَطُوفُ الْمُسْلِمُونَ حَوْلَ الْكَعْبَةِ الْمُشَرَّفَةِ.",
      exampleIndo: "Umat Islam bertawaf mengelilingi Ka'bah Al-Musharrafah.",
      type: "Frasa Nomina",
      image: "https://images.unsplash.com/photo-1591604466107-ec97de577aff?q=80&w=400&auto=format&fit=crop"
    },
    {
      id: 60,
      topicId: "topik3",
      arabic: "الإِحْرَامُ",
      latin: "Al-Ihraamu",
      indonesian: "Ihram / Niat & Pakaian Ihram",
      exampleArabic: "يَلْبَسُ الْحَاجُّ مَلاَبِسَ الإِحْرَامِ.",
      exampleIndo: "Jamaah haji memakai pakaian ihram.",
      type: "Nomina (Isim)",
      image: "https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=400&auto=format&fit=crop"
    },
    {
      id: 61,
      topicId: "topik3",
      arabic: "الْحَاجُّ ج الْحُجَّاجُ",
      latin: "Al-Haajju j Al-Hujjaaju",
      indonesian: "Jamaah Haji",
      exampleArabic: "يَصِلُ الْحُجَّاجُ إِلَى مَكَّةَ الْمُكَرَّمَةِ.",
      exampleIndo: "Para jamaah haji tiba di Makkah Al-Mukarramah.",
      type: "Nomina (Isim)",
      image: "https://images.unsplash.com/photo-1580418827493-f2b22c0a76cb?q=80&w=400&auto=format&fit=crop"
    },
    {
      id: 62,
      topicId: "topik3",
      arabic: "مَحْرَمٌ - مَحْرَمَةٌ",
      latin: "Mahramun - Mahramatun",
      indonesian: "Mahram (Laki-laki / Perempuan)",
      exampleArabic: "تُسَافِرُ الْمَرْأَةُ مَعَ مَحْرَمِهَا.",
      exampleIndo: "Seorang wanita bepergian bersama mahramnya.",
      type: "Nomina (Isim)",
      image: "https://images.unsplash.com/photo-1519834785169-98be25ec3f84?q=80&w=400&auto=format&fit=crop"
    },
    {
      id: 63,
      topicId: "topik3",
      arabic: "الْمِيقَاتُ",
      latin: "Al-Miiqaatu",
      indonesian: "Miqat (Batas Waktu & Tempat Ihram)",
      exampleArabic: "يَبْدَأُ الإِحْرَامُ مِنَ الْمِيقَاتِ.",
      exampleIndo: "Ihram dimulai dari miqat.",
      type: "Nomina (Isim)",
      image: "https://images.unsplash.com/photo-1564769625905-50e93615e769?q=80&w=400&auto=format&fit=crop"
    },
    {
      id: 64,
      topicId: "topik3",
      arabic: "الطَّوَافُ بِالْكَعْبَةِ",
      latin: "At-Thawaafu bil-Ka'bati",
      indonesian: "Tawaf Mengelilingi Ka'bah",
      exampleArabic: "الطَّوَافُ بِالْكَعْبَةِ سَبْعَةُ أَشْوَاطٍ.",
      exampleIndo: "Tawaf mengelilingi Ka'bah sebanyak 7 putaran.",
      type: "Frasa Nomina",
      image: "https://images.unsplash.com/photo-1565552645632-d725f8bfc19a?q=80&w=400&auto=format&fit=crop"
    },
    {
      id: 65,
      topicId: "topik3",
      arabic: "السَّعْيُ بَيْنَ الصَّفَا وَالْمَرْوَةِ",
      latin: "As-Sa'yu bainas-Shafaa wal-Marwati",
      indonesian: "Sa'i Antara Shafa dan Marwah",
      exampleArabic: "السَّعْيُ بَيْنَ الصَّفَا وَالْمَرْوَةِ مِنْ وِاجِبَاتِ الْحَجِّ.",
      exampleIndo: "Sa'i antara Shafa dan Marwah termasuk kewajiban haji.",
      type: "Frasa Nomina",
      image: "https://images.unsplash.com/photo-1519834785169-98be25ec3f84?q=80&w=400&auto=format&fit=crop"
    },
    {
      id: 66,
      topicId: "topik3",
      arabic: "الْمَبِيتُ فِي مِنًى",
      latin: "Al-Mabiitu fii Minaa",
      indonesian: "Bermalam di Mina",
      exampleArabic: "يَبِيتُ الْحُجَّاجُ فِي مِنًى فِي أَيَّامِ التَّشْرِيقِ.",
      exampleIndo: "Jamaah haji bermalam di Mina pada hari-hari Tasyrik.",
      type: "Frasa Nomina",
      image: "https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=400&auto=format&fit=crop"
    },
    {
      id: 67,
      topicId: "topik3",
      arabic: "الْوُقُوفُ بِعَرَفَةَ",
      latin: "Al-Wuquufu bi-'Arafata",
      indonesian: "Wukuf di Arafah",
      exampleArabic: "الْحَجُّ عَرَفَةُ، وَالْوُقُوفُ بِعَرَفَةَ رُكْنٌ أَعْظَمُ.",
      exampleIndo: "Haji adalah Arafah, dan wukuf di Arafah adalah rukun terbesar.",
      type: "Frasa Nomina",
      image: "https://images.unsplash.com/photo-1591604466107-ec97de577aff?q=80&w=400&auto=format&fit=crop"
    },
    {
      id: 68,
      topicId: "topik3",
      arabic: "الْمَبِيتُ فِي مُزْدَلِفَةَ",
      latin: "Al-Mabiitu fii Muzdalifata",
      indonesian: "Bermalam di Muzdalifah",
      exampleArabic: "يَتَوَجَّهُ الْحُجَّاجُ لِلْمَبِيتِ فِي مُزْدَلِفَةَ بَعْدَ عَرَفَةَ.",
      exampleIndo: "Jamaah haji bertolak untuk bermalam di Muzdalifah setelah Arafah.",
      type: "Frasa Nomina",
      image: "https://images.unsplash.com/photo-1580418827493-f2b22c0a76cb?q=80&w=400&auto=format&fit=crop"
    },
    {
      id: 69,
      topicId: "topik3",
      arabic: "رَمْيُ الْجَمَرَاتِ",
      latin: "Ramyul-Jamaraati",
      indonesian: "Melempar Jumrah",
      exampleArabic: "يَقُومُ الْحُجَّاجُ بِرَمْيِ الْجَمَرَاتِ فِي مِنًى.",
      exampleIndo: "Jamaah haji melakukan lempar jumrah di Mina.",
      type: "Frasa Nomina",
      image: "https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=400&auto=format&fit=crop"
    },
    {
      id: 70,
      topicId: "topik3",
      arabic: "التَّحَلُّلُ",
      latin: "At-Tahallulu",
      indonesian: "Tahallul (Mencukur / Memotong Rambut)",
      exampleArabic: "يَتَحَلَّلُ الْحَاجُّ بِقَصِّ الشَّعْرِ بَعْدَ الطَّوَافِ وَالسَّعْيِ.",
      exampleIndo: "Jamaah haji bertahallul dengan memotong rambut setelah tawaf dan sa'i.",
      type: "Nomina (Isim)",
      image: "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?q=80&w=400&auto=format&fit=crop"
    },
    {
      id: 71,
      topicId: "topik3",
      arabic: "الْحَجَرُ الأَسْوَدُ",
      latin: "Al-Hajarul-Aswadu",
      indonesian: "Hajar Aswad (Batu Hitam Ka'bah)",
      exampleArabic: "يُشِيرُ الْحَاجُّ إِلَى الْحَجَرِ الأَسْوَدِ فِي الطَّوَافِ.",
      exampleIndo: "Jamaah haji memberi isyarat ke Hajar Aswad saat tawaf.",
      type: "Frasa Nomina",
      image: "https://images.unsplash.com/photo-1565552645632-d725f8bfc19a?q=80&w=400&auto=format&fit=crop"
    },
    {
      id: 72,
      topicId: "topik3",
      arabic: "نَاصِعُ الْبَيَاضِ",
      latin: "Naasi'ul-Bayaadhi",
      indonesian: "Putih Bersih / Putih Silau",
      exampleArabic: "كَانَ الْحَجَرُ الأَسْوَدُ نَاصِعَ الْبَيَاضِ حِينَ نَزَلَ مِنَ الْجَنَّةِ.",
      exampleIndo: "Hajar Aswad dulunya putih bersih ketika turun dari surga.",
      type: "Adjektiva (Sifat)",
      image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=400&auto=format&fit=crop"
    },

    // --- BAB 4: الأَدْيَانُ فِي إِنْدُونِيسِيَا (Agama-agama di Indonesia) ---
    {
      id: 73,
      topicId: "topik4",
      arabic: "الإِسْلاَمُ",
      latin: "Al-Islaamu",
      indonesian: "Agama Islam",
      exampleArabic: "الإِسْلاَمُ دِينُ السَّلاَمِ وَالرَّحْمَةِ.",
      exampleIndo: "Islam adalah agama kedamaian dan kasih sayang.",
      type: "Nomina (Isim)",
      image: "https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?q=80&w=400&auto=format&fit=crop"
    },
    {
      id: 74,
      topicId: "topik4",
      arabic: "الْكَاثُولِيكِيَّةُ",
      latin: "Al-Kaathuuliikiyyatu",
      indonesian: "Agama Katolik",
      exampleArabic: "الْكَاثُولِيكِيَّةُ إِحْدَى الأَدْيَانِ فِي إِنْدُونِيسِيَا.",
      exampleIndo: "Katolik adalah salah satu agama di Indonesia.",
      type: "Nomina (Isim)",
      image: "https://images.unsplash.com/photo-1548625361-1851214041b6?q=80&w=400&auto=format&fit=crop"
    },
    {
      id: 75,
      topicId: "topik4",
      arabic: "الْبُرُوتِسْتَانْتِيَّةُ",
      latin: "Al-Buruutistaantiyyatu",
      indonesian: "Agama Protestan",
      exampleArabic: "الْبُرُوتِسْتَانْتِيَّةُ دِينٌ يَعْتَنِقُهُ بَعْضُ الْمُوَاطِنِينَ.",
      exampleIndo: "Protestan adalah agama yang dianut sebagian warga.",
      type: "Nomina (Isim)",
      image: "https://images.unsplash.com/photo-1519817650390-64a93db51149?q=80&w=400&auto=format&fit=crop"
    },
    {
      id: 76,
      topicId: "topik4",
      arabic: "الْهِنْدُوسِيَّةُ",
      latin: "Al-Hinduusiyyatu",
      indonesian: "Agama Hindu",
      exampleArabic: "الْهِنْدُوسِيَّةُ مَوْجُودَةٌ بِكَثْرَةٍ فِي بَالِي.",
      exampleIndo: "Agama Hindu terdapat banyak di Bali.",
      type: "Nomina (Isim)",
      image: "https://images.unsplash.com/photo-1609946782701-8c464a93e3d9?q=80&w=400&auto=format&fit=crop"
    },
    {
      id: 77,
      topicId: "topik4",
      arabic: "الْبُوذِيَّةُ",
      latin: "Al-Buudhiyyatu",
      indonesian: "Agama Buddha",
      exampleArabic: "الْبُوذِيَّةُ دِينٌ يَدْعُو إِلَى السَّلاَمِ.",
      exampleIndo: "Agama Buddha adalah agama yang mengajak pada kedamaian.",
      type: "Nomina (Isim)",
      image: "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?q=80&w=400&auto=format&fit=crop"
    },
    {
      id: 78,
      topicId: "topik4",
      arabic: "الْكُونْفُوشِيَّةُ",
      latin: "Al-Kuunfuushiyyatu",
      indonesian: "Agama Khonghucu",
      exampleArabic: "الْكُونْفُوشِيَّةُ مِنَ الأَدْيَانِ الْمَعْتَرَفِ بِهَا.",
      exampleIndo: "Khonghucu termasuk agama yang diakui.",
      type: "Nomina (Isim)",
      image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=400&auto=format&fit=crop"
    },
    {
      id: 79,
      topicId: "topik4",
      arabic: "الْمُسْلِمُ",
      latin: "Al-Muslimu",
      indonesian: "Orang Muslim / Umat Islam",
      exampleArabic: "يُصَلِّي الْمُسْلِمُ فِي الْمَسْجِدِ.",
      exampleIndo: "Orang Muslim shalat di masjid.",
      type: "Nomina (Isim)",
      image: "https://images.unsplash.com/photo-1585036156171-384164a8c675?q=80&w=400&auto=format&fit=crop"
    },
    {
      id: 80,
      topicId: "topik4",
      arabic: "الْمَسِيحِيُّ / الْكَاثُولِيكِيُّ",
      latin: "Al-Masihiyyu / Al-Kaathuuliikiyyu",
      indonesian: "Orang Katolik",
      exampleArabic: "يَذْهَبُ الْمَسِيحِيُّ الْكَاثُولِيكِيُّ إِلَى الْكَنِيسَةِ.",
      exampleIndo: "Orang Katolik pergi ke gereja.",
      type: "Nomina (Isim)",
      image: "https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=400&auto=format&fit=crop"
    },
    {
      id: 81,
      topicId: "topik4",
      arabic: "الْمَسِيحِيُّ / الْبُرُوتِسْتَانْتِيُّ",
      latin: "Al-Masihiyyu / Al-Buruutistaantiyyu",
      indonesian: "Orang Protestan",
      exampleArabic: "يُعَامِلُ الْمَسِيحِيُّ الْبُرُوتِسْتَانْتِيُّ جِيرَانَهُ بِاحْتِرَامٍ.",
      exampleIndo: "Orang Protestan memperlakukan tetangganya dengan hormat.",
      type: "Nomina (Isim)",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400&auto=format&fit=crop"
    },
    {
      id: 82,
      topicId: "topik4",
      arabic: "الْهِنْدُوسِيُّ",
      latin: "Al-Hinduusiyyu",
      indonesian: "Umat Hindu",
      exampleArabic: "يَتَعَبَّدُ الْهِنْدُوسِيُّ فِي فُورَا.",
      exampleIndo: "Umat Hindu beribadah di Pura.",
      type: "Nomina (Isim)",
      image: "https://images.unsplash.com/photo-1609946782701-8c464a93e3d9?q=80&w=400&auto=format&fit=crop"
    },
    {
      id: 83,
      topicId: "topik4",
      arabic: "الْبُوذِيُّ",
      latin: "Al-Buudhiyyu",
      indonesian: "Umat Buddha",
      exampleArabic: "يَتَعَبَّدُ الْبُوذِيُّ فِي فِهَارَا.",
      exampleIndo: "Umat Buddha beribadah di Vihara.",
      type: "Nomina (Isim)",
      image: "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?q=80&w=400&auto=format&fit=crop"
    },
    {
      id: 84,
      topicId: "topik4",
      arabic: "الْكُونْفُوشِيُّ",
      latin: "Al-Kuunfuushiyyu",
      indonesian: "Umat Khonghucu",
      exampleArabic: "يَتَعَبَّدُ الْكُونْفُوشِيُّ فِي الْمَعْبَدِ.",
      exampleIndo: "Umat Khonghucu beribadah di Klenteng.",
      type: "Nomina (Isim)",
      image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=400&auto=format&fit=crop"
    },
    {
      id: 85,
      topicId: "topik4",
      arabic: "الْمَسْجِدُ",
      latin: "Al-Masjidu",
      indonesian: "Masjid (Tempat Ibadah Umat Islam)",
      exampleArabic: "الْمَسْجِدُ مَكَانُ عِبَادَةِ الْمُسْلِمِينَ.",
      exampleIndo: "Masjid adalah tempat ibadah umat Islam.",
      type: "Nomina (Isim)",
      image: "https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?q=80&w=400&auto=format&fit=crop"
    },
    {
      id: 86,
      topicId: "topik4",
      arabic: "الْكَنِيسَةُ",
      latin: "Al-Kaniisatu",
      indonesian: "Gereja (Tempat Ibadah Umat Kristen/Katolik)",
      exampleArabic: "الْكَنِيسَةُ مَكَانُ عِبَادَةِ الْمَسِيحِيِّينَ.",
      exampleIndo: "Gereja adalah tempat ibadah umat Kristen.",
      type: "Nomina (Isim)",
      image: "https://images.unsplash.com/photo-1548625361-1851214041b6?q=80&w=400&auto=format&fit=crop"
    },
    {
      id: 87,
      topicId: "topik4",
      arabic: "فُورَا",
      latin: "Fuuraa",
      indonesian: "Pura (Tempat Ibadah Umat Hindu)",
      exampleArabic: "فُورَا مَكَانُ عِبَادَةِ الْهِنْدُوسِيِّينَ فِي بَالِي.",
      exampleIndo: "Pura adalah tempat ibadah umat Hindu di Bali.",
      type: "Nomina (Isim)",
      image: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?q=80&w=400&auto=format&fit=crop"
    },
    {
      id: 88,
      topicId: "topik4",
      arabic: "فِهَارَا",
      latin: "Fihaaraa",
      indonesian: "Vihara (Tempat Ibadah Umat Buddha)",
      exampleArabic: "فِهَارَا مَكَانُ عِبَادَةِ الْبُوذِيِّينَ.",
      exampleIndo: "Vihara adalah tempat ibadah umat Buddha.",
      type: "Nomina (Isim)",
      image: "https://images.unsplash.com/photo-1561361513-2d000a50f0dc?q=80&w=400&auto=format&fit=crop"
    },
    {
      id: 89,
      topicId: "topik4",
      arabic: "الْمَعْبَدُ",
      latin: "Al-Ma'badu",
      indonesian: "Klenteng / Tempat Ibadah",
      exampleArabic: "يَتَوَجَّهُ الْكُونْفُوشِيُّ إِلَى الْمَعْبَدِ.",
      exampleIndo: "Umat Khonghucu menuju ke klenteng.",
      type: "Nomina (Isim)",
      image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=400&auto=format&fit=crop"
    },
    {
      id: 90,
      topicId: "topik4",
      arabic: "التَّسَامُحُ",
      latin: "At-Tasaamuhu",
      indonesian: "Toleransi / Sikap Saling Menghormati",
      exampleArabic: "التَّسَامُحُ مِفْتَاحُ السَّلاَمِ فِي الْمُجْتَمَعِ.",
      exampleIndo: "Toleransi adalah kunci kedamaian dalam masyarakat.",
      type: "Nomina (Isim)",
      image: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=400&auto=format&fit=crop"
    },
    {
      id: 91,
      topicId: "topik4",
      arabic: "بَانْتَجَاسِيلاَ",
      latin: "Baantajaasiilaa",
      indonesian: "Pancasila (Dasar Negara Indonesia)",
      exampleArabic: "بَانْتَجَاسِيلاَ هُوَ أَسَاسُ الدَّوْلَةِ الإِنْدُونِيسِيَّةِ.",
      exampleIndo: "Pancasila adalah dasar negara Indonesia.",
      type: "Nomina (Isim)",
      image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=400&auto=format&fit=crop"
    },
    {
      id: 92,
      topicId: "topik4",
      arabic: "الْوَحْدَةُ",
      latin: "Al-Wahdatu",
      indonesian: "Persatuan / Kesatuan",
      exampleArabic: "الْوَحْدَةُ تُقَوِّي الأُمَّةَ الإِنْدُونِيسِيَّةَ.",
      exampleIndo: "Persatuan memperkuat bangsa Indonesia.",
      type: "Nomina (Isim)",
      image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=400&auto=format&fit=crop"
    },
    {
      id: 93,
      topicId: "topik4",
      arabic: "التَّنَوُّعُ",
      latin: "At-Tanawwu'u",
      indonesian: "Keberagaman / Keanekaragaman",
      exampleArabic: "التَّنَوُّعُ فِي إِنْدُونِيسِيَا نِعْمَةٌ كَبِيرَةٌ.",
      exampleIndo: "Keberagaman di Indonesia adalah nikmat yang besar.",
      type: "Nomina (Isim)",
      image: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=400&auto=format&fit=crop"
    }
  ],

  qiraah: [
    {
      id: 1,
      title: "القِرَاءَةُ الأُولَى: الذَّهَابُ إِلَى غَارِ فِيْنْدُوْل (Wisata ke Goa Pindul)",
      topic: "السَّفَرُ وَالسِّيَاحَةُ",
      level: "Kelas 11 MA - Bab 1",
      arabicText: `أَنَا إِبْرِيْزَةُ، أَنَا طَالِبَةٌ فِي الصَّفِّ الحَادِيَ عَشَرَ مِنَ المَدْرَسَةِ الثَّانَوِيَّةِ الإِسْلَامِيَّةِ الحُكُوْمِيَّةِ 4 جُوْمْبَانْج. عِنْدِي جَدٌّ فِي سُوْكُوْهَارْجُوْ (Sukoharjo) جَاوَا الوُسْطَى. وَفِي أَيَّامِ العُطْلَةِ المَاضِيَةِ ذَهَبْتُ إِلَى بَيْتِ جَدِّي مَعَ أُسْرَتِي وَمَكَّثْنَا هُنَاكَ أَرْبَعَةَ أَيَّامٍ.

اِسْتَعْدَدْنَا بِأَشْيَاءَ كَثِيْرَةٍ مِنَ المَلَابِسِ وَالأَطْعِمَةِ وَاللُّهْنَةِ وَبِطَاقَةِ المُرُوْرِ الإِلِكْتُرُونِيَّةِ وَغَيْرِ ذَلِك ثُمَّ رَكِبْنَا السَّيَّارَةَ فِي السَّاعَةِ السَّابِعَةِ صَبَاحًا وَوَصَلْنَا إِلَى بَيْتِ جَدِّي فِي السَّاعَةِ العَاشِرَةِ وَالنِّصْفِ. شَعَرَ جَدِّي بِسُرُوْرٍ لِوُصُوْلِنَا.

ذَهَبْنَا إِلَى غَارِ فِيْنْدُوْل فِي اليَوْمِ الأَوَّلِ مِنَ العُطْلَةِ. بَيْتُ جَدِّي قَرِيْبٌ مِنْ غَارِ فِيْنْدُوْل. غَارُ فِيْنْدُوْل مَكَانٌ سِيَاحِيٌّ جَمِيْلٌ فِي غُوْنُوْنْج كِيْنْدُوْل (Gunung Kidul) يُوْكِيَاكِرْتَا. وَوَصَلْنَا هُنَاكَ بِسَلَامٍ بَعْدَ سَاعَةٍ وَنِصْفٍ بِالسَّيَّارَةِ.

تَوَجَّهْنَا بَعْدَ ذَلِك إِلَى شُبَّاكِ التَّذَاكِرِ لِشِرَاءِ التَّذَاكِرِ. كَانَتِ التَّذْكِرَةُ بِخَمْسِيْنَ أَلْفَ رُوْبِيَّةٍ لِكُلِّ فَرْدٍ. ثُمَّ اسْتَخْدَمْنَا الإِطَارَاتِ وَالعَوَّامَةَ وَمَشَيْنَا بَعْدَ ذَلِك إِلَى مَكَانِ السِّيَاحَةِ وَدَخَلْنَا إِلَى الغَارِ وَاتَّبَعْنَا النَّهْرَ تَحْتَ الغَارِ مَعَ مُرْشِدِ السِّيَاحَةِ.

ثُمَّ مَشَيْنَا عَلَى ضِفَّةِ نَهْرِ أُيُوْ، هُوَ نَهْرٌ قَرِيْبٌ مِنْ غَارِ فِيْنْدُوْل. لَعِبْنَا وَسَبَحْنَا فِي النَّهْرِ عَلَى بُعْدِ كِيْلُومِتْرٍ وَنِصْفٍ. وَفِي أَثْنَاءِ الطَّرِيْقِ شَاهَدْنَا المَنَاظِرَ الجَمِيْلَةَ مِنْ حُزُفٍ مُزْتَفِعٍ.

هِوَايَتِي السِّيَاحَةُ، وَالذَّهَابُ إِلَى أَمَاكِنَ سِيَاحِيَّةٍ جَمِيْلَةٍ فِي إِندُونِيْسِيَا شَيْءٌ مُمْتِعٌ فِي حَيَاتِي. وَالذَّهَابُ إِلَيْهَا بَعْضُ مِمَّا أَمَرَ اللهُ بِهِ عَزَّ وَجَلَّ: (هُوَ الَّذِي جَعَلَ لَكُمُ الْأَرْضَ ذَلُولًا فَامْشُوا فِي مَنَاكِبِهَا وَكُلُوا مِنْ رِزْقِهِ وَإِلَيْهِ النُّشُورُ) وَهَذِهِ الأَمَاكِنُ السِّيَاحِيَّةُ آيَةٌ مِنْ آيَاتِ اللهِ، فَلَا بُدَّ لَنَا أَنْ نُحَافِظَ عَلَيْهَا.`,
      indonesianText: `Saya Ibrizah, saya seorang siswi kelas 11 di MAN 4 Jombang. Saya memiliki kakek di Sukoharjo, Jawa Tengah. Pada hari-hari liburan lalu, saya pergi ke rumah kakek bersama keluarga saya dan kami tinggal di sana selama empat hari.

Kami bersiap-siap dengan banyak hal seperti pakaian, makanan, oleh-oleh, kartu elektronik (pass/e-money), dan lain-lain. Kemudian kami naik mobil pada jam 07.00 pagi dan tiba di rumah kakek pada jam 10.30. Kakek merasa bahagia atas kedatangan kami.

Kami pergi ke Goa Pindul pada hari pertama liburan. Rumah kakek dekat dari Goa Pindul. Goa Pindul adalah tempat wisata yang indah di Gunung Kidul, Yogyakarta. Dan kami tiba di sana dengan selamat setelah perjalanan selama satu setengah jam menggunakan mobil.

Setelah itu kami menuju ke loket tiket untuk membeli tiket. Harga tiket lima puluh ribu rupiah per orang. Kemudian kami menggunakan ban pelampung dan jaket pelampung, lalu kami berjalan kaki ke lokasi wisata dan masuk ke dalam gua serta menyusuri sungai di bawah gua bersama pemandu wisata.

Kemudian kami berjalan di tepi Sungai Oya, yaitu sungai yang dekat dari Goa Pindul. Kami bermain dan berenang di sungai pada jarak satu setengah kilometer. Dan di tengah perjalanan kami menyaksikan pemandangan yang indah berupa tebing-tebing yang tinggi.

Hobi saya adalah berwisata, dan pergi ke tempat-tempat wisata yang indah di Indonesia merupakan hal yang menyenangkan dalam hidupku. Pergi berwisata juga merupakan bagian dari apa yang diperintahkan Allah Azza wa Jalla: "Dialah yang menjadikan bumi untuk kamu yang mudah dijelajahi, maka jelajahilah di segala penjurunya dan makanlah sebagian dari rezeki-Nya. Dan hanya kepada-Nya lah kamu (kembali setelah) dibangkitkan" (QS. Al-Mulk: 15). Dan tempat-tempat wisata ini adalah tanda dari tanda-tanda kekuasaan Allah, maka kita wajib menjaganya.`,
      vocabularyHighlights: [
        { word: "غَارُ فِيْنْدُوْل", meaning: "Goa Pindul" },
        { word: "شُبَّاكُ التَّذَاكِرِ", meaning: "Loket Tiket" },
        { word: "مُرْشِدُ السِّيَاحَةِ", meaning: "Pemandu Wisata" },
        { word: "ضِفَّةُ النَّهْرِ", meaning: "Tepi Sungai" }
      ],
      questions: [
        {
          q: "مَنْ هِيَ إِبْرِيْزَةُ وَأَيْنَ تَدْرُسُ؟",
          options: [
            "طَالِبَةٌ فِي الصَّفِّ 11 فِي مَان 4 جُوْمْبَانْج",
            "طَالِبَةٌ فِي الصَّفِّ 10 فِي مَان 1 بَوْنْتِيَانَاك",
            "مُدَرِّسَةٌ فِي الْمَدْرَسَةِ",
            "طَبِيبَةٌ فِي الْمُسْتَشْفَى"
          ],
          correct: 0,
          explanation: "Sesuai paragraf pertama: أَنَا إِبْرِيْزَةُ، أَنَا طَالِبَةٌ فِي الصَّفِّ الحَادِيَ عَشَرَ مِنَ المَدْرَسَةِ الثَّانَوِيَّةِ الإِسْلَامِيَّةِ الحُكُوْمِيَّةِ 4 جُوْمْبَانْج"
        },
        {
          q: "كَمْ سِعْرُ تَذْكِرَةِ الدُّخُولِ إِلَى غَارِ فِيْنْدُوْل لِكُلِّ فَرْدٍ؟",
          options: [
            "خَمْسُونَ أَلْفَ رُوْبِيَّةٍ (50.000)",
            "عِشْرُونَ أَلْفَ رُوْبِيَّةٍ (20.000)",
            "مِئَةُ أَلْفِ رُوْبِيَّةٍ (100.000)",
            "مَجَّانًا (Gratis)"
          ],
          correct: 0,
          explanation: "Sesuai paragraf 4: كَانَتِ التَّذْكِرَةُ بِخَمْسِيْنَ أَلْفَ رُوْبِيَّةٍ لِكُلِّ فَرْدٍ"
        },
        {
          q: "مَاذَا اسْتَخْدَمَتْ إِبْرِيْزَةُ وَأُسْرَتُهَا لِلتَّزَحْلُفِ فِي النَّهْرِ؟",
          options: [
            "الإِطَارَاتِ وَالعَوَّامَةَ (Ban & Jaket Pelampung)",
            "الْقَارِبَ الْكَبِيرَ",
            "الطَّائِرَةَ",
            "الدَّرَّاجَةَ النَّارِيَّةَ"
          ],
          correct: 0,
          explanation: "Sesuai paragraf 4: ثُمَّ اسْتَخْدَمْنَا الإِطَارَاتِ وَالعَوَّامَةَ"
        }
      ]
    },
    {
      id: 2,
      title: "القِرَاءَةُ الثَّانِيَةُ: رِحْلَةٌ شَاطِئِيَّةٌ (Wisata Pantai Losari)",
      topic: "السَّفَرُ وَالسِّيَاحَةُ",
      level: "Kelas 11 MA - Bab 1",
      arabicText: `أَنَا مَرْوَانُ. عِنْدِي صَدِيْقٌ اِسْمُهُ سَلْمَانُ. نَحْنُ فِي مَدْرَسَةٍ وَاحِدَةٍ بِبَارِي بَارِي (Pare-pare). يُحِبُّ سَلْمَانُ السِّيَاحَةَ خَاصَّةً السِّيَاحَةَ المَائِيَّةَ.

فِي يَوْمِ الأَحَدِ المَاضِي ذَهَبَ سَلْمَانُ مَعَ أُسْرَتِهِ إِلَى شَاطِئِ لُوسَارِي (Losari). وَهُوَ شَاطِئٌ مَشْهُوْرٌ فِي مَاكَاسَار (Makassar). هُمْ ذَهَبُوا إِلَى مَاكَاسَار صَبَاحًا. اِسْتَغْرَقَ الذَّهَابُ إِلَى مَاكَاسَار حَوَالَى ثَلَاثِ سَاعَاتٍ وَنِصْفٍ بِالسَّيَّارَةِ.

وَبَعْدَ مَا وَصَلُوا هُنَاكَ بَسَطُوا الفِرَاشَ عَلَى الرِّمَالِ، شَاهَدُوا المَنَاظِرَ الجَمِيْلَةَ حَوْلَ الشَّاطِئِ. تَشَمَّسُوا وَلَعِبُوا فِي المِيَاهِ وَتَمَتَّعُوا بِأَمْوَاجِ البَحْرِ. وَهُنَاكَ كَثِيْرٌ مِنَ السُّيَّاحِ الَّذِيْنَ جَلَسُوا عَلَى الشَّاطِئِ. هُمْ أَكَلُوا المَأْكُوْلَاتِ الخَفِيْفَةَ وَكَذَلِك المَشْرُوْبَاتِ. وَهُمْ رَمَوْا النُّفَايَاتِ فِي صَنَادِيْقِ القُمَامَةِ المُخَصَّصَةِ.

وَ فِي المَسَاءِ شَعَرَ سَلْمَانُ وَأُسْرَتُهُ بِالتَّعَبِ فَاسْتَرُاحُوا وَصَلَّوْا فِي مُصَلَّى قَرِيْبٍ مِنَ الشَّاطِئِ. وَرَجَعَ سَلْمَانُ وَأُسْرَتُهُ إِلَى بَارِي بَارِي (Pare-pare) مَسْرُوْرِيْنَ، وَ لَيْسَ ذَلِك بِسَبَبِ مَنَاظِرِ الشَّاطِئِ الجَمِيْلَةِ فَقَطْ، بَلْ لِأَنَّهُمْ سَاهَمُوا أَيْضًا فِي الحِفَاظِ عَلَى نَظَافَةِ بِيْئَةِ المَكَانِ السِّيَاحِيِّ.`,
      indonesianText: `Saya Marwan. Saya memiliki seorang teman bernama Salman. Kami berada di satu sekolah di Parepare. Salman sangat menyukai wisata, khususnya wisata bahari/air.

Pada hari Minggu yang lalu, Salman pergi bersama keluarganya ke Pantai Losari. Pantai tersebut adalah pantai terkenal di Makassar. Mereka pergi ke Makassar pada pagi hari. Perjalanan menuju Makassar memakan waktu sekitar tiga setengah jam menggunakan mobil.

Setelah tiba di sana, mereka membentangkan matras/tikar di atas pasir, lalu mereka menyaksikan pemandangan yang indah di sekitar pantai. Mereka berjemur, bermain air, dan menikmati ombak laut. Di sana terdapat banyak wisatawan yang duduk di tepi pantai. Mereka menyantap makanan ringan dan minuman. Dan mereka membuang sampah pada kotak sampah yang telah disediakan.

Pada sore hari, Salman dan keluarganya merasa lelah lalu mereka beristirahat dan melaksanakan shalat di mushalla dekat pantai. Salman dan keluarganya kembali ke Parepare dengan gembira, dan hal itu bukan hanya karena pemandangan pantai yang indah saja, melainkan karena mereka juga telah berkontribusi menjaga kebersihan lingkungan tempat wisata tersebut.`,
      vocabularyHighlights: [
        { word: "شَاطِئُ لُوسَارِي", meaning: "Pantai Losari" },
        { word: "السِّيَاحَةَ المَائِيَّةَ", meaning: "Wisata Bahari / Air" },
        { word: "بَسَطُوا الفِرَاشَ", meaning: "Membentangkan Matras" },
        { word: "نَظَافَةِ بِيْئَةِ", meaning: "Kebersihan Lingkungan" }
      ],
      questions: [
        {
          q: "إِلَى أَيِّ شَاطِئٍ ذَهَبَ سَلْمَانُ مَعَ أُسْرَتِهِ؟",
          options: [
            "إِلَى شَاطِئِ لُوسَارِي فِي مَاكَاسَار",
            "إِلَى غَارِ فِيْنْدُوْل فِي يُوْكِيَاكِرْتَا",
            "إِلَى شَاطِئِ كُوتَا فِي بَالِي",
            "إِلَى الْجَبَلِ فِي جَاوَا"
          ],
          correct: 0,
          explanation: "Sesuai paragraf 2: ذَهَبَ سَلْمَانُ مَعَ أُسْرَتِهِ إِلَى شَاطِئِ لُوسَارِي فِي مَاكَاسَار"
        },
        {
          q: "كَمْ سَاعَةً اسْتَغْرَقَ الذَّهَابُ مِنْ بَارِي بَارِي إِلَى مَاكَاسَار؟",
          options: [
            "ثَلَاثُ سَاعَاتٍ وَنِصْفٌ (3,5 jam)",
            "سَاعَةٌ وَاحِدَةٌ (1 jam)",
            "خَمْسُ سَاعَاتٍ (5 jam)",
            "يَوْمٌ كَامِلٌ (1 hari full)"
          ],
          correct: 0,
          explanation: "Sesuai paragraf 2: اِسْتَغْرَقَ الذَّهَابُ إِلَى مَاكَاسَار حَوَالَى ثَلَاثِ سَاعَاتٍ وَنِصْفٍ"
        },
        {
          q: "أَيْنَ رَمَى سَلْمَانُ وَأُسْرَتُهُ النُّفَايَاتِ؟",
          options: [
            "فِي صَنَادِيْقِ القُمَامَةِ المُخَصَّصَةِ",
            "فِي الْبَحْرِ",
            "عَلَى الرِّمَالِ",
            "فِي الشَّارِعِ"
          ],
          correct: 0,
          explanation: "Sesuai paragraf 3: وَهُمْ رَمَوْا النُّفَايَاتِ فِي صَنَادِيْقِ القُمَامَةِ المُخَصَّصَةِ"
        }
      ]
    },
    {
      id: 3,
      title: "القِرَاءَةُ: هَيَّا نَعِيْشُ بِالصِّحَّةِ ١ (Mari Kita Hidup Sehat 1)",
      topic: "الصِّحَّةُ",
      level: "Kelas 11 MA - Bab 2",
      arabicText: `نَبِيْلٌ وَ نَوْفَلٌ صَدِيْقَانِ. هُمَا يَعِيْشَانِ فِي قَرْيَةٍ صَغِيْرَةٍ، هُمَا يَتَعَلَّمَانِ فِي نَفْسِ المَدْرَسَةِ. نَبِيْلٌ وَ نَوْفَلٌ يُحِبَّانِ أَنْ يَعِيْشَا فِي صِحَّةٍ لِأَنَّهُمَا يَعْرِفَانِ أَنَّ الصِّحَّةَ أَمْرٌ مُهِمٌّ فِي حَيَاةِ الإِنْسَانِ.

يُحِبُّ نَبِيْلٌ وَ نَوْفَلٌ أَنْ يَذْهَبَا إِلَى المَدْرَسَةِ بِالدَّرَّاجَةِ لِأَنَّ المَدْرَسَةَ بَعِيْدَةٌ عَنْ بَيْتِهِمَا. يَفْهَمُ نَبِيْلٌ وَ نَوْفَلٌ أَنَّ الذَّهَابَ إِلَى المَدْرَسَةِ أَوْ إِلَى مَكَانٍ آخَرَ بِالدَّرَّاجَةِ نَافِعٌ لِصِحَّةِ البَدَنِ. وَفِي المَدْرَسَةِ كَثِيْرٌ مِنَ الطُّلَّابِ الَّذِيْنَ يَذْهَبُوْنَ إِلَى المَدْرَسَةِ بِالدَّرَّاجَةِ أَيْضًا.

وَفِي البَيْتِ يُحِبُّ نَبِيْلٌ وَ نَوْفَلٌ أَنْ يُمَارِسَا الرِّيَاضَةَ مِثْلَ الجَرْيِ وَكُرَةِ القَدَمِ وَالسِّبَاحَةِ وَغَيْرِ ذَلِك. هُمَا يَجْرِيَانِ كُلَّ صَبَاحٍ قَبْلَ الذَّهَابِ إِلَى المَدْرَسَةِ وَيَسْبَحَانِ مَرَّةً فِي الأُسْبُوْعِ يَوْمَ الأَحَدِ وَيَلْعَبَانِ كُرَةَ القَدَمِ فِي مَلْعَبِ القَرْيَةِ مَسَاءَ اليَوْمِ.

يَهْتَمُّ الشَّخْصُ بِصِحَّتِهِ مِنْ خِلَالِ تَنَاوُلِ الأَطْعِمَةِ الضَّرُوْرِيَّةِ لِلصِّحَّةِ، وَيُحَافِظُ عَلَى سَلَامَتِهِ البَدَنِيَّةِ مِنْ خِلَالِ مُمَارَسَةِ الرِّيَاضَةِ بِانْتِظَامٍ. قَالَ الحُكَمَاءُ: الصِّحَّةُ تَاجٌ عَلَى رُؤُوْسِ الأَصِحَّاءِ لاَ يَعْرِفُهُ إِلاَّ المَرْضَى.`,
      indonesianText: `Nabil dan Naufal adalah dua orang sahabat. Mereka berdua tinggal di sebuah desa kecil, dan mereka berdua belajar di sekolah yang sama. Nabil dan Naufal suka hidup sehat karena mereka berdua mengetahui bahwa kesehatan adalah hal yang sangat penting dalam kehidupan manusia.

Nabil dan Naufal suka pergi ke sekolah naik sepeda karena sekolah terletak jauh dari rumah mereka berdua. Nabil dan Naufal memahami bahwa pergi ke sekolah atau ke tempat lain menggunakan sepeda bermanfaat untuk kesehatan tubuh. Dan di sekolah ada banyak siswa yang pergi ke sekolah menggunakan sepeda juga.

Di rumah, Nabil dan Naufal suka berolahraga seperti lari, sepak bola, berenang, dan lain-lain. Mereka berdua lari pagi setiap hari sebelum berangkat ke sekolah, berenang seminggu sekali pada hari Minggu, dan bermain sepak bola di lapangan desa pada sore hari.

Seseorang memperhatikan kesahatannya dengan cara mengonsumsi makanan yang penting bagi kesehatan, dan menjaga keselamatan fisiknya dengan cara berolahraga secara teratur. Hukama (orang-orang bijak/dokter) berkata: "Kesehatan adalah mahkota di atas kepala orang-orang yang sehat, yang tidak ada yang mengetahuinya kecuali orang-orang yang sakit".`,
      vocabularyHighlights: [
        { word: "هَيَّا نَعِيْشُ بِالصِّحَّةِ", meaning: "Mari Kita Hidup Sehat" },
        { word: "بِالدَّرَّاجَةِ", meaning: "Naik Sepeda" },
        { word: "مُمَارَسَةُ الرِّيَاضَةِ", meaning: "Berolahraga secara teratur" },
        { word: "الصِّحَّةُ تَاجٌ", meaning: "Kesehatan adalah mahkota" }
      ],
      questions: [
        {
          q: "كَيْفَ يَذْهَبُ نَبِيْلٌ وَنَوْفَلٌ إِلَى الْمَدْرَسَةِ؟",
          options: [
            "بِالدَّرَّاجَةِ",
            "بِالسَّيَّارَةِ",
            "بِالْحَافِلَةِ",
            "مَشْيًا عَلَى الأَقْدَامِ"
          ],
          correct: 0,
          explanation: "Sesuai paragraf 2: يُحِبُّ نَبِيْلٌ وَنَوْفَلٌ أَنْ يَذْهَبَا إِلَى المَدْرَسَةِ بِالدَّرَّاجَةِ"
        },
        {
          q: "مَتَى يَجْرِيَانِ نَبِيْلٌ وَنَوْفَلٌ كُلَّ يَوْمٍ؟",
          options: [
            "كُلَّ صَبَاحٍ قَبْلَ الذَّهَابِ إِلَى المَدْرَسَةِ",
            "فِي اللَّيْلِ",
            "فِي الظُّهْرِ",
            "بَعْدَ النَّوْمِ"
          ],
          correct: 0,
          explanation: "Sesuai paragraf 3: هُمَا يَجْرِيَانِ كُلَّ صَبَاحٍ قَبْلَ الذَّهَابِ إِلَى المَدْرَسَةِ"
        },
        {
          q: "مَاذَا قَالَ الْحُكَمَاءُ عَنِ الصِّحَّةِ؟",
          options: [
            "الصِّحَّةُ تَاجٌ عَلَى رُؤُوْسِ الأَصِحَّاءِ لاَ يَعْرِفُهُ إِلاَّ المَرْضَى",
            "الصِّحَّةُ لاَ تَفِيدُ شَيْئًا",
            "الْمَالُ أَهَمُّ مِنَ الصِّحَّةِ",
            "الصِّحَّةُ لِلأَطْفَالِ فَقَطْ"
          ],
          correct: 0,
          explanation: "Sesuai paragraf 4: قَالَ الحُكَمَاءُ: الصِّحَّةُ تَاجٌ عَلَى رُؤُوْسِ الأَصِحَّاءِ لاَ يَعْرِفُهُ إِلاَّ المَرْضَى"
        }
      ]
    },
    {
      id: 4,
      title: "القِرَاءَةُ: هَيَّا نَعِيْشُ بِالصِّحَّةِ ٢ (Mari Kita Hidup Sehat 2)",
      topic: "الصِّحَّةُ",
      level: "Kelas 11 MA - Bab 2",
      arabicText: `أَنَا أَيُّو وَعِنْدِي صَدِيْقَةٌ اِسْمُهَا رِيْتَا. هِيَ تَغِيْبُ عَنِ المَدْرَسَةِ مُنْذُ ثَلَاثِ أَيَّامٍ. فَأَذْهَبُ إِلَى بَيْتِهَا مَعَ صَدِيْقَاتِي لِزِيَارَتِهَا.

تَقُوْلُ رِيْتَا أَنَّ ضَغْطَ دَمِهَا مُرْتَفِعٌ. هِيَ تَشْعُرُ بِالصُّدَاعِ وَأَلَمٍ فِي صَدْرِهَا وَعَدَمِ وُضُوْحِ رُؤْيَتِهَا. وَهِيَ تَذْهَبُ إِلَى الطَّبِيْبِ فَيَأْمُرُهَا الطَّبِيْبُ أَنْ تَستَلْقِيَ عَلَى السَّرِيْرِ وَيَفْحَصُهَا بِجِهَازِ قِيَاسِ ضَغْطِ الدَّمِ.

تَشْرَحُ رِيْتَا أَنَّ الطَّبِيْبَ يَنْصَحُهَا أَنْ لاَ تَأْكُلَ الطَّعَامَ المَالِحَ أَوِ الحُلْوَ وَالطَّعَامَ المَقْلِيَّ وَاللُّحُوْمَ المُصَنَّعَةَ وَجِلْدَ الدَّجَاجِ وَغَيْرِ ذَلِك. وَيَأْمُرُ الطَّبِيْبُ أَنْ تَشْتَرِيَ الدَّوَاءَ فِي الصَّيْدَلِيَّةِ، وَ يَجِبُ عَلَيْهَا أَنْ تَتَنَاوَلَ الدَّوَاءَ مَرَّةً فِي اليَوْمِ.

وَ يَقُوْلُ الطَّبِيْبُ أَنَّ هُنَاكَ كَثِيْرًا مِنَ الأَطْعِمَةِ الصِّحِّيَّةِ مِثْلَ الفَوَاكِهِ مِنَ الجُوَّافَةِ وَالمَوْزِ وَالبُرْتُقَالِ وَالخَضْرَوَاتِ وَالسَّمَكِ وَاللَّبَنِ المُصَفَّى بِلاَ سُكَّرٍ وَغَيْرِ ذَلِك. نَحْنُ نَرْجِعُ إِلَى البَيْتِ بَعْدَ ذَلِك. وَلاَ نُرِيْدُ أَنْ يُصِيْبَنَا أَيُّ مَرَضٍ مِثْلَ مَا أَصَابَ صَدِيْقَتَنَا رِيْتَا فَنَأْكُلُ كَثِيْرًا مِنَ الفَوَاكِهِ وَالخَضْرَوَاتِ.`,
      indonesianText: `Saya Ayu dan saya memiliki teman bernama Rita. Dia tidak masuk sekolah sejak tiga hari yang lalu. Maka saya pergi ke rumahnya bersama teman-teman saya untuk menjenguknya.

Rita bercerita bahwa tekanan darahnya tinggi. Dia merasakan pusing/sakit kepala, nyeri dada, dan pandangan kabur. Dia pergi ke dokter, lalu dokter menyuruhnya berbaring di atas ranjang dan memeriksanya menggunakan alat tensi tekanan darah.

Rita menjelaskan bahwa dokter menasihatinya agar tidak memakan makanan asin atau manis, makanan gorengan, daging olahan, kulit ayam, dan lain-lain. Dan dokter memerintahkan untuk membeli obat di apotek, serta dia harus meminum obat sekali dalam sehari.

Dan dokter berkata bahwa ada banyak makanan sehat seperti buah jambu klutuk, pisang, jeruk, sayur-sayuran, ikan, dan yogurt tanpa gula, dan lain-lain. Kami pun pulang ke rumah setelah itu. Dan kami tidak ingin terjangkit penyakit apa pun seperti yang dialami sahabat kami Rita, maka kami pun banyak mengonsumsi buah-buahan dan sayur-sayuran.`,
      vocabularyHighlights: [
        { word: "ضَغْطُ دَمِهَا مُرْتَفِعٌ", meaning: "Tekanan darahnya tinggi" },
        { word: "جِهَازُ قِيَاسِ ضَغْطِ الدَّمِ", meaning: "Alat ukur tekanan darah (tensi)" },
        { word: "الطَّعَامُ المَالِحُ", meaning: "Makanan Asin" },
        { word: "اللَّبَنُ المُصَفَّى بِلاَ سُكَّرٍ", meaning: "Yogurt tanpa gula" }
      ],
      questions: [
        {
          q: "لِمَاذَا غَابَتْ رِيْتَا عَنِ الْمَدْرَسَةِ؟",
          options: [
            "لِأَنَّ ضَغْطَ دَمِهَا مُرْتَفِعٌ وَهِيَ مَرِيضَةٌ",
            "لِأَنَّهَا ذَهَبَتْ إِلَى السُّوقِ",
            "لِأَنَّهَا سَافَرَتْ إِلَى يُوْكِيَاكِرْتَا",
            "لِأَنَّهَا تَلْعَبُ كُرَةَ الْقَدَمِ"
          ],
          correct: 0,
          explanation: "Sesuai paragraf 2: تَقُوْلُ رِيْتَا أَنَّ ضَغْطَ دَمِهَا مُرْتَفِعٌ"
        },
        {
          q: "مَاذَا نَصَحَ الطَّبِيبُ رِيْتَا أَنْ لاَ تَأْكُلَهُ؟",
          options: [
            "الطَّعَامَ المَالِحَ أَوِ الحُلْوَ وَالمَقْلِيَّ وَاللُّحُوْمَ المُصَنَّعَةَ",
            "الفَوَاكِهَ وَالخَضْرَوَاتِ",
            "السَّمَكَ وَاللَّبَنَ",
            "الْمَاءَ الصَّافِيَ"
          ],
          correct: 0,
          explanation: "Sesuai paragraf 3: يَنْصَحُهَا أَنْ لاَ تَأْكُلَ الطَّعَامَ المَالِحَ أَوِ الحُلْوَ وَالمَقْلِيَّ..."
        },
        {
          q: "كَمْ مَرَّةً يَجِبُ عَلَى رِيْتَا تَنَاوُلُ الدَّوَاءِ فِي الْيَوْمِ؟",
          options: [
            "مَرَّةً وَاحِدَةً فِي الْيَوْمِ",
            "ثَلاَثَ مَرَّاتٍ فِي الْيَوْمِ",
            "خَمْسَ مَرَّاتٍ",
            "لاَ تَتَنَاوَلُ الدَّوَاءَ"
          ],
          correct: 0,
          explanation: "Sesuai paragraf 3: وَيَجِبُ عَلَيْهَا أَنْ تَتَنَاوَلَ الدَّوَاءَ مَرَّةً فِي اليَوْمِ"
        }
      ]
    },
    {
      id: 5,
      title: "القِرَاءَةُ الأولى: الْحَجُّ وَالْعُمْرَةُ (Haji dan Umrah)",
      topic: "الحَجُّ وَالعُمْرَةُ",
      level: "Kelas 11 MA - Bab 3",
      arabicText: `أَنَا سَلْمَانُ، أَسْكُنُ فِي قَرْيَةٍ صَغِيْرَةٍ فِي سُورَابَايَا، عِنْدِي عَمٌّ اِسْمُهُ أَحْمَدُ، بَيْتُهُ قَرِيْبٌ مِنْ بَيْتِي. وَفِي السَّنَةِ الْمَاضِيَةِ زَارَ عَمِّي مَكَّةَ الْمُكَرَّمَةَ لِلأَدَاءِ الْحَجِّ وَالْعُمْرَةِ. وَأُرِيْدُ السَّمَاعَ إِلَى قِصَّتِهِ، سَائِلاً: يَا عَمِّي مَاذَا فَعَلَ النَّاسُ فِي مَنَاسِكِ الْحَجِّ وَالْعُمْرَةِ؟ وَأَجَابَ عَمِّي: إِذَا أَرَدْتَ الْحَجَّ وَالْعُمْرَةَ...

١. احْرِمْ مِنَ الْمِيقَاتِ الْمُحَدَّدِ لِبِدَايَةِ مَنَاسِكِ الْحَجِّ وَالْعُمْرَةِ وَانْوِ بِالإِحْرَامِ.
٢. اصْعَدْ إِلَى جَبَلِ عَرَفَةَ لِلْوُقُوفِ وَارْمِ الْجَمَرَاتِ الثَّلاَثَةِ فِي مِنًى.
٣. طُفْ حَوْلَ الْكَعْبَةِ الْمُشَرَّفَةِ سَبْعَ مَرَّاتٍ.
٤. اسْعَ بَيْنَ الصَّفَا وَالْمَرْوَةِ سَبْعَ مَرَّاتٍ.
٥. تَحَلَّلْ بِحَلْقِ شَعْرِكَ أَوْ تَقْصِيرِهِ.

سَمِعْتُ إِلَى قِصَّةِ عَمِّي بِكُلِّ اهْتِمَامٍ، ثُمَّ أَسْأَلُهُ لِلْمَرَّةِ الثَّانِيَةِ: يَا عَمِّي، مَاذَا يَجِبُ أَنْ نَتَذَكَّرَ فِي الْعُمْرَةِ؟ فَيَقُولُ: "أَوَّلاً اذْهَبْ لِلْعُمْرَةِ فِي أَيِّ وَقْتٍ مِنَ السَّنَةِ، ثَانِيًا احْرِصْ عَلَى أَدَاءِ مَنَاسِكِ الْعُمْرَةِ بِشَكْلٍ صَحِيْحٍ، وَثَالِثًا استَفِدْ مِنْ تَجْرِبَةِ الْعُمْرَةِ لِتَحْسِينِ حَيَاتِكَ الرُّوحِيَّةِ.
وَأَمَّا الْحَجُّ فَهُوَ رُكْنٌ مِنْ أَرْكَانِ الإِسْلاَمِ الْخَمْسَةِ وَهُوَ وَاجِبٌ عَلَى الْمُسْلِمِينَ الْقَادِرِينَ عَلَيْهِ جَسَدِيًّا وَمَالِيًّا. لِذَا فَلْنُعِدَّ أَنْفُسَنَا عَلَى أَفْضَلِ وَجْهٍ مُمْكِنٍ. أَمَّا مَنْ لَمْ يَسْتَطِعْ، فَلاَ يَيْأَسْ، فَإِنَّ اللهَ عَلِيْمٌ بِنَوَايَا عِبَادِهِ وَسَعْيِهِمْ.`,
      indonesianText: `Saya Salman, saya tinggal di sebuah desa kecil di Surabaya. Saya memiliki seorang paman bernama Ahmad, rumahnya dekat dari rumah saya. Pada tahun lalu, paman saya mengunjungi Makkah Al-Mukarramah untuk menunaikan ibadah haji dan umrah. Saya ingin mendengarkan kisahnya, lalu bertanya: "Wahai Pamanku, apa yang dilakukan orang-orang dalam manasik haji dan umrah?" Pamanku menjawab: "Jika kamu menginginkan haji dan umrah...

1. Berihramlah dari miqat yang ditentukan sebagai awal manasik haji dan umrah dan berniatlah dengan ihram.
2. Naiklah ke Jabal Arafah untuk wukuf dan lemparlah tiga jumrah di Mina.
3. Bertawaflah mengelilingi Ka'bah Al-Musharrafah sebanyak 7 kali.
4. Bersa'ilah antara Shafa dan Marwah sebanyak 7 kali.
5. Bertahallullah dengan mencukur rambutmu atau memotongnya.

Saya mendengarkan cerita pamanku dengan penuh perhatian, kemudian saya bertanya kepadanya untuk kedua kalinya: "Wahai pamanku, apa yang harus kita ingat dalam umrah?" Beliau menjawab: "Pertama, pergilah umrah kapan saja sepanjang tahun. Kedua, berusahalah menunaikan manasik umrah dengan cara yang benar. Dan ketiga, manfaatkan pengalaman umrah untuk memperbaiki kehidupan spiritualmu."

Adapun haji, ia adalah rukun dari rukun Islam yang lima dan hukumnya wajib bagi umat Islam yang mampu secara fisik dan finansial. Oleh karena itu, marilah kita mempersiapkan diri sebaik mungkin. Adapun bagi yang belum mampu, janganlah berkecil hati, karena sesungguhnya Allah Maha Mengetahui niat-niat hamba-Nya dan usaha mereka.`,
      vocabularyHighlights: [
        { word: "أَحْرِمْ مِنَ الْمِيقَاتِ", meaning: "Berihramlah dari miqat" },
        { word: "الْوُقُوفُ بِعَرَفَةَ", meaning: "Wukuf di Arafah" },
        { word: "طُفْ حَوْلَ الْكَعْبَةِ", meaning: "Bertawaflah mengelilingi Ka'bah" },
        { word: "تَحَلَّلْ بِحَلْقِ شَعْرِكَ", meaning: "Bertahallullah dengan mencukur rambut" }
      ],
      questions: [
        {
          q: "أَيْنَ يُحْرِمُ الْحَاجُّ أَوِ الْمُعْتَمِرُ؟",
          options: [
            "مِنَ الْمِيقَاتِ الْمُحَدَّدِ",
            "مِنَ الْبَيْتِ",
            "مِنَ الْمَطَارِ",
            "مِنَ الْمَسْجِدِ النَّبَوِيِّ"
          ],
          correct: 0,
          explanation: "Sesuai poin 1: أَحْرِمْ مِنَ الْمِيقَاتِ الْمُحَدَّدِ"
        },
        {
          q: "كَمْ مَرَّةً يَطُوفُ الْحَاجُّ حَوْلَ الْكَعْبَةِ؟",
          options: [
            "سَبْعَ مَرَّاتٍ",
            "ثَلاَثَ مَرَّاتٍ",
            "خَمْسَ مَرَّاتٍ",
            "مَرَّةً وَاحِدَةً"
          ],
          correct: 0,
          explanation: "Sesuai poin 3: طُفْ حَوْلَ الْكَعْبَةِ الْمُشَرَّفَةِ سَبْعَ مَرَّاتٍ"
        },
        {
          q: "عَلَى مَنْ يَجِبُ الْحَجُّ فِي الإِسْلاَمِ؟",
          options: [
            "عَلَى الْمُسْلِمِينَ الْقَادِرِينَ عَلَيْهِ جَسَدِيًّا وَمَالِيًّا",
            "عَلَى كُلِّ فَقِيرٍ",
            "عَلَى الأَطْفَالِ الصِّغَارِ",
            "عَلَى مَنْ لاَ يَسْتَطِيعُ السَّفَرَ"
          ],
          correct: 0,
          explanation: "Sesuai paragraf akhir: وَهُوَ وَاجِبٌ عَلَى الْمُسْلِمِينَ الْقَادِرِينَ عَلَيْهِ جَسَدِيًّا وَمَالِيًّا"
        }
      ]
    },
    {
      id: 6,
      title: "القِرَاءَةُ الثَّانِيَةُ: الْعُمْرَةُ فِي رَمَضَانَ (Umrah di Bulan Ramadan)",
      topic: "الحَجُّ وَالعُمْرَةُ",
      level: "Kelas 11 MA - Bab 3",
      arabicText: `فَاتِحٌ : سَمِعْتُ أَنَّ الْعُمْرَةَ فِي رَمَضَانَ لَهَا فَضْلٌ كَبِيْرٌ، هَلْ هَذَا صَحِيْحٌ؟
فَاطِمَةُ : نَعَمْ صَحِيْحٌ. قَالَ النَّبِيُّ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ: "عُمْرَةٌ فِي رَمَضَانَ تَعْدِلُ حَجَّةً"
فَاتِحٌ : هَلْ هَذَا يَعْنِي أَنَّهَا تُبْدِلُ الْحَجَّ؟
فَاطِمَةُ : لاَ، أَجْرُهَا يُعَادِلُ أَجْرَ الْحَجِّ لَكِنَّهَا لاَ تُبْدِلُ فَرِيْضَةَ الْحَجِّ.
فَاتِحٌ : وَلِمَاذَا لَهَا فَضْلٌ كَبِيْرٌ فِي رَمَضَانَ؟
فَاطِمَةُ : لِأَنَّ رَمَضَانَ شَهْرُ الْبَرَكَةِ. كُلُّ الْعِبَادَاتِ فِيْهِ مُضَاعَفَةُ الأَجْرِ. وَالْعُمْرَةُ تُقَرِّبُكَ إِلَى اللهِ وَتُكَفِّرُ الذُّنُوْبَ.
فَاتِحٌ : هَذَا مُذْهِلٌ، سَأُفَكِّرُ جِدِّيًّا فِي أَدَاءِ الْعُمْرَةِ فِي رَمَضَانَ الْمُقْبِلِ إِنْ شَاءَ اللهُ.`,
      indonesianText: `Fatih: Saya mendengar bahwa umrah di bulan Ramadan memiliki keutamaan yang sangat besar, apakah ini benar?
Fatima: Ya, benar. Nabi SAW bersabda: "Umrah di bulan Ramadan nilainya setara dengan ibadah haji".
Fatih: Apakah ini berarti umrah Ramadan dapat menggantikan kewajiban haji?
Fatima: Tidak, pahalanya menyamai pahala haji tetapi tidak menggantikan kewajiban ibadah haji.
Fatih: Mengapa umrah memiliki keutamaan besar di bulan Ramadan?
Fatima: Karena Ramadan adalah bulan keberkahan. Semua ibadah di dalamnya dilipatgandakan pahalanya. Dan umrah mendekatkan dirimu kepada Allah serta menghapus dosa-dosa.
Fatih: Ini sungguh luar biasa, saya akan berpikir serius untuk menunaikan umrah pada Ramadan mendatang, insya Allah.`,
      vocabularyHighlights: [
        { word: "عُمْرَةٌ فِي رَمَضَانَ تَعْدِلُ حَجَّةً", meaning: "Umrah Ramadan nilainya setara haji" },
        { word: "أَجْرُهَا يُعَادِلُ أَجْرَ الْحَجِّ", meaning: "Pahala umrah menyamai pahala haji" },
        { word: "مُضَاعَفَةُ الأَجْرِ", meaning: "Pahala yang dilipatgandakan" },
        { word: "تُكَفِّرُ الذُّنُوْبَ", meaning: "Menghapus dosa-dosa" }
      ],
      questions: [
        {
          q: "مَاذَا قَالَ النَّبِيُّ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ عَنِ الْعُمْرَةِ فِي رَمَضَانَ؟",
          options: [
            "عُمْرَةٌ فِي رَمَضَانَ تَعْدِلُ حَجَّةً",
            "الْعُمْرَةُ غَيْرُ مُسْتَحَبَّةٍ فِي رَمَضَانَ",
            "الْعُمْرَةُ تُكَرَّهُ فِي رَمَضَانَ",
            "لاَ فَضْلَ لِلْعُمْرَةِ فِي رَمَضَانَ"
          ],
          correct: 0,
          explanation: "Sesuai sabda Nabi SAW: عُمْرَةٌ فِي رَمَضَانَ تَعْدِلُ حَجَّةً"
        },
        {
          q: "هَلْ تُبْدِلُ عُمْرَةُ رَمَضَانَ فَرِيْضَةَ الْحَجِّ؟",
          options: [
            "لاَ، أَجْرُهَا يُعَادِلُ أَجْرَ الْحَجِّ لَكِنَّهَا لاَ تُبْدِلُ فَرِيْضَةَ الْحَجِّ",
            "نَعَمْ، تُبْدِلُ فَرِيْضَةَ الْحَجِّ تَمَامًا",
            "نَعَمْ، لِمَنْ كَانَ فَقِيرًا فَقَطْ",
            "لاَ أَجْرَ لَهَا"
          ],
          correct: 0,
          explanation: "Penjelasan Fatima: لاَ، أَجْرُهَا يُعَادِلُ أَجْرَ الْحَجِّ لَكِنَّهَا لاَ تُبْدِلُ فَرِيْضَةَ الْحَجِّ"
        }
      ]
    },
    {
      id: 7,
      title: "القِرَاءَةُ: الأَدْيَانُ فِي إِنْدُونِيسِيَا (Agama-agama di Indonesia)",
      topic: "الأَدْيَانُ فِي إِنْدُونِيسِيَا",
      level: "Kelas 11 MA - Bab 4",
      arabicText: `خَالِدٌ تَاِجِرٌ مُسْلِمٌ، هُوَ يَسْكُنُ فِي جُومْبَانْج (Jombang)، بَيْتُهُ قَرِيبٌ مِنَ الْمَسْجِدِ، يَذْهَبُ خَالِدٌ إِلَى الْمَسْجِدِ كُلَّ يَوْمٍ لِلأَدَاءِ صَلَاةِ الْفَرْضِ. هُوَ مُسْلِمٌ مُطِيعٌ. وَالإِسْلَامُ هُوَ الدِّينُ الأَكْثَرُ انْتِشَارًا فِي إِندُونِيسِيَا حَيْثُ يَتْبَعُهُ حَوَالَى ٨٧,٢ % مِنَ السُّكَّانِ.

لِخَالِدٍ جَارٌ اِسْمُهُ سُونَاَرْطُو. هُوَ جَارٌ بُوذِيٌّ. الْبُوذِيَّةُ هُوَ دِينٌ قَدِيمٌ فِي إِندُونِيسِيَا حَيْثُ يَتْبَعُهَا حَوَالَى ٠,٧ % مِنَ السُّكَّانِ. يَتَعَبَّدُ سُونَاَرْطُو فِي مَعْبَدٍ بَعِيدٍ عَنْ بَيْتِهِ يُسَمَّى بِمَعْبَدِ "هُوكْ لِيُؤْنْج كِيُؤْنْج" (Hok Liong Kiong). هُوَ مَعْبَدٌ جَمِيلٌ فِي وَسَطِ مَدِينَةِ جُومْبَانْج. يُزَيَّنُ الْمَعْبَدُ بِأَلْوَانٍ مُتَنَوِّعَةٍ مِنَ الأَحْمَرِ وَالأَصْفَرِ وَالأَخْضَرِ.

لِخَالِدٍ جَارٌ آخَرُ اِسْمُهُ فْرَانْسِيسْكُوسْ، هُوَ جَارٌ بُرُوتِسْتَانِيٌّ. الْبُرُوتِسْتَانْتِيَّةُ هُوَ دِينٌ ثَالِثٌ أَكْبَرُ فِي إِندُونِيسِيَا حَيْثُ يَتْبَعُهَا حَوَالَى ٦,٩ % مِنَ السُّكَّانِ. يَتَعَبَّدُ فْرَانْسِيسْكُوسْ فِي الْكَنِيسَةِ فِي جُومْبَانْج.

يَسْكُنُ خَالِدٌ وَسُونَاَرْطُو وَفْرَانْسِيسْكُوسْ فِي سِلْمٍ وَتَسَامُحٍ، وَيَحْتَرِمُ بَعْضُهُمْ بَعْضًا. فَالَتَّسَامُحُ هُوَ مَبْدَأٌ أَسَاسِيٌّ فِي إِندُونِيسِيَا، يُشَجِّعُ عَلَى الإِحْتِرَامِ الْمُتَبَادَلِ وَالتَّفَاهُمِ فِي الاِخْتِلَافِ بَيْنَ الْمُعْتَقَدَاتِ الدِّينِيَّةِ.
وَالأَدْيَانُ الرَّسْمِيَّةُ فِي إِندُونِيسِيَا هِيَ: الإِسْلَامُ، وَالْكَاثُولِيكِيَّةُ، وَالْبُرُوتِسْتَانْتِيَّةُ، وَالْهِنْدُوسِيَّةُ، وَالْبُوذِيَّةُ، وَالْكُونْفُوشِيَّةُ.`,
      indonesianText: `Khalid adalah seorang pedagang Muslim, ia tinggal di Jombang. Rumahnya dekat dari masjid. Khalid pergi ke masjid setiap hari untuk menunaikan shalat fardhu. Ia adalah seorang Muslim yang taat. Dan Islam adalah agama yang paling meluas penyebarannya di Indonesia di mana dianut oleh sekitar 87,2 % dari penduduk.

Khalid memiliki seorang tetangga bernama Sunarto. Ia adalah tetangga seorang Buddhis. Agama Buddha adalah agama kuno di Indonesia di mana dianut oleh sekitar 0,7 % dari penduduk. Sunarto beribadah di sebuah klenteng/tempat ibadah yang jauh dari rumahnya bernama Klenteng "Hok Liong Kiong". Itu adalah tempat ibadah yang indah di pusat kota Jombang. Klenteng tersebut dihiasi dengan beraneka warna dari merah, kuning, dan hijau.

Khalid memiliki tetangga lain bernama Fransiskus, ia adalah tetangga seorang Protestan. Agama Protestan adalah agama terbesar ketiga di Indonesia di mana dianut oleh sekitar 6,9 % dari penduduk. Fransiskus beribadah di gereja di Jombang.

Khalid, Sunarto, dan Fransiskus tinggal dalam kedamaian dan toleransi, serta saling menghormati satu sama lain. Maka toleransi adalah prinsip mendasar di Indonesia, yang menggalakkan penghormatan timbal balik dan saling memahami dalam perbedaan antar keyakinan beragama.

Dan agama-agama resmi di Indonesia yaitu: Islam, Katolik, Protestan, Hindu, Buddha, dan Khonghucu.`,
      vocabularyHighlights: [
        { word: "الدِّينُ الأَكْثَرُ انْتِشَارًا", meaning: "Agama yang paling meluas penyebarannya" },
        { word: "مَعْبَدُ هُوكْ لِيُؤْنْج كِيُؤْنْج", meaning: "Klenteng Hok Liong Kiong (Jombang)" },
        { word: "سِلْمٍ وَتَسَامُحٍ", meaning: "Kedamaian dan toleransi" },
        { word: "الإِحْتِرَامُ الْمُتَبَادَلُ", meaning: "Saling menghormati / Penghormatan timbal balik" }
      ],
      questions: [
        {
          q: "أَيْنَ يَسْكُنُ خَالِدٌ وَكَمْ نِسْبَةُ الْمُسْلِمِينَ فِي إِندُونِيسِيَا؟",
          options: [
            "يَسْكُنُ فِي جُومْبَانْج وَنِسْبَةُ الْمُسْلِمِينَ ٨٧,٢ %",
            "يَسْكُنُ فِي سُورَابَايَا وَنِسْبَةُ الْمُسْلِمِينَ ٥٠ %",
            "يَسْكُنُ فِي جَاكَرْتَا وَنِسْبَةُ الْمُسْلِمِينَ ١٠ %",
            "يَسْكُنُ فِي بَالِي"
          ],
          correct: 0,
          explanation: "Sesuai paragraf 1: يَسْكُنُ فِي جُومْبَانْج... حَيْثُ يَتْبَعُهُ حَوَالَى ٨٧,٢ %"
        },
        {
          q: "مَا اسْمُ الْمَعْبَدِ الَّذِي يَتَعَبَّدُ فِيهِ سُونَاَرْطُو فِي جُومْبَانْج؟",
          options: [
            "مَعْبَدُ هُوكْ لِيُؤْنْج كِيُؤْنْج (Hok Liong Kiong)",
            "فُورَا بَسَاكِيْه",
            "الْمَسْجِدُ الْكَبِيرُ",
            "كَنِيسَةُ جُومْبَانْج"
          ],
          correct: 0,
          explanation: "Sesuai paragraf 2: يُسَمَّى بِمَعْبَدِ \"هُوكْ لِيُؤْنْج كِيُؤْنْج\" (Hok Liong Kiong)"
        },
        {
          q: "مَا هِيَ الأَدْيَانُ الرَّسْمِيَّةُ فِي إِندُونِيسِيَا؟",
          options: [
            "الإِسْلَامُ، وَالْكَاثُولِيكِيَّةُ، وَالْبُرُوتِسْتَانْتِيَّةُ، وَالْهِنْدُوسِيَّةُ، وَالْبُوذِيَّةُ، وَالْكُونْفُوشِيَّةُ",
            "الإِسْلَامُ فَقَطْ",
            "الْبُوذِيَّةُ وَالْهِنْدُوسِيَّةُ فَقَطْ",
            "ثَلاَثَةُ أَدْيَانٍ فَقَطْ"
          ],
          correct: 0,
          explanation: "Sesuai paragraf akhir: وَالأَدْيَانُ الرَّسْمِيَّةُ فِي إِندُونِيسِيَا هِيَ: الإِسْلَامُ، وَالْكَاثُولِيكِيَّةُ، وَالْبُرُوتِسْتَانْتِيَّةُ، وَالْهِنْدُوسِيَّةُ، وَالْبُوذِيَّةُ، وَالْكُونْفُوشِيَّةُ."
        }
      ]
    }
  ],

  kalam: [
    {
      id: 1,
      title: "الحِوَارُ الأَوَّلُ : قَضَاءُ العُطْلَةِ (Percakapan 1: Mengisi Liburan)",
      description: "Bab 1: Dialog antara Salim (سالم) dan Nabil (نبيل) mengenai pengalaman liburan ke rumah kakek di Sukoharjo.",
      avatarBuyer: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150&auto=format&fit=crop",
      avatarSeller: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop",
      dialogues: [
        { speaker: "سَالِمٌ (Salim)", arabic: "السَّلَامُ عَلَيْكُمْ", indo: "Assalamu'alaikum" },
        { speaker: "نَبِيْلٌ (Nabil)", arabic: "وَعَلَيْكُمُ السَّلَامُ وَرَحْمَةُ اللهِ", indo: "Wa'alaikumussalam warahmatullah" },
        { speaker: "سَالِمٌ (Salim)", arabic: "أَيْنَ قَضَيْتَ أَيَّامَ العُطْلَةِ المَاضِيَةِ يَا نَبِيْلُ؟", indo: "Di mana kamu menghabiskan hari-hari liburan lalu, wahai Nabil?" },
        { speaker: "نَبِيْلٌ (Nabil)", arabic: "قَضَيْتُهَا فِي بَيْتِ جَدِّي فِي سُوْكُوْهَارْجُوْ (Sukoharjo)", indo: "Saya menghabiskan liburan di rumah kakekku di Sukoharjo." },
        { speaker: "سَالِمٌ (Salim)", arabic: "بِمَ وَمَتَى ذَهَبْتَ هُنَاكَ؟", indo: "Naik apa dan kapan kamu pergi ke sana?" },
        { speaker: "نَبِيْلٌ (Nabil)", arabic: "ذَهَبْتُ هُنَاكَ بِالقِطَارِ فِي أُسْبُوْعَيْنِ مَاضِيَيْنِ", indo: "Saya pergi ke sana naik kereta api dua minggu yang lalu." },
        { speaker: "سَالِمٌ (Salim)", arabic: "كَمْ يَوْمًا مَكَّثْتَ هُنَاكَ؟", indo: "Berapا hari kamu tinggal di sana?" },
        { speaker: "نَبِيْلٌ (Nabil)", arabic: "مَكَّثْتُ هُنَاكَ ثَلَاثَةَ أَيَّامٍ", indo: "Saya tinggal di sana selama tiga hari." },
        { speaker: "سَالِمٌ (Salim)", arabic: "عُطْلَةٌ سَعِيْدَةٌ", indo: "Selamat berlibur! / Semoga liburanmu menyenangkan." },
        { speaker: "نَبِيْلٌ (Nabil)", arabic: "شُكْرًا", indo: "Terima kasih." }
      ]
    },
    {
      id: 2,
      title: "الحِوَارُ الثَّانِي : زِيَارَةُ غَارِ فِيْنْدُوْل (Percakapan 2: Wisata Goa Pindul)",
      description: "Bab 1: Dialog antara Fakhri (فخري) dan Naufal (نوفل) mengenai wisata susur gua (Goa Pindul) di Yogyakarta.",
      avatarBuyer: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop",
      avatarSeller: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=150&auto=format&fit=crop",
      dialogues: [
        { speaker: "فَخْرِي (Fakhri)", arabic: "مَاذَا فَعَلْتَ أَيَّامَ عُطْلَتِكَ يَا نَوْفَلُ؟", indo: "Apa yang kamu lakukan pada hari-hari liburanmu, wahai Naufal?" },
        { speaker: "نَوْفَلٌ (Naufal)", arabic: "ذَهَبْتُ إِلَى غَارِ فِيْنْدُوْل (Goa Pindul) فِي يُوْكِيَاكِرْتَا", indo: "Saya pergi ke Goa Pindul di Yogyakarta." },
        { speaker: "فَخْرِي (Fakhri)", arabic: "مَاذَا وَجَدْتَ هُنَاكَ؟", indo: "Apa yang kamu temukan di sana?" },
        { speaker: "نَوْفَلٌ (Naufal)", arabic: "هُنَاكَ نَهْرٌ تَحْتَ الغَارِ حَوَالَى ٣٥٠ مِتْرًا وَعِرْضُهُ حَوَالَى خَمْسَةِ أَمْتَارٍ. وَفِي النَّهْرِ اسْتَطَاعَ النَّاسُ التَّزَحْلُفَ بِاسْتِخْدَامِ الإِطَارَاتِ. وَهُوَ مَشْهُوْرٌ بِأَنَّهُ مَكَانٌ سِيَاحِيٌّ جَمِيْلٌ فِي يُوْكِيَاكِرْتَا.", indo: "Di sana ada sungai di bawah gua sepanjang sekitar 350 meter dan lebarnya 5 meter. Di sungai orang-orang bisa susur sungai menggunakan ban pelampung. Tempat itu sangat terkenal sebagai wisata indah di Yogyakarta." },
        { speaker: "فَخْرِي (Fakhri)", arabic: "لِمَاذَا ذَهَبْتَ هُنَاكَ؟", indo: "Mengapa kamu pergi ke sana?" },
        { speaker: "نَوْفَلٌ (Naufal)", arabic: "لِأَنَّ بَيْتَ جَدِّي قَرِيْبٌ مِنْ غَارِ فِيْنْدُوْل. إِسْتَغْرَقَ الذَّهَابُ إِلَى هُنَاكَ حَوَالَى سَاعَةٍ وَاحِدَةٍ بِالسَّيَّارَةِ أَوْ بِالدَّرَّاجَةِ النَّارِيَّةِ.", indo: "Karena rumah kakekku dekat dari Goa Pindul. Perjalanan ke sana memakan waktu sekitar satu jam menggunakan mobil atau sepeda motor." },
        { speaker: "فَخْرِي (Fakhri)", arabic: "بِكَمْ تَذْكِرَةُ الدُّخُوْلِ؟", indo: "Berapa harga tiket masuknya?" },
        { speaker: "نَوْفَلٌ (Naufal)", arabic: "بِخَمْسِيْنَ أَلْفَ رُوْبِيَّةٍ", indo: "Lima puluh ribu rupiah." },
        { speaker: "فَخْرِي (Fakhri)", arabic: "سِيَاحَةٌ رَائِعَةٌ وَمُمْتِعَةٌ", indo: "Wisata yang luar biasa dan sungguh menyenangkan!" },
        { speaker: "نَوْفَلٌ (Naufal)", arabic: "شُكْرًا", indo: "Terima kasih." }
      ]
    },
    {
      id: 3,
      title: "الحِوَارُ الثَّالِثُ : فِي الْمُسْتَشْفَى (Di Rumah Sakit)",
      description: "Bab 2 (الصِّحَّةُ): Dialog antara Dokter Wanita (الطَّبِيبَةُ) dan Hasan (حَسَنٌ) saat konsultasi penyakit sakit kepala dan tekanan darah.",
      avatarBuyer: "https://images.unsplash.com/photo-1594824813566-78a9c3621422?q=80&w=150&auto=format&fit=crop",
      avatarSeller: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?q=80&w=150&auto=format&fit=crop",
      dialogues: [
        { speaker: "الطَّبِيبَةُ (Dokter Wanita)", arabic: "السَّلاَمُ عَلَيْكُمْ، مَاذَا بِكَ يَا سَيِّدِي؟", indo: "Assalamu'alaikum, ada keluhan apa wahai Pak?" },
        { speaker: "حَسَنٌ (Hasan)", arabic: "وَ عَلَيْكُمُ السَّلاَمُ وَرَحْمَةُ اللهِ، أَصَابَنِي الصُّدَاعُ.", indo: "Wa'alaikumussalam warahmatullah, saya merasa sakit kepala / pusing." },
        { speaker: "الطَّبِيبَةُ (Dokter Wanita)", arabic: "كَمْ يَوْمًا تَشْعُرُ بِهِ؟", indo: "Sudah berapa hari Anda merasakannya?" },
        { speaker: "حَسَنٌ (Hasan)", arabic: "مُنْذُ ثَلاَثَةِ أَيَّامٍ.", indo: "Sejak tiga hari yang lalu." },
        { speaker: "الطَّبِيبَةُ (Dokter Wanita)", arabic: "تَفَضَّلْ، اسْتَلْقِ عَلَى السَّرِيرِ لِلْفَحْصِ.", indo: "Silakan berbaring di atas tempat tidur untuk pemeriksaan." },
        { speaker: "حَسَنٌ (Hasan)", arabic: "حَسَنًا يَا سَيِّدَتِي.", indo: "Baik, Dok." },
        { speaker: "الطَّبِيبَةُ (Dokter Wanita)", arabic: "ضَغْطُ دَمِكَ مُرْتَفِعٌ، عَلَيْكَ أَنْ تَجْتَنِبَ الأَطْعِمَةَ الْمَالِحَةَ وَالْحُلْوَةَ. هَذِهِ هِيَ الْوَصْفَةُ مِنِّي.", indo: "Tekanan darah Anda tinggi, Anda harus menghindari makanan asin dan manis. Ini dia resep obat dari saya." },
        { speaker: "حَسَنٌ (Hasan)", arabic: "طَيِّبٌ، سَأَشْتَرِي الدَّوَاءَ فِي الصَّيْدَلِيَّةِ، شُكْرًا.", indo: "Baik, saya akan membeli obat di apotek, terima kasih." },
        { speaker: "الطَّبِيبَةُ (Dokter Wanita)", arabic: "عَفْوًا، شَفَاكَ اللهُ.", indo: "Sama-sama, semoga Allah memberi Anda kesembuhan." }
      ]
    },
    {
      id: 4,
      title: "الحِوَارُ الرَّابِعُ : فِي الصَّيْدَلِيَّةِ (Di Apotek)",
      description: "Bab 2 (الصِّحَّةُ): Dialog antara Apoteker (الصَّيْدَلِيُّ) dan Pasien (الْمَرِيضُ) saat menebus resep obat untuk penyakit tekanan darah.",
      avatarBuyer: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=150&auto=format&fit=crop",
      avatarSeller: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=150&auto=format&fit=crop",
      dialogues: [
        { speaker: "الصَّيْدَلِيُّ (Apoteker)", arabic: "السَّلاَمُ عَلَيْكُمْ، أَيُّ خِدْمَةٍ؟", indo: "Assalamu'alaikum, ada yang bisa saya bantu?" },
        { speaker: "الْمَرِيضُ (Pasien)", arabic: "وَ عَلَيْكُمُ السَّلاَمُ وَرَحْمَةُ اللهِ، أَنَا بِحَاجَةٍ إِلَى الدَّوَاءِ.", indo: "Wa'alaikumussalam warahmatullah, saya butuh obat." },
        { speaker: "الصَّيْدَلِيُّ (Apoteker)", arabic: "أَيُّ مَرَضٍ أَصَابَكَ؟", indo: "Penyakit apa yang Anda alami?" },
        { speaker: "الْمَرِيضُ (Pasien)", arabic: "ضَغْطُ الدَّمِ.", indo: "Tekanan darah tinggi." },
        { speaker: "الصَّيْدَلِيُّ (Apoteker)", arabic: "حَسَنًا، أَيْنَ الْوَصْفَةُ الطِّبِّيَّةُ؟", indo: "Baik, mana resep dokternya?" },
        { speaker: "الْمَرِيضُ (Pasien)", arabic: "هَذِهِ هِيَ الْوَصْفَةُ.", indo: "Ini resepnya." },
        { speaker: "الصَّيْدَلِيُّ (Apoteker)", arabic: "هَلْ لَدَيْكَ أَيُّ حَسَاسِيَّةٍ مِنَ الأَدْوِيَةِ؟", indo: "Apakah Anda memiliki alergi terhadap obat-obatan?" },
        { speaker: "الْمَرِيضُ (Pasien)", arabic: "لاَ، لاَ أَعْتَقِدُ ذَلِكَ.", indo: "Tidak, saya rasa tidak ada." },
        { speaker: "الصَّيْدَلِيُّ (Apoteker)", arabic: "طَيِّبٌ، هَذَا هُوَ الدَّوَاءُ، يَجِبُ عَلَيْكَ تَنَاوُلُهُ مَرَّةً فِي الْيَوْمِ، أَتَمَنَّى لَكُمُ الشِّفَاءَ الْعَاجِلَ.", indo: "Baik, ini obatnya, Anda harus meminumnya sekali dalam sehari. Saya mendoakan semoga Anda lekas sembuh." },
        { speaker: "الْمَرِيضُ (Pasien)", arabic: "شُكْرًا جَزِيلاً، أَتَمَنَّى لَكَ التَّوْفِيقَ فِي الْعَمَلِ.", indo: "Terima kasih banyak, semoga Anda sukses dalam bekerja." },
        { speaker: "الصَّيْدَلِيُّ (Apoteker)", arabic: "لاَ شُكْرَ عَلَى الْوَاجِبِ.", indo: "Sama-sama, sudah menjadi kewajiban saya." }
      ]
    },
    {
      id: 5,
      title: "الحِوَارُ الْخَامِسُ : الْكَعْبَةُ الْمُشَرَّفَةُ (Percakapan 1 Bab 3: Ka'bah Al-Musharrafah)",
      description: "Bab 3 (الحَجُّ وَالعُمْرَةُ): Dialog antara Fakhri (فَخْرِي) dan Aisyah (عَائِشَةُ) mengenai keutamaan Ka'bah, kiblat umat Islam, dan tata cara tawaf di sekeliling Ka'bah.",
      avatarBuyer: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop",
      avatarSeller: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150&auto=format&fit=crop",
      dialogues: [
        { speaker: "فَخْرِي (Fakhri)", arabic: "السَّلاَمُ عَلَيْكُمْ", indo: "Assalamu'alaikum." },
        { speaker: "عَائِشَةُ (Aisyah)", arabic: "وَعَلَيْكُمُ السَّلاَمُ وَرَحْمَةُ اللهِ", indo: "Wa'alaikumussalam warahmatullah." },
        { speaker: "فَخْرِي (Fakhri)", arabic: "هَلْ تَعْرِفِينَ أَنَّ الْكَعْبَةَ الْمُشَرَّفَةَ مَرْكَزُ عِبَادَةِ الْمُسْلِمِينَ؟", indo: "Apakah kamu tahu bahwa Ka'bah Al-Musharrafah adalah pusat ibadah umat Islam?" },
        { speaker: "عَائِشَةُ (Aisyah)", arabic: "نَعَمْ عَرَفْتُهَا. نَتَوَجَّهُ إِلَى الْكَعْبَةِ الْمُشَرَّفَةِ فِي كُلِّ صَلاَةٍ لِأَنَّهَا قِبْلَةُ الْمُسْلِمِينَ.", indo: "Ya, saya mengetahuinya. Kita menghadap ke Ka'bah Al-Musharrafah dalam setiap shalat karena ia adalah kiblat umat Islam." },
        { speaker: "فَخْرِي (Fakhri)", arabic: "وَمَاذَا يَنْبَغِي أَنْ نَفْعَلَ أَمَامَ الْكَعْبَةِ إِذَا كُنَّا فِي الْحَجِّ؟", indo: "Dan apa yang seyogyanya kita lakukan di depan Ka'bah jika kita sedang menunaikan ibadah haji?" },
        { speaker: "عَائِشَةُ (Aisyah)", arabic: "تَوَجَّهْ إِلَى الْحَجَرِ الأَسْوَدِ وَاسْتَلِمْهُ بِيَدِكَ أَوْ أَشِرْ إِلَيْهِ.", indo: "Menghadaplah ke Hajar Aswad dan usap/sentuhlah dengan tanganmu atau berilah isyarat padanya." },
        { speaker: "فَخْرِي (Fakhri)", arabic: "ثُمَّ مَاذَا؟", indo: "Lalu apa lagi?" },
        { speaker: "عَائِشَةُ (Aisyah)", arabic: "طُفْ بِالْكَعْبَةِ سَبْعَةَ أَشْوَاطٍ، وَادْعُ اللهَ خِلاَلَ الطَّوَافِ.", indo: "Bertawaflah mengelilingi Ka'bah sebanyak 7 putaran, dan berdoalah kepada Allah selama tawaf." },
        { speaker: "فَخْرِي (Fakhri)", arabic: "هَلْ هُنَاكَ شَيْءٌ مُهِمٌّ آخَرُ عَنِ الْكَعْبَةِ؟", indo: "Apakah ada hal penting lain tentang Ka'bah?" },
        { speaker: "عَائِشَةُ (Aisyah)", arabic: "إِنَّهَا بَيْتُ اللهِ الْحَرَامُ وَأَوَّلُ بَيْتٍ وُضِعَ لِلنَّاسِ لِعِبَادَةِ اللهِ.", indo: "Sesungguhnya Ka'bah adalah Baitullah Al-Haram dan rumah pertama yang dibangun bagi manusia untuk beribadah kepada Allah." },
        { speaker: "فَخْرِي (Fakhri)", arabic: "حَسَنًا.", indo: "Baiklah." }
      ]
    },
    {
      id: 6,
      title: "الحِوَارُ السَّادِسُ : الْحَجَرُ الأَسْوَدُ (Percakapan 2 Bab 3: Hajar Aswad)",
      description: "Bab 3 (الحَجُّ وَالعُمْرَةُ): Dialog antara Khalidah (خَالِدَةُ) dan Naufal (نَوْفَلٌ) mengenai tata cara mengusap/memberi isyarat pada Hajar Aswad serta sejarah keutamaannya.",
      avatarBuyer: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop",
      avatarSeller: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=150&auto=format&fit=crop",
      dialogues: [
        { speaker: "خَالِدَةُ (Khalidah)", arabic: "يَا نَوْفَلُ نَحْنُ قَرِيبُونَ مِنَ الْحَجَرِ الأَسْوَدِ، مَاذَا أَفْعَلُ؟", indo: "Wahai Naufal, kita sudah dekat dari Hajar Aswad, apa yang harus aku lakukan?" },
        { speaker: "نَوْفَلٌ (Naufal)", arabic: "تَقَدَّمِي إِلَيْهِ وَاسْتَلِمِيهِ إِنِ اسْتَطَعْتِ، فَإِنْ لَمْ تَسْتَطِيعِي وَكُنْتِ بَعِيدَةً فَأَشِيرِي إِلَيْهِ بِيَدِكِ.", indo: "Majulah mendekatinya dan usaplah jika kamu mampu, namun jika kamu tidak mampu dan berada jauh, maka berilah isyarat melambaikan tanganmu ke arahnya." },
        { speaker: "خَالِدَةُ (Khalidah)", arabic: "ثُمَّ مَاذَا أَفْعَلُ بَعْدَ ذَلِكَ؟", indo: "Lalu apa yang harus aku lakukan setelah itu?" },
        { speaker: "نَوْفَلٌ (Naufal)", arabic: "تَابِعِي طَوَافَكِ وَادْعِي اللهَ بِمَا شِئْتِ.", indo: "Lanjutkan tawafmu dan berdoalah kepada Allah dengan doa apa pun yang kamu kehendaki." },
        { speaker: "خَالِدَةُ (Khalidah)", arabic: "هَلْ هُنَاكَ شَيْءٌ آخَرُ عَنِ الْحَجَرِ الأَسْوَدِ؟", indo: "Apakah ada hal lain tentang Hajar Aswad?" },
        { speaker: "نَوْفَلٌ (Naufal)", arabic: "تَذَكَّرِي أَنَّ الْحَجَرَ الأَسْوَدَ قِطْعَةٌ مِنَ الْجَنَّةِ. وَكَانَ نَاصِعَ الْبَيَاضِ عِنْدَمَا نَزَلَ إِلَى الأَرْضِ، وَلَكِنَّهُ اسْوَدَّ بِسَبَبِ خَطَايَا الْبَشَرِ.", indo: "Ingatlah bahwa Hajar Aswad adalah batu dari surga. Dulunya berwarna putih bersih ketika diturunkan ke bumi, akan tetapi ia menjadi hitam disebabkan dosa-dosa manusia." },
        { speaker: "خَالِدَةُ (Khalidah)", arabic: "طَيِّبٌ يَا نَوْفَلُ.", indo: "Baik wahai Naufal." }
      ]
    },
    {
      id: 7,
      title: "الحِوَارُ السَّابِعُ : تَنَوُّعُ الأَدْيَانِ فِي إِنْدُونِيسِيَا (Percakapan 1 Bab 4: Keberagaman Agama di Indonesia)",
      description: "Bab 4 (الأَدْيَانُ فِي إِنْدُونِيسِيَا): Dialog antara Ruqayyah (رُقَيَّةُ) dan Ibrahim (إِبْرَاهِيمُ) mengenai keutamaan keberagaman agama di Indonesia, nilai Pancasila, dan toleransi beragama.",
      avatarBuyer: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150&auto=format&fit=crop",
      avatarSeller: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop",
      dialogues: [
        { speaker: "رُقَيَّةُ (Ruqayyah)", arabic: "السَّلاَمُ عَلَيْكُمْ يَا إِبْرَاهِيمُ، كَيْفَ حَالُكَ الْيَوْمَ؟", indo: "Assalamu'alaikum wahai Ibrahim, bagaimana kabarmu hari ini?" },
        { speaker: "إِبْرَاهِيمُ (Ibrahim)", arabic: "وَعَلَيْكُمُ السَّلاَمُ يَا رُقَيَّةُ، اَلْحَمْدُ لِلَّهِ، وَأَنْتِ كَيْفَ الْحَالُ؟", indo: "Wa'alaikumussalam wahai Ruqayyah, alhamdulillah. Dan kamu bagaimana kabarmu?" },
        { speaker: "رُقَيَّةُ (Ruqayyah)", arabic: "بِخَيْرٍ وَالْحَمْدُ لِلَّهِ. كُنْتُ أُفَكِّرُ فِي تَنَوُّعِ الأَدْيَانِ فِي إِنْدُونِيسِيَا.", indo: "Baik, alhamdulillah. Saya tadi sedang memikirkan keberagaman agama di Indonesia." },
        { speaker: "إِبْرَاهِيمُ (Ibrahim)", arabic: "نَعَمْ، إِنَّهُ أَمْرٌ رَائِعٌ. هُنَاكَ الْمُسْلِمُونَ وَالْمَسِيحِيُّونَ وَالْهِنْدُوسِيُّونَ وَالْبُوذِيُّونَ وَالْكُونْفُوشِيُّونَ يَعِيشُونَ فِي سَلاَمٍ.", indo: "Ya, itu adalah hal yang luar biasa. Di sana umat Islam, Kristen, Hindu, Buddha, dan Khonghucu hidup dalam kedamaian." },
        { speaker: "رُقَيَّةُ (Ruqayyah)", arabic: "صَحِيحٌ، وَأَنَا مُعْجَبَةٌ جِدًّا بِكَيْفِيَّةِ احْتِرَامِ الْجَمِيعِ لِمُعْتَقَدَاتِ الآخَرِينَ.", indo: "Benar, dan saya sangat kagum dengan bagaimana semua orang menghormati keyakinan orang lain." },
        { speaker: "إِبْرَاهِيمُ (Ibrahim)", arabic: "هَذَا جُزْءٌ مُهِمٌّ مِنْ قِيَمِ \"بَانْتَجَاسِيلاَ\"، حَيْثُ يُشَجِّعُ النَّاسُ عَلَى الْوَحْدَةِ فِي التَّنَوُّعِ.", indo: "Ini adalah bagian penting dari nilai-nilai \"Pancasila\", di mana mendorong masyarakat pada persatuan dalam keberagaman." },
        { speaker: "رُقَيَّةُ (Ruqayyah)", arabic: "طَبْعًا، التَّسَامُحُ هُوَ مِفْتَاحُ السَّلاَمِ فِي مَجْتَمَعِنَا.", indo: "Tentu saja, toleransi adalah kunci kedamaian dalam masyarakat kita." }
      ]
    },
    {
      id: 8,
      title: "الحِوَارُ الثَّامِنُ : مَكَانُ الْعِبَادَةِ (Percakapan 2 Bab 4: Tempat Ibadah & Toleransi)",
      description: "Bab 4 (الأَدْيَانُ فِي إِنْدُونِيسِيَا): Dialog antara Marwan (مَرْوَانُ) dan Anisah (أَنِيْسَةُ) mengenai tempat-tempat ibadah (Vihara, Pura, Masjid) dan etika berhubungan dengan non-Muslim secara sosial.",
      avatarBuyer: "https://images.unsplash.com/photo-1594824813566-78a9c3621422?q=80&w=150&auto=format&fit=crop",
      avatarSeller: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop",
      dialogues: [
        { speaker: "مَرْوَانُ (Marwan)", arabic: "السَّلاَمُ عَلَيْكُمْ يَا أَنِيْسَةُ.", indo: "Assalamu'alaikum wahai Anisah." },
        { speaker: "أَنِيْسَةُ (Anisah)", arabic: "وَعَلَيْكُمُ السَّلاَمُ وَرَحْمَةُ اللهِ.", indo: "Wa'alaikumussalam warahmatullah." },
        { speaker: "مَرْوَانُ (Marwan)", arabic: "نَحْنُ الآنَ فِي مَكَانِ الْعِبَادَةِ، هَلْ عِنْدَكِ صَدِيْقٌ غَيْرُ مُسْلِمٍ؟", indo: "Kita sekarang berada di tempat ibadah, apakah kamu punya teman non-Muslim?" },
        { speaker: "أَنِيْسَةُ (Anisah)", arabic: "نَعَمْ، عِنْدِي صَدِيْقٌ بُوذِيٌّ، هُوَ فِي سُورَابَايَا.", indo: "Ya, saya punya teman seorang Buddhis, dia berada di Surabaya." },
        { speaker: "مَرْوَانُ (Marwan)", arabic: "أَيْنَ يَتَعَبَّدُ صَدِيْقُكِ؟", indo: "Di mana temanmu beribadah?" },
        { speaker: "أَنِيْسَةُ (Anisah)", arabic: "هُوَ يَتَعَبَّدُ فِي فِهَارَا. وَأَنْتَ يَا مَرْوَانُ، هَلْ تَعْرِفُ أَيْنَ يَتَعَبَّدُ الْهِنْدُوسِيُّونَ؟", indo: "Dia beribadah di Vihara. Dan kamu wahai Marwan, apakah kamu tahu di mana umat Hindu beribadah?" },
        { speaker: "مَرْوَانُ (Marwan)", arabic: "نَعَمْ عَرَفْتُ، هُمْ يَتَعَبَّدُونَ فِي فُورَا. كَيْفَ تُعَامِلِينَ صَدِيْقَكِ الْبُوذِيَّ؟", indo: "Ya saya tahu, mereka beribadah di Pura. Bagaimana kamu bersikap kepada temanmu yang Buddhis?" },
        { speaker: "أَنِيْسَةُ (Anisah)", arabic: "أَحْتَرِمُهُ احْتِرَامًا جَيِّدًا، حَيْثُ أُشَارِكُهُ فِي الْمُعَامَلَةِ الاِجْتِمَاعِيَّةِ وَلاَ فِي الدِّينِيَّةِ.", indo: "Saya menghormatinya dengan sangat baik, di mana saya berinteraksi dengannya dalam urusan sosial masyarakat dan tidak dalam urusan agama (akidah)." },
        { speaker: "مَرْوَانُ (Marwan)", arabic: "أَحْسَنْتِ يَا أَنِيْسَةُ، هَذَا هُوَ التَّسَامُحُ فِي الدِّينِ.", indo: "Bagus sekali wahai Anisah, inilah toleransi dalam beragama." }
      ]
    }
  ],

  qawaid: [
    {
      id: 1,
      title: "1. تَصْرِيفُ الأَفْعَالِ الْمَاضِيَةِ (Taṣrīf Lugawī Fi'il Māḍy)",
      subtitle: "Perubahan Kata Kerja Lampau (Fi'il Maadhy) Berdasarkan 14 Dhamir (Kata Ganti)",
      summary: "Fi'il Māḍy adalah kata kerja yang menunjukkan perbuatan atau peristiwa yang telah lampau. Perubahan kata kerja ini disesuaikan dengan 14 Dhamīr (kata ganti orang) dalam ilmu Sharaf.",
      tableHeader: ["الضَّمَائِرُ (Dhamir)", "مَكَثَ (Tinggal)", "فَرَّ (Lari)", "قَالَ (Berkata)", "بَاعَ (Menjual)", "تَلَا (Membaca)", "خَشِيَ (Takut)", "شَوَى (Membakar)"],
      tableRows: [
        ["هُوَ (Dia Lk 1)", "مَكَثَ", "فَرَّ", "قَالَ", "بَاعَ", "تَلَا", "خَشِيَ", "شَوَى"],
        ["هُمَا (Dia Lk 2)", "مَكَثَا", "فَرَّا", "قَالَا", "بَاعَا", "تَلَوَا", "خَشِيَا", "شَوَيَا"],
        ["هُمْ (Mereka Lk)", "مَكَّثُوا", "فَرُّوا", "قَالُوا", "بَاعُوا", "تَلَوْا", "خَشُوا", "شَوَوْا"],
        ["هِيَ (Dia Pr 1)", "مَكَّثَتْ", "فَرَّتْ", "قَالَتْ", "بَاعَتْ", "تَلَتْ", "خَشِيَتْ", "شَوَتْ"],
        ["هُمَا (Dia Pr 2)", "مَكَّثَتَا", "فَرَّتَا", "قَالَتَا", "بَاعَتَا", "تَلَتَا", "خَشِيَتَا", "شَوَتَا"],
        ["هُنَّ (Mereka Pr)", "مَكَّثْنَ", "فَرَرْنَ", "قُلْنَ", "بِعْنَ", "تَلَوْنَ", "خَشِينَ", "شَوَيْنَا"],
        ["أَنْتَ (Kamu Lk)", "مَكَّثْتَ", "فَرَرْتَ", "قُلْتَ", "بِعْتَ", "تَلَوْتَ", "خَشِيتَ", "شَوَيْتَ"],
        ["أَنْتُمَا (Kalian Lk 2)", "مَكَّثْتُمَا", "فَرَرْتُمَا", "قُلْتُمَا", "بِعْتُمَا", "تَلَوْتُمَا", "خَشِيتُمَا", "شَوَيْتُمَا"],
        ["أَنْتُمْ (Kalian Lk 3+)", "مَكَّثْتُمْ", "فَرَرْتُمْ", "قُلْتُمْ", "بِعْتُمْ", "تَلَوْتُمْ", "خَشِيتُمْ", "شَوَيْتُمْ"],
        ["أَنْتِ (Kamu Pr)", "مَكَّثْتِ", "فَرَرْتِ", "قُلْتِ", "بِعْتِ", "تَلَوْتِ", "خَشِيتِ", "شَوَيْتِ"],
        ["أَنْتُمَا (Kalian Pr 2)", "مَكَّثْتُمَا", "فَرَرْتُمَا", "قُلْتُمَا", "بِعْتُمَا", "تَلَوْتُمَا", "خَشِيتُمَا", "شَوَيْتُمَا"],
        ["أَنْتُنَّ (Kalian Pr 3+)", "مَكَّثْتُنَّ", "فَرَرْتُنَّ", "قُلْتُنَّ", "بِعْتُنَّ", "تَلَوْتُنَّ", "خَشِيتُنَّ", "شَوَيْتُنَّ"],
        ["أَنَا (Saya)", "مَكَّثْتُ", "فَرَرْتُ", "قُلْتُ", "بِعْتُ", "تَلَوْتُ", "خَشِيتُ", "شَوَيْتُ"],
        ["نَحْنُ (Kami/Kita)", "مَكَّثْنَا", "فَرَرْنَا", "قُلْنَا", "بِعْنَا", "تَلَوْنَا", "خَشِينَا", "شَوَيْنَا"]
      ],
      notes: [
        "1. Perhatikan perubahan kata kerja di atas. Yang tertera dalam tabel adalah Taṣrīf Lugawī Fi'il Māḍy.",
        "2. Fi'il Māḍy adalah kata kerja yang menunjukkan perbuatan yang telah dikerjakan atau peristiwa yang terjadi sebelum dibicarakan.",
        "3. Ilmu Sharaf memperhatikan perubahan kata kerja lampau disesuaikan dengan ḍamīr (kata ganti).",
        "4. Keterangan waktu yang mengharuskan penggunaan Fi'il Māḍy: فِي اليَوْمِ المَاضِي / الأُسْبُوْعِ المَاضِي / الشَّهْرِ المَاضِي / السَّنَةِ المَاضِيَةِ (hari/minggu/bulan/tahun lalu), لَيْلَةَ البَارِحَةِ (tadi malam), هَذَا الصَّبَاحَ (tadi pagi)."
      ]
    },
    {
      id: 2,
      title: "2. تَصْرِيفُ الأَفْعَالِ الْمُضَارِعَةِ (Taṣrīf Lugawī Fi'il Muḍāri' - Bab 2)",
      subtitle: "Perubahan Kata Kerja Sekarang / Yang Akan Datang (Fi'il Mudhari') Berdasarkan 14 Dhamir",
      summary: "Fi'il Muḍāri' adalah kata kerja yang menunjukkan suatu perbuatan yang sedang atau akan dilakukan. Perubahan kata kerja ini (Taṣrīf Lugawī) disesuaikan dengan 14 Dhamīr (kata ganti orang) dalam ilmu Sharaf.",
      tableHeader: ["الضَّمَائِرُ (Dhamir)", "يَشْرَبُ (Minum)", "يَشْعُرُ (Merasa)", "يَقُولُ (Berkata)", "يَسِيرُ (Berjalan)", "يَدْعُو (Mendoakan)", "يَجْرِي (Berlari)", "يَخْشَى (Takut)"],
      tableRows: [
        ["هُوَ (Dia Lk 1)", "يَشْرَبُ", "يَشْعُرُ", "يَقُولُ", "يَسِيرُ", "يَدْعُو", "يَجْرِي", "يَخْشَى"],
        ["هُمَا (Dia Lk 2)", "يَشْرَبَانِ", "يَشْعُرَانِ", "يَقُولاَنِ", "يَسِيرَانِ", "يَدْعُوَانِ", "يَجْرِيَانِ", "يَخْشَيَانِ"],
        ["هُمْ (Mereka Lk)", "يَشْرَبُونَ", "يَشْعُرُونَ", "يَقُولُونَ", "يَسِيرُونَ", "يَدْعُونَ", "يَجْرُونَ", "يَخْشَوْنَ"],
        ["هِيَ (Dia Pr 1)", "تَشْرَبُ", "تَشْعُرُ", "تَقُولُ", "تَسِيرُ", "تَدْعُو", "تَجْرِي", "تَخْشَى"],
        ["هُمَا (Dia Pr 2)", "تَشْرَبَانِ", "تَشْعُرَانِ", "تَقُولاَنِ", "تَسِيرَانِ", "تَدْعُوَانِ", "تَجْرِيَانِ", "تَخْشَيَانِ"],
        ["هُنَّ (Mereka Pr)", "يَشْرَبْنَ", "يَشْعُرْنَ", "يَقُلْنَ", "يَسِرْنَ", "يَدْعُونَ", "يَجْرِينَ", "يَخْشَيْنَ"],
        ["أَنْتَ (Kamu Lk)", "تَشْرَبُ", "تَشْعُرُ", "تَقُولُ", "تَسِيرُ", "تَدْعُو", "تَجْرِي", "تَخْشَى"],
        ["أَنْتُمَا (Kalian Lk 2)", "تَشْرَبَانِ", "تَشْعُرَانِ", "تَقُولاَنِ", "تَسِيرَانِ", "تَدْعُوَانِ", "تَجْرِيَانِ", "تَخْشَيَانِ"],
        ["أَنْتُمْ (Kalian Lk 3+)", "تَشْرَبُونَ", "تَشْعُرُونَ", "تَقُولُونَ", "تَسِيرُونَ", "تَدْعُونَ", "تَجْرُونَ", "تَخْشَوْنَ"],
        ["أَنْتِ (Kamu Pr)", "تَشْرَبِينَ", "تَشْعُرِينَ", "تَقُولِينَ", "تَسِيرِينَ", "تَدْعِينَ", "تَجْرِينَ", "تَخْشَيْنَ"],
        ["أَنْتُمَا (Kalian Pr 2)", "تَشْرَبَانِ", "تَشْعُرَانِ", "تَقُولاَنِ", "تَسِيرَانِ", "تَدْعُوَانِ", "تَجْرِيَانِ", "تَخْشَيَانِ"],
        ["أَنْتُنَّ (Kalian Pr 3+)", "تَشْرَبْنَ", "تَشْعُرْنَ", "تَقُلْنَ", "تَسِرْنَ", "تَدْعُونَ", "تَجْرِينَ", "تَخْشَيْنَ"],
        ["أَنَا (Saya)", "أَشْرَبُ", "أَشْعُرُ", "أَقُولُ", "أَسِيرُ", "أَدْعُو", "أَجْرِي", "أَخْشَى"],
        ["نَحْنُ (Kami/Kita)", "نَشْرَبُ", "نَشْعُرُ", "نَقُولُ", "نَسِيرُ", "نَدْعُو", "نَجْرِي", "نَخْشَى"]
      ],
      notes: [
        "1. Perhatikan perubahan kata di atas. Yang tertera dalam tabel adalah Taṣrīf Lugawī Fi'il Muḍāri'.",
        "2. Fi'il Muḍāri' adalah kata yang menunjukkan perbuatan yang sedang atau akan dilakukan (present / future tense).",
        "3. Ilmu Sharaf memperhatikan perubahan kata kerja sekarang/yang akan datang disesuaikan dengan ḍamīr (kata ganti).",
        "4. Keterangan waktu yang biasa digunakan dengan Fi'il Muḍāri': الآنَ (sekarang), فِي الْيَوْمِ الآتِي / فِي الأُسْبُوعِ الآتِي (di hari/minggu mendatang), فِي الشَّهْرِ الْقَادِمِ / فِي السَّنَةِ الْقَادِمَةِ (di bulan/tahun depan).",
        "5. Perubahan huruf di awal Fi'il Muḍāri' menggunakan huruf Mudhara'ah (أَ - نَ - يَ - تَ) disingkat أَنَيْتُ."
      ]
    },
    {
      id: 3,
      title: "3. تَصْرِيفُ الأَفْعَالِ الأَمْرِيَّةِ (Taṣrīf Lugawī Fi'il 'Amr - Bab 3)",
      subtitle: "Perubahan Kata Kerja Perintah (Fi'il 'Amr) Berdasarkan 6 Dhamir Mukhāṭab",
      summary: "Fi'il 'Amr adalah kata kerja yang digunakan untuk memberikan perintah atau permohonan. Perubahan kata kerja ini (Taṣrīf Lugawī) disesuaikan dengan 6 Dhamīr Mukhāṭab (kata ganti orang kedua).",
      tableHeader: ["الضَّمَائِرُ (Dhamir)", "اكْتُبْ (Tulislah)", "افْتَحْ (Bukalah)", "اجْلِسْ (Duduklah)", "استَأْذِنْ (Minta Izin)", "احْسِنْ (Berbuat Baik)", "تَفَضَّلْ (Silakan)", "فَكِّرْ (Berpikirlah)"],
      tableRows: [
        ["أَنْتَ (Kamu Lk 1)", "اكْتُبْ", "افْتَحْ", "اجْلِسْ", "استَأْذِنْ", "احْسِنْ", "تَفَضَّلْ", "فَكِّرْ"],
        ["أَنْتُمَا (Kalian Lk 2)", "اكْتُبَا", "افْتَحَا", "اجْلِسَا", "استَأْذِنَا", "احْسِنَا", "تَفَضَّلاَ", "فَكِّرَا"],
        ["أَنْتُمْ (Kalian Lk 3+)", "اكْتُبُوا", "افْتَحُوا", "اجْلِسُوا", "استَأْذِنُوا", "احْسِنُوا", "تَفَضَّلُوا", "فَكِّرُوا"],
        ["أَنْتِ (Kamu Pr 1)", "اكْتُبِي", "افْتَحِي", "اجْلِسِي", "استَأْذِنِي", "احْسِنِي", "تَفَضَّلِي", "فَكِّرِي"],
        ["أَنْتُمَا (Kalian Pr 2)", "اكْتُبَا", "افْتَحَا", "اجْلِسَا", "استَأْذِنَا", "احْسِنَا", "تَفَضَّلاَ", "فَكِّرَا"],
        ["أَنْتُنَّ (Kalian Pr 3+)", "اكْتُبْنَ", "افْتَحْنَ", "اجْلِسْنَ", "استَأْذِنَّ", "احْسِنَّ", "تَفَضَّلْنَ", "فَكِّرْنَ"]
      ],
      notes: [
        "a. Yang tertera dalam tabel adalah Taṣrīf Lugawī Fi'il 'Amr.",
        "b. Ilmu Sharaf memperhatikan perubahan kata kerja perintah (Fi'il 'Amr) disesuaikan dengan ḍamīr. Kata ganti yang digunakan hanya kata ganti orang kedua (ḍamīr mukhāṭab) yaitu: أَنْتَ - أَنْتُمَا - أَنْتُمْ - أَنْتِ - أَنْتُمَا - أَنْتُنَّ.",
        "c. Fi'il 'Amr ḍamīr antumā baik untuk laki-laki maupun perempuan tidak ada perbedaan (keduanya menggunakan akhiran Alif 'ا'). Kita membedakannya dalam konteks kalimat.",
        "5. Ketentuan Munādā (kata sesudah huruf nidā' 'يَا', 'أَيُّهَا', atau 'يَا أَيُّهَا'):",
        "  - Munādā dibaca marfū' (Dhammah) apabila berupa isim 'alam mufrad (nama orang tunggal), contoh: يَا زَيْدُ",
        "  - Munādā dibaca manṣūb (Fathah) apabila berupa muḍāf atau menyerupai muḍāf, contoh: يَا عَبْدَ اللهِ, يَا طَالِعًا جَبَلاً"
      ]
    },
    {
      id: 4,
      title: "4. النَّعْتُ وَالْمَنْعُوتُ (Kaidah Na'at & Man'ut - Bab 4)",
      subtitle: "Jenis-jenis Na'at (Kata Sifat / Keterangan) beserta Pengertian dan Contohnya",
      summary: "Na'at (Sifat) adalah kata yang mengikuti Isim sebelumnya (Man'ut) untuk menjelaskan sifat atau keadaannya. Terbagi menjadi 5 jenis: Na'at Haqiqi/Mufrad, Na'at Sababi, Na'at Jumlah Ismiyah, Na'at Jumlah Fi'liyah, dan Na'at Syibhil Jumlah.",
      tableHeader: ["No", "Jenis / Macam Na'at", "Pengertian", "Contoh Kalimat"],
      tableRows: [
        [
          "1",
          "Na'at Haqiqi / Na'at Mufrad",
          "Na'at yang menjelaskan man'ūt yang sesuai dalam hal nakirah, ma'rifat, muḍakkar, muannaś, mufrad, taśniyah, dan jama'.",
          "• يَجِبُ عَلَى الْمُسْلِمِينَ أَنْ يَجْتَنِبُوا الأَعْمَالَ السَّيِّئَةَ.\n• يُحِبُّ الْمُدَرِّسُ الطَّالِبَاتِ النَّشِيطَاتِ."
        ],
        [
          "2",
          "Na'at Sababi",
          "Na'at yang menjelaskan sifat bagi isim yang mempunyai hubungan atau ikatan dengan man'ūtnya.",
          "• يَخْرُجُ مِنْ بُطُونِهَا شَرَابٌ مُخْتَلِفٌ أَلْوَانُهُ (النحل: ٦٩)\n• أَكْرَمْتُ الطَّالِبَ الْحَسَنَ خُلُقُهُ."
        ],
        [
          "3",
          "Na'at Jumlah Ismiyah",
          "Na'at yang terdiri dari jumlah ismiyah (mubtada' – khabar).",
          "• تَرَكَ الشَّافِعِيُّ مُؤَلَّفَاتٍ نَفْعُهَا عَظِيمٌ."
        ],
        [
          "4",
          "Na'at Jumlah Fi'liyah",
          "Na'at yang terdiri dari jumlah fi'liyah (Fi'il - fa'il - maf'ul).",
          "• خَلَّفَ الشَّافِعِيُّ مَذْهَبًا يَحْتَرِمُهُ الْمُسْلِمُونَ جَمِيعًا."
        ],
        [
          "5",
          "Na'at Syibhil Jumlah",
          "Na'at yang menyerupai kalimat, tetapi bukan jumlah mufidah (kalimat yang lengkap). Na'at ini biasanya terdiri dari jar-majrur atau kata keterangan (ẓarf) dan muḍāf ilaih.",
          "• وَضَعَ الشَّافِعِيُّ كُتُبًا فِي الْفِقْهِ.\n• رَأَيْتُ طَائِرًا فَوْقَ الشَّجَرَةِ."
        ]
      ],
      notes: [
        "1. Na'at Haqiqi (Mufrad) wajib mengikuti Man'ut dalam 4 hal: (a) Mu'rab/I'rab (Rafa', Nasab, Jar), (b) Jenis (Mudzakkar/Muannats), (c) Jumlah (Mufrad, Tatsniyah, Jamak), (d) Kejelasan (Nakirah/Ma'rifah). Contoh: (الأَعْمَالَ ⬅️ السَّيِّئَةَ) & (الطَّالِبَاتِ ⬅️ النَّشِيطَاتِ).",
        "2. Na'at Sababi selalu berbentuk Mufrad dan ikrabnya mengikuti Man'ut sebelumnya, namun jenis gender (Mudzakkar/Muannats) mengikuti Isim sesudahnya. Contoh: (الطَّالِبَ ⬅️ الْحَسَنَ خُلُقُهُ).",
        "3. Na'at Jumlah Ismiyah, Fi'liyah, dan Syibhul Jumlah: (مُؤَلَّفَاتٍ ⬅️ نَفْعُهَا عَظِيمٌ), (مَذْهَبًا ⬅️ يَحْتَرِمُهُ الْمُسْلِمُونَ), (طَائِرًا ⬅️ فَوْقَ الشَّجَرَةِ). Syarat Man'ut-nya wajib berupa Isim Nakirah."
      ]
    },
    {
      id: 5,
      title: "5. الإِضَافَةُ: الْمُضَافُ وَالْمُضَافُ إِلَيْهِ (Kaidah Iḍāfah - Muḍāf & Muḍāf Ilaih - Bab 4)",
      subtitle: "Penggabungan Dua Kata Membentuk Satu Pengertian (Mudhaf & Mudhaf Ilaih)",
      summary: "Iḍāfah (إِضَافَةٌ) adalah gabungan dua kata isim atau lebih yang membentuk satu kesatuan makna. Kata pertama disebut Muḍāf (مُضَافٌ) dan kata kedua disebut Muḍāf Ilaih (مُضَافٌ إِلَيْهِ).",
      tableHeader: ["No", "مُضَافٌ (Muḍāf)", "مُضَافٌ إِلَيْهِ (Muḍāf Ilaih)", "Makna Tersirat (Pengandaian)"],
      tableRows: [
        [
          "1",
          "مَكْرُ",
          "اللَّيْلِ",
          "مَكْرٌ فِي اللَّيْلِ (Tipu daya DI DALAM malam - Makna فِي)"
        ],
        [
          "2",
          "كِتَابُ",
          "مُحَمَّدٍ",
          "كِتَابٌ لِمُحَمَّدٍ (Kitab MILIK Muhammad - Makna لِ)"
        ],
        [
          "3",
          "إِنَاءُ",
          "زُجَاجٍ",
          "إِنَاءٌ مِنْ زُجَاجٍ (Wadah DARI kaca - Makna مِنْ)"
        ],
        [
          "4",
          "رَسُولُ",
          "اللهِ",
          "رَسُولٌ لِلَّهِ (Utusan Allah / Milik Allah)"
        ],
        [
          "5",
          "شَدِيدُ",
          "الْعِقَابِ",
          "شَدِيدُ الْعِقَابِ (Sangat keras siksaan-Nya)"
        ],
        [
          "6",
          "كِتَابَ",
          "اللُّغَةِ الْعَرَبِيَّةِ",
          "كِتَابُ اللُّغَةِ (Buku Bahasa Arab)"
        ]
      ],
      notes: [
        "1. Iḍāfah adalah dua kata yang digabung menjadi satu membentuk satu pengertian. Satu berfungsi sebagai muḍāf dan satunya lagi berfungsi sebagai muḍāf ilaih.",
        "2. I'rāb muḍāf mengikuti kedudukannya dalam kalimat (bisa Marfu', Mansub, atau Majrur), sedangkan Muḍāf ilaih dibaca majrūr (Kasrah/Yaa) selamanya.",
        "3. Muḍāf TIDAK BOLEH menggunakan Alif Lam (ال) dan TIDAK BOLEH di-tanwin.",
        "4. Iḍāfah mengira-ngirakan 3 makna huruf jar: (a) فِي (di dalam) contoh مَكْرُ اللَّيْلِ, (b) لِ (milik/kepunyaan) contoh كِتَابُ مُحَمَّدٍ, (c) مِنْ (terbuat dari) contoh إِنَاءُ زُجَاجٍ."
      ]
    }
  ],

  quiz: [
  {
    "id": 1,
    "babId": "topik1",
    "question": "مَا مَعْنَى كَلِمَة (السُّوقُ التَّقْلِيدِيُّ) فِي اللُّغَةِ الإِنْدُونِيسِيَّةِ؟",
    "options": [
      "Supermarket / Mall",
      "Pasar Tradisional",
      "Rumah Sakit",
      "Bandara Udara"
    ],
    "correct": 1,
    "explanation": "السُّوقُ التَّقْلِيدِيُّ artinya adalah Pasar Tradisional.",
    "modelId": "model1"
  },
  {
    "id": 2,
    "babId": "topik1",
    "question": "عَيِّنِ الْجُمْلَةَ الْفِعْلِيَّةَ الصَّحِيحَةَ مِمَّا يَلِي:",
    "options": [
      "الطَّالِبُ يَشْتَرِي الْكِتَابَ",
      "يَشْتَرِي الطَّالِبُ الْكِتَابَ",
      "الْكِتَابَ يَشْتَرِي الطَّالِبُ",
      "فِي السُّوقِ الطَّالِبُ"
    ],
    "correct": 1,
    "explanation": "Jumlah Fi'liyyah diawali oleh kata kerja (Fi'il), yaitu: يَشْتَرِي الطَّالِبُ الْكِتَابَ.",
    "modelId": "model2"
  },
  {
    "id": 3,
    "babId": "topik1",
    "question": "أَيْنَ نَرْكَبُ الْقِطَارَ لِلذَّهَابِ إِلَى مَدِينَةٍ أُخْرَى؟",
    "options": [
      "فِي الْمَطَارِ",
      "فِي الْمَحَطَّةِ",
      "فِي الْمِينَاءِ",
      "فِي السُّوقِ"
    ],
    "correct": 1,
    "explanation": "Stasiun Kereta Api dalam bahasa Arab adalah الْمَحَطَّةُ.",
    "modelId": "model1"
  },
  {
    "id": 4,
    "babId": "topik1",
    "question": "مَا مَعْنَى كَلِمَة (شُبَّاكُ التَّذَاكِرِ)؟",
    "options": [
      "Pintu Masuk",
      "Loket Pembelian Tiket",
      "Ruang Tunggu",
      "Tempat Parkir"
    ],
    "correct": 1,
    "explanation": "شُبَّاكُ التَّذَاكِرِ artinya adalah Loket Tiket.",
    "modelId": "model1"
  },
  {
    "id": 5,
    "babId": "topik1",
    "question": "أَيْنَ نَرْكَبُ الطَّائِرَةَ لِلسَّفَرِ الْبَعِيدِ؟",
    "options": [
      "فِي الْمَطَارِ",
      "فِي الْمَحَطَّةِ",
      "فِي الْمَوْقِفِ",
      "فِي الشَّارِعِ"
    ],
    "correct": 0,
    "explanation": "Bandara Udara tempat naik pesawat adalah الْمَطَارُ.",
    "modelId": "model1"
  },
  {
    "id": 6,
    "babId": "topik1",
    "question": "مَا صِيغَةُ الْفِعْلِ الْمَاضِي لِلضَّمِيرِ (أَنَا) مِنْ فِعْلِ (ذَهَبَ)؟",
    "options": [
      "ذَهَبْتَ",
      "ذَهَبْتُ",
      "ذَهَبْنَا",
      "ذَهَبُوا"
    ],
    "correct": 1,
    "explanation": "Fi'il Madhy untuk damir أَنَا berakhiran Tuu: ذَهَبْتُ (Saya telah pergi).",
    "modelId": "model2"
  },
  {
    "id": 7,
    "babId": "topik1",
    "question": "مَا صِيغَةُ الْفِعْلِ الْمَاضِي لِلضَّمِيرِ (نَحْنُ) مِنْ فِعْلِ (رَكِبَ)؟",
    "options": [
      "رَكِبْتُ",
      "رَكِبْتُمْ",
      "رَكِبْنَا",
      "رَكِبَا"
    ],
    "correct": 2,
    "explanation": "Fi'il Madhy untuk damir نَحْنُ berakhiran Naa: رَكِبْنَا (Kami telah naik).",
    "modelId": "model2"
  },
  {
    "id": 8,
    "babId": "topik1",
    "question": "مَا صِيغَةُ الْفِعْلِ الْمَاضِي لِلضَّمِيرِ (هُمْ) مِنْ فِعْلِ (وَصَلَ)؟",
    "options": [
      "وَصَلَتْ",
      "وَصَلْنَا",
      "وَصَلُوا",
      "وَصَلْنَ"
    ],
    "correct": 2,
    "explanation": "Fi'il Madhy untuk damir هُمْ berakhiran Waw Alif: وَصَلُوا.",
    "modelId": "model2"
  },
  {
    "id": 9,
    "babId": "topik1",
    "question": "مَا صِيغَةُ الْفِعْلِ الْمَاضِي لِلضَّمِيرِ (أَنْتِ) مِنْ فِعْلِ (سَافَرَ)؟",
    "options": [
      "سَافَرْتِ",
      "سَافَرْتَ",
      "سَافَرْتُ",
      "سَافَرْنَ"
    ],
    "correct": 0,
    "explanation": "Fi'il Madhy untuk damir أَنْتِ berakhiran Ti: سَافَرْتِ.",
    "modelId": "model2"
  },
  {
    "id": 10,
    "babId": "topik1",
    "question": "مَا صِيغَةُ الْفِعْلِ الْمَاضِي لِلضَّمِيرِ (هُنَّ) مِنْ فِعْلِ (دَخَلَ)؟",
    "options": [
      "دَخَلُوا",
      "دَخَلْنَ",
      "دَخَلْتُنَّ",
      "دَخَلَتْ"
    ],
    "correct": 1,
    "explanation": "Fi'il Madhy untuk damir هُنَّ berakhiran Nun sukun fathah: دَخَلْنَ.",
    "modelId": "model2"
  },
  {
    "id": 11,
    "babId": "topik1",
    "question": "أَيْنَ ذَهَبَتْ إِبْرِيْزَةُ وَأُسْرَتُهَا فِي الْعُطْلَةِ الْمَاضِيَةِ؟",
    "options": [
      "إِلَى شَاطِئِ كُوتَا",
      "إِلَى غَارِ فِيْنْدُوْل",
      "إِلَى الْمَطَارِ",
      "إِلَى الْمُسْتَشْفَى"
    ],
    "correct": 1,
    "explanation": "Sesuai Qiraah 1 Bab 1: ذَهَبَتْ إِبْرِيْزَةُ إِلَى غَارِ فِيْنْدُوْل.",
    "modelId": "model1"
  },
  {
    "id": 12,
    "babId": "topik1",
    "question": "بِمَ ذَهَبَتْ إِبْرِيْزَةُ إِلَى بَيْتِ جَدِّهَا فِي سُوْكُوْهَارْجُوْ؟",
    "options": [
      "بِالْقِطَارِ",
      "بِالسَّيَّارَةِ",
      "بِالدَّرَّاجَةِ",
      "بِالطَّائِرَةِ"
    ],
    "correct": 1,
    "explanation": "Sesuai Qiraah 1: رَكِبْنَا السَّيَّارَةَ فِي السَّاعَةِ السَّابِعَةِ صَبَاحًا.",
    "modelId": "model1"
  },
  {
    "id": 13,
    "babId": "topik1",
    "question": "كَمْ كَانَتْ تَذْكِرَةُ الدُّخُولِ إِلَى غَارِ فِيْنْدُوْل لِكُلِّ فَرْدٍ؟",
    "options": [
      "عَشْرَةُ آلاَفِ رُوبِيَّةٍ",
      "خَمْسُونَ أَلْفَ رُوبِيَّةٍ",
      "مِئَةُ أَلْفِ رُوبِيَّةٍ",
      "خَمْسَةٌ وَعِشْرُونَ أَلْفًا"
    ],
    "correct": 1,
    "explanation": "Sesuai Qiraah 1: كَانَتِ التَّذْكِرَةُ بِخَمْسِينَ أَلْفَ رُوبِيَّةٍ لِكُلِّ فَرْدٍ.",
    "modelId": "model1"
  },
  {
    "id": 14,
    "babId": "topik1",
    "question": "أَيْنَ يَقَعُ شَاطِئُ لُوسَارِي (Losari) الْجَمِيلُ؟",
    "options": [
      "فِي يُوكْيَاكَرْتَا",
      "فِي مَكَّاسَار (Makassar)",
      "فِي جُومْبَانْج",
      "فِي بَالِي"
    ],
    "correct": 1,
    "explanation": "Sesuai Qiraah 2 Bab 1: Pantai Losari berada di kota Makassar.",
    "modelId": "model1"
  },
  {
    "id": 15,
    "babId": "topik1",
    "question": "أَيْنَ قَضَى نَبِيلٌ أَيَّامَ الْعُطْلَةِ الْمَاضِيَةِ فِي الْحِوَارِ؟",
    "options": [
      "فِي بَيْتِ جَدِّهِ فِي سُوكُوهَارْجُو",
      "فِي غَارِ فِيْنْدُوْل",
      "فِي الْمَدْرَسَةِ",
      "فِي الْقَاهِرَةِ"
    ],
    "correct": 0,
    "explanation": "Sesuai Hiwar 1 Bab 1: قَضَيْتُهَا فِي بَيْتِ جَدِّي فِي سُوْكُوْهَارْجُوْ.",
    "modelId": "model1"
  },
  {
    "id": 16,
    "babId": "topik1",
    "question": "مَعَ مَنْ ذَهَبَ فَاخِرٌ إِلَى غَارِ فِيْنْدُوْل؟",
    "options": [
      "مَعَ أَصْدِقَائِهِ",
      "مَعَ أُسْرَتِهِ",
      "مَعَ مُعَلِّمِهِ",
      "مُفْرَدًا"
    ],
    "correct": 1,
    "explanation": "Sesuai Hiwar 2 Bab 1: ذَهَبْتُ هُنَاكَ مَعَ أُسْرَتِي.",
    "modelId": "model1"
  },
  {
    "id": 17,
    "babId": "topik1",
    "question": "مَا مَعْنَى كَلِمَة (جَوَازُ السَّفَرِ)؟",
    "options": [
      "KTP / Kartu Identitas",
      "Paspor Perjalanan",
      "Tiket Kereta",
      "Uang Saku"
    ],
    "correct": 1,
    "explanation": "جَوَازُ السَّفَرِ artinya Paspor Perjalanan.",
    "modelId": "model1"
  },
  {
    "id": 18,
    "babId": "topik1",
    "question": "مَا مَعْنَى كَلِمَة (مُرْشِدُ السِّيَاحَةِ)؟",
    "options": [
      "Pemandu Wisata (Tour Guide)",
      "Sopir Bus",
      "Penjual Tiket",
      "Penginapan"
    ],
    "correct": 0,
    "explanation": "مُرْشِدُ السِّيَاحَةِ artinya Pemandu Wisata.",
    "modelId": "model1"
  },
  {
    "id": 19,
    "babId": "topik1",
    "question": "مَا مَعْنَى كَلِمَة (شَاطِئُ الْبَحْرِ)؟",
    "options": [
      "Pegunungan",
      "Pantai Laut",
      "Danau",
      "Air Terjun"
    ],
    "correct": 1,
    "explanation": "شَاطِئُ الْبَحْرِ artinya Pantai Laut.",
    "modelId": "model1"
  },
  {
    "id": 20,
    "babId": "topik1",
    "question": "مَا مَعْنَى كَلِمَة (حَافِلَةٌ سِيَاحِيَّةٌ)؟",
    "options": [
      "Sepeda Motor",
      "Bus Pariwisata",
      "Kapal Laut",
      "Kereta Cepat"
    ],
    "correct": 1,
    "explanation": "حَافِلَةٌ سِيَاحِيَّةٌ artinya Bus Pariwisata.",
    "modelId": "model1"
  },
  {
    "id": 21,
    "babId": "topik2",
    "question": "أَكْمِلْ الْجُمْلَةَ: (أَشْتَرِي الدَّوَاءَ مِنَ ... )",
    "options": [
      "الْمَطَارِ",
      "السُّوقِ",
      "الصَّيْدَلِيَّةِ",
      "الْمَدْرَسَةِ"
    ],
    "correct": 2,
    "explanation": "Obat dibeli di Apotek (الصَّيْدَلِيَّةِ).",
    "modelId": "model1"
  },
  {
    "id": 22,
    "babId": "topik2",
    "question": "يَفْحَصُ الْمَرِيضَ فِي الْمُسْتَشْفَى ...",
    "options": [
      "الْمُهَنْدِسُ",
      "الطَّبِيبُ",
      "الفَلاَّحُ",
      "الْمُعَلِّمُ"
    ],
    "correct": 1,
    "explanation": "Dokter (الطَّبِيبُ) memeriksa pasien.",
    "modelId": "model1"
  },
  {
    "id": 23,
    "babId": "topik2",
    "question": "مَا مَعْنَى كَلِمَة (صُدَاعٌ) فِي اللُّغَةِ الإِنْدُونِيسِيَّةِ؟",
    "options": [
      "Sakit Gigi",
      "Sakit Kepala / Pusing",
      "Sakit Perut",
      "Batuk"
    ],
    "correct": 1,
    "explanation": "صُدَاعٌ artinya Sakit Kepala.",
    "modelId": "model1"
  },
  {
    "id": 24,
    "babId": "topik2",
    "question": "مَا مَعْنَى كَلِمَة (حُمَّى) فِي الأَمْرَاضِ؟",
    "options": [
      "Flu / Pilek",
      "Demam / Panas Tinggi",
      "Sesak Napas",
      "Diare"
    ],
    "correct": 1,
    "explanation": "حُمَّى artinya Demam Tinggi.",
    "modelId": "model1"
  },
  {
    "id": 25,
    "babId": "topik2",
    "question": "تُسَاعِدُ الطَّبِيبَ فِي الْعِيَادَةِ وَالْمُسْتَشْفَى ...",
    "options": [
      "الْمُمَرِّضَةُ",
      "الْمُدَرِّسَةُ",
      "الْمُوَظَّفَةُ",
      "الخَادِمَةُ"
    ],
    "correct": 0,
    "explanation": "Perawat perempuan adalah الْمُمَرِّضَةُ.",
    "modelId": "model1"
  },
  {
    "id": 26,
    "babId": "topik2",
    "question": "مَا صِيغَةُ الْفِعْلِ الْمُضَارِعِ لِلضَّمِيرِ (أَنَا) مِنْ فِعْلِ (شَرِبَ - يَشْرَبُ)؟",
    "options": [
      "تَشْرَبُ",
      "أَشْرَبُ",
      "نَشْرَبُ",
      "يَشْرَبُونَ"
    ],
    "correct": 1,
    "explanation": "Fi'il Mudhari' damir أَنَا: أَشْرَبُ.",
    "modelId": "model2"
  },
  {
    "id": 27,
    "babId": "topik2",
    "question": "مَا صِيغَةُ الْفِعْلِ الْمُضَارِعِ لِلضَّمِيرِ (نَحْنُ) مِنْ فِعْلِ (لَعِبَ - يَلْعَبُ)؟",
    "options": [
      "أَلْعَبُ",
      "تَلْعَبُ",
      "نَلْعَبُ",
      "يَلْعَبُونَ"
    ],
    "correct": 2,
    "explanation": "Fi'il Mudhari' damir نَحْنُ: نَلْعَبُ.",
    "modelId": "model2"
  },
  {
    "id": 28,
    "babId": "topik2",
    "question": "مَا صِيغَةُ الْفِعْلِ الْمُضَارِعِ لِلضَّمِيرِ (أَنْتُمْ) مِنْ فِعْلِ (ذَهَبَ - يَذْهَبُ)؟",
    "options": [
      "تَذْهَبِينَ",
      "تَذْهَبُونَ",
      "يَذْهَبُونَ",
      "تَذْهَبْنَ"
    ],
    "correct": 1,
    "explanation": "Fi'il Mudhari' damir أَنْتُمْ: تَذْهَبُونَ.",
    "modelId": "model2"
  },
  {
    "id": 29,
    "babId": "topik2",
    "question": "مَا صِيغَةُ الْفِعْلِ الْمُضَارِعِ لِلضَّمِيرِ (هِيَ) مِنْ فِعْلِ (فَحَصَ - يَفْحَصُ)؟",
    "options": [
      "يَفْحَصُ",
      "تَفْحَصُ",
      "أَفْحَصُ",
      "نَفْحَصُ"
    ],
    "correct": 1,
    "explanation": "Fi'il Mudhari' damir هِيَ: تَفْحَصُ.",
    "modelId": "model2"
  },
  {
    "id": 30,
    "babId": "topik2",
    "question": "مَا صِيغَةُ الْفِعْلِ الْمُضَارِعِ لِلضَّمِيرِ (أَنْتِ) مِنْ فِعْلِ (أَكَلَ - يَأْكُلُ)؟",
    "options": [
      "تَأْكُلِينَ",
      "تَأْكُلُونَ",
      "يَأْكُلْنَ",
      "تَأْكُلُ"
    ],
    "correct": 0,
    "explanation": "Fi'il Mudhari' damir أَنْتِ: تَأْكُلِينَ.",
    "modelId": "model2"
  },
  {
    "id": 31,
    "babId": "topik2",
    "question": "مَاذَا قَالَ الْحُكَمَاءُ عَنِ الصِّحَّةِ فِي قِرَاءَةِ بَابِ 2؟",
    "options": [
      "الصِّحَّةُ تَاجٌ عَلَى رُؤُوسِ الأَصِحَّاءِ لاَ يَعْرِفُهُ إِلاَّ الْمَرْضَى",
      "الصِّحَّةُ لاَ تَفِيدُ شَيْئًا",
      "الْمَالُ أَهَمُّ مِنَ الصِّحَّةِ",
      "الصِّحَّةُ لِلأَطْفَالِ فَقَطْ"
    ],
    "correct": 0,
    "explanation": "Kesehatan adalah mahkota di atas kepala orang sehat.",
    "modelId": "model1"
  },
  {
    "id": 32,
    "babId": "topik2",
    "question": "مَاذَا يَفْعَلُ نَبِيلٌ وَنَوْفَلٌ كُلَّ صَبَاحٍ لِلْحِفَاظِ عَلَى الصِّحَّةِ؟",
    "options": [
      "يَنَامَانِ طَوِيلاً",
      "يَجْرِيَانِ كُلَّ صَبَاحٍ",
      "يَأْكُلاَنِ الْحَلْوَى",
      "يَشْرَبَانِ الْقَهْوَةَ"
    ],
    "correct": 1,
    "explanation": "Nabil & Naufal berlari setiap pagi (يَجْرِيَانِ).",
    "modelId": "model1"
  },
  {
    "id": 33,
    "babId": "topik2",
    "question": "مَنْ زَارَتْ رِيتَا فِي الْمُسْتَشْفَى عِنْدَمَا كَانَتْ مَرِيضَةً؟",
    "options": [
      "صَدِيقَاتُهَا",
      "مُعَلِّمُهَا",
      "جَارُهَا",
      "لاَ أَحَدَ"
    ],
    "correct": 0,
    "explanation": "Teman-temannya (صَدِيقَاتُهَا) menjenguk Rita.",
    "modelId": "model1"
  },
  {
    "id": 34,
    "babId": "topik2",
    "question": "بِمَ يَشْعُرُ الْمَرِيضُ فِي مَعِدَتِهِ عِنْدَمَا يَذْهَبُ إِلَى الطَّبِيبِ؟",
    "options": [
      "يَشْعُرُ بِالْفَرَحِ",
      "يَشْعُرُ بِأَلَمٍ شَدِيدٍ",
      "يَشْعُرُ بِالْجُوعِ",
      "لاَ يَشْعُرُ بِشَيْءٍ"
    ],
    "correct": 1,
    "explanation": "Pasien merasa sakit perut hebat (أَلَمٌ شَدِيدٌ).",
    "modelId": "model1"
  },
  {
    "id": 35,
    "babId": "topik2",
    "question": "مَاذَا يُعْطِي الطَّبِيبُ لِلْمَرِيضِ لِشِرَاءِ الدَّوَاءِ مِنَ الصَّيْدَلِيَّةِ؟",
    "options": [
      "وَصْفَةَ الطَّبِيبِ",
      "تَذْكِرَةَ السَّفَرِ",
      "بِطَاقَةَ الدُّخُولِ",
      "الْكِتَابَ"
    ],
    "correct": 0,
    "explanation": "Dokter memberikan resep obat (وَصْفَةُ الطَّبِيبِ).",
    "modelId": "model1"
  },
  {
    "id": 36,
    "babId": "topik2",
    "question": "مَا مَعْنَى كَلِمَة (السُّكَّرِيُّ) فِي الأَمْرَاضِ؟",
    "options": [
      "Penyakit Jantung",
      "Penyakit Gula / Diabetes",
      "Penyakit Paru-paru",
      "Sakit Mata"
    ],
    "correct": 1,
    "explanation": "السُّكَّرِيُّ artinya Diabetes.",
    "modelId": "model1"
  },
  {
    "id": 37,
    "babId": "topik2",
    "question": "مَا مَعْنَى كَلِمَة (الرِّيَاضَةُ) فِي حَيَاتِنَا؟",
    "options": [
      "Pelajaran Matematika",
      "Olahraga Olah Tubuh",
      "Seni Musik",
      "Membaca Buku"
    ],
    "correct": 1,
    "explanation": "الرِّيَاضَةُ artinya Olahraga.",
    "modelId": "model1"
  },
  {
    "id": 38,
    "babId": "topik2",
    "question": "مَا مَعْنَى كَلِمَة (وَجَبَةٌ غِذَائِيَّةٌ مُتَوَازِنَةٌ)؟",
    "options": [
      "Makanan Ringan",
      "Menu Makanan Bergizi Seimbang",
      "Makanan Cepat Saji",
      "Minuman Manis"
    ],
    "correct": 1,
    "explanation": "وَجَبَةٌ غِذَائِيَّةٌ مُتَوَازِنَةٌ artinya Makanan Bergizi Seimbang.",
    "modelId": "model1"
  },
  {
    "id": 39,
    "babId": "topik2",
    "question": "الْفِعْلُ الْمُضَارِعُ يَدُلُّ عَلَى الْحَدَثِ فِي الزَّمَنِ...",
    "options": [
      "الْمَاضِي فَقَطْ",
      "الْحَاضِرِ أَوِ الْمُسْتَقْبَلِ",
      "الأَمْرِ فَقَطْ",
      "الْبَعِيدِ"
    ],
    "correct": 1,
    "explanation": "Fi'il Mudhari' menunjukkan perbuatan masa sekarang/nanti.",
    "modelId": "model2"
  },
  {
    "id": 40,
    "babId": "topik2",
    "question": "أَيْنَ يَعْمَلُ الطَّبِيبُ وَالْمُمَرِّضَةُ لِعِلاَجِ الْمَرْضَى؟",
    "options": [
      "فِي الْمُسْتَشْفَى أَوِ الْعِيَادَةِ",
      "فِي الْمَطَارِ",
      "فِي الْمَحَطَّةِ",
      "فِي السُّوقِ"
    ],
    "correct": 0,
    "explanation": "Dokter bekerja di rumah sakit (الْمُسْتَشْفَى) atau klinik.",
    "modelId": "model1"
  },
  {
    "id": 41,
    "babId": "topik3",
    "question": "مَا هِيَ الْكَعْبَةُ الْمُشَرَّفَةُ فِي مَكَّةَ الْمُكَرَّمَةِ؟",
    "options": [
      "قِبْلَةُ الْمُسْلِمِينَ فِي الصَّلاَةِ",
      "مَسْجِدٌ فِي الْمَدِينَةِ",
      "جَبَلٌ فِي عَرَفَاتٍ",
      "مَكَانٌ فِي مِنًى"
    ],
    "correct": 0,
    "explanation": "Ka'bah adalah Kiblat Umat Islam.",
    "modelId": "model1"
  },
  {
    "id": 42,
    "babId": "topik3",
    "question": "مَا مَعْنَى (الطَّوَافُ) فِي الْحَجِّ وَالْعُمْرَةِ؟",
    "options": [
      "الدَّوَرَانُ حَوْلَ الْكَعْبَةِ سَبْعَةَ أَشْوَاطٍ",
      "الْمَشْيُ بَيْنَ الصَّفَا وَالْمَرْوَةِ",
      "الْوُقُوفُ بِعَرَفَةَ",
      "رَمْيُ الْجَمَرَاتِ"
    ],
    "correct": 0,
    "explanation": "Tawaf adalah mengelilingi Ka'bah 7 putaran.",
    "modelId": "model1"
  },
  {
    "id": 43,
    "babId": "topik3",
    "question": "مَا مَعْنَى (السَّعْيُ) فِي الْمَنَاسِكِ؟",
    "options": [
      "الْمَشْيُ بَيْنَ الصَّفَا وَالْمَرْوَةِ سَبْعَةَ أَشْوَاطٍ",
      "الدَّوَرَانُ حَوْلَ الْكَعْبَةِ",
      "حَلْقُ الشَّعْرِ",
      "ذَبْحُ الْهَدْيِ"
    ],
    "correct": 0,
    "explanation": "Sa'i adalah berjalan antara Safa dan Marwah 7 kali.",
    "modelId": "model1"
  },
  {
    "id": 44,
    "babId": "topik3",
    "question": "مَا مَعْنَى (التَّحَلُّلُ) بَعْدَ أَدَاءِ الْمَنَاسِكِ؟",
    "options": [
      "قَصُّ الشَّعْرِ أَوْ حَلْقُهُ",
      "لُبْسُ مَلاَبِسِ الإِحْرَامِ",
      "قِرَاءَةُ التَّلْبِيَةِ",
      "الْمَبِيتُ فِي مُزْدَلِفَةَ"
    ],
    "correct": 0,
    "explanation": "Tahallul adalah memotong/mencukur rambut.",
    "modelId": "model1"
  },
  {
    "id": 45,
    "babId": "topik3",
    "question": "مَا هُوَ الإِحْرَامُ فِي الْحَجِّ وَالْعُمْرَةِ؟",
    "options": [
      "نِيَّةُ الدُّخُولِ فِي النُّسُكِ مَعَ لُبْسِ مَلاَبِسِ الإِحْرَامِ",
      "الرُّجُوعُ إِلَى الْوَطَنِ",
      "شُرْبُ مَاءِ زَمْزَمَ",
      "الصَّلاَةُ فِي الْمَسْجِدِ"
    ],
    "correct": 0,
    "explanation": "Ihram adalah niat haji/umrah berpakaian ihram.",
    "modelId": "model1"
  },
  {
    "id": 46,
    "babId": "topik3",
    "question": "مَا صِيغَةُ فِعْلِ الأَمْرِ لِلضَّمِيرِ (أَنْتَ) مِنْ فِعْلِ (كَتَبَ - يَكْتُبُ)؟",
    "options": [
      "اكْتُبِي",
      "اكْتُبْ",
      "اكْتُبُوا",
      "لاَ تَكْتُبْ"
    ],
    "correct": 1,
    "explanation": "Fi'il Amr untuk أَنْتَ: اكْتُبْ.",
    "modelId": "model2"
  },
  {
    "id": 47,
    "babId": "topik3",
    "question": "مَا صِيغَةُ فِعْلِ الأَمْرِ لِلضَّمِيرِ (أَنْتُمْ) مِنْ فِعْلِ (فَتَحَ - يَفْتَحُ)؟",
    "options": [
      "افْتَحْ",
      "افْتَحِي",
      "افْتَحُوا",
      "افْتَحْنَ"
    ],
    "correct": 2,
    "explanation": "Fi'il Amr untuk أَنْتُمْ: افْتَحُوا.",
    "modelId": "model2"
  },
  {
    "id": 48,
    "babId": "topik3",
    "question": "مَا صِيغَةُ فِعْلِ الأَمْرِ لِلضَّمِيرِ (أَنْتِ) مِنْ فِعْلِ (جَلَسَ - يَجْلِسُ)؟",
    "options": [
      "اجْلِسْ",
      "اجْلِسِي",
      "اجْلِسُوا",
      "اجْلِسْنَ"
    ],
    "correct": 1,
    "explanation": "Fi'il Amr untuk أَنْتِ: اجْلِسِي.",
    "modelId": "model2"
  },
  {
    "id": 49,
    "babId": "topik3",
    "question": "مَا صِيغَةُ فِعْلِ الأَمْرِ لِلضَّمِيرِ (أَنْتُنَّ) مِنْ فِعْلِ (فَكَّرَ - يُفَكِّرُ)؟",
    "options": [
      "فَكِّرْ",
      "فَكِّرُوا",
      "فَكِّرْنَ",
      "فَكِّرِي"
    ],
    "correct": 2,
    "explanation": "Fi'il Amr untuk أَنْتُنَّ: فَكِّرْنَ.",
    "modelId": "model2"
  },
  {
    "id": 50,
    "babId": "topik3",
    "question": "إِذَا كَانَ الْمُنَادَى اسْمَ عَلَمٍ مُفْرَدًا (مِثْلُ: يَا زَيْدُ)، فَإِنَّهُ يُبْنَى عَلَى...",
    "options": [
      "الضَّمِّ",
      "الْفَتْحِ",
      "الْكَسْرِ",
      "السُّكُونِ"
    ],
    "correct": 0,
    "explanation": "Munada nama tunggal dibaca Dhammah: يَا زَيْدُ.",
    "modelId": "model2"
  },
  {
    "id": 51,
    "babId": "topik3",
    "question": "إِذَا كَانَ الْمُنَادَى مُضَافًا (مِثْلُ: يَا عَبْدَ اللهِ)، فَإِنَّ حُكْمَهُ...",
    "options": [
      "النَّصْبُ (Mansub / Fathah)",
      "الرَّفْعُ",
      "الْجَرُّ",
      "الْجَزْمُ"
    ],
    "correct": 0,
    "explanation": "Munada mudhaf dibaca Mansub/Fathah: يَا عَبْدَ اللهِ.",
    "modelId": "model2"
  },
  {
    "id": 52,
    "babId": "topik3",
    "question": "مَعَ مَنْ ذَهَبَ سَلْمَانُ لِلأَدَاءِ مَنَاسِكِ الْحَجِّ فِي القِرَاءَةِ؟",
    "options": [
      "مَعَ عَمِّهِ أَحْمَدَ",
      "مَعَ أُسْرَتِهِ",
      "مَعَ صَدِيقِهِ",
      "مُفْرَدًا"
    ],
    "correct": 0,
    "explanation": "Salman berhaji bersama pamannya Ahmad.",
    "modelId": "model1"
  },
  {
    "id": 53,
    "babId": "topik3",
    "question": "أَيْنَ يَقِفُ الْحُجَّاجُ فِي الْيَوْمِ التَّاسِعِ مِنْ ذِي الْحِجَّةِ؟",
    "options": [
      "فِي عَرَفَاتٍ",
      "فِي الْمَدِينَةِ",
      "فِي جُدَّةَ",
      "فِي الطَّائِفِ"
    ],
    "correct": 0,
    "explanation": "Wukuf dilakukan di Arafah (عَرَفَاتٌ).",
    "modelId": "model1"
  },
  {
    "id": 54,
    "babId": "topik3",
    "question": "مَاذَا قَالَ النَّبِيُّ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ عَنِ الْعُمْرَةِ فِي رَمَضَانَ؟",
    "options": [
      "عُمْرَةٌ فِي رَمَضَانَ تَعْدِلُ حَجَّةً",
      "الْعُمْرَةُ غَيْرُ مُسْتَحَبَّةٍ فِي رَمَضَانَ",
      "الْعُمْرَةُ تُكَرَّهُ فِي رَمَضَانَ",
      "لاَ فَضْلَ لِلْعُمْرَةِ فِي رَمَضَانَ"
    ],
    "correct": 0,
    "explanation": "Umrah di bulan Ramadan setara pahala haji.",
    "modelId": "model1"
  },
  {
    "id": 55,
    "babId": "topik3",
    "question": "أَيْنَ تَقَعُ الْكَعْبَةُ الْمُشَرَّفَةُ؟",
    "options": [
      "فِي الْمَسْجِدِ الْحَرَامِ بِمَكَّةَ الْمُكَرَّمَةِ",
      "فِي الْمَسْجِدِ النَّبَوِيِّ",
      "فِي الْمَسْجِدِ الأَقْصَى",
      "فِي الْقَاهِرَةِ"
    ],
    "correct": 0,
    "explanation": "Ka'bah di Masjidil Haram, Makkah.",
    "modelId": "model1"
  },
  {
    "id": 56,
    "babId": "topik3",
    "question": "مَا لَوْنُ الْحَجَرِ الأَسْوَدِ حِينَ نَزَلَ مِنَ الْجَنَّةِ كَمَا فِي الْحِوَارِ؟",
    "options": [
      "نَاصِعُ الْبَيَاضِ",
      "أَسْوَدُ قَاتِمٌ",
      "أَحْمَرُ",
      "أَخْضَرُ"
    ],
    "correct": 0,
    "explanation": "Hajar Aswad dulunya putih bersih (نَاصِعُ الْبَيَاضِ).",
    "modelId": "model1"
  },
  {
    "id": 57,
    "babId": "topik3",
    "question": "أَيْنَ يَقُومُ الْحُجَّاجُ بِرَمْيِ الْجَمَرَاتِ؟",
    "options": [
      "فِي مِنًى",
      "فِي عَرَفَةَ",
      "فِي الْمَطَارِ",
      "فِي الْمَدِينَةِ"
    ],
    "correct": 0,
    "explanation": "Lempar jumrah dilakukan di Mina (مِنًى).",
    "modelId": "model1"
  },
  {
    "id": 58,
    "babId": "topik3",
    "question": "مَا هُوَ مَقَامُ إِبْرَاهِيمَ فِي الْمَسْجِدِ الْحَرَامِ؟",
    "options": [
      "الْمَكَانُ الَّذِي وَقَفَ عَلَيْهِ إِبْرَاهِيمُ عِنْدَ بِنَاءِ الْكَعْبَةِ",
      "قَبْرُ إِبْرَاهِيمَ",
      "جَبَلٌ كَبِيرٌ",
      "بِئْرُ زَمْزَمَ"
    ],
    "correct": 0,
    "explanation": "Maqam Ibrahim adalah pijakan Nabi Ibrahim AS.",
    "modelId": "model1"
  },
  {
    "id": 59,
    "babId": "topik3",
    "question": "فِعْلُ الأَمْرِ يُصَاغُ فَقَطْ لِـ...",
    "options": [
      "ضَمَائِرِ الْمُخَاطَبِ",
      "ضَمَائِرِ الْغَائِبِ",
      "ضَمَائِرِ الْمُتَكَلِّمِ",
      "كُلِّ الضَّمَائِرِ"
    ],
    "correct": 0,
    "explanation": "Fi'il Amr hanya untuk 6 Dhamir Mukhatab.",
    "modelId": "model2"
  },
  {
    "id": 60,
    "babId": "topik3",
    "question": "مَا مَعْنَى (الْمِيقَاتُ الْمَكَانِيُّ) فِي الْحَجِّ؟",
    "options": [
      "الْمَكَانُ الَّذِي يُحْرِمُ مِنْهُ الْحَاجُّ أَوْ الْمُعْتَمِرُ",
      "وَقْتُ صَلاَةِ الْعِيدِ",
      "فُنْدُقُ الْحُجَّاجِ",
      "مَطَارُ جُدَّةَ"
    ],
    "correct": 0,
    "explanation": "Miqat Makani adalah batas lokasi ber-ihram.",
    "modelId": "model1"
  },
  {
    "id": 61,
    "babId": "topik4",
    "question": "كَمْ عَدَدُ الأَدْيَانِ الرَّسْمِيَّةِ فِي إِنْدُونِيسِيَا؟",
    "options": [
      "٤ أَدْيَانٍ",
      "٥ أَدْيَانٍ",
      "٦ أَدْيَانٍ",
      "٧ أَدْيَانٍ"
    ],
    "correct": 2,
    "explanation": "Ada 6 agama resmi di Indonesia.",
    "modelId": "model1"
  },
  {
    "id": 62,
    "babId": "topik4",
    "question": "مَا هُوَ مَكَانُ عِبَادَةِ الْمُسْلِمِينَ؟",
    "options": [
      "الْمَسْجِدُ",
      "الْكَنِيسَةُ",
      "فُورَا",
      "فِهَارَا"
    ],
    "correct": 0,
    "explanation": "Tempat ibadah Islam adalah Masjid.",
    "modelId": "model1"
  },
  {
    "id": 63,
    "babId": "topik4",
    "question": "مَا هُوَ مَكَانُ عِبَادَةِ الْمَسِيحِيِّينَ (الْكَاثُولِيكِ وَالْبُرُوتِسْتَانْتِ)؟",
    "options": [
      "الْكَنِيسَةُ",
      "الْمَسْجِدُ",
      "الْمَعْبَدُ",
      "فُورَا"
    ],
    "correct": 0,
    "explanation": "Tempat ibadah Kristen/Katolik adalah Gereja (الْكَنِيسَةُ).",
    "modelId": "model1"
  },
  {
    "id": 64,
    "babId": "topik4",
    "question": "مَا هُوَ مَكَانُ عِبَادَةِ الْهِنْدُوسِيِّينَ فِي بَالِي وَغَيْرِهَا؟",
    "options": [
      "فُورَا",
      "فِهَارَا",
      "الْمَسْجِدُ",
      "الْكَنِيسَةُ"
    ],
    "correct": 0,
    "explanation": "Tempat ibadah Hindu adalah Pura (فُورَا).",
    "modelId": "model1"
  },
  {
    "id": 65,
    "babId": "topik4",
    "question": "مَا هُوَ مَكَانُ عِبَادَةِ الْبُوذِيِّينَ؟",
    "options": [
      "فِهَارَا",
      "فُورَا",
      "الْمَسْجِدُ",
      "الْكَنِيسَةُ"
    ],
    "correct": 0,
    "explanation": "Tempat ibadah Buddha adalah Vihara (فِهَارَا).",
    "modelId": "model1"
  },
  {
    "id": 66,
    "babId": "topik4",
    "question": "مَا هُوَ مَكَانُ عِبَادَةِ الْكُونْفُوشِيِّينَ؟",
    "options": [
      "الْمَعْبَدُ",
      "الْمَسْجِدُ",
      "الْكَنِيسَةُ",
      "فُورَا"
    ],
    "correct": 0,
    "explanation": "Tempat ibadah Khonghucu adalah Klenteng (الْمَعْبَدُ).",
    "modelId": "model1"
  },
  {
    "id": 67,
    "babId": "topik4",
    "question": "مَا مَعْنَى كَلِمَة (التَّسَامُحُ) فِي الْمُجْتَمَعِ؟",
    "options": [
      "Toleransi / Saling Menghormati",
      "Perselisihan",
      "Perpisahan",
      "Perdebatan"
    ],
    "correct": 0,
    "explanation": "التَّسَامُحُ artinya Toleransi.",
    "modelId": "model1"
  },
  {
    "id": 68,
    "babId": "topik4",
    "question": "مَا هُوَ (بَانْتَجَاسِيلاَ) فِي إِنْدُونِيسِيَا؟",
    "options": [
      "أَسَاسُ الدَّوْلَةِ الإِـنْدُونِيسِيَّةِ",
      "اسْمُ مَدِينَةٍ",
      "اسْمُ جَبَلٍ",
      "عَمَلَةٌ نَقْدِيَّةٌ"
    ],
    "correct": 0,
    "explanation": "Pancasila adalah Dasar Negara Indonesia.",
    "modelId": "model1"
  },
  {
    "id": 69,
    "babId": "topik4",
    "question": "فِي جُمْلَةِ (يَجِبُ عَلَى الْمُسْلِمِينَ أَنْ يَجْتَنِبُوا الأَعْمَالَ السَّيِّئَةَ)، أَيْنَ النَّعْتُ؟",
    "options": [
      "السَّيِّئَةَ",
      "الأَعْمَالَ",
      "الْمُسْلِمِينَ",
      "يَجِبُ"
    ],
    "correct": 0,
    "explanation": "السَّيِّئَةَ adalah Na'at.",
    "modelId": "model2"
  },
  {
    "id": 70,
    "babId": "topik4",
    "question": "مَا نَوْعُ النَّعْتِ فِي جُمْلَةِ (تَرَكَ الشَّافِعِيُّ مُؤَلَّفَاتٍ نَفْعُهَا عَظِيمٌ)؟",
    "options": [
      "نَعْتُ جُمْلَةٍ إِسْمِيَّةٍ",
      "نَعْتٌ مُفْرَدٌ",
      "نَعْتُ جُمْلَةٍ فِعْلِيَّةٍ",
      "نَعْتُ شِبْهِ الْجُمْلَةِ"
    ],
    "correct": 0,
    "explanation": "نَفْعُهَا عَظِيمٌ adalah Na'at Jumlah Ismiyah.",
    "modelId": "model2"
  },
  {
    "id": 71,
    "babId": "topik4",
    "question": "مَا نَوْعُ النَّعْتِ فِي جُمْلَةِ (خَلَّفَ الشَّافِعِيُّ مَذْهَبًا يَحْتَرِمُهُ الْمُسْلِمُونَ)؟",
    "options": [
      "نَعْتُ جُمْلَةٍ فِعْلِيَّةٍ",
      "نَعْتٌ مُفْرَدٌ",
      "نَعْتُ جُمْلَةٍ إِسْمِيَّةٍ",
      "نَعْتُ شِبْهِ الْجُمْلَةِ"
    ],
    "correct": 0,
    "explanation": "يَحْتَرِمُهُ الْمُسْلِمُونَ adalah Na'at Jumlah Fi'liyah.",
    "modelId": "model2"
  },
  {
    "id": 72,
    "babId": "topik4",
    "question": "مَا نَوْعُ النَّعْتِ فِي جُمْلَةِ (رَأَيْتُ طَائِرًا فَوْقَ الشَّجَرَةِ)؟",
    "options": [
      "نَعْتُ شِبْهِ الْجُمْلَةِ",
      "نَعْتٌ مُفْرَدٌ",
      "نَعْتُ جُمْلَةٍ إِسْمِيَّةٍ",
      "نَعْتُ جُمْلَةٍ فِعْلِيَّةٍ"
    ],
    "correct": 0,
    "explanation": "فَوْقَ الشَّجَرَةِ adalah Na'at Syibhil Jumlah.",
    "modelId": "model2"
  },
  {
    "id": 73,
    "babId": "topik4",
    "question": "تَتَكَوَّنُ الإِضَافَةُ مِنْ رُكْنَيْنِ هُمَا...",
    "options": [
      "الْمُضَافُ وَالْمُضَافُ إِلَيْهِ",
      "الْفِعْلُ وَالْفَاعِلُ",
      "الْمُبْتَدَأُ وَالْخَبَرُ",
      "النَّعْتُ وَالْمَنْعُوتُ"
    ],
    "correct": 0,
    "explanation": "Idhafah = Mudhaf + Mudhaf Ilaih.",
    "modelId": "model2"
  },
  {
    "id": 74,
    "babId": "topik4",
    "question": "مَا حُكْمُ الْمُضَافِ إِلَيْهِ دَائِمًا فِي الإِعْرَابِ؟",
    "options": [
      "الْمَجْرُورُ",
      "الْمَرْفُوعُ",
      "الْمَنْصُوبُ",
      "الْمَجْزُومُ"
    ],
    "correct": 0,
    "explanation": "Mudhaf Ilaih selalu Majrur.",
    "modelId": "model2"
  },
  {
    "id": 75,
    "babId": "topik4",
    "question": "شَرْطُ الْمُضَافِ أَنْ لاَ يَكُونَ فِيهِ...",
    "options": [
      "أَلْفُ اللاَّمْ (ال) وَالتَّنْوِينُ",
      "الْحَرَكَةُ",
      "الْحُرُوفُ",
      "الضَّمِيرُ"
    ],
    "correct": 0,
    "explanation": "Mudhaf tidak boleh ber-AL dan Tanwin.",
    "modelId": "model2"
  },
  {
    "id": 76,
    "babId": "topik4",
    "question": "أَيْنَ يَسْكُنُ خَالِدٌ وَسُونَاَرْطُو وَفْرَانْسِيسْكُوسْ فِي نَصِّ الْقِرَاءَةِ؟",
    "options": [
      "فِي جُومْبَانْج",
      "فِي سُورَابَايَا",
      "فِي بَالِي",
      "فِي جَاكَرْتَا"
    ],
    "correct": 0,
    "explanation": "Khalid dkk tinggal di Jombang.",
    "modelId": "model1"
  },
  {
    "id": 77,
    "babId": "topik4",
    "question": "كَمْ نِسْبَةُ الْمُسْلِمِينَ فِي إِنْدُونِيسِيَا حَسَبَ نَصِّ الْقِرَاءَةِ؟",
    "options": [
      "٨٧,٢ %",
      "٥٠ %",
      "٦,٩ %",
      "٠,٧ %"
    ],
    "correct": 0,
    "explanation": "Islam 87,2 %.",
    "modelId": "model1"
  },
  {
    "id": 78,
    "babId": "topik4",
    "question": "مَا اسْمُ الْمَعْبَدِ الَّذِي يَتَعَبَّدُ فِيهِ سُونَاَرْطُو فِي جُومْبَانْج؟",
    "options": [
      "مَعْبَدُ هُوكْ لِيُؤْنْج كِيُؤْنْج",
      "فُورَا بَسَاكِيْه",
      "الْمَسْجِدُ الْكَبِيرُ",
      "كَنِيسَةُ جُومْبَانْج"
    ],
    "correct": 0,
    "explanation": "Klenteng Hok Liong Kiong Jombang.",
    "modelId": "model1"
  },
  {
    "id": 79,
    "babId": "topik4",
    "question": "مَا هُوَ شِعَارُ إِنْدُونِيسِيَا فِي التَّنَوُّعِ الدِّينِيِّ وَالثَّقَافِيِّ؟",
    "options": [
      "الْوَحْدَةُ فِي التَّنَوُّعِ",
      "التَّنَوُّعُ فَقَطْ",
      "الإِسْلَامُ فَقَطْ",
      "السَّلاَمُ"
    ],
    "correct": 0,
    "explanation": "Bhinneka Tunggal Ika.",
    "modelId": "model1"
  },
  {
    "id": 80,
    "babId": "topik4",
    "question": "مَنْ هُوَ مُصَمِّمُ وَمُؤَلِّفُ هَذِهِ الْمَادَّةِ التَّعْلِيمِيَّةِ التَّفَاعُلِيَّةِ؟",
    "options": [
      "Yosi, S. Ag, M. Pd. (MAN 1 Pontianak)",
      "Ahmad, S. Pd. (MAN 2 Jakarta)",
      "Fatimah, M. Ag. (MTsN 1 Surabaya)",
      "Ustadz Syarif (Ponpes Pontianak)"
    ],
    "correct": 0,
    "explanation": "Penyusun: Yosi, S. Ag, M. Pd. (MAN 1 Pontianak).",
    "modelId": "model1"
  }
]
};
