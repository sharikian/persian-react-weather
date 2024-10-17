const getWeatherData = (weathercode) => {
  switch (weathercode) {
    case 0:
      return {
        icon: {
          day: require("../static/sun--v1.png"),
          night:
            require("../static/bright-moon--v1.png"),
        },
        forecast: "هوای صاف",
        forecast_short: "روشن",
      };

    case 1:
      return {
        icon: {
          day: require("../static/sun--v1.png"),
          night:
            require("../static/bright-moon--v1.png"),
        },
        forecast: "تقریبا صاف",
        forecast_short: "روشن",
      };

    case 2:
      return {
        icon: {
          day: require("../static/partly-cloudy-day--v1.png"),
          night:
            require("../static/partly-cloudy-night.png"),
        },
        forecast: "هوا نیمه ابری",
        forecast_short: "نیمه ابری",
      };

    case 3:
      return {
        icon: {
          day: require("../static/clouds--v1.png"),
          night: require("../static/clouds--v1.png"),
        },
        forecast: "هوا ابری",
        forecast_short: "ابری",
      };

    case 45:
    case 48:
      return {
        icon: {
          day: require("../static/foggy-night-1.png"),
          night:
            require("../static/foggy-night-1.png"),
        },
        forecast: "هوا مه آلود",
        forecast_short: "مه",
      };

    case 51:
    case 53:
    case 55:
    case 56:
    case 57:
      return {
        icon: {
          day: require("../static/wet.png"),
          night: require("../static/wet.png"),
        },
        forecast: "هوا کمی بارانی",
        forecast_short: "نم نم باران",
      };

    case 61:
    case 63:
    case 65:
      return {
        icon: {
          day: require("../static/light-rain.png"),
          night: require("../static/light-rain.png"),
        },
        forecast: "هوا بارانی خفیف",
        forecast_short: "بارانی خفیف",
      };

    case 66:
    case 67:
      return {
        icon: {
          day: require("../static/downpour.png"),
          night: require("../static/downpour.png"),
        },
        forecast: "هوا بارانی",
        forecast_short: "بارانی",
      };

    case 71:
    case 73:
    case 75:
      return {
        icon: {
          day: require("../static/snowflake.png"),
          night: require("../static/snowflake.png"),
        },
        forecast: "هوا برفی خفیف",
        forecast_short: "برفی خفیف",
      };

    case 77:
      return {
        icon: {
          day: require("../static/snowy-sunny-day.png"),
          night:
            require("../static/light-snow--v1.png"),
        },
        forecast: "هوا برفی",
        forecast_short: "برفی",
      };

    case 80:
    case 81:
    case 82:
      return {
        icon: {
          day: require("../static/heavy-rain.png"),
          night: require("../static/heavy-rain.png"),
        },
        forecast: "باران شدید",
        forecast_short: "شدید",
      };

    case 85:
    case 86:
      return {
        icon: {
          day: require("../static/snow-storm.png"),
          night: require("../static/snow-storm.png"),
        },
        forecast: "بارش برف طوفانی",
        forecast_short: "برف",
      };

    case 95:
    case 96:
    case 99:
      return {
        icon: {
          day: require("../static/chance-of-storm.png"),
          night:
            require("../static/chance-of-storm.png"),
        },
        forecast: "رعد و برق و باران",
        forecast_short: "طوفانی",
      };

    default: {
      return {
        icon: null,
        forecast: null,
        forecast_short: null,
      };
    }
  }
};

export default getWeatherData;
