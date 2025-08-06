// Global variables
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
let currentUser = JSON.parse(localStorage.getItem('currentUser')) || null;

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    updateCartCount();
    initializeEventListeners();
    updateLoginStatus();
});

// Event Listeners
function initializeEventListeners() {
    // Navigation
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }

    // Search tabs
    const tabBtns = document.querySelectorAll('.tab-btn');
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => switchTab(btn.dataset.tab));
    });

    // Search forms
    document.getElementById('transport-form').addEventListener('submit', handleTransportSearch);
    document.getElementById('events-form').addEventListener('submit', handleEventSearch);
    document.getElementById('tours-form').addEventListener('submit', handleTourSearch);

    // Authentication forms
    document.getElementById('loginForm').addEventListener('submit', handleLogin);
    document.getElementById('registerForm').addEventListener('submit', handleRegister);

    // Modal close buttons
    const closeButtons = document.querySelectorAll('.close');
    closeButtons.forEach(btn => {
        btn.addEventListener('click', closeModals);
    });

    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal')) {
            closeModals();
        }
    });
}

// Tab switching functionality
function switchTab(tabName) {
    // Update tab buttons
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');

    // Show corresponding form
    document.querySelectorAll('.search-form').forEach(form => {
        form.classList.add('hidden');
    });
    document.getElementById(`${tabName}-form`).classList.remove('hidden');
}

// Search handlers
function handleTransportSearch(e) {
    e.preventDefault();
    const departure = document.getElementById('departure').value;
    const destination = document.getElementById('destination').value;
    const date = document.getElementById('travel-date').value;
    const passengers = document.getElementById('passengers').value;

    if (!departure || !destination || !date) {
        alert('Veuillez remplir tous les champs obligatoires');
        return;
    }

    // Simulate search results
    showSearchResults('transport', {
        departure, destination, date, passengers
    });
}

function handleEventSearch(e) {
    e.preventDefault();
    const city = document.getElementById('event-city').value;
    const type = document.getElementById('event-type').value;
    const date = document.getElementById('event-date').value;

    showSearchResults('events', { city, type, date });
}

function handleTourSearch(e) {
    e.preventDefault();
    const destination = document.getElementById('tour-destination').value;
    const duration = document.getElementById('tour-duration').value;
    const date = document.getElementById('tour-date').value;

    showSearchResults('tours', { destination, duration, date });
}

// Show search results (simulate)
function showSearchResults(type, searchData) {
    const results = generateMockResults(type, searchData);
    displayResults(results, type);
}

function generateMockResults(type, searchData) {
    const mockData = {
        transport: [
            {
                id: 't1',
                company: 'Voyage Express',
                departure: searchData.departure || 'Yaoundé',
                destination: searchData.destination || 'Douala',
                time: '08:00',
                duration: '3h30',
                price: 3500,
                availableSeats: 15
            },
            {
                id: 't2',
                company: 'Cameroon Bus',
                departure: searchData.departure || 'Yaoundé',
                destination: searchData.destination || 'Douala',
                time: '14:00',
                duration: '3h45',
                price: 3000,
                availableSeats: 8
            }
        ],
        events: [
            {
                id: 'e1',
                name: 'Concert Makossa Night',
                venue: 'Palais des Sports',
                date: searchData.date || '2024-12-15',
                time: '20:00',
                price: 5000,
                category: 'concert'
            },
            {
                id: 'e2',
                name: 'Festival Ngondo',
                venue: 'Douala',
                date: searchData.date || '2024-12-20',
                time: '10:00',
                price: 2500,
                category: 'festival'
            }
        ],
        tours: [
            {
                id: 'to1',
                name: 'Ascension Mont Cameroun',
                duration: '3 jours',
                price: 45000,
                includes: ['Transport', 'Guide', 'Hébergement'],
                difficulty: 'Modéré'
            },
            {
                id: 'to2',
                name: 'Safari Parc de Waza',
                duration: '2 jours',
                price: 35000,
                includes: ['Transport', 'Guide', 'Repas'],
                difficulty: 'Facile'
            }
        ]
    };

    return mockData[type] || [];
}

