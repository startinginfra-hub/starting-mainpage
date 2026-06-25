import { STEP_TABS, TAB_TO_SCENE } from "./funnel-constants"
import { cn } from "@/lib/utils"

type Props = {
  activeTab: number
  onTabClick: (index: number) => void
}

export function FunnelStepTabs({ activeTab, onTabClick }: Props) {
  return (
    <div className="fn-step-tabs" role="tablist" aria-label="채용 프로세스">
      <div className="fn-step-tabs-track">
        <span
          className="fn-step-indicator"
          style={{ transform: `translateX(calc(${activeTab} * 100%))` }}
          aria-hidden
        />
        {STEP_TABS.map((tab, index) => {
          const isActive = index === activeTab
          const isDone = index < activeTab

          return (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => onTabClick(index)}
              className={cn(
                "fn-step-tab",
                isActive && "fn-step-tab-active",
                isDone && "fn-step-tab-done",
              )}
            >
              <span className="fn-step-label md:hidden">{tab.labelShort}</span>
              <span className="fn-step-label hidden md:inline">{tab.label}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

export function tabIndexToScene(index: number) {
  return TAB_TO_SCENE[index]
}
