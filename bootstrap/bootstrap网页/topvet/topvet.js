/**
 * Created by 朱利萍 on 2017/5/26.
 */
var num=0;
var t=setInterval(move,2000)
function move(){
    if(!$('.nth-child').is(':animated')){
        num++
        if(num>=$('.nth-child').length){
            num=0;
        }
        $('.nth-child').eq(num).fadeIn(1349).siblings().fadeOut(1349)
    }
}



