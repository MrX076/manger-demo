<template>
  <div>
    <el-menu
      :collapse="$store.state.menuCollapse"
      :collapse-transition="false"
      class="el-menu-vertical"
      background-color="#373d41"
      text-color="#fff"
      active-text-color="#ffd04b"
      :router="true"
      :default-active="$route.path"
      style="border: none;">
      <VMenuItem v-for="menu in menus" :key="menu.name" :menu="menu"/>
    </el-menu>
  </div>
</template>

<script>
import VMenuItem from './VMenuItem'
export default {
  name: 'VMenu',
  components: { VMenuItem },
  props: {
    menus: {
      type: Array,
      required: true
    }
  }
}
</script>

<style>
  @keyframes menu-toggler-spaead {
    0% {
      width: 63px;
    }
    100% {
      width: 200px;
    }
  }
  @keyframes menu-toggler-shrink {
    0% {
      width: 200px;
    }
    100% {
      width: 63px;
    }
  }
  .el-menu .fas {
    font-size: 18px;
    margin-right: 7px;
  }
  .el-menu-vertical:not(.el-menu--collapse) {
    width: 201px;
  }
</style>
