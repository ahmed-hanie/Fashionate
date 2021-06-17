const addToCart = (product) => {
  let cart = JSON.parse(localStorage.getItem("cart"));

  if (!cart) {
    cart = [];
  }

  // Check if product already exists in cart
  for (let i = 0; i < cart.length; i++) {
    if (cart[i].uuid === product.uuid) {
      return;
    }
  }

  cart.push({ ...product, quantity: 1 });
  localStorage.setItem("cart", JSON.stringify(cart));
};

const removeFromCart = (product) => {
  let cart = JSON.parse(localStorage.getItem("cart"));

  if (!cart) {
    return;
  }

  cart = cart.filter((cartItem) => cartItem.uuid !== product.uuid);
  localStorage.setItem("cart", JSON.stringify(cart));
};

const isProductInCart = (product, cachedCart = null) => {
  // Save perfomance by not parsing the cart string each time
  let cart = cachedCart ? cachedCart : JSON.parse(localStorage.getItem("cart"));

  if (!cart) {
    return false;
  }

  for (let i = 0; i < cart.length; i++) {
    if (product.uuid === cart[i].uuid) {
      return true;
    }
  }
  return false;
};

const getTotalProductsInCart = () => {
  let cart = JSON.parse(localStorage.getItem("cart"));

  if (!cart) {
    return 0;
  }
  let sum = 0;
  for (let i = 0; i < cart.length; i++) {
    sum += cart[i].quantity;
  }
  return sum;
};

const getCachedCart = () => {
  let cart = localStorage.getItem("cart");
  if (cart) {
    return JSON.parse(cart);
  }
  return null;
};

const updateProductCount = (product, count) => {
  let cart = JSON.parse(localStorage.getItem("cart"));

  if (!cart) {
    return false;
  }

  for (let i = 0; i < cart.length; i++) {
    if (product.uuid === cart[i].uuid) {
      cart[i].quantity = count;
      localStorage.setItem("cart", JSON.stringify(cart));
      return true;
    }
  }

  return false;
};

const getProductCountInCart = (product) => {
  let cart = JSON.parse(localStorage.getItem("cart"));

  if (!cart) {
    return 0;
  }

  for (let i = 0; i < cart.length; i++) {
    if (product.uuid === cart[i].uuid) {
      return cart[i].quantity;
    }
  }

  return 0;
};

export {
  addToCart,
  removeFromCart,
  isProductInCart,
  getTotalProductsInCart,
  getCachedCart,
  updateProductCount,
  getProductCountInCart,
};
