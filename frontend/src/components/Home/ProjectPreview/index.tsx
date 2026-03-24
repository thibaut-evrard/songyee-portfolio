import "./styles.scss";
import { createSignal } from "solid-js";
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
  const mediaLength = props.content.section[0].media.length;
  const [activeIndex, setActiveIndex] = createSignal(0);

  return (
    <div class={`project-preview ${props.disabled ? "disabled" : ""}`}>
      <ProjectPreviewCarousel
        content={props.content.section[0].media}
        onChange={setActiveIndex}
      />
      <div class="project-preview__meta">
        <p>{getDescription(props.content)}</p>
        <div>
          <p>
            {String(activeIndex() + 1)} / {mediaLength}
          </p>
          <a href={ROUTES.project(props.content.slug)}>Case study {">"}</a>
        </div>
      </div>
    </div>
  );
}
