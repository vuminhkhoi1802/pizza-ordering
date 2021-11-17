const productRoutes = require("./app/Product/route");
const cartRoutes = require("./app/Cart/route");
module.exports = (app) => {
  app.use("/product", productRoutes);
  app.use("/cart", cartRoutes);
};
