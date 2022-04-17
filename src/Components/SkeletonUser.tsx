function SkeletonUser() {
  return (
    <div className="animate-pulse">
      <div className="pt-3 mx-6">
        <div className="flex flex-row col-span-5 pb-6 pl-2">
          <div className="w-24 h-24 bg-slate-200 rounded-3xl" />
          <div className="w-44 h-20 overflow-hidden pl-8">
            <div className="h-2 w-36 bg-slate-200 rounded mt-3 mb-2" />
            <div className="h-2 w-32 bg-slate-200 rounded mt-5" />
          </div>
        </div>

        <div className="w-68 h-20 bg-slate-200 rounded-full mb-6" />
        <div className="w-68 h-20 bg-slate-200 rounded-full mb-6" />
        <div className="w-68 h-20 bg-slate-200 rounded-full mb-6" />
      </div>
    </div>
  );
}

export default SkeletonUser;
