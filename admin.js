// Admin Dashboard Functionality
document.addEventListener('DOMContentLoaded', function() {
    initializeAdminDashboard();
});

// Mock data for admin dashboard
const mockBookings = [
    {
        id: 'BK001',
        customer: 'Jean Dupont',
        email: 'jean.dupont@email.com',
        service: 'Yaoundé - Douala',
        type: 'transport',
        date: '2024-12-15',
        amount: 3500,
        status: 'confirmed',
        paymentMethod: 'MTN MoMo'
    },
    {
        id: 'BK002',
        customer: 'Marie Ngono',
        email: 'marie.ngono@email.com',
        service: 'Festival Ngondo',
        type: 'event',
        date: '2024-12-20',
        amount: 5000,
        status: 'pending',
        paymentMethod: 'Orange Money'
    },
    {
        id: 'BK003',
        customer: 'Paul Mbita',
        email: 'paul.mbita@email.com',
        service: 'Mont Cameroun',
        type: 'tour',
        date: '2024-12-25',
        amount: 45000,
        status: 'confirmed',
        paymentMethod: 'MTN MoMo'
    },
    {
        id: 'BK004',
        customer: 'Alice Fomo',
        email: 'alice.fomo@email.com',
        service: 'Douala - Bafoussam',
        type: 'transport',
        date: '2024-12-18',
        amount: 4500,
        status: 'cancelled',
        paymentMethod: 'Orange Money'
    }
];

const mockServices = {
    transport: [
        { id: 'T001', name: 'Yaoundé - Douala', price: 3500, status: 'active' },
        { id: 'T002', name: 'Douala - Bafoussam', price: 4500, status: 'active' },
        { id: 'T003', name: 'Yaoundé - Ngaoundéré', price: 8000, status: 'inactive' }
    ],
    event: [
        { id: 'E001', name: 'Festival Ngondo', price: 5000, status: 'active' },
        { id: 'E002', name: 'Concert Makossa', price: 7500, status: 'active' },
        { id: 'E003', name: 'Fête de la Musique', price: 3000, status: 'inactive' }
    ],
    tour: [
        { id: 'TO001', name: 'Mont Cameroun', price: 45000, status: 'active' },
        { id: 'TO002', name: 'Parc de Waza', price: 35000, status: 'active' },
        { id: 'TO003', name: 'Chutes de la Lobé', price: 25000, status: 'active' }
    ]
};

const mockCustomers = [
    {
        id: 'C001',
        name: 'Jean Dupont',
        email: 'jean.dupont@email.com',
        phone: '+237 671 234 567',
        registeredDate: '2024-10-15',
        bookingsCount: 3
    },
    {
        id: 'C002',
        name: 'Marie Ngono',
        email: 'marie.ngono@email.com',
        phone: '+237 672 345 678',
        registeredDate: '2024-11-02',
        bookingsCount: 1
    },
    {
        id: 'C003',
        name: 'Paul Mbita',
        email: 'paul.mbita@email.com',
        phone: '+237 673 456 789',
        registeredDate: '2024-09-20',
        bookingsCount: 5
    }
];

function initializeAdminDashboard() {
    // Initialize navigation
    initializeAdminNavigation();
    
    // Load dashboard data
    loadDashboardStats();
    loadRecentActivity();
    loadBookingsTable();
    loadServicesData();
    loadCustomersTable();
    
    // Set up auto-refresh
    setInterval(updateDashboardStats, 30000); // Update every 30 seconds
}

function initializeAdminNavigation() {
    const navLinks = document.querySelectorAll('.admin-nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            if (this.dataset.section) {
                e.preventDefault();
                showSection(this.dataset.section);
                
                // Update active nav link
                navLinks.forEach(l => l.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });

    // Service type change handler for modal
    const serviceTypeSelect = document.getElementById('serviceType');
    if (serviceTypeSelect) {
        serviceTypeSelect.addEventListener('change', function() {
            showServiceFields(this.value);
        });
    }
}

function showSection(sectionId) {
    // Hide all sections
    document.querySelectorAll('.admin-section').forEach(section => {
        section.classList.remove('active');
    });
    
    // Show target section
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
    }
    
    // Update URL hash
    window.location.hash = sectionId;
}

