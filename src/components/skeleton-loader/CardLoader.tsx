const CardLoader = () => {
  return (
    <>
      {Array.from({ length: 4 }).map((_, idx) => {
        return (
          <li key={idx} className="animate-pulse">
            <div className="relative">
              <div className="h-60 w-full bg-gray-200"></div>
              <div className="absolute top-5 right-5 bg-gray-300 h-6 w-16"></div>
            </div>

            <div className="space-y-4 p-4">
              <div className="flex items-center justify-between gap-2">
                <div className="bg-gray-200 px-10 py-2"></div>
                <div className="bg-gray-200 p-2"></div>
              </div>

              <div>
                <div className="h-8 w-3/5 bg-gray-200 mb-3"></div>
                <div className="h-4 w-12 bg-gray-200"></div>
              </div>

              <div className="flex items-center justify-between gap-2">
                <div>
                  <div className="bg-gray-200 h-2 w-10 mb-2"></div>
                  <div className="h-6 w-24 bg-gray-200"></div>
                </div>

                <div>
                  <div className="bg-gray-200 h-2 w-10 mb-2"></div>
                  <div className="h-6 w-24 bg-gray-200"></div>
                </div>
              </div>

              <div className="h-2 w-2/3 bg-gray-200"></div>
            </div>
          </li>
        );
      })}
    </>
  );
};

export default CardLoader;
