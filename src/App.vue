<template>
  <PageLoader></PageLoader>
  <Alert></Alert>
  <router-view></router-view>
</template>

<script>
import Alert from '@/components/common/AppAlertComponent';
import PageLoader from '@/components/common/PageLoaderComponent';

export default {
  name: 'App',
  components: {
    Alert,
    PageLoader
  }
}
</script>
