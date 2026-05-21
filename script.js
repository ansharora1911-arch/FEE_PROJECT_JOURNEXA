// =================== DOM REFERENCES ===================
// Grab all HTML elements we need. 'const' because these never change.

// Screens
const welcomeScreen = document.getElementById('welcome-screen');
const appScreen = document.getElementById('app-screen');

// Authentication forms & steps
const signinForm = document.getElementById('signin-form');
const signupForm = document.getElementById('signup-form');
const signinEmail = document.getElementById('signin-email');
const signinPassword = document.getElementById('signin-password');
const signupName = document.getElementById('signup-name');
const signupEmail = document.getElementById('signup-email');
const signupPassword = document.getElementById('signup-password');
const tabSignin = document.getElementById('tab-signin');
const tabSignup = document.getElementById('tab-signup');
const authTabs = document.getElementById('auth-tabs');
const personalizationStep = document.getElementById('personalization-step');
const personalizeUserNameText = document.getElementById('personalize-user-name');
const backToSignupBtn = document.getElementById('back-to-signup');

// Personalization form
const personalizeForm = document.getElementById('personalize-form');
const customHappyInput = document.getElementById('custom-happy');

// Navigation
const menuToggle = document.getElementById('menu-toggle');
const mainNav = document.getElementById('main-nav');
const logoutNavBtn = document.getElementById('logout-nav-btn');
const navLinks = document.querySelectorAll('.nav-link:not(.logout-btn)');
const sections = document.querySelectorAll('.section');

// Dashboard
const displayName = document.getElementById('display-name');
const quoteText = document.getElementById('quote-text');
const quoteAuthor = document.getElementById('quote-author');
const newQuoteBtn = document.getElementById('new-quote-btn');

// Journal form
const entryForm = document.getElementById('entry-form');
const entryTitle = document.getElementById('entry-title');
const entryContent = document.getElementById('entry-content');
const charCount = document.getElementById('char-count');

// Entry display
const entriesGrid = document.getElementById('entries-grid');
const emptyState = document.getElementById('empty-state');
const searchInput = document.getElementById('search-input');

// Mood popup
const moodPopupOverlay = document.getElementById('mood-popup-overlay');
const popupMoodEmoji = document.getElementById('popup-mood-emoji');
const popupMoodName = document.getElementById('popup-mood-name');
const popupMoodDetail = document.getElementById('popup-mood-detail');
const popupHappySection = document.getElementById('popup-happy-section');
const popupHappyList = document.getElementById('popup-happy-list');
const popupClose = document.getElementById('popup-close');
const popupOkBtn = document.getElementById('popup-ok-btn');

// Mood tracker
const moodHistoryList = document.getElementById('mood-history-list');
const resetMoodBtn = document.getElementById('reset-mood-btn');

// Other
const resetAllBtn = document.getElementById('reset-all-btn');
const toastContainer = document.getElementById('toast-container');

// Theme toggle
const themeToggle = document.getElementById('theme-toggle');
const themeIconSun = document.getElementById('theme-icon-sun');
const themeIconMoon = document.getElementById('theme-icon-moon');

// Enhanced popup elements
const popupBetterSection = document.getElementById('popup-better-section');
const popupBetterSubtitle = document.getElementById('popup-better-subtitle');
const popupActivityCards = document.getElementById('popup-activity-cards');
const breathingCircle = document.getElementById('breathing-circle');
const breathingText = document.getElementById('breathing-text');
const breathingTimer = document.getElementById('breathing-timer');
const popupTipText = document.getElementById('popup-tip-text');

// localStorage keys
const KEYS = {
  USER: 'journexa_user',
  ENTRIES: 'journexa_entries',
  MOODS: 'journexa_moods',
  THEME: 'journexa_theme',
};
const MOOD_KEYWORDS = {
  happy: [
    'happy', 'joy', 'joyful', 'glad', 'great', 'amazing', 'wonderful',
    'fantastic', 'awesome', 'love', 'loved', 'excited', 'grateful',
    'thankful', 'blessed', 'smile', 'smiling', 'laugh', 'laughed',
    'fun', 'enjoy', 'enjoyed', 'beautiful', 'perfect', 'best',
    'celebrate', 'proud', 'accomplished', 'good', 'positive', 'cheerful',
    'delighted', 'pleased', 'thrilled', 'content', 'satisfied',
    'nice', 'brilliant', 'excellent', 'superb', 'magnificent',
  ],
  sad: [
    'sad', 'unhappy', 'depressed', 'down', 'lonely', 'alone',
    'cry', 'cried', 'crying', 'tears', 'heartbroken', 'hurt',
    'pain', 'painful', 'miss', 'missing', 'lost', 'disappointed',
    'hopeless', 'empty', 'broken', 'grief', 'sorrow', 'miserable',
    'gloomy', 'upset', 'terrible', 'awful', 'worst', 'bad',
    'unfortunate', 'regret', 'failed', 'failure', 'rejected',
    'hate', 'hated', 'suffer', 'suffering', 'tough',
  ],
  stressed: [
    'stressed', 'stress', 'anxious', 'anxiety', 'worried', 'worry',
    'nervous', 'tense', 'pressure', 'overwhelmed', 'exhausted',
    'tired', 'frustrated', 'frustrating', 'annoyed', 'angry',
    'deadline', 'overwork', 'burnout', 'panic', 'fear', 'scared',
    'confused', 'chaos', 'hectic', 'crazy', 'insomnia', 'restless',
    'irritated', 'burden', 'struggling', 'difficult', 'hard',
    'complicated', 'impossible', 'stuck', 'problem', 'trouble',
  ],
  excited: [
    'excited', 'excitement', 'thrilled', 'eager', 'pumped',
    'cant wait', 'looking forward', 'adventure', 'new', 'opportunity',
    'dream', 'dreaming', 'inspire', 'inspired', 'inspiring',
    'motivation', 'motivated', 'energetic', 'energy', 'passion',
    'passionate', 'creative', 'innovation', 'explore', 'discover',
    'achieve', 'achievement', 'goal', 'ambition', 'hope', 'hopeful',
    'future', 'bright', 'optimistic', 'possibility', 'wow',
  ],
};

