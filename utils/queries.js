import axios from 'axios';

export const getMainCarouselItems = async desktop => {
  const type = !desktop ? 'desktop' : 'mobile';
  try {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_MAIN_URL}/slideshow-${type}`
    );
    if (res.data.status === true) {
      return res.data.data;
    }
  } catch (error) {
    throw new Error(error);
  }
};
export const getStaticSwiperData = async type => {
  if (type === 'latest_products') {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_MAIN_URL}/new-arrival`
    );
    if (res.data.status === true) {
      return {
        products: res.data.data.data,
        title: {
          en: {
            name: 'New Arrivals',
          },
          ar: {
            name: 'جديدنا من المنتجات',
          },
        },
      };
    }
  } else if (type === 'best_seller') {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_MAIN_URL}/best-sellers`
    );
    if (res.data.status === true) {
      return {
        products: res.data.data.data,
        title: {
          en: {
            name: 'Best Sellers',
          },
          ar: {
            name: 'الأكثر مبيعا',
          },
        },
      };
    }
  } else {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_MAIN_URL}/category-products/${type}?page=${1}`
    );
    if (res.data.status === true) {
      return {
        products: res.data.data.products.data,
        title: res.data.data.translation,
        slug: res.data.data.slug,
      };
    }
  }
};
/**
 * Authentication Queries
 */
