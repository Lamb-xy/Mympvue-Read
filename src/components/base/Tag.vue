<template>
  <div class="tag-wrapper" @click="onTagClick">
    <div class="tag">{{ text }}</div>
  </div>
</template>

<script>
export default {
  name: 'Tag',
  props: {
    text: {
      type: String,
      default: '',
    },
  },
  data() {
    return {}
  },
  mounted() {},

  methods: {
    onTagClick() {
      this.$emit('onTagClick')
    },
  },
}
</script>

<style lang="scss" scoped>
.tag-wrapper {
  //   display: flex;
  //   justify-content: center;
  background: #f7f7f9;
  border-radius: 16px;
  height: 32px;
  box-sizing: border-box;
  width: fit-content;
  .tag {
    margin-left: 17px;
    margin-right: 17.5px;
    font-family: PingFangSC-Regular;
    font-size: 14px;
    color: #272e37;
    max-width: 310px;
    line-height: 32px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
}
</style>