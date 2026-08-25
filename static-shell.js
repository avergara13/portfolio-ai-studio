document.addEventListener('DOMContentLoaded', () => {
  // Mobile Menu
  const menuBtn = document.querySelector('.menu-button');
  const navLinks = document.querySelector('.navlinks');
  if (menuBtn && navLinks) {
    menuBtn.addEventListener('click', () => {
      const isExpanded = menuBtn.getAttribute('aria-expanded') === 'true';
      menuBtn.setAttribute('aria-expanded', !isExpanded);
      navLinks.classList.toggle('is-open');
    });
    
    // Close menu when clicking a link
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        menuBtn.setAttribute('aria-expanded', 'false');
        navLinks.classList.remove('is-open');
      });
    });
  }

  // Work Index Interaction
  const workRows = document.querySelectorAll('.work-row');
  const previewImg = document.getElementById('work-index-img');
  
  if (workRows.length > 0 && previewImg) {
    const updatePreview = (row) => {
      workRows.forEach(r => r.setAttribute('data-preview-active', 'false'));
      row.setAttribute('data-preview-active', 'true');
      
      const newSrc = row.getAttribute('data-img');
      if (newSrc) {
        previewImg.style.opacity = 0;
        setTimeout(() => {
          previewImg.src = newSrc;
          previewImg.alt = `Preview for ${row.querySelector('h2').textContent}`;
          previewImg.style.opacity = 1;
        }, 150);
      }
    };
    
    workRows.forEach(row => {
      row.addEventListener('mouseenter', () => updatePreview(row));
      row.addEventListener('focus', () => updatePreview(row));
    });
  }

  // Generic Tab/Diagram Logic (used for Loft OS, ARP Workbench, and Resume)
  // Finds all tablists, ensuring Arrow Key navigation and explicit ARIA + hidden state
  const tabLists = document.querySelectorAll('[role="tablist"]');
  tabLists.forEach(tabList => {
    const tabs = tabList.querySelectorAll('[role="tab"]');
    if (tabs.length === 0) return;
    
    // Create an array of panels based on aria-controls
    const panels = Array.from(tabs).map(tab => {
      const panelId = tab.getAttribute('aria-controls');
      return document.getElementById(panelId);
    }).filter(Boolean);
    
    const activateTab = (tabToActivate) => {
      tabs.forEach(t => {
        t.setAttribute('aria-selected', 'false');
        t.setAttribute('tabindex', '-1');
      });
      panels.forEach(p => {
        p.setAttribute('aria-hidden', 'true');
        p.hidden = true;
      });
      
      tabToActivate.setAttribute('aria-selected', 'true');
      tabToActivate.setAttribute('tabindex', '0');
      
      const targetId = tabToActivate.getAttribute('aria-controls');
      const targetPanel = document.getElementById(targetId);
      if (targetPanel) {
        targetPanel.setAttribute('aria-hidden', 'false');
        targetPanel.hidden = false;
      }
      
      tabToActivate.focus();
    };
    
    tabs.forEach((tab, index) => {
      tab.addEventListener('click', () => activateTab(tab));
      
      tab.addEventListener('keydown', (e) => {
        let newIndex = null;
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
          newIndex = (index + 1) % tabs.length;
        } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
          newIndex = (index - 1 + tabs.length) % tabs.length;
        }
        
        if (newIndex !== null) {
          e.preventDefault();
          activateTab(tabs[newIndex]);
        }
      });
    });
  });

  // RSP Sticky Steps (Evidence Selectors using aria-pressed)
  const rspSteps = document.querySelectorAll('.rsp-step');
  const rspImg = document.getElementById('rsp-preview-img');
  
  if (rspSteps.length > 0 && rspImg) {
    rspSteps.forEach(step => {
      step.addEventListener('click', () => {
        rspSteps.forEach(s => s.setAttribute('aria-pressed', 'false'));
        step.setAttribute('aria-pressed', 'true');
        
        const newSrc = step.getAttribute('data-img');
        if (newSrc) {
          rspImg.style.opacity = 0;
          setTimeout(() => {
            rspImg.src = newSrc;
            rspImg.alt = `Screenshot of ${step.querySelector('h3').textContent}`;
            rspImg.style.opacity = 1;
          }, 150);
        }
      });
    });
  }
});
