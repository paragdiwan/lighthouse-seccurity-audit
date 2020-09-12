'use strict';
const Audit = require('lighthouse').Audit;
const validUrl = require('valid-url');

/**
 * A valid X-Frame-Header option is `DENY`, `SAMEORIGIN` or `ALLOW :url`.
 * The value is case-insenstive and can optionally have trailing whitespaces and a trailing semicolon.
 * See https://tools.ietf.org/html/rfc7034#section-2.1
 *
 * @param {string} [value]
 * @returns {boolean}
 */
const isValidOption = value => {
  if (!(typeof value === 'string')) {
    return false;
  }
  value = value.toUpperCase();
  return /DENY *;?/i.test(value) ||
    /SAMEORIGIN *;?/i.test(value) ||
    /ALLOW-FROM .*;?/i.test(value) && validUrl.isUri(value.substr('ALLOW-FROM '.length));
};

class XFrameOptionsHeaderAudit extends Audit {
  static get meta() {
    return {
      id: 'x-frame-options-header',
      title: 'Page has valid `X-Frame-Options` value',
      failureTitle: 'Page `X-Frame-Options` header is missing or invalid',
      description: 'The `X-Frame-Options` header protects your visitors ' +
        'against clickjacking attacks. It prevents your content ' +
        'from being loaded in a frame on an attacker\'s site. ' +
        '[Learn more](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Frame-Options).',
      requiredArtifacts: ['ResponseHeaders']
    };
  }
  
  static audit(artifacts) {
    const header = artifacts.ResponseHeaders['x-frame-options'];
    const hasHeader = (typeof header === 'string');
    const isValidHeader = hasHeader && isValidOption(header);
    
    return {
      score: isValidHeader ? 1: 0,
      displayValue: !isValidHeader ? '`x-frame-options` either missing or invalid.': ''
    };
  }
}

module.exports = XFrameOptionsHeaderAudit;