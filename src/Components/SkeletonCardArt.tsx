function SkeletonCardArt() {
  return (
    <div className="flex flex-row animate-pulse px-1">
      <div className="w-36 h-24 bg-slate-200 rounded-3xl" />
      <div className="grow h-20 overflow-hidden pl-2">
        <div className="flex flex-row justify-between mt-3 mb-2">
          <div className="h-2 w-28 bg-slate-200 rounded" />
          <div className="h-2 w-16 bg-slate-200 rounded pt-1" />
        </div>
        <div className="mt-5">
          <div className="h-2 bg-slate-200 rounded mb-2" />
          <div className="h-2 bg-slate-200 rounded mb-2" />
          <div className="h-2 bg-slate-200 rounded mb-2" />
        </div>
      </div>
    </div>
  );
}

export default SkeletonCardArt;
