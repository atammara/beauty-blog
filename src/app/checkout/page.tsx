'use client'

import { useState } from 'react'
import { useCart } from '@/components/cart-context'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/hooks/use-toast"
import { motion } from 'framer-motion'

export default function CheckoutPage() {
  const { cart, totalPrice, clearCart } = useCart()
  const { toast } = useToast()
  const [isProcessing, setIsProcessing] = useState(false)

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000))
    setIsProcessing(false)
    clearCart()
    toast({
      title: "Order Placed!",
      description: "Thank you for your purchase.",
    })
  }

  if (cart.length === 0) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold mb-4">Your cart is empty</h1>
        <p>Add some items to your cart before checking out.</p>
      </div>
    )
  }

  return (
    <motion.div 
      className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
        {cart.map((item) => (
          <div key={item.id} className="flex justify-between items-center mb-2">
            <span>{item.name} x {item.quantity}</span>
            <span>${(item.price * item.quantity).toFixed(2)}</span>
          </div>
        ))}
        <div className="border-t pt-2 mt-2">
          <div className="flex justify-between items-center font-bold">
            <span>Total</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>
        </div>
      </div>
      <form onSubmit={handleCheckout} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
          <Input id="name" type="text" required />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <Input id="email" type="email" required />
        </div>
        <div>
          <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">Address</label>
          <Input id="address" type="text" required />
        </div>
        <div>
          <label htmlFor="card" className="block text-sm font-medium text-gray-700 mb-1">Card Number</label>
          <Input id="card" type="text" placeholder="1234 5678 9012 3456" required />
        </div>
        <Button 
          type="submit" 
          className="w-full bg-pink-500 hover:bg-pink-600" 
          disabled={isProcessing}
        >
          {isProcessing ? 'Processing...' : 'Place Order'}
        </Button>
      </form>
    </motion.div>
  )
}

