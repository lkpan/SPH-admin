<template>
  <div class="dashboard-container">
  <card/>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Card from './Card'

export default {
  name: 'Dashboard',
  comments:['Card'],
  computed: {
    ...mapGetters([
      'name'
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