const MOOD_CONFIG = {
  happy:    { emoji: '😊', label: 'Happy',    value: 4, detail: 'Your entry has a positive and joyful tone!' },
  excited:  { emoji: '🤩', label: 'Excited',  value: 3, detail: 'You sound enthusiastic and full of energy!' },
  stressed: { emoji: '😰', label: 'Stressed', value: 2, detail: 'It seems like you\'re under some pressure. Take it easy.' },
  sad:      { emoji: '😢', label: 'Sad',      value: 1, detail: 'We sense some sadness in your words. Remember, it gets better.' },
  neutral:  { emoji: '😐', label: 'Neutral',  value: 2.5, detail: 'Your entry seems neutral. Every day is a new day!' },
};

/**
 * @param {string} text
 * @returns {string} — Detected mood: 'happy', 'sad', 'stressed', 'excited', or 'neutral'
 */
const analyzeMood = (text) => {
  // Step 1: Convert to lowercase
  const lowerText = text.toLowerCase();
  let detectedMood = 'neutral';
  let highestScore = 0;

  // Step 2: Check keywords for each mood
  Object.keys(MOOD_KEYWORDS).forEach((mood) => {
    let score = 0;
    
    MOOD_KEYWORDS[mood].forEach((keyword) => {
      // Simple check if the text contains the keyword
      if (lowerText.includes(keyword)) {
        score++;
      }
    });

    // Step 3: Find the mood with the highest score
    if (score > highestScore) {
      highestScore = score;
      detectedMood = mood;
    }
  });

  // Step 4: Return the detected mood
  return detectedMood;
};


// ============================================================
// SECTION 2: AUTHENTICATION & ONBOARDING (First Screen)
// ============================================================

// Temporary storage for signup step 1 (credentials)
let tempSignupData = null;

// Password Show/Hide Toggle Logic
document.querySelectorAll('.password-toggle-btn').forEach((btn) => {
  btn.addEventListener('click', () => {
    const input = btn.previousElementSibling;
    if (input.type === 'password') {
      input.type = 'text';
      btn.textContent = '🙈';
    } else {
      input.type = 'password';
      btn.textContent = '👁️';
    }
  });
});

// Authentication Tabs Logic
const switchAuthTab = (targetTab) => {
  if (targetTab === 'signin') {
    tabSignin.classList.add('active');
    tabSignup.classList.remove('active');
    signinForm.style.display = 'block';
    signupForm.style.display = 'none';
    personalizationStep.style.display = 'none';
    authTabs.style.display = 'flex';
  } else if (targetTab === 'signup') {
    tabSignup.classList.add('active');
    tabSignin.classList.remove('active');
    signupForm.style.display = 'block';
    signinForm.style.display = 'none';
    personalizationStep.style.display = 'none';
    authTabs.style.display = 'flex';
  }
};

tabSignin.addEventListener('click', () => switchAuthTab('signin'));
tabSignup.addEventListener('click', () => switchAuthTab('signup'));

document.getElementById('switch-to-signup').addEventListener('click', (e) => {
  e.preventDefault();
  switchAuthTab('signup');
});

document.getElementById('switch-to-signin').addEventListener('click', (e) => {
  e.preventDefault();
  switchAuthTab('signin');
});

// Back to credentials screen from personalization
backToSignupBtn.addEventListener('click', () => {
  personalizationStep.style.display = 'none';
  signupForm.style.display = 'block';
  authTabs.style.display = 'flex';
});

// Handle Sign In submission
signinForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const email = signinEmail.value.trim().toLowerCase();
  const password = signinPassword.value;

  if (!email || !password) {
    showToast('Please enter both email and password.', 'error');
    return;
  }

  const accounts = getAccounts();
  const acc = accounts.find((a) => a.email.toLowerCase() === email);

  if (!acc || acc.password !== password) {
    showToast('Invalid email or password.', 'error');
    return;
  }

  // Log in
  localStorage.setItem('journexa_session_email', email);
  signinForm.reset();

  showAppScreen();
  showToast(`Welcome back, ${acc.name}! 👋`, 'success');
});

