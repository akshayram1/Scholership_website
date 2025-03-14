
import { Navbar } from "@/components/Navbar";
import { motion } from "framer-motion";
import { ScholarshipData } from "@/components/ScholarshipCard";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Sample schemes data
const schemes: ScholarshipData[] = [
  {
    id: '1',
    title: 'Federal Pell Grant',
    organization: 'U.S. Department of Education',
    amount: 'Up to $6,895',
    deadline: 'June 30, 2023',
    eligibility: 'Undergraduate students with exceptional financial need',
    level: 'Undergraduate',
    description: 'Need-based federal grant program that provides financial aid to low-income undergraduate students to promote access to postsecondary education.'
  },
  {
    id: '2',
    title: 'Subsidized Stafford Loan',
    organization: 'Federal Student Aid',
    amount: 'Varies',
    deadline: 'Ongoing',
    eligibility: 'Students with financial need',
    level: 'Undergraduate & Graduate',
    description: 'Federal government pays the interest on these loans while students are in school at least half-time, during grace periods, and during deferment periods.'
  },
  {
    id: '3',
    title: 'Work-Study Program',
    organization: 'Federal Student Aid',
    amount: 'Varies by position',
    deadline: 'Ongoing',
    eligibility: 'Students with financial need',
    level: 'Undergraduate & Graduate',
    description: 'Provides part-time jobs for undergraduate and graduate students with financial need, allowing them to earn money to help pay education expenses.'
  },
  {
    id: '4',
    title: 'TEACH Grant',
    organization: 'U.S. Department of Education',
    amount: 'Up to $4,000 per year',
    deadline: 'Varies by school',
    eligibility: 'Students planning to become teachers',
    level: 'Undergraduate & Graduate',
    description: 'Provides grants to students who agree to teach for four years at an elementary school, secondary school, or educational service agency that serves students from low-income families.'
  },
];

export default function Schemes() {
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
            Educational Schemes
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Explore government-funded schemes and financial aid programs
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {schemes.map((scheme, index) => (
            <motion.div
              key={scheme.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="group relative overflow-hidden rounded-lg border bg-white shadow-sm transition-all duration-300 hover:shadow-md p-6"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              
              <div className="relative space-y-3">
                <div className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">
                  {scheme.level}
                </div>
                
                <h3 className="text-lg font-semibold leading-tight text-gray-900">{scheme.title}</h3>
                
                <div className="flex flex-wrap gap-y-2 gap-x-4 text-sm text-gray-500">
                  <div className="flex items-center">
                    {scheme.organization}
                  </div>
                  <div className="flex items-center">
                    Deadline: {scheme.deadline}
                  </div>
                </div>
                
                <p className="text-sm text-gray-600">{scheme.description}</p>
                
                <div className="pt-3">
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mb-16">
          <Button variant="outline" size="lg">
            Load More Schemes
          </Button>
        </div>
      </div>
    </>
  );
}
