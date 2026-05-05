document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const sidebar = document.getElementById('sidebar');
    const moduleList = document.getElementById('moduleList');
    const contentContainer = document.getElementById('contentContainer');
    const searchInput = document.getElementById('searchInput');
    const menuToggle = document.getElementById('menuToggle');
    const sidebarOverlay = document.getElementById('sidebarOverlay');

    // Global Data State
    let contentData = null;
    let allTopics = [];

    // Load Content Data from global variable (data.js)
    if (typeof siteData !== 'undefined') {
        contentData = siteData;
        processAllTopics(siteData);
        renderSidebar(siteData);
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
            if(mod.topics) {
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
    function loadTopic(topic, activeButton) {
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
            <div class="topic-header">
                <h1>${topic.title}</h1>
            </div>
        `;

        // 1-Minute Revision
        if (topic.oneMinuteRevision && topic.oneMinuteRevision.length > 0) {
            html += `
                <div class="card">
                    <h3>⚡ 1-Minute Revision</h3>
                    <ul>
                        ${topic.oneMinuteRevision.map(item => `<li>${item}</li>`).join('')}
                    </ul>
                </div>
            `;
        }

        // Key Sections (Blue)
        if (topic.keySections && topic.keySections.length > 0) {
            html += `
                <div class="card sections">
                    <h3>📌 Key Sections</h3>
                    <div>
                        ${topic.keySections.map(sec => `<button class="tag-section" onclick="openWebview('${sec}', 'section')" title="View details for ${sec}">${sec}</button>`).join('')}
                    </div>
                </div>
            `;
        }

        // Core Concepts
        if (topic.coreConcepts && topic.coreConcepts.length > 0) {
            html += `
                <div class="card">
                    <h3>🧠 Core Concepts</h3>
                    <ul>
                        ${topic.coreConcepts.map(item => `<li>${item}</li>`).join('')}
                    </ul>
                </div>
            `;
        }

        // Common Exam Traps (Red)
        if (topic.commonExamTraps && topic.commonExamTraps.length > 0) {
            html += `
                <div class="card traps">
                    <h3>❗ Common Exam Traps</h3>
                    <ul>
                        ${topic.commonExamTraps.map(item => `<li>${item}</li>`).join('')}
                    </ul>
                </div>
            `;
        }

        // Important Case (Purple)
        if (topic.importantCase) {
            // Escape single quotes to prevent breaking the onclick attribute
            const safeCaseName = topic.importantCase.name.replace(/'/g, "\\'");
            html += `
                <div class="card cases">
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
            contentContainer.innerHTML = `
                <div class="welcome-screen">
                    <h3>Welcome to your Revision Guide</h3>
                    <p>Select a module from the sidebar or search for a topic to begin.</p>
                </div>
            `;
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
                <div class="welcome-screen" style="margin-top: 3rem;">
                    <div style="font-size: 3rem; margin-bottom: 1rem;">🔍</div>
                    <h3>No local results found for "${query}"</h3>
                    <p style="margin-bottom: 2rem;">We couldn't find this exact topic in the handbook.</p>
                    <button class="tag-section" style="font-size: 1rem; padding: 0.75rem 1.5rem;" onclick="openWebview('${safeQuery}', 'web')">
                        🌐 Search the Web for "${query}"
                    </button>
                </div>
            `;
            return;
        }

        let html = `
            <div class="topic-header">
                <h2>Search Results</h2>
            </div>
            <ul class="search-results-list">
        `;

        // Create clickable result cards
        results.forEach(topic => {
            html += `
                <li class="search-result-item" onclick="document.dispatchEvent(new CustomEvent('openTopic', {detail: '${topic.id}'}))">
                    <div class="search-result-title">${topic.title}</div>
                    <div class="search-result-module">Module: ${topic.moduleName}</div>
                </li>
            `;
        });

        // Always add a Web Search fallback option at the bottom
        html += `
                <li class="search-result-item web-search-item" onclick="openWebview('${safeQuery}', 'web')">
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

    // Webview Modal Handlers
    const webviewModal = document.getElementById('webviewModal');
    const closeModalBtn = document.getElementById('closeModal');
    const webviewFrame = document.getElementById('webviewFrame');
    const modalTitle = document.getElementById('modalTitle');

    window.openWebview = function(query, type = 'section') {
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

    window.openWebviewDirect = function(url, title) {
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
});
