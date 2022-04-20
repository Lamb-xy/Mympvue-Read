<template>
  <div class="user-info-wrapper">
    <div class="user-info">
      <div class="user-nick-name">{{userInfo.nickName}}</div>
      <div class="user-read-time">你已经加入[小羊Read]{{readDay}}天了</div>
      <div class="user-avatar-wrapper">
        <img class="user-avatar" :src="userInfo.avatarUrl" mode="widthFix">
      </div>
    </div>
    <div class="user-extra">
      <div class="user-extra-text">你的书架中共有 {{num}} 本好书</div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      num: Number,
      readDay: Number,
      userInfo: Object
    }
  }
</script>

<style lang="scss" scoped>
  .user-info-wrapper {
    margin: 15px 25px;
    background: #b0c0e2;
    border-radius: 12px;
    padding: 15px 20px;
    border: 1px solid #c3d1e7;

    .user-info {
      position: relative;
      height: 60px;
      border-bottom: 1px solid #E9E9E9;

      .user-nick-name {
        font-size: 17px;
        font-weight: 500;
        color: #333;
      }

      .user-read-time {
        font-size: 12px;
        color: #868686;
      }

      .user-avatar-wrapper {
        position: absolute;
        right: 0;
        top: 0;

        .user-avatar {
          width: 40px;
          border-radius: 50%;
        }
      }
    }

    .user-extra {
      margin-top: 15px;

      .user-extra-text {
        font-size: 12px;
        color: #666;
        font-weight: 500;
      }
    }
  }
</style>