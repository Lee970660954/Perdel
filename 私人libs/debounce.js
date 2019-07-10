// 函数防抖
export function debounce(handler, interval){
    let timer;
    let args = arguments;
    return function(){
        clearTimeout(timer);
        timer = setTimeout(() => {
            handler.call(this, args);
        }, interval);
    }
}