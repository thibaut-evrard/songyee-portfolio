import { Meta, Title } from "@solidjs/meta";
import ProjectPreview from "~/components/Home/ProjectPreview";
import { APP_CONTENT } from "~/constants/content";

export default function Home() {
  return (
    <main>
      <Title>{APP_CONTENT.home.meta.title}</Title>
      <Meta name="description" content={APP_CONTENT.home.meta.description} />

      <h2>{APP_CONTENT.home.hero.description}</h2>
      <section>
        {APP_CONTENT.projects.map((project) => (
          <ProjectPreview content={project} />
        ))}
      </section>
    </main>
  );
}
