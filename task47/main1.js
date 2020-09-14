//在真正返回response之前使用

axios.interceptors.response.use(function(response){
    // let config=response.config //config,是请求过来的一些配置   
    // let {method,url,data}=config 

    //两行合并一行    
    let{congfig:{method,url,data}}=response

    
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
.then(({response})=>{  //{name:'jav...,numeber；2，id：1}
    console.log(response)
}).catch(function () {
    // handle error
    console.log("error");
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