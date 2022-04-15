<template>
  <div class="auth-wrapper">
    <div class="auth">
      <div class="auth-info">
        <div class="auth-img">
          <ImageView src="http://127.0.0.1/images/logo.png" height="74px" mode="aspectFit" round />
        </div>
        <div class="sub-title">登录小羊Read</div>
        <div class="title">一起来阅读吧~</div>
      </div>
      <!-- 使用微信button按钮给小程序授权 -->
      <button
        class="auth-button"
        @tap="getUserProfile"
      >
        获取头像昵称
      </button>
    </div>
  </div>
</template>

<script>
import ImageView from '../base/ImageView.vue'
export default {
  name: 'Auth',
  components: {
    ImageView,
  },
  data() {
    return {}
  },

  mounted() {},

  methods: {
    getUserProfile() {
      this.$emit('getUserProfile')
    },
  },
}
</script>

<style lang="scss" scoped>
.auth-wrapper {
  //生成相对于浏览器窗口绝对定位的元素属性
  position: fixed;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #999999;
  .auth {
    position: relative;
    width: 270px;
    height: 248px;
    background: #f5f5f5;
    border-radius: 18px;
    .auth-info {
      margin-top: 22.5px;
      margin-bottom: 40px;
      display: flex;
      flex-direction: column;
      align-items: center;
      .auth-img {
        width: 74px;
        height: 74px;
      }
      .sub-title {
        font-size: 13px;
        color: #999999;
        line-height: 18.5px;
        margin-top: 18px;
      }
      .title {
        margin-top: 3.5px;
        font-size: 16.5px;
        color: #333;
        font-weight: 500;
        line-height: 22.5px;
      }
    }
    .auth-button {
      background-image: linear-gradient(90deg, #91a5e8 0%, #7183d2 100%);
      position: absolute;
      bottom: 0;
      width: 100%;
      height: 49px;
      line-height: 49px;
      font-size: 15px;
      font-weight: 500;
      color: #fff;
      border: none;
      border-radius: 0 0 18px 18px;
    }
  }
}
</style>