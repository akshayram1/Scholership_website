
import { useState } from 'react';
import { motion } from 'framer-motion';
import { ScholarshipCard, ScholarshipData } from './ScholarshipCard';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';

// Sample scholarship data
const scholarships: ScholarshipData[] = [
  {
    id: '1',
    title: 'National Merit Scholarship',
    organization: 'National Merit Scholarship Corporation',
    amount: '$2,500',
    deadline: 'October 15, 2023',
    eligibility: 'High school students with high PSAT scores',
    level: 'Undergraduate',
    description: 'Prestigious scholarship awarded to top-performing high school students based on PSAT/NMSQT scores and academic achievement.'
  },
  {
    id: '2',
    title: 'Fulbright Foreign Student Program',
    organization: 'U.S. Department of State',
    amount: 'Full tuition',
    deadline: 'February 28, 2023',
    eligibility: 'International students',
    level: 'Graduate',
    description: 'Grants for international students to pursue a Master\'s or Ph.D. degree in the United States. Includes tuition, living stipend, and travel allowances.'
  },
  {
    id: '3',
    title: 'Gates Millennium Scholars Program',
    organization: 'Bill & Melinda Gates Foundation',
    amount: 'Full tuition',
    deadline: 'January 15, 2023',
    eligibility: 'Minority students with financial need',
    level: 'Undergraduate',
    description: 'Provides outstanding minority students with financial need the opportunity to complete an undergraduate college education in any discipline of interest.'
  },
  {
    id: '4',
    title: 'Women in STEM Scholarship',
    organization: 'Society of Women Engineers',
    amount: '$5,000',
    deadline: 'March 1, 2023',
    eligibility: 'Female students in STEM fields',
    level: 'Undergraduate',
    description: 'Supports women pursuing degrees in science, technology, engineering, and mathematics fields who demonstrate academic excellence.'
  },
];

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

export function FeaturedSection() {
  const [activeTab, setActiveTab] = useState('scholarships');
  
  return (
    <section className="py-20">
      <div className="container px-4 mx-auto">
        <div className="flex flex-col items-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Featured Opportunities
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Explore top scholarships and government schemes available now
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-8"
          >
            <Tabs defaultValue="scholarships" onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-2 max-w-md">
                <TabsTrigger value="scholarships">Scholarships</TabsTrigger>
                <TabsTrigger value="schemes">Schemes</TabsTrigger>
              </TabsList>
            </Tabs>
          </motion.div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {activeTab === 'scholarships' ? (
            scholarships.map((scholarship, index) => (
              <ScholarshipCard 
                key={scholarship.id} 
                scholarship={scholarship} 
                index={index} 
              />
            ))
          ) : (
            schemes.map((scheme, index) => (
              <ScholarshipCard 
                key={scheme.id} 
                scholarship={scheme} 
                index={index} 
              />
            ))
          )}
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-12 text-center"
        >
          {activeTab === 'scholarships' ? (
            <Link to="/scholarships">
              <Button 
                variant="outline" 
                className="border-purple-300 text-primary hover:bg-purple-50"
              >
                View All Scholarships
              </Button>
            </Link>
          ) : (
            <Link to="/schemes">
              <Button 
                variant="outline" 
                className="border-purple-300 text-primary hover:bg-purple-50"
              >
                View All Schemes
              </Button>
            </Link>
          )}
        </motion.div>
      </div>
    </section>
  );
}
