<template>
<<<<<<< HEAD
  <div @click="clickHandle">

    <div class="userinfo" @click="bindViewTap">
      <img class="userinfo-avatar" v-if="userInfo.avatarUrl" :src="userInfo.avatarUrl" background-size="cover" />
      <img class="userinfo-avatar" src="/static/images/user.png" background-size="cover" />

      <div class="userinfo-nickname">
        <card :text="userInfo.nickName"></card>
      </div>
    </div>

    <div class="usermotto">
      <div class="user-motto">
        <card :text="motto"></card>
      </div>
    </div>

    <form class="form-container">
      <input type="text" class="form-control" :value="motto" placeholder="v-model" />
      <input type="text" class="form-control" v-model="motto" placeholder="v-model" />
      <input type="text" class="form-control" v-model.lazy="motto" placeholder="v-model.lazy" />
    </form>

    <a href="/pages/counter/main" class="counter">去往Vuex示例页面</a>

    <div class="all">
        <div class="left">
        </div>
        <div class="right">
        </div>
    </div>
=======
  <div>
    <div class="home" v-if="isAuth">
      <SearchBar
        disabled
        @onSearchBarClick="onSearchBarClick"
        :hotSearch="hotSearch"
      />
      <HomeCard
        :userInfo="userInfo"
        :shelfList="shelfList"
        :hasSign="hasSign"
        :signDay="continueSignDay"
        @onSignClick="onSignClick"
        @onBookClick="onBookClick"
      />
      <HomeBanner
        img="http://127.0.0.1/book/res/bg.jpg"
        title="欢迎来到小羊Read"
        sub-title="go!"
        @onClick="onBannerClick"
      />
      <HomeBook
        title="为你推荐"
        :row="1"
        :col="3"
        :data="recommend"
        mode="col"
        height="147px"
        btn-text="换一批"
        @onMoreClick="recommendChange('recommend')"
      />
      <HomeBook
        title="免费阅读"
        :row="2"
        :col="2"
        :data="freeRead"
        mode="row"
        height="88px"
        btn-text="换一批"
        @onMoreClick="recommendChange('freeRead')"
      />
      <HomeBook
        title="当前最热"
        :row="1"
        :col="4"
        :data="hotBook"
        mode="col"
        height="99px"
        btn-text="换一批"
        @onMoreClick="recommendChange('hotBook')"
      />
      <HomeBook
        title="分类"
        :row="3"
        :col="2"
        :data="category"
        mode="category"
        btn-text="查看全部"
        @onMoreClick="onCategoryMoreClick"
      />
    </div>
    <Auth v-if="!isAuth" @getUserProfile="getUserProfile" />
>>>>>>> 3565444 (项目大致完成版)
  </div>
</template>

<script>
<<<<<<< HEAD
import card from '@/components/card'

export default {
  data () {
    return {
      motto: 'Hello miniprograme',
      userInfo: {
        nickName: 'mpvue',
        avatarUrl: 'http://mpvue.com/assets/logo.png'
      }
    }
  },

  components: {
    card
  },

  methods: {
    bindViewTap () {
      const url = '../logs/main'
      if (mpvuePlatform === 'wx') {
        mpvue.switchTab({ url })
      } else {
        mpvue.navigateTo({ url })
      }
    },
    clickHandle (ev) {
      console.log('clickHandle:', ev)
      // throw {message: 'custom test'}
    }
  },

  created () {
    // let app = getApp()
  }
}
</script>

