
export class Observer {
  constructor(value) {
    this.value = value
    if(!Array.isArray(value)) this.walk(value)
  }
  walk(obj){
    const keys = Object.keys(obj)
    for (var i = 0; i < keys.length; i++) {
      definedReactive(obj, keys[i], obj[keys[i]])
    }
  }
}
