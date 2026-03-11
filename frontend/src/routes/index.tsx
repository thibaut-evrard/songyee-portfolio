import { Meta, Title } from "@solidjs/meta";
import { APP_CONTENT } from "~/constants/content";

function getMediaUrl(path: string) {
  console.log(path);
  return `/media/${path}`;
}

const media = APP_CONTENT.projects[0].section[0].media[0];

export default function Home() {
  return (
    <main>
      <Title>{APP_CONTENT.home.meta.title}</Title>
      <Meta name="description" content={APP_CONTENT.home.meta.description} />

      <h1>{APP_CONTENT.general.title}</h1>
      <img src={getMediaUrl(media.src)} alt={media.alt} />
    </main>
  );
}
