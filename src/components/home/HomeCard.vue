<template>
  <div class="home-card">
    <div class="home-card-wrapper">
      <div class="user-info">
        <div class="avater-wrapper" @click="gotoShelf">
          <ImageView :src="userInfo.avatarUrl"  round />
        </div>
        <div class="nickname">{{ userInfo.nickName }}</div>
        <div class="home-card-hint">
          已连续签到<span class="sign-num">{{signDay}}</span>天
          <BaseButton
            size="mini"
            type="info"
            text="立即签到"
            custom-class="btn-sign"
            round
            @click="sign"
            v-if="!hasSign"
          />
        </div>
      </div>
      <div class="book-info">
        <div class="book-wrapper">
          <div
            class="book-img-wrapper"
            v-for="(item, index) in shelfList"
            :key="index"
            @click="onBookClick(item)"
          >
            <ImageView :src="item.cover" height="101px" />
          </div>
        </div>
        <div class="shelf-wrapper" @click="gotoShelf">
          <div class="shelf" >书架</div>
          <van-icon class="arrow" name="arrow"></van-icon>
        </div>
      </div>
      <!-- <div class="feedback-wrapper" @click="onFeedBackClick">
        <div class="feedback-text">点我</div>
      </div> -->
    </div>
    <van-dialog id="van-dialog"></van-dialog>
  </div>
</template>

<script>
import ImageView from '../base/ImageView.vue'
  import BaseButton from '../base/BaseButton'
import Dialog from 'vant-weapp/dist/dialog/dialog.js'
export default {
  name: 'HomeCard',
  components: {
    ImageView,
    BaseButton
  },
  props: {
      num: Number,
      shelfList:[],
      userInfo: Object,
    hasSign: {
      type: Boolean,
      default: false,
    },
    signDay: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {}
  },
  computed:{
      shelfList(){
            return this.shelfList.sort(() => {return Math.random() > 0.5 ? -1 : 1;}).slice(0, 3)
      }
  },
  mounted() {
  },
  computed: {
  },
  methods: {
    gotoShelf() {
        this.$router.push('/pages/shelf/main')
    },
    onBookClick(book) {
        this.$router.push({ path: '/pages/detail/main', query: { fileName: book.fileName } })
        this.$emit('onBookClick',book)
    },
    sign() {
        this.$emit('onSignClick')
    },
    onFeedBackClick() {
      Dialog.confirm({
        title: '反馈',
        message: '您是否确认提交反馈信息?',
        theme: 'round-button',
        confirmButtonText: '是',
        cancelButtonText: '否',
      })
        .then(() => {
          // on close
          console.log('是之后的事件')
        })
        .catch(() => {
          console.log('否之后的事件')
        })
    },
  },
}
</script>

<style lang="scss">
 .home-card-hint {
    .btn-sign {
      width: auto;
      background: #e6b3d0;
      padding: 0 10px;
      border: none;
      border-radius: 50px;
      margin-left: 10px;
      color: #fff;
      font-size: 10px;
    }
  }
</style>
<style lang="scss" scoped>
.home-card {
  background-image: linear-gradient(-90deg, #aec0e1 0%, #e9b2cf 100%);
  border-radius: 15px;
  margin: 20px;
  .home-card-wrapper {
    position: relative;
    padding: 21.5px 20px 17px 20px;
    box-sizing: border-box;
    .user-info {
      display: flex;
      align-items: center;
      .avater-wrapper {
        width: 20px;
        height: 20px;
      }

      .nickname,.shelf-text {
        font-size: 12px;
        color: #fff;
      }
      .nickname {
        margin: 0 8.5px;
      }
         .home-card-hint {
          display: flex;
          align-items: center;
          font-size: 12px;
          color:#fff;
          margin-left: 10px;
          
          .sign-num {
            font-size: 14px;
            margin: 0 5px;
            font-weight: 500;
          }
        }
    }
    .book-info {
      display: flex;
      margin-top: 16.5px;
      .book-wrapper {
        display: flex;
        flex: 1;
        justify-content: space-between;
        .book-img-wrapper {
          width: 72px;
          height: 101px;
        }
      }
      .shelf-wrapper {
        display: flex;
        align-items: center;
        .shelf {
          line-height: 14.5px;
          font-size: 10.5px;
          width: 10.5px;
          color: #fff;
          opacity: 0.8;
          word-break: break-word;
          padding-right: 4.5px;
          padding-left: 17.5px;
        }

        .arrow {
          font-size: 9px;
          color: #828489;
          display: flex;
          justify-content: center;
          align-items: center;
        }
      }
    }
    .feedback-wrapper {
      position: absolute;
      right: 0px;
      top: 19.5px;
      z-index: 1;
      width: 44.5px;
      height: 23.5px;
      background: #9588a3;
      border-radius: 100px 0 0 100px;
      .feedback-text {
        line-height: 23.5px;
        text-align: center;
        font-size: 11px;
        color: #fff;
      }
    }
  }
}
</style>