<style scoped>
.userinfo {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.userinfo-avatar {
  width: 128rpx;
  height: 128rpx;
  margin: 20rpx;
  border-radius: 50%;
}

.userinfo-nickname {
  color: #aaa;
}

.usermotto {
  margin-top: 150px;
}

.form-control {
  display: block;
  padding: 0 12px;
  margin-bottom: 5px;
  border: 1px solid #ccc;
}
.all{
  width:7.5rem;
  height:1rem;
  background-color:blue;
}
.all:after{
  display:block;
  content:'';
  clear:both;
}
.left{
  float:left;
  width:3rem;
  height:1rem;
  background-color:red;
}

.right{
  float:left;
  width:4.5rem;
  height:1rem;
  background-color:green;
}
=======
import SearchBar from '../../components/home/SearchBar.vue'
import HomeCard from '../../components/home/HomeCard.vue'
import HomeBanner from '../../components/home/HomeBanner.vue'
import HomeBook from '../../components/home/HomeBook.vue'
import Auth from '../../components/base/Auth.vue'
import Dialog from 'vant-weapp/dist/dialog/dialog'
import {
  getUserProfile,
  setStorageSync,
  getStorageSync,
  getUserOpenId,
  showLoading,
  hideLoading,
  showToast,
} from '../../api/wechat'
import {
  getHomeData,
  recommend,
  freeRead,
  hotBook,
  register,
  hasSignToday,
  sign,
} from '../../api'
export default {
  components: {
    SearchBar,
    HomeCard,
    HomeBanner,
    HomeBook,
    Auth,
  },
  data() {
    return {
      hotSearch: '',
      banner: {},
      recommend: [],
      hotBook: [],
      freeRead: [],
      category: [],
      userInfo: {},
      shelfList: [],
      openId: '',
      isAuth: false,
      hasSign: false,
      continueSignDay: 0,
    }
  },
  mounted() {
    // showLoading('正在加载')
    this.userInfo = getStorageSync('userInfo')
    this.openId = getStorageSync('openId')
    this.getHomeData()
    // hideLoading()
  },
  methods: {
    onSignClick() {
      Dialog.confirm({
        title: '立即签到',
        message: '连续签到7天，有惊喜嗷~',
        confirmButtonText: '是',
        cancelButtonText: '否',
      })
        .then(() => {
          this.sign()
        })
        .catch(() => {})
    },
    sign() {
      sign(this.openId).then(() => {
        showToast('签到成功')
        this.hasSign = true
        this.continueSignDay++
        this.getSignState(this.openId)
      })
    },
    getSignState(openId) {
      const vue = this
      hasSignToday(openId).then((response) => {
        vue.hasSign = response.data.data.hasSignToday
        vue.continueSignDay = response.data.data.continueSignDay
      })
    },
    getUserProfile() {
      getUserProfile(
        (userInfo) => {
          setStorageSync('userInfo', userInfo)
          const openId = getStorageSync('openId')
          if (!openId || openId.length === 0) {
            //  未获得需 请求openId
            getUserOpenId()
          }
          register(openId, userInfo)
          this.isAuth = true
        },
        () => {
          console.log('failed...')
          this.isAuth = false
          hideLoading()
        }
      )
    },

    getHomeData() {
      const openId = getStorageSync('openId')
      getHomeData({ openId })
        .then((response) => {
          const {
            data: {
              hotSearch: { keyword },
              banner,
              recommend,
              hotBook,
              freeRead,
              category,
              shelf,
            },
          } = response.data
          this.hotSearch = keyword
          this.banner = banner
          this.recommend = recommend
          this.hotBook = hotBook
          this.freeRead = freeRead
          this.category = category
          this.shelfList = shelf
          //   hideLoading()
        })
        .catch((err) => {
          //   hideLoading()
        })
    },

    onSearchBarClick() {
      //跳转到搜索页面
      //相对路径:pages/search/main
      //绝对路径:/pages/search/main
      this.$router.push({
        path: '/pages/search/main',
        query: {
          hotSearch: this.hotSearch,
        },
      })
    },
    onBannerClick() {
      console.log('banner click')
    },
    onCategoryMoreClick() {
      this.$router.push({
        path: '/pages/categoryList/main',
      })
    },
    //点击换一批的触发事件
    recommendChange(key) {
      // console.log(key);
      switch (key) {
        case 'recommend':
          recommend().then((response) => {
            this.recommend = response.data.data
          })
          break
        case 'freeRead':
          freeRead().then((response) => {
            this.freeRead = response.data.data
          })
          break
        case 'hotBook':
          hotBook().then((response) => {
            this.hotBook = response.data.data
          })
          break
      }
    },

  },
}
</script>

<style lang="scss" scoped>
>>>>>>> 3565444 (项目大致完成版)
</style>
