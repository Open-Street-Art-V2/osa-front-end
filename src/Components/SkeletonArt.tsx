function SkeletonArt() {
  return (
    <div className="animate-pulse">
      <div className="h-3 w-36 bg-slate-200 rounded mb-5" />
      <div className="h-56 w-68 bg-slate-200 rounded mb-5" />
      <div className="h-3 w-68 bg-slate-200 rounded" />
      <div className="pt-5">
        <div className="h-2 w-68 bg-slate-200 rounded mb-2" />
        <div className="h-2 w-68 bg-slate-200 rounded mb-2" />
        <div className="h-2 w-68 bg-slate-200 rounded mb-2" />
      </div>
      <div className="pt-3">
        <div className="h-2 w-68 bg-slate-200 rounded mb-2" />
        <div className="h-2 w-28 bg-slate-200 rounded mb-2" />
      </div>
    </div>
  );
}

export default SkeletonArt;
