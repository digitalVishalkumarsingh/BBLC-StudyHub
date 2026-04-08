'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Navigation } from 'swiper/modules';
import Image from 'next/image';
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import { FiCheckCircle, FiWifi, FiWind, FiDroplet, FiMapPin, FiClock, FiStar, FiArrowRight } from 'react-icons/fi';

export default function HomePage() {
  return (
    <div className="pt-20 min-h-screen bg-gradient-to-b from-white via-blue-50 to-white mt-4">
      {/* Hero Swiper Section */}
      <div className="w-full px-4 md:px-6 lg:px-8">
        <Swiper
          modules={[Autoplay, EffectFade, Navigation]}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          effect="fade"
          loop={true}
          navigation={true}
          className="h-[70vh] w-full rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl"
        >
          <SwiperSlide>
            <div className="relative h-full w-full">
              <Image
                src="/heroimg/pexels-pixabay-159775.jpg"
                alt="Library peaceful environment with individual study desks"
                fill
                priority
                sizes="100vw"
                className="object-cover brightness-90"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent">
                <div className="flex flex-col justify-center h-full px-6 md:px-12 lg:px-20 max-w-2xl">
                  <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
                    Peaceful Environment for <span className="text-blue-300">Focused Learning</span>
                  </h1>
                  <p className="text-lg md:text-xl text-blue-100 mb-8">
                    Designed to help you achieve your academic goals with zero distractions
                  </p>
                  <button className="w-fit px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full transition-all duration-300 transform hover:scale-105 flex items-center gap-2">
                    Explore Now <FiArrowRight />
                  </button>
                </div>
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="relative h-full w-full">
              <Image
                src="/heroimg/WhatsApp Image 2025-04-21 at 12.12.05_d4e63f5b.jpg"
                alt="Spacious study desks in library"
                fill
                sizes="100vw"
                className="object-cover brightness-90"
              />
              <div className="absolute inset-0 bg-gradient-to-l from-black/70 via-black/50 to-transparent">
                <div className="flex flex-col justify-center h-full items-end px-6 md:px-12 lg:px-20">
                  <div className="text-right max-w-2xl">
                    <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
                      Personal Study Spaces
                    </h1>
                    <p className="text-lg md:text-xl text-blue-100 mb-8">
                      Dedicated desks with privacy dividers for maximum concentration
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="relative h-full w-full">
              <Image
                src="/heroimg/WhatsApp Image 2025-04-21 at 12.12.04_df939f16.jpg"
                alt="Library festive collection and decorations"
                fill
                sizes="100vw"
                className="object-cover brightness-90"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
                <div className="flex flex-col justify-end h-full px-6 md:px-12 lg:px-20 pb-12">
                  <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 text-center">
                    Discover Cultural Heritage
                  </h1>
                  <p className="text-lg md:text-xl text-blue-100 text-center max-w-3xl mx-auto">
                    Explore our special festive collection showcasing stories, traditions, and cultures from around the world
                  </p>
                </div>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>

        {/* Why Choose BBLC Section */}
        <div className="max-w-7xl mx-auto mt-12 mb-16">
          <div className="bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500 rounded-2xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0 bg-grid-pattern"></div>
            </div>
            
            <div className="relative z-10">
              <div className="text-center mb-10">
                <div className="inline-flex items-center gap-3 mb-4">
                  <div className="w-12 h-1 bg-yellow-400 rounded-full"></div>
                  <span className="text-yellow-300 font-semibold tracking-widest text-sm uppercase">Why Choose Us</span>
                  <div className="w-12 h-1 bg-yellow-400 rounded-full"></div>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                  Why Choose <span className="text-yellow-300">BBLC</span>
                </h1>
                <p className="text-blue-100 text-lg md:text-xl max-w-4xl mx-auto">
                  Baba Bamokhar Library Centre – Where focus meets comfort
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8 mb-10">
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                      <FiWifi className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">High-Speed Wi-Fi</h3>
                      <p className="text-blue-100">Uninterrupted internet access for research and online learning</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                      <FiWind className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">Climate Controlled</h3>
                      <p className="text-blue-100">Fully air-conditioned study halls for year-round comfort</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                      <FiDroplet className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">Pure RO Water</h3>
                      <p className="text-blue-100">Clean drinking water available 24/7</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                      <FiMapPin className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">Ample Parking</h3>
                      <p className="text-blue-100">Secure parking space for your convenience</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                      <FiClock className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">Flexible Timings</h3>
                      <p className="text-blue-100">Multiple batch options to fit your schedule</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                      <FiCheckCircle className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">Distraction-Free</h3>
                      <p className="text-blue-100">Silent zones and individual study spaces</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <button className="group px-8 py-4 bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-bold text-lg rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-2xl flex items-center gap-3 mx-auto">
                  <span>Join BBLC Today</span>
                  <FiArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Batch Timing Section */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 mb-16">
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-8 h-1 bg-blue-500 rounded-full"></div>
            <span className="text-blue-600 font-semibold tracking-widest text-sm uppercase">Study Schedules</span>
            <div className="w-8 h-1 bg-blue-500 rounded-full"></div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Choose Your <span className="text-blue-600">Perfect Batch</span>
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Flexible timing options designed to match your study rhythm
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              title: "Morning Batch",
              time: "6:00 AM - 2:00 PM",
              description: "Start your day fresh with our Morning Batch. Perfect for early risers who want to maximize productivity in peaceful morning hours.",
              icon: "☀️",
              color: "from-blue-400 to-cyan-400"
            },
            {
              title: "Mid Morning Batch",
              time: "10:00 AM - 5:00 PM",
              description: "Ideal for those who prefer a balanced start. Enjoy focused afternoon sessions in a calm environment.",
              icon: "⏰",
              color: "from-purple-400 to-pink-400"
            },
            {
              title: "Afternoon Batch",
              time: "2:00 PM - 9:00 PM",
              description: "Perfect for night owls and afternoon learners. Study during quieter evening hours with minimal distractions.",
              icon: "🌙",
              color: "from-orange-400 to-red-400"
            },
            {
              title: "Full Day Batch",
              time: "6:00 AM - 9:00 PM",
              description: "Uninterrupted access for dedicated learners. Perfect for exam preparation and intensive study sessions.",
              icon: "⭐",
              color: "from-green-400 to-emerald-400"
            }
          ].map((batch, index) => (
            <div
              key={index}
              className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-blue-200"
            >
              <div className={`h-2 bg-gradient-to-r ${batch.color}`}></div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="text-3xl">{batch.icon}</div>
                  <span className="px-3 py-1 bg-blue-50 text-blue-600 text-sm font-semibold rounded-full">
                    Most Popular
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{batch.title}</h3>
                <div className="flex items-center gap-2 text-blue-600 font-semibold mb-4">
                  <FiClock className="w-4 h-4" />
                  <span>{batch.time}</span>
                </div>
                <p className="text-gray-600 mb-6">{batch.description}</p>
                <button
                  onClick={() => window.location.href = `/unified-payment?batch=${encodeURIComponent(batch.title)}&plan=Monthly`}
                  className="w-full py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-lg transition-all duration-300 transform group-hover:scale-[1.02] flex items-center justify-center gap-2"
                >
                  Book Now
                  <FiArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-6 text-sm text-gray-500">
          <p>Need a custom schedule? <a href="/contact" className="text-blue-600 hover:text-blue-700 font-semibold">Contact us</a></p>
        </div>
      </div>

      {/* Reviews CTA Section */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8 mb-16">
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-8 md:p-10 text-center shadow-lg border border-blue-100">
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-2 mb-6">
              {[...Array(5)].map((_, i) => (
                <FiStar key={i} className="w-8 h-8 text-yellow-400 fill-yellow-400" />
              ))}
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Join Our Community of <span className="text-blue-600">Satisfied Learners</span>
            </h2>
            <p className="text-gray-600 text-lg mb-8 max-w-2xl">
              See what hundreds of students have to say about their BBLC experience
            </p>
            <a
              href="https://www.google.com/search?hl=en-IN&gl=in&q=CVGC%2BJ2J+BBLC+LIBRARY%E2%9D%A4%EF%B8%8F+:Baba+Bamokhar+Library+Center,+Ramai+Patti,+Sarai+Takki,+Uttar+Pradesh+221202&ludocid=6647756391405520250&lsig=AB86z5XzYyE5tmM-AagkWROtHl-v&hl=en&gl=IN#lrd=0x398fd56ab47f61d5:0x5c419337770f057a,3,,,,"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
            >
              <FiStar className="w-6 h-6" />
              Read Google Reviews
              <FiArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
            </a>
            <p className="text-sm text-gray-500 mt-4">4.8/5 ⭐ from 200+ reviews</p>
          </div>
        </div>
      </div>

      {/* Add custom CSS for grid pattern */}
      <style jsx global>{`
        .bg-grid-pattern {
          background-image: 
            linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px);
          background-size: 50px 50px;
        }
      `}</style>
    </div>
  );
}