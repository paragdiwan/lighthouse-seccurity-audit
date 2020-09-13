#! /usr/bin/env node
'use strict';

const runLighthouse = require('../index');
const {getFlags} = require('lighthouse/lighthouse-cli/cli-flags');

const flags = getFlags();
const url = flags._[0];

runLighthouse(url);