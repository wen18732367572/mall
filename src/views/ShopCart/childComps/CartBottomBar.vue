<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-button
        @click.native="checkClick"
        :is-checked="isSelectAll"
        class="check-button"
      ></check-button>
      <span>全选</span>
    </div>
    <div class="price">合计:{{ totalPrice }}</div>
    <div class="calculate">去计算:({{ checkedLength }})</div>
  </div>
</template>
<script>
import CheckButton from "components/content/checkButton/CheckButton";
export default {
  name: "CartBottomBar",
  components: {
    CheckButton,
  },
  computed: {
    totalPrice() {
      return (
        "￥" +
        this.$store.state.cartList
          .filter((item) => {
            return item.checked;
          })
          .reduce((preValue, item) => {
            return preValue + item.price * item.count;
          }, 0)
          .toFixed(2)
      );
    },
    checkedLength() {
      return this.$store.state.cartList.filter((item) => {
        return item.checked;
      }).length;
    },
    isSelectAll() {
      //1.filter使用
      // if(this.$store.state.cartList.length === 0) return false
      //  return !(this.$store.state.cartList.filter(item=>{
      //     item.checked
      //   }).length)

      // 2.find使用
      // if(this.$store.state.cartList.length === 0) return false
      // return !this.$store.state.cartList.find(item=>!item.checked)

      //3.普通遍历方法
      if (this.$store.state.cartList.length === 0) return false;
      for (let item of this.$store.state.cartList) {
        if (!item.checked) {
          return false;
        }
      }
      return true;
    },
  },
  methods: {
    checkClick() {
      if (this.isSelectAll) {  //全部选中
        this.$store.state.cartList.forEach(item => item.checked = false);
      }
      else{
        //部分或全部不选中
        this.$store.state.cartList.forEach(item=>item.checked = true)
      }
    },
  },
};
</script>
<style scoped>
.bottom-bar {
  height: 40px;
  position: relative;
  background-color: #f0f0f0;
  line-height: 40px;
  display: flex;
  font-size: 14px;
}
.check-content {
  display: flex;
  align-items: center;
  margin-left: 10px;
  width: 60px;
}
.check-button {
  width: 20px;
  height: 20px;
  line-height: 22px;
  margin-right: 5px;
}
.price {
  margin-left: 20px;
  flex: 1;
}
.calculate {
  width: 90px;
  color: #fff;
  background-color: red;
  text-align: center;
}
</style>