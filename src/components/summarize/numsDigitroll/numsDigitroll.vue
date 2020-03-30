<template>
  <div class="numsDigitroll">
    <DigitRoll ref="digitroll" :rollDigits="digits" :flipStra="true" />
  </div>
</template>

<script type="text/ecmascript-6">
import DigitRoll from '@huoyu/vue-digitroll';

export default {
  components: {DigitRoll},
  name: "numsDigitroll",
  props: {
    //数字
    digits: {
      type: String,
      default: "00000",
    },
  },
  data() {
    return {

    }
  },
  methods: {

  },
}
</script>

<style scoped lang="scss">
@import "numsDigitroll";
</style>
<style lang="scss">
.d-roll-wrapper {
  margin: 0 !important;
  width: 100%;
  height: 100%;

  .d-roll-list {
    margin: 0;
    height: 100%;

    .d-roll-item {
      height: 100% !important;
    }
  }
}

.d-roll-item > .d-roll-bar > div {
  line-height: 34px !important;
  text-align: center !important;
  padding-left: 7px;
  box-sizing: border-box !important;
}
</style>
