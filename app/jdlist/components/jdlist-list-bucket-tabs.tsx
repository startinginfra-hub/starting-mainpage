import Link from "next/link"
import type { JdListBucketFilter } from "@/lib/jdlist/load-jdlist-home-postings"
import { cn } from "@/lib/utils"

const BUCKET_TABS: Array<{ value: JdListBucketFilter; label: string }> = [
  { value: "all", label: "전체" },
  { value: "it", label: "IT 직군" },
  { value: "other", label: "그외 직군" },
]

type JdListListBucketTabsProps = {
  activeBucket: JdListBucketFilter
}

function buildListHref(bucket: JdListBucketFilter): string {
  if (bucket === "all") return "/jdlist/list"
  return `/jdlist/list?bucket=${bucket}`
}

export function JdListListBucketTabs({ activeBucket }: JdListListBucketTabsProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {BUCKET_TABS.map((tab) => {
        const isActive = activeBucket === tab.value
        return (
          <Link
            key={tab.value}
            href={buildListHref(tab.value)}
            className={cn(
              "rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors",
              isActive
                ? "bg-[#1A7CFF] text-white"
                : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200/80 hover:text-foreground",
            )}
          >
            {tab.label}
          </Link>
        )
      })}
    </div>
  )
}
