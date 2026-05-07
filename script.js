// --- PERSONALIZATION SETTINGS ---
const HANDBOOK_TITLE = "Corporate Law Handbook";
const WELCOME_MESSAGE = `A revision guide, custom built just for you ✨<br><br><span style="font-style: italic; opacity: 0.8; font-weight: 500;">— Crafted by Nikhil</span>`;

// Theme initialization
const initTheme = () => {
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        document.documentElement.setAttribute('data-theme', 'dark');
    }
};
initTheme(); // Run immediately to prevent flashing on load

document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const sidebar = document.getElementById('sidebar');
    const moduleList = document.getElementById('moduleList');
    const contentContainer = document.getElementById('contentContainer');
    const searchInput = document.getElementById('searchInput');
    const menuToggle = document.getElementById('menuToggle');
    const sidebarOverlay = document.getElementById('sidebarOverlay');
    const themeToggleBtn = document.getElementById('themeToggle');

    // Theme Toggle Logic
    const updateThemeIcon = () => {
        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        themeToggleBtn.textContent = isDark ? '☀️' : '🌙';
    };
    updateThemeIcon();

    themeToggleBtn.addEventListener('click', () => {
        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        if (isDark) {
            document.documentElement.removeAttribute('data-theme');
            localStorage.setItem('theme', 'light');
        } else {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
        }
        updateThemeIcon();
    });

    // Global Data State
    let contentData = null;

    // Gift Opening Logic
    const giftOverlay = document.getElementById('giftOverlay');
    const giftBox = document.getElementById('giftBox');

    // Check if gift was already opened in this session
    if (!sessionStorage.getItem('giftOpened') && giftOverlay) {
        document.body.style.overflow = 'hidden'; // Lock scroll

        window.openGift = function () {
            if (giftBox.classList.contains('opening')) return;

            giftBox.classList.add('opening');
            document.getElementById('giftText').style.opacity = '0';

            // Big Confetti Explosion
            createConfetti();
            setTimeout(createConfetti, 200);
            setTimeout(createConfetti, 400);

            setTimeout(() => {
                giftOverlay.classList.add('hidden');
                document.body.style.overflow = ''; // Unlock scroll
                sessionStorage.setItem('giftOpened', 'true');
            }, 700);
        };
    } else if (giftOverlay) {
        giftOverlay.style.display = 'none';
    }

    window.playHomeGiftAnimation = function (el) {
        if (el.dataset.animating) return;
        el.dataset.animating = 'true';
        el.style.animation = 'bounceShake 0.6s cubic-bezier(.36,.07,.19,.97)';
        createConfetti();

        setTimeout(() => {
            el.style.animation = 'float 4s ease-in-out infinite';
            delete el.dataset.animating;
        }, 600);
    };

    window.loadHome = function (pushHistory = true) {
        if (pushHistory) history.pushState({ view: 'home' }, '', window.location.pathname);
        document.querySelectorAll('.topic-link').forEach(btn => btn.classList.remove('active'));

        contentContainer.innerHTML = `
            <div class="welcome-screen fade-in" style="display: flex; flex-direction: column; align-items: center; justify-content: flex-start; padding-top: 2rem; height: auto;">
                <div class="gift-icon" onclick="playHomeGiftAnimation(this)" style="cursor: pointer; margin-bottom: 1.5rem; animation: float 4s ease-in-out infinite; transition: transform 0.2s;">
                    <img src="https://cdn.jsdelivr.net/gh/microsoft/fluentui-emoji@main/assets/Wrapped%20gift/3D/wrapped_gift_3d.png" alt="Gift Box" style="width: 120px; height: 120px; pointer-events: none; filter: drop-shadow(0 15px 25px rgba(0,0,0,0.1));">
                </div>
                <h2 style="font-size: 2.8rem; background: linear-gradient(to right, var(--accent-blue), var(--accent-purple)); -webkit-background-clip: text; -webkit-text-fill-color: transparent; margin-bottom: 0.75rem; text-align: center; line-height: 1.2;">
                    ${HANDBOOK_TITLE}
                </h2>
                <p style="font-size: 1.15rem; color: var(--text-muted); max-width: 550px; margin: 0 auto; line-height: 1.6; text-align: center;">
                    ${WELCOME_MESSAGE}
                </p>

                <!-- Smart Tools Section -->
                <div style="width: 100%; max-width: 850px; margin-top: 4rem; text-align: left;">
                    <h3 style="font-size: 1.25rem; color: var(--text-main); margin-bottom: 1.5rem; display: flex; align-items: center; gap: 0.5rem;">
                        <span style="font-size: 1.5rem;">🛠️</span> Study Tools
                    </h3>
                    <div class="tools-grid">
                        <!-- Pomodoro -->
                        <div class="card tool-card fade-in" style="animation-delay: 0.2s; border-radius: 1.5rem;" onclick="openPomodoro()">
                            <div class="tool-icon">⏱️</div>
                            <h4>Focus Timer</h4>
                            <p>Beautiful custom timers to maximize your study sessions.</p>
                        </div>
                        <!-- Modules -->
                        <div class="card tool-card fade-in" style="animation-delay: 0.3s; border-radius: 1.5rem;" onclick="openSidebarMenu()">
                            <div class="tool-icon">📚</div>
                            <h4>Browse Modules</h4>
                            <p>Explore the complete collection of topics and notes.</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
    };
    let allTopics = [];

    // Load Content Data from global variable (data.js)
    if (typeof siteData !== 'undefined') {
        contentData = siteData;
        processAllTopics(siteData);
        renderSidebar(siteData);
        loadHome();
    } else {
        contentContainer.innerHTML = `
            <div class="welcome-screen">
                <h3 style="color: var(--accent-red);">Error Loading Content</h3>
                <p>Could not load data. Ensure data.js is correctly linked in index.html.</p>
            </div>
        `;
    }

    // Helper: Flatten all topics to enable easy searching
    function processAllTopics(data) {
        data.modules.forEach(mod => {
            if (mod.topics) {
                mod.topics.forEach(topic => {
                    allTopics.push({
                        ...topic,
                        moduleName: mod.name,
                        moduleId: mod.id
                    });
                });
            }
        });
    }

    // Render the Sidebar Navigation recursively
    function renderSidebar(data) {
        moduleList.innerHTML = ''; // Clear default
        data.modules.forEach(mod => {
            const li = document.createElement('li');
            li.className = 'module-item';

            const btn = document.createElement('button');
            btn.className = 'module-title';
            btn.textContent = mod.name;
            btn.onclick = () => {
                // Toggle the open class to collapse/expand topic list
                li.classList.toggle('open');
            };

            li.appendChild(btn);

            if (mod.topics && mod.topics.length > 0) {
                const ul = document.createElement('ul');
                ul.className = 'topic-list';

                mod.topics.forEach(topic => {
                    const topicLi = document.createElement('li');
                    topicLi.className = 'topic-item';

                    const topicBtn = document.createElement('button');
                    topicBtn.className = 'topic-link';
                    topicBtn.textContent = topic.title;
                    topicBtn.setAttribute('data-id', topic.id);
                    // Open the topic on click
                    topicBtn.onclick = () => loadTopic(topic, topicBtn);

                    topicLi.appendChild(topicBtn);
                    ul.appendChild(topicLi);
                });

                li.appendChild(ul);
            }

            moduleList.appendChild(li);
        });
    }

    // Generate and inject content for a selected topic
    function loadTopic(topic, activeButton, pushHistory = true) {
        if (pushHistory) history.pushState({ view: 'topic', topicId: topic.id }, '', '?topic=' + encodeURIComponent(topic.id));
        // 1. Highlight selected topic in sidebar
        document.querySelectorAll('.topic-link').forEach(btn => btn.classList.remove('active'));
        if (activeButton) {
            activeButton.classList.add('active');
            // Ensure the parent module is expanded
            const parentModule = activeButton.closest('.module-item');
            if (parentModule) parentModule.classList.add('open');
        }

        // 2. Hide sidebar on mobile after clicking
        closeSidebar();

        // 3. Clear search bar if coming from search
        searchInput.value = '';

        // 4. Construct Content HTML based on STRICT TEMPLATE
        let html = `
            <div class="topic-header fade-in" style="animation-delay: 0.1s">
                <div style="color: var(--accent-blue); font-weight: 600; margin-bottom: 0.5rem; text-transform: uppercase; font-size: 0.85rem; letter-spacing: 0.05em;">Module: ${topic.moduleName}</div>
                <h1 style="margin-bottom:0;">${topic.title}</h1>
            </div>
        `;

        let delay = 0.2;

        // 1-Minute Revision
        if (topic.oneMinuteRevision && topic.oneMinuteRevision.length > 0) {
            html += `
                <div class="card general fade-in" style="animation-delay: ${delay}s">
                    <h3>⚡ 1-Minute Revision</h3>
                    <ul>
                        ${topic.oneMinuteRevision.map(item => `<li>${item}</li>`).join('')}
                    </ul>
                </div>
            `;
            delay += 0.1;
        }

        // Key Sections (Blue)
        if (topic.keySections && topic.keySections.length > 0) {
            html += `
                <div class="card sections fade-in" style="animation-delay: ${delay}s">
                    <h3>📌 Key Sections</h3>
                    <div>
                        ${topic.keySections.map(sec => `<button class="tag-section" onclick="openWebview('${sec}', 'section')" title="View details for ${sec}">${sec}</button>`).join('')}
                    </div>
                </div>
            `;
            delay += 0.1;
        }

        // Core Concepts
        if (topic.coreConcepts && topic.coreConcepts.length > 0) {
            html += `
                <div class="card general fade-in" style="animation-delay: ${delay}s">
                    <h3>🧠 Core Concepts</h3>
                    <ul>
                        ${topic.coreConcepts.map(item => `<li>${item}</li>`).join('')}
                    </ul>
                </div>
            `;
            delay += 0.1;
        }

        // Common Exam Traps (Red)
        if (topic.commonExamTraps && topic.commonExamTraps.length > 0) {
            html += `
                <div class="card traps fade-in" style="animation-delay: ${delay}s">
                    <h3>❗ Common Exam Traps</h3>
                    <ul>
                        ${topic.commonExamTraps.map(item => `<li>${item}</li>`).join('')}
                    </ul>
                </div>
            `;
            delay += 0.1;
        }

        // Important Case (Purple)
        if (topic.importantCase) {
            // Escape single quotes to prevent breaking the onclick attribute
            const safeCaseName = topic.importantCase.name.replace(/'/g, "\\'");
            html += `
                <div class="card cases fade-in" style="animation-delay: ${delay}s">
                    <h3>⚖️ Important Case</h3>
                    <button class="case-name" onclick="openWebview('${safeCaseName}', 'case')" title="Search details for this case">🔍 ${topic.importantCase.name}</button>
                    <div class="case-summary">${topic.importantCase.summary}</div>
                </div>
            `;
        }

        // Inject and scroll top
        contentContainer.innerHTML = html;
        contentContainer.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // Instant Search functionality
    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase().trim();

        // Clear active highlights in sidebar
        document.querySelectorAll('.topic-link').forEach(btn => btn.classList.remove('active'));

        if (!query) {
            // Restore default welcome view if query is empty
            loadHome();
            return;
        }

        // Real-time filter mechanism across multiple fields
        const results = allTopics.filter(topic => {
            const inTitle = topic.title.toLowerCase().includes(query);
            const inConcepts = topic.coreConcepts?.some(c => c.toLowerCase().includes(query));
            const inSections = topic.keySections?.some(s => s.toLowerCase().includes(query));
            return inTitle || inConcepts || inSections;
        });

        renderSearchResults(results, query);
    });

    // Render Search Results List
    function renderSearchResults(results, query) {
        const safeQuery = query.replace(/'/g, "\\'");

        if (results.length === 0) {
            contentContainer.innerHTML = `
                <div class="welcome-screen fade-in" style="animation-delay: 0.1s;">
                    <div style="font-size: 4rem; margin-bottom: 1rem; animation: float 4s ease-in-out infinite;">🔍</div>
                    <h3 style="font-size: 2rem; color: var(--text-main); margin-bottom: 0.5rem;">No local results found</h3>
                    <p style="margin-bottom: 2rem; font-size: 1.1rem;">We couldn't find exactly what you were looking for in the handbook.</p>
                    <button class="tag-section" style="font-size: 1.05rem; padding: 1rem 2rem; border-radius: 9999px;" onclick="openWebview('${safeQuery}', 'web')">
                        🌐 Search the Web for "${query}"
                    </button>
                </div>
            `;
            return;
        }

        let html = `
            <div class="topic-header fade-in" style="animation-delay: 0.1s">
                <h2>Search Results</h2>
            </div>
            <ul class="search-results-list">
        `;

        let delay = 0.2;
        // Create clickable result cards
        results.forEach(topic => {
            html += `
                <li class="search-result-item fade-in" style="animation-delay: ${delay}s" onclick="document.dispatchEvent(new CustomEvent('openTopic', {detail: '${topic.id}'}))">
                    <div class="search-result-title">${topic.title}</div>
                    <div class="search-result-module">Module: ${topic.moduleName}</div>
                </li>
            `;
            delay += 0.05;
        });

        // Always add a Web Search fallback option at the bottom
        html += `
                <li class="search-result-item web-search-item fade-in" style="animation-delay: ${delay}s" onclick="openWebview('${safeQuery}', 'web')">
                    <div class="search-result-title" style="color: var(--accent-blue);">🌐 Search the Web for "${query}"</div>
                    <div class="search-result-module">Can't find exactly what you need? Open web results.</div>
                </li>
        `;

        html += `</ul>`;
        contentContainer.innerHTML = html;
    }

    // Listen for custom event triggered from search results
    document.addEventListener('openTopic', (e) => {
        const topicId = e.detail;
        const topic = allTopics.find(t => t.id === topicId);
        if (topic) {
            // Find sidebar button to apply active state and load view
            const btn = document.querySelector(`.topic-link[data-id="${topicId}"]`);
            loadTopic(topic, btn);
        }
    });

    // Mobile Hamburger Menu Handlers
    menuToggle.addEventListener('click', () => {
        sidebar.classList.add('open');
        sidebarOverlay.classList.add('show');
    });

    sidebarOverlay.addEventListener('click', closeSidebar);

    function closeSidebar() {
        sidebar.classList.remove('open');
        sidebarOverlay.classList.remove('show');
    }

    window.openSidebarMenu = function () {
        if (window.innerWidth <= 768) {
            sidebar.classList.add('open');
            sidebarOverlay.classList.add('show');
        } else {
            // Draw attention to sidebar on desktop
            sidebar.animate([
                { transform: 'scale(1)', boxShadow: 'none' },
                { transform: 'scale(1.02)', boxShadow: '0 0 15px rgba(138, 168, 255, 0.5)' },
                { transform: 'scale(1)', boxShadow: 'none' }
            ], { duration: 400, easing: 'ease-in-out' });
        }
    };

    // Webview Modal Handlers
    const webviewModal = document.getElementById('webviewModal');
    const closeModalBtn = document.getElementById('closeModal');
    const webviewFrame = document.getElementById('webviewFrame');
    const modalTitle = document.getElementById('modalTitle');

    window.openWebview = function (query, type = 'section') {
        if (type === 'case') {
            modalTitle.textContent = `Landmark Case: ${query}`;
            webviewFrame.src = `https://www.bing.com/search?q=${encodeURIComponent(query + ' corporate law case summary')}`;
        } else if (type === 'web') {
            modalTitle.textContent = `Web Search: ${query}`;
            webviewFrame.src = `https://www.bing.com/search?q=${encodeURIComponent(query + ' corporate law')}`;
        } else {
            modalTitle.textContent = `Companies Act 2013 - ${query}`;
            // Using Bing because Google explicitly blocks iframing (X-Frame-Options: SAMEORIGIN)
            webviewFrame.src = `https://www.bing.com/search?q=Companies+Act+2013+${encodeURIComponent(query)}`;
        }
        webviewModal.classList.add('show');
    };

    window.openWebviewDirect = function (url, title) {
        modalTitle.textContent = title;
        webviewFrame.src = url;
        webviewModal.classList.add('show');
    };

    closeModalBtn.addEventListener('click', closeWebview);
    webviewModal.addEventListener('click', (e) => {
        // Close modal if clicked outside the content area
        if (e.target === webviewModal) closeWebview();
    });

    function closeWebview() {
        webviewModal.classList.remove('show');
        // Clear iframe src after transition to stop audio/video and reset state
        setTimeout(() => { webviewFrame.src = ''; }, 300);
    }

    // ----------------------------------------------------------------
    // POMODORO FOCUS TIMER SYSTEM (Distraction Free Page)
    // ----------------------------------------------------------------
    let pomodoroInterval;
    let timeLeft = 25 * 60; // Default 25 mins
    let totalTimeSeconds = 25 * 60;
    let isRunning = false;

    function updatePomodoroUI() {
        const timeDisplay = document.getElementById('pomodoroTimeLarge');
        const startBtn = document.getElementById('pomodoroStartBtn');
        const statusDisplay = document.getElementById('pomodoroStatus');
        const ring = document.getElementById('pomodoroRing');

        if (timeDisplay) {
            const minutes = Math.floor(timeLeft / 60);
            const seconds = timeLeft % 60;
            timeDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        }

        if (ring) {
            // Calculate percentage
            // circumference is ~816
            const percent = timeLeft / totalTimeSeconds;
            const offset = 816 - (percent * 816);
            ring.style.strokeDashoffset = offset;

            // Adjust ring color based on state
            if (!isRunning && timeLeft < totalTimeSeconds && timeLeft > 0) {
                ring.style.stroke = 'var(--accent-gold)';
            } else if (timeLeft === 0) {
                ring.style.stroke = 'var(--accent-red)';
            } else {
                ring.style.stroke = 'var(--accent-blue)';
            }
        }

        if (startBtn && statusDisplay) {
            if (isRunning) {
                startBtn.innerHTML = '<span class="icon">⏸</span>';
                startBtn.classList.add('paused');
                statusDisplay.textContent = 'Focusing...';
            } else {
                startBtn.innerHTML = '<span class="icon">▶</span>';
                startBtn.classList.remove('paused');
                statusDisplay.textContent = timeLeft < totalTimeSeconds ? 'Paused' : 'Ready to focus';
            }
        }
    }

    window.openPomodoro = function (pushHistory = true) {
        if (pushHistory) history.pushState({ view: 'pomodoro' }, '', '?view=pomodoro');
        // Clear active highlights in sidebar
        document.querySelectorAll('.topic-link').forEach(btn => btn.classList.remove('active'));
        if (window.innerWidth <= 768) closeSidebar();
        searchInput.value = '';

        contentContainer.innerHTML = `
            <div class="pomodoro-container fade-in">
                <div class="pomodoro-header">
                    <h1>Focus Session</h1>
                    <p>Deep work is your superpower.</p>
                </div>

                <div class="pomodoro-timer-wrapper">
                    <svg class="pomodoro-ring" viewBox="0 0 300 300">
                        <circle class="pomodoro-ring-bg" cx="150" cy="150" r="130"></circle>
                        <circle class="pomodoro-ring-progress" id="pomodoroRing" cx="150" cy="150" r="130"></circle>
                    </svg>
                    <div class="pomodoro-time-display">
                        <div id="pomodoroTimeLarge">25:00</div>
                        <div class="pomodoro-status" id="pomodoroStatus">Ready to focus</div>
                    </div>
                </div>

                <div class="pomodoro-controls-main">
                    <button id="pomodoroStartBtn" class="pomodoro-btn play-btn" onclick="togglePomodoro()" title="Start / Pause">
                        <span class="icon">▶</span>
                    </button>
                    <button class="pomodoro-btn reset-btn" onclick="resetPomodoro()" title="Reset Timer">
                        <span class="icon">↺</span>
                    </button>
                </div>

                <div class="pomodoro-presets">
                    <h4 style="margin-bottom: 1rem; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.05em; font-size: 0.85rem;">Select Duration</h4>
                    <div class="preset-group" id="presetGroup">
                        <button onclick="setPomodoroTime(15, this)">15m</button>
                        <button onclick="setPomodoroTime(25, this)" class="active">25m</button>
                        <button onclick="setPomodoroTime(50, this)">50m</button>
                        <button onclick="setPomodoroTime(90, this)">90m</button>
                    </div>
                    <div class="custom-time-input">
                        <input type="number" id="customTimeInput" placeholder="Custom (min)" min="1" max="240">
                        <button onclick="applyCustomTime()">Set</button>
                    </div>
                </div>
            </div>
        `;
        // Sync UI with current state
        updatePomodoroUI();

        // Update active preset button based on totalTimeSeconds
        updateActivePresetBtn(totalTimeSeconds / 60);
    };

    function updateActivePresetBtn(minutes) {
        const btns = document.querySelectorAll('#presetGroup button');
        if (!btns.length) return;
        btns.forEach(b => b.classList.remove('active'));
        const target = Array.from(btns).find(b => parseInt(b.textContent) === minutes);
        if (target) target.classList.add('active');
    }

    window.togglePomodoro = function () {
        if (isRunning) {
            clearInterval(pomodoroInterval);
        } else {
            if (timeLeft === 0) resetPomodoro(); // Auto-reset if starting from 0
            pomodoroInterval = setInterval(updateTimer, 1000);
        }
        isRunning = !isRunning;
        updatePomodoroUI();
    };

    window.resetPomodoro = function () {
        clearInterval(pomodoroInterval);
        isRunning = false;
        timeLeft = totalTimeSeconds;
        updatePomodoroUI();
    };

    window.setPomodoroTime = function (minutes, btnElement) {
        clearInterval(pomodoroInterval);
        isRunning = false;
        totalTimeSeconds = minutes * 60;
        timeLeft = totalTimeSeconds;
        updatePomodoroUI();
        if (btnElement) {
            updateActivePresetBtn(minutes);
        } else {
            // Unset all if custom time
            document.querySelectorAll('#presetGroup button').forEach(b => b.classList.remove('active'));
        }
    };

    window.applyCustomTime = function () {
        const input = document.getElementById('customTimeInput');
        if (input && input.value && input.value > 0) {
            setPomodoroTime(parseInt(input.value), null);
            input.value = '';
        }
    };

    function updateTimer() {
        if (timeLeft > 0) {
            timeLeft--;
            updatePomodoroUI();
        } else {
            clearInterval(pomodoroInterval);
            isRunning = false;
            alert("✨ Focus session complete! Time for a break.");
            createConfetti();
            totalTimeSeconds = 5 * 60; // Auto switch to 5 min break
            timeLeft = totalTimeSeconds;
            updatePomodoroUI();
        }
    }

    function createConfetti() {
        const colors = ['#ff9a9e', '#c4a1ff', '#8fa8ff', '#f6d365', '#fc8181'];
        for (let i = 0; i < 60; i++) {
            const confetti = document.createElement('div');
            confetti.style.position = 'fixed';
            confetti.style.width = Math.random() * 10 + 5 + 'px';
            confetti.style.height = Math.random() * 10 + 5 + 'px';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.top = '-20px';
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.opacity = Math.random() + 0.5;
            confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
            confetti.style.pointerEvents = 'none';
            confetti.style.zIndex = '9999';
            confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
            document.body.appendChild(confetti);

            const animation = confetti.animate([
                { transform: `translate3d(0, 0, 0) rotate(0deg)`, opacity: 1 },
                { transform: `translate3d(${Math.random() * 100 - 50}px, 100vh, 0) rotate(${Math.random() * 720}deg)`, opacity: 0 }
            ], {
                duration: Math.random() * 2000 + 3000,
                easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
            });

            animation.onfinish = () => confetti.remove();
        }
    }

    // Handle Browser Back Button correctly
    window.addEventListener('popstate', (e) => {
        if (!e.state || e.state.view === 'home') {
            loadHome(false);
        } else if (e.state.view === 'pomodoro') {
            openPomodoro(false);
        } else if (e.state.view === 'topic') {
            const topic = allTopics.find(t => t.id === e.state.topicId);
            if (topic) {
                const btn = Array.from(document.querySelectorAll('.topic-link')).find(b => b.getAttribute('data-id') === topic.id);
                loadTopic(topic, btn, false);
            } else {
                loadHome(false);
            }
        }
    });

    // Set initial state for home
    history.replaceState({ view: 'home' }, '', window.location.pathname);
});
