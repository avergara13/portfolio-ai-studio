const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'index.html');
let content = fs.readFileSync(filePath, 'utf8');

const htmlToInsert = '<section id="roadmap" class="roadmap-section" aria-labelledby="roadmap-title"><div class="shell"><div class="split-head"><div><p class="eyebrow">Project roadmap</p><h2 id="roadmap-title">Evolution and future capabilities.</h2></div><p>A transparent view of upcoming features, system improvements, and planned milestones for the platform.</p></div><div class="field-manual"><article><span>Q1 \'27</span><h3>Agentic Orchestration</h3><p>Expanded multi-agent collaboration with delegated sub-tasks and automated context sharing.</p></article><article><span>Q2 \'27</span><h3>Advanced Data Synthesis</h3><p>Native integration with external data warehouses and real-time streaming analytics pipelines.</p></article><article><span>Q3 \'27</span><h3>Enterprise Governance</h3><p>Enhanced role-based access controls, comprehensive audit trails, and compliance reporting tools.</p></article></div></div></section>';

const insertionPoint = '<section id="experience"';
if (content.includes(insertionPoint)) {
    content = content.replace(insertionPoint, htmlToInsert + insertionPoint);
    fs.writeFileSync(filePath, content, 'utf8');
    console.log("Injected roadmap HTML.");
} else {
    console.log("Could not find insertion point.");
}
