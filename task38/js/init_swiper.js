// !function(){

// var mySwiper = new Swiper('.swiper-container', {
//   loop: true, // 循环模式选项
//   // 如果需要分页器
//   pagination: {
//     el: '.swiper-pagination',
//   },
//   // 如果需要前进后退按钮
//   navigation: {
//     nextEl: '.swiper-button-next',
//     prevEl: '.swiper-button-prev',
//   },
// })
// }.call()


// !function(){
//   var view=document.querySelector('#mySlides')
//   var controller=function(view){

//     var mySwiper = new Swiper(view.querySelector('.swiper-container'), {
//       loop: true, // 循环模式选项
//       // 如果需要分页器
//       pagination: {
//         el: '.swiper-pagination',
//       },
//       // 如果需要前进后退按钮
//       navigation: {
//         nextEl: '.swiper-button-next',
//         prevEl: '.swiper-button-prev',
//       },
//     })

//   }
//   controller(view)

//   }.call()


!function(){
  var view=document.querySelector('#mySlides')
  var controller={
    view:null,
    swiper:null,
    swiperOptions:{
      loop: true, // 循环模式选项
      // 如果需要分页器
      pagination: {
        el: '.swiper-pagination',
      },
    
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      }
    },
    init:function(view){
      this.view=view
      this.initSwiper()
    },
    initSwiper:function(){
      this.swiper=new Swiper(
        view.querySelector('.swiper-container'),
        this.swiperOptions
      )
    }
  }

  controller.init(view)

  }.call()