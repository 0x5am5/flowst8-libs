class FSEasyLazyLoadYouTube {
  constructor(settings = {}) {
    // defaults
    // HTML attributes will always override settings
    this.settings = {
      element: "[data-ell-youtube-id]",
      title: "",
      youtubeId: "",
      ui: false,
      uiColor: "#ffffff",
      onScroll: false,
      ...settings,
    };

    if (this.settings.onScroll && !this.getScrollSettings()) {
      console.error(
        'FlowSt8 Easy Lazy Load YouTube: onScroll settings not given in expected format e.g. "top center"'
      );
      return;
    }

    this.getElements();
  }

  getScrollSettings() {
    const onScrollOptions = this.settings.onScroll.split(" ");
    const firstRule =
      onScrollOptions[0].includes("top") ||
      onScrollOptions[0].includes("bottom") ||
      onScrollOptions[0].includes("center");
    const secondRule =
      onScrollOptions[1].includes("top") ||
      onScrollOptions[1].includes("bottom") ||
      onScrollOptions[1].includes("center");

    return firstRule && secondRule;
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
        `FlowSt8 Easy Lazy Load YouTube: No ${this.settings.element} found`
      );
    } else {
      this.container.forEach((container) => {
        if (container.getAttribute("data-ell-title")) {
          this.settings.title = container.getAttribute("data-ell-title");
        }

        if (container.getAttribute("data-ell-youtube-id")) {
          this.settings.youtubeId = container.getAttribute(
            "data-ell-youtube-id"
          );
        }

        if (container.getAttribute("data-ell-ui")) {
          this.settings.ui = true;
        }

        if (container.getAttribute("data-ell-scroll-settings")) {
          this.settings.onScroll = container.getAttribute(
            "data-ell-scroll-settings"
          );
        }

        if (!this.settings.youtubeId) {
          console.error("Easy Lazy Load YouTube: No YouTube ID given.");
        } else {
          if (this.settings.ui) {
            container.style.position = "relative";
            const playButton = document.createElement("div");
            playButton.style.position = "absolute";
            playButton.style.top = "50%";
            playButton.style.left = "50%";
            playButton.style.transform = "translate(-50%, -50%)";

            container.classList.add("ell-ui-wrapper");
            const style = document.createElement("style");
            const css = `
              .ell-ui-wrapper svg {
                transition: transform .3s ease-in-out;
              }
              .ell-ui-wrapper:hover svg, .ell-ui-wrapper:focus svg {
                transform: scale(1.1)
              }
            `;

            if (style.styleSheet) {
              style.styleSheet.cssText = css;
            } else {
              style.appendChild(document.createTextNode(css));
            }

            document.getElementsByTagName("head")[0].appendChild(style);

            playButton.innerHTML = `
              <svg 
                fill="${this.settings.uiColor}" 
                height="50px" 
                version="1.1" 
                id="Layer_1" 
                xmlns="http://www.w3.org/2000/svg" 
                xmlns:xlink="http://www.w3.org/1999/xlink" 
                viewBox="0 0 512 512" xml:space="preserve"
              >
                <g>
                  <g>
                    <path d="M500.203,236.907L30.869,2.24c-6.613-3.285-14.443-2.944-20.736,0.939C3.84,7.083,0,13.931,0,21.333v469.333
                      c0,7.403,3.84,14.251,10.133,18.155c3.413,2.112,7.296,3.179,11.2,3.179c3.264,0,6.528-0.747,9.536-2.24l469.333-234.667
                      C507.435,271.467,512,264.085,512,256S507.435,240.533,500.203,236.907z"/>
                  </g>
                </g>
              </svg>
            `;
            container.append(playButton);
          }

          this.addEvents(container);
        }
      });
    }
  }

  getEmbedCode(id, title = "") {
    return `
      <iframe 
        width="560"
        height="315"
        src="https://www.youtube.com/embed/${id}?autoplay=1"
        title="${title}"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowfullscreen
        style="aspect-ratio: 16/9; width: 100%; height: 100%"
      ></iframe>
    `;
  }

  addEvents(container) {
    container.addEventListener("click", (e) => {
      e.preventDefault();
      container.innerHTML = this.getEmbedCode(
        this.settings.youtubeId,
        this.settings.title
      );
    });

    if (this.settings.onScroll) {
      const elementBounds = container.getBoundingClientRect();
      let elementPosition = elementBounds.top;
      let windowPosition = 0;
      if (this.settings.onScroll.split(" ")[0] === "center") {
        elementPosition = elementPosition + elementBounds.height / 2;
      } else if (this.settings.onScroll.split(" ")[0] === "bottom") {
        elementPosition = elementPosition + elementBounds.height;
      }

      window.addEventListener("scroll", () => {});
    }
  }
}

module.exports = FSEasyLazyLoadYouTube;
