class FSEasyScrollNav {
  constructor(settings) {
    this.settings = {
      element: "[data-esn-nav]",
      top: "[data-esn-top]",
      // bottom: "[data-esn-bottom]",
      throttle: 3,
      ...settings,
    };

    this.getElements();

    if (this.nav) {
      this.setTop();
      this.addEvents();
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
    window.addEventListener("scroll", throttle(handleScrollEvent));
    handleScrollEvent();

    window.addEventListener("resize", this.setTop);
  }
}
