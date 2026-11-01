/**
 * VISHWA'S LITTLE GHOST WORLD – THE ULTIMATE BIRTHDAY SURPRISE 👻💗🎂
 * Core Application Engine & State Controller
 */

// ==========================================
// 1. CONFIGURATION (EASY TO CHANGE)
// ==========================================
const SURPRISE_CONFIG = {
  // Secret Password (Case-insensitive)
  secretPassword: "Thangoo",

  // Gift Clue Answers (Normalized lowercase check)
  giftAnswers: {
    clue1: ["pen", "ball pen", "ink pen", "gel pen", "a pen", "pens"],
    clue2: ["wallet", "purse", "pocket wallet", "money purse", "a wallet"],
    clue3: [
      "notes",
      "lucky stars",
      "small envelopes",
      "little notes",
      "letters",
      "folded notes",
      "origami stars",
      "note",
      "star",
      "envelope"
    ]
  },

  // Balloon Messages (Exact Order)
  balloonMessages: [
    "I didn't plan to get this attached to your nonsense, but here we are! 😂❤️",
    "Even silence feels comfortable when it's with the right person. 🥹💗",
    "Out of all the random people, I'm glad life introduced me to you. 🫶✨",
    "You make the simplest moments feel like little memories worth keeping. ❤️"
  ]
};

// ==========================================
// 2. STATE MANAGEMENT
// ==========================================
const AppState = {
  currentPageId: "page-1",
  balloonPopped: [false, false, false, false],
  activeBalloonIndex: 0,
  candlesBlown: false,
  giftClueProgress: 0, // 0 to 3
  micListening: false,
  micStream: null,
  audioContext: null,
  analyser: null
};

// ==========================================
// 3. INITIALIZATION
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
  renderAllGhosts();
  initAmbientParticles();
  setupEventListeners();
  initConfettiCanvas();
  setupClickHearts();
});

