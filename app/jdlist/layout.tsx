import { JdListScrollReset } from "./components/jdlist-scroll-reset"
import "./jdlist.css"

export default function JdListLayout({ children }: { children: React.ReactNode }) {
  return <JdListScrollReset>{children}</JdListScrollReset>
}
