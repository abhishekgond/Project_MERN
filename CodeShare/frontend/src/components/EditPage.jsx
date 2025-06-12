// pages/EditorPage.jsx
import React, { useState } from "react";
import Client from "./Client";
import Editor from "./Editor";
import { availableLanguages } from "./Language";
import { availableThemes, themeMap, formatThemeName } from "./Theme";

export default function EditorPage() {
  const [clients, setClients] = useState([
    { socketId: 1, userName: "Abhishek Gond" },
    { socketId: 2, userName: "Ravi Kumar" },
    { socketId: 4, userName: "Aman" },
    { socketId: 5, userName: "dev" },
    { socketId: 6, userName: "sonam" },
    { socketId: 7, userName: "kamal" },
  ]);

  const [theme, setTheme] = useState("dracula");
  const [language, setLanguage] = useState("javascript");

  return (
    <div className="flex flex-col h-screen bg-[#121212] text-white">
      {/* Header */}
      <header className="flex justify-between items-center px-6 py-4 bg-zinc-900 border-b border-zinc-800 shadow-md">
        <div className="text-2xl font-bold">🖥️ CODECAST</div>

        <div className="flex items-center space-x-4">
          {/* Theme Selector */}
          <div className="flex flex-col">
            <label htmlFor="themeSelect" className="text-sm font-medium">
              Theme:
            </label>
            <select
              id="themeSelect"
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              className="bg-zinc-800 text-white px-3 py-1 rounded-md focus:outline-none cursor-pointer"
            >
              {availableThemes.map((t) => (
                <option key={t} value={t} className="text-black cursor-pointer">
                  {formatThemeName(t)}
                </option>
              ))}
            </select>
          </div>

          {/* Language Selector */}
          <div className="flex flex-col ">
            <label htmlFor="languageSelect" className="text-sm font-medium ">
              Language:
            </label>
            <select
              id="languageSelect"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="bg-zinc-800 text-white px-3 py-1 rounded-md focus:outline-none cursor-pointer"
            >
              {availableLanguages.map((lang) => (
                <option
                  key={lang}
                  value={lang}
                  className="text-black cursor-pointer"
                >
                  {lang.charAt(0).toUpperCase() + lang.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>
      </header>

      {/* Body */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-[260px] bg-zinc-900 border-r border-zinc-800 p-4 flex flex-col justify-between ">
          <div>
            <h2 className="text-lg font-semibold mb-3 ">Members</h2>
            <ul className="space-y-3">
              {clients.map((client) => (
                <li key={client.socketId}>
                  <Client name={client.userName} />
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-2 mt-4">
            <button className="w-full py-2 bg-green-600 hover:bg-green-700 rounded cursor-pointer">
              Copy Room ID
            </button>
            <button className="w-full py-2 bg-red-600 hover:bg-red-700 rounded  cursor-pointer">
              Leave Room
            </button>
          </div>
        </aside>

        {/* Main Editor Area */}
        <main className="flex-1 p-4 overflow-hidden">
          <div className="h-full">
            <Editor
              defaultCode={`// Start Your Code ...`}
              theme={themeMap[theme] || "dracula"}
              language={language}
            />
          </div>
        </main>
      </div>
    </div>
  );
}
