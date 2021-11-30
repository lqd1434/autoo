const { readFileSync, writeFile } = require('fs-extra');
const p = require('path');

console.log('------我是子进程------1111');
console.log(process.cwd());
process.on('message', (msg: any) => {
  const path = msg.path;
  const content = readFileSync(`${process.cwd()}/template/index.tsx`);
  let contentStr = content.toString();
  contentStr = contentStr.replace(/NAME/g, p.basename(path));
  console.log(contentStr);

  writeFile(`${path}/index.tsx`, contentStr, (err) => {
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
