'use client';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Wifi, Car, Users, Clock, Monitor, Coffee, BookOpen, Video } from 'lucide-react';

export default function Page() {
  const facilities = [
    {
      icon: <Wifi className="w-12 h-12" />,
      title: "High-Speed Wi-Fi",
      description: "Stay connected with our fast and reliable Wi-Fi throughout the facility. Perfect for research, online classes, or any work that requires constant internet access.",
      gradient: "from-blue-400 to-cyan-400"
    },
    {
      icon: <Monitor className="w-12 h-12" />,
      title: "Smart Classrooms",
      description: "Fully-equipped digital classrooms with interactive displays, projectors, and audio systems for an enhanced learning experience.",
      gradient: "from-purple-400 to-pink-400"
    },
    {
      icon: <BookOpen className="w-12 h-12" />,
      title: "Study Halls",
      description: "Our ergonomic seating arrangements and comfortable study halls ensure that you can study for hours without discomfort.",
      gradient: "from-green-400 to-emerald-400"
    },
    {
      icon: <Users className="w-12 h-12" />,
      title: "Conference Rooms",
      description: "Fully-equipped meeting rooms with whiteboards, projectors, and collaborative spaces for group discussions and workshops.",
      gradient: "from-orange-400 to-red-400"
    },
    {
      icon: <Coffee className="w-12 h-12" />,
      title: "Cafeteria & Lounge",
      description: "Relax and recharge in our modern cafeteria with complimentary beverages and comfortable lounge areas.",
      gradient: "from-yellow-400 to-amber-400"
    },
    {
      icon: <Car className="w-12 h-12" />,
      title: "Ample Parking",
      description: "We provide plenty of secure parking space to make your visit hassle-free and convenient.",
      gradient: "from-indigo-400 to-blue-400"
    }
  ];

  const batches = [
    {
      title: "Morning Batch",
      time: "6:00 AM - 2:00 PM",
      description: "Start your day with focused study time in our quiet morning sessions. Ideal for early risers and productive starts.",
      color: "bg-gradient-to-br from-blue-50 to-cyan-50",
      buttonColor: "bg-blue-600 hover:bg-blue-700",
      timing: "Morning"
    },
    {
      title: "Mid Morning Batch",
      time: "10:00 AM - 5:00 PM",
      description: "Perfect for those who prefer midday sessions. Enjoy a relaxed yet productive atmosphere during quieter hours.",
      color: "bg-gradient-to-br from-green-50 to-emerald-50",
      buttonColor: "bg-green-600 hover:bg-green-700",
      timing: "Mid Morning"
    },
    {
      title: "Afternoon Batch",
      time: "2:00 PM - 9:00 PM",
      description: "Ideal for students and professionals with flexible schedules. Focused evening sessions in a peaceful environment.",
      color: "bg-gradient-to-br from-purple-50 to-pink-50",
      buttonColor: "bg-purple-600 hover:bg-purple-700",
      timing: "Afternoon"
    },
    {
      title: "Full Day Batch",
      time: "6:00 AM - 9:00 PM",
      description: "Complete access throughout the day. Perfect for intensive study sessions and comprehensive learning days.",
      color: "bg-gradient-to-br from-orange-50 to-amber-50",
      buttonColor: "bg-amber-600 hover:bg-amber-700",
      timing: "Full Day"
    }
  ];

  return (
    <>
      {/* Hero Section */}
      <div className="relative w-full h-[70vh] min-h-[500px] overflow-hidden">
        <Image
          src="/heroimg/pexels-pixabay-159775.jpg"
          alt="Modern Library Facility"
          fill
          priority
          className="object-cover brightness-75"
          sizes="100vw"
          quality={90}
        />
        
        {/* Animated Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-transparent to-gray-600/60" />
        
        <div className="absolute inset-0 flex flex-col justify-center items-center text-white px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
              World-Class <span className="bg-gradient-to-r from-cyan-300 to-emerald-300 bg-clip-text text-transparent">Facilities</span>
            </h1>
            <p className="text-xl md:text-2xl font-light max-w-2xl mx-auto leading-relaxed">
              Experience premium learning environments designed for focus, collaboration, and success
            </p>
            
            {/* Scroll Indicator */}
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
              className="mt-16"
            >
              <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
                <div className="w-1 h-3 bg-white/70 rounded-full mt-2" />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Introduction Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="inline-block mb-4">
              <span className="px-4 py-2 bg-gradient-to-r from-blue-100 to-emerald-100 text-blue-700 rounded-full text-sm font-semibold">
                Premium Learning Environment
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              State-of-the-Art <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-emerald-600">Infrastructure</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              At BBLC, we provide meticulously designed spaces that blend modern technology with comfortable environments, 
              creating the perfect setting for learning, collaboration, and personal growth.
            </p>
          </motion.div>

          {/* Facilities Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
            {facilities.map((facility, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -8 }}
                className="group"
              >
                <div className="h-full bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100">
                  <div className={`p-8 bg-gradient-to-br ${facility.gradient} h-48 flex items-center justify-center`}>
                    <div className="text-white p-4 rounded-2xl bg-white/20 backdrop-blur-sm">
                      {facility.icon}
                    </div>
                  </div>
                  <div className="p-8">
                    <h3 className="text-2xl font-bold mb-4 text-gray-800 group-hover:text-gray-900">
                      {facility.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {facility.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Conference Room Highlight */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-3xl overflow-hidden shadow-2xl">
              <div className="md:flex items-center">
                <div className="md:w-1/2 p-12">
                  <div className="inline-flex items-center gap-2 mb-4">
                    <Video className="w-6 h-6 text-blue-400" />
                    <span className="text-blue-400 font-semibold">Premium Feature</span>
                  </div>
                  <h3 className="text-3xl font-bold text-white mb-4">
                    Advanced Conference & Meeting Spaces
                  </h3>
                  <p className="text-gray-300 mb-6 leading-relaxed">
                    Our premium meeting rooms are equipped with cutting-edge technology including 
                    4K displays, video conferencing systems, smart whiteboards, and acoustic design 
                    for optimal collaboration.
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <span className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white text-sm">
                      Video Conferencing
                    </span>
                    <span className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white text-sm">
                      Smart Whiteboards
                    </span>
                    <span className="px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white text-sm">
                      Acoustic Design
                    </span>
                  </div>
                </div>
                <div className="md:w-1/2 h-64 md:h-auto">
                  <div className="w-full h-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center">
                    <div className="text-center p-8">
                      <Users className="w-24 h-24 text-white/30 mx-auto mb-4" />
                      <p className="text-white/60">Immersive Collaboration Space</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Batch Timing Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-blue-50 via-white to-emerald-50 rounded-3xl shadow-xl p-8 md:p-12"
          >
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 mb-4">
                <Clock className="w-6 h-6 text-blue-600" />
                <span className="text-blue-600 font-semibold">Flexible Scheduling</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Choose Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-emerald-600">Perfect Time</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Select from our flexible batch timings designed to fit your schedule and learning style
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {batches.map((batch, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                  className={`${batch.color} rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100`}
                >
                  <div className="mb-4">
                    <div className="w-12 h-12 rounded-lg bg-white shadow-sm flex items-center justify-center mb-4">
                      <Clock className={`w-6 h-6 ${batch.buttonColor.replace('bg-', 'text-').replace(' hover:bg-', '')}`} />
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">
                      {batch.title}
                    </h3>
                    <div className="flex items-center gap-2 text-gray-600 mb-4">
                      <Clock className="w-4 h-4" />
                      <span className="font-semibold">{batch.time}</span>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 text-sm mb-6 leading-relaxed">
                    {batch.description}
                  </p>
                  
                  <button
                    onClick={() => {
                      window.location.href = `/unified-payment?batch=${encodeURIComponent(batch.timing)}&plan=Monthly`;
                    }}
                    className={`w-full ${batch.buttonColor} text-white py-3 px-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-md hover:shadow-lg`}
                  >
                    Book This Batch
                  </button>
                </motion.div>
              ))}
            </div>

            {/* Additional Info */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="text-center md:text-left">
                  <h4 className="text-lg font-semibold text-gray-800 mb-2">
                    Need Custom Timing?
                  </h4>
                  <p className="text-gray-600">
                    Contact us for personalized batch schedules
                  </p>
                </div>
                <button
                  onClick={() => window.location.href = '/contact'}
                  className="px-8 py-3 bg-gradient-to-r from-gray-800 to-gray-900 text-white rounded-xl font-semibold hover:shadow-lg transition-all duration-300"
                >
                  Contact Us
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-blue-600 to-emerald-600">
        <div className="container mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Experience Excellence?
            </h2>
            <p className="text-xl text-blue-50 mb-10 max-w-2xl mx-auto leading-relaxed">
              Join hundreds of successful learners who have transformed their journey with our premium facilities
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => window.location.href = '/tour'}
                className="px-8 py-4 bg-white text-blue-600 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all duration-300 shadow-xl hover:shadow-2xl"
              >
                Schedule a Campus Tour
              </button>
              <button
                onClick={() => window.location.href = '/contact'}
                className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-xl font-bold text-lg hover:bg-white/10 transition-all duration-300"
              >
                Speak with Our Team
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}