<template>
  <web-view :src="src"></web-view>
</template>

<script>
export default {
  name: 'Read',
  components: {},
  data() {
    return {
      src: '',
    }
  },

  mounted() {
    this.getUrl()
  },
  methods: {
    getUrl() {
      const { query } = this.$route
      let _src = 'http://www.youbaobao.xyz/book/#/ebook'
      if (query.fileName) {
        _src = `${_src}/${query.fileName}`

        if (query.opf) {
          _src = `${_src}?opf=${query.opf}`
        }

        if (query.navigation && query.opf) {
          _src = `${_src}&navigation=${query.navigation}`
        } else if (query.navigation) {
          _src = `${_src}?navigation=${query.navigation}`
        }
        this.src = _src
      }
    },
  },
}
</script>
<style lang="scss" scoped>
</style>