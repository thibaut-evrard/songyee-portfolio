import "./styles.scss";
import { MediaContent } from "@/content/types";

interface Props {
  content: MediaContent;
}

function getPublicSrc(src: string) {
  return `/media/${src}`;
}

export default function RichMedia(props: Props) {
  const publicSrc = getPublicSrc(props.content.src);

  if (props.content.type === "image") {
    return <img src={publicSrc} alt={props.content.alt} class="rich-media" />;
  } else if (props.content.type === "video") {
    return (
      <video src={publicSrc} playsinline autoplay muted class="rich-media" />
    );
  } else {
    return null;
  }
}
