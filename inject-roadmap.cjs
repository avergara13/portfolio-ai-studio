const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'index.html');
let content = fs.readFileSync(filePath, 'utf8');

// 1. Insert raw HTML
const htmlToInsert = '<section id="roadmap" class="roadmap-section" aria-labelledby="roadmap-title"><div class="shell"><div class="split-head"><div><p class="eyebrow">Project roadmap</p><h2 id="roadmap-title">Evolution and future capabilities.</h2></div><p>A transparent view of upcoming features, system improvements, and planned milestones for the platform.</p></div><div class="field-manual"><article><span>Q1 \'27</span><h3>Agentic Orchestration</h3><p>Expanded multi-agent collaboration with delegated sub-tasks and automated context sharing.</p></article><article><span>Q2 \'27</span><h3>Advanced Data Synthesis</h3><p>Native integration with external data warehouses and real-time streaming analytics pipelines.</p></article><article><span>Q3 \'27</span><h3>Enterprise Governance</h3><p>Enhanced role-based access controls, comprehensive audit trails, and compliance reporting tools.</p></article></div></div></section>';

const insertionPoint = '<section id="experience"';
if (content.includes(insertionPoint)) {
    content = content.replace(insertionPoint, htmlToInsert + insertionPoint);
} else {
    console.log("Could not find HTML insertion point.");
}

// 2. Insert into React JSON payload array
const payloadTarget = '\\"$Lb\\",\\"$Lc\\",\\"$Ld\\",\\"$Le\\",\\"$Lf\\"';
const payloadReplacement = '\\"$Lb\\",\\"$Lc\\",\\"$Ld\\",\\"$Lroadmap\\",\\"$Le\\",\\"$Lf\\"';
if (content.includes(payloadTarget)) {
    content = content.replace(payloadTarget, payloadReplacement);
} else {
    console.log("Could not find JSON payload array.");
}

// 3. Append the definition of roadmap to the script payload
const roadmapDef = '<script>self.__next_f.push([1,"roadmap:[\\"$\\",\\"section\\",null,{\\"id\\":\\"roadmap\\",\\"className\\":\\"roadmap-section\\",\\"aria-labelledby\\":\\"roadmap-title\\",\\"children\\":[\\"$\\",\\"div\\",null,{\\"className\\":\\"shell\\",\\"children\\":[[\\"$\\",\\"div\\",null,{\\"className\\":\\"split-head\\",\\"children\\":[[\\"$\\",\\"div\\",null,{\\"children\\":[[\\"$\\",\\"p\\",null,{\\"className\\":\\"eyebrow\\",\\"children\\":\\"Project roadmap\\"}],[\\"$\\",\\"h2\\",null,{\\"id\\":\\"roadmap-title\\",\\"children\\":\\"Evolution and future capabilities.\\"}]]}],[\\"$\\",\\"p\\",null,{\\"children\\":\\"A transparent view of upcoming features, system improvements, and planned milestones for the platform.\\"}]]}],[\\"$\\",\\"div\\",null,{\\"className\\":\\"field-manual\\",\\"children\\":[[\\"$\\",\\"article\\",null,{\\"children\\":[[\\"$\\",\\"span\\",null,{\\"children\\":\\"Q1 \'27\\"}],[\\"$\\",\\"h3\\",null,{\\"children\\":\\"Agentic Orchestration\\"}],[\\"$\\",\\"p\\",null,{\\"children\\":\\"Expanded multi-agent collaboration with delegated sub-tasks and automated context sharing.\\"}]]}],[\\"$\\",\\"article\\",null,{\\"children\\":[[\\"$\\",\\"span\\",null,{\\"children\\":\\"Q2 \'27\\"}],[\\"$\\",\\"h3\\",null,{\\"children\\":\\"Advanced Data Synthesis\\"}],[\\"$\\",\\"p\\",null,{\\"children\\":\\"Native integration with external data warehouses and real-time streaming analytics pipelines.\\"}]]}],[\\"$\\",\\"article\\",null,{\\"children\\":[[\\"$\\",\\"span\\",null,{\\"children\\":\\"Q3 \'27\\"}],[\\"$\\",\\"h3\\",null,{\\"children\\":\\"Enterprise Governance\\"}],[\\"$\\",\\"p\\",null,{\\"children\\":\\"Enhanced role-based access controls, comprehensive audit trails, and compliance reporting tools.\\"}]]}]]}]]}]}]\\n"])</script>';

// append just before the closing </body> tag
content = content.replace('</body>', roadmapDef + '</body>');

fs.writeFileSync(filePath, content, 'utf8');
console.log("Successfully injected roadmap into index.html");
