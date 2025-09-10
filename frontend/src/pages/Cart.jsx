import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../context/StoreContext.jsx';

const Cart = () => {
  const navigate = useNavigate();
  const { computeCartLines, cartSubtotal, cartItemCount, updateCartItem, removeCartItem } =
    useStore();

  const shipping = cartItemCount > 0 ? 0 : 0;
  const tax = 0;
  const total = cartSubtotal + shipping + tax;

  return (
    <div className="my-6">
      <h1 className="mb-4 text-2xl font-semibold">Your Cart</h1>
      {computeCartLines.length === 0 ? (
        <div className="rounded-md border p-6 text-center text-neutral-600">
          Your cart is empty.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="space-y-4 lg:col-span-2">
            {computeCartLines.map((line) => (
              <div
                key={line.key}
                className="flex items-center justify-between rounded-md border p-4"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={line.product.image}
                    alt={line.product.name}
                    className="h-16 w-16 rounded object-cover"
                  />
                  <div>
                    <div className="font-medium">{line.product.name}</div>
                    <div className="text-sm text-neutral-600">
                      Size: {line.size} • Color: {line.color}
                    </div>
                    <div className="text-sm text-neutral-800">Price: ${line.product.price}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    className="rounded border px-2 py-1"
                    onClick={() =>
                      updateCartItem(
                        line.productId,
                        line.size,
                        line.color,
                        Math.max(0, line.qty - 1)
                      )
                    }
                  >
                    -
                  </button>
                  <span className="w-8 text-center">{line.qty}</span>
                  <button
                    className="rounded border px-2 py-1"
                    onClick={() =>
                      updateCartItem(line.productId, line.size, line.color, line.qty + 1)
                    }
                  >
                    +
                  </button>
                  <button
                    className="ml-3 text-sm text-red-600 hover:underline"
                    onClick={() => removeCartItem(line.productId, line.size, line.color)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div>
            <div className="rounded-md border p-4">
              <div className="mb-2 flex items-center justify-between">
                <span>Subtotal</span>
                <span>${cartSubtotal.toFixed(2)}</span>
              </div>
              <div className="mb-2 flex items-center justify-between">
                <span>Shipping</span>
                <span>${shipping.toFixed(2)}</span>
              </div>
              <div className="mb-3 flex items-center justify-between">
                <span>Tax</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="flex items-center justify-between border-t pt-3 font-semibold">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <button
                className="mt-4 w-full rounded-md bg-black px-4 py-2 text-white hover:bg-neutral-800"
                onClick={() => navigate('/place-order')}
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
