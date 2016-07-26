const port = 8080;

const webdriverio = require('webdriverio');

const express = require('express');
const app = express();
app.use(express.static('./'));
const server = app.listen(port, run);

async function run() {
  try {

    var options = {
        desiredCapabilities: {
            browserName: 'chrome'
        }
    };

    const browser =
      webdriverio
      .remote(options)
      .init();

    await browser.url(`http://localhost:${port}`)
    await browser.waitForText('h1=Title');


    const form = browser.element('form');
    const input = form.element('input');
    let selected
    selected = await input.isSelected();
    console.log('broken - expecting false got:', selected);
    await input.click();
    selected = await input.isSelected();
    console.log('broken - expecting true got:', selected);

    // but this does work
    selected = await browser.element('form').element('input').isSelected();
    console.log('working - expecting false got:', selected);
    await browser.element('form').element('input').click();
    selected = await browser.element('form').element('input').isSelected();
    console.log('working - expecting true got:', selected);

    await browser.end();
  } catch (e) {
    console.log(e);
  }
  server.close(() => process.exit());
}