function displayResults(results, type) {
    // Create results container
    let resultsContainer = document.getElementById('searchResults');
    if (!resultsContainer) {
        resultsContainer = document.createElement('div');
        resultsContainer.id = 'searchResults';
        resultsContainer.className = 'search-results';
        document.querySelector('.popular-offers').before(resultsContainer);
    }

    resultsContainer.innerHTML = `
        <div class="container">
            <h2 class="section-title">Résultats de recherche</h2>
            <div class="results-grid">
                ${results.map(item => createResultCard(item, type)).join('')}
            </div>
        </div>
    `;

    // Scroll to results
    resultsContainer.scrollIntoView({ behavior: 'smooth' });
}

function createResultCard(item, type) {
    switch(type) {
        case 'transport':
            return `
                <div class="result-card">
                    <div class="result-header">
                        <h3>${item.company}</h3>
                        <div class="price">${item.price.toLocaleString()} FCFA</div>
                    </div>
                    <div class="result-details">
                        <p><i class="fas fa-map-marker-alt"></i> ${item.departure} → ${item.destination}</p>
                        <p><i class="fas fa-clock"></i> ${item.time} (${item.duration})</p>
                        <p><i class="fas fa-users"></i> ${item.availableSeats} places disponibles</p>
                    </div>
                    <button class="btn-primary" onclick="bookItem('${item.id}', 'transport', ${item.price})">
                        Réserver
                    </button>
                </div>
            `;
        case 'events':
            return `
                <div class="result-card">
                    <div class="result-header">
                        <h3>${item.name}</h3>
                        <div class="price">${item.price.toLocaleString()} FCFA</div>
                    </div>
                    <div class="result-details">
                        <p><i class="fas fa-map-marker-alt"></i> ${item.venue}</p>
                        <p><i class="fas fa-calendar"></i> ${item.date}</p>
                        <p><i class="fas fa-clock"></i> ${item.time}</p>
                    </div>
                    <button class="btn-primary" onclick="bookItem('${item.id}', 'event', ${item.price})">
                        Réserver
                    </button>
                </div>
            `;
        case 'tours':
            return `
                <div class="result-card">
                    <div class="result-header">
                        <h3>${item.name}</h3>
                        <div class="price">${item.price.toLocaleString()} FCFA</div>
                    </div>
                    <div class="result-details">
                        <p><i class="fas fa-clock"></i> Durée: ${item.duration}</p>
                        <p><i class="fas fa-star"></i> Difficulté: ${item.difficulty}</p>
                        <p><i class="fas fa-check"></i> Inclus: ${item.includes.join(', ')}</p>
                    </div>
                    <button class="btn-primary" onclick="bookItem('${item.id}', 'tour', ${item.price})">
                        Réserver
                    </button>
                </div>
            `;
    }
}

// Booking functions
function bookOffer(type, offerId) {
    const offers = {
        'transport': {
            'yaoundé-douala': { name: 'Transport Yaoundé-Douala', price: 3500 }
        },
        'tour': {
            'mont-cameroun': { name: 'Ascension Mont Cameroun', price: 45000 }
        },
        'event': {
            'ngondo': { name: 'Festival Ngondo', price: 5000 }
        }
    };

    const offer = offers[type][offerId];
    if (offer) {
        bookItem(offerId, type, offer.price, offer.name);
    }
}

function bookItem(id, type, price, name = '') {
    if (!isLoggedIn) {
        alert('Veuillez vous connecter pour réserver');
        showLogin();
        return;
    }

    const item = {
        id: `${type}_${id}_${Date.now()}`,
        originalId: id,
        type: type,
        name: name || `${type} ${id}`,
        price: price,
        quantity: 1,
        addedAt: new Date().toISOString()
    };

    cart.push(item);
    saveCart();
    updateCartCount();
    
    alert('Article ajouté au panier !');
}

// Cart management
function updateCartCount() {
    const cartCount = document.querySelector('.cart-count');
    if (cartCount) {
        cartCount.textContent = cart.length;
    }
}

function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

function showCart() {
    const cartModal = document.getElementById('cartModal');
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');

    if (cart.length === 0) {
        cartItems.innerHTML = '<p class="empty-cart">Votre panier est vide</p>';
        cartTotal.textContent = '0 FCFA';
    } else {
        const total = cart.reduce((sum, item) => sum + item.price, 0);
        cartItems.innerHTML = cart.map(item => `
            <div class="cart-item">
                <div class="cart-item-details">
                    <h4>${item.name}</h4>
                    <p>Type: ${item.type}</p>
                    <p class="cart-item-price">${item.price.toLocaleString()} FCFA</p>
                </div>
                <button class="remove-btn" onclick="removeFromCart('${item.id}')">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `).join('');
        cartTotal.textContent = `${total.toLocaleString()} FCFA`;
    }

    cartModal.style.display = 'block';
}

