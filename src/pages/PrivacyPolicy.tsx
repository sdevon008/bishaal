
import React from 'react';
import { Helmet } from 'react-helmet';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import AdSpace from '@/components/shared/AdSpace';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Privacy Policy | Your Nepal App</title>
        <meta name="robots" content="noindex,nofollow" />
        <meta name="description" content="Learn about our privacy practices and how we protect your data at Your Nepal App." />
      </Helmet>
      
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="container-custom">
          {/* Top Ad Banner */}
          <div className="mb-8">
            <AdSpace size="banner" className="mx-auto" />
          </div>
          
          <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-sm">
            <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
            <div className="prose prose-slate max-w-none">
              <p className="mb-4">Last Updated: March 7, 2025</p>
              
              <section className="mb-6">
                <h2 className="text-xl font-semibold mb-3">Introduction</h2>
                <p>
                  Your Nepal App ("we," "our," or "us") respects your privacy and is committed to protecting your personal data. 
                  This privacy policy will inform you about how we look after your personal data when you visit our website and 
                  tell you about your privacy rights and how the law protects you.
                </p>
              </section>
              
              <section className="mb-6">
                <h2 className="text-xl font-semibold mb-3">Information We Collect</h2>
                <p className="mb-3">We may collect, use, store, and transfer different kinds of personal data about you which we have grouped together as follows:</p>
                <ul className="list-disc pl-6 mb-3 space-y-1">
                  <li><strong>Identity Data</strong> includes first name, last name, username or similar identifier.</li>
                  <li><strong>Contact Data</strong> includes email address and telephone numbers.</li>
                  <li><strong>Technical Data</strong> includes internet protocol (IP) address, your login data, browser type and version, time zone setting and location, browser plug-in types and versions, operating system and platform, and other technology on the devices you use to access this website.</li>
                  <li><strong>Usage Data</strong> includes information about how you use our website and services.</li>
                </ul>
                <p>
                  We also collect, use and share Aggregated Data such as statistical or demographic data for any purpose. 
                  Aggregated Data could be derived from your personal data but is not considered personal data in law as this 
                  data will not directly or indirectly reveal your identity.
                </p>
              </section>
              
              <section className="mb-6">
                <h2 className="text-xl font-semibold mb-3">How We Use Your Information</h2>
                <p className="mb-3">We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:</p>
                <ul className="list-disc pl-6 mb-3 space-y-1">
                  <li>To provide and maintain our services, including to monitor the usage of our services.</li>
                  <li>To manage your account, including your registration as a user of our services.</li>
                  <li>For the performance of a contract, including the fulfillment of orders, processing of transactions, etc.</li>
                  <li>To contact you regarding updates or informative communications related to the services.</li>
                  <li>To provide you with news, special offers and general information about other goods, services and events which we offer.</li>
                </ul>
              </section>
              
              <section className="mb-6">
                <h2 className="text-xl font-semibold mb-3">Data Security</h2>
                <p>
                  We have implemented appropriate security measures to prevent your personal data from being accidentally lost, 
                  used, or accessed in an unauthorized way, altered, or disclosed. In addition, we limit access to your personal 
                  data to those employees, agents, contractors, and other third parties who have a business need to know.
                </p>
              </section>
              
              <section className="mb-6">
                <h2 className="text-xl font-semibold mb-3">Your Rights</h2>
                <p className="mb-3">Under certain circumstances, you have rights under data protection laws in relation to your personal data, including the right to:</p>
                <ul className="list-disc pl-6 mb-3 space-y-1">
                  <li>Request access to your personal data</li>
                  <li>Request correction of your personal data</li>
                  <li>Request erasure of your personal data</li>
                  <li>Object to processing of your personal data</li>
                  <li>Request restriction of processing your personal data</li>
                  <li>Request transfer of your personal data</li>
                  <li>Right to withdraw consent</li>
                </ul>
                <p>
                  If you wish to exercise any of the rights set out above, please contact us at devendrashah@outlook.my.
                </p>
              </section>
              
              <section className="mb-6">
                <h2 className="text-xl font-semibold mb-3">Cookies</h2>
                <p>
                  Our website uses cookies to distinguish you from other users of our website. This helps us to provide you 
                  with a good experience when you browse our website and also allows us to improve our site.
                </p>
              </section>
              
              <section className="mb-6">
                <h2 className="text-xl font-semibold mb-3">Third-Party Links</h2>
                <p>
                  Our website may include links to third-party websites, plug-ins, and applications. Clicking on those links 
                  or enabling those connections may allow third parties to collect or share data about you. We do not control 
                  these third-party websites and are not responsible for their privacy statements.
                </p>
              </section>
              
              <section className="mb-6">
                <h2 className="text-xl font-semibold mb-3">Changes to the Privacy Policy</h2>
                <p>
                  We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new 
                  Privacy Policy on this page and updating the "Last Updated" date at the top of this Privacy Policy.
                </p>
              </section>
              
              <section>
                <h2 className="text-xl font-semibold mb-3">Contact Us</h2>
                <p>
                  If you have any questions about this Privacy Policy, you can contact us at devendrashah@outlook.my.
                </p>
              </section>
            </div>
          </div>
          
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

export default PrivacyPolicy;
