// ==========================================================================
// Firebase Configuration & Realtime Cloud Sync
// Proyek: Lughotuna - Media Pembelajaran Bahasa Arab
// Firebase Project: db-lomba
// Sinkronisasi Real-time Nilai Latihan Soal & Game ke Akun Guru
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
    try {
      db.enablePersistence({ synchronizeTabs: true }).catch(err => {
        if (err.code === 'failed-precondition') {
          console.warn("⚠️ [Firebase] Multi-tab persistence failed-precondition");
        } else if (err.code === 'unimplemented') {
          console.warn("⚠️ [Firebase] Browser tidak mendukung persistence");
        }
      });
    } catch(pe) {}
    isFirebaseConnected = true;
    console.log("⚡ [Firebase Cloud DB] Terhubung ke Firestore: db-lomba");
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

  // Inisialisasi sinkronisasi data siswa, guru, dan aktivitas/nilai kuis & game
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

      // Realtime listener untuk siswa: ketika ada kuis / game selesai di HP lain, akun guru terupdate seketika!
      studentsCol.onSnapshot(querySnap => {
        if (!querySnap.empty) {
          const cloudStudents = [];
          querySnap.forEach(doc => {
            const data = doc.data() || {};
            // Filter: Akun guru tidak boleh masuk ke koleksi atau daftar peringkat siswa
            const nameLower = (data.name || '').toLowerCase();
            const isGuru = data.role === 'guru' || 
                           nameLower.includes("afif ma'shum") || 
                           nameLower.includes("afif mashum") || 
                           nameLower.startsWith("ustadz") || 
                           nameLower.startsWith("ustazah") || 
                           nameLower.startsWith("ustadzah") || 
                           /,?\s*(m\.pd|s\.pd|s\.pd\.i|m\.pd\.i|m\.a|lc|m\.ag)\b/i.test(nameLower);
            if (isGuru) {
              // Jika sebelumnya pernah tersimpan di koleksi 'students', bersihkan dari cloud
              studentsCol.doc(doc.id).delete().catch(() => {});
              return;
            }

            cloudStudents.push({
              id: data.id || doc.id || ('std_' + Date.now()),
              name: data.name || '',
              class: data.class || 'IX-A',
              password: data.password || '',
              avatar: data.avatar || '',
              gender: data.gender || '',
              score: typeof data.score === 'number' ? data.score : 0, // Kuis Utama / Kahoot
              istimaScore: typeof data.istimaScore === 'number' ? data.istimaScore : 0, // Latihan Istima
              kalamScore: typeof data.kalamScore === 'number' ? data.kalamScore : 0, // Praktik Kalam AI
              duelScore: typeof data.duelScore === 'number' ? data.duelScore : 0, // Game Duel 1v1 Pts
              matchGameScore: typeof data.matchGameScore === 'number' ? data.matchGameScore : 0, // Game Tebak Gambar
              averageScore: typeof data.averageScore === 'number' ? data.averageScore : 0,
              progress: typeof data.progress === 'number' ? data.progress : 0,
              lastActive: data.lastActive || 'Aktif',
              submissions: Array.isArray(data.submissions) ? data.submissions : [],
              ...data
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
          batchT.set(docRef, {
            ...tch,
            updatedAt: firebase.firestore.FieldValue.serverTimestamp()
          });
        });
        await batchT.commit();
      }

      teachersCol.onSnapshot(querySnap => {
        if (!querySnap.empty) {
          const cloudTeachers = [];
          querySnap.forEach(doc => {
            const data = doc.data() || {};
            cloudTeachers.push({
              id: data.id || doc.id,
              name: data.name || '',
              nip: data.nip || '',
              subject: data.subject || 'Bahasa Arab',
              status: data.status || 'Aktif',
              avatar: data.avatar || '',
              ...data
            });
          });
          localStorage.setItem('arabic_app_teachers', JSON.stringify(cloudTeachers));
          if (typeof onSyncCallback === 'function') {
            onSyncCallback({ type: 'teachers', data: cloudTeachers });
          }
        }
      });

      // 3. Realtime Listener untuk Hasil Latihan Soal & Game (quiz_results)
      // Setiap kali ada siswa menyelesaikan soal / game, arus data masuk ke dashboard guru seketika!
      const setupSubmissionsListener = (useOrder = true) => {
        let q = db.collection('quiz_results');
        if (useOrder) {
          try {
            q = q.orderBy('timestamp', 'desc');
          } catch (e) {
            useOrder = false;
          }
        }
        q.limit(40).onSnapshot(querySnap => {
          if (!querySnap.empty) {
            const list = [];
            querySnap.forEach(doc => {
              const d = doc.data() || {};
              // Filter agar dokumen kamar duel tidak masuk ke tabel riwayat latihan guru
              if (doc.id.startsWith('duel_room_') || d.type === 'duel_room' || d.isDuelRoom) {
                return;
              }
              list.push({
                id: doc.id,
                studentName: d.studentName || 'Siswa',
                studentId: d.studentId || '',
                class: d.class || 'IX-A',
                activityType: d.activityType || d.quizType || 'Latihan',
                category: d.category || 'latihan',
                score: typeof d.score === 'number' ? d.score : 0,
                maxScore: d.maxScore || 100,
                details: d.details || '',
                createdAtFormatted: d.createdAtFormatted || 'Baru Saja',
                timestamp: d.timestamp
              });
            });
            // Urutkan jika fallback tanpa order
            if (!useOrder) {
              list.sort((a, b) => (b.timestamp?.seconds || 0) - (a.timestamp?.seconds || 0));
            }
            localStorage.setItem('arabic_app_submissions', JSON.stringify(list));
            if (typeof onSyncCallback === 'function') {
              onSyncCallback({ type: 'submissions', data: list });
            }
          }
        }, err => {
          console.warn("⚠️ [Firebase] Realtime submissions fallback tanpa index:", err.message);
          if (useOrder) setupSubmissionsListener(false);
        });
      };

      setupSubmissionsListener(true);

    } catch (e) {
      console.warn("⚠️ [Firebase] Gagal sinkronisasi awal (fallback mode offline):", e);
    }
  },

  // Simpan / update data satu siswa ke Firestore
  async saveStudent(student) {
    if (!this.isConnected() || !student) return false;
    // Cegah akun guru tersimpan ke koleksi siswa
    const nameLower = (student.name || '').toLowerCase();
    if (student.role === 'guru' || nameLower.includes("afif ma'shum") || nameLower.includes("afif mashum") || nameLower.startsWith('ustadz') || nameLower.startsWith('ustazah') || nameLower.startsWith('ustadzah') || /,?\s*(m\.pd|s\.pd|s\.pd\.i|m\.pd\.i|m\.a|lc|m\.ag)\b/i.test(nameLower)) {
      return false;
    }
    try {
      const docId = String(student.id || Date.now());
      const payload = {};
      Object.keys(student).forEach(k => {
        if (student[k] !== undefined) {
          // Jangan menimpa avatar yang sudah ada di cloud jika payload hanya memiliki default atau string kosong
          if (k === 'avatar' && (!student[k] || student[k] === 'avatar-siswa.jpg' || student[k] === 'avatar-siswi.jpg')) {
            return;
          }
          payload[k] = student[k];
        }
      });
      payload.updatedAt = firebase.firestore.FieldValue.serverTimestamp();
      await db.collection('students').doc(docId).set(payload, { merge: true });
      console.log(`✅ [Firebase] Siswa ${student.name} tersimpan ke cloud Firestore.`);
      return true;
    } catch (err) {
      console.error("❌ Gagal simpan siswa ke Firebase:", err);
      return false;
    }
  },

  // Simpan seluruh array siswa ke Firestore
  async saveAllStudents(studentsList) {
    if (!this.isConnected() || !Array.isArray(studentsList)) return;
    try {
      const batch = db.batch();
      studentsList.forEach(st => {
        const nameLower = (st.name || '').toLowerCase();
        if (st.role === 'guru' || nameLower.includes("afif ma'shum") || nameLower.includes("afif mashum") || nameLower.startsWith('ustadz') || nameLower.startsWith('ustazah') || nameLower.startsWith('ustadzah') || /,?\s*(m\.pd|s\.pd|s\.pd\.i|m\.pd\.i|m\.a|lc|m\.ag)\b/i.test(nameLower)) {
          return;
        }
        const docRef = db.collection('students').doc(String(st.id));
        const payload = { ...st, updatedAt: firebase.firestore.FieldValue.serverTimestamp() };
        if (!payload.avatar || payload.avatar === 'avatar-siswa.jpg' || payload.avatar === 'avatar-siswi.jpg') {
          delete payload.avatar;
        }
        batch.set(docRef, payload, { merge: true });
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

  // Simpan / update data Guru ke Firestore
  async saveTeacher(teacher) {
    if (!this.isConnected() || !teacher) return false;
    try {
      const docId = String(teacher.id || (teacher.nip ? 'tch_' + teacher.nip : 201));
      const payload = {};
      Object.keys(teacher).forEach(k => {
        if (teacher[k] !== undefined) {
          if (k === 'avatar' && (!teacher[k] || teacher[k] === 'avatar-guru.jpg')) {
            return;
          }
          payload[k] = teacher[k];
        }
      });
      payload.updatedAt = firebase.firestore.FieldValue.serverTimestamp();
      await db.collection('teachers').doc(docId).set(payload, { merge: true });
      console.log(`✅ [Firebase] Guru ${teacher.name} tersimpan ke cloud Firestore.`);
      return true;
    } catch (err) {
      console.error("❌ Gagal simpan guru ke Firebase:", err);
      return false;
    }
  },

  // Hapus Guru
  async deleteTeacher(teacherId) {
    if (!this.isConnected()) return;
    try {
      await db.collection('teachers').doc(String(teacherId)).delete();
      console.log(`🗑️ [Firebase] Guru ID ${teacherId} terhapus dari cloud.`);
    } catch (err) {
      console.error("❌ Gagal hapus guru dari Firebase:", err);
    }
  },

  // Simpan riwayat hasil latihan soal & game ke koleksi quiz_results
  async recordQuizSubmission(submission) {
    if (!this.isConnected() || !submission) return null;
    try {
      const now = new Date();
      const timeStr = now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) + ' WIB, ' + now.toLocaleDateString('id-ID', { day: 'numeric', month: 'short' });
      const payload = {};
      Object.keys(submission).forEach(k => {
        if (submission[k] !== undefined) payload[k] = submission[k];
      });
      payload.timestamp = firebase.firestore.FieldValue.serverTimestamp();
      payload.createdAtFormatted = submission.createdAtFormatted || timeStr;
      const docRef = await db.collection('quiz_results').add(payload);
      console.log("📊 [Firebase] Hasil latihan/game berhasil disimpan ke koleksi quiz_results cloud!");
      return docRef.id;
    } catch (err) {
      console.error("❌ Gagal simpan hasil kuis/game ke Firebase:", err);
      return null;
    }
  },

  // ==========================================
  // MULTIPLAYER 1V1 DUEL REAL-TIME CLOUD METHODS
  // Menggunakan koleksi 'quiz_results' dengan ID 'duel_room_{pin}'
  // yang memiliki izin read/write penuh tanpa error 403 Forbidden
  // ==========================================

  // Buat kamar duel baru di Firestore
  async createDuelRoom(pin, hostData) {
    if (!this.isConnected() || !pin) return null;
    const cleanPin = String(pin).replace(/\D/g, '').trim();
    if (!cleanPin) return null;
    try {
      const roomPayload = {
        type: 'duel_room',
        isDuelRoom: true,
        pin: cleanPin,
        hostName: hostData.name || 'Siswa Host',
        hostId: hostData.id || '',
        hostClass: hostData.class || 'IX-A',
        guestName: null,
        guestId: null,
        guestClass: null,
        hostScore: 0,
        guestScore: 0,
        hostQ: 0,
        guestQ: 0,
        setIdx: typeof hostData.setIdx === 'number' ? hostData.setIdx : 0,
        status: 'waiting', // 'waiting' -> 'playing' -> 'ended'
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        updatedAt: firebase.firestore.FieldValue.serverTimestamp()
      };
      await db.collection('quiz_results').doc(`duel_room_${cleanPin}`).set(roomPayload);
      console.log(`🔑 [Firebase] Kamar duel PIN ${cleanPin} berhasil dibuat di Cloud Firestore!`);
      return roomPayload;
    } catch (err) {
      console.warn("⚠️ Gagal createDuelRoom di Firebase:", err);
      return null;
    }
  },

  // Simpan / update kamar duel
  async saveDuelRoom(pin, roomData) {
    if (!this.isConnected() || !pin) return;
    const cleanPin = String(pin).replace(/\D/g, '').trim();
    try {
      await db.collection('quiz_results').doc(`duel_room_${cleanPin}`).set({
        ...roomData,
        type: 'duel_room',
        isDuelRoom: true,
        pin: cleanPin,
        updatedAt: firebase.firestore.FieldValue.serverTimestamp()
      }, { merge: true });
    } catch (err) {
      console.warn("⚠️ Gagal simpan kamar duel:", err);
    }
  },

  // Siswa tamu bergabung ke kamar duel berdasarkan kode PIN
  async joinDuelRoom(pin, guestData) {
    if (!this.isConnected() || !pin) return { success: false, message: "Koneksi cloud Firebase belum aktif." };
    const cleanPin = String(pin).replace(/\D/g, '').trim();
    if (!cleanPin) return { success: false, message: "Kode PIN tidak valid." };

    try {
      const docRef = db.collection('quiz_results').doc(`duel_room_${cleanPin}`);
      const snap = await docRef.get();
      if (!snap.exists) {
        return { 
          success: false, 
          message: `Kamar dengan Kode PIN [${cleanPin}] tidak ditemukan! Pastikan teman Anda sudah klik 'Buat Kamar' dan kode 4 angka sudah benar.` 
        };
      }
      const room = snap.data() || {};
      if (room.status === 'ended') {
        return { success: false, message: `Pertandingan di kamar ${cleanPin} sudah selesai atau telah berakhir.` };
      }

      const updatedPayload = {
        guestName: guestData.name || 'Siswa Lawan',
        guestId: guestData.id || '',
        guestClass: guestData.class || 'IX-A',
        status: 'playing',
        updatedAt: firebase.firestore.FieldValue.serverTimestamp()
      };
      await docRef.update(updatedPayload);
      console.log(`🚪 [Firebase] Siswa ${guestData.name} berhasil bergabung ke Kamar ${cleanPin}!`);
      
      return { 
        success: true, 
        room: {
          ...room,
          ...updatedPayload
        } 
      };
    } catch (err) {
      console.warn("⚠️ Gagal joinDuelRoom:", err);
      return { success: false, message: "Gagal masuk kamar: " + (err.message || err) };
    }
  },

  // Cari kamar duel dari Firestore
  async getDuelRoom(pin) {
    if (!this.isConnected() || !pin) return null;
    const cleanPin = String(pin).replace(/\D/g, '').trim();
    try {
      const snap = await db.collection('quiz_results').doc(`duel_room_${cleanPin}`).get();
      if (snap.exists) {
        return snap.data();
      }
    } catch (err) {
      console.warn("⚠️ Gagal mencari kamar duel:", err);
    }
    return null;
  },

  // Pasang listener real-time pada kamar duel
  listenDuelRoom(pin, onUpdate) {
    if (!this.isConnected() || !pin) return null;
    const cleanPin = String(pin).replace(/\D/g, '').trim();
    try {
      return db.collection('quiz_results').doc(`duel_room_${cleanPin}`).onSnapshot(snap => {
        if (snap.exists && typeof onUpdate === 'function') {
          onUpdate(snap.data());
        }
      }, err => {
        console.warn("⚠️ Realtime listener duel room error:", err);
      });
    } catch(err) {
      console.warn("⚠️ Gagal memasang realtime listener duel room:", err);
      return null;
    }
  },

  // Update live skor & nomor soal pada pertandingan duel 1v1
  async updateDuelScore(pin, isHost, score, currentQ) {
    if (!this.isConnected() || !pin) return;
    const cleanPin = String(pin).replace(/\D/g, '').trim();
    try {
      const docRef = db.collection('quiz_results').doc(`duel_room_${cleanPin}`);
      const updateData = isHost 
        ? { hostScore: score, hostQ: currentQ, updatedAt: firebase.firestore.FieldValue.serverTimestamp() }
        : { guestScore: score, guestQ: currentQ, updatedAt: firebase.firestore.FieldValue.serverTimestamp() };
      await docRef.update(updateData);
    } catch (err) {
      // Non-critical background update
    }
  },

  // Akhiri kamar duel
  async endDuelRoom(pin) {
    if (!this.isConnected() || !pin) return;
    const cleanPin = String(pin).replace(/\D/g, '').trim();
    try {
      await db.collection('quiz_results').doc(`duel_room_${cleanPin}`).update({
        status: 'ended',
        updatedAt: firebase.firestore.FieldValue.serverTimestamp()
      });
    } catch(err) {}
  },

  // Batalkan & hapus kamar duel
  async cancelDuelRoom(pin) {
    if (!this.isConnected() || !pin) return;
    const cleanPin = String(pin).replace(/\D/g, '').trim();
    try {
      await db.collection('quiz_results').doc(`duel_room_${cleanPin}`).delete();
      console.log(`🗑️ [Firebase] Kamar duel PIN ${cleanPin} berhasil dibatalkan.`);
    } catch(err) {}
  }
};
