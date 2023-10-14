<template lang="">
  <div class="content">
    <img src="@/assets/img/search.png" />
    <p>لا يوجد بيانات مطابقة للبحث المطلوب</p>
  </div>
</template>
<script>
export default {};
</script>

<style lang="scss" scoped>
.content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 500px;

  p {
    color: var(--secondary-color, #444545);
    text-align: center;
    font-family: Suisse Intl;
    font-size: 20px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
}
</style>