// Render Ghost Characters into their specific screen containers with distinct emotional poses
function renderAllGhosts() {
  // Page 1: Both ghosts together with wrapped gift (Female waving, Male curious/thinking)
  const showcaseP1 = document.getElementById("ghostShowcasePage1");
  if (showcaseP1) {
    showcaseP1.innerHTML = GhostSVGs.duo({
      fPose: "wave",
      mPose: "curious",
      size: 125,
      centerItem: "gift"
    });
  }

  // Page 2: FEMALE GHOST with sunglasses & pink bow holding Oops message board with cheeky wink & tongue out
  const showcaseP2 = document.getElementById("ghostShowcasePage2");
  if (showcaseP2) {
    showcaseP2.innerHTML = GhostSVGs.female({
      pose: "oops_tease",
      size: 135
    });
  }

  // Page 3: Both ghosts together (Female excited jumping, Male enthusiastic peace sign)
  const showcaseP3 = document.getElementById("ghostShowcasePage3");
  if (showcaseP3) {
    showcaseP3.innerHTML = GhostSVGs.duo({
      fPose: "celebrate_jump",
      mPose: "peace_excited",
      size: 125,
      centerItem: "heart"
    });
  }

  // Page 6: Birthday Cake with Female ghost cheering on Left & Male ghost blowing candles on Right
  const cakeLeft = document.getElementById("cakeGhostLeft");
  const cakeRight = document.getElementById("cakeGhostRight");
  if (cakeLeft) {
    cakeLeft.innerHTML = GhostSVGs.female({ pose: "celebrate", size: 100 });
  }
  if (cakeRight) {
    cakeRight.innerHTML = GhostSVGs.male({ pose: "puffed_blow", size: 100 });
  }

  // Page 7: Celebrating ghosts after candle blow-out (Female teasing hands on hips "Good boy!", Male shy blushing)
  const showcaseP7 = document.getElementById("ghostShowcasePage7");
  if (showcaseP7) {
    showcaseP7.innerHTML = GhostSVGs.duo({
      fPose: "hands_on_hips_tease",
      mPose: "shy_blush",
      size: 125,
      centerItem: "heart"
    });
  }

  // Page 8: Gift hunt intro (Female pointing eagerly, Male ready)
  const showcaseP8 = document.getElementById("ghostShowcasePage8");
  if (showcaseP8) {
    showcaseP8.innerHTML = GhostSVGs.duo({
      fPose: "pointing",
      mPose: "ready",
      size: 125,
      centerItem: "gift"
    });
  }

  // Page 9: Mischievous female ghost (smug finger wagging) + confused male ghost (sweat drop)
  const showcaseP9 = document.getElementById("ghostShowcasePage9");
  if (showcaseP9) {
    showcaseP9.innerHTML = GhostSVGs.duo({
      fPose: "smug_no_escape",
      mPose: "nervous_sweat",
      size: 125,
      centerItem: "heart"
    });
  }

  // Page 11: First gift unlocked (Female proud thumbs up, Male cheering)
  const showcaseP11 = document.getElementById("ghostShowcasePage11");
  if (showcaseP11) {
    showcaseP11.innerHTML = GhostSVGs.duo({
      fPose: "proud_thumbsup",
      mPose: "celebrate",
      size: 125,
      centerItem: "heart"
    });
  }

  // Page 14: STRICT RULE -> FEMALE GHOST on LEFT, MALE GHOST on RIGHT with glowing heart
  const showcaseP14 = document.getElementById("ghostShowcasePage14");
  if (showcaseP14) {
    showcaseP14.innerHTML = `
      <div class="ghost-duo-container">
        <!-- Female ghost strictly on LEFT -->
        <div class="ghost-wrapper female-ghost-wrapper">
          ${GhostSVGs.female({ pose: "celebrate_jump", size: 130 })}
        </div>
        <div class="duo-center-item heart-glow-item">
          <span class="center-heart-pulse">💗</span>
        </div>
        <!-- Male ghost (Vishwa) strictly on RIGHT -->
        <div class="ghost-wrapper male-ghost-wrapper">
          ${GhostSVGs.male({ pose: "double_peace", size: 130 })}
        </div>
      </div>
    `;
  }

  // Page 15: Two ghosts sitting sweetly close together side-by-side! 🫂💗
  const showcaseP15 = document.getElementById("ghostShowcasePage15");
  if (showcaseP15) {
    showcaseP15.innerHTML = GhostSVGs.closeDuo({ size: 120 });
  }
}

// Navigation switcher
function goToPage(targetPageId) {
  const currentPanel = document.getElementById(AppState.currentPageId);
  const targetPanel = document.getElementById(targetPageId);

  if (!targetPanel) return;

  if (currentPanel) {
    currentPanel.classList.remove("active");
  }

  targetPanel.classList.add("active");
  AppState.currentPageId = targetPageId;

  // Update Chapter Bar and Window Title
  const chapterText = targetPanel.getAttribute("data-chapter") || "Vishwa's Birthday Surprise";
  const windowTitle = targetPanel.getAttribute("data-title") || "A Little World Called Us 👻";

  document.getElementById("chapterTitle").textContent = chapterText;
  document.getElementById("windowTitle").innerHTML = `<span>${windowTitle}</span>`;

  // Scroll viewport smoothly to top
  window.scrollTo({ top: 0, behavior: "smooth" });

  // Page-specific setup
  if (targetPageId === "page-6") {
    setupMicBlowDetection();
  } else {
    stopMicBlowDetection();
  }

  if (targetPageId === "page-11" || targetPageId === "page-14" || targetPageId === "page-15") {
    triggerConfetti(50);
  }
}

