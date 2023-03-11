'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  BASE_API: '"http://172.17.0.1:8888"',
  OSS_PATH: '"http://hsunnyc.oss-cn-beijing.aliyuncs.com"'
})
