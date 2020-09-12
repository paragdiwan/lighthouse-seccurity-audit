/**
 * @license Copyright 2017 The Lighthouse Authors. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.
 */
'use strict';

module.exports = {
  extends: 'lighthouse:default',
  
  passes: [{
    passName: 'defaultPass',
    gatherers: [
      'gatherers/response-headers',
      'gatherers/content-security'
    ],
  }],
  
  audits: [
    {
      path: './audits/cookie-http-only.js',
    },
    {
      path: './audits/csp.js',
    },
    {
      path: './audits/xss-protection-header.js',
    },
    {
      path: './audits/nosniff.js',
    },
    {
      path: './audits/strict-transport-security.js'
    },
    {
      path: './audits/secure-cookie.js'
    },
    {
      path: './audits/x-frame-options.js'
    },
    {
      path: './audits/same-site.js'
    }
  ],
  categories: {
    security: {
      title: 'Security',
      description: 'Security measures that can\'t be ignored.',
      auditRefs: [
        // When we add more custom audits, `weight` controls how they're averaged together.
        {id: 'cookie-http-only', weight: 1},
        {id: 'content-security-policy', weight: 1},
        {id: 'xss-headers', weight: 1},
        {id: 'x-content-type-options', weight: 1},
        {id: 'strict-transport-security', weight: 1},
        {id: 'secure-cookie', weight: 1},
        {id: 'x-frame-options-header', weight: 1},
        {id: 'cookie-samesite', weight: 1}
      ],
    },
  },
};