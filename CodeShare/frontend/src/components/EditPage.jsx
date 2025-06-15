import {
  useLocation,
  useParams,
  useNavigate,
  Navigate,
} from "react-router-dom";
import toast from "react-hot-toast";
import Client from "./Client";
import Editor from "./Editor";
import { availableLanguages } from "./Language";
import { availableThemes, themeMap, formatThemeName } from "./Theme";
import { initSocket } from "../config/socket";
import ChatBox from "./ChatBox";
import { Menu, MessageCircle } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export default function EditorPage() {
  const [chatMessages, setChatMessages] = useState([]);
  const [chatInput, setChatInput] = useState("");
  const [clients, setClients] = useState([]);
  const [theme, setTheme] = useState("dracula");
  const [language, setLanguage] = useState("javascript");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [chatVisible, setChatVisible] = useState(false);

  const socketRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { roomId } = useParams();
  const userName = location.state?.userName;

  const handleError = (e) => {
    console.error("Socket error:", e);
    toast.error("Connection failed");
    navigate("/");
  };

  const handleLeave = () => {
    if (socketRef.current) {
      socketRef.current.emit("user-left", {
        roomId,
        userName,
        socketId: socketRef.current.id,
      });
      socketRef.current.disconnect();
    }
    navigate("/");
  };

  const copyRoomId = async () => {
    try {
      await navigator.clipboard.writeText(roomId);
      toast.success("Room ID copied!");
    } catch {
      toast.error("Failed to copy Room ID.");
    }
  };

  const sendChatMessage = () => {
    if (chatInput.trim()) {
      socketRef.current?.emit("chat-message", {
        roomId,
        message: chatInput.trim(),
      });
      setChatInput("");
    }
  };

  const handleChatKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendChatMessage();
    }
  };

  useEffect(() => {
    if (!userName) {
      toast.error("Username missing.");
      navigate("/");
      return;
    }

    const init = async () => {
      try {
        socketRef.current = await initSocket();
        socketRef.current.on("connect_error", handleError);
        socketRef.current.on("connect_failed", handleError);

        socketRef.current.on("connect", () => {
          socketRef.current.emit("join", { roomId, userName });
        });

        socketRef.current.on("newUser", ({ clients, userName: joinedUser }) => {
          if (joinedUser !== userName) toast.success(`${joinedUser} joined`);
          setClients(clients);
        });

        socketRef.current.on(
          "user-left",
          ({ socketId, userName: leftUser }) => {
            setClients((prev) => prev.filter((c) => c.socketId !== socketId));
            if (leftUser !== userName)
              toast(`${leftUser} left the room.`, { icon: "👋" });
          }
        );

        socketRef.current.on("disconnect", () => {
          toast("Disconnected from the server.", { icon: "🔌" });
        });

        socketRef.current.on(
          "chat-message",
          ({ userName, message, timestamp }) => {
            setChatMessages((prev) => [
              ...prev,
              {
                userName,
                message,
                timestamp: new Date(timestamp).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                }),
              },
            ]);
          }
        );
      } catch (err) {
        handleError(err);
      }
    };

    init();

    return () => {
      socketRef.current?.disconnect();
      socketRef.current?.off();
    };
  }, [roomId, userName, navigate]);

  if (!location.state) return <Navigate to="/" />;

  return (
    <div className="flex flex-col h-screen bg-[#121212] text-white relative">
      {/* Header */}
      <header className="flex justify-between items-center px-4 py-3 bg-zinc-900 border-b border-zinc-800 shadow-md relative">
        <div className="flex items-center gap-3 w-full">
          <button
            className="block lg:hidden text-white"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <Menu size={28} />
          </button>

          <div className="text-xl sm:text-2xl font-bold text-green-400 ml-auto sm:ml-0">
            💻 CODECAST
          </div>
        </div>

        <div className="flex-col items-end text-sm hidden sm:flex sm:text-right">
          <p className="text-zinc-300">
            <span className="font-semibold text-white">Room:</span> {roomId}
          </p>
          <p className="text-zinc-300">
            <span className="font-semibold text-white">You:</span> {userName}
          </p>
          <p className="text-zinc-300">
            <span className="font-semibold text-white">Users:</span>{" "}
            {clients.length}
          </p>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        <aside
          className={`${
            sidebarOpen ? "block" : "hidden"
          } lg:block absolute lg:static z-20 w-[260px] bg-zinc-900 border-r border-zinc-800 p-4 flex flex-col justify-between transition-all`}
        >
          <div className="space-y-2 mb-4 lg:hidden">
            <button
              className="w-full py-2 bg-green-600 hover:bg-green-700 rounded"
              onClick={copyRoomId}
            >
              📋 Copy Room ID
            </button>
            <button
              className="w-full py-2 bg-red-600 hover:bg-red-700 rounded"
              onClick={handleLeave}
            >
              🚪 Leave Room
            </button>
          </div>

          <div className="flex-1 overflow-y-auto">
            <h2 className="text-lg font-semibold mb-4 border-b border-zinc-700 pb-2">
              Members ({clients.length})
            </h2>
            <ul className="space-y-3 overflow-y-auto max-h-[calc(100vh-200px)] pr-1">
              {clients.map((client) => (
                <li key={client.socketId}>
                  <Client name={client.userName} />
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-2 mt-6 hidden lg:block">
            <button
              className="w-full py-2 bg-green-600 hover:bg-green-700 rounded"
              onClick={copyRoomId}
            >
              📋 Copy Room ID
            </button>
            <button
              className="w-full py-2 bg-red-600 hover:bg-red-700 rounded"
              onClick={handleLeave}
            >
              🚪 Leave Room
            </button>
          </div>
        </aside>

        {/* Main Section */}
        <main className="flex-1 flex flex-col p-4 space-y-4 overflow-hidden relative">
          {/* Theme + Language Selectors + Show Chat */}
          <div className="flex flex-wrap gap-6 items-end justify-between">
            <div className="flex gap-6">
              <div className="flex flex-col">
                <label
                  htmlFor="themeSelect"
                  className="text-sm font-medium mb-1"
                >
                  Theme
                </label>
                <select
                  id="themeSelect"
                  value={theme}
                  onChange={(e) => setTheme(e.target.value)}
                  className="bg-zinc-800 text-white px-3 py-2 rounded-md border border-zinc-700 focus:outline-none"
                >
                  {availableThemes.map((t) => (
                    <option key={t} value={t} className="text-black">
                      {formatThemeName(t)}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col">
                <label
                  htmlFor="languageSelect"
                  className="text-sm font-medium mb-1"
                >
                  Language
                </label>
                <select
                  id="languageSelect"
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="bg-zinc-800 text-white px-3 py-2 rounded-md border border-zinc-700 focus:outline-none"
                >
                  {availableLanguages.map((lang) => (
                    <option key={lang} value={lang} className="text-black">
                      {lang.charAt(0).toUpperCase() + lang.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="relative z-50">
              <button
                onClick={() => setChatVisible(!chatVisible)}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded text-white"
              >
                <MessageCircle size={18} />
                {chatVisible ? "Hide Chat" : "Show Chat"}
              </button>
            </div>
          </div>

          {/* Editor */}
          <div className="flex-1 overflow-hidden rounded-lg border border-zinc-700 relative">
            <Editor
              defaultCode={`// Start Your Code ...`}
              theme={themeMap[theme] || themeMap["dracula"]}
              language={language}
              socket={socketRef.current}
              roomId={roomId}
            />
          </div>

          {/* ChatBox Floating Bottom Right */}
          {chatVisible && (
            <div className="fixed bottom-4 right-4 z-50 w-full max-w-xs sm:max-w-sm md:max-w-md">
              <ChatBox
                chatMessages={chatMessages}
                chatInput={chatInput}
                setChatInput={setChatInput}
                handleChatKeyDown={handleChatKeyDown}
                sendChatMessage={sendChatMessage}
              />
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
