import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ChevronRight, Search, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

export function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-24 pb-16 md:pt-32 md:pb-24">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 -left-12 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float" />
        <div className="absolute top-1/4 right-0 w-80 h-80 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-sky-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float" style={{ animationDelay: '4s' }} />
      </div>

      <div className="container px-4 mx-auto relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 mb-6">
              Discover Your Perfect
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-400 px-2">
                Scholarship
              </span>
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Navigate thousands of scholarships and government schemes to find the perfect funding for your educational journey.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link to="/scholarships">
              <Button
                className="bg-gradient-to-r from-blue-600 to-blue-500 text-white px-6 py-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:from-blue-700 hover:to-blue-600 text-base w-full sm:w-auto"
                size="lg"
              >
                Find Scholarships
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>

            <Link to="/schemes">
              <Button
                variant="outline"
                className="bg-white border-gray-200 text-gray-700 hover:bg-gray-50 px-6 py-6 rounded-lg shadow-sm hover:shadow transition-all duration-300 text-base w-full sm:w-auto"
                size="lg"
              >
                Explore Schemes
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>

            <Link to="/scholarship-recommendation">
              <Button
                className="bg-gradient-to-r from-purple-600 to-pink-500 text-white px-6 py-6 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 hover:from-purple-700 hover:to-pink-600 text-base w-full sm:w-auto"
                size="lg"
              >
                Get Recommendations
                <Sparkles className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-12 max-w-2xl mx-auto"
          >
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-4 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all bg-white shadow-sm"
                placeholder="Search scholarships, schemes, or keywords..."
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
