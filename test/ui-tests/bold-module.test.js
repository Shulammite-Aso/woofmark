const timeout = process.env.SLOWMO ? 130000 : 40000;
const fs = require('fs');
beforeAll(async () => {
  path = fs.realpathSync('file://../test.html');
  await page.goto('file://' + path, {waitUntil: 'domcontentloaded'});
});

describe('bold module work as expected', () => {
  test('retains bold selection state (on/off) after using new line', async () => {
    await page.waitForSelector('.wk-wysiwyg');
    await page.keyboard.type(' not using bold ', {delay: 160});
    await page.keyboard.down('Control');
    await page.keyboard.press('KeyB');
    await page.keyboard.up('Control');
    await page.keyboard.type('using bold ', {delay: 160});
    await page.keyboard.down('Control');
    await page.keyboard.press('KeyB');
    await page.keyboard.up('Control');
    await page.keyboard.press('Enter');
    await page.keyboard.type('using new line', {delay: 160});

    

    const stringIsIncluded = await page.evaluate(() => document.querySelector('.wk-wysiwyg').innerHTML.includes('<strong>using new line</strong>'));
    expect(stringIsIncluded).toBe(false);

    
  }, timeout);

  test('bold text does not loose formatting after converting to markdown and back to rich', async () => {
    await page.goto('file://' + path, {waitUntil: 'domcontentloaded'});
    await page.waitForSelector('.wk-wysiwyg');
    await page.keyboard.type(' not using bold ', {delay: 160});
    await page.keyboard.down('Control');
    await page.keyboard.press('KeyB');
    await page.keyboard.up('Control');
    await page.keyboard.type('using bold ', {delay: 160}); 
    await page.keyboard.down('Control');
    await page.keyboard.press('KeyB');
    await page.keyboard.up('Control');
    await page.keyboard.type('using new line', {delay: 160});

    await page.keyboard.down('Control');
    await page.keyboard.press('KeyM');
    await page.keyboard.up('Control');
    await page.keyboard.type('writing in markdown mode', {delay: 160});
    await page.keyboard.down('Control');
    await page.keyboard.press('KeyP');
    await page.keyboard.up('Control');
    await page.keyboard.type('back in wysiwyg mode', {delay: 160});

    const stringIsIncluded = await page.evaluate(() => document.querySelector('.wk-wysiwyg').innerHTML.includes('**using bold **'));
    expect(stringIsIncluded).toBe(false);

  }, timeout);
});