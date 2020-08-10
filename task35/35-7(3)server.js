var http = require('http')
var fs = require('fs')
var url = require('url')
var port = process.argv[2]

if(!port){
  console.log('请指定端口号好不啦？\nnode server.js 8888 这样不会吗？')
  process.exit(1)
}

var server = http.createServer(function(request, response){
  var temp = url.parse(request.url, true)
  var path = temp.pathname
  var query=temp.query
  var method=request.method




  /******** 从这里开始看，上面不要看 ************/



  if(path === '/'){   //如果用户请求的是 /  路径
    var string=fs.readFileSync('./14index.html','utf8')
    var amount=fs.readFileSync('./db','utf8')
    string=string.replace('&&&amount&&&',amount)
    response.setHeader('Content-Type', 'text/html;charset=utf-8')
    response.write(string)
    response.end()    
  }else if(path === '/style.css'){
    var string=fs.readFileSync('./1style.css','utf8')
    response.setHeader('Content-Type', 'text/css; charset=utf-8')
    response.write(string)   
    response.end()
  }else if(path === '/main.js'){
    var string=fs.readFileSync('./1main.js','utf8')
    response.setHeader('Content-Type', 'application/javascript')
    response.write(string)   
    response.end()
  }else if(path==='/pay'){
    var amount=fs.readFileSync('./db','utf8')
    response.setHeader('Content-Type', 'application/javascript')
    var newAmount=String(amount-1)    
    fs.writeFileSync('./db',newAmount)
    response.statusCode=200
    response.write('alert("我是pay1")')    
    // response.write(`    
    //   alert("success2")
    //   window.location.reload()
    //         `)  
    // response.write(`    
    //   alert("success2")
    //   amount.innerText=amount.innerText-1
    //       `) 
    //耦合，就是后端对前端页面的细节了解太清楚
    //需要解耦，直接调用函数

    //  response.write(`   
    //   xxx.call('undefined','success')    
    //   `)

    // response.write(`   
    // ${query.callbackName}.call('undefined','success')    
    // `)

    //返回一个对象{},{左边是左padding，}右边是右padding，中间是json
    //JSON+Padding=JSONP
      response.write(`   
      ${query.callback}.call('undefined',{  
        "success":true,
        "left":${newAmount}
        })    
      `)
    response.end()
     
  }else{
    response.statusCode = 404
    response.setHeader('Content-Type', 'text/html;charset=utf-8')
    response.write('呜呜呜')
    response.end()
  }

  /******** 代码结束，下面不要看 ************/
  console.log(method+''+request.url)
})

server.listen(port)
console.log('监听 ' + port + ' 成功\n请用在空中转体720度然后用电饭煲打开 http://localhost:' + port)


