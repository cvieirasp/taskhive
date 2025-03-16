module.exports = {
  apps: [
    {
      name: "task-hive",
      script: "npm",
      args: "run dev",
      env: {
        NODE_ENV: "development",
      },
    },
  ],
};
