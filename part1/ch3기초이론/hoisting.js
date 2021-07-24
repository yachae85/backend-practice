console.log(x);
var x = 1;

//undefined 출력, 같은 scope안에 선언되어서 참조는 가능하지만 초기화가 되어있지 않음
//hoisting은 변수의 선언을 해당 스코프의 맨 위로 끌어올리는 것을 뜻함

console.log(foo());
function foo() {
  return 'foo';
}

console.log(foo2());

var foo2 = function () {
  return 'aaa';
};

//함수는 선언과 초기화가 변수와 다름, 함수는 선언만 존재해 그대로 위로 끌어 올라가도 상관 없음
