import "./styles.scss";
import { redirect, useParams } from "@solidjs/router";
import { createSignal, For } from "solid-js";
import IntersectionObserved from "@/components/InstersectionObserved";
import { animateScroll } from "@/components/InstersectionObserved/utils";
import RichMedia from "@/components/Shared/RichMedia";
import { APP_CONTENT } from "@/constants/content";

export default function Project() {
  // oxlint-disable-next-line no-unassigned-vars
  let mediaSectionContainerRef!: HTMLDivElement;

  const [activeSectionIndex, setActiveSectionIndex] = createSignal<number>(0);
  const [isAutoScroll, setIsAutoScroll] = createSignal(false);
  const params = useParams();
  const content = APP_CONTENT.projects.find(
    (project) => project.slug === params.uid,
  );

  if (!content) {
    redirect("/404");
    return;
  }

  function scrollToSection(index: number) {
    if (!mediaSectionContainerRef) {
      throw "Media section container does not exist";
    }

    const child = mediaSectionContainerRef.childNodes[index];
    if (child instanceof HTMLElement) {
      const rect = child.getBoundingClientRect();
      const targetScroll = rect.top + window.scrollY;
      setIsAutoScroll(true);
      animateScroll(targetScroll, () => setIsAutoScroll(false));
    }
  }

  function handleVisible(isVisible: boolean, index: number) {
    if (isVisible && !isAutoScroll()) {
      setActiveSectionIndex(index);
    }
  }

  function handleShowDetail(index: number) {
    if (index === activeSectionIndex()) {
      return;
    } else {
      setActiveSectionIndex(index);
      scrollToSection(index);
    }
  }

  return (
    <div class="project">
      <section class="project__copy">
        <For each={content.section}>
          {(item, index) => (
            <details
              open={activeSectionIndex() === index()}
              onclick={(e) => {
                e.preventDefault();
                handleShowDetail(index());
              }}
            >
              <summary>{item.title}</summary>
              <p>{item.description}</p>
            </details>
          )}
        </For>
      </section>
      <section class="project__media" ref={mediaSectionContainerRef}>
        <For each={content.section}>
          {(item, index) => (
            <IntersectionObserved
              threshold={0.5}
              onVisible={(isVisible) => handleVisible(isVisible, index())}
            >
              <For each={item.media}>
                {(media) => <RichMedia content={media} />}
              </For>
            </IntersectionObserved>
          )}
        </For>
      </section>
    </div>
  );
}
