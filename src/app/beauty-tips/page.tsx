'use client'

import Image from "next/image"
import { motion } from 'framer-motion'

const beautyTips = [
  {
    id: "skincare",
    title: "Skincare Tips",
    tips: [
      { id: 1, title: "Always remove your makeup before bed", content: "Sleeping with makeup on can clog pores and lead to breakouts." },
      { id: 2, title: "Use sunscreen daily", content: "Protect your skin from harmful UV rays to prevent premature aging and skin damage." },
      { id: 3, title: "Exfoliate weekly", content: "Regular exfoliation removes dead skin cells and promotes cell turnover for brighter skin." },
    ],
    image: "/t4.png?height=400&width=600",
  },
  {
    id: "makeup",
    title: "Makeup Tips",
    tips: [
      { id: 1, title: "Start with a good base", content: "Use primer to create a smooth canvas for your makeup application." },
      { id: 2, title: "Blend, blend, blend", content: "Ensure seamless transitions between different makeup products for a natural look." },
      { id: 3, title: "Choose the right foundation shade", content: "Test foundation on your jawline to find the perfect match for your skin tone." },
    ],
    image: "/t5.png?height=400&width=600",
  },
  {
    id: "haircare",
    title: "Hair Care Tips",
    tips: [
      { id: 1, title: "Don't wash your hair every day", content: "Overwashing can strip natural oils. Aim for 2-3 times a week." },
      { id: 2, title: "Use heat protectant", content: "Always apply a heat protectant before using hot styling tools." },
      { id: 3, title: "Deep condition regularly", content: "Use a deep conditioning treatment once a week for healthier, shinier hair." },
    ],
    image: "/b5.png?height=400&width=600",
  },
]

export default function BeautyTipsPage() {
  return (
    <motion.div 
      className="space-y-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h1 
        className="text-4xl font-bold text-gray-800 mb-6"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        Beauty Tips
      </motion.h1>
      {beautyTips.map((category, index) => (
        <motion.section 
          key={category.id} 
          className="bg-white rounded-lg shadow-md overflow-hidden"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 * (index + 1) }}
        >
          <div className="grid md:grid-cols-2">
            <div className="p-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">{category.title}</h2>
              <ul className="space-y-4">
                {category.tips.map((tip) => (
                  <motion.li 
                    key={tip.id}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.1 * tip.id }}
                  >
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">{tip.title}</h3>
                    <p className="text-gray-600">{tip.content}</p>
                  </motion.li>
                ))}
              </ul>
            </div>
            <motion.div 
              className="relative aspect-[4/3] md:aspect-auto"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Image
                src={category.image}
                alt={category.title}
                fill
                className="object-cover"
              />
            </motion.div>
          </div>
        </motion.section>
      ))}
    </motion.div>
  )
}

