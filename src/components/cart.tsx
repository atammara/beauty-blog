'use client'

import { useState } from 'react'
import { ShoppingCart, X } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { useCart } from '@/components/cart-context'

export default function Cart() {
  const [isOpen, setIsOpen] = useState(false)
  const { cart, removeFromCart, updateQuantity, clearCart, totalItems, totalPrice } = useCart()

  return (
    <div className="relative">
      <Button
        variant="outline"
        className="relative"
        onClick={() => setIsOpen(!isOpen)}
      >
        <ShoppingCart className="h-5 w-5" />
        {totalItems > 0 && (
          <span className="absolute -top-2 -right-2 bg-pink-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
            {totalItems}
          </span>
        )}
      </Button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg z-10">
          <div className="p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Your Cart</h3>
              <Button variant="ghost" size="sm" onClick={() => setIsOpen(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
            {cart.length === 0 ? (
              <p>Your cart is empty</p>
            ) : (
              <>
                {cart.map((item) => (
                  <div key={item.id} className="flex justify-between items-center mb-2">
                    <div>
                      <p className="font-semibold">{item.name}</p>
                      <p className="text-sm text-gray-500">${item.price.toFixed(2)} x {item.quantity}</p>
                    </div>
                    <div className="flex items-center">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      >
                        -
                      </Button>
                      <span className="mx-2">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        +
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="ml-2"
                        onClick={() => removeFromCart(item.id)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
                <div className="mt-4 border-t pt-4">
                  <p className="font-semibold">Total: ${totalPrice.toFixed(2)}</p>
                </div>
                <div className="mt-4 flex justify-between">
                  <Button variant="outline" onClick={clearCart}>Clear Cart</Button>
                  <Button className="bg-pink-500 hover:bg-pink-600">Checkout</Button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

