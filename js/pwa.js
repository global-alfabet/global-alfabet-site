(() => {
  let installPrompt;
  const banner = document.querySelector("[data-install-banner]");
  const installButton = document.querySelector("[data-install-button]");
  const closeButton = document.querySelector("[data-install-close]");

  if ("serviceWorker" in navigator && location.protocol.startsWith("http")) {
    window.addEventListener("load", () => navigator.serviceWorker.register("/sw.js").catch(console.warn));
  }

  window.addEventListener("beforeinstallprompt", event => {
    event.preventDefault();
    installPrompt = event;
    banner?.classList.add("show");
  });

  installButton?.addEventListener("click", async () => {
    if (!installPrompt) return;
    installPrompt.prompt();
    await installPrompt.userChoice;
    installPrompt = null;
    banner?.classList.remove("show");
  });
  closeButton?.addEventListener("click", () => banner?.classList.remove("show"));
  window.addEventListener("appinstalled", () => banner?.classList.remove("show"));
})();
