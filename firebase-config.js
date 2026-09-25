// ==========================================================================
// Firebase Configuration & Realtime Cloud Sync
// Proyek: Lughotuna - Media Pembelajaran Bahasa Arab
// Firebase Project: db-lomba
// ==========================================================================

const firebaseConfig = {
  apiKey: "AIzaSyBODO8Kh7k9dnTWqXnPNOM--De7U2Zg8-A",
  authDomain: "db-lomba.firebaseapp.com",
  projectId: "db-lomba",
  storageBucket: "db-lomba.firebasestorage.app",
  messagingSenderId: "872980652713",
  appId: "1:872980652713:web:33ba4aca2d94557dedbfb8"
};

let db = null;
let isFirebaseConnected = false;

try {
  if (typeof firebase !== 'undefined') {
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
    db = firebase.firestore();
    isFirebaseConnected = true;
    console.log("🔥 [Firebase Cloud DB] Terhubung ke Firestore: db-lomba");
  } else {
    console.warn("⚠️ [Firebase] SDK Firebase belum dimuat.");
  }
} catch (err) {
  console.error("❌ [Firebase] Error inisialisasi:", err);
}

window.db = db;

// Service helper untuk sinkronisasi data cloud real-time
window.FirebaseSync = {
  isConnected: () => isFirebaseConnected && !!db,

  // Inisialisasi sinkronisasi data siswa & guru
  async init(defaultStudents = [], defaultTeachers = [], onSyncCallback = null) {
    if (!this.isConnected()) return;

    try {
      // 1. Sinkronisasi Koleksi Siswa
      const studentsCol = db.collection('students');
      
      // Cek apakah Firestore masih kosong, jika ya isi data awal (seeding)
      const snapshot = await studentsCol.limit(1).get();
      if (snapshot.empty && defaultStudents && defaultStudents.length > 0) {
        console.log("🌱 [Firebase] Seeding data awal siswa ke Firestore...");
        const batch = db.batch();
        defaultStudents.forEach(st => {
          const docRef = studentsCol.doc(String(st.id));
          batch.set(docRef, {
            ...st,
            updatedAt: firebase.firestore.FieldValue.serverTimestamp()
          });
        });
        await batch.commit();
      }

      // Realtime listener untuk siswa: ketika ada kuis selesai di HP lain, layar guru update otomatis!
      studentsCol.onSnapshot(querySnap => {
        if (!querySnap.empty) {
          const cloudStudents = [];
          querySnap.forEach(doc => {
            const data = doc.data();
            cloudStudents.push({
              id: data.id || Number(doc.id) || Date.now(),
              name: data.name || '',
              class: data.class || 'IX-A',
              password: data.password || '',
              score: typeof data.score === 'number' ? data.score : 0,
              progress: typeof data.progress === 'number' ? data.progress : 0,
              lastActive: data.lastActive || 'Aktif'
            });
          });
          
          localStorage.setItem('arabic_app_students', JSON.stringify(cloudStudents));
          
          if (typeof onSyncCallback === 'function') {
            onSyncCallback({ type: 'students', data: cloudStudents });
          }
        }
      }, err => {
        console.warn("⚠️ [Firebase] Realtime listener siswa info:", err.message);
      });

      // 2. Sinkronisasi Koleksi Guru
      const teachersCol = db.collection('teachers');
      const teacherSnap = await teachersCol.limit(1).get();
      if (teacherSnap.empty && defaultTeachers && defaultTeachers.length > 0) {
        const batchT = db.batch();
        defaultTeachers.forEach(tch => {
          const docRef = teachersCol.doc(String(tch.id));
          batchT.set(docRef, tch);
        });
        await batchT.commit();
      }

      teachersCol.onSnapshot(querySnap => {
        if (!querySnap.empty) {
          const cloudTeachers = [];
          querySnap.forEach(doc => {
            cloudTeachers.push(doc.data());
          });
          localStorage.setItem('arabic_app_teachers', JSON.stringify(cloudTeachers));
          if (typeof onSyncCallback === 'function') {
            onSyncCallback({ type: 'teachers', data: cloudTeachers });
          }
        }
      });

    } catch (e) {
      console.warn("⚠️ [Firebase] Gagal sinkronisasi awal (fallback mode offline):", e);
    }
  },

  // Simpan / update data satu siswa ke Firestore
  async saveStudent(student) {
    if (!this.isConnected() || !student) return;
    try {
      const docId = String(student.id || Date.now());
      await db.collection('students').doc(docId).set({
        ...student,
        updatedAt: firebase.firestore.FieldValue.serverTimestamp()
      }, { merge: true });
    } catch (err) {
      console.error("❌ Gagal simpan siswa ke Firebase:", err);
    }
  },

  // Simpan seluruh array siswa ke Firestore
  async saveAllStudents(studentsList) {
    if (!this.isConnected() || !Array.isArray(studentsList)) return;
    try {
      const batch = db.batch();
      studentsList.forEach(st => {
        const docRef = db.collection('students').doc(String(st.id));
        batch.set(docRef, {
          ...st,
          updatedAt: firebase.firestore.FieldValue.serverTimestamp()
        }, { merge: true });
      });
      await batch.commit();
      console.log("☁️ [Firebase] Seluruh data siswa tersinkronisasi ke cloud!");
    } catch (err) {
      console.error("❌ Gagal batch save siswa:", err);
    }
  },

  // Hapus akun siswa dari Firestore
  async deleteStudent(studentId) {
    if (!this.isConnected()) return;
    try {
      await db.collection('students').doc(String(studentId)).delete();
      console.log(`🗑️ [Firebase] Siswa ID ${studentId} terhapus dari cloud.`);
    } catch (err) {
      console.error("❌ Gagal hapus siswa dari Firebase:", err);
    }
  },

  // Simpan Guru
  async saveTeacher(teacher) {
    if (!this.isConnected() || !teacher) return;
    try {
      const docId = String(teacher.id || Date.now());
      await db.collection('teachers').doc(docId).set(teacher, { merge: true });
    } catch (err) {
      console.error("❌ Gagal simpan guru ke Firebase:", err);
    }
  },

  // Hapus Guru
  async deleteTeacher(teacherId) {
    if (!this.isConnected()) return;
    try {
      await db.collection('teachers').doc(String(teacherId)).delete();
    } catch (err) {
      console.error("❌ Gagal hapus guru dari Firebase:", err);
    }
  },

  // Simpan riwayat hasil kuis siswa ke koleksi quiz_results
  async recordQuizSubmission(submission) {
    if (!this.isConnected()) return;
    try {
      await db.collection('quiz_results').add({
        ...submission,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        createdAtFormatted: new Date().toLocaleString('id-ID')
      });
      console.log("🏆 [Firebase] Hasil kuis berhasil disimpan ke koleksi quiz_results cloud!");
    } catch (err) {
      console.error("❌ Gagal simpan hasil kuis ke Firebase:", err);
    }
  },

  // Simpan kamar duel 1v1 agar bisa dimainkan antar perangkat
  async saveDuelRoom(pin, roomData) {
    if (!this.isConnected() || !pin) return;
    try {
      await db.collection('duel_rooms').doc(String(pin)).set({
        ...roomData,
        pin: String(pin),
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
      });
    } catch (err) {
      console.warn("⚠️ Gagal simpan kamar duel:", err);
    }
  },

  // Cari kamar duel dari Firestore
  async getDuelRoom(pin) {
    if (!this.isConnected() || !pin) return null;
    try {
      const snap = await db.collection('duel_rooms').doc(String(pin)).get();
      if (snap.exists) {
        return snap.data();
      }
    } catch (err) {
      console.warn("⚠️ Gagal mencari kamar duel:", err);
    }
    return null;
  }
};
