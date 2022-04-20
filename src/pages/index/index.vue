<template>
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
        img="https://c-ssl.duitang.com/uploads/blog/202108/19/20210819104153_1af8f.thumb.1000_0.jpeg_webp"
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
  </div>
</template>

<script>
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
  getUserOpenId as getOpenId,
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
        const vue = this
        const onOpenIdComplete = (vue, openId, userInfo) => {
        // showLoading('正在努力加载中~')
          vue.openId = openId
          // 获取首页数据
          vue.getHomeData(openId, hideLoading)
          // 上报用户信息，注册账号
          register(openId, userInfo)
          // 判断用户今天是否签到过
          vue.getSignState(openId)
        }
      getUserProfile(
        (userInfo) => {
            vue.userInfo = userInfo
            setStorageSync('userInfo', userInfo)
            const openId = getStorageSync('openId')
            console.log('openId', openId)
            if (!openId || openId.length === 0) {
              getOpenId((openId) => {
                onOpenIdComplete(vue, openId, userInfo)
              })
            } else {
              onOpenIdComplete(vue, openId, userInfo)
            }
          this.isAuth = true
          hideLoading()
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
</style>
