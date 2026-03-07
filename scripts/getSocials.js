document.addEventListener('DOMContentLoaded', () => {
  // The ?v=2 forces your browser to load the new 4-icon version!
  fetch('./icons.html?v=2')
    .then(response => response.text())
    .then(html => {
      const container = document.getElementById('socials-container');
      if (container) {
        container.innerHTML = html;
      }
    })
    .catch(error => console.error('Error loading the social icons:', error));
});