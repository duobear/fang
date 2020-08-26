let n=0
let id=setTimeout(function fn(){

    n+=1
    output.innerText=n
    if(n<10){
        setTimeout(fn,500)
    }
},500)