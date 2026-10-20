const PaginationLoader = () => {
  return (
    <div className="flex items-center justify-center gap-6 animate-pulse my-6">
      <div className="bg-gray-300 px-10 py-4 rounded-md"></div>

      <div className="flex items-center gap-4">
        {Array.from({ length: 3 }).map((_, idx) => {
          return (
            <div key={idx} className="bg-gray-300 px-5 py-4 rounded-md"></div>
          );
        })}
      </div>

      <div className="bg-gray-300 px-10 py-4 rounded-md"></div>
    </div>
  );
};

export default PaginationLoader;
