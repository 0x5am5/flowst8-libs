const gsap = require("gsap/dist/gsap.js");

const css = (el) => `
  ${el.inner} {
    width: 100%;
    display: flex;
    justify-content: flex-start;
    overflow: hidden;
  }

  ${el.children} {
    flex: none;
    animation: infinite-slider ${el.duration} linear infinite;
  }

  @keyframes infinite-slider {
    0% { transform: translateX(0) }
    100% { transform: translateX(-100%) }
  }
`;

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
        duration: "110s",
        mouseControl: false,
        ...settings,
      };

      this.getElements();

      if (this.container.length) {
        this.container.forEach((container) => {
          this.duplicateSlider(container);
          // const animation = this.animate(container);

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
      this.container = this.settings.element ? [this.settings.element] : [];
    }

    if (!this.container.length) {
      console.warn(
        `FlowSt8 Easy Infinite Slider: No ${this.settings.element} found`
      );

      return;
    } else {
      this.container.forEach((container) => {
        // Get inner, scrollable element
        const inner = container.querySelector(this.settings.inner);

        if (!inner) {
          console.error(
            `FlowSt8 Easy Infinite Slider: No ${this.settings.inner} found!`
          );
          // TODO: BREAK
          return;
        }

        const style = document.createElement("style");
        document.getElementsByTagName("head")[0].append(style);
        style.type = "text/css";

        if (style.styleSheet) {
          // This is required for IE8 and below.
          style.styleSheet.cssText = css(this.settings);
        } else {
          style.appendChild(document.createTextNode(css(this.settings)));
        }

        const elements = inner.querySelectorAll(this.settings.children);

        if (!elements.length) {
          console.error(
            `FlowSt8 Easy Infinite Slider: No ${this.settings.children} found!`
          );

          return;
        }
      });
    }
  }

  duplicateSlider(container) {
    const inner = container.querySelector(this.settings.inner);
    /* Duplicate slider to create illusion */
    const node = inner.childNodes;
    inner.appendChild(node[0].cloneNode(true));
  }

  // animate(container) {
  //   const inner = container.querySelector(this.settings.inner);
  //   const elements = inner.querySelectorAll(this.settings.children);
  //   // set default
  //   let duration = this.settings.duration;

  //   if (container.getAttribute("data-eis-scroll-duration")) {
  //     // override default
  //     duration = container.getAttribute("data-eis-scroll-duration");
  //   }

  //   /* GSAP slider */
  //   const animation = gsap.gsap.to(inner, {
  //     x: () => -(inner.scrollWidth / 3) + "px",
  //     ease: "none",
  //     repeat: -1,
  //     duration: elements.length * duration,
  //   });

  //   return animation;
  // }

  addEvents(container, animation) {
    const inner = container.querySelector(this.settings.inner);
    inner.addEventListener("mouseover", () => animation.pause());
    inner.addEventListener("mouseout", () => animation.play());
  }
}

module.exports = FSEasyInfiniteSlider;
