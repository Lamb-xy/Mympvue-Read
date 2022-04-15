<template>
  <div>
    <DetailBook :book="book" />
    <DetailStat
      :readers="book.readers"
      :readerNum="book.readerNum"
      :rankNum="book.rankNum"
      :rankAvg="book.rankAvg"
    />
    <DetailRate :rateValue="book.rateValue" @onRateChange="onRateChange" />
    <DetailContents :contents="contents" @readBook="readBook" />
    <!-- <DetailBottom
      :isInShelf="isInShelf"
      @readBook="readBook"
      @handleShelf="handleShelf"
    /> -->
    <div class="detail-bottom">
      <div class="detail-btn-wrapper">
        <van-button
          :custom-class="isInShelf ? 'detail-btn-remove' : 'detail-btn-shelf'"
          round
          @click="handleShelf"
        >
          {{ isInShelf ? '移出书架' : '加入书架' }}
        </van-button>
      </div>
      <div class="detail-btn-wrapper">
        <van-button custom-class="detail-btn-read" round @click="readBook">
          阅读
        </van-button>
      </div>
    </div>
  </div>
</template>

<script>
import DetailBook from '../../components/detail/DetailBook.vue'
import DetailStat from '../../components/detail/DetailStat.vue'
import DetailRate from '../../components/detail/DetailRate.vue'
import DetailContents from '../../components/detail/DetailContents.vue'
import DetailBottom from '../../components/detail/DetailBottom.vue'
import {
  bookDetail,
  bookRankSave,
  bookContents,
  bookIsInShelf,
  bookShelfSave,
  bookShelfRemove,
} from '../../api'
import { getStorageSync } from '../../api/wechat'
export default {
  name: 'Detail',
  components: {
    DetailBook,
    DetailStat,
    DetailRate,
    DetailContents,
    DetailBottom,
  },
  data() {
    return {
      book: Object,
      contents: Array,
      isInShelf: Boolean,
    }
  },
  mounted() {
    this.getBookDetail()
    this.getBookContents()
    this.getBookIsInShelf()
  },
  methods: {
    onRateChange(value) {
      const openId = getStorageSync('openId')
      const { fileName } = this.$route.query
      bookRankSave({
        openId,
        fileName,
        rank: value,
      }).then(() => {
        this.getBookDetail()
      })
    },
    getBookDetail() {
      const openId = getStorageSync('openId')
      const { fileName } = this.$route.query
      if (openId && fileName) {
        bookDetail({
          openId,
          fileName,
        }).then((response) => {
          this.book = response.data.data
        })
      }
    },
    getBookContents() {
      const { fileName } = this.$route.query
      if (fileName) {
        bookContents({ fileName }).then((response) => {
          this.contents = response.data.data
        })
      }
    },
    readBook(href) {
      const query = {
        opf: this.book.opf,
        fileName: this.book.fileName,
      }
      if (href) {
        //去除href前面的OFBS/
href=href.toString()
        const index = href.indexOf('/')
        if (index >= 0) {
          //如果/存在，截断0-index位置的字符串
          query.navigation = href.slice(index + 1)
        } else {
          query.navigation = href
        }
      }
      if (this.book && this.book.fileName) {
        this.$router.push({
          path: '/pages/read/main',
          query,
        })
      } else {
      }
    },
    getBookIsInShelf() {
      const openId = getStorageSync('openId')
      const { fileName } = this.$route.query
      if (openId && fileName) {
        bookIsInShelf({
          openId,
          fileName,
        }).then((response) => {
          const data = response.data.data
          data.length === 0 ? (this.isInShelf = false) : (this.isInShelf = true)
        })
      }
    },
    //加入书架
    handleShelf() {
      const openId = getStorageSync('openId')
      const { fileName } = this.$route.query
      if (!this.isInShelf) {
        bookShelfSave({ openId, fileName }).then(this.getBookIsInShelf())
      } else {
        const vue = this
        wx.showModal({
          title: '提示',
          content: `确定要从书架移除这本图书嘛？`,
          success(res) {
            if (res.confirm) {
              //   console.log('用户点击确定')
              bookShelfRemove({ openId, fileName }).then(vue.getBookIsInShelf())
            }
          },
        })
      }
    },
  },
}
</script>
<style lang="scss" scoped>
.detail-bottom {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 60px;
  background: #fff;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  padding: 0 15px;
  border-top: 1px solid #eee;
  box-shadow: 0 -2px 4px 0 rgba(0, 0, 0, 0.1);

  .detail-btn-wrapper {
    flex: 1;
  }
}
</style>
<style lang="scss" scoped>
.detail-bottom {
  .detail-btn-read {
    width: 100%;
    border: none;
    color: #fff;
    background: #1ea3f5;
    margin-left: 7.5px;
  }

  .detail-btn-shelf {
    width: 100%;
    color: #1ea3f5;
    background: #fff;
    border: 1px solid #1ea3f5;
    margin-right: 7.5px;
  }

  .detail-btn-remove {
    width: 100%;
    color: #f96128;
    background: rgba(255, 175, 155, 0.3);
    border: 1px solid #ffaf9b;
    margin-right: 7.5px;
  }
}
</style>
