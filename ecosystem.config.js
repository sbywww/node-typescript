"use strict";

module.exports = {
  apps: [{
    name: "app-server",
    script: "dist/server.js",
    watch: false,
    env: {
      NODE_ENV: "production",
    },
  }, ],
};