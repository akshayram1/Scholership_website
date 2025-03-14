import { useState } from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Search, Filter, RefreshCcw } from 'lucide-react';
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from '@/components/ui/checkbox';

// Define schema for the form
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

interface ScholarshipSearchFormProps {
  onSearch: (criteria: SearchFormValues) => void;
}

export function ScholarshipSearchForm({ onSearch }: ScholarshipSearchFormProps) {
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);
  const [incomeRange, setIncomeRange] = useState<[number, number]>([0, 100000]);

  const form = useForm<SearchFormValues>({
    resolver: zodResolver(searchFormSchema),
    defaultValues: {
      query: "",
      educationLevel: undefined,
      category: undefined,
      state: undefined, 
      age: undefined, 
      gender: undefined,
      handicap: false,
      incomeRange: [0, 100000],
    },
  });

  function onSubmit(data: SearchFormValues) {
    data.incomeRange = incomeRange;
    onSearch(data);
  }

  function resetForm() {
    form.reset();
    setIncomeRange([0, 100000]);
  }

  return (
    <div className="bg-white shadow-md rounded-lg p-6 border border-gray-100">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="relative">
            <FormField
              control={form.control}
              name="query"
              render={({ field }) => (
                <FormItem>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Search className="h-5 w-5 text-gray-400" />
                    </div>
                    <FormControl>
                      <Input
                        placeholder="Search scholarships by name, organization, or keyword..."
                        className="pl-10"
                        {...field}
                      />
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Accordion
            type="single"
            collapsible
            className="w-full"
            value={isAdvancedOpen ? "advanced" : ""}
            onValueChange={(val) => setIsAdvancedOpen(val === "advanced")}
          >
            <AccordionItem value="advanced">
              <AccordionTrigger className="text-sm font-medium flex items-center">
                <Filter className="h-4 w-4 mr-2" />
                Advanced Search Filters
              </AccordionTrigger>
              <AccordionContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-4">
                  <FormField
                    control={form.control}
                    name="educationLevel"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Education Level</FormLabel>
                        <Select 
                          onValueChange={field.onChange} 
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select education level" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="high_school">High School</SelectItem>
                            <SelectItem value="undergraduate">Undergraduate</SelectItem>
                            <SelectItem value="graduate">Graduate</SelectItem>
                            <SelectItem value="phd">PhD</SelectItem>
                            <SelectItem value="diploma">Diploma</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Category</FormLabel>
                        <Select 
                          onValueChange={field.onChange} 
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select category" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="general">General</SelectItem>
                            <SelectItem value="obc">OBC</SelectItem>
                            <SelectItem value="sc">SC</SelectItem>
                            <SelectItem value="st">ST</SelectItem>
                            <SelectItem value="minority">Minority</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Added State Field */}
                  <FormField
                    control={form.control}
                    name="state"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>State</FormLabel>
                        <Select 
                          onValueChange={field.onChange} 
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select state" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="california">California</SelectItem>
                            <SelectItem value="texas">Texas</SelectItem>
                            <SelectItem value="new_york">New York</SelectItem>
                            <SelectItem value="florida">Florida</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  
                  <FormField
                    control={form.control}
                    name="age"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Age</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="Enter your age"
                            {...field}
                            onChange={(e) => field.onChange(parseInt(e.target.value))}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="gender"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Gender</FormLabel>
                        <Select 
                          onValueChange={field.onChange} 
                          value={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select gender" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="male">Male</SelectItem>
                            <SelectItem value="female">Female</SelectItem>
                            <SelectItem value="other">Other</SelectItem>
                            <SelectItem value="any">Any</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormItem>
                    <FormLabel>Family Income Range</FormLabel>
                    <div className="pt-4 px-2">
                      <Slider
                        defaultValue={incomeRange}
                        max={100000}
                        step={5000}
                        value={incomeRange}
                        onValueChange={(val) => setIncomeRange([val[0], val[1]])}
                      />
                      <div className="flex justify-between mt-2 text-sm text-gray-500">
                        <span>₹{incomeRange[0].toLocaleString()}</span>
                        <span>₹{incomeRange[1].toLocaleString()}</span>
                      </div>
                    </div>
                  </FormItem>

                  <FormField
                    control={form.control}
                    name="handicap"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md p-4">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>
                            Handicap/Disability
                          </FormLabel>
                          <p className="text-sm text-gray-500">Show scholarships for differently-abled students</p>
                        </div>
                      </FormItem>
                    )}
                  />
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <div className="flex justify-end space-x-2">
            <Button 
              type="button" 
              variant="outline" 
              onClick={resetForm}
              className="flex items-center"
            >
              <RefreshCcw className="mr-2 h-4 w-4" />
              Reset
            </Button>
            <Button type="submit" className="flex items-center">
              <Search className="mr-2 h-4 w-4" />
              Search
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}