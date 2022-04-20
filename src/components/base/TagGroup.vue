<template>
  <div class="tag-group-wrapper">
    <div class="tag-group-header">
      <div class="tag-group-title">{{ headerText }}</div>
      <div class="tag-group-btn" @click="onBtnClick">{{ btnText }}</div>
    </div>
    <div class="tag-group-content">
      <div
        class="tag-group-item"
        v-for="(text, index) in tags"
        :key="index"
      >
        <Tag :text="text" @onTagClick="onTagClick(text)" />
      </div>
    </div>
  </div>
</template>

<script>
import Tag from './Tag.vue'
export default {
  name: 'TagGroup',
  props: {
    headerText: '',
    btnText: '',
    tags: [],
  },
  components: {
    Tag,
  },
  data() {
    return {}
  },

  mounted() {},

  methods: {
    onTagClick(text) {
      this.$emit('onTagClick', text)
    },
    onBtnClick() {
      this.$emit('onBtnClick')
    },
  },
}
</script>

<style lang="scss" scoped>
.tag-group-wrapper {
  padding: 15px 16.5px 16px 10px;
  .tag-group-header {
    display: flex;
    justify-content: space-between;
    line-height: 20px;
    font-size: 14px;
    .tag-group-title {
      color: #333333;
    }
    .tag-group-btn {
      color: #3696ef;
    }
  }
  .tag-group-content {
    display: flex;
    flex-flow: row wrap;
    padding-top: 16px;
    .tag-group-item {
      padding-right: 12px;
      padding-bottom: 12px;
    }
  }
}
</style>