
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ChevronUp, ChevronDown, MessageSquare, Search, Plus } from "lucide-react";
import { toast } from "sonner";

import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

type ForumPost = {
  id: string;
  title: string;
  content: string;
  author: {
    id: string;
    name: string;
    avatar: string;
  };
  category: string;
  tags: string[];
  createdAt: string;
  upvotes: number;
  downvotes: number;
  comments: number;
  userVote?: 'up' | 'down' | null;
};

const dummyPosts: ForumPost[] = [
  {
    id: "1",
    title: "Tips for new developers starting in web development",
    content: "I've been in the industry for 5 years and wanted to share some advice for those just getting started...",
    author: {
      id: "user1",
      name: "Alex Johnson",
      avatar: "https://i.pravatar.cc/150?img=1"
    },
    category: "Technology",
    tags: ["Web Development", "Career Advice", "Beginners"],
    createdAt: "2023-12-10T14:30:00Z",
    upvotes: 24,
    downvotes: 2,
    comments: 8,
    userVote: null
  },
  {
    id: "2",
    title: "How to transition from marketing to product management?",
    content: "I've been in digital marketing for 3 years but I'm interested in moving to product management. Any advice?",
    author: {
      id: "user2",
      name: "Emily Rogers",
      avatar: "https://i.pravatar.cc/150?img=5"
    },
    category: "Marketing",
    tags: ["Career Transition", "Product Management"],
    createdAt: "2023-12-08T09:15:00Z",
    upvotes: 15,
    downvotes: 0,
    comments: 12,
    userVote: null
  },
  {
    id: "3",
    title: "Best resources for learning data analysis in 2023",
    content: "I'm looking to build my skills in data analysis. What courses or books would you recommend?",
    author: {
      id: "user3",
      name: "Michael Chen",
      avatar: "https://i.pravatar.cc/150?img=3"
    },
    category: "Data Science",
    tags: ["Learning Resources", "Data Analysis"],
    createdAt: "2023-12-05T11:45:00Z",
    upvotes: 42,
    downvotes: 3,
    comments: 16,
    userVote: null
  },
  {
    id: "4",
    title: "How to negotiate a salary for your first job out of college",
    content: "I'm about to graduate and have my first job offer. How do I approach salary negotiation with no experience?",
    author: {
      id: "user4",
      name: "Jamie Williams",
      avatar: "https://i.pravatar.cc/150?img=4"
    },
    category: "Career Advice",
    tags: ["Salary Negotiation", "Entry Level", "New Grad"],
    createdAt: "2023-12-01T16:20:00Z",
    upvotes: 67,
    downvotes: 1,
    comments: 23,
    userVote: null
  },
  {
    id: "5",
    title: "Portfolio tips for UX designers",
    content: "What are hiring managers looking for in UX design portfolios these days?",
    author: {
      id: "user5",
      name: "Priya Patel",
      avatar: "https://i.pravatar.cc/150?img=10"
    },
    category: "Design",
    tags: ["UX Design", "Portfolio", "Job Search"],
    createdAt: "2023-11-28T10:30:00Z",
    upvotes: 31,
    downvotes: 2,
    comments: 14,
    userVote: null
  }
];

