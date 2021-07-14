//promise.js
class Promise{
    //传一个异步函数进来
    constructor(excutorCallBack){
        this.status = 'pending';
        this.value = undefined;
        this.fulfillAry = [];
        this.rejectedAry = [];
        //=>执行Excutor
        let resolveFn = result => {
            if(this.status !== 'pending') return;
            let timer = setTimeout(() => {
                this.status = 'fulfilled';
                this.value = result;
                this.fulfillAry.forEach(item => item(this.value));
            }, 0);
        };
        let rejectFn = reason => {
            if(this.status !== 'pending')return;
            let timer = setTimeout(() => {
                this.status = 'rejected';
                this.value = reason;
                this.rejectedAry.forEach(item => item(this.value))
            })
        };
        try{
            //执行这个异步函数
            excutorCallBack(resolveFn, rejectFn);
        } catch(err) {
            //=>有异常信息按照rejected状态处理
            rejectFn(err);
        }
    }
    then(fulfilledCallBack, rejectedCallBack) {
        //resolve和reject函数其实一个作为微任务
        //因此他们不是立即执行，而是等then调用完成后执行
        this.fulfillAry.push(fulfilledCallBack);
        this.rejectedAry.push(rejectedCallBack);
        //一顿push过后他们被执行
    }
}

module.exports = Promise;