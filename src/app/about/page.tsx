'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

export default function AboutPage() {
  return (
    <motion.div
      className="max-w-3xl mx-auto"
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
        About Us
      </motion.h1>
      <motion.div
        className="bg-white rounded-lg shadow-md overflow-hidden mb-8"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <motion.div
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <Image
            src="/t5.png"
            alt="Our Team"
            width={800}
            height={400}
            className="w-full h-auto object-cover"
          />

        </motion.div>
        <div className="p-6">
          <motion.p
            className="text-gray-600 mb-4"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            Welcome to Beauty Blog, your go-to source for all things beauty and skincare. Our passion is to empower you with knowledge, tips, and product recommendations to help you look and feel your best.
          </motion.p>
          <motion.p
            className="text-gray-600 mb-4"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            Founded in 2020, Beauty Blog has quickly become a trusted voice in the beauty community. Our team of experienced beauty enthusiasts and certified dermatologists work tirelessly to bring you the most up-to-date and reliable information.
          </motion.p>
          <motion.p
            className="text-gray-600"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 1 }}
          >
            Whether you&apos;re a skincare novice or a makeup pro, we&apos;re here to guide you through the ever-evolving world of beauty. Join us on this exciting journey to discover your most radiant self!
          </motion.p>
        </div>
      </motion.div>
    </motion.div>
  )
}

