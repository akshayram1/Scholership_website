
import { HeroSection } from '@/components/HeroSection';
import { FeaturedSection } from '@/components/FeaturedSection';
import { Navbar } from '@/components/Navbar';
import { Chatbot } from '@/components/ui/chatbot';
import { motion } from 'framer-motion';
import { ArrowRight, Award, BookOpen, GraduationCap, Users } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1">
        <HeroSection />
        
        {/* Features section */}
        <section className="py-16 bg-gray-50">
          <div className="container px-4 mx-auto">
            <div className="text-center mb-12">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Why Choose ScholarGate
                </h2>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                  Your pathway to educational funding made simple
                </p>
              </motion.div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  icon: <GraduationCap className="h-10 w-10 text-primary" />,
                  title: 'Comprehensive Database',
                  description: 'Access thousands of scholarships and schemes from a single platform.'
                },
                {
                  icon: <BookOpen className="h-10 w-10 text-primary" />,
                  title: 'Personalized Matches',
                  description: 'Get scholarship recommendations tailored to your academic profile and needs.'
                },
                {
                  icon: <Award className="h-10 w-10 text-primary" />,
                  title: 'Application Guidance',
                  description: 'Step-by-step assistance through every scholarship application process.'
                },
                {
                  icon: <Users className="h-10 w-10 text-primary" />,
                  title: 'Expert Support',
                  description: 'Connect with advisors who can help optimize your scholarship strategy.'
                }
              ].map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-all duration-300"
                >
                  <div className="rounded-full bg-primary/10 p-3 inline-flex mb-5">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
        
        <FeaturedSection />
        
        {/* Call to action section */}
        <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-500 text-white">
          <div className="container px-4 mx-auto">
            <div className="max-w-3xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Ready to Find Your Perfect Scholarship?
                </h2>
                <p className="text-xl text-blue-100 mb-8">
                  Join thousands of students who have found funding for their education through ScholarGate.
                </p>
                <a 
                  href="#" 
                  className="inline-flex items-center bg-white text-blue-600 px-6 py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 font-medium"
                >
                  Create Your Account
                  <ArrowRight className="ml-2 h-5 w-5" />
                </a>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
      
      <footer className="bg-gray-900 text-white py-12">
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
      
      <Chatbot />
    </div>
  );
};

export default Index;
