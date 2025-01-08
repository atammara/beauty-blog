'use client'

import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useCart } from "@/components/cart-context"
import { toast } from "@/hooks/use-toast"
import { motion } from 'framer-motion'

const MotionButton = motion(Button)

const featuredProducts = [
  {
    id: 1,
    name: "Radiance Serum",
    description: "Boost your skin's natural glow with our powerful serum.",
    price: 49.99,
    image: "/p5.png?height=300&width=300",
  },
  {
    id: 2,
    name: "Hydrating Mask",
    description: "Deeply moisturize and nourish your skin with this luxurious mask.",
    price: 29.99,
    image: "/p6.png?height=300&width=300",
  },
  {
    id: 3,
    name: "Gentle Exfoliating Scrub",
    description: "Reveal smoother, brighter skin with our gentle exfoliating formula.",
    price: 19.99,
    image: "/t3.png?height=300&width=300",
  },
  {
    id: 4,
    name: "Anti-Aging Night Cream",
    description: "Wake up to younger-looking skin with our potent night cream.",
    price: 59.99,
    image: "/t1.png?height=300&width=300",
  },
]

export default function FeaturedProducts() {
  const { addToCart } = useCart()

  const handleAddToCart = (product: typeof featuredProducts[0]) => {
    addToCart(product)
    toast({
      title: "Added to Cart",
      description: `${product.name} has been added to your cart.`,
      open: true,
    })
  }

  return (
    <section>
      <motion.h2 
        className="text-3xl font-bold text-gray-800 mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Featured Products
      </motion.h2>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {featuredProducts.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="flex flex-col h-full">
              <motion.div 
                className="relative aspect-square"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover rounded-t-lg"
                />
              </motion.div>
              <CardHeader>
                <CardTitle className="text-xl">{product.name}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-gray-600 mb-4">{product.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-pink-500">${product.price.toFixed(2)}</span>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <MotionButton 
                      className="bg-pink-500 hover:bg-pink-600"
                      onClick={() => handleAddToCart(product)}
                    >
                      Add to Cart
                    </MotionButton>
                  </motion.div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

