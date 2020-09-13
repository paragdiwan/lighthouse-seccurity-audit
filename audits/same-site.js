'use strict';
const Audit = require('lighthouse').Audit;
const parseHeader = require('../lib/parse-header');


class SameSiteCookieAudit extends Audit {
  static get meta() {
    return {
      id: 'cookie-samesite',
      title: 'Cookies are sameSite',
      failureTitle: 'Cookies are not SameSite',
      description: 'SameSite prevents the browser from sending the cookie along ' +
        'with cross-site requests. which provides some protection ' +
        'against cross-site request forgery attacks (CSRF). ' +
        '[Learn more](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie/SameSite)',
      requiredArtifacts: ['ResponseHeaders']
    };
  }
  
  static audit(artifacts) {
    const header = artifacts.ResponseHeaders['set-cookie'];
    const hasHeader = (typeof header === 'string');
    const params = parseHeader(header);
    
    if (!hasHeader) {
      return {
        score: 0
      };
    }
    
    if (params['SameSite']) {
      if (/(Strict|Lax)/.test(params['SameSite'])) {
        return {
          score: 1
        };
      } else {
        return {
          displayValue: 'Invalid `SameSite` value. Can only be `Strict` or `Lax`.',
          score: 0
        };
      }
    }
  }
}

module.exports = SameSiteCookieAudit;