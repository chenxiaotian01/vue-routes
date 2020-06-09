<template>
  <div class="swiper-container" ref="swiper">
    <div class="swiper-wrapper">
      <div class="swiper-slide" :key="item.id" v-for="item in carouselList">
        <img :src="item.imgUrl" />
      </div>
    </div>
    <!-- 分页器 -->
    <div class="swiper-pagination"></div>
    <!-- 导航按钮 -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  </div>
</template>

<script>
import Swiper from "swiper";
export default {
  name:'Carousel',
    // 声明接受属性数据
  props: {
    carouselList: Array,
    autoplay: Boolean
  },
//   监视
  watch: {
    // carouselList(value) {
    //   this.$nextTick(() => {
    //     this.initSwiper();
    //   });
    // }

    carouselList:{
      handler(value){
        if(this.carouselList.length===0) return
        console.log('carouselList---',value)
        this.$nextTick(() =>{
          this.initSwiper()
        })
      }
    }
  },
  mounted() {
    console.log('++++',this.carouselList.length)
    if(this.carouselList.length>0){
      this.initSwiper()
    }
  },
  methods: {
    //   初始化创建swiper对象
      initSwiper(){
          new Swiper(this.$refs.swiper,{
            //   循环模式选项
              loop:true,
            //   是否自动轮播
              autoplay:this.autoplay,
            //   分页器
              pagination:{
                  el:'.swiper-pagination',
              },
            //   前进后退按钮
              navigation:{
                  nextEl:'.swiper-button-next',
                  prevEl:'.swiper-button-prev',
              }
          })
      }
  },
};
</script>