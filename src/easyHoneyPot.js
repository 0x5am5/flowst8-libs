class FSEasyHoneyPot {
  constructor(settings = {}) {
    this.settings = {
      element: "[data-easy-honeypot]",
      ...settings,
    };

    this.getElements();

    if (this.containers.length) {
      this.applyHoneyPot();
    }
  }

  getElements() {
    this.containers = Array.from(
      document.querySelectorAll("[data-easy-honeypot]")
    );
  }

  applyHoneyPot() {
    this.containers.forEach((honeyPotEl) => {
      const closestForm = honeyPotEl.closest("form");

      closestForm.addEventListener("submit", () => {
        if (!honeyPotEl.checked) {
          closestForm.submit();
        } else {
          console.warn("HoneyPot: Form submission blocked");
        }
      });
    });
  }
}

this.exports = FSEasyHoneyPot;
