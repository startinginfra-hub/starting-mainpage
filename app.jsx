// Starting Landing — main app

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "accent": "default",
  "dark": true,
  "showLogos": true,
  "showTestimonials": true,
  "heroVariant": "centered",
  "cornerStyle": "soft"
}/*EDITMODE-END*/;

function App() {
  const [t, setTweak] = useTweaks(TWEAK_DEFAULTS);

  React.useEffect(() => {
    document.documentElement.setAttribute("data-theme", t.dark ? "dark" : "light");
    if (t.accent && t.accent !== "default") {
      document.documentElement.setAttribute("data-accent", t.accent);
    } else {
      document.documentElement.removeAttribute("data-accent");
    }
    if (t.cornerStyle === "sharp") {
      document.documentElement.style.setProperty("--r-md", "4px");
      document.documentElement.style.setProperty("--r-lg", "6px");
      document.documentElement.style.setProperty("--r-xl", "8px");
      document.documentElement.style.setProperty("--r-2xl", "10px");
    } else {
      document.documentElement.style.removeProperty("--r-md");
      document.documentElement.style.removeProperty("--r-lg");
      document.documentElement.style.removeProperty("--r-xl");
      document.documentElement.style.removeProperty("--r-2xl");
    }
  }, [t.dark, t.accent, t.cornerStyle]);

  return (
    <>
      <Nav onToggleTheme={() => setTweak("dark", !t.dark)} dark={t.dark} />
      <main>
        <Hero />
        {t.showLogos && <Logos />}
        <Comparison />
        <Stats />
        <ProductPreview />
        <Features />
        <Process />
        {t.showTestimonials && <Testimonials />}
        <Pricing />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />

      <Chatbot />

      <TweaksPanel title="Tweaks">
        <TweakSection label="Theme" />
        <TweakColor
          label="Accent"
          value={t.accent}
          options={[
            { value: "default",  color: "#2f66f6" },
            { value: "indigo",   color: "#4c56e2" },
            { value: "teal",     color: "#109a8d" },
            { value: "charcoal", color: "#2a3245" },
          ].map(o => o.color)}
          onChange={(v) => {
            const map = { "#2f66f6":"default","#4c56e2":"indigo","#109a8d":"teal","#2a3245":"charcoal" };
            setTweak("accent", map[v] || "default");
          }}
        />
        <TweakToggle label="Dark mode" value={t.dark} onChange={(v) => setTweak("dark", v)} />
        <TweakRadio  label="Corners" value={t.cornerStyle} options={["soft", "sharp"]} onChange={(v) => setTweak("cornerStyle", v)} />

        <TweakSection label="Sections" />
        <TweakToggle label="Customer logos" value={t.showLogos} onChange={(v) => setTweak("showLogos", v)} />
        <TweakToggle label="Testimonials"   value={t.showTestimonials} onChange={(v) => setTweak("showTestimonials", v)} />
      </TweaksPanel>
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
