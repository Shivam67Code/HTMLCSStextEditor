import React, { useState } from 'react';

const NotebookCodeWriter = () => {
  const [html, setHtml] = useState('<h1>Hello World!</h1>\n<p>Start coding here...</p>');
  const [css, setCss] = useState('h1 { color: blue; }\np { color: red; }');

  //auto-complete function
  const autoComplete = (e, isHtml) => {
    const key = e.key;
    const text = e.target.value;
    const pos = e.target.selectionStart;
    
    // closing brackets and quotes 
    if (key === '{' || key === '(' || key === '[' || key === '"' || key === "'") {
      e.preventDefault();
      const pairs = { '{': '}', '(': ')', '[': ']', '"': '"', "'": "'" };
      const newText = text.slice(0, pos) + key + pairs[key] + text.slice(pos);
      
      if (isHtml) {
        
        setHtml(newText);
      }
      else {
        setCss(newText);
      }
      
      setTimeout(() => e.target.setSelectionRange(pos + 1, pos + 1), 0);
    }
    // auto completee
    if (isHtml && key === '>') {
      const before = text.slice(0, pos);
      const match = before.match(/<(\w+)$/);
      
      if (match) {
        const tag = match[1];
        if (!['img', 'br', 'hr', 'input'].includes(tag)) {
          e.preventDefault();
          const newText = text.slice(0, pos) + '></' + tag + '>' + text.slice(pos);
          setHtml(newText);
          setTimeout(() => e.target.setSelectionRange(pos + 1, pos + 1), 0);
        }
      }
    }
  };

  const preview = `<html><head><style>${css}</style></head><body>${html}</body></html>`;

  // Notebook line background style
  const notebookBgStyle = {
    background: `
      repeating-linear-gradient(#fff, #fff 23px, #e4e4f0 23px, #e4e4f0 24px),
      linear-gradient(90deg, transparent, transparent 40px, #f0c8c8 40px, #f0c8c8 41px, transparent 41px)
    `,
    backgroundSize: '100% 24px, 100% 100%',
    backgroundAttachment: 'local',
    lineHeight: '24px',
    paddingTop: '2px',
    paddingLeft: '45px',
    fontSize: '14px',
    fontFamily: 'monospace',
    boxSizing: 'border-box'
  };

  return (
    <div style={{
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#f5f5f5',
      minHeight: '100vh',
      padding: '20px',
      display: 'flex',
      flexDirection: 'column'
    }}>
      
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        backgroundColor: 'white',
        borderRadius: '10px',
        padding: '20px',
        boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
        flex: '1 0 auto'
      }}>
        
        <h1 style={{
          textAlign: 'center',
          color: '#333',
          fontSize: '32px',
          marginBottom: '30px'
        }}>
          📔 Code Notebook
        </h1>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '20px'
        }}>
          
          <div>
            <div style={{
              border: '2px solid #ff6b6b',
              borderRadius: '8px',
              padding: '15px',
              marginBottom: '20px'
            }}>
              <h3 style={{ color: '#ff6b6b', margin: '0 0 10px 0' }}>
                HTML
              </h3>
              <textarea
                value={html}
                onChange={(e) => setHtml(e.target.value)}
                onKeyDown={(e) => autoComplete(e, true)}
                style={{
                  width: '100%',
                  height: '200px',
                  padding: '10px',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  fontFamily: 'monospace',
                  fontSize: '14px',
                  resize: 'vertical',
                  ...notebookBgStyle,
                  lineHeight: '24px'
                }}
                placeholder="Write your HTML here..."
              />
              <small style={{ color: '#666' }}>
                 Type &lt;div&gt; for auto-complete
              </small>
            </div>

            <div style={{
              border: '2px solid #4ecdc4',
              borderRadius: '8px',
              padding: '15px'
            }}>
              <h3 style={{ color: '#4ecdc4', margin: '0 0 10px 0' }}>
                CSS
              </h3>
              <textarea
                value={css}
                onChange={(e) => setCss(e.target.value)}
                onKeyDown={(e) => autoComplete(e, false)}
                style={{
                  width: '100%',
                  height: '200px',
                  padding: '10px',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  fontFamily: 'monospace',
                  fontSize: '14px',
                  resize: 'vertical',
                  ...notebookBgStyle,
                  lineHeight: '24px'
                }}
                placeholder="Write your CSS here..."
              />
              <small style={{ color: '#666' }}>
                 Auto-closes: { } ( ) [ ] " "
              </small>
            </div>
          </div>

          <div style={{
            border: '2px solid #45b7d1',
            borderRadius: '8px',
            overflow: 'hidden'
          }}>
            <div style={{
              backgroundColor: '#45b7d1',
              color: 'white',
              padding: '10px 15px',
              fontWeight: 'bold'
            }}>
              👁️ Live Preview
            </div>
            <iframe
              srcDoc={preview}
              style={{
                width: '100%',
                height: '450px',
                border: 'none',
                backgroundColor: 'white'
              }}
              title="preview"
            />
          </div>
        </div>
      </div>
      
      <footer style={{
        textAlign: 'center',
        padding: '20px 0',
        marginTop: '30px',
        borderTop: '1px solid #ddd',
        color: '#666',
        fontSize: '14px',
        fontFamily: '"Architects Daughter", cursive',
        width: '100%',
        backgroundColor: 'white',
        borderRadius: '10px',
        boxShadow: '0 -2px 10px rgba(0,0,0,0.05)',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        <p style={{ margin: '0' }}>
          <span style={{ color: '#45b7d1', fontWeight: 'bold' }}>Code Notebook</span> - 
          Created with ❤️ by <span style={{ color: '#ff6b6b', fontWeight: 'bold' }}>Shivam Karn</span>
        </p>
        <p style={{ margin: '5px 0 0 0', fontSize: '12px' }}>
          Your creative space for HTML & CSS experimentation
        </p>
      </footer>
    </div>
  );
};

export default NotebookCodeWriter;