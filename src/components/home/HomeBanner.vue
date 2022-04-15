<template>
  <div class="home-banner">
    <div
      class="bg-img"
      :style="{ backgroundImage: 'url(' + img + ')' }"
      @click="onClick"
    >
      <div class="title">{{ title }}</div>
      <div class="sub-title">{{ subTitle }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeBanner',
  props: {
    img: String,
    title: String,
    subTitle: String,
  },
  data() {
    return {}
  },

  mounted() {},

  methods: {
    onClick() {
      this.$emit('onClick')
    },
  },
}
</script>

<style lang="scss" scoped>
.home-banner {
  margin: 0 20px 23px 20px;
  .bg-img {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 125px;
    border-radius: 10px;
    background-size: 100% 100%;
    background-color: #808080;
    background-repeat: no-repeat;
    .title {
      font-size: 18px;
      color: #fff;
    }
    .sub-title {
      margin-top: 10px;
      font-size: 14px;
      color: #fff;
      border: 1px solid #ccc;
      background: #f8a2b6;
      border-radius: 50px;
      padding: 5px 15px;
    }
  }
}
</style>