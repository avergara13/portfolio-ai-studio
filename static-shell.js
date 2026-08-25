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
    
    // Close on link click
    navlinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        menuButton.setAttribute('aria-expanded', 'false');
        navlinks.classList.remove('is-open');
      });
    });
  }

  // Work Index Interaction
  const workRows = document.querySelectorAll('.work-row');
  const previewImg = document.getElementById('work-index-img');
  
  if (workRows.length > 0 && previewImg) {
    const updatePreview = (row) => {
      workRows.forEach(r => r.setAttribute('aria-current', 'false'));
      row.setAttribute('aria-current', 'true');
      
      const newSrc = row.getAttribute('data-img');
      const newAlt = row.getAttribute('data-alt');
      
      if (previewImg.src !== newSrc) {
        previewImg.style.opacity = 0;
        setTimeout(() => {
          previewImg.src = newSrc;
          previewImg.alt = newAlt;
          previewImg.style.opacity = 1;
        }, 150);
      }
    };

    workRows.forEach(row => {
      row.addEventListener('mouseenter', () => updatePreview(row));
      row.addEventListener('focus', () => updatePreview(row));
    });
  }

  // RSP Sticky Steps
  const rspSteps = document.querySelectorAll('.rsp-step');
  const rspImg = document.getElementById('rsp-preview-img');
  
  if (rspSteps.length > 0 && rspImg) {
    rspSteps.forEach(step => {
      step.addEventListener('click', () => {
        const controls = step.getAttribute('aria-controls');
        
        rspSteps.forEach(s => s.setAttribute('aria-selected', 'false'));
        step.setAttribute('aria-selected', 'true');
        
        rspImg.style.opacity = 0;
        setTimeout(() => {
          rspImg.src = step.getAttribute('data-img');
          rspImg.alt = step.getAttribute('data-alt');
          rspImg.style.opacity = 1;
        }, 150);
      });
    });
  }

  // Generic Tab/Diagram Logic (used for Loft OS, ARP Workbench, and Resume)
  const bindTabs = (tabSelector, panelSelector) => {
    const tabs = document.querySelectorAll(tabSelector);
    const panels = document.querySelectorAll(panelSelector);
    
    if (tabs.length === 0) return;
    
    tabs.forEach((tab, index) => {
      tab.addEventListener('click', () => {
        const targetId = tab.getAttribute('aria-controls');
        
        // Deactivate all
        tabs.forEach(t => {
          t.setAttribute('aria-selected', 'false');
          t.setAttribute('tabindex', '-1');
        });
        panels.forEach(p => p.setAttribute('aria-hidden', 'true'));
        
        // Activate selected
        tab.setAttribute('aria-selected', 'true');
        tab.setAttribute('tabindex', '0');
        const targetPanel = document.getElementById(targetId);
        if (targetPanel) {
          targetPanel.setAttribute('aria-hidden', 'false');
        }
      });
      
      // Keyboard support (Arrow keys)
      tab.addEventListener('keydown', (e) => {
        let newIndex = index;
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
          newIndex = (index + 1) % tabs.length;
          e.preventDefault();
        } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
          newIndex = (index - 1 + tabs.length) % tabs.length;
          e.preventDefault();
        }
        
        if (newIndex !== index) {
          tabs[newIndex].focus();
          tabs[newIndex].click();
        }
      });
    });
  };

  bindTabs('.diagram-node', '.diagram-panel');
  bindTabs('.workbench-controls button', '.workbench-panel');
  bindTabs('.resume-tab', '.resume-panel');
});
