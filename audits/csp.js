'use strict';
const Audit = require('lighthouse').Audit;

class CspAudit extends Audit {
  static get meta() {
    return {
      id:'content-security-policy',
      category: 'Security',
      title: 'Content Security Policy (CSP)',
      failureText: 'Missing Content Security Policy (CSP)',
      description: 'A Content Security Policy helps prevent cross-site scripting (XSS), ' +
        'clickjacking and other code injection by whitelisting trusted resources. ' +
        '[Learn more](https://developers.google.com/web/fundamentals/security/csp/)',
      requiredArtifacts: ['CspMetaGatherer', 'ResponseHeaders']
    };
  }
  
  static audit(artifacts) {
    const isCSPMetaPresent  = artifacts.CspMetaGatherer;
    const headers = artifacts.ResponseHeaders;
    const hasCspMetaTags = isCSPMetaPresent;
    const cspHeader = headers['content-security-policy'];
    const xCspHeader = headers['x-content-security-policy'];
    const hasCspHeader = !!(cspHeader || xCspHeader);
    const hasCsp = hasCspMetaTags || hasCspHeader;
    return {
      score: hasCsp ? 1 : 0
    };
  }
}

module.exports = CspAudit;