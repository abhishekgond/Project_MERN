import React, { useState } from "react";
import { FaThumbsUp, FaHeart, FaLaughSquint, FaSurprise } from "react-icons/fa";
import { BiLike, BiComment, BiShare, BiSend } from "react-icons/bi";

const reactionOptions = [
  { icon: <FaThumbsUp />, label: "Like" },
  { icon: <FaHeart />, label: "Love" },
  { icon: <FaLaughSquint />, label: "Haha" },
  { icon: <FaSurprise />, label: "Wow" },
];

const PostCard = ({ user, post }) => {
  const [reaction, setReaction] = useState(null);
  const [showReactions, setShowReactions] = useState(false);

  return (
    <div className="max-w-xl mx-auto bg-white rounded-lg shadow-lg border my-4 p-4">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div className="flex gap-3 items-center">
          <img
            src={user.avatar}
            alt="avatar"
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <h2 className="font-semibold text-sm">{user.name}</h2>
            <p className="text-xs text-gray-500">{user.title}</p>
          </div>
        </div>
        <button className="text-blue-600 text-sm font-semibold hover:underline">
          + Follow
        </button>
      </div>

      {/* Post Text */}
      <p className="text-sm mt-3 mb-2">{post.text}</p>

      {/* Post Image */}
      <div className="rounded-md overflow-hidden">
        <img
          src={post.image}
          alt="post"
          className="w-full object-cover hover:scale-105 transition duration-300"
        />
      </div>

      {/* Reactions + Like bar */}
      <div className="flex items-center justify-between mt-4">
        <div
          onMouseEnter={() => setShowReactions(true)}
          onMouseLeave={() => setShowReactions(false)}
          className="relative"
        >
          <button className="flex items-center gap-1 text-gray-600 text-sm hover:text-blue-600">
            <BiLike className="text-lg" />
            {reaction ? reaction : "Like"}
          </button>

          {showReactions && (
            <div className="absolute bottom-8 left-0 flex gap-2 bg-white shadow-md rounded-full px-2 py-1 z-50">
              {reactionOptions.map((opt, index) => (
                <div
                  key={index}
                  onClick={() => {
                    setReaction(opt.label);
                    setShowReactions(false);
                  }}
                  className="cursor-pointer text-xl hover:scale-110 transition"
                  title={opt.label}
                >
                  {opt.icon}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex items-center gap-5 text-gray-600 text-sm">
          <button className="flex items-center gap-1 hover:text-blue-600">
            <BiComment className="text-lg" /> Comment
          </button>
          <button className="flex items-center gap-1 hover:text-blue-600">
            <BiShare className="text-lg" /> Repost
          </button>
          <button className="flex items-center gap-1 hover:text-blue-600">
            <BiSend className="text-lg" /> Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
