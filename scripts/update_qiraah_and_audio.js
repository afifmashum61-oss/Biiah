const fs = require('fs');
const path = require('path');

const appPath = path.join(__dirname, '../app.js');
let code = fs.readFileSync(appPath, 'utf8');

// 1. REVISION OF AUDIO ENGINE
const audioStartMarker = '// Initialize Speech Synthesis & Fallback Dual Audio Engine';
const audioEndMarker = '// Drawer Controls';

const newAudioEngine = `// Initialize Robust Arabic Multi-Layer Audio Engine
  const synth = window.speechSynthesis;
  let cachedVoices = [];
  let activeAudio = null;
  let audioQueue = [];
  let isPlayingAudio = false;

  function loadVoices() {
    if (synth) {
      try {
        cachedVoices = synth.getVoices();
      } catch (e) {}
    }
  }

  if (synth) {
    loadVoices();
    if (synth.onvoiceschanged !== undefined) {
      synth.onvoiceschanged = loadVoices;
    }
  }

  function stopArabicAudio() {
    isPlayingAudio = false;
    audioQueue = [];
    if (activeAudio) {
      try {
        activeAudio.pause();
        activeAudio.currentTime = 0;
        activeAudio.src = '';
      } catch (e) {}
      activeAudio = null;
    }
    if (synth) {
      try {
        synth.cancel();
      } catch (e) {}
    }
    updateAudioUI(false);
  }

  function updateAudioUI(playing) {
    const playAllBtn = document.getElementById('play-qiraah-all-btn');
    if (playAllBtn) {
      if (playing) {
        playAllBtn.innerHTML = \`
          <i class="fa-solid fa-circle-stop text-amber-300 animate-pulse"></i>
          <span>Hentikan Audio</span>
        \`;
        playAllBtn.className = "px-4 py-2.5 bg-rose-700 hover:bg-rose-800 text-white rounded-2xl text-xs font-bold shadow-md transition-all flex items-center gap-2";
      } else {
        playAllBtn.innerHTML = \`
          <i class="fa-solid fa-volume-high"></i>
          <span>Putar Audio Teks</span>
        \`;
        playAllBtn.className = "px-4 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-2xl text-xs font-bold shadow-md transition-all flex items-center gap-2";
      }
    }
  }

  function splitArabicSentences(text) {
    const clean = text.replace(/[•١٢٣]/g, ' ').trim();
    const rawChunks = clean.split(/[\\.\\!\\?؟\\n\\:\\;]+/).map(s => s.trim()).filter(s => s.length > 0);
    const result = [];
    for (const chunk of rawChunks) {
      if (chunk.length <= 160) {
        result.push(chunk);
      } else {
        const parts = chunk.split(/[\\،\\,]+/).map(s => s.trim()).filter(s => s.length > 0);
        for (const p of parts) {
          if (p.length <= 160) {
            result.push(p);
          } else {
            const words = p.split(/\\s+/);
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
    return result.length > 0 ? result : [clean.substring(0, 160)];
  }

  function playSingleChunk(chunk, onEnded) {
    if (!isPlayingAudio) return;

    const ttsUrl = \`/api/tts?q=\${encodeURIComponent(chunk)}&tl=ar\`;
    const audio = new Audio();
    activeAudio = audio;
    audio.playbackRate = state.audioSpeed || 0.85;

    let hasEnded = false;
    const finish = () => {
      if (hasEnded) return;
      hasEnded = true;
      if (onEnded) onEnded();
    };

    audio.onended = finish;
    audio.onerror = () => {
      speakWithWebSpeech(chunk, finish);
    };

    audio.src = ttsUrl;
    audio.play().catch(err => {
      console.warn("Audio play() error, switching to WebSpeech fallback:", err);
      speakWithWebSpeech(chunk, finish);
    });
  }

  function speakWithWebSpeech(cleanText, onEnded) {
    if (!isPlayingAudio) return;
    if (!synth) {
      if (onEnded) onEnded();
      return;
    }

    try {
      synth.cancel();
      const voices = cachedVoices.length > 0 ? cachedVoices : synth.getVoices();
      const arabicVoice = voices.find(v => v.lang && v.lang.toLowerCase().includes('ar'));

      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.lang = 'ar-SA';
      utterance.rate = state.audioSpeed || 0.85;
      if (arabicVoice) utterance.voice = arabicVoice;

      let finished = false;
      utterance.onend = () => {
        if (finished) return;
        finished = true;
        if (onEnded) onEnded();
      };
      utterance.onerror = (e) => {
        console.warn("SpeechSynthesis utterance error:", e);
        if (finished) return;
        finished = true;
        if (onEnded) onEnded();
      };

      synth.speak(utterance);
      if (synth.paused) synth.resume();
    } catch (e) {
      console.warn("SpeechSynthesis exception:", e);
      if (onEnded) onEnded();
    }
  }

  function speakArabic(text, customRate) {
    if (!text || text.trim() === '') return;

    if (isPlayingAudio) {
      stopArabicAudio();
      return;
    }

    stopArabicAudio();
    isPlayingAudio = true;
    updateAudioUI(true);

    const chunks = splitArabicSentences(text);
    audioQueue = [...chunks];

    function playNext() {
      if (!isPlayingAudio || audioQueue.length === 0) {
        stopArabicAudio();
        return;
      }
      const nextChunk = audioQueue.shift();
      playSingleChunk(nextChunk, () => {
        setTimeout(playNext, 250);
      });
    }

    playNext();
  }

  window.speakArabic = speakArabic;
  window.stopArabicAudio = stopArabicAudio;

  `;

