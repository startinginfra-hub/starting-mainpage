export default function MarketingLoading() {
  return (
    <div className="max-w-full overflow-x-clip">
      <div className="animate-pulse bg-[#fbfcfe] px-4 py-16 md:px-8 md:py-24" aria-hidden>
        <div className="mx-auto max-w-4xl space-y-6">
          <div className="h-10 w-3/4 rounded-lg bg-neutral-200/80" />
          <div className="h-6 w-full max-w-2xl rounded-md bg-neutral-200/60" />
          <div className="mt-10 h-64 rounded-2xl bg-neutral-200/50" />
        </div>
      </div>
      <div className="animate-pulse px-4 py-12 md:px-8" aria-hidden>
        <div className="mx-auto h-8 w-40 rounded-md bg-neutral-200/70" />
        <div className="mx-auto mt-8 grid max-w-5xl grid-cols-2 gap-4 md:grid-cols-4">
          {Array.from({ length: 8 }, (_, index) => (
            <div key={index} className="h-12 rounded-lg bg-neutral-200/50" />
          ))}
        </div>
      </div>
    </div>
  )
}
