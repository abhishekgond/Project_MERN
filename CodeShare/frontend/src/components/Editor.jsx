// export default Editor;
import React, { useEffect, useRef } from "react";
import CodeMirror from "codemirror";

// Base CSS & Themes
import "codemirror/lib/codemirror.css";
import "codemirror/theme/dracula.css";
import "codemirror/theme/monokai.css";

// Language Modes
import "codemirror/mode/javascript/javascript";
import "codemirror/mode/css/css";
import "codemirror/mode/htmlmixed/htmlmixed";
import "codemirror/mode/clike/clike"; // For Java, C++
import "codemirror/mode/python/python";

// Editing Addons
import "codemirror/addon/edit/matchbrackets";
import "codemirror/addon/edit/closebrackets";
import "codemirror/addon/edit/closetag";
import "codemirror/addon/edit/matchtags";
import "codemirror/addon/comment/comment";
import "codemirror/addon/selection/active-line";

// Hint / Autocomplete Addons
import "codemirror/addon/hint/show-hint";
import "codemirror/addon/hint/show-hint.css";
import "codemirror/addon/hint/javascript-hint";
import "codemirror/addon/hint/css-hint";
import "codemirror/addon/hint/html-hint";
import "codemirror/addon/hint/xml-hint";
import "codemirror/addon/hint/anyword-hint";

// Search Addons
import "codemirror/addon/search/search";
import "codemirror/addon/search/searchcursor";

// Tooltip
import "codemirror/addon/selection/mark-selection";

const Editor = ({
  defaultCode = "// Start Your Code...",
  theme = "dracula",
  language = "javascript",
  socket,
  roomId,
}) => {
  const textAreaRef = useRef(null);
  const editorRef = useRef(null);
  const debounceRef = useRef(null);
  const isRemoteChange = useRef(false);

  const modeMap = {
    javascript: "javascript",
    html: "htmlmixed",
    css: "css",
    python: "python",
    cpp: "text/x-c++src",
    java: "text/x-java",
  };

  const customHint = (cm) => {
    const cursor = cm.getCursor();
    const token = cm.getTokenAt(cursor);
    const start = token.start;
    const end = cursor.ch;
    const currentWord = token.string;

    const customWords = {
      python: [
        "def",
        "return",
        "print",
        "for",
        "while",
        "if",
        "elif",
        "else",
        "import",
        "from",
        "class",
        "self",
        "try",
        "except",
        "finally",
        "with",
      ],
      cpp: [
        "#include",
        "int",
        "float",
        "double",
        "std",
        "cout",
        "cin",
        "return",
        "if",
        "else",
        "while",
        "for",
        "class",
        "public",
        "private",
        "void",
      ],
      java: [
        "public",
        "private",
        "class",
        "static",
        "void",
        "main",
        "String",
        "int",
        "float",
        "System.out.println",
        "return",
        "new",
        "if",
        "else",
        "while",
      ],
    };

    const langHints = customWords[language] || [];
    const list = langHints.filter((word) => word.startsWith(currentWord));

    return {
      list,
      from: CodeMirror.Pos(cursor.line, start),
      to: CodeMirror.Pos(cursor.line, end),
    };
  };

  useEffect(() => {
    if (socket && roomId) {
      socket.emit("join-room", { roomId });
      return () => socket.off("join-room");
    }
  }, [socket, roomId]);

  useEffect(() => {
    if (!textAreaRef.current) return;

    const editor = CodeMirror.fromTextArea(textAreaRef.current, {
      mode: modeMap[language] || "javascript",
      theme,
      lineNumbers: true,
      matchBrackets: true,
      autoCloseBrackets: true,
      autoCloseTags: true,
      matchTags: { bothTags: true },
      tabSize: 2,
      indentWithTabs: false,
      styleActiveLine: true,
      lineWrapping: true,
      extraKeys: {
        "Ctrl-F": (cm) => cm.execCommand("find"),
        "Ctrl-/": (cm) => cm.execCommand("toggleComment"),
        "Ctrl-Space": "autocomplete",
      },
    });

    const persisted = localStorage.getItem(`code-${roomId}`);
    if (persisted) editor.setValue(persisted);
    else editor.setValue(defaultCode);

    editor.getWrapperElement().style.height = "100%";
    editorRef.current = editor;

    editor.on("inputRead", (cm, change) => {
      if (!cm.state.completionActive && change.text[0].match(/\w/)) {
        CodeMirror.commands.autocomplete(cm, customHint, {
          completeSingle: false,
        });
      }
    });

    editor.on("change", (cm) => {
      if (isRemoteChange.current) return;
      const newCode = cm.getValue();
      localStorage.setItem(`code-${roomId}`, newCode);
      if (socket && roomId) {
        socket.emit("code-change", { roomId, code: newCode });
      }
    });

    if (socket) {
      socket.on("code-change", ({ code }) => {
        if (code !== editor.getValue()) {
          isRemoteChange.current = true;
          const prevScroll = editor.getScrollInfo().top;
          editor.setValue(code);
          editor.scrollTo(null, prevScroll);
          isRemoteChange.current = false;
        }
      });

      socket.on("code-sync", ({ code }) => {
        if (code !== editor.getValue()) {
          isRemoteChange.current = true;
          editor.setValue(code);
          isRemoteChange.current = false;
        }
      });
    }

    return () => {
      editor.toTextArea();
      socket?.off("code-change");
      socket?.off("code-sync");
    };
  }, [theme, language, defaultCode, socket, roomId]);

  return (
    <div className="w-full h-full rounded-lg overflow-hidden">
      <textarea ref={textAreaRef} defaultValue={defaultCode} />
    </div>
  );
};

export default Editor;

