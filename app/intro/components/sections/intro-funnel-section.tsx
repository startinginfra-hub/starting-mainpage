import { IntroHeroFunnel } from "./intro-hero-funnel"

export function IntroFunnelSection() {
  return (
    <section className="intro-funnel-section relative w-full">
      <div className="intro-funnel-inner relative z-10 mx-auto w-full max-w-[1180px]">
        <IntroHeroFunnel />
      </div>
    </section>
  )
}
