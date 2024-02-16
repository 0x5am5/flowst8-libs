console.log("FlowSt8: simpleServer.js");

const honeyPotOverride = Array.from(
  document.querySelectorAll("[data-easy-honeypot]")
);
if (honeyPotOverride.length) {
  honeyPotOverride.forEach((honeyPotEl) => {
    const closestForm = honeyPotEl.closest("form");

    closestForm.addEventListener("submit", (e) => {
      if (!honeyPotEl.checked) {
        closestForm.submit();
      } else {
        console.warn("HoneyPot: Form submission blocked");
      }
    });
  });
}
