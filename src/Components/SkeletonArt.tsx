function SkeletonArt() {
  return (
    <div className="flex flex-row col-span-5">
      <div className="w-32 h-24 bg-slate-200 rounded-3xl" />
      <div className="w-44 h-20 overflow-hidden pl-2">
        <div className="flex flex-row justify-between mt-3 mb-2">
          <div className="h-2 w-24 bg-slate-200 rounded" />
          <div className="h-2 w-12 bg-slate-200 rounded pt-1" />
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

export default SkeletonArt;
