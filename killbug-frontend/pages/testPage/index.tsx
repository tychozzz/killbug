import React, { useRef, useState, useEffect } from "react";
import io, { Socket } from "socket.io-client";
// import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "quill-emoji/dist/quill-emoji.css";
import { debounce } from "lodash";
import styles from './index.module.css'; 
import dynamic from "next/dynamic";
import hljs from 'highlight.js'
import 'highlight.js/styles/monokai-sublime.css'

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

hljs.configure({   // optionally configure hljs
  languages: ['javascript', 'ruby', 'python']
});

const modules = {
  syntax: {
    highlight: text => hljs.highlightAuto(text).value
  },
  toolbar: [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [
      "bold",
      "italic",
      "underline",
      "strike",
    ],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
      { align: [] },
    ],
    [{ script: "sub" }, { script: "super" }],
    [{ direction: "rtl" }],
    ["link", "image", "video"],
    ["clean"],
    ["blockquote", "code-block"],
  ],
};

function TestPage({groupId, userId}) {
  const [text, setText] = useState("");

  const socketRef = useRef<Socket>();

  useEffect(() => {
    socketRef.current = io("http://localhost:3333");
    socketRef.current.emit("joinGroup", {groupId, userId})
    socketRef.current.on("text", ({userId, newText}) => {
      setText(newText);
    });
    return () => {
      socketRef.current?.disconnect();
    };
  }, []);

  const handleTextChange = debounce((newText: string) => {
    socketRef.current?.emit("text", {groupId, userId, text: newText});
  }, 500);

  return (
    <div className={styles.app} style={{marginTop: '100px', width: '700px'}}>
      <div className={styles.container}>
        <div className={styles.editor}>
          <ReactQuill
            value={text}
            onChange={handleTextChange}
            placeholder="在这里开始你的远程协作办公吧"
            modules={modules}
            theme="snow"
            style={{height: '500px'}}
          />
        </div>
      </div>
    </div>
  );
}

export default TestPage;
