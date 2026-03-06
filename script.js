/* ============================================
   Bucket Management System Dashboard
   JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functions
    initSidebar();
    initMobileMenu();
    initDropdowns();
    initAnimations();
    initLogin();
    initLogout();
    initCharts();
    initDataTables();
});

/* ============================================
   SIDEBAR FUNCTIONALITY
   ============================================ */

function initSidebar() {
    const sidebarLinks = document.querySelectorAll('.sidebar-menu a');
    const currentPage = window.location.pathname.split('/').pop() || 'dashboard.html';
    
    sidebarLinks.forEach(link => {
        const href = link.getAttribute('href');
        
        // Check if this link matches current page
        if (href === currentPage || (currentPage === '' && href === 'dashboard.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
        
        // Add click event for smooth transition
        link.addEventListener('click', function(e) {
            if (!this.classList.contains('logout-btn')) {
                // Small delay for visual feedback
                e.preventDefault();
                const href = this.getAttribute('href');
                
                // Add fade effect
                document.body.style.opacity = '0.7';
                document.body.style.transition = 'opacity 0.2s ease';
                
                setTimeout(() => {
                    window.location.href = href;
                }, 200);
            }
        });
    });
}

/* ============================================
   MOBILE MENU TOGGLE
   ============================================ */

function initMobileMenu() {
    const toggleBtn = document.querySelector('.toggle-sidebar');
    const sidebar = document.querySelector('.sidebar');
    
    if (toggleBtn && sidebar) {
        toggleBtn.addEventListener('click', function() {
            sidebar.classList.toggle('active');
            
            // Create or toggle overlay
            let overlay = document.querySelector('.sidebar-overlay');
            if (!overlay) {
                overlay = document.createElement('div');
                overlay.className = 'sidebar-overlay';
                document.body.appendChild(overlay);
                
                overlay.addEventListener('click', function() {
                    sidebar.classList.remove('active');
                    overlay.classList.remove('active');
                });
            }
            overlay.classList.toggle('active');
        });
    }
    
    // Close sidebar on window resize if desktop
    window.addEventListener('resize', function() {
        if (window.innerWidth > 992) {
            const sidebar = document.querySelector('.sidebar');
            const overlay = document.querySelector('.sidebar-overlay');
            if (sidebar) sidebar.classList.remove('active');
            if (overlay) overlay.classList.remove('active');
        }
    });
    
    // Close sidebar when clicking on a link (mobile)
    const sidebarLinks = document.querySelectorAll('.sidebar-menu a');
    sidebarLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 992) {
                const sidebar = document.querySelector('.sidebar');
                const overlay = document.querySelector('.sidebar-overlay');
                if (sidebar) sidebar.classList.remove('active');
                if (overlay) overlay.classList.remove('active');
            }
        });
    });
}

/* ============================================
   DROPDOWN MENUS
   ============================================ */

function initDropdowns() {
    // Profile dropdown - using Bootstrap dropdown
    const profileDropdown = document.querySelector('.user-profile');
    
    if (profileDropdown) {
        // Bootstrap handles this via data-bs-toggle
    }
    
    // Close dropdowns when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.dropdown')) {
            const dropdowns = document.querySelectorAll('.dropdown-menu');
            dropdowns.forEach(dropdown => {
                dropdown.classList.remove('show');
            });
        }
    });
}

/* ============================================
   ANIMATIONS ON SCROLL
   ============================================ */

function initAnimations() {
    // Add animation class to elements when they come into view
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe stat cards
    document.querySelectorAll('.stat-card').forEach(card => {
        card.style.opacity = '0';
        observer.observe(card);
    });
    
    // Observe activity items
    document.querySelectorAll('.activity-item').forEach(item => {
        item.style.opacity = '0';
        observer.observe(item);
    });
    
    // Add animation to cards with stagger
    const cards = document.querySelectorAll('.stat-card');
    cards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });
}

/* ============================================
   LOGIN FUNCTIONALITY (GMAIL)
   ============================================ */

function initLogin() {
    const loginForm = document.getElementById('loginForm');
    
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;
            
            // Simple validation
            if (email && password) {
                // Add loading state
                const btn = this.querySelector('.btn-login');
                btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Memasuki...';
                btn.disabled = true;
                
                // Simulate login delay
                setTimeout(() => {
                    // Redirect to dashboard
                    window.location.href = 'dashboard.html';
                }, 1000);
            } else {
                // Show error
                alert('Silakan masukkan email Gmail dan password!');
            }
        });
    }
    
    // Quick login for demo - click on the icon
    const loginPage = document.querySelector('.login-page');
    if (loginPage) {
        loginPage.addEventListener('click', function(e) {
            if (!e.target.closest('.form-control') && !e.target.closest('.btn-login') && !e.target.closest('.login-footer a')) {
                // Auto-fill for demo
                const emailInput = document.getElementById('email');
                const passwordInput = document.getElementById('password');
                
                if (emailInput && passwordInput && !emailInput.value) {
                    emailInput.value = 'azkapratama@gmail.com';
                    passwordInput.value = 'kanyaah9987';
                }
            }
        });
    }
}