const startIdx = code.indexOf(audioStartMarker);
const endIdx = code.indexOf(audioEndMarker);

if (startIdx !== -1 && endIdx !== -1) {
  code = code.slice(0, startIdx) + newAudioEngine + code.slice(endIdx);
  console.log('Audio engine section successfully replaced in code.');
} else {
  console.error('Could not locate audio markers:', startIdx, endIdx);
  process.exit(1);
}

// 2. REVISION OF RENDERQIRAAH AND ATTACHQIRAAHEVENTS
const qiraahStartMarker = "  // 4. QIRA'AH VIEW (Maharah Qira'ah - Membaca Teks & Analisis I'rab Berwarna)";
const qiraahEndMarker = "  // 4B. QAWA'ID VIEW (Tata Bahasa Arab: Fi'il Amr, Nahi & Isim Tafdhil)";

const newQiraahSection = `  // 4. QIRA'AH VIEW (Maharah Qira'ah - Membaca Teks & Analisis I'rab Berwarna)
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

    return \`
      <div class="space-y-8 max-w-5xl mx-auto">
        <!-- Main Card Container -->
        <div class="bg-white rounded-[2.5rem] p-6 sm:p-10 border border-emerald-100 shadow-sm space-y-6">
          
          <!-- Header Banner -->
          <div class="border-b border-emerald-100 pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div class="inline-flex items-center gap-2 bg-teal-50 text-teal-800 px-3.5 py-1 rounded-full text-xs font-bold border border-teal-200 mb-2">
                <i class="fa-solid fa-book-open text-teal-600"></i>
                <span>مَهَارَةُ الْقِرَاءَةِ وَتَحْلِيلُ الإِعْرَابِ (Maharah Qira'ah & I'rab)</span>
              </div>
              <h2 class="text-3xl sm:text-5xl font-extrabold font-arabic text-emerald-950 leading-relaxed text-right dir-rtl">\${reading.title}</h2>
              <p class="text-xs sm:text-sm text-emerald-700 font-medium mt-1">\${reading.titleTranslation}</p>
            </div>

            <!-- Action Controls -->
            <div class="flex flex-wrap items-center gap-2 self-start sm:self-auto">
              <!-- Font Size Selector -->
              <div class="inline-flex items-center bg-emerald-50 border border-emerald-200 rounded-2xl p-1 shadow-sm text-xs font-bold">
                <button id="qiraah-font-sm" class="px-2.5 py-1.5 rounded-xl transition-all \${state.qiraahFontSize === 'sm' ? 'bg-emerald-700 text-white shadow-xs' : 'text-emerald-800 hover:bg-emerald-100'}" title="Ukuran Teks Sedang">A-</button>
                <button id="qiraah-font-md" class="px-2.5 py-1.5 rounded-xl transition-all \${!state.qiraahFontSize || state.qiraahFontSize === 'md' ? 'bg-emerald-700 text-white shadow-xs' : 'text-emerald-800 hover:bg-emerald-100'}" title="Ukuran Teks Normal">A</button>
                <button id="qiraah-font-lg" class="px-2.5 py-1.5 rounded-xl transition-all \${state.qiraahFontSize === 'lg' ? 'bg-emerald-700 text-white shadow-xs' : 'text-emerald-800 hover:bg-emerald-100'}" title="Ukuran Teks Besar">A+</button>
              </div>

              <!-- Master Toggle Translation Button -->
              <button id="toggle-qiraah-trans-btn" class="px-4 py-2.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 rounded-2xl text-xs font-bold border border-emerald-200 transition-all flex items-center gap-2 shadow-sm">
                <i class="fa-solid \${state.showQiraahTranslation ? 'fa-eye-slash text-emerald-600' : 'fa-eye text-emerald-600'}"></i>
                <span>\${state.showQiraahTranslation ? 'Sembunyikan Semua Arti' : 'Tampilkan Arti Bahasa Indonesia'}</span>
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
              
              <button id="toggle-irob-color-btn" class="px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all border flex items-center gap-1.5 self-start sm:self-auto \${state.showQiraahIrobColor ? 'bg-emerald-600 text-white border-emerald-400 shadow' : 'bg-white/10 text-emerald-200 border-white/20'}">
                <i class="fa-solid \${state.showQiraahIrobColor ? 'fa-toggle-on text-yellow-300' : 'fa-toggle-off'}"></i>
                <span>\${state.showQiraahIrobColor ? 'Warna Syntax: AKTIF' : 'Warna Syntax: NONAKTIF'}</span>
              </button>
            </div>

            \${state.showQiraahIrobColor ? \`
              <div class="flex flex-wrap items-center gap-2 text-[11px] font-bold pt-1">
                <span class="px-2.5 py-1 rounded-xl bg-emerald-100 text-emerald-950 border border-emerald-300 flex items-center gap-1">🟢 Fi'il (Kata Kerja)</span>
                <span class="px-2.5 py-1 rounded-xl bg-blue-100 text-blue-950 border border-blue-300 flex items-center gap-1">🔵 Fa'il / Subjek</span>
                <span class="px-2.5 py-1 rounded-xl bg-amber-100 text-amber-950 border border-amber-300 flex items-center gap-1">🟠 Jar & Majrur</span>
                <span class="px-2.5 py-1 rounded-xl bg-purple-100 text-purple-950 border border-purple-300 flex items-center gap-1">🟣 Maf'ul Bih / Mudhaf Ilaih</span>
                <span class="px-2.5 py-1 rounded-xl bg-cyan-100 text-cyan-950 border border-cyan-300 flex items-center gap-1">🩵 Mubtada' / Khabar</span>
                <span class="px-2.5 py-1 rounded-xl bg-rose-100 text-rose-950 border border-rose-300 flex items-center gap-1">🔴 Badal / Athaf / Nahi</span>
              </div>
            \` : ''}
          </div>

          <!-- Paragraph Cards List -->
          <div class="space-y-8">
            \${reading.paragraphs.map((p, idx) => {
              const arabicLines = p.arabic.split('\\n').filter(l => l.trim().length > 0);
              const isTransShown = state.showQiraahTranslation || state.openQiraahAccordions[idx];
              const hasTokens = p.tokens && p.tokens.length > 0;

              return \`
                <div class="p-6 sm:p-8 rounded-[2rem] bg-emerald-50/40 border-2 border-emerald-100/90 space-y-6 shadow-sm hover:shadow-md transition-all">
                  
                  <!-- Paragraph Top Bar -->
                  <div class="flex items-center justify-between border-b border-emerald-200/60 pb-4">
                    <div class="flex items-center gap-2">
                      <span class="w-8 h-8 rounded-xl bg-emerald-700 text-white text-xs flex items-center justify-center font-bold shadow-sm">\${idx + 1}</span>
                      \${p.section ? \`<span class="text-xs sm:text-sm font-bold text-emerald-900 font-arabic bg-emerald-100/90 px-3.5 py-1 rounded-full border border-emerald-200">\${p.section}</span>\` : ''}
                    </div>

                    <div class="flex items-center gap-2">
                      <!-- Individual Translation Toggle Button -->
                      <button data-qiraah-acc="\${idx}" class="qiraah-acc-btn text-xs px-3.5 py-1.5 bg-white hover:bg-emerald-100 text-emerald-800 rounded-xl border border-emerald-200 transition-all flex items-center gap-1.5 font-bold shadow-sm">
                        <i class="fa-solid \${isTransShown ? 'fa-eye-slash' : 'fa-eye'}"></i>
                        <span>\${isTransShown ? 'Tutup Arti' : 'Lihat Arti'}</span>
                      </button>

                      <!-- Audio Speech Button -->
                      <button data-speech="\${p.arabic.replace(/\\n/g, ' ')}" class="speech-btn text-xs px-3.5 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl transition-all flex items-center gap-1.5 font-bold shadow-sm">
                        <i class="fa-solid fa-volume-high"></i>
                        <span>Dengarkan</span>
                      </button>
                    </div>
                  </div>

                  <!-- Arabic Text Lines Container (Color Coded I'rab Badges or Natural Clean Flow) -->
                  <div class="bg-white p-6 sm:p-8 rounded-3xl border border-emerald-100/80 shadow-inner text-right dir-rtl">
                    \${state.showQiraahIrobColor && hasTokens ? \`
                      <div class="qiraah-interactive-passage font-arabic \${fontSizeClass} font-bold text-emerald-950 text-right dir-rtl">
                        \${(() => {
                          let html = '';
                          let runningTokens = [];

                          function flushRunningTokens() {
                            if (runningTokens.length === 0) return '';
                            const segment = \`
                              <p class="my-1.5 leading-relaxed tracking-normal" style="word-spacing: 0.08em;">
                                \${runningTokens.map(item => {
                                  const bStyle = COLOR_BADGES[item.token.color] || COLOR_BADGES.emerald;
                                  return \`
                                    <button data-irob-p="\${idx}" data-irob-t="\${item.tIdx}" class="irob-token-btn inline-block px-2.5 py-0.5 mx-1 my-1 rounded-xl \${bStyle} transition-all duration-150 align-baseline cursor-pointer hover:shadow-sm hover:scale-[1.02] shadow-2xs" title="Klik untuk penjelasan kedudukan I'rab: \${item.token.roleDesc || ''}">
                                      <span>\${item.token.word}</span>
                                    </button>
                                  \`;
                                }).join('')}
                              </p>
                            \`;
                            runningTokens = [];
                            return segment;
                          }

                          p.tokens.forEach((token, tIdx) => {
                            const trimmed = token.word.trim();
                            // Check if token is a section number/title (starts with ١. or ٢. or ٣.)
                            if (/^[١٢٣٤٥٦٧٨٩0-9]+\\./.test(trimmed)) {
                              html += flushRunningTokens();
                              const bStyle = COLOR_BADGES[token.color] || COLOR_BADGES.cyan;
                              html += \`
                                <div class="mb-3 pb-2 border-b-2 border-emerald-100 flex items-center justify-between gap-3">
                                  <button data-irob-p="\${idx}" data-irob-t="\${tIdx}" class="irob-token-btn text-right font-arabic font-extrabold text-emerald-900 hover:text-emerald-700 transition-colors" title="Klik untuk penjelasan I'rab">
                                    <span>\${token.word}</span>
                                  </button>
                                  <span class="text-xs px-3 py-1 rounded-full \${bStyle} font-sans font-bold shadow-xs">
                                    \${token.roleDesc || 'Judul Bagian'}
                                  </span>
                                </div>
                              \`;
                            } else if (trimmed.startsWith('•')) {
                              html += flushRunningTokens();
                              const bStyle = COLOR_BADGES[token.color] || COLOR_BADGES.rose;
                              html += \`
                                <div class="my-2.5 pr-4 border-r-4 border-emerald-500 bg-emerald-50/60 rounded-2xl p-3 flex items-center justify-between gap-3 shadow-xs">
                                  <button data-irob-p="\${idx}" data-irob-t="\${tIdx}" class="irob-token-btn text-right flex-1 font-arabic font-bold text-emerald-950 hover:text-emerald-800 transition-colors" title="Klik untuk penjelasan I'rab">
                                    <span>\${token.word}</span>
                                  </button>
                                  <span class="text-xs px-3 py-1 rounded-full \${bStyle} font-sans font-bold whitespace-nowrap shadow-xs">
                                    \${token.roleDesc || 'I\\'rab'}
                                  </span>
                                </div>
                              \`;
                            } else {
                              runningTokens.push({ token, tIdx });
                            }
                          });

                          html += flushRunningTokens();
                          return html;
                        })()}
                      </div>
                    \` : \`
                      <div class="qiraah-clean-passage font-arabic \${fontSizeClass} font-bold text-emerald-950 text-right dir-rtl space-y-3">
                        \${arabicLines.map(line => {
                          const isNumbered = /^[١٢٣٤٥٦٧٨٩0-9]+\\./.test(line.trim());
                          const isBullet = line.trim().startsWith('•');
                          if (isNumbered) {
                            return \`
                              <div class="font-extrabold text-emerald-900 border-b border-emerald-200/80 pb-2 mb-2">
                                \${line}
                              </div>
                            \`;
                          }
                          if (isBullet) {
                            return \`
                              <div class="pr-5 border-r-4 border-emerald-600 bg-emerald-50/70 p-4 rounded-2xl my-2.5 shadow-xs">
                                \${line}
                              </div>
                            \`;
                          }
                          return \`
                            <p class="py-1 leading-relaxed tracking-normal" style="word-spacing: 0.08em;">
                              \${line}
                            </p>
                          \`;
                        }).join('')}
                      </div>
                    \`}
                  </div>

                  <!-- Indonesian Translation (Hidden by default, expandable) -->
                  \${isTransShown ? \`
                    <div class="text-xs sm:text-sm text-emerald-900 pt-4 border-t border-emerald-200/80 leading-relaxed font-sans bg-white/95 p-5 rounded-2xl space-y-1 shadow-xs border border-emerald-100">
                      <div class="flex items-center gap-2 text-emerald-800 font-bold mb-1">
                        <i class="fa-solid fa-language text-emerald-600"></i>
                        <span>Terjemahan Bahasa Indonesia:</span>
                      </div>
                      <p class="whitespace-pre-line text-emerald-950 leading-relaxed">\${p.translation}</p>
                    </div>
                  \` : ''}

                </div>
              \`;
            }).join('')}
          </div>

        </div>

        <!-- I'RAB DETAIL MODAL POPUP (Shows when user clicks any colored phrase) -->
        \${modalToken ? \`
          <div id="irob-modal-overlay" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-emerald-950/70 backdrop-blur-sm animate-fadeIn">
            <div class="bg-white rounded-[2.5rem] p-6 sm:p-8 max-w-lg w-full border-4 border-emerald-600 shadow-2xl space-y-5 relative transform transition-all scale-100">
              
              <!-- Modal Header -->
              <div class="flex items-center justify-between border-b border-emerald-100 pb-3">
                <div class="flex items-center gap-3">
                  <div class="w-10 h-10 rounded-2xl bg-emerald-700 text-white font-bold flex items-center justify-center text-base shadow-sm">
                    <i class="fa-solid fa-spell-check"></i>
                  </div>
                  <div>
                    <h3 class="text-xs font-bold uppercase tracking-wider text-emerald-800 font-sans">Keterangan I'rab (Kedudukan Gramatikal)</h3>
                    <span class="text-xs text-emerald-600 font-semibold font-sans">\${modalToken.roleDesc}</span>
                  </div>
                </div>
                <button id="close-irob-modal-btn" class="w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 flex items-center justify-center font-bold text-sm transition-colors">
                  <i class="fa-solid fa-xmark"></i>
                </button>
              </div>

              <!-- Lafaz Frasa Banner -->
              <div class="bg-emerald-50/80 p-5 rounded-3xl border border-emerald-200 text-center space-y-1.5 shadow-inner">
                <span class="text-[11px] font-bold text-emerald-700 uppercase tracking-widest block font-sans">اللَّفْظُ (Lafaz Frasa):</span>
                <h2 class="text-3xl sm:text-4xl font-extrabold font-arabic text-emerald-950 py-1 drop-shadow-xs dir-rtl">\${modalToken.word}</h2>
                <div class="inline-block px-3.5 py-1 bg-emerald-700 text-white rounded-full text-xs font-bold font-sans shadow-xs">
                  Arti: "\${modalToken.meaning}"
                </div>
              </div>

              <!-- Grammatical Role Badge -->
              <div class="space-y-1">
                <label class="text-[11px] font-bold text-gray-500 uppercase tracking-wider block font-sans">Kedudukan Jabatan Kalimat:</label>
                <div class="p-3.5 bg-emerald-800 text-white rounded-2xl font-arabic font-bold text-xl text-right shadow-sm dir-rtl">
                  \${modalToken.role}
                </div>
              </div>

              <!-- Authentic Arabic I'rab Formula Box -->
              <div class="space-y-1">
                <label class="text-[11px] font-bold text-gray-500 uppercase tracking-wider block font-sans">Penjelasan Kaidah I'rab (الإِعْرَابُ):</label>
                <div class="p-4 bg-amber-50 rounded-2xl border border-amber-200 text-amber-950 font-arabic font-bold text-xl text-right leading-relaxed dir-rtl shadow-inner">
                  \${modalToken.irob}
                </div>
              </div>

              <!-- Footer Buttons -->
              <div class="pt-2 flex items-center justify-between gap-3">
                <button id="modal-speak-btn" class="px-5 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-2xl text-xs font-bold shadow-md transition-all flex items-center gap-2">
                  <i class="fa-solid fa-volume-high"></i>
                  <span>Putar Suara Frasa</span>
                </button>
                <button id="close-irob-modal-btn2" class="px-5 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-2xl text-xs font-bold transition-all">
                  Tutup Keterangan
                </button>
              </div>

            </div>
          </div>
        \` : ''}

      </div>
    \`;
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
          const allText = ARABIC_DATA.reading.paragraphs.map(p => p.arabic).join(' \\n ');
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

    // Close Modal events
    const closeBtn1 = document.getElementById('close-irob-modal-btn');
    const closeBtn2 = document.getElementById('close-irob-modal-btn2');
    const overlay = document.getElementById('irob-modal-overlay');

    if (closeBtn1) {
      closeBtn1.addEventListener('click', () => {
        state.activeIrobModalToken = null;
        render();
      });
    }
    if (closeBtn2) {
      closeBtn2.addEventListener('click', () => {
        state.activeIrobModalToken = null;
        render();
      });
    }
    if (overlay) {
      overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
          state.activeIrobModalToken = null;
          render();
        }
      });
    }
  }

  `;

const qStartIdx = code.indexOf(qiraahStartMarker);
const qEndIdx = code.indexOf(qiraahEndMarker);

if (qStartIdx !== -1 && qEndIdx !== -1) {
  code = code.slice(0, qStartIdx) + newQiraahSection + code.slice(qEndIdx);
  console.log('Qiraah section successfully replaced in code.');
} else {
  console.error('Could not locate qiraah markers:', qStartIdx, qEndIdx);
  process.exit(1);
}

fs.writeFileSync(appPath, code, 'utf8');
console.log('All changes written to app.js successfully!');
