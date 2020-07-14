<template>
  <div class="equipment">
    <div class="header"></div>
    <div class="box">
      <ul class="equipment-list" flex="dir:left cross:center main:justify">
        <li class="equipment-li" v-for="(item,index) in equipments" :key="index">
          <div class="equipment-icon">
            <span class="iconfont" :class="item.icon"></span>
          </div>
          <div class="equipment-number">
            <p>正常：{{item.normal}}</p>
            <p>总数：{{item.total}}</p>
          </div>
          <div class="equipment-name">{{item.name}}</div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "equipmentList",
  data() {
    return {
      equipments: [
        {
          name: "视频监控",
          icon: "icon-shexiangtou",
          total: 60,
          normal: 60,
          deviceType: "sp"
        },
        {
          name: "高空瞭望",
          icon: "icon-wangyuanj",
          total: 4,
          normal: 4,
          deviceType: "gklw"
        },
        {
          name: "执法车辆",
          icon: "icon-che",
          total: 12,
          normal: 12
        },
        {
          name: "单兵",
          icon: "icon-shouchidanbing",
          total: 32,
          normal: 32,
          deviceType: "db"
        },
        {
          name: "移动终端",
          icon: "icon-yidongzhongduan",
          total: 164,
          normal: 160,
          deviceType: "mobile"
        },
        {
          name: "车载一体机",
          icon: "icon-shebei1",
          total: 20,
          normal: 16,
          deviceType: "cz"
        }
        // ,
        // {
        //   name: "智能路灯",
        //   icon: "icon-ludeng",
        //   total: 0,
        //   normal: 0
        // },
        // {
        //   name: "消防栓",
        //   icon: "icon-xiaofangshuan",
        //   total: 94,
        //   normal: 68,
        //   deviceType: "fire"
        // },
        // {
        //   name: "智能窨井盖",
        //   icon: "icon-manhole-cover",
        //   total: 54,
        //   normal: 50,
        //   deviceType: "3"
        // },
        // {
        //   name: "水位监测",
        //   icon: "icon-shuiweijiance",
        //   total: 60,
        //   normal: 58,
        //   deviceType: "8"
        // },
        // {
        //   name: "智能垃圾箱",
        //   icon: "icon-shanchulaji",
        //   total: 30,
        //   normal: 28,
        //   deviceType: "7"
        // },
        // {
        //   name: "公共自行车",
        //   icon: "icon-sgongxiangdanche",
        //   total: 30,
        //   normal: 10,
        //   deviceType: "bike"
        // }
      ]
    };
  },
  mounted() {
    this.getNumber();
  },
  methods: {
    getNumber() {
      this.axios.get("/iot/device/state").then(response => {
        let data = response.data.result.list;
        console.log("data1", data);
        let vmData = this.equipments;
        for (let i = 0; i < data.length; i++) {
          for (let j = 0; j < vmData.length; j++) {
            if (data[i].deviceType == vmData[j].deviceType) {
              vmData[j].total = data[i].deviceCount;
              vmData[j].normal = data[i].normalCount;
            }
          }
        }
        this.equipments = vmData;
      });
    }
  }
};
</script>

<style lang="scss" scoped>
@import "equipment";
</style>
