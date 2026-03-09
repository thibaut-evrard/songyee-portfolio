import "./styles.scss";

const CONTENT = {
  title: "Food Monster",
  nav: [
    {
      title: "Gallery",
    },
    {
      title: "Create",
    },
  ],
};

export default function Header() {
  return (
    <header class="header">
      <a href={""} class="header__title">
        {CONTENT.title}
      </a>
      <nav>
        {CONTENT.nav.map((route) => (
          <a href={"http://localhost:3000/"}>{route.title}</a>
        ))}
      </nav>
    </header>
  );
}
