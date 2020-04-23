export default class Dep() {
  constructor(){
    this.subs = []
  }
  addSub(sub) {
    this.subs.push(sub)
  }
  removeSub(sub){
    remove(subs, sub)
  }
  notify(){
    const subs = this.subs
    for (var i = 0; i < subs.length; i++) {
      subs[i].update()
    }
  }
  depend(){
    if(window.target){
      this.addSub(window.target)
    }
  }
}

function remove(arr, item){
  return arr.splice(arr.indexOf(item), 1)
}
