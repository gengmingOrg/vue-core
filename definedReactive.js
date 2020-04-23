import Dep from './Dep.js'
import Observer from './observer'
function definedReactive(data, key, val) {
  /**
    如果传进来的是data 是一个对象 就要进行递归调用 保证让所有的对象变成响应式
  */
  if (typeof data == 'object' ) new Observer(val)
  let dep = new Dep()
  Object.definedProperty(data, key, {
    enumerable: true,
    configurable: true,
    writable: true,
    get (){
      dep.depend() // 收集谁 （）
      return val
    },
    set(newVal){
      if(val == newVal){
        return
      }
      val = newVal
      dep.notify() //通知谁
    }
  })
}

var obj = new Proxy({}, {
  get: function (target, propKey, receiver) {
    console.log(`getting ${propKey}!`);
    return Reflect.get(target, propKey, receiver);
  },
  set: function (target, propKey, value, receiver) {
    console.log(`setting ${propKey}!`);
    return Reflect.set(target, propKey, value, receiver);
  },
  deleteProperty (target, key) {
    delete target[key];
    console.log(`delete ${key}!`);
    return true;
  }
});
