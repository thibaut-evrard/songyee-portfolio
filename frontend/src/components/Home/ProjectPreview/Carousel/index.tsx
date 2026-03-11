import { createSignal } from "solid-js";
import RichMedia from "~/components/Shared/RichMedia";
import { ProjectMediaContent } from "~/content/types";

interface Props {
  content: ProjectMediaContent[];
}

export default function ProjectPreviewCarousel(props: Props) {
  const mediaLength = props.content.length;
  const [mediaIndex, setMediaIndex] = createSignal(0);

  return (
    <button onclick={() => setMediaIndex((mediaIndex() + 1) % mediaLength)}>
      <div>
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
