<template>
  <div class="intelligentAnalytics" flex="dir:left main:justify">
    <div class="intelligentAnalytics_left" flex="dir:top main:justify">
      <quota></quota>
      <alarm-sort></alarm-sort>
      <realtime-alarm></realtime-alarm>
    </div>
    <div class="intelligentAnalytics_center" flex="dir:top main:justify">
      <equipment-num></equipment-num>
      <equipment-online></equipment-online>
    </div>
    <div class="intelligentAnalytics_right" flex="dir:top main:justify">
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
  @import "intelligentAnalytics";
</style>
