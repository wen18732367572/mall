<template>
  <div class="detail">
    <detail-nav-bar
      class="detail-nav"
      @titleClick="titleClick"
     ref="nav"></detail-nav-bar>
    <!-- scroll 必须有固定高度 -->
    <scroll class="content" ref="scroll"
    :probe-type="3"  @scroll="contentScroll">
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info
        :detail-info="detailInfo"
        @imageLoad="imageLoad"
      ></detail-goods-info>
      <detail-param-info
        ref="params"
        :param-info="paramInfo"
      ></detail-param-info>
      <detail-comment-info
        ref="comment"
        :comment-info="commentInfo"
      ></detail-comment-info>
      <goods-list ref="recommend" :goods="recommends"></goods-list>
    </scroll>
    <detail-bottom-bar @addToCart="addToCart"></detail-bottom-bar>
    <back-top v-show="isShowBackTop" @click.native="backClick"></back-top>
    <!-- <toast :show="show" :message="message"></toast> -->
  </div>
</template>
<script>
import DetailNavBar from "./childComps/DetailNavBar";
import DetailSwiper from "./childComps/DetailSwiper";
import DetailBaseInfo from "./childComps/DetailBaseInfo";
import DetailShopInfo from "./childComps/DetailShopInfo";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
import DetailParamInfo from "./childComps/DetailParamInfo";
import DetailCommentInfo from "./childComps/DetailCommentInfo";
import DetailBottomBar from './childComps/DetailBottomBar'


import Scroll from "components/common/scroll/Scroll";
import GoodsList from "components/content/goods/GoodsList";
// import Toast from 'components/common/toast/Toast'

import {
  getDetail,
  Goods,
  Shop,
  GoodsParam,
  getRecommend,
} from "network/detail";

import { itemListenerMixin,backTopMixin } from "common/mixin";

import {mapActions} from 'vuex'


export default {
  name: "Detail",
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
      themeTopYs: [],
      currentIndex:0,
      // message:'',
      // show:false
    };
  },
  //混入
  mixins: [itemListenerMixin,backTopMixin],
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    DetailBottomBar,
    Scroll,
    GoodsList,
    // Toast
  },
  created() {
    this.iid = this.$route.params.iid;
    getDetail(this.iid).then((res) => {
      // 打印查看获取的数据  console.log(res)
      //获取顶部的图片轮播数据
      const data = res.result;
      this.topImages = data.itemInfo.topImages;
      //获取商品信息
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );
      //店铺信息对象
      this.shop = new Shop(data.shopInfo);
      //保存商品详情数据
      this.detailInfo = data.detailInfo;
      //获取参数信息
      this.paramInfo = new GoodsParam(
        data.itemParams.info,
        data.itemParams.rule
      );
      //获取评论的信息
      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0];
      }
      
    //   this.$nextTick(()=>{
    //     //根据最新的数据，对用的DOM已经被渲染了
    //     //但图片没有渲染出来
    //     //offsetTop值不对的时候  都是图片的问题
    //   this.themeTopYs = [];
    //   this.themeTopYs.push(0)
    //    this.themeTopYs.push(this.$refs.params.$el.offsetTop)
    //    this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
    //     this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
    // console.log(this.themeTopYs);
    //   })
    });
    //获取推荐商品数据
    getRecommend().then((res) => {
      this.recommends = res.data.list;
    });
  },
  methods: {
    ...mapActions(['addCart']),
    //图片加载的方法
    imageLoad() {
      this.$refs.scroll.refresh();
      this.themeTopYs = [];
       this.themeTopYs.push(0)
       this.themeTopYs.push(this.$refs.params.$el.offsetTop)
       this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
       this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
       this.themeTopYs.push(Number.MAX_VALUE)
      console.log(this.themeTopYs);
     
    },
    //监听加入购物车的点击
    addToCart(){
        //获取购物车需要展示的商品信息
        const product = {}
        product.image = this.topImages[0]
        product.title = this.goods.title
        product.desc = this.goods.desc
        product.price = this.goods.nowPrice
        product.iid = this.iid
        //将商品添加到购物车
        //1.promise 2.mapActions
        // this.$store.commit('addCart',product)
        // this.$store.dispatch('addCart',product).then(res=>{
        //   console.log(res);
        // }
        this.addCart(product).then(res=>{
        //  this.show = true;
        //  this.message = res;
        //  setTimeout(() => {
        //    this.show = false
        //    this.message = ''
        //  },1500);
        //显示toast
         this.$toast.show('加入购物车成功')
        })
    },
    //监听scroll滚动位置
    contentScroll(position){
         //是否显示backtop
         this.isShowBackTop = -position.y > 1000;
        // 获取y值
        const positionY=-position.y
        //positionY和主题中的值进行对比
        let length = this.themeTopYs.length
       for(let i=0;i<length-1;i++)
       {
        // if(this.currentIndex!==i && (i<length-1&&positionY >= this.themeTopYs[i]&&positionY<this.themeTopYs[i+1])
        // ||(i === length-1 && positionY >= this.themeTopYs[i]))
        // {
        //   this.currentIndex = i;
        //   this.$refs.nav.currentIndex = this.currentIndex;
        // }
        //方法2 往数组中加入一个最大的值，然后只遍历前四个  所以length-1，否则会越界
            if(this.currentIndex!==i && (positionY>=this.themeTopYs[i] && positionY < this.themeTopYs[i+1]))
            {
                this.currentIndex = i;
                this.$refs.nav.currentIndex = this.currentIndex;
                console.log(this.currentIndex);
            }
       }
    },
    //标题栏点击跳转到对应的内容
    titleClick(index) {
      this.$refs.scroll.scrollTo(0,-(this.themeTopYs[index]),200)
    },
  },
  mounted() {},
  destroyed() {
    this.$bus.$off("itemImgLoad", this.itemImageListener);
  },
  updated() {
    
  },
};
</script>
<style scoped>
.detail {
  position: relative;
  z-index: 9;
  background-color: #fff;
  height: 100vh;
}
.content {
  height: calc(100% - 44px - 49px);
}
.detail-nav {
  position: relative;
  z-index: 9;
  background-color: #fff;
}
</style>