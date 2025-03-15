import { useState, useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Chatbot } from "@/components/ui/chatbot";
import { ScholarshipCard, ScholarshipData } from "@/components/ScholarshipCard";
import { motion } from "framer-motion";
import { Filter, Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { ScholarshipSearchForm } from "@/components/ScholarshipSearchForm";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { z } from "zod";
import { LoginForm } from "@/components/LoginForm";
import { SignupForm } from "@/components/SignupForm";
import { useToast } from "@/hooks/use-toast";
import Papa from "papaparse";
import scholarshipImage from "/src/assets/scholership.png"; // Import the scholarship image

// Updated schema
const searchFormSchema = z.object({
  query: z.string().optional(),
  educationLevel: z.string().optional(),
  category: z.string().optional(),
  state: z.string().optional(),
  age: z.number().min(0).max(120).optional(),
  gender: z.string().optional(),
  handicap: z.boolean().optional(),
  incomeRange: z.array(z.number()).default([0, 100000]),
});

type SearchFormValues = z.infer<typeof searchFormSchema>;

// Define CSV data structure
interface CSVScholarshipData {
  "Scholarship Name": string;
  Eligibility: string;
  Deadline: string;
  Link: string;
}

// Update the mapCsvToScholarshipData function to include eligibility
const mapCsvToScholarshipData = (
  csvData: CSVScholarshipData[]
): ScholarshipData[] => {
  return csvData.map((item, index) => {
    // Ensure we have valid data
    const scholarshipName = item["Scholarship Name"] || "";
    const eligibility = item.Eligibility?.toLowerCase() || "";

    // Generate organization name from the first part of scholarship name
    let organization = "";
    if (scholarshipName) {
      const firstWord = scholarshipName.split(" ")[0];
      organization =
        firstWord === "The" ? scholarshipName.split(" ")[1] || "" : firstWord;
    }

    // Extract education level with improved detection
    let level = "";
    if (
      eligibility.includes("undergraduate") ||
      eligibility.includes("bachelor") ||
      eligibility.includes("b.sc") ||
      eligibility.includes("b.tech") ||
      eligibility.includes("b.e.")
    ) {
      level = "undergraduate";
    } else if (
      eligibility.includes("postgraduate") ||
      eligibility.includes("master") ||
      eligibility.includes("m.sc") ||
      eligibility.includes("m.tech")
    ) {
      level = "postgraduate";
    } else if (
      eligibility.includes("phd") ||
      eligibility.includes("doctoral")
    ) {
      level = "phd";
    } else if (
      eligibility.includes("class 10") ||
      eligibility.includes("class 9")
    ) {
      level = "high_school";
    } else if (
      eligibility.includes("class 11") ||
      eligibility.includes("class 12")
    ) {
      level = "higher_secondary";
    } else if (eligibility.includes("matric")) {
      level = "high_school";
    }

    // Extract state with improved detection
    let state = "";
    if (eligibility.includes("tripura")) {
      state = "tripura";
    } else if (eligibility.includes("haryana")) {
      state = "haryana";
    } else if (eligibility.includes("maharashtra")) {
      state = "maharashtra";
    } else if (eligibility.includes("chandigarh")) {
      state = "chandigarh";
    } else if (eligibility.includes("west bengal")) {
      state = "west bengal";
    } else if (eligibility.includes("odisha")) {
      state = "odisha";
    } else if (eligibility.includes("manipur")) {
      state = "manipur";
    }

    const stateMatches = eligibility.match(
      /domicile of ([a-z\s]+)|resident of ([a-z\s]+)/i
    );
    if (stateMatches) {
      state = (stateMatches[1] || stateMatches[2]).trim();
    }

    // Extract age requirements
    let minAge = 0;
    let maxAge = 100;
    const ageMatches = eligibility.match(
      /(\d+) years of age|below (\d+) years|(\d+) years or younger|age of (\d+)/i
    );
    if (ageMatches) {
      const ageValue = parseInt(
        ageMatches[1] || ageMatches[2] || ageMatches[3] || ageMatches[4]
      );
      if (eligibility.includes("below") || eligibility.includes("younger")) {
        maxAge = ageValue;
      } else {
        minAge = Math.max(0, ageValue - 5);
        maxAge = ageValue + 5;
      }
    }

    // Create scholarship object with the new image path
    return {
      id: `scholarship-${index + 1}`,
      title: scholarshipName,
      organization: organization,
      description: item.Eligibility || "",
      eligibility: eligibility, // Add this line to include eligibility
      amount: "Varies",
      deadline: item.Deadline !== "N/A" ? item.Deadline : "Open",
      level: level,
      state: state,
      minAge: minAge,
      image: scholarshipImage, // Use the imported image
      maxAge: maxAge,
      link: item.Link || "#",
      tags: [level, state].filter(Boolean),
    };
  });
};

const Scholarships = () => {
  const [scholarshipsData, setScholarshipsData] = useState<ScholarshipData[]>(
    []
  );
  const [filteredScholarships, setFilteredScholarships] = useState<
    ScholarshipData[]
  >([]);
  const [appliedFilters, setAppliedFilters] = useState<SearchFormValues | null>(
    null
  );
  const [authDialogOpen, setAuthDialogOpen] = useState(false);
  const [authType, setAuthType] = useState<"login" | "signup">("login");
  const [isLoading, setIsLoading] = useState(true);

  const { isAuthenticated } = useAuth();
  const { toast } = useToast();

  // Update the useEffect to add more detailed logging
  useEffect(() => {
    const loadScholarshipData = async () => {
      try {
        setIsLoading(true);
        console.log("Fetching CSV data...");

        const response = await fetch("/scholarships_data.csv");

        if (!response.ok) {
          console.error(
            `Failed to fetch CSV: ${response.status} ${response.statusText}`
          );
          toast({
            title: "Error loading scholarships",
            description: `Failed to load data: ${response.status} ${response.statusText}`,
            variant: "destructive",
          });
          throw new Error(
            `Failed to load CSV: ${response.status} ${response.statusText}`
          );
        }

        const csvText = await response.text();
        console.log(
          "CSV data loaded, first 100 chars:",
          csvText.substring(0, 100)
        );

        // Skip the first line if it contains filepath comment
        const csvData = csvText.startsWith("//")
          ? csvText.substring(csvText.indexOf("\n") + 1)
          : csvText;

        // After your CSV is parsed, add these logs
        Papa.parse(csvData, {
          header: true,
          skipEmptyLines: true,
          complete: (results) => {
            console.log("CSV parsing complete");
            console.log("Data sample:", results.data.slice(0, 2));

            // Rest of your existing code
            if (results.errors && results.errors.length > 0) {
              console.warn("CSV parsing warnings:", results.errors);
            }

            console.log(`Parsed ${results.data.length} rows from CSV`);

            const scholarships = mapCsvToScholarshipData(
              results.data as CSVScholarshipData[]
            );
            console.log(`Processed ${scholarships.length} scholarships`);

            // Log the first few entries to check mapping
            console.log("Sample scholarships:", scholarships.slice(0, 3));

            setScholarshipsData(scholarships);
            setFilteredScholarships(scholarships);
            setIsLoading(false);
          },
          error: (error) => {
            console.error("Error parsing CSV data:", error);
            setIsLoading(false);
          },
        });
      } catch (error) {
        console.error("Error loading scholarship data:", error);
        setIsLoading(false);
      }
    };

    loadScholarshipData();
  }, []);

  // Update the handleSearch function to focus on scholarship names
  const handleSearch = (criteria: SearchFormValues) => {
    console.log("Search criteria:", criteria);
    console.log("Available scholarships:", scholarshipsData);

    const results = scholarshipsData.filter((scholarship) => {
      // Filter by query (focusing on scholarship name)
      if (criteria.query && criteria.query.trim() !== "") {
        const query = criteria.query.toLowerCase().trim();
        const titleMatch = scholarship.title.toLowerCase().includes(query);
        const orgMatch = scholarship.organization.toLowerCase().includes(query);
        const descMatch = scholarship.description.toLowerCase().includes(query);

        if (!titleMatch && !orgMatch && !descMatch) {
          console.log(`Rejected by query: ${scholarship.title}`);
          return false;
        }
      }

      // Filter by education level
      if (
        criteria.educationLevel &&
        criteria.educationLevel !== "" &&
        scholarship.level &&
        scholarship.level !== ""
      ) {
        if (criteria.educationLevel !== scholarship.level) {
          console.log(
            `Rejected by education level: ${scholarship.title} - Expected: ${criteria.educationLevel}, Got: ${scholarship.level}`
          );
          return false;
        }
      }

      // Filter by state (if applicable)
      if (
        criteria.state &&
        criteria.state !== "" &&
        scholarship.state &&
        scholarship.state !== ""
      ) {
        if (
          !scholarship.state
            .toLowerCase()
            .includes(criteria.state.toLowerCase())
        ) {
          console.log(`Rejected by state: ${scholarship.title}`);
          return false;
        }
      }

      // Filter by age (if applicable)
      if (criteria.age && criteria.age > 0) {
        if (
          scholarship.minAge === undefined ||
          scholarship.maxAge === undefined ||
          criteria.age < scholarship.minAge ||
          criteria.age > scholarship.maxAge
        ) {
          console.log(`Rejected by age: ${scholarship.title}`);
          return false;
        }
      }

      return true;
    });

    console.log("Search results:", results);
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
      description: "You can now access all features!",
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
                  Find the perfect funding opportunities for your educational
                  journey.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="py-8 border-b">
          <div className="container px-4 mx-auto">
            <div className="relative">
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
                    <span>
                      Education:{" "}
                      {appliedFilters.educationLevel.replace("_", " ")}
                    </span>
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
                {isLoading
                  ? "Loading scholarships..."
                  : `${filteredScholarships.length} Scholarships Available`}
              </h2>
            </div>

            {isLoading ? (
              <div className="flex justify-center py-20">
                <div className="animate-pulse flex space-x-4">
                  <div className="rounded-full bg-slate-200 h-10 w-10"></div>
                  <div className="flex-1 space-y-6 py-1">
                    <div className="h-2 bg-slate-200 rounded"></div>
                    <div className="space-y-3">
                      <div className="grid grid-cols-3 gap-4">
                        <div className="h-2 bg-slate-200 rounded col-span-2"></div>
                        <div className="h-2 bg-slate-200 rounded col-span-1"></div>
                      </div>
                      <div className="h-2 bg-slate-200 rounded"></div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredScholarships.map((scholarship, index) => (
                  <ScholarshipCard
                    key={scholarship.id}
                    scholarship={scholarship}
                    index={index}
                  />
                ))}
              </div>
            )}

            {!isLoading && filteredScholarships.length === 0 && (
              <div className="text-center py-12">
                <p className="text-lg text-gray-600">
                  No scholarships found matching your criteria.
                </p>
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
        {/* Footer content remains unchanged */}
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

      <Dialog open={authDialogOpen} onOpenChange={setAuthDialogOpen}>
        <DialogContent className="sm:max-w-md border-none shadow-xl bg-white/90 backdrop-blur-xl p-6">
          {authType === "login" ? (
            <LoginForm
              onSuccess={handleAuthSuccess}
              onSwitchToSignup={() => setAuthType("signup")}
            />
          ) : (
            <SignupForm
              onSuccess={handleAuthSuccess}
              onSwitchToLogin={() => setAuthType("login")}
            />
          )}
        </DialogContent>
      </Dialog>

      <Chatbot />
    </div>
  );
};

export default Scholarships;
