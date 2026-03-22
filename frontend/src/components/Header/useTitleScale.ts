import { onCleanup } from "solid-js";

const EFFECT_RANGE_PX = 200;

export function clamp(input: number, min: number, max: number): number {
  return input < min ? min : input > max ? max : input;
}

export function mapRange(
  current: number,
  in_min: number,
  in_max: number,
  out_min: number,
  out_max: number,
): number {
  const mapped: number =
    ((current - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min;
  return clamp(mapped, out_min, out_max);
}

export function titleScaler(el: HTMLAnchorElement) {
  function updateScroll() {
    if (!el) return;
    const maxScale = (window.innerWidth / el.clientWidth) * 0.99;
    const value = mapRange(window.scrollY, 0, EFFECT_RANGE_PX, 0, 1);
    const scale = mapRange(value, 1, 0, 1, maxScale);
    el.style.scale = String(scale);
  }

  window.addEventListener("scroll", updateScroll);
  window.addEventListener("resize", updateScroll);
  setTimeout(() => {
    updateScroll();
  });

  onCleanup(() => {
    window.removeEventListener("scroll", updateScroll);
    window.removeEventListener("resize", updateScroll);
  });
}
