<template>
  <div class="list-wrapper">
    <SearchTable :data="data" />
  </div>
</template>

<script>
import SearchTable from '../../components/search/SearchTable.vue'
import { searchList } from '../../api'
import { setNavigationBarTitle, showToast } from '../../api/wechat'
export default {
  name: 'List',
  components: {
    SearchTable,
  },
  data() {
    return {
      data: [],
      page: 1,
    }
  },

  mounted() {
    this.page = 1
    const { text ,title} = this.$route.query
    if(title){
    setNavigationBarTitle(title)
    }else{
    setNavigationBarTitle(text)
    }
    this.getSearchList()
  },
  onReachBottom() {
      this.page++
      this.getSearchList()
  },

  methods: {
    getSearchList() {
      const { text, key } = this.$route.query
      const params = {}
      if (text && key) {
        params[key] = text
      }
      params.page = this.page
      searchList(params).then((response) => {
        const book = response.data.data
        if (book && book.length > 0) {
          this.data.push(...book)
        }else{
            showToast('没有更多数据啦~')
        }
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.list-wrapper{
    padding-top: 10px;
}
</style>