# unify-config

A tiny module to make it easier to work with configurations - especially secrets - held in either environment variables, or docker secrets. Useful when a single code base may be used either directly on the local machine (using environment variables), or under docker-compose or a docker swarm, where environment variables are not secure and docker secrets should be used.

## Installation

```
npm install --save  unify-config
```

## Usage

### Motivation

<a name="UnifyConfig"></a>

## UnifyConfig

**Kind**: global class

- [UnifyConfig](#UnifyConfig)
  - [new UnifyConfig()](#new_UnifyConfig_new)
  - [.addEnv(name)](#UnifyConfig+addEnv) ⇒ <code>string</code>
  - [.addSecret(name)](#UnifyConfig+addSecret) ⇒ <code>string</code>
  - [.add(name)](#UnifyConfig+add) ⇒ <code>string</code>
  - [.addList(names)](#UnifyConfig+addList) ⇒ <code>Array.&lt;string&gt;</code>
  - [.addAllSecrets()](#UnifyConfig+addAllSecrets) ⇒ <code>Array.&lt;string&gt;</code>

<a name="new_UnifyConfig_new"></a>

### new UnifyConfig()

Support setting application config values from either environment values or docker secrets

Provides a unified mechanism to load configurations whether running as:

- directly on local machine with environment variables
- under docker-compose using docker secrets
- under docker swarm using docker secrets

<a name="UnifyConfig+addEnv"></a>

### unifyConfig.addEnv(name) ⇒ <code>string</code>

Try to add a config value from an environment variable

**Kind**: instance method of [<code>UnifyConfig</code>](#UnifyConfig)  
**Returns**: <code>string</code> - - found config value

| Param | Type                |
| ----- | ------------------- |
| name  | <code>string</code> |

<a name="UnifyConfig+addSecret"></a>

### unifyConfig.addSecret(name) ⇒ <code>string</code>

Try to add a config value from a docker secret

**Kind**: instance method of [<code>UnifyConfig</code>](#UnifyConfig)  
**Returns**: <code>string</code> - - found config value

| Param | Type                |
| ----- | ------------------- |
| name  | <code>string</code> |

<a name="UnifyConfig+add"></a>

### unifyConfig.add(name) ⇒ <code>string</code>

Try to add config value from either environment variable or docker secret

If both sources exist, the docker secret will be used.

**Kind**: instance method of [<code>UnifyConfig</code>](#UnifyConfig)  
**Returns**: <code>string</code> - - found config value

| Param | Type                |
| ----- | ------------------- |
| name  | <code>string</code> |

<a name="UnifyConfig+addList"></a>

### unifyConfig.addList(names) ⇒ <code>Array.&lt;string&gt;</code>

Try to add all config value in a list

**Kind**: instance method of [<code>UnifyConfig</code>](#UnifyConfig)  
**Returns**: <code>Array.&lt;string&gt;</code> - - list of found values (or null for those not found)

| Param | Type                              |
| ----- | --------------------------------- |
| names | <code>Array.&lt;string&gt;</code> |

<a name="UnifyConfig+addAllSecrets"></a>

### unifyConfig.addAllSecrets() ⇒ <code>Array.&lt;string&gt;</code>

Add all docker secrets

**Kind**: instance method of [<code>UnifyConfig</code>](#UnifyConfig)  
**Returns**: <code>Array.&lt;string&gt;</code> - - list of found secrets
