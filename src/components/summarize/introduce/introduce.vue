<template>
  <div class="introduce" flex>
    <div class="introduce_item">
      <div class="introduce_item_pic" flex="cross:center main:center">
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
    <div class="introduce_item introduce_item-back" flex>
      <div
        class="introduce_item_area"
        flex="cross:center main:center"
        v-for="item in area"
        :class="{ navactve: item.code == optionCode }"
        @click="areaClick(item.value, item.code)"
      >
        {{ item.value }}
      </div>
    </div>
    <div class="introduce_item">
      <div class="introduce_item_hierarchy_num" flex="cross:center main:right">
        <countTo
          :startVal="people.startVal"
          :endVal="people.endVal"
          :duration="people.grand"
          :decimals="people.decimals"
        ></countTo>
      </div>
      <div class="introduce_item_hierarchy_num" flex="cross:center main:right">
        <countTo
          :startVal="cityarea.startVal"
          :endVal="cityarea.endVal"
          :duration="cityarea.grand"
          :decimals="cityarea.decimals"
        ></countTo>
      </div>
      <div class="introduce_item_hierarchy_num" flex="cross:center main:right">
        <countTo
          :startVal="landarea.startVal"
          :endVal="landarea.endVal"
          :duration="landarea.grand"
          :decimals="landarea.decimals"
        ></countTo>
      </div>
      <div class="introduce_item_hierarchy_num" flex="cross:center main:right">
        <countTo
          :startVal="seaarea.startVal"
          :endVal="seaarea.endVal"
          :duration="seaarea.grand"
          :decimals="seaarea.decimals"
        ></countTo>
      </div>
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
            imgsrc: require('./img/jieshao-one.png')
          },
          {
            imgsrc: require('./img/jieshao-two.png')
          },
          {
            imgsrc: require('./img/jieshao-three.png')
          },
        ],
        listData: [
          {
            title: "岱山位于舟山群岛新区中部，是全国12个海岛县之一，由379个岛屿组成（其中住人岛屿29个），素有“蓬莱仙岛”“海上千岛湖”之美誉。区域总面积5242平方公里，其中陆域面积326.5平方公里，是一个陆域小县，海洋大县。岱山本岛面积119.3平方公里，为舟山第二大岛。全县辖6镇1乡，10个城镇社区、74个社区村，户籍人口18.2万人、流动人口6万人。县政府所在地高亭镇。"
          },
          {
            title: '岱山县由岱山、衢山、大小长涂山、秀山、大鱼山等379个岛屿和256个海礁组成，县境广袤，岛屿众多。属北亚热带南缘海洋性季节风气候区，具有冬无严寒、夏无酷暑、四季分明、气候宜人的特点，是东海上一颗璀璨的明珠。1991年，由浙江省人民政府批准，正式列入省级风景名胜区。'
          },
          {
            title: "岱山历史悠久，据岛上出土文物考证，五千年前的新石器时代，岛上已有人类繁布于生息。有文字记载的也有二千多年的历史。"
          },
          {
            title: "岱山自然景色秀丽，海岛风光宜人，自古以来就被誉称“蓬莱仙岛”。相传秦赢政三十七年（公元前210年），秦始皇东巡江南，在县郧（今镇海沿海）东观沧海，望浩瀚东海中缥缈“青螺”，颇有仙山幻觉。九年后遣方士徐福率三千童男童女入海求三神山长生不老药。据《定海厅志》、《岱山镇志》考证，三神山即蓬莱、方丈、瀛州。其中蓬莱者，即现在岱山。"
          },{
            title: "岱山海域辽阔，各个岛屿海岸港湾蜿蜒曲折，以其海瀚、滩美、礁奇、山秀，显示出山海奇观的特色。尤其是岱山岛，岛海相连，水天一色，风光旖旎，气象万千。唐代大诗人李白，一生好游名山大川，在他的《莹禅师房观山海图》中，曾写了经过东海蓬莱时的印象：“蓬壶来轩窗，瀛海入几案。烟涛争喷薄，岛屿相凌乱”。明清时期，就形成了“蓬莱十景”，吸引了不少文人墨客、社会名流前来揽胜，并留下了许多赞美岱山奇丽风光的千古诗章。清诗人刘梦兰曾赋“蓬莱十景诗”流传至今。"
          },{
            title: "岱山县位于浙江省沿海北部，地处长江口南端，杭州湾外缘的舟山群岛中部，地理位置介于北纬30度07分－30度38分，东经121度31分－123度17分之间。岱山域境东西长169.60公里，南北宽57公里，总面积5242平方公里，其中海域面积4915.50平方公里，陆域面积326.50平方公里（含潮间带57.40平方公里），由404个岛屿组成，其中住人岛屿16个，岱山岛最大，陆地面积104.97平方公里。“黄金水道”之要冲。"
          },{
            title: "岱山东濒公海，西接平湖、慈溪海域，南临舟山岛，北与嵊泗县海域相连，背靠沪、杭、甬长三角都市区，扼据江海联运和长江。"
          },{
            title: "岱山属北亚热带南缘季风海洋性气候，夏无酷暑，冬无严寒，温暖湿润，四季分明，空气常年清新，全县森林覆盖率达42%，空气中的负氧离子浓度明显高于城市地区。"
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
