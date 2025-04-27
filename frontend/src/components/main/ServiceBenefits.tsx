"use client";

import { motion } from "framer-motion";
import { Shield, List, MessageSquare, Check } from "lucide-react";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function ServiceBenefits() {
  return (
    <section className="bg-[#2c4a3c] py-16 px-4 md:px-8 overflow-hidden relative">
      <div className="container mx-auto max-w-7xl">
        <div className="absolute top-6 right-6 opacity-30">
          <div className="grid grid-cols-6 gap-3">
            {[...Array(36)].map((_, i) => (
              <div key={i} className="h-1.5 w-1.5 rounded-full bg-gray-300" />
            ))}
          </div>
        </div>

        <div className="mb-12">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            variants={fadeIn}
          >
            <span className="text-[#b4c09f] uppercase tracking-wider text-sm mb-4 block">
              Why Choose Kén Homestay
            </span>

            <h2 className="font-playfair text-4xl md:text-5xl text-white mb-6 max-w-3xl">
              Experience the Traditional Breath in Modern Life
            </h2>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            variants={fadeIn}
            className="relative"
          >
            <div className="rounded-2xl overflow-hidden relative aspect-[4/3]">
              <iframe
                src="https://player.cloudinary.com/embed/?cloud_name=ddypjdqmq&public_id=Intro_fryeta&profile=cld-default"
                className="absolute inset-0 w-full h-full"
                frameBorder="0"
                allow="autoplay; fullscreen; encrypted-media; picture-in-picture"
                allowFullScreen
                title="Apartment video"
              ></iframe>
            </div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            variants={fadeIn}
            className="space-y-8"
          >
            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-md bg-[#b4c09f]/20 flex items-center justify-center">
                  <Shield className="text-[#b4c09f] w-6 h-6" />
                </div>
              </div>
              <div>
                <h3 className="text-[#b4c09f] text-xl font-medium mb-2">
                  Peaceful Space
                </h3>
                <p className="text-gray-300">
                  Enjoy serenity in the heart of the city
                </p>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-md bg-[#b4c09f]/20 flex items-center justify-center">
                  <List className="text-[#b4c09f] w-6 h-6" />
                </div>
              </div>
              <div>
                <h3 className="text-[#b4c09f] text-xl font-medium mb-2">
                  Unique Style
                </h3>
                <p className="text-gray-300">
                  Blending tradition and modernity
                </p>
              </div>
            </div>

            <div className="flex gap-6">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 rounded-md bg-[#b4c09f]/20 flex items-center justify-center">
                  <MessageSquare className="text-[#b4c09f] w-6 h-6" />
                </div>
              </div>
              <div>
                <h3 className="text-[#b4c09f] text-xl font-medium mb-2">
                  Dedicated Support
                </h3>
                <p className="text-gray-300">Always ready to assist you</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
