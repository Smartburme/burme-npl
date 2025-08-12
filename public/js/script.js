document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const navItems = document.querySelectorAll('.nav-item');
    const connectBtn = document.querySelector('.connect-btn');
    const adminBtn = document.querySelector('.admin-btn');
    const circleLoader = document.querySelector('.circle-loader');
    const circleProgress = document.querySelector('.circle-progress');
    const appContent = document.querySelector('.app-content');
    
    // Current state
    let isConnected = false;
    let currentPage = 'home';
    let connectionInterval;
    let progress = 0;
    
    // Initialize pages
    initPages();
    loadPage(currentPage);
    
    // Navigation click handler
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            const page = this.getAttribute('data-page');
            if (page !== currentPage) {
                navItems.forEach(nav => nav.classList.remove('active'));
                this.classList.add('active');
                currentPage = page;
                loadPage(page);
            }
        });
    });
    
    // Connect button click handler
    connectBtn.addEventListener('click', function() {
        if (isConnected) {
            disconnectVPN();
        } else {
            connectVPN();
        }
    });
    
    // Admin button click handler
    adminBtn.addEventListener('click', function() {
        // Implement admin functionality
        alert('Admin panel will be implemented here');
    });
    
    // Initialize pages in content area
    function initPages() {
        const pages = ['home', 'location', 'about'];
        
        pages.forEach(page => {
            const pageDiv = document.createElement('div');
            pageDiv.className = `page ${page}`;
            pageDiv.id = `${page}-page`;
            appContent.appendChild(pageDiv);
        });
    }
    
    // Load page content
    function loadPage(page) {
        const pages = document.querySelectorAll('.page');
        pages.forEach(p => p.classList.remove('active'));
        
        const activePage = document.querySelector(`#${page}-page`);
        activePage.classList.add('active');
        
        switch(page) {
            case 'home':
                loadHomePage();
                break;
            case 'location':
                loadLocationPage();
                break;
            case 'about':
                loadAboutPage();
                break;
        }
    }
    
    // Load home page content
    function loadHomePage() {
        const homePage = document.querySelector('#home-page');
        homePage.innerHTML = `
            <h2>Game Server Dashboard</h2>
            <p>Welcome to Burme VPN Game Server system. Connect to the fastest servers for optimal gaming performance.</p>
            
            <div class="server-status-container">
                <h3>Current Server Status</h3>
                <div class="server-list">
                    <div class="server-card">
                        <h3>Local Server</h3>
                        <p><span class="server-status status-online"></span> Online</p>
                        <p>Ping: 12ms</p>
                    </div>
                    <div class="server-card">
                        <h3>Asia Server</h3>
                        <p><span class="server-status status-online"></span> Online</p>
                        <p>Ping: 45ms</p>
                    </div>
                    <div class="server-card">
                        <h3>Europe Server</h3>
                        <p><span class="server-status status-offline"></span> Maintenance</p>
                        <p>Ping: -</p>
                    </div>
                </div>
            </div>
        `;
    }
    
    // Load location page content
    function loadLocationPage() {
        const locationPage = document.querySelector('#location-page');
        locationPage.innerHTML = `
            <h2>Server Locations</h2>
            <p>Select your preferred game server location for optimal performance.</p>
            
            <div class="location-map">
                <div class="server-location" data-location="local">
                    <h3>Local Server</h3>
                    <p>Best for players in your region</p>
                    <button class="select-location">Select</button>
                </div>
                
                <div class="server-location" data-location="asia">
                    <h3>Asia Server</h3>
                    <p>Recommended for Asian players</p>
                    <button class="select-location">Select</button>
                </div>
                
                <div class="server-location" data-location="europe">
                    <h3>Europe Server</h3>
                    <p>Recommended for European players</p>
                    <button class="select-location">Select</button>
                </div>
            </div>
        `;
        
        // Add event listeners to location buttons
        document.querySelectorAll('.select-location').forEach(btn => {
            btn.addEventListener('click', function() {
                const location = this.parentElement.getAttribute('data-location');
                selectServerLocation(location);
            });
        });
    }
    
    // Load about page content
    function loadAboutPage() {
        const aboutPage = document.querySelector('#about-page');
        aboutPage.innerHTML = `
            <h2>About Burme VPN Game Server</h2>
            <p>Burme VPN Game Server provides high-performance, low-latency connections for gamers worldwide.</p>
            
            <div class="features">
                <h3>Features:</h3>
                <ul>
                    <li>Ultra-low ping connections</li>
                    <li>Multiple server locations</li>
                    <li>Secure VPN tunneling</li>
                    <li>24/7 server monitoring</li>
                    <li>DDoS protection</li>
                </ul>
            </div>
            
            <div class="contact-info">
                <h3>Contact Us</h3>
                <p>Email: support@burmevpn.com</p>
                <p>Phone: +95 123 456 789</p>
            </div>
        `;
    }
    
    // Connect to VPN
    function connectVPN() {
        isConnected = true;
        connectBtn.textContent = 'Disconnect';
        circleLoader.style.display = 'block';
        progress = 0;
        
        // Simulate connection progress
        connectionInterval = setInterval(() => {
            progress += 1;
            circleProgress.textContent = `${progress}%`;
            
            if (progress >= 100) {
                clearInterval(connectionInterval);
                simulateGmailConnection();
            }
        }, 50);
    }
    
    // Disconnect from VPN
    function disconnectVPN() {
        isConnected = false;
        connectBtn.textContent = 'Connect';
        clearInterval(connectionInterval);
        circleLoader.style.display = 'none';
        
        // Simulate disconnection
        alert('Successfully disconnected from Burme VPN');
    }
    
    // Simulate Gmail server connection
    function simulateGmailConnection() {
        // This would be replaced with actual Gmail API connection in a real implementation
        console.log('Connecting to Gmail servers...');
        
        // Simulate checking Gmail connectivity
        setTimeout(() => {
            const isGmailConnected = Math.random() > 0.2; // 80% success rate for demo
            
            if (isGmailConnected) {
                alert('Successfully connected to Burme VPN!\nGmail services are accessible.');
            } else {
                alert('Connected to Burme VPN but Gmail services are temporarily unavailable.');
            }
        }, 1500);
    }
    
    // Select server location
    function selectServerLocation(location) {
        alert(`Selected ${location} server. This will be your default game server.`);
        // In a real implementation, this would save the preference and connect to the selected server
    }
    
    // Mobile navigation toggle
    const navToggle = document.querySelector('.nav-toggle');
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            document.querySelector('.nav-menu').classList.toggle('active');
        });
    }
});
