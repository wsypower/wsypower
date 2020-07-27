<template>
  <div class="introduce" flex>
    <div class="introduce_item">
      <div class="introduce_item-header" flex="dir:left cross:center">辖区介绍</div>
      <div class="introduce_item_pic">
        <div class="introduce_item_pic_wrap">
          <el-carousel height="150px">
            <el-carousel-item
              v-for="item in exhibition.imgs"
              :key="item.imgsrc"
            >
              <img :src="item.imgsrc" />
            </el-carousel-item>
          </el-carousel>
        </div>
      </div>
    </div>
    <div class="introduce_item introduce_item-bc introduce__item_infinite">
      <div class="seamless-warp-point"></div>
      <vue-seamless-scroll
        :data="exhibition.listData"
        :class-option="optionHover"
        class="seamless-warp"
      >
        <ul class="item">
          <li class="item-point" v-for="item in exhibition.listData">
            <i></i>
            <span class="title" v-text="item.title"></span>
          </li>
        </ul>
      </vue-seamless-scroll>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import countTo from 'vue-count-to';
import {SHAOXIN, YUECHENGQU, KEQIAOQU, SHANGYUQU, XINCHANG, SHENGZHOU, ZHUJU} from './data';

export default {
  name: "introduce",
  components: {countTo},
  mounted() {
    //this.uplodData(this.$store.state.optionCode)
  },
  created() {

  },
  watch: {
    // optionCode: function (val) {
    //   this.uplodData(val)
    // },
  },
  computed: {
    optionCode() {
      return this.$store.state.optionCode;
    },
    optionHover() {
      return {
        step: 0.5,
        limitMoveNum: 4,
      }
    },

    area() {
      return [
        {
          value: '高亭镇',
          code: '330921001'
        },
        {
          value: '衢山镇',
          code: '330921106'
        },
        {
          value: '东沙镇',
          code: '330921101'
        },
        {
          value: '岱西镇',
          code: '330921103'
        },
        {
          value: '长涂镇',
          code: '330921105'
        },
        {
          value: '岱东镇',
          code: '330921102'
        },
        {
          value: '秀山乡',
          code: '330921200'
        }
      ]
    }
  },
  data() {
    return {
      people: {
        startVal: 0,
        endVal: 24.2,
        grand: 1000,
        decimals: 2
      },
      cityarea: {
        startVal: 0,
        endVal: 5242,
        grand: 1000,
        decimals: 2
      },
      landarea: {
        startVal: 0,
        endVal: 326.5,
        grand: 1000,
        decimals: 2
      },
      seaarea: {
        startVal: 0,
        endVal: 4915.5,
        grand: 1000,
        decimals: 2
      },
      exhibition: {
        imgs: [
          {
            imgsrc: require('./img/jieshao-one-1.jpg')
          },
          {
            imgsrc: require('./img/jieshao-two-1.jpg')
          },
          {
            imgsrc: require('./img/jieshao-three-1.jpg')
          },
        ],
        listData: [
          {
            title: "普陀区隶属浙江省舟山市，位于浙江省东北部，舟山群岛东南部，背靠沪、杭、甬等城市，隔海与基隆港、长崎港、仁川港相对。经纬度为北纬29°32'-30°28'，东经121°56'-123°14'。普陀区全区辖5镇4街道，区治沈家门街道。总面积6728平方千米，其中海域面积6269.4平方千米，陆地面积458.6平方千米，海岸线总长831.43千米。 截至2015年总人口321922人。"
          },
          {
            title: '普陀区属北亚热带南缘季风海洋型气候，常年温和湿润，冬暖夏凉，光照充足。自然资源丰富，渔业发达，港口优良。所辖沈家门渔港是世界三大群众性渔港之一。2019年10月，入选2019年度全国科技创新百强区。2019年11月，入选第二批节水型社会建设达标县（区）。'
          },
          {
            title: "普陀旅游资源十分丰富，以“海天佛国”普陀山、“沙雕故乡”朱家尖、“东方渔都”沈家门及“金庸笔下”桃花岛，构成独特的普陀“旅游金三角”。具有佛教文化、山海景观、渔村风情、海滨度假、海鲜美食等丰厚的旅游资源。其中自然景观以海、沙、山、石、洞、礁等为主，类型众多。沙滩资源得天独厚，沙滩面积占浙江省沙滩总面积的四分之一。"
          },
          {
            title: "各岛屿地质以花岗岩为主，经地壳运动和海水侵蚀，形成千姿百态的山石景观和海礁景观， 以普陀山的西天景区、南天门景区、朱家尖的白山景区、桃花岛的安期峰景区，以及东海前哨东极岛的东福山等最为著名。"
          },{
            title: "普陀的人文旅游资源也十分丰富，与自然景观融为一体，相得益影。普陀山为中国四大佛教名山之一，自唐代开创观音道场已愈千年之久，是国内外最大的观音菩萨供奉地，在我国沿海及东南亚一带久享盛名。"
          },{
            title: "朱家尖已打响“沙雕”品牌，被国际沙雕组织WSSA确认为世界上沙质和风景最好的沙滩之一。"
          },{
            title: "桃花岛据传是秦朝安期生隐居之地，更因武侠文学大师金庸先生名作《射雕英雄传》蜚声海内外，被蒙上“海上仙山”的神秘面纱。"
          },{
            title: "“十里渔港”沈家门与挪威卑尔根港、秘鲁的卡亚俄港，并称为世界三大渔港，也是全国最大的渔货集散地，亦以海鲜夜排档闻名遐迩。"
          }
        ]
      },

    }
  },
  methods: {
    uplodData(data) {
      const map = {
        '330602': YUECHENGQU,
        '330603': KEQIAOQU,
        '330604': SHANGYUQU,
        '330624': XINCHANG,
        '330683': SHENGZHOU,
        '330681': ZHUJU,
        '3306': SHAOXIN,
        'default': SHAOXIN
      }
      this.replica(map[data] ? map[data] : map['default'])
    },
    replica(area) {
      this.exhibition = area
      this.people.startVal = this.people.endVal
      this.people.endVal = area.people
      this.cityarea.startVal = this.cityarea.endVal
      this.cityarea.endVal = area.area
    },
    areaClick(val, code) {
      console.log(val)
      console.log(code)
      // if(code!=='330921001'){
      //
      // }
      // else{
        this.$store.commit('setOption', code)
      // }

    },
  },
}
</script>

<style scoped lang="scss">
@import "introduce";
</style>

<style lang="scss">
.introduce {
  .el-carousel {
    height: 100%;

    .el-carousel__container {
      height: 100% !important;
    }
  }

  .el-carousel__item h3 {
    color: #475669;
    font-size: 14px;
    opacity: 0.75;
    line-height: 150px;
    margin: 0;
  }

  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }

  .el-carousel__item:nth-child(2n + 1) {
    background-color: #d3dce6;
  }

  .el-carousel__indicators {
    .el-carousel__indicator {
      .el-carousel__button {
        height: 8px;
      }
    }

    .is-active {
      .el-carousel__button {
        background-color: #00c7fb;
      }
    }
  }

  .el-carousel__arrow {
    background-color: #00c7fb;
  }

  .el-carousel__container {
    img {
      width: 120%;
      height: 120%;
    }
  }
}
</style>