function removeFromCart(itemId) {
    cart = cart.filter(item => item.id !== itemId);
    saveCart();
    updateCartCount();
    showCart(); // Refresh cart display
}

function proceedToCheckout() {
    if (cart.length === 0) {
        alert('Votre panier est vide');
        return;
    }

    closeModals();
    showPayment();
}

// Payment system
function showPayment() {
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    
    const paymentModal = document.createElement('div');
    paymentModal.className = 'modal';
    paymentModal.style.display = 'block';
    paymentModal.innerHTML = `
        <div class="modal-content">
            <span class="close" onclick="this.parentElement.parentElement.remove()">&times;</span>
            <h2>Paiement</h2>
            <div class="payment-summary">
                <h3>Récapitulatif</h3>
                ${cart.map(item => `<p>${item.name}: ${item.price.toLocaleString()} FCFA</p>`).join('')}
                <hr>
                <p><strong>Total: ${total.toLocaleString()} FCFA</strong></p>
            </div>
            <div class="payment-methods">
                <h3>Méthode de paiement</h3>
                <button class="payment-btn" onclick="processPayment('mtn')">
                    <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='60'%3E%3Crect width='100' height='60' fill='%23FFCB05'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dominant-baseline='middle' fill='black' font-family='Arial' font-size='12'%3EMTN MoMo%3C/text%3E%3C/svg%3E" alt="MTN Mobile Money">
                </button>
                <button class="payment-btn" onclick="processPayment('orange')">
                    <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='60'%3E%3Crect width='100' height='60' fill='%23FF6600'/%3E%3Ctext x='50%25' y='50%25' text-anchor='middle' dominant-baseline='middle' fill='white' font-family='Arial' font-size='12'%3EOrange Money%3C/text%3E%3C/svg%3E" alt="Orange Money">
                </button>
            </div>
        </div>
    `;
    
    document.body.appendChild(paymentModal);
}

function processPayment(method) {
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    
    // Simulate payment processing
    alert(`Redirection vers ${method === 'mtn' ? 'MTN Mobile Money' : 'Orange Money'} pour payer ${total.toLocaleString()} FCFA`);
    
    setTimeout(() => {
        // Simulate successful payment
        generateTicket();
        cart = [];
        saveCart();
        updateCartCount();
        closeModals();
        alert('Paiement réussi ! Votre e-ticket a été généré.');
    }, 2000);
}

// Ticket generation
function generateTicket() {
    const ticketData = {
        ticketNumber: 'TK' + Date.now(),
        customerName: currentUser ? currentUser.name : 'Client',
        items: [...cart],
        total: cart.reduce((sum, item) => sum + item.price, 0),
        issueDate: new Date().toLocaleDateString('fr-FR'),
        qrCode: 'https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=' + encodeURIComponent('TK' + Date.now())
    };

    // Store ticket in localStorage
    const tickets = JSON.parse(localStorage.getItem('tickets')) || [];
    tickets.push(ticketData);
    localStorage.setItem('tickets', JSON.stringify(tickets));

    // Show ticket
    showTicket(ticketData);
}

function showTicket(ticketData) {
    const ticketModal = document.createElement('div');
    ticketModal.className = 'modal';
    ticketModal.style.display = 'block';
    ticketModal.innerHTML = `
        <div class="modal-content">
            <span class="close" onclick="this.parentElement.parentElement.remove()">&times;</span>
            <div class="ticket">
                <h2>🎫 E-Ticket 237Travel</h2>
                <div class="ticket-info">
                    <p><strong>Numéro:</strong> ${ticketData.ticketNumber}</p>
                    <p><strong>Client:</strong> ${ticketData.customerName}</p>
                    <p><strong>Date:</strong> ${ticketData.issueDate}</p>
                    <hr>
                    ${ticketData.items.map(item => `<p>${item.name}: ${item.price.toLocaleString()} FCFA</p>`).join('')}
                    <hr>
                    <p><strong>Total: ${ticketData.total.toLocaleString()} FCFA</strong></p>
                </div>
                <div class="qr-code">
                    <img src="${ticketData.qrCode}" alt="QR Code">
                </div>
                <button class="btn-primary" onclick="downloadTicket('${ticketData.ticketNumber}')">
                    Télécharger PDF
                </button>
            </div>
        </div>
    `;
    
    document.body.appendChild(ticketModal);
}

