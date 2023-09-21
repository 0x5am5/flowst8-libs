class FSEasyInfiniteSlider {
  constructor(settings = {}) {
    if (!gsap) {
      console.error(
        "FlowSt8 Easy Infinite Slider: GSAP is required for Easy Infinite Scroll. Please follow https://greensock.com/docs/"
      );
    } else {
      // defaults
      // HTML attributes will always override settings
      this.settings = {
        container: "[data-eis-scroll-container]",
        inner: "[data-eis-scroll-inner]",
        children: "[data-eis-scroll-item]",
        duration: 8,
        mouseControl: false,
        ...settings,
      };

      this.getElements();

      if (this.scrollInner && this.scrollElements) {
        this.duplicateSlider();
        this.animate();

        if (
          this.settings.mouseControl ||
          this.scrollInner.getAttribute("data-eis-mouse-control")
        ) {
          this.addEvents();
        }
      }
    }
  }

  getElements() {
    // get wrapper
    this.container = document.querySelector(this.settings.container);

    if (!this.container) {
      console.error(
        `FlowSt8 Easy Infinite Slider: ${this.settings.container} found`
      );

      return;
    }

    // set necessary container styles
    this.container.style.overflow = "hidden";
    this.container.style.width = "100%";

    // Get inner, scrollable element
    this.scrollInner = document.querySelector(this.settings.inner);

    if (!this.scrollInner) {
      console.error(
        `FlowSt8 Easy Infinite Slider: No ${this.settings.inner} found!`
      );
      return;
    }

    // Set neccessary inner styles
    this.scrollInner.style.display = "flex";
    this.scrollInner.style.width = "100%";

    if (this.scrollInner.getAttribute("data-eis-scroll-duration")) {
      this.settings.duration = this.scrollInner.getAttribute(
        "data-eis-scroll-duration"
      );
    }

    this.scrollElements = this.scrollInner.querySelectorAll(
      this.settings.children
    );

    if (!this.scrollElements.length) {
      console.error(
        `FlowSt8 Easy Infinite Slider: No ${this.settings.children} found!`
      );

      return;
    }

    if (window.getComputedStyle(this.scrollElements[0]).display === "flex") {
      this.scrollElements[0].style.flex = "0 0 auto";
    }
  }

  duplicateSlider() {
    /* Duplicate slider to create illusion */
    const node = this.scrollInner.childNodes;
    this.scrollInner.appendChild(node[0].cloneNode(true));

    // Add a second clone to accomodate really long sliders
    this.scrollInner.appendChild(node[0].cloneNode(true));
  }

  animate() {
    /* GSAP slider */
    this.easyInfiniteScroll = gsap.to(this.scrollInner, {
      x: () => -(this.scrollInner.scrollWidth / 3) + "px",
      ease: "none",
      repeat: -1,
      duration: this.scrollElements.length * this.settings.duration,
    });
  }

  addEvents() {
    this.scrollInner.addEventListener("mouseover", () =>
      this.easyInfiniteScroll.pause()
    );
    this.scrollInner.addEventListener("mouseout", () =>
      this.easyInfiniteScroll.play()
    );
  }
}