// Handle Sign Up (Step 1: Credentials) submission
signupForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const name = signupName.value.trim();
  const email = signupEmail.value.trim().toLowerCase();
  const password = signupPassword.value;

  if (!name || !email || !password) {
    showToast('Please fill in all credentials.', 'error');
    return;
  }

  if (password.length < 6) {
    showToast('Password must be at least 6 characters long.', 'error');
    return;
  }

  const accounts = getAccounts();
  const exists = accounts.some((a) => a.email.toLowerCase() === email);

  if (exists) {
    showToast('An account with this email already exists.', 'error');
    return;
  }

  // Cache credentials and transition to Personalization (Step 2)
  tempSignupData = { name, email, password };
  
  signupForm.style.display = 'none';
  authTabs.style.display = 'none';
  personalizeUserNameText.textContent = name;
  personalizationStep.style.display = 'block';
});

// Handle Personalization step form submission
personalizeForm.addEventListener('submit', (e) => {
  e.preventDefault();

  if (!tempSignupData) {
    showToast('Onboarding data is missing. Please start over.', 'error');
    switchAuthTab('signup');
    return;
  }

  // Collect "happy things" from checkboxes
  const checkboxes = document.querySelectorAll('input[name="happy-things"]:checked');
  const happyThings = Array.from(checkboxes).map((cb) => cb.value);

  // Add custom happy thing if provided
  const customHappy = customHappyInput.value.trim();
  if (customHappy) {
    happyThings.push(customHappy);
  }

  // Save new account object
  const newAccount = {
    email: tempSignupData.email,
    password: tempSignupData.password,
    name: tempSignupData.name,
    happyThings: happyThings,
    entries: [],
    moods: [],
  };

  const accounts = getAccounts();
  accounts.push(newAccount);
  saveAccounts(accounts);

  // Log in automatically
  localStorage.setItem('journexa_session_email', tempSignupData.email);

  // Reset forms & temp data
  signupForm.reset();
  personalizeForm.reset();
  tempSignupData = null;

  // Show the main app
  showAppScreen();
  showToast(`Account created successfully! Welcome, ${newAccount.name}! 🎉`, 'success');
});

/**
 * showAppScreen — Hides welcome screen, shows main app, loads dashboard.
 */
const showAppScreen = () => {
  welcomeScreen.style.display = 'none';
  appScreen.style.display = 'flex';
  loadDashboard();
};

/**
 * loadDashboard — Sets up the main dashboard with user data.
 */
const loadDashboard = () => {
  const user = getUser();

  if (user) {
    displayName.textContent = user.name;

    // Time-based greeting
    const greetingEl = document.querySelector('.greeting h1');
    const hour = new Date().getHours();
    let timeGreeting = 'Good morning';
    if (hour >= 12 && hour < 17) timeGreeting = 'Good afternoon';
    if (hour >= 17) timeGreeting = 'Good evening';
    greetingEl.innerHTML = `${timeGreeting}, <span class="highlight">${escapeHTML(user.name)}</span>! 👋`;
  }

  fetchQuote();
  renderEntries();
  switchSection('home');
  initMoodChart();
};
/**
 * switchSection — Shows the selected section, hides all others.
 */
const switchSection = (sectionId) => {
  sections.forEach((s) => s.classList.remove('active'));
  navLinks.forEach((l) => l.classList.remove('active'));

  const target = document.getElementById(sectionId);
  if (target) target.classList.add('active');

  const targetLink = document.querySelector(`.nav-link[data-section="${sectionId}"]`);
  if (targetLink) targetLink.classList.add('active');

  mainNav.classList.remove('open');

  // Refresh chart when visiting Mood Tracker
  if (sectionId === 'mood-tracker') {
    initMoodChart();
    renderMoodHistory();
  }
};

// Nav link clicks
navLinks.forEach((link) => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    switchSection(link.getAttribute('data-section'));
  });
});

// Hamburger toggle
menuToggle.addEventListener('click', () => {
  mainNav.classList.toggle('open');
});

// Any element with data-section (like empty state CTA)
document.querySelectorAll('[data-section]').forEach((el) => {
  if (!el.classList.contains('nav-link')) {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      switchSection(el.getAttribute('data-section'));
    });
  }
});
// Dynamic session and account management
const getActiveEmail = () => {
  try {
    return localStorage.getItem('journexa_session_email');
  } catch (e) {
    return null;
  }
};

const getAccounts = () => {
  try {
    const data = localStorage.getItem('journexa_accounts');
    if (!data) return [];
    const parsed = JSON.parse(data);
    return Array.isArray(parsed) ? parsed : [];
  } catch (e) {
    console.error('Failed to parse accounts:', e);
    return [];
  }
};

const saveAccounts = (accounts) => {
  try {
    localStorage.setItem('journexa_accounts', JSON.stringify(Array.isArray(accounts) ? accounts : []));
  } catch (e) {
    console.error('Failed to save accounts:', e);
  }
};

const saveUser = (userProfile) => {
  const email = getActiveEmail();
  if (!email) return;
  const accounts = getAccounts();
  const accIndex = accounts.findIndex((a) => a.email.toLowerCase() === email.toLowerCase());
  if (accIndex !== -1) {
    accounts[accIndex].name = userProfile.name;
    accounts[accIndex].happyThings = userProfile.happyThings;
    saveAccounts(accounts);
  }
};

