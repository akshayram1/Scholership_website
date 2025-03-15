import { Navbar } from "@/components/Navbar";
import { motion } from "framer-motion";
import { ScholarshipData } from "@/components/ScholarshipCard";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";

// Sample schemes data - Updated with Indian scholarships
const schemes: ScholarshipData[] = [
  {
    id: '1',
    title: 'Prime Minister Scholarship Scheme',
    organization: 'Ministry of Defence',
    amount: 'Up to ₹36,000 per annum',
    deadline: 'October 15, 2025',
    eligibility: 'Wards of ex-servicemen/ex-Coast Guard personnel',
    level: 'Undergraduate & Professional',
    description: 'Scholarships for the children of ex-servicemen, ex-coast guards to support higher technical and professional education.'
  },
  {
    id: '2',
    title: 'Post-Matric Scholarship for SC Students',
    organization: 'Ministry of Social Justice and Empowerment',
    amount: 'Varies based on course',
    deadline: 'December 31, 2025',
    eligibility: 'SC students with family income below ₹2.5 lakh per annum',
    level: 'Post-Matric',
    description: 'Financial assistance to Scheduled Caste students studying at post matriculation or post-secondary stage to enable them to complete their education.'
  },
  {
    id: '3',
    title: 'National Scholarship Portal (NSP) Schemes',
    organization: 'Government of India',
    amount: 'Varies by scheme',
    deadline: 'Ongoing',
    eligibility: 'Students from minority communities and economically weaker sections',
    level: 'Undergraduate & Graduate',
    description: 'Central platform for various scholarships offered by central and state governments for minority students and those from economically weaker sections.'
  },
  {
    id: '4',
    title: 'INSPIRE Scholarship',
    organization: 'Department of Science & Technology',
    amount: '₹80,000 per annum',
    deadline: 'September 30, 2025',
    eligibility: 'Top 1% performers in Class 12 pursuing science courses',
    level: 'Undergraduate',
    description: 'Innovation in Science Pursuit for Inspired Research scholarship for students pursuing basic and natural sciences at the undergraduate level.'
  },
  {
    id: '5',
    title: 'AICTE Pragati Scholarship for Girls',
    organization: 'AICTE',
    amount: '₹50,000 per annum',
    deadline: 'November 30, 2025',
    eligibility: 'Female students in AICTE approved technical institutions',
    level: 'Technical Education',
    description: 'Scheme to provide assistance for advancement of girls\' participation in technical education to promote technical education among females.'
  },
  {
    id: '6',
    title: 'Central Sector Scheme of Scholarships',
    organization: 'Ministry of Education',
    amount: '₹12,000 per annum',
    deadline: 'January 15, 2026',
    eligibility: 'Students from low income families who scored above 80% in Class 12',
    level: 'Undergraduate & Graduate',
    description: 'Financial assistance to meritorious students from low income families to meet a part of their day-to-day expenses while pursuing higher studies.'
  }
];

// Additional scholarships to load more
const additionalSchemes: ScholarshipData[] = [
  {
    id: '7',
    title: 'Kishore Vaigyanik Protsahan Yojana (KVPY)',
    organization: 'Department of Science & Technology',
    amount: 'Up to ₹1.2 lakh per annum',
    deadline: 'August 31, 2025',
    eligibility: 'Students pursuing basic science courses and aptitude for research',
    level: 'Undergraduate',
    description: 'Program to encourage students who have demonstrated potential for research towards pursuing a career in research in basic sciences.'
  },
  {
    id: '8',
    title: 'National Means-cum-Merit Scholarship',
    organization: 'Ministry of Education',
    amount: '₹12,000 per annum',
    deadline: 'October 31, 2025',
    eligibility: 'Economically weaker students scoring at least 55% in Class 8',
    level: 'Secondary Education',
    description: 'Scholarships awarded to meritorious students from economically weaker sections to arrest their drop out at class 8 and encourage them to continue education.'
  },
  {
    id: '9',
    title: 'Sitaram Jindal Foundation Scholarship',
    organization: 'Sitaram Jindal Foundation',
    amount: 'Varies by course',
    deadline: 'December 15, 2025',
    eligibility: 'Meritorious and economically weak students',
    level: 'Undergraduate & Graduate',
    description: 'Financial support to meritorious students facing economic constraints to pursue higher education in various disciplines.'
  },
  {
    id: '10',
    title: 'Swami Dayanand Education Foundation',
    organization: 'Swami Dayanand Education Foundation',
    amount: 'Up to ₹75,000 per annum',
    deadline: 'September 15, 2025',
    eligibility: 'Meritorious students with family income below ₹5 lakh per annum',
    level: 'Undergraduate & Graduate',
    description: 'Merit-cum-means scholarships for students pursuing higher education in various disciplines.'
  },
  {
    id: '11',
    title: 'Post-Matric Scholarship for ST Students',
    organization: 'Ministry of Tribal Affairs',
    amount: 'Varies based on course',
    deadline: 'November 30, 2025',
    eligibility: 'ST students with family income below ₹2.5 lakh per annum',
    level: 'Post-Matric',
    description: 'Financial assistance to Scheduled Tribe students studying at post matriculation or post-secondary stage to enable them to complete their education.'
  },
  {
    id: '12',
    title: 'AICTE Saksham Scholarship for Differently-Abled',
    organization: 'AICTE',
    amount: '₹50,000 per annum',
    deadline: 'October 31, 2025',
    eligibility: 'Differently-abled students in AICTE approved institutions',
    level: 'Technical Education',
    description: 'Scholarship scheme to provide encouragement and support to differently-abled students to pursue technical education.'
  },
  {
    id: '13',
    title: 'Post-Matric Scholarship for OBC Students',
    organization: 'Ministry of Social Justice and Empowerment',
    amount: 'Varies based on course',
    deadline: 'December 15, 2025',
    eligibility: 'OBC students with family income below ₹2.5 lakh per annum',
    level: 'Post-Matric',
    description: 'Financial assistance to OBC students studying at post matriculation or post-secondary stage to enable them to complete their education.'
  },
  {
    id: '14',
    title: 'UGC-NET Junior Research Fellowship',
    organization: 'University Grants Commission',
    amount: '₹31,000 per month + HRA',
    deadline: 'February 28, 2026',
    eligibility: 'Students who have cleared UGC-NET examination',
    level: 'Research',
    description: 'Fellowship awarded to candidates who qualify the UGC-NET examination to pursue research leading to Ph.D. degree.'
  },
  {
    id: '15',
    title: 'Merit-cum-Means Scholarship for Professional and Technical Courses',
    organization: 'Ministry of Minority Affairs',
    amount: 'Up to ₹25,000 per annum',
    deadline: 'October 31, 2025',
    eligibility: 'Students from minority communities with family income below ₹2.5 lakh per annum',
    level: 'Professional & Technical',
    description: 'Financial assistance to students from minority communities pursuing professional and technical courses.'
  }
];

export default function Schemes() {
  const [displayedSchemes, setDisplayedSchemes] = useState(schemes);

  const loadMoreSchemes = () => {
    setDisplayedSchemes([...displayedSchemes, ...additionalSchemes]);
  };

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
          {displayedSchemes.map((scheme, index) => (
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

                <h3 className="text-lg font-semibold leading-tight text-gray-900">
                  {scheme.title}
                </h3>

                <div className="flex flex-wrap gap-y-2 gap-x-4 text-sm text-gray-500">
                  <div className="flex items-center">{scheme.organization}</div>
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
          <Button variant="outline" size="lg" onClick={loadMoreSchemes}>
            Load More Schemes
          </Button>
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
