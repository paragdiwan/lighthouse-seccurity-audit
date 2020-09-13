'use strict';

const Gatherer = require('lighthouse').Gatherer;

class HtmlBindGatherer extends Gatherer {
  afterPass(options) {
    const driver = options.driver;
    const htmlSelectorVue = '[v-html]';
    const vueAttribute = driver.evaluateAsync(`window.document.querySelectorAll('${htmlSelectorVue}').length`);
  
    const htmlSelectorNg = '[ng-bind-html]';
    const ngAttribute = driver.evaluateAsync(`window.document.querySelectorAll('${htmlSelectorNg}').length`);
    
    return ngAttribute || vueAttribute;
  }
}

module.exports = HtmlBindGatherer;