import "./styles.scss";
import { createEffect, createSignal } from "solid-js";
import RichMedia from "@/components/Shared/RichMedia";
import { ProjectMediaContent } from "@/content/types";

interface Props {
  content: ProjectMediaContent[];
  onChange: (activeIndex: number) => void;
}

export default function ProjectPreviewCarousel(props: Props) {
  // oxlint-disable-next-line no-unassigned-vars
  let containerRef: HTMLDivElement | undefined;
  const mediaLength = props.content.length;
  const [mediaIndex, setMediaIndex] = createSignal(0);

  function updateMediaIndex() {
    setMediaIndex((mediaIndex() + 1) % mediaLength);
    if (containerRef) {
      containerRef.scrollTo({
        left: containerRef.clientWidth * mediaIndex(),
        behavior: "smooth",
      });
    }
  }

  createEffect(() => {
    props.onChange(mediaIndex());
  });

  return (
    <button onclick={updateMediaIndex} class="project-preview-carousel">
      <div class="project-preview-carousel__content" ref={containerRef}>
        {props.content.map((media) => (
          <RichMedia content={media} />
        ))}
      </div>
    </button>
  );
}