export const userRegister = async data => {
  const res = await axios.post(
    `${process.env.NEXT_PUBLIC_MAIN_URL}/customer-register`,
    data
  );
  if (res.data.status === true) {
    return res.data;
  }
};
export const userLogin = async data => {
  console.log(data);
  const res = await axios.post(
    `${process.env.NEXT_PUBLIC_MAIN_URL}/customer-login`,
    data
  );
  if (res.data.status === true) {
    return res.data;
  }
};
export const checkAuth = async () => {
  const mrgAuthToken = localStorage.getItem('mrgAuthToken');
  const config = {
    // headers: {
    //   Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvYWRtaW4tbXJnLm1yZy1tYWxsLmNvbVwvYXBpXC9jdXN0b21lci1sb2dpbiIsImlhdCI6MTYxMDgwMjIyMiwiZXhwIjoxNjExNDA3MDIyLCJuYmYiOjE2MTA4MDIyMjIsImp0aSI6IjMyZFViVmFLTDYyRXhyVkYiLCJzdWIiOjMxLCJwcnYiOiIxZDBhMDIwYWNmNWM0YjZjNDk3OTg5ZGYxYWJmMGZiZDRlOGM4ZDYzIn0.1Gpuo16i-3H0BWSuc7gk86l_Zt1QW7yOsC2UpE9n5gc`,
    // },
    headers: { Authorization: `Bearer ${mrgAuthToken}` },
  };
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_MAIN_URL}/customer-informations`,
    config
  );

  return { userData: res.data.data };
};
export const getDeliveryCountries = async () => {
  const res = await axios.get(`${process.env.NEXT_PUBLIC_MAIN_URL}/countries`);
  if (res.data.status === true) {
    return res.data.data;
  }
};
export const getSiteSettings = async () => {
  const res = await axios.get(`${process.env.NEXT_PUBLIC_MAIN_URL}/settings`);
  if (res.data.status === true) {
    return res.data.data;
  }
};
export const getCartItems = async (userId, deliveryCountry, coupon) => {
  const mrgAuthToken = localStorage.getItem('mrgAuthToken');
  const config = {
    headers: {
      Authorization: `Bearer ${mrgAuthToken}`,
      country: deliveryCountry?.code,
    },
  };
  if (!localStorage.getItem('localCart')) {
    localStorage.setItem('localCart', JSON.stringify([]));
  }
  const localCart = JSON.parse(localStorage.getItem('localCart'));
  if (localCart.length === 0) {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_MAIN_URL}/cart/clean/${userId}`,
      { coupon },
      config
    );
    // const res = await axios({
    //   method: 'GET',
    //   url: `${process.env.NEXT_PUBLIC_MAIN_URL}/cart/clean/${userId}`,
    //   headers: { Authorization: `Bearer ${mrgAuthToken}` },
    //   params: {
    //     coupon,
    //   },
    // });
    if (res.data.status === true && res.data.data.items) {
      return {
        cartItems: res.data.data.items,
        cartTotal: res.data.data.total,
        shippingCost: res.data.data.shipping_cost,
        cartSubtotal: res.data.data.subtotal,
        couponCost: res.data.data.coupon_cost,
        note: res.data.data.note,
      };
    }
    if (res.data.status === true && res.data.data) {
      return { cartItems: [], cartTotal: 0 };
    }
  } else {
    const items = [];
    localCart.forEach(item => {
      items.push({
        id: item.id,
        qty: item.quantity,
        price: item.price,
        options: {
          addons: {
            [item.variation?.id]: item.variation?.item_id,
            [item.option?.id]: item.option?.item_id,
          },
          sku: item.sku,
        },
      });
    });
    await axios.post(
      `${process.env.NEXT_PUBLIC_MAIN_URL}/cart/combine/${userId}`,
      { products: JSON.stringify(items), coupon },
      config
    );
    const res = await axios({
      method: 'GET',
      url: `${process.env.NEXT_PUBLIC_MAIN_URL}/cart/clean/${userId}`,
      headers: { Authorization: `Bearer ${mrgAuthToken}` },
      params: {
        coupon,
      },
    });
    if (res.data.status === true) {
      localStorage.setItem('localCart', JSON.stringify([]));
      return {
        cartItems: res.data.data.items,
        cartTotal: res.data.data.total,
        shippingCost: res.data.data.shipping_cost,
        cartSubtotal: res.data.data.subtotal,
        couponCost: res.data.data.coupon_cost,
        message: 'cart-combined',
        note: res.data.data.note,
      };
    }
  }
};
export const addToCart = async ({
  newItem,
  userId,
  deliveryCountry,
  coupon,
}) => {
  const mrgAuthToken = localStorage.getItem('mrgAuthToken');
  const config = {
    headers: {
      Authorization: `Bearer ${mrgAuthToken}`,
      country: deliveryCountry.code,
    },
  };
  const res = await axios.post(
    `${process.env.NEXT_PUBLIC_MAIN_URL}/cart/store/${userId}`,
    {
      qty: newItem.quantity,
      product: newItem.id,
      addons: {
        [newItem.variation?.id]: newItem.variation?.item_id,
        [newItem.option?.id]: newItem.option?.item_id,
      },
      coupon,
    },
    config
  );
  if (res.data.status === true) {
    return {
      cartItems: res.data.data.items,
      cartTotal: res.data.data.total,
      shippingCost: res.data.data.shipping_cost,
      cartSubtotal: res.data.data.subtotal,
      couponCost: res.data.data.coupon_cost,
    };
  }
};
export const removeFromCart = async ({
  id,
  cart_id,
  userId,
  deliveryCountry,
  coupon,
}) => {
  const mrgAuthToken = localStorage.getItem('mrgAuthToken');
  const config = {
    headers: {
      Authorization: `Bearer ${mrgAuthToken}`,
      country: deliveryCountry.code,
    },
  };

  const res = await axios.post(
    `${process.env.NEXT_PUBLIC_MAIN_URL}/cart/remove/${userId}`,
    {
      product: id,
      cart_id,
      coupon,
    },
    config
  );
  if (res.data.status === true) {
    if (res.data.data.total === 0) {
      return { cartItems: [], cartTotal: 0 };
    }
    return {
      cartItems: res.data.data.items,
      cartTotal: res.data.data.total,
      shippingCost: res.data.data.shipping_cost,
      cartSubtotal: res.data.data.subtotal,
      couponCost: res.data.data.coupon_cost,
    };
  }
};
export const editCart = async ({
  cartId,
  itemId,
  quantity,
  userId,
  coupon,
}) => {
  const res = await axios.post(
    `${process.env.NEXT_PUBLIC_MAIN_URL}/cart/update/${userId}`,
    {
      cart_id: cartId,
      product: itemId,
      qty: quantity,
      coupon,
    }
  );
  if (res.data.status === true) {
    return {
      cartItems: res.data.data.items,
      cartTotal: res.data.data.total,
      shippingCost: res.data.data.shipping_cost,
      cartSubtotal: res.data.data.subtotal,
      couponCost: res.data.data.coupon_cost,
    };
  }
};
export const checkCoupon = async ({ code, subtotal }) => {
  const res = await axios.post(
    `${process.env.NEXT_PUBLIC_MAIN_URL}/check-coupon`,
    {
      code,
      subtotal,
    }
  );
  if (res.data.status === true) {
    return {
      code: res.data.data.code,
    };
  }
};
export const getGuestCartItems = async (deliveryCountry, coupon) => {
  const config = {
    headers: { country: deliveryCountry.code },
  };
  if (!localStorage.getItem('localCart')) {
    localStorage.setItem('localCart', JSON.stringify([]));
  }
  const localCart = JSON.parse(localStorage.getItem('localCart'));
  if (localCart.length === 0) {
    return {
      cartItems: [],
      cartTotal: 0,
      shippingCost: 0,
      cartSubtotal: 0,
      couponCost: 0,
    };
  }
  const items = [];
  localCart.forEach(item => {
    items.push({
      id: item.id,
      qty: item.quantity,
      price: item.price,
      options: {
        addons: {
          [item.variation?.id]: item.variation?.item_id,
          [item.option?.id]: item.option?.item_id,
        },
        sku: item.sku,
      },
    });
  });
  const res = await axios.post(
    `${process.env.NEXT_PUBLIC_MAIN_URL}/guest-cart`,
    { cart: JSON.stringify(items), coupon },
    config
  );
  if (res.data.status === true) {
    // if an item is out of stock remove it from local cart
    const cartItems = res.data.data.items;
    const outofStockItems = [];
    cartItems.forEach(cartItem => {
      if (cartItem.options.max_quantity === 0) {
        outofStockItems.push(cartItem.options.sku);
      }
    });
    if (outofStockItems.length > 0) {
      const newLocal = localCart.filter(
        localItem => !outofStockItems.includes(localItem.sku)
      );
      const newItems = [];
      newLocal.forEach(item => {
        newItems.push({
          id: item.id,
          qty: item.quantity,
          price: item.price,
          options: {
            addons: {
              [item.variation?.id]: item.variation?.item_id,
              [item.option?.id]: item.option?.item_id,
            },
            sku: item.sku,
          },
        });
      });
      localStorage.setItem('localCart', JSON.stringify(newLocal));
      const resp = await axios.post(
        `${process.env.NEXT_PUBLIC_MAIN_URL}/guest-cart`,
        { cart: JSON.stringify(items), coupon },
        config
      );
      return {
        cartItems: resp.data.data.items,
        cartTotal: resp.data.data.total,
        cartSubtotal: resp.data.data.subtotal,
        shippingCost: resp.data.data.shipping_cost,
        coupon_cost: resp.data.data.coupon_cost,
      };
    }
    return {
      cartItems: res.data.data.items,
      cartTotal: res.data.data.total,
      cartSubtotal: res.data.data.subtotal,
      shippingCost: res.data.data.shipping_cost,
      coupon_cost: res.data.data.coupon_cost,
    };
  }
};
export const addToGuestCart = async ({ newItem, deliveryCountry, coupon }) => {
  const config = {
    headers: { country: deliveryCountry.code },
  };

  const localCart = localStorage.getItem('localCart');
  if (!localCart) {
    localStorage.setItem('localCart', JSON.stringify([]));
  }
  const parsed = JSON.parse(localCart);
  const isAvailable = item => {
    if (item.sku === newItem.sku) {
      return true;
    }
    return false;
  };
  const foundIndex = parsed.findIndex(isAvailable);
  if (foundIndex !== -1) {
    parsed[foundIndex].quantity += 1;
    localStorage.setItem('localCart', JSON.stringify(parsed));
  } else {
    parsed.push(newItem);
    localStorage.setItem('localCart', JSON.stringify(parsed));
  }

  const items = [];
  parsed.forEach(item => {
    items.push({
      id: item.id,
      qty: item.quantity,
      price: item.price,
      options: {
        addons: {
          [item.variation?.id]: item.variation?.item_id,
          [item.option?.id]: item.option?.item_id,
        },
        sku: item.sku,
      },
    });
  });
  const res = await axios.post(
    `${process.env.NEXT_PUBLIC_MAIN_URL}/guest-cart`,
    { cart: JSON.stringify(items), coupon },
    config
  );
  if (res.data.status === true) {
    return {
      cartItems: res.data.data.items,
      cartTotal: res.data.data.total,
      cartSubtotal: res.data.data.subtotal,
      shippingCost: res.data.data.shipping_cost,
      coupon_cost: res.data.data.coupon_cost,
    };
  }
};

