import { ADD_COUNTER,ADD_TO_COUNTER } from "./mutations-types"
//将mutations抽取为常量
export default {
   //mutations唯一的目的就是修改state中状态
  //mutations中的每个方法尽可能完成的事件比较单一

  [ADD_COUNTER](state,payload){
    payload.count++
  },
  [ADD_TO_COUNTER](state,payload)
  { 
    payload.checked = true
    state.cartList.push(payload)
  }
}