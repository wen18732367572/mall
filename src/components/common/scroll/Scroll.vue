<template>
  <div ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>
<script>
import BScroll from 'better-scroll'
export default {
  name:"Scroll",
  data(){
    return{
      scroll:null
    }
  },
  props:{
    probeType:{
      type:Number,
      default:0
    },
    pullUpLoad:{
      type:Boolean,
      default:false
    },
    data:{
      type:Array,
      default(){
        return []
      }
    }
  },
  mounted() {
       setTimeout(this._initScroll,20)
  },
  methods: {
    _initScroll(){
        this.scroll = new BScroll(this.$refs.wrapper,{
        click:true,
        observeDOM:true,   //可以利用$bus代替
        probeType:this.probeType,
        mouseWheel:true  ,//适应鼠标滚轮
        pullUpLoad:this.pullUpLoad
      })
      
      //监听滚动的位置
     if(this.probeType == 2 || this.probeType==3){
        this.scroll.on('scroll',(position)=>{
        this.$emit('scroll',position)
      })
     }
       //监听scroll滚动到底部
        if(this.pullUpLoad)
        {
          this.scroll.on('pullingUp',()=>{
            this.$emit('pullingUp')
          })

        }
    },
    scrollTo(x,y,time=300)
    {
     this.scroll && this.scroll.scrollTo(x,y,time=300)
    },
    finishPullUp(){
      this.scroll && this.scroll.finishPullUp()
    },
    refresh(){
      //如果scroll为false  则后面代码不会执行
      this.scroll && this.scroll.refresh()
    },
    getScrollY(){
      return this.scroll ? this.scroll.y:0
    }
  },  
  watch:{
    data(){
      setTimeout(this.refresh,20)
    }
  }
}
</script>