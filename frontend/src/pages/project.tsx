import { useParams } from "@solidjs/router";
import RichMedia from "@/components/Shared/RichMedia";
import { APP_CONTENT } from "@/constants/content";
import { ProjectContent, ProjectMediaContent } from "@/content/types";

function getAllMedia(content: ProjectContent) {
  return content?.section.reduce((acc, item) => {
    if (item.media) {
      acc.push(...item.media);
    }
    return acc;
  }, [] as ProjectMediaContent[]);
}

export default function Project() {
  const params = useParams();
  const content = APP_CONTENT.projects.find(
    (project) => project.slug === params.uid,
  );

  if (!content) {
    return null;
  }

  const allMedia = getAllMedia(content);

  return (
    <div>
      <section>
        {content.section.map((item) => (
          <details>
            <summary>{item.title}</summary>
            <p>{item.description}</p>
          </details>
        ))}
      </section>
      <section>
        {allMedia.map((media) => (
          <RichMedia content={media} />
        ))}
      </section>
    </div>
  );
}
