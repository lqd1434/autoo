const { readFileSync, writeFile } = require('fs-extra');
const Path = require('path');

console.log('我是子进程' + process.argv[2]);
console.log(process.cwd());
process.on('message', (msg: any) => {
  const { targetPath, template } = msg;
  const fileName = Path.basename(template);
  console.log(targetPath, 'targetPath');
  console.log(template, 'template');
  const content = readFileSync(template);
  let contentStr = content.toString();
  contentStr = contentStr.replace(/NAME/g, Path.basename(targetPath));
  console.log(contentStr);

  writeFile(`${targetPath}/${fileName}`, contentStr, (err) => {
    if (err) {
      console.log(err);
      process.send({
        status: false,
        msg: err
      });
    } else {
      process.send({
        status: true,
        msg: 'success'
      });
    }
  });
});
