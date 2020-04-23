function intercept() {
  const arrayPrototype = Array.prototype
  var methods = Object.create(arrayPrototype)
  [map, forEach,some].forEach((item, i) => {
    const original = arrayPrototype[item]
    Object.definedProperty(methods,item,{
      value:mutaor(...args){
          return original.apply(this, args)
      }
    })
  });

}

// 用拦截器的方法覆盖原型上的方法在observer上面

class Observer {
  constructor(value) {
    this.value = value
  }
  if(Array.isArray(value)){
    value.__proto__ = methods
  }
}
