export interface WriteResult{
	code: 0|1|3,
	msg: string
}

export interface SendInfo<T extends any>{
	name:string
	data:T
}
