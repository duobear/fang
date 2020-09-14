// vue 
fakeData()
function Model(options){
    this.data=options.data
    this.resource=options.resource
}
Model.prototype.fetch=function(id){
    return axios.get(`/${this.resource}s/${id}`).then((response)=>{
        this.data=response.data 
        return response 
    })
}

Model.prototype.update=function(data){
    let id=this.data.id
    return axios.put(`/${this.resource}s/${id}`,data).then((response)=>{
        this.data=response.data 
        return response 
    })
}

// function View(el,template){
//     this.el=el 
//     this.template.template
// }

// View.prototype.render=function(data){
//     let html=this.template
//     for(let key in data){
//         html=html.replace(`__${key}__`,data[key])
//     }
//     $(this.el).html(html)
// }
//------------------上面是MVC类，下面是对象
let model=new model({
    data:{
        name:'',
        number:0,
        id:''
    },
    resource:'book'
})

let view=new Vue({
    el:'#el',
    data:{
name:'xx',
number:0,
id:''
    },
    template:`
    <div>
        <div id="app">
            书名：《__name__》
            数量：<span id="number">__number__</span>
        </div>

        <div>
            <button id="addOne">加1</button>
            <button id="minusOne">减1</button>
            <button id="reset">归零</button>

        </div>  
    </div>
    `,
    created(){
        this.model.fetch(1).then(()=>{
            this=model.data
        })
    },
    methods:{
        addOne(){
            // var oldNumber=$('#number').text()//string 
            // var newNumber=oldNumber-0+1
    
            model.update({
                // number:newNumber
                number:this.number+1
            }).then(()=>{
                // view.render(model.data)
                this.view=this.model.data
            })       
        },
        minusOne(){
            // var oldNumber=$('#number').text()//string 
            // var newNumber=oldNumber-0-1
    
            model.update({
                number:this.number-1
            }).then(()=>{
                this.view=this.model.data
            }) 
        },
        reset(){
             model.update({
                number:0
            }).then(()=>{
                this.view=this.model.data
            }) 
        },
    }
    
})

var controller={
    init(options){
        let view=options.view
        let model=option.model
        this.view=view
        this.model=model

        // this.view.render(this.model.data)
        this.bindEvents()

        this.model.fetch(1).then(()=>{
            // this.view.render(this.model.data)
            this.view.name=this.model.data.name
            this.view.number=this.model.data.number
            this.view.id=this.model.data.id


        })
    },
   
    bindEvents(){       
        $(this.view.el).on('click','#addOne',this.addOne)
        $(this.view.el).on('click','#minusOne',this.minusOne)
        $(this.view.el).on('click','#reset',this.reset)
    }
}

controller.init({view:view,model:model})


/*不要看 */
function fakeData(){
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
}