function loadDashboardStats() {
    // Calculate stats from mock data
    const stats = {
        totalBookings: mockBookings.length,
        todayBookings: mockBookings.filter(b => b.date === new Date().toISOString().split('T')[0]).length,
        totalRevenue: mockBookings.filter(b => b.status === 'confirmed').reduce((sum, b) => sum + b.amount, 0),
        activeCustomers: mockCustomers.length
    };
    
    // Update stats display
    document.getElementById('totalBookings').textContent = stats.totalBookings;
    document.getElementById('todayBookings').textContent = stats.todayBookings;
    document.getElementById('totalRevenue').textContent = stats.totalRevenue.toLocaleString();
    document.getElementById('activeCustomers').textContent = stats.activeCustomers;
}

function updateDashboardStats() {
    // Simulate real-time updates
    const currentBookings = parseInt(document.getElementById('totalBookings').textContent);
    const currentRevenue = parseInt(document.getElementById('totalRevenue').textContent.replace(/,/g, ''));
    
    // Random small increments
    if (Math.random() > 0.7) {
        document.getElementById('totalBookings').textContent = currentBookings + 1;
        document.getElementById('totalRevenue').textContent = (currentRevenue + 3500).toLocaleString();
    }
}

function loadRecentActivity() {
    const activityContainer = document.getElementById('recentActivity');
    const activities = [
        { type: 'booking', message: 'Nouvelle réservation #BK005 par Sophie Talla', time: '5 min' },
        { type: 'payment', message: 'Paiement confirmé pour #BK003', time: '12 min' },
        { type: 'cancellation', message: 'Annulation de #BK004 par Alice Fomo', time: '25 min' },
        { type: 'registration', message: 'Nouveau client inscrit: Michel Kouam', time: '1h' },
        { type: 'service', message: 'Service Yaoundé-Garoua ajouté', time: '2h' }
    ];
    
    activityContainer.innerHTML = activities.map(activity => `
        <div class="activity-item">
            <div class="activity-icon ${activity.type}">
                <i class="fas fa-${getActivityIcon(activity.type)}"></i>
            </div>
            <div class="activity-content">
                <p>${activity.message}</p>
                <span class="activity-time">Il y a ${activity.time}</span>
            </div>
        </div>
    `).join('');
}

function getActivityIcon(type) {
    const icons = {
        booking: 'ticket-alt',
        payment: 'credit-card',
        cancellation: 'times-circle',
        registration: 'user-plus',
        service: 'plus-circle'
    };
    return icons[type] || 'info-circle';
}

function loadBookingsTable() {
    const tableBody = document.getElementById('bookingsTableBody');
    
    tableBody.innerHTML = mockBookings.map(booking => `
        <tr>
            <td>${booking.id}</td>
            <td>${booking.customer}</td>
            <td>${booking.service}</td>
            <td>${formatDate(booking.date)}</td>
            <td>${booking.amount.toLocaleString()} FCFA</td>
            <td><span class="status-badge status-${booking.status}">${getStatusText(booking.status)}</span></td>
            <td>
                <button class="action-btn" onclick="viewBookingDetails('${booking.id}')" title="Voir détails">
                    <i class="fas fa-eye"></i>
                </button>
                <button class="action-btn" onclick="editBooking('${booking.id}')" title="Modifier">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="action-btn delete" onclick="cancelBooking('${booking.id}')" title="Annuler">
                    <i class="fas fa-times"></i>
                </button>
            </td>
        </tr>
    `).join('');
}

function loadServicesData() {
    Object.keys(mockServices).forEach(type => {
        const container = document.getElementById(`${type}Services`);
        container.innerHTML = mockServices[type].map(service => `
            <div class="service-item">
                <div class="service-info">
                    <h4>${service.name}</h4>
                    <p>${service.price.toLocaleString()} FCFA</p>
                    <span class="service-status ${service.status}">${service.status === 'active' ? 'Actif' : 'Inactif'}</span>
                </div>
                <div class="service-actions">
                    <button onclick="editService('${service.id}')" title="Modifier">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button onclick="toggleServiceStatus('${service.id}')" title="Activer/Désactiver">
                        <i class="fas fa-power-off"></i>
                    </button>
                    <button onclick="deleteService('${service.id}')" title="Supprimer">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `).join('');
    });
}

