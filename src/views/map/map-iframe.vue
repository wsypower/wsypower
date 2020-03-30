<template>
  <div class="map-iframe">
    <iframe :src="url" width="100%" height="100%" frameborder="0"></iframe>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: "map-iframe",
  data() {
    return {
      baseUrl: '',
      url: '',
      params:'',
    }
  },
  created() {
    this.getUrlParams()
    this.baseUrl = SCREEN_CONFIG.MapURL
  },
  mounted(){
    this.url = `${this.baseUrl}?${this.params}`
    console.log(this.url)
  },
  methods: {
    getUrlParams(prop){
      let params = {},
        query = (window.location.search.length > 0 ? window.location.search.substring(1) : ""),
        arr = query.split('&'),
        rt;
      for (let i = 0, len = arr.length; i < len; i++) {
        let item = arr[i],
          tmp = item.split('='),
          key = tmp[0],
          val = tmp[1];
        if (typeof params[key] == 'undefined') {
          params[key] = val
        } else if (typeof params[key] == 'string') {
          params[key] = [params[key], val]
        } else {
          params[key].push(val)
        }
      }
      rt = prop ? params[prop] : params
      console.log(rt)
      this.params = this.qs.stringify(rt)
    },
  },
}
</script>

<style scoped lang="scss">
@import "map-iframe";
</style>
