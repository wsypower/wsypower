<template>
  <div class="intelligentAnalytics" flex>
    <div class="intelligentAnalytics_left" flex="dir:top">
      <quota></quota>
      <alarm-sort></alarm-sort>
      <realtime-alarm></realtime-alarm>
    </div>
    <div flex="dir:top">
      <equipment-num></equipment-num>
      <equipment-online></equipment-online>
    </div>
    <!-- <files-list></files-list> -->
    <div class="intelligentAnalytics_right">
      <equipment-list></equipment-list>
      <illegal-building></illegal-building>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import Quota from "../../components/intelligntAnalytics/quota/quota";
import AlarmSort from "../../components/intelligntAnalytics/alarmSort/alarmSort";
import RealtimeAlarm from "../../components/intelligntAnalytics/realtimeAlarm/realtimeAlarm";
import EquipmentNum from "../../components/intelligntAnalytics/equipmentNum/equipmentNum";
import EquipmentOnline from "../../components/intelligntAnalytics/equipmentOnline/equipmentOnline";
import EquipmentList from "../../components/intelligntAnalytics/equipmentList/equipmentList";
import IllegalBuilding from "../../components/intelligntAnalytics/illegalBuilding/illegalBuilding";

export default {
  name: "intelligentAnalytics",
  components: {
    Quota,
    AlarmSort,
    RealtimeAlarm,
    EquipmentNum,
    EquipmentOnline,
    EquipmentList,
    IllegalBuilding
  }
};
</script>

<style scoped lang="scss">
.intelligentAnalytics {
  height: 100%;
  width: 100%;
}
</style>