function loadCustomersTable() {
    const tableBody = document.getElementById('customersTableBody');
    
    tableBody.innerHTML = mockCustomers.map(customer => `
        <tr>
            <td>${customer.id}</td>
            <td>${customer.name}</td>
            <td>${customer.email}</td>
            <td>${customer.phone}</td>
            <td>${formatDate(customer.registeredDate)}</td>
            <td>${customer.bookingsCount}</td>
            <td>
                <button class="action-btn" onclick="viewCustomerDetails('${customer.id}')" title="Voir détails">
                    <i class="fas fa-eye"></i>
                </button>
                <button class="action-btn" onclick="contactCustomer('${customer.id}')" title="Contacter">
                    <i class="fas fa-envelope"></i>
                </button>
            </td>
        </tr>
    `).join('');
}

// Utility functions
function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString('fr-FR');
}

function getStatusText(status) {
    const statusTexts = {
        confirmed: 'Confirmé',
        pending: 'En attente',
        cancelled: 'Annulé'
    };
    return statusTexts[status] || status;
}

// Booking management functions
function filterBookings() {
    const statusFilter = document.getElementById('statusFilter').value;
    const dateFilter = document.getElementById('dateFilter').value;
    const typeFilter = document.getElementById('typeFilter').value;
    
    let filteredBookings = mockBookings;
    
    if (statusFilter) {
        filteredBookings = filteredBookings.filter(b => b.status === statusFilter);
    }
    
    if (dateFilter) {
        filteredBookings = filteredBookings.filter(b => b.date === dateFilter);
    }
    
    if (typeFilter) {
        filteredBookings = filteredBookings.filter(b => b.type === typeFilter);
    }
    
    // Update table with filtered results
    updateBookingsTable(filteredBookings);
}

function searchBookings() {
    const searchTerm = document.getElementById('searchBookings').value.toLowerCase();
    
    const filteredBookings = mockBookings.filter(booking => 
        booking.customer.toLowerCase().includes(searchTerm) ||
        booking.service.toLowerCase().includes(searchTerm) ||
        booking.id.toLowerCase().includes(searchTerm)
    );
    
    updateBookingsTable(filteredBookings);
}

function updateBookingsTable(bookings) {
    const tableBody = document.getElementById('bookingsTableBody');
    
    tableBody.innerHTML = bookings.map(booking => `
        <tr>
            <td>${booking.id}</td>
            <td>${booking.customer}</td>
            <td>${booking.service}</td>
            <td>${formatDate(booking.date)}</td>
            <td>${booking.amount.toLocaleString()} FCFA</td>
            <td><span class="status-badge status-${booking.status}">${getStatusText(booking.status)}</span></td>
            <td>
                <button class="action-btn" onclick="viewBookingDetails('${booking.id}')" title="Voir détails">
                    <i class="fas fa-eye"></i>
                </button>
                <button class="action-btn" onclick="editBooking('${booking.id}')" title="Modifier">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="action-btn delete" onclick="cancelBooking('${booking.id}')" title="Annuler">
                    <i class="fas fa-times"></i>
                </button>
            </td>
        </tr>
    `).join('');
}

// Action functions
function viewBookingDetails(bookingId) {
    const booking = mockBookings.find(b => b.id === bookingId);
    if (booking) {
        alert(`Détails de la réservation ${bookingId}:\n\nClient: ${booking.customer}\nService: ${booking.service}\nDate: ${booking.date}\nMontant: ${booking.amount} FCFA\nStatut: ${getStatusText(booking.status)}\nPaiement: ${booking.paymentMethod}`);
    }
}

function editBooking(bookingId) {
    alert(`Fonction de modification pour la réservation ${bookingId} en cours de développement.`);
}

