//executer func
let promise1 = new Promise(function (resolve, reject) {
  setTimeout(() => {
    console.log("water fetched");
    resolve();
  }, 1000);
});
//consumer func
// const grandparentcooking = () => {
promise1.then(() => {
  console.log("got water");
});
// };

let promise2 = new Promise(function (resolve, reject) {
  setTimeout(() => {
    resolve("fetched the water");
  }, 2000);
});

const grandparentcooking = () => {
  promise2.then((result) => {
    console.log(`cooking with the ${result}`);
  });
};

grandparentcooking();

let promise3 = new Promise(function (resolve, reject) {
  setTimeout(() => {
    reject(
      new Error(
        "Jack fell down and broke his crown. And Jill came tumbling after."
      )
    );
  }, 2000);
});

promise3
  .catch(function (error) {
    console.log(error);
    console.log(`OMg ${error.message}`);
  })
  .finally(() => {
    console.log("anything");
  });

//promise chain rule

let getuser = new Promise(function (resolve, reject) {
  const user = {
    name: "John Doe",
    email: "jdoe@email.com",
    password: "jdoe.password",
  };
  resolve(user);
});

getuser
  .then((user) => {
    console.log(`${user.name}`);
    return new Promise(function (resolve, reject) {
      setTimeout(() => {
        resolve("banglore");
      }, 2000);
    });
  })
  .then((address) => {
    console.log(`User address is ${address}`);
  });

let getuser2 = new Promise(function (resolve, reject) {
  const user = {
    name: "shizuka chan",
    email: "shizuka@email.com",
    permissions: ["db", "hr", "dev"],
  };
  resolve(user);
});

getuser2
  .then((user) => {
    console.log(`${user.name}`);
    if (user.permissions.includes("hr")) {
      throw new Error("You are not allowed to access the HR module.");
    }
    return user.email;
  })
  .then((email) => {
    console.log(`User email is ${email}`);
  })
  .catch((error) => {
    console.log(error);
  });

//now promises using async await

// async function fetchUserDetails(userId) {
//   return { name: "Robin", likes: ["toys", "pizzas"] };
// }
//using arrow function
const fetchUserDetails = async (userId) => {
  return { name: "Robin", likes: ["toys", "pizzas"] };
};

// const user = await fetchUserDetails();
// console.log(user);

// fetchUserDetails.then((user) => console.log(user));

//cannot use await inside a non async function , we can use the await with a non-async function but, we can not use it within(or inside) a non-async function.

const validateUser = ({ userId, password }) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (userId && password) {
        resolve(`${userId} you have been authenticated successfully!!!`);
      } else {
        reject({ message: "userId or Password could be blank!" });
      }
    }, 2000);
  });
};

const app = async () => {
  const data = {
    userId: "",
    password: "",
  };

  try {
    console.log("Initializing...");
    const result = await validateUser(data);
    console.log(result);
  } catch (e) {
    console.error(e.message);
  }
};
app();
