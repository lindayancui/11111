$(function () {
  var screenWidth = $(window).width();
  var mobileWidth = 640;
  var carousel = $('.banner');
  var items = $('.item',carousel);
  // 这个写法是从carousel下面去找img元素
  var img = $('img',carousel);

 $(window).on('resize',function () {
   screenWidth = $(window).width();
   var isMobile = screenWidth < mobileWidth;
   if(isMobile){
     img.each(function (index,el) {
       var _el = $(el);
       var src = _el.data('msrc');
        _el.attr('src',src);
     })
     img.css({
       'width':'100%',
       'height':'auto',
       'position':'static',
       'transform':'none'
     })
     items.css('height','auto')
   }else{
     img.each(function (index,el) {
       var _el = $(el);
       var src = _el.data('psrc');
       _el.attr('src',src)
     })
     img.css({
       'width':'auto',
       'height':410,
       'position':'absolute',
       'transform':'tranalate(-50%)'
     })
     items.css('height',410)
   }
 }).trigger('resize')
 // 动态计算推荐ul的宽度
    var ul = $('.scroll-wrap ul');
    var lis = $('li',ul);
    var sum = 0;
    lis.each(function(index,el){
      var _el = $(el);
      sum += _el.width();
    })

    ul.width(sum);


    // 在手机端控制手指滑动轮播图
    var bsCarousel = $('.carousel');
    var startX = 0;
    bsCarousel.on('touchstart',function(e){

      // console.log(e);
      // 在JQ里面，针对event事件做了一层包装，所以需要获得原生event事件对象
      // 需要通过originalEvent得到

      startX = e.originalEvent.changedTouches[0].clientX;

    })
    bsCarousel.on('touchend',function(e){
      
      var dx = e.originalEvent.changedTouches[0].clientX - startX;

      if(Math.abs(dx) > screenWidth/3){

        if(dx > 0){
          // 上一张
          bsCarousel.carousel('prev');
        }else{
          // 下一张
          bsCarousel.carousel('next');
        }

      }


    })
});