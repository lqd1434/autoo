const { minify } = require('terser');
const fs = require('fs');
const path = require('path');

(async () => {
  const p = path.resolve(__dirname, '../dist');
  const buildPath = path.resolve(__dirname, '../build');
  const files = fs.readdirSync(p) as string[];
  const jsFile = files.filter((item) => {
    return /.js$/.test(item);
  });
  jsFile.forEach((file) => {
    (async () => {
      const code = fs.readFileSync(`${p}/${file}`);
      const result = (await minify(code.toString())).code;
      try {
        fs.writeFileSync(`${buildPath}/${file}`, result);
        console.log('压缩成功', file);
      } catch (e) {
        console.log(e);
      }
    })();
  });

  console.log(jsFile);
})();
