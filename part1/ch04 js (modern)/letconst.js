//아래의 코드는 문제가 없다.
let a = 'a';
console.log(a);
a = 'b';
console.log(a);

//아래의 코드는 에러가 발생한다.
const b = 'b';
console.log(b);
b = 'a';
console.log(b);

//var와 let의 차이
var c = 10;
var c = 11;
let d = 10;
let d = 11;
// var는 같은 스코프 내에서 같은 변수를 두 번 이상 정의할 수 있지만 let은 불가능
