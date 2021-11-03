const path = require("path");
const ModuleScopePlugin = require("react-dev-utils/ModuleScopePlugin");

const resolvePath = (relativePath) => path.resolve(__dirname, relativePath);

const appIncludes = [resolvePath("../../src"), resolvePath("./src")];

module.exports = function override(config, env) {
  config.resolve.plugins = config.resolve.plugins.filter(
    (plugin) => !(plugin instanceof ModuleScopePlugin),
  );

  config.module.rules[0].include = appIncludes;

  if (config.module.rules[1].oneOf) {
    config.module.rules[1].oneOf[2].include = appIncludes;
  }

  return config;
};
