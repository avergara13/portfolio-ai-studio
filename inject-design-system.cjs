const fs = require('fs');
const path = require('path');

function processHtmlFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');

  // Inject a link tag to our design-system.css
  const linkTag = '<link rel="stylesheet" href="/design-system.css" />';
  
  if (!content.includes('design-system.css')) {
    content = content.replace('</head>', `${linkTag}</head>`);
    
    // As a backup, inject into the RSC payload for client-side navigation
    // Next.js uses a bunch of scripts, but placing it in the head of the raw HTML is usually enough.
    // However, since it's a React app, React might strip it out during hydration.
    // To prevent this, we can inject a small script that appends the stylesheet if it's missing.
    const scriptTag = `
<script>
  (function() {
    var check = function() {
      if (!document.querySelector('link[href="/design-system.css"]')) {
        var link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = '/design-system.css';
        document.head.appendChild(link);
      }
    };
    document.addEventListener('DOMContentLoaded', check);
    setInterval(check, 1000);
  })();
</script>
`;
    content = content.replace('</body>', `${scriptTag}</body>`);
    
    // Inject the same for the inner chunks so React doesn't override it easily
    // We will just do the head/body replacement.
    
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Injected into ${filePath}`);
  }
}

// Process index.html and any other html files in the root or work/ directories
const filesToProcess = [
  path.join(__dirname, 'index.html'),
  path.join(__dirname, 'work/resale-scanner-pro/index.html'),
  path.join(__dirname, 'work/loft-os/index.html'),
  path.join(__dirname, 'work/assistant-recruiter-pro/index.html'),
  path.join(__dirname, 'work/office-chef/index.html'),
  path.join(__dirname, 'work/sous-chef/index.html')
];

for (const file of filesToProcess) {
  if (fs.existsSync(file)) {
    processHtmlFile(file);
  }
}
