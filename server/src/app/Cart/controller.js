const cartRepository = require("./repository");
const productRepository = require("../Product/repository");
const { applyPricingRule } = require("../../utils/util");

exports.addItemToCart = async (req, res) => {
  const {
    productId,
    customer
  } = req.body;
  const quantity = Number.parseInt(req.body.quantity);
  try {
    let cart = await cartRepository.cart();
    let productDetails = await productRepository.productById(productId);
    if (!productDetails) {
      return res.status(500).json({
        type: "Not Found",
        msg: "Invalid request"
      });
    }
    //--If Cart Exists ----
    if (cart) {
      //---- Check if index exists ----
      const indexFound = cart.items.findIndex(item => item.productId.id === productId);
      //------This removes an item from the the cart if the quantity is set to zero, We can use this method to remove an item from the list  -------
      if (indexFound !== -1 && quantity <= 0) {
        cart.items.splice(indexFound, 1);
        if (cart.items.length === 0) {
          cart.subTotal = 0;
        } else {
          cart.subTotal = cart.items.map(item => item.total).reduce((acc, next) => acc + next);
        }
      }
      //----------Check if product exist, just add the previous quantity with the new quantity and update the total price-------
      else if (indexFound !== -1) {
        cart.items[indexFound].quantity = cart.items[indexFound].quantity + quantity;
        cart.items[indexFound].total = cart.items[indexFound].quantity * productDetails.price;
        cart.items[indexFound].price = productDetails.price;
        applyPricingRule(customer, cart);
        cart.subTotal = cart.items.map(item => item.total).reduce((acc, next) => acc + next);
      }
      //----Check if quantity is greater than 0 then add item to items array ----
      else if (quantity > 0) {
        cart.items.push({
          productId: productDetails,
          quantity: quantity,
          price: productDetails.price,
          promoApplied: false,
          total: parseFloat(productDetails.price * quantity)
        });
        applyPricingRule(customer, cart);
        cart.subTotal = cart.items.map(item => item.total).reduce((acc, next) => acc + next);
      }
      //----If quantity of price is 0 throw the error -------
      else {
        return res.status(400).json({
          type: "Invalid",
          msg: "Invalid request"
        });
      }
      let data = await cart.save();
      res.status(200).json({
        type: "success",
        mgs: "Process successful",
        data: data
      });
    }
    //------------ This creates a new cart and then adds the item to the cart that has been created------------
    else {
      const cartData = {
        items: [{
          productId: productDetails,
          quantity: quantity,
          processed: false,
          total: parseFloat(productDetails.price * quantity),
          price: productDetails.price
        }],
        subTotal: parseFloat(productDetails.price * quantity)
      };
      applyPricingRule(customer, cartData);
      cartData.subTotal = cartData.items[0].total;
      cart = await cartRepository.addItem(cartData);
      res.json(cart);
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({
      type: "Invalid",
      msg: "Something went wrong",
      err: err
    });
  }
};
exports.getCart = async (req, res) => {
  try {
    let cart = await cartRepository.cart();
    if (!cart) {
      return res.status(400).json({
        type: "Invalid",
        msg: "Cart not Found"
      });
    }
    res.status(200).json({
      status: true,
      data: cart
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      type: "Invalid",
      msg: "Something went wrong",
      err: err
    });
  }
};

exports.emptyCart = async (req, res) => {
  try {
    let cart = await cartRepository.cart();
    cart.items = [];
    cart.subTotal = 0;
    let data = await cart.save();
    res.status(200).json({
      type: "success",
      mgs: "Cart has been emptied",
      data: data
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      type: "Invalid",
      msg: "Something went wrong",
      err: err
    });
  }
};
