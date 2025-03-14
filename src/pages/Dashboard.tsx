
import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BarChart, AreaChart, PieChart, ActivitySquare, Search, BookOpen, GraduationCap, Users } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Navbar } from '@/components/Navbar';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    appliedScholarships: 3,
    savedScholarships: 7,
    recommendedScholarships: 12,
    totalSchemes: 8,
  });

  // Redirect if not logged in
  if (!user) {
    return <Navigate to="/" />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />
      
      <main className="flex-1 pt-16">
        <section className="py-8">
          <div className="container px-4 mx-auto">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
                <p className="text-gray-600">Welcome back, {user.name || 'User'}!</p>
              </div>
              <div className="mt-4 md:mt-0">
                <Link to="/scholarships">
                  <Button className="mr-2">
                    <Search className="mr-2 h-4 w-4" />
                    Find Scholarships
                  </Button>
                </Link>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="border-l-4 border-l-purple-500">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-500">Applied</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="text-2xl font-bold">{stats.appliedScholarships}</div>
                      <div className="p-2 bg-purple-100 rounded-full text-purple-600">
                        <ActivitySquare className="h-5 w-5" />
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">Scholarships you've applied to</p>
                  </CardContent>
                </Card>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                <Card className="border-l-4 border-l-violet-500">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-500">Saved</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="text-2xl font-bold">{stats.savedScholarships}</div>
                      <div className="p-2 bg-violet-100 rounded-full text-violet-600">
                        <BookOpen className="h-5 w-5" />
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">Scholarships you've saved</p>
                  </CardContent>
                </Card>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
              >
                <Card className="border-l-4 border-l-indigo-500">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-500">Recommended</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="text-2xl font-bold">{stats.recommendedScholarships}</div>
                      <div className="p-2 bg-indigo-100 rounded-full text-indigo-600">
                        <GraduationCap className="h-5 w-5" />
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">Scholarships matching your profile</p>
                  </CardContent>
                </Card>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.3 }}
              >
                <Card className="border-l-4 border-l-fuchsia-500">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-gray-500">Schemes</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="text-2xl font-bold">{stats.totalSchemes}</div>
                      <div className="p-2 bg-fuchsia-100 rounded-full text-fuchsia-600">
                        <Users className="h-5 w-5" />
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">Government schemes available</p>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Applications</CardTitle>
                  <CardDescription>Your recent scholarship applications</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[1, 2, 3].map((_, i) => (
                      <div key={i} className="flex items-center p-3 rounded-lg hover:bg-gray-50">
                        <div className="bg-gradient-to-r from-purple-500 to-violet-500 w-10 h-10 rounded-full flex items-center justify-center text-white font-bold">
                          {i+1}
                        </div>
                        <div className="ml-4 flex-1">
                          <h3 className="text-sm font-medium">{["National Merit Scholarship", "Fulbright Program", "Gates Millennium Scholars Program"][i]}</h3>
                          <p className="text-xs text-gray-500">Applied on {["Oct 10", "Sep 28", "Oct 2"][i]}, 2023</p>
                        </div>
                        <span className={`px-2 py-1 text-xs rounded-full ${["bg-yellow-100 text-yellow-800", "bg-green-100 text-green-800", "bg-blue-100 text-blue-800"][i]}`}>
                          {["Pending", "Approved", "Under Review"][i]}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Deadlines</CardTitle>
                  <CardDescription>Don't miss these opportunities</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[1, 2, 3].map((_, i) => (
                      <div key={i} className="flex items-center p-3 rounded-lg hover:bg-gray-50">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold ${["bg-red-500", "bg-orange-500", "bg-yellow-500"][i]}`}>
                          {["15", "28", "10"][i]}
                        </div>
                        <div className="ml-4 flex-1">
                          <h3 className="text-sm font-medium">{["Rhodes Scholarship", "Hertz Fellowship", "Jack Kent Cooke Foundation Scholarship"][i]}</h3>
                          <p className="text-xs text-gray-500">Due {["Oct 15", "Oct 28", "Nov 10"][i]}, 2023</p>
                        </div>
                        <Button variant="ghost" size="sm">
                          Apply
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <Card>
              <CardHeader>
                <CardTitle>Recommended Scholarships</CardTitle>
                <CardDescription>Based on your profile and interests</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[1, 2, 3, 4, 5, 6].map((_, i) => (
                    <div key={i} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
                      <h3 className="font-medium mb-1">{[
                        "Women in STEM Scholarship", 
                        "Minority Student Fellowship", 
                        "First-Generation College Fund",
                        "International Student Grant",
                        "Community Leadership Award",
                        "Academic Excellence Scholarship"
                      ][i]}</h3>
                      <p className="text-sm text-gray-600 mb-2">{[
                        "$5,000", 
                        "$3,500", 
                        "$7,500",
                        "$10,000",
                        "$2,500",
                        "Full Tuition"
                      ][i]}</p>
                      <p className="text-xs text-gray-500">Due in {[15, 22, 30, 45, 60, 75][i]} days</p>
                      <div className="mt-3 flex">
                        <Link to="/scholarships">
                          <Button variant="outline" size="sm" className="text-xs">
                            View Details
                          </Button>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