function downloadTicket(ticketNumber) {
    alert('Fonction de téléchargement PDF en cours de développement');
    // In a real application, this would generate and download a PDF
}

// Authentication
function showLogin() {
    document.getElementById('loginModal').style.display = 'block';
}

function showRegister() {
    closeModals();
    document.getElementById('registerModal').style.display = 'block';
}

function closeModals() {
    document.querySelectorAll('.modal').forEach(modal => {
        modal.style.display = 'none';
    });
}

function handleLogin(e) {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Simulate login (in real app, this would validate against backend)
    if (email && password) {
        const user = {
            email: email,
            name: email.split('@')[0]
        };
        
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('currentUser', JSON.stringify(user));
        
        isLoggedIn = true;
        currentUser = user;
        
        closeModals();
        updateLoginStatus();
        alert('Connexion réussie !');
    } else {
        alert('Veuillez remplir tous les champs');
    }
}

function handleRegister(e) {
    e.preventDefault();
    const name = document.getElementById('fullName').value;
    const email = document.getElementById('regEmail').value;
    const phone = document.getElementById('phone').value;
    const password = document.getElementById('regPassword').value;

    if (name && email && phone && password) {
        const user = {
            name: name,
            email: email,
            phone: phone
        };
        
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('currentUser', JSON.stringify(user));
        
        isLoggedIn = true;
        currentUser = user;
        
        closeModals();
        updateLoginStatus();
        alert('Inscription réussie !');
    } else {
        alert('Veuillez remplir tous les champs');
    }
}

function updateLoginStatus() {
    const loginLink = document.querySelector('a[onclick="showLogin()"]');
    if (loginLink) {
        if (isLoggedIn && currentUser) {
            loginLink.textContent = currentUser.name;
            loginLink.onclick = () => showUserMenu();
        } else {
            loginLink.textContent = 'Connexion';
            loginLink.onclick = () => showLogin();
        }
    }
}

function showUserMenu() {
    const userMenu = document.createElement('div');
    userMenu.className = 'modal';
    userMenu.style.display = 'block';
    userMenu.innerHTML = `
        <div class="modal-content">
            <span class="close" onclick="this.parentElement.parentElement.remove()">&times;</span>
            <h2>Mon Compte</h2>
            <p><strong>Nom:</strong> ${currentUser.name}</p>
            <p><strong>Email:</strong> ${currentUser.email}</p>
            <button class="btn-primary" onclick="showMyTickets()">Mes Billets</button>
            <button class="btn-primary" onclick="logout()">Déconnexion</button>
        </div>
    `;
    
    document.body.appendChild(userMenu);
}

function showMyTickets() {
    const tickets = JSON.parse(localStorage.getItem('tickets')) || [];
    closeModals();
    
    const ticketsModal = document.createElement('div');
    ticketsModal.className = 'modal';
    ticketsModal.style.display = 'block';
    ticketsModal.innerHTML = `
        <div class="modal-content">
            <span class="close" onclick="this.parentElement.parentElement.remove()">&times;</span>
            <h2>Mes Billets</h2>
            ${tickets.length === 0 ? 
                '<p>Aucun billet trouvé</p>' : 
                tickets.map(ticket => `
                    <div class="ticket-summary">
                        <p><strong>${ticket.ticketNumber}</strong> - ${ticket.issueDate}</p>
                        <p>Total: ${ticket.total.toLocaleString()} FCFA</p>
                        <button onclick="showTicket(${JSON.stringify(ticket).replace(/"/g, '&quot;')})">Voir</button>
                    </div>
                `).join('')
            }
        </div>
    `;
    
    document.body.appendChild(ticketsModal);
}

function logout() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('currentUser');
    isLoggedIn = false;
    currentUser = null;
    updateLoginStatus();
    closeModals();
    alert('Déconnexion réussie');
}

// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

console.log('237Travel website loaded successfully!');
