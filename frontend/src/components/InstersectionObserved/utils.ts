import gsap from "gsap";

export function animateScroll(target: number, onComplete: () => void) {
  const scroller = { value: window.scrollY };
  return gsap.to(scroller, {
    value: target,
    duration: 1,
    onUpdate: () => {
      window.scrollTo({ top: scroller.value });
    },
    onComplete: onComplete,
    onInterrupt: onComplete,
  });
}
