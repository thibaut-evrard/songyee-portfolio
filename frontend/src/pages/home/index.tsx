import "./styles.scss";
import { Meta, Title } from "@solidjs/meta";
import { useSearchParams } from "@solidjs/router";
import ProjectPreview from "@/components/Home/ProjectPreview";
import Wordmark from "@/components/Wordmark";
import { APP_CONTENT } from "@/constants/content";

type ProjectContent = (typeof APP_CONTENT.projects)[0];

export default function Home() {
  const [searchParams] = useSearchParams();

  function getFilteredOut(project: ProjectContent) {
    return !!searchParams.filter && project.info.tag !== searchParams.filter;
  }

  return (
    <main class="home grid">
      <Title>{APP_CONTENT.home.meta.title}</Title>
      <Meta name="description" content={APP_CONTENT.home.meta.description} />

      <Wordmark />
      <h2 class="home__intro typeset-h2">
        {APP_CONTENT.home.hero.description}
      </h2>
      {APP_CONTENT.projects.map((project) => (
        <ProjectPreview content={project} disabled={getFilteredOut(project)} />
      ))}
    </main>
  );
}
