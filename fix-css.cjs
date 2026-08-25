const fs = require('fs');
let css = fs.readFileSync('design-system.css', 'utf8');

// 1. TYPOGRAPHY CORRECTIONS
css = css.replace(/body \{\n  background-color: var\(--paper\);\n  color: var\(--ink\);\n  font-family: var\(--font-serif\);/g, 'body {\n  background-color: var(--paper);\n  color: var(--ink);\n  font-family: var(--font-sans);');
css = css.replace(/h1, h2, h3, h4, h5 \{\n  font-family: var\(--font-sans\);/g, 'h1, h2, h3, h4, h5 {\n  font-family: var(--font-serif);');
css = css.replace(/p \{ font-family: var\(--font-serif\);/g, 'p { font-family: var(--font-sans);');

// 2. BLUEPRINT GRID CORRECTIONS
// Remove from body
css = css.replace(/  background-image: \n    linear-gradient\(to right, var\(--grid-line\) 1px, transparent 1px\),\n    linear-gradient\(to bottom, var\(--grid-line\) 1px, transparent 1px\);\n  background-size: 48px 48px;\n  background-position: center top;\n/g, '');
// Add to hero-handoff and loft-plate
css = css.replace(/\.hero-handoff \{/g, '.hero-handoff {\n  background-image: linear-gradient(to right, var(--grid-line) 1px, transparent 1px), linear-gradient(to bottom, var(--grid-line) 1px, transparent 1px);\n  background-size: 24px 24px;');
css = css.replace(/\.loft-plate \{/g, '.loft-plate {\n  background-image: linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px);\n  background-size: 24px 24px;');

// 3. SECTION INDICES CORRECTIONS
// Remove the structural markers CSS entirely
css = css.replace(/\/\* Structural Markers \*\/[\s\S]*?pointer-events: none;\n\}/g, '');
css = css.replace(/\/\* Hide structural markers \*\/\nmain > section::before \{ display: none; \}/g, '');

fs.writeFileSync('design-system.css', css);
console.log("CSS Corrections Applied.");
