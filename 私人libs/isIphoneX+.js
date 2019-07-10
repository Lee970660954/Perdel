// 判断是否是iphoneX+
export function isIponeX(){
    let ua = navigator.userAgent;
    // 判断是否是ios终端
    let isIos = !!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
    if(isIos){
        if(screen.height >= 812){
            // 是iphoneX+
        }else{
            // 不是iphoneX+
        }
    }
}