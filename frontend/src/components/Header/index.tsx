import "./styles.scss";
import { ROUTES } from "~/constants/routes";

const CONTENT = {
  title: "Food Monster",
  nav: [
    {
      title: "Gallery",
      url: ROUTES.gallery,
    },
    {
      title: "Create",
      url: ROUTES.create,
    },
  ],
};

export default function Header() {
  return (
    <header class="header">
      <a href={ROUTES.home} class="header__title">
        {CONTENT.title}
      </a>
      <nav>
        {CONTENT.nav.map((route) => (
          <a href={route.url}>{route.title}</a>
        ))}
      </nav>
    </header>
  );
}
