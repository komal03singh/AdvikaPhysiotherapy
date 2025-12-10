"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export default function Testimonials() {
  const testimonials = [
    {
      quote:
        "The doctor and atmosphere is very good. Doctor is doing good job with complete dedication. I earlier visited two more centers for my slip disc related pain issue but could get relax in my pain only here. Highly recommended.",
      name: "Mohit Aggarwal",
      image: "/mohitaggarwal.png",
    },
    {
      quote:
        "Advika Physiotherapy Clinic is a one stop solution for all Physiotherapy treatments & Dr. Swati Sharma is expert in handling her patients with care & humbleness.",
      name: "Sandeep Mishra",
      image: "/sandeepmishra.png",
    },
    {
      quote:
        "Excellent experience at Advik Phyisotherpy Clinic. The physiotherapists is knowledgeable, friendly, and truly care about the patients' well-being. The facility is clean, modern, and well-equipped.",
      name: "Himansu Maheshwari",
      image: "/himanshu.jpg",
    },
    {
      quote:"I recently had the pleasure of receiving treatment from Dr. Swati Sharma and I cannot recommend her highly enough.My mobility and discomfort have significantly improved thanks to her accurate and efficient hands-on approaches. In addition to her technical abilities, she possesses compassion and attentiveness, fostering a comforting and supporting environment.If you’re struggling with cervical pain, I highly recommend Dr. Swati Sharma.",
      name: "Prachi Malik",
      image: "/prachi.png",
    },
    {
      quote:"It was personally a great experience with Dr. Swati Sharma she is very generous with the patient And absolutely master at her work . She totally understand the problem and then start the therapy I was very happy with the  treatment and now I feel very well after my 10days session.💕😀 …",
      name: "Divya Shrivastava",
      image: "/divya.png",
    },
    {
      quote:"Had a good experience at Advika clinic was suffering from Chronic back pain for quite sometime so went for Physiotherapy The entire process was explained well and no false promises unlike many Physiotherapy clinics I have visited Drs behaviour and knowledge is at the core Recommended for people looking for Physio",
      name: "Sanjay Pandey",
      image: "/sanjay.png",
    },
    {
      quote:"I can't thank [Dr. Swati sharma ] enough for their incredible care and dedication! When I first came in, my knee was swollen like an elephant’s, and my walking pattern was completely off. But with their expert guidance, motivation, and unwavering support, I’ve made a full recovery. Today, I can walk independently with confidence, something I once thought was impossible. Their professionalism, patience, and encouragement made all the difference in my healing journey. Highly recommend to anyone in need of top-notch therapy!",
      name: "Anjali Soni",
      image: "/anjali.png",
    },
    {
      quote:"Dr Swati really help my wife to recover from shoulder pain and stiffness, she’s not only a good health care practitioner but also a very good human being who treat with patience and care.",
      name: "Vishal Sharma",
      image: "/vishal.png",
    },
    {
      quote:"Fantastic Experience it was I was suffering from Low back pain from last one year ..but my 2 visit at Advika Physiotherapy Clinic give me 80% Relief.Thank you so much Dr Swati Sharma.",
      name: "Neeraj Sharma",
      image: "/neeraj.png",
    },
    
  ];

  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  const nextTestimonial = () => {
    setCurrent((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  // Auto-slide every 2s (faster)
  useEffect(() => {
    if (!paused) {
      const timer = setInterval(nextTestimonial, 2000); // 2 seconds
      return () => clearInterval(timer);
    }
  }, [paused]);

  return (
    <section className="min-h-screen bg-[#f8f7f5] py-20 relative overflow-hidden">
      <div className="h-full max-w-4xl mx-auto px-6 text-center">
        {/* Title */}
        <motion.h2
          className="text-4xl md:text-6xl font-libertinus text-green-700 mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0, transition: { duration: 1 } }}
          whileHover={{ scale: 1.05, color: "#16a34a" }}
        >
          What our patients say
        </motion.h2>

        {/* Testimonial Card */}
        <div className="relative h-auto flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className="bg-white shadow-lg rounded-xl p-10 w-full hover:scale-105 transition-transform duration-300"
              onMouseEnter={() => setPaused(true)}
              onMouseLeave={() => setPaused(false)}
            >
              <p className="text-base md:text-xl text-[#1e3a8a] italic leading-relaxed mb-8 group-hover:text-[#2563eb] transition-colors">
                “{testimonials[current].quote}”
              </p>

              <div className="flex items-center justify-center gap-4">
                <div className="w-16 h-16 relative rounded-full overflow-hidden transition-transform duration-300 hover:scale-110">
                  <Image
                    src={testimonials[current].image}
                    alt={testimonials[current].name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="text-left">
                  <h3 className="text-base md:text-base font-semibold text-[#1e3a8a] group-hover:text-[#2563eb] transition-colors">
                    {testimonials[current].name}
                  </h3>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Controls */}
        <div className="flex justify-center gap-6 mt-10">
          <button
            onClick={prevTestimonial}
            className="w-10 h-10 flex items-center justify-center rounded-full border border-[#2563eb] text-[#2563eb] hover:bg-[#2563eb] hover:text-white transition"
          >
            ←
          </button>
          <button
            onClick={nextTestimonial}
            className="w-10 h-10 flex items-center justify-center rounded-full border border-[#2563eb] text-[#2563eb] hover:bg-[#2563eb] hover:text-white transition"
          >
            →
          </button>
        </div>
      </div>
    </section>
  );
}
