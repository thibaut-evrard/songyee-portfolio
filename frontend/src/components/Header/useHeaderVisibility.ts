import { createEffect, createSignal } from "solid-js";
import { useScrollDirection } from "./useScrollDirection";

const PADDING_HEIGHT = 400;

export function useHeaderVisibility() {
  const [visible, setVisible] = createSignal(true);
  const scrollDirection = useScrollDirection();

  createEffect(() => {
    function updateScrollDirection() {
      if (window.scrollY < PADDING_HEIGHT) {
        setVisible(true);
      } else {
        setVisible(scrollDirection() === -1);
      }
    }

    window.addEventListener("scroll", updateScrollDirection);

    return () => {
      return window.removeEventListener("scroll", updateScrollDirection);
    };
  });

  return visible;
}
