// case 1

const y = 2;
function foo1() {
  const z = 3;
  return function() {
    return 'print: ' + y + ' ' + z;
  }
}

function foo2() {
    const z = 3;
    return () => {
      return 'print: ' + y + ' ' + z;
    }
}


alert(foo1()()); // print: 2 3
alert(foo2()()); // print: 2 3

// case 2

var name = "The Window";

var object1= {
    name : "My Object",
    getNameFunc : function(){
        return function(){
            return this.name;
        };
    }
};

var object2= {
    name : "My Object",
    getNameFunc : function(){
        let that = this;
        return function(){
            return that.name;
        };
    }
};


alert(object1.getNameFunc()()); // "The Window"
alert(object2.getNameFunc()()); // "My Object"