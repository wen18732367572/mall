<template>
  <div class="toast" v-show="isShow">
        {{message}}
  </div>
</template>
<script>
export default {
  name:"Toast",
  props:{
    // message:{
    //   type:String,
    //   default:''
    //   //只有数组和对象对象需要return
    // },
    // show:{
    //   type:Boolean,
    //   default:false
    // }
  },
  data(){
    return{
      message:'',
      isShow:false
 }
  },
  methods: {
    show(message="默认文字",duration=1500)
    { 
      this.isShow = true
      this.message = message
      setTimeout(() => {
        this.isShow = false
        this.message = ''
      }, duration);
    }
  },
}
</script>
<style scoped>
  .toast{
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    padding: 8px 10px;
    color: white;
    background-color: #000;
    opacity: 0.75;
    /* background-color: rgba(0,0,0,.75); */
    z-index: 999;
    animation-name: toast;
    /* animation-duration: 1.5s;
    animation-timing-function: ease-out;
    animation-direction: alternate-reverse; */
  }
  /* @keyframes toast{
   from{opacity: 0.3;}
   to{opacity: 0.7;}
  } */
</style>