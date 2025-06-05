// Global state
let isAuthenticated = false;
let currentSection = 'dashboard';
let isGenerating = false;
let generateProgress = 0;

// DOM Elements
const loginScreen = document.getElementById('loginScreen');
const dashboard = document.getElementById('dashboard');
const loginForm = document.getElementById('loginForm');
const registerForm = document.getElementById('registerForm');
const logoutBtn = document.getElementById('logoutBtn');

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    setupEventListeners();
});

function initializeApp() {
    // Check if user is already authenticated (you could use localStorage here)
    if (isAuthenticated) {
        showDashboard();
    } else {
        showLogin();
    }
}

function setupEventListeners() {
    // Login/Register tabs
    setupTabs();
    
    // Forms
    setupForms();
    
    // Navigation
    setupNavigation();
    
    // API tabs
    setupApiTabs();
    
    // Buttons
    setupButtons();
    
    // Modal
    setupModal();
}

function setupTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tabName = button.getAttribute('data-tab');
            
            // Remove active class from all tabs
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked tab
            button.classList.add('active');
            document.getElementById(tabName + 'Tab').classList.add('active');
        });
    });
}

function setupForms() {
    // Login form
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        handleLogin();
    });
    
    // Register form
    registerForm.addEventListener('submit', function(e) {
        e.preventDefault();
        handleRegister();
    });
    
    // Fornecedor form
    const fornecedorForm = document.getElementById('fornecedorForm');
    if (fornecedorForm) {
        fornecedorForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleAddFornecedor();
        });
    }
    
    // API Config form
    const apiConfigForm = document.getElementById('apiConfigForm');
    if (apiConfigForm) {
        apiConfigForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleApiConfig();
        });
    }
    
    // Generate form
    const generateForm = document.getElementById('generateForm');
    if (generateForm) {
        generateForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleGenerate();
        });
    }
}

function setupNavigation() {
    const navTabs = document.querySelectorAll('.nav-tab');
    const sections = document.querySelectorAll('.section');
    
    navTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const sectionName = tab.getAttribute('data-section');
            
            // Remove active class from all tabs and sections
            navTabs.forEach(t => t.classList.remove('active'));
            sections.forEach(s => s.classList.remove('active'));
            
            // Add active class to clicked tab and corresponding section
            tab.classList.add('active');
            document.getElementById(sectionName + 'Section').classList.add('active');
            
            currentSection = sectionName;
        });
    });
}

function setupApiTabs() {
    const apiTabs = document.querySelectorAll('.api-tab');
    const apiTabContents = document.querySelectorAll('.api-tab-content');
    
    apiTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const tabName = tab.getAttribute('data-api-tab');
            
            // Remove active class from all tabs
            apiTabs.forEach(t => t.classList.remove('active'));
            apiTabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked tab
            tab.classList.add('active');
            document.getElementById('api' + capitalize(tabName) + 'Tab').classList.add('active');
        });
    });
}

function setupButtons() {
    // Logout button
    logoutBtn.addEventListener('click', handleLogout);
    
    // Connect API button
    const connectApiBtn = document.getElementById('connectApiBtn');
    if (connectApiBtn) {
        connectApiBtn.addEventListener('click', handleConnectApi);
    }
    
    // Sync now button
    const syncNowBtn = document.getElementById('syncNowBtn');
    if (syncNowBtn) {
        syncNowBtn.addEventListener('click', handleSyncNow);
    }
    
    // Generate button
    const generateBtn = document.getElementById('generateBtn');
    if (generateBtn) {
        generateBtn.addEventListener('click', handleGenerate);
    }
    
    // Add fornecedor button
    const addFornecedorBtn = document.getElementById('addFornecedorBtn');
    if (addFornecedorBtn) {
        addFornecedorBtn.addEventListener('click', openFornecedorModal);
    }
}

function setupModal() {
    const modal = document.getElementById('fornecedorModal');
    const closeBtn = document.querySelector('.modal-close');
    
    if (closeBtn) {
        closeBtn.addEventListener('click', closeFornecedorModal);
    }
    
    // Close modal when clicking outside
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeFornecedorModal();
            }
        });
    }
}

