'use strict';
const Audit = require('lighthouse').Audit;
const parseHeader = require('../lib/parse-header');

class CookieHttpOnlyAudit extends Audit {
  static get meta() {
    return {
      id: 'cookie-http-only',
      title: 'Set-cookie contains `HttpOnly` flag',
      failureTitle: 'Set-cookie doesn\'t have `HttpOnly` flag',
      description: 'Using the HttpOnly flag when generating a cookie helps mitigate ' +
        'the risk of client side script accessing the protected cookie. ' +
        '[Learn more](https://www.owasp.org/index.php/HttpOnly)',
      requiredArtifacts: ['ResponseHeaders']
    };
  }
  
  static audit(artifacts) {
    const header = artifacts.ResponseHeaders['set-cookie'];
    const params = parseHeader(header);
    const isHttpOnly = params['HttpOnly'] === true || !header;
    
    return {
      score: isHttpOnly ? 1 : 0,
    };
  }
}

module.exports = CookieHttpOnlyAudit;