const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf8');

// Replace eyebrow
html = html.replace(/AI-assisted workflows · business systems · implementation/g, 'OPERATIONS-GROUNDED AI SYSTEMS');
html = html.replace(/AI workflows · business systems/g, 'OPERATIONS-GROUNDED AI SYSTEMS'); // mobile version

// Replace headline
html = html.replace(/I design and build practical AI-assisted workflows and business systems\./g, 'I turn messy operations into AI-assisted systems people can actually use.');
html = html.replace(/Practical AI workflows and business systems\./g, 'I turn messy operations into AI-assisted systems people can actually use.'); // mobile version

// Replace lede
html = html.replace(/I turn messy operational problems into usable, testable tools—with clear human control points and evidence-backed delivery\./g, 'I design workflows, interfaces, and human control points—and test the handoffs that make them reliable.');
html = html.replace(/Turning messy operational problems into usable, testable tools\./g, 'I design workflows, interfaces, and human control points—and test the handoffs that make them reliable.'); // mobile version

// Hide redundant workflow in Loft OS (via CSS class insertion if possible, or just replace it)
// We will handle Loft OS simplification via CSS by hiding the `.mini-workflow` and adjusting the grid.

fs.writeFileSync('index.html', html);
console.log("Patched hero text.");
