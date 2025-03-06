
import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Calendar, Clock, ChevronRight } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import blogPosts from '@/data/blogPosts';
import { formatDistance } from 'date-fns';

const Blog = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1 
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        duration: 0.4 
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Nepal Culture Tools Blog | Nepali Date Converter, Calendar & More</title>
        <meta name="description" content="Explore our blog for guides on Nepali date conversion, calendar systems, Unicode conversion, and more cultural tools for Nepal." />
        <meta name="keywords" content="nepali blog, nepal culture, nepali date converter, nepali calendar, unicode converter, load shedding schedule, rashifal, nepali tools" />
      </Helmet>
      
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="container-custom">
          <motion.div 
            className="max-w-4xl mx-auto"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <motion.div className="text-center mb-12" variants={itemVariants}>
              <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">
                Nepal Culture Tools <span className="text-nepal-red">Blog</span>
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Explore articles, guides, and insights about Nepali culture, tools, and digital resources.
              </p>
              <Separator className="my-8 max-w-md mx-auto bg-gray-200" />
            </motion.div>
            
            <motion.div className="grid gap-10" variants={containerVariants}>
              {blogPosts.map((post) => (
                <motion.div key={post.id} variants={itemVariants}>
                  <Card className="overflow-hidden hover:shadow-md transition-shadow duration-300">
                    <div className="md:flex">
                      <div className="md:w-1/3 h-48 md:h-auto overflow-hidden">
                        <img 
                          src={post.coverImage} 
                          alt={post.title} 
                          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                        />
                      </div>
                      <div className="md:w-2/3 p-6">
                        <div className="flex items-center space-x-2 text-sm text-gray-500 mb-2">
                          <span className="inline-flex items-center bg-nepal-red/10 text-nepal-red px-2 py-1 rounded text-xs font-medium">
                            {post.category}
                          </span>
                          <span className="flex items-center">
                            <Calendar className="h-3 w-3 mr-1" />
                            {new Date(post.publishedAt).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric'
                            })}
                          </span>
                          <span className="flex items-center">
                            <Clock className="h-3 w-3 mr-1" />
                            {post.readTime} min read
                          </span>
                        </div>
                        
                        <h2 className="text-xl md:text-2xl font-semibold mb-2 line-clamp-2 hover:text-nepal-red transition-colors">
                          <Link to={`/blog/${post.slug}`} className="hover:text-nepal-red transition-colors">
                            {post.title}
                          </Link>
                        </h2>
                        
                        <p className="text-gray-600 mb-4 line-clamp-2">
                          {post.excerpt}
                        </p>
                        
                        <Link 
                          to={`/blog/${post.slug}`} 
                          className="inline-flex items-center text-nepal-red hover:text-nepal-red/80 font-medium"
                        >
                          Read More 
                          <ChevronRight className="h-4 w-4 ml-1" />
                        </Link>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Blog;
