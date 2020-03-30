<template>
  <div class="characteristic">
    <!--<vue-seamless-scroll :data="listData" :class-option="scrollOption">-->
      <!--<ul>-->
        <!--<li v-for="item in listData"-->
            <!--@click='itemClick'-->
        <!--&gt;-->
          <!--{{item.value}}-->
        <!--</li>-->
      <!--</ul>-->
    <!--</vue-seamless-scroll>-->
    <swiper :options="swiperOption">
      <swiper-slide class="item-slide">Slide 1</swiper-slide>
      <swiper-slide class="item-slide">Slide 2</swiper-slide>
      <swiper-slide class="item-slide">Slide 3</swiper-slide>
      <swiper-slide class="item-slide">Slide 4</swiper-slide>
      <swiper-slide class="item-slide">Slide 5</swiper-slide>
      <swiper-slide class="item-slide">Slide 6</swiper-slide>
      <swiper-slide class="item-slide">Slide 7</swiper-slide>
      <swiper-slide class="item-slide">Slide 8</swiper-slide>
      <swiper-slide class="item-slide">Slide 9</swiper-slide>
      <swiper-slide class="item-slide">Slide 10</swiper-slide>
    </swiper>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    name: "characteristic",
    computed: {
      //滚动条目
      // scrollOption() {
      //   return {
      //     limitMoveNum: 6,
      //     singleHeight: 170,
      //     step: 0.5,
      //     // autoPlay: false,
      //   }
      // }
    },
    data() {
      return {
        swiperOption: {
          slidesPerView: 6,
          spaceBetween: 20,
          direction: 'vertical',
          width:1861.99,
          height:866.99,
          loop: true,
          mousewheel: true,
          speed:4500,
          autoplay: {
            delay: 1,
            disableOnInteraction: false,
            // autoplayDisableOnInteraction:false,
          },
          scrollbar: {
            el: '.swiper-scrollbar',
            hide: true
          },
          pagination: {
            el: '.swiper-pagination',
            type: 'progressbar'
          },
        },

        listData: [
          {
            value: '1',
            id: '111',
          },
          {
            value: '2',
            id: '111',
          },
          {
            value: '3',
            id: '111',
          },
          {
            value: '4',
            id: '111',
          },
          {
            value: '5',
            id: '111',
          },
          {
            value: '6',
            id: '111',
          },
          // {
          //   value: '7',
          //   id: '111',
          // },
          // {
          //   value: '8',
          //   id: '111',
          // }, {
          //   value: '9',
          //   id: '111',
          // },
        ]
      }
    },
    methods: {
      itemClick() {
        this.scrollOption.autoPlay = !this.scrollOption.autoPlay
      }
    },
  }
</script>

<style scoped lang="scss">
  @import "characteristic";
</style>
<style  lang="scss">
  .characteristic{
    .swiper-wrapper{
      transition-timing-function:linear !important;
    }
  }
</style>
