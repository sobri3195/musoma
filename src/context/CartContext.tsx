import {createContext,useContext,useEffect,useState,type ReactNode} from 'react'; import type {Product} from '../data/products';
type CartItem={product:Product;qty:number}; type CartValue={items:CartItem[];add:(p:Product)=>void;remove:(id:string)=>void;clear:()=>void;count:number};
const Cart=createContext<CartValue|null>(null);
export function CartProvider({children}:{children:ReactNode}){const [items,setItems]=useState<CartItem[]>(()=>{try{return JSON.parse(localStorage.getItem('sobri-cart')||'[]')}catch{return[]}});
useEffect(()=>localStorage.setItem('sobri-cart',JSON.stringify(items)),[items]); const add=(product:Product)=>setItems(x=>x.some(i=>i.product.id===product.id)?x:x.concat({product,qty:1}));
return <Cart.Provider value={{items,add,remove:id=>setItems(x=>x.filter(i=>i.product.id!==id)),clear:()=>setItems([]),count:items.length}}>{children}</Cart.Provider>}
export const useCart=()=>{const c=useContext(Cart);if(!c)throw Error('CartProvider missing');return c};
