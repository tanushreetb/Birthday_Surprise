// Ghost SVG Generator & Components for Vishwa's Birthday Surprise
// FEMALE GHOST: Pink Bow & Cool Black Sunglasses (Storyteller, Gift Giver)
// MALE GHOST: Backward Lavender Cap (Vishwa, Birthday Boy)
// 100% Solid SVG rendering: Pure #ffffff body fill with bold cartoon outline (#38204d, 3.5px)
// ZERO external/broken filter dependencies so ghosts are ALWAYS crystal clear and vibrant on ANY background!

const GhostSVGs = {
  // Base chubby ghost body path with clean cartoon stroke
  getBodySvg: function(options = {}) {
    const strokeColor = "#38204d";
    const strokeWidth = "3.5";
    return `
      <!-- Solid White Chubby Ghost Body -->
      <path d="M 52 16 
               C 28 16, 18 32, 18 56
               C 18 78, 14 91, 18 97
               C 22 103, 29 96, 36 100
               C 43 104, 47 96, 52 100
               C 57 104, 61 96, 68 100
               C 75 96, 82 103, 86 97
               C 90 91, 86 78, 86 56
               C 86 32, 76 16, 52 16 Z" 
            fill="#ffffff" 
            stroke="${strokeColor}" 
            stroke-width="${strokeWidth}" 
            stroke-linecap="round" 
            stroke-linejoin="round"/>
    `;
  },

  // ----------------------------------------------------------------
  // FEMALE GHOST (Pink Bow + Black Sunglasses)
  // ----------------------------------------------------------------
  female: function(options = {}) {
    const pose = options.pose || 'idle';
    const size = options.size || 130;
    const strokeColor = "#38204d";

    // Pink Ribbon Bow on Head
    const pinkBow = `
      <g class="pink-bow" transform="translate(32, 6)">
        <!-- Left loop -->
        <path d="M 12 12 C 1 3 0 18 10 15 Z" fill="#ff5388" stroke="${strokeColor}" stroke-width="2.5" stroke-linejoin="round"/>
        <path d="M 10 12 C 4 6 5 15 10 13 Z" fill="#ff85aa"/>
        <!-- Right loop -->
        <path d="M 14 12 C 25 3 26 18 16 15 Z" fill="#ff5388" stroke="${strokeColor}" stroke-width="2.5" stroke-linejoin="round"/>
        <path d="M 16 12 C 22 6 21 15 16 13 Z" fill="#ff85aa"/>
        <!-- Bow Center Knot -->
        <circle cx="13" cy="13.5" r="4.2" fill="#e82c67" stroke="${strokeColor}" stroke-width="2.5"/>
        <!-- Ribbon tails -->
        <path d="M 10 17 Q 7 24 3 23" stroke="#e82c67" stroke-width="3" stroke-linecap="round"/>
        <path d="M 16 17 Q 19 24 23 23" stroke="#e82c67" stroke-width="3" stroke-linecap="round"/>
      </g>
    `;

    // Sunglasses
    const sunglassesHtml = `
      <g class="sunglasses-group">
        <!-- Sunglasses Bridge -->
        <path d="M 45 49 Q 52 46 59 49" stroke="${strokeColor}" stroke-width="3.2" stroke-linecap="round"/>
        <!-- Left Lens Frame -->
        <rect x="25" y="42" width="23" height="15" rx="4.5" fill="#241733" stroke="${strokeColor}" stroke-width="2.6"/>
        <!-- Right Lens Frame -->
        <rect x="56" y="42" width="23" height="15" rx="4.5" fill="#241733" stroke="${strokeColor}" stroke-width="2.6"/>
        <!-- Shiny Glare Stripes -->
        <path d="M 28 44 L 35 44 L 30 54 L 28 54 Z" fill="#ffffff" opacity="0.45"/>
        <circle cx="44" cy="53" r="1.5" fill="#ffffff" opacity="0.6"/>
        <path d="M 59 44 L 66 44 L 61 54 L 59 54 Z" fill="#ffffff" opacity="0.45"/>
        <circle cx="75" cy="53" r="1.5" fill="#ffffff" opacity="0.6"/>
      </g>
    `;

    // Rosy Cheeks
    const cheeksHtml = `
      <ellipse cx="31" cy="65" rx="6.5" ry="4" fill="#ff8dae"/>
      <ellipse cx="73" cy="65" rx="6.5" ry="4" fill="#ff8dae"/>
    `;

    // Expressions & Arms based on Emotion / Pose
    let mouthHtml = `<path d="M 47 67 Q 52 74 57 67" stroke="${strokeColor}" stroke-width="3.2" stroke-linecap="round" fill="none"/>`;
    let armsHtml = `
      <!-- Left Hand -->
      <path d="M 22 66 C 12 64 8 74 13 80 C 18 85 24 78 27 72 Z" fill="#ffffff" stroke="${strokeColor}" stroke-width="3" stroke-linejoin="round"/>
      <!-- Right Hand -->
      <path d="M 80 72 C 83 78 89 85 94 80 C 99 74 95 64 85 66 Z" fill="#ffffff" stroke="${strokeColor}" stroke-width="3" stroke-linejoin="round"/>
    `;
    let extrasHtml = '';

    if (pose === 'oops_tease' || pose === 'oops') {
      // Holding Oops! sign, cheeky tongue out
      armsHtml = `
        <path d="M 28 70 C 22 67 18 73 22 78 C 26 82 32 77 32 72 Z" fill="#ffffff" stroke="${strokeColor}" stroke-width="3"/>
        <path d="M 72 72 C 72 77 78 82 82 78 C 86 73 82 67 76 70 Z" fill="#ffffff" stroke="${strokeColor}" stroke-width="3"/>
      `;
      mouthHtml = `
        <!-- Cheeky tongue out -->
        <path d="M 47 67 Q 52 73 57 67" stroke="${strokeColor}" stroke-width="3" stroke-linecap="round" fill="none"/>
        <path d="M 50 70 C 50 76 54 76 54 70 Z" fill="#ff477e" stroke="${strokeColor}" stroke-width="2"/>
      `;
      extrasHtml = `
        <!-- Oops Signboard -->
        <g class="signboard-group" transform="translate(22, 54)">
          <rect x="28" y="16" width="6" height="30" rx="3" fill="#d49b6a" stroke="${strokeColor}" stroke-width="2.5"/>
          <rect x="0" y="0" width="62" height="28" rx="8" fill="#fff9db" stroke="${strokeColor}" stroke-width="3"/>
          <text x="31" y="18" font-family="'Quicksand', sans-serif" font-weight="900" font-size="12" fill="#d96b00" text-anchor="middle">Oops! 🙈</text>
        </g>
      `;
    } else if (pose === 'wave') {
      // Left arm waving up high
      armsHtml = `
        <g transform="translate(8, 40)">
          <path d="M 18 28 C 6 22 2 10 9 6 C 16 2 20 16 24 24 Z" fill="#ffffff" stroke="${strokeColor}" stroke-width="3" stroke-linejoin="round"/>
          <circle cx="9" cy="6" r="5" fill="#ffffff" stroke="${strokeColor}" stroke-width="2.5"/>
          <!-- Wave curves -->
          <path d="M 1 2 Q -3 7 1 12" stroke="#ff8dae" stroke-width="2.5" stroke-linecap="round" fill="none"/>
          <path d="M -3 0 Q -8 7 -3 14" stroke="#ff8dae" stroke-width="2.2" stroke-linecap="round" fill="none"/>
        </g>
        <path d="M 80 72 C 83 78 89 85 94 80 C 99 74 95 64 85 66 Z" fill="#ffffff" stroke="${strokeColor}" stroke-width="3"/>
      `;
      mouthHtml = `
        <path d="M 46 65 Q 52 77 58 65 Z" fill="#e83a6f" stroke="${strokeColor}" stroke-width="2.5"/>
        <path d="M 49 71 Q 52 74 55 71" fill="#ffaec6"/>
      `;
    } else if (pose === 'celebrate' || pose === 'celebrate_jump') {
      // Both arms thrown high
      armsHtml = `
        <path d="M 24 60 C 12 48 8 38 15 36 C 22 34 25 46 28 56 Z" fill="#ffffff" stroke="${strokeColor}" stroke-width="3.2" stroke-linejoin="round"/>
        <path d="M 74 56 C 77 46 80 34 87 36 C 94 38 90 48 78 60 Z" fill="#ffffff" stroke="${strokeColor}" stroke-width="3.2" stroke-linejoin="round"/>
      `;
      mouthHtml = `
        <path d="M 45 64 Q 52 78 59 64 Z" fill="#e83a6f" stroke="${strokeColor}" stroke-width="2.6"/>
        <path d="M 48 72 Q 52 75 56 72" fill="#ffb4cc"/>
      `;
    } else if (pose === 'giggle_tease') {
      // Hand placed over mouth giggling
      armsHtml = `
        <!-- Hand over mouth -->
        <g transform="translate(43, 58)">
          <ellipse cx="9" cy="9" rx="9" ry="6.5" fill="#ffffff" stroke="${strokeColor}" stroke-width="3"/>
        </g>
        <!-- Other hand on hip -->
        <path d="M 80 69 C 86 71 90 77 87 81 C 83 84 78 79 76 73 Z" fill="#ffffff" stroke="${strokeColor}" stroke-width="3"/>
      `;
      mouthHtml = `<path d="M 47 67 Q 52 72 57 67" stroke="${strokeColor}" stroke-width="3" fill="none"/>`;
    } else if (pose === 'hugging_heart') {
      // Hugging pink heart to chest
      armsHtml = `
        <path d="M 27 65 C 35 67 41 73 37 77 C 33 80 25 73 23 69 Z" fill="#ffffff" stroke="${strokeColor}" stroke-width="3"/>
        <path d="M 75 69 C 73 73 65 80 61 77 C 57 73 63 67 71 65 Z" fill="#ffffff" stroke="${strokeColor}" stroke-width="3"/>
      `;
      extrasHtml = `
        <g transform="translate(42, 60)">
          <path d="M 10 5 C 5 -1 0 4 0 9 C 0 14 10 19 10 19 C 10 19 20 14 20 9 C 20 4 15 -1 10 5 Z" fill="#ff3366" stroke="${strokeColor}" stroke-width="2.5"/>
        </g>
      `;
      mouthHtml = `<path d="M 48 64 Q 52 68 56 64" stroke="${strokeColor}" stroke-width="2.8" fill="none"/>`;
    } else if (pose === 'sweet_memory') {
      // Holding sparkling star
      armsHtml = `
        <path d="M 24 66 C 14 64 10 74 15 80 C 20 85 26 78 29 72 Z" fill="#ffffff" stroke="${strokeColor}" stroke-width="3"/>
        <g transform="translate(70, 48)">
          <path d="M 5 22 C 11 18 15 12 19 10 C 22 16 15 22 9 24 Z" fill="#ffffff" stroke="${strokeColor}" stroke-width="3"/>
          <text x="14" y="10" font-size="18">⭐</text>
        </g>
      `;
    } else if (pose === 'hands_on_hips_tease') {
      // Hands on hips teasing
      armsHtml = `
        <path d="M 27 69 C 19 71 15 77 18 81 C 22 84 27 79 29 73 Z" fill="#ffffff" stroke="${strokeColor}" stroke-width="3"/>
        <path d="M 75 73 C 77 79 82 84 86 81 C 89 77 85 71 77 69 Z" fill="#ffffff" stroke="${strokeColor}" stroke-width="3"/>
      `;
      mouthHtml = `<path d="M 46 66 Q 53 71 59 64" stroke="${strokeColor}" stroke-width="3.2" stroke-linecap="round" fill="none"/>`;
    } else if (pose === 'pointing') {
      // Pointing forward
      armsHtml = `
        <path d="M 24 66 C 14 64 10 74 15 80 C 20 85 26 78 29 72 Z" fill="#ffffff" stroke="${strokeColor}" stroke-width="3"/>
        <g transform="translate(72, 60)">
          <path d="M 2 10 L 18 10 C 21 10 21 15 18 15 L 2 15 Z" fill="#ffffff" stroke="${strokeColor}" stroke-width="2.8"/>
          <circle cx="2" cy="12.5" r="5" fill="#ffffff" stroke="${strokeColor}" stroke-width="2.5"/>
        </g>
      `;
      mouthHtml = `<path d="M 46 66 Q 52 74 58 66 Z" fill="#e83a6f" stroke="${strokeColor}" stroke-width="2.4"/>`;
    } else if (pose === 'smug_no_escape') {
      // Finger wagging
      armsHtml = `
        <path d="M 27 71 C 21 73 17 79 21 82 C 25 84 29 79 30 74 Z" fill="#ffffff" stroke="${strokeColor}" stroke-width="3"/>
        <g transform="translate(70, 48)">
          <rect x="8" y="2" width="5.5" height="17" rx="2.8" fill="#ffffff" stroke="${strokeColor}" stroke-width="2.6"/>
          <circle cx="11" cy="20" r="5.5" fill="#ffffff" stroke="${strokeColor}" stroke-width="2.5"/>
        </g>
      `;
      mouthHtml = `<path d="M 46 66 Q 52 72 58 66" stroke="${strokeColor}" stroke-width="3" stroke-linecap="round" fill="none"/>`;
    } else if (pose === 'proud_thumbsup') {
      // Thumbs up!
      armsHtml = `
        <path d="M 24 66 C 14 64 10 74 15 80 C 20 85 26 78 29 72 Z" fill="#ffffff" stroke="${strokeColor}" stroke-width="3"/>
        <g transform="translate(70, 50)">
          <rect x="8" y="2" width="6" height="14" rx="3" fill="#ffffff" stroke="${strokeColor}" stroke-width="2.6"/>
          <circle cx="10" cy="17" r="5.5" fill="#ffffff" stroke="${strokeColor}" stroke-width="2.5"/>
          <path d="M 16 10 L 21 10" stroke="#ff8dae" stroke-width="2.5" stroke-linecap="round"/>
        </g>
      `;
      mouthHtml = `<path d="M 46 65 Q 52 76 58 65 Z" fill="#e83a6f" stroke="${strokeColor}" stroke-width="2.4"/>`;
    }

    return `
      <svg class="ghost-svg ghost-female ${options.className || ''}" width="${size}" height="${size}" viewBox="0 0 104 112" fill="none" xmlns="http://www.w3.org/2000/svg">
        ${this.getBodySvg()}
        ${cheeksHtml}
        ${sunglassesHtml}
        ${mouthHtml}
        ${pinkBow}
        ${armsHtml}
        ${extrasHtml}
      </svg>
    `;
  },

  // ----------------------------------------------------------------
  // MALE GHOST (Backward Lavender Cap - Vishwa)
  // ----------------------------------------------------------------
  male: function(options = {}) {
    const pose = options.pose || 'idle';
    const size = options.size || 130;
    const strokeColor = "#38204d";

    // Backward Cap
    const backwardCap = `
      <g class="backward-cap">
        <!-- Backward Visor -->
        <path d="M 68 23 C 82 19 91 27 89 32 C 85 36 76 35 65 28 Z" 
              fill="#9d62e0" stroke="${strokeColor}" stroke-width="3" stroke-linejoin="round"/>
        <!-- Cap Dome -->
        <path d="M 26 32 C 26 15 40 10 56 11 C 73 12 78 21 78 34 C 69 31 43 30 26 32 Z" 
              fill="#b98bee" stroke="${strokeColor}" stroke-width="3.2" stroke-linejoin="round"/>
        <!-- Seams -->
        <path d="M 52 11 Q 53 21 54 30" stroke="${strokeColor}" stroke-width="2" opacity="0.65"/>
        <path d="M 39 14 Q 41 22 39 30" stroke="${strokeColor}" stroke-width="1.8" opacity="0.5"/>
        <path d="M 65 14 Q 64 22 66 31" stroke="${strokeColor}" stroke-width="1.8" opacity="0.5"/>
        <!-- Button on top -->
        <ellipse cx="52" cy="11" rx="4" ry="3" fill="#f5edff" stroke="${strokeColor}" stroke-width="2.4"/>
        <!-- Back strap arch -->
        <path d="M 31 32 Q 40 28 48 31" stroke="${strokeColor}" stroke-width="2.8" stroke-linecap="round" fill="none"/>
      </g>
    `;

    // Rosy Cheeks
    const cheeksHtml = `
      <ellipse cx="32" cy="62" rx="6.5" ry="4" fill="#ff8dae"/>
      <ellipse cx="72" cy="62" rx="6.5" ry="4" fill="#ff8dae"/>
    `;

    // Eyes, mouth and arms
    let eyesHtml = `
      <path d="M 35 52 Q 42 44 49 52" stroke="${strokeColor}" stroke-width="3.5" stroke-linecap="round" fill="none"/>
      <path d="M 55 52 Q 62 44 69 52" stroke="${strokeColor}" stroke-width="3.5" stroke-linecap="round" fill="none"/>
    `;
    let mouthHtml = `<path d="M 47 66 Q 52 74 57 66" stroke="${strokeColor}" stroke-width="3.2" stroke-linecap="round" fill="none"/>`;
    let armsHtml = `
      <path d="M 22 66 C 12 64 8 74 13 80 C 18 85 24 78 27 72 Z" fill="#ffffff" stroke="${strokeColor}" stroke-width="3" stroke-linejoin="round"/>
      <path d="M 80 72 C 83 78 89 85 94 80 C 99 74 95 64 85 66 Z" fill="#ffffff" stroke="${strokeColor}" stroke-width="3" stroke-linejoin="round"/>
    `;
    let extrasHtml = '';

    if (pose === 'peace' || pose === 'peace_excited') {
      // Signature Peace Sign ✌️
      armsHtml = `
        <path d="M 22 66 C 12 64 8 74 13 80 C 18 85 24 78 27 72 Z" fill="#ffffff" stroke="${strokeColor}" stroke-width="3"/>
        <g transform="translate(70, 44)">
          <path d="M 4 24 C 6 18 12 14 16 12 C 19 18 12 24 6 26 Z" fill="#ffffff" stroke="${strokeColor}" stroke-width="2.8"/>
          <rect x="13" y="1" width="5" height="14" rx="2.5" fill="#ffffff" stroke="${strokeColor}" stroke-width="2.6"/>
          <rect x="20" y="3" width="5" height="13" rx="2.5" fill="#ffffff" stroke="${strokeColor}" stroke-width="2.6"/>
          <circle cx="16" cy="17" r="5" fill="#ffffff" stroke="${strokeColor}" stroke-width="2.5"/>
        </g>
      `;
      mouthHtml = `<path d="M 46 64 Q 52 76 58 64 Z" fill="#e83a6f" stroke="${strokeColor}" stroke-width="2.4"/>`;
    } else if (pose === 'double_peace') {
      // Both hands peace signs!
      armsHtml = `
        <g transform="translate(8, 44)">
          <path d="M 22 24 C 20 18 14 14 10 12 C 7 18 14 24 20 26 Z" fill="#ffffff" stroke="${strokeColor}" stroke-width="2.8"/>
          <rect x="8" y="1" width="5" height="14" rx="2.5" fill="#ffffff" stroke="${strokeColor}" stroke-width="2.6"/>
          <rect x="1" y="3" width="5" height="13" rx="2.5" fill="#ffffff" stroke="${strokeColor}" stroke-width="2.6"/>
          <circle cx="10" cy="17" r="5" fill="#ffffff" stroke="${strokeColor}" stroke-width="2.5"/>
        </g>
        <g transform="translate(70, 44)">
          <path d="M 4 24 C 6 18 12 14 16 12 C 19 18 12 24 6 26 Z" fill="#ffffff" stroke="${strokeColor}" stroke-width="2.8"/>
          <rect x="13" y="1" width="5" height="14" rx="2.5" fill="#ffffff" stroke="${strokeColor}" stroke-width="2.6"/>
          <rect x="20" y="3" width="5" height="13" rx="2.5" fill="#ffffff" stroke="${strokeColor}" stroke-width="2.6"/>
          <circle cx="16" cy="17" r="5" fill="#ffffff" stroke="${strokeColor}" stroke-width="2.5"/>
        </g>
      `;
      mouthHtml = `<path d="M 45 64 Q 52 77 59 64 Z" fill="#e83a6f" stroke="${strokeColor}" stroke-width="2.4"/>`;
    } else if (pose === 'puffed_blow') {
      // Puffed cheeks blowing candles
      eyesHtml = `
        <path d="M 36 53 Q 42 49 48 53" stroke="${strokeColor}" stroke-width="3.2" stroke-linecap="round" fill="none"/>
        <path d="M 56 53 Q 62 49 68 53" stroke="${strokeColor}" stroke-width="3.2" stroke-linecap="round" fill="none"/>
      `;
      mouthHtml = `
        <circle cx="52" cy="67" r="5.5" fill="#ffffff" stroke="${strokeColor}" stroke-width="3"/>
        <path d="M 52 74 Q 52 83 47 87" stroke="#75b8f5" stroke-width="3" stroke-linecap="round" fill="none"/>
        <path d="M 57 73 Q 60 81 64 85" stroke="#75b8f5" stroke-width="3" stroke-linecap="round" fill="none"/>
      `;
    } else if (pose === 'shy_blush') {
      // Scratching head bashfully
      armsHtml = `
        <path d="M 22 66 C 12 64 8 74 13 80 C 18 85 24 78 27 72 Z" fill="#ffffff" stroke="${strokeColor}" stroke-width="3"/>
        <g transform="translate(64, 26)">
          <path d="M 10 34 C 17 30 22 21 19 15 C 15 11 8 19 6 28 Z" fill="#ffffff" stroke="${strokeColor}" stroke-width="3"/>
          <circle cx="15" cy="13" r="5.5" fill="#ffffff" stroke="${strokeColor}" stroke-width="2.5"/>
        </g>
      `;
      mouthHtml = `<path d="M 48 67 Q 52 72 56 67" stroke="${strokeColor}" stroke-width="3.2" stroke-linecap="round" fill="none"/>`;
    } else if (pose === 'nervous_sweat' || pose === 'confused') {
      // Blue sweat drop, wavy mouth
      eyesHtml = `
        <circle cx="41" cy="51" r="4.2" fill="${strokeColor}"/>
        <circle cx="43" cy="49" r="1.6" fill="#ffffff"/>
        <path d="M 57 53 Q 62 47 67 53" stroke="${strokeColor}" stroke-width="3.2" stroke-linecap="round" fill="none"/>
      `;
      mouthHtml = `<path d="M 46 68 Q 50 63 54 67 Q 58 71 60 67" stroke="${strokeColor}" stroke-width="3" stroke-linecap="round" fill="none"/>`;
      extrasHtml = `
        <path d="M 72 38 C 72 35 77 30 77 30 C 77 30 82 35 82 38 C 82 41 77 44 77 44 C 77 44 72 41 72 38 Z" fill="#54b2ff" stroke="${strokeColor}" stroke-width="2"/>
      `;
    } else if (pose === 'celebrate') {
      armsHtml = `
        <path d="M 24 60 C 12 48 8 38 15 36 C 22 34 25 46 28 56 Z" fill="#ffffff" stroke="${strokeColor}" stroke-width="3.2" stroke-linejoin="round"/>
        <path d="M 74 56 C 77 46 80 34 87 36 C 94 38 90 48 78 60 Z" fill="#ffffff" stroke="${strokeColor}" stroke-width="3.2" stroke-linejoin="round"/>
      `;
      mouthHtml = `<path d="M 45 64 Q 52 77 59 64 Z" fill="#e83a6f" stroke="${strokeColor}" stroke-width="2.4"/>`;
    }

    return `
      <svg class="ghost-svg ghost-male ${options.className || ''}" width="${size}" height="${size}" viewBox="0 0 104 112" fill="none" xmlns="http://www.w3.org/2000/svg">
        ${this.getBodySvg()}
        ${cheeksHtml}
        ${eyesHtml}
        ${mouthHtml}
        ${backwardCap}
        ${armsHtml}
        ${extrasHtml}
      </svg>
    `;
  },

  // ----------------------------------------------------------------
  // GHOST DUO CONTAINER
  // ----------------------------------------------------------------
  duo: function(options = {}) {
    const fPose = options.fPose || 'idle';
    const mPose = options.mPose || 'peace';
    const size = options.size || 125;
    const centerItem = options.centerItem || 'heart';

    let centerHtml = '';
    if (centerItem === 'heart') {
      centerHtml = `
        <div class="duo-center-item heart-glow-item">
          <span class="center-heart-pulse">💗</span>
        </div>
      `;
    } else if (centerItem === 'gift') {
      centerHtml = `
        <div class="duo-center-item gift-item">
          <div class="kawaii-gift-box">
            <span class="gift-box-body">🎁</span>
          </div>
        </div>
      `;
    }

    // STRICT IDENTITY: Female on LEFT, Male on RIGHT
    return `
      <div class="ghost-duo-container ${options.className || ''}">
        <div class="ghost-wrapper female-ghost-wrapper">
          ${this.female({ pose: fPose, size: size })}
        </div>
        ${centerHtml}
        <div class="ghost-wrapper male-ghost-wrapper">
          ${this.male({ pose: mPose, size: size })}
        </div>
      </div>
    `;
  },

  // ----------------------------------------------------------------
  // TWO GHOSTS CLOSE TOGETHER (Sweet side-by-side companion pose) 🫂💗
  // ----------------------------------------------------------------
  closeDuo: function(options = {}) {
    const size = options.size || 115;
    return `
      <div class="ghost-close-duo" style="display: flex; flex-direction: column; align-items: center; justify-content: center;">
        <div style="display: flex; align-items: flex-end; justify-content: center; gap: 6px;">
          <!-- Female ghost on LEFT -->
          <div class="ghost-wrapper" style="animation: ghostFloat 3s ease-in-out infinite alternate;">
            ${this.female({ pose: "hugging_heart", size: size })}
          </div>
          <!-- Sweet glowing heart between them -->
          <div style="display: flex; flex-direction: column; align-items: center; margin-bottom: 22px;">
            <span style="font-size: 1.8rem; display: inline-block; animation: heartBeat 1.4s infinite ease-in-out; filter: drop-shadow(0 0 10px rgba(255, 100, 160, 0.7));">💗</span>
          </div>
          <!-- Male ghost on RIGHT -->
          <div class="ghost-wrapper" style="animation: ghostFloat 3s ease-in-out infinite alternate; animation-delay: 1.2s;">
            ${this.male({ pose: "peace_excited", size: size })}
          </div>
        </div>
        <div style="font-family: 'Quicksand', sans-serif; font-size: 0.98rem; font-weight: 800; color: #7d3b82; margin-top: 8px; text-shadow: 0 1px 3px rgba(255, 255, 255, 0.8);">
          "Two little ghosts. One very special story. 👻👻♡" 🫂💗
        </div>
      </div>
    `;
  },

  huggingDuo: function(options = {}) {
    return this.closeDuo(options);
  }
};