const deleteCurrentAccountData = () => {
  const email = getActiveEmail();
  if (!email) return;
  const accounts = getAccounts();
  const accIndex = accounts.findIndex((a) => a.email.toLowerCase() === email.toLowerCase());
  if (accIndex !== -1) {
    accounts[accIndex].entries = [];
    accounts[accIndex].moods = [];
    accounts[accIndex].happyThings = [];
    saveAccounts(accounts);
  }
  try {
    localStorage.removeItem('journexa_session_email');
  } catch (e) {}
};

const migrateOldUser = () => {
  try {
    const oldUser = localStorage.getItem('journexa_user');
    if (oldUser) {
      let parsedUser = {};
      try {
        parsedUser = JSON.parse(oldUser);
      } catch (e) {
        // Fallback if oldUser was stored as a raw name string in legacy versions
        parsedUser = { name: oldUser };
      }

      let oldEntries = [];
      try {
        const rawEntries = localStorage.getItem('journexa_entries');
        if (rawEntries) oldEntries = JSON.parse(rawEntries);
      } catch (e) {
        console.error('Failed to parse old entries:', e);
      }

      let oldMoods = [];
      try {
        const rawMoods = localStorage.getItem('journexa_moods');
        if (rawMoods) oldMoods = JSON.parse(rawMoods);
      } catch (e) {
        console.error('Failed to parse old moods:', e);
      }

      const accounts = getAccounts();
      const guestEmail = 'guest@journexa.com';
      const guestExists = accounts.some((a) => a.email.toLowerCase() === guestEmail);

      if (!guestExists) {
        accounts.push({
          email: guestEmail,
          password: '', // Empty password for legacy guest accounts
          name: typeof parsedUser === 'object' && parsedUser ? (parsedUser.name || 'User') : 'User',
          happyThings: typeof parsedUser === 'object' && parsedUser ? (parsedUser.happyThings || []) : [],
          entries: Array.isArray(oldEntries) ? oldEntries : [],
          moods: Array.isArray(oldMoods) ? oldMoods : []
        });
        saveAccounts(accounts);
      }

      // Auto login as guest
      localStorage.setItem('journexa_session_email', guestEmail);

      // Clean up old legacy keys to preserve space
      localStorage.removeItem('journexa_user');
      localStorage.removeItem('journexa_entries');
      localStorage.removeItem('journexa_moods');
    }
  } catch (err) {
    console.error('Legacy data migration failed:', err);
  }
};

/** getUser — Reads user profile from active session */
const getUser = () => {
  const email = getActiveEmail();
  if (!email) return null;
  const accounts = getAccounts();
  const acc = accounts.find((a) => a.email.toLowerCase() === email.toLowerCase());
  return acc ? { name: acc.name, happyThings: acc.happyThings || [] } : null;
};

/** getEntries — Reads journal entries from active session */
const getEntries = () => {
  const email = getActiveEmail();
  if (!email) return [];
  const accounts = getAccounts();
  const acc = accounts.find((a) => a.email.toLowerCase() === email.toLowerCase());
  return acc ? (acc.entries || []) : [];
};

/** saveEntries — Writes entries array to active session */
const saveEntries = (entries) => {
  const email = getActiveEmail();
  if (!email) return;
  const accounts = getAccounts();
  const accIndex = accounts.findIndex((a) => a.email.toLowerCase() === email.toLowerCase());
  if (accIndex !== -1) {
    accounts[accIndex].entries = Array.isArray(entries) ? entries : [];
    saveAccounts(accounts);
  }
};

/** getMoods — Reads mood chart data from active session */
const getMoods = () => {
  const email = getActiveEmail();
  if (!email) return [];
  const accounts = getAccounts();
  const acc = accounts.find((a) => a.email.toLowerCase() === email.toLowerCase());
  return acc ? (acc.moods || []) : [];
};

/** saveMoods — Writes mood chart data to active session */
const saveMoods = (moods) => {
  const email = getActiveEmail();
  if (!email) return;
  const accounts = getAccounts();
  const accIndex = accounts.findIndex((a) => a.email.toLowerCase() === email.toLowerCase());
  if (accIndex !== -1) {
    accounts[accIndex].moods = moods;
    saveAccounts(accounts);
  }
};

/** escapeHTML — Prevents XSS by escaping HTML characters */
const escapeHTML = (str) => {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
};
/**
 * addEntry — Creates a new entry with AI mood analysis.
 * The AI analyzes the content and stores the detected mood WITH the entry.
 *
 * @param {string} title   — Entry title
 * @param {string} content — Entry content
 * @returns {Object} — The new entry object (includes AI-detected mood)
 */
const addEntry = (title, content) => {
  const entries = getEntries();

  // AI analyzes the content to detect mood
  const detectedMood = analyzeMood(content);

  const newEntry = {
    id: Date.now(),
    title: title,
    content: content,
    mood: detectedMood,           // AI-detected mood stored with entry
    date: new Date().toLocaleDateString('en-US', {
      year: 'numeric', month: 'short', day: 'numeric',
    }),
    timestamp: Date.now(),
  };

  entries.unshift(newEntry);
  saveEntries(entries);

  // Also log the mood for the chart
  logMoodForChart(detectedMood, title);

  return newEntry;
};

/**
 * deleteEntry — Removes an entry by ID using Array.filter().
 */
const deleteEntry = (id) => {
  let entries = getEntries();
  entries = entries.filter((entry) => entry.id !== id);
  saveEntries(entries);
};

