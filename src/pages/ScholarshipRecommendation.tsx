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
        </>
    );
};

export default ScholarshipRecommendation;