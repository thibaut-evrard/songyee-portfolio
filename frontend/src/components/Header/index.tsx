import { APP_CONTENT } from "@/constants/content";
import "./styles.scss";
import { ROUTES } from "@/constants/routes";

const filters = [
  APP_CONTENT.general.filters.all,
  APP_CONTENT.general.filters.digital,
  APP_CONTENT.general.filters.brand,
  APP_CONTENT.general.filters.art_direction,
];

export default function Header() {
  return (
    <header class="header">
      <h1>{APP_CONTENT.general.title}</h1>
      <nav>
        <div>
          <a href={ROUTES.home}>{APP_CONTENT.general.menu.work}</a>
          <ul>
            {filters.map((filter) => (
              <li>
                <a href={`#${filter.id}`}>{filter.name}</a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <a href={ROUTES.about}>{APP_CONTENT.general.menu.about}</a>
        </div>
      </nav>
    </header>
  );
}
