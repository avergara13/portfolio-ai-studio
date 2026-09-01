const fs = require('fs');

let html = fs.readFileSync('index.html', 'utf-8');

const insertionPoint = `      </section>
      
      <!-- AI LAB SECTION -->
      <section class="shell" style="background: #fff; border: 1px solid var(--spine); padding: 4rem; margin-top: 4rem; margin-bottom: 4rem;">
        <h2 class="serif">AI Lab</h2>
        <p style="margin-bottom: 2rem;">Explore the AI capabilities below, including a multi-turn Gemini chatbot and real-time voice conversations using the Gemini Live API.</p>
        
        <div style="display: flex; gap: 2rem; flex-wrap: wrap;">
          <!-- Chatbot UI -->
          <div style="flex: 1; min-width: 300px; border: 1px solid var(--spine); background: var(--paper);">
            <div style="padding: 1rem; border-bottom: 1px solid var(--spine); display: flex; justify-content: space-between; align-items: center;">
              <span class="mono" style="font-weight: bold;">Gemini Chat</span>
              <select id="model-select" class="mono text-muted" style="padding: 0.25rem; font-size: 0.75rem; border: 1px solid var(--spine);">
                <option value="general">gemini-3.5-flash (General)</option>
                <option value="complex">gemini-3.1-pro-preview (Complex)</option>
                <option value="fast">gemini-3.1-flash-lite (Fast)</option>
              </select>
            </div>
            
            <div id="chat-messages" style="height: 300px; overflow-y: auto; padding: 1rem;">
              <div class="mono text-muted" style="font-size: 0.75rem; text-align: center; margin-top: 2rem;">Conversation started...</div>
            </div>
            
            <div style="padding: 1rem; border-top: 1px solid var(--spine); display: flex; gap: 0.5rem;">
              <input type="text" id="chat-input" class="m2m-textarea" style="margin: 0; min-height: 0; padding: 0.75rem; flex: 1;" placeholder="Ask me anything...">
              <button id="chat-send" class="m2m-run-btn" style="width: auto; padding: 0.75rem 1.5rem;">Send</button>
            </div>
          </div>
          
          <!-- Voice UI -->
          <div style="flex: 1; min-width: 300px; border: 1px solid var(--spine); background: var(--paper); display: flex; flex-direction: column; justify-content: center; align-items: center; padding: 2rem; text-align: center;">
            <div class="mono text-cobalt" style="font-size: 2rem; margin-bottom: 1rem;">&#127897;</div>
            <h3 class="serif" style="margin-bottom: 1rem;">Live Voice Conversation</h3>
            <p class="text-muted" style="margin-bottom: 2rem; font-size: 0.9rem;">Have a real-time voice conversation with Gemini using the Live API.</p>
            <button id="start-voice-btn" class="m2m-run-btn" style="width: 100%; max-width: 250px;">Start Voice Conversation</button>
            <div id="voice-status" class="mono text-muted" style="margin-top: 1.5rem; font-size: 0.75rem;">Waiting to start...</div>
          </div>
        </div>
      </section>`;

html = html.replace('      </section>\n    \n      </main>', insertionPoint + '\n      </main>');

fs.writeFileSync('index.html', html);
