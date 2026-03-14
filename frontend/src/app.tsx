import { MetaProvider, Title } from "@solidjs/meta";
import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { Suspense } from "solid-js";
import "./app.scss";
import Header from "./components/Header";
import { APP_CONTENT } from "./constants/content";

export default function App() {
  return (
    <Router
      root={(props) => (
        <MetaProvider>
          <Title>{APP_CONTENT.home.meta.title}</Title>
          <Header />
          <Suspense>{props.children}</Suspense>
        </MetaProvider>
      )}
    >
      <FileRoutes />
    </Router>
  );
}
