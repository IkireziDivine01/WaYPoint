
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";

// Sample testimonial data - in a real app, this would come from an API
const testimonialData = [
  {
    id: 1,
    name: "Alex Johnson",
    role: "Software Developer",
    avatar: "",
    date: "May 15, 2023",
    title: "From Lost Graduate to Tech Professional",
    content: "After finishing my degree in biology, I felt completely lost about what career to pursue. The assessment on WayPoint highlighted my analytical thinking and problem-solving abilities, suggesting tech as a potential path. I took some coding courses, discovered I loved it, and now I'm a software developer at a health tech company where I can combine both my interests!",
    categories: ["Career Change", "Technology"]
  },
  {
    id: 2,
    name: "Priya Patel",
    role: "UX Designer",
    avatar: "",
    date: "June 3, 2023",
    title: "Found My Creative Calling",
    content: "I spent years in marketing but always felt something was missing. WayPoint's assessment revealed my strong creative and empathetic tendencies, suggesting user experience design as a potential fit. The resources provided helped me transition into UX design, and I couldn't be happier with where my career is now.",
    categories: ["Design", "Career Change"]
  },
  {
    id: 3,
    name: "Marcus Williams",
    role: "Environmental Scientist",
    avatar: "",
    date: "April 22, 2023",
    title: "Aligning My Work With My Values",
    content: "I always knew I cared deeply about sustainability, but wasn't sure how to make it my career. The personality assessment on WayPoint helped me understand that I need work aligned with my core values. The recommended resources and mentorship connections helped me transition into environmental science where I now work on climate solutions.",
    categories: ["Science", "Purpose-Driven"]
  },
  {
    id: 4,
    name: "Jordan Taylor",
    role: "Healthcare Administrator",
    avatar: "",
    date: "July 10, 2023",
    title: "From Burnout to Balance",
    content: "After experiencing burnout as a clinical nurse, I wasn't sure if I needed to leave healthcare altogether. WayPoint helped me see that I could use my healthcare knowledge in administrative roles that would better suit my work style preferences. I now have a fulfilling career with much better work-life balance.",
    categories: ["Healthcare", "Work-Life Balance"]
  }
];

const TestimonialsList = () => {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-waypoint-black">Career Journey Stories</h2>
        <div className="flex gap-2">
          <select className="py-1 px-3 border rounded-md text-sm">
            <option>Most Recent</option>
            <option>Most Popular</option>
            <option>Career Change</option>
            <option>All Categories</option>
          </select>
        </div>
      </div>

      <div className="space-y-6">
        {testimonialData.map((testimonial) => (
          <Card key={testimonial.id} className="overflow-hidden border-none shadow-md hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex justify-between">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                    <AvatarFallback className="bg-waypoint-light-blue text-waypoint-blue">
                      {testimonial.name.split(' ').map(name => name[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg">{testimonial.name}</CardTitle>
                    <CardDescription>{testimonial.role}</CardDescription>
                  </div>
                </div>
                <div className="text-sm text-gray-500">{testimonial.date}</div>
              </div>
            </CardHeader>
            <CardContent className="pb-4">
              <h3 className="text-xl font-bold mb-3 text-waypoint-blue">{testimonial.title}</h3>
              <p className="text-gray-600">{testimonial.content}</p>
            </CardContent>
            <CardFooter className="pt-0 flex flex-wrap gap-2">
              {testimonial.categories.map((category, index) => (
                <Badge key={index} variant="secondary" className="bg-waypoint-light-blue/30 text-waypoint-blue hover:bg-waypoint-light-blue/50">
                  {category}
                </Badge>
              ))}
            </CardFooter>
          </Card>
        ))}
      </div>

      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#" isActive>1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">2</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">3</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default TestimonialsList;
