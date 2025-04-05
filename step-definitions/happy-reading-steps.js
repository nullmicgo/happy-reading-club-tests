const { Given, When, Then } = require('@cucumber/cucumber');
const { remote } = require('webdriverio');
const config = require('../config/browserstack.json');
let driver;

Given('I launch the Happy Reading Club app', async function () {
  const capabilities = config.capabilities[0]; // Start with first device (Pixel 3)
  driver = await remote({
    protocol: 'https',
    hostname: config.server,
    path: '/wd/hub',
    port: 443,
    user: config.user,
    key: config.key,
    capabilities: capabilities
  });
  await driver.pause(5000); // Wait for app to load
});

When('I wait for the welcome screen', async function () {
  const welcomeElement = await driver.$('~welcome_message'); // Accessibility ID example
  await welcomeElement.waitForDisplayed({ timeout: 10000 });
});

Then('I should see the welcome message {string}', async function (expectedMessage) {
  const welcomeElement = await driver.$('~welcome_message');
  const actualMessage = await welcomeElement.getText();
  if (actualMessage !== expectedMessage) {
    throw new Error(`Expected "${expectedMessage}", but got "${actualMessage}"`);
  }
});

// Cleanup after each scenario
After(async function () {
  if (driver) {
    await driver.deleteSession();
  }
});