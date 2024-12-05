const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  pwa: {
    name: "Poke search",
    themeColor: "#FF0000",
    tileColor: "#FFF",
  }
})
