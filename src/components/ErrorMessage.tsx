import { IoWarningOutline } from "react-icons/io5";

type ErrorMessageType = {
  text: string;
  error: string;
  refetch: () => void;
};

const ErrorMessage = ({ text, error, refetch }: ErrorMessageType) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center border-2 border-border rounded-lg bg-white max-w-md mx-auto my-8">
      <div className="p-3 bg-red-50 rounded-full text-danger mb-3 text-3xl">
        <IoWarningOutline />
      </div>

      <h2 className="text-base font-semibold text-gray-900">{text}</h2>
      <p className="text-sm text-gray-500 mt-1 mb-5">{error}</p>

      <button
        onClick={() => refetch()}
        className="px-4 py-2 border border-gray-300 text-gray-700 hover:bg-gray-50 text-sm font-medium rounded-md transition-colors cursor-pointer"
      >
        Try Again
      </button>
    </div>
  );
};

export default ErrorMessage;
