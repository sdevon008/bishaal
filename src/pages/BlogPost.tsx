
import React, { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Calendar, Clock, ArrowLeft, Tag } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent } from '@/components/ui/card';
import AdSpace from '@/components/shared/AdSpace';
import blogPosts from '@/data/blogPosts';
import ReactMarkdown from 'react-markdown';

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  
  // Find the blog post with the matching slug
  const post = blogPosts.find(p => p.slug === slug);
  
  useEffect(() => {
    // If no matching post is found, redirect to the blog index
    if (!post) {
      navigate('/blog');
    }
    
    // Scroll to top when post changes
    window.scrollTo(0, 0);
  }, [post, navigate]);
  
  // If post is not found, don't render anything (will redirect)
  if (!post) {
    return null;
  }
  
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

  // Get related posts (same category, excluding current post)
  const relatedPosts = blogPosts
    .filter(p => p.category === post.category && p.id !== post.id)
    .slice(0, 2);

  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>{post.title} | Nepal Culture Tools Blog</title>
        <meta name="description" content={post.excerpt} />
        <meta name="keywords" content={post.keywords.join(', ')} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:image" content={post.coverImage} />
        <meta property="og:type" content="article" />
      </Helmet>
      
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="container-custom">
          {/* Top Ad Banner */}
          <div className="mb-8">
            <AdSpace size="banner" className="mx-auto" />
          </div>
          
          <motion.div 
            className="max-w-4xl mx-auto"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <motion.div variants={itemVariants}>
              <Link to="/blog" className="inline-flex items-center text-gray-600 hover:text-nepal-red mb-6">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to all posts
              </Link>
              
              <div className="mb-8">
                <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500 mb-4">
                  <span className="inline-flex items-center bg-nepal-red/10 text-nepal-red px-3 py-1 rounded-full text-xs font-medium">
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
                
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                  {post.title}
                </h1>
                
                <p className="text-xl text-gray-600 mb-8">
                  {post.excerpt}
                </p>
              </div>
              
              <div className="mb-8 rounded-xl overflow-hidden h-72 md:h-96">
                <img 
                  src={post.coverImage} 
                  alt={post.title} 
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
            
            <AdSpace size="banner" className="my-8" />
            
            <motion.div 
              variants={itemVariants}
              className="blog-content prose prose-lg prose-gray max-w-none"
            >
              <ReactMarkdown>
                {post.content}
              </ReactMarkdown>
              
              <div className="mt-8 pt-4 border-t border-gray-200">
                <div className="flex items-center flex-wrap gap-2">
                  <Tag className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-500 mr-2">Keywords:</span>
                  {post.keywords.slice(0, 5).map((keyword, index) => (
                    <span 
                      key={index} 
                      className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full"
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
            
            {relatedPosts.length > 0 && (
              <motion.div variants={itemVariants} className="mt-12 pt-8 border-t border-gray-200">
                <h3 className="text-2xl font-bold mb-6">Related Articles</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  {relatedPosts.map((related) => (
                    <Card key={related.id} className="overflow-hidden hover:shadow-md transition-shadow duration-300">
                      <div className="h-48 overflow-hidden">
                        <img 
                          src={related.coverImage} 
                          alt={related.title} 
                          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                        />
                      </div>
                      <CardContent className="p-5">
                        <h4 className="text-lg font-semibold mb-2 line-clamp-2">
                          <Link to={`/blog/${related.slug}`} className="hover:text-nepal-red transition-colors">
                            {related.title}
                          </Link>
                        </h4>
                        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                          {related.excerpt}
                        </p>
                        <Link 
                          to={`/blog/${related.slug}`} 
                          className="text-sm inline-flex items-center text-nepal-red hover:text-nepal-red/80 font-medium"
                        >
                          Read More 
                          <ArrowLeft className="h-3 w-3 ml-1 rotate-180" />
                        </Link>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </motion.div>
            )}
          </motion.div>
          
          {/* Bottom Ad Banner */}
          <div className="mt-8">
            <AdSpace size="banner" className="mx-auto" />
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default BlogPost;