const Forums: React.FC = () => {
  const [posts, setPosts] = useState<ForumPost[]>(dummyPosts);
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [newPostTitle, setNewPostTitle] = useState("");
  const [newPostContent, setNewPostContent] = useState("");
  const [newPostCategory, setNewPostCategory] = useState("Technology");
  const [newPostTags, setNewPostTags] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);

  const categories = ["all", ...Array.from(new Set(posts.map(post => post.category.toLowerCase())))];

  // Filter posts based on active category and search query
  const filteredPosts = posts.filter(post => {
    const matchesCategory = activeCategory === "all" || post.category.toLowerCase() === activeCategory.toLowerCase();
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesCategory && (searchQuery === "" || matchesSearch);
  });

  // Handle voting on posts
  const handleVote = (postId: string, voteType: 'up' | 'down') => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        // If user already voted this way, remove their vote
        if (post.userVote === voteType) {
          return {
            ...post,
            upvotes: voteType === 'up' ? post.upvotes - 1 : post.upvotes,
            downvotes: voteType === 'down' ? post.downvotes - 1 : post.downvotes,
            userVote: null
          };
        }
        // If user voted the opposite way before, subtract from that count and add to new count
        else if (post.userVote !== null) {
          return {
            ...post,
            upvotes: voteType === 'up' ? post.upvotes + 1 : (post.userVote === 'up' ? post.upvotes - 1 : post.upvotes),
            downvotes: voteType === 'down' ? post.downvotes + 1 : (post.userVote === 'down' ? post.downvotes - 1 : post.downvotes),
            userVote: voteType
          };
        }
        // If user hasn't voted before, add their vote
        else {
          return {
            ...post,
            upvotes: voteType === 'up' ? post.upvotes + 1 : post.upvotes,
            downvotes: voteType === 'down' ? post.downvotes + 1 : post.downvotes,
            userVote: voteType
          };
        }
      }
      return post;
    }));
  };

  // Handle creating a new post
  const handleCreatePost = () => {
    if (!newPostTitle.trim() || !newPostContent.trim()) {
      toast.error("Please provide both a title and content for your post");
      return;
    }

    const newPost: ForumPost = {
      id: `post${posts.length + 1}`,
      title: newPostTitle,
      content: newPostContent,
      author: {
        id: "currentUser",
        name: "Current User",
        avatar: "https://i.pravatar.cc/150?img=8"
      },
      category: newPostCategory,
      tags: newPostTags.split(",").map(tag => tag.trim()).filter(tag => tag !== ""),
      createdAt: new Date().toISOString(),
      upvotes: 0,
      downvotes: 0,
      comments: 0,
      userVote: null
    };

    setPosts([newPost, ...posts]);
    setNewPostTitle("");
    setNewPostContent("");
    setNewPostTags("");
    setDialogOpen(false);
    toast.success("Post created successfully!");
  };

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="container max-w-7xl mx-auto py-20 px-4 sm:px-6 flex-grow">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-waypoint-black">Community Forums</h1>
          <p className="mt-4 text-lg text-waypoint-gray max-w-2xl mx-auto">
            Connect with peers, share your experiences, ask questions, and get advice from professionals across various industries.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 mb-8">
          <div className="w-full lg:w-3/4 flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3 h-5 w-5 text-waypoint-gray" />
              <Input
                className="pl-10"
                placeholder="Search forums..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <Tabs 
              defaultValue="all" 
              className="w-full sm:w-64" 
              onValueChange={setActiveCategory}
            >
              <TabsList className="w-full grid grid-cols-3 lg:flex lg:flex-wrap">
                {categories.map((category) => (
                  <TabsTrigger key={category} value={category} className="capitalize">
                    {category}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>

          <div className="w-full lg:w-1/4">
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <Button className="w-full btn-primary">
                  <Plus className="mr-2 h-4 w-4" /> Create New Post
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[550px]">
                <DialogHeader>
                  <DialogTitle>Create a New Post</DialogTitle>
                  <DialogDescription>
                    Share your thoughts, questions, or experiences with the community.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <label htmlFor="post-title" className="text-sm font-medium">Title</label>
                    <Input
                      id="post-title"
                      placeholder="Enter a descriptive title"
                      value={newPostTitle}
                      onChange={(e) => setNewPostTitle(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="post-content" className="text-sm font-medium">Content</label>
                    <Textarea
                      id="post-content"
                      placeholder="Share your thoughts..."
                      rows={5}
                      value={newPostContent}
                      onChange={(e) => setNewPostContent(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="post-category" className="text-sm font-medium">Category</label>
                    <select
                      id="post-category"
                      className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      value={newPostCategory}
                      onChange={(e) => setNewPostCategory(e.target.value)}
                    >
                      {categories.filter(cat => cat !== "all").map((category) => (
                        <option key={category} value={category} className="capitalize">
                          {category}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="post-tags" className="text-sm font-medium">Tags</label>
                    <Input
                      id="post-tags"
                      placeholder="Enter tags separated by commas"
                      value={newPostTags}
                      onChange={(e) => setNewPostTags(e.target.value)}
                    />
                    <p className="text-xs text-waypoint-gray">Example: Career Advice, Technology, Job Search</p>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setDialogOpen(false)}>Cancel</Button>
                  <Button onClick={handleCreatePost}>Create Post</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {filteredPosts.length > 0 ? (
          <div className="space-y-6">
            {filteredPosts.map((post) => (
              <Card key={post.id} className="hover:shadow-md transition-shadow duration-200">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center space-x-4">
                      <img
                        src={post.author.avatar}
                        alt={post.author.name}
                        className="h-10 w-10 rounded-full"
                      />
                      <div>
                        <CardTitle className="text-xl">{post.title}</CardTitle>
                        <div className="flex items-center mt-1 text-waypoint-gray text-sm">
                          <span>{post.author.name}</span>
                          <span className="mx-2">•</span>
                          <span>{formatDate(post.createdAt)}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col items-center space-y-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        className={`px-2 ${post.userVote === 'up' ? 'text-green-600' : ''}`}
                        onClick={() => handleVote(post.id, 'up')}
                      >
                        <ChevronUp className="h-5 w-5" />
                      </Button>
                      <span className="text-sm font-medium">{post.upvotes - post.downvotes}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        className={`px-2 ${post.userVote === 'down' ? 'text-red-600' : ''}`}
                        onClick={() => handleVote(post.id, 'down')}
                      >
                        <ChevronDown className="h-5 w-5" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-waypoint-gray">{post.content}</p>
                  <div className="flex flex-wrap gap-2 mt-4">
                    <span className="bg-waypoint-light-blue/20 text-waypoint-blue px-3 py-1 rounded-full text-xs">
                      {post.category}
                    </span>
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="bg-gray-100 text-waypoint-gray px-3 py-1 rounded-full text-xs"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" size="sm" className="text-waypoint-gray">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    {post.comments} Comments
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-xl text-waypoint-gray">No posts found. Try adjusting your search or create a new post!</p>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Forums;