// ==========================================
// 4. EVENT LISTENERS
// ==========================================
function setupEventListeners() {
  // Sound Toggles
  const musicBtn = document.getElementById("musicToggleBtn");
  const musicIcon = document.getElementById("musicIcon");
  musicBtn.addEventListener("click", () => {
    audioMgr.playClick();
    const isPlaying = audioMgr.toggleMusic();
    musicBtn.classList.toggle("playing", isPlaying);
    musicIcon.textContent = isPlaying ? "🎶" : "🎵";
  });

  const sfxBtn = document.getElementById("sfxToggleBtn");
  const sfxIcon = document.getElementById("sfxIcon");
  sfxBtn.addEventListener("click", () => {
    const isUnmuted = audioMgr.toggleMute();
    sfxIcon.textContent = isUnmuted ? "🔔" : "🔕";
  });

  // PAGE 1: Secret Login
  const loginForm = document.getElementById("loginForm");
  const passwordInput = document.getElementById("passwordInput");
  const loginFeedback = document.getElementById("loginFeedback");
  const unlockBtn = document.getElementById("unlockBtn");

  function handleLogin() {
    audioMgr.ensureContext();
    const entered = passwordInput.value.trim().toLowerCase();
    const correct = SURPRISE_CONFIG.secretPassword.trim().toLowerCase();

    if (entered === correct) {
      audioMgr.playSuccessFanfare();
      triggerConfetti(60);
      loginFeedback.classList.remove("show");
      goToPage("page-3"); // Welcome Vishwa
    } else {
      audioMgr.playWrongBoing();
      // Shake window card
      const card = document.getElementById("storyCard");
      card.classList.add("shake-animation");
      setTimeout(() => card.classList.remove("shake-animation"), 500);

      // Go to Page 2 (Wrong Password Screen with Female Ghost)
      goToPage("page-2");
    }
  }

  unlockBtn.addEventListener("click", handleLogin);
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    handleLogin();
  });

  // PAGE 2: Try Again Button -> return to Page 1
  const tryAgainBtn = document.getElementById("tryAgainBtn");
  tryAgainBtn.addEventListener("click", () => {
    audioMgr.playClick();
    passwordInput.value = "";
    goToPage("page-1");
    setTimeout(() => passwordInput.focus(), 300);
  });

  // PAGE 3: Welcome Next Button -> Balloon Surprise
  const welcomeNextBtn = document.getElementById("welcomeNextBtn");
  welcomeNextBtn.addEventListener("click", () => {
    audioMgr.playClick();
    goToPage("page-4");
  });

  // PAGE 4: Balloons Click Interactions
  setupBalloonInteractions();

  // Balloon Completion Button -> Page 6 Birthday Cake
  const toCakeBtn = document.getElementById("toCakeBtn");
  toCakeBtn.addEventListener("click", () => {
    audioMgr.playClick();
    goToPage("page-6");
  });

  // PAGE 6: Birthday Cake Candle Blow
  const blowCandleBtn = document.getElementById("blowCandleBtn");
  blowCandleBtn.addEventListener("click", () => {
    extinguishCandles();
  });

  // PAGE 7: After Cake Next -> Page 8 Gift Intro
  const afterCakeNextBtn = document.getElementById("afterCakeNextBtn");
  afterCakeNextBtn.addEventListener("click", () => {
    audioMgr.playClick();
    goToPage("page-8");
  });

  // PAGE 8: Ready Yes/No
  const readyYesBtn = document.getElementById("readyYesBtn");
  const readyNoBtn = document.getElementById("readyNoBtn");

  readyYesBtn.addEventListener("click", () => {
    audioMgr.playClick();
    goToPage("page-10"); // Direct to Clue 1
  });

  readyNoBtn.addEventListener("click", () => {
    audioMgr.playWrongBoing();
    goToPage("page-9"); // Funny No Response
  });

  // PAGE 9: No Escape Button -> Page 10 Clue 1
  const noEscapeBtn = document.getElementById("noEscapeBtn");
  noEscapeBtn.addEventListener("click", () => {
    audioMgr.playClick();
    goToPage("page-10");
  });

  // PAGE 10: Clue 1 (Pen)
  setupClueValidation("clue1Form", "clue1Input", "clue1Feedback", "clue1SubmitBtn", "clue1", () => {
    AppState.giftClueProgress = 1;
    goToPage("page-11"); // First Gift Unlocked
  });

  // PAGE 11: After Gift 1 -> Clue 2 (Page 12)
  const clue1SuccessNextBtn = document.getElementById("clue1SuccessNextBtn");
  clue1SuccessNextBtn.addEventListener("click", () => {
    audioMgr.playClick();
    goToPage("page-12");
  });

  // PAGE 12: Clue 2 (Wallet)
  setupClueValidation("clue2Form", "clue2Input", "clue2Feedback", "clue2SubmitBtn", "clue2", () => {
    AppState.giftClueProgress = 2;
    document.getElementById("clue2SubmitBtn").style.display = "none";
    document.getElementById("clue2SuccessBox").style.display = "flex";
  });

  const clue2ProceedBtn = document.getElementById("clue2ProceedBtn");
  if (clue2ProceedBtn) {
    clue2ProceedBtn.addEventListener("click", () => {
      audioMgr.playClick();
      goToPage("page-13"); // Clue 3
    });
  }

  // PAGE 13: Clue 3 (Notes / Folded Notes / Lucky Stars)
  setupClueValidation("clue3Form", "clue3Input", "clue3Feedback", "clue3SubmitBtn", "clue3", () => {
    AppState.giftClueProgress = 3;
    document.getElementById("clue3SubmitBtn").style.display = "none";
    document.getElementById("clue3SuccessBox").style.display = "flex";
  });

  const clue3ProceedBtn = document.getElementById("clue3ProceedBtn");
  if (clue3ProceedBtn) {
    clue3ProceedBtn.addEventListener("click", () => {
      audioMgr.playClick();
      goToPage("page-14"); // All Gifts Unlocked
    });
  }

  // PAGE 14: All Gifts Unlocked -> Read Final Message (Page 15)
  const toFinalLetterBtn = document.getElementById("toFinalLetterBtn");
  toFinalLetterBtn.addEventListener("click", () => {
    audioMgr.playSuccessFanfare();
    goToPage("page-15");
  });

  // PAGE 15: Replay Adventure
  const replayAdventureBtn = document.getElementById("replayAdventureBtn");
  replayAdventureBtn.addEventListener("click", () => {
    audioMgr.playClick();
    // Reset state
    AppState.balloonPopped = [false, false, false, false];
    AppState.candlesBlown = false;
    AppState.giftClueProgress = 0;
    resetBalloonsUI();
    resetCakeUI();
    resetCluesUI();
    goToPage("page-1");
  });
}

