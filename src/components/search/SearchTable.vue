<template>
  <div class="search-table-wrapper">
    <div
      class="search-table"
      v-for="(item, index) in data"
      :key="index"
      @click="onBookClick(item)"
    >
      <!-- <div class="search-table" @click="onSearchTableClick"> -->
      <div class="book-img">
        <ImageView :src="item.cover" />
      </div>
      <div class="book-info">
        <div class="book-title">{{ item.title }}</div>
        <div class="book-author">{{ item.author }}</div>
        <div class="book-category">{{ item.categoryText }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import ImageView from '../base/ImageView.vue'
export default {
  name: 'SeachTable',
  components: {
    ImageView,
  },
  props: {
    data: [],
  },
  data() {
    return {}
  },

  mounted() {},

  methods: {
    onBookClick(book) {
        this.$router.push({ path: '/pages/detail/main', query: { fileName: book.fileName } })
    },
  },
}
</script>

<style lang="scss" scoped>
.search-table-wrapper {
  //   padding-top: 16px;
  padding-left: 16px;
  .search-table {
    padding-bottom: 28.5px;
    display: flex;
    flex-flow: row;
    .book-img {
      width: 47px;
      height: 68.5px;
      padding-right: 15.5px;
    }
    .book-info {
      width: 270px;
      display: flex;
      flex-flow: column;
      .book-title {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        font-size: 16px;
        line-height: 26px;
        color: #333333;
        padding-bottom: 5px;
      }
      .book-author {
        font-size: 13px;
        color: rgba(0, 0, 0, 0.65);
        line-height: 18px;
      }
      .book-category {
        font-size: 13px;
        color: rgba(0, 0, 0, 0.45);
        line-height: 18px;
      }
    }
  }
}
</style>