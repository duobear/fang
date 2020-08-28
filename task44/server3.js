var http = require('http')
var fs = require('fs')
var url = require('url')
const { format } = require('path')
const { sign } = require('crypto')
var port = process.argv[2]

if(!port){
  console.log('请指定端口号好不啦？\nnode server.js 8888 这样不会吗？')
  process.exit(1)
}

var server = http.createServer(function(request, response){
  var parsedUrl = url.parse(request.url, true)
  var pathWithQuery = request.url 
  var queryString = ''
  if(pathWithQuery.indexOf('?') >= 0){ queryString = pathWithQuery.substring(pathWithQuery.indexOf('?')) }
  var path = parsedUrl.pathname
  var query = parsedUrl.query
  var method = request.method

  /******** 从这里开始看，上面不要看 ************/
 
  console.log('方方说：含查询字符串的路径\n' + pathWithQuery)
 
  if(path === '/'){    
    let string=fs.readFileSync('./index.html','utf-8')//页面文本

    let cookies=request.headers.cookie.split(';')
    let hash={}
   for(let i=0;i<cookies.length;i++){
     let parts=cookies[i].split('=')
     let key=parts[0]
     let value=parts[1]
     hash[key]=value
   }
   let email=hash.sign_in_email
   var users=fs.readFileSync('./db/users','utf8')
   users=JSON.parse(users)
  
    let foundUser
      for(let i=0;i<users.length;i++){
       
        if(users[i].email===email){
          foundUser=users[i]
          break;
        }
      }
      if(foundUser){
        string=string.replace('__password__',foundUser.password)
      }else{
       string= string.replace('__password__','不知道')
      }



    try {
      users=JSON.parse(users)
    } catch (error) {
      users=[]
    }
   


    response.statusCode=200
    response.setHeader('Content-Type', 'text/html;charset=utf-8')
    response.write(string)
    response.end()    
  }else if(path==='/sign_up'&&method==='GET'){
    let string=fs.readFileSync('./sign_up.html','utf-8')
    response.statusCode=200
    response.setHeader('Content-Type', 'text/html;charset=utf-8')
    response.write(string)
    response.end()
    
  }else if(path==='/sign_up'&&method==='POST'){//得到post上来的form post data
    readBody(request).then((body)=>{
      console.log(body)
      let strings= body.split('&')//['email=1,'password=2','password_confirmation=3']
      let hash={}
      strings.forEach(string => {
        let parts=string.split('=')//['email,1]
        let key=parts[0]
        let value=parts[1]
        hash[key]=decodeURIComponent(value)
      }); 
        
  // // let email=hash['email']
      let {email,password,password_confirmation}=hash
   
      if(email.indexOf('@')===-1){
        response.statusCode=400
        response.setHeader('Content-Type','application/json; charset=utf-8')
        response.write(`
        {
          "errors":{
            "email":"invalid"
          }
        }
        `)

      }else if(password!==password_confirmation){
        response.statusCode=400
        response.write('password not match')
      }else{
        var users=fs.readFileSync('./db/users','utf8')
        try {
          users=JSON.parse(users)
        } catch (error) {
          users=[]
        }
        let inUse=false
        for(let i=0;i<users.length;i++){
          let user=users[i]
          if(user.email===email){
            inUse=true
            break;
          }
        }
        if(inUse){
          response.statusCode=400
          response.write('email in use')
        }else{
          users.push({email:email,password:password})
          var usersString=JSON.stringify(users)
          fs.writeFileSync('./db/users',usersString)
          response.statusCode=200
        }
       
      }    
      response.end()
    })  
     
    
  }else if(path==='/sign_in'&&method==='GET'){
    let string=fs.readFileSync('./sign_in.html','utf-8')
    response.statusCode=200
    response.setHeader('Content-Type', 'text/html;charset=utf-8')
    response.write(string)
    response.end()     
  }else if(path==='/sign_in'&&method==='POST'){
    
    readBody(request).then((body)=>{
      console.log(body)
      let strings= body.split('&')//['email=1,'password=2','password_confirmation=3']
      let hash={}
      strings.forEach(string => {
        let parts=string.split('=')//['email,1]
        let key=parts[0]
        let value=parts[1]
        hash[key]=decodeURIComponent(value)
      });  
      let {email,password}=hash   
       console.log(email)
       console.log(password)  
       
       var users=fs.readFileSync('./db/users','utf8')
       try {
         users=JSON.parse(users)
       } catch (error) {
         users=[]
       }
       let found=false
       for(let i=0;i<users.length;i++){       
        if(users[i].email===email&&users[i].password===password){
          found=true
          break;
        }
      }

      if(found){
        //set-cookie
        response.setHeader('Set-Cookie',`sign_in_email=${email}`)
        // response.setHeader('Set-Cookie',`sign_in_email=${email};HttpOnly`)
        response.statusCode=200
      }else{
        response.statusCode=401
      }

      response.end()
    })  




  }else if(path==='/xxx'){
    response.statusCode=200
    response.setHeader('Content-Type','text/xml; charset=utf-8')
    //前端请求其他的网站，对应网站服务器同意
    response.setHeader('Access-Control-Allow-Origin','http://frank.com:8001')
    //json格式返回
    response.write(`   
      {
        "note":{
          "to":"小姑",
          "frome":"ff",
          "heading":"dzh",
          "content":"hi"
        }
      }
    `)
    response.end()
  }else{
    response.statusCode = 404
    response.setHeader('Content-Type', 'text/html;charset=utf-8')
    response.write(`
    {
      "error":"NOT FOUND"
    }`)
    response.end()
  }

  /******** 代码结束，下面不要看 ************/
})

function readBody(request){
  return new Promise((resolve,reject)=>{
    let body=[]   //请求体
    request.on('data',(chunk)=>{
      body.push(chunk)
    }).on('end',()=>{
      body=Buffer.concat(body).toString();     
      resolve(body)
    });   
  })
}

server.listen(port)
console.log('监听 ' + port + ' 成功\n请用在空中转体720度然后用电饭煲打开 http://localhost:' + port)


