import { Meta, Title } from "@solidjs/meta";
import { ROUTES } from "~/constants/routes";

const META = {
  title: "Food Monster",
  description: "A monster generator for food lovers",
};

const CONTENT = {
  title: "Food Monster",
  gallery: {
    title: "Gallery Preview",
    monsters: ["monster", "monster", "monster", "monster", "monster"],
    cta: {
      text: "Go to gallery",
      route: ROUTES.gallery,
    },
  },
  cta: {
    text: "Create your monster",
    route: ROUTES.create,
  },
};

export default function Home() {
  return (
    <main>
      <Title>{META.title}</Title>
      <Meta name="description" content={META.description} />
      <h1>{CONTENT.title}</h1>
      <div>
        <h2>{CONTENT.gallery.title}</h2>
        <ul>
          {CONTENT.gallery.monsters.map((monster) => (
            <li>{monster}</li>
          ))}
        </ul>
        <a href={CONTENT.gallery.cta.route}>{CONTENT.gallery.cta.text}</a>
      </div>
      <a href={CONTENT.cta.route}>{CONTENT.cta.text}</a>
    </main>
  );
}