// ==========================================
// 5. BALLOON POPPING & MODAL LOGIC
// ==========================================
function setupBalloonInteractions() {
  const overlay = document.getElementById("balloonPopupOverlay");
  const closeBtn = document.getElementById("balloonPopupClose");
  const ackBtn = document.getElementById("balloonPopupAckBtn");
  const msgText = document.getElementById("balloonPopupMsg");
  const numText = document.getElementById("balloonPopupNumber");
  const ghostHolder = document.getElementById("balloonPopupGhost");

  // Populate popup with cute female ghost delivering message
  ghostHolder.innerHTML = GhostSVGs.female({ pose: "excited", size: 85 });

  function closePopup() {
    audioMgr.playClick();
    overlay.classList.remove("show");

    // Check if all 4 are popped
    const allPopped = AppState.balloonPopped.every(Boolean);
    if (allPopped) {
      document.getElementById("balloonCompletionArea").style.display = "flex";
      document.getElementById("balloonInitialHint").style.display = "none";
      triggerConfetti(60);
      audioMgr.playSuccessFanfare();
    }
  }

  closeBtn.addEventListener("click", closePopup);
  ackBtn.addEventListener("click", closePopup);

  for (let i = 0; i < 4; i++) {
    const bElem = document.getElementById(`balloon-${i}`);
    if (!bElem) continue;

    bElem.addEventListener("click", () => {
      if (AppState.balloonPopped[i]) return;

      audioMgr.ensureContext();
      audioMgr.playBalloonPop();

      // Trigger pop animation
      bElem.classList.add("popping");
      setTimeout(() => {
        bElem.classList.remove("popping");
        bElem.classList.add("popped");
      }, 300);

      AppState.balloonPopped[i] = true;

      // Update count
      const poppedTotal = AppState.balloonPopped.filter(Boolean).length;
      document.getElementById("poppedCount").textContent = poppedTotal;

      // Show Message Popup with emotion-specific female ghost pose
      numText.textContent = `Message ${i + 1} of 4 💌`;
      msgText.textContent = SURPRISE_CONFIG.balloonMessages[i];

      // Emotion-specific poses for female ghost delivering each message
      const balloonPoses = ["giggle_tease", "hugging_heart", "wave", "sweet_memory"];
      ghostHolder.innerHTML = GhostSVGs.female({ pose: balloonPoses[i] || "wave", size: 100 });

      overlay.classList.add("show");

      // Spawn pop particles
      spawnParticlesAround(bElem);
    });
  }
}

