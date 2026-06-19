JavaScript
/* ==========================================================================
   AGRO SUSTENTÁVEL - INTERATIVIDADE DO SITE
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    initScrollAnimation();
    initMobileMenu();
    initNewsletterForm();
    initCardEffects();
});

/**
 * 1. ROLAGEM SUAVE CORRIGIDA E ANIMAÇÃO AO ROLAR
 * Faz com que os elementos apareçam suavemente na tela à medida que o usuário rola a página.
 */
function initScrollAnimation() {
    const cards = document.querySelectorAll('.card');
    
    const checkVisibility = () => {
        const triggerBottom = window.innerHeight * 0.85;
        
        cards.forEach(card => {
            const cardTop = card.getBoundingClientRect().top;
            
            if (cardTop < triggerBottom) {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }
        });
    };

    // Configuração inicial para a animação dos cards
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });

    window.addEventListener('scroll', checkVisibility);
    checkVisibility(); // Executa uma vez no início
}

/**
 * 2. MENU MOBILE AUTOMÁTICO (RESPONSIVIDADE)
 * Permite fechar o menu ao clicar em um link em dispositivos móveis.
 */
function initMobileMenu() {
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            // Se você futuramente adicionar um botão de menu hambúrguer, 
            // este trecho garantirá que o menu feche ao clicar em um link.
            const nav = document.querySelector('.nav-links');
            if (nav.classList.contains('active')) {
                nav.classList.remove('active');
            }
        });
    });
}

/**
 * 3. VALIDAÇÃO E ENVIO DO FORMULÁRIO DE NEWSLETTER
 * Captura o e-mail do usuário, valida o formato e simula o envio salvando no LocalStorage.
 */
function initNewsletterForm() {
    const form = document.getElementById('newsletterForm');
    if (!form) return;

    form.addEventListener('submit', (event) => {
        event.preventDefault(); // Impede o recarregamento da página
        
        const emailInput = document.getElementById('emailInput');
        const email = emailInput.value.trim();

        // Validação simples de e-mail por Regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (!emailRegex.test(email)) {
            exibirMensagem('Por favor, insira um e-mail válido.', 'error');
            return;
        }

        // Simulação de salvamento de dados (LocalStorage)
        salvarLead(email);

        // Feedback visual para o usuário
        exibirMensagem(`Sucesso! O e-mail ${email} foi cadastrado para receber nossas novidades.`, 'success');
        form.reset();
    });
}

/**
 * 4. INTERATIVIDADE NOS CARDS DE TECNOLOGIA
 * Exibe informações extras de forma elegante em vez de usar um 'alert' simples.
 */
function initCardEffects() {
    const cards = document.querySelectorAll('.card');
    
    cards.forEach(card => {
        card.addEventListener('click', () => {
            const titulo = card.querySelector('h3').innerText;
            
            // Criando um modal dinâmico simples ou aviso na tela
            exibirMensagem(`Você selecionou: ${titulo}. Carregando artigos relacionados...`, 'info');
        });
    });
}

/* ==========================================================================
   FUNÇÕES AUXILIARES / UTILITÁRIAS
   ========================================================================== */

// Função para simular o armazenamento dos e-mails capturados
function salvarLead(email) {
    let leads = JSON.parse(localStorage.getItem('agroLeads')) || [];
    if (!leads.includes(email)) {
        leads.push(email);
        localStorage.setItem('agroLeads', JSON.stringify(leads));
    }
}

// Cria um balão de notificação moderno na tela (Toast)
function exibirMensagem(texto, tipo) {
    // Remove notificação anterior se existir
    const toastExistente = document.querySelector('.toast-notificacao');
    if (toastExistente) toastExistente.remove();

    const toast = document.createElement('div');
    toast.className = `toast-notificacao ${tipo}`;
    toast.innerText = texto;

    // Estilização rápida via JS para manter o arquivo CSS limpo
    Object.assign(toast.style, {
        position: 'fixed',
        bottom: '20px',
        right: '20px',
        padding: '15px 25px',
        borderRadius: '5px',
        color: '#fff',
        fontWeight: 'bold',
        zIndex: '10000',
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        transition: 'opacity 0.3s ease',
        backgroundColor: tipo === 'success' ? '#2d6a4f' : tipo === 'error' ? '#d90429' : '#3a86ff'
    });

    document.body.appendChild(toast);

    // Some após 4 segundos
    setTimeout(() => {
        toast.style.opacity = '0';
        setTimeout(() => toast.remove(), 300);
    }, 4000);
    
} 