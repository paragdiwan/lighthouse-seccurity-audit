# Lighthouse Security Audits

## Installation

```sh
npm install -g lighthouse-security-audit
```

## Run from CLI

```sh
`lighthouse-security-audit <url> --options`
```

## Screenshot

![Sample](https://github.com/paragdiwan/GitTutorial/raw/master/Screenshot%202020-09-13%20at%206.01.40%20PM.png)

## Programmatially

The extension can also be used within your code. A short example is given below.
To render reports etc. it is recommended to import functionality from Lighthouse.

```javascript
const run = require("lighthouse-security-audit");

(async () => {
  const results = await run(url, flags);
  console.log(results);
})();
```

## Reference

`lighthouse-security` package.
