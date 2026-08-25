document.addEventListener('DOMContentLoaded', () => {
  // Mobile Nav
  const menuButton = document.querySelector('.menu-button');
  const navlinks = document.getElementById('primary-navigation');
  
  if (menuButton && navlinks) {
    menuButton.addEventListener('click', () => {
      const isExpanded = menuButton.getAttribute('aria-expanded') === 'true';
      menuButton.setAttribute('aria-expanded', !isExpanded);
      navlinks.classList.toggle('is-open');
    });
  }

  // Work Index Hover Preview
  const workRows = document.querySelectorAll('.work-row');
  const previewImg = document.getElementById('work-index-img');
  
  if (workRows.length > 0 && previewImg) {
    // Set initial
    previewImg.src = workRows[0].getAttribute('data-img');
    
    workRows.forEach(row => {
      row.addEventListener('mouseenter', () => {
        previewImg.style.opacity = 0;
        setTimeout(() => {
          previewImg.src = row.getAttribute('data-img');
          previewImg.style.opacity = 1;
        }, 150);
      });
    });
  }

  // RSP Sticky Steps
  const rspSteps = document.querySelectorAll('.rsp-step');
  const rspImg = document.getElementById('rsp-preview-img');
  
  if (rspSteps.length > 0 && rspImg) {
    rspSteps.forEach(step => {
      step.addEventListener('click', () => {
        rspSteps.forEach(s => s.classList.remove('active'));
        step.classList.add('active');
        
        rspImg.style.opacity = 0;
        setTimeout(() => {
          rspImg.src = step.getAttribute('data-img');
          rspImg.style.opacity = 1;
        }, 150);
      });
    });
  }

  // Loft OS Interactive Diagram
  const diagramNodes = document.querySelectorAll('.diagram-node');
  const diagramPanels = document.querySelectorAll('.diagram-panel');
  
  if (diagramNodes.length > 0) {
    diagramNodes.forEach(node => {
      node.addEventListener('click', () => {
        const target = node.getAttribute('data-target');
        
        diagramNodes.forEach(n => n.classList.remove('active'));
        node.classList.add('active');
        
        diagramPanels.forEach(p => {
          if (p.id === target) {
            p.style.display = 'block';
          } else {
            p.style.display = 'none';
          }
        });
      });
    });
  }

  // Resume Tabs
  const resumeTabs = document.querySelectorAll('.resume-tab');
  const resumePanels = document.querySelectorAll('.resume-panel');
  
  if (resumeTabs.length > 0) {
    resumeTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        const target = tab.getAttribute('data-target');
        
        resumeTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        
        resumePanels.forEach(p => {
          if (p.id === target) {
            p.classList.add('active');
          } else {
            p.classList.remove('active');
          }
        });
      });
    });
  }
});
