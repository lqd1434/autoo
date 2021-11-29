import { readFileSync,writeFile } from 'fs-extra';


console.log('我是子进程');
console.log(process.cwd())
process.on('message',(msg:any)=>{
	const content = readFileSync(`${process.cwd()}/template/index.tsx`)
	console.log(content.toString())
	const path = msg.path;

	writeFile(`${path}/index.tsx`, content, (err => {
		if (err) {
			console.log(err);
			process.send({
				status: false,
				msg: err
			})
		} else {
			process.send({
				status: true,
				msg: 'success'
			})
		}
	}))
})
