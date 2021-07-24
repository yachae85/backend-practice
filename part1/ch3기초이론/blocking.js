// Quiz2 5초동안 메세지 출력

setInterval(() => {
  console.log('Baek');
  while (true) {}
}, 1000);

// 1번, while loop가 도는 동안 call stack이 절대 비지 않음, 즉 setInterval이 아무리 콜백을 쌓아도 메인 스레드에서 실행 불가
// 이 경우 event loop를 block한다고 함
