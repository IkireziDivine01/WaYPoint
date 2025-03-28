
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";

export interface TestimonialProps {
  quote: string;
  authorName: string;
  authorRole: string;
  authorImage?: string;
}

const Testimonial = ({ quote, authorName, authorRole, authorImage }: TestimonialProps) => {
  const initials = authorName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <Card className="h-full bg-white/80 backdrop-blur-sm border border-white/20 shadow-sm hover:shadow-md transition-all">
      <CardContent className="p-6 flex flex-col h-full">
        <div className="flex-1">
          <div className="mb-4 text-waypoint-blue">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z" />
              <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z" />
            </svg>
          </div>
          <p className="text-waypoint-gray italic mb-6">{quote}</p>
        </div>
        <div className="flex items-center mt-4">
          <Avatar className="h-10 w-10 mr-3">
            <AvatarImage src={authorImage} alt={authorName} />
            <AvatarFallback className="bg-waypoint-light-blue/30 text-waypoint-blue">
              {initials}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium text-waypoint-black">{authorName}</p>
            <p className="text-sm text-waypoint-gray">{authorRole}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Testimonial;
