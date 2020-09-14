
//在真正返回response之前使用

let book={
    name:'javascript 高级程序设计',
    number:2,
    id:1
}
axios.interceptors.response.use(function(response){
    // let config=response.config
    // let{method,url,data}=config//data是请求的data

    let{config:{method,url,data}}=response
    if(url==='/books/1'&&method==='get'){
        response.data=book

    }else if(url==='/books/1'&&method==='put'){
        Object.assign(book,data)
        response.data=book
    }
    return response
})


axios.get('/books/1')
.then(function(data){
 let originalHtml=$('#app').html()
 let newHtml=originalHtml.replace('__name__',data.name)
    .replace('__number__',data.number)
 $("#app").html(newHtml)
})

$('#app').on('click','#addOne',function(){
    var oldNumber=$('#number').text()//string 
    var newNumber=oldNumber-0+1
    axios.put('/book/1',{
        number:newNumber
    }).then(()=>{
        $('#number').text(newNumber)
    })
})


$('#app').on('click','#minusOne',function(){
    var oldNumber=$('#number').text()//string 
    var newNumber=oldNumber-0-1
    axios.put('/book/1',{
        number:newNumber
    }).then(()=>{
        $('#number').text(newNumber)
    })
})


$('#app').on('click','#rest',function(){ 
    axios.put('/book/1',{
        number:0
    }).then(()=>{
        $('#number').text(0)
    })
})