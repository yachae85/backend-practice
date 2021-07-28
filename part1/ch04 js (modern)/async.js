async function sleep() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(undefined);
    }, 1000);
  });
}

async function main() {
  console.log(1);
  await sleep();
  console.log(2);
  await sleep();
  console.log(3);
  await sleep();
  console.log(4);
  await sleep();
}

main();

// async function은 다른 async function 안에서 await 가능
// 프로미스로 then 체이닝을 하는것보다 깔끔
