// src/components/Editor.js
import React from 'react';
import MonacoEditor from 'react-monaco-editor';

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
    <MonacoEditor
      width="100%"
      height="400"
      language={language}
      theme="vs-dark"
      value={value}
      onChange={onChange}
      options={{ automaticLayout: true }}
      editorDidMount={editorDidMount}
    />
  );
};

export default Editor;
