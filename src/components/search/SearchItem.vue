<template>
  <div class="search-item-wrapper" @click="onClick">
    <div class="search-item-icon">
      <div class="icon-wrapper">
        <!-- <van-icon name="apps-o" color="#F7F7F9" size="32px"/> -->
        <img :src="icon" />
      </div>
    </div>
    <div class="search-item-info">
      <div class="search-item-title">{{ title }}</div>
      <div class="search-item-subtitle">{{ subtitle }}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SearchItem',
  props: {
    title: '',
    subtitle: '',
    icon: '',
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
.search-item-wrapper {
  padding-left: 15px;
  padding-bottom: 20px;
  display: flex;
  flex-flow: row;
  align-items: center;
  .search-item-icon {
    padding-right: 10px;

    .icon-wrapper {
      display: flex;
      align-items: center;
      img {
        width: 32px;
        height: 32px;
      }
    }
  }
  .search-item-info {
    display: flex;
    flex-flow: column;
    line-height: 20px;
    .search-item-title {
      max-width: 300px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      font-size: 14px;

      color: #333333;
    }
    .search-item-subtitle {
      font-size: 12px;
      color: rgba(0, 0, 0, 0.45);
    }
  }
}
</style>