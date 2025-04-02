
import React from "react";
import { Helmet } from "react-helmet";
import Layout from "@/components/layout/Layout";
import BlogHeader from "@/components/blog/BlogHeader";
import TestimonialsList from "@/components/blog/TestimonialsList";
import ShareTestimonial from "@/components/blog/ShareTestimonial";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, MessageSquare } from "lucide-react";

const Blog = () => {
  return (
    <Layout>
      <Helmet>
        <title>Career Journey Testimonials | WayPoint</title>
        <meta
          name="description"
          content="Read inspiring testimonials from people who found their career path using WayPoint."
        />
      </Helmet>
      
      <BlogHeader />
      
      <div className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <Tabs defaultValue="testimonials" className="mb-8">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
            <TabsTrigger value="testimonials" className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              Testimonials
            </TabsTrigger>
            <TabsTrigger value="career-journeys" className="flex items-center gap-2">
              <BookOpen className="h-4 w-4" />
              Career Journeys
            </TabsTrigger>
          </TabsList>
          <TabsContent value="testimonials">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <TestimonialsList />
              </div>
              <div className="lg:col-span-1">
                <ShareTestimonial />
                
                {/* Featured testimonials sidebar */}
                <div className="mt-8 bg-white rounded-lg shadow-md p-6">
                  <h3 className="text-xl font-semibold text-waypoint-blue mb-4">Featured Stories</h3>
                  <div className="space-y-4">
                    {featuredTestimonials.map((item, index) => (
                      <div key={index} className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                        <p className="italic text-gray-600 mb-2">"{item.excerpt}"</p>
                        <p className="font-medium text-waypoint-black">{item.author}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="career-journeys">
            <div className="space-y-8">
              <h2 className="text-3xl font-bold text-waypoint-blue text-center mb-8">Career Journey Stories</h2>
              {careerJourneys.map((journey, index) => (
                <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="md:flex">
                    <div className="md:w-1/3 bg-gradient-to-br from-waypoint-blue to-blue-600 p-6 text-white">
                      <h3 className="text-2xl font-bold mb-2">{journey.name}</h3>
                      <p className="text-lg font-medium mb-4">{journey.currentRole}</p>
                      <div className="space-y-2">
                        <p className="flex items-center gap-2 text-sm">
                          <span className="font-semibold">Starting Point:</span> {journey.startingPoint}
                        </p>
                        <p className="flex items-center gap-2 text-sm">
                          <span className="font-semibold">Journey Time:</span> {journey.journeyTime}
                        </p>
                      </div>
                    </div>
                    <div className="md:w-2/3 p-6">
                      <h4 className="text-xl font-semibold text-waypoint-blue mb-4">The Journey</h4>
                      <p className="text-gray-700 mb-4">{journey.story}</p>
                      <h4 className="text-lg font-semibold text-waypoint-blue mb-2">Key Lessons</h4>
                      <ul className="list-disc pl-5 space-y-1 text-gray-700">
                        {journey.lessons.map((lesson, i) => (
                          <li key={i}>{lesson}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

// Sample featured testimonials
const featuredTestimonials = [
  {
    author: "Sarah J.",
    excerpt: "WayPoint helped me discover my passion for data science after 10 years in marketing."
  },
  {
    author: "Michael T.",
    excerpt: "The career assessment opened my eyes to opportunities in UX design I never considered before."
  },
  {
    author: "Aisha P.",
    excerpt: "I found the confidence to pursue my dream job in environmental science thanks to WayPoint's guidance."
  }
];

// Sample career journeys
const careerJourneys = [
  {
    name: "David Park",
    currentRole: "Software Engineering Manager",
    startingPoint: "Psychology Major",
    journeyTime: "12 years",
    story: "I started as a psychology major with little technical experience. After graduation, I worked as a research assistant but became fascinated with how we collected and analyzed data. I taught myself basic programming, took some online courses, and landed an entry-level QA role. From there, I moved to development, taking night classes to strengthen my technical skills. After several years as a developer, I discovered I enjoyed mentoring junior team members, which led me to engineering management.",
    lessons: [
      "Don't be afraid to pivot when you discover a new interest",
      "Continuous learning is essential in tech careers",
      "Soft skills from psychology were surprisingly valuable in engineering management",
      "Building a network of mentors accelerated my career growth"
    ]
  },
  {
    name: "Maya Johnson",
    currentRole: "Environmental Policy Analyst",
    startingPoint: "Business Administration",
    journeyTime: "8 years",
    story: "After getting my business degree, I joined a corporate management trainee program. While there, I worked on a sustainability initiative that opened my eyes to environmental issues. This sparked something in me, and I started volunteering with local environmental organizations. I decided to pursue a master's in Environmental Policy while working full-time. The combination of my business background and environmental knowledge made me a unique candidate for roles bridging corporate interests and environmental responsibility.",
    lessons: [
      "Follow what energizes you, even if it means changing direction",
      "Your first degree is just a foundation, not a predetermined path",
      "Cross-disciplinary knowledge creates unique career opportunities",
      "Volunteer work can help you explore interests and build relevant experience"
    ]
  },
  {
    name: "Carlos Rodriguez",
    currentRole: "Healthcare Innovation Director",
    startingPoint: "Registered Nurse",
    journeyTime: "15 years",
    story: "I spent my first decade as a dedicated ER nurse, where I constantly saw opportunities to improve patient care through better systems and technology. I started proposing solutions to hospital administration and eventually was asked to join a process improvement team. This led me to pursue an MBA focused on healthcare management. My clinical background gave me credibility with medical staff, while my business education helped me speak the language of administrators. Now I lead innovation initiatives that bridge both worlds.",
    lessons: [
      "Frontline experience provides invaluable insights for leadership roles",
      "Look for problems that need solving in your current environment",
      "Don't underestimate the value of your industry-specific knowledge",
      "Sometimes the best career path isn't a straight line but a series of connected opportunities"
    ]
  }
];

export default Blog;
