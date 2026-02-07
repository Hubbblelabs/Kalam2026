'use client';

import { MagneticButton } from '@/components/ui/MagneticButton';
import { Mail, Phone, MapPin, Send, Instagram, Linkedin, Twitter, MessageSquare } from 'lucide-react';

export default function ContactPage() {
    return (
        <div className="min-h-screen bg-[#Fdfdf8] pt-32 pb-20">
            <div className="container-custom">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24">

                    {/* Contact Info & Socials */}
                    <div className="space-y-12 animate-slide-in-left">
                        <div>
                            <h1 className="font-heading font-bold text-5xl md:text-7xl text-[#1C2533] mb-6">
                                Get in <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1C5D99] to-[#F5B301]">Touch</span>
                            </h1>
                            <p className="text-xl text-[#6B7B8C] leading-relaxed">
                                Have questions about the event? Want to sponsor us? Or just want to say hi? We'd love to hear from you.
                            </p>
                        </div>

                        <div className="space-y-8">
                            <div className="flex gap-6 items-start group">
                                <div className="p-4 rounded-full bg-[#1C5D99]/5 text-[#1C5D99] group-hover:bg-[#1C5D99] group-hover:text-white transition-colors duration-300">
                                    <Mail className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-[#1C2533] mb-1">Email Us</h3>
                                    <a href="mailto:contact@kalam2026.com" className="text-[#6B7B8C] hover:text-[#1C5D99] transition-colors">contact@kalam2026.com</a>
                                </div>
                            </div>

                            <div className="flex gap-6 items-start group">
                                <div className="p-4 rounded-full bg-[#F5B301]/10 text-[#F5B301] group-hover:bg-[#F5B301] group-hover:text-white transition-colors duration-300">
                                    <Phone className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-[#1C2533] mb-1">Call Us</h3>
                                    <a href="tel:+919876543210" className="text-[#6B7B8C] hover:text-[#1C5D99] transition-colors">+91 98765 43210</a>
                                </div>
                            </div>

                            <div className="flex gap-6 items-start group">
                                <div className="p-4 rounded-full bg-[#1C5D99]/5 text-[#1C5D99] group-hover:bg-[#1C5D99] group-hover:text-white transition-colors duration-300">
                                    <MapPin className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-[#1C2533] mb-1">Visit Us</h3>
                                    <p className="text-[#6B7B8C]">University Campus, Main Block,<br />Tech City, India - 500001</p>
                                </div>
                            </div>
                        </div>

                        <div className="pt-8 border-t border-gray-200">
                            <h3 className="text-lg font-bold text-[#1C2533] mb-6">Follow Us</h3>
                            <div className="flex gap-4">
                                {[Instagram, Linkedin, Twitter, MessageSquare].map((Icon, i) => (
                                    <a
                                        key={i}
                                        href="#"
                                        className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center text-[#6B7B8C] hover:bg-[#1C5D99] hover:text-white hover:border-[#1C5D99] transition-all duration-300 hover:-translate-y-1"
                                    >
                                        <Icon className="w-5 h-5" />
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="bg-white p-8 md:p-10 rounded-3xl shadow-xl border border-gray-100 animate-slide-in-right">
                        <h2 className="text-2xl font-bold text-[#1C2533] mb-8">Send us a message</h2>
                        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label htmlFor="name" className="text-sm font-semibold text-[#1C2533] ml-1">Name</label>
                                    <input
                                        type="text"
                                        id="name"
                                        className="w-full px-5 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-[#1C5D99] focus:ring-2 focus:ring-[#1C5D99]/20 outline-none transition-all placeholder:text-gray-400"
                                        placeholder="John Doe"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label htmlFor="email" className="text-sm font-semibold text-[#1C2533] ml-1">Email</label>
                                    <input
                                        type="email"
                                        id="email"
                                        className="w-full px-5 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-[#1C5D99] focus:ring-2 focus:ring-[#1C5D99]/20 outline-none transition-all placeholder:text-gray-400"
                                        placeholder="john@example.com"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="subject" className="text-sm font-semibold text-[#1C2533] ml-1">Subject</label>
                                <select
                                    id="subject"
                                    className="w-full px-5 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-[#1C5D99] focus:ring-2 focus:ring-[#1C5D99]/20 outline-none transition-all text-[#6B7B8C]"
                                >
                                    <option>General Inquiry</option>
                                    <option>Sponsorship</option>
                                    <option>Event Participation</option>
                                    <option>Technical Issue</option>
                                </select>
                            </div>

                            <div className="space-y-2">
                                <label htmlFor="message" className="text-sm font-semibold text-[#1C2533] ml-1">Message</label>
                                <textarea
                                    id="message"
                                    rows={5}
                                    className="w-full px-5 py-3 rounded-xl bg-gray-50 border border-gray-200 focus:border-[#1C5D99] focus:ring-2 focus:ring-[#1C5D99]/20 outline-none transition-all placeholder:text-gray-400 resize-none"
                                    placeholder="Your message here..."
                                ></textarea>
                            </div>

                            < MagneticButton>
                                <button className="w-full relative px-8 py-4 bg-[#1C5D99] text-white rounded-xl overflow-hidden group font-medium text-lg shadow-lg shadow-[#1C5D99]/20">
                                    <div className="absolute inset-0 bg-[#F5B301] translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500 ease-out" />
                                    <div className="relative flex items-center justify-center gap-3">
                                        <span>Send Message</span>
                                        <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                    </div>
                                </button>
                            </MagneticButton>
                        </form>
                    </div>

                </div>
            </div>
        </div>
    );
}
