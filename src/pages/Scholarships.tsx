import { useState } from 'react';
import { Navbar } from '@/components/Navbar';
import { Chatbot } from '@/components/ui/chatbot';
import { ScholarshipCard, ScholarshipData } from '@/components/ScholarshipCard';
import { motion } from 'framer-motion';
import { Filter, Search, X, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import { ScholarshipSearchForm } from '@/components/ScholarshipSearchForm';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { z } from 'zod';
import { LoginForm } from '@/components/LoginForm';
import { SignupForm } from '@/components/SignupForm';
import { useToast } from '@/hooks/use-toast';

// Updated schema
const searchFormSchema = z.object({
  query: z.string().optional(),
  educationLevel: z.string().optional(),
  category: z.string().optional(),
  state: z.string().optional(), // Added state field
  age: z.number().min(0).max(120).optional(), // Added age field
  gender: z.string().optional(),
  handicap: z.boolean().optional(),
  incomeRange: z.array(z.number()).default([0, 100000]),
});

type SearchFormValues = z.infer<typeof searchFormSchema>;

const scholarshipsData: ScholarshipData[] = [
  // ... (keep the existing scholarship data)
];

const Scholarships = () => {
  const [filteredScholarships, setFilteredScholarships] = useState<ScholarshipData[]>(scholarshipsData);
  const [appliedFilters, setAppliedFilters] = useState<SearchFormValues | null>(null);
  const [authDialogOpen, setAuthDialogOpen] = useState(false);
  const [authType, setAuthType] = useState<'login' | 'signup'>('login');
  
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();
  
  const handleSearch = (criteria: SearchFormValues) => {
    if (!isAuthenticated) {
      setAuthDialogOpen(true);
      return;
    }
    
    const results = scholarshipsData.filter(scholarship => {
      // Filter by query
      if (criteria.query && criteria.query.trim() !== "") {
        const query = criteria.query.toLowerCase();
        if (!scholarship.title.toLowerCase().includes(query) && 
            !scholarship.organization.toLowerCase().includes(query) &&
            !scholarship.description.toLowerCase().includes(query)) {
          return false;
        }
      }
      
      // Filter by education level
      if (criteria.educationLevel && 
          scholarship.level && 
          criteria.educationLevel !== scholarship.level.toLowerCase()) {
        return false;
      }
      
      // Filter by state (if applicable)
      if (criteria.state && scholarship.state && criteria.state !== scholarship.state) {
        return false;
      }
      
      // Filter by age (if applicable)
      if (criteria.age && scholarship.minAge && scholarship.maxAge) {
        if (criteria.age < scholarship.minAge || criteria.age > scholarship.maxAge) {
          return false;
        }
      }
      
      return true;
    });
    
    setFilteredScholarships(results);
    setAppliedFilters(criteria);
  };
  
  const resetFilters = () => {
    setFilteredScholarships(scholarshipsData);
    setAppliedFilters(null);
  };
  
  const handleAuthSuccess = () => {
    setAuthDialogOpen(false);
    toast({
      title: "Authentication successful",
      description: "You can now filter scholarships!",
    });
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-16">
        <section className="bg-gradient-to-r from-purple-600 to-violet-500 text-white py-16">
          <div className="container px-4 mx-auto">
            <div className="max-w-3xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h1 className="text-3xl md:text-4xl font-bold mb-4">
                  Explore Scholarships
                </h1>
                <p className="text-xl text-purple-100">
                  Find the perfect funding opportunities for your educational journey.
                </p>
              </motion.div>
            </div>
          </div>
        </section>
        
        <section className="py-8 border-b">
          <div className="container px-4 mx-auto">
            <div className="relative">
              {!isAuthenticated && (
                <div className="absolute inset-0 bg-white/60 backdrop-blur-sm flex items-center justify-center z-10 rounded-lg">
                  <div className="text-center p-6 bg-white/80 rounded-lg shadow-md">
                    <Lock className="h-12 w-12 text-primary mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">Login Required</h3>
                    <p className="text-gray-600 mb-4">Please login to filter scholarships</p>
                    <Button 
                      onClick={() => {
                        setAuthType('login');
                        setAuthDialogOpen(true);
                      }}
                      className="bg-gradient-to-r from-purple-500 to-violet-600 text-white"
                    >
                      Login to Continue
                    </Button>
                  </div>
                </div>
              )}
              <ScholarshipSearchForm onSearch={handleSearch} />
            </div>
            
            {appliedFilters && (
              <div className="mt-4 flex flex-wrap items-center gap-2">
                <span className="text-sm text-gray-500">Active filters:</span>
                
                {appliedFilters.query && (
                  <div className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm flex items-center">
                    <span>Keyword: {appliedFilters.query}</span>
                    <button 
                      className="ml-2 hover:text-purple-900"
                      onClick={resetFilters}
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                )}
                
                {appliedFilters.educationLevel && (
                  <div className="bg-violet-100 text-violet-800 px-3 py-1 rounded-full text-sm flex items-center">
                    <span>Education: {appliedFilters.educationLevel.replace('_', ' ')}</span>
                    <button 
                      className="ml-2 hover:text-violet-900"
                      onClick={resetFilters}
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                )}
                
                {appliedFilters.state && (
                  <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm flex items-center">
                    <span>State: {appliedFilters.state}</span>
                    <button 
                      className="ml-2 hover:text-blue-900"
                      onClick={resetFilters}
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                )}
                
                {appliedFilters.age && (
                  <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm flex items-center">
                    <span>Age: {appliedFilters.age}</span>
                    <button 
                      className="ml-2 hover:text-green-900"
                      onClick={resetFilters}
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                )}
                
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={resetFilters}
                  className="text-xs"
                >
                  Clear all
                </Button>
              </div>
            )}
          </div>
        </section>
        
        <section className="py-12">
          <div className="container px-4 mx-auto">
            <div className="mb-8 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">
                {filteredScholarships.length} Scholarships Available
              </h2>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredScholarships.map((scholarship, index) => (
                <ScholarshipCard 
                  key={scholarship.id} 
                  scholarship={scholarship} 
                  index={index} 
                />
              ))}
            </div>
            
            {filteredScholarships.length === 0 && (
              <div className="text-center py-12">
                <p className="text-lg text-gray-600">No scholarships found matching your criteria.</p>
                <Button 
                  variant="outline" 
                  className="mt-4"
                  onClick={resetFilters}
                >
                  Reset Filters
                </Button>
              </div>
            )}
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
      
      <Dialog open={authDialogOpen} onOpenChange={setAuthDialogOpen}>
        <DialogContent className="sm:max-w-md border-none shadow-xl bg-white/90 backdrop-blur-xl p-6">
          {authType === 'login' ? (
            <LoginForm 
              onSuccess={handleAuthSuccess} 
              onSwitchToSignup={() => setAuthType('signup')} 
            />
          ) : (
            <SignupForm 
              onSuccess={handleAuthSuccess}
              onSwitchToLogin={() => setAuthType('login')} 
            />
          )}
        </DialogContent>
      </Dialog>
      
      <Chatbot />
    </div>
  );
};

export default Scholarships;