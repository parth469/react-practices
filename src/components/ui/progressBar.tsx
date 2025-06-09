export const ProgressBar = ({ value }: { value: number }) => {
  return (
    <div className="border-2 rounded-2xl m-auto w-2xl mt-5 min-h-5 relative">
      <div
        className="bg-green-400 rounded-2xl min-h-5"
        style={{ width: `${value}%` }}
      />
      <span className="absolute inset-0 flex items-center justify-center text-black font-medium">
        {value}%
      </span>
    </div>
  );
};