/* ============================================
   LOGOUT FUNCTIONALITY
   ============================================ */

function initLogout() {
    const logoutLinks = document.querySelectorAll('.logout-btn, a[href="login.html"]');
    
    logoutLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            if (this.getAttribute('href') === 'login.html' || this.classList.contains('logout-btn')) {
                e.preventDefault();
                
                // Add fade effect
                document.body.style.opacity = '0.7';
                document.body.style.transition = 'opacity 0.3s ease';
                
                setTimeout(() => {
                    window.location.href = 'login.html';
                }, 300);
            }
        });
    });
}

/* ============================================
   CHARTS (using Chart.js if available)
   ============================================ */

function initCharts() {
    // Check if Chart.js is loaded
    if (typeof Chart !== 'undefined') {
        createDashboardChart();
        createStatisticsChart();
    } else {
        // Create CSS-based fallback charts
        createCSSCharts();
    }
}

function createDashboardChart() {
    const ctx = document.getElementById('dashboardChart');
    if (!ctx) return;
    
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
            datasets: [{
                label: 'Bucket Completed',
                data: [12, 19, 15, 25, 22, 30, 35],
                borderColor: '#e91e8c',
                backgroundColor: 'rgba(233, 30, 140, 0.1)',
                fill: true,
                tension: 0.4,
                pointBackgroundColor: '#e91e8c',
                pointBorderColor: '#fff',
                pointBorderWidth: 2,
                pointRadius: 4,
                pointHoverRadius: 6
            }, {
                label: 'Active Bucket',
                data: [8, 12, 10, 18, 16, 22, 28],
                borderColor: '#3b82f6',
                backgroundColor: 'rgba(59, 130, 246, 0.1)',
                fill: true,
                tension: 0.4,
                pointBackgroundColor: '#3b82f6',
                pointBorderColor: '#fff',
                pointBorderWidth: 2,
                pointRadius: 4,
                pointHoverRadius: 6
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        usePointStyle: true,
                        padding: 15,
                        font: {
                            size: 11
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(0, 0, 0, 0.05)'
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            }
        }
    });
}

function createStatisticsChart() {
    const ctx = document.getElementById('progressChart');
    if (!ctx) return;
    
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Completed', 'In Progress', 'Pending'],
            datasets: [{
                data: [65, 25, 10],
                backgroundColor: [
                    '#10b981',
                    '#3b82f6',
                    '#f59e0b'
                ],
                borderWidth: 0,
                hoverOffset: 8
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        usePointStyle: true,
                        padding: 15,
                        font: {
                            size: 11
                        }
                    }
                }
            },
            cutout: '70%'
        }
    });
}

/* ============================================
   CSS-BASED CHARTS (Fallback)
   ============================================ */

function createCSSCharts() {
    // Create simple CSS bar chart
    const chartContainer = document.querySelector('.chart-container');
    if (chartContainer && !document.getElementById('dashboardChart')) {
        chartContainer.innerHTML = `
            <div class="css-chart">
                <div class="chart-bars">
                    <div class="chart-bar" style="--height: 60%; --delay: 0.1s">
                        <span class="bar-value">35</span>
                        <span class="bar-label">Jul</span>
                    </div>
                    <div class="chart-bar" style="--height: 50%; --delay: 0.2s">
                        <span class="bar-value">30</span>
                        <span class="bar-label">Jun</span>
                    </div>
                    <div class="chart-bar" style="--height: 40%; --delay: 0.3s">
                        <span class="bar-value">22</span>
                        <span class="bar-label">May</span>
                    </div>
                    <div class="chart-bar" style="--height: 45%; --delay: 0.4s">
                        <span class="bar-value">25</span>
                        <span class="bar-label">Apr</span>
                    </div>
                    <div class="chart-bar" style="--height: 35%; --delay: 0.5s">
                        <span class="bar-value">19</span>
                        <span class="bar-label">Mar</span>
                    </div>
                    <div class="chart-bar" style="--height: 30%; --delay: 0.6s">
                        <span class="bar-value">15</span>
                        <span class="bar-label">Feb</span>
                    </div>
                    <div class="chart-bar" style="--height: 25%; --delay: 0.7s">
                        <span class="bar-value">12</span>
                        <span class="bar-label">Jan</span>
                    </div>
                <div class="chart-legend">
                    <span class="legend-item"><span class="legend-color" style="background: #e91e8c"></span> Completed</span>
                    <span class="legend-item"><span class="legend-color" style="background: #3b82f6"></span> Active</span>
                </div>
        `;
        
        // Add CSS for chart
        const style = document.createElement('style');
        style.textContent = `
            .css-chart {
                height: 100%;
                display: flex;
                flex-direction: column;
            }
            .chart-bars {
                flex: 1;
                display: flex;
                align-items: flex-end;
                justify-content: space-around;
                padding: 15px 5px;
                border-bottom: 2px solid #e2e8f0;
            }
            .chart-bar {
                display: flex;
                flex-direction: column;
                align-items: center;
                height: var(--height);
                width: 30px;
                background: linear-gradient(to top, #e91e8c, #f06292);
                border-radius: 4px 4px 0 0;
                position: relative;
                animation: growBar 0.8s ease-out forwards;
                animation-delay: var(--delay);
                transform-origin: bottom;
            }
            @keyframes growBar {
                from { transform: scaleY(0); }
                to { transform: scaleY(1); }
            }
            .bar-value {
                position: absolute;
                top: -22px;
                font-weight: 600;
                color: #2d3748;
                font-size: 0.75rem;
            }
            .bar-label {
                position: absolute;
                bottom: -22px;
                font-size: 0.7rem;
                color: #718096;
            }
            .chart-legend {
                display: flex;
                justify-content: center;
                gap: 15px;
                margin-top: 25px;
                flex-wrap: wrap;
            }
            .legend-item {
                display: flex;
                align-items: center;
                gap: 6px;
                font-size: 0.8rem;
                color: #718096;
            }
            .legend-color {
                width: 10px;
                height: 10px;
                border-radius: 2px;
            }
        `;
        document.head.appendChild(style);
    }
}

