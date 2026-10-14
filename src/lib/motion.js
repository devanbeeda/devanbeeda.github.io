// The site plays all of its animations for every visitor.
// Many PCs have "reduce motion" / "no animations" switched on (Windows does this when animations are off,
// in remote desktops, and in battery saver). Obeying it turned the intro effects off, so it is ignored here.
// To respect that setting again, make this return window.matchMedia('(prefers-reduced-motion: reduce)').matches
export const prefersReducedMotion = () => false;
