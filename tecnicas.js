// Animación de aparición al hacer scroll
function animateOnScroll() {
  const cards = document.querySelectorAll('.tecnica-card');

  cards.forEach(card => {
    const cardTop = card.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (cardTop < windowHeight - 100) {
      card.classList.add('animate-in');
    }
  });
}

window.addEventListener('load', animateOnScroll);
window.addEventListener('scroll', animateOnScroll);
