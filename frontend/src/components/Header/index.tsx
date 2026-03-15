import "./styles.scss";
import { useSearchParams } from "@solidjs/router";
import { createEffect } from "solid-js";
import { APP_CONTENT } from "@/constants/content";
import { ROUTES } from "@/constants/routes";
// oxlint-disable-next-line no-unused-vars
import { titleScaler } from "./useTitleScale";

declare module "solid-js" {
  namespace JSX {
    interface Directives {
      titleScaler: true;
    }
  }
}

const filters = [
  APP_CONTENT.general.filters.all,
  APP_CONTENT.general.filters.digital,
  APP_CONTENT.general.filters.brand,
  APP_CONTENT.general.filters.art_direction,
];

export default function Header() {
  // oxlint-disable-next-line no-unassigned-vars
  let titleRef!: HTMLAnchorElement;
  const [_, setSearchParams] = useSearchParams();

  function updateSearchParams(filter: string) {
    // oxlint-disable-next-line eqeqeq
    if (filter == APP_CONTENT.general.filters.all.id) {
      setSearchParams({ filter: undefined });
    } else {
      setSearchParams({ filter });
    }
  }

  createEffect(() => {
    console.log(titleRef);
  });

  return (
    <header class="header">
      <a href={ROUTES.home} class="header__title" use:titleScaler>
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
