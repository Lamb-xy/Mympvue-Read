<template>
  <div class="search-bar">
    <div class="search-bar-wrapper" @click="onSearchBarClick">
      <van-icon
        class="search"
        name="search"
        size="15px"
        color="#858C96"
      ></van-icon>
      <input
        type="text"
        class="search-bar-input"
        :focus="focus"
        :disabled="disabled"
        :maxlength="limit"
        :placeholder="hotSearch.length === 0 ? '搜索' : hotSearch"
        placeholder-style="font-size: 15px;color: #ADB4BE;letter-spacing: 0;"
        v-model="searchWord"
        @input="onChange"
        confirm-type="搜索"
        @confrim="onConfirm"
      />
      <van-icon
        class="clear"
        name="clear"
        size="15px"
        color="#858C96"
        @click="onClearClick"
        v-if="searchWord.length > 0"
      ></van-icon>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Searchbar',
  props: {
    focus: {
      type: Boolean,
      default: true,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    limit: {
      type: Number,
      default: 50,
    },
    hotSearch: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      searchWord: '',
    }
  },

  methods: {
    onSearchBarClick() {
      //emit可以让父组件响应这个方法
      this.$emit('onSearchBarClick')
    },
    onClearClick() {
      this.searchWord = ''
      this.$emit('onClearClick')
    },
    onChange(e) {
      // console.log(e);
      //解构赋值
      const { value } = e.mp.detail
      //交给父组件value值
      this.$emit('onChange', value)
    },
    onConfirm(e) {
      const { value } = e.mp.detail
      console.log(value);
      this.$emit('onConfirm', value)
    },
    setValue(v) {
      this.searchWord = v
    },
    getValue() {
      return this.searchWord
    },
  },
}
</script>

<style lang="scss" scoped>
.search-bar {
  padding: 15px 15.5px 17px 15.5px;
  .search-bar-wrapper {
    display: flex;
    align-items: center;
    width: 345px;
    height: 40px;
    box-sizing: border-box;
    background: #f5f7f9;
    border-radius: 20px;
    // padding: 12px 15px;
    .search-bar-input {
      flex: 1;
      padding-top: 11.5px;
      padding-bottom: 13.5px;
    }
    .search {
      padding: 12px 8px 13px 15px;
      display: flex;
      align-items: center;
    }
    .clear {
      padding: 12px 8px 13px 15px;
      display: flex;
      align-items: center;
    }
  }
}
</style>