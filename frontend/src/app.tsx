import { MetaProvider, Title } from "@solidjs/meta";
import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { Suspense } from "solid-js";
import "./app.scss";
import Footer from "./components/Footer";
import Header from "./components/Header";

export default function App() {
  return (
    <Router
      root={(props) => (
        <MetaProvider>
          <Title>Food Monster</Title>
          <Header />
          <Suspense>{props.children}</Suspense>
          <Footer />
        </MetaProvider>
      )}
    >
      <FileRoutes />
    </Router>
  );
}
