<template>
  <div id="app">
    <Header v-if="!$route.meta.hideHeader"/>
    <router-view class="content" />
    <Footer v-if="!$route.meta.hideFooter" />
  </div>
</template>

<script>
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default {
  components: {
    Header,
    Footer
  }
}
</script>

<style lang="scss">
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    text-decoration: none;
    font-family: 'Open Sans', sans-serif;
  }

  #app {
    display: flex;
    min-height: 100vh;
    flex-direction: column;
  }

  .content {
    flex: 1;
  }

  body {
    background: #efefef;
  }
</style>
