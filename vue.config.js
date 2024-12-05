const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  pwa: {
    name: "Poke search",
    themeColor: "#FF0000",
    msTileColor: "#FFFFFF",
    manifestPath: "site.webmanifest",
    manifestOptions: {
      name: "Poke search",
      short_name: "Poke",
      start_url: ".",
      display: "standalone",
      orientation: "portrait",
      background_color: "#FFFFFF",
      theme_color: "#FF0000",
    },
    iconPaths: {
      faviconSVG: "img/icons/favicon.svg",
      favicon96: "img/icons/favicon-96x96.png",
      favicon32: "img/icons/favicon-32x32.png",
      favicon16: "img/icons/favicon-16x16.png",
      appleTouchIcon: "img/icons/apple-touch-icon.png",
      maskIcon: "img/icons/safari-pinned-tab.svg",
      msTileImage: "img/icons/msapplication-icon-144x144.png",
    }
  }
});