// Authentication functions
function handleLogin() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    if (!email || !password) {
        showNotification('Por favor, preencha todos os campos', 'error');
        return;
    }
    
    // Simulate login process
    showLoading(loginForm.querySelector('button'), 'Entrando...');
    
    setTimeout(() => {
        isAuthenticated = true;
        showDashboard();
        showNotification('Login realizado com sucesso!', 'success');
        hideLoading(loginForm.querySelector('button'), 'Entrar');
    }, 1500);
}

function handleRegister() {
    const nome = document.getElementById('nome').value;
    const empresa = document.getElementById('empresa').value;
    const email = document.getElementById('emailRegister').value;
    const telefone = document.getElementById('telefone').value;
    const password = document.getElementById('passwordRegister').value;
    
    if (!nome || !empresa || !email || !telefone || !password) {
        showNotification('Por favor, preencha todos os campos', 'error');
        return;
    }
    
    // Simulate register process
    showLoading(registerForm.querySelector('button'), 'Cadastrando...');
    
    setTimeout(() => {
        isAuthenticated = true;
        showDashboard();
        showNotification('Cadastro realizado com sucesso!', 'success');
        hideLoading(registerForm.querySelector('button'), 'Cadastrar');
    }, 2000);
}

function handleLogout() {
    isAuthenticated = false;
    showLogin();
    showNotification('Logout realizado com sucesso!', 'success');
}

// Screen navigation
function showLogin() {
    loginScreen.classList.remove('hidden');
    dashboard.classList.add('hidden');
}

function showDashboard() {
    loginScreen.classList.add('hidden');
    dashboard.classList.remove('hidden');
}

// API functions
function handleConnectApi() {
    const appId = document.getElementById('appId').value;
    const secretKey = document.getElementById('secretKey').value;
    const accessToken = document.getElementById('accessToken').value;
    
    if (!appId || !secretKey || !accessToken) {
        showNotification('Por favor, preencha todas as credenciais', 'error');
        return;
    }
    
    const button = document.getElementById('connectApiBtn');
    showLoading(button, 'Conectando...');
    
    setTimeout(() => {
        showNotification('API conectada com sucesso!', 'success');
        hideLoading(button, 'Conectar API');
    }, 2000);
}

function handleSyncNow() {
    const button = document.getElementById('syncNowBtn');
    showLoading(button, 'Sincronizando...');
    
    setTimeout(() => {
        showNotification('Sincronização concluída com sucesso!', 'success');
        hideLoading(button, 'Sincronizar Agora');
    }, 3000);
}

// Fornecedor functions
function openFornecedorModal() {
    const modal = document.getElementById('fornecedorModal');
    modal.classList.add('active');
}

function closeFornecedorModal() {
    const modal = document.getElementById('fornecedorModal');
    modal.classList.remove('active');
    
    // Reset form
    const form = document.getElementById('fornecedorForm');
    if (form) {
        form.reset();
    }
}

function handleAddFornecedor() {
    const nomeEmpresa = document.getElementById('nomeEmpresa').value;
    const emailFornecedor = document.getElementById('emailFornecedor').value;
    const telefoneFornecedor = document.getElementById('telefoneFornecedor').value;
    const enderecoFornecedor = document.getElementById('enderecoFornecedor').value;
    
    if (!nomeEmpresa || !emailFornecedor || !telefoneFornecedor || !enderecoFornecedor) {
        showNotification('Por favor, preencha todos os campos obrigatórios', 'error');
        return;
    }
    
    // Simulate adding fornecedor
    setTimeout(() => {
        closeFornecedorModal();
        showNotification('Fornecedor cadastrado com sucesso!', 'success');
        
        // Here you would typically update the fornecedores table
        updateFornecedoresTable();
    }, 1000);
}

function updateFornecedoresTable() {
    // This would typically fetch and update the table data
    console.log('Updating fornecedores table...');
}

