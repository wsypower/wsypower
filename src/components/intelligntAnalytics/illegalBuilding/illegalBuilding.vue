<template>
  <div class="building">
    <div class="header"></div>
    <div class="body">
      <my-scroll>
        <ul class="building-list">
          <li class="building-li" v-for="(item,index) in list" :key="index">
            <div class="item-header" flex="cross:center">
              <span class="iconfont icon-che"></span>
              <div class="item-title" flex="cross:center">{{ item.carNumber }}</div>
              <div class="item-timer" flex="cross:center">
                {{ $formatDate(parseInt(item.createtime)) }}
              </div>
            </div>
            <div class="item-content" flex="dir:left">
              <div class="item-content-left">
                <div class="statue" flex="main:center" v-if="item.dealstatus == 0">
                  <span>未<br />处<br />理</span>
                </div>
                <div
                  class="statue yichuli"
                  flex="main:center"
                  v-if="item.dealstatus == 1"
                >
                  <span>已<br />处<br />理</span>
                </div>
                <img :src="item.pic_url" alt />
              </div>
              <div class="info" flex="dir:top">
                <div><span class="title">分类:</span>【{{item.big_type}}】</div>
                <div>{{item.small_type}}</div>
                <div class="sep-line"></div>
                <div>
                  <span class="title">描述:&nbsp;</span>
                  <span>{{item.description}}</span>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </my-scroll>
    </div>
  </div>
</template>

<script>
export default {
  name: "illegalBuilding",
  data() {
    return {
      list: [
        {
          "pic_url": require('./img/3.jpg'),
          "carNumber": "浙L88888",
          "createtime": 1594709740823,
          "big_type": "市容环境",
          "small_type": "小类",
          "description": "描述",
          "dealstatus": 0
        },
        {
          "pic_url": require('./img/2.jpg'),
          "carNumber": "浙L88888",
          "createtime": 1594709740823,
          "big_type": "市容环境",
          "small_type": "小类",
          "description": "描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述描述",
          "dealstatus": 1
        },
        {
          "pic_url": require('./img/1.jpg'),
          "carNumber": "浙L88888",
          "createtime": 1594709740823,
          "big_type": "市容环境",
          "small_type": "小类",
          "description": "描述",
          "dealstatus": 0
        }
      ]
    };
  },
  mounted() {
    this.getList();
  },
  methods: {
    getList() {
      this.axios.post("/bigscreen/getCameraTopThree").then(response => {
        console.log(response);
        // if(response.data.result.length>0){
        //   this.list = response.data.result;
        // }
        this.list.map(item => {
          if(item.description.length>36){
            item.description = item.description.substring(0,36) + '...';
          }
        });
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "building";
</style>
