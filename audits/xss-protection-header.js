'use strict';
const Audit = require('lighthouse').Audit;

class XssAudit extends Audit {
  static get meta() {
    return {
      id: 'xss-headers',
      title: 'X-XSS-Protection header is set',
      failureTitle: 'X-XSS-Protection header is missing',
      description: 'The HTTP `X-XSS-Protection` response header stops pages from loading ' +
        'when they detect reflected cross-site scripting (XSS) attacks. ' +
        '[Learn more](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-XSS-Protection).',
      requiredArtifacts: ['ResponseHeaders']
    };
  }
  
  static audit(artifacts) {
    const header = artifacts.ResponseHeaders['x-xss-protection'];
    const hasXssHeader = !!header;
    
    return {
      score: hasXssHeader ? 1 : 0,
      displayValue: ``,
    };
  }
}

module.exports = XssAudit;