// Generate functions
function handleGenerate() {
    const fornecedor = document.getElementById('fornecedorSelect').value;
    const categoria = document.getElementById('categoriaSelect').value;
    const quantidade = document.getElementById('quantidade').value;
    const markup = document.getElementById('markup').value;
    
    if (!fornecedor || !categoria || !quantidade || !markup) {
        showNotification('Por favor, preencha todos os campos', 'error');
        return;
    }
    
    if (isGenerating) {
        return;
    }
    
    isGenerating = true;
    generateProgress = 0;
    
    const button = document.getElementById('generateBtn');
    const progressContainer = document.getElementById('generateProgress');
    const progressFill = document.getElementById('progressFill');
    const progressPercent = document.getElementById('progressPercent');
    
    // Show progress
    progressContainer.classList.remove('hidden');
    button.innerHTML = '<i class="fas fa-pause"></i> Gerando...';
    button.disabled = true;
    
    // Simulate generation progress
    const interval = setInterval(() => {
        generateProgress += 10;
        progressFill.style.width = generateProgress + '%';
        progressPercent.textContent = generateProgress + '%';
        
        if (generateProgress >= 100) {
            clearInterval(interval);
            isGenerating = false;
            
            // Reset UI
            progressContainer.classList.add('hidden');
            button.innerHTML = '<i class="fas fa-play"></i> Gerar Itens';
            button.disabled = false;
            
            showNotification(`${quantidade} itens gerados com sucesso!`, 'success');
            
            // Update stats (simulate)
            updateGenerationStats();
        }
    }, 500);
}

function updateGenerationStats() {
    // This would typically update the generation statistics
    console.log('Updating generation statistics...');
}

// Utility functions
function showLoading(button, text) {
    button.disabled = true;
    button.textContent = text;
}

function hideLoading(button, originalText) {
    button.disabled = false;
    button.textContent = originalText;
}

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${getNotificationIcon(type)}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close">&times;</button>
    `;
    
    // Add styles for notification
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${getNotificationColor(type)};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 0.5rem;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 1001;
        display: flex;
        align-items: center;
        justify-content: space-between;
        min-width: 300px;
        animation: slideIn 0.3s ease;
    `;
    
    // Add notification to body
    document.body.appendChild(notification);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.remove();
    });
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.remove();
        }
    }, 5000);
}

function getNotificationIcon(type) {
    switch (type) {
        case 'success': return 'check-circle';
        case 'error': return 'exclamation-circle';
        case 'warning': return 'exclamation-triangle';
        default: return 'info-circle';
    }
}

function getNotificationColor(type) {
    switch (type) {
        case 'success': return '#10b981';
        case 'error': return '#ef4444';
        case 'warning': return '#f59e0b';
        default: return '#3b82f6';
    }
}

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

// Add CSS for notifications animation
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    .notification-content {
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }
    
    .notification-close {
        background: none;
        border: none;
        color: white;
        font-size: 1.2rem;
        cursor: pointer;
        padding: 0;
        margin-left: 1rem;
    }
    
    .notification-close:hover {
        opacity: 0.8;
    }
`;
document.head.appendChild(style);

// Initialize tooltips and other interactive elements
function initializeInteractiveElements() {
    // Add hover effects to stat cards
    const statCards = document.querySelectorAll('.stat-card');
    statCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
            this.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
        });
    });
    
    // Add smooth transitions
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.style.transition = 'all 0.2s ease';
    });
}

// Call initialization when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeInteractiveElements();
});

// Simulate real-time updates
function startRealTimeUpdates() {
    // Update stats every 30 seconds (simulation)
    setInterval(() => {
        if (isAuthenticated && currentSection === 'dashboard') {
            updateDashboardStats();
        }
    }, 30000);
}

function updateDashboardStats() {
    // Simulate updating dashboard statistics
    const statValues = document.querySelectorAll('.stat-value');
    statValues.forEach(stat => {
        // Add subtle animation to show data is updating
        stat.style.opacity = '0.7';
        setTimeout(() => {
            stat.style.opacity = '1';
        }, 200);
    });
}

// Start real-time updates
startRealTimeUpdates();

// Export functions for global access
window.closeFornecedorModal = closeFornecedorModal;
window.openFornecedorModal = openFornecedorModal;