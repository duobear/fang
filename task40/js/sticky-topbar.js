// !function(){

// window.addEventListener('scroll', function (xxx) {

//     if (window.scrollY > 0) {
//       topNavBar.classList.add("sticky")
//     } else {
//       topNavBar.classList.remove("sticky")
//     }
//   })
// }.call()




// !function(){
//   var view=document.querySelector('#topNavBar')

//   var controller=function(view){   
//       window.addEventListener('scroll', function (xxx) {
  
//         if (window.scrollY > 0) {
//           view.classList.add("sticky")
//         } else {
//           view.classList.remove("sticky")
//         }
//       })
//     }
//  controller.call(null,view)

//   }.call()



  
!function(){
 
  

  // var view=document.querySelector('#topNavBar')
  var view=window.View('#topNavBar')

  var controller={
    view:null,
    init:function(view){
      this.view=view
      this.bindEvents()
      //this.bindEvents.call(this)
    },
    bindEvents:function(){
      var view=this.view
      // window.addEventListener('scroll', function (xxx) {
  
      //   if (window.scrollY > 0) {
      //     this.active()
      //   } else {
      //    this.deactive()
      //   }
      // },bind(this))
      // //箭头函数没有this，内外this一样，不变


      window.addEventListener('scroll', (xxx)=> {  
        if (window.scrollY > 0) {
          this.active()
        } else {
         this.deactive()
        }
      })
    
    },  
    active:function(){
      view.classList.add("sticky")
    },
    deactive:function(){
      view.classList.remove("sticky")
    }
  }
controller.init(view)
//controller.init.call(controller,view) //对象调用的的时候，第一个参数就是对象本身
  }.call()