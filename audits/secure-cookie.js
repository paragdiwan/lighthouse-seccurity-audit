'use strict';
const Audit = require('lighthouse').Audit;
const parseHeader = require('../lib/parse-header');

class SecureCookiesAudit extends Audit {
  static get meta() {
    return {
      id: 'secure-cookie',
      title: 'Cookies are secure',
      failureTitle: 'Cookies are not secure',
      description: 'Using the Secure flag ensures a cookie can only be transmitted ' +
        'over an encrypted connection and not over the insecure HTTP. ' +
        '[Learn more](https://www.owasp.org/index.php/SecureFlag)',
      requiredArtifacts: ['ResponseHeaders']
    };
  }
  
  static audit(artifacts) {
    const header = artifacts.ResponseHeaders['set-cookie'];
    const params = parseHeader(header);
    const isSecure = params['secure'] === true || !header;
    
    return {
      score: isSecure ? 1 : 0,
    };
  }
}

module.exports = SecureCookiesAudit;