<template>
  <div>
    <ShelfUserInfo
      :num="shelfList.length - 1"
      :readDay="readDay"
      :userInfo="userInfo"
    />
    <ShelfList :shelfList="shelfList" />
  </div>
</template>

<script>
import ShelfUserInfo from '../../components/shelf/ShelfUserInfo.vue'
import ShelfList from '../../components/shelf/ShelfList.vue'
import { getStorageSync } from '../../api/wechat.js'
import { readDay, bookIsInShelf } from '../../api'
export default {
  name: 'Shelf',
  components: {
    ShelfUserInfo,
    ShelfList,
  },
  data() {
    return {
      num: 0,
      userInfo: {},
      readDay: 0,
      shelfList: [],
    }
  },
  //这里改成当页面展示的时候
  mounted() {
    this.userInfo = getStorageSync('userInfo')
    const openId = getStorageSync('openId')
    if (openId) {
      bookIsInShelf({ openId }).then((response) => {
        this.shelfList = response.data.data
        this.shelfList.push({})
        readDay({ openId }).then((response) => {
          this.readDay = response.data.data.day
        })
      })
    }
  },

  methods: {},
}
</script>

<style lang="scss" scoped>
</style>