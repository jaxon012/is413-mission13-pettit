import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'

export default function CartSummary() {
  const { items, totalItemCount, totalPrice } = useCart()

  return (
    <>
      <div className="card shadow-sm mb-3">
        <div className="card-body">
          <div className="d-flex align-items-center justify-content-between gap-2 mb-2">
            <h2 className="h6 mb-0">Cart summary</h2>
            <span className="badge bg-primary rounded-pill">{totalItemCount}</span>
          </div>
          <p className="mb-2">
            <span className="text-muted">Total: </span>
            <strong>${totalPrice.toFixed(2)}</strong>
          </p>
          <div className="d-grid gap-2">
            <Link className="btn btn-primary btn-sm" to="/cart">
              View full cart
            </Link>
            <button
              className="btn btn-outline-secondary btn-sm"
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target="#cartOffcanvas"
              aria-controls="cartOffcanvas"
            >
              Quick cart preview
            </button>
          </div>
        </div>
      </div>

      <div
        className="offcanvas offcanvas-end"
        tabIndex={-1}
        id="cartOffcanvas"
        aria-labelledby="cartOffcanvasLabel"
      >
        <div className="offcanvas-header">
          <h2 className="offcanvas-title h5" id="cartOffcanvasLabel">
            Cart preview
          </h2>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          />
        </div>
        <div className="offcanvas-body">
          {items.length === 0 ? (
            <p className="text-muted mb-0">Your cart is empty.</p>
          ) : (
            <ul className="list-group list-group-flush">
              {items.map((line) => (
                <li key={line.bookId} className="list-group-item px-0">
                  <div className="fw-semibold">{line.title}</div>
                  <div className="small text-muted">
                    ${line.price.toFixed(2)} × {line.quantity} = $
                    {(line.price * line.quantity).toFixed(2)}
                  </div>
                </li>
              ))}
            </ul>
          )}
          <hr />
          <p className="mb-3">
            <strong>Total:</strong> ${totalPrice.toFixed(2)}
          </p>
          <Link className="btn btn-primary w-100" to="/cart" data-bs-dismiss="offcanvas">
            Go to cart
          </Link>
        </div>
      </div>
    </>
  )
}
