<template>
  <div class="lamp">
    <div class="header">
      路灯
      <!-- <span class="right-open">
        <img src="./img/icon_open.png" alt />
      </span> -->
    </div>
    <div class="body">
      <div class="lamp-info">
        <div class="lamp-number">
          综合灯盏:
          <span>8</span>
        </div>
      </div>
      <ul class="lamp-list" flex>
        <li class="lamp-li" v-for="(lamp,index) in lampList" :key="index">
          <div class="lamp-icon">
            <img :src=" lamp.img " alt />
          </div>
          <div class="lamp-name">{{lamp.name}}</div>
        </li>
        <!-- <li class="lamp-li">
          <div class="lamp-icon">
            <img src="./img/lamp_off.png" alt />
          </div>
          <div class="lamp-name">LD456123</div>
        </li>-->
      </ul>
    </div>
  </div>
</template>

<script>
import lampOn from "./img/lamp_on.png";
import lampOff from "./img/lamp_off.png";
export default {
  name: "lamp",
  data() {
    return {
      lampList: [
        {
          name: "LD456121",
          state: "on",
          img: lampOn
        },
        {
          name: "LD456122",
          state: "on",
          img: lampOn
        },
        {
          name: "LD456123",
          state: "on",
          img: lampOn
        },
        {
          name: "LD456124",
          state: "on",
          img: lampOn
        },
        {
          name: "LD456125",
          state: "on",
          img: lampOn
        },
        {
          name: "LD456126",
          state: "on",
          img: lampOn
        },
        {
          name: "LD456127",
          state: "on",
          img: lampOn
        },
        {
          name: "LD456128",
          state: "on",
          img: lampOn
        }
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
.lamp {
  margin-top: 30px;
}
.header {
  height: 45px;
  background: url("./img/title.png");
  width: 180px;
  font-size: 24px;
  color: white;
  text-align: center;
  line-height: 45px;
  margin-bottom: 12px;
  font-weight: 600;
  position: relative;
  .right-open {
    position: absolute;
    right: -738px;
    cursor: pointer;
  }
}
.body {
  width: 920px;
  height: 283px;
  background: url("./img/big_back.png") no-repeat;
  padding: 10px 2px;
  // background-size: contain;
}

.lamp-number {
  height: 50px;
  background: rgba(10, 23, 52, 0.7);
  line-height: 50px;
  color: white;
  padding: 0 0 0 20px;
  margin-bottom: 28px;
}

.lamp-number {
  span {
    color: #f7c61d;
    font-size: 20px;
  }
}

.lamp-list {
  padding-left: 20px;
}

.lamp-li {
  width: 98px;
  height: 178px;
  background: #10134f;
  border: 1px solid #1c399d;
  margin-right: 15px;
  .lamp-icon {
    height: 140px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .lamp-name {
    color: white;
    height: 35px;
    line-height: 35px;
    text-align: center;
    background: #0d1541;
  }
}
</style>
