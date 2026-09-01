document.addEventListener('DOMContentLoaded', () => {
  const chatMessages = document.getElementById('chat-messages');
  const chatInput = document.getElementById('chat-input');
  const sendBtn = document.getElementById('chat-send');
  const modelSelect = document.getElementById('model-select');
  const startVoiceBtn = document.getElementById('start-voice-btn');
  const voiceStatus = document.getElementById('voice-status');

  if (!chatMessages || !chatInput || !sendBtn || !modelSelect || !startVoiceBtn || !voiceStatus) {
    return; // Don't run script if elements are not on this page
  }

  let history = [];
  
  function addMessage(role, text) {
    const div = document.createElement('div');
    div.className = `chat-msg ${role}`;
    div.style.marginBottom = '1rem';
    div.style.padding = '1rem';
    div.style.borderRadius = '8px';
    div.style.backgroundColor = role === 'user' ? 'var(--page-bg)' : '#fff';
    div.style.border = role === 'user' ? 'none' : '1px solid var(--spine)';
    
    const label = document.createElement('div');
    label.className = 'mono text-muted';
    label.style.fontSize = '0.75rem';
    label.style.marginBottom = '0.5rem';
    label.textContent = role === 'user' ? 'YOU' : 'GEMINI';
    
    const content = document.createElement('div');
    content.textContent = text;
    
    div.appendChild(label);
    div.appendChild(content);
    chatMessages.appendChild(div);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    
    history.push({ role, text });
  }

  async function sendMessage() {
    const text = chatInput.value.trim();
    if (!text) return;
    
    addMessage('user', text);
    chatInput.value = '';
    sendBtn.disabled = true;
    
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          history: history.slice(0, -1),
          modelType: modelSelect.value
        })
      });
      const data = await res.json();
      
      if (data.error) {
        addMessage('model', `Error: ${data.error}`);
      } else {
        addMessage('model', data.text);
      }
    } catch (err) {
      addMessage('model', `Error: ${err.message}`);
    } finally {
      sendBtn.disabled = false;
    }
  }

  sendBtn.addEventListener('click', sendMessage);
  chatInput.addEventListener('keydown', e => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  });

  // Voice setup
  let ws = null;
  let inputAudioCtx = null;
  let outputAudioCtx = null;
  let mediaStream = null;
  let source = null;
  let processor = null;
  let isVoiceActive = false;
  
  // Base64 helper
  function pcmToBase64(pcmData) {
    const buffer = new ArrayBuffer(pcmData.length * 2);
    const view = new DataView(buffer);
    for (let i = 0; i < pcmData.length; i++) {
      let s = Math.max(-1, Math.min(1, pcmData[i]));
      view.setInt16(i * 2, s < 0 ? s * 0x8000 : s * 0x7FFF, true);
    }
    const uint8Array = new Uint8Array(buffer);
    let binary = '';
    for (let i = 0; i < uint8Array.byteLength; i++) {
      binary += String.fromCharCode(uint8Array[i]);
    }
    return btoa(binary);
  }

  // Play audio chunk
  let nextStartTime = 0;
  function playAudioChunk(audioCtx, base64Audio) {
    const binary = atob(base64Audio);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i);
    }
    const buffer = bytes.buffer;
    const view = new DataView(buffer);
    const float32Array = new Float32Array(view.byteLength / 2);
    for (let i = 0; i < float32Array.length; i++) {
      float32Array[i] = view.getInt16(i * 2, true) / 0x8000;
    }
    const audioBuffer = audioCtx.createBuffer(1, float32Array.length, 24000);
    audioBuffer.getChannelData(0).set(float32Array);
    const sourceNode = audioCtx.createBufferSource();
    sourceNode.buffer = audioBuffer;
    sourceNode.connect(audioCtx.destination);
    
    if (nextStartTime < audioCtx.currentTime) {
      nextStartTime = audioCtx.currentTime;
    }
    sourceNode.start(nextStartTime);
    nextStartTime += audioBuffer.duration;
  }

  async function toggleVoice() {
    if (isVoiceActive) {
      stopVoice();
    } else {
      await startVoice();
    }
  }

  async function startVoice() {
    try {
      voiceStatus.textContent = "Connecting to Live API...";
      
      const protocol = location.protocol === 'https:' ? 'wss:' : 'ws:';
      ws = new WebSocket(`${protocol}//${location.host}/live`);
      
      inputAudioCtx = new AudioContext({ sampleRate: 16000 });
      outputAudioCtx = new AudioContext({ sampleRate: 24000 });
      nextStartTime = outputAudioCtx.currentTime;

      mediaStream = await navigator.mediaDevices.getUserMedia({ audio: true });
      source = inputAudioCtx.createMediaStreamSource(mediaStream);
      processor = inputAudioCtx.createScriptProcessor(4096, 1, 1);
      
      source.connect(processor);
      processor.connect(inputAudioCtx.destination);

      processor.onaudioprocess = (e) => {
        if (ws.readyState === WebSocket.OPEN) {
          const base64 = pcmToBase64(e.inputBuffer.getChannelData(0));
          ws.send(JSON.stringify({ audio: base64 }));
        }
      };

      ws.onmessage = (event) => {
        const msg = JSON.parse(event.data);
        if (msg.error) {
          voiceStatus.textContent = `Error: ${msg.error}`;
          stopVoice();
        } else if (msg.audio) {
          playAudioChunk(outputAudioCtx, msg.audio);
        } else if (msg.interrupted) {
          nextStartTime = outputAudioCtx.currentTime;
        }
      };

      ws.onopen = () => {
        voiceStatus.textContent = "Listening... Speak now.";
        isVoiceActive = true;
        startVoiceBtn.textContent = "Stop Voice";
        startVoiceBtn.style.background = 'var(--copper)';
      };

      ws.onclose = () => {
        stopVoice();
      };
    } catch (err) {
      console.error(err);
      voiceStatus.textContent = `Error: ${err.message}`;
    }
  }

  function stopVoice() {
    if (ws) ws.close();
    if (processor) processor.disconnect();
    if (source) source.disconnect();
    if (mediaStream) mediaStream.getTracks().forEach(t => t.stop());
    if (inputAudioCtx) inputAudioCtx.close();
    if (outputAudioCtx) outputAudioCtx.close();
    
    ws = null;
    processor = null;
    source = null;
    mediaStream = null;
    inputAudioCtx = null;
    outputAudioCtx = null;
    isVoiceActive = false;
    
    voiceStatus.textContent = "Voice connection closed.";
    startVoiceBtn.textContent = "Start Voice Conversation";
    startVoiceBtn.style.background = 'var(--ink)';
  }

  startVoiceBtn.addEventListener('click', toggleVoice);
});
