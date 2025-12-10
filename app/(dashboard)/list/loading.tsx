const Loading = () => {
  return (
    <div className="p-8 animate-pulse">
      <div className="bg-zinc-900 rounded-xl border border-zinc-800 overflow-hidden">
        <div className="p-6 border-b border-zinc-800 flex space-x-32">
          <div className="h-6 bg-zinc-700 rounded w-1/6"></div>
          <div className="h-6 bg-zinc-700 rounded w-2/6"></div>
          <div className="h-6 bg-zinc-700 rounded w-1/6"></div>
          <div className="h-6 bg-zinc-700 rounded w-1/6"></div>
        </div>
        <div className="p-4">
          {[...Array(10)].map((_, index) => (
            <div
              key={index}
              className="flex items-center justify-between mb-4 py-2 mt-4"
            >
              <div className="h-8 bg-zinc-800 rounded w-1/6 mr-2"></div>
              <div className="h-8 bg-zinc-800 rounded w-2/6 mr-2"></div>
              <div className="h-8 bg-zinc-800 rounded w-1/6 mr-2"></div>
              <div className="h-8 bg-zinc-800 rounded w-1/6"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Loading;
