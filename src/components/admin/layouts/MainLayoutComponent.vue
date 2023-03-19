<template>
  <v-app>
    <v-main>
      <Header :appName="appName"></Header>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>

import Header from '@/components/admin/layouts/HeaderComponent.vue';

export default {
  components: {
    Header
  },
  data() {
    return {
      appName: process.env.VUE_APP_NAME
    }
  }
}
</script>