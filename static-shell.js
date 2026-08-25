document.addEventListener('DOMContentLoaded', () => {
  const menuButton = document.querySelector('.menu-button');
  const navlinks = document.getElementById('primary-navigation');
  
  if (menuButton && navlinks) {
    menuButton.addEventListener('click', () => {
      const isExpanded = menuButton.getAttribute('aria-expanded') === 'true';
      menuButton.setAttribute('aria-expanded', !isExpanded);
      navlinks.classList.toggle('is-open');
    });
    
    // Close on link click
    navlinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        menuButton.setAttribute('aria-expanded', 'false');
        navlinks.classList.remove('is-open');
      });
    });
  }
});
