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
                {{ item.createtime }}
              </div>
            </div>
            <div class="item-content" flex="dir:left">
              <div class="item-content-left">
                <div class="statue" flex="main:center" v-if="item.dealstatus == 0">
                  <span>未<br />结<br />案</span>
                </div>
                <div
                  class="statue yichuli"
                  flex="main:center"
                  v-if="item.dealstatus == 1"
                >
                  <span>已<br />结<br />案</span>
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
      list: []
    };
  },
  mounted() {
    this.getList();
  },
  computed: {
    optionCode() {
      return this.$store.state.optionCode;
    },
    userId() {
      return this.$store.state.userId;
    }
  },
  methods: {
    getList() {
      this.axios.post('/bigscreen/getList', this.qs.stringify({
        userId: this.userId,
        placecode: this.optionCode,
        top: 1000
      })).then(function (response){
        if (response.data.code !== 0) {
          console.log(response)
        } else {
          this.list = [];
          response.data.result.forEach(item => {
            let temp = {
              "pic_url": SCREEN_CONFIG.filePath + item.urls,
              "carNumber": item.carnum,
              "createtime": item.createtime,
              "big_type": item.maintype,
              "small_type": item.subtype,
              "description": item.eventdesc.length>36?item.eventdesc.substring(0,36) + '...':item.eventdesc,
              "dealstatus": item.dealstatus
            }
            this.list.push(temp);
          })
          console.log('getList222222', this.list);
        }
      }.bind(this))
        .catch(function (error){
          console.log(error)
        }.bind(this));
    }
  }
};
</script>

<style lang="scss" scoped>
@import "building";
</style>
