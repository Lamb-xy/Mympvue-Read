<template>
  <div class="home-book">
    <div class="home-book-wrapper">
      <div class="home-book-header" v-if="showTitle">{{ title }}</div>
      <div class="home-book-content">
        <div
          class="home-book-row"
          v-for="(item, index) in bookData"
          :key="index"
        >
          <div
            class="home-book-col"
            v-for="(book, bookIndex) in item"
            :key="bookIndex"
            :style="{ flex: '0 0' + 100 / col + '%' }"
          >
            <div
              class="book-wrapper"
              :style="{
                flexDirection: mode === HOME_BOOK_MODE.COL ? 'column' : 'row',
              }"
              @click="onBookClick(book)"
              v-if="mode === HOME_BOOK_MODE.COL || mode === HOME_BOOK_MODE.ROW"
            >
              <ImageView :src="book.cover" :height="height"  :mode="mode"/>
              <div
                class="book-info book-title-col"
                v-if="mode === HOME_BOOK_MODE.COL"
              >
                <div class="book-title">{{ book.title }}</div>
              </div>
              <div class="book-info book-title-row" v-else>
                <div class="book-title">{{ book.title }}</div>
                <div class="book-title-author-wrapper">
                  <div class="book-title book-author">{{ book.author }}</div>
                  <div class="book-title book-author">
                    {{ book.categoryText }}
                  </div>
                </div>
              </div>
            </div>
            <div
              class="category-wrapper"
              v-else
              @click="onBookCategoryClick(book)"
            >
              <div class="category-text">{{ book.text }}</div>
              <div class="category-num">{{ book.num }}本书</div>
              <div class="category-img-wrapper">
                <div class="category-img1">
                  <ImageView :src="book.cover" height="66px" :mode="mode"></ImageView>
                </div>
                <div class="category-img2">
                  <ImageView :src="book.cover2" height="50px" :mode="mode"></ImageView>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="home-book-footer" v-if="showBtn">
        <div class="home-book-btn" @click="onMoreClick">{{ btnText }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { HOME_BOOK_MODE, CATEGORY } from '../../utils/const'
import ImageView from '../base/ImageView.vue'
export default {
  name: 'HomeBook',
  components: {
    ImageView,
  },
  props: {
    title: String,
    data: {
      type: Array,
      default: [],
    },
    height: 'auto',
    mode: {
      type: String,
      default: 'aspectFit',
    },
    btnText: String,
    row: {
      type: Number,
      default: 0,
    },
    col: {
      type: Number,
      default: 1,
    },
    mode: {
      type: String,
      default: 'row',
    },
    HOME_BOOK_MODE: {
      type: String,
      default: HOME_BOOK_MODE.ROW,
    },
    showTitle: {
      type: Boolean,
      default: true,
    },
    showBtn: {
      type: Boolean,
      default: true,
    },
    linearBg: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {}
  },
  computed: {
    //设计图书展示的数据结构
    bookData() {
      const { data, row, col } = this
      if (data && data.length > 0) {
        data.forEach((book) => {
          book.text = CATEGORY[book.categoryText.toLowerCase()]
        })
        const number = row * col //设置最多展示多少书
        const _bookData = data.slice(0, number) //选择0到number-1以内的范围，数组里面第一个数的下标为0
        //因为这里默认按row存放图书
        const _bookDataRow = []
        let _row = 0
        while (_row < row) {
          //   从第0行开始
          //0-2,2-4
          _bookDataRow.push(_bookData.slice(_row * col, _row * col + col)) //slice函数每次返回一个新的数组
          _row++
        }
        return _bookDataRow //这里返回一个按行排列的二维数组
      } else {
        return []
      }
    },
    HOME_BOOK_MODE() {
      return HOME_BOOK_MODE
    },
    CATEGORY() {
      return CATEGORY
    },
  },

  methods: {
    onMoreClick() {
      this.$emit('onMoreClick')
    },
    onBookClick(book) {
      this.$router.push({
        path: '/pages/detail/main',
        query: { fileName: book.fileName },
      })
      this.$emit('onBookClick', book)
    },
    onBookCategoryClick(category) {
      this.$router.push({
        path: '/pages/list/main',
        query: {
          key: 'categoryId',
          text: category.category,
          title: category.categoryText,
        },
      })
      this.$emit('onBookCategoryClick', category)
    },
  },
}
</script>

<style lang="scss" scoped>
.home-book {
  width: 100%;
  padding: 10px 0;
  box-sizing: border-box;
  margin-top: 15px;

  background-image: linear-gradient(-180deg, #ffffff 0%, #f9f9f9 100%);

  .home-book-header {
    line-height: 29.5px;
    font-size: 21px;
    font-weight: 500;
    color: #212933;
    padding: 0 15px;
  }
  .home-book-content {
    margin: 10.5px 12px 0 12px;
    .home-book-row {
      display: flex;
      flex-flow: row nowrap;
      padding-top: 12px;
      // justify-content: space-between;
      .home-book-col {
        margin: 0 8px;
        .book-wrapper {
          display: flex;
          flex-wrap: nowrap;
          width: 100%;
          .book-info {
            &.book-title-col {
              .book-title {
                font-weight: 550;
                font-size: 12px;
                line-height: 16.5px;
                color: #212731;
                max-height: 33px;
                overflow: hidden;
                word-break: break-word;
              }
            }
            &.book-title-row {
              flex: 0 0 50%;
              padding: 10px;
              display: flex;
              flex-direction: column;
              justify-content: space-between;
              .book-title {
                overflow: hidden;
                word-break: break-word;
                font-size: 14px;
                color: #1f1f1f;
                line-height: 18px;
                max-height: 36px;
                font-weight: 500;

                &.book-author {
                  font-size: 12px;
                  color: #868686;
                  line-height: 14px;
                  max-height: 14px;
                }
              }
            }
          }
        }
        .category-wrapper {
          display: flex;
          position: relative;
          flex-direction: column;
          background: #f8f9fb;
          border-radius: 5px;
          height: 96px;
          padding: 13px 0 14.5px 16px;
          box-sizing: border-box;
          justify-content: space-between;
          .category-text {
            font-size: 16px;
            line-height: 22.5px;
            color: #212832;
            max-width: 80px;
            max-height: 22.5px;
            font-weight: 550;
            text-overflow: ellipsis;
            overflow: hidden;
          }

          .category-num {
            font-size: 12px;
            line-height: 16.5px;
            color: #868686;
          }

          .category-img-wrapper {
            position: absolute;
            right: 0;
            bottom: 0;
            border-radius: 0 0 5px 0;
            .category-img1 {
              position: absolute;
              right: 0;
              bottom: -5px;
              z-index: 2;
              width: 48px;
              overflow: hidden;
            }

            .category-img2 {
              right: 30px;
              position: absolute;
              bottom: -5px;
              z-index: 1;
              width: 36px;
            }
          }
        }
      }
    }
  }
  .home-book-footer {
    padding: 20px;
    width: 100%;
    box-sizing: border-box;
    .home-book-btn {
      background: #ffffff;
      border: 2px solid #edeeee;
      height: 41px;
      border-radius: 22px;
      font-size: 14px;
      line-height: 41px;
      text-align: center;
      color: #3696ef;
    }
  }
}
</style>
<style lang="scss">
.category-img1 {
  .image {
    border-radius: 0 0 5px 0;
  }
}
</style>