class Clock extends Component {
  refs = {
    clock: '.clock-time',
    icon: '.clock-icon',
    motivation: '.motivation'
  };

  constructor() {
    super();
  }

  imports() {
    return [
      this.resources.icons.material,
      this.resources.fonts.roboto
    ];
  }


  style() {
    return `
        .clock-time, .motivation {
            white-space: nowrap;
            font: 300 9pt 'Roboto', sans-serif;
            color: #a6adc8;
            letter-spacing: .5px;
        }
        .motivation {
          margin-right: 10px;
        }
        .clock-icon {
            color: var(--accent);
            font-size: 10pt;
            margin-right: 10px;
        }
    `;
  }

  template() {
    return `
        <p class="motivation"></p>
        <span class="material-icons clock-icon">schedule</span>
        <p class="clock-time"></p>
    `;
  }

  setIconColor() {
    this.refs.icon.style.color = CONFIG.clock.iconColor;
  }

  setMotivation() {
    const quotes = CONFIG.quotes;
    this.refs.motivation = quotes[Math.floor(quotes.length*Math.random())];
  }

  setTime() {
    const date = new Date();

    this.refs.clock = date.strftime(CONFIG.clock.format);
  }

  connectedCallback() {
    this.render().then(() => {
      this.setTime();
      this.setIconColor();
      this.setMotivation();

      setInterval(() => this.setTime(), 1000);
    });
  }
}
