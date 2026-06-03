const SkeletonCard = () => {
  return (
    <>
      <div className="animate-pulse rounded-2xl border border-slate-800 p-4">
        <div className="h-6 w-24 bg-slate-700 rounded"></div>
        <div className="mt-4 space-y-3">
          <div className="h-5 w-3/4 bg-slate-700 rounded"></div>
          <div className="h-4 w-1/2 bg-slate-700 rounded"></div>
        </div>
        <div className="mt-4 flex gap-2">
          <div className="h-8 w-20 bg-slate-700 rounded-full"></div>
          <div className="h-8 w-20 bg-slate-700 rounded-full"></div>
        </div>
      </div>
    </>
  );
};

export default SkeletonCard;
