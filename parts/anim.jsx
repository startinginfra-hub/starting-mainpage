// Starting wordmark — theme-specific PNG logos
function StartingLogo({ height = 22, ...rest }) {
  return (
    <span className="starting-logo" aria-hidden="true" {...rest}>
      <img
        src="assets/logo.png"
        alt=""
        className="starting-logo-img starting-logo-img--light"
        style={{ height, width: "auto" }}
        decoding="async"
      />
      <img
        src="assets/logo-white.png"
        alt=""
        className="starting-logo-img starting-logo-img--dark"
        style={{ height, width: "auto" }}
        decoding="async"
      />
    </span>
  );
}

// Hook: detect when an element enters viewport (once)
function useInView(options = { threshold: 0.18, rootMargin: "0px 0px -40px 0px" }) {
  const ref = React.useRef(null);
  const [inView, setInView] = React.useState(false);
  React.useEffect(() => {
    if (!ref.current || inView) return;
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      });
    }, options);
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [inView]);
  return [ref, inView];
}

// Hook: count from 0 → target with easing
function useCountUp(target, { duration = 1600, start = false, decimals = 0 } = {}) {
  const [value, setValue] = React.useState(0);
  React.useEffect(() => {
    if (!start) return;
    let raf;
    const t0 = performance.now();
    const tick = (now) => {
      const t = Math.min(1, (now - t0) / duration);
      const eased = 1 - Math.pow(1 - t, 3); // easeOutCubic
      setValue(target * eased);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, start, duration]);
  return decimals === 0 ? Math.round(value) : Number(value.toFixed(decimals));
}

// Component: animated counter w/ formatting
function CountNum({ to, format = (n) => n.toLocaleString(), duration = 1600 }) {
  const [ref, inView] = useInView();
  const v = useCountUp(to, { start: inView, duration });
  return <span ref={ref}>{format(v)}</span>;
}

// Wrapper: fade-up on scroll into view
function Reveal({ as: Tag = "div", delay = 0, y = 16, children, className, style, ...rest }) {
  const [ref, inView] = useInView();
  return (
    <Tag
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : `translateY(${y}px)`,
        transition: `opacity .7s cubic-bezier(.2,.7,.2,1) ${delay}ms, transform .7s cubic-bezier(.2,.7,.2,1) ${delay}ms`,
        ...style,
      }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

// Wrapper: animate a width from 0% → target when scrolled into view
function GrowBar({ to = 100, duration = 1400, delay = 0, className, style, ...rest }) {
  const [ref, inView] = useInView();
  return (
    <i
      ref={ref}
      className={className}
      style={{
        display: "block", height: "100%",
        width: inView ? `${to}%` : "0%",
        transition: `width ${duration}ms cubic-bezier(.2,.7,.2,1) ${delay}ms`,
        ...style,
      }}
      {...rest}
    />
  );
}

Object.assign(window, { StartingLogo, useInView, useCountUp, CountNum, Reveal, GrowBar });
