import { fork } from 'child_process';
import { existsSync, readdirSync } from 'fs-extra';
import { resolvePath, resolveRootPath, resolveTemplatePath, resolveWriteScriptPath } from './path';
import * as signale from 'signale';

const isDev = process.env.NODE_ENV === 'development';
export const startWorker = async (change: string, config) => {
  //复制文件脚本路径
  const writeScript = resolveWriteScriptPath(isDev ? './write.ts' : './write.js');
  //模板目录
  const templatePath = resolveTemplatePath(config.template);
  //新增文件夹路径
  const changePath = resolveRootPath(change);

  let sourceFiles=[];
  //模板文件数组
  try{
    sourceFiles = readdirSync(templatePath);
  }catch(err){
    signale.error(err);
  }

  if (sourceFiles.length !== 0) {
    sourceFiles.forEach((source, index) => {
      (async () => {
        //目的地文件
        const targetPath = resolvePath(changePath, `./${source}`);
        //单个模板文件完整路径
        const sourceFile = resolvePath(templatePath, source);
  
        const exist = existsSync(targetPath);
        if (!exist) {
          signale.start('新增目录==>', change);
          signale.debug(writeScript);
          // @ts-ignore
          const worker = fork(`${writeScript}`, [index]);
          worker.send({ targetPath: targetPath, source: sourceFile });
        }
      })();
    });
  }
  

  
};
