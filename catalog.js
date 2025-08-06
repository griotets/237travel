// Catalog page functionality
let catalogItems = [];
let filteredItems = [];
let currentView = 'grid';
let currentPage = 1;
const itemsPerPage = 12;

// Sample catalog data
const sampleCatalogItems = [
    // Transport
    {
        id: 'T001',
        category: 'transport',
        title: 'Yaoundé - Douala Express',
        description: 'Service de transport confortable et rapide entre les deux principales villes du Cameroun',
        price: 3500,
        region: 'centre',
        image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=400',
        rating: 4.5,
        duration: '3h30',
        departure: 'Yaoundé',
        destination: 'Douala',
        availableSeats: 45,
        amenities: ['WiFi', 'Climatisation', 'Collation'],
        schedule: ['06:00', '09:00', '12:00', '15:00', '18:00']
    },
    {
        id: 'T002',
        category: 'transport',
        title: 'Douala - Bafoussam',
        description: 'Liaison directe vers la région de l\'Ouest du Cameroun',
        price: 4500,
        region: 'ouest',
        image: 'https://images.unsplash.com/photo-1570125909232-eb263c188f7e?w=400',
        rating: 4.2,
        duration: '4h15',
        departure: 'Douala',
        destination: 'Bafoussam',
        availableSeats: 32,
        amenities: ['Climatisation', 'Musique'],
        schedule: ['07:00', '11:00', '15:00']
    },
    {
        id: 'T003',
        category: 'transport',
        title: 'Yaoundé - Ngaoundéré',
        description: 'Voyage vers le nord du Cameroun avec escale à Bertoua',
        price: 8000,
        region: 'adamaoua',
        image: 'https://images.unsplash.com/photo-1559181567-c3190ca9959b?w=400',
        rating: 4.0,
        duration: '8h00',
        departure: 'Yaoundé',
        destination: 'Ngaoundéré',
        availableSeats: 28,
        amenities: ['WiFi', 'Climatisation', 'Repas'],
        schedule: ['06:00', '14:00']
    },

    // Events
    {
        id: 'E001',
        category: 'event',
        title: 'Festival Ngondo 2024',
        description: 'Festival traditionnel des peuples Sawa au bord du fleuve Wouri',
        price: 5000,
        region: 'littoral',
        image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400',
        rating: 4.8,
        date: '2024-12-15',
        venue: 'Douala - Bord du Wouri',
        duration: '3 jours',
        category_type: 'cultural',
        capacity: 5000
    },
    {
        id: 'E002',
        category: 'event',
        title: 'Concert Makossa Night',
        description: 'Soirée dédiée à la musique camerounaise avec les plus grands artistes',
        price: 7500,
        region: 'centre',
        image: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=400',
        rating: 4.6,
        date: '2024-12-20',
        venue: 'Palais des Sports - Yaoundé',
        duration: '1 soirée',
        category_type: 'music',
        capacity: 3000
    },
    {
        id: 'E003',
        category: 'event',
        title: 'Salon de l\'Artisanat',
        description: 'Exposition et vente d\'articles d\'artisanat traditionnel camerounais',
        price: 2500,
        region: 'ouest',
        image: 'https://images.unsplash.com/photo-1515577480099-ce6d414fec8a?w=400',
        rating: 4.3,
        date: '2024-12-25',
        venue: 'Centre Culturel - Bafoussam',
        duration: '5 jours',
        category_type: 'exhibition',
        capacity: 1500
    },

    // Tours
    {
        id: 'TO001',
        category: 'tour',
        title: 'Ascension du Mont Cameroun',
        description: 'Expédition de 3 jours pour gravir le plus haut sommet d\'Afrique de l\'Ouest',
        price: 45000,
        region: 'sud-ouest',
        image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400',
        rating: 4.9,
        duration: '3 jours / 2 nuits',
        difficulty: 'Modéré',
        groupSize: 12,
        includes: ['Guide expert', 'Équipement', 'Hébergement', 'Repas'],
        itinerary: ['Jour 1: Buéa - Hutte 1', 'Jour 2: Hutte 1 - Sommet - Hutte 2', 'Jour 3: Hutte 2 - Buéa']
    },
    {
        id: 'TO002',
        category: 'tour',
        title: 'Safari Parc de Waza',
        description: 'Découvrez la faune sauvage du Cameroun dans le célèbre parc national de Waza',
        price: 35000,
        region: 'extreme-nord',
        image: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=400',
        rating: 4.7,
        duration: '2 jours / 1 nuit',
        difficulty: 'Facile',
        groupSize: 8,
        includes: ['Transport 4x4', 'Guide naturaliste', 'Hébergement', 'Tous repas'],
        itinerary: ['Jour 1: Maroua - Waza - Safari', 'Jour 2: Safari matinal - Retour']
    },
    {
        id: 'TO003',
        category: 'tour',
        title: 'Chutes de la Lobé',
        description: 'Excursion aux spectaculaires chutes qui se jettent directement dans l\'océan',
        price: 25000,
        region: 'sud',
        image: 'https://images.unsplash.com/photo-1439066615861-d1af74d74000?w=400',
        rating: 4.4,
        duration: '1 jour',
        difficulty: 'Facile',
        groupSize: 15,
        includes: ['Transport', 'Guide local', 'Déjeuner', 'Activités nautiques'],
        itinerary: ['Départ Kribi - Chutes de la Lobé - Baignade - Retour']
    },
    {
        id: 'TO004',
        category: 'tour',
        title: 'Villages Pygmées Bagyeli',
        description: 'Immersion culturelle dans les villages traditionnels des Pygmées Bagyeli',
        price: 28000,
        region: 'sud',
        image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400',
        rating: 4.6,
        duration: '2 jours / 1 nuit',
        difficulty: 'Facile',
        groupSize: 10,
        includes: ['Transport', 'Guide culturel', 'Hébergement traditionnel', 'Repas locaux'],
        itinerary: ['Jour 1: Rencontre avec la communauté', 'Jour 2: Activités traditionnelles']
    },
    {
        id: 'TO005',
        category: 'tour',
        title: 'Lac Nyos et Plateau de Bamenda',
        description: 'Découverte du mystérieux lac Nyos et des paysages du plateau de Bamenda',
        price: 32000,
        region: 'nord-ouest',
        image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400',
        rating: 4.5,
        duration: '2 jours / 1 nuit',
        difficulty: 'Modéré',
        groupSize: 12,
        includes: ['Transport', 'Guide', 'Hébergement', 'Repas'],
        itinerary: ['Jour 1: Bamenda - Lac Nyos', 'Jour 2: Exploration région - Retour']
    },

    // Additional Transport
    {
        id: 'T004',
        category: 'transport',
        title: 'Yaoundé - Garoua',
        description: 'Liaison vers le grand nord camerounais',
        price: 12000,
        region: 'nord',
        image: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=400',
        rating: 4.1,
        duration: '10h00',
        departure: 'Yaoundé',
        destination: 'Garoua',
        availableSeats: 25,
        amenities: ['Climatisation', 'Repas', 'WiFi'],
        schedule: ['07:00', '19:00']
    },

    // Additional Events
    {
        id: 'E004',
        category: 'event',
        title: 'Fête de la Jeunesse',
        description: 'Célébration nationale de la jeunesse camerounaise avec défilés et spectacles',
        price: 1500,
        region: 'centre',
        image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400',
        rating: 4.0,
        date: '2025-02-11',
        venue: 'Boulevard du 20 Mai - Yaoundé',
        duration: '1 jour',
        category_type: 'national',
        capacity: 10000
    }
];

