export default function ProgressBar({ progress }: { progress: number }) {
  return (
    <div className="relative w-full h-6 bg-gray-300 rounded-full overflow-hidden shadow-inner">
      <div
        className="absolute top-0 left-0 h-full bg-linear-to-r from-blue-500 to-green-400 rounded-full transition-all duration-500"
        style={{ width: `${progress}%` }}
      ></div>
      <div className="absolute w-full text-center text-sm font-semibold text-white drop-shadow-lg">
        {Math.round(progress)}%
      </div>
    </div>
  );
}
