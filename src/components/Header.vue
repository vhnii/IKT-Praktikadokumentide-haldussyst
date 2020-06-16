<template>
  <header>
    <router-link :to="logoLink" class="logo">
      <img src="../assets/Logo.svg" alt="Tartu KHK">
    </router-link>

    <a role="button" class="navbar-burger" v-if="isLoggedIn" :class="{'is-active': isActive}" aria-label="menu" aria-expanded="false" @click="isActive = !isActive">
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
    </a>

    <div class="navbar-menu" v-if="isLoggedIn" :class="{'is-active': isActive}">
      <button class="logout" @click="logOut">Logi välja</button>
    </div>
  </header>
</template>

<script>
import axios from 'axios'
import {mapGetters} from 'vuex'

export default {
  name: 'Header',
  data() {
    return {
      isActive: false
    }
  },
  methods: {
    logOut() {
      
      axios.get('https://praktika.ikt.khk.ee:5000/api/auth/logout', {withCredentials: true})
      this.$store.commit('LOGOUT')
      this.$router.push('/')
      this.isActive = false;
    },
  },
  computed: {
    ...mapGetters(['isAdmin']),
    logoLink() {
      if (this.$store.getters.user) {
        if (this.isAdmin) {
          return {name: 'koordinaator'}
        } else {
          return {name: 'opilane'}
        }
      } else {
        return {name: 'login'};
      }
    },
    isLoggedIn() {
      return this.$store.getters.user;
    },
  }
}
</script>

<style lang="scss" scoped>

header {
  display: flex;
  height: 70px;
  justify-content: space-between;
  align-items: center;
  padding: .5rem;
  background: #0054a6;
  z-index: 5;

  .logo > img {
    height: 50px;
  }

  .navbar-burger {
    color: #ffffff;
    cursor: pointer;
    display: block;
    height: 3.25rem;
    position: relative;
    width: 3.25rem;
    margin-left: auto;


    span {
      background: #ffffff;
      display: block;
      height: 1px;
      left: calc(50% - 8px);
      position: absolute;
      transform-origin: center;
      transition-duration: 86ms;
      transition-property: background-color,opacity,transform;
      transition-timing-function: ease-out;
      width: 16px;

      &:nth-child(1) {
        top: calc(50% - 6px);
      }

      &:nth-child(2) {
        top: calc(50% - 1px);
      }

      &:nth-child(3) {
        top: calc(50% + 4px);
      }
    }

    &.is-active span:nth-child(1) {
      transform: translateY(5px) rotate(45deg);
    }

    &.is-active span:nth-child(2) {
      opacity: 0;
    }

    &.is-active span:nth-child(3) {
      transform: translateY(-5px) rotate(-45deg);
    }
  }

  .navbar-menu {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 70px;
    left: 0;
    background: #0054a6;
    width: 100%;
    height: 0;
    overflow: hidden;
    transition: 300ms ease-in-out;
    z-index: -2;

    &.is-active {
      height: 100px;
    }
  }

  .logout {
      color: #ffe600;
      background: transparent;
      outline: none;
      cursor: pointer;
      font-weight: 700;
      border-radius: 50px;
      border: 1px solid #ffe600;
      padding: .5rem 1.5rem;
      font-size: 0.875rem;
      min-width: 110px;
      text-align: center;
      font-family: 'Open Sans', sans-serif;
    }
}


@media (min-width: 425px) {
  header {
    padding: .5rem 1rem;

  .navbar-burger {
    display: none;
  }

  .navbar-menu {
    position: static;
    transition: none;
    height: auto;

    .logout {
      align-self: flex-end;
    }
  }
  }
}

@media (min-width: 768px) {
  header {
    padding: .5rem 30px;
  }
}
</style>