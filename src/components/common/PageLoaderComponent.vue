<template>
  <div class="overlay" :class="show ? 'show' : ''"></div>
  <div class="spanner" :class="show ? 'show' : ''">
    <div class="loader"></div>
  </div>
</template>
<script>
export default {
  name: 'PageLoader',
  data: () => ({
    show: false,
  }),
  created: function () {
    this.store.watch(state => state.PageLoader, () => {
      const {
        show
      } = this.store.state.PageLoader
      if (show) {
        this.show = true
      } else {
        this.show = false
      }
    })
  },
}
</script>