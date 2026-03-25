import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import type { Book } from '../types/Book'
import type { CartItem } from '../types/CartItem'

const CART_STORAGE_KEY = 'bookstore-cart'

function loadCartFromStorage(): CartItem[] {
  try {
    const raw = sessionStorage.getItem(CART_STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw) as CartItem[]
    if (!Array.isArray(parsed)) return []
    return parsed.filter(
      (line) =>
        typeof line?.bookId === 'number' &&
        typeof line?.title === 'string' &&
        typeof line?.price === 'number' &&
        typeof line?.quantity === 'number' &&
        line.quantity > 0,
    )
  } catch {
    return []
  }
}

function persistCart(items: CartItem[]) {
  sessionStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items))
}

interface CartContextValue {
  items: CartItem[]
  addToCart: (book: Book) => void
  removeFromCart: (bookId: number) => void
  updateQuantity: (bookId: number, quantity: number) => void
  clearCart: () => void
  totalItemCount: number
  totalPrice: number
}

const CartContext = createContext<CartContextValue | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => loadCartFromStorage())

  useEffect(() => {
    persistCart(items)
  }, [items])

  const addToCart = useCallback((book: Book) => {
    setItems((current) => {
      const existing = current.find((line) => line.bookId === book.bookId)
      if (existing) {
        return current.map((line) =>
          line.bookId === book.bookId ? { ...line, quantity: line.quantity + 1 } : line,
        )
      }
      return [
        ...current,
        {
          bookId: book.bookId,
          title: book.title,
          price: book.price,
          quantity: 1,
        },
      ]
    })
  }, [])

  const removeFromCart = useCallback((bookId: number) => {
    setItems((current) => current.filter((line) => line.bookId !== bookId))
  }, [])

  const updateQuantity = useCallback((bookId: number, quantity: number) => {
    if (quantity < 1) {
      removeFromCart(bookId)
      return
    }
    setItems((current) =>
      current.map((line) => (line.bookId === bookId ? { ...line, quantity } : line)),
    )
  }, [removeFromCart])

  const clearCart = useCallback(() => {
    setItems([])
  }, [])

  const { totalItemCount, totalPrice } = useMemo(() => {
    const totalItemCount = items.reduce((sum, line) => sum + line.quantity, 0)
    const totalPrice = items.reduce((sum, line) => sum + line.price * line.quantity, 0)
    return { totalItemCount, totalPrice }
  }, [items])

  const value = useMemo(
    () => ({
      items,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      totalItemCount,
      totalPrice,
    }),
    [items, addToCart, removeFromCart, updateQuantity, clearCart, totalItemCount, totalPrice],
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return ctx
}
