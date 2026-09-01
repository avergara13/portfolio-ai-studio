const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf-8');
html = html.replace('  <script src="/static-shell.js"></script>', '  <script src="/static-shell.js"></script>\n  <script src="/chat-app.js"></script>');
fs.writeFileSync('index.html', html);
