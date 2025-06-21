export interface Message {
  id: string;
  sender: 'user' | 'agent' | 'system';
  type: 'text' | 'code' | 'status';
  content: string;
  code?: string;
  language?: string;
  timestamp: Date;
}

export interface AgentUpdate {
  type: 'status' | 'text' | 'code_stream' | 'code_complete';
  content?: string;
  codeChunk?: string;
  currentFullCode?: string;
  fullCode?: string;
  language?: string;
  simulationData?: string;
}

export function getAgentResponse(prompt: string, onUpdate: (update: AgentUpdate) => void) {
  onUpdate({ type: 'status', content: 'HyperSym Agent is thinking...' });
  
  setTimeout(() => {
    let codeResponse = { 
      code: "// Default code", 
      language: "javascript", 
      simHtml: "<p>No simulation available.</p>" 
    };
    
    const lowerPrompt = prompt.toLowerCase();
    
    if (lowerPrompt.includes("button")) {
      codeResponse = {
        code: `const btn = document.createElement('button');
btn.textContent = 'Click Me!';
btn.style.backgroundColor = 'blue';
btn.style.color = 'white';
btn.style.padding = '10px 20px';
btn.style.border = 'none';
btn.style.borderRadius = '5px';
btn.style.cursor = 'pointer';
btn.onclick = () => alert('Button clicked!');
document.body.appendChild(btn);`,
        language: "javascript",
        simHtml: `<button style="background-color:blue; color:white; padding:10px 20px; border:none; border-radius:5px; cursor:pointer;" onclick="alert('Button clicked!')">Click Me!</button>`
      };
    } else if (lowerPrompt.includes("heading") || lowerPrompt.includes("title")) {
      codeResponse = {
        code: `const heading = document.createElement('h1');
heading.textContent = 'Welcome to HyperSym!';
heading.style.color = '#3b82f6';
heading.style.textAlign = 'center';
heading.style.fontFamily = 'Arial, sans-serif';
document.body.appendChild(heading);`,
        language: "javascript",
        simHtml: `<h1 style="color:#3b82f6; text-align:center; font-family:Arial, sans-serif;">Welcome to HyperSym!</h1>`
      };
    } else if (lowerPrompt.includes("card") || lowerPrompt.includes("component")) {
      codeResponse = {
        code: `const card = document.createElement('div');
card.style.backgroundColor = 'white';
card.style.padding = '20px';
card.style.borderRadius = '10px';
card.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
card.style.maxWidth = '300px';
card.style.margin = '20px auto';

const title = document.createElement('h3');
title.textContent = 'Sample Card';
title.style.margin = '0 0 10px 0';

const content = document.createElement('p');
content.textContent = 'This is a sample card component created with JavaScript.';
content.style.margin = '0';
content.style.color = '#666';

card.appendChild(title);
card.appendChild(content);
document.body.appendChild(card);`,
        language: "javascript",
        simHtml: `<div style="background-color:white; padding:20px; border-radius:10px; box-shadow:0 4px 6px rgba(0, 0, 0, 0.1); max-width:300px; margin:20px auto;">
  <h3 style="margin:0 0 10px 0;">Sample Card</h3>
  <p style="margin:0; color:#666;">This is a sample card component created with JavaScript.</p>
</div>`
      };
    }

    // Simulate streaming code
    const codeChars = codeResponse.code.split('');
    let currentCode = '';
    let charIndex = 0;
    
    function streamCode() {
      if (charIndex < codeChars.length) {
        currentCode += codeChars[charIndex];
        onUpdate({ 
          type: 'code_stream', 
          codeChunk: codeChars[charIndex], 
          currentFullCode: currentCode, 
          language: codeResponse.language 
        });
        charIndex++;
        setTimeout(streamCode, 30);
      } else {
        onUpdate({ 
          type: 'code_complete', 
          fullCode: codeResponse.code, 
          language: codeResponse.language, 
          simulationData: codeResponse.simHtml 
        });
      }
    }
    
    onUpdate({ type: 'text', content: "I'll create that for you:" });
    setTimeout(streamCode, 500);
    
  }, 1500);
}
