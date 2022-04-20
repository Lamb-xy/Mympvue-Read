<template>
  <div class="search">
    <SearchBar
      :focus="searchFocus"
      @onChange="onChange"
      @onClearClick="onClearClick"
      :hotSearch="hotSearchKeyword"
      @onConfirm="onConfirm"
      ref="searchBar"
    />
    <TagGroup
      headerText="热门推荐"
      btnText="换一批"
      :tags="hotSearchArray"
      @onTagClick="searchKeyWord"
      @onBtnClick="changeHotSearch"
      v-if="hotSearchArray.length > 0 && !showList"
    />
    <TagGroup
      headerText="历史搜索"
      btnText="清空"
      :tags="historySearch"
      @onTagClick="searchKeyWord"
      @onBtnClick="clearHistorySearch"
      v-if="historySearch.length > 0 && !showList"
    />
    <SearchList :searchList="searchList" v-if="showList" />
  </div>
</template>

<script>
import SearchBar from '../../components/home/SearchBar.vue'
import TagGroup from '../../components/base/TagGroup.vue'
import SearchList from '../../components/search/SearchList.vue'
import { setStorageSync, getStorageSync, showToast } from '../../api/wechat'
import { search, hotSearch } from '../../api'
export default {
  name: 'Search',
  computed: {
    searchList() {
      return {
        searchList: this.searchList,
      }
    },
    showList() {
      const keys = Object.keys(this.searchList)
      return keys.length > 0
    },
    //对获取到的hotSearch做处理
    hotSearchArray() {
      const _hotSearch = []
      this.hotSearch.forEach((object) => _hotSearch.push(object.title))
      return _hotSearch
    },
  },
  data() {
    return {
      hotSearch: [],
      hotSearchKeyword: '',
      historySearch: [],
      searchList: {},
      searchFocus: true,
      openId: '',
      page: 1,
    }
  },
  components: {
    SearchBar,
    TagGroup,
    SearchList,
  },
  onShow() {
    this.openId = getStorageSync('openId')
    hotSearch().then((response) => {
      // console.log(response);
      //这里获取到的hotSearch是数组对象，实际需要是是字符串（title）数组
      this.hotSearch = response.data.data
    })
    this.hotSearchKeyword = this.$route.query.hotSearch
    // console.log(this.$router.query.hotSearch);
    this.historySearch = getStorageSync('historySearch') || []
    this.page=1
  },
  //调用声明周期函数：页面滑动
  onPageScroll() {
    if (this.searchFocus) {
      this.searchFocus = false
    }
  },
  onReachBottom() {
    if (this.showList) {
      this.page++
      const searchWord = this.$refs.searchBar.getValue()
      search({
        keyword: searchWord,
        openId: this.openId,
        page: this.page,
      }).then((response) => {
          console.log(response);
        const { book } = response.data.data
        if (book && book.length > 0) {
          this.searchList.book.push(...book)
        } else {
          showToast('没有更多数据了~')
        }
      })
    }
  },
  methods: {
    //点击清除按钮事件
    onClearClick() {
      this.searchList = {}
    },
    //搜索按钮提交事件
    onConfirm(keyword) {
      //1.判断是否有搜索关键词
      //没有则获取热门搜索词
      //3.提交完成将搜索框失去焦点
      if (!keyword || keyword.trim().length === 0) {
        keyword = this.hotSearchKeyword
        this.$refs.searchBar.setValue(keyword)
      } else {
        //有则根据搜索关键词搜索
      }
      this.onSearch(keyword)
      //2.历史搜索结果里面不包含关键词，则将关键词写入历史搜索
      if (!this.historySearch.includes(keyword)) {
        this.historySearch.push(keyword)
        setStorageSync('historySearch', this.historySearch)
      }
      this.searchFocus = false
      console.log('onConfirm..', keyword)
    },
    //换一批
    changeHotSearch() {
      //   console.log('changeHotSearch...')
      hotSearch().then((response) => {
        // console.log(response);
        //这里获取到的hotSearch是数组对象，实际需要是是字符串（title）数组
        this.hotSearch = response.data.data
      })
    },
    //清除历史搜索
    clearHistorySearch() {
      this.historySearch = []
      setStorageSync('historySearch', [])
    },
          onHotSearchClick(keyword) {
        const index = this.hotSearch.indexOf(keyword)
        const fileName = this.hotSearchKey[index]
        this.$router.push({ path: '/pages/detail/main', query: { fileName } })
      },
    //搜索关键词
    searchKeyWord(text) {
console.log('@@',text);
      this.$refs.searchBar.setValue(text)
      this.onSearch(text)
    },
    //输入框改变
    onChange(keyword) {
      // console.log(keyword);
      if (keyword || keyword.trim().length === 0) {
        this.searchList = {}
        return
      }
      this.page=1
      this.onSearch(keyword)
    },
    //调用搜索接口
    onSearch(keyword) {
      search({
        keyword,
        openId: this.openId,
        page: this.page,
      }).then((response) => {
        this.searchList = response.data.data
      })
    },
  },
}
</script>

<style lang="scss" scoped>
</style>