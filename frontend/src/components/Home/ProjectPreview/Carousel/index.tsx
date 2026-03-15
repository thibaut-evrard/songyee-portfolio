import "./styles.scss";
import { createSignal } from "solid-js";
import RichMedia from "@/components/Shared/RichMedia";
import { ProjectMediaContent } from "@/content/types";

interface Props {
  content: ProjectMediaContent[];
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

  return (
    <button onclick={updateMediaIndex} class="project-preview-carousel">
      <div class="project-preview-carousel__content" ref={containerRef}>
        {props.content.map((media) => (
          <RichMedia content={media} />
        ))}
      </div>
      <p>
        {String(mediaIndex() + 1)} / {mediaLength}
      </p>
    </button>
  );
}
