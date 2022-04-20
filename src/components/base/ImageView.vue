<template>
  <div class="image-view" @click="onClick">
    <img
      :class="round ? 'round image' : 'image'"
      :style="{ height }"
      :src="src"
      :mode="mode"
      :lazy-load="lazyLoad"
      @load="onLoad"
      @error="onError"
      v-show="!isLoading && !error"
    />
    <img
      :class="round ? 'round image' : 'image'"
      :style="{ height }"
      src="/static/images/logo.png"
      :mode="mode"
      @load="onLoad"
      @error="onError"
      :lazy-load="lazyLoad"
      v-show="isLoading || error"
    />
  </div>
</template>

<script>
export default {
  name: 'ImageView',
  props: {
    src: {
      type: String,
      default: '',
    },
    mode: {
      type: String,
      default: 'widthFix',
    },
    lazyLoad: {
      type: Boolean,
      default: true,
    },
    round: {
      type: Boolean,
      default: false,
    },
    height: {
      type: String,
      default: 'auto',
    },
  },
  watch: {
    src(newValue, preValue) {
      if (newValue && newValue.length > 0 && newValue !== preValue) {
        this.$nextTick(() => {
          this.isLoading = true
          this.error = false
        })
      }
    },
  },
  data() {
    return {
      isLoading: true,
      error: false,
    }
  },

  mounted() {},

  methods: {
    onClick() {
      this.$emit('onClick')
    },
    onError() {
      this.error = true
      this.isLoading = false
    },
    onLoad() {
      this.isLoading = false
      this.error = false
    },
  },
}
</script>

<style lang="scss" scoped>
.image-view {
  height: 100%;
  width: 100%;
  .image {
    width: 100%;
  }
  .round {
    border-radius: 50%;
  }
}
</style>