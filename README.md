# Webdriver issue

This project reproduces weird behavior when chaining webdriver commands:

The following works:
```
let selected
selected = await browser.element('form').element('input').isSelected();
await browser.element('form').element('input').click();
selected = await browser.element('form').element('input').isSelected();
```

If however the intermediate values are saved to variables it does not work:

```
const form = browser.element('form');
const input = form.element('input');
selected = await input.isSelected();
await input.click();
selected = await input.isSelected();
```

To reproduce:
```
npm run selenium

npm start
```

Process output in `process.out`
Selenium output in `selenium.out`