/**
 * logMoodForChart — Saves mood data for the chart.
 * Each entry adds a data point: { day, mood, value, title, date }.
 */
const logMoodForChart = (mood, title) => {
  const moods = getMoods();

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const today = dayNames[new Date().getDay()];
  const config = MOOD_CONFIG[mood] || MOOD_CONFIG.neutral;

  moods.push({
    day: today,
    mood: mood,
    value: config.value,
    title: title,
    date: new Date().toLocaleDateString('en-US', {
      month: 'short', day: 'numeric',
    }),
    emoji: config.emoji,
    label: config.label,
  });

  // Keep only the last 14 entries to avoid localStorage overflow
  if (moods.length > 14) {
    moods.splice(0, moods.length - 14);
  }

  saveMoods(moods);
};
/**
 * createEntryCard — Generates HTML for one entry card.
 * Each card now shows an AI-detected mood badge.
 */
const createEntryCard = (entry) => {
  const moodClass = entry.mood || 'neutral';
  const moodConfig = MOOD_CONFIG[moodClass] || MOOD_CONFIG.neutral;

  return `
    <article class="entry-card" data-id="${entry.id}">
      <div class="entry-card-header">
        <h3 class="entry-card-title">${escapeHTML(entry.title)}</h3>
        <span class="mood-badge ${moodClass}">${moodConfig.emoji} ${moodConfig.label}</span>
      </div>
      <p class="entry-card-content">${escapeHTML(entry.content)}</p>
      <div class="entry-card-footer">
        <span class="entry-card-date">${entry.date}</span>
        <button class="btn-delete-entry" data-id="${entry.id}" title="Delete entry" aria-label="Delete entry">
          🗑️
        </button>
      </div>
    </article>
  `;
};

/**
 * renderEntries — Displays all entries, filtered by optional search text.
 */
const renderEntries = (filterText = '') => {
  let entries = getEntries();

  if (filterText) {
    const s = filterText.toLowerCase();
    entries = entries.filter(
      (e) => e.title.toLowerCase().includes(s) || e.content.toLowerCase().includes(s)
    );
  }

  if (entries.length > 0) {
    entriesGrid.innerHTML = entries.map(createEntryCard).join('');
    emptyState.classList.add('hidden');
    entriesGrid.style.display = 'grid';
  } else {
    entriesGrid.innerHTML = '';
    entriesGrid.style.display = 'none';
    emptyState.classList.remove('hidden');
  }

  // Attach delete button listeners
  attachDeleteListeners();
};

/**
 * attachDeleteListeners — Adds click handlers to all delete buttons.
 * Uses event delegation-style per-button binding after each render.
 */
const attachDeleteListeners = () => {
  const deleteButtons = document.querySelectorAll('.btn-delete-entry');
  deleteButtons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const entryId = Number(btn.getAttribute('data-id'));
      showCustomConfirm(
        'Delete Entry',
        'Are you sure you want to delete this journal entry? This cannot be undone.',
        '🗑️',
        () => {
          deleteEntry(entryId);
          renderEntries(searchInput.value);
          showToast('Entry deleted.', 'info');
        }
      );
    });
  });
};
// Character counter
entryContent.addEventListener('input', () => {
  const len = entryContent.value.length;
  charCount.textContent = `${len} character${len !== 1 ? 's' : ''}`;
});

/**
 * Event Listener: Entry form submission.
 * After saving, AI analyzes mood → shows the mood popup.
 */
entryForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const title = entryTitle.value.trim();
  const content = entryContent.value.trim();

  if (!title || !content) {
    showToast('Please fill in both title and content.', 'error');
    return;
  }

  // Save entry (AI analysis happens inside addEntry)
  const newEntry = addEntry(title, content);

  // Reset form
  entryForm.reset();
  charCount.textContent = '0 characters';

  // Render updated entries
  renderEntries();

  // Fetch a new quote
  fetchQuote();

  // Show the AI mood popup
  showMoodPopup(newEntry.mood);

  showToast('Entry saved! AI analyzed your mood. ✨', 'success');
});

/**
 * showMoodPopup — Displays the mood analysis popup.
 * If mood is sad or stressed, also shows the user's "happy things".
 * Enhanced with "Make Your Day Better" section: activity cards,
 * breathing exercise, and motivational tips.
 *
 * @param {string} mood — The AI-detected mood
 */
const showMoodPopup = (mood) => {
  const config = MOOD_CONFIG[mood] || MOOD_CONFIG.neutral;

  // Set mood info in popup
  popupMoodEmoji.textContent = config.emoji;
  popupMoodName.textContent = config.label;
  popupMoodDetail.textContent = config.detail;

  // Show happy things ONLY if mood is sad or stressed
  if (mood === 'sad' || mood === 'stressed') {
    const user = getUser();
    const happyThings = user?.happyThings || [];

    if (happyThings.length > 0) {
      // Build the list of happy things
      popupHappyList.innerHTML = happyThings
        .map((thing) => `<li>✨ ${escapeHTML(thing)}</li>`)
        .join('');
      popupHappySection.style.display = 'block';
    } else {
      popupHappySection.style.display = 'none';
    }
  } else {
    popupHappySection.style.display = 'none';
  }

  // ============ MAKE YOUR DAY BETTER SECTION ============
  populateBetterSection(mood);

  // Show the popup
  moodPopupOverlay.classList.add('visible');
};

