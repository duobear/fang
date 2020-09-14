
//在真正返回response之前使用

axios.interceptors.response.use(function(response){
    // let config=response.config
    // let{method,url,data}=config//data是请求的data

    let{config:{method,url,data}}=response
   
    if(url==='/books/1'&&method=='get'){
        response.data={  //响应的结果，会到then
            'name':'javascript',
            'number':2,
            id:1
        }
    }
    return response
})


axios.get('/books/1')
.then(({data})=>{//{name:'jav...,numeber；2，id：1}
 let originalHtml=$('#app').html()
 let newHtml=originalHtml.replace('__name__',data.name)
    .replace('__number__',data.number)
 $("#app").html(newHtml)
})



$('#addOne').on('click',function(){
    var oldNumber=$('#number').text()//string 
    var newNumber=oldNumber-0+1
   $('#number').text(newNumber)
   
})


$('#minusOne').on('click',function(){
    var oldNumber=$('#number').text()//string 
    var newNumber=oldNumber-0-1
    $('#number').text(newNumber)
})


$('#reset').on('click',function(){ 
    $('#number').text(0)
})