<template>
<div>
    <h1>This Shop is {{ this.selectShop.name }} </h1>
    </div>
</template>
<script>
export default {
  name: 'shop',
  data () {
    return {
    }
  },
  created () {
  },
  methods: {
  },
  computed: {
    selectShop () {
      return this.$store.getters.selectShop
    }
  }
}
</script>
<style scoped>
</style>