// =================== ACTIVITY SUGGESTIONS DATA ===================
const ACTIVITY_SUGGESTIONS = {
  happy: [
    { emoji: '🎉', name: 'Celebrate a small win' },
    { emoji: '📸', name: 'Capture this moment' },
    { emoji: '💌', name: 'Share joy with someone' },
    { emoji: '🎵', name: 'Play your feel-good song' },
  ],
  excited: [
    { emoji: '📝', name: 'Write down your goals' },
    { emoji: '🚀', name: 'Start a mini project' },
    { emoji: '🤝', name: 'Inspire a friend' },
    { emoji: '🌟', name: 'Try something new' },
  ],
  sad: [
    { emoji: '🫂', name: 'Call someone you trust' },
    { emoji: '🛁', name: 'Take a warm bath' },
    { emoji: '🎧', name: 'Listen to comforting music' },
    { emoji: '☕', name: 'Make a warm drink' },
  ],
  stressed: [
    { emoji: '🧘', name: 'Do a quick stretch' },
    { emoji: '🌳', name: 'Step outside briefly' },
    { emoji: '📋', name: 'Make a small to-do list' },
    { emoji: '🍵', name: 'Take a tea break' },
  ],
  neutral: [
    { emoji: '📖', name: 'Read something inspiring' },
    { emoji: '🎨', name: 'Doodle for 5 minutes' },
    { emoji: '🚶', name: 'Take a short walk' },
    { emoji: '🎧', name: 'Discover a new song' },
  ],
};

// Motivational tips per mood
const MOOD_TIPS = {
  happy: [
    'Happiness is contagious — spread it! Tell someone what made your day great today.',
    'Savour this feeling. Research shows that reflecting on positive moments makes them last longer.',
    'Your positivity is your superpower! Use this energy to tackle something you\'ve been putting off.',
  ],
  excited: [
    'Channel this energy! Excited minds are the most creative — write, draw, or plan something big.',
    'Momentum is everything. Use this feeling to set one new goal for the week.',
    'Excitement is the fuel of achievement. What\'s one step you can take right now toward your dream?',
  ],
  sad: [
    'It\'s okay to feel sad. Allow yourself to feel it — emotions are messengers, not enemies.',
    'Remember: Every storm runs out of rain. Better days are closer than you think. 🌈',
    'You\'re stronger than you realize. Even writing this entry shows courage and self-awareness.',
  ],
  stressed: [
    'You can\'t pour from an empty cup. Take care of yourself first — it\'s not selfish, it\'s necessary.',
    'Break it down. The big picture can overwhelm — focus on just the next small step.',
    'Stress is temporary. You\'ve survived every tough day so far. You\'ll get through this one too. 💪',
  ],
  neutral: [
    'Neutral days are the blank canvases of life — you get to decide what color to paint them.',
    'Sometimes peace is the greatest gift. Enjoy the calm and let your mind rest.',
    'A balanced day is a good day. Use this equilibrium to reflect on what matters most to you.',
  ],
};

/**
 * populateBetterSection — Fills the "Make Your Day Better" popup section
 * with the user's personalized happy things from the welcome form,
 * a mood tip, and initializes the breathing exercise.
 *
 * The activity cards are sourced from the user's own "happy things"
 * that they selected during personalization (stored in localStorage).
 */
const populateBetterSection = (mood) => {
  const tips = MOOD_TIPS[mood] || MOOD_TIPS.neutral;
  const user = getUser();
  const happyThings = user?.happyThings || [];

  // Subtitle text changes based on mood
  const subtitles = {
    happy: 'You\'re glowing! Here are YOUR happy things to keep the vibe going. 🌊',
    excited: 'Your energy is amazing! Here\'s what makes YOU happy. ⚡',
    sad: 'We\'re here for you. Try one of YOUR happy things right now. 💛',
    stressed: 'Take a breath. Here are things YOU said make you happy. 🍃',
    neutral: 'Here are YOUR happy things — maybe try one to brighten your day. ✨',
  };
  popupBetterSubtitle.textContent = subtitles[mood] || subtitles.neutral;

  // ---- Build activity cards from user's personalized happy things ----
  if (happyThings.length > 0) {
    popupActivityCards.innerHTML = happyThings
      .map((thing) => `
          <div class="activity-card">
            <span class="activity-emoji">✨</span>
            <span class="activity-name">${escapeHTML(thing)}</span>
          </div>
        `)
      .join('');
  } else {
    // Fallback: generic suggestions if user didn't pick any happy things
    const fallback = ACTIVITY_SUGGESTIONS[mood] || ACTIVITY_SUGGESTIONS.neutral;
    popupActivityCards.innerHTML = fallback
      .map(
        (act) => `
        <div class="activity-card">
          <span class="activity-emoji">${act.emoji}</span>
          <span class="activity-name">${act.name}</span>
        </div>
      `
      )
      .join('');
  }

  // Set random tip
  const randomTip = tips[Math.floor(Math.random() * tips.length)];
  popupTipText.textContent = randomTip;

  // Reset breathing exercise
  resetBreathingExercise();
};


