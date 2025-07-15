// Simulación de la función de animación al scroll
document.addEventListener('DOMContentLoaded', function() {
  setTimeout(() => {
    const cards = document.querySelectorAll('.estilo-significado-card');
    cards.forEach(card => {
      card.classList.add('animate-in');
    });
  }, 500);
});
