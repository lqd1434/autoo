import chokidar from 'chokidar';
import path from "path";
import {startWorker} from "./worker";

(async ()=>{
	const configPath = path.resolve(process.cwd(),'../autoo.config.js')
	const config = require(configPath)
	console.log(process.cwd())
	console.log(__dirname)
	const include = config.include as string[];
	console.log(include.join(' '))
	const watcher = chokidar.watch(include.join(' '), {
		cwd:process.cwd(),
		persistent:true
	});

	watcher.on('addDir',(path => {
		startWorker(path)
	}))
})()

