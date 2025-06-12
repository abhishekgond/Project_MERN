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
}) => {
  const textAreaRef = useRef(null);
  const editorRef = useRef(null);
  const debounceRef = useRef(null);

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

    // 🔁 Enable live hint on every key press with debounce
    editor.on("inputRead", (cm) => {
      clearTimeout(debounceRef.current);
      debounceRef.current = setTimeout(() => {
        if (["python", "cpp", "java"].includes(language)) {
          cm.showHint({ hint: customHint });
        } else {
          cm.showHint();
        }
      }, 150); // delay to avoid overwhelming input
    });

    return () => editor.toTextArea();
  }, [theme, language, defaultCode]);

  return (
    <div className="w-full h-full">
      <textarea ref={textAreaRef} defaultValue={defaultCode} />
    </div>
  );
};

export default Editor;
