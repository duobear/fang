AV.init({
    appId: "zc9VXE4qX92iVzjSCWD5TTKG-gzGzoHsz",
    appKey: "jDzk7zz4iDbAQ63IyhOfSdxG",
   
  });

var query=new AV.Query('Message');
query.find().then(
        function(message){         
            let array=message.map((item)=>item.attributes)
            console.log(array)
            array.forEach((item) => {
                let li=document.createElement('li')
                // li.innerHTML=item.content
                li.innerHTML=`${item.name}:${item.content}`
                let messageList=document.querySelector('#messageList')
                messageList.appendChild(li)
            })        
    
        }
    )


// var query =new AV.Query('Message')
// query.find().then(function(todo){
//     //成功获得实力，todo就是id为xxxxx的Message对象的实例
//     console.log(todo)
//     console.log(todo[0].attributes)
//     console.log(todo[1].attributes)
//     let array=todo.map((item)=>item.attributes)
//     console.log(array)
//     array.forEach((item) => {
//         let li=document.createElement('li')
//         li.innerHTML=item.content
//         let messageList=document.querySelector('#messageList')
//         messageList.appendChild(li)
//     })
    

// },function(error){

// })

let myForm=document.querySelector('#postMessageForm')
myForm.addEventListener('submit',function(e){
    e.preventDefault()
    let content=myForm.querySelector('input[name=content]').value 
    let name=myForm.querySelector('input[name=name]').value 
    var Message=AV.Object.extend('Message');
    var message=new Message();
    message.save({
        'name':name,
        'content':content,
    }).then(function(object){
        //alert('leancloud rocks11!!!')
        // window.localtion.reload()
        let li=document.createElement('li')      
        li.innerHTML=`${object.attributes.name}:${object.attributes.content}`
        let messageList=document.querySelector('#messageList')
        messageList.appendChild(li)
        console.log(object)
       // alert('leancloud rocks222!!!')
        myForm.querySelector('input[name=content]').value =''
        myForm.querySelector('input[name=content]').value =''
    })

})





// var TestObject = AV.Object.extend('TestObject');
// var testObject = new TestObject();
// testObject.save({
//     words:'hello wored',
//     aaa:'cccc',
   
// }).then(function(object){
//     alert('leancloud rocks!aaa!!')
// })