export const removeFromGuestCart = async ({ sku, deliveryCountry, coupon }) => {
  const config = {
    headers: { country: deliveryCountry.code },
  };

  const localCart = localStorage.getItem('localCart');
  let parsed = JSON.parse(localCart);
  const isAvailable = item => {
    if (item.sku === sku) {
      return false;
    }
    return true;
  };
  parsed = parsed.filter(isAvailable);
  if (parsed.length === 0) {
    localStorage.setItem('localCart', JSON.stringify(parsed));
    return {
      cartItems: [],
      cartTotal: 0,
      cartSubtotal: 0,
      shippingCost: 0,
      coupon_cost: 0,
    };
  }
  const newItems = [];
  parsed.forEach(item => {
    newItems.push({
      id: item.id,
      qty: item.quantity,
      price: item.price,
      options: {
        addons: {
          [item.variation?.id]: item.variation?.item_id,
          [item.option?.id]: item.option?.item_id,
        },
        sku: item.sku,
      },
    });
  });
  const res = await axios.post(
    `${process.env.NEXT_PUBLIC_MAIN_URL}/guest-cart`,
    { cart: JSON.stringify(newItems), coupon },
    config
  );
  if (res.data.status === true) {
    localStorage.setItem('localCart', JSON.stringify(parsed));
    return {
      cartItems: res.data.data.items,
      cartTotal: res.data.data.total,
      cartSubtotal: res.data.data.subtotal,
      shippingCost: res.data.data.shipping_cost,
      coupon_cost: res.data.data.coupon_cost,
    };
  }
};
export const editGuestCart = async ({
  sku,
  quantity,
  price,
  deliveryCountry,
  coupon,
}) => {
  const config = {
    headers: { country: deliveryCountry.code },
  };

  const localCart = localStorage.getItem('localCart');
  const parsed = JSON.parse(localCart);
  const isAvailable = item => {
    if (item.sku === sku) {
      return true;
    }
    return false;
  };
  const foundItemIndex = parsed.findIndex(isAvailable);
  if (foundItemIndex === -1) {
    throw new Error('Something went wrong');
  }
  parsed[foundItemIndex].quantity = quantity;
  parsed[foundItemIndex].price = price * quantity;
  const newItems = [];
  parsed.forEach(item => {
    newItems.push({
      id: item.id,
      qty: item.quantity,
      price: item.price,
      options: {
        addons: {
          [item.variation?.id]: item.variation?.item_id,
          [item.option?.id]: item.option?.item_id,
        },
        sku: item.sku,
      },
    });
  });
  const res = await axios.post(
    `${process.env.NEXT_PUBLIC_MAIN_URL}/guest-cart`,
    { cart: JSON.stringify(newItems), coupon },
    config
  );
  if (res.data.status === true) {
    localStorage.setItem('localCart', JSON.stringify(parsed));
    return {
      cartItems: res.data.data.items,
      cartTotal: res.data.data.total,
      cartSubtotal: res.data.data.subtotal,
      shippingCost: res.data.data.shipping_cost,
      coupon_cost: res.data.data.coupon_cost,
    };
  }
};
/**
 * WishList
 */
