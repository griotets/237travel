// Support page functionality
document.addEventListener('DOMContentLoaded', function() {
    initializeSupportFeatures();
});

function initializeSupportFeatures() {
    // Update cart count from main script
    updateCartCount();
    
    // Initialize chat
    initializeChat();
}

// FAQ Functions
function toggleFAQ(element) {
    const faqItem = element.parentElement;
    const answer = faqItem.querySelector('.faq-answer');
    const icon = element.querySelector('i');
    
    // Close all other FAQs
    document.querySelectorAll('.faq-item').forEach(item => {
        if (item !== faqItem) {
            item.querySelector('.faq-answer').classList.remove('active');
            item.querySelector('.faq-question').classList.remove('active');
        }
    });
    
    // Toggle current FAQ
    answer.classList.toggle('active');
    element.classList.toggle('active');
}

function filterFAQ() {
    const searchTerm = document.getElementById('helpSearch').value.toLowerCase();
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question span').textContent.toLowerCase();
        const answer = item.querySelector('.faq-answer').textContent.toLowerCase();
        const keywords = item.dataset.keywords.toLowerCase();
        
        if (question.includes(searchTerm) || answer.includes(searchTerm) || keywords.includes(searchTerm)) {
            item.style.display = 'block';
            
            // Highlight search term if found
            if (searchTerm.length > 2) {
                highlightSearchTerm(item, searchTerm);
            }
        } else {
            item.style.display = 'none';
        }
    });
}

function highlightSearchTerm(element, term) {
    // Simple highlighting function
    const questionText = element.querySelector('.faq-question span');
    const originalText = questionText.textContent;
    const highlightedText = originalText.replace(
        new RegExp(term, 'gi'),
        `<mark>$&</mark>`
    );
    questionText.innerHTML = highlightedText;
}

// Contact Form
function handleContactForm(event) {
    event.preventDefault();
    
    const formData = {
        name: document.getElementById('contactName').value,
        email: document.getElementById('contactEmail').value,
        subject: document.getElementById('contactSubject').value,
        message: document.getElementById('contactMessage').value,
        timestamp: new Date().toISOString()
    };
    
    // Simulate form submission
    alert('Merci pour votre message ! Nous vous répondrons dans les plus brefs délais.');
    
    // Store in localStorage for demo
    const messages = JSON.parse(localStorage.getItem('contactMessages')) || [];
    messages.push(formData);
    localStorage.setItem('contactMessages', JSON.stringify(messages));
    
    // Reset form
    event.target.reset();
}

// Live Chat Functionality
let chatMessages = [
    { type: 'bot', message: 'Bonjour ! Comment puis-je vous aider aujourd\'hui ?', timestamp: new Date() }
];

function initializeChat() {
    // Add some predefined responses
    window.chatResponses = {
        'bonjour': 'Bonjour ! Comment puis-je vous aider ?',
        'hello': 'Hello ! How can I help you?',
        'réservation': 'Pour faire une réservation, utilisez notre formulaire de recherche sur la page d\'accueil. Avez-vous besoin d\'aide avec quelque chose de spécifique ?',
        'paiement': 'Nous acceptons MTN Mobile Money et Orange Money. Le paiement est sécurisé et instantané.',
        'annulation': 'Vous pouvez annuler votre réservation jusqu\'à 24h avant le départ pour un remboursement complet. Voulez-vous que je vous aide ?',
        'billet': 'Votre e-ticket est disponible dans votre compte, section "Mes Billets". Il contient un QR code à présenter lors du voyage.',
        'problème': 'Je suis désolé d\'apprendre que vous avez un problème. Pouvez-vous me donner plus de détails pour que je puisse vous aider ?',
        'merci': 'De rien ! N\'hésitez pas si vous avez d\'autres questions.',
        'au revoir': 'Au revoir ! Bon voyage avec 237Travel !',
        'contact': 'Vous pouvez nous contacter au +237 6XX XXX XXX ou par email à support@237travel.cm'
    };
}

function toggleChat() {
    const chatWindow = document.getElementById('chatWindow');
    chatWindow.classList.toggle('hidden');
    
    if (!chatWindow.classList.contains('hidden')) {
        document.getElementById('chatInput').focus();
    }
}

function handleChatEnter(event) {
    if (event.key === 'Enter') {
        sendChatMessage();
    }
}

function sendChatMessage() {
    const input = document.getElementById('chatInput');
    const message = input.value.trim();
    
    if (!message) return;
    
    // Add user message
    addChatMessage('user', message);
    input.value = '';
    
    // Simulate bot response
    setTimeout(() => {
        const botResponse = generateBotResponse(message);
        addChatMessage('bot', botResponse);
    }, 1000);
}

function addChatMessage(type, message) {
    const messagesContainer = document.getElementById('chatMessages');
    const messageElement = document.createElement('div');
    messageElement.className = `chat-message ${type}`;
    
    const timestamp = new Date().toLocaleTimeString('fr-FR', { 
        hour: '2-digit', 
        minute: '2-digit' 
    });
    
    messageElement.innerHTML = `
        <p>${message}</p>
        <span class="message-time">${timestamp}</span>
    `;
    
    messagesContainer.appendChild(messageElement);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
    
    // Store message
    chatMessages.push({
        type: type,
        message: message,
        timestamp: new Date()
    });
}

