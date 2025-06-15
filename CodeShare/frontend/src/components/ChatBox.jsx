import React, { useEffect, useRef, useState } from "react";
import { IoChatbox, IoExpand } from "react-icons/io5";
import { ImCross } from "react-icons/im";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
export default function ChatBox({
  chatMessages,
  chatInput,
  setChatInput,
  handleChatKeyDown,
  sendChatMessage,
}) {
  const [minimized, setMinimized] = useState(false);
  const [visible, setVisible] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [position, setPosition] = useState({ x: 20, y: 20 });

  const [isResizing, setIsResizing] = useState(false);
  const [dimensions, setDimensions] = useState({ width: 448, height: 480 }); // default size: 28rem x 30rem

  const boxRef = useRef(null);

  // Drag to move
  const startDrag = (e) => {
    if (isResizing) return;
    setIsDragging(true);
    const startX = e.clientX || e.touches[0].clientX;
    const startY = e.clientY || e.touches[0].clientY;
    const rect = boxRef.current.getBoundingClientRect();
    setOffset({ x: startX - rect.left, y: startY - rect.top });
  };

  const duringDrag = (e) => {
    if (isDragging) {
      const moveX = e.clientX || e.touches[0].clientX;
      const moveY = e.clientY || e.touches[0].clientY;
      setPosition({ x: moveX - offset.x, y: moveY - offset.y });
    } else if (isResizing) {
      const moveX = e.clientX || e.touches[0].clientX;
      const moveY = e.clientY || e.touches[0].clientY;
      const newWidth = moveX - boxRef.current.getBoundingClientRect().left;
      const newHeight = moveY - boxRef.current.getBoundingClientRect().top;
      setDimensions({
        width: Math.max(300, Math.min(newWidth, window.innerWidth - 40)),
        height: Math.max(300, Math.min(newHeight, window.innerHeight - 40)),
      });
    }
  };

  const endDrag = () => {
    setIsDragging(false);
    setIsResizing(false);
  };

  useEffect(() => {
    window.addEventListener("mousemove", duringDrag);
    window.addEventListener("mouseup", endDrag);
    window.addEventListener("touchmove", duringDrag);
    window.addEventListener("touchend", endDrag);
    return () => {
      window.removeEventListener("mousemove", duringDrag);
      window.removeEventListener("mouseup", endDrag);
      window.removeEventListener("touchmove", duringDrag);
      window.removeEventListener("touchend", endDrag);
    };
  }, [isDragging, isResizing, offset]);

  if (!visible) return null;

  return (
    <div
      ref={boxRef}
      className="fixed z-50 bg-zinc-900 border border-zinc-700 rounded-lg shadow-lg text-white"
      style={{
        left: position.x,
        top: position.y,
        width: dimensions.width,
        height: dimensions.height,
        touchAction: "none",
        maxWidth: "95vw",
        maxHeight: "95vh",
        minWidth: 300,
        minHeight: 300,
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Header */}
      <div
        className="flex justify-between items-center p-2 font-semibold bg-zinc-800 rounded-t-lg cursor-move select-none"
        onMouseDown={startDrag}
        onTouchStart={startDrag}
      >
        <span>
          <IoChatbox />
        </span>
        <div className="flex gap-2">
          <button
            onClick={() => setMinimized(!minimized)}
            className="text-white hover:text-zinc-300"
          >
            {minimized ? (
              <FaAngleUp className="mr-2" />
            ) : (
              <FaAngleDown className="mr-2" />
            )}
          </button>
          <button onClick={() => setVisible(false)}>
            <ImCross />
          </button>
        </div>
      </div>

      {/* Body */}
      {!minimized && (
        <>
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-2 space-y-2 text-sm">
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
              rows={3}
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

      {/* Resize handle */}
      <div
        onMouseDown={() => setIsResizing(true)}
        onTouchStart={() => setIsResizing(true)}
        className="absolute bottom-1 right-1 w-5 h-5 cursor-nwse-resize text-zinc-500 text-sm select-none"
      >
        <IoExpand />
      </div>
    </div>
  );
}
