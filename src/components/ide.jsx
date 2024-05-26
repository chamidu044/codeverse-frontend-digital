// src/components/Editor.js
import React from 'react';
import MonacoEditor from 'react-monaco-editor';

const isMobile = () => {
  // Check if the device width is less than or equal to a certain width (e.g., 768px)
  const mobileMediaQuery = window.matchMedia('(max-width: 1059px)');
  return mobileMediaQuery.matches;
};

const Editor = ({ language, value, onChange }) => {
  const editorDidMount = (editor, monaco) => {
    if (monaco.languages.html) {
      monaco.languages.html.htmlDefaults.setOptions({
        format: {
          wrapLineLength: 120,
          unformatted: 'none',
        },
        suggest: {
          html5: true,
          javaScript: true,
          css: true,
        },
      });
    }

    editor.addAction({
      id: 'save-html',
      label: 'Save HTML',
      keybindings: [monaco.KeyMod.CtrlCmd | monaco.KeyCode.KEY_S],
      contextMenuGroupId: 'navigation',
      contextMenuOrder: 1.5,
      run: () => {
        const value = editor.getValue();
        onChange(value);
      },
    });
  };

  return (
    <>
    {isMobile ? (
      <MonacoEditor
        width="100%"
        height="80vh"
        language={language}
        theme="vs-dark"
        value={value}
        onChange={onChange}
        options={{ automaticLayout: true }}
        editorDidMount={editorDidMount}
      />
    ) : (
    <MonacoEditor
      width="44.5vw"
      height="90vh" // Set height to 90% of viewport height
      language={language}
      theme="vs-dark"
      value={value}
      onChange={onChange}
      options={{ automaticLayout: true }}
      editorDidMount={editorDidMount}
    />
    )}
    </>
);

};

export default Editor;
