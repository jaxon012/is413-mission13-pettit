import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../context/CartContext'

export default function CartPage() {
  const navigate = useNavigate()
  const { items, updateQuantity, removeFromCart, clearCart, totalItemCount, totalPrice } =
    useCart()

  return (
    <div className="container py-4">
      <div className="row mb-3">
        <div className="col">
          <h1 className="h3 mb-0">Shopping cart</h1>
        </div>
      </div>

      {items.length === 0 ? (
        <p className="text-muted">Your cart is empty. Add books from the catalog to see them here.</p>
      ) : (
        <div className="row g-4">
          <div className="col-lg-8">
            <div className="table-responsive shadow-sm rounded">
              <table className="table table-striped align-middle mb-0">
                <thead className="table-light">
                  <tr>
                    <th scope="col">Title</th>
                    <th scope="col">Unit price</th>
                    <th scope="col">Quantity</th>
                    <th scope="col">Subtotal</th>
                    <th scope="col" className="text-end">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((line) => (
                    <tr key={line.bookId}>
                      <td>{line.title}</td>
                      <td>${line.price.toFixed(2)}</td>
                      <td>
                        <div className="d-flex align-items-center gap-2">
                          <button
                            type="button"
                            className="btn btn-sm btn-outline-secondary"
                            onClick={() => updateQuantity(line.bookId, line.quantity - 1)}
                            aria-label="Decrease quantity"
                          >
                            −
                          </button>
                          <span>{line.quantity}</span>
                          <button
                            type="button"
                            className="btn btn-sm btn-outline-secondary"
                            onClick={() => updateQuantity(line.bookId, line.quantity + 1)}
                            aria-label="Increase quantity"
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td>${(line.price * line.quantity).toFixed(2)}</td>
                      <td className="text-end">
                        <button
                          type="button"
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => removeFromCart(line.bookId)}
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className="col-lg-4">
            <div className="card shadow-sm">
              <div className="card-body">
                <p className="mb-1 text-muted">Items in cart</p>
                <p className="h5">{totalItemCount}</p>
                <p className="mb-1 text-muted">Grand total</p>
                <p className="h4 mb-3">${totalPrice.toFixed(2)}</p>
                <div className="d-grid gap-2">
                  <button type="button" className="btn btn-outline-secondary" onClick={clearCart}>
                    Clear cart
                  </button>
                  <button type="button" className="btn btn-primary" onClick={() => navigate('/')}>
                    Continue shopping
                  </button>
                  <Link className="btn btn-link" to="/">
                    Back to catalog
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}