// Initialize catalog
document.addEventListener('DOMContentLoaded', function() {
    catalogItems = [...sampleCatalogItems];
    filteredItems = [...catalogItems];
    
    initializeCatalog();
    updateCartCount();
    updateLoginStatus();
});

function initializeCatalog() {
    displayCatalogItems();
    updateResultsCount();
    setupPagination();
    
    // Initialize event listeners
    initializeEventListeners();
}

function initializeEventListeners() {
    // Modal close events
    document.querySelectorAll('.close').forEach(btn => {
        btn.addEventListener('click', function() {
            this.closest('.modal').style.display = 'none';
        });
    });

    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal')) {
            e.target.style.display = 'none';
        }
    });

    // Auth forms
    document.getElementById('loginForm').addEventListener('submit', handleLogin);
    document.getElementById('registerForm').addEventListener('submit', handleRegister);
}

// Search functionality
function searchCatalog() {
    const searchTerm = document.getElementById('catalogSearch').value.toLowerCase();
    
    filteredItems = catalogItems.filter(item => 
        item.title.toLowerCase().includes(searchTerm) ||
        item.description.toLowerCase().includes(searchTerm) ||
        item.region.toLowerCase().includes(searchTerm) ||
        (item.departure && item.departure.toLowerCase().includes(searchTerm)) ||
        (item.destination && item.destination.toLowerCase().includes(searchTerm))
    );
    
    currentPage = 1;
    displayCatalogItems();
    updateResultsCount();
    setupPagination();
}

