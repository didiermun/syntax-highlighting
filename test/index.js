require('should');
const promisify = require('util').promisify;
const path = require('path');
const hljs = require('highlightjs');
const fs = require('fs');
const hljsDefineFlogram = require('../src/flogram');
hljs.registerLanguage('flogram', hljsDefineFlogram);

const readdir = promisify(fs.readdir);
const readFile = promisify(fs.readFile);

describe('Flogram syntax highlighting', () =>
{
  async function itShouldPerformSyntaxHighlighting()
  {
    hljs.registerLanguage('flogram', hljsDefineFlogram);
    const files = (await readdir(path.join(__dirname, 'markup')))
      .filter(f => !f.includes('.expect.'));
    const scenarios = files.map(f => f.replace(/\.txt$/, ''));
    scenarios.forEach(scenario => {
      it(`should perform syntax highlighting on ${scenario}`, async () => {
        const file = `${scenario}.txt`;
        const filePath = path.join(__dirname, 'markup', file);
        const expectFilePath = filePath.replace('.txt', '.expect.txt');
        const code = await readFile(filePath, 'utf-8');
        const expected = await readFile(expectFilePath, 'utf-8');
        const result = hljs.highlight('flogram', code);
        const actual = result.value;
        actual.trim().should.eql(expected.trim(), file);
      });
    })
  }

  itShouldPerformSyntaxHighlighting();

  // The following test is ignored because the language detected is pgsql.
  // Since the Flogram syntax can be confused with RUST, I don't think we should use "highlightAuto" (as it will produce unexpected results)
  // Please note that Highlight.js can also return css or lisp depending on the code used.
  xit('should detect Flogram language', async () =>
  {
    var code = await readFile(path.join(__dirname, 'detect', 'default.txt'), 'utf-8');
    var actual = hljs.highlightAuto(code).language;
    actual.should.eql('flogram');
  });
});