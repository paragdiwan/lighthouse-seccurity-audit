/**
 * @license Copyright 2019 The Lighthouse Authors. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
 */
'use strict';

const Audit = require('lighthouse').Audit;

class XContentTypeAudit extends Audit {
  static get meta() {
    return {
      id: 'x-content-type-options',
      title: 'Requires that all resources are served with the X-Content-Type-Options: nosniff HTTP response header',
      failureTitle: 'Missing `X-Content-Type-Options` in response header',
      description: 'While content sniffing can be beneficial, it can also expose the web site/app to attacks based on MIME-type confusion leading to security problems, especially in the case of servers hosting untrusted content.\n' +
        '\n' +
        'Fortunately, browsers provide a way to opt-out of MIME sniffing by using the X-Content-Type-Options: nosniff HTTP response header. ' +
        '[Learn more](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Content-Type-Options).',
      
      requiredArtifacts: ['ResponseHeaders'],
    };
  }
  
  static audit(artifacts) {
    
    const headers = artifacts.ResponseHeaders;
    const contentTypeOptionHeader = headers['X-Content-Type-Options'];
    return {
      score: contentTypeOptionHeader ? 1 : 0,
    };
  }
}

module.exports = XContentTypeAudit;
