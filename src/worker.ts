const path = require('path');
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
    }
  });
};
