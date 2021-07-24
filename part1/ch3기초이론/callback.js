// Quiz1 출력 순서

console.log('a');

setTimeout(() => {
  console.log('b');
}, 0);

console.log('c');

// 1, 3, 2 순으로 출력, 1, 3을 출력하고 call stack이 빈 상태에서 callback을 실행
