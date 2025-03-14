import React from 'react';
import { motion } from 'framer-motion';
import { Button } from './ui/button';
import { ExternalLink } from 'lucide-react';
import scholarshipImage from '../assets/scholership.png';

export interface ScholarshipData {
  id: string;
  title: string;
  organization: string;
  description: string;
  amount: string;
  deadline: string;
  level: string;
  state?: string;
  minAge?: number;
  maxAge?: number;
  link?: string;
  imageUrl?: string;
  image?: string;
  tags?: string[];
  eligibility: string;
}

interface ScholarshipCardProps {
  scholarship: ScholarshipData;
  index: number;
}

export const ScholarshipCard: React.FC<ScholarshipCardProps> = ({ scholarship, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow"
    >
      {/* Always use the same image */}
      <div className="h-48 overflow-hidden relative bg-purple-50">
        <img
          src={scholarshipImage}
          alt={scholarship.title}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="p-5">
        <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-2">
          {scholarship.title}
        </h3>

        <p className="text-sm text-gray-500 mb-2">
          {scholarship.organization}
        </p>

        <div className="mb-4">
          <p className="text-sm text-gray-600 line-clamp-3">
            {scholarship.description}
          </p>
        </div>

        <div className="flex flex-wrap gap-1 mb-3">
          {scholarship.tags && scholarship.tags.map((tag, i) => tag && (
            <span key={i} className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">
              {tag.replace('_', ' ')}
            </span>
          ))}
          {!scholarship.tags && scholarship.level && (
            <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">
              {scholarship.level}
            </span>
          )}
        </div>

        <div className="flex justify-between items-center mt-4">
          <div>
            <p className="text-xs text-gray-500">Deadline</p>
            <p className="text-sm font-medium text-gray-900">{scholarship.deadline}</p>
          </div>

          <Button asChild size="sm" className="gap-1">
            <a href={scholarship.link || "#"} target="_blank" rel="noopener noreferrer">
              {scholarship.link ? "Apply" : "explore"} <ExternalLink className="h-3 w-3" />
            </a>
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default ScholarshipCard;
