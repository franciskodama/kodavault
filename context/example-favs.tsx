// "use client";

// import {
//   createContext,
//   PropsWithChildren,
//   useState,
//   useContext,
//   useEffect,
//   useCallback,
// } from "react";
// import aa from "search-insights";
// import currencyJS from "currency.js";

// import { useAuth } from "./auth";
// import { addFav, removeFav } from "./favs-actions";
// import { redis } from "save/redis/client";
// import { Index } from "@/lib/search";
// import { Events } from "shed/analytics";
// import { trackAddedFavorite, trackRemovedFavorite } from "@/lib/analytics";
// import { Product } from "@/lib/products";
// import { Provider } from "@radix-ui/react-toast";

// type Favs = Record<string, boolean> | null;

// const FavsContext = createContext<{
//   favs: Favs;
//   loading: boolean;
//   addToFavs: (product: Product) => Promise<void>;
//   removeFromFavs: (product: Product) => Promise<void>;
// }>({
//   favs: null,
//   loading: true,
//   addToFavs: async () => {},
//   removeFromFavs: async () => {},
// });

// export function FavsProvider({ children }: PropsWithChildren) {
//   const { user, loading: authLoading } = useAuth();
//   const [loading, setLoading] = useState(true);
//   const [favs, setFavs] = useState<Favs>(null);

//   const addToFavs = useCallback(
//     async (product: Product) => {
//       setFavs((favs) => ({ ...favs, [product.id]: true }));
//       await Promise.all([
//         addFav(user?.uid!, product),
//         trackAddedFavorite({
//           user_id: user?.uid || null,
//           product_id: product.id,
//           product_name: product.Name,
//           category: product.Category?.Hierarchy || null,
//           image_url: product["Primary Image"],
//           brand_id: product.Brand.id,
//           brand_name: product.Brand.Name,
//           price: currencyJS(product.Price).intValue,
//           currency: product.Currency,
//           size: null,
//           color: null,
//         }),
//       ]);
//       if (process.env.NODE_ENV === "production") {
//         aa("convertedObjectIDs", {
//           index: Index.Products,
//           eventName: Events.ProductAddedToWishlist,
//           objectIDs: [product.id],
//         });
//       }
//     },
//     [user]
//   );

//   const removeFromFavs = useCallback(
//     async (product: Product) => {
//       setFavs((favs) => {
//         const { [product.id]: _, ...rest } = favs!;
//         return rest;
//       });
//       await Promise.all([
//         removeFav(user?.uid!, product.id),
//         trackRemovedFavorite({
//           user_id: user?.uid || null,
//           product_id: product.id,
//           product_name: product.Name,
//           category: product.Category?.Hierarchy || null,
//           image_url: product["Primary Image"],
//           brand_id: product.Brand.id,
//           brand_name: product.Brand.Name,
//           price: currencyJS(product.Price).intValue,
//           currency: product.Currency,
//           size: null,
//           color: null,
//         }),
//       ]);
//     },
//     [user]
//   );

//   useEffect(() => {
//     if (!authLoading && user) {
//       setLoading(true);
//       redis
//         .hgetall<Record<string, Product | boolean>>(`user:${user.uid}:favs`)
//         .then((result) => {
//           if (result) {
//             setFavs(
//               Object.keys(result).reduce(
//                 (acc, key) => ({ ...acc, [key]: true }),
//                 {}
//               )
//             );
//           } else {
//             setFavs(null);
//           }
//           setLoading(false);
//         });
//     }
//   }, [user, authLoading]);

//   return (
//     <FavsContext.Provider value={{ favs, loading, addToFavs, removeFromFavs }}>
//       {children}
//     </FavsContext.Provider>
//   );
// }

// export const useFavs = () => useContext(FavsContext);

// =---------------------------------

// cart Provider

// "use client";

// import {
//   createContext,
//   PropsWithChildren,
//   useContext,
//   useEffect,
//   useCallback,
//   ReactNode,
//   useState,
// } from "react";
// import {
//   CartProvider as RucCartProvider,
//   Item,
//   useCart as useRucCart,
// } from "react-use-cart";

