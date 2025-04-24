const fetchpizzashop = ({ longi, lat }) => {
  console.log(`Locating the nearby shop at (${longi} ${lat})`);
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      const response = {
        shopid: 122,
      };
      resolve(response);
    }, 2000);
  });
};

//fetch the pizza

const fetchpizzzas = ({ shopId }) => {
  console.log(`Getting Pizza List from the shop ${shopId}...`);
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      const response = {
        // The list of pizzas
        // available at the shop
        pizzas: [
          {
            type: "veg",
            name: "cheese-corn",
            id: "pv-7",
          },
          {
            type: "nonveg",
            name: "pepperoni slice",
            id: "pnv-124",
          },
        ],
      };
      resolve(response);
    }, 2000);
  });
};

const getmyPizza = (result, type, name) => {
  let pizzas = result.pizzas;
  console.log("Got the Pizza List", pizzas);
  let mypizza = pizzas.find((pizza) => {
    return pizza.type === type && pizza.name === name;
  });
  return new Promise(function (resolve, reject) {
    if (mypizza) {
      console.log(`✔️ Found the Customer Pizza ${mypizza.name}!`);
      resolve(mypizza);
    } else {
      reject(
        new Error(
          `❌ Sorry, we don't have ${type} ${name} pizza. Do you want anything else?`
        )
      );
    }
  });
};

const fetchBeverages = ({ pizzaid }) => {
  console.log(`🧃 Getting Beverages for the pizza ${pizzaid}...`);
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      const response = {
        id: "b-10",
        name: "cola",
      };
      resolve(response);
    }, 1000);
  });
};

const create = (endpoint, payload) => {
  if (endpoint.includes(`/api/pizzahub/order`)) {
    console.log("Placing the pizza order with...", payload);

    const { type, name, beverage } = payload;
    return new Promise(function (resolve, reject) {
      setTimeout(function () {
        resolve({
          success: true,
          message: `🍕 The ${type} ${name} pizza order with ${beverage} has been placed successfully.`,
        });
      }, 1000);
    });
  }
};

function fetch(endpoint, payload) {
  if (endpoint.includes("/api/pizzahub/shop")) {
    return fetchpizzashop(payload);
  } else if (endpoint.includes("/api/pizzahub/pizza")) {
    return fetchpizzzas(payload);
  } else if (endpoint.includes("/api/pizzahub/beverages")) {
    return fetchBeverages(payload);
  }
}

function orderPizza(type, name) {
  fetch("/api/pizzahub/shop", { longi: 38.8951, lat: -77.0364 })
    .then((shopid) => {
      return fetch("/api/pizzahub/pizza", { shopId: shopid });
    })
    .then((allPizzas) => {
      return getmyPizza(allPizzas, type, name);
    })
    .then((pizza) => {
      return fetch("/api/pizzahub/beverages", { pizzaId: pizza.id });
    })
    .then((beverage) => {
      return create("/api/pizzahub/order", {
        beverage: beverage.name,
        name: name,
        type: type,
      });
    })
    .then((result) => console.log(result.message))
    .catch(function (error) {
      console.error(`${error.message}`);
    });
}

orderPizza("veg", "cheese-corn");
