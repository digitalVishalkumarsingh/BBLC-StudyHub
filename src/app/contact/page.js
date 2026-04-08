'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Mail, Phone, MessageSquare, MapPin, Send, CheckCircle } from 'lucide-react';

export default function Page() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [status, setStatus] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const userName = localStorage.getItem('userName');
        if (!userName) {
            router.replace('/login');
        }
    }, [router]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        setStatus("");

        const formData = { name, email, message };

        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();
            if (response.ok) {
                setStatus("success");
                setName("");
                setEmail("");
                setMessage("");
                setTimeout(() => setStatus(""), 3000);
            } else {
                setStatus("error");
            }
        } catch (error) {
            setStatus("error");
        } finally {
            setIsSubmitting(false);
        }
    };

    const contactInfo = [
        {
            icon: <Mail className="w-8 h-8" />,
            title: "Email Us",
            details: "support@bblc.com\ninfo@bblc.com",
            color: "from-blue-500 to-cyan-500",
            bgColor: "bg-blue-50",
        },
        {
            icon: <Phone className="w-8 h-8" />,
            title: "Call Us",
            details: "+91 98765 43210\n+91 98765 43211",
            color: "from-green-500 to-emerald-500",
            bgColor: "bg-green-50",
        },
        {
            icon: <MessageSquare className="w-8 h-8" />,
            title: "Social Media",
            details: "@BBLC_Official\nConnect with us",
            color: "from-purple-500 to-pink-500",
            bgColor: "bg-purple-50",
        },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
            {/* Hero Banner */}
            <div className="relative w-full h-[400px] md:h-[500px] overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30 z-10" />
                <Image
                    src="/heroimg/pexels-pixabay-159775.jpg"
                    alt="Contact Us Banner"
                    fill
                    priority
                    className="object-cover object-center"
                    sizes="100vw"
                    quality={90}
                />
                <div className="absolute inset-0 z-20 flex flex-col justify-center items-center px-4">
                    <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-6 leading-tight">
                        Get In Touch
                    </h1>
                    <p className="text-white/90 text-lg md:text-xl text-center max-w-2xl font-medium">
                        We're here to help and answer any questions you might have
                    </p>
                    <div className="mt-8 flex items-center gap-2">
                        <div className="w-6 h-1 bg-yellow-400 rounded-full"></div>
                        <div className="w-12 h-1 bg-yellow-400 rounded-full"></div>
                        <div className="w-6 h-1 bg-yellow-400 rounded-full"></div>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 md:px-6 py-12 -mt-12 md:-mt-35 relative z-30">
                {/* Contact Information Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
                    {contactInfo.map((info, index) => (
                        <div
                            key={index}
                            className={`${info.bgColor} rounded-2xl p-8 shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 border border-gray-100`}
                        >
                            <div className={`inline-flex p-4 rounded-xl bg-gradient-to-br ${info.color} mb-6`}>
                                <div className="text-white">
                                    {info.icon}
                                </div>
                            </div>
                            <h3 className="text-2xl font-bold text-gray-800 mb-4">{info.title}</h3>
                            <p className="text-gray-600 whitespace-pre-line leading-relaxed">
                                {info.details}
                            </p>
                            <button className={`mt-6 px-6 py-2 rounded-lg font-medium text-white bg-gradient-to-r ${info.color} hover:opacity-90 transition-all duration-300`}>
                                Reach Out
                            </button>
                        </div>
                    ))}
                </div>

                {/* Main Content Section */}
                <div className="bg-white rounded-3xl shadow-2xl overflow-hidden mb-16">
                    <div className="grid lg:grid-cols-2">
                        {/* Contact Form */}
                        <div className="p-8 md:p-12 bg-gradient-to-br from-gray-50 to-white">
                            <div className="max-w-lg mx-auto">
                                <div className="flex items-center gap-3 mb-8">
                                    <div className="p-3 bg-blue-100 rounded-lg">
                                        <MessageSquare className="w-6 h-6 text-blue-600" />
                                    </div>
                                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
                                        Send us a Message
                                    </h2>
                                </div>
                                
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div>
                                        <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                                            Full Name
                                        </label>
                                        <div className="relative">
                                            <input
                                                type="text"
                                                id="name"
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                                className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                                placeholder="Enter your full name"
                                                required
                                            />
                                            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                                                👤
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                                            Email Address
                                        </label>
                                        <div className="relative">
                                            <input
                                                type="email"
                                                id="email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                className="w-full px-4 py-3 pl-12 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                                                placeholder="Enter your email address"
                                                required
                                            />
                                            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                                                ✉️
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                                            Your Message
                                        </label>
                                        <textarea
                                            id="message"
                                            value={message}
                                            onChange={(e) => setMessage(e.target.value)}
                                            rows="5"
                                            className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                                            placeholder="Tell us how we can help you..."
                                            required
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className={`w-full py-3 rounded-xl font-semibold text-lg transition-all duration-300 flex items-center justify-center gap-2 ${
                                            isSubmitting 
                                            ? 'bg-gray-400 cursor-not-allowed' 
                                            : 'bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 hover:shadow-lg'
                                        }`}
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                                Sending...
                                            </>
                                        ) : (
                                            <>
                                                <Send className="w-5 h-5" />
                                                Send Message
                                            </>
                                        )}
                                    </button>

                                    {status === "success" && (
                                        <div className="p-4 bg-green-50 border border-green-200 rounded-xl flex items-center gap-3 animate-fade-in">
                                            <CheckCircle className="w-5 h-5 text-green-600" />
                                            <span className="text-green-700 font-medium">
                                                Message sent successfully! We'll get back to you soon.
                                            </span>
                                        </div>
                                    )}

                                    {status === "error" && (
                                        <div className="p-4 bg-red-50 border border-red-200 rounded-xl">
                                            <span className="text-red-700 font-medium">
                                                Failed to send message. Please try again.
                                            </span>
                                        </div>
                                    )}
                                </form>
                            </div>
                        </div>

                        {/* Map and Location Info */}
                        <div className="p-8 md:p-12 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
                            <div className="h-full flex flex-col">
                                <div className="flex items-center gap-3 mb-8">
                                    <div className="p-3 bg-white/10 rounded-lg">
                                        <MapPin className="w-6 h-6" />
                                    </div>
                                    <h2 className="text-3xl md:text-4xl font-bold">
                                        Visit Our Center
                                    </h2>
                                </div>

                                <div className="mb-6">
                                    <h3 className="text-xl font-semibold mb-3 text-gray-200">Address</h3>
                                    <p className="text-gray-300 leading-relaxed">
                                        Baba Bamokhar Library Center (BBLC)<br />
                                        Main Road, Near City Center<br />
                                        Varanasi, Uttar Pradesh 221001<br />
                                        India
                                    </p>
                                </div>

                                <div className="mb-6">
                                    <h3 className="text-xl font-semibold mb-3 text-gray-200">Operating Hours</h3>
                                    <ul className="space-y-2 text-gray-300">
                                        <li className="flex justify-between">
                                            <span>Monday - Friday</span>
                                            <span className="font-medium">8:00 AM - 10:00 PM</span>
                                        </li>
                                        <li className="flex justify-between">
                                            <span>Saturday - Sunday</span>
                                            <span className="font-medium">9:00 AM - 8:00 PM</span>
                                        </li>
                                    </ul>
                                </div>

                                {/* Map Container */}
                                <div className="flex-1 rounded-xl overflow-hidden border-2 border-white/20">
                                    <iframe
                                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3603.3496921097017!2d82.86744307517144!3d25.426569977564068!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x398fd56ab47f61d5%3A0x5c419337770f057a!2sBaba%20bamokhar%20library%20center(BBLC)!5e0!3m2!1sen!2sin!4v1745231735808!5m2!1sen!2sin"
                                        width="100%"
                                        height="100%"
                                        style={{ border: 0 }}
                                        allowFullScreen=""
                                        loading="lazy"
                                        referrerPolicy="no-referrer-when-downgrade"
                                        className="min-h-[300px]"
                                        title="BBLC Location Map"
                                    />
                                </div>

                                <div className="mt-6 p-4 bg-white/10 rounded-xl">
                                    <p className="text-gray-300 text-sm">
                                        <span className="font-semibold">Parking Available:</span> Yes, dedicated parking area<br />
                                        <span className="font-semibold">Wheelchair Accessible:</span> Yes<br />
                                        <span className="font-semibold">Nearest Metro:</span> 1.5 km away
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Additional Contact Info */}
                <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-2xl p-8 border border-blue-100">
                    <div className="text-center mb-8">
                        <h3 className="text-2xl font-bold text-gray-800 mb-3">Need Immediate Assistance?</h3>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            Our support team is available to help you with any urgent inquiries or technical issues.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                        <div className="bg-white p-6 rounded-xl shadow-sm">
                            <div className="text-2xl font-bold text-blue-600 mb-2">24/7</div>
                            <div className="text-gray-700 font-medium">Email Support</div>
                        </div>
                        <div className="bg-white p-6 rounded-xl shadow-sm">
                            <div className="text-2xl font-bold text-green-600 mb-2">30 min</div>
                            <div className="text-gray-700 font-medium">Average Response Time</div>
                        </div>
                        <div className="bg-white p-6 rounded-xl shadow-sm">
                            <div className="text-2xl font-bold text-purple-600 mb-2">98%</div>
                            <div className="text-gray-700 font-medium">Customer Satisfaction</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}