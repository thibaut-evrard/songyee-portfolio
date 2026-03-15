import "./styles.scss";
import { ROUTES } from "@/constants/routes";
import { ProjectContent } from "@/content/types";
import ProjectPreviewCarousel from "./Carousel";

interface Props {
  content: ProjectContent;
  disabled?: boolean;
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
    <div class={`project-preview ${props.disabled ? "disabled" : ""}`}>
      <ProjectPreviewCarousel content={props.content.section[0].media} />
      <a href={ROUTES.project(props.content.slug)}>
        {getDescription(props.content)}
      </a>
    </div>
  );
}
