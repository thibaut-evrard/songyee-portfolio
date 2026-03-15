import "./styles.scss";
import { ROUTES } from "@/constants/routes";

const CONTENT = {
  routes: [
    {
      title: "Home",
      url: ROUTES.home,
    },
    {
      title: "About",
      url: ROUTES.about,
    },
  ],
};

export default function Footer() {
  return (
    <footer class="footer">
      <nav>
        {CONTENT.routes.map((route) => (
          <a href={route.url}>{route.title}</a>
        ))}
      </nav>
    </footer>
  );
}
