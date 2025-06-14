// components/ChatBox.jsx
import React from "react";

export default function ChatBox({
  chatMessages,
  chatInput,
  setChatInput,
  handleChatKeyDown,
  sendChatMessage,
}) {
  const [minimized, setMinimized] = React.useState(false);

  return (
    <div className="fixed bottom-4 right-4 z-50 w-80 bg-zinc-900 border border-zinc-700 rounded-lg shadow-lg text-white">
      {/* Header with Minimize Toggle */}
      <div className="flex justify-between items-center p-2 font-semibold bg-zinc-800 rounded-t-lg">
        <span>💬 Chat</span>
        <button
          onClick={() => setMinimized(!minimized)}
          className="text-white hover:text-zinc-300"
        >
          {minimized ? "🔼" : "🔽"}
        </button>
      </div>

      {/* Body */}
      {!minimized && (
        <>
          <div className="flex-1 overflow-y-auto p-2 space-y-2 text-sm max-h-60">
            {chatMessages.map((msg, idx) => (
              <div key={idx}>
                <span className="text-green-400 font-medium">
                  {msg.userName}
                </span>
                : <span className="text-zinc-200">{msg.message}</span>
                <span className="ml-2 text-xs text-zinc-500">
                  {msg.timestamp}
                </span>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="p-2 border-t border-zinc-800">
            <textarea
              rows={2}
              className="w-full bg-zinc-800 text-white p-2 rounded resize-none outline-none"
              placeholder="Type your message..."
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              onKeyDown={handleChatKeyDown}
            />
            <button
              onClick={sendChatMessage}
              className="mt-2 w-full bg-blue-600 hover:bg-blue-700 text-white py-1 rounded"
            >
              Send
            </button>
          </div>
        </>
      )}
    </div>
  );
}
