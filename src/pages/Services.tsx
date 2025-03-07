
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Briefcase, 
  ArrowRight,
  HelpCircle,
  FileText,
  Globe,
  UserCheck,
  FileSpreadsheet,
  Shield,
  MessageSquare
} from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import CustomButton from '@/components/ui/CustomButton';
import ScrollToTop from '@/components/shared/ScrollToTop';

interface ServiceCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  features: string[];
}

const ServiceCard = ({ 
  title, 
  description, 
  icon,
  features
}: ServiceCardProps) => {
  // WhatsApp contact link with predefined message
  const whatsappLink = `https://wa.me/9779808848817?text=Hello, I'm interested in your ${title} service from Bishaal Tools website. Can you provide more information?`;
  
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
          {features.map((feature, index) => (
            <li key={index} className="flex items-center">
              <span className="mr-2 text-green-500">✓</span> {feature}
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <a href={whatsappLink} target="_blank" rel="noopener noreferrer" className="w-full">
          <CustomButton 
            rightIcon={<MessageSquare className="h-4 w-4" />} 
            className="w-full"
          >
            Contact Now
          </CustomButton>
        </a>
      </CardFooter>
    </Card>
  );
};

const Services = () => {
  const services = [
    {
      title: "Demat Account",
      description: "Hassle-free Demat account opening service for Nepali investors.",
      icon: <FileSpreadsheet className="h-6 w-6" />,
      features: [
        "Quick account opening process",
        "Guidance on required documents",
        "Support for CDS registration",
        "Assistance with MEROSHARE setup"
      ]
    },
    {
      title: "Passport Form",
      description: "Complete assistance with Nepali passport application and renewal.",
      icon: <FileText className="h-6 w-6" />,
      features: [
        "Form filling guidance",
        "Document preparation help",
        "Appointment scheduling",
        "Follow-up support"
      ]
    },
    {
      title: "Shram Registration",
      description: "Simplified labor permits and foreign employment registration.",
      icon: <UserCheck className="h-6 w-6" />,
      features: [
        "Foreign employment permits",
        "Labor card registration",
        "Document verification",
        "Status tracking service"
      ]
    },
    {
      title: "Police Report",
      description: "Assistance with police report filing and character certificates.",
      icon: <Shield className="h-6 w-6" />,
      features: [
        "Online reporting assistance",
        "Character certificate application",
        "Document translation",
        "Follow-up with authorities"
      ]
    },
    {
      title: "Website Development",
      description: "Custom website development for Nepali businesses and organizations.",
      icon: <Globe className="h-6 w-6" />,
      features: [
        "Responsive design",
        "SEO optimization",
        "Nepali language support",
        "Secure hosting solutions"
      ]
    }
  ];
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <ScrollToTop />
      
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
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {services.map((service, index) => (
              <ServiceCard 
                key={index}
                title={service.title}
                description={service.description}
                icon={service.icon}
                features={service.features}
              />
            ))}
          </div>
          
          {/* FAQ Section */}
          <section className="bg-gray-50 rounded-xl p-6 md:p-8 mb-12">
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <HelpCircle className="h-5 w-5 mr-2 text-nepal-red" />
              Frequently Asked Questions
            </h2>
            
            <div className="space-y-4">
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <h3 className="font-semibold text-lg mb-2">How do I get started with a service?</h3>
                <p className="text-gray-600">
                  Simply click the "Contact Now" button on any service card to reach us via WhatsApp. 
                  Our team will respond promptly to discuss your requirements and guide you through the process.
                </p>
              </div>
              
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <h3 className="font-semibold text-lg mb-2">What are your service charges?</h3>
                <p className="text-gray-600">
                  Our service charges vary depending on the complexity of your requirements. We provide transparent 
                  pricing with no hidden fees. Contact us for a personalized quote based on your specific needs.
                </p>
              </div>
              
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <h3 className="font-semibold text-lg mb-2">How long does it take to complete a service?</h3>
                <p className="text-gray-600">
                  Service completion times vary based on the nature of the service and external factors like government 
                  processing times. For Demat accounts, typically 2-3 days; passport assistance, 1-2 weeks; website 
                  development, 2-4 weeks depending on complexity.
                </p>
              </div>
              
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <h3 className="font-semibold text-lg mb-2">Do you serve clients outside Kathmandu Valley?</h3>
                <p className="text-gray-600">
                  Yes, we serve clients across Nepal. Many of our services can be provided remotely, and for 
                  those requiring in-person assistance, we have partner networks in major cities throughout Nepal.
                </p>
              </div>
              
              <div className="bg-white rounded-lg p-4 shadow-sm">
                <h3 className="font-semibold text-lg mb-2">Can I track the progress of my service request?</h3>
                <p className="text-gray-600">
                  Absolutely! Once you engage our services, you'll receive regular updates via WhatsApp or email. 
                  We also provide a dedicated point of contact who will keep you informed throughout the process.
                </p>
              </div>
            </div>
          </section>
          
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
            <a href="https://wa.me/9779808848817?text=Hello, I'm interested in discussing a custom service requirement with Bishaal Tools." target="_blank" rel="noopener noreferrer">
              <CustomButton 
                size="lg"
                rightIcon={<MessageSquare className="h-5 w-5" />}
              >
                Contact Us on WhatsApp
              </CustomButton>
            </a>
          </div>
          
          {/* SEO Content */}
          <section className="mt-12 max-w-3xl mx-auto prose prose-sm prose-gray">
            <h2>Essential Services for Nepali Citizens</h2>
            <p>
              At Bishaal Tools, we provide a comprehensive range of services designed to simplify bureaucratic 
              processes and digital needs for Nepali citizens. Our services address common challenges faced by 
              Nepalis in their day-to-day interactions with government systems and digital platforms.
            </p>
            <p>
              From helping with Demat account registration for stock market investment to assisting with passport 
              applications, labor permits for foreign employment (Shram registration), police reports, and modern 
              website development, our services are tailored to meet the specific needs of Nepali users.
            </p>
            <h3>Navigating Bureaucratic Processes Made Easy</h3>
            <p>
              Government procedures in Nepal can often be time-consuming and complex. Our service offerings simplify 
              these processes by providing expert guidance, document preparation assistance, and follow-up support. 
              Whether you're applying for a new passport, need a police report for overseas employment, or want to 
              start investing in the Nepal Stock Exchange (NEPSE), our team can guide you through every step.
            </p>
            <h3>Digital Transformation for Nepali Businesses</h3>
            <p>
              Our website development services help Nepali businesses establish a strong online presence with 
              modern, responsive websites. We understand the local market and create solutions that work well 
              within Nepal's digital infrastructure, including Nepali language support, optimization for varied 
              internet speeds, and integration with local payment gateways.
            </p>
            <p>
              Contact us today via WhatsApp to learn how we can assist you with any of our services. Our team 
              of experts is ready to provide personalized support for your specific requirements.
            </p>
          </section>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Services;
