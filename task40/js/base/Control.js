/*
Control({
    init:(view,control){
        this.xxx()
        this.yyy()
    },
    xxx(){}
    yyy(){}
})

*/ 

window.Control=function(options){
    //options,有四个属性，init，load，bind，save
    var init =options.init //前面31~34的mess.js，单独记下啦
 
    let object={     
            view:null,
            model:null,
            init:function(view,model){
              this.view=view
              this.model=model
              this.model.init()   
              init.call(this,view,model)
              options.bindEvents.call(this)
            },

    }

    for(let key in options){
        if(key!=='init'){ 
            object[key]=options[key]
        }
           
    }
    return object
}