function cancelBooking(bookingId) {
    if (confirm(`Êtes-vous sûr de vouloir annuler la réservation ${bookingId} ?`)) {
        const bookingIndex = mockBookings.findIndex(b => b.id === bookingId);
        if (bookingIndex !== -1) {
            mockBookings[bookingIndex].status = 'cancelled';
            loadBookingsTable();
            alert('Réservation annulée avec succès.');
        }
    }
}

// Service management functions
function addService(type) {
    showAddServiceModal();
    document.getElementById('serviceType').value = type;
    showServiceFields(type);
}

function showAddServiceModal() {
    document.getElementById('addServiceModal').style.display = 'block';
}

function showServiceFields(type) {
    // Hide all service-specific fields
    document.getElementById('transportFields').style.display = 'none';
    document.getElementById('eventFields').style.display = 'none';
    document.getElementById('tourFields').style.display = 'none';
    
    // Show relevant fields
    if (type) {
        document.getElementById(`${type}Fields`).style.display = 'block';
    }
}

function handleAddService(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const serviceData = {
        id: `${document.getElementById('serviceType').value.toUpperCase()}${Date.now()}`,
        name: document.getElementById('serviceName').value,
        description: document.getElementById('serviceDescription').value,
        price: parseInt(document.getElementById('servicePrice').value),
        type: document.getElementById('serviceType').value,
        status: 'active'
    };
    
    // Add to mock data
    mockServices[serviceData.type].push(serviceData);
    
    // Refresh services display
    loadServicesData();
    
    // Close modal and reset form
    closeModal('addServiceModal');
    event.target.reset();
    
    alert('Service ajouté avec succès !');
}

function editService(serviceId) {
    alert(`Fonction de modification du service ${serviceId} en cours de développement.`);
}

function toggleServiceStatus(serviceId) {
    alert(`Fonction de changement de statut du service ${serviceId} en cours de développement.`);
}

function deleteService(serviceId) {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce service ?')) {
        alert(`Service ${serviceId} supprimé.`);
    }
}

// Customer management functions
function viewCustomerDetails(customerId) {
    const customer = mockCustomers.find(c => c.id === customerId);
    if (customer) {
        alert(`Détails du client ${customerId}:\n\nNom: ${customer.name}\nEmail: ${customer.email}\nTéléphone: ${customer.phone}\nInscrit le: ${customer.registeredDate}\nNombre de réservations: ${customer.bookingsCount}`);
    }
}

function contactCustomer(customerId) {
    const customer = mockCustomers.find(c => c.id === customerId);
    if (customer) {
        window.location.href = `mailto:${customer.email}?subject=Contact depuis 237Travel Admin`;
    }
}

// Report functions
function updateReports() {
    const period = document.getElementById('reportPeriod').value;
    const type = document.getElementById('reportType').value;
    
    // Simulate report generation
    const reportSummary = document.getElementById('reportSummary');
    reportSummary.innerHTML = `
        <h4>Rapport ${type} - ${period}</h4>
        <div class="report-stats">
            <div class="report-stat">
                <h5>Total</h5>
                <p>${Math.floor(Math.random() * 1000000).toLocaleString()} FCFA</p>
            </div>
            <div class="report-stat">
                <h5>Croissance</h5>
                <p>+${Math.floor(Math.random() * 50)}%</p>
            </div>
            <div class="report-stat">
                <h5>Transactions</h5>
                <p>${Math.floor(Math.random() * 500)}</p>
            </div>
        </div>
    `;
}

function generateReport() {
    alert('Génération du rapport en cours...');
    setTimeout(() => {
        alert('Rapport généré et sauvegardé !');
    }, 2000);
}

function exportData() {
    alert('Export des données en cours...');
    setTimeout(() => {
        alert('Données exportées avec succès !');
    }, 1500);
}

// Utility functions
function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    // Load section from URL hash
    const hash = window.location.hash.substring(1);
    if (hash && document.getElementById(hash)) {
        showSection(hash);
        
        // Update nav
        document.querySelectorAll('.admin-nav-link').forEach(link => {
            link.classList.remove('active');
            if (link.dataset.section === hash) {
                link.classList.add('active');
            }
        });
    }
    
    // Update reports on page load
    setTimeout(updateReports, 500);
});

