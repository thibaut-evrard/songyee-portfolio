import { redirect, useParams } from "@solidjs/router";
import { APP_CONTENT } from "@/constants/content";

export function useContent() {
  const params = useParams();
  const content = APP_CONTENT.projects.find(
    (project) => project.slug === params.uid,
  );
  if (!content) {
    redirect("/404");
    throw new Error("Not Found");
  } else {
    return content;
  }
}
