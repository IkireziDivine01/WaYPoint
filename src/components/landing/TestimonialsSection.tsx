
import React from "react";
import Testimonial, { TestimonialProps } from "./Testimonial";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const testimonials: TestimonialProps[] = [
  {
    quote: "WayPoint helped me discover my passion for web development. The assessments were spot-on with my interests and strengths!",
    authorName: "Alex Johnson",
    authorRole: "Computer Science Student",
  },
  {
    quote: "As a career counselor, I've found WayPoint to be an invaluable tool for helping students explore career options they might not have considered.",
    authorName: "Dr. Sarah Miller",
    authorRole: "University Career Advisor",
  },
  {
    quote: "The personalized recommendations I received opened my eyes to careers I hadn't even considered. Now I'm pursuing my dream job with confidence.",
    authorName: "Michael Chen",
    authorRole: "Recent Graduate",
  },
  {
    quote: "WayPoint's assessment was quick but insightful. It helped me confirm I was on the right career path and identified areas for growth.",
    authorName: "Priya Patel",
    authorRole: "Marketing Professional",
  },
  {
    quote: "As someone changing careers in my 30s, WayPoint gave me clarity and direction when I needed it most. The course recommendations were particularly helpful.",
    authorName: "James Wilson",
    authorRole: "Career Changer",
  },
];

const TestimonialsSection = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-waypoint-light-gray/30">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="section-heading mb-4">What Our Users Say</h2>
          <p className="section-subheading">
            Hear from students, educators, and professionals who have used WayPoint to guide their career journeys.
          </p>
        </div>

        <div className="relative px-10">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent>
              {testimonials.map((testimonial, index) => (
                <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3 pl-4 pr-4">
                  <div className="p-1 h-full">
                    <Testimonial {...testimonial} />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="-left-4 lg:-left-6" />
            <CarouselNext className="-right-4 lg:-right-6" />
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
