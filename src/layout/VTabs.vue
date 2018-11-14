<template>
  <div class="tabsbar">
    <div v-for="r in openTabs" :key="r.name" :class="{active: r.path === $route.path}" @click="activeRoute(r)">
      {{ r.meta.title }}
      <i class="fas fa-times-circle" v-if="r.name !== 'Home'" @click.stop="closeRoute(r)"></i>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'VTabs',
  computed: {
    ...mapState(['openTabs'])
  },
  methods: {
    activeRoute (route) {
      if (route.name !== this.$route.name) {
        let obj = {}
        obj.name = route.name
        if (route.params) {
          obj.params = route.params
        }
        if (route.query) {
          obj.query = route.query
        }
        this.$router.push(obj)
      }
    },
    closeRoute (route) {
      let r = null
      if (route.name === this.$route.name) {
        let index = this.openTabs.indexOf(route)
        if (index > 0) {
          r = this.openTabs[index - 1]
        } else if (this.openTabs.length > (index + 1)) {
          r = this.openTabs[index + 1]
        } else {
          r = { name: 'Home' }
        }
      }
      this.$store.commit('closeRoute', route)
      if (r) {
        this.activeRoute(r)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .tabsbar {
    display: flex;
    flex-direction: row;
    border-bottom: 1px solid #2a2f32;
    & > div {
      padding: 3px 20px;
      margin: 1px 0 -1px 1px;
      color: white;
      background: #4a5064;
      border: 1px solid #2a2f32;
      cursor: pointer;
      position: relative;
      &:hover{
        background-color: darkslategrey;
        & i {
          display: block;
        }
      }
      &.active {
        color: black;
        background-color: white;
        border-bottom-color: white;
        & i {
          color: #2a2f32;
        }
      }
      & i {
        position: absolute;
        top: 6px;
        right: 3px;
        display: none;
      }
    }
  }
</style>
