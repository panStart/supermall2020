<template>
  <div class="mask" >
      <img src="~assets/img/mask/loading.png" alt="">
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.mask{
    position:fixed;
    height: 100%;
    width: 100%;
    z-index: 10;
    text-align: center;
    padding-top: 200px;
}
.mask img{
  width: 128px;
  height: 80px;
}
</style>