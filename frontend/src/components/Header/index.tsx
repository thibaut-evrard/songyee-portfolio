import "./styles.scss";
import { useLocation, useSearchParams } from "@solidjs/router";
import { APP_CONTENT } from "@/constants/content";
import { ROUTES } from "@/constants/routes";
import { useHeaderVisibility } from "./useHeaderVisibility";

const filters = [
  APP_CONTENT.general.filters.all,
  APP_CONTENT.general.filters.digital,
  APP_CONTENT.general.filters.brand,
  APP_CONTENT.general.filters.art_direction,
];

export default function Header() {
  const { pathname } = useLocation();
  const [_, setSearchParams] = useSearchParams();
  const headerScrollVisible = useHeaderVisibility();
  const isHome = () => pathname === "/";
  const headerVisible = () => !isHome() && headerScrollVisible();

  function updateSearchParams(filter: string) {
    // oxlint-disable-next-line eqeqeq
    if (filter == APP_CONTENT.general.filters.all.id) {
      setSearchParams({ filter: undefined });
    } else {
      setSearchParams({ filter });
    }
  }

  return (
    <header class="header" hidden={!headerVisible()}>
      <a href={ROUTES.home} class="header__title">
        <h1>{APP_CONTENT.general.title}</h1>
      </a>
      <nav>
        <div>
          <a href={ROUTES.home}>{APP_CONTENT.general.menu.work}</a>
          <ul>
            {filters.map((filter) => (
              <li>
                <button onclick={() => updateSearchParams(filter.id)}>
                  {filter.name}
                </button>
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
