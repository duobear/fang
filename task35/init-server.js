var http = require('http')
var fs = require('fs')
var url = require('url')
var port = process.argv[2]

if(!port){
  console.log('请指定端口号好不啦？\nnode server.js 8888 这样不会吗？')
  process.exit(1)
}

var server = http.createServer(function(request, response){
  var parsedUrl = url.parse(request.url, true)
  var path = request.url 
  var query = ''
  if(path.indexOf('?') >= 0){ query = path.substring(path.indexOf('?')) }
  var pathNoQuery = parsedUrl.pathname 
  var method = request.method

  /******** 从这里开始看，上面不要看 ************/
  console.log('***********************')
// console.log('方方说：得到HTTP路径\n'+path)
// console.log('方法说：查询字符串为\n'+query)
// console.log('方法说：不含查询字符串的路径为\n'+pathNoQuery)
console.log('parseUrl='+parsedUrl)
console.log('path='+path)
console.log('query='+query)
console.log('pathNoQuery='+pathNoQuery)
console.log('method='+method)

// http://localhost:8888/zqf.com?a=1&b=2 在服务器控制台输出的结果，开启服务器用node命令，node init-server.js 8888
// parseUrl=[object Object]
// path=/zqf.com?a=1&b=2&c=3
// query=?a=1&b=2&c=3
// pathNoQuery=/zqf.com
// method=GET


response.write('Hi\n')
response.end()

  /******** 代码结束，下面不要看 ************/
})

server.listen(port)
console.log('监听 ' + port + ' 成功\n请用在空中转体720度然后用电饭煲打开 http://localhost:' + port)
