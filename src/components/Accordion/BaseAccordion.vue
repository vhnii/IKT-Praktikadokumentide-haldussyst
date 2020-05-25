<template>
  <div class="accordion-wrapper">
    <div class="accordion" @click="toggleItem">
      <h2 class="title">
        <slot name="title"></slot>
      </h2>
    </div>
    <div v-show="show" class="content">
      <slot name="content"></slot>
    </div>
  </div>
</template>
<script>
export default {
  components: {},
  data: function() {
    return {
      show: false
    };
  },
  methods: {
    toggleItem () {
      this.show = !this.show;
    }
  }
};
</script>
<style lang="scss" scoped>
.accordion {
  cursor: pointer;

  .title {
    font-size: 1.25rem;
    margin-left: 10px;
    font-family: 'Source Sans Pro', sans-serif;
    font-weight: 700;
    color: #ffffff;
  }
}

.content {
  width: 100%;

    div {
      display: flex;
      flex-direction: column;
      margin: 10px 0;
    }

    .item {
      display: flex;
      margin: 20px 0;
      margin-left: 10px;

      > * {
        margin: 5px 0;
      }

      > a {
        color: #ffe600;
        padding: 8px 0;
      }
    }
}

@media (min-width: 768px) {
  .content {
    width: 100%;
    padding: 10px 0;

    .item {
      flex-direction: row;

     > * {
        margin: 0;
        margin-right: 20px;
      }

      > *:last-child {
        margin-right: 0;
      }

      > a {
        padding: 0;
      }
    }
  }
}

@media (min-width: 992px) {
  .accordion {
    .title {
      margin-left: 0;
    }
  }

  .content {
    margin: 0;
    padding: 0;

    .item {
      margin: 0;
    }
  }
}
</style>