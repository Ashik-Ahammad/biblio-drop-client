export default function Loading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-slate-950">
      <div className="absolute h-72 w-72 rounded-full bg-indigo-500/20 blur-3xl animate-pulse" />
      <div className="absolute h-60 w-60 rounded-full bg-amber-400/10 blur-3xl animate-pulse delay-300" />

      <div className="relative flex flex-col items-center gap-6">
        <div className="absolute h-36 w-36 rounded-full border-2 border-dashed border-indigo-400/40 animate-spin" />

        <div className="relative z-10 flex h-20 w-28 overflow-hidden rounded-md shadow-2xl">
          <div className="w-1/2 bg-indigo-900 border-r border-indigo-700" />

          <div className="w-1/2 bg-indigo-800" />

          <div className="absolute left-1/2 top-1/2 h-16 w-1 -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-300" />

          <div className="absolute left-1/2 top-0 h-8 w-2 -translate-x-1/2 rounded-b-md bg-amber-500" />
        </div>

        <div className="flex items-end gap-2">
          <div className="h-5 w-3 rounded-sm bg-amber-400 animate-bounce" />
          <div className="h-7 w-3 rounded-sm bg-emerald-400 animate-bounce delay-150" />
          <div className="h-6 w-3 rounded-sm bg-sky-400 animate-bounce delay-300" />
          <div className="h-8 w-3 rounded-sm bg-rose-400 animate-bounce delay-500" />
        </div>

        <div className="flex gap-2">
          <span className="h-2 w-2 rounded-full bg-white animate-bounce" />
          <span className="h-2 w-2 rounded-full bg-white animate-bounce delay-150" />
          <span className="h-2 w-2 rounded-full bg-white animate-bounce delay-300" />
        </div>

        <p className="text-sm font-medium tracking-[0.3em] uppercase text-slate-400">
          Loading Library...
        </p>
      </div>
    </div>
  );
}
