// True once the first page has hydrated (src/App.jsx marks it). The first page must render exactly as it was
// prerendered, so it can't read the address's ?query or the screen size while rendering; pages opened after that,
// by moving around the site, can, so they show the right thing straight away.
let done = false;

export const isHydrated = () => done;

export function markHydrated() {
  done = true;
}