// Filter functionality
function filterCatalog() {
    const categoryFilter = document.getElementById('categoryFilter').value;
    const priceFilter = document.getElementById('priceFilter').value;
    const regionFilter = document.getElementById('regionFilter').value;
    
    filteredItems = catalogItems.filter(item => {
        let passesFilter = true;
        
        // Category filter
        if (categoryFilter && item.category !== categoryFilter) {
            passesFilter = false;
        }
        
        // Price filter
        if (priceFilter && !checkPriceRange(item.price, priceFilter)) {
            passesFilter = false;
        }
        
        // Region filter
        if (regionFilter && item.region !== regionFilter) {
            passesFilter = false;
        }
        
        return passesFilter;
    });
    
    currentPage = 1;
    displayCatalogItems();
    updateResultsCount();
    setupPagination();
}

function checkPriceRange(price, range) {
    switch(range) {
        case '0-5000':
            return price <= 5000;
        case '5000-20000':
            return price > 5000 && price <= 20000;
        case '20000-50000':
            return price > 20000 && price <= 50000;
        case '50000+':
            return price > 50000;
        default:
            return true;
    }
}

// Sort functionality
function sortCatalog() {
    const sortBy = document.getElementById('sortFilter').value;
    
    filteredItems.sort((a, b) => {
        switch(sortBy) {
            case 'price-asc':
                return a.price - b.price;
            case 'price-desc':
                return b.price - a.price;
            case 'rating':
                return b.rating - a.rating;
            case 'date':
                if (a.date && b.date) {
                    return new Date(a.date) - new Date(b.date);
                }
                return 0;
            default:
                return 0;
        }
    });
    
    displayCatalogItems();
}

// Reset filters
function resetFilters() {
    document.getElementById('catalogSearch').value = '';
    document.getElementById('categoryFilter').value = '';
    document.getElementById('priceFilter').value = '';
    document.getElementById('regionFilter').value = '';
    document.getElementById('sortFilter').value = 'relevance';
    
    filteredItems = [...catalogItems];
    currentPage = 1;
    displayCatalogItems();
    updateResultsCount();
    setupPagination();
}

