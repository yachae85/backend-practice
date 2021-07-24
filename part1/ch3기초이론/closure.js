function and(x) {
  return function print(y) {
    return x + "and" + y;
  };
}

const saltAnd = and("salt");
console.log(saltAnd("pepper"));
console.log(saltAnd("sugar"));

//saltAnd 의 closure
// 함수 : print
// 환경: x -> "salt"
// closure는 higer-order function을 만드는 데 유용
