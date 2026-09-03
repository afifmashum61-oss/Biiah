/**
 * Quiz & Latihan Engine - Media Pembelajaran Bahasa Arab Kelas 11 MA
 * Pemilik: Yosi, S. Ag, M. Pd. (MAN 1 Pontianak)
 */

(function() {
  let currentStep = 0;
  let score = 0;
  let selectedAnswers = [];

  window.initQuiz = function() {
    currentStep = 0;
    score = 0;
    selectedAnswers = [];
    renderQuizStep();
  };

  function renderQuizStep() {
    const container = document.getElementById('quizContainer');
    if (!container) return;

    const questions = ARABIC_DATA.quiz;
    const total = questions.length;

    if (currentStep >= total) {
      renderQuizResult(container, total);
      return;
    }

    const q = questions[currentStep];
    const progressPercent = Math.round(((currentStep) / total) * 100);

    container.innerHTML = `
      <div class="card-modern p-6 md:p-8">
        <!-- Quiz Header Progress -->
        <div class="flex items-center justify-between gap-4 mb-4">
          <div>
            <span class="badge-lime text-xs">Soal ${currentStep + 1} dari ${total}</span>
            <h3 class="text-xl font-bold text-emerald-950 mt-1">Latihan Evaluasi Bahasa Arab</h3>
          </div>
          <span class="text-sm font-bold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200">
            Skor Sementara: ${score * 20}
          </span>
        </div>

        <!-- Progress Bar -->
        <div class="w-full bg-gray-100 h-2.5 rounded-full mb-8 overflow-hidden">
          <div class="bg-lime-accent h-full transition-all duration-300 rounded-full" style="width: ${progressPercent}%"></div>
        </div>

        <!-- Question Card -->
        <div class="bg-emerald-950 text-white rounded-2xl p-6 md:p-8 mb-6 shadow-md relative overflow-hidden">
          <div class="absolute -right-6 -bottom-6 w-32 h-32 bg-lime-400/10 rounded-full blur-xl pointer-events-none"></div>
          <span class="text-xs text-lime-300 font-semibold tracking-wider uppercase mb-2 block">Pertanyaan</span>
          <h4 class="font-arabic text-2xl md:text-3xl font-bold leading-relaxed text-white">
            ${q.question}
          </h4>
        </div>

        <!-- Options Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6" id="quizOptionsGrid">
          ${q.options.map((opt, idx) => `
            <button 
              onclick="window.selectQuizOption(${idx})"
              class="quiz-option-btn text-right font-arabic text-xl p-4 rounded-xl border-2 border-soft hover:border-emerald-600 hover:bg-emerald-50 transition-all text-emerald-950 flex items-center justify-between gap-3 group"
            >
              <span class="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-xs font-sans font-bold text-gray-500 group-hover:border-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                ${String.fromCharCode(65 + idx)}
              </span>
              <span class="flex-1">${opt}</span>
            </button>
          `).join('')}
        </div>

        <!-- Feedback Box -->
        <div id="quizFeedback" class="hidden rounded-xl p-4 mb-6"></div>

        <!-- Action Next Button -->
        <div class="flex justify-end">
          <button 
            id="nextQuizBtn" 
            onclick="window.nextQuizQuestion()" 
            class="hidden px-6 py-3 bg-emerald-main text-white font-bold rounded-full text-sm hover:bg-emerald-dark transition-all flex items-center gap-2 shadow-md"
          >
            <span>Lanjut Soal Berikutnya</span>
            <i data-lucide="arrow-right" class="w-4 h-4 text-lime-accent"></i>
          </button>
        </div>
      </div>
    `;

    if (window.lucide) lucide.createIcons();
  }

  window.selectQuizOption = function(selectedIdx) {
    const q = ARABIC_DATA.quiz[currentStep];
    const optionsBtns = document.querySelectorAll('.quiz-option-btn');
    const feedbackBox = document.getElementById('quizFeedback');
    const nextBtn = document.getElementById('nextQuizBtn');

    optionsBtns.forEach((btn, idx) => {
      btn.disabled = true;
      if (idx === q.correct) {
        btn.classList.remove('border-soft');
        btn.classList.add('bg-emerald-600', 'text-white', 'border-emerald-600', 'font-bold');
      } else if (idx === selectedIdx) {
        btn.classList.remove('border-soft');
        btn.classList.add('bg-rose-500', 'text-white', 'border-rose-500');
      }
    });

    const isCorrect = (selectedIdx === q.correct);
    if (isCorrect) {
      score++;
    }

    selectedAnswers.push({
      question: q.question,
      selected: selectedIdx,
      correct: q.correct,
      isCorrect: isCorrect
    });

    if (feedbackBox) {
      feedbackBox.classList.remove('hidden');
      if (isCorrect) {
        feedbackBox.className = 'rounded-xl p-4 mb-6 bg-emerald-50 border border-emerald-200 text-emerald-950';
        feedbackBox.innerHTML = `
          <div class="flex items-start gap-3">
            <div class="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0 font-bold">✓</div>
            <div>
              <h5 class="font-bold text-emerald-900 text-sm mb-1">Jawaban Anda Benar!</h5>
              <p class="text-xs text-emerald-800">${q.explanation}</p>
            </div>
          </div>
        `;
      } else {
        feedbackBox.className = 'rounded-xl p-4 mb-6 bg-rose-50 border border-rose-200 text-rose-950';
        feedbackBox.innerHTML = `
          <div class="flex items-start gap-3">
            <div class="w-8 h-8 rounded-full bg-rose-600 text-white flex items-center justify-center shrink-0 font-bold">✕</div>
            <div>
              <h5 class="font-bold text-rose-900 text-sm mb-1">Jawaban Kurang Tepat</h5>
              <p class="text-xs text-rose-800">${q.explanation}</p>
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
    const finalScore = score * (100 / total);
    let gradeMsg = "";
    let gradeBadgeClass = "";

    if (finalScore >= 80) {
      gradeMsg = "Mumtaz! (ممتاز - Sangat Memuaskan)";
      gradeBadgeClass = "bg-emerald-600 text-white";
    } else if (finalScore >= 60) {
      gradeMsg = "Jayyid! (جيد - Baik)";
      gradeBadgeClass = "bg-amber-500 text-white";
    } else {
      gradeMsg = "Perlu Latihan Lagi (إعادة التَّدْرِيب)";
      gradeBadgeClass = "bg-rose-500 text-white";
    }

    container.innerHTML = `
      <div class="card-modern p-8 text-center max-w-2xl mx-auto">
        <div class="w-20 h-20 bg-lime-accent/30 text-emerald-950 rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-lime-400">
          <i data-lucide="award" class="w-10 h-10 text-emerald-900"></i>
        </div>

        <span class="inline-block px-4 py-1.5 rounded-full text-xs font-bold ${gradeBadgeClass} mb-3 uppercase tracking-wider">
          ${gradeMsg}
        </span>

        <h3 class="text-3xl font-extrabold text-emerald-950 mb-2">Hasil Latihan Bahasa Arab</h3>
        <p class="text-sm text-gray-600 mb-6">Kelas XI MA • Disusun oleh Yosi, S. Ag, M. Pd. (MAN 1 Pontianak)</p>

        <!-- Big Score Card -->
        <div class="bg-emerald-main text-white rounded-3xl p-6 mb-8 shadow-xl max-w-sm mx-auto">
          <span class="text-xs text-lime-300 font-semibold uppercase tracking-wider">Nilai Akhir Anda</span>
          <div class="text-6xl font-extrabold text-lime-accent my-2">${finalScore}</div>
          <p class="text-xs text-white/80">Benar ${score} dari ${total} Soal Evaluasi</p>
        </div>

        <div class="flex items-center justify-center gap-4">
          <button 
            onclick="window.initQuiz()" 
            class="px-6 py-3 bg-lime-accent text-emerald-950 font-bold rounded-full text-sm hover:bg-lime-400 transition-all flex items-center gap-2 shadow-md"
          >
            <i data-lucide="rotate-ccw" class="w-4 h-4"></i>
            Ulangi Latihan
          </button>
          <button 
            onclick="document.querySelector('[data-target=\\'home\\']').click()" 
            class="px-6 py-3 bg-gray-100 text-gray-800 font-bold rounded-full text-sm hover:bg-gray-200 transition-all flex items-center gap-2"
          >
            <i data-lucide="home" class="w-4 h-4"></i>
            Kembali ke Beranda
          </button>
        </div>
      </div>
    `;

    if (window.lucide) lucide.createIcons();
  }
})();
