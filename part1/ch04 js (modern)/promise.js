// new Promise((resolve, reject) => {
//   console.log("Inside promise");
//   resolve("First reslove");
//   reject("First reject");
//   // resolve와 reject는 먼저 실행된 값으로 결정
// })
//   .then((v) => {
//     console.log(v);
//   })
//   .catch((e) => {
//     console.log(e);
//   });

// new Promise((resolve, reject) => {
//   console.log("Before timeout");
//   setTimeout(() => {
//     resolve(Math.random());
//     console.log("After timeout");
//   }, 1000);
// })
//   .then((v) => {
//     console.log(v);
//   })
//   .then(() => {
//     console.log("then2");
//   })
//   .then(() => {
//     console.log("then3");
//   });

function returnPromise() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(Math.random());
    }, 1000);
  });
}

returnPromise()
  .then((v) => {
    console.log(v);
    return returnPromise();
  })
  .then((v) => {
    console.log(v);
    return returnPromise();
  })
  .then((v) => {
    console.log(v);
    return returnPromise();
  })
  .then((v) => {
    console.log(v);
    return returnPromise();
  });

returnPromise();
