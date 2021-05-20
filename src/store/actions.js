import { ADD_COUNTER,ADD_TO_COUNTER } from "./mutations-types"
export default{
  addCart(context,payload){
    return new Promise((resolve,reject)=>{
        //payload新添加的商品
    // let oldProduct = null;
    // for(let item of state.cartList)
    // {
    //   if(item.iid == payload.iid)
    //   {
    //     oldProduct = item;
    //   }
    // }
    //查找之前数组中是否有该商品
    let oldProduct = context.state.cartList.find(function(item){
      return item.iid == payload.iid
    })
    //判断old是否有值 
    if(oldProduct)
    {
      // oldProduct.count += 1
      context.commit(ADD_COUNTER,oldProduct)
      resolve('当前商品数量+1')
    }
    else{//添加了新的商品
      payload.count = 1
      // context.state.cartList.push(payload)
      context.commit(ADD_TO_COUNTER,payload)
      resolve('添加了新的商品')
    }
    })
  }
}