<template>
  <div class="shiRongShiMao" flex="dir:top">
    <div class="shiRongShiMao_top" flex="dir:left main:justify">
      <div class="title_icon"></div>
      <div class="shiRongShiMao_top-right">
        <div class="shiRongShiMao_top-right-header">巡查统计</div>
        <div class="shiRongShiMao_top-right-body"></div>
      </div>
    </div>
    <div class="shiRongShiMao_bottom">
      <div class="shiRongShiMao_bottom-header" flex="dir:left main:justify">
        <span>重点监管</span>
        <div class="navChartChange">
          <el-tabs v-model="activeName" @tab-click="">
            <el-tab-pane label="问题最多" name="问题最多"></el-tab-pane>
            <el-tab-pane label="整改率最低" name="整改率最低"></el-tab-pane>
          </el-tabs>
        </div>
      </div>
      <div class="shiRongShiMao_bottom-body">
        <top-item v-for="(item, index) in topData" :key="index" :topData="item" :index="index"></top-item>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
  import TopItem from './topItem'
  export default {
    name: 'shiRongShiMao',
    components:{
      TopItem
    },
    data(){
      return {
        activeName: '问题最多',
        topData: [{},{},{}]
      }
    }
  }
</script>
<style lang="scss" scoped>
@import "shiRongShiMao";
</style>

