// function parallel(funcs) {
//   return function (finalCallback, inputData) {
//     const results = [];
//     let completed = 0;
//     let hasError = false;

//     funcs.forEach((fn, index) => {
//       fn((err, data) => {
//         if (hasError) return;

//         if (err) {
//           hasError = true;
//           finalCallback(err, undefined);
//           return;
//         }

//         results[index] = data;
//         completed++;

//         if (completed === funcs.length) {
//           finalCallback(undefined, results);
//         }
//       }, inputData);
//     });
//   };
// }

function parallel(promises) {
  return new Promise((resolve, reject) => {
    const result = [];
    if (promises.length === 0) {
      resolve(result);
      return;
    }

    // let count = 0;
    let index = 0;
    for (const promise of promises) {
      promise.then((value) => {
        result[index] = value;
        //   count++;
        index++;
        if (index == promises.length) {
          resolve(result);
        }
      });
    }
  });
}

const e = (x) => {
  return new Promise((callback) => {
    setTimeout(() => {
      callback(null, x);
    }, x * 1000);
  });
};
const tasks = [e(2), e(3), e(4)];
// const all = parallel2([e(2), e(3), e(4)]);
// console.log(all);
console.log(parallel(tasks));
