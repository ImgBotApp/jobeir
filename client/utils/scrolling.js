// @flow

/**
 * scorlling utilities
 * This is mainly used when route changes within our application.
 * 
 * When the user is on the job search page don't scroll them back to the top
 * because it will break the infinite scroll component behavior.
 * 
 * When the user is on a create page ease them to the top of the page instead
 * of a jarring displacement.
 */

function scrollToTop(scrollDuration) {
  const cosParameter: number = window.scrollY / 2;
  let scrollCount: number = 0;
  let oldTimestamp: number = performance.now();

  function step(newTimestamp) {
    scrollCount += Math.PI / (scrollDuration / (newTimestamp - oldTimestamp));
    if (scrollCount >= Math.PI) window.scrollTo(0, 0);
    if (window.scrollY === 0) return;
    window.scrollTo(
      0,
      Math.round(cosParameter + cosParameter * Math.cos(scrollCount))
    );
    oldTimestamp = newTimestamp;
    window.requestAnimationFrame(step);
  }
  window.requestAnimationFrame(step);
}

export const goToTopOfPage = () => {
  const isOnPostingPage: boolean = window.location.pathname.length === 30;
  const shouldGoToTop: boolean = !window.location.pathname.includes('/jobs');
  const isOnCreateFlow: boolean = window.location.pathname.includes('/create/');

  if (isOnPostingPage) return window.scrollTo(0, 0);
  if (isOnCreateFlow) return scrollToTop(400);
  if (shouldGoToTop) return window.scrollTo(0, 0);

  return null;
};
