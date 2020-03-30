<template>
  <div class="wisdomThings" flex>
    <div class="wisdomThings-left">
      <wisdom-map></wisdom-map>
      <water-level></water-level>
    </div>
    <div class="wisdomThings-right">
      <wisdom-number></wisdom-number>
      <div flex>
        <wisdom-cover></wisdom-cover>
        <wisdom-bin></wisdom-bin>
      </div>
      <wisdom-lamp></wisdom-lamp>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import WisdomMap from "components/wisdomThings/wisdomMap/wisdomMap";
import WisdomBin from "components/wisdomThings/wisdomBin/wisdomBin";
import WisdomCover from "components/wisdomThings/wisdomCover/wisdomCover";
import WaterLevel from "components/wisdomThings/waterLevel/waterLevel";
import WisdomLamp from "components/wisdomThings/wisdomLamp/wisdomLamp";
import WisdomNumber from "components/wisdomThings/wisdomNumber/wisdomNumber";

export default {
  name: "wisdomThings",
  components: {
    WisdomMap,
    WisdomBin,
    WisdomCover,
    WaterLevel,
    WisdomLamp,
    WisdomNumber
  },
  data() {
    return {};
  },
  methods: {
    Mapclick(payload) {
      console.log(payload);
    }
  }
};
</script>

<style scoped lang="scss">
.wisdomThings {
  height: 100%;
}
.wisdomThings-left {
  height: 100%;
  width: 921px;
  margin-right: 20px;
}
.wisdomThings-right {
  height: 100%;
  width: 920px;
}
</style>
