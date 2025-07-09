interface ProgressBarProps {
  step: number;
}

export default function ProgressBar({ step }: ProgressBarProps) {
  const progress = step * 20;

  return (
    <div className="mb-6">
      <h3 className="text-sm font-semibold text-gray-800">Verification Progress</h3>
      <div className="w-full bg-gray-200 h-2 rounded">
        <div 
          className="h-2 bg-black rounded transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>
      <p className="text-right text-sm mt-1 text-gray-600">{progress}% Complete</p>
    </div>
  );
}