// View toggle
function toggleView(view) {
    currentView = view;
    
    document.querySelectorAll('.view-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`[data-view="${view}"]`).classList.add('active');
    
    const catalogGrid = document.getElementById('catalogGrid');
    catalogGrid.className = view === 'grid' ? 'catalog-grid' : 'catalog-list';
    
    displayCatalogItems();
}

// Display catalog items
function displayCatalogItems() {
    const catalogGrid = document.getElementById('catalogGrid');
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const itemsToShow = filteredItems.slice(startIndex, endIndex);
    
    if (itemsToShow.length === 0) {
        catalogGrid.innerHTML = `
            <div class="no-results">
                <i class="fas fa-search"></i>
                <h3>Aucun résultat trouvé</h3>
                <p>Essayez de modifier vos critères de recherche.</p>
            </div>
        `;
        return;
    }
    
    catalogGrid.innerHTML = itemsToShow.map(item => createItemCard(item)).join('');
}

function createItemCard(item) {
    const cardClass = currentView === 'grid' ? 'catalog-card' : 'catalog-card list-view';
    
    return `
        <div class="${cardClass}" data-id="${item.id}">
            <div class="card-image">
                <img src="${item.image}" alt="${item.title}" loading="lazy">
                <div class="card-category">${getCategoryLabel(item.category)}</div>
                ${item.rating ? `<div class="card-rating"><i class="fas fa-star"></i> ${item.rating}</div>` : ''}
            </div>
            <div class="card-content">
                <h3 class="card-title">${item.title}</h3>
                <p class="card-description">${item.description}</p>
                
                <div class="card-details">
                    ${getItemDetails(item)}
                </div>
                
                <div class="card-footer">
                    <div class="card-price">
                        <span class="price-amount">${item.price.toLocaleString()} FCFA</span>
                        ${item.category === 'transport' ? '<span class="price-unit">par personne</span>' : ''}
                    </div>
                    <div class="card-actions">
                        <button class="btn-secondary" onclick="viewItemDetails('${item.id}')">
                            Détails
                        </button>
                        <button class="btn-primary" onclick="quickBook('${item.id}')">
                            Réserver
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function getCategoryLabel(category) {
    const labels = {
        transport: 'Transport',
        event: 'Événement',
        tour: 'Excursion'
    };
    return labels[category] || category;
}

function getItemDetails(item) {
    switch(item.category) {
        case 'transport':
            return `
                <div class="detail-item">
                    <i class="fas fa-route"></i>
                    <span>${item.departure} → ${item.destination}</span>
                </div>
                <div class="detail-item">
                    <i class="fas fa-clock"></i>
                    <span>${item.duration}</span>
                </div>
                <div class="detail-item">
                    <i class="fas fa-users"></i>
                    <span>${item.availableSeats} places disponibles</span>
                </div>
            `;
        case 'event':
            return `
                <div class="detail-item">
                    <i class="fas fa-calendar"></i>
                    <span>${formatDate(item.date)}</span>
                </div>
                <div class="detail-item">
                    <i class="fas fa-map-marker-alt"></i>
                    <span>${item.venue}</span>
                </div>
                <div class="detail-item">
                    <i class="fas fa-clock"></i>
                    <span>${item.duration}</span>
                </div>
            `;
        case 'tour':
            return `
                <div class="detail-item">
                    <i class="fas fa-calendar"></i>
                    <span>${item.duration}</span>
                </div>
                <div class="detail-item">
                    <i class="fas fa-signal"></i>
                    <span>Difficulté: ${item.difficulty}</span>
                </div>
                <div class="detail-item">
                    <i class="fas fa-users"></i>
                    <span>Max ${item.groupSize} personnes</span>
                </div>
            `;
        default:
            return '';
    }
}

// Item details modal
function viewItemDetails(itemId) {
    const item = catalogItems.find(i => i.id === itemId);
    if (!item) return;
    
    showBookingModal(item, 'details');
}

function quickBook(itemId) {
    const item = catalogItems.find(i => i.id === itemId);
    if (!item) return;
    
    if (!isLoggedIn) {
        alert('Veuillez vous connecter pour réserver');
        showLogin();
        return;
    }
    
    showBookingModal(item, 'booking');
}

function showBookingModal(item, mode) {
    const modal = document.getElementById('bookingModal');
    const content = document.getElementById('bookingModalContent');
    
    if (mode === 'details') {
        content.innerHTML = createDetailsContent(item);
    } else {
        content.innerHTML = createBookingContent(item);
    }
    
    modal.style.display = 'block';
}

function createDetailsContent(item) {
    return `
        <div class="item-details">
            <div class="details-header">
                <img src="${item.image}" alt="${item.title}" class="details-image">
                <div class="details-info">
                    <h2>${item.title}</h2>
                    <div class="details-rating">
                        <i class="fas fa-star"></i> ${item.rating} (${Math.floor(Math.random() * 100)} avis)
                    </div>
                    <div class="details-price">${item.price.toLocaleString()} FCFA</div>
                </div>
            </div>
            
            <div class="details-body">
                <div class="details-section">
                    <h3>Description</h3>
                    <p>${item.description}</p>
                </div>
                
                ${getDetailedInfo(item)}
                
                <div class="details-actions">
                    <button class="btn-primary" onclick="quickBook('${item.id}')">
                        Réserver maintenant
                    </button>
                    <button class="btn-secondary" onclick="addToWishlist('${item.id}')">
                        <i class="fas fa-heart"></i> Ajouter aux favoris
                    </button>
                </div>
            </div>
        </div>
    `;
}

function createBookingContent(item) {
    return `
        <div class="booking-form">
            <h2>Réserver: ${item.title}</h2>
            <form onsubmit="submitBooking(event, '${item.id}')">
                <div class="booking-summary">
                    <img src="${item.image}" alt="${item.title}" class="booking-image">
                    <div class="booking-info">
                        <h4>${item.title}</h4>
                        <p>${item.description}</p>
                        <div class="booking-price">${item.price.toLocaleString()} FCFA</div>
                    </div>
                </div>
                
                ${getBookingFields(item)}
                
                <div class="booking-total">
                    <strong>Total: <span id="bookingTotal">${item.price.toLocaleString()} FCFA</span></strong>
                </div>
                
                <div class="booking-actions">
                    <button type="button" class="btn-secondary" onclick="closeBookingModal()">Annuler</button>
                    <button type="submit" class="btn-primary">Confirmer la réservation</button>
                </div>
            </form>
        </div>
    `;
}

function getDetailedInfo(item) {
    switch(item.category) {
        case 'transport':
            return `
                <div class="details-section">
                    <h3>Informations du voyage</h3>
                    <div class="info-grid">
                        <div class="info-item">
                            <strong>Départ:</strong> ${item.departure}
                        </div>
                        <div class="info-item">
                            <strong>Destination:</strong> ${item.destination}
                        </div>
                        <div class="info-item">
                            <strong>Durée:</strong> ${item.duration}
                        </div>
                        <div class="info-item">
                            <strong>Places disponibles:</strong> ${item.availableSeats}
                        </div>
                    </div>
                </div>
                <div class="details-section">
                    <h3>Équipements</h3>
                    <ul class="amenities-list">
                        ${item.amenities.map(amenity => `<li><i class="fas fa-check"></i> ${amenity}</li>`).join('')}
                    </ul>
                </div>
                <div class="details-section">
                    <h3>Horaires</h3>
                    <div class="schedule-list">
                        ${item.schedule.map(time => `<span class="schedule-time">${time}</span>`).join('')}
                    </div>
                </div>
            `;
        case 'event':
            return `
                <div class="details-section">
                    <h3>Informations de l'év��nement</h3>
                    <div class="info-grid">
                        <div class="info-item">
                            <strong>Date:</strong> ${formatDate(item.date)}
                        </div>
                        <div class="info-item">
                            <strong>Lieu:</strong> ${item.venue}
                        </div>
                        <div class="info-item">
                            <strong>Durée:</strong> ${item.duration}
                        </div>
                        <div class="info-item">
                            <strong>Capacité:</strong> ${item.capacity} personnes
                        </div>
                    </div>
                </div>
            `;
        case 'tour':
            return `
                <div class="details-section">
                    <h3>Informations de l'excursion</h3>
                    <div class="info-grid">
                        <div class="info-item">
                            <strong>Durée:</strong> ${item.duration}
                        </div>
                        <div class="info-item">
                            <strong>Difficulté:</strong> ${item.difficulty}
                        </div>
                        <div class="info-item">
                            <strong>Taille du groupe:</strong> Max ${item.groupSize} personnes
                        </div>
                    </div>
                </div>
                <div class="details-section">
                    <h3>Inclus dans le prix</h3>
                    <ul class="includes-list">
                        ${item.includes.map(include => `<li><i class="fas fa-check"></i> ${include}</li>`).join('')}
                    </ul>
                </div>
                <div class="details-section">
                    <h3>Itinéraire</h3>
                    <ol class="itinerary-list">
                        ${item.itinerary.map(day => `<li>${day}</li>`).join('')}
                    </ol>
                </div>
            `;
    }
}

function getBookingFields(item) {
    let fields = `
        <div class="form-group">
            <label>Nombre de personnes:</label>
            <select id="passengerCount" onchange="updateBookingTotal('${item.id}')">
                <option value="1">1 personne</option>
                <option value="2">2 personnes</option>
                <option value="3">3 personnes</option>
                <option value="4">4 personnes</option>
                <option value="5">5 personnes</option>
            </select>
        </div>
    `;
    
    if (item.category === 'transport') {
        fields += `
            <div class="form-group">
                <label>Horaire de départ:</label>
                <select id="departureTime" required>
                    ${item.schedule.map(time => `<option value="${time}">${time}</option>`).join('')}
                </select>
            </div>
        `;
    }
    
    if (item.category === 'event') {
        fields += `
            <div class="form-group">
                <label>Type de billet:</label>
                <select id="ticketType" onchange="updateBookingTotal('${item.id}')">
                    <option value="standard">Standard - ${item.price.toLocaleString()} FCFA</option>
                    <option value="vip">VIP - ${(item.price * 1.5).toLocaleString()} FCFA</option>
                </select>
            </div>
        `;
    }
    
    fields += `
        <div class="form-group">
            <label>Date souhaitée:</label>
            <input type="date" id="bookingDate" required min="${new Date().toISOString().split('T')[0]}">
        </div>
        
        <div class="form-group">
            <label>Commentaires (optionnel):</label>
            <textarea id="bookingComments" placeholder="Demandes spéciales, allergies, etc."></textarea>
        </div>
    `;
    
    return fields;
}

function updateBookingTotal(itemId) {
    const item = catalogItems.find(i => i.id === itemId);
    const passengerCount = parseInt(document.getElementById('passengerCount').value);
    let basePrice = item.price;
    
    // Check for VIP ticket
    const ticketType = document.getElementById('ticketType');
    if (ticketType && ticketType.value === 'vip') {
        basePrice = item.price * 1.5;
    }
    
    const total = basePrice * passengerCount;
    document.getElementById('bookingTotal').textContent = total.toLocaleString() + ' FCFA';
}

function submitBooking(event, itemId) {
    event.preventDefault();
    
    const item = catalogItems.find(i => i.id === itemId);
    const passengerCount = parseInt(document.getElementById('passengerCount').value);
    const bookingDate = document.getElementById('bookingDate').value;
    
    let basePrice = item.price;
    const ticketType = document.getElementById('ticketType');
    if (ticketType && ticketType.value === 'vip') {
        basePrice = item.price * 1.5;
    }
    
    const totalPrice = basePrice * passengerCount;
    
    const bookingItem = {
        id: `${item.category}_${item.id}_${Date.now()}`,
        originalId: item.id,
        type: item.category,
        name: item.title,
        price: totalPrice,
        quantity: passengerCount,
        date: bookingDate,
        addedAt: new Date().toISOString()
    };
    
    // Add to cart
    cart.push(bookingItem);
    saveCart();
    updateCartCount();
    
    closeBookingModal();
    alert('Réservation ajoutée au panier !');
}

function closeBookingModal() {
    document.getElementById('bookingModal').style.display = 'none';
}

function addToWishlist(itemId) {
    alert('Fonction de favoris en cours de développement');
}

// Pagination
function setupPagination() {
    const paginationContainer = document.getElementById('catalogPagination');
    const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
    
    if (totalPages <= 1) {
        paginationContainer.innerHTML = '';
        return;
    }
    
    let paginationHTML = '';
    
    // Previous button
    if (currentPage > 1) {
        paginationHTML += `<button class="page-btn" onclick="changePage(${currentPage - 1})">Précédent</button>`;
    }
    
    // Page numbers
    for (let i = 1; i <= totalPages; i++) {
        if (i === currentPage) {
            paginationHTML += `<button class="page-btn active">${i}</button>`;
        } else if (i === 1 || i === totalPages || (i >= currentPage - 2 && i <= currentPage + 2)) {
            paginationHTML += `<button class="page-btn" onclick="changePage(${i})">${i}</button>`;
        } else if (i === currentPage - 3 || i === currentPage + 3) {
            paginationHTML += `<span class="page-dots">...</span>`;
        }
    }
    
    // Next button
    if (currentPage < totalPages) {
        paginationHTML += `<button class="page-btn" onclick="changePage(${currentPage + 1})">Suivant</button>`;
    }
    
    paginationContainer.innerHTML = paginationHTML;
}

function changePage(page) {
    currentPage = page;
    displayCatalogItems();
    setupPagination();
    
    // Scroll to top of catalog
    document.querySelector('.catalog-content').scrollIntoView({ behavior: 'smooth' });
}

// Results count
function updateResultsCount() {
    const resultsCount = document.getElementById('resultsCount');
    const total = filteredItems.length;
    const start = (currentPage - 1) * itemsPerPage + 1;
    const end = Math.min(start + itemsPerPage - 1, total);
    
    if (total === 0) {
        resultsCount.textContent = 'Aucun résultat';
    } else {
        resultsCount.textContent = `${start}-${end} sur ${total} résultats`;
    }
}

// Utility function
function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString('fr-FR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

// Add catalog-specific styles
const catalogStyles = `
<style>
/* Catalog Header */
.catalog-header {
    background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%);
    color: white;
    padding: 8rem 0 4rem;
    text-align: center;
}

.catalog-header h1 {
    font-size: 3rem;
    font-weight: 700;
    margin-bottom: 1rem;
}

.catalog-header p {
    font-size: 1.25rem;
    opacity: 0.9;
}

/* Filters */
.catalog-filters {
    background: white;
    padding: 2rem 0;
    border-bottom: 1px solid #e5e7eb;
}

.filter-bar {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
}

.search-section {
    flex: 1;
}

.search-input {
    position: relative;
    max-width: 500px;
}

.search-input i {
    position: absolute;
    left: 1rem;
    top: 50%;
    transform: translateY(-50%);
    color: #6b7280;
}

.search-input input {
    width: 100%;
    padding: 1rem 1rem 1rem 3rem;
    border: 2px solid #e5e7eb;
    border-radius: 0.5rem;
    font-size: 1rem;
}

.search-input input:focus {
    outline: none;
    border-color: #3b82f6;
}

.filter-sections {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    align-items: end;
}

.filter-group {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    min-width: 150px;
}

.filter-group label {
    font-weight: 500;
    color: #374151;
    font-size: 0.9rem;
}

.filter-group select {
    padding: 0.75rem;
    border: 2px solid #e5e7eb;
    border-radius: 0.5rem;
    font-size: 0.9rem;
}

.filter-reset {
    background: #6b7280;
    color: white;
    border: none;
    padding: 0.75rem 1rem;
    border-radius: 0.5rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 0.5rem;
    height: fit-content;
}

.filter-reset:hover {
    background: #374151;
}

/* Catalog Content */
.catalog-content {
    padding: 2rem 0;
}

.results-info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
}

