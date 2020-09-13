'use strict';
const Audit = require('lighthouse').Audit;

class HtmlBindAttributeAudit extends Audit {
  static get meta() {
    return {
      id: 'html-bind-attribute-check',
      title: 'HTML binding',
      description: 'Never use non-trusted content as your component/HTML template.',
      scoreDisplayMode: 'informative',
      requiredArtifacts: ['HtmlBindGatherer']
    }
  }
  
  static audit(artifacts) {
    const htmlBindingPresent = artifacts.HtmlBindGatherer;
    if (htmlBindingPresent) {
      return {
        score: 0,
        displayValue: 'Avoid using direct html bindings. This could lead to XSS. '
      }
    } else {
      return {
        score: 1,
        displayValue: 'No HTML binding detected. '
      }
    }
  }
}

module.exports = HtmlBindAttributeAudit;