function generateBotResponse(userMessage) {
    const message = userMessage.toLowerCase();
    
    // Check for keywords in predefined responses
    for (const [keyword, response] of Object.entries(window.chatResponses)) {
        if (message.includes(keyword)) {
            return response;
        }
    }
    
    // Default responses based on message content
    if (message.includes('?')) {
        return 'C\'est une excellente question ! Pour une réponse détaillée, je vous recommande de consulter notre FAQ ci-dessus ou de contacter notre équipe support.';
    }
    
    if (message.length > 50) {
        return 'Merci pour ces détails. Notre équipe va examiner votre demande. En attendant, avez-vous consulté notre FAQ ? Elle contient peut-être la réponse à votre question.';
    }
    
    return 'Je comprends. Pour vous aider au mieux, pouvez-vous me donner plus de détails ou consulter notre FAQ ci-dessus ? Vous pouvez aussi contacter notre équipe support directement.';
}

// Additional styles for support page elements
const supportStyles = `
<style>
/* Support Header */
.support-header {
    background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%);
    color: white;
    padding: 8rem 0 4rem;
    text-align: center;
}

.support-header h1 {
    font-size: 3rem;
    font-weight: 700;
    margin-bottom: 1rem;
}

.support-header p {
    font-size: 1.25rem;
    margin-bottom: 2rem;
    opacity: 0.9;
}

.help-search {
    position: relative;
    max-width: 500px;
    margin: 0 auto;
}

.help-search input {
    width: 100%;
    padding: 1rem 1rem 1rem 3rem;
    border: none;
    border-radius: 2rem;
    font-size: 1.1rem;
    box-shadow: 0 4px 15px rgba(0,0,0,0.1);
}

.help-search i {
    position: absolute;
    left: 1rem;
    top: 50%;
    transform: translateY(-50%);
    color: #6b7280;
}

/* FAQ Section */
.faq-section {
    padding: 4rem 0;
}

/* Contact Section */
.contact-section {
    padding: 4rem 0;
    background: #f8fafc;
}

.contact-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 3rem;
    align-items: start;
}

.contact-info h3 {
    margin-bottom: 2rem;
    color: #1f2937;
}

.contact-item {
    display: flex;
    align-items: flex-start;
    gap: 1rem;
    margin-bottom: 2rem;
}

.contact-item i {
    color: #3b82f6;
    font-size: 1.25rem;
    margin-top: 0.25rem;
}

.contact-item strong {
    display: block;
    color: #1f2937;
    margin-bottom: 0.25rem;
}

.contact-item p {
    color: #6b7280;
    margin: 0;
    line-height: 1.5;
}

/* Live Chat */
.live-chat {
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    z-index: 1000;
}

.chat-button {
    background: #3b82f6;
    color: white;
    padding: 1rem 1.5rem;
    border-radius: 2rem;
    cursor: pointer;
    box-shadow: 0 4px 15px rgba(59, 130, 246, 0.3);
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-weight: 500;
    transition: all 0.3s ease;
}

.chat-button:hover {
    background: #2563eb;
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(59, 130, 246, 0.4);
}

.chat-window {
    position: absolute;
    bottom: 5rem;
    right: 0;
    width: 350px;
    height: 400px;
    background: white;
    border-radius: 1rem;
    box-shadow: 0 10px 30px rgba(0,0,0,0.2);
    display: flex;
    flex-direction: column;
    overflow: hidden;
}

.chat-header {
    background: #3b82f6;
    color: white;
    padding: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.chat-header h4 {
    margin: 0;
    font-size: 1.1rem;
}

.chat-header button {
    background: none;
    border: none;
    color: white;
    cursor: pointer;
    font-size: 1.2rem;
}

.chat-messages {
    flex: 1;
    padding: 1rem;
    overflow-y: auto;
    background: #f8fafc;
}

.chat-message {
    margin-bottom: 1rem;
    max-width: 80%;
}

.chat-message.user {
    margin-left: auto;
    text-align: right;
}

.chat-message p {
    background: white;
    padding: 0.75rem 1rem;
    border-radius: 1rem;
    margin: 0 0 0.25rem 0;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.chat-message.user p {
    background: #3b82f6;
    color: white;
    border-bottom-right-radius: 0.25rem;
}

.chat-message.bot p {
    border-bottom-left-radius: 0.25rem;
}

.message-time {
    font-size: 0.7rem;
    color: #6b7280;
}

.chat-input {
    display: flex;
    padding: 1rem;
    border-top: 1px solid #e5e7eb;
    background: white;
}

.chat-input input {
    flex: 1;
    border: 1px solid #e5e7eb;
    border-radius: 1rem;
    padding: 0.5rem 1rem;
    margin-right: 0.5rem;
}

.chat-input button {
    background: #3b82f6;
    color: white;
    border: none;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
}

/* Responsive */
@media (max-width: 768px) {
    .support-header h1 {
        font-size: 2.5rem;
    }
    
    .contact-grid {
        grid-template-columns: 1fr;
        gap: 2rem;
    }
    
    .chat-window {
        width: 300px;
        height: 350px;
    }
    
    .live-chat {
        bottom: 1rem;
        right: 1rem;
    }
}

@media (max-width: 480px) {
    .support-header {
        padding: 6rem 0 3rem;
    }
    
    .support-header h1 {
        font-size: 2rem;
    }
    
    .chat-window {
        width: calc(100vw - 2rem);
        right: -1rem;
    }
}
</style>
`;

// Inject styles
document.head.insertAdjacentHTML('beforeend', supportStyles);
