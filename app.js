// App logic for Media Pembelajaran Bahasa Arab Kelas 9: الحفاظ على البيئة

// Ultra-Responsive Native Arabic Speech Engine (Desktop & Mobile Optimized)
(function() {
  const synth = window.speechSynthesis;
  let cachedVoices = [];
  let currentUtterance = null; // Retain reference to prevent iOS Safari GC bug
  let audioQueue = [];
  let isPlayingAudio = false;

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

  function speakArabic(text, customRate, callerBtn) {
    if (!text || text.trim() === '') return;

    unlockMobileAudio();

    if (isPlayingAudio) {
      stopArabicAudio();
      return;
    }

    stopArabicAudio();
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
              stopArabicAudio();
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
    students: [...ARABIC_DATA.initialStudents],
    teachers: [...(ARABIC_DATA.initialTeachers || [])],
    customVocab: [],
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
    if (state.isDrawerOpen) {
      drawer.classList.remove('translate-x-full');
      drawerOverlay.classList.remove('hidden');
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
      <div class="relative w-full min-h-screen flex items-center justify-center p-4 sm:p-6 lg:p-8 overflow-hidden">
        <!-- Background: High Quality Local Nature SVG + Emerald Overlay -->
        <div class="absolute inset-0 z-0">
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

        <!-- Clean Solid Login Container -->
        <div class="relative z-10 w-full max-w-md my-auto">
          <div class="bg-white rounded-[2.5rem] shadow-2xl border border-emerald-100 overflow-hidden">
            
            <!-- Header Arch Banner inside Card -->
            <div class="relative bg-gradient-to-r from-emerald-900 via-emerald-800 to-teal-800 p-6 sm:p-8 text-white overflow-hidden text-center">
              <div class="absolute -right-10 -top-10 w-36 h-36 bg-emerald-400/10 rounded-full blur-xl"></div>
              <div class="absolute -left-10 -bottom-10 w-36 h-36 bg-teal-300/10 rounded-full blur-xl"></div>
              
              <div class="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-3.5 py-1 rounded-full text-[11px] font-semibold text-emerald-200 border border-white/20 mb-3">
                <i class="fa-solid fa-seedling text-emerald-400"></i>
                <span>Media Pembelajaran Bahasa Arab</span>
              </div>
              
              <h2 class="text-3xl font-bold font-arabic leading-tight mb-1 text-white">الحفاظ على البيئة</h2>
              <p class="text-xs text-emerald-200 font-medium">Materi Kelas 9 MTs / SMP Islam</p>
            </div>

            <!-- Card Content Body -->
            <div class="p-6 sm:p-8 space-y-5">

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
                      <input type="text" id="login-name" required placeholder="Masukkan nama siswa atau guru..." class="w-full pl-11 pr-4 py-3 rounded-2xl border border-emerald-200 bg-emerald-50/30 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent text-xs sm:text-sm font-semibold text-gray-800 placeholder-gray-400 transition-all">
                    </div>
                  </div>

                  <div>
                    <label class="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wider">Kata Sandi</label>
                    <div class="relative">
                      <i class="fa-solid fa-lock absolute left-4 top-3.5 text-emerald-600 text-sm"></i>
                      <input type="password" id="login-password" required placeholder="Masukkan kata sandi..." class="w-full pl-11 pr-11 py-3 rounded-2xl border border-emerald-200 bg-emerald-50/30 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent text-xs sm:text-sm font-semibold text-gray-800 placeholder-gray-400 transition-all">
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
                      <input type="text" id="reg-name" required placeholder="Contoh: Muhammad Farhan" class="w-full pl-11 pr-4 py-2.5 sm:py-3 rounded-2xl border border-emerald-200 bg-emerald-50/30 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent text-xs sm:text-sm font-semibold text-gray-800 placeholder-gray-400 transition-all">
                    </div>
                  </div>

                  <div>
                    <label class="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wider">Kelas</label>
                    <div class="relative">
                      <i class="fa-solid fa-school absolute left-4 top-3.5 text-emerald-600 text-sm"></i>
                      <input type="text" id="reg-class" required placeholder="Contoh: IX-A, IX-B, atau 9 MTs" class="w-full pl-11 pr-4 py-2.5 sm:py-3 rounded-2xl border border-emerald-200 bg-emerald-50/30 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent text-xs sm:text-sm font-semibold text-gray-800 placeholder-gray-400 transition-all">
                    </div>
                  </div>

                  <div>
                    <label class="block text-xs font-bold text-gray-700 mb-1.5 uppercase tracking-wider">Kata Sandi</label>
                    <div class="relative">
                      <i class="fa-solid fa-key absolute left-4 top-3.5 text-emerald-600 text-sm"></i>
                      <input type="password" id="reg-password" required placeholder="Minimal 3 karakter..." class="w-full pl-11 pr-11 py-2.5 sm:py-3 rounded-2xl border border-emerald-200 bg-emerald-50/30 focus:bg-white focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent text-xs sm:text-sm font-semibold text-gray-800 placeholder-gray-400 transition-all">
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
        <div class="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-4">
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
      return `<img src="${item.image}" alt="${item.meaning}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500">`;
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
                            ${getVocabIllustration({ svgKey: opt.fallbackSvg })}
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
          alert("Selamat! Anda telah menyelesaikan seluruh Kuis Menyimak Audio Maharah Istima'!");
          state.listeningQuizIndex = 0;
          render();
        }
      });
    }

    // Match options
    document.querySelectorAll('.match-opt-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const gId = e.currentTarget.getAttribute('data-match-g');
        const oIdx = parseInt(e.currentTarget.getAttribute('data-match-o'));
        state.listeningMatchSelected[gId] = oIdx;
        render();
      });
    });
  }

  // 4. QIRA'AH VIEW (Maharah Qira'ah - Membaca Teks & Analisis I'rab Berwarna)
  function renderQiraah() {
    const reading = ARABIC_DATA.reading;
    const COLOR_BADGES = {
      emerald: "bg-emerald-50 text-emerald-950 border border-emerald-300 hover:bg-emerald-100",
      blue: "bg-blue-50 text-blue-950 border border-blue-300 hover:bg-blue-100",
      amber: "bg-amber-50 text-amber-950 border border-amber-300 hover:bg-amber-100",
      purple: "bg-purple-50 text-purple-950 border border-purple-300 hover:bg-purple-100",
      rose: "bg-rose-50 text-rose-950 border border-rose-300 hover:bg-rose-100",
      cyan: "bg-cyan-50 text-cyan-950 border border-cyan-300 hover:bg-cyan-100"
    };

    const modalToken = state.activeIrobModalToken;
    const fontSizeClass = state.qiraahFontSize === 'lg' ? 'text-3xl sm:text-4xl leading-[3.0] sm:leading-[3.4]' :
                          state.qiraahFontSize === 'sm' ? 'text-xl sm:text-2xl leading-[2.6] sm:leading-[2.8]' :
                          'text-2xl sm:text-3xl leading-[2.8] sm:leading-[3.2]';

    return `
      <div class="space-y-8 max-w-5xl mx-auto">
        <!-- Main Card Container -->
        <div class="bg-white rounded-2xl sm:rounded-3xl lg:rounded-[2.5rem] p-4 sm:p-8 lg:p-10 border border-emerald-100 shadow-sm space-y-5 sm:space-y-6">
          
          <!-- Header Banner -->
          <div class="border-b border-emerald-100 pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div class="inline-flex items-center gap-2 bg-teal-50 text-teal-800 px-3.5 py-1 rounded-full text-xs font-bold border border-teal-200 mb-2">
                <i class="fa-solid fa-book-open text-teal-600"></i>
                <span>مَهَارَةُ الْقِرَاءَةِ وَتَحْلِيلُ الإِعْرَابِ (Maharah Qira'ah & I'rab)</span>
              </div>
              <h2 class="text-3xl sm:text-5xl font-extrabold font-arabic text-emerald-950 leading-relaxed text-right dir-rtl">${reading.title}</h2>
              <p class="text-xs sm:text-sm text-emerald-700 font-medium mt-1">${reading.titleTranslation}</p>
            </div>

            <!-- Action Controls -->
            <div class="flex flex-wrap items-center gap-2 self-start sm:self-auto">
              <!-- Font Size Selector -->
              <div class="inline-flex items-center bg-emerald-50 border border-emerald-200 rounded-2xl p-1 shadow-sm text-xs font-bold">
                <button id="qiraah-font-sm" class="px-2.5 py-1.5 rounded-xl transition-all ${state.qiraahFontSize === 'sm' ? 'bg-emerald-700 text-white shadow-xs' : 'text-emerald-800 hover:bg-emerald-100'}" title="Ukuran Teks Sedang">A-</button>
                <button id="qiraah-font-md" class="px-2.5 py-1.5 rounded-xl transition-all ${!state.qiraahFontSize || state.qiraahFontSize === 'md' ? 'bg-emerald-700 text-white shadow-xs' : 'text-emerald-800 hover:bg-emerald-100'}" title="Ukuran Teks Normal">A</button>
                <button id="qiraah-font-lg" class="px-2.5 py-1.5 rounded-xl transition-all ${state.qiraahFontSize === 'lg' ? 'bg-emerald-700 text-white shadow-xs' : 'text-emerald-800 hover:bg-emerald-100'}" title="Ukuran Teks Besar">A+</button>
              </div>

              <!-- Master Toggle Translation Button -->
              <button id="toggle-qiraah-trans-btn" class="px-4 py-2.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 rounded-2xl text-xs font-bold border border-emerald-200 transition-all flex items-center gap-2 shadow-sm">
                <i class="fa-solid ${state.showQiraahTranslation ? 'fa-eye-slash text-emerald-600' : 'fa-eye text-emerald-600'}"></i>
                <span>${state.showQiraahTranslation ? 'Sembunyikan Semua Arti' : 'Tampilkan Arti Bahasa Indonesia'}</span>
              </button>

              <!-- Audio Play All Button -->
              <button id="play-qiraah-all-btn" class="px-4 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-2xl text-xs font-bold shadow-md transition-all flex items-center gap-2">
                <i class="fa-solid fa-volume-high"></i>
                <span>Putar Audio Teks</span>
              </button>
            </div>
          </div>

          <!-- Color Syntax & I'rab Legend Banner -->
          <div class="bg-gradient-to-br from-emerald-950 via-emerald-900 to-teal-950 text-white p-5 rounded-3xl border border-emerald-800 shadow-lg space-y-3">
            <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-emerald-800/80 pb-3">
              <div class="flex items-center gap-2 text-xs font-extrabold text-emerald-300 uppercase tracking-wider">
                <i class="fa-solid fa-palette text-amber-400 text-sm"></i>
                <span>Mode Analisis I'rab Berwarna (Klik frasa Arab untuk melihat keterangan kedudukan I'rab)</span>
              </div>
              
              <button id="toggle-irob-color-btn" class="px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all border flex items-center gap-1.5 self-start sm:self-auto ${state.showQiraahIrobColor ? 'bg-emerald-600 text-white border-emerald-400 shadow' : 'bg-white/10 text-emerald-200 border-white/20'}">
                <i class="fa-solid ${state.showQiraahIrobColor ? 'fa-toggle-on text-yellow-300' : 'fa-toggle-off'}"></i>
                <span>${state.showQiraahIrobColor ? 'Warna Syntax: AKTIF' : 'Warna Syntax: NONAKTIF'}</span>
              </button>
            </div>

            ${state.showQiraahIrobColor ? `
              <div class="flex flex-wrap items-center gap-2 text-[11px] font-bold pt-1">
                <span class="px-2.5 py-1 rounded-xl bg-emerald-100 text-emerald-950 border border-emerald-300 flex items-center gap-1">🟢 Fi'il (Kata Kerja)</span>
                <span class="px-2.5 py-1 rounded-xl bg-blue-100 text-blue-950 border border-blue-300 flex items-center gap-1">🔵 Fa'il / Subjek</span>
                <span class="px-2.5 py-1 rounded-xl bg-amber-100 text-amber-950 border border-amber-300 flex items-center gap-1">🟠 Jar & Majrur</span>
                <span class="px-2.5 py-1 rounded-xl bg-purple-100 text-purple-950 border border-purple-300 flex items-center gap-1">🟣 Maf'ul Bih / Mudhaf Ilaih</span>
                <span class="px-2.5 py-1 rounded-xl bg-cyan-100 text-cyan-950 border border-cyan-300 flex items-center gap-1">🩵 Mubtada' / Khabar</span>
                <span class="px-2.5 py-1 rounded-xl bg-rose-100 text-rose-950 border border-rose-300 flex items-center gap-1">🔴 Badal / Athaf / Nahi</span>
              </div>
            ` : ''}
          </div>

          <!-- Paragraph Cards List -->
          <div class="space-y-8">
            ${reading.paragraphs.map((p, idx) => {
              const arabicLines = p.arabic.split('\n').filter(l => l.trim().length > 0);
              const isTransShown = state.showQiraahTranslation || state.openQiraahAccordions[idx];
              const hasTokens = p.tokens && p.tokens.length > 0;

              return `
                <div class="p-6 sm:p-8 rounded-[2rem] bg-emerald-50/40 border-2 border-emerald-100/90 space-y-6 shadow-sm hover:shadow-md transition-all">
                  
                  <!-- Paragraph Top Bar -->
                  <div class="flex items-center justify-between border-b border-emerald-200/60 pb-4">
                    <div class="flex items-center gap-2">
                      <span class="w-8 h-8 rounded-xl bg-emerald-700 text-white text-xs flex items-center justify-center font-bold shadow-sm">${idx + 1}</span>
                      ${p.section ? `<span class="text-xs sm:text-sm font-bold text-emerald-900 font-arabic bg-emerald-100/90 px-3.5 py-1 rounded-full border border-emerald-200">${p.section}</span>` : ''}
                    </div>

                    <div class="flex items-center gap-2">
                      <!-- Individual Translation Toggle Button -->
                      <button data-qiraah-acc="${idx}" class="qiraah-acc-btn text-xs px-3.5 py-1.5 bg-white hover:bg-emerald-100 text-emerald-800 rounded-xl border border-emerald-200 transition-all flex items-center gap-1.5 font-bold shadow-sm">
                        <i class="fa-solid ${isTransShown ? 'fa-eye-slash' : 'fa-eye'}"></i>
                        <span>${isTransShown ? 'Tutup Arti' : 'Lihat Arti'}</span>
                      </button>

                      <!-- Audio Speech Button -->
                      <button data-speech="${p.arabic.replace(/\n/g, ' ')}" class="speech-btn text-xs px-3.5 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl transition-all flex items-center gap-1.5 font-bold shadow-sm">
                        <i class="fa-solid fa-volume-high"></i>
                        <span>Dengarkan</span>
                      </button>
                    </div>
                  </div>

                  <!-- Arabic Text Lines Container (Color Coded I'rab Badges or Natural Clean Flow) -->
                  <div class="bg-white p-6 sm:p-8 rounded-3xl border border-emerald-100/80 shadow-inner text-right dir-rtl">
                    ${state.showQiraahIrobColor && hasTokens ? `
                      <div class="qiraah-interactive-passage font-arabic ${fontSizeClass} font-bold text-emerald-950 text-right dir-rtl">
                        ${(() => {
                          let html = '';
                          let runningTokens = [];

                          function flushRunningTokens() {
                            if (runningTokens.length === 0) return '';
                            const segment = `
                              <p class="my-1.5 leading-relaxed tracking-normal" style="word-spacing: 0.08em;">
                                ${runningTokens.map(item => {
                                  const bStyle = COLOR_BADGES[item.token.color] || COLOR_BADGES.emerald;
                                  return `
                                    <button data-irob-p="${idx}" data-irob-t="${item.tIdx}" class="irob-token-btn inline-block px-2.5 py-0.5 mx-1 my-1 rounded-xl ${bStyle} transition-all duration-150 align-baseline cursor-pointer hover:shadow-sm hover:scale-[1.02] shadow-2xs" title="Klik untuk penjelasan kedudukan I'rab: ${item.token.roleDesc || ''}">
                                      <span>${item.token.word}</span>
                                    </button>
                                  `;
                                }).join('')}
                              </p>
                            `;
                            runningTokens = [];
                            return segment;
                          }

                          p.tokens.forEach((token, tIdx) => {
                            const trimmed = token.word.trim();
                            // Check if token is a section number/title (starts with ١. or ٢. or ٣.)
                            if (/^[١٢٣٤٥٦٧٨٩0-9]+\./.test(trimmed)) {
                              html += flushRunningTokens();
                              const bStyle = COLOR_BADGES[token.color] || COLOR_BADGES.cyan;
                              html += `
                                <div class="mb-3 pb-2 border-b-2 border-emerald-100 flex items-center justify-between gap-3">
                                  <button data-irob-p="${idx}" data-irob-t="${tIdx}" class="irob-token-btn text-right font-arabic font-extrabold text-emerald-900 hover:text-emerald-700 transition-colors" title="Klik untuk penjelasan I'rab">
                                    <span>${token.word}</span>
                                  </button>
                                  <span class="text-xs px-3 py-1 rounded-full ${bStyle} font-sans font-bold shadow-xs">
                                    ${token.roleDesc || 'Judul Bagian'}
                                  </span>
                                </div>
                              `;
                            } else if (trimmed.startsWith('•')) {
                              html += flushRunningTokens();
                              const bStyle = COLOR_BADGES[token.color] || COLOR_BADGES.rose;
                              html += `
                                <div class="my-2.5 pr-4 border-r-4 border-emerald-500 bg-emerald-50/60 rounded-2xl p-3 flex items-center justify-between gap-3 shadow-xs">
                                  <button data-irob-p="${idx}" data-irob-t="${tIdx}" class="irob-token-btn text-right flex-1 font-arabic font-bold text-emerald-950 hover:text-emerald-800 transition-colors" title="Klik untuk penjelasan I'rab">
                                    <span>${token.word}</span>
                                  </button>
                                  <span class="text-xs px-3 py-1 rounded-full ${bStyle} font-sans font-bold whitespace-nowrap shadow-xs">
                                    ${token.roleDesc || 'I\'rab'}
                                  </span>
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
                      <div class="qiraah-clean-passage font-arabic ${fontSizeClass} font-bold text-emerald-950 text-right dir-rtl space-y-3">
                        ${arabicLines.map(line => {
                          const isNumbered = /^[١٢٣٤٥٦٧٨٩0-9]+\./.test(line.trim());
                          const isBullet = line.trim().startsWith('•');
                          if (isNumbered) {
                            return `
                              <div class="font-extrabold text-emerald-900 border-b border-emerald-200/80 pb-2 mb-2">
                                ${line}
                              </div>
                            `;
                          }
                          if (isBullet) {
                            return `
                              <div class="pr-5 border-r-4 border-emerald-600 bg-emerald-50/70 p-4 rounded-2xl my-2.5 shadow-xs">
                                ${line}
                              </div>
                            `;
                          }
                          return `
                            <p class="py-1 leading-relaxed tracking-normal" style="word-spacing: 0.08em;">
                              ${line}
                            </p>
                          `;
                        }).join('')}
                      </div>
                    `}
                  </div>

                  <!-- Indonesian Translation (Hidden by default, expandable) -->
                  ${isTransShown ? `
                    <div class="text-xs sm:text-sm text-emerald-900 pt-4 border-t border-emerald-200/80 leading-relaxed font-sans bg-white/95 p-5 rounded-2xl space-y-1 shadow-xs border border-emerald-100">
                      <div class="flex items-center gap-2 text-emerald-800 font-bold mb-1">
                        <i class="fa-solid fa-language text-emerald-600"></i>
                        <span>Terjemahan Bahasa Indonesia:</span>
                      </div>
                      <p class="whitespace-pre-line text-emerald-950 leading-relaxed">${p.translation}</p>
                    </div>
                  ` : ''}

                </div>
              `;
            }).join('')}
          </div>

        </div>

        <!-- I'RAB DETAIL MODAL POPUP (Ultra Compact, Never Overflows, Always Closable) -->
        ${modalToken ? `
          <div id="irob-modal-overlay" class="fixed inset-0 z-50 overflow-y-auto bg-emerald-950/70 backdrop-blur-sm p-3 sm:p-4 flex items-center justify-center animate-fadeIn">
            
            <!-- Floating Close Button (ALWAYS VISIBLE at top-right corner of screen) -->
            <button id="floating-irob-close-btn" class="fixed top-3 right-3 sm:top-4 sm:right-4 z-[60] px-3.5 py-1.5 rounded-full bg-white/95 hover:bg-rose-600 hover:text-white text-gray-800 text-xs font-bold shadow-2xl border border-gray-300 flex items-center gap-1.5 transition-all cursor-pointer" title="Tutup Keterangan (Esc)">
              <i class="fa-solid fa-xmark font-bold text-sm"></i>
              <span>Tutup (Esc)</span>
            </button>

            <!-- Modal Box Container (Compact & wide enough so Arabic fits on 1-2 neat lines) -->
            <div id="irob-modal-box" class="bg-white rounded-2xl p-3 sm:p-3.5 max-w-md sm:max-w-lg w-full border-2 border-emerald-600 shadow-2xl space-y-1.5 sm:space-y-2 relative transform transition-all scale-100 max-h-[85vh] flex flex-col m-auto min-h-0">
              
              <!-- Modal Header (Shrink-0: Fixed at top of card) -->
              <div class="flex items-center justify-between border-b border-emerald-100 pb-1.5 shrink-0">
                <div class="flex items-center gap-2 min-w-0 pr-2">
                  <div class="w-6 h-6 sm:w-7 sm:h-7 rounded-lg bg-emerald-700 text-white font-bold flex items-center justify-center text-xs shrink-0 shadow-xs">
                    <i class="fa-solid fa-spell-check"></i>
                  </div>
                  <div class="min-w-0">
                    <h3 class="text-xs font-bold uppercase tracking-wider text-emerald-900 font-sans truncate">Keterangan I'rab</h3>
                    <span class="text-[11px] text-emerald-700 font-semibold font-sans block truncate leading-tight">${modalToken.roleDesc}</span>
                  </div>
                </div>
                <button id="close-irob-modal-btn" class="px-2.5 py-1 bg-rose-50 hover:bg-rose-100 text-rose-700 rounded-lg text-xs font-bold transition-all border border-rose-200 shrink-0 flex items-center gap-1 shadow-2xs cursor-pointer" title="Tutup Keterangan (Esc)">
                  <i class="fa-solid fa-xmark font-bold text-sm"></i>
                  <span>Tutup</span>
                </button>
              </div>

              <!-- Scrollable Body (min-h-0 ensures flex container respects max-h-[85vh]) -->
              <div class="overflow-y-auto space-y-1.5 pr-0.5 flex-1 min-h-0">
                
                <!-- Lafaz Frasa Banner (Hanya Teks Arab Lebih Kecil, Tanpa Arti) -->
                <div class="bg-emerald-50/70 py-1.5 px-3 rounded-xl border border-emerald-200 text-center space-y-0.5 shadow-2xs">
                  <span class="text-[9px] font-bold text-emerald-700 uppercase tracking-widest block font-sans">اللَّفْظُ (Lafaz Frasa):</span>
                  <h2 class="text-sm sm:text-base font-bold font-arabic text-emerald-950 py-0.5 drop-shadow-2xs dir-rtl leading-normal">${modalToken.word}</h2>
                </div>

                <!-- Grammatical Role Badge -->
                <div class="space-y-0.5">
                  <label class="text-[9px] font-bold text-gray-500 uppercase tracking-wider block font-sans">Kedudukan Jabatan Kalimat:</label>
                  <div class="px-2.5 py-1 bg-emerald-800 text-white rounded-xl font-arabic font-bold text-xs sm:text-sm text-right shadow-xs dir-rtl leading-normal">
                    ${modalToken.role}
                  </div>
                </div>

                <!-- Authentic Arabic I'rab Formula Box -->
                <div class="space-y-0.5">
                  <label class="text-[9px] font-bold text-gray-500 uppercase tracking-wider block font-sans">Penjelasan Kaidah I'rab (الإِعْرَابُ):</label>
                  <div class="px-2.5 py-1.5 bg-amber-50 rounded-xl border border-amber-200 text-amber-950 font-arabic font-semibold text-xs sm:text-sm text-right leading-relaxed dir-rtl shadow-2xs">
                    ${modalToken.irob}
                  </div>
                </div>

              </div>

              <!-- Footer Buttons (Shrink-0: Fixed at bottom of card, ALWAYS IN VIEW) -->
              <div class="pt-1.5 border-t border-gray-100 flex items-center justify-between gap-2 mt-auto shrink-0">
                <button id="modal-speak-btn" class="px-3 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold shadow-xs transition-all flex items-center gap-1.5 shrink-0">
                  <i class="fa-solid fa-volume-high text-[11px]"></i>
                  <span>Putar Suara</span>
                </button>
                <button id="close-irob-modal-btn2" class="px-3.5 py-1.5 bg-gray-100 hover:bg-rose-50 hover:text-rose-700 text-gray-700 rounded-xl text-xs font-bold transition-all border border-gray-200 flex items-center gap-1 shadow-2xs cursor-pointer">
                  <i class="fa-solid fa-xmark text-[11px]"></i>
                  <span>Tutup Keterangan</span>
                </button>
              </div>

            </div>
          </div>
        ` : ''}

      </div>
    `;
  }

  function attachQiraahEvents() {
    const masterToggleBtn = document.getElementById('toggle-qiraah-trans-btn');
    if (masterToggleBtn) {
      masterToggleBtn.addEventListener('click', () => {
        state.showQiraahTranslation = !state.showQiraahTranslation;
        render();
      });
    }

    const toggleColorBtn = document.getElementById('toggle-irob-color-btn');
    if (toggleColorBtn) {
      toggleColorBtn.addEventListener('click', () => {
        state.showQiraahIrobColor = !state.showQiraahIrobColor;
        render();
      });
    }

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

    // Master Audio Button
    const playAllBtn = document.getElementById('play-qiraah-all-btn');
    if (playAllBtn) {
      playAllBtn.addEventListener('click', () => {
        if (isPlayingAudio) {
          stopArabicAudio();
        } else {
          const allText = ARABIC_DATA.reading.paragraphs.map(p => p.arabic).join(' \n ');
          speakArabic(allText);
        }
      });
    }

    // Modal speak button
    const modalSpeakBtn = document.getElementById('modal-speak-btn');
    if (modalSpeakBtn && state.activeIrobModalToken) {
      modalSpeakBtn.addEventListener('click', () => {
        speakArabic(state.activeIrobModalToken.word);
      });
    }

    document.querySelectorAll('.qiraah-acc-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const idx = e.currentTarget.getAttribute('data-qiraah-acc');
        state.openQiraahAccordions[idx] = !state.openQiraahAccordions[idx];
        render();
      });
    });

    // Token click events for I'rab modal
    document.querySelectorAll('.irob-token-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const pIdx = e.currentTarget.getAttribute('data-irob-p');
        const tIdx = e.currentTarget.getAttribute('data-irob-t');
        if (pIdx !== null && tIdx !== null && ARABIC_DATA.reading.paragraphs[pIdx]) {
          const token = ARABIC_DATA.reading.paragraphs[pIdx].tokens[tIdx];
          if (token) {
            state.activeIrobModalToken = token;
            render();
          }
        }
      });
    });

    // Close Modal events (Multiple failsafes)
    const closeBtn1 = document.getElementById('close-irob-modal-btn');
    const closeBtn2 = document.getElementById('close-irob-modal-btn2');
    const floatCloseBtn = document.getElementById('floating-irob-close-btn');
    const overlay = document.getElementById('irob-modal-overlay');
    const modalBox = document.getElementById('irob-modal-box');

    function closeIrobModal() {
      state.activeIrobModalToken = null;
      render();
    }

    if (closeBtn1) closeBtn1.addEventListener('click', closeIrobModal);
    if (closeBtn2) closeBtn2.addEventListener('click', closeIrobModal);
    if (floatCloseBtn) floatCloseBtn.addEventListener('click', closeIrobModal);

    if (modalBox) {
      modalBox.addEventListener('click', (e) => {
        e.stopPropagation();
      });
    }

    if (overlay) {
      overlay.addEventListener('click', () => {
        closeIrobModal();
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
            <span class="text-xs font-bold text-emerald-700 uppercase tracking-widest bg-emerald-50 px-3.5 py-1 rounded-full border border-emerald-200">الْحِوَارُ الإِسْتِمَاعِيُّ وَالتَّفَاعُلِيُّ (Hiwar Interaktif)</span>
            <h2 class="text-3xl font-bold font-arabic text-emerald-950 mt-2">${currentDialogue.title}</h2>
            <p class="text-xs sm:text-sm text-emerald-700 mt-1">${currentDialogue.subtitle}</p>
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
        <div class="flex items-center gap-2 bg-emerald-100/60 p-1.5 rounded-2xl border border-emerald-200">
          ${dialogues.map(d => `
            <button data-dlg-id="${d.id}" class="dlg-tab-btn flex-1 py-3 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 ${state.activeDialogueId === d.id ? 'bg-white text-emerald-900 shadow-md border border-emerald-200 font-arabic' : 'text-emerald-700 hover:bg-white/50'}">
              <i class="fa-solid fa-comments text-emerald-600"></i>
              <span>${d.title}</span>
            </button>
          `).join('')}
        </div>

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
            <span>${currentDialogue.instruction} (${currentDialogue.instructionTranslation})</span>
          </div>
        </div>

        <!-- Topic Images Showcase (If Available in Dialogue) -->
        ${currentDialogue.topicImages && currentDialogue.topicImages.length > 0 ? `
          <div class="bg-emerald-900/95 text-white p-6 rounded-3xl shadow-xl space-y-4 border border-emerald-700">
            <div class="flex items-center justify-between border-b border-emerald-700/80 pb-3">
              <span class="text-xs font-bold uppercase tracking-widest text-emerald-300 font-arabic">أُنْظُرُوا إِلَى الصُّوْرَتَيْنِ (Perhatikan Kedua Gambar)</span>
              <span class="text-xs text-emerald-200">Materi Diskusi Percakapan</span>
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
                    <span class="text-[9px] font-semibold text-emerald-700 text-center">${line.role.split('(')[0]}</span>
                  </div>

                  <!-- Compact Speech Bubble Box -->
                  <div class="w-full max-w-lg sm:max-w-xl">
                    <div class="relative px-3.5 py-2.5 sm:px-4 sm:py-3 rounded-2xl border-2 ${styleClass} shadow-sm transition-all hover:shadow space-y-1.5">
                      
                      <!-- Header speech action -->
                      <div class="flex items-center justify-between border-b border-black/5 pb-1">
                        <span class="text-[10px] font-bold uppercase tracking-wider text-emerald-900 opacity-75 font-sans">${line.speaker} (${line.role})</span>
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
    return `
      <div class="space-y-6">
        <div class="bg-white p-6 rounded-3xl border border-emerald-100 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 class="text-2xl font-bold text-emerald-950">Monitoring & Releas Nilai Siswa</h2>
            <p class="text-xs text-emerald-600 mt-0.5">Daftar pencapaian siswa pada materi الحفاظ على البيئة</p>
          </div>
          <button id="export-excel-btn" class="px-4 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold shadow-md flex items-center gap-2">
            <i class="fa-solid fa-file-excel"></i> Export Rekap Data
          </button>
        </div>

        <div class="bg-white rounded-3xl border border-emerald-100 shadow-sm overflow-hidden">
          <div class="overflow-x-auto">
            <table class="w-full text-left text-xs">
              <thead class="bg-emerald-50 text-emerald-900 font-bold border-b border-emerald-100">
                <tr>
                  <th class="p-4">ID Siswa</th>
                  <th class="p-4">Nama Siswa</th>
                  <th class="p-4">Kelas</th>
                  <th class="p-4">Skor Kuis</th>
                  <th class="p-4">Progres (%)</th>
                  <th class="p-4">Aktivitas Terakhir</th>
                  <th class="p-4 text-center">Status</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-emerald-50">
                ${state.students.map(s => `
                  <tr class="hover:bg-emerald-50/50 transition-colors">
                    <td class="p-4 font-mono text-emerald-600">${s.id}</td>
                    <td class="p-4 font-bold text-emerald-950">${s.name}</td>
                    <td class="p-4 text-emerald-700">${s.class}</td>
                    <td class="p-4">
                      <span class="px-2.5 py-1 rounded-full text-xs font-extrabold ${s.score >= 80 ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}">
                        ${s.score} / 100
                      </span>
                    </td>
                    <td class="p-4">
                      <div class="w-24 bg-emerald-100 rounded-full h-2 overflow-hidden">
                        <div class="bg-emerald-600 h-full rounded-full" style="width: ${s.progress}%"></div>
                      </div>
                    </td>
                    <td class="p-4 text-emerald-600">${s.lastActive}</td>
                    <td class="p-4 text-center">
                      <span class="px-2 py-0.5 rounded-md text-[10px] font-bold ${s.score >= 75 ? 'bg-emerald-600 text-white' : 'bg-red-500 text-white'}">
                        ${s.score >= 75 ? 'TUNTAS' : 'REMEDIAL'}
                      </span>
                    </td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;
  }

  function attachStudentEvents() {
    const exportBtn = document.getElementById('export-excel-btn');
    if (exportBtn) {
      exportBtn.addEventListener('click', () => {
        alert("Data rekap nilai siswa berhasil di-export ke format CSV/Excel!");
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
        } else {
          state.kahootStreak = 0;
          state.kahootPointsEarned = 0;
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

          // Save student score if logged in
          if (state.currentUser && state.currentUser.role === 'siswa') {
            const sIdx = state.students.findIndex(s => s.name === state.currentUser.name);
            if (sIdx !== -1) {
              state.students[sIdx].score = state.quizScore;
              state.students[sIdx].progress = 100;
            } else {
              state.students.push({
                id: Date.now(),
                name: state.currentUser.name,
                class: "IX-A",
                score: state.quizScore,
                progress: 100,
                lastActive: "Baru Saja"
              });
            }
            localStorage.setItem('arabic_app_students', JSON.stringify(state.students));
            
            // Sync to Firebase Cloud Database (db-lomba)
            if (window.FirebaseSync) {
              window.FirebaseSync.saveAllStudents(state.students);
              window.FirebaseSync.recordQuizSubmission({
                studentName: state.currentUser ? state.currentUser.name : 'Anonim',
                score: state.quizScore,
                correctCount: correctCount,
                totalQuestions: quizzes.length,
                quizType: 'Latihan Kuis Interaktif'
              });
            }
          }

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
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      if (type === 'correct') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(523.25, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.15);
        gain.gain.setValueAtTime(0.3, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + 0.3);
      } else if (type === 'wrong') {
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(220, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(110, ctx.currentTime + 0.25);
        gain.gain.setValueAtTime(0.3, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + 0.3);
      } else if (type === 'combo') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(587.33, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(1174.66, ctx.currentTime + 0.2);
        gain.gain.setValueAtTime(0.4, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.35);
        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + 0.35);
      }
    } catch (e) {}
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
              <h1 class="text-3xl sm:text-4xl font-black font-arabic text-amber-100">⚡ Duel Adu Cepat Qawa'id</h1>
              <p class="text-xs sm:text-sm text-emerald-100 max-w-lg">Pilih Paket Soal dan cara masuk ke kamar pertarungan bersama teman sekelas!</p>
            </div>
            <div class="text-6xl sm:text-7xl shrink-0 animate-bounce z-10">⚔️</div>
          </div>

          <!-- SECTION 1: PILIH PAKET SOAL (3 VERSI) -->
          <div class="bg-white rounded-[2rem] p-6 sm:p-8 shadow-md border border-emerald-100 space-y-4">
            <div class="flex items-center justify-between">
              <h2 class="text-lg sm:text-xl font-bold text-emerald-950 flex items-center gap-2">
                <i class="fa-solid fa-layer-group text-amber-600"></i>
                <span>Langkah 1: Pilih Versi Paket Soal (10 Soal per Ronde)</span>
              </h2>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              ${sets.map((s, idx) => {
                const isSelected = (duel.selectedSetIdx || 0) === idx;
                return `
                  <div 
                    data-set-idx="${idx}"
                    class="duel-set-card cursor-pointer p-5 rounded-2xl border-2 transition-all flex flex-col justify-between ${isSelected ? 'bg-amber-50 border-amber-500 shadow-md scale-[1.02]' : 'bg-white border-emerald-100 hover:border-emerald-300 hover:bg-emerald-50/40'}"
                  >
                    <div>
                      <div class="flex items-center justify-between mb-2">
                        <span class="px-2.5 py-0.5 rounded-full text-[11px] font-extrabold ${isSelected ? 'bg-amber-500 text-white' : 'bg-emerald-100 text-emerald-800'}">
                          ${s.badge}
                        </span>
                        ${isSelected ? '<i class="fa-solid fa-circle-check text-amber-600 text-lg"></i>' : ''}
                      </div>
                      <h3 class="text-base font-bold text-emerald-950 mb-1">${s.title}</h3>
                      <p class="text-xs text-slate-600 leading-relaxed mb-3">${s.description}</p>
                    </div>
                    <div class="pt-2 border-t border-emerald-100 text-[11px] font-bold ${isSelected ? 'text-amber-700' : 'text-emerald-700'}">
                      ✓ ${s.questions.length} Pertanyaan Qawa'id
                    </div>
                  </div>
                `;
              }).join('')}
            </div>
          </div>

          <!-- SECTION 2: PILIH MODE PERMAINAN -->
          <div class="bg-white rounded-[2rem] p-6 sm:p-8 shadow-md border border-emerald-100 space-y-4">
            <h2 class="text-lg sm:text-xl font-bold text-emerald-950 flex items-center gap-2">
              <i class="fa-solid fa-gamepad text-emerald-600"></i>
              <span>Langkah 2: Pilih Cara Main Duel</span>
            </h2>

            <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <!-- Mode 1: Bot AI -->
              <button id="btn-start-ai" class="p-6 rounded-2xl border-2 border-emerald-200 bg-emerald-50/50 hover:bg-emerald-100 hover:border-emerald-400 text-left transition-all flex flex-col justify-between gap-4 group shadow-sm">
                <div class="w-12 h-12 rounded-xl bg-emerald-600 text-white flex items-center justify-center text-2xl shadow-md group-hover:scale-110 transition-transform">
                  🤖
                </div>
                <div>
                  <h3 class="font-bold text-base text-emerald-950">Latihan vs Bot AI</h3>
                  <p class="text-xs text-emerald-700 mt-1">Bertanding langsung melawan Bot AI Ustadz tanpa kode PIN.</p>
                </div>
                <div class="text-xs font-extrabold text-emerald-800 flex items-center gap-1">
                  <span>Mulai Tanding</span> <i class="fa-solid fa-arrow-right"></i>
                </div>
              </button>

              <!-- Mode 2: Buat Kamar Kode PIN -->
              <button id="btn-create-room" class="p-6 rounded-2xl border-2 border-amber-300 bg-amber-50/50 hover:bg-amber-100 hover:border-amber-400 text-left transition-all flex flex-col justify-between gap-4 group shadow-sm">
                <div class="w-12 h-12 rounded-xl bg-amber-500 text-white flex items-center justify-center text-2xl shadow-md group-hover:scale-110 transition-transform">
                  🔑
                </div>
                <div>
                  <h3 class="font-bold text-base text-amber-950">Buat Kamar (Host)</h3>
                  <p class="text-xs text-amber-800 mt-1">Dapatkan Kode PIN 4-digit untuk dibagikan ke lawan di kelas.</p>
                </div>
                <div class="text-xs font-extrabold text-amber-900 flex items-center gap-1">
                  <span>Buat Kode PIN</span> <i class="fa-solid fa-key"></i>
                </div>
              </button>

              <!-- Mode 3: Masuk Kamar Kode PIN -->
              <button id="btn-join-room-step" class="p-6 rounded-2xl border-2 border-indigo-200 bg-indigo-50/50 hover:bg-indigo-100 hover:border-indigo-300 text-left transition-all flex flex-col justify-between gap-4 group shadow-sm">
                <div class="w-12 h-12 rounded-xl bg-indigo-600 text-white flex items-center justify-center text-2xl shadow-md group-hover:scale-110 transition-transform">
                  🚪
                </div>
                <div>
                  <h3 class="font-bold text-base text-indigo-950">Masuk Kamar (Join)</h3>
                  <p class="text-xs text-indigo-700 mt-1">Masukkan Kode PIN 4-digit yang diberikan oleh temanmu.</p>
                </div>
                <div class="text-xs font-extrabold text-indigo-800 flex items-center gap-1">
                  <span>Input Kode PIN</span> <i class="fa-solid fa-right-to-bracket"></i>
                </div>
              </button>
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
      const stars = playerWon ? (duel.scorePlayer > 1200 ? '⭐⭐⭐' : '⭐⭐') : '⭐';
      
      return `
        <div class="space-y-8 max-w-4xl mx-auto">
          <!-- Victory / Defeat Header -->
          <div class="relative bg-gradient-to-br ${playerWon ? 'from-amber-600 via-amber-700 to-emerald-800' : 'from-slate-800 via-slate-900 to-rose-950'} rounded-[2.5rem] p-8 sm:p-12 text-white text-center shadow-2xl border-4 ${playerWon ? 'border-amber-300' : 'border-rose-400'} overflow-hidden">
            <div class="text-6xl mb-3 animate-bounce">${playerWon ? '🏆' : (isDraw ? '🤝' : '💔')}</div>
            <h1 class="text-3xl sm:text-5xl font-black mb-2 uppercase tracking-wide">
              ${playerWon ? 'KEMENANGAN TELAK!' : (isDraw ? 'HASIL SERI!' : 'PERATURAN ULANG!')}
            </h1>
            <div class="text-3xl mb-4">${stars}</div>
            <p class="text-emerald-100 text-sm sm:text-base max-w-lg mx-auto">
              ${playerWon 
                ? `Selamat! Anda berhasil mengalahkan ${duel.opponentName} pada ${activeSet.badge}!`
                : `Pertarungan sengit! Teruskan latihan Qawa'id untuk menguasai tata bahasa Arab.`}
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
            <div class="flex flex-wrap items-center justify-center gap-4 mt-8">
              <button id="duel-rematch-btn" class="px-8 py-3.5 bg-amber-400 hover:bg-amber-300 text-amber-950 font-black rounded-2xl shadow-xl transition-all flex items-center gap-2 text-base">
                <i class="fa-solid fa-rotate-right"></i>
                <span>Main Duel Lagi (Pilih Paket)</span>
              </button>
              <button onclick="document.querySelector('[data-view=dashboard]').click()" class="px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white font-bold rounded-2xl border border-white/20 backdrop-blur-md transition-all flex items-center gap-2 text-sm">
                <i class="fa-solid fa-house"></i>
                <span>Kembali ke Dashboard</span>
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
              ${duel.history.map((item, idx) => `
                <div class="p-4 rounded-2xl border ${item.isCorrect ? 'bg-emerald-50/60 border-emerald-200' : 'bg-rose-50/60 border-rose-200'} transition-all">
                  <div class="flex items-start justify-between gap-3 mb-2">
                    <span class="inline-flex items-center gap-1 text-xs font-extrabold px-2.5 py-0.5 rounded-full ${item.isCorrect ? 'bg-emerald-200 text-emerald-900' : 'bg-rose-200 text-rose-900'}">
                      ${item.isCorrect ? '✓ Benar (+' + item.points + ' Pts)' : '✗ Salah (0 Pts)'}
                    </span>
                    <span class="text-xs text-slate-500">Soal ${idx + 1} dari ${totalQ}</span>
                  </div>
                  <div class="text-lg font-bold font-arabic text-emerald-950 mb-2 leading-relaxed" dir="rtl">
                    ${item.question.question}
                  </div>
                  <div class="text-xs text-slate-700 bg-white p-3 rounded-xl border border-slate-100 space-y-1">
                    <div><strong>Jawaban Benar:</strong> <span class="text-emerald-700 font-semibold font-arabic">${item.question.options[item.question.answer]}</span></div>
                    <div class="text-emerald-800 italic">💡 <strong>Penjelasan Qawa'id:</strong> ${item.question.explanation}</div>
                  </div>
                </div>
              `).join('')}
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
                ${duel.roomPin ? `<span class="px-2 py-0.5 bg-indigo-100 text-indigo-900 rounded-md text-[10px] font-mono font-bold">PIN: ${duel.roomPin}</span>` : ''}
              </div>
              <h3 class="text-base font-bold text-emerald-950">${activeSet.title}</h3>
            </div>
          </div>

          <button id="btn-back-to-lobby" class="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs transition-all flex items-center gap-1.5">
            <i class="fa-solid fa-arrow-left"></i> Lobby
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
                  ${duel.mode === 'ai' ? '🤖' : (duel.opponentName[0] || 'L')}
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
              <i class="fa-solid fa-font"></i> Soal Qawa'id Kelas 9
            </span>
            <button id="duel-tts-btn" class="px-3.5 py-1.5 bg-emerald-100 hover:bg-emerald-200 text-emerald-900 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5">
              <i class="fa-solid fa-volume-high"></i> Pelafalan Audio
            </button>
          </div>

          <div class="py-2 text-center">
            <h2 class="text-2xl sm:text-3xl font-extrabold text-emerald-950 font-arabic leading-relaxed" dir="rtl">
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
                    <span class="font-arabic text-base sm:text-lg" dir="rtl">${opt}</span>
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
                ${duel.selectedAnswer === currentQ.answer ? '🎉 TEPAT SEKALI!' : '❌ KURANG TEPAT'}
              </div>
              <div class="text-xs sm:text-sm leading-relaxed">
                💡 <strong>Penjelasan Qawa'id:</strong> ${currentQ.explanation}
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

    // Simulated opponent score if not answered via socket yet
    if (!duel.opponentAnswered) {
      const aiCorrect = Math.random() < 0.75;
      if (aiCorrect) {
        const aiTimeLeft = Math.floor(Math.random() * 6) + 3;
        duel.scoreOpponent += 100 + (aiTimeLeft * 12);
      }
      duel.opponentAnswered = true;
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
      const questions = getActiveDuelQuestions();
      if (duel.currentQuestionIdx + 1 < questions.length) {
        duel.currentQuestionIdx++;
        duel.timeLeft = 10;
        duel.isSubmitted = false;
        duel.selectedAnswer = null;
        duel.opponentAnswered = false;
        render();
        startDuelTimer();
      } else {
        duel.battleEnded = true;
        if (duel.scorePlayer > duel.scoreOpponent) playSoundEffect('combo');
        render();
      }
    }, 2500);
  }

  function resetDuelState(mode = 'ai') {
    if (state.duelState.timerId) clearInterval(state.duelState.timerId);
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

    // Start timer only if in playing step and round active
    if (duel.lobbyStep === 'playing' && !duel.isSubmitted && !duel.battleEnded) {
      startDuelTimer();
    }

    // Select Paket Soal Cards
    document.querySelectorAll('.duel-set-card').forEach(card => {
      card.addEventListener('click', (e) => {
        const setIdx = parseInt(e.currentTarget.getAttribute('data-set-idx'));
        duel.selectedSetIdx = setIdx;
        render();
      });
    });

    // Start vs AI Button
    const btnStartAi = document.getElementById('btn-start-ai');
    if (btnStartAi) {
      btnStartAi.addEventListener('click', () => {
        duel.mode = 'ai';
        duel.opponentName = 'Ustadz AI (Bot)';
        duel.lobbyStep = 'playing';
        duel.battleEnded = false;
        duel.currentQuestionIdx = 0;
        duel.scorePlayer = 0;
        duel.scoreOpponent = 0;
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
        if (state.currentView === 'students' || state.currentView === 'dashboard') {
          render();
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
