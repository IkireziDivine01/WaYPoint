
import React from "react";
import { Helmet } from "react-helmet";
import Layout from "@/components/layout/Layout";
import BlogHeader from "@/components/blog/BlogHeader";
import TestimonialsList from "@/components/blog/TestimonialsList";
import ShareTestimonial from "@/components/blog/ShareTestimonial";

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

export default Blog;
