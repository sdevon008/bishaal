
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Briefcase, 
  ArrowRight,
  CreditCard,
  MailOpen,
  Globe,
  Smartphone
} from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import CustomButton from '@/components/ui/CustomButton';

const ServiceCard = ({ 
  title, 
  description, 
  icon, 
  buttonText = "Learn More",
  comingSoon = false,
  linkTo = "#"
}: { 
  title: string; 
  description: string; 
  icon: React.ReactNode;
  buttonText?: string;
  comingSoon?: boolean;
  linkTo?: string;
}) => {
  return (
    <Card className="shadow-sm border-t-4 border-t-nepal-red transition-all duration-300 hover:shadow-lg">
      <CardHeader>
        <div className="p-3 bg-nepal-red/10 text-nepal-red rounded-lg w-fit mb-3">
          {icon}
        </div>
        <CardTitle className="text-xl">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2 text-sm text-gray-600">
          {comingSoon ? (
            <li className="text-center py-6 text-amber-600 font-medium">Coming Soon</li>
          ) : (
            <>
              <li className="flex items-center">
                <span className="mr-2 text-green-500">✓</span> Feature 1
              </li>
              <li className="flex items-center">
                <span className="mr-2 text-green-500">✓</span> Feature 2
              </li>
              <li className="flex items-center">
                <span className="mr-2 text-green-500">✓</span> Feature 3
              </li>
            </>
          )}
        </ul>
      </CardContent>
      <CardFooter>
        {comingSoon ? (
          <CustomButton variant="outline" className="w-full" disabled>
            Coming Soon
          </CustomButton>
        ) : (
          <Link to={linkTo} className="w-full">
            <CustomButton rightIcon={<ArrowRight className="h-4 w-4" />} className="w-full">
              {buttonText}
            </CustomButton>
          </Link>
        )}
      </CardFooter>
    </Card>
  );
};

const Services = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-24 pb-12">
        <div className="container-custom">
          <header className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Services
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Explore our range of specialized services designed to help Nepali users
              with everyday tasks and digital needs.
            </p>
          </header>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            <ServiceCard
              title="Digital Payments"
              description="Easy solutions for online transactions, mobile payments and digital wallets."
              icon={<CreditCard className="h-6 w-6" />}
              comingSoon={true}
            />
            
            <ServiceCard
              title="Email Services"
              description="Professional email solutions with Nepali language support and spam protection."
              icon={<MailOpen className="h-6 w-6" />}
              comingSoon={true}
            />
            
            <ServiceCard
              title="Website Builder"
              description="Create your own Nepali website with custom templates and Devanagari support."
              icon={<Globe className="h-6 w-6" />}
              comingSoon={true}
            />
            
            <ServiceCard
              title="Mobile Solutions"
              description="Mobile app development and consulting services for Nepali businesses."
              icon={<Smartphone className="h-6 w-6" />}
              comingSoon={true}
            />
          </div>
          
          {/* Additional Information */}
          <div className="bg-gray-50 rounded-xl p-6 md:p-8 mb-12">
            <h2 className="text-2xl font-bold mb-4">Why Choose Our Services?</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-5 rounded-lg shadow-sm">
                <div className="flex items-center mb-3">
                  <div className="p-2 bg-nepal-red/10 text-nepal-red rounded-lg mr-3">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="font-semibold">Made for Nepal</h3>
                </div>
                <p className="text-gray-600 text-sm">
                  Our services are specifically designed for Nepali users, with local language support and cultural context.
                </p>
              </div>
              
              <div className="bg-white p-5 rounded-lg shadow-sm">
                <div className="flex items-center mb-3">
                  <div className="p-2 bg-nepal-red/10 text-nepal-red rounded-lg mr-3">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold">Secure & Reliable</h3>
                </div>
                <p className="text-gray-600 text-sm">
                  All our services follow strict security protocols to protect your data and ensure reliable performance.
                </p>
              </div>
              
              <div className="bg-white p-5 rounded-lg shadow-sm">
                <div className="flex items-center mb-3">
                  <div className="p-2 bg-nepal-red/10 text-nepal-red rounded-lg mr-3">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                  </div>
                  <h3 className="font-semibold">Affordable</h3>
                </div>
                <p className="text-gray-600 text-sm">
                  We offer cost-effective solutions that provide excellent value for money for Nepali individuals and businesses.
                </p>
              </div>
            </div>
          </div>
          
          {/* Contact Section */}
          <div className="bg-nepal-red/5 rounded-xl p-6 md:p-8 text-center">
            <h2 className="text-2xl font-bold mb-3">Need a Custom Service?</h2>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              If you don't see what you're looking for, contact us to discuss custom solutions
              tailored to your specific needs.
            </p>
            <CustomButton size="lg">
              Contact Us
            </CustomButton>
          </div>
          
          {/* SEO Content */}
          <section className="mt-12 max-w-3xl mx-auto prose prose-sm prose-gray">
            <h2>Digital Services for Nepali Users</h2>
            <p>
              At Bishaal Tools, we're committed to providing high-quality digital services designed specifically 
              for the Nepali market. Our range of services addresses the unique challenges and opportunities 
              in Nepal's digital landscape.
            </p>
            <p>
              From digital payment solutions that work with local banks and e-wallets, to website building tools
              with full Devanagari support, our services are built to meet the specific needs of Nepali users 
              and businesses.
            </p>
            <h3>Upcoming Services</h3>
            <p>
              We're constantly working on expanding our service offerings. Our upcoming services include 
              mobile app development, email solutions with Nepali language support, and more. Stay tuned
              for these exciting additions to our platform.
            </p>
            <h3>Custom Solutions</h3>
            <p>
              Every business has unique needs. We offer custom digital solution development for Nepali
              businesses of all sizes, from startups to established enterprises. Contact us to discuss 
              how we can help digitize and optimize your operations.
            </p>
          </section>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Services;
