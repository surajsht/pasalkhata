const TableLoader = () => {
  return (
    <tbody className="divide-y">
      {Array.from({ length: 10 }).map((_, idx) => {
        return (
          <tr key={idx} className="animate-pulse">
            <td className="w-[25%] p-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-200 rounded-md shrink-0"></div>
                <div className="space-y-2 flex-1">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                </div>
              </div>
            </td>

            <td className="w-[12%] p-3">
              <div className="h-4 bg-gray-200 rounded w-20"></div>
            </td>

            <td className="w-[12%] p-3">
              <div className="h-4 bg-gray-200 rounded w-24"></div>
            </td>

            <td className="w-[10%] p-3">
              <div className="h-4 bg-gray-200 rounded w-16"></div>
            </td>

            <td className="w-[8%] p-3">
              <div className="h-4 bg-gray-200 rounded w-10"></div>
            </td>

            <td className="w-[11%] p-3">
              <div className="h-5 bg-gray-200 rounded-full w-20"></div>
            </td>

            <td className="w-[12%] p-3">
              <div className="h-4 bg-gray-200 rounded w-20"></div>
            </td>

            <td className="w-[10%] p-3">
              <div className="flex gap-2">
                <div className="w-7 h-2 bg-gray-200 rounded"></div>
              </div>
            </td>
          </tr>
        );
      })}
    </tbody>
  );
};

export default TableLoader;
