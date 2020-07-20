$('.images>img:nth-child(1)').addClass('current')
$('.images>img:nth-child(2)').addClass('enter')
$('.images>img:nth-child(3)').addClass('enter')
let n=1
setInterval(() => {
    if(n>3){
        n=n%3
        if(n===0){
            n=3
        }
    }  //n= 1,2,3
    $(`.images>img:nth-child(${n})`).removeClass('current').addClass('leave')
    .one('transitionend',(e)=>{
        $(e.currentTarget).removeClass('leave').addClass('enter')
    })
    $(`.images>img:nth-child(${n+1})`).removeClass('enter').addClass('current')
    n+=1
    
}, 3000)
// n+1有问题，因此要搞一个函数
// `这个符号与'直接的区别`这个符号是es6的知识，，，，
// 'hello'+str+'world'
// `hello${str}world`
// str就是变量名
