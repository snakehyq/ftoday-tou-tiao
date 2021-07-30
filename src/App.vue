<template>
  <div id="app">
    <keep-alive :include="getCachePages">
      <router-view/>
    </keep-alive>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'app',
  computed: {
    ...mapGetters(['getCachePages'])
  }
}
</script>
<style lang="scss">
</style>