.view-toggle {
    display: flex;
    gap: 0.5rem;
}

.view-btn {
    background: #f3f4f6;
    border: none;
    padding: 0.5rem;
    border-radius: 0.375rem;
    cursor: pointer;
    color: #6b7280;
}

.view-btn.active {
    background: #3b82f6;
    color: white;
}

/* Catalog Grid */
.catalog-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: 2rem;
}

.catalog-list {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
}

.catalog-card {
    background: white;
    border-radius: 1rem;
    overflow: hidden;
    box-shadow: 0 4px 15px rgba(0,0,0,0.1);
    transition: all 0.3s ease;
}

.catalog-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px rgba(0,0,0,0.15);
}

.catalog-card.list-view {
    display: flex;
    flex-direction: row;
}

.catalog-card.list-view .card-image {
    width: 250px;
    flex-shrink: 0;
}

.catalog-card.list-view .card-content {
    flex: 1;
}

.card-image {
    position: relative;
    height: 200px;
    overflow: hidden;
}

.card-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
}

.card-category {
    position: absolute;
    top: 1rem;
    left: 1rem;
    background: rgba(59, 130, 246, 0.9);
    color: white;
    padding: 0.25rem 0.75rem;
    border-radius: 1rem;
    font-size: 0.8rem;
    font-weight: 500;
}

