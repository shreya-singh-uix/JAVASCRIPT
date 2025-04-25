//Promise.race

function myrace(promises) {
  return new Promise((resolve, reject) => {
    for (let i = 0; i < promises.length; i++) {
      //   promises[i].then((value) => console.log("race:", value));
      break;
      Promise.resolve(promises[i]).then(resolve).catch(reject);
    }
  });
}
const promise0 = Promise.reject(0);
const promise1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve("fast");
  }, 2000);
});
const promises = [promise0, promise1];
console.log("race : ", myrace(promises));

//Promise.all

// function myAll(promises) {
//   return new Promise((resolve, reject) => {
//     promises.forEach((promise) => {
//       promise
//         .then((data) => resolve(data))
//         .catch((err) => {
//           reject(new Error("failed"));
//         });
//     });
//   });
// }
function myAll(promises) {
  return new Promise((resolve, reject) => {
    const result = [];
    if (promises.length === 0) {
      resolve(result);
      return;
    }
    let count = promises.length;
    promises.forEach((promise, index) => {
      Promise.resolve(promise)
        .then((value) => {
          result[index] = value;
          count--;
          if (count === 0) {
            resolve(result);
          }
        })
        .catch((err) => {
          reject(err);
        });
    });
  });
}
console.log("all", myAll(promises));

// myAll(promises);

//Promise.any()

function myAny(promises) {
  return new Promise((resolve, reject) => {
    let errorCount = 0;
    promises.forEach((promise) => {
      promise
        .then((data) => resolve(data))
        .catch((err) => {
          errorCount++;
          if (errorCount === promises.length) {
            reject(new Error("No promise resolved"));
          }
        });
    });
  });
}

console.log("any:", myAny(promises));

//Promise.allSettled

function myallSettled(promises) {
  const results = [];
  let completed = 0;
  return new Promise((resolve) => {
    for (let i = 0; i < promises.length; i++) {
      Promise.resolve(promises[i])
        .then((value) => {
          results[i] = { status: "fulfilled", value };
        })
        .catch((reason) => {
          results[i] = { status: "rejected", reason };
        })
        .finally(() => {
          completed++;
          if (completed === promises.length) {
            resolve(results);
          }
        });
    }
  });
}

console.log("allSettled:", myallSettled(promises));
