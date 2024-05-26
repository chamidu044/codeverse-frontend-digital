import React, { useState, useEffect } from 'react';
import Editor from './ide'; // Ensure the path is correct
import Header from './Header.jsx';
import styles from '../style.js';

const EducationMode = () => {
  const [code, setCode] = useState('');
  const [copySuccess, setCopySuccess] = useState(false);
  const [showAiHtml, setShowAiHtml] = useState(false);
  const [html, setHtml] = useState('<h1>Hello, world!</h1>');

  useEffect(() => {
    fetch('https://codeverse-backend-w4o3yqxq3a-uc.a.run.app/me')
      .then(response => response.json())
      .then(data => {
        const htmlString = data.me.join('\n');
        setCode(htmlString);
        setHtml(htmlString); // Set the initial HTML content
      })
      .catch(error => console.error('Error fetching HTML code:', error));
  }, []);

  const toggleAiHtml = () => {
    setShowAiHtml(prevShowAiHtml => !prevShowAiHtml);
  };

  useEffect(() => {
    if (showAiHtml) {
      const aiHtmlIframe = document.getElementById('aiHtmlIframe');
      aiHtmlIframe.scrollIntoView({ behavior: 'smooth' });
    }
  }, [showAiHtml]);

  const downloadHTML = async () => {
    try {
      const response = await fetch('https://codeverse-backend-w4o3yqxq3a-uc.a.run.app/me');
      const data = await response.json();
      const htmlString = data.me.join('\n');

      const blob = new Blob([htmlString], { type: 'text/html' });
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = 'codeeditor.html';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error fetching and downloading HTML code:', error);
    }
  };

  const copyToClipboard = async () => {
    try {
      const response = await fetch('https://codeverse-backend-w4o3yqxq3a-uc.a.run.app/me');
      const data = await response.json();
      const htmlString = data.me.join('\n');

      navigator.clipboard.writeText(htmlString).then(() => {
        setCopySuccess(true);
        setTimeout(() => {
          setCopySuccess(false);
        }, 2000);
      }).catch(error => {
        console.error('Error copying to clipboard:', error);
        setCopySuccess(false);
      });
    } catch (error) {
      console.error('Error fetching HTML code for copying to clipboard:', error);
      setCopySuccess(false);
    }
  };

  const handleHtmlChange = htmlString => setHtml(htmlString);

  useEffect(() => {
    const iframe = document.getElementById('output');
    if (iframe) {
      const doc = iframe.contentDocument || iframe.contentWindow.document;
      const documentContents = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
        </head>
        <body>
          ${html}
        </body>
        </html>
      `;
      doc.open();
      doc.write(documentContents);
      doc.close();
    } else {
      console.error('Iframe not found');
    }
  }, [html]);

  return (
    <div className={`bg-primary ${styles.paddingX} ${styles.flexTop} ${styles.app}`}>
      <div className={`${styles.boxWidth}`}></div>
      <div className="absolute z-[0] w-[50%] h-[50%] right-0 top-10 blue__gradient" />
      <div className="absolute z-[1] w-[50%] h-[20%] bottom-3 pink__gradient" />

      <Header />

      <div className={`absolute z-10 top-20 py-5 right-20 ${styles.marginX} ${styles.flexStart}`}>
        <button onClick={toggleAiHtml} className="bg-purple-500 hover:bg-purple-800 hover:text-gray-100 text-white px-4 py-2 m-2 rounded">
          Code Explainer
        </button>
      </div>

      <div className={`absolute z-10 top-20 py-5 left-20 ${styles.marginX} ${styles.flexStart}`}>
        {copySuccess && (
          <div className="text-green-500 text-sm mt-2">Copied to Clipboard successfully!</div>
        )}
        <button onClick={downloadHTML} className="hover:bg-gray-100 bg-gray-800 text-gray-50 hover:text-black px-4 py-2 m-2 rounded">
          Download HTML
        </button>
        <button onClick={copyToClipboard} className="hover:bg-gray-100 bg-gray-800 text-gray-50 hover:text-black px-4 py-2 m-2 rounded">
          Copy Code
        </button>
      </div>

      <div className={styles.editorContainer}>
        <div className={styles.editor}>
          <h2>HTML</h2>
          <Editor language="html" value={html} onChange={handleHtmlChange} />
        </div>
        <div className={styles.preview}>
          <h2>Preview</h2>
          <iframe id="output" title="output" className={styles.iframe} />
        </div>
      </div>

      {showAiHtml && (
        <iframe
          id="aiHtmlIframe"
          src={"/ai.html"}
          title="GenAI-Bot"
          width="100%"
          height="900px"
          frameBorder="0"
          style={{ position: 'static', zIndex: '1', top: '35px' }}
        ></iframe>
      )}
    </div>
  );
};

export default EducationMode;
