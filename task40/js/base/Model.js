/*
  var model=Model({resourceName:'表名'})

*/ 

window.Model=function(options){
    let resourceName=options.resourceName

    return{
        init:function () {
            AV.init({
                appId: "zc9VXE4qX92iVzjSCWD5TTKG-gzGzoHsz",
                appKey: "jDzk7zz4iDbAQ63IyhOfSdxG",               
              });
            
        },
        fetch:function(){
            // var query=new AV.Query('X');
            var query=new AV.Query(resourceName);
            return query.find()
    
        },
        save:function (object) {            
            // var Message=AV.Object.extend('X');
            
            // var message=new Message();
            // return message.save({
            //     'name':name            
            // })     

            var X=AV.Object.extend(resourceName);
            var x=new X();
            return x.save( object)
            
        },
    }
}