import React from "react";
import { Navbar } from "@/components/Navbar";
import { motion } from "framer-motion";

const ScholarshipRecommendation: React.FC = () => {
    return (
        <>
            <Navbar />
            <div className="container mt-32 px-4 mx-auto max-w-7xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-12"
                >
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">
                        Personalized Scholarship Recommendations
                    </h1>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Scholarships tailored to your profile, skills, and academic goals
                    </p>
                </motion.div>

                <div className="flex justify-center mb-16">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        className="w-full max-w-6xl rounded-lg overflow-hidden shadow-lg"
                    >
                        <iframe
                            src="https://akshayram1-scholership-finder.hf.space"
                            frameBorder="0"
                            width="100%"
                            height="700"
                            className="w-full"
                        ></iframe>
                    </motion.div>
                </div>
            </div>

            <footer className="bg-gray-900 text-white py-12 mt-16">
                <div className="container px-4 mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <div>
                            <h3 className="text-lg font-semibold mb-4">ScholarGate</h3>
                            <p className="text-gray-400">
                                Your gateway to educational funding opportunities.
                            </p>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                            <ul className="space-y-2">
                                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Home</a></li>
                                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Scholarships</a></li>
                                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Schemes</a></li>
                                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">About Us</a></li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold mb-4">Resources</h3>
                            <ul className="space-y-2">
                                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Application Guide</a></li>
                                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Scholarship Tips</a></li>
                                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">FAQ</a></li>
                                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Blog</a></li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold mb-4">Contact</h3>
                            <ul className="space-y-2">
                                <li className="text-gray-400">info@scholargate.com</li>
                                <li className="text-gray-400">+1 (555) 123-4567</li>
                            </ul>
                        </div>
                    </div>
                    <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-500 text-sm">
                        <p>&copy; {new Date().getFullYear()} ScholarGate. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </>
    );
};

export default ScholarshipRecommendation;