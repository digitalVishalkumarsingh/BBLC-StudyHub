'use client';
import Image from 'next/image';
import React from 'react';

export default function Page() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-teal-50 to-green-50">
      {/* Hero Banner */}
      <div className="relative w-full h-[400px] md:h-[500px] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70 z-10" />

        <Image
          src="/heroimg/pexels-pixabay-159775.jpg"
          alt="Facilities Banner"
          fill
          priority
          className="object-cover"
          sizes="100vw"
          quality={90}
        />
        <div className="absolute inset-0 z-20 flex flex-col justify-center items-center px-4">
          <h1 className="text-white text-4xl md:text-6xl font-bold text-center mb-6 leading-tight">
            About BBLC
          </h1>
          <p className="text-white text-xl md:text-2xl text-center max-w-3xl font-medium opacity-95">
            Creating an oasis for learning, focus, and personal growth
          </p>
          <div className="mt-8 w-24 h-1 bg-yellow-400 rounded-full"></div>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 py-12 md:py-20 -mt-12 md:-mt-20 relative z-30">
        {/* Main Content Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-6 md:p-12 mb-16 transform transition-all duration-300 hover:shadow-3xl">
          <div className="text-center mb-12">
            <div className="inline-block mb-4">
              <span className="text-5xl md:text-6xl font-black bg-gradient-to-r from-blue-600 via-teal-500 to-green-500 bg-clip-text text-transparent">
                Our Story
              </span>
            </div>
            <p className="text-lg md:text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed">
              Welcome to <span className="font-bold text-blue-600">BBLC – Baba Bamokhar Library Centre</span>. Born from a vision to create a sanctuary for knowledge seekers, we are a community-driven space designed to foster productivity, learning, and personal growth. Whether you're preparing for competitive exams, working on research, or simply seeking a peaceful environment to read, we offer the perfect setting tailored to your needs.
            </p>
          </div>

          {/* Mission & Vision */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <div className="bg-gradient-to-br from-blue-50 to-teal-50 rounded-xl p-8 border-l-4 border-blue-500">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mr-4">
                  <span className="text-white text-2xl">🎯</span>
                </div>
                <h2 className="text-3xl font-bold text-gray-800">Our Mission</h2>
              </div>
              <p className="text-gray-700 text-lg leading-relaxed">
                To provide an environment that promotes learning, focus, and growth through fully-equipped study spaces, cutting-edge technology, and a supportive community that empowers every individual to reach their full potential.
              </p>
            </div>

            <div className="bg-gradient-to-br from-green-50 to-teal-50 rounded-xl p-8 border-l-4 border-green-500">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center mr-4">
                  <span className="text-white text-2xl">👁️</span>
                </div>
                <h2 className="text-3xl font-bold text-gray-800">Our Vision</h2>
              </div>
              <p className="text-gray-700 text-lg leading-relaxed">
                To become the premier destination for learners and thinkers, creating a ripple effect of knowledge and innovation that transforms communities and shapes future leaders.
              </p>
            </div>
          </div>

          {/* Key Features */}
          <div className="mb-16">
            <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
              Why Choose <span className="text-blue-600">BBLC</span>?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="group bg-white rounded-xl p-8 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border border-gray-100">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6 group-hover:bg-blue-500 group-hover:scale-110 transition-all duration-300">
                  <span className="text-2xl">🚀</span>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-800">High-Speed Wi-Fi</h3>
                <p className="text-gray-600 leading-relaxed">
                  Stay connected with our enterprise-grade fiber internet. Perfect for research, online classes, and seamless collaboration.
                </p>
              </div>

              <div className="group bg-white rounded-xl p-8 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border border-gray-100">
                <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mb-6 group-hover:bg-teal-500 group-hover:scale-110 transition-all duration-300">
                  <span className="text-2xl">💺</span>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-800">Ergonomic Comfort</h3>
                <p className="text-gray-600 leading-relaxed">
                  Study in comfort with premium ergonomic chairs, climate-controlled spaces, and optimized lighting designed for long study sessions.
                </p>
              </div>

              <div className="group bg-white rounded-xl p-8 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border border-gray-100">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6 group-hover:bg-green-500 group-hover:scale-110 transition-all duration-300">
                  <span className="text-2xl">🅿️</span>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-800">Secure Parking</h3>
                <p className="text-gray-600 leading-relaxed">
                  Convenient, secure parking with 24/7 surveillance. Focus on your studies while we ensure your vehicle's safety.
                </p>
              </div>
            </div>
          </div>

          {/* Team Section */}
          <div className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-800 mb-4">Meet Our Leadership</h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                Passionate individuals dedicated to creating the perfect learning environment
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { name: "John Doe", role: "Founder & CEO", img: "/avter.jpg" },
                { name: "Jane Smith", role: "Operations Manager", img: "/team2.jpg" },
                { name: "Mark Wilson", role: "Community Outreach", img: "/team3.jpg" }
              ].map((member, index) => (
                <div key={index} className="group bg-gradient-to-b from-white to-gray-50 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 text-center">
                  <div className="relative w-48 h-48 mx-auto mb-6 overflow-hidden rounded-full border-4 border-white shadow-lg group-hover:scale-105 transition-transform duration-300">
                    <Image
                      src={member.img}
                      alt={member.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover"
                    />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">{member.name}</h3>
                  <p className="text-gray-600 mb-4">{member.role}</p>
                  <div className="w-12 h-1 bg-gradient-to-r from-blue-500 to-teal-500 mx-auto rounded-full"></div>
                </div>
              ))}
            </div>
          </div>

          {/* Call to Action */}
          <div className="relative overflow-hidden rounded-2xl">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-teal-500 to-green-500 opacity-90"></div>
            <div className="relative z-10 p-12 text-center">
              <h2 className="text-4xl font-bold text-white mb-6">
                Ready to Transform Your Study Experience?
              </h2>
              <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                Join hundreds of successful learners who have achieved their goals with BBLC. Your journey to excellence starts here.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="px-8 py-4 bg-white text-blue-600 font-bold text-lg rounded-full hover:bg-gray-100 hover:scale-105 transition-all duration-300 shadow-lg">
                  Book a Tour
                </button>
                <button className="px-8 py-4 bg-yellow-400 text-gray-900 font-bold text-lg rounded-full hover:bg-yellow-500 hover:scale-105 transition-all duration-300 shadow-lg">
                  Join Today
                </button>
              </div>
              <p className="text-white/80 mt-8">
                Limited time offer: First month free for students
              </p>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="grid md:grid-cols-3 gap-6 text-center">
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="text-3xl font-bold text-blue-600 mb-2">500+</div>
            <div className="text-gray-600">Happy Members</div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="text-3xl font-bold text-teal-600 mb-2">24/7</div>
            <div className="text-gray-600">Study Access</div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="text-3xl font-bold text-green-600 mb-2">99%</div>
            <div className="text-gray-600">Member Satisfaction</div>
          </div>
        </div>
      </div>
    </div>
  );
}