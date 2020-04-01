<template>
  <div class="dashboard-container">
    <div class="dashboard-text">名称: {{ name }}</div>
    <div class="dashboard-text">角色和权限: <li v-for="(role, index) in roles" :key="index"> {{ role }} </li></div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters([
      'name',
      'roles'
    ])
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>
