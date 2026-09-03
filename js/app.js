/**
 * App Main Controller - Media Pembelajaran Bahasa Arab Kelas 11 MA
 * Pemilik: Yosi, S. Ag, M. Pd. (MAN 1 Pontianak)
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide Icons
  if (window.lucide) {
    lucide.createIcons();
  }

  // App State
  const state = {
    currentView: 'home', // home, mufrodat, qiraah, kalam, qawaid, latihan
    selectedTopic: 'all',
    searchQuery: '',
    dualLanguageQiraah: true,
    speechSynth: window.speechSynthesis,
    isSpeaking: false,
    activeAudioId: null,
    quizScore: 0,
    currentQuestionIndex: 0,
    userAnswers: []
  };

  // Elements
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const closeDrawerBtn = document.getElementById('closeDrawerBtn');
  const drawerBackdrop = document.getElementById('drawerBackdrop');
  const drawerContent = document.getElementById('drawerContent');
  const mainViews = document.querySelectorAll('.view-section');
  const drawerNavItems = document.querySelectorAll('.drawer-nav-item');
  const desktopNavItems = document.querySelectorAll('.desktop-nav-item');

  // Open & Close Hamburger Drawer (Globally Available)
  window.toggleDrawer = function(open) {
    const backdrop = document.getElementById('drawerBackdrop');
    const content = document.getElementById('drawerContent');
    if (!backdrop || !content) return;

    if (open) {
      backdrop.classList.add('active');
      content.classList.add('open');
      document.body.style.overflow = 'hidden';
    } else {
      backdrop.classList.remove('active');
      content.classList.remove('open');
      document.body.style.overflow = '';
    }
  };

  if (hamburgerBtn) hamburgerBtn.addEventListener('click', () => window.toggleDrawer(true));
  if (closeDrawerBtn) closeDrawerBtn.addEventListener('click', () => window.toggleDrawer(false));
  if (drawerBackdrop) drawerBackdrop.addEventListener('click', () => window.toggleDrawer(false));

  // Navigation Logic
  function navigateTo(viewId) {
    state.currentView = viewId;

    // Hide all view sections
    mainViews.forEach(view => {
      view.classList.add('hidden');
    });

    // Show active view section
    const targetView = document.getElementById(`view-${viewId}`);
    if (targetView) {
      targetView.classList.remove('hidden');
    }

    // Update Nav Active States
    drawerNavItems.forEach(item => {
      const target = item.getAttribute('data-target');
      if (target === viewId) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });

    desktopNavItems.forEach(item => {
      const target = item.getAttribute('data-target');
      if (target === viewId) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Render specific section content
    renderSectionContent(viewId);

    // Refresh Lucide Icons
    setTimeout(() => {
      if (window.lucide) lucide.createIcons();
    }, 50);
  }

  // Bind Nav Clicks
  drawerNavItems.forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      const target = item.getAttribute('data-target');
      const topic = item.getAttribute('data-topic');

      if (topic) {
        state.selectedTopic = topic;
      }

      navigateTo(target);

      // Sync active state in topic buttons if topic was set
      if (topic) {
        const topicBtns = document.querySelectorAll('#topicFilters .nav-tab-btn');
        topicBtns.forEach(b => {
          if (b.getAttribute('data-topic') === topic) b.classList.add('active');
          else b.classList.remove('active');
        });
      }

      toggleDrawer(false);
    });
  });

  desktopNavItems.forEach(item => {
    item.addEventListener('click', (e) => {
      e.preventDefault();
      const target = item.getAttribute('data-target');
      navigateTo(target);
    });
  });

  // Action buttons with data-target
  document.querySelectorAll('[data-target]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const target = btn.getAttribute('data-target');
      if (target) navigateTo(target);
    });
  });

  // Section Content Render Switcher
  function renderSectionContent(viewId) {
    switch (viewId) {
      case 'mufrodat':
        renderMufrodat();
        break;
      case 'qiraah':
        renderQiraah();
        break;
      case 'kalam':
        renderKalam();
        break;
      case 'qawaid':
        renderQawaid();
        break;
      case 'latihan':
        if (window.initQuiz) window.initQuiz();
        break;
      default:
        break;
    }
  }

  // --- 1. MUFRODAT SECTION RENDERER ---
  function renderMufrodat() {
    const container = document.getElementById('mufrodatGrid');
    if (!container) return;

    let items = ARABIC_DATA.mufrodat;

    // Filter by topic
    if (state.selectedTopic !== 'all') {
      items = items.filter(i => i.topicId === state.selectedTopic);
    }

    // Filter by search query
    if (state.searchQuery.trim() !== '') {
      const q = state.searchQuery.toLowerCase();
      items = items.filter(i => 
        i.arabic.includes(q) || 
        i.latin.toLowerCase().includes(q) || 
        i.indonesian.toLowerCase().includes(q)
      );
    }

    if (items.length === 0) {
      container.innerHTML = `
        <div class="col-span-full py-12 text-center text-gray-500">
          <i data-lucide="search-x" class="w-12 h-12 mx-auto mb-3 text-emerald-800 opacity-40"></i>
          <p class="font-semibold">Kosakata tidak ditemukan.</p>
          <p class="text-sm">Coba sesuaikan kata kunci pencarian Anda.</p>
        </div>
      `;
      if (window.lucide) lucide.createIcons();
      return;
    }

    container.innerHTML = items.map(item => `
      <div class="flip-card" onclick="this.classList.toggle('flipped')">
        <div class="flip-card-inner">
          <!-- Front Card -->
          <div class="flip-card-front">
            <div class="flex items-center justify-between">
              <span class="badge-lime text-xs">${item.type}</span>
              <button 
                onclick="event.stopPropagation(); window.speakArabic('${item.arabic.replace(/'/g, "\\'")}')" 
                class="w-9 h-9 rounded-full bg-emerald-100 hover:bg-emerald-200 text-emerald-900 flex items-center justify-center transition-colors"
                title="Dengarkan Pengucapan"
              >
                <i data-lucide="volume-2" class="w-5 h-5"></i>
              </button>
            </div>
            <div class="my-auto text-center py-4">
              <h3 class="font-arabic text-3xl font-bold text-emerald-950 mb-2">${item.arabic}</h3>
              <p class="text-xs font-semibold text-emerald-700 uppercase tracking-wider">${item.latin}</p>
            </div>
            <div class="flex items-center justify-between text-xs text-gray-500 border-t border-gray-100 pt-3">
              <span>Klik kartu untuk terjemahan</span>
              <i data-lucide="rotate-cw" class="w-4 h-4 text-emerald-700"></i>
            </div>
          </div>

          <!-- Back Card -->
          <div class="flip-card-back">
            <div class="flex items-center justify-between">
              <span class="bg-white/20 text-white text-xs px-3 py-1 rounded-full font-medium">Terjemahan</span>
              <button 
                onclick="event.stopPropagation(); window.speakArabic('${item.exampleArabic.replace(/'/g, "\\'")}')" 
                class="w-9 h-9 rounded-full bg-lime-400 text-emerald-950 flex items-center justify-center font-bold hover:bg-lime-300 transition-colors"
                title="Dengarkan Contoh Kalimat"
              >
                <i data-lucide="volume-2" class="w-5 h-5"></i>
              </button>
            </div>
            <div class="my-auto py-2">
              <h4 class="text-xl font-bold text-lime-300 mb-2">${item.indonesian}</h4>
              <div class="bg-black/20 rounded-xl p-3 text-right font-arabic text-lg leading-relaxed text-white mb-1">
                ${item.exampleArabic}
              </div>
              <p class="text-xs text-white/80 italic font-light">"${item.exampleIndo}"</p>
            </div>
            <div class="text-xs text-lime-200/70 text-center border-t border-white/10 pt-2">
              Kembali ke kata utama
            </div>
          </div>
        </div>
      </div>
    `).join('');

    if (window.lucide) lucide.createIcons();
  }

  // Topic filter buttons setup
  const topicFilterContainer = document.getElementById('topicFilters');
  if (topicFilterContainer) {
    let filterHTML = `<button class="nav-tab-btn active" data-topic="all">Semua Topik</button>`;
    filterHTML += ARABIC_DATA.topics.map(t => 
      `<button class="nav-tab-btn" data-topic="${t.id}">${t.title}</button>`
    ).join('');
    topicFilterContainer.innerHTML = filterHTML;

    topicFilterContainer.querySelectorAll('.nav-tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        topicFilterContainer.querySelectorAll('.nav-tab-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        state.selectedTopic = btn.getAttribute('data-topic');
        renderMufrodat();
      });
    });
  }

  // Search input binding
  const mufrodatSearch = document.getElementById('mufrodatSearch');
  if (mufrodatSearch) {
    mufrodatSearch.addEventListener('input', (e) => {
      state.searchQuery = e.target.value;
      renderMufrodat();
    });
  }

  // --- 2. MAHARAH QIRAAH RENDERER ---
  function renderQiraah() {
    const container = document.getElementById('qiraahContainer');
    if (!container) return;

    container.innerHTML = ARABIC_DATA.qiraah.map((item, idx) => `
      <div class="card-modern p-6 md:p-8 mb-8">
        <div class="flex flex-wrap items-center justify-between gap-4 mb-6 border-b border-soft pb-4">
          <div>
            <span class="badge-lime mb-2">${item.level}</span>
            <h3 class="text-2xl font-bold text-emerald-950">${item.title}</h3>
          </div>
          <div class="flex items-center gap-2">
            <button 
              onclick="window.speakArabic(\`${item.arabicText.replace(/`/g, '\\`').replace(/\n/g, ' ')}\`)" 
              class="px-4 py-2 bg-emerald-main text-white rounded-full text-sm font-semibold flex items-center gap-2 hover:bg-emerald-dark transition-all shadow-md"
            >
              <i data-lucide="play-circle" class="w-4 h-4 text-lime-accent"></i>
              Dengar Narasi
            </button>
          </div>
        </div>

        <!-- Reading Content Box -->
        <div class="bg-card-mint/60 border border-emerald-900/10 rounded-2xl p-6 md:p-8 mb-6">
          <div class="font-arabic text-2xl md:text-3xl leading-loose text-emerald-950 text-justify mb-6 select-text">
            ${item.arabicText.replace(/\n\n/g, '<br><br>')}
          </div>

          <!-- Dual Language Toggle View -->
          <div class="border-t border-emerald-900/10 pt-4 mt-4">
            <h4 class="text-sm font-bold text-emerald-900 mb-2 flex items-center gap-2">
              <i data-lucide="languages" class="w-4 h-4 text-emerald-700"></i>
              Terjemahan Bahasa Indonesia:
            </h4>
            <p class="text-gray-700 leading-relaxed text-sm md:text-base text-justify font-sans bg-white/70 rounded-xl p-4 border border-emerald-900/5">
              ${item.indonesianText.replace(/\n\n/g, '<br><br>')}
            </p>
          </div>
        </div>

        <!-- Vocabulary Highlights -->
        <div class="mb-6">
          <h4 class="text-sm font-bold text-emerald-900 mb-3 uppercase tracking-wider">Kosakata Penting (المفردات الهامة):</h4>
          <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
            ${item.vocabularyHighlights.map(vh => `
              <div class="bg-white border border-soft p-3 rounded-xl flex flex-col justify-between hover:border-emerald-500 transition-colors">
                <span class="font-arabic text-lg font-bold text-emerald-900">${vh.word}</span>
                <span class="text-xs text-gray-600 font-medium">${vh.meaning}</span>
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Comprehension Questions -->
        <div>
          <h4 class="text-sm font-bold text-emerald-900 mb-3 uppercase tracking-wider flex items-center gap-2">
            <i data-lucide="help-circle" class="w-4 h-4 text-emerald-700"></i>
            Pemahaman Teks (أسئلة الفهم):
          </h4>
          <div class="space-y-4">
            ${item.questions.map((q, qIdx) => `
              <div class="bg-white border border-soft p-4 rounded-xl">
                <p class="font-arabic text-xl font-bold text-emerald-950 mb-3">${qIdx + 1}. ${q.q}</p>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-2 mb-3">
                  ${q.options.map((opt, oIdx) => `
                    <button 
                      onclick="window.checkQiraahAnswer(this, ${oIdx}, ${q.correct}, '${q.explanation.replace(/'/g, "\\'")}')"
                      class="text-right font-arabic text-base p-3 rounded-lg border border-gray-200 hover:border-emerald-600 hover:bg-emerald-50 transition-all text-gray-800"
                    >
                      ${opt}
                    </button>
                  `).join('')}
                </div>
                <div class="explanation-box hidden text-xs p-3 rounded-lg bg-emerald-50 text-emerald-900 font-medium border border-emerald-200"></div>
              </div>
            `).join('')}
          </div>
        </div>
      </div>
    `).join('');

    if (window.lucide) lucide.createIcons();
  }

  // Interactive Question Checker in Qira'ah
  window.checkQiraahAnswer = function(btn, selectedIdx, correctIdx, explanation) {
    const parent = btn.closest('.bg-white');
    const optionsBtns = parent.querySelectorAll('button');
    const expBox = parent.querySelector('.explanation-box');

    optionsBtns.forEach((b, idx) => {
      b.disabled = true;
      if (idx === correctIdx) {
        b.classList.add('bg-emerald-600', 'text-white', 'border-emerald-600', 'font-bold');
      } else if (idx === selectedIdx) {
        b.classList.add('bg-rose-500', 'text-white', 'border-rose-500');
      }
    });

    if (expBox) {
      expBox.classList.remove('hidden');
      if (selectedIdx === correctIdx) {
        expBox.innerHTML = `<span class="text-emerald-700 font-bold">✓ Benar!</span> ${explanation}`;
      } else {
        expBox.innerHTML = `<span class="text-rose-600 font-bold">✕ Kurang Tepat.</span> ${explanation}`;
      }
    }
  };

  // --- 3. MAHARAH KALAM RENDERER ---
  function renderKalam() {
    const container = document.getElementById('kalamContainer');
    if (!container) return;

    container.innerHTML = ARABIC_DATA.kalam.map(item => `
      <div class="card-modern p-6 md:p-8 mb-8">
        <div class="flex items-center justify-between border-b border-soft pb-4 mb-6">
          <div>
            <span class="badge-lime mb-1">Percakapan Interaktif</span>
            <h3 class="text-2xl font-bold text-emerald-950">${item.title}</h3>
            <p class="text-sm text-gray-600">${item.description}</p>
          </div>
          <button 
            onclick="window.playFullDialogue(${item.id})"
            class="px-5 py-2.5 bg-lime-accent text-emerald-950 font-bold rounded-full text-sm hover:bg-lime-400 transition-all shadow-md flex items-center gap-2"
          >
            <i data-lucide="play" class="w-4 h-4 fill-current"></i>
            Putar Seluruh Dialog
          </button>
        </div>

        <!-- Chat Bubble Container -->
        <div class="space-y-4 bg-gray-50/70 rounded-2xl p-4 md:p-6 border border-gray-100 max-h-[500px] overflow-y-auto">
          ${item.dialogues.map((d, dIdx) => {
            const isLeft = dIdx % 2 === 0;
            return `
              <div class="flex gap-3 ${isLeft ? '' : 'flex-row-reverse'} items-start">
                <img 
                  src="${isLeft ? item.avatarSeller : item.avatarBuyer}" 
                  alt="Avatar" 
                  class="w-10 h-10 rounded-full object-cover border-2 border-white shadow-sm mt-1"
                >
                <div class="max-w-[80%] ${isLeft ? 'bg-white text-emerald-950 border-emerald-900/10' : 'bg-emerald-main text-white'} border p-4 rounded-2xl shadow-sm">
                  <div class="flex items-center justify-between gap-4 mb-1">
                    <span class="text-xs font-bold ${isLeft ? 'text-emerald-800' : 'text-lime-300'}">${d.speaker}</span>
                    <button 
                      onclick="window.speakArabic('${d.arabic.replace(/'/g, "\\'")}')" 
                      class="p-1 rounded-full ${isLeft ? 'hover:bg-gray-100 text-emerald-700' : 'hover:bg-white/20 text-lime-300'} transition-colors"
                      title="Putar Audio Suara"
                    >
                      <i data-lucide="volume-2" class="w-4 h-4"></i>
                    </button>
                  </div>
                  <p class="font-arabic text-xl font-bold leading-relaxed mb-1">${d.arabic}</p>
                  <p class="text-xs ${isLeft ? 'text-gray-500' : 'text-white/80'} italic">"${d.indo}"</p>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    `).join('');

    if (window.lucide) lucide.createIcons();
  }

  window.playFullDialogue = function(kalamId) {
    const item = ARABIC_DATA.kalam.find(k => k.id === kalamId);
    if (!item) return;

    let index = 0;
    function speakNext() {
      if (index >= item.dialogues.length) return;
      const line = item.dialogues[index];
      window.speakArabic(line.arabic, () => {
        index++;
        setTimeout(speakNext, 800);
      });
    }
    speakNext();
  };

  // --- 4. QAWAID RENDERER ---
  function renderQawaid() {
    const container = document.getElementById('qawaidContainer');
    if (!container) return;

    container.innerHTML = ARABIC_DATA.qawaid.map(item => `
      <div class="card-modern p-6 md:p-8 mb-8">
        <div class="border-b border-soft pb-4 mb-6">
          <span class="badge-lime mb-1">Tata Bahasa / Qoidah</span>
          <h3 class="text-2xl font-bold text-emerald-950">${item.title}</h3>
          <p class="text-sm font-semibold text-emerald-700 mb-2">${item.subtitle}</p>
          <p class="text-sm text-gray-600 leading-relaxed bg-emerald-50/60 p-4 rounded-xl border border-emerald-100">${item.summary}</p>
        </div>

        <!-- Responsive Rule Table -->
        <div class="overflow-x-auto rounded-xl border border-soft mb-6">
          <table class="w-full text-left border-collapse">
            <thead>
              <tr class="bg-emerald-main text-white text-sm uppercase tracking-wider">
                ${item.tableHeader.map(h => `<th class="p-3.5 border-b border-emerald-800 font-semibold">${h}</th>`).join('')}
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-100 bg-white text-sm">
              ${item.tableRows.map(row => `
                <tr class="hover:bg-emerald-50/40 transition-colors">
                  ${row.map((cell, cIdx) => `
                    <td class="p-3.5 ${cIdx === 2 || cIdx === 0 ? 'font-arabic text-lg font-bold text-emerald-950' : 'text-gray-700'}">
                      ${cell}
                    </td>
                  `).join('')}
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>

        <!-- Notes / Tips -->
        <div class="bg-amber-50 border border-amber-200 rounded-xl p-4">
          <h4 class="text-xs font-bold text-amber-900 uppercase tracking-wider mb-2 flex items-center gap-1.5">
            <i data-lucide="lightbulb" class="w-4 h-4 text-amber-600"></i>
            Catatan Penting Qoidah:
          </h4>
          <ul class="list-disc list-inside text-xs text-amber-950 space-y-1 font-medium">
            ${item.notes.map(n => `<li>${n}</li>`).join('')}
          </ul>
        </div>
      </div>
    `).join('');

    if (window.lucide) lucide.createIcons();
  }

  // --- TTS SPEECH SYNTHESIS ENGINE ---
  window.speakArabic = function(text, onEndCallback) {
    if (!('speechSynthesis' in window)) {
      alert("Maaf, peramban Anda belum mendukung fitur pengucapan audio (Web Speech API).");
      return;
    }

    window.speechSynthesis.cancel(); // Stop any active speech

    const cleanText = text.replace(/<\/?[^>]+(>|$)/g, ""); // Strip HTML tags
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = 'ar-SA';
    utterance.rate = 0.85; // Slightly slower for clear Arabic pronunciation

    // Find Arabic Voice if available
    const voices = window.speechSynthesis.getVoices();
    const arabicVoice = voices.find(v => v.lang.startsWith('ar'));
    if (arabicVoice) utterance.voice = arabicVoice;

    if (onEndCallback) {
      utterance.onend = onEndCallback;
    }

    window.speechSynthesis.speak(utterance);
  };

  // Populate dynamic teacher identity in header/drawer
  const identityNameElements = document.querySelectorAll('.identity-name');
  const identitySchoolElements = document.querySelectorAll('.identity-school');

  identityNameElements.forEach(el => el.textContent = ARABIC_DATA.identity.name);
  identitySchoolElements.forEach(el => el.textContent = ARABIC_DATA.identity.school);

  // Initial load navigation
  navigateTo('home');
});
