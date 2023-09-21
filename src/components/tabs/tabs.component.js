class Links extends Component {
  constructor() {
    super();
  }

  static getIcon(link) {
    const defaultColor = "#a6adc8";
    const defaultBg = "transparent";
    const defaultWebkitColor = "inherit";

    return link.icon
      ? `<i class="ti ti-${link.icon} link-icon"
            style="color: ${link.icon_color ?? defaultColor}; background: ${link.webkit_bg ?? defaultBg}; -webkit-text-fill-color: ${link.webkit_color ?? defaultWebkitColor};"></i>`
      : "";
  }

  static getAll(tabName, tabs) {
    const { categories } = tabs.find((f) => f.name === tabName);

    return `
      ${
      categories.map(({ name, links }) => {
        return `
          <li>
            <h1>${name}</h1>
              <div class="links-wrapper">
              ${
          links.map((link) => `
                  <div class="link-info">
                    <a href="${link.url}">
                      ${Links.getIcon(link)}
                      ${
            link.name ? `<p class="link-name">${link.name}</p>` : ""
          }
                    </a>
                </div>`).join("")
        }
            </div>
          </li>`;
      }).join("")
    }
    `;
  }
}

class Category extends Component {
  constructor() {
    super();
  }

  static getBackgroundStyle(url) {
    return `style="background-image: url(${url}); background-repeat: no-repeat;background-size: contain;"`;
  }

  static getAll(tabs) {
    return `
      ${
      tabs.map(({ name, background_url }, index) => {
        return `<ul class="${name}" ${
          Category.getBackgroundStyle(background_url)
        } ${index == 0 ? "active" : ""}>
            <div class="banner"></div>
            <div class="links">${Links.getAll(name, tabs)}</div>
          </ul>`;
      }).join("")
    }
    `;
  }
}

class Tabs extends Component {
  refs = {};

  constructor() {
    super();
    this.tabs = CONFIG.tabs;
  }

  imports() {
    return [
      this.resources.icons.material,
      this.resources.icons.tabler,
      this.resources.fonts.roboto,
      this.resources.fonts.raleway,
      this.resources.libs.awoo,
    ];
  }

