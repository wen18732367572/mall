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
    }
  },
  mounted() {
        
        this.scroll = new BScroll(this.$refs.wrapper,{
        click:true,
        observeDOM:true,
        probeType:this.probeType,
        mouseWheel:true  ,//适应鼠标滚轮
        pullUpLoad:this.pullUpLoad
      })
      
      //监听滚动的位置
      this.scroll.on('scroll',(position)=>{
        this.$emit('scroll',position)
      })
      //上拉加载更多
      this.scroll.on('pullingUp',()=>{
        this.$emit('pullingUp')
      })
      
  },
  methods: {
    scrollTo(x,y,time=300)
    {
      this.scroll.scrollTo(x,y,time=300)
    },
    finishPullUp(){
      this.scroll.finishPullUp()
    }
  },  
}
</script>