function resetBalloonsUI() {
  for (let i = 0; i < 4; i++) {
    const b = document.getElementById(`balloon-${i}`);
    if (b) {
      b.classList.remove("popped", "popping");
    }
  }
  document.getElementById("poppedCount").textContent = "0";
  document.getElementById("balloonCompletionArea").style.display = "none";
  document.getElementById("balloonInitialHint").style.display = "block";
}

// ==========================================
// 6. BIRTHDAY CAKE & CANDLE BLOW INTERACTION
// ==========================================
function extinguishCandles() {
  if (AppState.candlesBlown) return;
  AppState.candlesBlown = true;

  audioMgr.playCandleBlow();

  const cakeStage = document.getElementById("cakeStage");
  cakeStage.classList.add("candle-blown");

  // Male ghost rejoices after blowing candles!
  const cakeRight = document.getElementById("cakeGhostRight");
  if (cakeRight) {
    cakeRight.innerHTML = GhostSVGs.male({ pose: "peace_excited", size: 100 });
  }

  // Disable button
  const blowBtn = document.getElementById("blowCandleBtn");
  blowBtn.disabled = true;
  blowBtn.innerHTML = "<span>Yayyy! Wishes are on their way! ✨🎉</span>";

  triggerConfetti(80);

  // Stop mic detection
  stopMicBlowDetection();

  // Proceed to Page 7 after short celebratory delay
  setTimeout(() => {
    goToPage("page-7");
  }, 1800);
}

function resetCakeUI() {
  const cakeStage = document.getElementById("cakeStage");
  if (cakeStage) cakeStage.classList.remove("candle-blown");
  const blowBtn = document.getElementById("blowCandleBtn");
  if (blowBtn) {
    blowBtn.disabled = false;
    blowBtn.innerHTML = "<span>Blow the Candles! 🕯️💨</span>";
  }
  const cakeRight = document.getElementById("cakeGhostRight");
  if (cakeRight) {
    cakeRight.innerHTML = GhostSVGs.male({ pose: "puffed_blow", size: 100 });
  }
}

function resetCluesUI() {
  const clue1Input = document.getElementById("clue1Input");
  const clue2Input = document.getElementById("clue2Input");
  const clue3Input = document.getElementById("clue3Input");
  if (clue1Input) clue1Input.value = "";
  if (clue2Input) clue2Input.value = "";
  if (clue3Input) clue3Input.value = "";

  const clue2Btn = document.getElementById("clue2SubmitBtn");
  const clue3Btn = document.getElementById("clue3SubmitBtn");
  const clue2Box = document.getElementById("clue2SuccessBox");
  const clue3Box = document.getElementById("clue3SuccessBox");

  if (clue2Btn) clue2Btn.style.display = "inline-flex";
  if (clue3Btn) clue3Btn.style.display = "inline-flex";
  if (clue2Box) clue2Box.style.display = "none";
  if (clue3Box) clue3Box.style.display = "none";
}

