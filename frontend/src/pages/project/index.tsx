import "./styles.scss";
import { createSignal, For } from "solid-js";
import IntersectionObserved from "@/components/InstersectionObserved";
import { animateScroll } from "@/components/InstersectionObserved/utils";
import RichMedia from "@/components/Shared/RichMedia";
import { useContent } from "./useContent";

export default function Project() {
  // oxlint-disable-next-line no-unassigned-vars
  let mediaSectionContainerRef!: HTMLDivElement;

  const content = useContent();
  const [activeSectionIndex, setActiveSectionIndex] = createSignal<number>(0);
  const [isAutoScroll, setIsAutoScroll] = createSignal(false);

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
    console.log(isVisible, index);
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
    <div class="project grid">
      <section class="project__copy">
        <div class="project__intro">
          <p>{content.info.client}</p>
          <h2>{content.info.project_name}</h2>
          <p>{content.info.tag}</p>
        </div>
        <div class="project__copy__sticky">
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
        </div>
      </section>
      <section class="project__media" ref={mediaSectionContainerRef}>
        <For each={content.section}>
          {(item, index) => (
            <IntersectionObserved
              threshold={0.5}
              onVisible={(isVisible) => handleVisible(isVisible, index())}
            >
              <For each={item.media}>
                {(media) => (
                  <div class="project__media__card">
                    <RichMedia content={media} />
                  </div>
                )}
              </For>
            </IntersectionObserved>
          )}
        </For>
      </section>
    </div>
  );
}
