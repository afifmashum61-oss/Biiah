# 🌙 Arobiyatuna - Media Pembelajaran Bahasa Arab Interaktif

**Arobiyatuna** adalah aplikasi web media pembelajaran Bahasa Arab interaktif modern yang dirancang khusus untuk siswa Sekolah Menengah / Madrasah dalam mempelajari 5 Maharah (Kemampuan) Bahasa Arab: **المُفْرَدَاتُ (Mufrodat)**, **مَهَارَةُ الْقِرَاءَةِ (Membaca)**, **مَهَارَةُ الْكَلَامِ (Berbicara)**, **مَهَارَةُ الإِسْتِمَاعِ (Mendengarakn)**, dan **مَهَارَةُ الْكِتَابَةِ (Gramatikal & Menulis)**, dilengkapi dengan **Kuis Evaluasi Interaktif** dan **Sertifikat Kelulusan Digital**.

---

## 🌟 Fitur Utama

- **📖 3 Bab Utama Kurikulum Lengkap**:
  - **Bab 1**: *سَنَةٌ هِجْرِيَّةٌ جَدِيْدَةٌ* (Tahun Baru Hijriah & Penerapannya di Era Digital).
  - **Bab 2**: *سِيْرَةُ النَّبِيِّ صَلَّى اللهُ عَلَيْهِ وَسَلَّم* (Perjalanan Hidup Rasulullah ﷺ dari Lahir hingga Wafat).
  - **Bab 3**: *نُزُولُ الْقُرْآنِ وَ عِيدُ الْفِطْرِ وَعِيدُ الْأَضْحَى* (Nuzulul Qur'an & Dua Hari Raya).

- **📚 60 Mufrodat Interaktif (20 per Bab)**:
  - Flashcard kosakata lengkap dengan aksara Arab ber-harakat, transliterasi Latin, terjemahan Indonesia, dan tombol pelafalan audio (*Web Speech API TTS*).

- **💬 60 Percakapan Hiwar Interaktif (20 per Bab)**:
  - Tampilan balon percakapan interaktif yang dilengkapi **Ikon Avatar Orang Visual** (`<i class="fas fa-user-graduate">`, `<i class="fas fa-user-tie">`, dll).
  - Fitur **Perekam Suara Mandiri** (*Web Audio & MediaRecorder API*) untuk berlatih pelafalan dan memutar ulang suara siswa.

- **🎧 60 Soal Maharah Istima' (20 per Bab)**:
  - 100% Bahasa Arab ber-harakat tajam berstandar *Higher Order Thinking Skills (HOTS)*.
  - Dilengkapi fitur pendengar audio teks soal, pilihan jawaban Arab ber-harakat, dan pembahasan interaktif.

- **✍️ Qawa'id & Menyusun Kalimat**:
  - Tabel **Tashrif Lughawi 14 Dhomir** untuk Fi'il Madhi *اِحْتَفَلَ* (احتفل).
  - Latihan menyusun kata interaktif (*Word Order Chips*).

- **🏆 Kuis Evaluasi Multi-Maharah**:
  - 30 Soal komprehensif menguji seluruh maharah dengan pengukur waktu *real-time* dan **Sertifikat Hasil Belajar Digital**.

---

## 🛠️ Teknologi yang Digunakan

- **Frontend**: HTML5, CSS3 (Islamic Warm Gold Aesthetic), JavaScript (ES6+ Native SPA).
- **Audio Engine**: Web Speech API (`ar-SA`), Web Audio API Synthesizer (Sound FX), MediaRecorder API.
- **Backend Server**: Node.js Static HTTP Server (`server.js`).

---

## 🚀 Cara Menjalankan Project

1. **Clone Repository**:
   ```bash
   git clone https://github.com/afifmashum61-oss/Arobiyatuna.git
   cd Arobiyatuna
   ```

2. **Jalankan Server**:
   ```bash
   node server.js
   ```

3. **Buka di Browser**:
   Buka URL `http://localhost:3000/` pada peramban web pilihan Anda.

---

## 📄 Lisensi
Project ini dibuat untuk tujuan pendidikan dan media pembelajaran interaktif Bahasa Arab.
