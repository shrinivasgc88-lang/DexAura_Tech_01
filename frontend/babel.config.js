module.exports = function (api) {
  api.cache(true);

  const isDevelopment = process.env.NODE_ENV === "development";

  return {
    presets: ["react-app"],
    plugins: [
      ...(isDevelopment
        ? [["react-refresh/babel", { skipEnvCheck: true }]]
        : []),
    ],
  };
};