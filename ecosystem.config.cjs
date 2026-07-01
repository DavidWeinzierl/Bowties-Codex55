module.exports = {
  apps: [
    {
      name: "the-bowties",
      script: "node_modules/next/dist/bin/next",
      args: "start -p 8022",
      cwd: __dirname,
      env: { NODE_ENV: "production" },
    },
  ],
};