export const getWishlistItems = async userId => {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_MAIN_URL}/wishlist/${userId}`
  );
  if (res.data.status === true) {
    return { wishlistItems: res.data.data };
  }
};
export const addToWishlist = async ({ id, userId }) => {
  const mrgAuthToken = localStorage.getItem('mrgAuthToken');
  const config = {
    headers: { Authorization: `Bearer ${mrgAuthToken}` },
  };
  const res = await axios.post(
    `${process.env.NEXT_PUBLIC_MAIN_URL}/wishlist/store/${userId}`,
    { product: id },
    config
  );

  if (res.data.status === true) {
    return { wishlistItems: res.data.data };
  }
};
export const removeFromWishlist = async ({ id, userId }) => {
  const mrgAuthToken = localStorage.getItem('mrgAuthToken');

  const res = await axios({
    method: 'GET',
    url: `${process.env.NEXT_PUBLIC_MAIN_URL}/wishlist/remove/${userId}`,
    headers: { Authorization: `Bearer ${mrgAuthToken}` },
    params: {
      product: id,
    },
  });
  if (res.data.status === true) {
    return id;
  }
};
/**
 * End of Wishlist
 */
export const getVisitedItems = async () => {
  let localVisited = localStorage.getItem('visitedItems');
  const parsed = JSON.parse(localVisited);
  if (parsed.length === 0) {
    return [];
  }
  localVisited = parsed.map(i => i.id).slice(0, 25);
  const res = await axios.post(
    `${process.env.NEXT_PUBLIC_MAIN_URL}/multiple-product`,
    { products: localVisited }
  );
  if (res.data.status === true) {
    return res.data.data;
  }
};
export const getBestSellers = async () => {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_MAIN_URL}/best-sellers`
  );
  if (res.data.status === true) {
    return res.data.data.data;
  }
};
export const getSingleItem = async id => {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_MAIN_URL}/product/${id}`
  );
  if (res.data.status === true) {
    return res.data.data;
  }
};
export const getProductReviews = async id => {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_MAIN_URL}/product-reviews/${id}`
  );
  if (res.data.status === true) {
    return {
      reviews: res.data.data.list,
      averageRating: res.data.data.avg,
      ratingCount: res.data.data.count,
    };
  }
};
export const getCategoryProducts = async ({
  category,
  page,
  resultsPerPage,
}) => {
  const res = await axios.get(
    `${process.env.REACT_APP_MAIN_URL}/category-products/${category}?page=${page}&number=${resultsPerPage?.value}`
  );
  if (res.data.status === true) {
    return {
      products: res.data.data.products.data,
      currentPage: res.data.data.products.current_page,
      lastPage: res.data.data.products.last_page,
    };
  }
};
export const getAllCategories = async () => {
  const res = await axios.get(`${process.env.NEXT_PUBLIC_MAIN_URL}/categories`);
  if (res.data.status === true) {
    return res.data.data;
  }
};
export const getNavCategories = async () => {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_MAIN_URL}/menu/navigation`
  );

  if (res.data.status === true) {
    return res.data.data;
  }
};
