import { ProjectContent } from "~/content/types";
import ProjectPreviewCarousel from "./Carousel";

interface Props {
  content: ProjectContent;
}

function getDescription(content: ProjectContent) {
  const values = [
    content.info.client,
    content.info.project_name,
    content.info.tag,
    content.info.year,
  ];
  return values.join(", ");
}

export default function ProjectPreview(props: Props) {
  return (
    <div>
      <ProjectPreviewCarousel content={props.content.section[0].media} />
      <p>{getDescription(props.content)}</p>
    </div>
  );
}
