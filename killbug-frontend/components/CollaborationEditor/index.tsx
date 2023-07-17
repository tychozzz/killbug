import { useState, useRef } from 'react';
import * as Y from 'yjs';
import { WebsocketProvider } from 'y-websocket';
import { MonacoBinding } from 'y-monaco';
import MonacoEditor from '@monaco-editor/react';

function CollaborationEditor({ name }) {
  const editorRef = useRef(null);

  const handleEditorDidMount = (editor, monaco) => {
    editorRef.current = editor;
    const doc = new Y.Doc();
    const provider = new WebsocketProvider('ws://localhost:1234', 'test', doc);
    const type = doc.getText('monaco');
    const binding = new MonacoBinding(
      type,
      editorRef.current.getModel(),
      provider.awareness
    );
  };

  return (
    <div style={{ marginTop: '10px' }}>
      <MonacoEditor
        width="100%"
        height="500px"
        onMount={handleEditorDidMount}
      />
    </div>
  );
}

export default CollaborationEditor;

// import { useState, useRef } from 'react';
// import * as Y from 'yjs';
// import { WebrtcProvider } from 'y-webrtc';
// import { MonacoBinding } from 'y-monaco';
// import MonacoEditor from '@monaco-editor/react';

// function CollaborationEditor({name}) {
//   const editorRef = useRef(null);

//   const handleEditorDidMount = (editor, monaco) => {
//     editorRef.current = editor;
//     const doc = new Y.Doc();
//     const provider = new WebrtcProvider('test', doc);
//     const type = doc.getText('monaco');
//     const binding = new MonacoBinding(
//       type,
//       editorRef.current.getModel(),
//       new Set([editorRef.current]),
//       provider.awareness
//     );
//   };

//   return (
//     <div style={{marginTop: '10px'}}>
//       <MonacoEditor width='100%' height='500px' onMount={handleEditorDidMount} />
//     </div>
//   );
// }

// export default CollaborationEditor;
