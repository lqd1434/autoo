const cliSpinners = require('cli-spinners');
const cliProgress = require('cli-progress');
console.log(cliSpinners.star);
const frames = cliSpinners.dots2.frames;
const { fork } = require('child_process');
const { existsSync, readdirSync } = require('fs-extra');
const { resolveTemplatePath, resolveWriteScriptPath, resolvePath, resolveRootPath } = require('./path');

export const startWorker = async (change: string, config) => {
  //复制文件脚本路径
  const writeScript = resolveWriteScriptPath();
  //模板目录
  const templatePath = resolveTemplatePath(config.template);
  //新增文件夹路径
  const changePath = resolveRootPath(change);

  //模板文件数组
  const sourceFiles = readdirSync(templatePath);

  const bar1 = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);
  bar1.start(100, 0);

  let pre = 0;
  sourceFiles.forEach((source, index) => {
    //目的地文件
    const targetPath = resolvePath(changePath, `./${source}`);
    //单个模板文件完整路径
    const sourceFile = resolvePath(templatePath, source);

    const exist = existsSync(targetPath);
    if (!exist) {
      console.log('新增目录==>', change);
      const worker = fork(writeScript, [index]);

      worker.send({ targetPath: targetPath, source: sourceFile });
      worker.on('message', (msg) => {
        bar1.update(msg);
        if (msg === 100) {
          bar1.stop();
        }
      });
    }
  });
};
