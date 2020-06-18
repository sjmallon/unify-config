const fs = require('fs')
const path = require('path')

/**
 * Support setting application config values from either environment values or docker secrets
 *
 * Provides a unified mechanism to load configurations whether running as:
 * - directly on local machine with environment variables
 * - under docker-compose using docker secrets
 * - under docker swarm using docker secrets
 *
 * @class UnifyConfig
 */
class UnifyConfig {
  constructor() {
    this._config = {}
  }

  /**
   * Get full config object
   *
   * @readonly
   * @memberof UnifyConfig
   */
  get config() {
    return this._config
  }

  /**
   * Try to add a config value from an environment variable
   *
   * @param {string} name
   * @returns {?string} - found config value
   * @memberof UnifyConfig
   */
  addEnv(name) {
    if (process.env[name]) {
      this._config[name] = process.env[name]
      return this._config[name]
    } else {
      return null
    }
  }

  /**
   * Try to add a config value from a docker secret
   *
   * @param {string} name
   * @returns  {?string} - found config value
   * @memberof UnifyConfig
   */
  addSecret(name) {
    let target = path.join('/run/secrets/', name)
    try {
      let v = fs.readFileSync(target, 'utf8')
      this._config[name] = v
      return this._config[name]
    } catch (err) {
      if (err.code && err.code === 'ENOENT') {
        return null
      } else {
        throw err
      }
    }
  }

  /**
   * Try to add config value from either environment variable or docker secret
   *
   * If both sources exist, the docker secret will be used.
   *
   * @param {string} name
   * @returns  {?string} - found config value
   * @memberof UnifyConfig
   */
  add(name) {
    if (this.addSecret(name) || this.addEnv(name)) {
      return this._config[name]
    } else {
      return null
    }
  }

  /**
   * Try to add all config value in a list
   *
   * @param {string[]} names
   * @returns {?string[]} - list of found values (or null for those not found)
   * @memberof UnifyConfig
   */
  addList(names) {
    return names.map(n => this.add(n))
  }

  /**
   * Add all docker secrets
   *
   * @returns {string[]} - list of found secrets
   * @memberof UnifyConfig
   */
  addAllSecrets() {
    let files = fs
      .readdirSync('/run/secrets', { withFileTypes: true })
      .filter(f => f.isFile())
      .map(f => f.name)
    return this.addList(files)
  }
}

module.exports = UnifyConfig
