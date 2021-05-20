import Vue from 'vue'
import VueRouter from 'vue-router'

const Home=()=>import('../views/Home/Home')
const Category=()=>import('../views/Category/Category')
const Profile=()=>import('../views/Profile/Profile')
const ShopCart=()=>import('../views/ShopCart/ShopCart') 
const Detail=()=>import('../views/Detail/Detail')


const routes=[
  {
    path:'',
    redirect:"/home"
  },
  {
    path:'/home',
    component:Home
  },
  {
    path:'/category',
    component:Category
  },
  {
    path:'/shopCart',
    component:ShopCart
  },
  {
    path:'/profile',
    component:Profile
  },
  {
    path:'/detail/:iid',
    component:Detail
  },
  
]


Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
