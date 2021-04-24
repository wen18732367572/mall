import Vue from 'vue'
import VueRouter from 'vue-router'

const Home=()=>import('../views/Home/Home')
const Category=()=>import('../views/Category/Category')
const Profile=()=>import('../views/Profile/Profile')
const ShopCart=()=>import('../views/ShopCart/ShopCart') 

const routes=[
  {
    path:'',
    redirect:"/home"
  },
  {
    path:'/Home',
    component:Home
  },
  {
    path:'/Category',
    component:Category
  },
  {
    path:'/ShopCart',
    component:ShopCart
  },
  {
    path:'/Profile',
    component:Profile
  }
]


Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
