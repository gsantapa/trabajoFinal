// // store.js
// import {create} from 'zustand';
 
//  export const useUserStore = create((set) => ({
 
  
//   user: JSON.parse(localStorage.getItem('user')) || null,
//   // Otros campos del estado global que desees
  
//   setUser: (user) => {
//     set({ user });
//     localStorage.setItem('user', JSON.stringify(user));
//   },

//     registerUser: (userData) => {
//       // Utilizar el email como identificador
//       const nomusu = userData.nomusu;

//       const userWithname = { ...userData, id: nomusu };
//       set({ user: userWithname});
  
//       localStorage.setItem('user', JSON.stringify(userWithname));
//     }
    
//   }));

// export const useCartStore = create((set) => ({
// products: localStorage.getItem('cartProducts')
//   ? JSON.parse(localStorage.getItem('cartProducts'))
//   : [],
// saveCartToLocalStorage: (products) => {
//   localStorage.setItem('cartProducts', JSON.stringify(products));
// },
// initCart: () => {
//   const user = useUserStore.getState().user;
//   if (user) {
//     console.log('ver usuario',user)
//     const nomusu = user.nomusu;
 
//     const cart = JSON.parse(localStorage.getItem(`cart_${nomusu}`));
//     if (cart) {
//       set({ products: cart });
//     } else {
//       // Si el carrito no existe, lo inicializamos como un array vacío
//       set({ products: [] });
//     }
//   }
// },
// clearCart: () => {
//   const userIdentification = useUserStore.getState().userIdentification; // Obtenemos la identificación del usuario desde el estado global de useUserStore
//   localStorage.removeItem(`cart_${userIdentification}`);
//   set({ products: [] });
// },
// addToCart: (product) => {
//   set((state) => {
//     const user = useUserStore.getState().user; // Obtenemos el usuario desde el estado global useUserStore
//     const nomusu = user ? user.nomusu : null; // Obtenemos el email del usuario si está autenticado
//     //nuevo 
   
//     const updatedCartData = state.products;
//     console.log(product.id)
//     console.log(updatedCartData)
//     console.log(nomusu)
//     let foundProduct = updatedCartData.find((item) => parseInt(item.id) === parseInt(product.id) && item.identification === nomusu);
//     //
//     if (foundProduct) {
//       console.log('acumula')
//       foundProduct.quantity += 1;
//     } else {
//       console.log('Agrega')
//       foundProduct = {
//         id: product.id,
//         title: product.titulo,
//         img: product.path_imagen, // Agregamos la información de la imagen
//         quantity: 1,
//         price: product.preuni,
//         identification: nomusu, 
//       };
//       updatedCartData.push(foundProduct);
//     }
//     localStorage.setItem(`cart_${nomusu}`, JSON.stringify(updatedCartData));
//     return { products: updatedCartData };
//   });
// },
// removeFromCart: (index) => {
//   set((state) => {
//     const user = useUserStore.getState().user; // Obtenemos el usuario desde el estado global useUserStore
//     const nomusu = user ? user.nomusu : null; // Obtenemos el email del usuario si está autenticado
//     const updatedProducts = state.products.filter((_, i) => i !== index);
//     localStorage.setItem(`cart_${nomusu}`, JSON.stringify(updatedProducts));
//     return { products: updatedProducts };
//   });
// },
// increaseQuantity: (index) => {
//   set((state) => {
//     const userIdentification = useUserStore.getState().userIdentification; // Obtenemos la identificación del usuario desde el estado global de useUserStore
//     const updatedProducts = [...state.products];
//     updatedProducts[index].quantity += 1;
//     localStorage.setItem(`cart_${userIdentification}`, JSON.stringify(updatedProducts));
//     return { products: updatedProducts };
//   });
// },
// decreaseQuantity: (index) => {
//   set((state) => {
//     const userIdentification = useUserStore.getState().userIdentification; // Obtenemos la identificación del usuario desde el estado global de useUserStore
//     const updatedProducts = [...state.products];
//     if (updatedProducts[index].quantity > 1) {
//       updatedProducts[index].quantity -= 1;
//       localStorage.setItem(`cart_${userIdentification}`, JSON.stringify(updatedProducts));
//     }
//     return { products: updatedProducts };
//   });
// },
// savePurchase: (userData, products, total) => {
//   const purchaseData = {
//     user: userData.nomusu, // Guardamos el email del usuario
//     products: products.map((product) => ({
//     title: product.titulo,
//     quantity: product.quantity,
//     price: product.preuni,
//     })),
//     total,
//   };
//   // Guardamos la información de la compra en el local storage
//   const userPurchasesKey = `purchases_${userData.nomusu}`; // Creamos una clave única para cada usuario basada en su email
//   const purchases = localStorage.getItem(userPurchasesKey) ? JSON.parse(localStorage.getItem(userPurchasesKey)) : [];
//   purchases.push(purchaseData);
//   localStorage.setItem(userPurchasesKey, JSON.stringify(purchases));
//   // Limpiamos el carrito después de guardar la compra
//   useCartStore.setState({ products: [] });
// },
// }));