.card-rating {
    position: absolute;
    top: 1rem;
    right: 1rem;
    background: rgba(0, 0, 0, 0.7);
    color: white;
    padding: 0.25rem 0.5rem;
    border-radius: 1rem;
    font-size: 0.8rem;
    display: flex;
    align-items: center;
    gap: 0.25rem;
}

.card-content {
    padding: 1.5rem;
}

.card-title {
    font-size: 1.25rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
    color: #1f2937;
}

.card-description {
    color: #6b7280;
    margin-bottom: 1rem;
    line-height: 1.5;
}

.card-details {
    margin-bottom: 1.5rem;
}

.detail-item {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 0.5rem;
    color: #6b7280;
    font-size: 0.9rem;
}

.detail-item i {
    color: #3b82f6;
    width: 16px;
}

.card-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.card-price {
    display: flex;
    flex-direction: column;
}

.price-amount {
    font-size: 1.25rem;
    font-weight: 700;
    color: #3b82f6;
}

.price-unit {
    font-size: 0.8rem;
    color: #6b7280;
}

.card-actions {
    display: flex;
    gap: 0.5rem;
}

.btn-secondary {
    background: #f3f4f6;
    color: #374151;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 0.375rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.3s ease;
}

.btn-secondary:hover {
    background: #e5e7eb;
}

