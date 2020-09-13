# Lighthouse Security Audits

##Installation
`npm install -g lighthouse-security-audit`

##Run from CLI
`lighthouse-security-audit <url> --options`

## Use in code

The extension can also be used within your code. A short example is given below.
To render reports etc. it is recommended to import functionality from Lighthouse.

```javascript
const runLighthouse = require('lighthouse-security-audit')

runLighthouse(url, flags)
  .then(results => console.log(results))
```
## Reference
`lighthouse-security`  package.