// Microphone Blow Detection
function setupMicBlowDetection() {
  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
    return;
  }

  // Request mic permission gracefully
  navigator.mediaDevices.getUserMedia({ audio: true })
    .then((stream) => {
      AppState.micStream = stream;
      AppState.micListening = true;

      const AudioContext = window.AudioContext || window.webkitAudioContext;
      AppState.audioContext = new AudioContext();
      const source = AppState.audioContext.createMediaStreamSource(stream);
      AppState.analyser = AppState.audioContext.createAnalyser();
      AppState.analyser.fftSize = 256;

      source.connect(AppState.analyser);

      const hint = document.getElementById("micStatusText");
      if (hint) {
        hint.textContent = "🎙️ Microphone active! Blow gently into your mic to extinguish the candles!";
        hint.style.color = "#a3f7bf";
      }

      checkMicAudioLevel();
    })
    .catch((err) => {
      // Permission denied or error: button fallback is already active and works 100%
      const hint = document.getElementById("micStatusText");
      if (hint) {
        hint.textContent = "Tip: Click the button above to blow the candles!";
      }
    });
}

function checkMicAudioLevel() {
  if (!AppState.micListening || !AppState.analyser || AppState.candlesBlown) return;

  const dataArray = new Uint8Array(AppState.analyser.frequencyBinCount);
  AppState.analyser.getByteFrequencyData(dataArray);

  // Blowing into microphone generates high low-frequency energy / volume spike
  let sum = 0;
  for (let i = 0; i < 15; i++) {
    sum += dataArray[i];
  }
  const lowFreqAverage = sum / 15;

  if (lowFreqAverage > 165) {
    extinguishCandles();
    return;
  }

  requestAnimationFrame(checkMicAudioLevel);
}

function stopMicBlowDetection() {
  AppState.micListening = false;
  if (AppState.micStream) {
    AppState.micStream.getTracks().forEach((track) => track.stop());
    AppState.micStream = null;
  }
  if (AppState.audioContext && AppState.audioContext.state !== "closed") {
    AppState.audioContext.close().catch(() => {});
    AppState.audioContext = null;
  }
}

// ==========================================
// 7. GIFT HUNT CLUE VALIDATION
// ==========================================
function setupClueValidation(formId, inputId, feedbackId, submitBtnId, clueKey, onSuccess) {
  const form = document.getElementById(formId);
  const input = document.getElementById(inputId);
  const feedback = document.getElementById(feedbackId);
  const btn = document.getElementById(submitBtnId);

  function validate() {
    audioMgr.ensureContext();
    const entered = input.value.trim().toLowerCase();
    const acceptedList = SURPRISE_CONFIG.giftAnswers[clueKey] || [];

    // Check if entered answer contains or matches any valid answer
    const isCorrect = acceptedList.some(
      (ans) => entered === ans || entered.includes(ans)
    );

    if (isCorrect && entered.length > 0) {
      feedback.classList.remove("show");
      audioMgr.playSuccessFanfare();
      triggerConfetti(65);
      onSuccess();
    } else {
      audioMgr.playWrongBoing();
      // Shake input container
      const container = input.closest(".screen-panel");
      if (container) {
        container.classList.add("shake-animation");
        setTimeout(() => container.classList.remove("shake-animation"), 500);
      }

      // Display exact wrong feedback specified in requirements
      let wrongMsg = "Wronguu! 😂 Innum konjam yosichu paaru!";
      if (clueKey === "clue1") {
        wrongMsg = "Aiyooo! 😂 Konjam yosichu paaru Paaa!";
      }

      feedback.textContent = wrongMsg;
      feedback.classList.add("show");
    }
  }

  btn.addEventListener("click", validate);
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    validate();
  });
}

