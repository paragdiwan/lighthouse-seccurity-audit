const fs = require('fs');
const lighthouse = require('lighthouse');
const chromeLauncher = require('chrome-launcher');
const configJSON = require("./config");

async function run(url, flags={}) {
  const chrome = await chromeLauncher.launch({chromeFlags: ['--headless']});
  const options = {logLevel: 'info', output: 'html', port: chrome.port};
  const mergeOptions = {
    ...flags,
    ...options
  }
  const runnerResult = await lighthouse(url, mergeOptions, configJSON);
  
  const reportHtml = runnerResult.report;
  fs.writeFileSync('lhreport.html', reportHtml);
  console.log('Report has been saved successfully in `lhreport.html`!')
  await chrome.kill();
  return runnerResult;
}

module.exports = run;