<template>
  <div class="search-list-warpper">
    <!-- 参数从父组件获得需要写明参数（需要带括号） -->

    <SearchItem
      :title="category"
      subtitle="分类"
      icon="/static/icon/分类.png"
      @onClick="showList(category, 'category')"
      v-if="category"
    />
    <SearchItem
      :title="author"
      subtitle="作者"
      icon="/static/icon/作者.png"
      @onClick="showList(author, 'author')"
      v-if="author"
    />
    <SearchItem
      :title="publisher"
      subtitle="出版社"
      icon="/static/icon/出版社.png"
      @onClick="showList(publisher, 'publisher')"
      v-if="publisher"
    />
    <div class="search-table-wrapper">
      <!-- 父组件响应子组件发出的函数： -->
      <!-- 参数从子组件传递的在父组件中不用写出（只需要写函数名，不用带括号） -->
      <SearchTable :data="book"/>
    </div>
  </div>
</template>

<script>
import SearchItem from '../search/SearchItem.vue'
import SearchTable from '../search/SearchTable.vue'
export default {
  name: 'SearchList',
  components: {
    SearchItem,
    SearchTable,
  },
  props: {
    //接收Search父组件传来的数据
    searchList: Object,
  },
  computed: {
    book() {
      if (this.searchList && this.searchList.book) {
        return this.searchList.book
      }
    },
    category() {
      if (
        this.searchList &&
        this.searchList.category.length > 0 &&
        this.searchList.category[0].categoryText
      ) {
        return this.searchList.category[0].categoryText
      }
    },
    author() {
      if (
        this.searchList &&
        this.searchList.author.length > 0 &&
        this.searchList.author[0].author
      ) {
        return this.searchList.author[0].author
      }
    },
    publisher() {
      if (
        this.searchList &&
        this.searchList.publisher.length > 0 &&
        this.searchList.publisher[0].publisher
      ) {
        return this.searchList.publisher[0].publisher
      }
    },
  },
  data() {
    return {}
  },

  mounted() {},

  methods: {
    //传递值和对应key给函数
    showList(text, key) {
    this.$router.push({
        path:'/pages/list/main',
        query:{
            text,key
        }
    })
    },
  },
}
</script>

<style lang="scss" scoped>
.search-list-warpper {
  .search-table-wrapper {
    margin-top: 8px;
  }
}
</style>