import { create } from 'zustand';
export const useUserStore = create((set) => ({
  user: JSON.parse(localStorage.getItem('user')) || null,
  // Otros campos del estado global que desees
  setUser: (user) => {
    set({ user });
    localStorage.setItem('user', JSON.stringify(user));
  },
}));
export const useCartStore = create((set) => ({
  
  products: localStorage.getItem('cartProducts')
    ? JSON.parse(localStorage.getItem('cartProducts'))
    : [],
  saveCartToLocalStorage: (products) => {
    localStorage.setItem('cartProducts', JSON.stringify(products));

  },
  initCart: () => {

    const userIdentification = useUserStore.getState().user.nomusu; // Retrieve the user email from the useUserStore state
    const cart = JSON.parse(localStorage.getItem(`cart_${userIdentification}`));
    if (cart) {
      set({ products: cart });
    } else {
      set({ products: [] });
    }
  },
  clearCart: () => {
    console.log('borrar card',useUserStore.getState().user.nomusu)
    const userIdentification = useUserStore.getState().user.nomusu; // Retrieve the user email from the useUserStore state
    localStorage.removeItem(`cart_${userIdentification}`);
    set({ products: [] });
  },
  addToCart: (product) => {
    console.log('add-tocard',product)
   
    set((state) => {
      console.log('totdo',[...state.products])
      const userIdentification = useUserStore.getState().user.nomusu;
      const updatedCartData = state.products;//[...state.products];
      console.log('updatecart ',updatedCartData)

      const existingProductIndex = updatedCartData.findIndex(
        (item) =>
          item.product === product.id &&
          item.identification === userIdentification
      );
      if (existingProductIndex !== -1) {
        updatedCartData[existingProductIndex].quantity += 1;
      } else {
        console.log('nuevo')
        const newCartItem = {
          product: product.id,
          quantity: 1,
          price: product.preuni,
          img:  product.path_imagen,
          title: product.titulo, // Include the title attribute
          // Include other necessary attributes
          // ...
          identification: userIdentification,
        };
        console.log('xxx',updatedCartData)
        console.log('xxx',newCartItem)
        updatedCartData.push(newCartItem);
      }
      
      localStorage.setItem(
        `cart_${userIdentification}`,
        JSON.stringify(updatedCartData)
      );
      return { products: updatedCartData };
    });
  },
  removeFromCart: (index) => {
    set((state) => {
      const userIdentification = useUserStore.getState().user.nomusu; // Retrieve the user email from the useUserStore state
      const updatedProducts = state.products.filter((_, i) => i !== index);
      localStorage.setItem(`cart_${userIdentification}`, JSON.stringify(updatedProducts));
      return { products: updatedProducts };
    });
  },
  increaseQuantity: (index) => {
    set((state) => {
      const userIdentification = useUserStore.getState().user.nomusu; // Retrieve the user email from the useUserStore state
      const updatedProducts = [...state.products];
      updatedProducts[index].quantity += 1;
      localStorage.setItem(`cart_${userIdentification}`, JSON.stringify(updatedProducts));
      return { products: updatedProducts };
    });
  },
  decreaseQuantity: (index) => {
    set((state) => {
      const userIdentification = useUserStore.getState().user.nomusu; // Retrieve the user email from the useUserStore state
      const updatedProducts = [...state.products];
      if (updatedProducts[index].quantity > 1) {
        updatedProducts[index].quantity -= 1;
        localStorage.setItem(`cart_${userIdentification}`, JSON.stringify(updatedProducts));
      }
      return { products: updatedProducts };
    });
  },
  // savePurchase: (userData, products, total) => {
  //   const purchaseData = {
  //     user: userData.nomusu, // Guardamos el email del usuario
  //     products: products.map((product) => ({
  //       title: product.titulo,
  //       quantity: product.quantity,
  //       price: product.preuni,
  //     })),
  //     total,
  //   };



  //   // Guardamos la información de la compra en el local storage
  //   const userPurchasesKey = `purchases_${userData.nomusu}`; // Creamos una clave única para cada usuario basada en su email
  //   const purchases = localStorage.getItem(userPurchasesKey) ? JSON.parse(localStorage.getItem(userPurchasesKey)) : [];
  //   purchases.push(purchaseData);
  //   localStorage.setItem(userPurchasesKey, JSON.stringify(purchases));
   
   
    // Limpiamos el carrito después de guardar la compra
    ///useCartStore.setState({ products: [] });
  //},
}));
