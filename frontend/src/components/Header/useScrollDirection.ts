import { createEffect, createSignal } from "solid-js";

export function useScrollDirection() {
  let scrollY = window.scrollY;
  const [scrollDirection, setScrollDirection] = createSignal(1);

  createEffect(() => {
    function updateScrollDirection() {
      const direction = Math.sign(window.scrollY - scrollY);
      scrollY = window.scrollY;
      setScrollDirection(direction);
    }

    window.addEventListener("scroll", updateScrollDirection);

    return () => {
      return window.removeEventListener("scroll", updateScrollDirection);
    };
  });

  return scrollDirection;
}
