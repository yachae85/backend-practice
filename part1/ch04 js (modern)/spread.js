// object merge #1 병합
const a = {
  name: 'aaa',
  phone: 'bbb',
};

const b = {
  age: 'ccc',
  address: 'ddd',
};

const c = {
  ...a,
  ...b,
};

console.log(c); //{ name: 'aaa', phone: 'bbb', age: 'ccc', address: 'ddd' }

// object merge #2 덮어쓰기

const newValue = {
  phone: '01011111111',
};

const oldValue = {
  name: 'baek',
  phone: '01001011010',
  address: 'seoul',
  ...newValue, //spread가 앞에오면 sperad의 갚에 oldValue의 갚이 덮어써짐, 순서중요!
};

console.log(oldValue); // { name: 'baek', phone: '01011111111', address: 'seoul' }

// object rest
const people = {
  myName: 'baek',
  phone: '010101010101',
  address: 'seoul',
};

const { myName, ...info } = people;
console.log(myName); // baek
console.log(info); // { phone: '010101010101', address: 'seoul' }
// ...을 사용하면 myName을 제외한 나머지 property가 info에 들어간다.

// array merge #1 병합

const pc = ['mac', 'window'];
const smartPhone = ['ios', 'android'];
const os = [...pc, ...smartPhone];
console.log(os); // [ 'mac', 'window', 'ios', 'android' ]
// 배열도 object처럼 병합할 수 있다.

// array rest

const 
