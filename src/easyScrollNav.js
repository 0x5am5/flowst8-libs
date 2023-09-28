const throttle = require("lodash/throttle");

class FSEasyScrollNav {
  constructor(settings) {
    this.settings = {
      element: "[data-esn-nav]",
      top: "[data-esn-top]",
      // bottom: "[data-esn-bottom]",
      throttle: 0,
      ...settings,
    };

    this.getElements();

    if (this.nav) {
      if (this.nav.getAttribute("data-esn-throttle")) {
        this.settings.throttle = Number(
          this.nav.getAttribute("data-esn-throttle")
        );
      }
      this.setTop();
      this.addEvents();
    } else {
      console.warn("FSEasyScrollNav: No " + this.settings.element + " found!");
    }
  }

  getElements() {
    if (typeof this.settings.element === "string") {
      this.nav = document.querySelector(this.settings.element);
    } else {
      this.nav = this.settings.element;
    }
  }

  setTop() {
    if (
      typeof this.settings.top === "string" &&
      document.querySelector(this.settings.top)
    ) {
      this.top = document
        .querySelector(this.settings.top)
        ?.getBoundingClientRect().top;
    } else {
      this.top = this.settings.top.getBoundingClientRect().top;
    }
  }

  addEvents() {
    this.startingTop = document.documentElement.scrollTop;

    const handleScrollEvent = () => {
      const top = window.pageYOffset || document.documentElement.scrollTop;

      if (top >= this.top + this.startingTop) {
        this.nav.classList.add("esn-active");
      } else {
        this.nav.classList.remove("esn-active");
      }

      // reset after if a bottom is set
      if (this.bottom && top >= this.bottom) {
        this.nav.classList.remove("esn-active");
      }
    };
    window.addEventListener(
      "scroll",
      throttle(handleScrollEvent, this.settings.throttle * 1000)
    );
    handleScrollEvent();

    window.addEventListener("resize", this.setTop);
  }
}

module.exports = FSEasyScrollNav;
