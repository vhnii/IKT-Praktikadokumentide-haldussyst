<template>
    <main>
      <Login></Login>
    </main>
</template>

<script>
import Login from '@/components/Login/Login'

export default {
  components: {
    Login,
  }
}
</script>

<style lang="scss" scoped>

main{
    display: flex;
    align-content: center;
    justify-content: center;
    padding: 4rem 0;
}
</style>