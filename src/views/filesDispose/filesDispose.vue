<template>
  <div class="filesDispose" flex="main:justify">
    <div class="filesDispose_left" flex="dir:top cross:center main:justify">
      <pie-chart></pie-chart>
      <bar-chart></bar-chart>
      <pie-title></pie-title>
    </div>
    <div flex="dir:top cross:center main:justify">
      <roll-num></roll-num>
      <abbr-chart></abbr-chart>
    </div>
    <files-list></files-list>
  </div>
</template>

<script type="text/ecmascript-6">
import FilesList from "../../components/filesDispose/filesList/filesList";
import RollNum from "../../components/filesDispose/rollNum/rollNum";
import PieChart from "../../components/filesDispose/pieChart/pieChart";
import AbbrChart from "../../components/filesDispose/abbrChart/abbrChart";
import BarChart from "../../components/filesDispose/barChart/barChart";
import PieTitle from "../../components/filesDispose/pieTitle/pieTitle";
export default {
    name: "filesDispose",
  components: {PieTitle, BarChart, AbbrChart, PieChart, RollNum, FilesList}
}
</script>

<style scoped lang="scss">
@import "filesDispose";
</style>
