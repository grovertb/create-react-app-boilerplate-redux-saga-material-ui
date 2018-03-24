const DashboardPlugin = require('webpack-dashboard/plugin')

const shouldUseSourceMap = process.env.GENERATE_SOURCEMAP !== 'false'

function deepClone(object) {
  return JSON.parse(JSON.stringify(object))
}

function getLoader(rules, matcher) {
  let match

  rules.some(rule => {
    return (match = matcher(rule) ?
      { rules, rule } :
      getLoader(rule.use || rule.oneOf || [], matcher))
  })

  return match
}

function rewireStylus(config, env) {
  const { rule: cssRule, rules } = getLoader(
    config.module.rules,
    rule => String(rule.test) === String(/\.css$/)
  )

  const stylusRule = deepClone(cssRule)

  stylusRule.test = /\.styl$/
  if(env === 'production') {
    stylusRule.loader.splice(3, 0, require.resolve('stylus-loader'))
    stylusRule.loader[2].options = {
      ...stylusRule.loader[2].options,
      minimize      : true,
      sourceMap     : shouldUseSourceMap,
      modules       : true,
      localIdentName: '__[hash:base64:5]'
    }
    stylusRule.loader.pop()
  } else {
    stylusRule.use.splice(2, 0, require.resolve('stylus-loader'))
    stylusRule.use[1].options = {
      ...stylusRule.use[1].options,
      modules       : true,
      localIdentName: '__[hash:base64:5]'
    }
    stylusRule.use.pop()
  }

  rules.splice(rules.indexOf(cssRule), 0, stylusRule)

  return config
}

module.exports = function override(config, env) {
  config = rewireStylus(config, env)
  config.plugins = [ ...config.plugins, new DashboardPlugin() ]

  return config
}
