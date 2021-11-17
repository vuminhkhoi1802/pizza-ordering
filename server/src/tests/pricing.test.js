const { applyPricingRule } = require("../utils/util");

const regularRawCustomerCart = {
  "items": [
    {
      "productId": {
        "name": "Small Pizza"
      },
      "promoApplied": false,
      "quantity": 1,
      "price": 11.99,
      "total": 11.99
    },
    {
      "productId": {
        "name": "Medium Pizza"
      },
      "promoApplied": false,
      "quantity": 1,
      "price": 15.99,
      "total": 15.99
    },
    {
      "productId": {
        "name": "Large Pizza"
      },
      "promoApplied": false,
      "quantity": 1,
      "price": 21.99,
      "total": 21.99
    }
  ]
};
const amazonRawCustomerCart = {
  "items": [
    {
      "productId": {
        "name": "Medium Pizza"
      },
      "promoApplied": false,
      "quantity": 3,
      "price": 15.99,
      "total": 47.97
    },
    {
      "productId": {
        "name": "Large Pizza"
      },
      "promoApplied": false,
      "quantity": 1,
      "price": 21.99,
      "total": 21.99
    }
  ]
};

const microsoftRawCustomerCart = {
  "items": [
    {
      "productId": {
        "name": "Small Pizza"
      },
      "promoApplied": false,
      "quantity": 3,
      "price": 11.99,
      "total": 35.97
    },
    {
      "productId": {
        "name": "Large Pizza"
      },
      "promoApplied": false,
      "quantity": 1,
      "price": 21.99,
      "total": 21.99
    }
  ]
};

const facebookRawCustomerCart = {
  "items": [
    {
      "productId": {
        "name": "Medium Pizza"
      },
      "promoApplied": false,
      "quantity": 5,
      "price": 15.99,
      "total": 79.95
    },
    {
      "productId": {
        "name": "Large Pizza"
      },
      "promoApplied": false,
      "quantity": 1,
      "price": 21.99,
      "total": 21.99
    }
  ]
};

describe("Apply Pricing to Different Customer", () => {
  it("should return the correct amount for default customer (regular price)", () => {
    applyPricingRule("default", regularRawCustomerCart);
    const subTotal = regularRawCustomerCart.items[0].total + regularRawCustomerCart.items[1].total + regularRawCustomerCart.items[2].total;
    expect(subTotal).toBe(49.97);
  });
  it("should return the correct total Price for Microsoft Customer (Buy 3 small pizzas for price of 2)", () => {
    applyPricingRule("microsoft", microsoftRawCustomerCart);
    const subTotal = microsoftRawCustomerCart.items[0].total + microsoftRawCustomerCart.items[1].total;
    expect(subTotal).toBe(45.97);
  });

  it("should return the correct total Price for Amazon Customer (Buy 3 small pizzas for price of 2)", () => {
    applyPricingRule("amazon", amazonRawCustomerCart);
    const subTotal = amazonRawCustomerCart.items[0].total + amazonRawCustomerCart.items[1].total;
    expect(subTotal).toBe(67.96);
  });

  it("should return the correct total Price for Facebook Customer (Buy 5 medium pizzas for price of 4", () => {
    applyPricingRule("facebook", facebookRawCustomerCart);
    const subTotal = facebookRawCustomerCart.items[0].total + facebookRawCustomerCart.items[1].total;
    expect(subTotal).toBe(85.95);
  });
});
