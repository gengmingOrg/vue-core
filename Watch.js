class Watch {
  constructor(vm, expOrFn, cb) {
    this.vm = vm;
    this.getter = parsePath(expOrFn)
    this.cb = cb
    this.value = this.get()
  }
  get() {
    window.target = this;
    var value = this.getter.call(this.vm, this.vm)
    window.target = undefined
    return value
  }
  update() {
    var oldeVal = this.value
    this.value = this.get()
    this.cb.call(this.vm, this.value, oldVal)
  }
}
function parsePath(path){
  const segments = path.split('.')
  return function (obj) {
    for (var i = 0; i < segments.length; i++) {
      if(!obj) return
      obj = obj[segments.[i]]
    }
    return obj
  }
}
