<template>
  <div class="home">
    <p v-auth="'ADMIN'">有ADMIN权限可以看到此行</p>
    <p v-auth="'USER'">有USER权限可以看到此行</p>
    <p v-role="'ADMIN'">有ADMIN角色可以看到此行</p>
    <p v-role="'MEMBER'">有MEMBER角色可以看到此行</p>
  </div>
</template>

<script>
export default {
  name: 'home'
}
</script>
