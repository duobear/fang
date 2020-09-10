!function(){
    // var model={
    //     init:function () {
    //         AV.init({
    //             appId: "zc9VXE4qX92iVzjSCWD5TTKG-gzGzoHsz",
    //             appKey: "jDzk7zz4iDbAQ63IyhOfSdxG",
               
    //           });
            
    //     },
    //     fetch:function(){
    //         var query=new AV.Query('Message');
    //         return query.find()

    //     },
    //     save:function (name,content) {
    //         var Message=AV.Object.extend('Message');
    //         var message=new Message();
    //         return message.save({
    //             'name':name,
    //             'content':content,
    //         })
            
    //     },
    // }
    var model=Model({resourceName:'Message'})
    // var view=document.querySelector('section.message')
    var view=window.View('section.message')
    var control=window.Control({
        messageList:null,
        form:null,
        init:function(view,control){
            this.messageList=view.querySelector('#messageList')
            this.form=view.querySelector('#postMessageForm')           
            this.loadMessages()
        },        
        loadMessages:function () {
            this.model.fetch()            
                 .then(  
                     (messages)=>{         
                         let array=messages.map((item)=>item.attributes)
                         console.log(array)
                         array.forEach((item) => {
                             let li=document.createElement('li')
                             // li.innerHTML=item.content
                             li.innerHTML=`${item.name}:${item.content}`                          
                             this.messageList.appendChild(li)
                         })        
                 
                     }
                 )
         },

         bindEvents:function () {                     
            this.form.addEventListener('submit',(e)=>{
                e.preventDefault()
                this.saveMessage()
               
            })
        },
        saveMessage:function () {
            let myForm=this.form  
            let content=myForm.querySelector('input[name=content]').value 
                let name=myForm.querySelector('input[name=name]').value 
                // this.model.save(name,content)
                this.model.save({'name':name,'content':content})
                    .then(function(object){    
                    // window.localtion.reload()
                    let li=document.createElement('li')      
                    li.innerHTML=`${object.attributes.name}:${object.attributes.content}`
                    let messageList=document.querySelector('#messageList')
                    messageList.appendChild(li)
                    console.log(object)     
                    myForm.querySelector('input[name=content]').value =''
                    myForm.querySelector('input[name=content]').value =''
                }) 
        },


    }) 
    control.init(view,model)


}.call()