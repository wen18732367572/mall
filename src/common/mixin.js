import {debounce} from 'common/utils'
import BackTop from "components/content/backTop/BackTop";
import {POP, NEW, SELL} from "./const";
// import { cosh } from 'core-js/core/number';
export const itemListenerMixin={
  mounted() {
    let refresh = debounce(this.$refs.scroll.refresh)
    this.itemImageListener = ()=>{
      refresh()
    };
    this.$bus.$on('itemImgLoad',this.itemImageListener)
  },
  data(){
    return{
      // NewRefresh:null,
      itemImageListener:null
    }
  }
}

export const backTopMixin = {

  data(){
    return{
      isShowBackTop:false
    }
  },
  methods: {
    backClick() {
      //通过ref拿到组件对象  并且调用在Scroll中已经封装好的方法
      this.$refs.scroll.scrollTo(0, 0, 500);
    },
  },
  components:{
    BackTop
  }
}

export const tabControlMixin = {
  data: function () {
    return {
      currentType: POP
    }
  },
  methods: {
    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = POP
          break
        case 1:
          this.currentType = NEW
          break
        case 2:
          this.currentType = SELL
          break
      }
      console.log(this.currentType);
    }
  }
}
