const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'index.html');
let content = fs.readFileSync(filePath, 'utf8');

// 1. Revert any previously injected raw HTML (in case it's there)
const htmlToInsert = '<section id="roadmap" class="roadmap-section" aria-labelledby="roadmap-title"><div class="shell"><div class="split-head"><div><p class="eyebrow">Project roadmap</p><h2 id="roadmap-title">Evolution and future capabilities.</h2></div><p>A transparent view of upcoming features, system improvements, and planned milestones for the platform.</p></div><div class="field-manual"><article><span>Q1 \'27</span><h3>Agentic Orchestration</h3><p>Expanded multi-agent collaboration with delegated sub-tasks and automated context sharing.</p></article><article><span>Q2 \'27</span><h3>Advanced Data Synthesis</h3><p>Native integration with external data warehouses and real-time streaming analytics pipelines.</p></article><article><span>Q3 \'27</span><h3>Enterprise Governance</h3><p>Enhanced role-based access controls, comprehensive audit trails, and compliance reporting tools.</p></article></div></div></section>';

if (content.includes(htmlToInsert)) {
    content = content.replace(htmlToInsert, '');
}

// 2. Insert raw HTML again safely
const insertionPoint = '<section id="experience"';
if (content.includes(insertionPoint)) {
    content = content.replace(insertionPoint, htmlToInsert + insertionPoint);
} else {
    console.log("Could not find insertion point.");
}

// 3. Update the RSC payload array
// The array might currently be \"$Lb\",\"$Lc\",\"$Ld\",\"$Le\",\"$Lf\"
// or already have $Lroadmap or $L24 if it wasn't cleaned properly.
// Let's normalize it first:
content = content.replace(/\\"\$Lb\\",\\"\$Lc\\",\\"\$Ld\\",.*?\\"\$Le\\",\\"\$Lf\\"/g, '\\"$Lb\\",\\"$Lc\\",\\"$Ld\\",\\"$Le\\",\\"$Lf\\"');

// Now inject $L24
content = content.replace('\\"$Lb\\",\\"$Lc\\",\\"$Ld\\",\\"$Le\\",\\"$Lf\\"', '\\"$Lb\\",\\"$Lc\\",\\"$Ld\\",\\"$L24\\",\\"$Le\\",\\"$Lf\\"');

// 4. Clean up any trailing broken scripts
// Remove anything after the last `"])</script>` before `</body>` to prevent duplicate script tags.
content = content.replace(/<\/script><script>self\.__next_f\.push\(\[1,"24:[\s\S]*?<\/body>/, '</body>');
content = content.replace(/<\/script><script>self\.__next_f\.push\(\[1,"roadmap:[\s\S]*?<\/body>/, '</body>');

// 5. Append the chunk definition
const chunkDef = '<script>self.__next_f.push([1,"24:[\\"$\\",\\"section\\",null,{\\"id\\":\\"roadmap\\",\\"className\\":\\"roadmap-section\\",\\"aria-labelledby\\":\\"roadmap-title\\",\\"children\\":[\\"$\\",\\"div\\",null,{\\"className\\":\\"shell\\",\\"children\\":[[\\"$\\",\\"div\\",null,{\\"className\\":\\"split-head\\",\\"children\\":[[\\"$\\",\\"div\\",null,{\\"children\\":[[\\"$\\",\\"p\\",null,{\\"className\\":\\"eyebrow\\",\\"children\\":\\"Project roadmap\\"}],[\\"$\\",\\"h2\\",null,{\\"id\\":\\"roadmap-title\\",\\"children\\":\\"Evolution and future capabilities.\\"}]]}],[\\"$\\",\\"p\\",null,{\\"children\\":\\"A transparent view of upcoming features, system improvements, and planned milestones for the platform.\\"}]]}],[\\"$\\",\\"div\\",null,{\\"className\\":\\"field-manual\\",\\"children\\":[[\\"$\\",\\"article\\",null,{\\"children\\":[[\\"$\\",\\"span\\",null,{\\"children\\":\\"Q1 \'27\\"}],[\\"$\\",\\"h3\\",null,{\\"children\\":\\"Agentic Orchestration\\"}],[\\"$\\",\\"p\\",null,{\\"children\\":\\"Expanded multi-agent collaboration with delegated sub-tasks and automated context sharing.\\"}]]}],[\\"$\\",\\"article\\",null,{\\"children\\":[[\\"$\\",\\"span\\",null,{\\"children\\":\\"Q2 \'27\\"}],[\\"$\\",\\"h3\\",null,{\\"children\\":\\"Advanced Data Synthesis\\"}],[\\"$\\",\\"p\\",null,{\\"children\\":\\"Native integration with external data warehouses and real-time streaming analytics pipelines.\\"}]]}],[\\"$\\",\\"article\\",null,{\\"children\\":[[\\"$\\",\\"span\\",null,{\\"children\\":\\"Q3 \'27\\"}],[\\"$\\",\\"h3\\",null,{\\"children\\":\\"Enterprise Governance\\"}],[\\"$\\",\\"p\\",null,{\\"children\\":\\"Enhanced role-based access controls, comprehensive audit trails, and compliance reporting tools.\\"}]]}]]}]]}]}]\\n"])</script>';
content = content.replace('</body>', chunkDef + '</body>');

fs.writeFileSync(filePath, content, 'utf8');
console.log("Successfully fixed roadmap injection.");
