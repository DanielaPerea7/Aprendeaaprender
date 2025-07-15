// Esperar a que el DOM esté cargado
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar todas las funcionalidades
    initFAQ();
    initScrollEffects();
    initAnimations();
    initCTAButtons();
    initMobileMenu();
});

// Funcionalidad del FAQ
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        
        question.addEventListener('click', () => {
            // Cerrar otros FAQ items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    const otherQuestion = otherItem.querySelector('.faq-question');
                    const otherAnswer = otherItem.querySelector('.faq-answer');
                    otherQuestion.classList.remove('active');
                    otherAnswer.classList.remove('active');
                }
            });
            
            // Toggle el item actual
            question.classList.toggle('active');
            answer.classList.toggle('active');
        });
    });
}

// Efectos de scroll
function initScrollEffects() {
    // Scroll suave para los enlaces del menú
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetSection = document.querySelector(href);
                
                if (targetSection) {
                    targetSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
    
    // Botón volver al principio
    const scrollTopBtn = document.querySelector('.scroll-top');
    
    if (scrollTopBtn) {
        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Mostrar/ocultar el botón de scroll según la posición
    window.addEventListener('scroll', () => {
        if (scrollTopBtn) {
            if (window.scrollY > 300) {
                scrollTopBtn.style.opacity = '1';
            } else {
                scrollTopBtn.style.opacity = '0.7';
            }
        }
        
        // Efecto parallax sutil en el hero
        const hero = document.querySelector('.hero');
        if (hero) {
            const scrolled = window.pageYOffset;
            const parallax = scrolled * 0.1;
            hero.style.transform = `translateY(${parallax}px)`;
        }
    });
}

// Animaciones de entrada
function initAnimations() {
    // Observador de intersección para animaciones
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observar elementos que queremos animar
    const animatedElements = document.querySelectorAll('.stat-item, .feature-card, .faq-item');
    
    animatedElements.forEach(el => {
        observer.observe(el);
    });
    
    // Añadir estilos CSS para las animaciones
    const style = document.createElement('style');
    style.textContent = `
        .stat-item, .feature-card, .faq-item {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .stat-item.animate-in, .feature-card.animate-in, .faq-item.animate-in {
            opacity: 1;
            transform: translateY(0);
        }
        
        .stat-item:nth-child(1) { transition-delay: 0.1s; }
        .stat-item:nth-child(2) { transition-delay: 0.2s; }
        .stat-item:nth-child(3) { transition-delay: 0.3s; }
        .stat-item:nth-child(4) { transition-delay: 0.4s; }
        
        .feature-card:nth-child(1) { transition-delay: 0.1s; }
        .feature-card:nth-child(2) { transition-delay: 0.2s; }
        .feature-card:nth-child(3) { transition-delay: 0.3s; }
        .feature-card:nth-child(4) { transition-delay: 0.4s; }
        .feature-card:nth-child(5) { transition-delay: 0.5s; }
        .feature-card:nth-child(6) { transition-delay: 0.6s; }
    `;
    document.head.appendChild(style);
}

// Funcionalidad de los botones CTA
function initCTAButtons() {
    const ctaButtons = document.querySelectorAll('.cta-button, .cta-button-secondary');
    
    ctaButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Determinar qué tipo de botón se clickeó
            const buttonText = this.textContent.toLowerCase();
            
            // Efecto de ripple
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s linear;
                background-color: rgba(255, 255, 255, 0.7);
                left: ${x}px;
                top: ${y}px;
                width: ${size}px;
                height: ${size}px;
                pointer-events: none;
            `;
            
            this.style.position = 'relative';
            this.style.overflow = 'hidden';
            this.appendChild(ripple);
            
            // Remover el ripple después de la animación
            setTimeout(() => {
                ripple.remove();
            }, 600);
            
            // Acción específica según el tipo de botón
            if (buttonText.includes('test') || buttonText.includes('hacer')) {
                // Botón de "Hacer Test"
                showTestModal();
            } else {
                // Otros botones CTA
                showNotification('¡Gracias por tu interés! Funcionalidad en desarrollo.');
            }
        });
        
        // Efecto de hover mejorado
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px) scale(1.05)';
            this.style.boxShadow = '0 10px 25px rgba(59, 130, 246, 0.4)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 4px 15px rgba(59, 130, 246, 0.3)';
        });
    });
    
    // Añadir CSS para el efecto ripple
    const rippleStyle = document.createElement('style');
    rippleStyle.textContent = `
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(rippleStyle);
}

// Función para mostrar modal principal
function showModal(title, message, buttonText) {
    // Crear el modal
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.innerHTML = `
        <div class="modal-content">
            <button class="modal-close">&times;</button>
            <div class="modal-header">
                <h2>${title}</h2>
            </div>
            <div class="modal-body">
                <p>${message}</p>
                <div class="modal-features">
                    <div class="modal-feature">
                        <span class="feature-icon">🎯</span>
                        <span>Descubre tu estilo único</span>
                    </div>
                    <div class="modal-feature">
                        <span class="feature-icon">📚</span>
                        <span>Técnicas personalizadas</span>
                    </div>
                    <div class="modal-feature">
                        <span class="feature-icon">💡</span>
                        <span>Resultados inmediatos</span>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button class="modal-btn-primary">${buttonText}</button>
                <button class="modal-btn-secondary">Más tarde</button>
            </div>
        </div>
    `;
    
    // Estilos del modal
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 10000;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;
    
    document.body.appendChild(modal);
    
    // Añadir estilos específicos del modal
    const modalStyle = document.createElement('style');
    modalStyle.textContent = `
        .modal-content {
            background: white;
            border-radius: 20px;
            padding: 2rem;
            max-width: 500px;
            width: 90%;
            max-height: 90vh;
            overflow-y: auto;
            position: relative;
            transform: scale(0.8);
            transition: transform 0.3s ease;
        }
        
        .modal-overlay.active .modal-content {
            transform: scale(1);
        }
        
        .modal-close {
            position: absolute;
            top: 1rem;
            right: 1rem;
            background: none;
            border: none;
            font-size: 1.5rem;
            cursor: pointer;
            color: #64748b;
            width: 30px;
            height: 30px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: background-color 0.3s ease;
        }
        
        .modal-close:hover {
            background-color: #f1f5f9;
        }
        
        .modal-header h2 {
            color: #1e293b;
            margin-bottom: 1rem;
            font-size: 1.5rem;
        }
        
        .modal-body p {
            color: #64748b;
            margin-bottom: 1.5rem;
            line-height: 1.6;
        }
        
        .modal-features {
            display: flex;
            flex-direction: column;
            gap: 1rem;
            margin-bottom: 1.5rem;
        }
        
        .modal-feature {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            padding: 0.5rem;
            background: #f8fafc;
            border-radius: 8px;
        }
        
        .modal-feature .feature-icon {
            font-size: 1.2rem;
        }
        
        .modal-footer {
            display: flex;
            gap: 1rem;
            justify-content: flex-end;
            flex-wrap: wrap;
        }
        
        .modal-btn-primary {
            background: #3b82f6;
            color: white;
            border: none;
            padding: 0.75rem 1.5rem;
            border-radius: 8px;
            font-weight: 500;
            cursor: pointer;
            transition: background-color 0.3s ease;
        }
        
        .modal-btn-primary:hover {
            background: #2563eb;
        }
        
        .modal-btn-secondary {
            background: #f1f5f9;
            color: #64748b;
            border: none;
            padding: 0.75rem 1.5rem;
            border-radius: 8px;
            font-weight: 500;
            cursor: pointer;
            transition: background-color 0.3s ease;
        }
        
        .modal-btn-secondary:hover {
            background: #e2e8f0;
        }
        
        @media (max-width: 480px) {
            .modal-content {
                padding: 1.5rem;
            }
            
            .modal-footer {
                flex-direction: column;
            }
            
            .modal-btn-primary, .modal-btn-secondary {
                width: 100%;
            }
        }
    `;
    document.head.appendChild(modalStyle);
    
    // Mostrar modal con animación
    setTimeout(() => {
        modal.style.opacity = '1';
        modal.classList.add('active');
    }, 10);
    
    // Eventos del modal
    const closeModal = () => {
        modal.style.opacity = '0';
        setTimeout(() => {
            modal.remove();
            modalStyle.remove();
        }, 300);
    };
    
    // Cerrar modal
    modal.querySelector('.modal-close').addEventListener('click', closeModal);
    modal.querySelector('.modal-btn-secondary').addEventListener('click', closeModal);
    
    // Cerrar al hacer click fuera del modal
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // Acción del botón principal
    modal.querySelector('.modal-btn-primary').addEventListener('click', () => {
        closeModal();
        // Aquí podrías redirigir a la página del test o iniciar el proceso
        setTimeout(() => {
            showNotification('¡Redirigiendo al test de estilo de aprendizaje!');
        }, 300);
    });
    
    // Cerrar con Escape
    document.addEventListener('keydown', function escapeHandler(e) {
        if (e.key === 'Escape') {
            closeModal();
            document.removeEventListener('keydown', escapeHandler);
        }
    });
}

// Función para mostrar modal del test
function showTestModal() {
    const testQuestions = [
        {
            question: "¿Cómo prefieres recibir instrucciones?",
            options: [
                "Leyendo paso a paso",
                "Escuchando explicaciones",
                "Viendo demostraciones",
                "Practicando directamente"
            ]
        },
        {
            question: "¿Qué te ayuda más a concentrarte?",
            options: [
                "Silencio total",
                "Música suave",
                "Sonidos ambientales",
                "Conversaciones de fondo"
            ]
        },
        {
            question: "¿Cuál es tu método preferido para estudiar?",
            options: [
                "Hacer resúmenes escritos",
                "Grabar y escuchar audios",
                "Crear mapas mentales",
                "Explicar a otros"
            ]
        }
    ];
    
    let currentQuestion = 0;
    let answers = [];
    
    const modal = document.createElement('div');
    modal.className = 'test-modal-overlay';
    
    const updateModal = () => {
        const question = testQuestions[currentQuestion];
        modal.innerHTML = `
            <div class="test-modal-content">
                <div class="test-progress">
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: ${((currentQuestion + 1) / testQuestions.length) * 100}%"></div>
                    </div>
                    <span class="progress-text">${currentQuestion + 1} de ${testQuestions.length}</span>
                </div>
                
                <div class="test-question">
                    <h3>${question.question}</h3>
                    <div class="test-options">
                        ${question.options.map((option, index) => `
                            <button class="test-option" data-index="${index}">
                                ${option}
                            </button>
                        `).join('')}
                    </div>
                </div>
                
                <div class="test-navigation">
                    ${currentQuestion > 0 ? '<button class="test-btn-back">Anterior</button>' : ''}
                    <button class="test-btn-close">Cerrar</button>
                </div>
            </div>
        `;
    };
    
    // Estilos del modal de test
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 10000;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;
    
    const testStyle = document.createElement('style');
    testStyle.textContent = `
        .test-modal-content {
            background: white;
            border-radius: 20px;
            padding: 2rem;
            max-width: 600px;
            width: 90%;
            max-height: 90vh;
            overflow-y: auto;
        }
        
        .test-progress {
            margin-bottom: 2rem;
        }
        
        .progress-bar {
            width: 100%;
            height: 8px;
            background: #e2e8f0;
            border-radius: 4px;
            overflow: hidden;
            margin-bottom: 0.5rem;
        }
        
        .progress-fill {
            height: 100%;
            background: linear-gradient(135deg, #3b82f6, #1d4ed8);
            transition: width 0.3s ease;
        }
        
        .progress-text {
            font-size: 0.9rem;
            color: #64748b;
        }
        
        .test-question h3 {
            color: #1e293b;
            margin-bottom: 1.5rem;
            font-size: 1.3rem;
        }
        
        .test-options {
            display: flex;
            flex-direction: column;
            gap: 1rem;
            margin-bottom: 2rem;
        }
        
        .test-option {
            background: #f8fafc;
            border: 2px solid #e2e8f0;
            padding: 1rem;
            border-radius: 10px;
            cursor: pointer;
            transition: all 0.3s ease;
            text-align: left;
        }
        
        .test-option:hover {
            background: #e2e8f0;
            border-color: #3b82f6;
        }
        
        .test-option.selected {
            background: #dbeafe;
            border-color: #3b82f6;
            color: #1e40af;
        }
        
        .test-navigation {
            display: flex;
            justify-content: space-between;
            gap: 1rem;
        }
        
        .test-btn-back, .test-btn-close {
            background: #f1f5f9;
            color: #64748b;
            border: none;
            padding: 0.75rem 1.5rem;
            border-radius: 8px;
            cursor: pointer;
            transition: background-color 0.3s ease;
        }
        
        .test-btn-back:hover, .test-btn-close:hover {
            background: #e2e8f0;
        }
    `;
    document.head.appendChild(testStyle);
    
    document.body.appendChild(modal);
    updateModal();
    
    // Mostrar modal
    setTimeout(() => {
        modal.style.opacity = '1';
    }, 10);
    
    // Eventos del modal de test
    modal.addEventListener('click', (e) => {
        if (e.target.classList.contains('test-option')) {
            // Seleccionar opción
            modal.querySelectorAll('.test-option').forEach(opt => {
                opt.classList.remove('selected');
            });
            e.target.classList.add('selected');
            
            // Guardar respuesta y avanzar
            answers[currentQuestion] = parseInt(e.target.dataset.index);
            
            setTimeout(() => {
                if (currentQuestion < testQuestions.length - 1) {
                    currentQuestion++;
                    updateModal();
                } else {
                    // Mostrar resultado
                    showTestResult(answers);
                    modal.remove();
                    testStyle.remove();
                }
            }, 500);
        }
        
        if (e.target.classList.contains('test-btn-back')) {
            currentQuestion--;
            updateModal();
        }
        
        if (e.target.classList.contains('test-btn-close')) {
            modal.remove();
            testStyle.remove();
        }
    });
}

// Función para mostrar resultado del test
function showTestResult(answers) {
    const styles = [
        { name: "Visual", description: "Aprendes mejor con imágenes, gráficos y organizadores visuales" },
        { name: "Auditivo", description: "Prefieres escuchar explicaciones y discutir conceptos" },
        { name: "Kinestésico", description: "Aprendes mejor con actividades prácticas y movimiento" },
        { name: "Lector/Escritor", description: "Te funciona mejor leer y escribir para procesar información" }
    ];
    
    // Calcular resultado basado en respuestas
    const styleIndex = answers.reduce((a, b) => a + b, 0) % styles.length;
    const result = styles[styleIndex];
    
    showModal(
        `¡Tu estilo de aprendizaje es ${result.name}!`,
        result.description + ". Ahora podemos personalizar tu experiencia de aprendizaje.",
        "Explorar Técnicas"
    );
}

// Función para mostrar notificaciones
function showNotification(message) {
    // Crear el elemento de notificación
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    
    // Estilos para la notificación
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #3b82f6;
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 20px rgba(59, 130, 246, 0.3);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
        font-size: 0.9rem;
    `;
    
    document.body.appendChild(notification);
    
    // Mostrar la notificación
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Ocultar y remover después de 3 segundos
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Menú móvil (hamburguesa)
function initMobileMenu() {
    // Crear botón hamburguesa para móvil
    const nav = document.querySelector('.nav');
    const navMenu = document.querySelector('.nav-menu');
    
    if (window.innerWidth <= 768) {
        const hamburger = document.createElement('button');
        hamburger.className = 'hamburger';
        hamburger.innerHTML = '☰';
        hamburger.style.cssText = `
            background: none;
            border: none;
            font-size: 1.5rem;
            cursor: pointer;
            display: none;
            color: #333;
        `;
        
        // Añadir el botón al nav
        nav.appendChild(hamburger);
        
        // Mostrar/ocultar en móvil
        function toggleMobileMenu() {
            if (window.innerWidth <= 768) {
                hamburger.style.display = 'block';
                navMenu.style.cssText = `
                    position: absolute;
                    top: 100%;
                    left: 0;
                    width: 100%;
                    background: white;
                    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
                    flex-direction: column;
                    padding: 1rem;
                    transform: translateY(-100%);
                    opacity: 0;
                    visibility: hidden;
                    transition: all 0.3s ease;
                `;
            } else {
                hamburger.style.display = 'none';
                navMenu.style.cssText = '';
            }
        }
        
        // Ejecutar al cargar y redimensionar
        toggleMobileMenu();
        window.addEventListener('resize', toggleMobileMenu);
        
        // Funcionalidad del botón hamburguesa
        hamburger.addEventListener('click', () => {
            const isOpen = navMenu.style.opacity === '1';
            
            if (isOpen) {
                navMenu.style.transform = 'translateY(-100%)';
                navMenu.style.opacity = '0';
                navMenu.style.visibility = 'hidden';
                hamburger.innerHTML = '☰';
            } else {
                navMenu.style.transform = 'translateY(0)';
                navMenu.style.opacity = '1';
                navMenu.style.visibility = 'visible';
                hamburger.innerHTML = '✕';
            }
        });
        
        // Cerrar menú al hacer clic en un enlace
        navMenu.addEventListener('click', (e) => {
            if (e.target.tagName === 'A') {
                navMenu.style.transform = 'translateY(-100%)';
                navMenu.style.opacity = '0';
                navMenu.style.visibility = 'hidden';
                hamburger.innerHTML = '☰';
            }
        });
    }
}

// Efectos adicionales para mejorar la experiencia
function initAdditionalEffects() {
    // Efecto de typing en el título principal
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const text = heroTitle.textContent;
        heroTitle.textContent = '';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                heroTitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            }
        };
        
        // Iniciar el efecto después de un pequeño delay
        setTimeout(typeWriter, 500);
    }
    
    // Contador animado para las estadísticas
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const animateCounter = (element) => {
        const target = parseInt(element.textContent);
        const duration = 2000; // 2 segundos
        const step = target / (duration / 16); // 60 FPS
        let current = 0;
        
        const counter = setInterval(() => {
            current += step;
            if (current >= target) {
                element.textContent = target + (element.textContent.includes('%') ? '%' : '');
                clearInterval(counter);
            } else {
                element.textContent = Math.floor(current) + (element.textContent.includes('%') ? '%' : '');
            }
        }, 16);
    };
    
    // Observar las estadísticas para animar cuando sean visibles
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    statNumbers.forEach(stat => {
        statsObserver.observe(stat);
    });
}

// Funcionalidad del botón de reproducción del hero
function initPlayButton() {
    const playButton = document.querySelector('.hero-play-button');
    
    if (playButton) {
        playButton.addEventListener('click', () => {
            // Efecto de pulsación
            playButton.style.transform = 'scale(0.95)';
            
            setTimeout(() => {
                playButton.style.transform = 'scale(1)';
            }, 150);
            
            // Simular reproducción de video o demo
            showNotification('¡Demo interactiva próximamente!');
        });
    }
}

// Efecto de hover mejorado para las tarjetas
function initCardHoverEffects() {
    const cards = document.querySelectorAll('.feature-card, .stat-item');
    
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Inicializar efectos adicionales cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    // Agregar un pequeño delay para que las animaciones se vean mejor
    setTimeout(() => {
        initAdditionalEffects();
        initPlayButton();
        initCardHoverEffects();
    }, 100);
});

// Optimización del rendimiento
function optimizePerformance() {
    // Lazy loading para imágenes (si las hubiera)
    const images = document.querySelectorAll('img');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        imageObserver.unobserve(img);
                    }
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
    
    // Throttle para eventos de scroll
    let ticking = false;
    
    function updateScrollEffects() {
        // Aquí van los efectos de scroll que no requieren alta frecuencia
        ticking = false;
    }
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(updateScrollEffects);
            ticking = true;
        }
    });
}

// Inicializar optimizaciones
optimizePerformance();
