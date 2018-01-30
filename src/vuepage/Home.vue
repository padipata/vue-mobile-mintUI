<template>
  <div class="aaa" @click="mint">
    <div class="bbb">
      Hello,World!
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {setTitle} from '../jslib/SetTitle'
  import {Toast} from 'mint-ui'

  export default {
    data() {
      return {}
    },
    components: {},
    methods: {
      mint() {
        Toast('提示语')
      }
    },
    mounted() {
      setTitle('title')
    }
  }
</script>

<style scoped lang="less">
  .aaa {
    .bbb {
      font-size: 0.30rem;
    }
  }
</style>

