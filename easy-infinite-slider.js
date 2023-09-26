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
        element: "[data-eis-scroll-container]",
        inner: "[data-eis-scroll-inner]",
        children: "[data-eis-scroll-item]",
        duration: 8,
        mouseControl: false,
        ...settings,
      };

      this.getElements();

      if (this.container.length) {
        this.container.forEach((container) => {
          this.duplicateSlider(container);
          const animation = this.animate(container);

          if (
            this.settings.mouseControl ||
            container.getAttribute("data-eis-mouse-control")
          ) {
            this.addEvents(container, animation);
          }
        });
      }
    }
  }

  getElements() {
    // get wrapper
    if (typeof this.settings.element === "string") {
      this.container = Array.from(
        document.querySelectorAll(this.settings.element)
      );
    } else {
      // Create array from element
      this.container = [this.settings.element];
    }

    if (!this.container.length) {
      console.warn(
        `FlowSt8 Easy Infinite Slider: ${this.settings.element} found`
      );

      return;
    } else {
      this.container.forEach((container) => {
        // set necessary container styles
        container.style.overflow = "hidden";
        container.style.width = "100%";

        // Get inner, scrollable element
        const inner = container.querySelector(this.settings.inner);

        if (!inner) {
          console.error(
            `FlowSt8 Easy Infinite Slider: No ${this.settings.inner} found!`
          );
          // TODO: BREAK
          return;
        }

        // Set neccessary inner styles
        inner.style.display = "flex";
        inner.style.width = "100%";

        const elements = inner.querySelectorAll(this.settings.children);

        if (!elements.length) {
          console.error(
            `FlowSt8 Easy Infinite Slider: No ${this.settings.children} found!`
          );

          return;
        }

        if (window.getComputedStyle(elements[0]).display === "flex") {
          elements[0].style.flex = "0 0 auto";
        }
      });
    }
  }

  duplicateSlider(container) {
    const inner = container.querySelector(this.settings.inner);
    /* Duplicate slider to create illusion */
    const node = inner.childNodes;
    inner.appendChild(node[0].cloneNode(true));

    // Add a second clone to accomodate really long sliders
    inner.appendChild(node[0].cloneNode(true));
  }

  animate(container) {
    const inner = container.querySelector(this.settings.inner);
    const elements = inner.querySelectorAll(this.settings.children);
    // set default
    let duration = this.settings.duration;

    if (container.getAttribute("data-eis-scroll-duration")) {
      // override default
      duration = container.getAttribute("data-eis-scroll-duration");
    }

    /* GSAP slider */
    const animation = gsap.to(inner, {
      x: () => -(inner.scrollWidth / 3) + "px",
      ease: "none",
      repeat: -1,
      duration: elements.length * duration,
    });

    return animation;
  }

  addEvents(container, animation) {
    const inner = container.querySelector(this.settings.inner);
    inner.addEventListener("mouseover", () => animation.pause());
    inner.addEventListener("mouseout", () => animation.play());
  }
}