/* No Results */
.no-results {
    text-align: center;
    padding: 4rem 2rem;
    color: #6b7280;
}

.no-results i {
    font-size: 4rem;
    margin-bottom: 1rem;
    opacity: 0.5;
}

.no-results h3 {
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
    color: #374151;
}

/* Pagination */
.pagination {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;
    margin-top: 3rem;
}

.page-btn {
    background: white;
    border: 2px solid #e5e7eb;
    color: #374151;
    padding: 0.5rem 1rem;
    border-radius: 0.375rem;
    cursor: pointer;
    transition: all 0.3s ease;
}

.page-btn:hover {
    border-color: #3b82f6;
    color: #3b82f6;
}

.page-btn.active {
    background: #3b82f6;
    border-color: #3b82f6;
    color: white;
}

.page-dots {
    color: #6b7280;
    padding: 0.5rem;
}

/* Booking Modal */
.booking-modal-content {
    max-width: 800px;
    max-height: 90vh;
    overflow-y: auto;
}

.item-details {
    max-width: 100%;
}

.details-header {
    display: flex;
    gap: 2rem;
    margin-bottom: 2rem;
}

.details-image {
    width: 200px;
    height: 150px;
    object-fit: cover;
    border-radius: 0.5rem;
    flex-shrink: 0;
}