// import { useAuth } from "./auth";
// import { FormattedProduct } from "@/lib/cart";
// import {
//   setDbItem,
//   delDbItem,
//   setDbItemQty,
//   delDbCart,
//   getDbCart,
// } from "./cart-actions";
// import aa from "search-insights";
// import { Index } from "@/lib/search";
// import { Events } from "shed/analytics";

// type CartItem = Item & FormattedProduct;

// const CartContext = createContext<{
//   items: CartItem[];
//   totalItems: number;
//   isEmpty: boolean;
//   addItem: (product: FormattedProduct, quantity?: number) => void;
//   removeItem: (productId: string) => void;
//   updateItemQuantity: (productId: string, quantity: number) => void;
//   metadata: { [key: string]: any };
//   updateCartMetadata: (obj: object) => void;
//   emptyCart: () => void;
// }>({
//   items: [],
//   totalItems: 0,
//   isEmpty: true,
//   addItem: () => {},
//   removeItem: () => {},
//   updateItemQuantity: () => {},
//   metadata: {},
//   updateCartMetadata: () => {},
//   emptyCart: () => {},
// });

// function _CartProvider({ children }: PropsWithChildren) {
//   const { user, loading: userLoading } = useAuth();
//   const {
//     items,
//     totalItems,
//     isEmpty,
//     getItem,
//     setItems,
//     metadata = {},
//     updateCartMetadata,
//     addItem: _addItem,
//     removeItem: _removeItem,
//     updateItemQuantity: _updateItemQuantity,
//     emptyCart: _emptyCart,
//   } = useRucCart();
//   const [cartLoading, setCartLoading] = useState(true);

//   const addItem = useCallback(
//     async (product: FormattedProduct, quantity: number = 1) => {
//       const newQty = (getItem(product.id)?.quantity ?? 0) + quantity;
//       _addItem(product, quantity);
//       await setDbItem(user?.uid!, { ...product, quantity: newQty });
//       aa("convertedObjectIDs", {
//         index: Index.Products,
//         eventName: Events.ProductAdded,
//         objectIDs: [product.id],
//       });
//     },
//     [getItem, _addItem, user?.uid]
//   );

//   const updateItemQuantity = useCallback(
//     async (productId: string, quantity: number) => {
//       _updateItemQuantity(productId, quantity);
//       if (quantity <= 0) {
//         await delDbItem(user?.uid!, productId);
//       } else {
//         await setDbItemQty(user?.uid!, productId, quantity);
//       }
//     },
//     [_updateItemQuantity, user?.uid]
//   );

//   const removeItem = useCallback(
//     async (productId: string) => {
//       _removeItem(productId);
//       await delDbItem(user?.uid!, productId);
//     },
//     [_removeItem, user?.uid]
//   );

//   const emptyCart = useCallback(async () => {
//     _emptyCart();
//     await delDbCart(user?.uid!);
//   }, [_emptyCart, user?.uid]);

//   useEffect(() => {
//     if (!userLoading && user && cartLoading) {
//       getDbCart(user?.uid)
//         .then((result) => {
//           setItems(Object.values(result ?? {}));
//           setCartLoading(false);
//         })
//         .catch(() => {
//           setCartLoading(false);
//         });
//     }
//   }, [user, userLoading, cartLoading, setItems]);

//   return (
//     <CartContext.Provider
//       value={{
//         items: items as CartItem[],
//         totalItems,
//         isEmpty,
//         addItem,
//         removeItem,
//         updateItemQuantity,
//         metadata,
//         updateCartMetadata,
//         emptyCart,
//       }}
//     >
//       {children}
//     </CartContext.Provider>
//   );
// }

// export function CartProvider({ children }: { children: ReactNode }) {
//   return (
//     <RucCartProvider>
//       <_CartProvider>{children}</_CartProvider>
//     </RucCartProvider>
//   );
// }

// export const useCart = () => useContext(CartContext);
