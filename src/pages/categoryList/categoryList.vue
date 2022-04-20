<template>
  <div>
      <HomeBook
        :row="category.length/2"
        :col="2"
        :data="category"
        mode="category"
        :showBtn="false"
        :showTitle="false"
      />
  </div>
</template>

<script>
import HomeBook from '../../components/home/HomeBook.vue';
import {categoryList} from '../../api';
export default {
  name: 'categoryList',
  components: {
    HomeBook,
  },
  data() {
    return {
        category:[]
    }
  },

  mounted() {
      categoryList().then(response=>{
          this.category=response.data.data
      })
  },

  methods: {
  
  },
}
</script>

<style lang="scss" scoped>
</style>