# unify-config

![GitHub package.json version](https://img.shields.io/github/package-json/v/sjmallon/unify-config)
![GitHub](https://img.shields.io/github/license/sjmallon/unify-config)
![Travis (.org)](https://img.shields.io/travis/sjmallon/unify-config)

A tiny module to make it easier to work with configurations - especially secrets - held in either environment variables, or docker secrets. Useful when a single code base may be used either directly on the local machine (using environment variables), or under docker-compose or a docker swarm, where environment variables are not secure and docker secrets should be used.

## Installation

```
npm install --save  unify-config
```

## Usage

### Motivation

<a name="UnifySecrets"></a>

## UnifySecrets

**Kind**: global class

- [UnifySecrets](#UnifySecrets)
  - [new UnifySecrets()](#new_UnifySecrets_new)
  - [.config](#UnifySecrets+config)
  - [.addEnv(name)](#UnifySecrets+addEnv) ⇒ <code>string</code>
  - [.addSecret(name)](#UnifySecrets+addSecret) ⇒ <code>string</code>
  - [.add(name)](#UnifySecrets+add) ⇒ <code>string</code>
  - [.addList(names)](#UnifySecrets+addList) ⇒ <code>Array.&lt;string&gt;</code>
  - [.addAllSecrets()](#UnifySecrets+addAllSecrets) ⇒ <code>Array.&lt;string&gt;</code>

<a name="new_UnifySecrets_new"></a>

### new UnifySecrets()

Support setting application config values from either environment values or docker secrets

Provides a unified mechanism to load configurations whether running as:

- directly on local machine with environment variables
- under docker-compose using docker secrets
- under docker swarm using docker secrets

<a name="UnifySecrets+config"></a>

### unifySecrets.config

Get full config object

**Kind**: instance property of [<code>UnifySecrets</code>](#UnifySecrets)  
**Read only**: true  
<a name="UnifySecrets+addEnv"></a>

### unifySecrets.addEnv(name) ⇒ <code>string</code>

Try to add a config value from an environment variable

**Kind**: instance method of [<code>UnifySecrets</code>](#UnifySecrets)  
**Returns**: <code>string</code> - - found config value

| Param | Type                |
| ----- | ------------------- |
| name  | <code>string</code> |

<a name="UnifySecrets+addSecret"></a>

### unifySecrets.addSecret(name) ⇒ <code>string</code>

Try to add a config value from a docker secret

**Kind**: instance method of [<code>UnifySecrets</code>](#UnifySecrets)  
**Returns**: <code>string</code> - - found config value

| Param | Type                |
| ----- | ------------------- |
| name  | <code>string</code> |

<a name="UnifySecrets+add"></a>

### unifySecrets.add(name) ⇒ <code>string</code>

Try to add config value from either environment variable or docker secret

If both sources exist, the docker secret will be used.

**Kind**: instance method of [<code>UnifySecrets</code>](#UnifySecrets)  
**Returns**: <code>string</code> - - found config value

| Param | Type                |
| ----- | ------------------- |
| name  | <code>string</code> |

<a name="UnifySecrets+addList"></a>

### unifySecrets.addList(names) ⇒ <code>Array.&lt;string&gt;</code>

Try to add all config value in a list

**Kind**: instance method of [<code>UnifySecrets</code>](#UnifySecrets)  
**Returns**: <code>Array.&lt;string&gt;</code> - - list of found values (or null for those not found)

| Param | Type                              |
| ----- | --------------------------------- |
| names | <code>Array.&lt;string&gt;</code> |

<a name="UnifySecrets+addAllSecrets"></a>

### unifySecrets.addAllSecrets() ⇒ <code>Array.&lt;string&gt;</code>

Add all docker secrets

**Kind**: instance method of [<code>UnifySecrets</code>](#UnifySecrets)  
**Returns**: <code>Array.&lt;string&gt;</code> - - list of found secrets