// Add admin-specific styles
const adminStyles = `
<style>
/* Activity items */
.activity-item {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1rem;
    border-bottom: 1px solid #e5e7eb;
}

.activity-icon {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
}

.activity-icon.booking { background: #3b82f6; }
.activity-icon.payment { background: #10b981; }
.activity-icon.cancellation { background: #ef4444; }
.activity-icon.registration { background: #8b5cf6; }
.activity-icon.service { background: #f59e0b; }

.activity-content {
    flex: 1;
}

.activity-content p {
    margin: 0 0 0.25rem 0;
    font-weight: 500;
}

.activity-time {
    font-size: 0.8rem;
    color: #6b7280;
}

/* Action buttons */
.action-btn {
    background: #3b82f6;
    color: white;
    border: none;
    padding: 0.5rem;
    border-radius: 0.375rem;
    cursor: pointer;
    margin-right: 0.25rem;
}

.action-btn:hover {
    background: #2563eb;
}

.action-btn.delete {
    background: #ef4444;
}

.action-btn.delete:hover {
    background: #dc2626;
}

/* Service items */
.service-item {
    background: white;
    padding: 1rem;
    border-radius: 0.5rem;
    border: 1px solid #e5e7eb;
    margin-bottom: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.service-info h4 {
    margin: 0 0 0.25rem 0;
    color: #1f2937;
}

.service-info p {
    margin: 0 0 0.25rem 0;
    color: #3b82f6;
    font-weight: 600;
}

.service-status {
    padding: 0.25rem 0.5rem;
    border-radius: 1rem;
    font-size: 0.75rem;
    font-weight: 500;
}

.service-status.active {
    background: #dcfce7;
    color: #166534;
}

.service-status.inactive {
    background: #fee2e2;
    color: #991b1b;
}

.service-actions {
    display: flex;
    gap: 0.25rem;
}

.service-actions button {
    background: #6b7280;
    color: white;
    border: none;
    padding: 0.5rem;
    border-radius: 0.375rem;
    cursor: pointer;
}

.service-actions button:hover {
    background: #374151;
}

/* Filter groups */
.booking-filters,
.report-filters {
    display: flex;
    gap: 1rem;
    margin-bottom: 2rem;
    flex-wrap: wrap;
}

.filter-group {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
}

.filter-group label {
    font-weight: 500;
    color: #374151;
    font-size: 0.9rem;
}

.filter-group input,
.filter-group select {
    padding: 0.5rem;
    border: 1px solid #d1d5db;
    border-radius: 0.375rem;
    min-width: 150px;
}

/* Action buttons */
.action-buttons {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
}

.action-buttons .btn-primary {
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

/* Charts */
.charts-container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
    margin-bottom: 2rem;
}

.chart-card {
    background: white;
    padding: 2rem;
    border-radius: 1rem;
    box-shadow: 0 4px 15px rgba(0,0,0,0.1);
}

.chart-placeholder {
    height: 200px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    color: #6b7280;
    border: 2px dashed #d1d5db;
    border-radius: 0.5rem;
}

.chart-placeholder i {
    font-size: 3rem;
    margin-bottom: 1rem;
}

/* Settings */
.settings-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    gap: 2rem;
}

.settings-card {
    background: white;
    padding: 2rem;
    border-radius: 1rem;
    box-shadow: 0 4px 15px rgba(0,0,0,0.1);
}

.settings-form .form-group {
    margin-bottom: 1rem;
}

.settings-form label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 500;
    color: #374151;
}

.settings-form input {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #d1d5db;
    border-radius: 0.375rem;
}

/* Report stats */
.report-stats {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 1rem;
    margin-top: 1rem;
}

.report-stat {
    background: #f8fafc;
    padding: 1rem;
    border-radius: 0.5rem;
    text-align: center;
}

.report-stat h5 {
    margin: 0 0 0.5rem 0;
    color: #6b7280;
}

.report-stat p {
    margin: 0;
    font-size: 1.5rem;
    font-weight: 700;
    color: #1f2937;
}
</style>
`;

// Inject admin styles
document.head.insertAdjacentHTML('beforeend', adminStyles);
