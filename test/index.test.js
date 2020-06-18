const mockFs = require('mock-fs')

const UnifyConfig = require('..')

beforeAll(() => {
  mockFs({
    '/run/secrets': {
      secret: 'secret value',
      secret2: 'second secret'
    }
  })
})

afterAll(() => {
  mockFs.restore()
})

describe('Basics', () => {
  test('A new config is empty', () => {
    let c = new UnifyConfig()
    expect(c.config).toEqual({})
  })
})

describe('Environment variables', () => {
  test('Adding an environment variable', () => {
    const testValue = 'Test string'
    process.env['TEST_VAR_78'] = testValue
    let c = new UnifyConfig()
    let v = c.addEnv('TEST_VAR_78')
    expect(v).toEqual(testValue)
    expect(c.config.TEST_VAR_78).toEqual(testValue)
  })

  test('Adding an non-environment variable should fail', () => {
    let c = new UnifyConfig()
    let v = c.addEnv('NOT_EXISTING')
    expect(v).toBeNull()
    expect(c.config.TEST_VAR_78).toBeUndefined()
  })
})

describe('Docker secrets', () => {
  test('Adding a secret', () => {
    let c = new UnifyConfig()
    let v = c.addSecret('secret')
    expect(v).toEqual('secret value')
    expect(c.config.secret).toEqual('secret value')
  })

  test('Adding a non-existant secret should fail', () => {
    let c = new UnifyConfig()
    let v = c.addSecret('nonsecret')
    expect(v).toBeNull()
    expect(c.config.secret).toBeUndefined()
  })
})

describe('Combined', () => {
  test('Adding from an environment variable', () => {
    const testName = 'ENV_VAR_23'
    const testValue = 'Test string 2'
    process.env[testName] = testValue
    let c = new UnifyConfig()
    let v = c.add(testName)
    expect(v).toEqual(testValue)
    expect(c.config[testName]).toEqual(testValue)
  })

  test('Adding from a docker secret', () => {
    let c = new UnifyConfig()
    let v = c.add('secret')
    expect(v).toEqual('secret value')
    expect(c.config.secret).toEqual('secret value')
  })

  test('Secrets have priority over environment variables', () => {
    const testName = 'secret'
    const testValue = 'Env Secret'
    process.env[testName] = testValue
    let c = new UnifyConfig()
    let v = c.add('secret')
    expect(v).toEqual('secret value')
    expect(c.config.secret).toEqual('secret value')
  })

  test('Adding when neither a docker secret nor env var exists should fail', () => {
    let c = new UnifyConfig()
    let v = c.add('nowhere')
    expect(v).toBeNull()
    expect(c.config.nowhere).toBeUndefined()
  })
})

describe('Adding lists', () => {
  test('Adding a mix of secrets and env vars', () => {
    const testName = 'ENV_VAR_45'
    const testValue = 'Test string 3'
    process.env[testName] = testValue
    let c = new UnifyConfig()
    let v = c.addList([testName, 'secret'])
    expect(v).toHaveLength(2)
    expect(v).toContain('secret value')
    expect(v).toContain(testValue)
    expect(c.config).toEqual({ secret: 'secret value', [testName]: testValue })
  })
})

describe('Adding all secrets', () => {
  test('Add all secrets', () => {
    let c = new UnifyConfig()
    let v = c.addAllSecrets()
    expect(v).toHaveLength(2)
    expect(v).toContain('secret value')
    expect(v).toContain('second secret')
    expect(c.config).toEqual({ secret: 'secret value', secret2: 'second secret' })
  })
})