.details-info h2 {
    margin-bottom: 1rem;
    color: #1f2937;
}

.details-rating {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 0.5rem;
    color: #f59e0b;
}

.details-price {
    font-size: 1.5rem;
    font-weight: 700;
    color: #3b82f6;
}

.details-section {
    margin-bottom: 2rem;
}

.details-section h3 {
    margin-bottom: 1rem;
    color: #1f2937;
    border-bottom: 2px solid #e5e7eb;
    padding-bottom: 0.5rem;
}

.info-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 1rem;
}

.info-item {
    background: #f8fafc;
    padding: 1rem;
    border-radius: 0.5rem;
}

.amenities-list,
.includes-list {
    list-style: none;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 0.5rem;
}

.amenities-list li,
.includes-list li {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem;
}

.amenities-list i,
.includes-list i {
    color: #10b981;
}

.schedule-list {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
}

.schedule-time {
    background: #3b82f6;
    color: white;
    padding: 0.5rem 1rem;
    border-radius: 1rem;
    font-weight: 500;
}

.itinerary-list {
    padding-left: 1.5rem;
}

.itinerary-list li {
    margin-bottom: 0.5rem;
    line-height: 1.6;
}

.details-actions {
    display: flex;
    gap: 1rem;
    justify-content: center;
    margin-top: 2rem;
}

/* Booking Form */
.booking-form h2 {
    margin-bottom: 2rem;
    color: #1f2937;
    text-align: center;
}

.booking-summary {
    display: flex;
    gap: 1rem;
    background: #f8fafc;
    padding: 1.5rem;
    border-radius: 0.5rem;
    margin-bottom: 2rem;
}

.booking-image {
    width: 100px;
    height: 80px;
    object-fit: cover;
    border-radius: 0.375rem;
    flex-shrink: 0;
}

.booking-info h4 {
    margin-bottom: 0.5rem;
    color: #1f2937;
}

.booking-info p {
    color: #6b7280;
    font-size: 0.9rem;
    margin-bottom: 0.5rem;
}

.booking-price {
    font-weight: 700;
    color: #3b82f6;
}

.booking-total {
    text-align: center;
    font-size: 1.25rem;
    margin: 2rem 0;
    padding: 1rem;
    background: #f0f9ff;
    border-radius: 0.5rem;
}

.booking-actions {
    display: flex;
    gap: 1rem;
    justify-content: center;
}

/* Responsive */
@media (max-width: 768px) {
    .catalog-header h1 {
        font-size: 2.5rem;
    }
    
    .filter-sections {
        flex-direction: column;
    }
    
    .results-info {
        flex-direction: column;
        gap: 1rem;
        align-items: stretch;
    }
    
    .catalog-grid {
        grid-template-columns: 1fr;
    }
    
    .catalog-card.list-view {
        flex-direction: column;
    }
    
    .catalog-card.list-view .card-image {
        width: 100%;
        height: 200px;
    }
    
    .details-header {
        flex-direction: column;
    }
    
    .details-image {
        width: 100%;
        height: 200px;
    }
    
    .booking-summary {
        flex-direction: column;
    }
    
    .booking-image {
        width: 100%;
        height: 150px;
    }
}

@media (max-width: 480px) {
    .catalog-header {
        padding: 6rem 0 3rem;
    }
    
    .catalog-header h1 {
        font-size: 2rem;
    }
    
    .card-actions {
        flex-direction: column;
    }
    
    .details-actions,
    .booking-actions {
        flex-direction: column;
    }
}
</style>
`;

// Inject catalog styles
document.head.insertAdjacentHTML('beforeend', catalogStyles);
