
// Core Logic Calculation, Pricing Calculation for Special Customer
const applyPricingRule = (customer, cart) => {
  let counter = 0;
  switch (customer) {
    case "microsoft":
      for (let i = 0; i < cart.items.length; i++) {
        if (cart.items[i].productId.name === "Small Pizza" &&
          cart.items[i].quantity >= 3 &&
          (cart.items[i].promoApplied === false || !cart.items[i].promoApplied)) {
          cart.items[i].promoApplied = true;
          cart.items[i].total = cart.items[i].total / 3 * 2;
        }
      }
      break;
    case "amazon":
      for (let i = 0; i < cart.items.length; i++) {
        if (cart.items[i].productId.name === "Large Pizza" &&
          (cart.items[i].promoApplied === false || !cart.items[i].promoApplied)) {
          const price = 19.99;
          cart.items[i].promoApplied = true;
          cart.items[i].total = price * cart.items[i].quantity;
        }
      }
      break;
    case "facebook":
      // Buy 5 get one Free aka Buy 5 Get Price of 4
      for (let i = 0; i < cart.items.length; i++) {
        if (cart.items[i].productId.name === "Medium Pizza" &&
          cart.items[i].quantity >= 5 &&
          (cart.items[i].promoApplied === false || !cart.items[i].promoApplied)) {
          cart.items[i].promoApplied = true;
          cart.items[i].total = cart.items[i].total / 5 * 4;
        }
      }
      break;
    default:
      break;
  }
};

module.exports = {
  applyPricingRule
};
