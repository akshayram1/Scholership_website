import { Navbar } from "@/components/Navbar";
import { motion } from "framer-motion";

export default function AboutUs() {
  return (
    <>
      <Navbar />
      <div className="container mt-32 px-4 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            About ScholarGate
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Your gateway to educational opportunities worldwide
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="bg-white rounded-xl shadow-sm p-8 mb-10"
          >
            <h2 className="text-2xl font-semibold mb-4 text-primary">
              Our Mission
            </h2>
            <p className="text-gray-700 mb-4">
              At ScholarGate, we believe that financial constraints should never
              be a barrier to education. Our mission is to connect students with
              scholarships and government schemes that can help them achieve
              their academic and career goals.
            </p>
            <p className="text-gray-700">
              We strive to make the process of finding and applying for
              financial aid as simple and accessible as possible, empowering
              students from all backgrounds to pursue their dreams.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
            className="bg-white rounded-xl shadow-sm p-8 mb-10"
          >
            <h2 className="text-2xl font-semibold mb-4 text-primary">
              What We Do
            </h2>
            <ul className="list-disc list-inside space-y-3 text-gray-700">
              <li>
                Curate scholarships and schemes from various sources, ensuring
                they are legitimate and up-to-date
              </li>
              <li>
                Provide detailed information about eligibility criteria,
                application processes, and deadlines
              </li>
              <li>
                Offer guidance through our AI-powered chatbot to help you find
                the right opportunities
              </li>
              <li>
                Connect students with resources to improve their applications
                and increase their chances of success
              </li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.3 }}
            className="bg-white rounded-xl shadow-sm p-8"
          >
            <h2 className="text-2xl font-semibold mb-4 text-primary">
              Contact Us
            </h2>
            <p className="text-gray-700 mb-4">
              Have questions or suggestions? We'd love to hear from you!
            </p>
            <div className="space-y-2 text-gray-700">
              <p>
                <span className="font-medium">Email:</span> info@scholargate.com
              </p>
              <p>
                <span className="font-medium">Phone:</span> +1 (555) 123-4567
              </p>
              <p>
                <span className="font-medium">Address:</span> 123 Education
                Avenue, Knowledge City, 12345
              </p>
            </div>
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
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Scholarships
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Schemes
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    About Us
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Application Guide
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Scholarship Tips
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    FAQ
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Blog
                  </a>
                </li>
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
            <p>
              &copy; {new Date().getFullYear()} ScholarGate. All rights
              reserved.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
