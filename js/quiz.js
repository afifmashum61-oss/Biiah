/**
 * Quiz & Latihan Engine (Kahoot / Quizizz Gamified Mode)
 * Media Pembelajaran Bahasa Arab Kelas 11 MA
 * Author: Yosi, S. Ag, M. Pd. (MAN 1 Pontianak)
 */

(function() {
  let currentStep = 0;
  let score = 0;
  let streak = 0;
  let maxStreak = 0;
  let totalTimeSpent = 0;
  let selectedAnswers = [];
  let currentQuestions = [];
  let selectedBab = 'all'; // 'all', 'topik1', 'topik2', 'topik3', 'topik4'
  let selectedModel = 'all'; // 'all', 'model1', 'model2'
  let gameMode = 'kahoot'; // 'kahoot' or 'practice'
  
  // Timer & Audio
  let timerInterval = null;
  let timeLeft = 20;
  let soundEnabled = true;
  let audioCtx = null;

  function getAudioContext() {
    if (!audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) audioCtx = new AudioContext();
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    return audioCtx;
  }

  // Synthesized Sound Effects (SFX)
  function playSFX(type) {
    if (!soundEnabled) return;
    const ctx = getAudioContext();
    if (!ctx) return;

    const now = ctx.currentTime;

    if (type === 'correct') {
      [523.25, 659.25, 783.99, 1046.50].forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + i * 0.08);
        gain.gain.setValueAtTime(0.3, now + i * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.08 + 0.25);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + i * 0.08);
        osc.stop(now + i * 0.08 + 0.25);
      });
    } else if (type === 'wrong') {
      [220, 196].forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(freq, now + i * 0.12);
        gain.gain.setValueAtTime(0.3, now + i * 0.12);
        gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.12 + 0.25);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + i * 0.12);
        osc.stop(now + i * 0.12 + 0.25);
      });
    } else if (type === 'tick') {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, now);
      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.05);
    } else if (type === 'fanfare') {
      const notes = [523.25, 659.25, 783.99, 1046.50, 1318.51];
      notes.forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + i * 0.1);
        gain.gain.setValueAtTime(0.3, now + i * 0.1);
        gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.1 + 0.4);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + i * 0.1);
        osc.stop(now + i * 0.1 + 0.4);
      });
    }
  }

  window.initQuiz = function() {
    currentStep = 0;
    score = 0;
    streak = 0;
    maxStreak = 0;
    totalTimeSpent = 0;
    selectedAnswers = [];
    clearInterval(timerInterval);

    // Filter questions by Bab & Model
    currentQuestions = ARABIC_DATA.quiz.filter(q => {
      const babMatch = (selectedBab === 'all' || q.babId === selectedBab);
      const modelMatch = (selectedModel === 'all' || q.modelId === selectedModel);
      return babMatch && modelMatch;
    });

    renderQuizStep();
  };

  window.setQuizBab = function(babId) {
    selectedBab = babId;
    window.initQuiz();
  };

  window.setQuizModel = function(modelId) {
    selectedModel = modelId;
    window.initQuiz();
  };

  window.setQuizMode = function(mode) {
    gameMode = mode;
    window.initQuiz();
  };

  window.toggleSound = function() {
    soundEnabled = !soundEnabled;
    const btn = document.getElementById('soundToggleBtn');
    if (btn) {
      btn.innerHTML = soundEnabled 
        ? `<i data-lucide="volume-2" class="w-4 h-4 text-emerald-700"></i><span>Suara: ON</span>`
        : `<i data-lucide="volume-x" class="w-4 h-4 text-rose-600"></i><span>Suara: OFF</span>`;
      if (window.lucide) lucide.createIcons();
    }
  };

  function startTimer() {
    clearInterval(timerInterval);
    if (gameMode !== 'kahoot') return;

    timeLeft = 20;
    updateTimerUI();

    timerInterval = setInterval(() => {
      timeLeft--;
      updateTimerUI();

      if (timeLeft <= 5 && timeLeft > 0) {
        playSFX('tick');
      }

      if (timeLeft <= 0) {
        clearInterval(timerInterval);
        playSFX('wrong');
        window.selectQuizOption(-1); // Timeout!
      }
    }, 1000);
  }

  function updateTimerUI() {
    const timerBar = document.getElementById('kahootTimerBar');
    const timerText = document.getElementById('kahootTimerText');
    if (!timerBar || !timerText) return;

    const percent = (timeLeft / 20) * 100;
    timerBar.style.width = `${percent}%`;
    timerText.textContent = `${timeLeft}s`;

    if (timeLeft > 10) {
      timerBar.className = 'h-full transition-all duration-1000 rounded-full bg-emerald-500';
    } else if (timeLeft > 5) {
      timerBar.className = 'h-full transition-all duration-1000 rounded-full bg-amber-500';
    } else {
      timerBar.className = 'h-full transition-all duration-1000 rounded-full bg-rose-600 animate-pulse';
    }
  }

  function renderQuizStep() {
    const container = document.getElementById('quizContainer');
    if (!container) return;

    const total = currentQuestions.length;

    if (currentStep >= total) {
      clearInterval(timerInterval);
      renderQuizResult(container, total);
      return;
    }

    const q = currentQuestions[currentStep];
    const progressPercent = Math.round(((currentStep) / total) * 100);

    const shapes = [
      { name: '🔺', color: 'from-rose-500 to-rose-600 hover:from-rose-600 hover:to-rose-700 text-white border-rose-600', letter: 'A' },
      { name: '🔷', color: 'from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white border-blue-700', letter: 'B' },
      { name: '🟡', color: 'from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white border-amber-600', letter: 'C' },
      { name: '🟩', color: 'from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white border-emerald-700', letter: 'D' }
    ];

    const babTitleMap = {
      'all': 'Semua Bab (80 Soal Evaluasi)',
      'topik1': 'BAB 1: Wisata & Bepergian (السَّفَرُ وَالسِّيَاحَةُ)',
      'topik2': 'BAB 2: Kesehatan & Olahraga (الصِّحَّةُ)',
      'topik3': 'BAB 3: Haji & Umrah (الحَجُّ وَالعُمْرَةُ)',
      'topik4': 'BAB 4: Agama di Indonesia (الأَدْيَانُ فِي إِنْدُونِيسِيَا)'
    };

    const modelTitleMap = {
      'all': 'Semua Model Soal',
      'model1': 'Model 1: Mufrodat & Qira\'ah',
      'model2': 'Model 2: Qawa\'id & Tata Bahasa'
    };

    container.innerHTML = `
      <div class="card-modern p-6 md:p-8">
        <!-- Controls & Filter Header -->
        <div class="flex flex-wrap items-center justify-between gap-4 mb-6 border-b border-soft pb-4">
          <div>
            <span class="badge-lime text-xs">${babTitleMap[selectedBab]} • ${modelTitleMap[selectedModel]}</span>
            <h3 class="text-2xl font-bold text-emerald-950 mt-1">Game Kuis Interaktif Bahasa Arab</h3>
          </div>

          <div class="flex items-center gap-2 flex-wrap">
            <!-- Mode Switcher -->
            <div class="bg-gray-100 p-1 rounded-full border border-gray-200 flex items-center gap-1 text-xs">
              <button 
                onclick="window.setQuizMode('kahoot')" 
                class="px-3 py-1.5 rounded-full font-bold transition-all ${gameMode === 'kahoot' ? 'bg-emerald-main text-white shadow-sm' : 'text-gray-600 hover:text-gray-900'}"
              >
                ⚡ Mode Kahoot
              </button>
              <button 
                onclick="window.setQuizMode('practice')" 
                class="px-3 py-1.5 rounded-full font-bold transition-all ${gameMode === 'practice' ? 'bg-emerald-main text-white shadow-sm' : 'text-gray-600 hover:text-gray-900'}"
              >
                📖 Mode Santai
              </button>
            </div>

            <!-- Sound Toggle -->
            <button 
              id="soundToggleBtn"
              onclick="window.toggleSound()" 
              class="px-3 py-1.5 bg-white border border-gray-200 text-gray-700 rounded-full text-xs font-semibold flex items-center gap-1.5 hover:bg-gray-50 transition-all"
            >
              <i data-lucide="${soundEnabled ? 'volume-2' : 'volume-x'}" class="w-4 h-4 text-emerald-700"></i>
              <span>${soundEnabled ? 'Suara: ON' : 'Suara: OFF'}</span>
            </button>
          </div>
        </div>

        <!-- Bab Selection Tabs -->
        <div class="flex items-center gap-2 overflow-x-auto pb-3 mb-4 no-scrollbar">
          <button onclick="window.setQuizBab('all')" class="nav-tab-btn text-xs ${selectedBab === 'all' ? 'active' : ''}">Semua Bab (80 Soal)</button>
          <button onclick="window.setQuizBab('topik1')" class="nav-tab-btn text-xs ${selectedBab === 'topik1' ? 'active' : ''}">Bab 1 (Wisata)</button>
          <button onclick="window.setQuizBab('topik2')" class="nav-tab-btn text-xs ${selectedBab === 'topik2' ? 'active' : ''}">Bab 2 (Kesehatan)</button>
          <button onclick="window.setQuizBab('topik3')" class="nav-tab-btn text-xs ${selectedBab === 'topik3' ? 'active' : ''}">Bab 3 (Haji & Umrah)</button>
          <button onclick="window.setQuizBab('topik4')" class="nav-tab-btn text-xs ${selectedBab === 'topik4' ? 'active' : ''}">Bab 4 (Agama & Kebangsaan)</button>
        </div>

        <!-- Quiz Model Selector Bar -->
        <div class="flex items-center gap-2 mb-6 bg-emerald-50/70 p-2.5 rounded-2xl border border-emerald-200 flex-wrap">
          <span class="text-xs font-bold text-emerald-950 px-2 flex items-center gap-1">
            <i data-lucide="layers" class="w-4 h-4 text-emerald-700"></i>
            Model Kuis Bab:
          </span>
          <button 
            onclick="window.setQuizModel('all')" 
            class="px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${selectedModel === 'all' ? 'bg-emerald-main text-white shadow-sm' : 'bg-white text-emerald-950 hover:bg-emerald-100 border border-emerald-300'}"
          >
            Semua Model
          </button>
          <button 
            onclick="window.setQuizModel('model1')" 
            class="px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${selectedModel === 'model1' ? 'bg-emerald-main text-white shadow-sm' : 'bg-white text-emerald-950 hover:bg-emerald-100 border border-emerald-300'}"
          >
            🎴 Model 1: Mufrodat & Qira'ah
          </button>
          <button 
            onclick="window.setQuizModel('model2')" 
            class="px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${selectedModel === 'model2' ? 'bg-emerald-main text-white shadow-sm' : 'bg-white text-emerald-950 hover:bg-emerald-100 border border-emerald-300'}"
          >
            ✍️ Model 2: Qawa'id & Tata Bahasa
          </button>
        </div>

        <!-- Score & Stats Bar -->
        <div class="flex items-center justify-between gap-4 mb-4">
          <div class="flex items-center gap-2">
            <span class="text-xs font-bold bg-emerald-100 text-emerald-900 px-3 py-1 rounded-full border border-emerald-300">
              Soal ${currentStep + 1} / ${total}
            </span>
            ${streak >= 2 ? `
              <span class="text-xs font-bold bg-amber-500 text-white px-3 py-1 rounded-full animate-bounce shadow-md flex items-center gap-1">
                🔥 Streak ${streak}X (+${streak * 100} pts)
              </span>
            ` : ''}
          </div>
          <span class="text-sm font-extrabold text-emerald-950 bg-lime-accent/40 px-4 py-1.5 rounded-full border border-lime-400 shadow-sm">
            🏆 Skor: ${score} Pts
          </span>
        </div>

        <!-- Kahoot Timer Bar (if Kahoot mode) -->
        ${gameMode === 'kahoot' ? `
          <div class="mb-6">
            <div class="flex items-center justify-between text-xs font-bold text-gray-500 mb-1">
              <span>Waktu Menjawab</span>
              <span id="kahootTimerText" class="text-emerald-900 font-extrabold">20s</span>
            </div>
            <div class="w-full bg-gray-100 h-3 rounded-full overflow-hidden border border-gray-200">
              <div id="kahootTimerBar" class="bg-emerald-500 h-full transition-all duration-1000 rounded-full" style="width: 100%"></div>
            </div>
          </div>
        ` : `
          <!-- Standard Progress Bar -->
          <div class="w-full bg-gray-100 h-2.5 rounded-full mb-6 overflow-hidden">
            <div class="bg-lime-accent h-full transition-all duration-300 rounded-full" style="width: ${progressPercent}%"></div>
          </div>
        `}

        <!-- Question Card -->
        <div class="bg-emerald-950 text-white rounded-2xl p-6 md:p-8 mb-6 shadow-xl relative overflow-hidden border border-emerald-800">
          <div class="absolute -right-6 -bottom-6 w-36 h-36 bg-lime-400/10 rounded-full blur-2xl pointer-events-none"></div>
          <div class="flex justify-between items-center mb-3">
            <span class="text-xs text-lime-300 font-bold tracking-wider uppercase">Pertanyaan Kahoot Arcade</span>
            <button 
              onclick="window.speakArabic(\`${q.question.replace(/"/g, '')}\`)" 
              class="text-xs text-lime-300 hover:text-white flex items-center gap-1 bg-white/10 px-3 py-1 rounded-full border border-white/20"
            >
              <i data-lucide="volume-2" class="w-3.5 h-3.5"></i> Dengar
            </button>
          </div>
          <h4 class="font-arabic text-2xl md:text-3xl font-bold leading-relaxed text-white text-right">
            ${q.question}
          </h4>
        </div>

        <!-- Kahoot Colored Options Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6" id="quizOptionsGrid">
          ${q.options.map((opt, idx) => `
            <button 
              onclick="window.selectQuizOption(${idx})"
              class="quiz-option-btn text-right font-arabic text-xl p-5 rounded-2xl bg-gradient-to-r ${shapes[idx].color} shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center justify-between gap-3 group border-2"
            >
              <span class="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center text-sm font-sans font-extrabold text-white shrink-0 group-hover:scale-110 transition-transform shadow-inner">
                ${shapes[idx].name} ${shapes[idx].letter}
              </span>
              <span class="flex-1 font-bold text-white drop-shadow-sm">${opt}</span>
            </button>
          `).join('')}
        </div>

        <!-- Feedback Box -->
        <div id="quizFeedback" class="hidden rounded-2xl p-5 mb-6 shadow-md transition-all"></div>

        <!-- Action Next Button -->
        <div class="flex justify-end">
          <button 
            id="nextQuizBtn" 
            onclick="window.nextQuizQuestion()" 
            class="hidden px-8 py-3.5 bg-emerald-main text-white font-extrabold rounded-full text-sm hover:bg-emerald-dark transition-all flex items-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            <span>Lanjut Soal Berikutnya</span>
            <i data-lucide="arrow-right" class="w-5 h-5 text-lime-accent"></i>
          </button>
        </div>
      </div>
    `;

    if (window.lucide) lucide.createIcons();
    startTimer();
  }

  window.selectQuizOption = function(selectedIdx) {
    clearInterval(timerInterval);

    const q = currentQuestions[currentStep];
    const optionsBtns = document.querySelectorAll('.quiz-option-btn');
    const feedbackBox = document.getElementById('quizFeedback');
    const nextBtn = document.getElementById('nextQuizBtn');

    optionsBtns.forEach((btn, idx) => {
      btn.disabled = true;
      if (idx === q.correct) {
        btn.className = 'quiz-option-btn text-right font-arabic text-xl p-5 rounded-2xl bg-emerald-600 text-white border-2 border-emerald-400 shadow-xl flex items-center justify-between gap-3 ring-4 ring-emerald-300';
      } else if (idx === selectedIdx) {
        btn.className = 'quiz-option-btn text-right font-arabic text-xl p-5 rounded-2xl bg-rose-600 text-white border-2 border-rose-400 shadow-md flex items-center justify-between gap-3 opacity-90';
      } else {
        btn.className = 'quiz-option-btn text-right font-arabic text-xl p-5 rounded-2xl bg-gray-200 text-gray-400 border-2 border-gray-300 opacity-40 flex items-center justify-between gap-3';
      }
    });

    const isCorrect = (selectedIdx === q.correct);
    
    // Score calculation with speed bonus & streak multiplier
    let timeBonus = 0;
    if (isCorrect) {
      streak++;
      if (streak > maxStreak) maxStreak = streak;

      if (gameMode === 'kahoot') {
        timeBonus = Math.max(100, timeLeft * 45); // Faster answer = higher points (up to 900+ pts)
        const streakBonus = (streak >= 2) ? (streak * 100) : 0;
        const ptsGained = 500 + timeBonus + streakBonus;
        score += ptsGained;
      } else {
        score += 100;
      }
      playSFX('correct');
    } else {
      streak = 0; // Reset streak on mistake
      playSFX('wrong');
    }

    totalTimeSpent += (20 - timeLeft);

    selectedAnswers.push({
      question: q.question,
      selected: selectedIdx,
      correct: q.correct,
      isCorrect: isCorrect
    });

    if (feedbackBox) {
      feedbackBox.classList.remove('hidden');
      if (isCorrect) {
        feedbackBox.className = 'rounded-2xl p-5 mb-6 bg-emerald-50 border-2 border-emerald-300 text-emerald-950 shadow-md';
        feedbackBox.innerHTML = `
          <div class="flex items-start gap-3">
            <div class="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0 font-extrabold text-lg shadow-md">✓</div>
            <div class="flex-1">
              <div class="flex items-center justify-between flex-wrap gap-2">
                <h5 class="font-bold text-emerald-900 text-base">Jawaban Anda Benar! 🎉</h5>
                ${gameMode === 'kahoot' ? `<span class="text-xs font-extrabold text-emerald-800 bg-emerald-200 px-3 py-1 rounded-full">+${500 + timeBonus + ((streak >= 2) ? (streak * 100) : 0)} Poin</span>` : ''}
              </div>
              <p class="text-xs md:text-sm text-emerald-800 mt-1 font-medium">${q.explanation}</p>
            </div>
          </div>
        `;
      } else {
        feedbackBox.className = 'rounded-2xl p-5 mb-6 bg-rose-50 border-2 border-rose-300 text-rose-950 shadow-md';
        feedbackBox.innerHTML = `
          <div class="flex items-start gap-3">
            <div class="w-10 h-10 rounded-full bg-rose-600 text-white flex items-center justify-center shrink-0 font-extrabold text-lg shadow-md">✕</div>
            <div class="flex-1">
              <h5 class="font-bold text-rose-900 text-base mb-1">${selectedIdx === -1 ? 'Waktu Menjawab Habis! ⏱️' : 'Jawaban Kurang Tepat ❌'}</h5>
              <p class="text-xs md:text-sm text-rose-800 font-medium">${q.explanation}</p>
            </div>
          </div>
        `;
      }
    }

    if (nextBtn) {
      nextBtn.classList.remove('hidden');
    }
  };

  window.nextQuizQuestion = function() {
    currentStep++;
    renderQuizStep();
  };

  function renderQuizResult(container, total) {
    playSFX('fanfare');

    const accuracyPercent = Math.round((selectedAnswers.filter(a => a.isCorrect).length / total) * 100);
    
    let gradeMsg = "";
    let gradeBadgeClass = "";
    let podiumEmoji = "";

    if (accuracyPercent >= 80) {
      gradeMsg = "Mumtaz! (ممتاز - Sangat Memuaskan)";
      gradeBadgeClass = "bg-emerald-600 text-white";
      podiumEmoji = "🏆 🥇";
    } else if (accuracyPercent >= 60) {
      gradeMsg = "Jayyid Jiddan! (جيد جدا - Baik Sekali)";
      gradeBadgeClass = "bg-amber-500 text-white";
      podiumEmoji = "🥈 ⭐";
    } else {
      gradeMsg = "Perlu Latihan Lagi (إعادة التَّدْرِيب)";
      gradeBadgeClass = "bg-rose-500 text-white";
      podiumEmoji = "🥉 🎯";
    }

    container.innerHTML = `
      <div class="card-modern p-6 md:p-10 text-center max-w-3xl mx-auto shadow-2xl">
        <!-- Winner Podium Header -->
        <div class="w-24 h-24 bg-gradient-to-tr from-amber-400 to-yellow-300 text-emerald-950 rounded-full flex items-center justify-center mx-auto mb-4 border-4 border-white shadow-xl text-4xl animate-bounce">
          ${podiumEmoji.split(' ')[0]}
        </div>

        <span class="inline-block px-5 py-2 rounded-full text-xs md:text-sm font-extrabold ${gradeBadgeClass} mb-3 uppercase tracking-wider shadow-md">
          ${gradeMsg}
        </span>

        <h3 class="text-3xl md:text-4xl font-extrabold text-emerald-950 mb-2">Podium Juara Game Kuis</h3>
        <p class="text-sm text-gray-600 mb-8">Kelas XI MA • Disusun oleh Yosi, S. Ag, M. Pd. (MAN 1 Pontianak)</p>

        <!-- Big Score Board Card -->
        <div class="bg-gradient-to-br from-emerald-950 via-emerald-900 to-emerald-950 text-white rounded-3xl p-8 mb-8 shadow-2xl max-w-md mx-auto border-2 border-lime-400 relative overflow-hidden">
          <div class="absolute -left-10 -bottom-10 w-32 h-32 bg-lime-400/20 rounded-full blur-2xl pointer-events-none"></div>
          
          <span class="text-xs text-lime-300 font-extrabold uppercase tracking-wider block mb-1">Total Poin Game Anda</span>
          <div class="text-5xl md:text-6xl font-black text-lime-accent my-2 drop-shadow-md">${score}</div>

          <div class="grid grid-cols-3 gap-2 mt-6 pt-6 border-t border-white/10 text-center">
            <div>
              <span class="text-[10px] text-lime-200 block uppercase">Akurasi</span>
              <span class="text-lg font-bold text-white">${accuracyPercent}%</span>
            </div>
            <div>
              <span class="text-[10px] text-lime-200 block uppercase">Max Streak</span>
              <span class="text-lg font-bold text-amber-300">🔥 ${maxStreak}X</span>
            </div>
            <div>
              <span class="text-[10px] text-lime-200 block uppercase">Benar</span>
              <span class="text-lg font-bold text-lime-300">${selectedAnswers.filter(a => a.isCorrect).length} / ${total}</span>
            </div>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="flex items-center justify-center gap-4 flex-wrap">
          <button 
            onclick="window.initQuiz()" 
            class="px-8 py-3.5 bg-lime-accent text-emerald-950 font-extrabold rounded-full text-sm hover:bg-lime-400 transition-all flex items-center gap-2 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            <i data-lucide="rotate-ccw" class="w-4 h-4"></i>
            Main Lagi
          </button>
          <button 
            onclick="document.querySelector('[data-target=\\'home\\']').click()" 
            class="px-8 py-3.5 bg-gray-100 text-gray-800 font-bold rounded-full text-sm hover:bg-gray-200 transition-all flex items-center gap-2"
          >
            <i data-lucide="home" class="w-4 h-4"></i>
            Beranda
          </button>
        </div>
      </div>
    `;

    if (window.lucide) lucide.createIcons();
  }
})();

