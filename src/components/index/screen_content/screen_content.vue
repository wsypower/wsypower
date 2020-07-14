<template>
    <div class="screen_content" flex="main:center">
        <div class="screen_main">
            <!--切换页面-->
            <slot></slot>
        </div>
    </div>
</template>

<script type="text/ecmascript-6">
    export default {
        name: "screen_content"
    }
</script>

<style scoped lang="scss">
@import "screen_content";
</style>
