import { createContext, useContext, useState } from 'react'
import toast from 'react-hot-toast'

const CartContext = createContext(null)

export function CartProvider({ children }) {
  const [items, setItems] = useState([])
  const [open, setOpen] = useState(false)

  function addItem(product, qty = 1) {
    setItems(prev => {
      const exists = prev.find(i => i._id === product._id)
      if (exists) {
        toast.success(`Quantity updated`)
        return prev.map(i => i._id === product._id ? { ...i, qty: Math.min(i.qty + qty, 99) } : i)
      }
      toast.success(`${product.name} added to cart`)
      return [...prev, { ...product, qty }]
    })
    setOpen(true)
  }

  function removeItem(id) {
    setItems(prev => prev.filter(i => i._id !== id))
  }

  function updateQty(id, qty) {
    if (qty < 1) { removeItem(id); return }
    setItems(prev => prev.map(i => i._id === id ? { ...i, qty: Math.min(qty, 99) } : i))
  }

  function clearCart() {
    setItems([])
  }

  const total = items.reduce((s, i) => s + i.price * i.qty, 0)
  const count = items.reduce((s, i) => s + i.qty, 0)

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, updateQty, clearCart, total, count, open, setOpen }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  return useContext(CartContext)
}