// ==========================================
// 8. VISUAL EFFECTS & AMBIENT PARTICLES
// ==========================================
function initAmbientParticles() {
  const container = document.getElementById("ambientBg");
  if (!container) return;

  const symbols = ["💗", "✨", "☁️", "⭐", "🫧", "🎀", "🤍"];
  const count = 18;

  for (let i = 0; i < count; i++) {
    const particle = document.createElement("div");
    particle.className = "ambient-particle";
    particle.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    particle.style.left = `${Math.random() * 100}vw`;
    particle.style.fontSize = `${14 + Math.random() * 18}px`;
    particle.style.animationDuration = `${10 + Math.random() * 12}s`;
    particle.style.animationDelay = `${Math.random() * 10}s`;
    container.appendChild(particle);
  }
}

// Spawn heart on click / tap anywhere
function setupClickHearts() {
  const heartIcons = ["💗", "💖", "✨", "🫶", "🤍", "🌸"];
  window.addEventListener("pointerdown", (e) => {
    // Avoid triggering too aggressively on input elements
    if (e.target.tagName === "INPUT" || e.target.tagName === "BUTTON") return;

    const heart = document.createElement("div");
    heart.className = "floating-click-heart";
    heart.textContent = heartIcons[Math.floor(Math.random() * heartIcons.length)];
    heart.style.left = `${e.clientX}px`;
    heart.style.top = `${e.clientY}px`;
    document.body.appendChild(heart);

    setTimeout(() => heart.remove(), 1200);
  });
}

function spawnParticlesAround(elem) {
  const rect = elem.getBoundingClientRect();
  const emojis = ["✨", "💗", "⭐", "🎉"];
  for (let i = 0; i < 6; i++) {
    const p = document.createElement("div");
    p.className = "floating-click-heart";
    p.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    p.style.left = `${rect.left + rect.width / 2 + (Math.random() * 40 - 20)}px`;
    p.style.top = `${rect.top + rect.height / 2 + (Math.random() * 40 - 20)}px`;
    document.body.appendChild(p);
    setTimeout(() => p.remove(), 1200);
  }
}

// ==========================================
// 9. HIGH-PERFORMANCE CONFETTI ENGINE
// ==========================================
let confettiParticles = [];
let confettiAnimId = null;

function initConfettiCanvas() {
  const canvas = document.getElementById("confettiCanvas");
  if (!canvas) return;

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  resize();
  window.addEventListener("resize", resize);
}

function triggerConfetti(amount = 70) {
  const canvas = document.getElementById("confettiCanvas");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");

  const colors = ["#ff758c", "#ff7eb3", "#d6bdf5", "#ffcc00", "#7dbef7", "#fff", "#fca479"];

  for (let i = 0; i < amount; i++) {
    confettiParticles.push({
      x: canvas.width / 2 + (Math.random() * 100 - 50),
      y: canvas.height * 0.45,
      vx: (Math.random() - 0.5) * 12,
      vy: -Math.random() * 12 - 4,
      size: Math.random() * 8 + 5,
      color: colors[Math.floor(Math.random() * colors.length)],
      rotation: Math.random() * 360,
      vRotation: (Math.random() - 0.5) * 10,
      opacity: 1
    });
  }

  if (!confettiAnimId) {
    renderConfetti(ctx, canvas);
  }
}

function renderConfetti(ctx, canvas) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = confettiParticles.length - 1; i >= 0; i--) {
    const p = confettiParticles[i];
    p.x += p.vx;
    p.y += p.vy;
    p.vy += 0.35; // Gravity
    p.vx *= 0.98; // Air resistance
    p.rotation += p.vRotation;
    p.opacity -= 0.012;

    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate((p.rotation * Math.PI) / 180);
    ctx.globalAlpha = Math.max(0, p.opacity);
    ctx.fillStyle = p.color;
    ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
    ctx.restore();

    if (p.opacity <= 0 || p.y > canvas.height + 20) {
      confettiParticles.splice(i, 1);
    }
  }

  if (confettiParticles.length > 0) {
    confettiAnimId = requestAnimationFrame(() => renderConfetti(ctx, canvas));
  } else {
    confettiAnimId = null;
  }
}