// import React, { useEffect, useRef } from "react";
// import CodeMirror from "codemirror";

// // Base & Themes
// import "codemirror/lib/codemirror.css";
// import "codemirror/theme/dracula.css";
// import "codemirror/theme/monokai.css";

// // Modes
// import "codemirror/mode/javascript/javascript";
// import "codemirror/mode/css/css";
// import "codemirror/mode/htmlmixed/htmlmixed";
// import "codemirror/mode/clike/clike"; // Java/C++
// import "codemirror/mode/python/python";

// // Addons - Editing
// import "codemirror/addon/edit/matchbrackets";
// import "codemirror/addon/edit/closebrackets";
// import "codemirror/addon/edit/closetag";
// import "codemirror/addon/edit/matchtags";
// import "codemirror/addon/comment/comment";
// import "codemirror/addon/selection/active-line";

// // Addons - Hints & Autocomplete
// import "codemirror/addon/hint/show-hint";
// import "codemirror/addon/hint/show-hint.css";
// import "codemirror/addon/hint/javascript-hint";
// import "codemirror/addon/hint/css-hint";
// import "codemirror/addon/hint/html-hint";
// import "codemirror/addon/hint/xml-hint";
// import "codemirror/addon/hint/anyword-hint";

// // Addons - Search
// import "codemirror/addon/search/search";
// import "codemirror/addon/search/searchcursor";

// // Addons - Selection
// import "codemirror/addon/selection/mark-selection";

// const languageModes = {
//   javascript: "javascript",
//   html: "htmlmixed",
//   css: "css",
//   python: "python",
//   cpp: "text/x-c++src",
//   java: "text/x-java",
// };

// const customKeywords = {
//   python: [
//     "def",
//     "return",
//     "print",
//     "for",
//     "while",
//     "if",
//     "elif",
//     "else",
//     "import",
//     "from",
//     "class",
//     "self",
//     "try",
//     "except",
//     "finally",
//     "with",
//   ],
//   cpp: [
//     "#include",
//     "int",
//     "float",
//     "double",
//     "std",
//     "cout",
//     "cin",
//     "return",
//     "if",
//     "else",
//     "while",
//     "for",
//     "class",
//     "public",
//     "private",
//     "void",
//   ],
//   java: [
//     "public",
//     "private",
//     "class",
//     "static",
//     "void",
//     "main",
//     "String",
//     "int",
//     "float",
//     "System.out.println",
//     "return",
//     "new",
//     "if",
//     "else",
//     "while",
//   ],
// };

// const Editor = ({
//   defaultCode = "// Start Your Code...",
//   theme = "dracula",
//   language = "javascript",
//   socket,
//   roomId,
// }) => {
//   const textAreaRef = useRef(null);
//   const editorRef = useRef(null);
//   const isRemoteChange = useRef(false);

//   const handleAutocomplete = (cm) => {
//     const cursor = cm.getCursor();
//     const token = cm.getTokenAt(cursor);
//     const word = token.string;
//     const langHints = customKeywords[language] || [];

//     const suggestions = langHints.filter((kw) => kw.startsWith(word));
//     return {
//       list: suggestions,
//       from: CodeMirror.Pos(cursor.line, token.start),
//       to: CodeMirror.Pos(cursor.line, token.end),
//     };
//   };

//   useEffect(() => {
//     if (!textAreaRef.current) return;

//     const editor = CodeMirror.fromTextArea(textAreaRef.current, {
//       mode: languageModes[language] || "javascript",
//       theme,
//       lineNumbers: true,
//       tabSize: 2,
//       indentWithTabs: false,
//       lineWrapping: true,
//       styleActiveLine: true,
//       autoCloseTags: true,
//       matchTags: { bothTags: true },
//       autoCloseBrackets: true,
//       matchBrackets: true,
//       extraKeys: {
//         "Ctrl-F": (cm) => cm.execCommand("find"),
//         "Ctrl-/": (cm) => cm.execCommand("toggleComment"),
//         "Ctrl-Space": "autocomplete",
//       },
//     });

//     editor.getWrapperElement().style.height = "100%";

//     const savedCode = localStorage.getItem(`code-${roomId}`);
//     editor.setValue(savedCode || defaultCode);

//     editorRef.current = editor;

//     editor.on("inputRead", (cm, change) => {
//       if (!cm.state.completionActive && /\w/.test(change.text[0])) {
//         CodeMirror.commands.autocomplete(cm, handleAutocomplete, {
//           completeSingle: false,
//         });
//       }
//     });

//     editor.on("change", (cm) => {
//       if (isRemoteChange.current) return;
//       const code = cm.getValue();
//       localStorage.setItem(`code-${roomId}`, code);
//       socket?.emit("code-change", { roomId, code });
//     });

//     return () => editor.toTextArea();
//   }, [language, theme]);

//   useEffect(() => {
//     if (!socket || !roomId) return;

//     socket.emit("join-room", { roomId });

//     const editor = editorRef.current;

//     const handleCodeChange = ({ code }) => {
//       if (editor && code !== editor.getValue()) {
//         isRemoteChange.current = true;
//         const scrollInfo = editor.getScrollInfo();
//         editor.setValue(code);
//         editor.scrollTo(scrollInfo.left, scrollInfo.top);
//         isRemoteChange.current = false;
//       }
//     };

//     socket.on("code-change", handleCodeChange);
//     socket.on("code-sync", handleCodeChange);

//     return () => {
//       socket.off("code-change", handleCodeChange);
//       socket.off("code-sync", handleCodeChange);
//     };
//   }, [socket, roomId]);

//   return (
//     <div className="w-full h-full rounded-lg overflow-hidden">
//       <textarea ref={textAreaRef} />
//     </div>
//   );
// };

// export default Editor;