  style() {
    return `
      status-bar {
          bottom: -70px;
          height: 32px;
          background: #181825;
          border-radius: 4px;
          box-shadow: 0 10px 20px rgba(0, 0, 0, .25);
      }

      #panels, #panels ul,
      #panels .links {
          position: absolute;
      }

      .nav {
          color: #fff;
      }

      #panels {
          border-radius: 5px 0 0 5px;
          width: 90%;
          max-width: 1200px;
          height: 450px;
          right: 0;
          left: 0;
          top: 0;
          bottom: 0;
          margin: auto;
          box-shadow: 0 5px 10px rgba(0, 0, 0, .2);
          background: #181825;
      }

      .categories {
          width: 100%;
          height: 100%;
          overflow: hidden;
          position: relative;
          border-radius: 10px 0 0 10px;
      }

      .categories ul {
          --panelbg: transparent;
          --flavour: var(--accent);
          width: 100%;
          height: 100%;
          right: 100%;
          background: #181825 url("../img/bg-1.gif") repeat left;
	        transition: all .6s;
	        # animation: scroll 25s ease-in-out infinite;
      }

      @keyframes scroll {
          50% {
              background-position-x: -240px;
          }
      }

      .categories ul:nth-child(2) {
          --flavour: #FAB387;
      }

      .categories ul:nth-child(3) {
          --flavour: #F9E2AF;
      }

      .categories ul:nth-child(4) {
          --flavour: #94E2D5;
      }

      .categories ul:nth-child(5) {
          --flavour: #74C7EC;
      }

      .categories ul:nth-child(6) {
          --flavour: #87B0F9;
      }

      .categories ul:nth-child(7) {
          --flavour: #B4BEFE;
      }

      .categories ul:nth-child(8) {
          --flavour: #CBA6F7;
      }

      .categories ul:nth-child(9) {
          --flavour: #F5C2E7;
      }

      .categories ul:nth-child(10) {
          --flavour: #89DCEB;
      }

      .categories ul:nth-child(11) {
          --flavour: #F2CDCD;
      }

      .categories ul:nth-child(12) {
          --flavour: #EBA0AC;
      }

      .categories ul .links {
          box-shadow: inset -1px 0 var(--flavour);
      }

      .categories ul[active] {
          right: 0;
          z-index: 1;
      }

      .categories .links {
          right: 0;
          width: 70%;
          height: 100%;
          background: #181825;
          padding: 5%;
          flex-wrap: wrap;
      }

      .categories .links li {
          list-style: none;
      }

      .categories ul .links a {
          color: #cdd6f4;
          text-decoration: none;
          font: 700 18px 'Roboto', sans-serif;
          transition: all .2s;
          display: inline-flex;
          align-items: center;
          padding: .4em .7em;
          background: #1e1e2e;
          box-shadow: 0 4px rgba(30, 30, 46, 0.5), 0 5px 10px rgb(0 0 0 / 20%);
          border-radius: 2px;
          margin-bottom: .7em;
      }

      .categories .link-info {
          display: inline-flex;
      }

      .categories .link-info:not(:last-child) { margin-right: .5em; }

      .categories ul .links a:hover {
          transform: translate(0, 4px);
          box-shadow: 0 0 rgba(0, 0, 0, 0.25), 0 0 0 rgba(0, 0, 0, .5), 0 -0px 5px rgba(0, 0, 0, .1);
          color: var(--flavour);
      }

      .categories ul::after {
          content: attr(class);
          position: absolute;
          display: flex;
          text-transform: uppercase;
          overflow-wrap: break-word;
          width: 25px;
          height: 250px;
          padding: 1em;
          margin: auto;
          border-radius: 5px;
          box-shadow: inset 0 0 0 2px var(--flavour);
          left: calc(15% - 42.5px);
          bottom: 0;
          top: 0;
          background: linear-gradient(to top, rgb(50 48 47 / 90%), transparent);
          color: var(--flavour);
          letter-spacing: 1px;
          font: 500 30px 'Nunito', sans-serif;
          text-align: center;
          flex-wrap: wrap;
          word-break: break-all;
          align-items: center;
          backdrop-filter: blur(3px);
      }

      .categories .links li:not(:last-child) {
          box-shadow: 0 1px 0 rgba(205, 214, 244, .25);
          padding: 0 0 .5em 0;
          margin-bottom: 1.5em;
      }

      .categories .links li h1 {
          color: #a6adc8;
	        opacity: 0.5;
          font-size: 13px;
          margin-bottom: 1em;
          font-weight: 600;
          letter-spacing: 1px;
          text-transform: uppercase;
          font-family: 'Raleway', sans-serif;
      }

      .categories .link-icon {
          font-size: 27px;
          color: #a6adc8;
          -webkit-background-clip: text; 
      }

      .categories .link-icon + .link-name {
          margin-left: 10px;
      }

      .categories .links-wrapper {
          display: flex;
          flex-wrap: wrap;
      }

      .ti {
          animation: fadeInAnimation ease .5s;
          animation-iteration-count: 1;
          animation-fill-mode: forwards;
          height: 27px;
          width: 27px;
      }

      @keyframes fadeInAnimation {
          0% {
              opacity: 0;
          }
          100% {
              opacity: 1;
           }
      }
    `;
  }

  template() {
    return `
      <div id="links" class="-">

        <div id="panels">
          <div class="categories">
            ${Category.getAll(this.tabs)}
            <search-bar></search-bar>
            <config-tab></config-tab>
          </div>
          <status-bar class="!-"></status-bar>
        </div>
      </div>
    `;
  }

  connectedCallback() {
    this.render();
  }
}
