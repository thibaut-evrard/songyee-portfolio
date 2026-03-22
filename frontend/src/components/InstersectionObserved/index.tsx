import { children, createEffect, ParentProps } from "solid-js";

interface Props extends ParentProps {
  threshold?: number;
  onVisible?: (isVisible: boolean) => void;
}

export default function IntersectionObserved(props: Props) {
  // oxlint-disable-next-line no-unassigned-vars
  let containerRef: HTMLDivElement | undefined;
  const safeChildren = children(() => props.children);

  createEffect(() => {
    if (!containerRef) return;

    const observer = new IntersectionObserver(
      (e) => {
        e.forEach((entry) => {
          if (entry.isIntersecting) {
            props.onVisible?.(true);
          } else {
            props.onVisible?.(false);
          }
        });
      },
      {
        rootMargin: "0px",
        threshold: props.threshold ?? 0,
      },
    );

    observer.observe(containerRef);

    return () => {
      observer.disconnect();
    };
  });

  return <div ref={containerRef}>{safeChildren()}</div>;
}