// =================== BREATHING EXERCISE ===================
const resetBreathingExercise = () => {
  breathingCircle.classList.remove('inhale', 'exhale');
  breathingText.textContent = 'Start';
  breathingTimer.textContent = '';
};

const startBreathingExercise = () => {
  // Simple sequence of steps using setTimeout
  breathingText.textContent = 'Breathe In';
  breathingCircle.classList.add('inhale');
  
  setTimeout(() => {
    breathingText.textContent = 'Hold';
    
    setTimeout(() => {
      breathingText.textContent = 'Breathe Out';
      breathingCircle.classList.remove('inhale');
      breathingCircle.classList.add('exhale');
      
      setTimeout(() => {
        resetBreathingExercise();
        breathingText.textContent = 'Done ✓';
        breathingTimer.textContent = 'Great job! 🎉';
      }, 4000);
      
    }, 4000);
    
  }, 4000);
};

breathingCircle.addEventListener('click', startBreathingExercise);


/**
 * closeMoodPopup — Hides the mood popup and navigates to home.
 */
const closeMoodPopup = () => {
  moodPopupOverlay.classList.remove('visible');
  resetBreathingExercise();
  switchSection('home');
};

// Popup close events
popupClose.addEventListener('click', closeMoodPopup);
popupOkBtn.addEventListener('click', closeMoodPopup);

// Close popup if clicking outside the card
moodPopupOverlay.addEventListener('click', (e) => {
  if (e.target === moodPopupOverlay) closeMoodPopup();
});
/**
 * fetchQuote — Fetches a random quote from a free API.
 * Uses async/await with try/catch for error handling.
 */
const fetchQuote = async () => {
  try {
    quoteText.textContent = 'Loading...';
    quoteAuthor.textContent = '';

    const response = await fetch('https://dummyjson.com/quotes/random');
    const data = await response.json();

    quoteText.textContent = data.quote;
    quoteAuthor.textContent = `— ${data.author}`;
  } catch (error) {
    quoteText.textContent = 'The only way to do great work is to love what you do.';
    quoteAuthor.textContent = '— Steve Jobs';
  }
};

newQuoteBtn.addEventListener('click', fetchQuote);
let moodChart = null;

/**
 * initMoodChart — Creates the weekly mood chart.
 * This chart is populated AUTOMATICALLY from AI mood analysis.
 * Each journal entry adds a data point.
 *
 * X-axis: Entry labels (date or title)
 * Y-axis: Mood level (1=Sad, 2=Stressed, 2.5=Neutral, 3=Excited, 4=Happy)
 */
const initMoodChart = () => {
  const canvas = document.getElementById('mood-chart');
  const ctx = canvas.getContext('2d');

  if (moodChart) moodChart.destroy();

  const moods = getMoods();

  // Build chart data from mood log
  const labels = moods.map((m) => `${m.date}`);
  const dataPoints = moods.map((m) => m.value);

  // Color each point based on mood
  const pointColors = moods.map((m) => {
    const colors = {
      happy: '#10b981', excited: '#f59e0b',
      stressed: '#ef4444', sad: '#3b82f6', neutral: '#94a3b8',
    };
    return colors[m.mood] || '#94a3b8';
  });

  moodChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: labels.length > 0 ? labels : ['No data yet'],
      datasets: [{
        label: 'AI-Detected Mood',
        data: dataPoints.length > 0 ? dataPoints : [0],
        borderColor: '#4f46e5',
        backgroundColor: 'rgba(79, 70, 229, 0.1)',
        borderWidth: 3,
        pointBackgroundColor: pointColors.length > 0 ? pointColors : ['#94a3b8'],
        pointRadius: 7,
        pointHoverRadius: 10,
        fill: true,
        tension: 0.3,
        spanGaps: true,
      }],
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      scales: {
        y: {
          min: 0,
          max: 5,
          ticks: {
            stepSize: 1,
            callback: (value) => {
              const labels = {
                1: '😢 Sad', 2: '😰 Stressed',
                3: '🤩 Excited', 4: '😊 Happy',
              };
              return labels[value] || '';
            },
          },
          title: {
            display: true,
            text: 'Mood Level (AI-Detected)',
            font: { weight: 'bold' },
          },
        },
        x: {
          title: {
            display: true,
            text: 'Journal Entries',
            font: { weight: 'bold' },
          },
        },
      },
      plugins: {
        legend: { display: false },
        tooltip: {
          callbacks: {
            label: (context) => {
              const idx = context.dataIndex;
              const m = moods[idx];
              return m ? ` ${m.emoji} ${m.label} — "${m.title}"` : '';
            },
          },
        },
      },
    },
  });
};

/**
 * renderMoodHistory — Displays a log of all AI mood detections.
 */
const renderMoodHistory = () => {
  const moods = getMoods();

  if (moods.length === 0) {
    moodHistoryList.innerHTML = '<p class="mood-history-empty">No mood data yet. Write a journal entry and the AI will analyze your mood!</p>';
    return;
  }

  // Show most recent first
  const reversed = [...moods].reverse();

  moodHistoryList.innerHTML = reversed.map((m) => `
    <div class="mood-history-item">
      <span class="emoji">${m.emoji}</span>
      <div class="details">
        <strong>${m.label}</strong> — ${m.date}
        <br />Entry: "${escapeHTML(m.title)}"
      </div>
    </div>
  `).join('');
};

