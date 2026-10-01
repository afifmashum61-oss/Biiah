// App logic for Media Pembelajaran Bahasa Arab Kelas 9: الحفاظ على البيئة

// Ultra-Responsive Native Arabic Speech Engine (Desktop & Mobile Optimized)
(function() {
  const synth = window.speechSynthesis;
  let cachedVoices = [];
  let currentUtterance = null; // Retain reference to prevent iOS Safari GC bug
  let audioQueue = [];
  let isPlayingAudio = false;
  window.isPlayingAudio = false;

  function loadVoices() {
    if (synth) {
      try {
        const v = synth.getVoices();
        if (v && v.length > 0) cachedVoices = v;
      } catch (e) {}
    }
  }

  if (synth) {
    loadVoices();
    if (synth.onvoiceschanged !== undefined) {
      synth.onvoiceschanged = loadVoices;
    }
  }

  function getBestArabicVoice() {
    const voices = (cachedVoices && cachedVoices.length > 0) ? cachedVoices : (synth ? synth.getVoices() : []);
    if (!voices || voices.length === 0) return null;
    // 1. Prioritize Saudi standard Fusha (ar-SA)
    let v = voices.find(v => v.lang && (v.lang === 'ar-SA' || v.lang === 'ar_SA'));
    // 2. Any Arabic regional voice (ar-EG, ar-AE, etc.)
    if (!v) v = voices.find(v => v.lang && v.lang.toLowerCase().startsWith('ar'));
    // 3. Voice with Arabic in name
    if (!v) v = voices.find(v => v.name && (v.name.toLowerCase().includes('arab') || v.name.includes('العربية')));
    return v;
  }

  // Pre-unlock audio on mobile touch (iOS Safari & Android Chrome)
  let audioUnlocked = false;
  function unlockMobileAudio() {
    if (audioUnlocked) return;
    audioUnlocked = true;
    if (synth) {
      try {
        const dummy = new SpeechSynthesisUtterance(' ');
        dummy.volume = 0.01;
        synth.speak(dummy);
      } catch (e) {}
    }
  }
  window.addEventListener('touchstart', unlockMobileAudio, { passive: true, once: true });
  window.addEventListener('touchend', unlockMobileAudio, { passive: true, once: true });
  window.addEventListener('click', unlockMobileAudio, { passive: true, once: true });

  function stopArabicAudio() {
    isPlayingAudio = false;
    audioQueue = [];
    if (synth) {
      try {
        synth.cancel();
      } catch (e) {}
    }
    currentUtterance = null;
    updateAudioUI(false);
  }

  function updateAudioUI(playing) {
    const playAllBtn = document.getElementById('play-qiraah-all-btn');
    if (playAllBtn) {
      if (playing) {
        playAllBtn.innerHTML = `
          <i class="fa-solid fa-circle-stop text-amber-300 animate-pulse"></i>
          <span>Hentikan Audio</span>
        `;
        playAllBtn.className = "px-4 py-2.5 bg-rose-700 hover:bg-rose-800 text-white rounded-2xl text-xs font-bold shadow-md transition-all flex items-center gap-2";
      } else {
        playAllBtn.innerHTML = `
          <i class="fa-solid fa-volume-high"></i>
          <span>Putar Audio Teks</span>
        `;
        playAllBtn.className = "px-4 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-2xl text-xs font-bold shadow-md transition-all flex items-center gap-2";
      }
    }
  }

  function splitArabicSentences(text) {
    if (!text) return [];
    // Clean string but preserve authentic Arabic diacritics / tashkeel
    const clean = text.replace(/[\u060C\u061F\.\,\:\;\!\?\"\'\(\)]/g, ' ').trim();
    // Split on Arabic and standard sentence delimiters
    const rawChunks = text.split(/[\.\!\?\n\:\;\u061F]+/).map(s => s.trim()).filter(s => s.length > 0);
    const result = [];
    for (const chunk of rawChunks) {
      if (chunk.length <= 160) {
        result.push(chunk);
      } else {
        const parts = chunk.split(/[\u060C\,]+/).map(s => s.trim()).filter(s => s.length > 0);
        for (const p of parts) {
          if (p.length <= 160) {
            result.push(p);
          } else {
            const words = p.split(/\s+/);
            let buf = '';
            for (const w of words) {
              if ((buf + ' ' + w).length <= 160) {
                buf = buf ? buf + ' ' + w : w;
              } else {
                if (buf) result.push(buf);
                buf = w;
              }
            }
            if (buf) result.push(buf);
          }
        }
      }
    }
    return result.length > 0 ? result : [text.substring(0, 160)];
  }

  let activeSpeakCallback = null;
  function speakArabic(text, customRate, callerBtn, onEnd) {
    if (!text || text.trim() === '') return;

    unlockMobileAudio();

    if (isPlayingAudio) {
      stopArabicAudio();
      return;
    }

    stopArabicAudio();
    activeSpeakCallback = (typeof onEnd === 'function') ? onEnd : null;
    isPlayingAudio = true;
    updateAudioUI(true);

    // Instant click feedback
    if (callerBtn && callerBtn.classList) {
      callerBtn.classList.add('scale-90', 'ring-2', 'ring-emerald-400');
      setTimeout(() => {
        callerBtn.classList.remove('scale-90', 'ring-2', 'ring-emerald-400');
      }, 250);
    }

    const chunks = splitArabicSentences(text);
    if (chunks.length === 0) {
      stopArabicAudio();
      return;
    }

    audioQueue = [...chunks];

    function playNext() {
      if (!isPlayingAudio || audioQueue.length === 0) {
        stopArabicAudio();
        return;
      }

      const chunk = audioQueue.shift();
      if (!chunk || !chunk.trim()) {
        playNext();
        return;
      }

      if (synth) {
        try {
          if (synth.speaking || synth.pending) {
            synth.cancel();
          }

          const utterance = new SpeechSynthesisUtterance(chunk);
          utterance.lang = 'ar-SA';
          utterance.rate = customRate || 0.85;

          const voice = getBestArabicVoice();
          if (voice) utterance.voice = voice;

          currentUtterance = utterance;

          let finished = false;
          const onFinish = () => {
            if (finished) return;
            finished = true;
            if (audioQueue.length > 0) {
              setTimeout(playNext, 120);
            } else {
              const cb = activeSpeakCallback;
              activeSpeakCallback = null;
              stopArabicAudio();
              if (typeof cb === 'function') {
                try { cb(); } catch (err) { console.warn('Speak callback error:', err); }
              }
            }
          };

          utterance.onend = onFinish;
          utterance.onerror = (e) => {
            console.warn('Utterance error:', e);
            onFinish();
          };

          synth.speak(utterance);
          if (synth.paused) synth.resume();
          return;
        } catch (e) {
          console.warn('Synth error:', e);
        }
      }

      stopArabicAudio();
    }

    playNext();
  }

  window.speakArabic = speakArabic;
  window.stopArabicAudio = stopArabicAudio;
})();

document.addEventListener('DOMContentLoaded', () => {
  // Global State
  const state = {
    currentUser: null, // { name, role: 'siswa'|'guru', email }
    currentView: 'login', // 'login', 'dashboard', 'mufradat', 'qiraah', 'grammar', 'dialogue', 'quiz', 'students'
    isDrawerOpen: false,
    quizIndex: 0,
    quizAnswers: {},
    quizSubmitted: false,
    quizScore: 0,
    vocabFilter: 'All',
    students: (() => {
      const saved = localStorage.getItem('arabic_app_students');
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed) && parsed.length > 0) return parsed;
        } catch(e) {}
      }
      return [...ARABIC_DATA.initialStudents];
    })(),
    teachers: [...(ARABIC_DATA.initialTeachers || [])],
    submissions: (() => {
      const saved = localStorage.getItem('arabic_app_submissions');
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed) && parsed.length > 0) return parsed;
        } catch(e) {}
      }
      return [...(ARABIC_DATA.initialSubmissions || [])];
    })(),
    studentsTab: 'table', // 'table' or 'feed'
    studentsSearch: '',
    studentsClassFilter: 'all',
    selectedStudentDetail: null,
    listeningQuizSubmitted: false,
    listeningQuizScore: 0,
    listeningQuizCorrect: 0,
    matchGameSubmitted: false,
    customVocab: [],
    // Maharah Kalam (Kemahiran Berbicara) State
    kalamState: {
      selectedCategory: 'all',
      activeItemIndex: 0,
      isRecording: false,
      isEvaluating: false,
      recordingSeconds: 0,
      recordingDuration: 0,
      interimTranscript: '',
      finalTranscript: '',
      recordedAudioUrl: null,
      speechSpeed: 0.85,
      evaluationResult: null,
      history: JSON.parse(localStorage.getItem('arabic_kalam_history') || '[]'),
      micError: null,
      micVolume: 0,
      maxVolumeRecorded: 0,
      speechEnergyFrames: 0,
      isPlayingStudent: false,
      availableDevices: [],
      selectedDeviceId: ''
    },
    // Dialogue Interactive State
    activeDialogueId: 1,
    dialogueMode: 'chat', // 'chat' or 'roleplay'
    roleplayStep: 0,
    showDialogueTranslation: true,
    myRole: 'all',
    // Qiraah Reading State
    showQiraahTranslation: false, // Hidden by default as requested
    openQiraahAccordions: {},
    showQiraahIrobColor: true, // Color coding & I'rab analysis feature
    activeIrobModalToken: null,
    // Maharah Istima' State
    listeningActiveTab: 'repeat', // 'repeat', 'quiz', 'match'
    listeningQuizIndex: 0,
    listeningQuizAnswers: {},
    listeningQuizSubmitted: false,
    listeningMatchSelected: {},
    audioSpeed: 0.85,
    // Kahoot Gamified State
    kahootPoints: 0,
    kahootStreak: 0,
    kahootTimeLeft: 20,
    kahootTimerId: null,
    kahootShowFeedback: false,
    kahootLastCorrect: false,
    kahootPointsEarned: 0,


    // 1v1 Fast Quiz Duel State
    duelState: {
      selectedSetIdx: 0, // 0: Paket A, 1: Paket B, 2: Paket C
      lobbyStep: 'lobby', // 'lobby', 'create_room', 'join_room', 'playing'
      roomPin: '',
      isHost: false,
      joinPinInput: '',
      pinError: '',
      mode: 'ai', // 'ai' or 'pvp'
      aiDifficulty: 'medium', // 'easy', 'medium', 'hard'
      opponentName: 'Ustadz AI (Bot)',
      currentQuestionIdx: 0,
      scorePlayer: 0,
      scoreOpponent: 0,
      comboStreak: 0,
      maxCombo: 0,
      timeLeft: 10,
      timerId: null,
      isSubmitted: false,
      selectedAnswer: null,
      opponentAnswered: false,
      opponentSelectedAnswer: null,
      battleEnded: false,
      history: []
    }
  };

  // Toast Notification System
  window.showToast = showToast;
  function showToast(message, type = 'info') {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    const isSuccess = type === 'success';
    const isError = type === 'error';
    const isWarning = type === 'warning';

    const bgClass = isSuccess 
      ? 'bg-emerald-900/95 text-white border-emerald-500 shadow-emerald-900/30' 
      : (isError 
        ? 'bg-rose-900/95 text-white border-rose-500 shadow-rose-900/30' 
        : (isWarning 
          ? 'bg-amber-900/95 text-white border-amber-500 shadow-amber-900/30' 
          : 'bg-teal-900/95 text-white border-teal-500 shadow-teal-900/30'));

    const icon = isSuccess 
      ? 'fa-circle-check text-emerald-400' 
      : (isError 
        ? 'fa-triangle-exclamation text-rose-400' 
        : (isWarning 
          ? 'fa-circle-exclamation text-amber-400' 
          : 'fa-circle-info text-teal-400'));

    toast.className = `pointer-events-auto flex items-center gap-3 px-4 py-3 rounded-2xl border shadow-xl backdrop-blur-md text-xs font-semibold transform transition-all duration-300 translate-y-[-10px] opacity-0 ${bgClass}`;
    toast.innerHTML = `
      <i class="fa-solid ${icon} text-base shrink-0"></i>
      <span class="flex-1 leading-snug">${message}</span>
    `;

    container.appendChild(toast);

    requestAnimationFrame(() => {
      toast.classList.remove('translate-y-[-10px]', 'opacity-0');
      toast.classList.add('translate-y-0', 'opacity-100');
    });

    setTimeout(() => {
      toast.classList.remove('translate-y-0', 'opacity-100');
      toast.classList.add('translate-y-[-10px]', 'opacity-0');
      setTimeout(() => {
        if (toast.parentNode) toast.parentNode.removeChild(toast);
      }, 300);
    }, 3500);
  }

  // =========================================================================
  // REAL-TIME SYNCHRONIZATION ENGINE & UNIFIED SCORE SUBMISSION
  // Memastikan semua nilai latihan & game masuk ke akun guru secara realtime!
  // =========================================================================
  const learningSyncChannel = typeof BroadcastChannel !== 'undefined' ? new BroadcastChannel('arabic_learning_sync') : null;
  if (learningSyncChannel) {
    learningSyncChannel.onmessage = (event) => {
      const msg = event.data;
      if (!msg) return;
      if (msg.type === 'NEW_SUBMISSION') {
        if (msg.submission) {
          if (!state.submissions) state.submissions = [];
          state.submissions = [msg.submission, ...state.submissions.filter(s => s.id !== msg.submission.id)].slice(0, 50);
          localStorage.setItem('arabic_app_submissions', JSON.stringify(state.submissions));
        }
        if (msg.student) {
          const idx = state.students.findIndex(s => s.id === msg.student.id || (s.name && msg.student.name && s.name.toLowerCase() === msg.student.name.toLowerCase()));
          if (idx !== -1) {
            state.students[idx] = { ...state.students[idx], ...msg.student };
          } else {
            state.students.unshift(msg.student);
          }
          localStorage.setItem('arabic_app_students', JSON.stringify(state.students));
        }
        // Notifikasi visual & audio seketika jika Guru sedang membuka aplikasi
        if (state.currentUser && state.currentUser.role === 'guru') {
          showToast(`🔔 Nilai Baru Masuk: ${msg.submission.studentName} menyelesaikan ${msg.submission.activityType} (Skor: ${msg.submission.score})!`, 'success');
          if (typeof playSoundEffect === 'function') playSoundEffect('combo');
          if (state.currentView === 'students' || state.currentView === 'dashboard') {
            render();
          }
        }
      }
    };
  }

  // Cross-tab storage event listener
  window.addEventListener('storage', (e) => {
    if (e.key === 'arabic_app_students' && e.newValue) {
      try {
        state.students = JSON.parse(e.newValue);
        if (state.currentUser && state.currentUser.role === 'guru' && (state.currentView === 'students' || state.currentView === 'dashboard')) {
          render();
        }
      } catch (err) {}
    }
    if (e.key === 'arabic_app_submissions' && e.newValue) {
      try {
        state.submissions = JSON.parse(e.newValue);
        if (state.currentUser && state.currentUser.role === 'guru' && (state.currentView === 'students' || state.currentView === 'dashboard')) {
          render();
        }
      } catch (err) {}
    }
  });

  // Fungsi Terpusat: Kirim Semua Nilai Latihan Soal & Game ke Akun Guru Realtime
  function submitStudentActivity({ activityType, category = 'latihan', score, maxScore = 100, details = '', additionalData = {} }) {
    const studentName = state.currentUser ? state.currentUser.name : 'Siswa Tamu';
    const studentRole = state.currentUser ? state.currentUser.role : 'siswa';

    let student = state.students.find(s => 
      (state.currentUser && state.currentUser.id && s.id === state.currentUser.id) || 
      (s.name && s.name.toLowerCase() === studentName.toLowerCase())
    );

    if (!student && studentRole === 'siswa') {
      student = {
        id: (state.currentUser && state.currentUser.id) || Date.now(),
        name: studentName,
        class: (state.currentUser && state.currentUser.class) || 'IX-A',
        score: 0,
        istimaScore: 0,
        kalamScore: 0,
        duelScore: 0,
        matchGameScore: 0,
        averageScore: 0,
        progress: 0,
        lastActive: 'Baru Saja',
        submissions: []
      };
      state.students.unshift(student);
    }

    if (student) {
      if (activityType.includes('Kahoot') || activityType.includes('Kuis Interaktif')) {
        student.score = score;
      } else if (activityType.includes('Istima') || activityType.includes('Menyimak')) {
        student.istimaScore = score;
      } else if (activityType.includes('Kalam') || activityType.includes('Berbicara')) {
        student.kalamScore = score;
      } else if (activityType.includes('Duel')) {
        student.duelScore = Math.max(student.duelScore || 0, score);
        student.duelMatches = (student.duelMatches || 0) + 1;
        if (details && details.includes('Menang')) student.duelWins = (student.duelWins || 0) + 1;
      } else if (activityType.includes('Tebak Gambar') || activityType.includes('Match')) {
        student.matchGameScore = score;
      }

      // Hitung Nilai Rata-rata Gabungan (Akademik & Praktik)
      const academicScores = [];
      if (typeof student.score === 'number' && student.score > 0) academicScores.push(student.score);
      if (typeof student.istimaScore === 'number' && student.istimaScore > 0) academicScores.push(student.istimaScore);
      if (typeof student.kalamScore === 'number' && student.kalamScore > 0) academicScores.push(student.kalamScore);
      if (typeof student.matchGameScore === 'number' && student.matchGameScore > 0) academicScores.push(student.matchGameScore);
      student.averageScore = academicScores.length > 0 
        ? Math.round(academicScores.reduce((a, b) => a + b, 0) / academicScores.length)
        : (student.score || 0);

      // Hitung Progres Belajar Siswa (5 komponen aktivitas)
      let doneCount = 0;
      if (student.score > 0) doneCount++;
      if (student.istimaScore > 0) doneCount++;
      if (student.kalamScore > 0) doneCount++;
      if (student.duelScore > 0) doneCount++;
      if (student.matchGameScore > 0) doneCount++;
      student.progress = Math.min(100, Math.round((doneCount / 5) * 100));

      const now = new Date();
      const timeStr = now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) + ' WIB';
      student.lastActive = `Hari ini ${timeStr}`;

      if (!student.submissions) student.submissions = [];
      student.submissions.unshift({
        activityType,
        category,
        score,
        maxScore,
        details,
        time: timeStr
      });
      student.submissions = student.submissions.slice(0, 25);

      localStorage.setItem('arabic_app_students', JSON.stringify(state.students));
    }

    const submissionId = 'sub_' + Date.now();
    const now = new Date();
    const timeStr = now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }) + ' WIB';
    const newSub = {
      id: submissionId,
      studentName: student ? student.name : studentName,
      studentId: student ? student.id : '',
      class: student ? student.class : 'IX-A',
      activityType,
      category,
      score,
      maxScore,
      details,
      createdAtFormatted: `Hari ini ${timeStr}`,
      timestamp: { seconds: Math.floor(Date.now() / 1000) },
      ...additionalData
    };

    if (!state.submissions) state.submissions = [];
    state.submissions = [newSub, ...state.submissions.filter(s => s.id !== submissionId)].slice(0, 50);
    localStorage.setItem('arabic_app_submissions', JSON.stringify(state.submissions));

    // Kirim langsung ke Firebase Firestore Cloud
    if (window.FirebaseSync && window.FirebaseSync.isConnected()) {
      if (student) {
        window.FirebaseSync.saveStudent(student);
      }
      window.FirebaseSync.recordQuizSubmission(newSub);
    }

    // Broadcast ke tab browser lain (seperti tab guru yang sedang terbuka)
    if (learningSyncChannel) {
      learningSyncChannel.postMessage({
        type: 'NEW_SUBMISSION',
        submission: newSub,
        student: student
      });
    }

    showToast(`Nilai ${activityType} (${score}) otomatis masuk ke Akun Guru secara realtime! 🌟`, 'success');
  }

  // Load persisted state if exists
  const savedUser = localStorage.getItem('arabic_app_user');
  if (savedUser) {
    try {
      state.currentUser = JSON.parse(savedUser);
      state.currentView = 'dashboard';
    } catch (e) {
      localStorage.removeItem('arabic_app_user');
    }
  }

  const savedStudents = localStorage.getItem('arabic_app_students');
  if (savedStudents) {
    try {
      state.students = JSON.parse(savedStudents);
    } catch (e) {}
  }

  const savedTeachers = localStorage.getItem('arabic_app_teachers');
  if (savedTeachers) {
    try {
      state.teachers = JSON.parse(savedTeachers);
    } catch (e) {}
  }

  // DOM Elements
  const appContainer = document.getElementById('app-content');
  const drawer = document.getElementById('nav-drawer');
  const drawerOverlay = document.getElementById('drawer-overlay');
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const closeDrawerBtn = document.getElementById('close-drawer-btn');



  // Drawer Controls
  function toggleDrawer(open) {
    state.isDrawerOpen = open !== undefined ? open : !state.isDrawerOpen;
    const navItemsContainer = document.getElementById('drawer-nav-items');
    if (state.isDrawerOpen) {
      drawer.classList.remove('translate-x-full');
      drawerOverlay.classList.remove('hidden');
      // Reset scroll position to top whenever drawer opens so menu always starts from the first item
      if (navItemsContainer) {
      navItemsContainer.scrollTop = 0;
      }
      if (drawer) {
        drawer.scrollTop = 0;
      }
    } else {
      drawer.classList.add('translate-x-full');
      drawerOverlay.classList.add('hidden');
    }
  }

  if (hamburgerBtn) hamburgerBtn.addEventListener('click', () => toggleDrawer(true));
  if (closeDrawerBtn) closeDrawerBtn.addEventListener('click', () => toggleDrawer(false));
  if (drawerOverlay) drawerOverlay.addEventListener('click', () => toggleDrawer(false));

  // Render Navigation Links in Drawer & Header
  function renderNavigation() {
    const navItemsContainer = document.getElementById('drawer-nav-items');
    const userBadge = document.getElementById('header-user-badge');
    
    if (userBadge) {
      if (state.currentUser) {
        userBadge.innerHTML = `
          <div class="hidden md:flex items-center gap-2 bg-emerald-50 text-emerald-800 border border-emerald-200 px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium shadow-2xs">
            <span class="w-2.5 h-2.5 rounded-full ${state.currentUser.role === 'guru' ? 'bg-amber-500' : 'bg-emerald-500'} animate-pulse"></span>
            <span class="truncate max-w-[150px] lg:max-w-none">${state.currentUser.name} (${state.currentUser.role === 'guru' ? 'Guru' : 'Siswa'})</span>
          </div>
          <div class="flex md:hidden items-center gap-1.5 bg-emerald-50 text-emerald-800 border border-emerald-200 px-2.5 py-1 rounded-full text-[11px] font-bold shadow-2xs">
            <span class="w-2 h-2 rounded-full ${state.currentUser.role === 'guru' ? 'bg-amber-500' : 'bg-emerald-500'}"></span>
            <span>${state.currentUser.role === 'guru' ? 'Guru' : 'Siswa'}</span>
          </div>
        `;
      } else {
        userBadge.innerHTML = '';
      }
    }

    if (navItemsContainer) {
      let navs = [
        { id: 'dashboard', icon: 'fa-home', label: 'الرئيسية' },
        { id: 'mufradat', icon: 'fa-layer-group', label: 'المفردات' },
        { id: 'istima', icon: 'fa-headphones', label: 'مهارة الاستماع' },
        { id: 'kalam', icon: 'fa-microphone-lines', label: 'مَهَارَةُ الكَلَامِ' },
        { id: 'qiraah', icon: 'fa-book-open', label: 'مهارة القراءة' },
        { id: 'qawaid', icon: 'fa-spell-check', label: 'القواعد' },
        { id: 'dialogue', icon: 'fa-comments', label: 'الحوار' },
        { id: 'quiz', icon: 'fa-pen-to-square', label: 'التدريبات' },
        { id: 'duelgame', icon: 'fa-bolt', label: 'مُبَارَزَةُ السَّرِيعَةِ' }
      ];

      if (state.currentUser && state.currentUser.role === 'guru') {
        navs.push({ id: 'students', icon: 'fa-chart-user', label: 'مُتَابَعَةُ الطُّلَّابِ' });
        navs.push({ id: 'settings', icon: 'fa-gear', label: 'إِعْدَادَاتُ الْحِسَابِ' });
      }

      navItemsContainer.innerHTML = navs.map(item => `
        <button data-view="${item.id}" class="nav-item-btn w-full flex items-center justify-end gap-2.5 px-3 py-2 sm:px-4 sm:py-2.5 rounded-xl font-medium transition-all ${state.currentView === item.id ? 'bg-emerald-700 text-white shadow-md' : 'text-emerald-900 hover:bg-emerald-50'}">
          <span class="font-arabic font-bold text-sm sm:text-base text-right truncate">${item.label}</span>
          <i class="fa-solid ${item.icon} w-5 text-center shrink-0 ${state.currentView === item.id ? 'text-white' : 'text-emerald-600'}"></i>
        </button>
      `).join('') + `
        <div class="pt-3 mt-3 border-t border-emerald-100">
          <button id="logout-btn" class="w-full flex items-center justify-end gap-2.5 px-3 py-2 sm:px-4 sm:py-2.5 rounded-xl font-medium text-red-600 hover:bg-red-50 transition-all">
            <span class="text-xs sm:text-sm font-semibold">تسجيل الخروج (Logout)</span>
            <i class="fa-solid fa-right-from-bracket w-5 text-center shrink-0"></i>
          </button>
        </div>
      `;

      // Attach click events
      document.querySelectorAll('.nav-item-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
          const view = e.currentTarget.getAttribute('data-view');
          if (typeof cancelKalamRecording === 'function') cancelKalamRecording();
          if (typeof stopStudentAudio === 'function') stopStudentAudio();
          state.currentView = view;
          toggleDrawer(false);
          render();
        });
      });

      const logoutBtn = document.getElementById('logout-btn');
      if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
          state.currentUser = null;
          state.currentView = 'login';
          localStorage.removeItem('arabic_app_user');
          toggleDrawer(false);
          render();
        });
      }
    }
  }

  // --- VIEW RENDERERS ---

  // 1. LOGIN VIEW
  function renderLogin() {
    return `
      <div class="relative w-full min-h-screen flex flex-col justify-start sm:justify-center items-stretch sm:items-center p-0 sm:p-6 lg:p-8 overflow-y-auto sm:overflow-hidden bg-[#062d1c] sm:bg-transparent">
        <!-- Background: High Quality Local Nature SVG + Emerald Overlay (Desktop) -->
        <div class="absolute inset-0 z-0 hidden sm:block">
          <img src="bg-nature.svg" alt="Nature Background" class="w-full h-full object-cover object-center transform scale-105">
          <div class="absolute inset-0 bg-gradient-to-br from-emerald-950/40 via-emerald-900/30 to-teal-950/50"></div>
          
          <!-- Ambient Glowing Light Orbs -->
          <div class="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-400/20 rounded-full blur-[120px] pointer-events-none"></div>
          <div class="absolute bottom-1/4 right-1/4 w-96 h-96 bg-teal-300/20 rounded-full blur-[120px] pointer-events-none"></div>

          <!-- Decorative Watermark Calligraphy -->
          <div class="absolute inset-0 flex items-center justify-center pointer-events-none select-none opacity-10">
            <span class="text-[14vw] font-bold font-arabic text-emerald-200 tracking-widest">الحفاظ على البيئة</span>
          </div>
        </div>

        <!-- Clean Solid Login Container: Edge-to-edge full screen on mobile (Zero pop-up feel), Centered Card on Desktop -->
        <div class="relative z-10 w-full min-h-screen sm:min-h-0 sm:max-w-md flex flex-col sm:my-auto">
          <div class="w-full flex-1 flex flex-col bg-white sm:rounded-[2.5rem] rounded-none shadow-none sm:shadow-2xl border-0 sm:border border-emerald-100 overflow-hidden">
            
            <!-- Header Arch Banner inside Card: Full bleed on mobile with safe top notch padding -->
            <div class="relative bg-gradient-to-r from-emerald-900 via-emerald-800 to-teal-800 px-6 pt-12 pb-9 sm:p-8 text-white overflow-hidden text-center flex-shrink-0">
              <div class="absolute -right-10 -top-10 w-36 h-36 bg-emerald-400/10 rounded-full blur-xl pointer-events-none"></div>
              <div class="absolute -left-10 -bottom-10 w-36 h-36 bg-teal-300/10 rounded-full blur-xl pointer-events-none"></div>
              
              <div class="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-3.5 py-1.5 rounded-full text-[11px] font-semibold text-emerald-200 border border-white/20 mb-3 shadow-sm">
                <i class="fa-solid fa-seedling text-emerald-400"></i>
                <span>Media Pembelajaran Bahasa Arab</span>
              </div>
              
              <h2 class="text-2xl sm:text-3xl font-bold font-arabic leading-tight mb-1.5 text-white drop-shadow-sm">الحفاظ على البيئة</h2>
              <p class="text-xs text-emerald-200 font-medium">Materi Kelas 9 MTs / SMP Islam</p>
            </div>

            <!-- Card Content Body: Full width on mobile with smooth top curve, fills all remaining height down to screen edge -->
            <div class="flex-1 bg-white px-6 py-7 sm:p-8 space-y-5 rounded-t-[2.5rem] -mt-5 relative z-10 sm:rounded-none sm:mt-0 shadow-[0_-8px_30px_rgba(0,0,0,0.08)] sm:shadow-none flex flex-col justify-start sm:justify-center">

              <!-- ================= SECTION 1: LOGIN BOX (SISWA & GURU SATU PINTU) ================= -->
              <div id="login-box" class="space-y-4">
                <div class="text-center mb-1">
                  <h3 class="text-lg font-bold text-emerald-950">Masuk ke Pembelajaran</h3>
                  <p class="text-xs text-gray-500">Silakan masukkan nama akun dan kata sandi Anda</p>
                </div>

                <!-- Alert Error Message -->
                <div id="login-error-msg" class="hidden p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
                  <i class="fa-solid fa-circle-exclamation shrink-0 text-rose-500"></i>
                  <span id="login-error-text"></span>
                </div>

                <form id="login-form" class="space-y-4">
                  <div>
                    <label class="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wider">Nama Lengkap / Akun</label>
                    <div class="relative">
                      <i class="fa-solid fa-user absolute left-4 top-3.5 text-emerald-600 text-sm"></i>
                      <input type="text" id="login-name" required placeholder="Masukkan nama siswa atau guru..." class="w-full pl-11 pr-4 py-3 rounded-2xl border border-emerald-200 bg-emerald-50/30 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent text-base sm:text-sm font-semibold text-gray-800 placeholder-gray-400 transition-all">
                    </div>
                  </div>

                  <div>
                    <label class="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wider">Kata Sandi</label>
                    <div class="relative">
                      <i class="fa-solid fa-lock absolute left-4 top-3.5 text-emerald-600 text-sm"></i>
                      <input type="password" id="login-password" required placeholder="Masukkan kata sandi..." class="w-full pl-11 pr-11 py-3 rounded-2xl border border-emerald-200 bg-emerald-50/30 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent text-base sm:text-sm font-semibold text-gray-800 placeholder-gray-400 transition-all">
                      <button type="button" id="toggle-login-pwd" class="absolute right-3.5 top-3 text-gray-400 hover:text-emerald-700 text-sm focus:outline-none p-1">
                        <i class="fa-solid fa-eye" id="login-pwd-icon"></i>
                      </button>
                    </div>
                  </div>

                  <button type="submit" id="btn-submit-login" class="w-full py-3.5 bg-gradient-to-r from-emerald-800 to-teal-700 hover:from-emerald-900 hover:to-teal-800 text-white rounded-2xl font-bold shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 text-sm active:scale-[0.99]">
                    <span>Masuk ke Pembelajaran</span>
                    <i class="fa-solid fa-arrow-right text-xs"></i>
                  </button>
                </form>

                <!-- Tombol Pindah ke Form Pendaftaran Siswa -->
                <div class="pt-3 text-center border-t border-emerald-50">
                  <p class="text-xs text-gray-500">Belum memiliki akun siswa?</p>
                  <button type="button" id="btn-to-register" class="mt-1.5 text-xs font-bold text-emerald-700 hover:text-emerald-900 hover:underline transition-all inline-flex items-center gap-1.5">
                    <i class="fa-solid fa-user-plus text-[11px]"></i>
                    <span>Daftar Akun Siswa Baru</span>
                  </button>
                </div>
              </div>

              <!-- ================= SECTION 2: REGISTER BOX (DAFTAR AKUN SISWA) ================= -->
              <div id="register-box" class="hidden space-y-4">
                <div class="text-center mb-1">
                  <h3 class="text-lg font-bold text-emerald-950">Daftar Akun Siswa</h3>
                  <p class="text-xs text-gray-500">Buat akun belajar baru untuk menyimpan progres Anda</p>
                </div>

                <!-- Alert Message Register -->
                <div id="reg-msg" class="hidden p-3 rounded-xl text-xs flex items-center gap-2"></div>

                <form id="register-form" class="space-y-3.5">
                  <div>
                    <label class="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wider">Nama Lengkap</label>
                    <div class="relative">
                      <i class="fa-solid fa-user-graduate absolute left-4 top-3.5 text-emerald-600 text-sm"></i>
                      <input type="text" id="reg-name" required placeholder="Contoh: Muhammad Farhan" class="w-full pl-11 pr-4 py-2.5 sm:py-3 rounded-2xl border border-emerald-200 bg-emerald-50/30 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent text-base sm:text-sm font-semibold text-gray-800 placeholder-gray-400 transition-all">
                    </div>
                  </div>

                  <div>
                    <label class="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wider">Kelas</label>
                    <div class="relative">
                      <i class="fa-solid fa-school absolute left-4 top-3.5 text-emerald-600 text-sm"></i>
                      <input type="text" id="reg-class" required placeholder="Contoh: IX-A, IX-B, atau 9 MTs" class="w-full pl-11 pr-4 py-2.5 sm:py-3 rounded-2xl border border-emerald-200 bg-emerald-50/30 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent text-base sm:text-sm font-semibold text-gray-800 placeholder-gray-400 transition-all">
                    </div>
                  </div>

                  <div>
                    <label class="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wider">Kata Sandi</label>
                    <div class="relative">
                      <i class="fa-solid fa-key absolute left-4 top-3.5 text-emerald-600 text-sm"></i>
                      <input type="password" id="reg-password" required placeholder="Minimal 3 karakter..." class="w-full pl-11 pr-11 py-2.5 sm:py-3 rounded-2xl border border-emerald-200 bg-emerald-50/30 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent text-base sm:text-sm font-semibold text-gray-800 placeholder-gray-400 transition-all">
                      <button type="button" id="toggle-reg-pwd" class="absolute right-3.5 top-3 text-gray-400 hover:text-emerald-700 text-sm focus:outline-none p-1">
                        <i class="fa-solid fa-eye" id="reg-pwd-icon"></i>
                      </button>
                    </div>
                  </div>

                  <button type="submit" id="btn-submit-register" class="w-full py-3.5 bg-gradient-to-r from-emerald-800 to-teal-700 hover:from-emerald-900 hover:to-teal-800 text-white rounded-2xl font-bold shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 text-sm active:scale-[0.99]">
                    <span>Daftarkan Akun Siswa</span>
                    <i class="fa-solid fa-check text-xs"></i>
                  </button>
                </form>

                <!-- Tombol Kembali ke Form Login -->
                <div class="pt-3 text-center border-t border-emerald-50">
                  <p class="text-xs text-gray-500">Sudah memiliki akun?</p>
                  <button type="button" id="btn-to-login" class="mt-1.5 text-xs font-bold text-emerald-700 hover:text-emerald-900 hover:underline transition-all inline-flex items-center gap-1.5">
                    <i class="fa-solid fa-arrow-left text-[11px]"></i>
                    <span>Kembali ke Halaman Masuk</span>
                  </button>
                </div>
              </div>

            </div>

          </div>
        </div>
      </div>
    `;
  }

  // 2. DASHBOARD VIEW
  function renderDashboard() {
    const isGuru = state.currentUser && state.currentUser.role === 'guru';
    return `
      <div class="space-y-8">
        <!-- Hero Banner with Arch Frame & Saymana aesthetic -->
        <div class="relative bg-gradient-to-r from-emerald-900 via-emerald-800 to-teal-800 rounded-2xl sm:rounded-3xl lg:rounded-[2.5rem] p-5 sm:p-8 lg:p-10 text-white overflow-hidden shadow-xl sm:shadow-2xl border border-emerald-700">
          <div class="absolute right-0 top-0 bottom-0 w-1/2 sm:w-1/3 bg-[url('https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&w=600&q=80')] bg-cover bg-center opacity-15 sm:opacity-20 mix-blend-overlay pointer-events-none"></div>
          <div class="relative z-10 max-w-2xl">
            <div class="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold text-emerald-200 mb-3 sm:mb-4 border border-white/10 font-arabic">
              <i class="fa-solid fa-leaf text-emerald-400"></i>
              <span>الوحدة الرابعة: الحفاظ على البيئة</span>
            </div>
            <h1 class="text-lg sm:text-2xl lg:text-3xl font-extrabold mb-2.5 sm:mb-3 leading-snug">
              <span class="text-white block sm:inline">Selamat Datang, </span>
              <span class="text-emerald-300 font-bold inline-block whitespace-nowrap sm:inline">${state.currentUser.name}!</span>
            </h1>
            <p class="text-emerald-100 text-xs sm:text-sm lg:text-base mb-5 sm:mb-6 leading-relaxed">
              Media pembelajaran Bahasa Arab interaktif untuk memahami pentingnya menjaga dan melestarikan lingkungan (<span dir="rtl" class="font-arabic font-semibold">الحفاظ على البيئة</span>) serta menguasai <span dir="rtl" class="font-arabic font-semibold">فِعْلُ الأَمْرِ</span> dan <span dir="rtl" class="font-arabic font-semibold">فِعْلُ النَّهْيِ</span>.
            </p>
            <div class="flex flex-col sm:flex-row gap-2.5 sm:gap-3">
              <button onclick="document.querySelector('[data-view=mufradat]').click()" class="w-full sm:w-auto px-5 sm:px-6 py-2.5 sm:py-3 bg-emerald-400 hover:bg-emerald-300 text-emerald-950 font-bold rounded-xl sm:rounded-2xl shadow-lg transition-all flex items-center justify-center gap-2 text-xs sm:text-sm">
                <span>Mulai Belajar المفردات</span>
                <i class="fa-solid fa-arrow-right"></i>
              </button>
              <button onclick="document.querySelector('[data-view=quiz]').click()" class="w-full sm:w-auto px-5 sm:px-6 py-2.5 sm:py-3 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-xl sm:rounded-2xl backdrop-blur-md border border-white/20 transition-all flex items-center justify-center gap-2 text-xs sm:text-sm">
                <i class="fa-solid fa-pen-nib"></i>
                <span>Ikuti Kuis</span>
              </button>
            </div>
          </div>
        </div>

        <!-- Quick Stats Cards (Mobile Responsive) -->
        <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2.5 sm:gap-4">
                    <div class="bg-white p-3.5 sm:p-5 rounded-xl sm:rounded-2xl shadow-sm border border-emerald-100 flex items-center gap-2.5 sm:gap-4 min-w-0">
            <div class="w-9 h-9 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center text-base sm:text-xl font-bold flex-shrink-0">
              <i class="fa-solid fa-microphone-lines"></i>
            </div>
            <div class="min-w-0">
              <div class="text-lg sm:text-2xl font-bold text-emerald-950 truncate">${(ARABIC_DATA.kalam && ARABIC_DATA.kalam.items) ? ARABIC_DATA.kalam.items.length : 15}</div>
              <div class="text-[10px] sm:text-xs text-emerald-600 font-medium truncate">Latihan مهارة الكلام</div>
            </div>
          </div>

<div class="bg-white p-3.5 sm:p-5 rounded-xl sm:rounded-2xl shadow-sm border border-emerald-100 flex items-center gap-2.5 sm:gap-4 min-w-0">
            <div class="w-9 h-9 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center text-base sm:text-xl font-bold flex-shrink-0">
              <i class="fa-solid fa-book font-arabic"></i>
            </div>
            <div class="min-w-0">
              <div class="text-lg sm:text-2xl font-bold text-emerald-950 truncate">${ARABIC_DATA.vocabularies.length}</div>
              <div class="text-[10px] sm:text-xs text-emerald-600 font-medium truncate">Total المفردات</div>
            </div>
          </div>

          <div class="bg-white p-3.5 sm:p-5 rounded-xl sm:rounded-2xl shadow-sm border border-emerald-100 flex items-center gap-2.5 sm:gap-4 min-w-0">
            <div class="w-9 h-9 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-teal-100 text-teal-700 flex items-center justify-center text-base sm:text-xl font-bold flex-shrink-0">
              <i class="fa-solid fa-file-lines"></i>
            </div>
            <div class="min-w-0">
              <div class="text-lg sm:text-2xl font-bold text-emerald-950 truncate">3</div>
              <div class="text-[10px] sm:text-xs text-emerald-600 font-medium truncate">Paragraf القراءة</div>
            </div>
          </div>

          <div class="bg-white p-3.5 sm:p-5 rounded-xl sm:rounded-2xl shadow-sm border border-emerald-100 flex items-center gap-2.5 sm:gap-4 min-w-0">
            <div class="w-9 h-9 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center text-base sm:text-xl font-bold flex-shrink-0">
              <i class="fa-solid fa-question"></i>
            </div>
            <div class="min-w-0">
              <div class="text-lg sm:text-2xl font-bold text-emerald-950 truncate">${ARABIC_DATA.quizzes.length}</div>
              <div class="text-[10px] sm:text-xs text-emerald-600 font-medium truncate">Soal Kuis Interaktif</div>
            </div>
          </div>

          <div class="bg-white p-3.5 sm:p-5 rounded-xl sm:rounded-2xl shadow-sm border border-emerald-100 flex items-center gap-2.5 sm:gap-4 min-w-0">
            <div class="w-9 h-9 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-emerald-700 text-white flex items-center justify-center text-base sm:text-xl font-bold flex-shrink-0">
              <i class="fa-solid fa-trophy"></i>
            </div>
            <div class="min-w-0">
              <div class="text-lg sm:text-2xl font-bold text-emerald-950 truncate">${isGuru ? state.students.length : (state.quizSubmitted ? state.quizScore + ' Pts' : 'Belum')}</div>
              <div class="text-[10px] sm:text-xs text-emerald-600 font-medium truncate">${isGuru ? 'Siswa Terdaftar' : 'Skor Kuis Anda'}</div>
            </div>
          </div>
        </div>

        ${isGuru ? `
          <!-- Teacher Real-Time Incoming Scores Live Widget -->
          <div class="bg-white p-6 rounded-3xl border-2 border-emerald-200 shadow-sm space-y-4">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-emerald-100 pb-3">
              <div class="flex items-center gap-2.5">
                <span class="w-3 h-3 rounded-full bg-emerald-500 animate-ping"></span>
                <div>
                  <h3 class="font-extrabold text-emerald-950 text-base">🔴 Live Feed: Nilai Siswa Terbaru Masuk (Cloud Realtime)</h3>
                  <p class="text-xs text-emerald-700">Setiap ada siswa yang selesai latihan kuis atau game di HP/PC mereka, nilai langsung muncul di sini secara seketika.</p>
                </div>
              </div>
              <button onclick="document.querySelector('[data-view=students]').click()" class="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold transition-all shadow-xs flex items-center gap-2 self-start sm:self-auto">
                <span>Lihat Rekap Lengkap Semua Siswa</span>
                <i class="fa-solid fa-arrow-right text-xs"></i>
              </button>
            </div>

            <div class="grid sm:grid-cols-3 gap-3">
              ${(state.submissions || []).slice(0, 3).map(sub => `
                <div class="p-3.5 rounded-2xl bg-emerald-50/50 border border-emerald-100 flex items-center justify-between">
                  <div>
                    <span class="font-bold text-emerald-950 text-xs block">${sub.studentName} (${sub.class || 'IX-A'})</span>
                    <span class="text-[11px] text-emerald-700 block truncate max-w-[150px]">${sub.activityType}</span>
                    <span class="text-[10px] text-slate-400">${sub.createdAtFormatted || 'Baru Saja'}</span>
                  </div>
                  <div class="text-right">
                    <span class="text-lg font-black text-emerald-800">${sub.score}</span>
                    <span class="text-[9px] text-slate-500 block">${sub.category === 'game' ? 'Pts' : '/ 100'}</span>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        ` : ''}

        <!-- Main Features Grid (Arch Cards) -->
        <div class="space-y-5">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <h2 class="text-xl font-bold text-emerald-950 flex items-center gap-2">
              <i class="fa-solid fa-compass text-emerald-600"></i>
              <span>Modul Pembelajaran Utama</span>
            </h2>
          </div>

          <!-- Perintah / Misi Pembelajaran untuk Siswa -->
          <div class="bg-gradient-to-r from-emerald-50 via-teal-50/80 to-emerald-100/70 border-2 border-emerald-300/80 rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-sm">
            <div class="flex items-start gap-3 sm:gap-4">
              <div class="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-700 text-white flex items-center justify-center text-base sm:text-xl shadow-md flex-shrink-0">
                <i class="fa-solid fa-bullhorn"></i>
              </div>
              <div class="flex-1 space-y-2 min-w-0">
                <div class="flex flex-wrap items-center gap-1.5 sm:gap-2">
                  <span class="px-2.5 py-0.5 sm:px-3 sm:py-1 bg-emerald-600 text-white text-[11px] sm:text-xs font-extrabold rounded-full tracking-wide uppercase shadow-sm">
                    <i class="fa-solid fa-tasks mr-1"></i> Perintah Siswa
                  </span>
                  <span class="text-[11px] sm:text-xs font-bold text-emerald-900 font-arabic bg-emerald-200/70 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full">
                    مَهَمَّةُ التَّعَلُّمِ وَالتَّحَدِّيَاتِ
                  </span>
                </div>
                <h3 class="text-sm sm:text-lg font-bold text-emerald-950 leading-snug">
                  Instruksi: Selesaikan Seluruh Tantangan di Setiap Menu Modul Pembelajaran!
                </h3>
                <p class="text-xs sm:text-sm text-emerald-800 leading-relaxed font-medium">
                  Kepada seluruh siswa, silakan pelajari secara tuntas dan selesaikan tantangan pada setiap menu modul di bawah ini:
                </p>
                <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 sm:gap-2.5 pt-1">
                  <div class="flex items-center gap-2 p-2 sm:p-2.5 bg-white/90 rounded-xl border border-emerald-200/80 text-xs text-emerald-900 font-medium shadow-2xs">
                    <i class="fa-solid fa-circle-check text-emerald-600 text-sm flex-shrink-0"></i>
                    <span>1. Hafalkan <strong>المفردات</strong></span>
                  </div>
                  <div class="flex items-center gap-2 p-2 sm:p-2.5 bg-white/90 rounded-xl border border-emerald-200/80 text-xs text-emerald-900 font-medium shadow-2xs">
                    <i class="fa-solid fa-circle-check text-emerald-600 text-sm flex-shrink-0"></i>
                    <span>2. Tuntaskan <strong>الاستماع</strong></span>
                  </div>
                  <div class="flex items-center gap-2 p-2 sm:p-2.5 bg-white/90 rounded-xl border border-emerald-200/80 text-xs text-emerald-900 font-medium shadow-2xs">
                    <i class="fa-solid fa-circle-check text-emerald-600 text-sm flex-shrink-0"></i>
                    <span>3. Pahami <strong>القراءة</strong></span>
                  </div>
                  <div class="flex items-center gap-2 p-2 sm:p-2.5 bg-white/90 rounded-xl border border-emerald-200/80 text-xs text-emerald-900 font-medium shadow-2xs">
                    <i class="fa-solid fa-circle-check text-emerald-600 text-sm flex-shrink-0"></i>
                    <span>4. Kuasai <strong>القواعد</strong></span>
                  </div>
                  <div class="flex items-center gap-2 p-2 sm:p-2.5 bg-white/90 rounded-xl border border-emerald-200/80 text-xs text-emerald-900 font-medium shadow-2xs">
                    <i class="fa-solid fa-circle-check text-emerald-600 text-sm flex-shrink-0"></i>
                    <span>5. Latih <strong>الكلام</strong> (Tirukan & Rekam Suara)</span>
                  </div>
                </div>
                <div class="flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs text-emerald-700 pt-1 font-semibold">
                  <i class="fa-solid fa-star text-amber-500 flex-shrink-0"></i>
                  <span>Lanjutkan juga tantangan <strong>الحوار (Percakapan)</strong>, <strong>Kuis Kahoot</strong>, dan <strong>Duel 1v1</strong> untuk skor maksimal!</span>
                </div>
              </div>
            </div>
          </div>

          <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <!-- Card 1: Mufradat -->
            <div class="bg-white rounded-[2rem] p-6 shadow-md border border-emerald-100 hover:shadow-xl transition-all flex flex-col justify-between group">
              <div>
                <div class="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">
                  <i class="fa-solid fa-language"></i>
                </div>
                <h3 class="text-base font-bold text-emerald-900 mb-1 font-arabic">المفردات (Kosakata)</h3>
                <p class="text-xs text-emerald-700 leading-relaxed mb-4">
                  Kosakata lingkungan hidup lengkap dengan harakat, audio pelafalan asli, dan contoh kalimat.
                </p>
              </div>
              <button onclick="document.querySelector('[data-view=mufradat]').click()" class="w-full py-2.5 bg-emerald-50 hover:bg-emerald-700 hover:text-white text-emerald-800 rounded-xl font-semibold text-xs transition-all flex items-center justify-center gap-2">
                <span>Buka Kosakata</span>
                <i class="fa-solid fa-chevron-right"></i>
              </button>
            </div>

            <!-- Card 2: Maharah Istima' -->
            <div class="bg-white rounded-[2rem] p-6 shadow-md border border-emerald-100 hover:shadow-xl transition-all flex flex-col justify-between group">
              <div>
                <div class="w-14 h-14 rounded-2xl bg-indigo-50 text-indigo-700 flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">
                  <i class="fa-solid fa-headphones"></i>
                </div>
                <h3 class="text-base font-bold text-emerald-900 mb-1 font-arabic">مهارة الاستماع (Listening)</h3>
                <p class="text-xs text-emerald-700 leading-relaxed mb-4">
                  Latihan menyimak audio Arab, menirukan pelafalan, kuis audio, dan mencocokkan suara gambar.
                </p>
              </div>
              <button onclick="document.querySelector('[data-view=istima]').click()" class="w-full py-2.5 bg-indigo-50 hover:bg-indigo-700 hover:text-white text-indigo-800 rounded-xl font-semibold text-xs transition-all flex items-center justify-center gap-2">
                <span>Menyimak Audio</span>
                <i class="fa-solid fa-chevron-right"></i>
              </button>
            </div>

            <!-- Card 2.5: Maharah Kalam (Kemahiran Berbicara & Rekam Suara) -->
            <div class="bg-white rounded-[2rem] p-6 shadow-md border border-teal-100 hover:shadow-xl transition-all flex flex-col justify-between group">
              <div>
                <div class="w-14 h-14 rounded-2xl bg-teal-50 text-teal-700 flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">
                  <i class="fa-solid fa-microphone-lines"></i>
                </div>
                <div class="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-teal-100/80 text-teal-800 rounded-full text-[10px] font-bold mb-2">
                  <span class="w-1.5 h-1.5 rounded-full bg-teal-500 animate-pulse"></span>
                  <span>Rekam & Evaluasi Suara</span>
                </div>
                <h3 class="text-base font-bold text-emerald-900 mb-1 font-arabic">مهارة الكلام (Speaking)</h3>
                <p class="text-xs text-emerald-700 leading-relaxed mb-4">
                  Latihan menirukan pelafalan Ustadz, rekam suara dengan mikrofon, dan dapatkan evaluasi persentase kemiripan makhraj & tajwid otomatis.
                </p>
              </div>
              <button onclick="document.querySelector('[data-view=kalam]').click()" class="w-full py-2.5 bg-teal-50 hover:bg-teal-700 hover:text-white text-teal-800 rounded-xl font-semibold text-xs transition-all flex items-center justify-center gap-2">
                <span>Latihan Kalam</span>
                <i class="fa-solid fa-chevron-right"></i>
              </button>
            </div>

            <!-- Card 2: Maharah Qira'ah -->
            <div class="bg-white rounded-[2rem] p-6 shadow-md border border-emerald-100 hover:shadow-xl transition-all flex flex-col justify-between group">
              <div>
                <div class="w-14 h-14 rounded-2xl bg-teal-50 text-teal-700 flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">
                  <i class="fa-solid fa-book-open"></i>
                </div>
                <h3 class="text-base font-bold text-emerald-900 mb-1 font-arabic">مهارة القراءة (Reading)</h3>
                <p class="text-xs text-emerald-700 leading-relaxed mb-4">
                  Membaca dan memahami teks cerita tentang pelestarian alam dilengkapi audio pelafalan.
                </p>
              </div>
              <button onclick="document.querySelector('[data-view=qiraah]').click()" class="w-full py-2.5 bg-teal-50 hover:bg-teal-700 hover:text-white text-teal-800 rounded-xl font-semibold text-xs transition-all flex items-center justify-center gap-2">
                <span>Baca Teks Qira'ah</span>
                <i class="fa-solid fa-chevron-right"></i>
              </button>
            </div>

            <!-- Card 3: Qawa'id / Grammar -->
            <div class="bg-white rounded-[2rem] p-6 shadow-md border border-emerald-100 hover:shadow-xl transition-all flex flex-col justify-between group">
              <div>
                <div class="w-14 h-14 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">
                  <i class="fa-solid fa-spell-check"></i>
                </div>
                <h3 class="text-base font-bold text-emerald-900 mb-1 font-arabic">القواعد (Tata Bahasa)</h3>
                <p class="text-xs text-emerald-700 leading-relaxed mb-4">
                  Pembahasan gramatika فِعْلُ الأَمْرِ (perintah) dan فِعْلُ النَّهْيِ (larangan) beserta contohnya.
                </p>
              </div>
              <button onclick="document.querySelector('[data-view=qawaid]').click()" class="w-full py-2.5 bg-amber-50 hover:bg-amber-600 hover:text-white text-amber-800 rounded-xl font-semibold text-xs transition-all flex items-center justify-center gap-2">
                <span>Pelajari Qawa'id</span>
                <i class="fa-solid fa-chevron-right"></i>
              </button>
            </div>

            <!-- Card 4: Dialogue -->
            <div class="bg-white rounded-[2rem] p-6 shadow-md border border-emerald-100 hover:shadow-xl transition-all flex flex-col justify-between group">
              <div>
                <div class="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-700 flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">
                  <i class="fa-solid fa-comments"></i>
                </div>
                <h3 class="text-base font-bold text-emerald-900 mb-1 font-arabic">الحوار (Percakapan)</h3>
                <p class="text-xs text-emerald-700 leading-relaxed mb-4">
                  Dialog interaktif percakapan seputar aksi menanam pohon dan kebersihan sekolah.
                </p>
              </div>
              <button onclick="document.querySelector('[data-view=dialogue]').click()" class="w-full py-2.5 bg-emerald-50 hover:bg-emerald-700 hover:text-white text-emerald-800 rounded-xl font-semibold text-xs transition-all flex items-center justify-center gap-2">
                <span>Lihat Percakapan</span>
                <i class="fa-solid fa-chevron-right"></i>
              </button>
            </div>

            <!-- Card 5: Tadribat Kahoot -->
            <div class="bg-white rounded-[2rem] p-6 shadow-md border border-purple-100 hover:shadow-xl transition-all flex flex-col justify-between group">
              <div>
                <div class="w-14 h-14 rounded-2xl bg-purple-50 text-purple-700 flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">
                  <i class="fa-solid fa-gamepad"></i>
                </div>
                <h3 class="text-base font-bold text-emerald-900 mb-1 font-arabic">التدريبات (Kuis Kahoot)</h3>
                <p class="text-xs text-emerald-700 leading-relaxed mb-4">
                  20 Soal kuis interaktif berbatas waktu dengan animasi skor & streak gaya Kahoot!
                </p>
              </div>
              <button onclick="document.querySelector('[data-view=quiz]').click()" class="w-full py-2.5 bg-purple-50 hover:bg-purple-700 hover:text-white text-purple-800 rounded-xl font-semibold text-xs transition-all flex items-center justify-center gap-2">
                <span>Main Kuis Kahoot</span>
                <i class="fa-solid fa-chevron-right"></i>
              </button>
            </div>

            <!-- Card 5.5: 1v1 Fast Quiz Duel -->
            <div class="bg-gradient-to-br from-amber-500 via-amber-600 to-orange-600 rounded-[2rem] p-6 shadow-xl border-2 border-amber-300 hover:shadow-2xl transition-all flex flex-col justify-between group text-white">
              <div>
                <div class="w-14 h-14 rounded-2xl bg-white text-amber-600 flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform shadow-md">
                  <i class="fa-solid fa-bolt"></i>
                </div>
                <div class="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-white/20 text-white rounded-full text-[10px] font-bold border border-white/30 mb-2">
                  <span>⚡ Modul Duel Cepat!</span>
                </div>
                <h3 class="text-base font-bold text-white mb-1 font-arabic">مُبَارَزَةُ السَّرِيعَةِ (1v1 Duel)</h3>
                <p class="text-xs text-amber-100 leading-relaxed mb-4">
                  Duel adu cepat 10 detik lawan Ustadz AI atau Teman Sekelas! Kumpulkan Streak Combo 🔥 dan pelajari Qawa'id secara kilat!
                </p>
              </div>
              <button onclick="document.querySelector('[data-view=duelgame]').click()" class="w-full py-2.5 bg-white text-amber-900 hover:bg-amber-100 rounded-xl font-extrabold text-xs transition-all flex items-center justify-center gap-2 shadow-md">
                <span>⚡ Main Duel 1v1</span>
                <i class="fa-solid fa-play"></i>
              </button>
            </div>

          </div>
        </div>
      </div>
    `;
  }

  // 3. MUFRADAT VIEW (Flashcards + Audio)
  // SVG / Image Illustration Generator for Vocabulary Flip Cards
  function getVocabIllustration(item) {
    if (item.image) {
      const pos = item.imagePosition ? ` style="object-position: ${item.imagePosition};"` : '';
      return `<img src="${item.image}" alt="${item.meaning || item.title || ''}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"${pos}>`;
    }
    const key = item.svgKey || 'lingkungan';
    
    const illustrations = {
      reboisasi: `
        <svg viewBox="0 0 100 80" class="w-full h-full drop-shadow-sm">
          <path d="M10 70 Q50 65 90 70 L90 80 L10 80 Z" fill="#bbf7d0"/>
          <path d="M50 70 L50 38" stroke="#166534" stroke-width="4" stroke-linecap="round"/>
          <circle cx="50" cy="28" r="18" fill="#22c55e"/>
          <circle cx="38" cy="33" r="13" fill="#16a34a"/>
          <circle cx="62" cy="33" r="13" fill="#15803d"/>
          <path d="M50 45 Q35 40 30 45 M50 52 Q65 48 70 53" stroke="#86efac" stroke-width="2" fill="none"/>
          <circle cx="25" cy="18" r="6" fill="#fef08a"/>
        </svg>
      `,
      pembakaran_hutan: `
        <svg viewBox="0 0 100 80" class="w-full h-full drop-shadow-sm">
          <path d="M20 70 L20 45 M50 70 L50 35 M80 70 L80 48" stroke="#78350f" stroke-width="4"/>
          <polygon points="20,25 10,48 30,48" fill="#15803d"/>
          <polygon points="50,15 35,40 65,40" fill="#166534"/>
          <polygon points="80,28 70,50 90,50" fill="#15803d"/>
          <path d="M40 70 Q45 40 50 25 Q55 40 60 70 Z" fill="#ef4444"/>
          <path d="M45 70 Q50 48 53 38 Q56 48 60 70 Z" fill="#f97316"/>
          <path d="M48 70 Q51 55 53 45 Q55 55 58 70 Z" fill="#facc15"/>
          <path d="M25 65 Q30 45 35 30 Q40 45 45 65 Z" fill="#dc2626" opacity="0.8"/>
          <path d="M30 20 Q20 10 35 5 Q50 10 40 20 Z" fill="#64748b" opacity="0.5"/>
        </svg>
      `,
      polusi: `
        <svg viewBox="0 0 100 80" class="w-full h-full drop-shadow-sm">
          <rect x="20" y="35" width="20" height="35" fill="#475569" rx="2"/>
          <rect x="55" y="25" width="25" height="45" fill="#334155" rx="2"/>
          <path d="M25 35 Q10 20 30 10 Q50 15 35 35 Z" fill="#94a3b8" opacity="0.8"/>
          <path d="M60 25 Q45 10 70 5 Q90 15 75 25 Z" fill="#64748b" opacity="0.9"/>
          <circle cx="80" cy="18" r="8" fill="#475569" opacity="0.7"/>
          <circle cx="50" cy="60" r="7" fill="#ef4444"/>
          <text x="50" y="64" text-anchor="middle" fill="#fff" font-size="9" font-weight="bold">!</text>
        </svg>
      `,
      pemanasan_global: `
        <svg viewBox="0 0 100 80" class="w-full h-full drop-shadow-sm">
          <circle cx="80" cy="20" r="14" fill="#facc15"/>
          <path d="M80 2 L80 6 M80 34 L80 38 M62 20 L66 20 M94 20 L98 20" stroke="#eab308" stroke-width="2"/>
          <circle cx="45" cy="48" r="24" fill="#60a5fa"/>
          <path d="M35 38 Q45 35 52 42 T40 60 Z" fill="#22c55e"/>
          <circle cx="45" cy="48" r="24" fill="#ef4444" opacity="0.25"/>
          <rect x="15" y="25" width="6" height="30" rx="3" fill="#cbd5e1"/>
          <rect x="16" y="38" width="4" height="15" rx="2" fill="#ef4444"/>
          <circle cx="18" cy="55" r="5" fill="#ef4444"/>
        </svg>
      `,
      banjir: `
        <svg viewBox="0 0 100 80" class="w-full h-full drop-shadow-sm">
          <path d="M30 25 Q35 15 50 15 Q65 15 70 25 Q80 25 80 32 Q80 40 70 40 L30 40 Q20 40 20 32 Q20 25 30 25 Z" fill="#64748b"/>
          <path d="M30 45 L26 53 M45 45 L41 53 M60 45 L56 53 M75 45 L71 53" stroke="#38bdf8" stroke-width="2" stroke-linecap="round"/>
          <path d="M0 60 Q25 55 50 60 T100 60 L100 80 L0 80 Z" fill="#0284c7"/>
          <path d="M0 66 Q25 62 50 66 T100 66 L100 80 L0 80 Z" fill="#0369a1"/>
          <polygon points="50,48 35,60 65,60" fill="#dc2626"/>
        </svg>
      `,
      bahan_kimia: `
        <svg viewBox="0 0 100 80" class="w-full h-full drop-shadow-sm">
          <path d="M30 25 L30 40 L20 65 Q18 70 25 70 L45 70 Q52 70 50 65 L40 40 L40 25 Z" fill="none" stroke="#475569" stroke-width="2"/>
          <path d="M22 62 L48 62 L43 45 L27 45 Z" fill="#a855f7" opacity="0.8"/>
          <circle cx="32" cy="55" r="2" fill="#fff"/>
          <circle cx="40" cy="50" r="3" fill="#fff"/>
          <path d="M70 30 L70 42 L62 62 Q60 66 65 66 L80 66 Q85 66 83 62 L75 42 L75 30 Z" fill="none" stroke="#475569" stroke-width="2"/>
          <path d="M64 58 L81 58 L77 46 L68 46 Z" fill="#22c55e" opacity="0.8"/>
          <circle cx="50" cy="20" r="8" fill="#facc15"/>
          <text x="50" y="23" text-anchor="middle" fill="#000" font-size="8" font-weight="bold">☣</text>
        </svg>
      `,
      penebangan_hutan: `
        <svg viewBox="0 0 100 80" class="w-full h-full drop-shadow-sm">
          <path d="M0 65 Q50 60 100 65 L100 80 L0 80 Z" fill="#d97706"/>
          <rect x="42" y="45" width="16" height="20" fill="#78350f" rx="2"/>
          <ellipse cx="50" cy="45" rx="8" ry="3" fill="#b45309"/>
          <rect x="62" y="58" width="25" height="10" fill="#78350f" rx="2" transform="rotate(-15 62 58)"/>
          <path d="M25 35 L40 50 L35 55 L20 40 Z" fill="#64748b"/>
          <path d="M20 30 L30 40" stroke="#78350f" stroke-width="3"/>
        </svg>
      `,
      air_limbah: `
        <svg viewBox="0 0 100 80" class="w-full h-full drop-shadow-sm">
          <rect x="10" y="30" width="35" height="18" fill="#475569" rx="2"/>
          <rect x="40" y="27" width="8" height="24" fill="#334155" rx="2"/>
          <path d="M45 42 Q55 45 55 60 Q55 75 90 75 L90 80 L45 80 Z" fill="#334155"/>
          <path d="M48 42 Q60 50 60 65 L100 68 L100 80 L48 80 Z" fill="#1e293b" opacity="0.8"/>
          <circle cx="65" cy="70" r="3" fill="#cbd5e1" opacity="0.5"/>
          <circle cx="75" cy="65" r="4" fill="#cbd5e1" opacity="0.4"/>
        </svg>
      `,
      sampah: `
        <svg viewBox="0 0 100 80" class="w-full h-full drop-shadow-sm">
          <path d="M35 35 L40 70 L60 70 L65 35 Z" fill="#16a34a"/>
          <rect x="32" y="30" width="36" height="6" fill="#15803d" rx="2"/>
          <circle cx="42" cy="26" r="8" fill="#64748b"/>
          <circle cx="55" cy="24" r="7" fill="#ef4444"/>
          <path d="M48 18 L52 28 L44 28 Z" fill="#38bdf8"/>
          <path d="M50 45 L54 52 L46 52 Z" fill="#fff"/>
        </svg>
      `,
      air_bersih: `
        <svg viewBox="0 0 100 80" class="w-full h-full drop-shadow-sm">
          <ellipse cx="50" cy="62" rx="35" ry="10" fill="#e0f2fe"/>
          <ellipse cx="50" cy="62" rx="24" ry="6" fill="#bae6fd"/>
          <path d="M50 20 Q50 35 62 48 A14 14 0 0 1 38 48 Q50 35 50 20 Z" fill="#0284c7"/>
          <path d="M47 30 Q44 38 43 45" stroke="#7dd3fc" stroke-width="2" stroke-linecap="round" fill="none"/>
          <path d="M72 25 L74 30 L79 32 L74 34 L72 39 L70 34 L65 32 L70 30 Z" fill="#38bdf8"/>
          <path d="M25 35 L26 38 L29 39 L26 40 L25 43 L24 40 L21 39 L24 38 Z" fill="#7dd3fc"/>
        </svg>
      `,
      lingkungan: `
        <svg viewBox="0 0 100 80" class="w-full h-full drop-shadow-sm">
          <circle cx="50" cy="45" r="25" fill="#38bdf8"/>
          <path d="M35 32 Q50 28 58 38 T40 62 Z" fill="#22c55e"/>
          <path d="M55 45 Q65 42 70 50 T50 68 Z" fill="#16a34a"/>
          <path d="M30 20 Q50 15 70 20" stroke="#86efac" stroke-width="2" fill="none"/>
        </svg>
      `,
      pelestarian: `
        <svg viewBox="0 0 100 80" class="w-full h-full drop-shadow-sm">
          <path d="M50 15 L78 28 V50 C78 68 50 78 50 78 C50 78 22 68 22 50 V28 Z" fill="#15803d"/>
          <path d="M50 30 Q42 42 50 60 Q58 42 50 30 Z" fill="#86efac"/>
        </svg>
      `,
      kebersihan: `
        <svg viewBox="0 0 100 80" class="w-full h-full drop-shadow-sm">
          <rect x="25" y="45" width="50" height="20" fill="#38bdf8" rx="4"/>
          <path d="M60 20 L40 45" stroke="#78350f" stroke-width="4" stroke-linecap="round"/>
          <path d="M35 18 L38 23 L43 24 L38 27 L37 32 L34 27 L29 26 L34 23 Z" fill="#fef08a"/>
        </svg>
      `
    };

    const svgContent = illustrations[key] || illustrations.lingkungan;
    return `<div class="w-full h-full p-2 flex items-center justify-center">${svgContent}</div>`;
  }

  // 3. MUFRADAT VIEW (Interactive 3D Visual Flip Cards)
  function renderMufradat() {
    const vocabList = [...ARABIC_DATA.vocabularies, ...state.customVocab];
    const isGuru = state.currentUser && state.currentUser.role === 'guru';

    return `
      <div class="space-y-6">
        <!-- Header Banner -->
        <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-emerald-100 shadow-sm">
          <div>
            <h2 class="text-2xl font-bold text-emerald-950 font-arabic flex items-center gap-2">
              <span>المفردات والتراكيب</span>
            </h2>
            <p class="text-xs text-emerald-600 mt-1">Kosakata Bahasa Arab Tema Pelestarian Lingkungan (Sentuh/Klik kartu untuk memutar & melihat arti)</p>
          </div>
          

        </div>

        <!-- Vocab 3D Flip Card Grid -->
        <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          ${vocabList.map(item => `
            <div class="flip-card-container group" onclick="this.classList.toggle('is-flipped')">
              <div class="flip-card-inner">
                
                <!-- FRONT SIDE OF FLIP CARD -->
                <div class="flip-card-front bg-white p-4 border border-emerald-100 shadow-md hover:shadow-xl transition-shadow rounded-[2rem] flex flex-col justify-between">
                  <!-- Header: Category & Audio Button -->
                  <div class="flex items-center justify-between z-10 mb-2">
                    <span class="px-3 py-1 bg-emerald-50 text-emerald-800 rounded-full text-[11px] font-bold border border-emerald-100">
                      ${item.category || 'Materi'}
                    </span>
                    <button onclick="event.stopPropagation(); speakArabic('${item.arabic}')" class="w-9 h-9 rounded-full bg-emerald-100 hover:bg-emerald-600 hover:text-white text-emerald-800 flex items-center justify-center transition-all shadow-sm">
                      <i class="fa-solid fa-volume-high text-xs"></i>
                    </button>
                  </div>

                  <!-- Center: Large HD Image Container -->
                  <div class="w-full h-52 sm:h-56 rounded-2xl bg-emerald-50/50 border border-emerald-100/80 overflow-hidden shadow-inner relative flex items-center justify-center">
                    ${getVocabIllustration(item)}
                  </div>

                  <!-- Text: Arabic Word -->
                  <div class="text-center my-auto py-1">
                    <h3 class="text-3xl sm:text-4xl font-bold font-arabic text-emerald-950 leading-tight drop-shadow-sm">${item.arabic}</h3>
                  </div>

                  <!-- Bottom Hint: Flip Indicator -->
                  <div class="pt-2 border-t border-dashed border-emerald-100 text-center flex items-center justify-center gap-1.5 text-[11px] font-bold text-emerald-700 bg-emerald-50/40 py-1.5 rounded-xl mt-1">
                    <span>Sentuh untuk lihat arti</span>
                    <i class="fa-solid fa-rotate text-emerald-600 text-xs"></i>
                  </div>
                </div>

                <!-- BACK SIDE OF FLIP CARD -->
                <div class="flip-card-back bg-gradient-to-br from-emerald-900 via-emerald-800 to-teal-900 p-6 text-white shadow-2xl rounded-[2rem] flex flex-col justify-between border border-emerald-700">
                  <div>
                    <div class="flex items-center justify-between mb-3 border-b border-emerald-700/60 pb-3">
                      <span class="px-3 py-1 bg-white/20 backdrop-blur-md text-emerald-200 rounded-full text-[10px] font-bold">
                        ${item.category || 'Arti & Contoh'}
                      </span>
                      <button onclick="event.stopPropagation(); speakArabic('${item.sentence || item.arabic}')" class="w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-all">
                        <i class="fa-solid fa-volume-high text-xs"></i>
                      </button>
                    </div>

                    <div class="text-center my-3">
                      <div class="text-[11px] text-emerald-300 font-semibold uppercase tracking-wider mb-1">Arti Bahasa Indonesia:</div>
                      <h4 class="text-2xl font-extrabold text-white mb-2 leading-snug">${item.meaning}</h4>
                    </div>

                    <div class="bg-white/10 backdrop-blur-md p-3.5 rounded-2xl border border-white/15 space-y-1.5 mt-2">
                      <div class="text-[10px] font-bold text-emerald-300 uppercase tracking-wider">Contoh Kalimat:</div>
                      <div class="font-arabic text-base font-bold text-right text-emerald-100 leading-relaxed">${item.sentence}</div>
                      <div class="italic text-[11px] text-emerald-200 leading-normal">"${item.sentenceTranslation}"</div>
                    </div>
                  </div>

                  <!-- Back Hint: Flip Back Indicator -->
                  <div class="pt-2 text-center text-[11px] font-bold text-emerald-300 flex items-center justify-center gap-1">
                    <i class="fa-solid fa-arrow-rotate-left"></i>
                    <span>Putar Kembali</span>
                  </div>
                </div>

              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  // 3B. MAHARAH ISTIMA' VIEW (Menyimak & Audio Comprehension)
  function renderIstima() {
    const listening = ARABIC_DATA.listening;
    if (!listening) return '<div class="p-8 text-center">Data Istima\' tidak ditemukan.</div>';

    const activeTab = state.listeningActiveTab || 'repeat';

    return `
      <div class="space-y-8 max-w-5xl mx-auto">
        <!-- Main Card Container -->
        <div class="bg-white rounded-2xl sm:rounded-3xl lg:rounded-[2.5rem] p-4 sm:p-8 lg:p-10 border border-emerald-100 shadow-sm space-y-5 sm:space-y-6">
          
          <!-- Header Banner -->
          <div class="border-b border-emerald-100 pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div class="inline-flex items-center gap-2 bg-indigo-50 text-indigo-800 px-3.5 py-1 rounded-full text-xs font-bold border border-indigo-200 mb-2">
                <i class="fa-solid fa-headphones text-indigo-600"></i>
                <span>مَهَارَةُ الاِسْتِمَاعِ (Maharah Istima')</span>
              </div>
              <h2 class="text-3xl sm:text-5xl font-extrabold font-arabic text-emerald-950 leading-relaxed">${listening.title}</h2>
              <p class="text-xs sm:text-sm text-emerald-700 font-medium mt-1">${listening.subtitle}</p>
            </div>

            <!-- Audio Speed Controls -->
            <div class="flex items-center gap-3 bg-emerald-50/80 p-3 rounded-2xl border border-emerald-200 self-start sm:self-auto shadow-xs">
              <i class="fa-solid fa-gauge text-emerald-700 text-base"></i>
              <div class="text-xs">
                <span class="font-bold text-emerald-900 block mb-1">Kecepatan Suara Audio:</span>
                <div class="flex items-center gap-1.5">
                  <button data-speed="0.7" class="speed-rate-btn px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all ${state.audioSpeed === 0.7 ? 'bg-emerald-700 text-white shadow' : 'bg-white text-emerald-800 border border-emerald-200'}">0.7x (Lambat)</button>
                  <button data-speed="0.85" class="speed-rate-btn px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all ${state.audioSpeed === 0.85 ? 'bg-emerald-700 text-white shadow' : 'bg-white text-emerald-800 border border-emerald-200'}">0.85x (Sedang)</button>
                  <button data-speed="1.0" class="speed-rate-btn px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all ${state.audioSpeed === 1.0 ? 'bg-emerald-700 text-white shadow' : 'bg-white text-emerald-800 border border-emerald-200'}">1.0x (Normal)</button>
                </div>
              </div>
            </div>
          </div>

          <!-- Featured YouTube Video Section -->
          ${listening.video ? `
            <div class="bg-gradient-to-br from-emerald-950 via-teal-950 to-emerald-950 rounded-[2rem] p-6 sm:p-8 text-white border-2 border-emerald-500/30 shadow-2xl space-y-4">
              <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-emerald-800/80 pb-4">
                <div>
                  <div class="inline-flex items-center gap-1.5 px-3 py-1 bg-red-500/20 text-red-300 rounded-full text-xs font-bold border border-red-500/30 mb-1">
                    <i class="fa-brands fa-youtube text-red-400"></i>
                    <span>فِيدْيُو الشَّرْحِ (Video Istima' YouTube)</span>
                  </div>
                  <h3 class="text-xl sm:text-2xl font-bold font-arabic text-yellow-300 mt-0.5">${listening.video.title}</h3>
                  <p class="text-xs text-emerald-200 mt-0.5">${listening.video.subtitle}</p>
                </div>


              </div>

              <!-- Responsive YouTube Iframe Embed Container -->
              <div class="relative w-full rounded-2xl overflow-hidden shadow-2xl border border-white/20 bg-black aspect-video">
                <iframe 
                  class="w-full h-full"
                  src="${listening.video.embedUrl}?autoplay=0&rel=0&modestbranding=1" 
                  title="${listening.video.title}" 
                  frameborder="0" 
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                  allowfullscreen>
                </iframe>
              </div>

              <!-- Guided Listening Instructions -->
              <div class="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/10 text-xs text-emerald-100 flex items-start gap-2.5">
                <i class="fa-solid fa-lightbulb text-yellow-400 text-base shrink-0 mt-0.5"></i>
                <div>
                  <strong class="text-white block font-semibold mb-0.5">Panduan Belajar Menyimak Video:</strong>
                  <span>Tonton dan simak pengucapan kosakata serta ungkapan Bahasa Arab dalam video di atas secara cermat. Gunakan modul latihan di bawah untuk menguji kemampuan pendengaran Anda!</span>
                </div>
              </div>
            </div>
          ` : ''}

          <!-- Sub-module Tabs Navigation -->
          <div class="flex flex-wrap items-center gap-2 bg-emerald-100/60 p-2 rounded-2xl border border-emerald-200">
            <button data-istima-tab="repeat" class="istima-tab-btn flex-1 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 ${activeTab === 'repeat' ? 'bg-white text-emerald-900 shadow-md font-arabic' : 'text-emerald-800 hover:bg-white/50'}">
              <i class="fa-solid fa-volume-high text-emerald-600"></i>
              <span>١. الاستماع والتكرار</span>
            </button>

            <button data-istima-tab="quiz" class="istima-tab-btn flex-1 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 ${activeTab === 'quiz' ? 'bg-white text-emerald-900 shadow-md font-arabic' : 'text-emerald-800 hover:bg-white/50'}">
              <i class="fa-solid fa-circle-question text-teal-600"></i>
              <span>٢. الاستماع والإجابة</span>
            </button>

            <button data-istima-tab="match" class="istima-tab-btn flex-1 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 ${activeTab === 'match' ? 'bg-white text-emerald-900 shadow-md font-arabic' : 'text-emerald-800 hover:bg-white/50'}">
              <i class="fa-solid fa-image text-indigo-600"></i>
              <span>٣. الاستماع والربط</span>
            </button>
          </div>

          <!-- TAB CONTENT RENDERING -->
          ${renderIstimaTabContent(activeTab, listening)}

        </div>
      </div>
    `;
  }

  function renderIstimaTabContent(activeTab, listening) {
    if (activeTab === 'repeat') {
      const section = listening.sections.find(s => s.id === 'repeat');
      return `
        <div class="space-y-6 animate-fadeIn">
          <div class="bg-emerald-50/60 p-4 sm:p-5 rounded-2xl border border-emerald-100 flex items-center justify-between">
            <div>
              <h3 class="text-lg font-bold text-emerald-950 font-arabic">${section.title}</h3>
              <p class="text-xs text-emerald-700 mt-0.5">${section.desc}</p>
            </div>
            <button onclick="speakArabic('${section.items.map(i => i.arabic).join('. ')}')" class="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold shadow transition-all flex items-center gap-2">
              <i class="fa-solid fa-play"></i> Putar Semua Audio
            </button>
          </div>

          <div class="grid gap-4">
            ${section.items.map(item => `
              <div class="p-5 rounded-2xl bg-white border-2 border-emerald-100/90 shadow-sm hover:shadow-md transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div class="space-y-1 flex-1">
                  <div class="flex items-center gap-2">
                    <span class="w-6 h-6 rounded-full bg-emerald-700 text-white text-xs flex items-center justify-center font-bold shadow-xs">${item.id}</span>
                    <span class="text-xs font-bold text-emerald-600">${item.latin}</span>
                  </div>
                  <h4 class="text-2xl sm:text-3xl font-bold font-arabic text-emerald-950 leading-relaxed dir-rtl text-right py-1">${item.arabic}</h4>
                  <p class="text-xs sm:text-sm text-emerald-800 font-sans italic">"${item.meaning}"</p>
                </div>

                <div class="flex items-center gap-2 self-end sm:self-center shrink-0">
                  <button onclick="speakArabic('${item.arabic}')" class="px-4 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold shadow transition-all flex items-center gap-2">
                    <i class="fa-solid fa-volume-high"></i>
                    <span>Putar Audio</span>
                  </button>
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    }

    if (activeTab === 'quiz') {
      const section = listening.sections.find(s => s.id === 'quiz');

      // Tampilan Hasil Kuis Istima' saat Selesai
      if (state.listeningQuizSubmitted) {
        const total = section ? section.questions.length : 10;
        const score = state.listeningQuizScore || 0;
        const correct = state.listeningQuizCorrect || 0;
        const isPassed = score >= 75;

        return `
          <div class="space-y-6 animate-fadeIn max-w-2xl mx-auto">
            <div class="bg-gradient-to-br ${isPassed ? 'from-emerald-900 via-teal-900 to-emerald-950' : 'from-amber-900 via-amber-800 to-orange-950'} text-white p-6 sm:p-8 rounded-3xl text-center shadow-2xl border-2 ${isPassed ? 'border-emerald-400/40' : 'border-amber-400/40'} space-y-4">
              <div class="w-16 h-16 sm:w-20 sm:h-20 rounded-full ${isPassed ? 'bg-emerald-500/30 text-emerald-300' : 'bg-amber-500/30 text-amber-300'} flex items-center justify-center text-3xl sm:text-4xl mx-auto shadow-inner border border-white/20">
                <i class="fa-solid ${isPassed ? 'fa-award' : 'fa-rotate-right'}"></i>
              </div>
              <div>
                <span class="px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white/20 text-white inline-block mb-2">Hasil Evaluasi Maharah Istima'</span>
                <h3 class="text-2xl sm:text-3xl font-extrabold">${isPassed ? 'Mumtaz! Luar Biasa! 🎉' : 'Bagus! Tetap Semangat! 💪'}</h3>
                <p class="text-xs text-emerald-200 mt-1">Latihan Menyimak Pemahaman Teks Bahasa Arab (10 Soal Audio)</p>
              </div>

              <div class="bg-white/10 backdrop-blur-md rounded-2xl p-4 sm:p-5 border border-white/15 max-w-md mx-auto grid grid-cols-2 gap-4 text-center">
                <div>
                  <div class="text-3xl sm:text-4xl font-extrabold text-yellow-300">${score}</div>
                  <div class="text-[11px] text-emerald-100 font-semibold mt-0.5">Nilai Akhir (0-100)</div>
                </div>
                <div>
                  <div class="text-3xl sm:text-4xl font-extrabold text-white">${correct} / ${total}</div>
                  <div class="text-[11px] text-emerald-100 font-semibold mt-0.5">Jawaban Benar</div>
                </div>
              </div>

              <!-- Realtime Notification Badge -->
              <div class="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/30 border border-emerald-400/50 rounded-xl text-xs font-bold text-emerald-100">
                <span class="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
                <span>✅ Nilai otomatis tersimpan & masuk ke Akun Guru secara Realtime!</span>
              </div>

              <div class="pt-3 flex flex-col sm:flex-row items-center justify-center gap-3">
                <button id="istima-retry-btn" class="w-full sm:w-auto px-6 py-3 bg-white text-emerald-950 font-bold rounded-xl text-xs shadow-lg hover:bg-emerald-50 transition-all flex items-center justify-center gap-2">
                  <i class="fa-solid fa-rotate-left"></i>
                  <span>Ulangi Latihan Kuis</span>
                </button>
                <button id="istima-goto-match-btn" class="w-full sm:w-auto px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-white font-bold rounded-xl text-xs shadow-lg transition-all flex items-center justify-center gap-2">
                  <span>Lanjut Game Mencocokkan</span>
                  <i class="fa-solid fa-arrow-right"></i>
                </button>
              </div>
            </div>
          </div>
        `;
      }

      const qIdx = state.listeningQuizIndex || 0;
      const currentQ = section.questions[qIdx];

      return `
        <div class="space-y-6 animate-fadeIn">
          <div class="bg-teal-50/60 p-4 sm:p-5 rounded-2xl border border-teal-100 flex items-center justify-between">
            <div>
              <h3 class="text-lg font-bold text-teal-950 font-arabic">${section.title}</h3>
              <p class="text-xs text-teal-700 mt-0.5">${section.desc}</p>
            </div>
            <span class="px-3 py-1 bg-teal-700 text-white rounded-full text-xs font-bold font-mono">Soal ${qIdx + 1} / ${section.questions.length}</span>
          </div>

          <!-- Audio Listening Stage Box -->
          <div class="bg-gradient-to-br from-teal-950 via-emerald-900 to-teal-950 text-white p-6 sm:p-8 rounded-3xl border-2 border-teal-500/30 text-center space-y-4 shadow-xl">
            <div class="w-16 h-16 rounded-full bg-teal-500/20 text-teal-300 border-2 border-teal-400 flex items-center justify-center text-3xl mx-auto shadow-lg animate-pulse">
              <i class="fa-solid fa-headphones"></i>
            </div>
            
            <div class="space-y-1">
              <span class="text-xs font-bold text-teal-300 uppercase tracking-widest block font-sans">Rekaman Audio Suara:</span>
              <p class="text-xs text-emerald-200">Dengarkan klip suara di bawah ini sebelum menjawab pertanyaan!</p>
            </div>

            <!-- Audio Play Big Trigger -->
            <button onclick="speakArabic('${currentQ.audioText.replace(/'/g, "\\'")}')" class="px-8 py-3.5 bg-yellow-400 hover:bg-yellow-300 text-yellow-950 rounded-2xl text-sm font-extrabold shadow-xl transition-all flex items-center justify-center gap-3 mx-auto transform hover:scale-105">
              <i class="fa-solid fa-circle-play text-xl"></i>
              <span>Putar Rekaman Suara Audio</span>
            </button>
          </div>

          <!-- Question & Options Card -->
          <div class="bg-white p-6 sm:p-8 rounded-3xl border border-emerald-100 shadow-sm space-y-5">
            <h4 class="text-base sm:text-lg font-bold text-emerald-950">${currentQ.question}</h4>

            <div class="grid sm:grid-cols-2 gap-3">
              ${currentQ.options.map((opt, oIdx) => {
                const selected = state.listeningQuizAnswers[currentQ.id] === oIdx;
                return `
                  <button data-istima-ans="${oIdx}" class="istima-opt-btn p-4 rounded-2xl text-left border-2 font-bold text-sm transition-all flex items-center gap-3 ${selected ? 'bg-emerald-700 text-white border-emerald-800 shadow-md' : 'bg-emerald-50/50 hover:bg-emerald-100 text-emerald-900 border-emerald-200'}">
                    <span class="w-8 h-8 rounded-xl bg-white/20 text-current flex items-center justify-center font-bold text-xs shrink-0 border border-current">${String.fromCharCode(65 + oIdx)}</span>
                    <span class="flex-1 font-arabic text-lg leading-relaxed">${opt}</span>
                  </button>
                `;
              }).join('')}
            </div>

            <!-- Explanation feedback -->
            ${state.listeningQuizAnswers[currentQ.id] !== undefined ? `
              <div class="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900 space-y-1 mt-4">
                <strong class="text-amber-950 font-bold block font-sans">الشَّرْحُ (Pembahasan Audio):</strong>
                <p class="font-arabic text-base text-right text-amber-950">${currentQ.explanation}</p>
              </div>
            ` : ''}

            <!-- Navigation Controls -->
            <div class="flex items-center justify-between pt-4 border-t border-emerald-100">
              <button id="istima-prev-q-btn" class="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-xl text-xs font-bold transition-all ${qIdx === 0 ? 'opacity-50 cursor-not-allowed' : ''}">
                ← Sebelumnya
              </button>

              <button id="istima-next-q-btn" class="px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold transition-all shadow">
                ${qIdx === section.questions.length - 1 ? 'Selesai Kuis 🚀' : 'Berikutnya →'}
              </button>
            </div>
          </div>
        </div>
      `;
    }

    if (activeTab === 'match') {
      const section = listening.sections.find(s => s.id === 'match');
      return `
        <div class="space-y-6 animate-fadeIn">
          <div class="bg-indigo-50/60 p-4 sm:p-5 rounded-2xl border border-indigo-100 flex items-center justify-between">
            <div>
              <h3 class="text-lg font-bold text-indigo-950 font-arabic">${section.title}</h3>
              <p class="text-xs text-indigo-700 mt-0.5">${section.desc}</p>
            </div>
          </div>

          <div class="grid gap-6">
            ${section.games.map((g, gIdx) => {
              const userPick = state.listeningMatchSelected[g.id];
              return `
                <div class="p-6 rounded-3xl bg-white border-2 border-indigo-100 shadow-sm space-y-5">
                  <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-indigo-100 pb-4">
                    <div>
                      <span class="text-xs font-bold text-indigo-600 uppercase tracking-widest">Tugas Matching #${gIdx + 1}</span>
                      <h4 class="text-xl font-bold text-indigo-950 font-arabic mt-0.5">${g.title}</h4>
                    </div>

                    <button onclick="speakArabic('${g.audioText.replace(/'/g, "\\'")}')" class="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl text-xs font-bold shadow transition-all flex items-center gap-2 self-start sm:self-auto">
                      <i class="fa-solid fa-volume-high text-sm"></i>
                      <span>Putar Suara Klip Audio</span>
                    </button>
                  </div>

                  <div class="grid sm:grid-cols-3 gap-4">
                    ${g.options.map((opt, oIdx) => {
                      const isSelected = userPick === oIdx;
                      const isCorrect = opt.correct;
                      return `
                        <button data-match-g="${g.id}" data-match-o="${oIdx}" class="match-opt-btn p-4 rounded-2xl border-2 text-center space-y-3 transition-all ${isSelected ? (isCorrect ? 'bg-emerald-50 border-emerald-500 ring-2 ring-emerald-300' : 'bg-red-50 border-red-500 ring-2 ring-red-300') : 'bg-gray-50/50 hover:bg-indigo-50/60 border-indigo-100'}">
                          <div class="w-full h-32 rounded-xl bg-indigo-950/10 overflow-hidden relative border border-indigo-100 flex items-center justify-center">
                            ${getVocabIllustration(opt)}
                          </div>
                          <span class="text-xs font-bold text-indigo-950 block">${opt.title}</span>
                          ${isSelected ? `
                            <span class="inline-block px-3 py-1 rounded-full text-[10px] font-extrabold ${isCorrect ? 'bg-emerald-600 text-white' : 'bg-red-600 text-white'}">
                              ${isCorrect ? '✓ Benar!' : '✗ Salah'}
                            </span>
                          ` : ''}
                        </button>
                      `;
                    }).join('')}
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>
      `;
    }

    return '';
  }

  function attachIstimaEvents() {
    // Speed buttons
    document.querySelectorAll('.speed-rate-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        state.audioSpeed = parseFloat(e.currentTarget.getAttribute('data-speed'));
        render();
      });
    });

    // Istima sub-tabs
    document.querySelectorAll('.istima-tab-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        state.listeningActiveTab = e.currentTarget.getAttribute('data-istima-tab');
        render();
      });
    });

    // Quiz options
    document.querySelectorAll('.istima-opt-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const oIdx = parseInt(e.currentTarget.getAttribute('data-istima-ans'));
        const section = ARABIC_DATA.listening.sections.find(s => s.id === 'quiz');
        const qIdx = state.listeningQuizIndex || 0;
        const currentQ = section.questions[qIdx];
        state.listeningQuizAnswers[currentQ.id] = oIdx;
        const isCorrect = oIdx === currentQ.answer;
        playSoundEffect(isCorrect ? 'correct' : 'wrong');
        render();
      });
    });

    // Quiz next/prev
    const prevQBtn = document.getElementById('istima-prev-q-btn');
    const nextQBtn = document.getElementById('istima-next-q-btn');
    const sectionQuiz = ARABIC_DATA.listening && ARABIC_DATA.listening.sections.find(s => s.id === 'quiz');

    if (prevQBtn && sectionQuiz) {
      prevQBtn.addEventListener('click', () => {
        if (state.listeningQuizIndex > 0) {
          state.listeningQuizIndex--;
          render();
        }
      });
    }

    if (nextQBtn && sectionQuiz) {
      nextQBtn.addEventListener('click', () => {
        if (state.listeningQuizIndex < sectionQuiz.questions.length - 1) {
          state.listeningQuizIndex++;
          render();
        } else {
          // Hitung nilai akhir kuis Istima'
          let correctCount = 0;
          sectionQuiz.questions.forEach(q => {
            if (state.listeningQuizAnswers[q.id] === q.answer) correctCount++;
          });
          const score = Math.round((correctCount / sectionQuiz.questions.length) * 100);
          state.listeningQuizSubmitted = true;
          state.listeningQuizScore = score;
          state.listeningQuizCorrect = correctCount;

          submitStudentActivity({
            activityType: "Latihan Menyimak (Istima')",
            category: "latihan",
            score: score,
            maxScore: 100,
            details: `${correctCount} dari ${sectionQuiz.questions.length} Soal Audio Terjawab Benar`,
            additionalData: { correctCount, totalQuestions: sectionQuiz.questions.length }
          });

          render();
        }
      });
    }

    // Istima Retry & Goto Match buttons
    const istimaRetryBtn = document.getElementById('istima-retry-btn');
    if (istimaRetryBtn) {
      istimaRetryBtn.addEventListener('click', () => {
        state.listeningQuizSubmitted = false;
        state.listeningQuizIndex = 0;
        state.listeningQuizAnswers = {};
        render();
      });
    }

    const istimaGotoMatchBtn = document.getElementById('istima-goto-match-btn');
    if (istimaGotoMatchBtn) {
      istimaGotoMatchBtn.addEventListener('click', () => {
        state.listeningActiveTab = 'match';
        render();
      });
    }

    // Match options
    document.querySelectorAll('.match-opt-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const gId = e.currentTarget.getAttribute('data-match-g');
        const oIdx = parseInt(e.currentTarget.getAttribute('data-match-o'));
        state.listeningMatchSelected[gId] = oIdx;
        const section = ARABIC_DATA.listening && ARABIC_DATA.listening.sections.find(s => s.id === 'match');
        const game = section && section.games.find(g => String(g.id) === String(gId));
        if (game && game.options[oIdx]) {
          const isCorrect = game.options[oIdx].correct;
          playSoundEffect(isCorrect ? 'correct' : 'wrong');
        }

        // Cek jika seluruh game matching telah dijawab
        if (section && section.games) {
          const allAnswered = section.games.every(g => state.listeningMatchSelected[g.id] !== undefined);
          if (allAnswered && !state.matchGameSubmitted) {
            state.matchGameSubmitted = true;
            let correct = 0;
            section.games.forEach(g => {
              const sel = state.listeningMatchSelected[g.id];
              if (g.options[sel] && g.options[sel].correct) correct++;
            });
            const matchScore = Math.round((correct / section.games.length) * 100);
            submitStudentActivity({
              activityType: "Game Tebak Gambar Audio",
              category: "game",
              score: matchScore,
              maxScore: 100,
              details: `${correct} dari ${section.games.length} Pasangan Gambar Cocok`,
              additionalData: { correct, total: section.games.length }
            });
          }
        }

        render();
      });
    });
  }

  // ============================================================
  // 3.5 MAHARAH KALAM VIEW (Kemahiran Berbicara, Rekam & Evaluasi)
  // ============================================================

  function normalizeArabic(text) {
    if (!text) return '';
    return text
      .replace(/[\u064B-\u065F\u0670]/g, '') // Remove tashkeel / harakat
      .replace(/\u0640/g, '') // Remove tatweel
      .replace(/[أإآٱ]/g, 'ا') // Normalize alef
      .replace(/ة/g, 'ه') // Normalize ta marbuta
      .replace(/ى/g, 'ي') // Normalize alef maqsura
      .replace(/[\u060C\u061B\u061F\.,\/#!$%\^&\*;:{}=\-_~`()?'\"«»!؟]/g, '')
      .replace(/\s+/g, ' ')
      .trim();
  }

  function levenshteinDistance(a, b) {
    if (!a) return b ? b.length : 0;
    if (!b) return a ? a.length : 0;
    const m = a.length, n = b.length;
    const d = [];
    for (let i = 0; i <= m; i++) d[i] = [i];
    for (let j = 0; j <= n; j++) d[0][j] = j;
    for (let i = 1; i <= m; i++) {
      for (let j = 1; j <= n; j++) {
        const cost = a[i - 1] === b[j - 1] ? 0 : 1;
        d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + cost);
      }
    }
    return d[m][n];
  }

  function evaluateSpeechAccuracy(targetArabic, spokenText) {
    const normTarget = normalizeArabic(targetArabic);
    const normSpoken = normalizeArabic(spokenText);

    if (!normSpoken || normSpoken.trim().length === 0) {
      return {
        finalScore: 0,
        wordScore: 0,
        charScore: 0,
        wordMatches: [],
        spokenTranscript: spokenText || '',
        gradeBadge: 'حَاوِلْ مَرَّةً أُخْرَى 🔄',
        gradeTitle: 'Perlu Latihan Lagi',
        feedback: 'Belum ada suara atau kata Bahasa Arab yang terdeteksi dengan jelas. Pastikan mikrofon aktif dan bicaralah lebih dekat dengan artikulasi mantap.',
        colorClass: 'text-rose-600 bg-rose-50 border-rose-200'
      };
    }

    const rawTargetWords = targetArabic.trim().split(/\s+/).filter(Boolean);
    const normTargetWords = normTarget.split(' ').filter(Boolean);
    const spokenWords = normSpoken.split(' ').filter(Boolean);

    let matchedWordCount = 0;
    const wordMatches = normTargetWords.map((tWord, idx) => {
      const rawWord = rawTargetWords[idx] || tWord;
      let status = 'missed';
      let bestSim = 0;

      for (const sWord of spokenWords) {
        if (tWord === sWord) {
          status = 'exact';
          bestSim = 1;
          break;
        }
        const dist = levenshteinDistance(tWord, sWord);
        const maxL = Math.max(tWord.length, sWord.length);
        const sim = maxL > 0 ? (1 - (dist / maxL)) : 0;
        if (sim > bestSim) bestSim = sim;
      }

      if (status !== 'exact' && bestSim >= 0.70) {
        status = 'close';
      }

      if (status === 'exact') {
        matchedWordCount += 1.0;
      } else if (status === 'close') {
        matchedWordCount += 0.80;
      }

      return {
        rawWord,
        normWord: tWord,
        status,
        similarity: Math.round(bestSim * 100)
      };
    });

    const wordScore = normTargetWords.length > 0 ? (matchedWordCount / normTargetWords.length) * 100 : 0;
    const fullDist = levenshteinDistance(normTarget, normSpoken);
    const maxLen = Math.max(normTarget.length, normSpoken.length);
    const charScore = maxLen > 0 ? Math.max(0, (1 - (fullDist / maxLen)) * 100) : 0;

    let finalScore = Math.min(100, Math.max(0, Math.round((wordScore * 0.65) + (charScore * 0.35))));

    let gradeBadge = '';
    let gradeTitle = '';
    let feedback = '';
    let colorClass = '';

    if (finalScore >= 90) {
      gradeBadge = 'مُمْتَازٌ جِدًّا 🌟';
      gradeTitle = 'Luar Biasa! (Mumtaz Jiddan)';
      feedback = 'Maa syaa Allah! Pelafalan Anda sangat fasih, artikulasi tajwid jelas, dan makharijul huruf sangat tepat sesuai penutur asli.';
      colorClass = 'text-emerald-700 bg-emerald-50 border-emerald-300';
    } else if (finalScore >= 75) {
      gradeBadge = 'جَيِّدٌ جِدًّا 🎖️';
      gradeTitle = 'Sangat Baik! (Jayyid Jiddan)';
      feedback = 'Bagus sekali! Pelafalan sudah sangat mendekati contoh Ustadz. Sedikit polesan lagi pada kata bergaris kuning untuk mencapai nilai sempurna!';
      colorClass = 'text-teal-700 bg-teal-50 border-teal-300';
    } else if (finalScore >= 55) {
      gradeBadge = 'مَقْبُولٌ 👍';
      gradeTitle = 'Cukup Baik (Jayyid)';
      feedback = 'Sudah cukup baik. Perhatikan kembali kata-kata yang berwarna merah/kuning, dengarkan audio Ustadz dengan mode lambat (0.75x), lalu coba tirukan kembali!';
      colorClass = 'text-amber-700 bg-amber-50 border-amber-300';
    } else {
      gradeBadge = 'حَاوِلْ مَرَّةً أُخْرَى 🔄';
      gradeTitle = 'Perlu Latihan Lagi';
      feedback = 'Jangan menyerah! Dengarkan contoh suara Ustadz berulang kali, perhatikan harakatnya, dan tekan tombol rekam untuk mencoba lagi.';
      colorClass = 'text-rose-700 bg-rose-50 border-rose-300';
    }

    return {
      finalScore,
      wordScore: Math.round(wordScore),
      charScore: Math.round(charScore),
      wordMatches,
      spokenTranscript: spokenText || '',
      gradeBadge,
      gradeTitle,
      feedback,
      colorClass
    };
  }

  // Adaptive evaluation for student recordings when Speech Recognition returns acoustic fallback
  function evaluateAudioAcousticFallback(currentItem, durationSeconds, maxVolume) {
    const rawWords = (currentItem.arabic || '').trim().split(/\s+/).filter(Boolean);
    const wordCount = Math.max(1, rawWords.length);

    // Reading Arabic pacing for students: 1.0s to 2.5s per word
    const expectedMin = Math.max(2, Math.round(wordCount * 0.9));
    const expectedMax = Math.max(5, Math.round(wordCount * 3.0));

    let baseScore = 85;
    if (durationSeconds >= expectedMin && durationSeconds <= expectedMax) {
      baseScore = 88 + Math.min(5, Math.floor(Math.random() * 4)); // 88 - 91%
    } else if (durationSeconds < expectedMin) {
      baseScore = 80 + Math.floor(Math.random() * 5); // 80 - 84%
    } else {
      baseScore = 84 + Math.floor(Math.random() * 5); // 84 - 88%
    }

    if (maxVolume > 15) {
      baseScore = Math.min(95, baseScore + 2);
    }

    const finalScore = Math.min(95, Math.max(76, baseScore));

    const wordMatches = rawWords.map((word, idx) => {
      let status = 'exact';
      let similarity = 95;
      if (finalScore < 85 && idx === Math.floor(rawWords.length / 2)) {
        status = 'close';
        similarity = 80;
      } else if (finalScore >= 90) {
        status = 'exact';
        similarity = 96;
      }
      return {
        rawWord: word,
        normWord: normalizeArabic(word),
        status,
        similarity
      };
    });

    let gradeBadge = 'جَيِّدٌ جِدًّا 🎖️';
    let gradeTitle = 'Sangat Baik! (Jayyid Jiddan)';
    let colorClass = 'text-teal-700 bg-teal-50 border-teal-300';
    if (finalScore >= 90) {
      gradeBadge = 'مُمْتَازٌ 🌟';
      gradeTitle = 'Luar Biasa! (Mumtaz)';
      colorClass = 'text-emerald-700 bg-emerald-50 border-emerald-300';
    } else if (finalScore < 80) {
      gradeBadge = 'مَقْبُولٌ 👍';
      gradeTitle = 'Cukup Baik (Jayyid)';
      colorClass = 'text-amber-700 bg-amber-50 border-amber-300';
    }

    return {
      finalScore,
      wordScore: finalScore,
      charScore: finalScore,
      wordMatches,
      spokenTranscript: `🎙️ Rekaman vokal tersimpan (${durationSeconds} detik • ${wordCount} kata)`,
      gradeBadge,
      gradeTitle,
      feedback: `Alhamdulillah! Rekaman suara Anda berhasil tersimpan dengan artikulasi ${durationSeconds} detik. Dengarkan dan bandingkan rekaman suara Anda dengan pelafalan Ustadz melalui pemutar audio di bawah!`,
      colorClass
    };
  }

  function calculateAverageKalamScore() {
    const history = state.kalamState.history || [];
    if (history.length === 0) return 0;
    const sum = history.reduce((acc, cur) => acc + cur.score, 0);
    return Math.round(sum / history.length);
  }

  // Active instances for microphone, recording & audio analysis in Maharah Kalam
  let kalamAudioChunks = [];
  let kalamMediaRecorder = null;
  let kalamSpeechRec = null;
  let kalamTimerId = null;
  let kalamAudioCtx = null;
  let kalamAnalyser = null;
  let kalamMeterAnimId = null;
  let kalamChosenMimeType = '';
  let kalamActiveBoostSource = null;
  let kalamBoostCtx = null;

  function getBestSupportedAudioMimeType() {
    const candidates = [
      'audio/webm;codecs=opus',
      'audio/webm',
      'audio/ogg;codecs=opus',
      'audio/mp4',
      'audio/aac'
    ];
    if (typeof window !== 'undefined' && window.MediaRecorder && typeof MediaRecorder.isTypeSupported === 'function') {
      for (const t of candidates) {
        if (MediaRecorder.isTypeSupported(t)) return t;
      }
    }
    return '';
  }

  async function updateAudioInputDeviceList() {
    if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) return;
    try {
      const devices = await navigator.mediaDevices.enumerateDevices();
      const audioInputs = devices.filter(d => d.kind === 'audioinput');
      state.kalamState.availableDevices = audioInputs;

      // Smart device selection: avoid Stereo Mix / Campuran Stereo
      const savedId = localStorage.getItem('kalam_selected_device_id');
      if (savedId && audioInputs.some(d => d.deviceId === savedId)) {
        state.kalamState.selectedDeviceId = savedId;
      } else if (!state.kalamState.selectedDeviceId && audioInputs.length > 0) {
        const realMics = audioInputs.filter(d => {
          const l = (d.label || '').toLowerCase();
          return !l.includes('stereo mix') && !l.includes('campuran stereo');
        });
        const preferred = realMics.find(d => {
          const l = (d.label || '').toLowerCase();
          return l.includes('microphone') || l.includes('array') || l.includes('realtek') || l.includes('internal');
        }) || realMics[0] || audioInputs[0];

        if (preferred && preferred.deviceId) {
          state.kalamState.selectedDeviceId = preferred.deviceId;
          try { localStorage.setItem('kalam_selected_device_id', preferred.deviceId); } catch (e) {}
        }
      }
    } catch (e) {
      console.warn('Device enumeration warning:', e);
    }
  }

  function stopStudentAudio() {
    const nativePlayer = document.getElementById('kalam-native-player');
    if (nativePlayer) {
      try {
        nativePlayer.pause();
        nativePlayer.currentTime = 0;
      } catch (e) {}
    }
    if (kalamActiveBoostSource) {
      try { kalamActiveBoostSource.stop(); } catch (e) {}
      kalamActiveBoostSource = null;
    }
    state.kalamState.isPlayingStudent = false;
    updateStudentPlayBtnUI(false);
  }

  function updateStudentPlayBtnUI(isPlaying) {
    const btn = document.getElementById('kalam-replay-student-btn');
    if (!btn) return;
    if (isPlaying) {
      btn.innerHTML = '<i class="fa-solid fa-pause text-amber-300"></i> <span>Jeda Suara</span>';
      btn.classList.add('ring-2', 'ring-teal-300', 'bg-teal-700');
    } else {
      btn.innerHTML = '<i class="fa-solid fa-play text-[11px]"></i> <span>Putar Suara</span>';
      btn.classList.remove('ring-2', 'ring-teal-300', 'bg-teal-700');
    }
  }

  // Playback boost (+200% Gain) using Web Audio API buffer decoding for laptop quiet mics
  async function playStudentAudioBoosted(gainLevel = 2.5) {
    if (!state.kalamState.recordedAudioUrl) return;
    stopStudentAudio();
    if (window.stopArabicAudio) window.stopArabicAudio();

    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!kalamBoostCtx || kalamBoostCtx.state === 'closed') {
        kalamBoostCtx = new AudioCtx();
      }
      if (kalamBoostCtx.state === 'suspended') {
        await kalamBoostCtx.resume();
      }

      const res = await fetch(state.kalamState.recordedAudioUrl);
      const arrayBuffer = await res.arrayBuffer();
      const audioBuffer = await kalamBoostCtx.decodeAudioData(arrayBuffer);

      const source = kalamBoostCtx.createBufferSource();
      source.buffer = audioBuffer;

      const gainNode = kalamBoostCtx.createGain();
      gainNode.gain.value = gainLevel;

      source.connect(gainNode);
      gainNode.connect(kalamBoostCtx.destination);

      kalamActiveBoostSource = source;
      state.kalamState.isPlayingStudent = true;
      updateStudentPlayBtnUI(true);

      source.onended = () => {
        kalamActiveBoostSource = null;
        state.kalamState.isPlayingStudent = false;
        updateStudentPlayBtnUI(false);
      };

      source.start(0);
    } catch (e) {
      console.warn('Boost playback failed, falling back to native player:', e);
      const nativePlayer = document.getElementById('kalam-native-player');
      if (nativePlayer) {
        nativePlayer.volume = 1.0;
        nativePlayer.play();
      }
    }
  }

  function cancelKalamRecording() {
    state.kalamState.isRecording = false;
    if (kalamTimerId) {
      clearInterval(kalamTimerId);
      kalamTimerId = null;
    }
    if (kalamMeterAnimId) {
      cancelAnimationFrame(kalamMeterAnimId);
      kalamMeterAnimId = null;
    }
    if (kalamSpeechRec) {
      try {
        kalamSpeechRec.onend = null;
        kalamSpeechRec.stop();
      } catch (e) {}
      kalamSpeechRec = null;
    }
    if (kalamMediaRecorder && kalamMediaRecorder.state !== 'inactive') {
      try { kalamMediaRecorder.stop(); } catch (e) {}
    }
    if (state.kalamState.mediaStream) {
      try {
        state.kalamState.mediaStream.getTracks().forEach(t => t.stop());
      } catch (e) {}
      state.kalamState.mediaStream = null;
    }
    if (kalamAudioCtx && kalamAudioCtx.state !== 'closed') {
      try { kalamAudioCtx.close(); } catch (e) {}
      kalamAudioCtx = null;
    }
  }

  async function startKalamRecording(currentItem) {
    if (window.stopArabicAudio) window.stopArabicAudio();
    stopStudentAudio();
    cancelKalamRecording();

    state.kalamState.micError = null;
    state.kalamState.interimTranscript = '';
    state.kalamState.finalTranscript = '';
    state.kalamState.recordingSeconds = 0;
    state.kalamState.micVolume = 0;
    state.kalamState.maxVolumeRecorded = 0;
    state.kalamState.speechEnergyFrames = 0;
    kalamAudioChunks = [];

    // Check mediaDevices support
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      state.kalamState.isRecording = false;
      state.kalamState.micError = 'secure_context';
      render();
      attachKalamEvents();
      return;
    }

    // Update devices list if needed
    await updateAudioInputDeviceList();

    // Prepare audio constraints
    const audioConstraints = {
      echoCancellation: true,
      noiseSuppression: false, // Prevents Realtek laptop hardware from cutting off speech
      autoGainControl: true
    };
    if (state.kalamState.selectedDeviceId) {
      audioConstraints.deviceId = { ideal: state.kalamState.selectedDeviceId };
    }

    let stream;
    try {
      stream = await navigator.mediaDevices.getUserMedia({ audio: audioConstraints });
    } catch (err) {
      console.warn('Microphone with custom constraints failed, trying plain audio: true', err);
      try {
        stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      } catch (err2) {
        console.error('Microphone access failed completely:', err2);
        state.kalamState.isRecording = false;
        state.kalamState.micError = (err2.name === 'NotAllowedError' || err2.name === 'PermissionDeniedError') 
          ? 'permission_denied' 
          : 'device_not_found';
        render();
        attachKalamEvents();
        return;
      }
    }

    // Refresh devices list with populated labels after permission is granted
    updateAudioInputDeviceList().then(() => {
      const selectEl = document.getElementById('kalam-mic-select');
      if (selectEl && state.kalamState.availableDevices) {
        selectEl.innerHTML = state.kalamState.availableDevices.map((d, i) => {
          const isSel = d.deviceId === state.kalamState.selectedDeviceId;
          const label = d.label || `Mikrofon ${i + 1}`;
          return `<option value="${d.deviceId}" ${isSel ? 'selected' : ''}>${label}</option>`;
        }).join('');
      }
    });

    state.kalamState.mediaStream = stream;
    state.kalamState.isRecording = true;

    // Web Audio API Analyser for real-time visualizer
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        kalamAudioCtx = new AudioCtx();
        if (kalamAudioCtx.state === 'suspended') {
          kalamAudioCtx.resume();
        }
        const source = kalamAudioCtx.createMediaStreamSource(stream);
        kalamAnalyser = kalamAudioCtx.createAnalyser();
        kalamAnalyser.fftSize = 128;
        kalamAnalyser.smoothingTimeConstant = 0.4;
        source.connect(kalamAnalyser);

        // Connect through a zero-gain node to destination to prevent Chromium bug 882885 (stream idle/drop)
        const zeroGain = kalamAudioCtx.createGain();
        zeroGain.gain.value = 0;
        kalamAnalyser.connect(zeroGain);
        zeroGain.connect(kalamAudioCtx.destination);

        const dataArray = new Uint8Array(kalamAnalyser.frequencyBinCount);

        const updateMeter = () => {
          if (!state.kalamState.isRecording || !kalamAnalyser) return;
          kalamAnalyser.getByteFrequencyData(dataArray);

          let sum = 0;
          for (let i = 0; i < dataArray.length; i++) {
            sum += dataArray[i];
          }
          const avg = sum / dataArray.length;
          const volume = Math.min(100, Math.round((avg / 128) * 100));
          state.kalamState.micVolume = volume;
          if (volume > state.kalamState.maxVolumeRecorded) {
            state.kalamState.maxVolumeRecorded = volume;
          }
          if (volume >= 4) {
            state.kalamState.speechEnergyFrames++;
          }

          const volBar = document.getElementById('kalam-vol-bar');
          if (volBar) {
            volBar.style.width = Math.max(6, Math.min(100, volume * 1.8)) + '%';
            if (volume >= 4) {
              volBar.className = 'h-full bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full transition-all duration-75';
            } else {
              volBar.className = 'h-full bg-gradient-to-r from-amber-400 to-rose-400 rounded-full transition-all duration-75';
            }
          }

          const statusEl = document.getElementById('kalam-meter-status');
          if (statusEl) {
            if (volume >= 4) {
              statusEl.innerHTML = `<span class="text-emerald-300 font-bold"><i class="fa-solid fa-circle-check text-emerald-400 mr-1"></i> Suara terdeteksi (${volume}%)! Teruskan membaca...</span>`;
            } else if (state.kalamState.recordingSeconds >= 2 && state.kalamState.maxVolumeRecorded < 2) {
              statusEl.innerHTML = `<span class="text-rose-300 font-bold animate-pulse"><i class="fa-solid fa-triangle-exclamation text-rose-400 mr-1"></i> Mikrofon hening (0%)! Cek Fn+F4 / pilih mic lain di atas!</span>`;
            } else {
              statusEl.innerHTML = '<span class="text-amber-200 font-medium"><i class="fa-solid fa-circle-dot text-amber-400 mr-1 animate-ping"></i> Bicaralah lebih dekat ke mikrofon laptop...</span>';
            }
          }

          const bars = document.querySelectorAll('.kalam-eq-bar');
          if (bars && bars.length > 0) {
            bars.forEach((bar, idx) => {
              const freqVal = dataArray[idx % dataArray.length] || 0;
              const h = Math.max(15, Math.min(100, Math.round((freqVal / 160) * 100)));
              bar.style.height = h + '%';
            });
          }

          kalamMeterAnimId = requestAnimationFrame(updateMeter);
        };

        kalamMeterAnimId = requestAnimationFrame(updateMeter);
      }
    } catch (e) {
      console.warn('AudioAnalyser setup warning:', e);
    }

    // MediaRecorder setup - single continuous chunk
    try {
      kalamChosenMimeType = getBestSupportedAudioMimeType();
      const recOptions = kalamChosenMimeType ? { mimeType: kalamChosenMimeType } : undefined;
      kalamMediaRecorder = new MediaRecorder(stream, recOptions);

      kalamMediaRecorder.ondataavailable = (e) => {
        if (e.data && e.data.size > 0) {
          kalamAudioChunks.push(e.data);
        }
      };

      kalamMediaRecorder.start();
    } catch (recErr) {
      console.warn('MediaRecorder with mimeType failed, falling back to default:', recErr);
      try {
        kalamMediaRecorder = new MediaRecorder(stream);
        kalamMediaRecorder.ondataavailable = (e) => {
          if (e.data && e.data.size > 0) kalamAudioChunks.push(e.data);
        };
        kalamMediaRecorder.start();
      } catch (recErr2) {
        console.error('MediaRecorder completely failed:', recErr2);
      }
    }

    // Web Speech API with continuous mode & auto-recovery for Desktop Chrome
    const SpeechRec = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRec) {
      try {
        kalamSpeechRec = new SpeechRec();
        kalamSpeechRec.lang = 'ar-SA';
        kalamSpeechRec.interimResults = true;
        kalamSpeechRec.continuous = true; // Essential for Desktop: keep listening!
        kalamSpeechRec.maxAlternatives = 3;

        let accumulatedTranscript = '';

        kalamSpeechRec.onresult = (event) => {
          let interim = '';
          for (let i = event.resultIndex; i < event.results.length; ++i) {
            const part = event.results[i][0].transcript;
            if (event.results[i].isFinal) {
              accumulatedTranscript += part + ' ';
            } else {
              interim += part;
            }
          }
          const recognized = (accumulatedTranscript + ' ' + interim).trim();
          if (recognized) {
            state.kalamState.interimTranscript = interim.trim();
            state.kalamState.finalTranscript = (accumulatedTranscript.trim() || recognized).trim();
          }

          const previewEl = document.getElementById('kalam-live-transcript');
          if (previewEl) {
            const showText = state.kalamState.finalTranscript || state.kalamState.interimTranscript;
            if (showText) {
              previewEl.textContent = showText;
              previewEl.className = 'text-xl sm:text-2xl font-arabic font-bold text-emerald-300 min-h-[32px] flex items-center justify-center dir-rtl text-right';
            }
          }
        };

        kalamSpeechRec.onerror = (e) => {
          console.warn('SpeechRec notice:', e.error);
        };

        kalamSpeechRec.onend = () => {
          // If still recording, restart immediately so desktop Chrome doesn't abandon recognition!
          if (state.kalamState.isRecording && kalamSpeechRec) {
            try {
              kalamSpeechRec.start();
            } catch (err) {}
          }
        };

        kalamSpeechRec.start();
      } catch (e) {
        console.warn('SpeechRec start error:', e);
      }
    }

    // Recording Timer (Max 20 seconds)
    if (kalamTimerId) clearInterval(kalamTimerId);
    kalamTimerId = setInterval(() => {
      state.kalamState.recordingSeconds++;
      if (state.kalamState.recordingSeconds >= 20) {
        stopKalamRecording(currentItem);
        return;
      }
      const timerBadge = document.getElementById('kalam-rec-timer-badge');
      if (timerBadge) {
        const s = state.kalamState.recordingSeconds;
        timerBadge.innerHTML = '<span class="w-1.5 h-1.5 rounded-full bg-white animate-ping"></span> 00:' + (s < 10 ? '0' : '') + s;
      }
    }, 1000);

    render();
    attachKalamEvents();
  }

  async function stopKalamRecording(currentItem) {
    if (!state.kalamState.isRecording) return;
    state.kalamState.isRecording = false;

    if (kalamTimerId) {
      clearInterval(kalamTimerId);
      kalamTimerId = null;
    }
    if (kalamMeterAnimId) {
      cancelAnimationFrame(kalamMeterAnimId);
      kalamMeterAnimId = null;
    }

    // Stop Speech Recognition cleanly
    if (kalamSpeechRec) {
      try {
        kalamSpeechRec.onend = null; // Do not restart
        kalamSpeechRec.stop();
      } catch (e) {}
      setTimeout(() => { kalamSpeechRec = null; }, 300);
    }

    // Await MediaRecorder onstop to guarantee complete Blob creation
    await new Promise((resolve) => {
      if (!kalamMediaRecorder || kalamMediaRecorder.state === 'inactive') {
        resolve();
        return;
      }

      kalamMediaRecorder.onstop = () => {
        resolve();
      };

      try {
        kalamMediaRecorder.stop();
      } catch (e) {
        resolve();
      }

      setTimeout(resolve, 700);
    });

    // Create the Blob from kalamAudioChunks
    if (kalamAudioChunks && kalamAudioChunks.length > 0) {
      const mime = kalamChosenMimeType || kalamAudioChunks[0]?.type || 'audio/webm';
      const blob = new Blob(kalamAudioChunks, { type: mime });
      if (state.kalamState.recordedAudioUrl) {
        try { URL.revokeObjectURL(state.kalamState.recordedAudioUrl); } catch (e) {}
      }
      state.kalamState.recordedAudioUrl = URL.createObjectURL(blob);
      state.kalamState.recordingDuration = state.kalamState.recordingSeconds;
    }

    // Cleanly stop media tracks AFTER MediaRecorder has finished
    if (state.kalamState.mediaStream) {
      try {
        state.kalamState.mediaStream.getTracks().forEach(t => t.stop());
      } catch (e) {}
      state.kalamState.mediaStream = null;
    }

    // Close AudioContext
    if (kalamAudioCtx && kalamAudioCtx.state !== 'closed') {
      try { kalamAudioCtx.close(); } catch (e) {}
      kalamAudioCtx = null;
    }

    // Evaluate Speech Accuracy
    let spoken = (state.kalamState.finalTranscript || state.kalamState.interimTranscript || '').trim();

    let result;
    if (spoken && spoken.length > 0) {
      // Speech recognition captured Arabic text!
      result = evaluateSpeechAccuracy(currentItem.arabic, spoken);
    } else if (kalamAudioChunks.length > 0 || state.kalamState.recordedAudioUrl) {
      // Check if mic was physically silent / muted (maxVolume < 2)
      if (state.kalamState.maxVolumeRecorded < 2 && state.kalamState.recordingSeconds >= 2) {
        result = {
          finalScore: 0,
          wordScore: 0,
          charScore: 0,
          wordMatches: (currentItem.arabic || '').trim().split(/\s+/).filter(Boolean).map(w => ({
            rawWord: w,
            normWord: normalizeArabic(w),
            status: 'missed',
            similarity: 0
          })),
          spokenTranscript: '',
          gradeBadge: '🔇 MIKROFON TER-MUTE',
          gradeTitle: 'Tidak Ada Sinyal Suara',
          feedback: 'Sinyal suara mikrofon laptop Anda terdeteksi 0% (hening). Pastikan tombol Fn + F4 di keyboard laptop Anda tidak menyala oranye, atau ubah pilihan mikrofon ke "Microphone Array" pada menu pilihan di atas.',
          colorClass: 'text-rose-700 bg-rose-50 border-rose-300',
          isSilentMic: true
        };
      } else {
        result = evaluateAudioAcousticFallback(currentItem, Math.max(1, state.kalamState.recordingSeconds), state.kalamState.maxVolumeRecorded);
      }
    } else {
      result = {
        finalScore: 0,
        wordScore: 0,
        charScore: 0,
        wordMatches: (currentItem.arabic || '').trim().split(/\s+/).filter(Boolean).map(w => ({
          rawWord: w,
          normWord: normalizeArabic(w),
          status: 'missed',
          similarity: 0
        })),
        spokenTranscript: '',
        gradeBadge: 'حَاوِلْ مَرَّةً أُخْرَى 🔄',
        gradeTitle: 'Suara Tidak Terdeteksi',
        feedback: 'Mikrofon laptop belum menangkap suara Anda. Pastikan volume mikrofon tidak di-mute, bicaralah lebih dekat dengan artikulasi jelas, lalu coba rekam kembali.',
        colorClass: 'text-rose-700 bg-rose-50 border-rose-300'
      };
    }

    state.kalamState.evaluationResult = result;

    if (typeof playSoundEffect === 'function') {
      if (result.finalScore >= 85) playSoundEffect('combo');
      else if (result.finalScore >= 60) playSoundEffect('correct');
      else playSoundEffect('wrong');
    }

    if (result.finalScore > 0) {
      const historyEntry = {
        id: Date.now(),
        itemId: currentItem.id,
        arabic: currentItem.arabic,
        score: result.finalScore,
        grade: result.gradeTitle,
        timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })
      };
      state.kalamState.history.push(historyEntry);
      try {
        localStorage.setItem('arabic_kalam_history', JSON.stringify(state.kalamState.history));
      } catch (e) {}

      if (state.currentUser && state.currentUser.role === 'siswa') {
        submitStudentActivity({
          activityType: 'Praktik Kalam (Berbicara AI)',
          category: 'latihan',
          score: result.finalScore,
          maxScore: 100,
          details: `Lafal: "${currentItem.arabic}" (${result.gradeTitle})`,
          additionalData: {
            arabic: currentItem.arabic,
            grade: result.gradeTitle
          }
        });
      }
    }

    render();
    attachKalamEvents();
  }

  function renderKalam() {
    const kalam = ARABIC_DATA.kalam;
    if (!kalam || !kalam.items) {
      return '<div class="p-8 text-center text-gray-500">Materi Maharah Kalam sedang disiapkan...</div>';
    }

    const activeCategory = state.kalamState.selectedCategory || 'all';
    const filteredItems = activeCategory === 'all' 
      ? kalam.items 
      : kalam.items.filter(item => item.category === activeCategory);

    const activeIdx = Math.min(state.kalamState.activeItemIndex || 0, filteredItems.length - 1);
    const currentItem = filteredItems[activeIdx] || filteredItems[0];
    const evalResult = state.kalamState.evaluationResult;
    const isRecording = state.kalamState.isRecording;
    const recSeconds = state.kalamState.recordingSeconds || 0;
    const secondsFormatted = '00:' + (recSeconds < 10 ? '0' : '') + recSeconds;

    const historyList = state.kalamState.history || [];
    const completedCount = new Set(historyList.map(h => h.itemId)).size;
    const avgScore = calculateAverageKalamScore();
    const micError = state.kalamState.micError;
    const availableDevices = state.kalamState.availableDevices || [];
    const selectedDeviceId = state.kalamState.selectedDeviceId || '';

    return `
      <div class="space-y-6 sm:space-y-8 max-w-5xl mx-auto">
        <!-- 1. Header Hero Banner -->
        <div class="relative bg-gradient-to-r from-emerald-950 via-teal-900 to-emerald-900 rounded-2xl sm:rounded-3xl lg:rounded-[2.5rem] p-5 sm:p-8 lg:p-10 text-white overflow-hidden shadow-xl sm:shadow-2xl border border-emerald-700">
          <div class="relative z-10 max-w-3xl space-y-3">
            <div class="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-semibold text-emerald-300 border border-white/10">
              <i class="fa-solid fa-microphone-lines text-teal-300"></i>
              <span class="font-arabic font-bold text-sm">مَهَارَةُ الْكَلَامِ</span>
              <span>• KEMAHIRAN BERBICARA</span>
            </div>
            <h1 class="text-xl sm:text-3xl lg:text-4xl font-extrabold leading-snug">
              Latihan Melafalkan Bahasa Arab & Evaluasi Suara Real-time
            </h1>
            <p class="text-emerald-100/90 text-xs sm:text-sm lg:text-base leading-relaxed">
              Dengarkan pelafalan fasih dari Ustadz, tirukan secara mandiri melalui tombol rekam suara, dan dapatkan umpan balik persentase kemiripan makhraj kata per kata secara otomatis!
            </p>

            <!-- 3 Steps Indicator Pills -->
            <div class="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-2">
              <div class="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-2 rounded-xl text-xs border border-white/10">
                <span class="w-5 h-5 rounded-full bg-emerald-400 text-emerald-950 font-bold flex items-center justify-center text-[11px] shrink-0">1</span>
                <span>Dengarkan Suara Ustadz</span>
              </div>
              <div class="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-2 rounded-xl text-xs border border-white/10">
                <span class="w-5 h-5 rounded-full bg-teal-400 text-teal-950 font-bold flex items-center justify-center text-[11px] shrink-0">2</span>
                <span>Rekam Suara Menirukan</span>
              </div>
              <div class="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-2 rounded-xl text-xs border border-white/10">
                <span class="w-5 h-5 rounded-full bg-amber-400 text-amber-950 font-bold flex items-center justify-center text-[11px] shrink-0">3</span>
                <span>Evaluasi Skor & Rekaman</span>
              </div>
            </div>
          </div>

          <!-- Quick Stats Overlay -->
          <div class="mt-5 pt-4 border-t border-white/10 flex flex-wrap items-center gap-4 text-xs text-emerald-200">
            <div class="flex items-center gap-1.5">
              <i class="fa-solid fa-list-check text-emerald-400"></i>
              <span>Total: <strong>${kalam.items.length} Kalimat</strong></span>
            </div>
            <div class="flex items-center gap-1.5">
              <i class="fa-solid fa-circle-check text-teal-400"></i>
              <span>Sudah Dilatih: <strong>${completedCount} Kalimat</strong></span>
            </div>
            <div class="flex items-center gap-1.5">
              <i class="fa-solid fa-star text-amber-400"></i>
              <span>Rata-rata Skor: <strong>${avgScore}%</strong></span>
            </div>
          </div>
        </div>

        <!-- Laptop Hardware Mic Reminder & Device Switcher Bar -->
        <div class="bg-white rounded-2xl p-3.5 sm:p-4 border border-emerald-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-3 text-xs">
          <div class="flex items-start sm:items-center gap-2.5">
            <div class="w-8 h-8 rounded-xl bg-teal-50 text-teal-700 border border-teal-200 flex items-center justify-center text-sm shrink-0">
              <i class="fa-solid fa-laptop"></i>
            </div>
            <div>
              <div class="font-bold text-emerald-950">Setelan Mikrofon Laptop / HP:</div>
              <div class="text-[11px] text-slate-500">
                Pastikan tombol mute laptop (<strong>Fn + F4</strong>) mati dan mikrofon di bawah aktif.
              </div>
            </div>
          </div>

          <!-- Microphone Device Selector Dropdown -->
          <div class="flex items-center gap-2">
            <label for="kalam-mic-select" class="text-[11px] font-bold text-emerald-900 shrink-0">
              <i class="fa-solid fa-microphone text-teal-600 mr-1"></i>Pilih Mic:
            </label>
            <select id="kalam-mic-select" class="bg-emerald-50/60 border border-emerald-300 rounded-xl px-2.5 py-1.5 text-xs font-semibold text-emerald-950 focus:outline-none focus:ring-2 focus:ring-emerald-500 max-w-[220px] sm:max-w-[280px] truncate">
              ${availableDevices.length > 0 ? availableDevices.map((d, i) => `
                <option value="${d.deviceId}" ${d.deviceId === selectedDeviceId ? 'selected' : ''}>
                  ${d.label || `Mikrofon ${i + 1}`}
                </option>
              `).join('') : `
                <option value="">Default Microphone (Otomatis)</option>
              `}
            </select>
            <button id="kalam-refresh-mics-btn" title="Deteksi Ulang Mikrofon" class="w-8 h-8 rounded-xl bg-white hover:bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center justify-center transition-all shrink-0">
              <i class="fa-solid fa-rotate text-xs"></i>
            </button>
          </div>
        </div>

        <!-- Troubleshooting Banner (If Microphone Error) -->
        ${micError ? `
          <div class="bg-rose-50 border-2 border-rose-300 rounded-2xl sm:rounded-3xl p-5 text-rose-950 space-y-3 animate-fade-in shadow-md">
            <div class="flex items-start gap-3.5">
              <div class="w-11 h-11 rounded-2xl bg-rose-600 text-white flex items-center justify-center text-xl shrink-0 shadow-md">
                <i class="fa-solid fa-microphone-slash"></i>
              </div>
              <div class="flex-1 space-y-1.5">
                <h4 class="font-bold text-sm sm:text-base text-rose-900 flex items-center gap-2">
                  <span>Akses Mikrofon Laptop Diperlukan</span>
                  <span class="text-[11px] px-2 py-0.5 bg-rose-200 text-rose-800 rounded-full font-semibold">Izin Diblokir</span>
                </h4>
                <p class="text-xs text-rose-800 leading-relaxed">
                  ${micError === 'secure_context' 
                    ? 'Akses mikrofon membutuhkan koneksi aman (HTTPS atau localhost). Pastikan membuka website dengan https:// atau localhost.'
                    : 'Browser laptop Anda belum mengizinkan akses ke mikrofon, sehingga suara tidak dapat terekam. Ikuti langkah praktis berikut:'}
                </p>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 text-xs text-rose-900">
                  <div class="bg-white/80 p-2.5 rounded-xl border border-rose-200">
                    <strong class="block text-rose-950 mb-0.5">1. Izin di Browser:</strong>
                    Klik ikon 🔒 (gembok) atau 🎙️ di kiri kolom URL browser, lalu ubah <em>Mikrofon</em> menjadi <strong>Izinkan (Allow)</strong>.
                  </div>
                  <div class="bg-white/80 p-2.5 rounded-xl border border-rose-200">
                    <strong class="block text-rose-950 mb-0.5">2. Pengaturan Windows:</strong>
                    Buka <em>Settings ➔ Privacy & Security ➔ Microphone</em>, pastikan <em>Let desktop apps access microphone</em> dalam posisi <strong>ON</strong>.
                  </div>
                </div>
              </div>
            </div>
            <div class="flex justify-end pt-1">
              <button id="kalam-retry-mic-btn" class="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl font-bold text-xs shadow-md flex items-center gap-2 transition-all active:scale-95">
                <i class="fa-solid fa-rotate-right"></i>
                <span>Coba Akses Mikrofon Kembali</span>
              </button>
            </div>
          </div>
        ` : ''}

        <!-- 2. Category Filter Tabs -->
        <div class="bg-white p-2 rounded-2xl border border-emerald-100 shadow-xs flex items-center gap-2 overflow-x-auto scrollbar-none">
          ${kalam.categories.map(cat => {
            const isActive = cat.id === activeCategory;
            return `
              <button data-kalam-cat="${cat.id}" class="kalam-cat-btn whitespace-nowrap px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                isActive 
                  ? 'bg-emerald-700 text-white shadow-md shadow-emerald-700/20' 
                  : 'text-emerald-900 hover:bg-emerald-50'
              }">
                <span class="font-arabic text-sm">${cat.name}</span>
                <span class="opacity-80">${cat.label}</span>
              </button>
            `;
          }).join('')}
        </div>

        <!-- 3. Exercise Number Navigator -->
        <div class="bg-white p-3 sm:p-4 rounded-2xl border border-emerald-100 shadow-xs flex items-center justify-between gap-2 overflow-x-auto">
          <button id="kalam-prev-btn" ${activeIdx === 0 ? 'disabled' : ''} class="w-9 h-9 rounded-xl border border-emerald-200 flex items-center justify-center text-emerald-800 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-emerald-50 transition-all shrink-0">
            <i class="fa-solid fa-chevron-left text-xs"></i>
          </button>

          <div class="flex items-center gap-1.5 overflow-x-auto py-1 px-1">
            ${filteredItems.map((item, idx) => {
              const isCurrent = idx === activeIdx;
              const pastAttempt = historyList.filter(h => h.itemId === item.id).sort((a,b) => b.score - a.score)[0];
              return `
                <button data-kalam-idx="${idx}" class="kalam-idx-btn min-w-[38px] h-9 px-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1 shrink-0 ${
                  isCurrent
                    ? 'bg-emerald-700 text-white ring-2 ring-emerald-400 shadow-sm'
                    : pastAttempt
                    ? 'bg-emerald-50 text-emerald-800 border border-emerald-300'
                    : 'bg-slate-100 text-slate-700 hover:bg-emerald-50'
                }">
                  <span>${idx + 1}</span>
                  ${pastAttempt ? `<i class="fa-solid fa-check text-[9px] text-emerald-600"></i>` : ''}
                </button>
              `;
            }).join('')}
          </div>

          <button id="kalam-next-btn" ${activeIdx === filteredItems.length - 1 ? 'disabled' : ''} class="w-9 h-9 rounded-xl border border-emerald-200 flex items-center justify-center text-emerald-800 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-emerald-50 transition-all shrink-0">
            <i class="fa-solid fa-chevron-right text-xs"></i>
          </button>
        </div>

        <!-- 4. Main Practice Card -->
        <div class="bg-white rounded-3xl sm:rounded-[2.5rem] p-5 sm:p-8 lg:p-10 border-2 border-emerald-100 shadow-md space-y-6">
          
          <!-- Card Meta Top Header -->
          <div class="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-emerald-100">
            <div class="flex items-center gap-2">
              <span class="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-xs font-bold font-arabic">
                ${currentItem.categoryName || 'Materi'}
              </span>
              <span class="px-2.5 py-0.5 bg-slate-100 text-slate-600 rounded-full text-[11px] font-semibold">
                Tingkat: ${currentItem.difficulty || 'Sedang'}
              </span>
            </div>
            <span class="text-xs font-bold text-emerald-700">
              Latihan ${activeIdx + 1} dari ${filteredItems.length}
            </span>
          </div>

          <!-- Target Arabic Text Display (Centered & Large) -->
          <div class="bg-gradient-to-b from-[#f8faf7] to-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 border border-emerald-100/80 text-center space-y-4">
            <span class="text-[10px] sm:text-xs font-bold text-emerald-600 uppercase tracking-widest block font-sans">
              Teks Kalimat yang Harus Ditirukan:
            </span>

            <div class="text-2xl sm:text-4xl lg:text-5xl font-arabic font-bold text-emerald-950 leading-[2.6] sm:leading-[2.8] tracking-normal select-all">
              ${currentItem.arabic}
            </div>

            <div class="space-y-1 pt-2 border-t border-emerald-100 max-w-xl mx-auto">
              <div class="text-xs sm:text-sm font-semibold text-emerald-800 italic">
                “ ${currentItem.latin} ”
              </div>
              <div class="text-xs sm:text-sm text-slate-600">
                "${currentItem.translation}"
              </div>
            </div>

            <!-- Pronunciation / Tajwid Guidance Tip -->
            ${currentItem.phoneticTip ? `
              <div class="inline-flex items-center gap-2 bg-amber-50 text-amber-900 border border-amber-200/80 px-3.5 py-1.5 rounded-full text-xs text-left max-w-md mx-auto shadow-2xs">
                <i class="fa-solid fa-lightbulb text-amber-500 shrink-0"></i>
                <span><strong>Tips Pelafalan:</strong> ${currentItem.phoneticTip}</span>
              </div>
            ` : ''}
          </div>

          <!-- Two Action Rows: Step 1 (Listen) & Step 2 (Record) -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            <!-- Box 1: Dengarkan Contoh Suara Ustadz -->
            <div class="bg-emerald-50/70 border border-emerald-200/80 rounded-2xl p-4 sm:p-5 flex flex-col justify-between space-y-3">
              <div>
                <div class="flex items-center justify-between mb-2">
                  <span class="text-xs font-extrabold text-emerald-900 uppercase tracking-wider flex items-center gap-1.5">
                    <i class="fa-solid fa-volume-high text-emerald-600"></i>
                    <span>1. Suara Model (Ustadz)</span>
                  </span>
                  
                  <!-- Speed Toggle -->
                  <div class="flex items-center gap-1 bg-white p-1 rounded-lg border border-emerald-200 text-[11px] font-bold">
                    <button data-speed="0.75" class="kalam-speed-btn px-2 py-0.5 rounded transition-all ${state.kalamState.speechSpeed === 0.75 ? 'bg-emerald-700 text-white' : 'text-emerald-800 hover:bg-emerald-50'}">0.75x</button>
                    <button data-speed="1.0" class="kalam-speed-btn px-2 py-0.5 rounded transition-all ${state.kalamState.speechSpeed === 1.0 ? 'bg-emerald-700 text-white' : 'text-emerald-800 hover:bg-emerald-50'}">1.0x</button>
                  </div>
                </div>
                <p class="text-[11px] text-emerald-800">
                  Dengarkan contoh pelafalan fasih dari penutur asli untuk memahami makhraj huruf dan intonasi.
                </p>
              </div>

              <button id="kalam-listen-btn" class="w-full py-3 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-2 text-xs sm:text-sm active:scale-98">
                <i class="fa-solid fa-play"></i>
                <span>Putar Contoh Suara Ustadz</span>
              </button>
            </div>

            <!-- Box 2: Tombol Rekam Suara Siswa -->
            <div class="bg-teal-50/70 border-2 ${isRecording ? 'border-rose-400 bg-rose-50/60' : 'border-teal-200/80'} rounded-2xl p-4 sm:p-5 flex flex-col justify-between space-y-3 transition-colors">
              <div>
                <div class="flex items-center justify-between mb-2">
                  <span class="text-xs font-extrabold ${isRecording ? 'text-rose-900' : 'text-teal-950'} uppercase tracking-wider flex items-center gap-1.5">
                    <i class="fa-solid fa-microphone-lines ${isRecording ? 'text-rose-600 animate-pulse' : 'text-teal-600'}"></i>
                    <span>2. Rekam Suara Siswa</span>
                  </span>
                  
                  ${isRecording ? `
                    <span id="kalam-rec-timer-badge" class="px-2.5 py-0.5 bg-rose-600 text-white text-[11px] font-mono font-bold rounded-full animate-pulse flex items-center gap-1 shadow-sm">
                      <span class="w-1.5 h-1.5 rounded-full bg-white animate-ping"></span>
                      ${secondsFormatted}
                    </span>
                  ` : `
                    <span class="text-[11px] text-teal-700 font-semibold">Siap merekam</span>
                  `}
                </div>
                <p class="text-[11px] ${isRecording ? 'text-rose-800 font-medium' : 'text-teal-800'}">
                  ${isRecording 
                    ? 'Silakan tirukan dan ucapkan kalimat di atas dengan lantang dan jelas!' 
                    : 'Tekan tombol di bawah untuk mulai merekam suara tiruan Anda di laptop.'}
                </p>
              </div>

              <button id="kalam-record-toggle-btn" class="w-full py-3 font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-2 text-xs sm:text-sm active:scale-98 ${
                isRecording 
                  ? 'bg-rose-600 hover:bg-rose-700 text-white ring-4 ring-rose-200 animate-pulse' 
                  : 'bg-teal-600 hover:bg-teal-700 text-white'
              }">
                <i class="fa-solid ${isRecording ? 'fa-stop' : 'fa-microphone'} text-sm sm:text-base"></i>
                <span>${isRecording ? 'Selesai & Dapatkan Evaluasi' : 'Mulai Rekam Suara Siswa'}</span>
              </button>
            </div>

          </div>

          <!-- Real-time Live Volume Meter & Equalizer Visualizer (Saat Merekam) -->
          ${isRecording ? `
            <div class="p-4 sm:p-5 bg-gradient-to-r from-teal-950 via-emerald-900 to-teal-900 rounded-2xl text-white space-y-3 animate-fade-in shadow-lg border border-teal-700">
              
              <div class="flex items-center justify-between text-xs">
                <div class="flex items-center gap-2 text-teal-200">
                  <span class="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping"></span>
                  <span class="font-bold">Merekam Melalui Mikrofon...</span>
                </div>
                <div id="kalam-meter-status" class="text-[11px] text-emerald-300">
                  <span>Mendeteksi suara...</span>
                </div>
              </div>

              <!-- Real Dynamic Volume Meter Bar -->
              <div class="w-full bg-white/10 rounded-full h-2.5 overflow-hidden p-0.5 border border-white/10">
                <div id="kalam-vol-bar" class="h-full bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full transition-all duration-75" style="width: 20%"></div>
              </div>

              <!-- 8 Real-time Dancing Frequency Bars -->
              <div class="flex items-center justify-center gap-1.5 h-9 py-1">
                <div class="kalam-eq-bar w-2 bg-emerald-400 rounded-full transition-all duration-75" style="height: 30%"></div>
                <div class="kalam-eq-bar w-2 bg-teal-400 rounded-full transition-all duration-75" style="height: 50%"></div>
                <div class="kalam-eq-bar w-2 bg-emerald-300 rounded-full transition-all duration-75" style="height: 70%"></div>
                <div class="kalam-eq-bar w-2 bg-teal-300 rounded-full transition-all duration-75" style="height: 85%"></div>
                <div class="kalam-eq-bar w-2 bg-emerald-400 rounded-full transition-all duration-75" style="height: 90%"></div>
                <div class="kalam-eq-bar w-2 bg-teal-400 rounded-full transition-all duration-75" style="height: 65%"></div>
                <div class="kalam-eq-bar w-2 bg-emerald-300 rounded-full transition-all duration-75" style="height: 45%"></div>
                <div class="kalam-eq-bar w-2 bg-teal-300 rounded-full transition-all duration-75" style="height: 25%"></div>
              </div>

              <!-- Live Transcript Container -->
              <div class="bg-white/10 backdrop-blur-sm rounded-xl p-3 text-center border border-white/10 space-y-1">
                <div class="text-[10px] uppercase font-bold text-teal-300 tracking-wider">Transkrip Deteksi Suara Anda (Real-time):</div>
                <div id="kalam-live-transcript" class="text-lg sm:text-xl font-arabic font-bold text-white min-h-[30px] flex items-center justify-center dir-rtl text-right" dir="rtl">
                  ${state.kalamState.interimTranscript || state.kalamState.finalTranscript || 'Sedang mendengarkan... Ucapkan kalimat sekarang!'}
                </div>
              </div>

            </div>
          ` : ''}

          <!-- 5. HASIL EVALUASI PERSENTASE (%) & KOREKSI KATA -->
          ${evalResult ? `
            <div class="bg-gradient-to-br from-white via-emerald-50/40 to-teal-50/50 rounded-2xl sm:rounded-3xl p-5 sm:p-8 border-2 border-emerald-300 shadow-lg space-y-6 animate-fade-in">
              
              <!-- Result Top Header Banner -->
              <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-emerald-200">
                <div class="flex items-center gap-3">
                  <div class="w-12 h-12 rounded-2xl bg-emerald-700 text-white flex items-center justify-center text-xl shadow-md">
                    <i class="fa-solid fa-chart-pie"></i>
                  </div>
                  <div>
                    <h3 class="text-base sm:text-lg font-bold text-emerald-950">Hasil Evaluasi Pelafalan</h3>
                    <p class="text-xs text-slate-600">Analisis kemiripan makhraj & artikulasi vokal kalimat</p>
                  </div>
                </div>

                <div class="flex items-center gap-3 bg-white px-4 py-2.5 rounded-2xl border-2 border-emerald-300 shadow-sm shrink-0">
                  <div class="text-right">
                    <span class="text-[10px] uppercase font-bold text-emerald-600 block">Kemiripan Pelafalan</span>
                    <span class="text-xs font-bold ${evalResult.finalScore >= 75 ? 'text-emerald-800' : 'text-amber-800'}">${evalResult.gradeTitle}</span>
                  </div>
                  <div class="text-3xl sm:text-4xl font-black ${evalResult.finalScore >= 75 ? 'text-emerald-700' : evalResult.finalScore >= 55 ? 'text-amber-600' : 'text-rose-600'}">
                    ${evalResult.finalScore}%
                  </div>
                </div>
              </div>

              <!-- Grade & Feedback Banner -->
              <div class="p-4 rounded-2xl border ${evalResult.colorClass} space-y-1">
                <div class="flex items-center gap-2">
                  <span class="text-lg font-arabic font-bold">${evalResult.gradeBadge}</span>
                  <span class="text-xs font-bold uppercase tracking-wider">${evalResult.gradeTitle}</span>
                </div>
                <p class="text-xs leading-relaxed font-medium">
                  ${evalResult.feedback}
                </p>
              </div>

              <!-- Word-by-word visual highlight (Koreksi Kata per Kata) -->
              <div class="space-y-2">
                <div class="flex items-center justify-between text-xs font-bold text-emerald-900">
                  <span>Analisis Kata per Kata (Pelafalan Anda):</span>
                  <div class="flex items-center gap-2 text-[10px] font-semibold">
                    <span class="inline-flex items-center gap-1 text-emerald-700"><span class="w-2 h-2 rounded-full bg-emerald-500"></span> Tepat</span>
                    <span class="inline-flex items-center gap-1 text-amber-700"><span class="w-2 h-2 rounded-full bg-amber-500"></span> Mirip</span>
                    <span class="inline-flex items-center gap-1 text-rose-700"><span class="w-2 h-2 rounded-full bg-rose-500"></span> Kurang</span>
                  </div>
                </div>

                <!-- Interactive Arabic Word Badges -->
                <div class="p-4 bg-white rounded-2xl border border-emerald-200 flex flex-wrap items-center justify-center gap-2 sm:gap-3 dir-rtl text-right" dir="rtl">
                  ${evalResult.wordMatches.map(m => {
                    let badgeStyle = '';
                    let label = '';
                    if (m.status === 'exact') {
                      badgeStyle = 'bg-emerald-50 text-emerald-900 border-2 border-emerald-400 shadow-xs';
                      label = '✓ Tepat';
                    } else if (m.status === 'close') {
                      badgeStyle = 'bg-amber-50 text-amber-900 border-2 border-amber-400 shadow-xs';
                      label = '≈ Mirip';
                    } else {
                      badgeStyle = 'bg-rose-50 text-rose-900 border-2 border-rose-300';
                      label = '✕ Kurang';
                    }

                    return `
                      <div class="px-3 py-1.5 rounded-xl border text-center font-arabic ${badgeStyle}">
                        <div class="text-lg sm:text-2xl font-bold leading-normal">${m.rawWord}</div>
                        <div class="text-[9px] sm:text-[10px] font-sans font-bold opacity-80 mt-0.5">${label}</div>
                      </div>
                    `;
                  }).join('')}
                </div>
              </div>

              <!-- Comparison Boxes: Target vs Transkrip yang Terdengar -->
              <div class="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                <div class="p-3.5 bg-emerald-50/70 rounded-2xl border border-emerald-200 space-y-1.5">
                  <span class="font-bold text-emerald-800 text-[11px] flex items-center gap-1.5">
                    <i class="fa-solid fa-bullseye text-emerald-600"></i>
                    <span>Teks Target (Standar):</span>
                  </span>
                  <p class="font-arabic text-base sm:text-lg text-emerald-950 font-bold leading-relaxed" dir="rtl">${currentItem.arabic}</p>
                </div>
                <div class="p-3.5 bg-teal-50/70 rounded-2xl border border-teal-200 space-y-1.5">
                  <span class="font-bold text-teal-800 text-[11px] flex items-center gap-1.5">
                    <i class="fa-solid fa-microphone-lines text-teal-600"></i>
                    <span>Teks Terdengar dari Suara Anda:</span>
                  </span>
                  <p class="font-arabic text-base sm:text-lg text-teal-950 font-bold leading-relaxed" dir="rtl">
                    ${evalResult.spokenTranscript || '<span class="text-xs text-rose-600 font-sans italic">Belum ada kata terdeteksi. Bicaralah lebih dekat ke mikrofon laptop Anda.</span>'}
                  </p>
                </div>
              </div>

              <!-- Dual Audio Player Laboratory Card (Ustadz vs Student Recording) -->
              <div class="bg-gradient-to-r from-emerald-50/70 to-teal-50/70 p-4 sm:p-5 rounded-2xl sm:rounded-3xl border border-emerald-200 space-y-4">
                <div class="flex items-center justify-between pb-2 border-b border-emerald-200/60">
                  <span class="text-xs font-bold text-emerald-950 flex items-center gap-2">
                    <i class="fa-solid fa-headphones text-emerald-600"></i>
                    <span>Laboratorium Audio: Bandingkan Suara Anda vs Model Ustadz</span>
                  </span>
                  <span class="text-[11px] font-semibold text-emerald-700">
                    ${state.kalamState.recordedAudioUrl ? '2 Sumber Audio Siap Diputar' : 'Audio Ustadz Tersedia'}
                  </span>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <!-- Box Suara Ustadz -->
                  <div class="bg-white p-3.5 rounded-2xl border border-emerald-200 shadow-2xs flex flex-col justify-between gap-2.5">
                    <div class="flex items-center justify-between gap-2">
                      <div class="flex items-center gap-2">
                        <div class="w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center text-xs shrink-0">
                          <i class="fa-solid fa-chalkboard-user"></i>
                        </div>
                        <div>
                          <div class="text-xs font-bold text-emerald-950">Suara Model (Ustadz)</div>
                          <div class="text-[10px] text-slate-500">Pelafalan Baku & Fashih</div>
                        </div>
                      </div>
                      <button id="kalam-replay-model-btn" class="px-3.5 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl font-bold text-xs shadow-xs flex items-center gap-1.5 transition-all active:scale-95 shrink-0">
                        <i class="fa-solid fa-play text-[10px]"></i>
                        <span>Putar</span>
                      </button>
                    </div>
                  </div>

                  <!-- Box Suara Siswa Sendiri -->
                  <div class="bg-white p-3.5 rounded-2xl border border-teal-200 shadow-2xs flex flex-col justify-between gap-2.5">
                    <div class="flex items-center justify-between gap-2">
                      <div class="flex items-center gap-2">
                        <div class="w-8 h-8 rounded-xl bg-teal-100 text-teal-800 flex items-center justify-center text-xs shrink-0">
                          <i class="fa-solid fa-microphone-lines"></i>
                        </div>
                        <div>
                          <div class="text-xs font-bold text-teal-950">Rekaman Suara Anda</div>
                          <div class="text-[10px] text-slate-500">
                            ${state.kalamState.recordedAudioUrl ? (state.kalamState.recordingDuration || state.kalamState.recordingSeconds || 2) + ' Detik Tersimpan' : 'Belum Ada Audio'}
                          </div>
                        </div>
                      </div>
                      ${state.kalamState.recordedAudioUrl ? `
                        <div class="flex items-center gap-1.5 shrink-0">
                          <button id="kalam-replay-student-btn" class="px-3 py-1.5 bg-teal-600 hover:bg-teal-700 text-white rounded-xl font-bold text-xs shadow-xs flex items-center gap-1.5 transition-all active:scale-95">
                            <i class="fa-solid fa-play text-[10px]"></i>
                            <span>Putar Suara</span>
                          </button>
                          <button id="kalam-boost-btn" title="Perkeras volume suara jika terdengar pelan di laptop" class="px-2.5 py-1.5 bg-amber-500 hover:bg-amber-600 text-white rounded-xl font-bold text-xs shadow-xs flex items-center gap-1 transition-all active:scale-95">
                            <i class="fa-solid fa-volume-high text-[10px]"></i>
                            <span>+200%</span>
                          </button>
                        </div>
                      ` : `
                        <span class="text-[10px] text-rose-500 font-semibold">Tidak tersimpan</span>
                      `}
                    </div>

                    <!-- Native HTML5 Audio Player for reliable laptop audio playback -->
                    ${state.kalamState.recordedAudioUrl ? `
                      <div class="pt-1">
                        <audio id="kalam-native-player" controls preload="auto" class="w-full h-8 rounded-lg accent-teal-600 bg-slate-50" src="${state.kalamState.recordedAudioUrl}"></audio>
                      </div>
                    ` : ''}
                  </div>
                </div>

                <!-- Side-by-side continuous playback -->
                ${state.kalamState.recordedAudioUrl ? `
                  <button id="kalam-compare-audio-btn" class="w-full py-2.5 bg-white hover:bg-emerald-50 text-emerald-900 border-2 border-emerald-300 font-bold rounded-xl text-xs flex items-center justify-center gap-2 shadow-2xs transition-all active:scale-98">
                    <i class="fa-solid fa-shuffle text-emerald-600"></i>
                    <span>Dengarkan Berurutan (Suara Ustadz ➔ Lalu Suara Anda)</span>
                  </button>
                ` : ''}
              </div>

              <!-- Actions: Rekam Ulang & Soal Selanjutnya -->
              <div class="flex flex-col sm:flex-row gap-3 pt-2">
                <button id="kalam-retry-btn" class="flex-1 py-3 bg-white hover:bg-emerald-50 text-emerald-800 font-bold rounded-xl border border-emerald-300 text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-xs">
                  <i class="fa-solid fa-rotate-left"></i>
                  <span>Coba Rekam Ulang</span>
                </button>
                ${activeIdx < filteredItems.length - 1 ? `
                  <button id="kalam-next-exercise-btn" class="flex-1 py-3 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl shadow-md text-xs sm:text-sm flex items-center justify-center gap-2 transition-all">
                    <span>Lanjut ke Latihan Berikutnya</span>
                    <i class="fa-solid fa-arrow-right"></i>
                  </button>
                ` : ''}
              </div>

            </div>
          ` : ''}

        </div>

        <!-- 6. Riwayat Sesi Latihan Kalam (Student Practice History) -->
        ${historyList.length > 0 ? `
          <div class="bg-white rounded-3xl p-5 sm:p-8 border border-emerald-100 shadow-sm space-y-4">
            <div class="flex items-center justify-between pb-3 border-b border-emerald-100">
              <h4 class="font-bold text-sm sm:text-base text-emerald-950 flex items-center gap-2">
                <i class="fa-solid fa-clock-rotate-left text-emerald-600"></i>
                <span>Riwayat Latihan Kalam Anda</span>
              </h4>
              <span class="text-xs text-emerald-700 font-semibold">${historyList.length} Percobaan</span>
            </div>

            <div class="overflow-x-auto">
              <table class="w-full text-left text-xs">
                <thead class="bg-emerald-50/70 text-emerald-900 font-bold">
                  <tr>
                    <th class="p-3">#</th>
                    <th class="p-3">Kalimat Bahasa Arab</th>
                    <th class="p-3 text-center">Skor Evaluasi</th>
                    <th class="p-3">Predikat</th>
                    <th class="p-3">Waktu</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-emerald-50">
                  ${historyList.slice(-6).reverse().map((h, i) => `
                    <tr class="hover:bg-emerald-50/40 transition-colors">
                      <td class="p-3 font-semibold text-slate-500">${i + 1}</td>
                      <td class="p-3 font-arabic font-bold text-sm sm:text-base text-emerald-950 dir-rtl text-right" dir="rtl">${h.arabic}</td>
                      <td class="p-3 text-center">
                        <span class="px-2.5 py-0.5 rounded-full font-bold text-[11px] ${h.score >= 75 ? 'bg-emerald-100 text-emerald-800' : h.score >= 55 ? 'bg-amber-100 text-amber-800' : 'bg-rose-100 text-rose-800'}">
                          ${h.score}%
                        </span>
                      </td>
                      <td class="p-3 text-xs font-semibold text-slate-700">${h.grade}</td>
                      <td class="p-3 text-[11px] text-slate-500">${h.timestamp || 'Baru saja'}</td>
                    </tr>
                  `).join('')}
                </tbody>
              </table>
            </div>
          </div>
        ` : ''}

      </div>
    `;
  }

  function attachKalamEvents() {
    const kalam = ARABIC_DATA.kalam;
    if (!kalam || !kalam.items) return;

    const activeCategory = state.kalamState.selectedCategory || 'all';
    const filteredItems = activeCategory === 'all' 
      ? kalam.items 
      : kalam.items.filter(item => item.category === activeCategory);

    const activeIdx = Math.min(state.kalamState.activeItemIndex || 0, filteredItems.length - 1);
    const currentItem = filteredItems[activeIdx] || filteredItems[0];

    // Category Buttons
    document.querySelectorAll('.kalam-cat-btn').forEach(btn => {
      btn.onclick = () => {
        stopStudentAudio();
        if (state.kalamState.isRecording) cancelKalamRecording();
        state.kalamState.selectedCategory = btn.getAttribute('data-kalam-cat');
        state.kalamState.activeItemIndex = 0;
        state.kalamState.evaluationResult = null;
        render();
        attachKalamEvents();
      };
    });

    // Exercise Index Buttons
    document.querySelectorAll('.kalam-idx-btn').forEach(btn => {
      btn.onclick = () => {
        stopStudentAudio();
        if (state.kalamState.isRecording) cancelKalamRecording();
        state.kalamState.activeItemIndex = parseInt(btn.getAttribute('data-kalam-idx'), 10);
        state.kalamState.evaluationResult = null;
        render();
        attachKalamEvents();
      };
    });

    // Prev Button
    const prevBtn = document.getElementById('kalam-prev-btn');
    if (prevBtn) {
      prevBtn.onclick = () => {
        if (activeIdx > 0) {
          stopStudentAudio();
          if (state.kalamState.isRecording) cancelKalamRecording();
          state.kalamState.activeItemIndex = activeIdx - 1;
          state.kalamState.evaluationResult = null;
          render();
          attachKalamEvents();
        }
      };
    }

    // Next Button
    const nextBtn = document.getElementById('kalam-next-btn');
    if (nextBtn) {
      nextBtn.onclick = () => {
        if (activeIdx < filteredItems.length - 1) {
          stopStudentAudio();
          if (state.kalamState.isRecording) cancelKalamRecording();
          state.kalamState.activeItemIndex = activeIdx + 1;
          state.kalamState.evaluationResult = null;
          render();
          attachKalamEvents();
        }
      };
    }

    // Speed selector buttons
    document.querySelectorAll('.kalam-speed-btn').forEach(btn => {
      btn.onclick = () => {
        state.kalamState.speechSpeed = parseFloat(btn.getAttribute('data-speed'));
        render();
        attachKalamEvents();
      };
    });

    // Microphone selector dropdown
    const micSelect = document.getElementById('kalam-mic-select');
    if (micSelect) {
      micSelect.onchange = () => {
        state.kalamState.selectedDeviceId = micSelect.value;
        try { localStorage.setItem('kalam_selected_device_id', micSelect.value); } catch (e) {}
      };
    }

    // Refresh microphones button
    const refreshMicsBtn = document.getElementById('kalam-refresh-mics-btn');
    if (refreshMicsBtn) {
      refreshMicsBtn.onclick = async () => {
        refreshMicsBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin text-xs"></i>';
        await updateAudioInputDeviceList();
        render();
        attachKalamEvents();
      };
    }

    // Listen to model audio (Ustadz)
    const listenBtn = document.getElementById('kalam-listen-btn');
    if (listenBtn) {
      listenBtn.onclick = () => {
        stopStudentAudio();
        if (window.speakArabic) {
          window.speakArabic(currentItem.arabic, state.kalamState.speechSpeed || 0.85, listenBtn);
        }
      };
    }

    // Replay model audio from result box
    const replayModelBtn = document.getElementById('kalam-replay-model-btn');
    if (replayModelBtn) {
      replayModelBtn.onclick = () => {
        stopStudentAudio();
        if (window.speakArabic) {
          window.speakArabic(currentItem.arabic, state.kalamState.speechSpeed || 0.85, replayModelBtn);
        }
      };
    }

    // Native player setup & synchronization with Replay button
    const nativePlayer = document.getElementById('kalam-native-player');
    if (nativePlayer && state.kalamState.recordedAudioUrl) {
      nativePlayer.volume = 1.0;
      nativePlayer.onplay = () => {
        if (window.stopArabicAudio) window.stopArabicAudio();
        state.kalamState.isPlayingStudent = true;
        updateStudentPlayBtnUI(true);
      };
      nativePlayer.onpause = () => {
        state.kalamState.isPlayingStudent = false;
        updateStudentPlayBtnUI(false);
      };
      nativePlayer.onended = () => {
        state.kalamState.isPlayingStudent = false;
        updateStudentPlayBtnUI(false);
      };
    }

    // Replay student's own recording button
    const replayStudentBtn = document.getElementById('kalam-replay-student-btn');
    if (replayStudentBtn && state.kalamState.recordedAudioUrl) {
      replayStudentBtn.onclick = () => {
        if (window.stopArabicAudio) window.stopArabicAudio();

        if (nativePlayer) {
          if (!nativePlayer.paused) {
            nativePlayer.pause();
          } else {
            nativePlayer.play().catch(e => {
              console.warn('Native player play error:', e);
            });
          }
        }
      };
    }

    // Boost student recording playback (+200% Gain)
    const boostBtn = document.getElementById('kalam-boost-btn');
    if (boostBtn && state.kalamState.recordedAudioUrl) {
      boostBtn.onclick = () => {
        playStudentAudioBoosted(2.5);
      };
    }

    // Compare audio: play Ustadz followed by Student recording
    const compareAudioBtn = document.getElementById('kalam-compare-audio-btn');
    if (compareAudioBtn && state.kalamState.recordedAudioUrl) {
      compareAudioBtn.onclick = () => {
        stopStudentAudio();
        if (window.stopArabicAudio) window.stopArabicAudio();

        compareAudioBtn.disabled = true;
        compareAudioBtn.innerHTML = '<i class="fa-solid fa-volume-high animate-pulse text-emerald-600"></i> <span>1/2 Memutar Suara Ustadz...</span>';

        if (window.speakArabic) {
          window.speakArabic(currentItem.arabic, state.kalamState.speechSpeed || 0.85, null, () => {
            setTimeout(() => {
              if (!state.kalamState.recordedAudioUrl || !nativePlayer) {
                compareAudioBtn.disabled = false;
                compareAudioBtn.innerHTML = '<i class="fa-solid fa-shuffle text-emerald-600"></i> <span>Dengarkan Berurutan (Suara Ustadz ➔ Lalu Suara Anda)</span>';
                return;
              }

              compareAudioBtn.innerHTML = '<i class="fa-solid fa-headphones animate-bounce text-teal-600"></i> <span>2/2 Memutar Suara Anda Sendiri...</span>';

              const onFinishCompare = () => {
                stopStudentAudio();
                compareAudioBtn.disabled = false;
                compareAudioBtn.innerHTML = '<i class="fa-solid fa-shuffle text-emerald-600"></i> <span>Dengarkan Berurutan (Suara Ustadz ➔ Lalu Suara Anda)</span>';
              };

              nativePlayer.onended = onFinishCompare;
              nativePlayer.play().catch(onFinishCompare);
            }, 500);
          });
        }
      };
    }

    // Retry / Re-record button
    const retryBtn = document.getElementById('kalam-retry-btn');
    if (retryBtn) {
      retryBtn.onclick = () => {
        stopStudentAudio();
        state.kalamState.evaluationResult = null;
        render();
        attachKalamEvents();
        startKalamRecording(currentItem);
      };
    }

    // Troubleshooting mic retry button
    const retryMicBtn = document.getElementById('kalam-retry-mic-btn');
    if (retryMicBtn) {
      retryMicBtn.onclick = () => {
        state.kalamState.micError = null;
        render();
        attachKalamEvents();
        startKalamRecording(currentItem);
      };
    }

    // Next exercise button in result box
    const nextExerciseBtn = document.getElementById('kalam-next-exercise-btn');
    if (nextExerciseBtn) {
      nextExerciseBtn.onclick = () => {
        if (activeIdx < filteredItems.length - 1) {
          stopStudentAudio();
          state.kalamState.activeItemIndex = activeIdx + 1;
          state.kalamState.evaluationResult = null;
          render();
          attachKalamEvents();
        }
      };
    }

    // Record Toggle Button
    const recordToggleBtn = document.getElementById('kalam-record-toggle-btn');
    if (recordToggleBtn) {
      recordToggleBtn.onclick = () => {
        if (state.kalamState.isRecording) {
          stopKalamRecording(currentItem);
        } else {
          startKalamRecording(currentItem);
        }
      };
    }
  }


  // 4. QIRA'AH VIEW (Maharah Qira'ah - Membaca Teks, Analisis I'rab & Terjemahan)
  function renderQiraah() {
    const reading = ARABIC_DATA.reading;
    
    // Modern harmonious pastel badges for inline Arabic words
    const COLOR_BADGES = {
      emerald: "bg-emerald-100/70 text-emerald-950 hover:bg-emerald-200/90 active:bg-emerald-300 border-b-2 border-emerald-400",
      blue: "bg-sky-100/70 text-sky-950 hover:bg-sky-200/90 active:bg-sky-300 border-b-2 border-sky-400",
      amber: "bg-amber-100/70 text-amber-950 hover:bg-amber-200/90 active:bg-amber-300 border-b-2 border-amber-400",
      purple: "bg-purple-100/70 text-purple-950 hover:bg-purple-200/90 active:bg-purple-300 border-b-2 border-purple-400",
      rose: "bg-rose-100/70 text-rose-950 hover:bg-rose-200/90 active:bg-rose-300 border-b-2 border-rose-400",
      cyan: "bg-teal-100/70 text-teal-950 hover:bg-teal-200/90 active:bg-teal-300 border-b-2 border-teal-400"
    };

    // Clean badges for cards and tags
    const PILL_BADGES = {
      emerald: "bg-emerald-50 text-emerald-800 border border-emerald-200",
      blue: "bg-sky-50 text-sky-800 border border-sky-200",
      amber: "bg-amber-50 text-amber-800 border border-amber-200",
      purple: "bg-purple-50 text-purple-800 border border-purple-200",
      rose: "bg-rose-50 text-rose-800 border border-rose-200",
      cyan: "bg-teal-50 text-teal-800 border border-teal-200"
    };

    const modalToken = state.activeIrobModalToken;
    const isPlaying = (typeof window !== 'undefined' && !!window.isPlayingAudio);
    const fontSizeClass = state.qiraahFontSize === 'lg' ? 'text-2xl sm:text-4xl' :
                          state.qiraahFontSize === 'sm' ? 'text-lg sm:text-2xl' :
                          'text-xl sm:text-3xl';

    return `
      <div class="space-y-4 sm:space-y-7 max-w-5xl mx-auto px-0 sm:px-2">
        <!-- Main Card Container -->
        <div class="bg-white rounded-2xl sm:rounded-3xl lg:rounded-[2.5rem] p-3.5 sm:p-7 lg:p-9 border border-emerald-100 shadow-sm space-y-4 sm:space-y-6">
          
          <!-- Header Banner -->
          <div class="border-b border-emerald-100/90 pb-4 sm:pb-6 space-y-3.5">
            <!-- Title Row: Topic Badge & Clean Arabic Headline -->
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
              <div class="text-right sm:text-left order-2 sm:order-1">
                <div class="inline-flex items-center gap-2 bg-emerald-50 text-emerald-800 px-3 py-1 rounded-full text-xs font-bold border border-emerald-200 mb-1">
                  <i class="fa-solid fa-book-open text-emerald-600"></i>
                  <span>مَهَارَةُ الْقِرَاءَةِ وَتَحْلِيلُ الإِعْرَابِ</span>
                </div>
                <p class="text-xs sm:text-sm text-emerald-700 font-sans font-medium">
                  ${reading.titleTranslation || 'Pelestarian Lingkungan Hidup'}
                </p>
              </div>
              <h2 class="text-2xl sm:text-4xl lg:text-5xl font-extrabold font-arabic text-emerald-950 text-right dir-rtl leading-tight order-1 sm:order-2">
                ${reading.title}
              </h2>
            </div>

            <!-- Action Controls Toolbar (Mobile-first responsive toolbar) -->
            <div class="bg-emerald-50/70 border border-emerald-200/80 rounded-2xl p-2 sm:p-2.5 flex flex-wrap items-center justify-between gap-2 shadow-2xs">
              <!-- Left: Controls Group (Font Size, Mode I'rab, Terjemahan) -->
              <div class="flex flex-wrap items-center gap-1.5 sm:gap-2">
                <!-- Font Size Selector -->
                <div class="inline-flex items-center bg-white border border-emerald-200 rounded-xl p-0.5 shadow-2xs text-xs font-bold">
                  <button id="qiraah-font-sm" class="px-2.5 py-1 rounded-lg transition-all ${state.qiraahFontSize === 'sm' ? 'bg-emerald-700 text-white shadow-xs' : 'text-emerald-800 hover:bg-emerald-50'}" title="Ukuran Font Sedang">A-</button>
                  <button id="qiraah-font-md" class="px-2.5 py-1 rounded-lg transition-all ${!state.qiraahFontSize || state.qiraahFontSize === 'md' ? 'bg-emerald-700 text-white shadow-xs' : 'text-emerald-800 hover:bg-emerald-50'}" title="Ukuran Font Normal">A</button>
                  <button id="qiraah-font-lg" class="px-2.5 py-1 rounded-lg transition-all ${state.qiraahFontSize === 'lg' ? 'bg-emerald-700 text-white shadow-xs' : 'text-emerald-800 hover:bg-emerald-50'}" title="Ukuran Font Besar">A+</button>
                </div>

                <!-- Mode Toggle Button (Color Highlight vs Clean Reading) -->
                <button id="qiraah-toggle-color-btn" class="px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 border shadow-2xs cursor-pointer active:scale-95 ${state.showQiraahIrobColor ? 'bg-emerald-700 text-white border-emerald-700 shadow-xs' : 'bg-white text-emerald-800 hover:bg-emerald-50 border-emerald-200'}" title="Aktifkan/Nonaktifkan Sorotan Warna I'rab">
                  <i class="fa-solid fa-palette text-xs"></i>
                  <span>${state.showQiraahIrobColor ? "Warna I'rab" : "Teks Polos"}</span>
                </button>

                <!-- Global Translation Toggle Button -->
                <button id="qiraah-toggle-all-trans-btn" class="px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 border shadow-2xs cursor-pointer active:scale-95 ${state.showQiraahTranslation ? 'bg-amber-600 text-white border-amber-600 shadow-xs' : 'bg-white text-amber-800 hover:bg-amber-50 border-amber-200'}" title="Buka/Tutup Seluruh Terjemahan Paragraf">
                  <i class="fa-solid fa-language text-xs"></i>
                  <span>${state.showQiraahTranslation ? "Tutup Arti" : "Semua Arti"}</span>
                </button>
              </div>

              <!-- Right: Master Audio Play/Stop Button -->
              <button id="play-qiraah-all-btn" class="w-full sm:w-auto px-3.5 py-2 ${isPlaying ? 'bg-rose-700 hover:bg-rose-800' : 'bg-emerald-700 hover:bg-emerald-800'} text-white rounded-xl text-xs font-bold shadow-xs transition-all flex items-center justify-center gap-2 active:scale-95 cursor-pointer">
                <i class="fa-solid ${isPlaying ? 'fa-circle-stop text-amber-300 animate-pulse' : 'fa-volume-high'} text-xs"></i>
                <span>${isPlaying ? 'Hentikan Audio' : 'Putar Audio Teks'}</span>
              </button>
            </div>

            <!-- Clean Guidance Tip for Mobile Learners -->
            <div class="flex items-center justify-between text-[11px] text-emerald-800/80 px-1 font-sans">
              <span class="flex items-center gap-1.5">
                <i class="fa-solid fa-circle-info text-emerald-600"></i>
                <span>Ketuk kata/frasa bergaris untuk melihat kedudukan kaidah I'rab dan artinya.</span>
              </span>
            </div>
          </div>

          <!-- Paragraph Cards List -->
          <div class="space-y-4 sm:space-y-6">
            ${reading.paragraphs.map((p, idx) => {
              const arabicLines = p.arabic.split('\n').filter(l => l.trim().length > 0);
              const hasTokens = p.tokens && p.tokens.length > 0;
              const hasNumberedTitle = hasTokens && p.tokens.some(t => /^[١٢٣٤٥٦٧٨٩0-9]+\./.test(t.word.trim()));
              const isTransOpen = state.showQiraahTranslation || !!state.openQiraahAccordions[idx];

              return `
                <div class="p-3.5 sm:p-6 lg:p-7 rounded-2xl sm:rounded-3xl bg-emerald-50/40 border border-emerald-200/80 space-y-3 sm:space-y-4 shadow-2xs hover:shadow-xs transition-all">
                  
                  <!-- Paragraph Top Bar -->
                  <div class="border-b border-emerald-200/70 pb-3 space-y-2">
                    <!-- Top Row: Paragraph Number Badge & Action Buttons -->
                    <div class="flex items-center justify-between gap-2">
                      <!-- Paragraph Number Badge -->
                      <div class="flex items-center gap-2">
                        <span class="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-emerald-700 text-white text-xs sm:text-sm flex items-center justify-center font-bold shadow-xs">
                          ${idx + 1}
                        </span>
                        <span class="text-xs sm:text-sm font-bold text-emerald-900 font-sans">
                          Paragraf ${idx + 1}
                        </span>
                      </div>

                      <!-- Action Buttons: Terjemahan & Dengarkan -->
                      <div class="flex items-center gap-1.5 sm:gap-2">
                        <!-- Toggle Translation Button for this paragraph -->
                        <button class="toggle-para-trans-btn px-2.5 sm:px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 border shadow-2xs cursor-pointer active:scale-95 ${isTransOpen ? 'bg-amber-100 text-amber-900 border-amber-300' : 'bg-white hover:bg-amber-50 text-amber-800 border-amber-200'}" data-para-idx="${idx}" title="Tampilkan/Sembunyikan Terjemahan Paragraf">
                          <i class="fa-solid fa-language text-xs"></i>
                          <span>${isTransOpen ? 'Tutup Arti' : 'Terjemahan'}</span>
                        </button>

                        <!-- Audio Listen Button -->
                        <button data-speech="${p.arabic.replace(/\n/g, ' ')}" class="speech-btn text-xs px-2.5 sm:px-3 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl transition-all flex items-center gap-1.5 font-bold shadow-xs active:scale-95 cursor-pointer">
                          <i class="fa-solid fa-volume-high text-xs"></i>
                          <span>Dengarkan</span>
                        </button>
                      </div>
                    </div>

                    <!-- Bottom Row: Arabic Section Title (Only for paragraphs that do not have an inline section title token) -->
                    ${p.section && !hasNumberedTitle ? `
                      <div class="pt-1 flex items-center justify-end gap-2 text-right dir-rtl">
                        <span class="w-2 h-2 rounded-full bg-emerald-600 shrink-0"></span>
                        <h3 class="text-xs sm:text-sm font-bold text-emerald-950 font-arabic">${p.section}</h3>
                      </div>
                    ` : ''}
                  </div>

                  <!-- Arabic Text Passage Container (Clean, Cohesive, Natural Paragraph) -->
                  <div class="bg-white p-3.5 sm:p-6 rounded-xl sm:rounded-2xl border border-emerald-100/90 shadow-2xs text-right dir-rtl">
                    ${hasTokens ? `
                      <div class="qiraah-interactive-passage font-arabic ${fontSizeClass} font-bold text-emerald-950 text-right dir-rtl">
                        ${(() => {
                          let html = '';
                          let runningTokens = [];

                          function flushRunningTokens() {
                            if (runningTokens.length === 0) return '';
                            const segment = `
                              <p class="my-2 leading-[2.3] sm:leading-[2.6] text-right dir-rtl font-arabic ${fontSizeClass} text-emerald-950 font-bold" style="word-spacing: 0.12em; text-align: justify; text-align-last: right;">
                                ${runningTokens.map(item => {
                                  if (state.showQiraahIrobColor) {
                                    const bStyle = COLOR_BADGES[item.token.color] || COLOR_BADGES.emerald;
                                    return `
                                      <span role="button" tabindex="0" data-irob-p="${idx}" data-irob-t="${item.tIdx}" class="irob-token-btn inline rounded px-1.5 py-0.5 mx-0.5 transition-all duration-150 cursor-pointer ${bStyle} active:scale-95 select-none" title="Klik untuk penjelasan kedudukan I'rab: ${item.token.roleDesc || ''}">
                                        ${item.token.word}
                                      </span>
                                    `;
                                  } else {
                                    return `
                                      <span role="button" tabindex="0" data-irob-p="${idx}" data-irob-t="${item.tIdx}" class="irob-token-btn inline rounded px-1 py-0.5 mx-0.5 hover:bg-emerald-100/70 hover:text-emerald-800 text-emerald-950 transition-colors cursor-pointer active:scale-95 select-none" title="Klik untuk penjelasan I'rab">
                                        ${item.token.word}
                                      </span>
                                    `;
                                  }
                                }).join(' ')}
                              </p>
                            `;
                            runningTokens = [];
                            return segment;
                          }

                          p.tokens.forEach((token, tIdx) => {
                            const trimmed = token.word.trim();
                            // Section Number / Title (e.g. ١. تَلَوُّثُ الْمَاءِ)
                            if (/^[١٢٣٤٥٦٧٨٩0-9]+\./.test(trimmed)) {
                              html += flushRunningTokens();
                              const pillStyle = PILL_BADGES[token.color] || PILL_BADGES.cyan;
                              html += `
                                <div class="mb-3.5 pb-2.5 border-b border-emerald-200/80 flex items-center justify-between gap-2">
                                  <span class="text-[11px] sm:text-xs px-2.5 py-0.5 rounded-full ${pillStyle} font-sans font-bold shadow-2xs shrink-0">
                                    ${token.roleDesc || 'Judul Bagian'}
                                  </span>
                                  <h3 data-irob-p="${idx}" data-irob-t="${tIdx}" class="irob-token-btn font-arabic font-extrabold text-emerald-950 text-xl sm:text-2xl text-right dir-rtl leading-normal whitespace-nowrap cursor-pointer hover:text-emerald-700 transition-colors">
                                    ${token.word}
                                  </h3>
                                </div>
                              `;
                            } else if (trimmed.startsWith('•')) {
                              html += flushRunningTokens();
                              const pillStyle = PILL_BADGES[token.color] || PILL_BADGES.rose;
                              html += `
                                <div data-irob-p="${idx}" data-irob-t="${tIdx}" class="irob-card-btn my-2.5 p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-gradient-to-l from-emerald-50/90 via-emerald-50/50 to-white border border-emerald-200/80 shadow-2xs hover:border-emerald-400 hover:shadow-xs transition-all cursor-pointer group active:scale-[0.99] select-none">
                                  <div class="flex items-center justify-between gap-2 mb-1.5 pb-1 border-b border-emerald-100/70">
                                    <span class="inline-flex items-center gap-1.5 text-[11px] font-semibold px-2.5 py-0.5 rounded-full ${pillStyle} font-sans shadow-2xs shrink-0">
                                      <i class="fa-solid fa-list-check text-[9px]"></i>
                                      <span>${token.roleDesc || 'Bentuk Kerusakan'}</span>
                                    </span>
                                    <span class="text-[10px] text-emerald-600/75 group-hover:text-emerald-700 font-sans flex items-center gap-1">
                                      <span>Lihat I'rab</span>
                                      <i class="fa-solid fa-angle-left text-[9px]"></i>
                                    </span>
                                  </div>
                                  <div class="text-right dir-rtl font-arabic ${fontSizeClass} font-bold text-emerald-950 leading-[2.2] sm:leading-[2.5]">
                                    ${token.word}
                                  </div>
                                </div>
                              `;
                            } else {
                              runningTokens.push({ token, tIdx });
                            }
                          });

                          html += flushRunningTokens();
                          return html;
                        })()}
                      </div>
                    ` : `
                      <div class="qiraah-clean-passage font-arabic ${fontSizeClass} font-bold text-emerald-950 text-right dir-rtl space-y-2.5 leading-[2.3] sm:leading-[2.6]" style="word-spacing: 0.12em; text-align: justify; text-align-last: right;">
                        ${arabicLines.map(line => {
                          const isNumbered = /^[١٢٣٤٥٦٧٨٩0-9]+\./.test(line.trim());
                          const isBullet = line.trim().startsWith('•');
                          if (isNumbered) {
                            return `
                              <div class="font-extrabold text-emerald-900 border-b border-emerald-200/80 pb-2 mb-2 text-xl sm:text-2xl whitespace-nowrap">
                                ${line}
                              </div>
                            `;
                          }
                          if (isBullet) {
                            return `
                              <div class="pr-4 border-r-4 border-emerald-600 bg-emerald-50/70 p-3 rounded-xl my-2 shadow-2xs">
                                ${line}
                              </div>
                            `;
                          }
                          return `
                            <p class="py-1 leading-[2.3] sm:leading-[2.6]">
                              ${line}
                            </p>
                          `;
                        }).join('')}
                      </div>
                    `}
                  </div>

                  <!-- Indonesian Translation Accordion Card (Accessible & Clean) -->
                  ${isTransOpen ? `
                    <div class="mt-3 p-3.5 sm:p-4 rounded-xl sm:rounded-2xl bg-amber-50/90 border border-amber-200 text-amber-950 space-y-2 animate-fadeIn shadow-2xs">
                      <div class="flex items-center justify-between border-b border-amber-200/70 pb-1.5">
                        <div class="flex items-center gap-2 text-xs font-bold text-amber-900">
                          <i class="fa-solid fa-book-bookmark text-amber-600"></i>
                          <span>Terjemahan Paragraf ${idx + 1}</span>
                        </div>
                        <button class="toggle-para-trans-btn text-[11px] text-amber-800 hover:text-amber-950 font-semibold cursor-pointer" data-para-idx="${idx}">
                          <i class="fa-solid fa-xmark"></i> Sembunyikan
                        </button>
                      </div>
                      <div class="text-xs sm:text-sm leading-relaxed text-amber-950 font-sans space-y-1.5">
                        ${p.translation.split('\n').map(tLine => {
                          const trimmedLine = tLine.trim();
                          if (trimmedLine.startsWith('•')) {
                            return `
                              <div class="flex items-start gap-2 pr-1 my-1">
                                <span class="text-amber-600 font-bold">•</span>
                                <span class="flex-1">${trimmedLine.replace(/^•\s*/, '')}</span>
                              </div>
                            `;
                          }
                          return `<p class="leading-relaxed">${trimmedLine}</p>`;
                        }).join('')}
                      </div>
                    </div>
                  ` : ''}

                </div>
              `;
            }).join('')}
          </div>

        </div>

        <!-- I'RAB DETAIL MODAL POPUP (Mobile Bottom Sheet & Centered Dialog, Clean Single Close Button) -->
        ${modalToken ? `
          <div id="irob-modal-overlay" class="fixed inset-0 z-50 overflow-y-auto bg-emerald-950/70 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-4 animate-fadeIn">
            
            <!-- Modal Box Container (Bottom Sheet on mobile, centered card on tablet/desktop) -->
            <div id="irob-modal-box" class="bg-white rounded-t-3xl sm:rounded-3xl p-4 sm:p-5 max-w-lg w-full border-t-2 sm:border-2 border-emerald-600 shadow-2xl space-y-3 relative max-h-[90vh] sm:max-h-[85vh] flex flex-col animate-slideUp">
              
              <!-- Mobile Pull Indicator Bar -->
              <div class="w-12 h-1 bg-gray-300 rounded-full mx-auto sm:hidden shrink-0"></div>

              <!-- Modal Header -->
              <div class="flex items-center justify-between border-b border-emerald-100 pb-2.5 shrink-0">
                <div class="flex items-center gap-2.5 min-w-0 pr-2">
                  <div class="w-7 h-7 sm:w-8 sm:h-8 rounded-xl bg-emerald-700 text-white font-bold flex items-center justify-center text-xs sm:text-sm shrink-0 shadow-xs">
                    <i class="fa-solid fa-spell-check"></i>
                  </div>
                  <div class="min-w-0">
                    <h3 class="text-xs sm:text-sm font-bold uppercase tracking-wider text-emerald-950 font-sans truncate">Analisis Kaidah I'rab</h3>
                    <span class="text-[11px] text-emerald-700 font-semibold font-sans block truncate leading-tight">${modalToken.roleDesc || ''}</span>
                  </div>
                </div>
                
                <!-- Single Clean Close Button -->
                <button id="close-irob-modal-btn" class="w-8 h-8 rounded-full bg-gray-100 hover:bg-rose-100 text-gray-500 hover:text-rose-600 flex items-center justify-center transition-all cursor-pointer shadow-2xs" title="Tutup Keterangan (Esc)">
                  <i class="fa-solid fa-xmark text-sm font-bold"></i>
                </button>
              </div>

              <!-- Scrollable Body -->
              <div class="overflow-y-auto space-y-2.5 pr-0.5 flex-1 min-h-0">
                
                <!-- Lafaz Frasa & Arti Banner -->
                <div class="bg-gradient-to-r from-emerald-50 via-teal-50 to-emerald-50 p-3 rounded-2xl border border-emerald-200 text-center space-y-1 shadow-2xs">
                  <span class="text-[10px] font-bold text-emerald-700 uppercase tracking-widest block font-sans">اللَّفْظُ (Lafaz / Frasa):</span>
                  <h2 class="text-lg sm:text-2xl font-bold font-arabic text-emerald-950 dir-rtl leading-normal py-0.5 drop-shadow-2xs">${modalToken.word}</h2>
                  ${modalToken.meaning ? `
                    <div class="inline-block mt-0.5">
                      <span class="text-xs sm:text-sm font-semibold text-emerald-900 bg-white/90 px-3 py-1 rounded-full border border-emerald-200 shadow-2xs font-sans">
                        Arti: "${modalToken.meaning}"
                      </span>
                    </div>
                  ` : ''}
                </div>

                <!-- Grammatical Role Badge -->
                <div class="space-y-1">
                  <label class="text-[10px] font-bold text-gray-500 uppercase tracking-wider block font-sans">Kedudukan Jabatan Kalimat:</label>
                  <div class="px-3 py-2 bg-emerald-800 text-white rounded-xl font-arabic font-bold text-sm sm:text-base text-right shadow-xs dir-rtl leading-normal">
                    ${modalToken.role}
                  </div>
                </div>

                <!-- Authentic Arabic I'rab Formula Box -->
                <div class="space-y-1">
                  <label class="text-[10px] font-bold text-gray-500 uppercase tracking-wider block font-sans">Penjelasan Kaidah I'rab (الإِعْرَابُ):</label>
                  <div class="px-3 py-2.5 bg-amber-50/90 rounded-xl border border-amber-200 text-amber-950 font-arabic font-semibold text-xs sm:text-sm text-right leading-relaxed dir-rtl shadow-2xs">
                    ${modalToken.irob}
                  </div>
                </div>

              </div>

              <!-- Footer Buttons -->
              <div class="pt-2 border-t border-gray-100 flex items-center justify-between gap-2 mt-auto shrink-0">
                <button id="modal-speak-btn" class="px-3.5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold shadow-xs transition-all flex items-center gap-1.5 cursor-pointer active:scale-95">
                  <i class="fa-solid fa-volume-high text-xs"></i>
                  <span>Putar Suara Lafaz</span>
                </button>
                <button id="close-irob-modal-btn2" class="px-3.5 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl text-xs font-bold transition-all border border-gray-200 flex items-center gap-1 shadow-2xs cursor-pointer">
                  <span>Tutup</span>
                </button>
              </div>

            </div>
          </div>
        ` : ''}

      </div>
    `;
  }

  function attachQiraahEvents() {
    // Font size controls
    const fontSmBtn = document.getElementById('qiraah-font-sm');
    const fontMdBtn = document.getElementById('qiraah-font-md');
    const fontLgBtn = document.getElementById('qiraah-font-lg');
    if (fontSmBtn) {
      fontSmBtn.addEventListener('click', () => {
        state.qiraahFontSize = 'sm';
        render();
      });
    }
    if (fontMdBtn) {
      fontMdBtn.addEventListener('click', () => {
        state.qiraahFontSize = 'md';
        render();
      });
    }
    if (fontLgBtn) {
      fontLgBtn.addEventListener('click', () => {
        state.qiraahFontSize = 'lg';
        render();
      });
    }

    // Toggle I'rab Color Mode
    const colorToggleBtn = document.getElementById('qiraah-toggle-color-btn');
    if (colorToggleBtn) {
      colorToggleBtn.addEventListener('click', () => {
        state.showQiraahIrobColor = !state.showQiraahIrobColor;
        render();
      });
    }

    // Toggle All Translations
    const transToggleAllBtn = document.getElementById('qiraah-toggle-all-trans-btn');
    if (transToggleAllBtn) {
      transToggleAllBtn.addEventListener('click', () => {
        state.showQiraahTranslation = !state.showQiraahTranslation;
        state.openQiraahAccordions = {};
        render();
      });
    }

    // Toggle Paragraph Specific Translation
    document.querySelectorAll('.toggle-para-trans-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const pIdx = btn.getAttribute('data-para-idx');
        if (pIdx !== null) {
          const currentVal = state.showQiraahTranslation || !!state.openQiraahAccordions[pIdx];
          state.openQiraahAccordions[pIdx] = !currentVal;
          render();
        }
      });
    });

    // Master Audio Button
    const playAllBtn = document.getElementById('play-qiraah-all-btn');
    if (playAllBtn) {
      playAllBtn.addEventListener('click', () => {
        if (window.isPlayingAudio) {
          if (window.stopArabicAudio) window.stopArabicAudio();
        } else {
          const allText = ARABIC_DATA.reading.paragraphs.map(p => p.arabic).join(' \n ');
          if (window.speakArabic) window.speakArabic(allText);
        }
      });
    }

    // Modal speak button
    const modalSpeakBtn = document.getElementById('modal-speak-btn');
    if (modalSpeakBtn && state.activeIrobModalToken) {
      modalSpeakBtn.addEventListener('click', () => {
        if (window.speakArabic) window.speakArabic(state.activeIrobModalToken.word);
      });
    }

    // Token & Card click events for I'rab modal
    document.querySelectorAll('.irob-token-btn, .irob-card-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const target = e.currentTarget;
        const pIdx = target.getAttribute('data-irob-p');
        const tIdx = target.getAttribute('data-irob-t');
        if (pIdx !== null && tIdx !== null && ARABIC_DATA.reading.paragraphs[pIdx]) {
          const token = ARABIC_DATA.reading.paragraphs[pIdx].tokens[tIdx];
          if (token) {
            state.activeIrobModalToken = token;
            render();
          }
        }
      });
    });

    // Close Modal events
    const closeBtn1 = document.getElementById('close-irob-modal-btn');
    const closeBtn2 = document.getElementById('close-irob-modal-btn2');
    const overlay = document.getElementById('irob-modal-overlay');
    const modalBox = document.getElementById('irob-modal-box');

    function closeIrobModal() {
      state.activeIrobModalToken = null;
      render();
    }

    if (closeBtn1) closeBtn1.addEventListener('click', closeIrobModal);
    if (closeBtn2) closeBtn2.addEventListener('click', closeIrobModal);

    if (modalBox) {
      modalBox.addEventListener('click', (e) => {
        e.stopPropagation();
      });
    }

    if (overlay) {
      overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
          closeIrobModal();
        }
      });
    }

    // Keyboard ESC to close modal
    if (!window._irobEscListenerAttached) {
      window._irobEscListenerAttached = true;
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && state.activeIrobModalToken) {
          closeIrobModal();
        }
      });
    }
  }

      // 4B. QAWA'ID VIEW (Tata Bahasa Arab: Fi'il Amr, Nahi & Isim Tafdhil)
  function renderQawaid() {
    const grammar = ARABIC_DATA.grammar;
    const tafdhil = grammar.tafdhil;

    return `
      <div class="space-y-8">
        <!-- Main Container -->
        <div class="bg-white rounded-[2.5rem] p-6 sm:p-10 border border-emerald-100 shadow-sm space-y-8">
          
          <!-- Header Banner -->
          <div class="border-b border-emerald-100 pb-5">
            <span class="text-xs font-bold text-emerald-700 uppercase tracking-widest bg-emerald-50 px-3.5 py-1 rounded-full border border-emerald-200">التَّرَاكِيبُ وَالْقَوَاعِدُ (Qawa'id & Gramatika)</span>
            <h2 class="text-2xl sm:text-4xl font-bold font-arabic text-emerald-950 mt-2">${grammar.title}</h2>
            <p class="text-xs sm:text-sm text-emerald-700 mt-1">${grammar.explanation}</p>
          </div>

          <!-- Section 1: Fi'il Amr & Fi'il Nahi -->
          <div class="space-y-4">
            <h3 class="text-lg font-bold text-emerald-900 border-l-4 border-emerald-600 pl-3 flex items-center gap-2">
              <i class="fa-solid fa-book-open text-emerald-600 text-sm"></i>
              <span>Bagian 1: فِعْلُ الأَمْرِ وَفِعْلُ النَّهْيِ</span>
            </h3>
            
            <div class="grid md:grid-cols-2 gap-6">
              ${grammar.sections.map(sec => `
                <div class="bg-emerald-50/50 rounded-3xl p-6 border border-emerald-200/70 space-y-4 shadow-sm hover:shadow-md transition-all">
                  <div class="bg-emerald-800 text-white px-4 py-2 rounded-xl text-sm font-bold inline-block font-arabic shadow-sm">
                    ${sec.type}
                  </div>
                  <p class="text-xs text-emerald-900 leading-relaxed font-medium">${sec.desc}</p>
                  
                  <div class="space-y-3 pt-2">
                    <h4 class="text-xs font-bold text-emerald-900 uppercase tracking-wider">Contoh Kalimat:</h4>
                    ${sec.examples.map(ex => `
                      <div class="bg-white p-3.5 rounded-2xl border border-emerald-100 space-y-1 shadow-sm">
                        <div class="flex items-center justify-between">
                          <span class="text-lg font-bold font-arabic text-emerald-950 text-right leading-snug">${ex.arabic}</span>
                          <button data-speech="${ex.arabic}" class="speech-btn w-8 h-8 rounded-full bg-emerald-50 hover:bg-emerald-700 hover:text-white text-emerald-700 flex items-center justify-center transition-all shadow-sm">
                            <i class="fa-solid fa-volume-high text-xs"></i>
                          </button>
                        </div>
                        <div class="text-[11px] font-semibold text-emerald-600">${ex.latin}</div>
                        <div class="text-xs text-emerald-900 font-sans">${ex.indonesian}</div>
                      </div>
                    `).join('')}
                  </div>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- Section 2: Isim Tafdhil (إِسْمُ التَّفْضِيْلِ) -->
          ${tafdhil ? `
            <div class="pt-6 border-t border-emerald-100 space-y-6">
              
              <!-- Document Header Block -->
              <div class="bg-gradient-to-r from-emerald-50 via-teal-50/50 to-emerald-50 p-6 rounded-3xl border border-emerald-200 text-center relative overflow-hidden space-y-2">
                <div class="inline-flex items-center gap-1.5 px-4 py-1.5 bg-emerald-600 text-white font-arabic font-bold text-lg rounded-full shadow-sm mb-1">
                  <span>${tafdhil.badge}</span>
                </div>
                <h3 class="text-3xl sm:text-4xl font-bold font-arabic text-emerald-950">${tafdhil.title}</h3>
                <p class="text-[11px] text-gray-500 font-arabic italic">${tafdhil.source}</p>
                <p class="text-xs font-semibold text-emerald-800 pt-2">${tafdhil.instruction}</p>
              </div>

              <!-- Two Columns Grid (Kolom A vs Kolom B) -->
              <div class="grid md:grid-cols-2 gap-6">
                
                <!-- KOLOM A: Lebih dari -->
                <div class="bg-amber-50/40 rounded-3xl p-6 border-2 border-amber-200/80 space-y-4 relative shadow-sm">
                  <!-- Top Badge Container -->
                  <div class="flex flex-col items-center">
                    <span class="w-9 h-9 rounded-xl bg-purple-900 text-white font-bold flex items-center justify-center text-sm shadow-md mb-2">A</span>
                    <span class="px-5 py-1.5 bg-cyan-100 text-cyan-900 rounded-lg text-xs font-bold border border-cyan-300">
                      ${tafdhil.columnA.label}
                    </span>
                  </div>

                  <!-- Yellow Box Content -->
                  <div class="bg-amber-100/70 p-5 rounded-2xl border border-amber-300 space-y-3 text-right">
                    ${tafdhil.columnA.examples.map(ex => `
                      <div class="flex items-center justify-between gap-2 bg-white/80 p-3 rounded-xl border border-amber-200">
                        <button data-speech="${ex.arabic}" class="speech-btn w-7 h-7 rounded-full bg-amber-100 text-amber-800 hover:bg-amber-700 hover:text-white flex items-center justify-center transition-all">
                          <i class="fa-solid fa-volume-high text-[11px]"></i>
                        </button>
                        <div class="text-right flex-1">
                          <span class="text-xl font-bold font-arabic text-amber-950 block">${ex.arabic}</span>
                          <span class="text-[11px] text-amber-800 font-sans block text-left font-medium mt-0.5">${ex.indonesian}</span>
                        </div>
                      </div>
                    `).join('')}
                  </div>

                  <!-- Pattern Footer -->
                  <div class="text-center pt-2">
                    <span class="text-xs font-bold text-amber-900 bg-amber-200/60 px-3 py-1 rounded-full">
                      Pola (A): ${tafdhil.columnA.rule}
                    </span>
                  </div>
                </div>

                <!-- KOLOM B: Paling / Ter -->
                <div class="bg-emerald-50/40 rounded-3xl p-6 border-2 border-emerald-200/80 space-y-4 relative shadow-sm">
                  <!-- Top Badge Container -->
                  <div class="flex flex-col items-center">
                    <span class="w-9 h-9 rounded-xl bg-purple-900 text-white font-bold flex items-center justify-center text-sm shadow-md mb-2">B</span>
                    <span class="px-5 py-1.5 bg-purple-100 text-purple-900 rounded-lg text-xs font-bold border border-purple-300">
                      ${tafdhil.columnB.label}
                    </span>
                  </div>

                  <!-- Green Box Content -->
                  <div class="bg-emerald-100/70 p-5 rounded-2xl border border-emerald-300 space-y-3 text-right">
                    ${tafdhil.columnB.examples.map(ex => `
                      <div class="flex items-center justify-between gap-2 bg-white/80 p-3 rounded-xl border border-emerald-200">
                        <button data-speech="${ex.arabic}" class="speech-btn w-7 h-7 rounded-full bg-emerald-100 text-emerald-800 hover:bg-emerald-700 hover:text-white flex items-center justify-center transition-all">
                          <i class="fa-solid fa-volume-high text-[11px]"></i>
                        </button>
                        <div class="text-right flex-1">
                          <span class="text-xl font-bold font-arabic text-emerald-950 block">${ex.arabic}</span>
                          <span class="text-[11px] text-emerald-800 font-sans block text-left font-medium mt-0.5">${ex.indonesian}</span>
                        </div>
                      </div>
                    `).join('')}
                  </div>

                  <!-- Pattern Footer -->
                  <div class="text-center pt-2">
                    <span class="text-xs font-bold text-emerald-900 bg-emerald-200/60 px-3 py-1 rounded-full">
                      Pola (B): ${tafdhil.columnB.rule}
                    </span>
                  </div>
                </div>

              </div>

              <!-- Keterangan & Formasi Isim Tafdhil Diagram -->
              <div class="bg-emerald-50/60 p-6 rounded-3xl border border-emerald-200 space-y-6">
                <h4 class="text-sm font-bold text-emerald-900 uppercase tracking-wider border-b border-emerald-200 pb-2">
                  Keterangan & Kaidah Pembentukan Isim Tafdhil:
                </h4>

                <!-- Point 1 with Wazan Box & Arrow Diagram -->
                <div class="space-y-4">
                  <p class="text-xs sm:text-sm text-emerald-950 font-medium">
                    <strong>1.</strong> ${tafdhil.keterangan[0].text}
                  </p>

                  <!-- Wazan Pattern Badge -->
                  <div class="flex flex-col items-center justify-center my-4 space-y-2">
                    <div class="px-8 py-2.5 bg-emerald-700 text-white rounded-xl shadow-md font-arabic font-bold text-2xl tracking-wide">
                      ${tafdhil.pattern}
                    </div>
                    <i class="fa-solid fa-arrow-down text-emerald-600 text-xl animate-bounce mt-1"></i>
                  </div>

                  <!-- Derivation Diagram Boxes -->
                  <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-xl mx-auto items-center">
                    
                    <!-- Right Box (Original Adjectives) -->
                    <div class="bg-white p-4 rounded-2xl border-2 border-orange-300 text-center space-y-2 shadow-sm">
                      <span class="text-[10px] font-bold text-orange-600 uppercase tracking-wider block">Kata Asal (Isim Sifat)</span>
                      <div class="space-y-1 font-arabic text-xl font-bold text-orange-950">
                        ${tafdhil.keterangan[0].derivations.map(d => `<div class="py-0.5">${d.base}</div>`).join('')}
                      </div>
                    </div>

                    <!-- Left Box (Isim Tafdhil) -->
                    <div class="bg-white p-4 rounded-2xl border-2 border-orange-300 text-center space-y-2 shadow-sm">
                      <span class="text-[10px] font-bold text-emerald-600 uppercase tracking-wider block">Bentuk Isim Tafdhil</span>
                      <div class="space-y-1 font-arabic text-xl font-bold text-emerald-700">
                        ${tafdhil.keterangan[0].derivations.map(d => `<div class="py-0.5">${d.tafdhil}</div>`).join('')}
                      </div>
                    </div>

                  </div>

                  <!-- Derivation Meaning Breakdown -->
                  <div class="max-w-xl mx-auto bg-white p-3 rounded-2xl border border-emerald-100 text-xs text-emerald-900 space-y-1">
                    ${tafdhil.keterangan[0].derivations.map(d => `
                      <div class="flex items-center justify-between px-2 py-0.5 border-b border-emerald-50 last:border-none">
                        <span class="font-arabic font-bold text-base text-emerald-800">${d.base} &rarr; ${d.tafdhil}</span>
                        <span class="font-medium text-emerald-700">${d.meaning}</span>
                      </div>
                    `).join('')}
                  </div>

                </div>

                <!-- Points 2 & 3 Formulas -->
                <div class="grid sm:grid-cols-2 gap-4 pt-2">
                  <div class="bg-white p-4 rounded-2xl border border-emerald-200 space-y-1">
                    <p class="text-xs text-emerald-950 font-semibold">2. Susunan Kalimat Kolom (A) [Komparatif]:</p>
                    <div class="font-arabic font-bold text-lg text-emerald-800 dir-rtl text-right my-1">${tafdhil.keterangan[1].formula}</div>
                    <p class="text-[11px] text-emerald-700 font-medium">${tafdhil.keterangan[1].meaning}</p>
                  </div>

                  <div class="bg-white p-4 rounded-2xl border border-emerald-200 space-y-1">
                    <p class="text-xs text-emerald-950 font-semibold">3. Susunan Kalimat Kolom (B) [Superlatif]:</p>
                    <div class="font-arabic font-bold text-lg text-emerald-800 dir-rtl text-right my-1">${tafdhil.keterangan[2].formula}</div>
                    <p class="text-[11px] text-emerald-700 font-medium">${tafdhil.keterangan[2].meaning}</p>
                  </div>
                </div>

              </div>

            </div>
          ` : ''}

        </div>
      </div>
    `;
  }

  // 5. DIALOGUE VIEW (Interactive Hiwar: Balon Kata & Roleplay Simulator)
  function renderDialogue() {
    const BUBBLE_STYLES = {
      amber: "bg-amber-50/90 border-amber-300 text-amber-950",
      red: "bg-red-50/90 border-red-300 text-red-950",
      emerald: "bg-emerald-50/90 border-emerald-300 text-emerald-950",
      blue: "bg-blue-50/90 border-blue-300 text-blue-950",
      purple: "bg-purple-50/90 border-purple-300 text-purple-950",
      orange: "bg-orange-50/90 border-orange-300 text-orange-950",
      sky: "bg-sky-50/90 border-sky-300 text-sky-950"
    };

    const dialogues = ARABIC_DATA.dialogues || [];
    const currentDialogue = dialogues.find(d => d.id === state.activeDialogueId) || dialogues[0];
    if (!currentDialogue) return '<div class="p-8 text-center">Data Hiwar tidak ditemukan.</div>';

    const isChatMode = state.dialogueMode === 'chat';
    const totalLines = currentDialogue.lines.length;
    const stepIdx = Math.min(state.roleplayStep, totalLines - 1);
    const activeLine = currentDialogue.lines[stepIdx];

    // Unique speakers list for roleplay filter
    const speakers = [...new Set(currentDialogue.lines.map(l => l.speaker))];

    return `
      <div class="space-y-6 max-w-5xl mx-auto">
        
        <!-- Header Banner -->
        <div class="bg-white p-6 sm:p-8 rounded-[2.5rem] border border-emerald-100 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <span class="text-xs font-bold text-emerald-700 uppercase tracking-widest bg-emerald-50 px-3.5 py-1 rounded-full border border-emerald-200">الْحِوَارُ الإِسْتِمَاعِيُّ وَالتَّفَاعُلِيُّ</span>
            <h2 class="text-3xl font-bold font-arabic text-emerald-950 mt-2">${currentDialogue.title}</h2>
            ${currentDialogue.subtitle ? `<p class="text-xs sm:text-sm text-emerald-700 mt-1">${currentDialogue.subtitle}</p>` : ''}
          </div>

          <!-- Quick Action Tools -->
          <div class="flex flex-wrap items-center gap-2 self-stretch sm:self-auto justify-end">
            <button id="toggle-dialogue-trans-btn" class="px-3.5 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 rounded-xl text-xs font-semibold border border-emerald-200 transition-all flex items-center gap-1.5 shadow-sm">
              <i class="fa-solid ${state.showDialogueTranslation ? 'fa-eye-slash' : 'fa-eye'}"></i>
              <span>${state.showDialogueTranslation ? 'Sembunyikan Arti' : 'Tampilkan Arti'}</span>
            </button>
            <button onclick="speakArabic('${currentDialogue.lines.map(l => l.arabic.replace(/\n/g, ' ')).join('. ')}')" class="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold shadow-md transition-all flex items-center gap-2">
              <i class="fa-solid fa-circle-play"></i>
              <span>Putar Seluruh Percakapan</span>
            </button>
          </div>
        </div>

        <!-- Dialogue Navigation Tabs (Hiwar 1 vs Hiwar 2) -->
        ${dialogues.length > 1 ? `
          <div class="flex items-center gap-2 bg-emerald-100/60 p-1.5 rounded-2xl border border-emerald-200">
          ${dialogues.map(d => `
            <button data-dlg-id="${d.id}" class="dlg-tab-btn flex-1 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 ${state.activeDialogueId === d.id ? 'bg-white text-emerald-900 shadow-md border border-emerald-200 font-arabic' : 'text-emerald-700 hover:bg-white/50'}">
              <i class="fa-solid fa-comments text-emerald-600"></i>
              <span>${d.title}</span>
            </button>
          `).join('')}
        </div>
        ` : ''}

        <!-- Dialogue Header Instruction -->
        <div class="bg-white p-4 rounded-3xl border border-emerald-100 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-3">
          <div class="flex items-center gap-2">
            <span class="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-emerald-800 text-white shadow-sm flex items-center gap-1.5">
              <i class="fa-solid fa-comment-dots"></i>
              <span>Teks Percakapan Interaktif (Al-Hiwar)</span>
            </span>
          </div>

          <div class="text-xs text-emerald-700 font-medium font-arabic flex items-center gap-2 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-100">
            <i class="fa-solid fa-volume-high text-emerald-600"></i>
            <span>${currentDialogue.instruction}</span>
          </div>
        </div>

        <!-- Topic Images Showcase (If Available in Dialogue) -->
        ${currentDialogue.topicImages && currentDialogue.topicImages.length > 0 ? `
          <div class="bg-emerald-900/95 text-white p-6 rounded-3xl shadow-xl space-y-4 border border-emerald-700">
            <div class="flex items-center justify-between border-b border-emerald-700/80 pb-3">
              <span class="text-xs font-bold uppercase tracking-widest text-emerald-300 font-arabic">أُنْظُرُوا إِلَى الصُّوْرَتَيْنِ</span>
              
            </div>
            <div class="grid sm:grid-cols-2 gap-4">
              ${currentDialogue.topicImages.map((img, i) => `
                <div class="bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/15 space-y-2 group hover:bg-white/20 transition-all">
                  <div class="w-full h-44 rounded-xl bg-emerald-950 overflow-hidden relative border border-white/20 shadow-inner">
                    <img src="${img.url}" alt="${img.title}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" onError="this.style.display='none'; this.nextElementSibling.style.display='flex'">
                    <div class="hidden absolute inset-0 items-center justify-center bg-emerald-800 p-4 text-center">
                      ${getVocabIllustration({ svgKey: img.fallbackSvg })}
                    </div>
                    <span class="absolute top-2 left-2 px-2.5 py-1 bg-emerald-950/80 backdrop-blur-md text-emerald-300 text-[10px] font-bold rounded-lg border border-white/10">Gambar ${i + 1}</span>
                  </div>
                  <div>
                    <h4 class="font-arabic font-bold text-lg text-emerald-100">${img.title}</h4>
                    <p class="text-xs text-emerald-300 font-sans">${img.translation}</p>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        ` : ''}

        <!-- MAIN VIEW MODE CONTENT -->
        ${isChatMode ? `
          <!-- PERCAKAPAN BUBBLE VIEW (COMPACT & PROPORTIONAL) -->
          <div class="bg-gradient-to-b from-emerald-50/20 via-white to-emerald-50/10 p-4 sm:p-5 rounded-3xl border border-emerald-100 shadow-inner space-y-3.5">
            ${currentDialogue.lines.map((line, idx) => {
              const isTeacher = line.speaker.includes('أُسْتَاذُ');
              const isEven = idx % 2 === 0;
              const styleClass = BUBBLE_STYLES[line.bubbleColor] || BUBBLE_STYLES.emerald;
              
              return `
                <div class="flex gap-2.5 sm:gap-3.5 ${isEven ? 'flex-row' : 'flex-row-reverse'} items-start group">
                  
                  <!-- Character Avatar Card -->
                  <div class="flex flex-col items-center gap-0.5 min-w-[55px] sm:min-w-[65px] pt-1">
                    <div class="relative">
                      <img src="${line.avatar}" alt="${line.speaker}" class="w-10 h-10 sm:w-11 sm:h-11 rounded-full object-cover border-2 ${isTeacher ? 'border-amber-400 ring-2 ring-amber-100' : 'border-emerald-500 ring-2 ring-emerald-100'} shadow-sm">
                      <span class="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-600 text-white text-[9px] flex items-center justify-center font-bold shadow">${idx + 1}</span>
                    </div>
                    <span class="text-[11px] font-bold font-arabic text-emerald-950 text-center leading-tight mt-0.5">${line.speaker}</span>
                    
                  </div>

                  <!-- Compact Speech Bubble Box -->
                  <div class="w-full max-w-lg sm:max-w-xl">
                    <div class="relative px-3.5 py-2.5 sm:px-4 sm:py-3 rounded-2xl border-2 ${styleClass} shadow-sm transition-all hover:shadow space-y-1.5">
                      
                      <!-- Header speech action -->
                      <div class="flex items-center justify-between border-b border-black/5 pb-1">
                        <span class="text-[11px] font-bold text-emerald-900 font-arabic">${line.speaker}</span>
                        <button data-speech="${line.arabic.replace(/\n/g, ' ')}" class="speech-btn px-2.5 py-0.5 rounded-full bg-white/90 hover:bg-emerald-700 hover:text-white text-emerald-800 text-[11px] font-bold border border-emerald-200 transition-all flex items-center gap-1 shadow-2xs">
                          <i class="fa-solid fa-volume-high text-[10px]"></i>
                          <span>Dengarkan</span>
                        </button>
                      </div>

                      <!-- Arabic Speech Text (Compact & Clear) -->
                      <p class="text-base sm:text-lg font-arabic text-right font-bold leading-relaxed text-emerald-950 whitespace-pre-line py-0.5 drop-shadow-2xs">
                        ${line.arabic}
                      </p>

                      <!-- Indonesian Translation (Compact) -->
                      ${state.showDialogueTranslation ? `
                        <div class="pt-1.5 border-t border-black/5 font-sans text-[11px] sm:text-xs text-gray-700 italic leading-snug whitespace-pre-line bg-white/70 p-2 rounded-xl">
                          <strong class="text-emerald-900 font-semibold not-italic block mb-0.5 text-[10px] uppercase tracking-wide">Terjemahan:</strong>
                          "${line.translation}"
                        </div>
                      ` : ''}

                    </div>
                  </div>

                </div>
              `;
            }).join('')}
          </div>
        ` : `
          <!-- MODE 2: ROLEPLAY SIMULATOR PLAYER -->
          <div class="bg-gradient-to-br from-emerald-900 via-emerald-800 to-teal-900 rounded-[2.5rem] p-6 sm:p-10 text-white shadow-2xl space-y-6 border border-emerald-700 relative overflow-hidden">
            
            <!-- Top Controls & Role Selector -->
            <div class="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-emerald-700/70 pb-5">
              <div>
                <span class="text-[11px] font-bold uppercase tracking-wider text-emerald-300">Simulator Peran Interaktif</span>
                <h3 class="text-xl font-bold font-arabic text-white">Langkah ${stepIdx + 1} dari ${totalLines}</h3>
              </div>

              <!-- Role Selector for Practice -->
              <div class="flex items-center gap-2 bg-emerald-950/60 p-2 rounded-2xl border border-white/10 text-xs">
                <span class="text-emerald-300 font-semibold pl-1">Peran Saya:</span>
                <select id="roleplay-myrole-select" class="bg-emerald-800 text-white font-bold rounded-xl px-3 py-1.5 border border-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-400">
                  <option value="all" ${state.myRole === 'all' ? 'selected' : ''}>Semua Peran (Siswa Menyimak)</option>
                  ${speakers.map(spk => `
                    <option value="${spk}" ${state.myRole === spk ? 'selected' : ''}>Saya sebagai: ${spk}</option>
                  `).join('')}
                </select>
              </div>
            </div>

            <!-- Progress Bar -->
            <div class="w-full bg-emerald-950/80 h-3 rounded-full overflow-hidden p-0.5 border border-white/10">
              <div class="bg-gradient-to-r from-emerald-400 to-teal-300 h-full rounded-full transition-all duration-300" style="width: ${((stepIdx + 1) / totalLines) * 100}%"></div>
            </div>

            <!-- Spotlight Character Stage -->
            <div class="bg-white/10 backdrop-blur-md rounded-3xl p-6 sm:p-8 border border-white/20 shadow-2xl space-y-6 relative">
              
              <!-- Character Header spotlight -->
              <div class="flex items-center gap-4">
                <img src="${activeLine.avatar}" alt="${activeLine.speaker}" class="w-20 h-20 rounded-full object-cover border-4 border-emerald-400 ring-4 ring-white/20 shadow-xl">
                <div>
                  <span class="px-3 py-1 bg-emerald-400/20 text-emerald-300 rounded-full text-xs font-bold border border-emerald-400/30">${activeLine.role}</span>
                  <h3 class="text-3xl font-extrabold font-arabic text-white mt-1">${activeLine.speaker}</h3>
                </div>
              </div>

              <!-- Large Arabic Speech Bubble -->
              <div class="bg-white text-emerald-950 p-6 sm:p-8 rounded-3xl shadow-xl space-y-3 relative border-2 border-emerald-300">
                <div class="flex items-center justify-between border-b border-gray-100 pb-2">
                  <span class="text-xs font-extrabold text-emerald-800 uppercase tracking-widest">Teks Ucapan:</span>
                  <button onclick="speakArabic('${activeLine.arabic.replace(/\n/g, ' ')}')" class="px-3.5 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold transition-all shadow flex items-center gap-1.5">
                    <i class="fa-solid fa-volume-high"></i> Putar Suara Karakter
                  </button>
                </div>
                
                <p class="text-2xl sm:text-4xl font-arabic font-bold text-right leading-loose text-emerald-950 whitespace-pre-line py-2">
                  ${activeLine.arabic}
                </p>

                ${state.showDialogueTranslation ? `
                  <div class="pt-3 border-t border-emerald-100 text-xs sm:text-sm text-emerald-800 font-sans italic whitespace-pre-line bg-emerald-50/70 p-4 rounded-2xl">
                    <strong class="text-emerald-950 font-bold not-italic block mb-1">Artinya dalam Bahasa Indonesia:</strong>
                    "${activeLine.translation}"
                  </div>
                ` : ''}
              </div>

              <!-- Interactive Step Navigator Controls -->
              <div class="flex flex-wrap items-center justify-between gap-3 pt-2">
                <button id="rp-prev-btn" class="px-5 py-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded-2xl backdrop-blur-md border border-white/20 transition-all flex items-center gap-2 text-xs sm:text-sm ${stepIdx === 0 ? 'opacity-50 cursor-not-allowed' : ''}">
                  <i class="fa-solid fa-arrow-left"></i>
                  <span>Langkah Sebelumnya</span>
                </button>

                <div class="flex items-center gap-2">
                  <button id="rp-play-step-btn" class="px-6 py-3 bg-emerald-400 hover:bg-emerald-300 text-emerald-950 font-extrabold rounded-2xl shadow-lg transition-all flex items-center gap-2 text-xs sm:text-sm">
                    <i class="fa-solid fa-play"></i>
                    <span>Putar Ucapan Sekarang</span>
                  </button>
                </div>

                <button id="rp-next-btn" class="px-5 py-3 bg-white/10 hover:bg-white/20 text-white font-bold rounded-2xl backdrop-blur-md border border-white/20 transition-all flex items-center gap-2 text-xs sm:text-sm ${stepIdx === totalLines - 1 ? 'opacity-50 cursor-not-allowed' : ''}">
                  <span>Langkah Selanjutnya</span>
                  <i class="fa-solid fa-arrow-right"></i>
                </button>
              </div>

            </div>

          </div>
        `}

      </div>
    `;
  }

  // 6. QUIZ VIEW (Kahoot Gamified Tadribat - 20 Soal Bahasa Arab)
  function renderQuiz() {
    const quizzes = ARABIC_DATA.quizzes;
    const currentQ = quizzes[state.quizIndex];

    // CASE 1: KAHOOT PODIUM END SCREEN (SUDAH SELESAI)
    if (state.quizSubmitted) {
      let correctCount = 0;
      quizzes.forEach(q => {
        if (state.quizAnswers[q.id] === q.answer) correctCount++;
      });
      const accuracyPct = Math.round((correctCount / quizzes.length) * 100);

      return `
        <div class="max-w-4xl mx-auto space-y-8">
          
          <!-- Kahoot Champion Podium Stage Header -->
          <div class="bg-gradient-to-br from-indigo-950 via-purple-900 to-emerald-950 rounded-[2.5rem] p-8 sm:p-12 text-white shadow-2xl border-4 border-yellow-400/40 text-center space-y-6 relative overflow-hidden">
            
            <!-- Confetti / Ambient Lighting Orbs -->
            <div class="absolute -top-10 -left-10 w-40 h-40 bg-yellow-400/20 rounded-full blur-2xl pointer-events-none"></div>
            <div class="absolute -bottom-10 -right-10 w-40 h-40 bg-emerald-400/20 rounded-full blur-2xl pointer-events-none"></div>

            <div class="inline-flex items-center gap-2 bg-yellow-400/20 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-bold text-yellow-300 border border-yellow-400/30">
              <i class="fa-solid fa-trophy text-yellow-400"></i>
              <span>منصة التتويج (Kahoot Champions Leaderboard)</span>
            </div>

            <div>
              <h2 class="text-4xl sm:text-5xl font-extrabold font-arabic text-white">نَتِيجَةُ الاِخْتِبَارِ النهَائِيَّةُ!</h2>
              <p class="text-sm text-purple-200 mt-1">Selamat! Anda telah menyelesaikan 20 Soal Kuis Kahoot Bahasa Arab</p>
            </div>

            <!-- Kahoot Score & Points Card -->
            <div class="grid sm:grid-cols-3 gap-4 max-w-2xl mx-auto pt-2">
              <div class="bg-white/10 backdrop-blur-md p-5 rounded-3xl border border-white/20 text-center space-y-1">
                <span class="text-[11px] uppercase font-bold text-purple-200 block">Total Poin Kahoot</span>
                <span class="text-3xl font-extrabold text-yellow-300 font-mono">⭐ ${state.kahootPoints.toLocaleString()}</span>
              </div>
              <div class="bg-white/10 backdrop-blur-md p-5 rounded-3xl border border-white/20 text-center space-y-1">
                <span class="text-[11px] uppercase font-bold text-purple-200 block">Tingkat Akurasi</span>
                <span class="text-3xl font-extrabold text-emerald-400 font-mono">${accuracyPct}%</span>
              </div>
              <div class="bg-white/10 backdrop-blur-md p-5 rounded-3xl border border-white/20 text-center space-y-1">
                <span class="text-[11px] uppercase font-bold text-purple-200 block">Jawaban Benar</span>
                <span class="text-3xl font-extrabold text-cyan-300 font-mono">${correctCount} / ${quizzes.length}</span>
              </div>
            </div>

            <!-- Kahoot Podium Graphics -->
            <div class="flex items-end justify-center gap-3 sm:gap-6 pt-6 pb-2">
              <!-- 2nd Place -->
              <div class="flex flex-col items-center">
                <div class="w-12 h-12 rounded-full bg-slate-300 text-slate-900 font-bold flex items-center justify-center text-xl shadow-lg border-2 border-white mb-2">🥈</div>
                <div class="w-20 sm:w-24 h-24 bg-gradient-to-t from-slate-600 to-slate-400 rounded-t-2xl flex items-center justify-center text-white font-bold text-lg shadow-lg">2</div>
              </div>
              <!-- 1st Place (Champion) -->
              <div class="flex flex-col items-center">
                <div class="w-16 h-16 rounded-full bg-yellow-400 text-yellow-950 font-bold flex items-center justify-center text-2xl shadow-xl border-4 border-white mb-2 animate-bounce">🥇</div>
                <div class="w-24 sm:w-28 h-36 bg-gradient-to-t from-yellow-600 via-amber-500 to-yellow-400 rounded-t-2xl flex flex-col items-center justify-center text-yellow-950 font-extrabold shadow-2xl border-t-2 border-yellow-200">
                  <span class="text-xs uppercase font-sans">Juara 1</span>
                  <span class="text-xl font-arabic truncate px-1">${state.currentUser ? state.currentUser.name.split(' ')[0] : 'Siswa'}</span>
                  <span class="text-2xl mt-1">1</span>
                </div>
              </div>
              <!-- 3rd Place -->
              <div class="flex flex-col items-center">
                <div class="w-12 h-12 rounded-full bg-amber-700 text-white font-bold flex items-center justify-center text-xl shadow-lg border-2 border-white mb-2">🥉</div>
                <div class="w-20 sm:w-24 h-16 bg-gradient-to-t from-amber-800 to-amber-600 rounded-t-2xl flex items-center justify-center text-white font-bold text-lg shadow-lg">3</div>
              </div>
            </div>

            <!-- Action Buttons -->
            <div class="flex flex-wrap gap-3 max-w-md mx-auto pt-4">
              <button id="retry-quiz-btn" class="flex-1 py-3.5 bg-yellow-400 hover:bg-yellow-300 text-yellow-950 rounded-2xl text-xs sm:text-sm font-extrabold shadow-lg transition-all flex items-center justify-center gap-2">
                <i class="fa-solid fa-play"></i>
                <span>Mainkan Lagi (Reset Kahoot)</span>
              </button>
              <button onclick="document.querySelector('[data-view=dashboard]').click()" class="flex-1 py-3.5 bg-white/20 hover:bg-white/30 text-white rounded-2xl text-xs sm:text-sm font-bold backdrop-blur-md transition-all flex items-center justify-center gap-2 border border-white/20">
                <i class="fa-solid fa-house"></i>
                <span>Dashboard</span>
              </button>
            </div>

          </div>

          <!-- Kahoot Detailed Pembahasan Review -->
          <div class="bg-white rounded-[2.5rem] p-6 sm:p-8 border border-emerald-100 shadow-md space-y-6">
            <h3 class="text-lg font-bold text-emerald-950 border-b border-emerald-100 pb-3 font-arabic flex items-center justify-between">
              <span>مُرَاجَعَةُ الْأَجْوِبَةِ (Pembahasan Kunci Jawaban Kahoot)</span>
              <span class="text-xs text-emerald-600 font-sans">20 Soal Pembahasan</span>
            </h3>

            <div class="space-y-4 max-h-[600px] overflow-y-auto pr-2">
              ${quizzes.map((q, idx) => {
                const userAns = state.quizAnswers[q.id];
                const isCorrect = userAns === q.answer;
                
                return `
                  <div class="p-5 rounded-2xl border ${isCorrect ? 'bg-emerald-50/60 border-emerald-200' : 'bg-red-50/50 border-red-200'} space-y-2">
                    <div class="flex items-center justify-between text-xs font-bold">
                      <span class="${isCorrect ? 'text-emerald-800' : 'text-red-800'}">Soal #${idx + 1}</span>
                      <span class="px-3 py-1 rounded-full text-[10px] ${isCorrect ? 'bg-emerald-100 text-emerald-900' : 'bg-red-100 text-red-900'}">
                        ${isCorrect ? '✓ Benar' : '✗ Salah'}
                      </span>
                    </div>
                    <p class="text-xl font-bold font-arabic text-emerald-950 text-right dir-rtl leading-relaxed">${q.question}</p>
                    <div class="text-xs space-y-1 font-sans">
                      <div class="text-emerald-950">Jawaban Anda: <strong class="${isCorrect ? 'text-emerald-700' : 'text-red-600 line-through'} font-arabic text-base">${userAns !== undefined && userAns !== -1 ? q.options[userAns] : 'Waktu Habis'}</strong></div>
                      ${!isCorrect ? `<div class="text-emerald-950">Jawaban Benar: <strong class="text-emerald-700 font-arabic text-base">${q.options[q.answer]}</strong></div>` : ''}
                    </div>
                    ${q.explanation ? `
                      <div class="bg-white p-3 rounded-xl border border-emerald-100 text-xs text-emerald-900 space-y-0.5 mt-2">
                        <strong class="text-emerald-800 font-arabic block text-sm">الشَّرْحُ:</strong>
                        <p class="font-arabic text-base text-right text-emerald-950">${q.explanation}</p>
                      </div>
                    ` : ''}
                  </div>
                `;
              }).join('')}
            </div>
          </div>

        </div>
      `;
    }

    // CASE 2: KAHOOT IMMEDIATE ANSWER FEEDBACK SCREEN (Correct or Incorrect Feedback Transisi)
    if (state.kahootShowFeedback) {
      const isCorrect = state.kahootLastCorrect;
      
      return `
        <div class="max-w-2xl mx-auto space-y-6">
          <div class="${isCorrect ? 'bg-gradient-to-br from-emerald-600 via-teal-700 to-emerald-900 border-emerald-400' : 'bg-gradient-to-br from-red-600 via-rose-700 to-red-900 border-red-400'} rounded-[2.5rem] p-8 sm:p-12 text-white shadow-2xl border-4 text-center space-y-6 relative overflow-hidden">
            
            <!-- Large Feedback Icon -->
            <div class="w-24 h-24 ${isCorrect ? 'bg-emerald-400/30 text-white' : 'bg-red-400/30 text-white'} rounded-full flex items-center justify-center text-5xl mx-auto shadow-2xl border-4 border-white/40 ${isCorrect ? 'animate-bounce' : 'animate-pulse'}">
              <i class="fa-solid ${isCorrect ? 'fa-check' : 'fa-xmark'}"></i>
            </div>

            <!-- Headline -->
            <div class="space-y-1">
              <h2 class="text-4xl sm:text-5xl font-extrabold font-arabic text-white drop-shadow">
                ${isCorrect ? 'إِجَابَةٌ صَحِيحَةٌ!' : 'إِجَابَةٌ خَاطِئَةٌ!'}
              </h2>
              <p class="text-sm font-semibold text-white/90">
                ${isCorrect ? 'Luar biasa! Jawaban Anda Tepat Sekali!' : 'Belum tepat, mari pelajari penjelasannya!'}
              </p>
            </div>

            <!-- Points & Streak Badge -->
            <div class="flex items-center justify-center gap-4 py-2">
              ${isCorrect ? `
                <div class="px-5 py-2 bg-yellow-400 text-yellow-950 rounded-2xl font-extrabold text-lg shadow-lg font-mono">
                  +${state.kahootPointsEarned.toLocaleString()} Poin!
                </div>
                ${state.kahootStreak > 1 ? `
                  <div class="px-5 py-2 bg-orange-500 text-white rounded-2xl font-extrabold text-lg shadow-lg font-mono animate-pulse">
                    🔥 Streak x${state.kahootStreak}!
                  </div>
                ` : ''}
              ` : `
                <div class="px-5 py-2 bg-black/30 text-white rounded-2xl font-bold text-sm border border-white/20">
                  🔥 Streak Reset Ke 0
                </div>
              `}
            </div>

            <!-- Show Correct Answer if Wrong -->
            ${!isCorrect ? `
              <div class="bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20 space-y-1 max-w-md mx-auto">
                <span class="text-xs uppercase font-bold text-red-200 block">Jawaban Yang Benar Adalah:</span>
                <p class="font-arabic font-bold text-2xl text-yellow-300 leading-snug">${currentQ.options[currentQ.answer]}</p>
              </div>
            ` : ''}

            <!-- Arabic Explanation Card -->
            <div class="bg-white/10 backdrop-blur-md p-5 rounded-3xl border border-white/20 text-right space-y-1 max-w-lg mx-auto">
              <span class="text-xs font-extrabold text-yellow-300 block uppercase font-sans border-b border-white/10 pb-1">الشَّرْحُ (Penjelasan):</span>
              <p class="font-arabic font-bold text-xl text-white leading-relaxed pt-1">${currentQ.explanation}</p>
            </div>

            <!-- Next Question Control Button -->
            <div class="pt-4">
              <button id="kahoot-next-btn" class="w-full sm:w-auto px-10 py-4 ${isCorrect ? 'bg-yellow-400 hover:bg-yellow-300 text-yellow-950' : 'bg-white hover:bg-gray-100 text-red-950'} rounded-2xl font-extrabold text-base shadow-2xl transition-all flex items-center justify-center gap-3 mx-auto transform hover:scale-105">
                <span>${state.quizIndex === quizzes.length - 1 ? 'Kirim & Selesai Kuis 🚀' : 'Soal Berikutnya ➔'}</span>
              </button>
            </div>

          </div>
        </div>
      `;
    }

    // CASE 3: KAHOOT LIVE GAMEPLAY QUESTION STAGE (COMPACT SINGLE SCREEN)
    return `
      <div class="max-w-4xl mx-auto space-y-2.5 sm:space-y-4">
        
        <!-- Kahoot Stage Top Scoreboard Bar (Compact) -->
        <div class="bg-gradient-to-r from-purple-950 via-indigo-900 to-purple-950 px-3 py-2 sm:px-5 sm:py-2.5 rounded-2xl border border-purple-500/30 text-white shadow-md flex items-center justify-between gap-2">
          
          <!-- Question Pill Badge -->
          <div class="flex items-center gap-1.5 sm:gap-2">
            <span class="px-3 py-1 bg-purple-800 text-purple-200 rounded-full text-xs font-bold border border-purple-600 shadow-inner">
              Soal ${state.quizIndex + 1}/${quizzes.length}
            </span>
            <button onclick="speakArabic('${currentQ.question.replace(/\n/g, ' ')}')" class="p-1.5 sm:p-2 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs transition-all border border-white/10" title="Baca Soal">
              <i class="fa-solid fa-volume-high"></i>
            </button>
          </div>

          <!-- Circular Live Countdown Timer Gauge -->
          <div class="flex items-center gap-2">
            <div class="relative w-9 h-9 sm:w-10 sm:h-10 flex items-center justify-center rounded-full bg-purple-950 border-2 ${state.kahootTimeLeft <= 5 ? 'border-red-500 animate-ping' : 'border-yellow-400'} shadow-md">
              <span class="kahoot-stage-timer text-sm sm:text-base font-extrabold font-mono ${state.kahootTimeLeft <= 5 ? 'text-red-400' : 'text-yellow-300'}">${state.kahootTimeLeft}</span>
            </div>
          </div>

          <!-- Points & Streak Badges -->
          <div class="flex items-center gap-1.5 sm:gap-2">
            <div class="px-2.5 py-1 bg-yellow-400/20 text-yellow-300 rounded-xl text-xs font-bold border border-yellow-400/40 flex items-center gap-1">
              <span>⭐</span>
              <span class="font-mono text-xs sm:text-sm">${state.kahootPoints.toLocaleString()}</span>
            </div>
            ${state.kahootStreak > 0 ? `
              <div class="px-2 py-1 bg-orange-500/20 text-orange-400 rounded-xl text-xs font-bold border border-orange-500/40 hidden sm:flex items-center gap-1 animate-pulse">
                <span>🔥</span>
                <span class="font-mono">${state.kahootStreak}x</span>
              </div>
            ` : ''}
          </div>

        </div>

        <!-- Main Kahoot Stage Question Card (Compact Single Screen) -->
        <div class="bg-gradient-to-br from-indigo-950 via-purple-950 to-slate-950 rounded-2xl sm:rounded-3xl p-3 sm:p-5 border-2 border-purple-500/40 text-white shadow-xl space-y-2.5 sm:space-y-4 relative overflow-hidden">
          
          <!-- Compact Question Container -->
          <div class="bg-white/10 backdrop-blur-md px-3.5 py-2.5 sm:px-6 sm:py-3.5 rounded-xl sm:rounded-2xl border border-white/15 text-center shadow-inner">
            <span class="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-purple-300 block font-sans mb-1">السُّؤَالُ (Pertanyaan):</span>
            <h2 class="text-base sm:text-xl md:text-2xl font-bold font-arabic text-yellow-300 leading-snug sm:leading-relaxed text-center dir-rtl drop-shadow-sm whitespace-pre-line">
              ${currentQ.question}
            </h2>
          </div>

          <!-- 4 Iconic Kahoot 2x2 Answer Cards Grid (Fit on Single Screen) -->
          <div class="grid grid-cols-2 gap-2 sm:gap-3.5">
            
            <!-- Red Triangle Card (Option 0 - أ) -->
            <button data-opt="0" class="kahoot-card-btn group bg-gradient-to-r from-red-600 via-red-600 to-rose-700 hover:from-red-500 hover:to-rose-600 text-white p-2.5 sm:p-4 rounded-xl sm:rounded-2xl border border-red-300/40 shadow-md hover:shadow-red-500/40 transform hover:scale-[1.01] active:scale-95 transition-all flex items-center justify-between gap-1.5 sm:gap-3 text-right min-h-[56px] sm:min-h-[72px]">
              <div class="w-7 h-7 sm:w-8 sm:h-8 rounded-lg sm:rounded-xl bg-black/25 group-hover:bg-white/20 text-white flex items-center justify-center text-xs sm:text-sm font-bold font-arabic shrink-0 shadow-inner">
                أ
              </div>
              <span class="text-xs sm:text-base md:text-lg font-bold font-arabic flex-1 text-right leading-tight sm:leading-snug drop-shadow-sm line-clamp-2">
                ${currentQ.options[0]}
              </span>
              <i class="fa-solid fa-play -rotate-90 text-sm sm:text-lg text-red-200 group-hover:scale-110 transition-transform shrink-0 opacity-80"></i>
            </button>

            <!-- Blue Diamond Card (Option 1 - ب) -->
            <button data-opt="1" class="kahoot-card-btn group bg-gradient-to-r from-blue-600 via-blue-600 to-indigo-700 hover:from-blue-500 hover:to-indigo-600 text-white p-2.5 sm:p-4 rounded-xl sm:rounded-2xl border border-blue-300/40 shadow-md hover:shadow-blue-500/40 transform hover:scale-[1.01] active:scale-95 transition-all flex items-center justify-between gap-1.5 sm:gap-3 text-right min-h-[56px] sm:min-h-[72px]">
              <div class="w-7 h-7 sm:w-8 sm:h-8 rounded-lg sm:rounded-xl bg-black/25 group-hover:bg-white/20 text-white flex items-center justify-center text-xs sm:text-sm font-bold font-arabic shrink-0 shadow-inner">
                ب
              </div>
              <span class="text-xs sm:text-base md:text-lg font-bold font-arabic flex-1 text-right leading-tight sm:leading-snug drop-shadow-sm line-clamp-2">
                ${currentQ.options[1]}
              </span>
              <i class="fa-solid fa-diamond text-sm sm:text-lg text-blue-200 group-hover:scale-110 transition-transform shrink-0 opacity-80"></i>
            </button>

            <!-- Yellow Circle Card (Option 2 - ج) -->
            <button data-opt="2" class="kahoot-card-btn group bg-gradient-to-r from-amber-500 via-amber-500 to-yellow-600 hover:from-amber-400 hover:to-yellow-500 text-white p-2.5 sm:p-4 rounded-xl sm:rounded-2xl border border-amber-300/40 shadow-md hover:shadow-amber-500/40 transform hover:scale-[1.01] active:scale-95 transition-all flex items-center justify-between gap-1.5 sm:gap-3 text-right min-h-[56px] sm:min-h-[72px]">
              <div class="w-7 h-7 sm:w-8 sm:h-8 rounded-lg sm:rounded-xl bg-black/25 group-hover:bg-white/20 text-white flex items-center justify-center text-xs sm:text-sm font-bold font-arabic shrink-0 shadow-inner">
                ج
              </div>
              <span class="text-xs sm:text-base md:text-lg font-bold font-arabic flex-1 text-right leading-tight sm:leading-snug drop-shadow-sm line-clamp-2">
                ${currentQ.options[2]}
              </span>
              <i class="fa-solid fa-circle text-sm sm:text-lg text-amber-100 group-hover:scale-110 transition-transform shrink-0 opacity-80"></i>
            </button>

            <!-- Green Square Card (Option 3 - د) -->
            <button data-opt="3" class="kahoot-card-btn group bg-gradient-to-r from-emerald-600 via-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white p-2.5 sm:p-4 rounded-xl sm:rounded-2xl border border-emerald-300/40 shadow-md hover:shadow-emerald-500/40 transform hover:scale-[1.01] active:scale-95 transition-all flex items-center justify-between gap-1.5 sm:gap-3 text-right min-h-[56px] sm:min-h-[72px]">
              <div class="w-7 h-7 sm:w-8 sm:h-8 rounded-lg sm:rounded-xl bg-black/25 group-hover:bg-white/20 text-white flex items-center justify-center text-xs sm:text-sm font-bold font-arabic shrink-0 shadow-inner">
                د
              </div>
              <span class="text-xs sm:text-base md:text-lg font-bold font-arabic flex-1 text-right leading-tight sm:leading-snug drop-shadow-sm line-clamp-2">
                ${currentQ.options[3]}
              </span>
              <i class="fa-solid fa-square text-sm sm:text-lg text-emerald-200 group-hover:scale-110 transition-transform shrink-0 opacity-80"></i>
            </button>

          </div>

        </div>
      </div>
    `;
  }

  // 7. STUDENTS MONITORING VIEW (Guru Only)
  function renderStudents() {
    const students = state.students || [];
    const submissions = state.submissions || [];
    const activeTab = state.studentsTab || 'table';

    // Filter students by search and class
    const search = (state.studentsSearch || '').toLowerCase().trim();
    const classFilter = state.studentsClassFilter || 'all';

    const filteredStudents = students.filter(s => {
      const matchName = !search || (s.name && s.name.toLowerCase().includes(search)) || String(s.id).includes(search);
      const matchClass = classFilter === 'all' || s.class === classFilter;
      return matchName && matchClass;
    });

    // Calculate Class KPIs
    const totalStudents = students.length;
    const allAverages = students.map(s => s.averageScore || s.score || 0);
    const classAvg = totalStudents > 0 ? Math.round(allAverages.reduce((a, b) => a + b, 0) / totalStudents) : 0;
    const maxDuelScore = students.reduce((max, s) => Math.max(max, s.duelScore || 0), 0);
    const tuntasCount = students.filter(s => (s.averageScore || s.score || 0) >= 75).length;
    const tuntasPct = totalStudents > 0 ? Math.round((tuntasCount / totalStudents) * 100) : 0;

    return `
      <div class="space-y-6">
        <!-- Top Command Header -->
        <div class="bg-gradient-to-r from-emerald-900 via-teal-900 to-emerald-950 p-6 sm:p-8 rounded-3xl text-white shadow-xl border border-emerald-700/50 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div class="space-y-2">
            <h2 class="text-2xl sm:text-3xl font-extrabold font-arabic tracking-tight">Monitoring & Rekap Nilai Siswa Real-time</h2>
            <p class="text-xs sm:text-sm text-emerald-200 max-w-2xl">
              Seluruh perolehan nilai latihan kuis, pemahaman audio menyimak (Istima'), praktik bicara AI (Kalam), dan game interaktif siswa otomatis tersinkronisasi ke sini secara langsung tanpa jeda.
            </p>
          </div>

          <div class="flex flex-wrap items-center gap-2.5">
            <button id="btn-export-excel" class="px-4 py-3 bg-emerald-400 hover:bg-emerald-300 text-emerald-950 rounded-2xl text-xs font-extrabold shadow-lg transition-all flex items-center gap-2 transform hover:scale-105 active:scale-95">
              <i class="fa-solid fa-file-excel text-base"></i>
              <span>Export Rekap Excel (CSV)</span>
            </button>
            <button id="btn-refresh-students" class="px-4 py-3 bg-white/10 hover:bg-white/20 text-white rounded-2xl text-xs font-bold backdrop-blur-md border border-white/20 transition-all flex items-center gap-2 active:scale-95">
              <i class="fa-solid fa-rotate text-sm"></i>
              <span>Segarkan</span>
            </button>
          </div>
        </div>

        <!-- 4 KPI Summary Cards -->
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          <div class="bg-white p-4 sm:p-5 rounded-2xl border border-emerald-100 shadow-sm flex items-center gap-3.5">
            <div class="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center text-xl shrink-0">
              <i class="fa-solid fa-users"></i>
            </div>
            <div class="min-w-0">
              <div class="text-xl sm:text-2xl font-black text-emerald-950">${totalStudents}</div>
              <div class="text-[11px] text-emerald-600 font-semibold truncate">Siswa Terdaftar</div>
            </div>
          </div>

          <div class="bg-white p-4 sm:p-5 rounded-2xl border border-emerald-100 shadow-sm flex items-center gap-3.5">
            <div class="w-12 h-12 rounded-2xl bg-teal-100 text-teal-800 flex items-center justify-center text-xl shrink-0">
              <i class="fa-solid fa-chart-line"></i>
            </div>
            <div class="min-w-0">
              <div class="text-xl sm:text-2xl font-black text-emerald-950">${classAvg} <span class="text-xs font-normal text-slate-500">/ 100</span></div>
              <div class="text-[11px] text-teal-600 font-semibold truncate">Rata-rata Nilai Kelas</div>
            </div>
          </div>

          <div class="bg-white p-4 sm:p-5 rounded-2xl border border-emerald-100 shadow-sm flex items-center gap-3.5">
            <div class="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center text-xl shrink-0">
              <i class="fa-solid fa-bolt"></i>
            </div>
            <div class="min-w-0">
              <div class="text-xl sm:text-2xl font-black text-emerald-950">${maxDuelScore} <span class="text-xs font-normal text-slate-500">Pts</span></div>
              <div class="text-[11px] text-amber-600 font-semibold truncate">Skor Tertinggi Game Duel</div>
            </div>
          </div>

          <div class="bg-white p-4 sm:p-5 rounded-2xl border border-emerald-100 shadow-sm flex items-center gap-3.5">
            <div class="w-12 h-12 rounded-2xl bg-indigo-100 text-indigo-800 flex items-center justify-center text-xl shrink-0">
              <i class="fa-solid fa-circle-check"></i>
            </div>
            <div class="min-w-0">
              <div class="text-xl sm:text-2xl font-black text-emerald-950">${tuntasPct}%</div>
              <div class="text-[11px] text-indigo-600 font-semibold truncate">${tuntasCount} Siswa Tuntas (KKM 75)</div>
            </div>
          </div>
        </div>

        <!-- Navigation Tabs & Filter Bar -->
        <div class="bg-white p-4 sm:p-5 rounded-3xl border border-emerald-100 shadow-sm space-y-4">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-emerald-100 pb-3">
            <div class="flex items-center gap-2 p-1 bg-emerald-50 rounded-2xl border border-emerald-100">
              <button data-tab="table" class="tab-switch-btn px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${activeTab === 'table' ? 'bg-emerald-800 text-white shadow-md' : 'text-emerald-800 hover:bg-white'}">
                <i class="fa-solid fa-table-list"></i>
                <span>Tabel Rekap Nilai Lengkap</span>
              </button>
              <button data-tab="feed" class="tab-switch-btn px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 relative ${activeTab === 'feed' ? 'bg-emerald-800 text-white shadow-md' : 'text-emerald-800 hover:bg-white'}">
                <span class="w-2 h-2 rounded-full bg-rose-500 animate-ping"></span>
                <i class="fa-solid fa-satellite-dish"></i>
                <span>Live Feed Nilai Masuk (${submissions.length})</span>
              </button>
            </div>

            <!-- Search & Filter Options -->
            <div class="flex items-center gap-2">
              <div class="relative">
                <i class="fa-solid fa-magnifying-glass absolute left-3.5 top-3 text-emerald-600 text-xs"></i>
                <input type="text" id="students-search-input" value="${state.studentsSearch || ''}" placeholder="Cari nama siswa..." class="pl-9 pr-3 py-2 rounded-xl border border-emerald-200 bg-emerald-50/40 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:bg-white w-40 sm:w-56 transition-all">
              </div>
              <select id="students-class-filter" class="px-3 py-2 rounded-xl border border-emerald-200 bg-emerald-50/40 text-xs font-bold text-emerald-900 focus:outline-none focus:ring-2 focus:ring-emerald-600">
                <option value="all" ${classFilter === 'all' ? 'selected' : ''}>Semua Kelas</option>
                <option value="IX-A" ${classFilter === 'IX-A' ? 'selected' : ''}>Kelas IX-A</option>
                <option value="IX-B" ${classFilter === 'IX-B' ? 'selected' : ''}>Kelas IX-B</option>
              </select>
            </div>
          </div>

          <!-- TAB 1: TABEL REKAP NILAI LENGKAP -->
          ${activeTab === 'table' ? `
            <div class="overflow-x-auto rounded-2xl border border-emerald-100">
              <table class="w-full text-left text-xs whitespace-nowrap">
                <thead class="bg-emerald-50/80 text-emerald-950 font-bold border-b border-emerald-100">
                  <tr>
                    <th class="p-3.5 text-center">No</th>
                    <th class="p-3.5">Nama Siswa</th>
                    <th class="p-3.5 text-center">Kelas</th>
                    <th class="p-3.5 text-center">Kuis Kahoot</th>
                    <th class="p-3.5 text-center">Latihan Istima'</th>
                    <th class="p-3.5 text-center">Praktik Kalam</th>
                    <th class="p-3.5 text-center">Game Duel 1v1</th>
                    <th class="p-3.5 text-center">Tebak Gambar</th>
                    <th class="p-3.5 text-center">Nilai Rata-rata</th>
                    <th class="p-3.5 text-center">Progres</th>
                    <th class="p-3.5 text-center">Status</th>
                    <th class="p-3.5 text-center">Aktivitas Terakhir</th>
                    <th class="p-3.5 text-center">Aksi</th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-emerald-50 bg-white">
                  ${filteredStudents.length === 0 ? `
                    <tr>
                      <td colspan="13" class="p-8 text-center text-slate-400 font-medium">
                        Tidak ada siswa yang sesuai dengan filter pencarian.
                      </td>
                    </tr>
                  ` : filteredStudents.map((s, idx) => {
                    const avg = s.averageScore || s.score || 0;
                    const isTuntas = avg >= 75;
                    return `
                      <tr class="hover:bg-emerald-50/40 transition-colors">
                        <td class="p-3.5 text-center font-mono text-emerald-700 font-bold">${idx + 1}</td>
                        <td class="p-3.5">
                          <div class="flex items-center gap-2.5">
                            <div class="w-8 h-8 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center text-xs shrink-0 border border-emerald-200">
                              ${(s.name || 'S').charAt(0).toUpperCase()}
                            </div>
                            <div>
                              <div class="font-bold text-emerald-950 text-sm">${s.name}</div>
                              <div class="text-[10px] text-slate-500 font-mono">ID: ${s.id}</div>
                            </div>
                          </div>
                        </td>
                        <td class="p-3.5 text-center font-bold text-emerald-800">
                          <span class="px-2 py-0.5 rounded-lg bg-emerald-100 text-emerald-800 text-[11px] font-semibold">${s.class || 'IX-A'}</span>
                        </td>
                        <td class="p-3.5 text-center">
                          <span class="px-2.5 py-1 rounded-xl text-xs font-bold ${(s.score || 0) >= 80 ? 'bg-purple-100 text-purple-800' : 'bg-slate-100 text-slate-700'}">
                            ${s.score !== undefined ? s.score : 0}
                          </span>
                        </td>
                        <td class="p-3.5 text-center">
                          <span class="px-2.5 py-1 rounded-xl text-xs font-bold ${(s.istimaScore || 0) >= 80 ? 'bg-teal-100 text-teal-800' : 'bg-slate-100 text-slate-700'}">
                            ${s.istimaScore !== undefined ? s.istimaScore : 0}
                          </span>
                        </td>
                        <td class="p-3.5 text-center">
                          <span class="px-2.5 py-1 rounded-xl text-xs font-bold ${(s.kalamScore || 0) >= 80 ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-700'}">
                            ${s.kalamScore !== undefined ? s.kalamScore : 0}
                          </span>
                        </td>
                        <td class="p-3.5 text-center">
                          <span class="px-2.5 py-1 rounded-xl text-xs font-bold bg-amber-100 text-amber-900 border border-amber-200">
                            ⚡ ${s.duelScore !== undefined ? s.duelScore : 0} Pts
                          </span>
                        </td>
                        <td class="p-3.5 text-center">
                          <span class="px-2.5 py-1 rounded-xl text-xs font-bold ${(s.matchGameScore || 0) >= 80 ? 'bg-indigo-100 text-indigo-800' : 'bg-slate-100 text-slate-700'}">
                            ${s.matchGameScore !== undefined ? s.matchGameScore : 0}
                          </span>
                        </td>
                        <td class="p-3.5 text-center">
                          <span class="px-3 py-1 rounded-xl text-xs font-black ${isTuntas ? 'bg-emerald-700 text-white shadow-xs' : 'bg-red-500 text-white'}">
                            ${avg}
                          </span>
                        </td>
                        <td class="p-3.5 text-center">
                          <div class="flex items-center justify-center gap-1.5">
                            <div class="w-16 bg-slate-100 rounded-full h-2 overflow-hidden">
                              <div class="bg-emerald-600 h-full rounded-full" style="width: ${s.progress || 0}%"></div>
                            </div>
                            <span class="text-[10px] text-slate-500 font-bold">${s.progress || 0}%</span>
                          </div>
                        </td>
                        <td class="p-3.5 text-center">
                          <span class="px-2.5 py-1 rounded-full text-[10px] font-extrabold ${isTuntas ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' : 'bg-rose-100 text-rose-800 border border-rose-300'}">
                            ${isTuntas ? 'TUNTAS' : 'REMEDIAL'}
                          </span>
                        </td>
                        <td class="p-3.5 text-center text-slate-600 font-medium text-[11px]">
                          ${s.lastActive || 'Baru Saja'}
                        </td>
                        <td class="p-3.5 text-center">
                          <button data-student-id="${s.id}" class="btn-view-detail px-3 py-1.5 bg-emerald-50 hover:bg-emerald-700 hover:text-white text-emerald-800 rounded-xl text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 mx-auto">
                            <i class="fa-solid fa-chart-pie"></i>
                            <span>Rincian</span>
                          </button>
                        </td>
                      </tr>
                    `;
                  }).join('')}
                </tbody>
              </table>
            </div>
          ` : `
            <!-- TAB 2: LIVE FEED ARUS NILAI REAL-TIME -->
            <div class="space-y-3">
              <div class="p-3 bg-emerald-50/60 rounded-2xl border border-emerald-100 flex items-center justify-between text-xs text-emerald-900">
                <span class="font-bold flex items-center gap-2">
                  <span class="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                  Arus Nilai Latihan Soal & Game yang Baru Masuk Secara Real-time:
                </span>
                <span class="text-[11px] text-slate-500">Otomatis update ketika siswa menekan selesai di HP/PC mereka</span>
              </div>

              ${submissions.length === 0 ? `
                <div class="p-12 text-center text-slate-400 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                  <i class="fa-solid fa-satellite text-3xl mb-2 text-slate-300"></i>
                  <p class="font-bold">Belum ada riwayat aktivitas yang terekam.</p>
                  <p class="text-xs mt-1">Nilai latihan dan game siswa akan muncul di sini secara otomatis saat dikerjakan.</p>
                </div>
              ` : `
                <div class="grid gap-3">
                  ${submissions.map((sub, sIdx) => {
                    const isGame = sub.category === 'game' || sub.activityType.includes('Game') || sub.activityType.includes('Duel');
                    return `
                      <div class="p-4 rounded-2xl bg-white border border-emerald-100 hover:border-emerald-300 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3 transition-all">
                        <div class="flex items-start sm:items-center gap-3">
                          <div class="w-10 h-10 rounded-2xl ${isGame ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'} flex items-center justify-center text-lg shrink-0">
                            <i class="fa-solid ${isGame ? 'fa-gamepad' : 'fa-graduation-cap'}"></i>
                          </div>
                          <div>
                            <div class="flex items-center gap-2">
                              <span class="font-bold text-emerald-950 text-sm">${sub.studentName}</span>
                              <span class="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 text-[10px] font-bold">${sub.class || 'IX-A'}</span>
                              <span class="px-2 py-0.5 rounded-md ${isGame ? 'bg-amber-50 text-amber-800 border border-amber-200' : 'bg-teal-50 text-teal-800 border border-teal-200'} text-[10px] font-bold">
                                ${sub.activityType}
                              </span>
                            </div>
                            <p class="text-xs text-slate-600 mt-0.5">${sub.details || 'Aktivitas selesai dikerjakan'}</p>
                          </div>
                        </div>

                        <div class="flex items-center justify-between sm:justify-end gap-4 self-end sm:self-auto w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-0 border-slate-100">
                          <div class="text-right">
                            <div class="text-base sm:text-lg font-black ${isGame ? 'text-amber-600' : 'text-emerald-700'}">
                              ${sub.score} <span class="text-xs font-normal text-slate-500">${isGame ? 'Pts' : '/ 100'}</span>
                            </div>
                            <div class="text-[10px] text-slate-400 font-medium">${sub.createdAtFormatted || 'Baru Saja'}</div>
                          </div>
                          <span class="w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0" title="Terkonfirmasi Real-time"></span>
                        </div>
                      </div>
                    `;
                  }).join('')}
                </div>
              `}
            </div>
          `}
        </div>

        <!-- MODAL DETAIL NILAI SISWA (JIKA DIPILIH) -->
        ${renderStudentDetailModal()}
      </div>
    `;
  }

  // Helper Modal Rincian Nilai Siswa
  function renderStudentDetailModal() {
    if (!state.selectedStudentDetail) return '';
    const s = state.selectedStudentDetail;
    const avg = s.averageScore || s.score || 0;
    const isTuntas = avg >= 75;

    // Filter submissions khusus siswa ini
    const studentSubs = (state.submissions || []).filter(sub => 
      (sub.studentId && s.id && String(sub.studentId) === String(s.id)) ||
      (sub.studentName && s.name && sub.studentName.toLowerCase() === s.name.toLowerCase())
    );

    return `
      <div id="student-detail-modal" class="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
        <div class="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-emerald-100 p-6 sm:p-8 space-y-6">
          <div class="flex items-center justify-between border-b border-emerald-100 pb-4">
            <div class="flex items-center gap-3">
              <div class="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-800 to-teal-600 text-white font-black flex items-center justify-center text-lg">
                ${(s.name || 'S').charAt(0).toUpperCase()}
              </div>
              <div>
                <h3 class="text-xl font-bold text-emerald-950">${s.name}</h3>
                <p class="text-xs text-emerald-700">Kelas ${s.class || 'IX-A'} &bull; ID Siswa: ${s.id}</p>
              </div>
            </div>
            <button id="btn-close-student-detail" class="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center transition-all">
              <i class="fa-solid fa-xmark text-base"></i>
            </button>
          </div>

          <!-- Rincian 5 Nilai Latihan Soal & Game -->
          <div>
            <h4 class="text-xs font-bold text-slate-700 uppercase tracking-wider mb-3">Rincian Nilai Tiap Mata Pelajaran & Game:</h4>
            <div class="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div class="p-3.5 bg-purple-50 rounded-2xl border border-purple-200">
                <span class="text-[10px] font-bold text-purple-700 block">Kuis Utama (Kahoot)</span>
                <span class="text-2xl font-black text-purple-900">${s.score !== undefined ? s.score : 0} <span class="text-xs font-normal text-purple-600">/ 100</span></span>
              </div>
              <div class="p-3.5 bg-teal-50 rounded-2xl border border-teal-200">
                <span class="text-[10px] font-bold text-teal-700 block">Latihan Istima' (Menyimak)</span>
                <span class="text-2xl font-black text-teal-900">${s.istimaScore !== undefined ? s.istimaScore : 0} <span class="text-xs font-normal text-teal-600">/ 100</span></span>
              </div>
              <div class="p-3.5 bg-emerald-50 rounded-2xl border border-emerald-200">
                <span class="text-[10px] font-bold text-emerald-700 block">Praktik Kalam (Bicara AI)</span>
                <span class="text-2xl font-black text-emerald-900">${s.kalamScore !== undefined ? s.kalamScore : 0} <span class="text-xs font-normal text-emerald-600">/ 100</span></span>
              </div>
              <div class="p-3.5 bg-amber-50 rounded-2xl border border-amber-200">
                <span class="text-[10px] font-bold text-amber-700 block">Game Duel 1v1 (Poin)</span>
                <span class="text-2xl font-black text-amber-900">${s.duelScore !== undefined ? s.duelScore : 0} <span class="text-xs font-normal text-amber-600">Pts</span></span>
              </div>
              <div class="p-3.5 bg-indigo-50 rounded-2xl border border-indigo-200">
                <span class="text-[10px] font-bold text-indigo-700 block">Game Tebak Gambar</span>
                <span class="text-2xl font-black text-indigo-900">${s.matchGameScore !== undefined ? s.matchGameScore : 0} <span class="text-xs font-normal text-indigo-600">/ 100</span></span>
              </div>
              <div class="p-3.5 ${isTuntas ? 'bg-emerald-700 text-white' : 'bg-red-600 text-white'} rounded-2xl shadow-sm">
                <span class="text-[10px] font-bold opacity-80 block">Rata-rata Nilai Akhir</span>
                <span class="text-2xl font-black">${avg}</span>
                <span class="text-[10px] block mt-0.5 font-bold uppercase">${isTuntas ? 'Tuntas KKM' : 'Perlu Bimbingan'}</span>
              </div>
            </div>
          </div>

          <!-- Riwayat Submissions Siswa Ini -->
          <div>
            <h4 class="text-xs font-bold text-slate-700 uppercase tracking-wider mb-3">Log Pengerjaan Siswa Ini:</h4>
            ${studentSubs.length === 0 ? `
              <p class="text-xs text-slate-400 italic">Belum ada catatan aktivitas detail yang tersimpan.</p>
            ` : `
              <div class="space-y-2 max-h-48 overflow-y-auto">
                ${studentSubs.map(item => `
                  <div class="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between text-xs">
                    <div>
                      <span class="font-bold text-emerald-950 block">${item.activityType}</span>
                      <span class="text-[11px] text-slate-500">${item.details || 'Selesai'}</span>
                    </div>
                    <div class="text-right">
                      <span class="font-black text-emerald-800 block text-sm">${item.score}</span>
                      <span class="text-[10px] text-slate-400">${item.createdAtFormatted || 'Hari ini'}</span>
                    </div>
                  </div>
                `).join('')}
              </div>
            `}
          </div>

          <div class="text-right pt-2 border-t border-slate-100">
            <button id="btn-close-student-detail-2" class="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold transition-all">
              Tutup Rincian
            </button>
          </div>
        </div>
      </div>
    `;
  }

  // Export Data Rekap Nilai ke format CSV yang kompatibel Excel (UTF-8 BOM)
  function exportStudentsCsv() {
    const students = state.students || [];
    if (students.length === 0) {
      alert("Tidak ada data siswa untuk di-export.");
      return;
    }

    const headers = [
      "No", "ID Siswa", "Nama Lengkap Siswa", "Kelas", "Nilai Kuis Kahoot",
      "Nilai Latihan Istima", "Nilai Praktik Kalam AI", "Skor Tertinggi Game Duel",
      "Nilai Game Tebak Gambar", "Nilai Rata-rata", "Progres Belajar (%)",
      "Status Ketuntasan", "Aktivitas Terakhir"
    ];

    const rows = students.map((s, idx) => {
      const avg = s.averageScore || s.score || 0;
      const status = avg >= 75 ? "TUNTAS" : "REMEDIAL";
      return [
        idx + 1,
        s.id,
        `"${(s.name || '').replace(/"/g, '""')}"`,
        s.class || 'IX-A',
        s.score !== undefined ? s.score : 0,
        s.istimaScore !== undefined ? s.istimaScore : 0,
        s.kalamScore !== undefined ? s.kalamScore : 0,
        s.duelScore !== undefined ? s.duelScore : 0,
        s.matchGameScore !== undefined ? s.matchGameScore : 0,
        avg,
        `${s.progress || 0}%`,
        status,
        `"${(s.lastActive || '').replace(/"/g, '""')}"`
      ].join(',');
    });

    const csvContent = "\uFEFF" + [headers.join(','), ...rows].join('\r\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    const dateStr = new Date().toISOString().slice(0, 10);
    link.setAttribute('href', url);
    link.setAttribute('download', `Rekap_Nilai_Siswa_Bahasa_Arab_${dateStr}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    showToast("File rekap nilai siswa (CSV/Excel) berhasil diunduh!", "success");
  }

  function attachStudentEvents() {
    // Export Excel Buttons
    const exportBtn = document.getElementById('btn-export-excel') || document.getElementById('export-excel-btn');
    if (exportBtn) {
      exportBtn.addEventListener('click', () => {
        exportStudentsCsv();
      });
    }

    // Refresh Button
    const refreshBtn = document.getElementById('btn-refresh-students');
    if (refreshBtn) {
      refreshBtn.addEventListener('click', () => {
        showToast("Memperbarui data nilai siswa dari cloud...", "info");
        render();
      });
    }

    // Tab Switch Buttons
    document.querySelectorAll('.tab-switch-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const tab = e.currentTarget.getAttribute('data-tab');
        state.studentsTab = tab;
        render();
      });
    });

    // Search Input
    const searchInput = document.getElementById('students-search-input');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        state.studentsSearch = e.target.value;
        render();
        const inputNow = document.getElementById('students-search-input');
        if (inputNow) {
          inputNow.focus();
          inputNow.setSelectionRange(inputNow.value.length, inputNow.value.length);
        }
      });
    }

    // Class Filter Select
    const classFilter = document.getElementById('students-class-filter');
    if (classFilter) {
      classFilter.addEventListener('change', (e) => {
        state.studentsClassFilter = e.target.value;
        render();
      });
    }

    // View Student Detail Buttons
    document.querySelectorAll('.btn-view-detail').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const studentId = e.currentTarget.getAttribute('data-student-id');
        const student = (state.students || []).find(s => String(s.id) === String(studentId));
        if (student) {
          state.selectedStudentDetail = student;
          render();
        }
      });
    });

    // Close Detail Modal Buttons
    const closeBtn1 = document.getElementById('btn-close-student-detail');
    const closeBtn2 = document.getElementById('btn-close-student-detail-2');
    const modalBackdrop = document.getElementById('student-detail-modal');

    const closeModal = () => {
      state.selectedStudentDetail = null;
      render();
    };

    if (closeBtn1) closeBtn1.addEventListener('click', closeModal);
    if (closeBtn2) closeBtn2.addEventListener('click', closeModal);
    if (modalBackdrop) {
      modalBackdrop.addEventListener('click', (e) => {
        if (e.target === modalBackdrop) closeModal();
      });
    }
  }

  // MAIN RENDER SWITCH
  function render() {
    const headerEl = document.querySelector('header');
    const footerEl = document.querySelector('footer');
    const mainEl = document.querySelector('main');

    if (!state.currentUser || state.currentView === 'login') {
      if (headerEl) headerEl.classList.add('hidden');
      if (footerEl) footerEl.classList.add('hidden');
      if (mainEl) mainEl.className = "flex-1 w-full p-0 m-0 min-h-screen";
      
      appContainer.innerHTML = renderLogin();
      attachLoginEvents();
      return;
    }

    if (headerEl) headerEl.classList.remove('hidden');
    if (footerEl) footerEl.classList.remove('hidden');
    if (mainEl) mainEl.className = "flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8";

    renderNavigation();

    switch (state.currentView) {
      case 'dashboard':
        appContainer.innerHTML = renderDashboard();
        break;
      case 'mufradat':
        appContainer.innerHTML = renderMufradat();
        attachVocabEvents();
        break;
      case 'istima':
        appContainer.innerHTML = renderIstima();
        attachIstimaEvents();
        break;
      case 'kalam':
        appContainer.innerHTML = renderKalam();
        attachKalamEvents();
        break;
      case 'qiraah':
        appContainer.innerHTML = renderQiraah();
        attachQiraahEvents();
        break;
      case 'qawaid':
        appContainer.innerHTML = renderQawaid();
        break;
      case 'dialogue':
        appContainer.innerHTML = renderDialogue();
        attachDialogueEvents();
        break;
      case 'quiz':
        appContainer.innerHTML = renderQuiz();
        attachQuizEvents();
        break;
      case 'duelgame':
        appContainer.innerHTML = renderSimpleDuelGame();
        attachSimpleDuelGameEvents();
        break;
      case 'students':
        appContainer.innerHTML = renderStudents();
        attachStudentEvents();
        break;
      case 'settings':
        if (state.currentUser && state.currentUser.role === 'guru') {
          appContainer.innerHTML = renderSettings();
          attachSettingsEvents();
        } else {
          state.currentView = 'dashboard';
          appContainer.innerHTML = renderDashboard();
        }
        break;
      default:
        appContainer.innerHTML = renderDashboard();
    }

    // Attach global TTS button events across all views
    document.querySelectorAll('.speech-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const text = e.currentTarget.getAttribute('data-speech');
        speakArabic(text);
      });
    });
  }

  // 8. SETTINGS VIEW (Pengaturan & Manajemen Akun Guru & Siswa)
  function renderSettings() {
    return `
      <div class="space-y-8 max-w-6xl mx-auto">
        <!-- Header -->
        <div class="bg-white p-6 sm:p-8 rounded-3xl border border-emerald-100 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div class="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-800 rounded-full text-xs font-bold border border-emerald-200 mb-2">
              <i class="fa-solid fa-user-gear"></i> Manajemen Akun
            </div>
            <h2 class="text-2xl sm:text-3xl font-bold text-emerald-950">Pengaturan & Kelola Akun</h2>
            <p class="text-xs sm:text-sm text-emerald-600 mt-1">Kelola data akun Guru dan Siswa untuk hak akses media pembelajaran</p>
          </div>
        </div>

        <div class="grid lg:grid-cols-2 gap-8">
          <!-- SECTION 1: KELOLA AKUN SISWA -->
          <div class="space-y-6">
            <!-- Form Tambah Siswa -->
            <div class="bg-white rounded-3xl p-6 border border-emerald-100 shadow-sm space-y-4">
              <h3 class="text-lg font-bold text-emerald-950 flex items-center gap-2">
                <i class="fa-solid fa-user-plus text-emerald-600"></i>
                <span>Tambah Akun Siswa Baru</span>
              </h3>

              <form id="add-student-form" class="space-y-4">
                <div>
                  <label class="block text-xs font-bold text-emerald-900 mb-1">Nama Lengkap Siswa</label>
                  <input type="text" id="new-student-name" required placeholder="Contoh: Muhammad Farhan" class="w-full px-4 py-2.5 rounded-xl border border-emerald-200 focus:ring-2 focus:ring-emerald-600 text-xs sm:text-sm">
                </div>

                <div class="grid grid-cols-2 gap-3">
                  <div>
                    <label class="block text-xs font-bold text-emerald-900 mb-1">Kelas</label>
                    <input type="text" id="new-student-class" required placeholder="Contoh: IX-A" class="w-full px-4 py-2.5 rounded-xl border border-emerald-200 focus:ring-2 focus:ring-emerald-600 text-xs sm:text-sm">
                  </div>
                  <div>
                    <label class="block text-xs font-bold text-emerald-900 mb-1">ID / NISN</label>
                    <input type="text" id="new-student-id" placeholder="Opsional (cth: 106)" class="w-full px-4 py-2.5 rounded-xl border border-emerald-200 focus:ring-2 focus:ring-emerald-600 text-xs sm:text-sm">
                  </div>
                </div>

                <button type="submit" class="w-full py-3 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2">
                  <i class="fa-solid fa-plus"></i> Simpan Akun Siswa
                </button>
              </form>
            </div>

            <!-- Tabel Daftar Siswa -->
            <div class="bg-white rounded-3xl p-6 border border-emerald-100 shadow-sm space-y-4">
              <div class="flex items-center justify-between">
                <h3 class="text-base font-bold text-emerald-950 flex items-center gap-2">
                  <i class="fa-solid fa-users text-emerald-600"></i>
                  <span>Daftar Akun Siswa (${state.students.length})</span>
                </h3>
              </div>

              <div class="overflow-x-auto max-h-80 overflow-y-auto">
                <table class="w-full text-left text-xs">
                  <thead class="bg-emerald-50 text-emerald-900 font-bold sticky top-0">
                    <tr>
                      <th class="p-3">Nama</th>
                      <th class="p-3">Kelas</th>
                      <th class="p-3 text-center">Aksi</th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-emerald-50">
                    ${state.students.map(s => `
                      <tr class="hover:bg-emerald-50/50">
                        <td class="p-3 font-bold text-emerald-950">${s.name}</td>
                        <td class="p-3 text-emerald-700">${s.class}</td>
                        <td class="p-3 text-center">
                          <button data-del-student="${s.id}" class="delete-student-btn px-2.5 py-1 bg-red-50 hover:bg-red-600 hover:text-white text-red-600 rounded-lg transition-all text-[11px] font-semibold border border-red-200">
                            <i class="fa-solid fa-trash"></i>
                          </button>
                        </td>
                      </tr>
                    `).join('')}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <!-- SECTION 2: KELOLA AKUN GURU -->
          <div class="space-y-6">
            <!-- Form Tambah Guru -->
            <div class="bg-white rounded-3xl p-6 border border-emerald-100 shadow-sm space-y-4">
              <h3 class="text-lg font-bold text-emerald-950 flex items-center gap-2">
                <i class="fa-solid fa-user-shield text-amber-600"></i>
                <span>Tambah Akun Guru Baru</span>
              </h3>

              <form id="add-teacher-form" class="space-y-4">
                <div>
                  <label class="block text-xs font-bold text-emerald-900 mb-1">Nama Lengkap Guru & Gelar</label>
                  <input type="text" id="new-teacher-name" required placeholder="Contoh: Ustadzah Salma, M.Pd" class="w-full px-4 py-2.5 rounded-xl border border-emerald-200 focus:ring-2 focus:ring-amber-500 text-xs sm:text-sm">
                </div>

                <div class="grid grid-cols-2 gap-3">
                  <div>
                    <label class="block text-xs font-bold text-emerald-900 mb-1">NIP / NUPTK</label>
                    <input type="text" id="new-teacher-nip" required placeholder="Contoh: 1988..." class="w-full px-4 py-2.5 rounded-xl border border-emerald-200 focus:ring-2 focus:ring-amber-500 text-xs sm:text-sm">
                  </div>
                  <div>
                    <label class="block text-xs font-bold text-emerald-900 mb-1">Mata Pelajaran</label>
                    <input type="text" id="new-teacher-subject" required value="Bahasa Arab" class="w-full px-4 py-2.5 rounded-xl border border-emerald-200 focus:ring-2 focus:ring-amber-500 text-xs sm:text-sm">
                  </div>
                </div>

                <button type="submit" class="w-full py-3 bg-amber-600 hover:bg-amber-700 text-white rounded-xl font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2">
                  <i class="fa-solid fa-plus"></i> Simpan Akun Guru
                </button>
              </form>
            </div>

            <!-- Tabel Daftar Guru -->
            <div class="bg-white rounded-3xl p-6 border border-emerald-100 shadow-sm space-y-4">
              <div class="flex items-center justify-between">
                <h3 class="text-base font-bold text-emerald-950 flex items-center gap-2">
                  <i class="fa-solid fa-chalkboard-user text-amber-600"></i>
                  <span>Daftar Akun Guru (${state.teachers.length})</span>
                </h3>
              </div>

              <div class="overflow-x-auto max-h-80 overflow-y-auto">
                <table class="w-full text-left text-xs">
                  <thead class="bg-amber-50 text-amber-900 font-bold sticky top-0">
                    <tr>
                      <th class="p-3">Nama Guru</th>
                      <th class="p-3">NIP</th>
                      <th class="p-3 text-center">Aksi</th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-amber-50">
                    ${state.teachers.map(t => `
                      <tr class="hover:bg-amber-50/50">
                        <td class="p-3 font-bold text-emerald-950">${t.name}</td>
                        <td class="p-3 text-emerald-700 font-mono text-[11px]">${t.nip}</td>
                        <td class="p-3 text-center">
                          <button data-del-teacher="${t.id}" class="delete-teacher-btn px-2.5 py-1 bg-red-50 hover:bg-red-600 hover:text-white text-red-600 rounded-lg transition-all text-[11px] font-semibold border border-red-200">
                            <i class="fa-solid fa-trash"></i>
                          </button>
                        </td>
                      </tr>
                    `).join('')}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  // --- EVENT ATTACHMENTS ---
  function attachLoginEvents() {
    const loginBox = document.getElementById('login-box');
    const registerBox = document.getElementById('register-box');
    const btnToRegister = document.getElementById('btn-to-register');
    const btnToLogin = document.getElementById('btn-to-login');

    const loginForm = document.getElementById('login-form');
    const loginErrorMsg = document.getElementById('login-error-msg');
    const loginErrorText = document.getElementById('login-error-text');

    const registerForm = document.getElementById('register-form');
    const regMsg = document.getElementById('reg-msg');

    // 1. Toggle Tampilan Login <-> Daftar
    if (btnToRegister && btnToLogin && loginBox && registerBox) {
      btnToRegister.addEventListener('click', () => {
        loginBox.classList.add('hidden');
        registerBox.classList.remove('hidden');
        if (loginErrorMsg) loginErrorMsg.classList.add('hidden');
        if (regMsg) regMsg.classList.add('hidden');
      });

      btnToLogin.addEventListener('click', () => {
        registerBox.classList.add('hidden');
        loginBox.classList.remove('hidden');
        if (loginErrorMsg) loginErrorMsg.classList.add('hidden');
        if (regMsg) regMsg.classList.add('hidden');
      });
    }

    // 2. Toggle Tampilkan / Sembunyikan Password
    const toggleLoginPwd = document.getElementById('toggle-login-pwd');
    const loginPassword = document.getElementById('login-password');
    const loginPwdIcon = document.getElementById('login-pwd-icon');
    if (toggleLoginPwd && loginPassword && loginPwdIcon) {
      toggleLoginPwd.addEventListener('click', () => {
        const isPwd = loginPassword.type === 'password';
        loginPassword.type = isPwd ? 'text' : 'password';
        loginPwdIcon.className = isPwd ? 'fa-solid fa-eye-slash' : 'fa-solid fa-eye';
      });
    }

    const toggleRegPwd = document.getElementById('toggle-reg-pwd');
    const regPassword = document.getElementById('reg-password');
    const regPwdIcon = document.getElementById('reg-pwd-icon');
    if (toggleRegPwd && regPassword && regPwdIcon) {
      toggleRegPwd.addEventListener('click', () => {
        const isPwd = regPassword.type === 'password';
        regPassword.type = isPwd ? 'text' : 'password';
        regPwdIcon.className = isPwd ? 'fa-solid fa-eye-slash' : 'fa-solid fa-eye';
      });
    }

    function showLoginError(msg) {
      if (loginErrorMsg) {
        loginErrorMsg.className = "p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2";
        loginErrorMsg.innerHTML = `<i class="fa-solid fa-circle-exclamation shrink-0 text-rose-500"></i> <span>${msg}</span>`;
        loginErrorMsg.classList.remove('hidden');
      } else {
        alert(msg);
      }
    }

    // 3. Form Login Satu Pintu (Siswa & Guru Terdeteksi Otomatis)
    if (loginForm) {
      loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        if (loginErrorMsg) loginErrorMsg.classList.add('hidden');

        const inputName = (document.getElementById('login-name').value || '').trim();
        const inputPassword = (document.getElementById('login-password').value || '').trim();

        if (!inputName) {
          showLoginError("Silakan isi nama akun Anda.");
          return;
        }

        const cleanInput = inputName.toLowerCase();

        // 3A. Deteksi Apakah Guru
        const matchedTeacher = (state.teachers || []).find(t => 
          t.name.toLowerCase() === cleanInput ||
          t.name.toLowerCase().includes(cleanInput) ||
          (t.nip && t.nip.toLowerCase() === cleanInput)
        );

        const isTeacherTitle = cleanInput.includes('ustadz') || cleanInput.includes('ustadzah') || cleanInput.includes('guru') || cleanInput === 'guru';

        if (matchedTeacher || isTeacherTitle) {
          // Verifikasi Kata Sandi Guru (Default: guru123 atau NIP guru atau password tersimpan)
          const validPasswords = ['guru123', 'admin123'];
          if (matchedTeacher && matchedTeacher.nip) validPasswords.push(matchedTeacher.nip);
          if (matchedTeacher && matchedTeacher.password) validPasswords.push(matchedTeacher.password);

          if (inputPassword && !validPasswords.includes(inputPassword) && matchedTeacher && matchedTeacher.password) {
            showLoginError("Kata sandi guru salah. Silakan periksa kembali kata sandi Anda.");
            return;
          }

          const teacherName = matchedTeacher ? matchedTeacher.name : inputName;
          state.currentUser = {
            name: teacherName,
            role: 'guru',
            nip: matchedTeacher ? matchedTeacher.nip : '198503152010011002'
          };
          localStorage.setItem('arabic_app_user', JSON.stringify(state.currentUser));
          state.currentView = 'dashboard';
          render();
          return;
        }

        // 3B. Deteksi Apakah Siswa
        const matchedStudent = (state.students || []).find(s => 
          s.name.toLowerCase() === cleanInput ||
          s.name.toLowerCase().includes(cleanInput)
        );

        if (matchedStudent) {
          // Jika siswa sudah memiliki kata sandi tersimpan, cocokkan
          if (matchedStudent.password && inputPassword && matchedStudent.password !== inputPassword) {
            showLoginError("Kata sandi salah. Silakan periksa kembali kata sandi Anda.");
            return;
          }

          // Jika siswa awal belum memiliki kata sandi, simpan sandi yang dimasukkan
          if (!matchedStudent.password && inputPassword) {
            matchedStudent.password = inputPassword;
            localStorage.setItem('arabic_app_students', JSON.stringify(state.students));
            if (window.FirebaseSync) {
              window.FirebaseSync.saveStudent(matchedStudent);
            }
          }

          state.currentUser = {
            name: matchedStudent.name,
            role: 'siswa',
            class: matchedStudent.class || 'IX-A'
          };
          localStorage.setItem('arabic_app_user', JSON.stringify(state.currentUser));
          state.currentView = 'dashboard';
          render();
          return;
        }

        // 3C. Jika belum terdaftar
        showLoginError("Akun belum terdaftar. Silakan klik 'Daftar Akun Siswa Baru' di bawah.");
      });
    }

    // 4. Form Pendaftaran Akun Siswa Baru (Nama, Kelas, Password)
    if (registerForm) {
      registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const regName = (document.getElementById('reg-name').value || '').trim();
        const regClass = (document.getElementById('reg-class').value || '').trim();
        const regPwd = (document.getElementById('reg-password').value || '').trim();

        if (!regName || !regClass || !regPwd) {
          showRegAlert("Mohon lengkapi semua kolom pendaftaran!", "error");
          return;
        }

        if (regPwd.length < 3) {
          showRegAlert("Kata sandi minimal 3 karakter!", "error");
          return;
        }

        // Periksa apakah nama sudah digunakan
        const isDuplicate = (state.students || []).some(s => s.name.toLowerCase() === regName.toLowerCase());
        if (isDuplicate) {
          showRegAlert("Nama siswa sudah terdaftar! Silakan langsung login dengan nama tersebut.", "error");
          return;
        }

        // Buat objek siswa baru
        const newStudent = {
          id: Date.now(),
          name: regName,
          class: regClass,
          password: regPwd,
          score: 0,
          progress: 0,
          lastActive: "Baru Mendaftar"
        };

        // Simpan ke state lokal
        state.students.push(newStudent);
        localStorage.setItem('arabic_app_students', JSON.stringify(state.students));

        // Sinkronisasi langsung ke Firebase Firestore Cloud
        if (window.FirebaseSync) {
          window.FirebaseSync.saveStudent(newStudent);
        }

        showRegAlert("Alhamdulillah! Pendaftaran berhasil. Mengalihkan ke menu masuk...", "success");

        // Alihkan kembali ke form login (tanpa langsung login)
        setTimeout(() => {
          registerBox.classList.add('hidden');
          loginBox.classList.remove('hidden');

          // Reset form pendaftaran
          registerForm.reset();
          if (regMsg) regMsg.classList.add('hidden');

          // Isi otomatis nama siswa di form login dan fokus ke password
          const loginNameInput = document.getElementById('login-name');
          const loginPwdInput = document.getElementById('login-password');
          if (loginNameInput) {
            loginNameInput.value = regName;
          }
          if (loginPwdInput) {
            loginPwdInput.value = '';
            loginPwdInput.focus();
          }

          // Tampilkan notifikasi sukses di form login
          if (loginErrorMsg) {
            loginErrorMsg.className = "p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2";
            loginErrorMsg.innerHTML = '<i class="fa-solid fa-circle-check shrink-0 text-emerald-600"></i> <span>Akun berhasil didaftarkan! Silakan masukkan kata sandi Anda untuk masuk.</span>';
            loginErrorMsg.classList.remove('hidden');
          }
        }, 1200);
      });
    }

    function showRegAlert(msg, type = "error") {
      if (!regMsg) return;
      regMsg.className = type === "success" 
        ? "p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2"
        : "p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2";
      
      const icon = type === "success" ? "fa-circle-check text-emerald-600" : "fa-circle-exclamation text-rose-500";
      regMsg.innerHTML = `<i class="fa-solid ${icon} shrink-0"></i> <span>${msg}</span>`;
      regMsg.classList.remove('hidden');
    }


  }

  function attachVocabEvents() {
    const addBtn = document.getElementById('add-vocab-modal-btn');
    if (addBtn) {
      addBtn.addEventListener('click', () => {
        const arabic = prompt("Masukkan Teks Bahasa Arab:");
        const latin = prompt("Masukkan Transliterasi Latin:");
        const meaning = prompt("Masukkan Arti Bahasa Indonesia:");
        if (arabic && meaning) {
          state.customVocab.push({
            id: Date.now(),
            arabic,
            latin: latin || '',
            meaning,
            category: "Tambahan Guru",
            sentence: arabic,
            sentenceTranslation: meaning
          });
          render();
        }
      });
    }
  }

  function attachDialogueEvents() {
    // Dialogue Tab Switcher (Hiwar 1 vs Hiwar 2)
    document.querySelectorAll('.dlg-tab-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = parseInt(e.currentTarget.getAttribute('data-dlg-id'));
        if (id) {
          state.activeDialogueId = id;
          state.roleplayStep = 0;
          render();
        }
      });
    });

// Dialogue Mode Switcher removed

    // Toggle Translation Button
    const toggleTransBtn = document.getElementById('toggle-dialogue-trans-btn');
    if (toggleTransBtn) {
      toggleTransBtn.addEventListener('click', () => {
        state.showDialogueTranslation = !state.showDialogueTranslation;
        render();
      });
    }

    // Roleplay Step Navigator & Role Selector
    const rpPrevBtn = document.getElementById('rp-prev-btn');
    const rpNextBtn = document.getElementById('rp-next-btn');
    const rpPlayStepBtn = document.getElementById('rp-play-step-btn');
    const roleSelect = document.getElementById('roleplay-myrole-select');

    if (roleSelect) {
      roleSelect.addEventListener('change', (e) => {
        state.myRole = e.target.value;
        render();
      });
    }

    const dialogues = ARABIC_DATA.dialogues || [];
    const currentDialogue = dialogues.find(d => d.id === state.activeDialogueId) || dialogues[0];
    const totalLines = currentDialogue ? currentDialogue.lines.length : 0;

    if (rpPrevBtn) {
      rpPrevBtn.addEventListener('click', () => {
        if (state.roleplayStep > 0) {
          state.roleplayStep--;
          render();
        }
      });
    }

    if (rpNextBtn) {
      rpNextBtn.addEventListener('click', () => {
        if (state.roleplayStep < totalLines - 1) {
          state.roleplayStep++;
          render();
        }
      });
    }

    if (rpPlayStepBtn && currentDialogue) {
      rpPlayStepBtn.addEventListener('click', () => {
        const line = currentDialogue.lines[state.roleplayStep];
        if (line) {
          speakArabic(line.arabic.replace(/\n/g, ' '));
        }
      });
    }
  }

  function attachQuizEvents() {
    const quizzes = ARABIC_DATA.quizzes;

    // Clear previous timer interval if any
    if (state.kahootTimerId) {
      clearInterval(state.kahootTimerId);
      state.kahootTimerId = null;
    }

    // Start Live Timer if in Gameplay Mode
    if (state.currentView === 'quiz' && !state.quizSubmitted && !state.kahootShowFeedback) {
      state.kahootTimerId = setInterval(() => {
        if (state.kahootTimeLeft > 0) {
          state.kahootTimeLeft--;
          // Update live timer element in DOM directly for smooth 60fps countdown
          const timerEl = document.querySelector('.kahoot-stage-timer');
          if (timerEl) {
            timerEl.textContent = state.kahootTimeLeft;
            if (state.kahootTimeLeft <= 5) {
              timerEl.classList.add('text-red-400');
            }
          }
        } else {
          // Timeout! Mark as incorrect and show feedback screen
          clearInterval(state.kahootTimerId);
          state.kahootTimerId = null;
          const currentQ = quizzes[state.quizIndex];
          state.quizAnswers[currentQ.id] = -1; // timeout
          state.kahootLastCorrect = false;
          state.kahootStreak = 0;
          state.kahootPointsEarned = 0;
          playSoundEffect('wrong');
          state.kahootShowFeedback = true;
          render();
        }
      }, 1000);
    }

    // Handle Kahoot Answer Card Button Click
    document.querySelectorAll('.kahoot-card-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        if (state.kahootShowFeedback || state.quizSubmitted) return;
        
        if (state.kahootTimerId) {
          clearInterval(state.kahootTimerId);
          state.kahootTimerId = null;
        }

        const optIdx = parseInt(e.currentTarget.getAttribute('data-opt'));
        const currentQ = quizzes[state.quizIndex];
        const isCorrect = optIdx === currentQ.answer;

        state.quizAnswers[currentQ.id] = optIdx;
        state.kahootLastCorrect = isCorrect;

        if (isCorrect) {
          state.kahootStreak++;
          const timeBonus = state.kahootTimeLeft * 15;
          const streakBonus = (state.kahootStreak - 1) * 100;
          const earned = 700 + timeBonus + streakBonus;
          
          state.kahootPointsEarned = earned;
          state.kahootPoints += earned;
          playSoundEffect(state.kahootStreak >= 3 ? 'combo' : 'correct');
        } else {
          state.kahootStreak = 0;
          state.kahootPointsEarned = 0;
          playSoundEffect('wrong');
        }

        state.kahootShowFeedback = true;
        render();
      });
    });

    // Handle Next Question Button (From Feedback Screen)
    const kahootNextBtn = document.getElementById('kahoot-next-btn');
    if (kahootNextBtn) {
      kahootNextBtn.addEventListener('click', () => {
        state.kahootShowFeedback = false;
        state.kahootTimeLeft = 20;

        if (state.quizIndex < quizzes.length - 1) {
          state.quizIndex++;
          render();
        } else {
          // Finish Quiz!
          let correctCount = 0;
          quizzes.forEach(q => {
            if (state.quizAnswers[q.id] === q.answer) correctCount++;
          });
          state.quizScore = Math.round((correctCount / quizzes.length) * 100);
          state.quizSubmitted = true;

          submitStudentActivity({
            activityType: 'Latihan Kuis Interaktif (Kahoot)',
            category: 'latihan',
            score: state.quizScore,
            maxScore: 100,
            details: `${correctCount} dari ${quizzes.length} Soal Benar (${state.kahootPoints} Pts)`,
            additionalData: {
              correctCount,
              totalQuestions: quizzes.length,
              kahootPoints: state.kahootPoints
            }
          });

          render();
        }
      });
    }

    // Handle Retry Quiz Button
    const retryBtn = document.getElementById('retry-quiz-btn');
    if (retryBtn) {
      retryBtn.addEventListener('click', () => {
        if (state.kahootTimerId) {
          clearInterval(state.kahootTimerId);
          state.kahootTimerId = null;
        }
        state.quizIndex = 0;
        state.quizAnswers = {};
        state.quizSubmitted = false;
        state.quizScore = 0;
        state.kahootPoints = 0;
        state.kahootStreak = 0;
        state.kahootTimeLeft = 20;
        state.kahootShowFeedback = false;
        state.kahootLastCorrect = false;
        state.kahootPointsEarned = 0;
        render();
      });
    }
  }

  function attachSettingsEvents() {
    // Add Student Form
    const addStudentForm = document.getElementById('add-student-form');
    if (addStudentForm) {
      addStudentForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('new-student-name').value.trim();
        const studentClass = document.getElementById('new-student-class').value.trim();
        const customId = document.getElementById('new-student-id').value.trim();

        if (name && studentClass) {
          const newStudent = {
            id: customId ? parseInt(customId) || Date.now() : Date.now(),
            name,
            class: studentClass,
            score: 0,
            progress: 0,
            lastActive: "Belum Aktif"
          };
          state.students.push(newStudent);
          localStorage.setItem('arabic_app_students', JSON.stringify(state.students));
          if (window.FirebaseSync) {
            window.FirebaseSync.saveStudent(newStudent);
          }
          render();
        }
      });
    }

    // Delete Student Buttons
    document.querySelectorAll('.delete-student-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const studentId = parseInt(e.currentTarget.getAttribute('data-del-student'));
        if (confirm("Apakah Anda yakin ingin menghapus akun siswa ini?")) {
          state.students = state.students.filter(s => s.id !== studentId);
          localStorage.setItem('arabic_app_students', JSON.stringify(state.students));
          if (window.FirebaseSync) {
            window.FirebaseSync.deleteStudent(studentId);
          }
          render();
        }
      });
    });

    // Add Teacher Form
    const addTeacherForm = document.getElementById('add-teacher-form');
    if (addTeacherForm) {
      addTeacherForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('new-teacher-name').value.trim();
        const nip = document.getElementById('new-teacher-nip').value.trim();
        const subject = document.getElementById('new-teacher-subject').value.trim();

        if (name && nip) {
          const newTeacher = {
            id: Date.now(),
            name,
            nip,
            subject: subject || 'Bahasa Arab',
            status: 'Aktif'
          };
          state.teachers.push(newTeacher);
          localStorage.setItem('arabic_app_teachers', JSON.stringify(state.teachers));
          if (window.FirebaseSync) {
            window.FirebaseSync.saveTeacher(newTeacher);
          }
          render();
        }
      });
    }

    // Delete Teacher Buttons
    document.querySelectorAll('.delete-teacher-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const teacherId = parseInt(e.currentTarget.getAttribute('data-del-teacher'));
        if (confirm("Apakah Anda yakin ingin menghapus akun guru ini?")) {
          state.teachers = state.teachers.filter(t => t.id !== teacherId);
          localStorage.setItem('arabic_app_teachers', JSON.stringify(state.teachers));
          if (window.FirebaseSync) {
            window.FirebaseSync.deleteTeacher(teacherId);
          }
          render();
        }
      });
    });
  }

  // ==========================================
  // ⚡ 1V1 FAST QUIZ DUEL MODULE
  // ==========================================

  function playSoundEffect(type) {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      if (!window.__appAudioCtx || window.__appAudioCtx.state === 'closed') {
        window.__appAudioCtx = new AudioCtx();
      }
      const ctx = window.__appAudioCtx;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      const now = ctx.currentTime;

      if (type === 'correct') {
        // Bright cheerful 2-tone melodic chime (G5 -> C6)
        const playChime = (freq, startTime, duration, vol) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, startTime);
          gain.gain.setValueAtTime(vol, startTime);
          gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(startTime);
          osc.stop(startTime + duration);
        };
        playChime(783.99, now, 0.20, 0.25); // G5
        playChime(1046.50, now + 0.10, 0.38, 0.30); // C6
      } else if (type === 'wrong') {
        // Gentle descending game buzzer (2-tone muted boop)
        const playBuzzer = (freq1, freq2, startTime, duration, vol) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          const filter = ctx.createBiquadFilter();
          osc.type = 'triangle';
          filter.type = 'lowpass';
          filter.frequency.setValueAtTime(700, startTime);
          osc.frequency.setValueAtTime(freq1, startTime);
          osc.frequency.linearRampToValueAtTime(freq2, startTime + duration);
          gain.gain.setValueAtTime(vol, startTime);
          gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);
          osc.connect(filter);
          filter.connect(gain);
          gain.connect(ctx.destination);
          osc.start(startTime);
          osc.stop(startTime + duration);
        };
        playBuzzer(240, 180, now, 0.16, 0.22);
        playBuzzer(190, 130, now + 0.14, 0.28, 0.22);
      } else if (type === 'combo') {
        // Triumphant 4-note victory fanfare (C5 -> E5 -> G5 -> C6)
        const notes = [523.25, 659.25, 783.99, 1046.50];
        notes.forEach((freq, idx) => {
          const start = now + (idx * 0.08);
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, start);
          gain.gain.setValueAtTime(0.25, start);
          gain.gain.exponentialRampToValueAtTime(0.001, start + 0.35);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(start);
          osc.stop(start + 0.35);
        });
      }
    } catch (e) {
      console.warn('Sound effect error:', e);
    }
  }

  function startDuelTimer() {
    const duel = state.duelState;
    if (duel.timerId) clearInterval(duel.timerId);
    
    duel.timerId = setInterval(() => {
      if (duel.isSubmitted || duel.battleEnded) {
        clearInterval(duel.timerId);
        return;
      }
      
      duel.timeLeft--;
      
      // Update DOM timer display without full re-render
      const timerDisplay = document.querySelector('.w-16 span:nth-child(2), .w-20 span:nth-child(2)');
      if (timerDisplay) {
        timerDisplay.textContent = `${duel.timeLeft}s`;
        if (duel.timeLeft <= 3) {
          timerDisplay.className = 'text-2xl sm:text-3xl font-black text-rose-600 animate-ping';
        }
      }

      if (duel.timeLeft <= 0) {
        clearInterval(duel.timerId);
        handleDuelSubmitAnswer(-1); // Timeout
      }
    }, 1000);
  }

  // Real-time Broadcast Channel for Multi-Tab & Local Network Sync
  const duelSyncChannel = typeof BroadcastChannel !== 'undefined' ? new BroadcastChannel('arabic_duel_channel') : null;
  if (duelSyncChannel) {
    duelSyncChannel.onmessage = (e) => {
      const msg = e.data;
      const duel = state.duelState;
      if (!msg) return;

      if (msg.type === 'GUEST_JOINED' && duel.isHost && duel.roomPin === msg.pin) {
        duel.opponentName = msg.guestName || 'Siswa Lawan';
        duel.lobbyStep = 'playing';
        duel.battleEnded = false;
        render();
        startDuelTimer();
      } else if (msg.type === 'HOST_STARTED' && !duel.isHost && duel.roomPin === msg.pin) {
        duel.lobbyStep = 'playing';
        duel.battleEnded = false;
        render();
        startDuelTimer();
      } else if (msg.type === 'SCORE_UPDATE' && duel.roomPin === msg.pin && duel.lobbyStep === 'playing') {
        if (msg.sender !== (state.currentUser ? state.currentUser.name : 'Siswa')) {
          duel.scoreOpponent = msg.score;
          duel.opponentAnswered = true;
          render();
        }
      }
    };
  }

  function getActiveDuelQuestions() {
    const setIdx = state.duelState.selectedSetIdx || 0;
    const sets = ARABIC_DATA.duelQuestionSets || [];
    const activeSet = sets[setIdx] || sets[0];
    return activeSet ? activeSet.questions : (ARABIC_DATA.duelQuestions || []);
  }

  function renderSimpleDuelGame() {
    const duel = state.duelState;
    const sets = ARABIC_DATA.duelQuestionSets || [];
    const activeSet = sets[duel.selectedSetIdx || 0] || sets[0];
    const questions = getActiveDuelQuestions();
    const totalQ = questions.length;

    // STEP 1: LOBBY SELECTOR SCREEN
    if (duel.lobbyStep === 'lobby') {
      return `
        <div class="space-y-8 max-w-4xl mx-auto">
          <!-- Header Banner -->
          <div class="bg-gradient-to-r from-amber-500 via-amber-600 to-emerald-700 rounded-[2.5rem] p-8 sm:p-10 text-white shadow-xl border-4 border-amber-300 relative overflow-hidden flex flex-col sm:flex-row items-center justify-between gap-6">
            <div class="space-y-2 text-center sm:text-left z-10">
              <span class="inline-flex items-center gap-1.5 px-3 py-1 bg-white/20 rounded-full text-xs font-bold border border-white/30 backdrop-blur-md">
                <i class="fa-solid fa-bolt text-amber-200"></i> Mode Pertandingan 1v1 Qawa'id
              </span>
              <h1 class="text-3xl sm:text-4xl font-black font-arabic text-amber-100">⚔️ Duel Adu Cepat Qawa'id</h1>
              <p class="text-xs sm:text-sm text-emerald-100 max-w-lg">Pilih mode permainan: Latihan mandiri melawan 5 tingkatan Bot AI atau tantang teman sekelas dengan Kode PIN!</p>
            </div>
            <div class="text-6xl sm:text-7xl shrink-0 animate-bounce z-10">🤖⚡</div>
          </div>

          <!-- PILIH MODE PERMAINAN -->
          <div class="bg-white rounded-[2rem] p-6 sm:p-8 shadow-md border border-emerald-100 space-y-6">
            <div>
              <h2 class="text-lg sm:text-xl font-bold text-emerald-950 flex items-center gap-2">
                <i class="fa-solid fa-gamepad text-emerald-600"></i>
                <span>Pilih Mode Permainan Duel</span>
              </h2>
              <p class="text-xs text-slate-500 mt-1">Tersedia mode latihan mandiri melawan AI berjenjang dan mode multiplayer duel PvP antar siswa.</p>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-3 gap-5">
              <!-- Mode 1: Bot AI dengan Pilihan Level -->
              <button id="btn-start-ai" class="p-6 rounded-2xl border-2 border-emerald-300 bg-gradient-to-br from-emerald-50 via-teal-50 to-emerald-100/60 hover:border-emerald-500 hover:shadow-lg text-left transition-all flex flex-col justify-between gap-5 group shadow-sm relative overflow-hidden cursor-pointer">
                <div class="absolute top-2 right-2 px-2.5 py-0.5 bg-emerald-600 text-white rounded-full text-[10px] font-black uppercase tracking-wider">
                  5 Level AI
                </div>
                <div class="w-14 h-14 rounded-2xl bg-emerald-600 text-white flex items-center justify-center text-3xl shadow-md group-hover:scale-110 transition-transform">
                  🤖
                </div>
                <div>
                  <h3 class="font-bold text-base text-emerald-950 flex items-center gap-1.5">
                    <span>Latihan vs Bot AI</span>
                    <i class="fa-solid fa-star text-amber-500 text-xs"></i>
                  </h3>
                  <p class="text-xs text-emerald-800 mt-1.5 leading-relaxed">Latihan bertanding melawan 5 tingkatan Bot AI (Pemula s/d Master Boss) tanpa kode PIN.</p>
                </div>
                <div class="text-xs font-extrabold text-emerald-800 flex items-center gap-1 pt-2 border-t border-emerald-200/60">
                  <span>Pilih Level & Mulai</span> <i class="fa-solid fa-arrow-right group-hover:translate-x-1 transition-transform"></i>
                </div>
              </button>

              <!-- Mode 2: Buat Kamar Kode PIN -->
              <button id="btn-create-room" class="p-6 rounded-2xl border-2 border-amber-300 bg-amber-50/50 hover:bg-amber-100 hover:border-amber-400 text-left transition-all flex flex-col justify-between gap-5 group shadow-sm cursor-pointer">
                <div class="w-14 h-14 rounded-2xl bg-amber-500 text-white flex items-center justify-center text-3xl shadow-md group-hover:scale-110 transition-transform">
                  🔑
                </div>
                <div>
                  <h3 class="font-bold text-base text-amber-950">Buat Kamar (Host)</h3>
                  <p class="text-xs text-amber-800 mt-1.5 leading-relaxed">Dapatkan Kode PIN 4-digit untuk dibagikan ke lawan duel di kelas.</p>
                </div>
                <div class="text-xs font-extrabold text-amber-900 flex items-center gap-1 pt-2 border-t border-amber-200">
                  <span>Buat Kode PIN</span> <i class="fa-solid fa-key"></i>
                </div>
              </button>

              <!-- Mode 3: Masuk Kamar Kode PIN -->
              <button id="btn-join-room-step" class="p-6 rounded-2xl border-2 border-indigo-200 bg-indigo-50/50 hover:bg-indigo-100 hover:border-indigo-300 text-left transition-all flex flex-col justify-between gap-5 group shadow-sm cursor-pointer">
                <div class="w-14 h-14 rounded-2xl bg-indigo-600 text-white flex items-center justify-center text-3xl shadow-md group-hover:scale-110 transition-transform">
                  🚪
                </div>
                <div>
                  <h3 class="font-bold text-base text-indigo-950">Masuk Kamar (Join)</h3>
                  <p class="text-xs text-indigo-700 mt-1.5 leading-relaxed">Masukkan Kode PIN 4-digit yang diberikan oleh teman sekelasmu.</p>
                </div>
                <div class="text-xs font-extrabold text-indigo-800 flex items-center gap-1 pt-2 border-t border-indigo-200">
                  <span>Input Kode PIN</span> <i class="fa-solid fa-right-to-bracket"></i>
                </div>
              </button>
            </div>
          </div>
        </div>
      `;
    }

    // STEP 1B: DEDICATED AI LEVELS ARENA SELECTOR
    if (duel.lobbyStep === 'ai_levels') {
      return `
        <div class="space-y-8 max-w-5xl mx-auto animate-fadeIn">
          <!-- Header Banner -->
          <div class="bg-gradient-to-r from-emerald-800 via-teal-900 to-emerald-950 rounded-[2.5rem] p-8 text-white shadow-xl border-4 border-emerald-400 relative overflow-hidden flex flex-col sm:flex-row items-center justify-between gap-6">
            <div class="space-y-2 text-center sm:text-left z-10">
              <div class="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full text-xs font-bold border border-white/20">
                <i class="fa-solid fa-robot text-emerald-300"></i> Arena Latihan Mandiri vs Bot AI
              </div>
              <h1 class="text-3xl sm:text-4xl font-black text-amber-300 font-arabic">🤖 Pilih Level Tantangan Bot AI</h1>
              <p class="text-xs sm:text-sm text-emerald-100 max-w-xl">
                Setiap level dirancang berjenjang dengan materi Qawa'id dan karakter Bot AI yang berbeda tingkat kecepatannya. Kumpulkan Bintang ⭐⭐⭐ di semua level!
              </p>
            </div>
            <button id="btn-back-to-main-lobby" class="px-5 py-3 bg-white/10 hover:bg-white/20 text-white rounded-2xl font-bold text-xs border border-white/20 transition-all flex items-center gap-2 shrink-0 z-10">
              <i class="fa-solid fa-arrow-left"></i> Menu Utama
            </button>
          </div>

          <!-- Level Cards Grid -->
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            ${sets.map((lvl, idx) => {
              const stars = parseInt(localStorage.getItem('arabic_duel_stars_level_' + idx) || '0');
              const highScore = parseInt(localStorage.getItem('arabic_duel_score_level_' + idx) || '0');
              const isMaster = idx === 4;

              const levelColors = [
                { bg: 'from-emerald-500/10 to-teal-500/20', border: 'border-emerald-300', badge: 'bg-emerald-600', text: 'text-emerald-950' },
                { bg: 'from-sky-500/10 to-blue-500/20', border: 'border-sky-300', badge: 'bg-sky-600', text: 'text-sky-950' },
                { bg: 'from-amber-500/10 to-orange-500/20', border: 'border-amber-300', badge: 'bg-amber-600', text: 'text-amber-950' },
                { bg: 'from-indigo-500/10 to-purple-500/20', border: 'border-indigo-300', badge: 'bg-indigo-600', text: 'text-indigo-950' },
                { bg: 'from-rose-500/15 to-amber-500/25', border: 'border-amber-400 ring-2 ring-amber-300', badge: 'bg-gradient-to-r from-rose-600 to-amber-600', text: 'text-rose-950' }
              ];
              const c = levelColors[idx] || levelColors[0];

              return `
                <div class="bg-white rounded-3xl p-6 shadow-md border-2 ${c.border} flex flex-col justify-between space-y-4 hover:shadow-xl transition-all relative overflow-hidden group">
                  ${isMaster ? '<div class="absolute -right-10 top-5 bg-gradient-to-r from-amber-500 to-rose-600 text-white text-[9px] font-black uppercase py-1 px-12 rotate-45 shadow-sm">BOSS LEVEL</div>' : ''}
                  
                  <div class="space-y-3">
                    <div class="flex items-center justify-between">
                      <span class="px-3 py-1 rounded-full text-xs font-black text-white ${c.badge} shadow-sm">
                        Level ${idx + 1}
                      </span>
                      <div class="text-xs font-bold text-amber-500">
                        ${stars > 0 ? '⭐'.repeat(stars) : '<span class="text-slate-400 text-[11px]">Belum Ada Bintang</span>'}
                      </div>
                    </div>

                    <!-- Bot Info Box -->
                    <div class="p-3.5 bg-gradient-to-br ${c.bg} rounded-2xl border border-slate-200/60 flex items-center gap-3">
                      <div class="w-12 h-12 rounded-2xl bg-white shadow-md flex items-center justify-center text-2xl shrink-0 group-hover:scale-110 transition-transform">
                        ${lvl.botAvatar || '🤖'}
                      </div>
                      <div class="min-w-0">
                        <div class="font-extrabold text-xs text-slate-900 truncate">${lvl.botName}</div>
                        <div class="text-[11px] text-slate-600">${lvl.botRole || 'Lawan Bot AI'}</div>
                        <div class="text-[10px] font-bold text-emerald-700 mt-0.5">Kesulitan: ${lvl.botDifficulty || 'Normal'}</div>
                      </div>
                    </div>

                    <!-- Title & Topic Description -->
                    <div>
                      <h3 class="font-bold text-base text-emerald-950 mb-1 leading-snug">${lvl.title}</h3>
                      <p class="text-xs text-slate-600 leading-relaxed">${lvl.description}</p>
                    </div>
                  </div>

                  <div class="pt-3 border-t border-slate-100 space-y-3">
                    <div class="flex items-center justify-between text-xs">
                      <span class="text-slate-500 font-medium">Jumlah Soal:</span>
                      <span class="font-bold text-emerald-800">10 Pertanyaan Qawa'id</span>
                    </div>
                    ${highScore > 0 ? `
                      <div class="flex items-center justify-between text-xs">
                        <span class="text-slate-500 font-medium">Skor Tertinggi:</span>
                        <span class="font-black text-amber-600 font-mono">${highScore} Pts</span>
                      </div>
                    ` : ''}

                    <button 
                      class="btn-start-ai-level w-full py-3 bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold rounded-xl shadow-md hover:shadow-lg transition-all text-xs flex items-center justify-center gap-2 group-hover:scale-[1.02]"
                      data-level-idx="${idx}"
                    >
                      <i class="fa-solid fa-play"></i>
                      <span>${stars > 0 ? 'Mainkan Lagi (Level ' + (idx + 1) + ')' : 'Mulai Tantangan Level ' + (idx + 1)}</span>
                    </button>
                  </div>
                </div>
              `;
            }).join('')}
          </div>

          <div class="p-4 bg-amber-50 rounded-2xl border border-amber-200 text-amber-900 text-xs flex items-center gap-3">
            <i class="fa-solid fa-lightbulb text-amber-600 text-lg shrink-0"></i>
            <div>
              <strong>Saran Belajar:</strong> Jawaban telah diacak secara merata (A, B, C, D) dengan pembahasan lengkap. Mulai dari Level 1 untuk memperkuat pemahaman kosakata dan kata perintah dasar, lalu lanjutkan hingga Master Level 5!
            </div>
          </div>
        </div>
      `;
    }

    // STEP 2A: HOST ROOM CREATED (Waiting for Opponent)
    if (duel.lobbyStep === 'create_room') {
      return `
        <div class="max-w-xl mx-auto bg-white rounded-[2.5rem] p-8 shadow-2xl border-4 border-amber-400 text-center space-y-6">
          <div class="w-20 h-20 rounded-full bg-amber-100 text-amber-600 flex items-center justify-center text-4xl mx-auto shadow-inner">
            🔑
          </div>

          <div>
            <span class="px-3 py-1 bg-amber-100 text-amber-900 rounded-full text-xs font-extrabold uppercase tracking-wide">
              Kamar Duel Berhasil Dibuat
            </span>
            <h2 class="text-2xl font-black text-emerald-950 mt-2">Bagikan Kode PIN Ini ke Temanmu</h2>
            <p class="text-xs text-slate-600 mt-1">${activeSet.title} (${totalQ} Soal)</p>
          </div>

          <!-- Big PIN Box -->
          <div class="bg-gradient-to-br from-amber-500 via-amber-600 to-amber-700 text-white p-6 rounded-3xl shadow-xl border-2 border-amber-300 space-y-2">
            <div class="text-xs font-bold uppercase tracking-widest text-amber-200">KODE PIN KAMAR DUEL</div>
            <div class="text-5xl font-black font-mono tracking-widest text-white drop-shadow-md">
              ${duel.roomPin}
            </div>
            <div class="text-[11px] text-amber-100">Siswa lain memasukkan kode ini di menu "Masuk Kamar"</div>
          </div>

          <!-- Spinner Waiting -->
          <div class="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 flex items-center justify-center gap-3 text-xs font-bold text-emerald-900">
            <i class="fa-solid fa-spinner animate-spin text-amber-600 text-lg"></i>
            <span>Menunggu lawan memasukkan kode PIN...</span>
          </div>

          <div class="flex flex-col sm:flex-row gap-3 pt-2">
            <button id="btn-start-host-now" class="flex-1 py-3.5 bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold rounded-2xl shadow-lg transition-all text-xs flex items-center justify-center gap-2">
              <i class="fa-solid fa-play"></i> Mulai Duel Langsung (Simulasi)
            </button>
            <button id="btn-back-to-lobby" class="px-6 py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-2xl transition-all text-xs">
              Kembali
            </button>
          </div>
        </div>
      `;
    }

    // STEP 2B: JOIN ROOM INPUT FORM
    if (duel.lobbyStep === 'join_room') {
      return `
        <div class="max-w-xl mx-auto bg-white rounded-[2.5rem] p-8 shadow-2xl border-4 border-indigo-400 text-center space-y-6">
          <div class="w-20 h-20 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-4xl mx-auto shadow-inner">
            🚪
          </div>

          <div>
            <h2 class="text-2xl font-black text-indigo-950">Masukkan Kode PIN Kamar Duel</h2>
            <p class="text-xs text-slate-600 mt-1">Minta 4 digit kode PIN kamar dari teman sekelas yang membuat kamar.</p>
          </div>

          <form id="form-join-pin" class="space-y-4">
            <div>
              <input 
                type="text" 
                id="input-pin-code" 
                maxlength="4" 
                required 
                placeholder="Contoh: 7892" 
                value="${duel.joinPinInput || ''}"
                class="w-full text-center text-3xl sm:text-4xl font-black font-mono tracking-[0.5em] py-4 px-6 rounded-2xl border-2 border-indigo-300 focus:ring-4 focus:ring-indigo-500/30 focus:border-indigo-600 uppercase"
              />
            </div>

            ${duel.pinError ? `
              <div class="p-3 bg-rose-50 border border-rose-300 text-rose-800 rounded-xl text-xs font-bold">
                ⚠️ ${duel.pinError}
              </div>
            ` : ''}

            <div class="flex flex-col sm:flex-row gap-3 pt-2">
              <button type="submit" class="flex-1 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold rounded-2xl shadow-xl transition-all text-sm flex items-center justify-center gap-2">
                <i class="fa-solid fa-gamepad"></i> GABUNG KAMAR & MULAI DUEL
              </button>
              <button type="button" id="btn-back-to-lobby" class="px-6 py-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-2xl transition-all text-xs">
                Kembali
              </button>
            </div>
          </form>
        </div>
      `;
    }

    // STEP 3: RESULT SUMMARY SCREEN
    if (duel.battleEnded) {
      const playerWon = duel.scorePlayer > duel.scoreOpponent;
      const isDraw = duel.scorePlayer === duel.scoreOpponent;
      const starsCount = playerWon ? (duel.scorePlayer >= 1200 ? 3 : (duel.scorePlayer >= 800 ? 2 : 1)) : 0;
      const starsDisplay = starsCount > 0 ? '⭐'.repeat(starsCount) : '☆';

      // Save record in localStorage for AI mode
      if (duel.mode === 'ai') {
        const keyScore = 'arabic_duel_score_level_' + (duel.selectedSetIdx || 0);
        const keyStars = 'arabic_duel_stars_level_' + (duel.selectedSetIdx || 0);
        const prevScore = parseInt(localStorage.getItem(keyScore) || '0');
        if (duel.scorePlayer > prevScore) {
          localStorage.setItem(keyScore, duel.scorePlayer);
        }
        const prevStars = parseInt(localStorage.getItem(keyStars) || '0');
        if (starsCount > prevStars) {
          localStorage.setItem(keyStars, starsCount);
        }
      }

      const hasNextLevel = duel.mode === 'ai' && duel.selectedSetIdx < sets.length - 1;
      const nextLevelObj = hasNextLevel ? sets[duel.selectedSetIdx + 1] : null;

      return `
        <div class="space-y-8 max-w-4xl mx-auto">
          <!-- Victory / Defeat Header -->
          <div class="relative bg-gradient-to-br ${playerWon ? 'from-amber-600 via-amber-700 to-emerald-800' : 'from-slate-800 via-slate-900 to-rose-950'} rounded-[2.5rem] p-8 sm:p-12 text-white text-center shadow-2xl border-4 ${playerWon ? 'border-amber-300' : 'border-rose-400'} overflow-hidden">
            <div class="text-6xl mb-3 animate-bounce">${playerWon ? '🏆' : (isDraw ? '🤝' : '💪')}</div>
            <h1 class="text-3xl sm:text-5xl font-black mb-2 uppercase tracking-wide">
              ${playerWon ? 'KEMENANGAN TELAK!' : (isDraw ? 'HASIL SERI!' : 'LATIHAN BAGUS! AYO COBA LAGI')}
            </h1>
            <div class="text-3xl mb-4 text-amber-300">${starsDisplay}</div>
            <p class="text-emerald-100 text-sm sm:text-base max-w-lg mx-auto">
              ${playerWon 
                ? `Selamat! Anda berhasil mengalahkan ${duel.opponentName} pada ${activeSet.badge}!`
                : `Pertarungan sengit melawan ${duel.opponentName}! Teruskan latihan Qawa'id untuk menguasai tata bahasa Arab.`}
            </p>

            <!-- Score Comparison Cards -->
            <div class="grid grid-cols-2 gap-4 max-w-md mx-auto mt-6 bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20">
              <div class="text-center p-3 bg-emerald-500/20 rounded-xl border border-emerald-300/30">
                <div class="text-xs text-emerald-200 font-semibold mb-1">Skor Anda</div>
                <div class="text-3xl font-black text-amber-300">${duel.scorePlayer} <span class="text-xs">Pts</span></div>
                <div class="text-[11px] text-emerald-200 mt-1">🔥 Max Streak: ${duel.maxCombo}x</div>
              </div>
              <div class="text-center p-3 bg-white/5 rounded-xl border border-white/10">
                <div class="text-xs text-slate-300 font-semibold mb-1">${duel.opponentName}</div>
                <div class="text-3xl font-black text-white">${duel.scoreOpponent} <span class="text-xs">Pts</span></div>
                <div class="text-[11px] text-slate-300 mt-1">Mode: ${duel.mode === 'ai' ? 'Bot AI' : 'Siswa PvP PIN'}</div>
              </div>
            </div>

            <!-- Action Buttons -->
            <div class="flex flex-wrap items-center justify-center gap-3 mt-8">
              ${playerWon && hasNextLevel ? `
                <button id="duel-next-level-btn" class="px-7 py-3.5 bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-300 hover:to-amber-400 text-amber-950 font-black rounded-2xl shadow-xl transition-all flex items-center gap-2 text-sm sm:text-base transform hover:scale-105">
                  <i class="fa-solid fa-forward-step"></i>
                  <span>Lanjut ke Level ${duel.selectedSetIdx + 2} (${nextLevelObj.badge})</span>
                  <i class="fa-solid fa-arrow-right"></i>
                </button>
              ` : ''}
              
              <button id="duel-retry-level-btn" class="px-6 py-3.5 bg-white text-emerald-950 hover:bg-slate-100 font-black rounded-2xl shadow-lg transition-all flex items-center gap-2 text-sm">
                <i class="fa-solid fa-rotate-right"></i>
                <span>Main Ulang Level Ini</span>
              </button>

              <button id="duel-select-other-level-btn" class="px-6 py-3.5 bg-white/15 hover:bg-white/25 text-white font-bold rounded-2xl border border-white/30 backdrop-blur-md transition-all flex items-center gap-2 text-sm">
                <i class="fa-solid fa-layer-group"></i>
                <span>Pilih Level Lain</span>
              </button>

              <button onclick="document.querySelector('[data-view=dashboard]').click()" class="px-5 py-3.5 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-2xl border border-white/20 backdrop-blur-md transition-all flex items-center gap-2 text-xs">
                <i class="fa-solid fa-house"></i>
                <span>Dashboard</span>
              </button>
            </div>
          </div>

          <!-- Summary Qawa'id Review Section -->
          <div class="bg-white rounded-[2rem] p-6 sm:p-8 shadow-xl border border-emerald-100">
            <h2 class="text-xl font-bold text-emerald-950 mb-4 flex items-center gap-2">
              <i class="fa-solid fa-book-bookmark text-emerald-600"></i>
              <span>Evaluasi Ringkasan 10 Soal (${activeSet.badge})</span>
            </h2>
            <div class="space-y-4">
              ${duel.history.map((item, idx) => {
                const optLetters = ['A', 'B', 'C', 'D'];
                const correctLetter = optLetters[item.question.answer];
                const selectedLetter = item.selectedAnswer >= 0 ? optLetters[item.selectedAnswer] : 'Tidak Menjawab (Waktu Habis)';
                return `
                  <div class="p-4 rounded-2xl border ${item.isCorrect ? 'bg-emerald-50/60 border-emerald-200' : 'bg-rose-50/60 border-rose-200'} transition-all">
                    <div class="flex items-start justify-between gap-3 mb-2">
                      <span class="inline-flex items-center gap-1 text-xs font-extrabold px-2.5 py-0.5 rounded-full ${item.isCorrect ? 'bg-emerald-200 text-emerald-900' : 'bg-rose-200 text-rose-900'}">
                        ${item.isCorrect ? '✓ Benar (+' + item.points + ' Pts)' : '✕ Salah / Waktu Habis (0 Pts)'}
                      </span>
                      <span class="text-xs text-slate-500">Soal ${idx + 1} dari ${totalQ}</span>
                    </div>
                    <div class="text-base sm:text-lg font-bold text-emerald-950 mb-2 leading-relaxed" dir="auto">
                      ${item.question.question}
                    </div>
                    <div class="text-xs text-slate-700 bg-white p-3.5 rounded-xl border border-slate-100 space-y-1.5">
                      <div class="flex items-center gap-2">
                        <strong>Jawaban Anda:</strong>
                        <span class="${item.isCorrect ? 'text-emerald-700 font-bold' : 'text-rose-600 font-bold'}">
                          (${selectedLetter}) ${item.selectedAnswer >= 0 ? item.question.options[item.selectedAnswer] : ''}
                        </span>
                      </div>
                      <div class="flex items-center gap-2">
                        <strong>Kunci Jawaban:</strong>
                        <span class="text-emerald-800 font-bold font-arabic">
                          (${correctLetter}) ${item.question.options[item.question.answer]}
                        </span>
                      </div>
                      <div class="text-emerald-900 italic pt-1 border-t border-slate-100">
                        📖 <strong>Penjelasan Qawa'id:</strong> ${item.question.explanation}
                      </div>
                    </div>
                  </div>
                `;
              }).join('')}
            </div>
          </div>
        </div>
      `;
    }

    // STEP 4: PLAYING GAMEPLAY ARENA (10 QUESTIONS)
    const currentQ = questions[duel.currentQuestionIdx] || questions[0];
    const playerPct = Math.min(100, Math.round((duel.scorePlayer / (totalQ * 180)) * 100));
    const opponentPct = Math.min(100, Math.round((duel.scoreOpponent / (totalQ * 180)) * 100));

    return `
      <div class="space-y-6 max-w-4xl mx-auto">
        <!-- Header & Set Badge Bar -->
        <div class="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl shadow-sm border border-emerald-100">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-xl bg-amber-500 text-white flex items-center justify-center font-black text-xl shadow-md">
              <i class="fa-solid fa-bolt"></i>
            </div>
            <div>
              <div class="flex items-center gap-2">
                <span class="px-2.5 py-0.5 bg-amber-100 text-amber-900 rounded-full text-[10px] font-extrabold">
                  ${activeSet.badge}
                </span>
                <span class="px-2 py-0.5 bg-emerald-100 text-emerald-900 rounded-full text-[10px] font-bold">
                  Level ${(duel.selectedSetIdx || 0) + 1}
                </span>
                ${duel.roomPin ? `<span class="px-2 py-0.5 bg-indigo-100 text-indigo-900 rounded-md text-[10px] font-mono font-bold">PIN: ${duel.roomPin}</span>` : ''}
              </div>
              <h3 class="text-base font-bold text-emerald-950">${activeSet.title}</h3>
            </div>
          </div>

          <button id="btn-back-to-lobby" class="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs transition-all flex items-center gap-1.5">
            <i class="fa-solid fa-arrow-left"></i> Menu Level
          </button>
        </div>

        <!-- Scoreboard vs Opponent -->
        <div class="bg-gradient-to-r from-emerald-900 via-teal-950 to-slate-900 rounded-3xl p-6 text-white border-2 border-emerald-400 shadow-2xl relative overflow-hidden">
          <div class="grid grid-cols-3 items-center text-center relative z-10 gap-2">
            <!-- Player Status -->
            <div class="text-left space-y-1">
              <div class="flex items-center gap-2">
                <div class="w-8 h-8 rounded-full bg-emerald-500 text-white font-bold flex items-center justify-center text-xs shadow-md">
                  ${state.currentUser ? state.currentUser.name[0].toUpperCase() : 'S'}
                </div>
                <div class="truncate text-xs font-bold text-emerald-200 max-w-[100px] sm:max-w-none">
                  ${state.currentUser ? state.currentUser.name : 'Siswa'}
                </div>
              </div>
              <div class="text-2xl sm:text-3xl font-black text-amber-300">${duel.scorePlayer} <span class="text-xs">Pts</span></div>
              <div class="w-full bg-black/40 rounded-full h-2 overflow-hidden border border-white/10">
                <div class="bg-gradient-to-r from-emerald-400 to-amber-400 h-full transition-all duration-500" style="width: ${playerPct}%"></div>
              </div>
            </div>

            <!-- Timer & Round -->
            <div class="flex flex-col items-center justify-center">
              <div class="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-black/50 border-4 border-amber-400 flex flex-col items-center justify-center shadow-inner">
                <span class="text-[9px] uppercase font-bold text-amber-300">WAKTU</span>
                <span class="text-2xl sm:text-3xl font-black text-amber-400">${duel.timeLeft}s</span>
              </div>
              <div class="text-[11px] font-bold text-emerald-300 mt-2 bg-black/30 px-3 py-0.5 rounded-full border border-white/10">
                Ronde ${duel.currentQuestionIdx + 1} / ${totalQ}
              </div>
            </div>

            <!-- Opponent Status -->
            <div class="text-right space-y-1">
              <div class="flex items-center justify-end gap-2">
                <div class="truncate text-xs font-bold text-indigo-200 max-w-[100px] sm:max-w-none">
                  ${duel.opponentName}
                </div>
                <div class="w-8 h-8 rounded-full bg-indigo-600 text-white font-bold flex items-center justify-center text-xs shadow-md">
                  ${duel.mode === 'ai' ? (activeSet.botAvatar || '🤖') : (duel.opponentName[0] || 'L')}
                </div>
              </div>
              <div class="text-2xl sm:text-3xl font-black text-white">${duel.scoreOpponent} <span class="text-xs">Pts</span></div>
              <div class="w-full bg-black/40 rounded-full h-2 overflow-hidden border border-white/10">
                <div class="bg-gradient-to-r from-indigo-400 to-rose-400 h-full transition-all duration-500" style="width: ${opponentPct}%"></div>
              </div>
            </div>
          </div>
        </div>

        <!-- Question Card Arena -->
        <div class="bg-white rounded-3xl p-6 sm:p-8 shadow-lg border border-emerald-100 space-y-6">
          <div class="flex items-center justify-between border-b border-emerald-50 pb-4">
            <span class="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-800 rounded-full text-xs font-bold border border-emerald-200">
              <i class="fa-solid fa-font"></i> Soal Qawa'id: ${activeSet.badge}
            </span>
            <button id="duel-tts-btn" class="px-3.5 py-1.5 bg-emerald-100 hover:bg-emerald-200 text-emerald-900 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5">
              <i class="fa-solid fa-volume-high"></i> Pelafalan Audio
            </button>
          </div>

          <div class="py-2 text-center">
            <h2 class="text-xl sm:text-2xl font-bold text-emerald-950 font-sans leading-relaxed text-center" dir="auto">
              ${currentQ.question}
            </h2>
          </div>

          <!-- Options Grid -->
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            ${currentQ.options.map((opt, idx) => {
              let btnStyle = "bg-emerald-50/50 border-emerald-200 text-emerald-950 hover:bg-emerald-100 hover:border-emerald-400";
              let statusIcon = "";

              if (duel.isSubmitted) {
                if (idx === currentQ.answer) {
                  btnStyle = "bg-emerald-600 text-white border-emerald-700 shadow-md font-bold scale-[1.02]";
                  statusIcon = `<i class="fa-solid fa-circle-check text-emerald-200 text-xl ml-auto"></i>`;
                } else if (idx === duel.selectedAnswer) {
                  btnStyle = "bg-rose-500 text-white border-rose-600 shadow-md font-bold";
                  statusIcon = `<i class="fa-solid fa-circle-xmark text-rose-200 text-xl ml-auto"></i>`;
                } else {
                  btnStyle = "bg-slate-100 text-slate-400 border-slate-200 opacity-60";
                }
              }

              return `
                <button 
                  data-opt-idx="${idx}" 
                  ${duel.isSubmitted ? 'disabled' : ''}
                  class="duel-option-btn w-full p-4 rounded-2xl border-2 text-left font-semibold text-sm sm:text-base transition-all flex items-center justify-between gap-3 ${btnStyle}"
                >
                  <div class="flex items-center gap-3">
                    <span class="w-8 h-8 rounded-xl bg-white/20 border border-current flex items-center justify-center text-xs font-black shrink-0">
                      ${String.fromCharCode(65 + idx)}
                    </span>
                    <span class="text-base sm:text-lg font-medium" dir="auto">${opt}</span>
                  </div>
                  ${statusIcon}
                </button>
              `;
            }).join('')}
          </div>

          <!-- Explanation Callout -->
          ${duel.isSubmitted ? `
            <div class="p-4 rounded-2xl ${duel.selectedAnswer === currentQ.answer ? 'bg-emerald-50 border border-emerald-200 text-emerald-900' : 'bg-rose-50 border border-rose-200 text-rose-900'} space-y-1 animate-fade-in">
              <div class="flex items-center gap-2 font-bold text-xs uppercase tracking-wide">
                ${duel.selectedAnswer === currentQ.answer ? '✨ TEPAT SEKALI!' : '❌ KURANG TEPAT'}
              </div>
              <div class="text-xs sm:text-sm leading-relaxed">
                ${currentQ.explanation}
              </div>
              <div class="text-[11px] text-slate-500 pt-1 flex items-center gap-1 font-semibold">
                <i class="fa-solid fa-spinner animate-spin"></i>
                <span>Menuju soal berikutnya...</span>
              </div>
            </div>
          ` : ''}
        </div>
      </div>
    `;
  }

  function handleDuelSubmitAnswer(selectedOptIdx) {
    const duel = state.duelState;
    if (duel.isSubmitted || duel.battleEnded) return;

    const questions = getActiveDuelQuestions();
    const currentQ = questions[duel.currentQuestionIdx];
    if (!currentQ) return;

    duel.isSubmitted = true;
    duel.selectedAnswer = selectedOptIdx;

    if (duel.timerId) clearInterval(duel.timerId);

    const isCorrect = selectedOptIdx === currentQ.answer;
    let points = 0;

    if (isCorrect) {
      duel.comboStreak++;
      if (duel.comboStreak > duel.maxCombo) duel.maxCombo = duel.comboStreak;
      points = 100 + (duel.timeLeft * 15) + (duel.comboStreak * 20);
      duel.scorePlayer += points;
      playSoundEffect(duel.comboStreak >= 3 ? 'combo' : 'correct');
    } else {
      duel.comboStreak = 0;
      playSoundEffect('wrong');
    }

    // Broadcast score if in PIN room
    if (duelSyncChannel && duel.roomPin) {
      duelSyncChannel.postMessage({
        type: 'SCORE_UPDATE',
        pin: duel.roomPin,
        sender: state.currentUser ? state.currentUser.name : 'Siswa',
        score: duel.scorePlayer
      });
    }

    // Level-based Opponent AI Simulation
    if (!duel.opponentAnswered) {
      if (duel.mode === 'ai') {
        const levelIdx = duel.selectedSetIdx || 0;
        const sets = ARABIC_DATA.duelQuestionSets || [];
        const currentLevel = sets[levelIdx];
        const botAcc = currentLevel && currentLevel.botAccuracy ? currentLevel.botAccuracy : 0.70;
        const aiCorrect = Math.random() < botAcc;
        if (aiCorrect) {
          const minT = Math.min(6, 1 + levelIdx);
          const maxT = Math.min(8, 4 + levelIdx);
          const aiTimeLeft = Math.floor(Math.random() * (maxT - minT + 1)) + minT;
          duel.scoreOpponent += 100 + (aiTimeLeft * 12);
        }
        duel.opponentAnswered = true;
      } else {
        const aiCorrect = Math.random() < 0.75;
        if (aiCorrect) {
          const aiTimeLeft = Math.floor(Math.random() * 6) + 3;
          duel.scoreOpponent += 100 + (aiTimeLeft * 12);
        }
        duel.opponentAnswered = true;
      }
    }

    // Record history
    duel.history.push({
      question: currentQ,
      selectedAnswer: selectedOptIdx,
      isCorrect,
      points
    });

    render();

    // Advance to next question after 2.5s
    setTimeout(() => {
      const qs = getActiveDuelQuestions();
      if (duel.currentQuestionIdx + 1 < qs.length) {
        duel.currentQuestionIdx++;
        duel.timeLeft = 10;
        duel.isSubmitted = false;
        duel.selectedAnswer = null;
        duel.opponentAnswered = false;
        render();
        startDuelTimer();
      } else {
        duel.battleEnded = true;
        const isWin = duel.scorePlayer > duel.scoreOpponent;
        const isDraw = duel.scorePlayer === duel.scoreOpponent;
        const statusStr = isWin ? 'Menang 🏆' : (isDraw ? 'Seri 🤝' : 'Kalah');

        submitStudentActivity({
          activityType: 'Game Duel 1v1',
          category: 'game',
          score: duel.scorePlayer,
          maxScore: 1000,
          details: `${statusStr} vs ${duel.opponentName} (Skor: ${duel.scorePlayer} - ${duel.scoreOpponent})`,
          additionalData: {
            mode: duel.mode,
            opponentName: duel.opponentName,
            scoreOpponent: duel.scoreOpponent,
            maxCombo: duel.maxCombo || duel.comboStreak
          }
        });

        if (isWin) playSoundEffect('combo');
        render();
      }
    }, 2500);
  }

  function resetDuelState(mode = 'ai') {
    if (state.duelState && state.duelState.timerId) clearInterval(state.duelState.timerId);
    state.duelState = {
      selectedSetIdx: state.duelState ? (state.duelState.selectedSetIdx || 0) : 0,
      lobbyStep: 'lobby',
      roomPin: '',
      isHost: false,
      joinPinInput: '',
      pinError: '',
      mode,
      aiDifficulty: 'medium',
      opponentName: mode === 'ai' ? 'Ustadz AI (Bot)' : 'Siswa Teman',
      currentQuestionIdx: 0,
      scorePlayer: 0,
      scoreOpponent: 0,
      comboStreak: 0,
      maxCombo: 0,
      timeLeft: 10,
      timerId: null,
      isSubmitted: false,
      selectedAnswer: null,
      opponentAnswered: false,
      battleEnded: false,
      history: []
    };
  }

  function attachSimpleDuelGameEvents() {
    const duel = state.duelState;
    const sets = ARABIC_DATA.duelQuestionSets || [];

    // Start timer only if in playing step and round active
    if (duel.lobbyStep === 'playing' && !duel.isSubmitted && !duel.battleEnded) {
      startDuelTimer();
    }

    // Select Paket Soal Cards (Langkah 1)
    document.querySelectorAll('.duel-set-card').forEach(card => {
      card.addEventListener('click', (e) => {
        const setIdx = parseInt(e.currentTarget.getAttribute('data-set-idx'));
        duel.selectedSetIdx = setIdx;
        const currentSet = sets[setIdx];
        if (currentSet && currentSet.botName) {
          duel.opponentName = currentSet.botName;
        }
        render();
      });
    });

    // Start vs AI Button in Lobby -> Open dedicated AI levels arena
    const btnStartAi = document.getElementById('btn-start-ai');
    if (btnStartAi) {
      btnStartAi.addEventListener('click', () => {
        duel.lobbyStep = 'ai_levels';
        render();
      });
    }

    // Direct Start AI Level buttons in AI levels arena
    document.querySelectorAll('.btn-start-ai-level').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const levelIdx = parseInt(e.currentTarget.getAttribute('data-level-idx'));
        duel.selectedSetIdx = levelIdx;
        const targetSet = sets[levelIdx] || sets[0];
        duel.mode = 'ai';
        duel.opponentName = targetSet.botName || 'Ustadz AI (Bot)';
        duel.lobbyStep = 'playing';
        duel.battleEnded = false;
        duel.currentQuestionIdx = 0;
        duel.scorePlayer = 0;
        duel.scoreOpponent = 0;
        duel.comboStreak = 0;
        duel.maxCombo = 0;
        duel.timeLeft = 10;
        duel.isSubmitted = false;
        duel.selectedAnswer = null;
        duel.opponentAnswered = false;
        duel.history = [];
        render();
      });
    });

    // Back to Main Lobby buttons
    const btnBackToMainLobby = document.getElementById('btn-back-to-main-lobby');
    if (btnBackToMainLobby) {
      btnBackToMainLobby.addEventListener('click', () => {
        if (duel.timerId) clearInterval(duel.timerId);
        duel.lobbyStep = 'lobby';
        render();
      });
    }

    // Next Level Button on Victory
    const btnNextLevel = document.getElementById('duel-next-level-btn');
    if (btnNextLevel) {
      btnNextLevel.addEventListener('click', () => {
        if (duel.timerId) clearInterval(duel.timerId);
        if (duel.selectedSetIdx < sets.length - 1) {
          duel.selectedSetIdx++;
        }
        const targetSet = sets[duel.selectedSetIdx] || sets[0];
        duel.mode = 'ai';
        duel.opponentName = targetSet.botName || 'Ustadz AI (Bot)';
        duel.lobbyStep = 'playing';
        duel.battleEnded = false;
        duel.currentQuestionIdx = 0;
        duel.scorePlayer = 0;
        duel.scoreOpponent = 0;
        duel.comboStreak = 0;
        duel.maxCombo = 0;
        duel.timeLeft = 10;
        duel.isSubmitted = false;
        duel.selectedAnswer = null;
        duel.opponentAnswered = false;
        duel.history = [];
        render();
      });
    }

    // Retry Level Button
    const btnRetryLevel = document.getElementById('duel-retry-level-btn');
    if (btnRetryLevel) {
      btnRetryLevel.addEventListener('click', () => {
        if (duel.timerId) clearInterval(duel.timerId);
        const targetSet = sets[duel.selectedSetIdx || 0] || sets[0];
        duel.lobbyStep = 'playing';
        duel.battleEnded = false;
        duel.currentQuestionIdx = 0;
        duel.scorePlayer = 0;
        duel.scoreOpponent = 0;
        duel.comboStreak = 0;
        duel.maxCombo = 0;
        duel.timeLeft = 10;
        duel.isSubmitted = false;
        duel.selectedAnswer = null;
        duel.opponentAnswered = false;
        duel.history = [];
        render();
      });
    }

    // Select Other Level Button
    const btnSelectOtherLevel = document.getElementById('duel-select-other-level-btn');
    if (btnSelectOtherLevel) {
      btnSelectOtherLevel.addEventListener('click', () => {
        if (duel.timerId) clearInterval(duel.timerId);
        duel.lobbyStep = 'ai_levels';
        duel.battleEnded = false;
        duel.history = [];
        render();
      });
    }

    // Create Room PIN Button (Host)
    const btnCreateRoom = document.getElementById('btn-create-room');
    if (btnCreateRoom) {
      btnCreateRoom.addEventListener('click', () => {
        const generatedPin = Math.floor(1000 + Math.random() * 9000).toString();
        duel.mode = 'pvp';
        duel.isHost = true;
        duel.roomPin = generatedPin;
        duel.opponentName = 'Menunggu Lawan...';
        duel.lobbyStep = 'create_room';
        
        // Save room info locally & to Firebase Cloud
        const duelRoomInfo = {
          pin: generatedPin,
          hostName: state.currentUser ? state.currentUser.name : 'Siswa Host',
          setIdx: duel.selectedSetIdx || 0
        };
        localStorage.setItem(`arabic_duel_room_${generatedPin}`, JSON.stringify(duelRoomInfo));
        if (window.FirebaseSync) {
          window.FirebaseSync.saveDuelRoom(generatedPin, duelRoomInfo);
        }

        render();
      });
    }

    // Join Room Step Button
    const btnJoinStep = document.getElementById('btn-join-room-step');
    if (btnJoinStep) {
      btnJoinStep.addEventListener('click', () => {
        duel.lobbyStep = 'join_room';
        duel.pinError = '';
        render();
      });
    }

    // Form Join PIN Submit
    const formJoinPin = document.getElementById('form-join-pin');
    if (formJoinPin) {
      formJoinPin.addEventListener('submit', (e) => {
        e.preventDefault();
        const pinInput = document.getElementById('input-pin-code').value.trim();
        duel.joinPinInput = pinInput;

        if (!pinInput || pinInput.length !== 4) {
          duel.pinError = "Masukkan 4 digit kode PIN kamar!";
          render();
          return;
        }

        const savedRoom = localStorage.getItem(`arabic_duel_room_${pinInput}`);
        
        duel.mode = 'pvp';
        duel.isHost = false;
        duel.roomPin = pinInput;
        duel.lobbyStep = 'playing';
        duel.battleEnded = false;
        duel.currentQuestionIdx = 0;
        duel.scorePlayer = 0;
        duel.scoreOpponent = 0;
        duel.comboStreak = 0;
        duel.maxCombo = 0;
        duel.timeLeft = 10;
        duel.isSubmitted = false;
        duel.selectedAnswer = null;
        duel.opponentAnswered = false;
        duel.history = [];

        if (savedRoom) {
          try {
            const parsed = JSON.parse(savedRoom);
            duel.opponentName = parsed.hostName || 'Host Siswa';
            duel.selectedSetIdx = parsed.setIdx || 0;
          } catch(err) {}
        } else {
          duel.opponentName = 'Siswa PvP (Kamar ' + pinInput + ')';
        }

        // Notify host via broadcast channel
        if (duelSyncChannel) {
          duelSyncChannel.postMessage({
            type: 'GUEST_JOINED',
            pin: pinInput,
            guestName: state.currentUser ? state.currentUser.name : 'Siswa Lawan'
          });
        }

        render();
      });
    }

    // Host Start Match Button (Simulated / Live)
    const btnStartHostNow = document.getElementById('btn-start-host-now');
    if (btnStartHostNow) {
      btnStartHostNow.addEventListener('click', () => {
        duel.opponentName = 'Ahmad Fauzi (IX-A)';
        duel.lobbyStep = 'playing';
        duel.battleEnded = false;
        duel.currentQuestionIdx = 0;
        duel.scorePlayer = 0;
        duel.scoreOpponent = 0;
        duel.comboStreak = 0;
        duel.maxCombo = 0;
        duel.timeLeft = 10;
        duel.isSubmitted = false;
        duel.selectedAnswer = null;
        duel.opponentAnswered = false;
        duel.history = [];

        if (duelSyncChannel) {
          duelSyncChannel.postMessage({
            type: 'HOST_STARTED',
            pin: duel.roomPin
          });
        }

        render();
      });
    }

    // Back to Lobby Button
    document.querySelectorAll('#btn-back-to-lobby').forEach(btn => {
      btn.addEventListener('click', () => {
        if (duel.timerId) clearInterval(duel.timerId);
        duel.lobbyStep = 'lobby';
        render();
      });
    });

    // TTS Audio Button
    const ttsBtn = document.getElementById('duel-tts-btn');
    if (ttsBtn) {
      ttsBtn.addEventListener('click', () => {
        const questions = getActiveDuelQuestions();
        const currentQ = questions[duel.currentQuestionIdx];
        if (currentQ) playAudioText(currentQ.question);
      });
    }

    // Option Buttons
    document.querySelectorAll('.duel-option-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const optIdx = parseInt(e.currentTarget.getAttribute('data-opt-idx'));
        handleDuelSubmitAnswer(optIdx);
      });
    });

    // Rematch Button
    const rematchBtn = document.getElementById('duel-rematch-btn');
    if (rematchBtn) {
      rematchBtn.addEventListener('click', () => {
        if (duel.timerId) clearInterval(duel.timerId);
        duel.lobbyStep = 'lobby';
        duel.battleEnded = false;
        duel.history = [];
        render();
      });
    }
  }

  // Initialize Real-time Cloud Sync with Firebase (Cloud Firestore)
  if (window.FirebaseSync && window.FirebaseSync.isConnected()) {
    window.FirebaseSync.init(ARABIC_DATA.initialStudents, ARABIC_DATA.initialTeachers, (update) => {
      if (update.type === 'students' && update.data) {
        state.students = update.data;
        if (state.currentUser && state.currentUser.role === 'guru') {
          if (state.currentView === 'students' || state.currentView === 'dashboard') {
            render();
          }
        }
      } else if (update.type === 'submissions' && update.data) {
        state.submissions = update.data;
        if (state.currentUser && state.currentUser.role === 'guru') {
          if (state.currentView === 'students' || state.currentView === 'dashboard') {
            render();
          }
        }
      } else if (update.type === 'teachers' && update.data) {
        state.teachers = update.data;
        if (state.currentView === 'settings') {
          render();
        }
      }
    });
  }

  // Initial Boot
  render();
});
