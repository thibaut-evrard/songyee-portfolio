import { ProjectContent } from "~/content/types";

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
      <div></div>
      <p>{getDescription(props.content)}</p>
    </div>
  );
}