// Reset mood data for the current active account
resetMoodBtn.addEventListener('click', () => {
  showCustomConfirm(
    'Reset Mood Data',
    'Reset all mood history data? This cannot be undone.',
    '📊',
    () => {
      const email = getActiveEmail();
      if (email) {
        const accounts = getAccounts();
        const accIndex = accounts.findIndex((a) => a.email.toLowerCase() === email.toLowerCase());
        if (accIndex !== -1) {
          accounts[accIndex].moods = [];
          saveAccounts(accounts);
        }
      }
      initMoodChart();
      renderMoodHistory();
      showToast('Mood data reset.', 'info');
    }
  );
});
searchInput.addEventListener('input', () => {
  renderEntries(searchInput.value);
});

/**
 * showCustomConfirm — Opens the custom sandboxed-iframe safe confirmation modal.
 * @param {string} title — Header title
 * @param {string} message — Description prompt
 * @param {string} icon — Emoji header
 * @param {function} onConfirm — Callback on clicking 'Yes'
 */
const showCustomConfirm = (title, message, icon, onConfirm) => {
  const overlay = document.getElementById('custom-confirm-overlay');
  const titleEl = document.getElementById('custom-confirm-title');
  const msgEl = document.getElementById('custom-confirm-message');
  const iconEl = document.getElementById('custom-confirm-icon');
  const cancelBtn = document.getElementById('custom-confirm-cancel');
  const okBtn = document.getElementById('custom-confirm-ok');

  titleEl.textContent = title;
  msgEl.textContent = message;
  iconEl.textContent = icon;

  overlay.style.display = 'flex';

  const closeConfirm = () => {
    overlay.style.display = 'none';
    cancelBtn.removeEventListener('click', handleCancel);
    okBtn.removeEventListener('click', handleOk);
  };

  const handleCancel = () => {
    closeConfirm();
  };

  const handleOk = () => {
    closeConfirm();
    onConfirm();
  };

  cancelBtn.addEventListener('click', handleCancel);
  okBtn.addEventListener('click', handleOk);
};

/** 
  *showToast — Displays a temporary popup notification.
 */
const showToast = (message, type = 'success') => {
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.textContent = message;
  toastContainer.appendChild(toast);
  setTimeout(() => toast.remove(), 3000);
};

const handleLogout = () => {
  // Clear active session
  localStorage.removeItem('journexa_session_email');

  // Reset all DOM variables and UI states
  welcomeScreen.style.display = 'flex';
  appScreen.style.display = 'none';

  // Reset forms
  signinForm.reset();
  signupForm.reset();
  personalizeForm.reset();

  // Reset active navigation classes
  navLinks.forEach((l) => l.classList.remove('active'));
  const firstNavLink = document.querySelector('.nav-link[data-section="home"]');
  if (firstNavLink) firstNavLink.classList.add('active');

  // Reset active section classes
  sections.forEach((s) => s.classList.remove('active'));
  const homeSection = document.getElementById('home');
  if (homeSection) homeSection.classList.add('active');

  // Clear dashboard data fields to avoid flash of old data on next login
  if (displayName) displayName.textContent = 'Friend';
  
  showToast('Logged out successfully.', 'info');
};

// Reset all data for the current active account
resetAllBtn.addEventListener('click', () => {
  showCustomConfirm(
    'Reset & Start Over',
    'This will delete ALL your entries and mood history for this account. Continue?',
    '🗑️',
    () => {
      deleteCurrentAccountData();
      handleLogout();
    }
  );
});

// Log Out Event Listener using robust Event Delegation and client-side transitions
document.addEventListener('click', (e) => {
  const target = e.target.closest('#logout-nav-btn');
  if (target) {
    e.preventDefault();
    showCustomConfirm(
      'Log Out',
      'Are you sure you want to log out?',
      '👋',
      () => {
        handleLogout();
      }
    );
  }
});

/**
 * applyTheme — Sets the theme on <html> and updates the toggle button icon.
 * @param {string} theme — 'light' or 'dark'
 */
const applyTheme = (theme) => {
  document.documentElement.setAttribute('data-theme', theme);

  if (theme === 'dark') {
    themeIconSun.style.display = 'none';
    themeIconMoon.style.display = 'flex';
  } else {
    themeIconSun.style.display = 'flex';
    themeIconMoon.style.display = 'none';
  }
};
const toggleTheme = () => {
  const current = document.documentElement.getAttribute('data-theme') || 'light';
  const next = current === 'light' ? 'dark' : 'light';
  applyTheme(next);
  localStorage.setItem(KEYS.THEME, next); 
  showToast(`Switched to ${next} mode ${next === 'dark' ? '🌙' : '☀️'}`, 'info');
};
themeToggle.addEventListener('click', toggleTheme);
const init = () => {
  // Apply saved theme
  const savedTheme = localStorage.getItem(KEYS.THEME) || 'light';
  applyTheme(savedTheme);

  // Migrate old single-user legacy data if it exists
  migrateOldUser();

  const user = getUser();

  if (user) {
    showAppScreen();
  } else {
    welcomeScreen.style.display = 'flex';
    appScreen.style.display = 'none';
  }
};

init();

