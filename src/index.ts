#! /usr/bin/env node

import path = require("path");

const chokidar = require('chokidar');
const child_process = require('child_process');
const fs = require("fs");
const promisify = require('util').promisify;

(async ()=>{
	const configPath = path.resolve(__dirname,'../autoo.config.js')
	const config = require(configPath)
	console.log(config)
	const watcher = chokidar.watch('./src/components/**', {
		cwd:process.cwd(),
		persistent:true
	});

	watcher.on('addDir',(path => {
		startWorker(path)
	}))
})()

const startWorker = async (path)=>{
	const exist = fs.existsSync(`${process.cwd()}/${path}/index.tsx`)
	if (!exist){
		const worker = child_process.fork(`${process.cwd()}/scripts/write.js`)
		worker.send({path});
		worker.on('message',(msg)=>{
			console.log('来自子进程')
			console.log(msg)
		})
	}

}
