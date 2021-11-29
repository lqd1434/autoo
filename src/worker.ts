import {existsSync} from "fs-extra";
import {fork} from "child_process";

export const startWorker = async (path)=>{
	const exist = existsSync(`${process.cwd()}/${path}/index.tsx`)
	if (!exist){
		const worker = fork(`${__dirname}/write.js`)
		worker.send({path});
		worker.on('message',(msg)=>{
			console.log('---来自子进程----')
			console.log(msg)
		})
	}

}
