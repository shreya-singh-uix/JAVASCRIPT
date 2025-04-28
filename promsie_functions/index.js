//Promise.all()

const p1 = Promise.resolve(132);
const p2 = 34;
const p3 = new Promise((resolve, reject) => {
  setTimeout(() => {
    console.log("promise all functionality");
    resolve("foo");
  }, 100);
});
Promise.all([p1, p2, p3]).then((values) => {
  console.log(values);
});

const p11 = Promise.all([1, 2, 3]);
const p21 = Promise.all([1, 2, 3, Promise.resolve(444)]);
const p31 = Promise.all([1, 2, 3, Promise.reject(555)]);

setTimeout(() => {
  console.log(p11);
  console.log(p21);
  console.log(p31);
});

const promise11 = new Promise((resolve, reject) => {
  setTimeout(() => resolve("one"), 1000);
});
const promise21 = new Promise((resolve, reject) => {
  setTimeout(() => resolve("two"), 2000);
});
const promise31 = new Promise((resolve, reject) => {
  setTimeout(() => resolve("three"), 3000);
});
const promise41 = new Promise((resolve, reject) => {
  setTimeout(() => resolve("four"), 4000);
});
const promise51 = new Promise((resolve, reject) => {
  reject(new Error("reject"));
});

Promise.all([promise11, promise21, promise31, promise41, promise51])
  .then((values) => {
    console.log(values);
  })
  .catch((error) => {
    console.log(error.message);
  });

//Promise.allSettled

const promises = [promise21, promise51];
Promise.allSettled(promises).then((results) => {
  results.forEach((result) => console.log(result.status));
});

//Promise.any()
const promise1 = Promise.reject(0);
const promise2 = new Promise((resolve, reject) =>
  setTimeout(() => {
    resolve("quick");
  }, 2000)
);
const promise3 = new Promise((resolve, reject) => {
  setTimeout(() => {
    // reject(new Error("not passed"));
    resolve("slow");
  }, 1000);
});
const promisess = [promise1, promise2, promise3];
Promise.any(promisess).then((value) => console.log(value));

//Promise.race();

Promise.race(promisess)
  .then((value) => console.log(value))
  .catch((e) => {
    console.log(e);
  });

//Promise.reject()
//it returns a value that is rejected
function resolved(result) {
  console.log("Resolved");
}

function rejected(result) {
  console.log(result);
}

Promise.reject(new Error("fail")).then(resolved, rejected);

//Promise.resolve() value is passed as a parameter to it and then is applied to consume the value