/* ============================================
   DATA TABLES FUNCTIONALITY
   ============================================ */

function initDataTables() {
    // Add hover effects to table rows
    const tableRows = document.querySelectorAll('.data-table tbody tr');
    
    tableRows.forEach(row => {
        row.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.01)';
            this.style.transition = 'transform 0.2s ease';
        });
        
        row.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
    
    // Search functionality for tables
    const searchInput = document.getElementById('tableSearch');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();
            const table = document.querySelector('.data-table');
            if (!table) return;
            
            const rows = table.querySelectorAll('tbody tr');
            
            rows.forEach(row => {
                const text = row.textContent.toLowerCase();
                if (text.includes(searchTerm)) {
                    row.style.display = '';
                } else {
                    row.style.display = 'none';
                }
            });
        });
    }
}

/* ============================================
   NOTIFICATIONS
   ============================================ */

function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification-toast ${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
        <span>${message}</span>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 80px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : '#ef4444'};
        color: white;
        padding: 12px 20px;
        border-radius: 8px;
        box-shadow: 0 10px 40px rgba(0,0,0,0.2);
        z-index: 10000;
        display: flex;
        align-items: center;
        gap: 10px;
        animation: slideInRight 0.3s ease;
        max-width: 90%;
    `;
    
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'fadeOut 0.3s ease forwards';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

/* ============================================
   MODAL FUNCTIONALITY
   ============================================ */

function initModal() {
    const modalTriggers = document.querySelectorAll('[data-modal]');
    
    modalTriggers.forEach(trigger => {
        trigger.addEventListener('click', function() {
            const modalId = this.getAttribute('data-modal');
            const modal = document.getElementById(modalId);
            
            if (modal) {
                modal.classList.add('show');
                modal.style.display = 'flex';
            }
        });
    });
    
    // Close modal on overlay click
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === this) {
                this.classList.remove('show');
                this.style.display = 'none';
            }
        });
    });
}

/* ============================================
   SIDEBAR ACTIVE STATE
   ============================================ */

function setActiveMenuItem() {
    const currentPath = window.location.pathname;
    const menuItems = document.querySelectorAll('.sidebar-menu a');
    
    menuItems.forEach(item => {
        const href = item.getAttribute('href');
        if (href && currentPath.includes(href)) {
            item.classList.add('active');
        }
    });
}

// Initialize on load
setActiveMenuItem();

/* ============================================
   THEME TOGGLE (For Settings Page)
   ============================================ */

function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    
    if (themeToggle) {
        themeToggle.addEventListener('change', function() {
            if (this.checked) {
                document.body.setAttribute('data-theme', 'dark');
                localStorage.setItem('theme', 'dark');
            } else {
                document.body.setAttribute('data-theme', 'light');
                localStorage.setItem('theme', 'light');
            }
        });
        
        // Load saved theme
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'dark') {
            themeToggle.checked = true;
            document.body.setAttribute('data-theme', 'dark');
        }
    }
}

/* ============================================
   LOAD MORE FUNCTIONALITY
   ============================================ */

function initLoadMore() {
    const loadMoreBtn = document.getElementById('loadMoreBtn');
    
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function() {
            const hiddenRows = document.querySelectorAll('.data-table tbody tr.hidden');
            let count = 0;
            
            hiddenRows.forEach(row => {
                if (count < 5) {
                    row.classList.remove('hidden');
                    row.style.display = '';
                    count++;
                }
            });
            
            if (document.querySelectorAll('.data-table tbody tr.hidden').length === 0) {
                this.style.display = 'none';
            }
        });
    }
}

/* ============================================
   ADDITIONAL UI ENHANCEMENTS
   ============================================ */

function initUIBits() {
    // Add ripple effect to buttons
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            const rect = this.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const ripple = document.createElement('span');
            ripple.style.cssText = `
                position: absolute;
                background: rgba(255,255,255,0.3);
                border-radius: 50%;
                pointer-events: none;
                width: 100px;
                height: 100px;
                left: ${x - 50}px;
                top: ${y - 50}px;
                transform: scale(0);
                animation: ripple 0.6s linear;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    });
    
    // Add ripple animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);
}

// Initialize UI bits
initUIBits();
