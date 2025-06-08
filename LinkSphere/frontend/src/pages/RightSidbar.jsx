import { FaInfoCircle } from "react-icons/fa";

const RightSidebar = () => {
  const news = [
    {
      title: "White House delays EU tariffs",
      time: "8h ago",
      readers: "9,887 readers",
    },
    {
      title: "Perks or salary: What pays off?",
      time: "10h ago",
      readers: "434 readers",
    },
    {
      title: "Health supplements see growth spurt",
      time: "9h ago",
      readers: "271 readers",
    },
    {
      title: "Investors get more selective",
      time: "9h ago",
      readers: "213 readers",
    },
    {
      title: "Firms focus on climate shifts",
      time: "9h ago",
      readers: "191 readers",
    },
  ];

  return (
    <div className="w-[25%]  bg-white rounded-xl shadow-sm border p-4 text-sm">
      <div className="flex items-center justify-between mb-2">
        <h2 className="font-semibold">LinkedIn News</h2>
        <FaInfoCircle className="text-gray-500 text-xs" />
      </div>

      <p className="text-gray-500 text-sm mb-2">Top stories</p>

      <ul className="space-y-3">
        {news.map((item, index) => (
          <li key={index} className="cursor-pointer">
            <p className="font-medium hover:underline">{item.title}</p>
            <p className="text-gray-500 text-xs">
              {item.time} • {item.readers}
            </p>
          </li>
        ))}
      </ul>

      <p className="mt-4 text-blue-700 hover:underline cursor-pointer font-medium text-sm">
        Show more ▼
      </p>
    </div>
  );
};

export default RightSidebar;
