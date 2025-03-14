
import { motion } from 'framer-motion';
import { ArrowRight, Calendar, GraduationCap, Users, DollarSign } from 'lucide-react';

export interface ScholarshipData {
  id: string;
  title: string;
  organization: string;
  amount: string;
  deadline: string;
  eligibility: string;
  level: string;
  description: string;
  imageUrl?: string;
  state?: string; // Add this
  minAge?: number; // Add this
  maxAge?: number; // Add this
}

interface ScholarshipCardProps {
  scholarship: ScholarshipData;
  index: number;
}

export function ScholarshipCard({ scholarship, index }: ScholarshipCardProps) {
  // Default scholarship images for different education levels
  const getDefaultImage = (level: string) => {
    switch(level.toLowerCase()) {
      case 'undergraduate':
        return '/scholarship-undergrad.jpg';
      case 'graduate':
        return '/scholarship-graduate.jpg';
      case 'phd':
        return '/scholarship-phd.jpg';
      default:
        return '/scholarship-default.jpg';
    }
  };

  const imageUrl = scholarship.imageUrl || getDefaultImage(scholarship.level);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      className="group relative overflow-hidden rounded-lg border bg-white shadow-sm transition-all duration-300 hover:shadow-md"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      
      {/* Scholarship Image */}
      <div className="relative h-48 w-full overflow-hidden">
        <img 
          src={imageUrl} 
          alt={scholarship.title}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          onError={(e) => {
            (e.target as HTMLImageElement).src = '/scholarship-default.jpg';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      </div>
      
      <div className="relative p-6">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">
              <GraduationCap className="mr-1 h-3 w-3" />
              {scholarship.level}
            </div>
            <div className="flex items-center text-accent text-sm font-medium">
              <DollarSign className="mr-1 h-4 w-4" />
              {scholarship.amount}
            </div>
          </div>
          
          <h3 className="text-lg font-semibold leading-tight text-gray-900">{scholarship.title}</h3>
          
          <div className="flex flex-wrap gap-y-2 gap-x-4 text-sm text-gray-500">
            <div className="flex items-center">
              <Users className="mr-1 h-4 w-4 text-gray-400" />
              {scholarship.organization}
            </div>
            <div className="flex items-center">
              <Calendar className="mr-1 h-4 w-4 text-gray-400" />
              Deadline: {scholarship.deadline}
            </div>
          </div>
          
          <p className="text-sm text-gray-600 line-clamp-2">{scholarship.description}</p>
          
          <div className="pt-3">
            <a 
              href="#" 
              className="inline-flex items-center text-sm font-medium text-primary hover:text-primary/80 transition-colors"
            >
              View Details
              <ArrowRight className="ml-1 h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
