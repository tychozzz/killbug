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

function QuillEditor({groupId, userId}) {
  const [text, setText] = useState("");

  const socketRef = useRef<Socket>();

  useEffect(() => {
    socketRef.current = io("http://localhost:3333");
    let join = (groupId + ":" + userId).toString()
    socketRef.current.emit("joinGroup", join)
    socketRef.current.on("text", (text) => {
      console.log('text', text)
      if(text) {
        const arr = text.split(":")
        if(arr[0] == groupId) {
          setText(text.substr(arr[0].length + 1));
        }
      }
    });
    return () => {
      socketRef.current?.disconnect();
    };
  }, [groupId, userId, text]);

  const handleTextChange = debounce((newText: string) => {
    let text = groupId + ":" + newText
    socketRef.current?.emit("text", text);
  }, 500);

  return (
    <div className={styles.app} >
          <ReactQuill
            value={text}
            onChange={handleTextChange}
            placeholder="Start your collaborative editing here!"
            modules={modules}
            theme="snow"
            style={{height: '82%', width: '100%', border: 'none'}}
          />
    </div>
  );
}

export default QuillEditor;
