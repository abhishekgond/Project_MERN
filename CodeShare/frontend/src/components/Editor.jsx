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

// Hint / Autocomplete Addons
import "codemirror/addon/hint/show-hint";
import "codemirror/addon/hint/show-hint.css";
import "codemirror/addon/hint/javascript-hint";
import "codemirror/addon/hint/css-hint";
import "codemirror/addon/hint/html-hint";
import "codemirror/addon/hint/xml-hint";
import "codemirror/addon/hint/anyword-hint";

const Editor = ({
  defaultCode = "",
  theme = "dracula",
  language = "javascript",
  socket,
  roomId,
}) => {
  const textAreaRef = useRef(null);
  const editorRef = useRef(null);
  const debounceRef = useRef(null);
  const isRemoteChange = useRef(false); // prevent feedback loop

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

  // Join the room when the component mounts
  useEffect(() => {
    if (socket && roomId) {
      socket.emit("join-room", { roomId });

      return () => {
        socket.off("join-room");
      };
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
      extraKeys: {
        "Ctrl-F": (cm) => {
          cm.execCommand("selectAll");
          cm.execCommand("indentAuto");
        },
      },
    });

    editor.setValue(defaultCode);
    editor.getWrapperElement().style.height = "100%";
    editorRef.current = editor;

    editor.on("inputRead", (cm) => {
      clearTimeout(debounceRef.current);
      debounceRef.current = setTimeout(() => {
        if (["python", "cpp", "java"].includes(language)) {
          cm.showHint({ hint: customHint });
        } else {
          cm.showHint();
        }
      }, 150);
    });

    // Real-time syncing
    editor.on("change", (cm) => {
      if (isRemoteChange.current) return;
      const newCode = cm.getValue();
      if (socket && roomId) {
        socket.emit("code-change", { roomId, code: newCode });
      }
    });

    // Receive remote code updates
    if (socket) {
      socket.on("code-change", ({ code }) => {
        if (code !== editor.getValue()) {
          isRemoteChange.current = true;
          const cursor = editor.getCursor();
          editor.setValue(code);
          editor.setCursor(cursor); // maintain user cursor position
          isRemoteChange.current = false;
        }
      });

      // Handle initial code sync for new user
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
    <div className="w-full h-full">
      <textarea ref={textAreaRef} defaultValue={defaultCode} />
    </div>
  );
};

export default Editor;