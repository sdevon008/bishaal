
import React from 'react';
import { Helmet } from 'react-helmet';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const TermsOfService = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>Terms of Service | Your Nepal App</title>
        <meta name="robots" content="noindex,nofollow" />
        <meta name="description" content="Read our terms of service to understand the rules and guidelines for using Your Nepal App." />
      </Helmet>
      
      <Navbar />
      
      <main className="flex-grow pt-24 pb-16">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-sm">
            <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>
            <div className="prose prose-slate max-w-none">
              <p className="mb-4">Last Updated: March 7, 2025</p>
              
              <section className="mb-6">
                <h2 className="text-xl font-semibold mb-3">1. Introduction</h2>
                <p>
                  Welcome to Your Nepal App. These Terms of Service ("Terms") govern your use of our website located at 
                  yournepalapp.com (the "Service") and all related services operated by Your Nepal App ("we," "us," or "our").
                </p>
                <p className="mt-2">
                  By accessing or using the Service, you agree to be bound by these Terms. If you disagree with any part of 
                  the terms, then you do not have permission to access the Service.
                </p>
              </section>
              
              <section className="mb-6">
                <h2 className="text-xl font-semibold mb-3">2. Communications</h2>
                <p>
                  By creating an account on our service, you agree to subscribe to newsletters, marketing or promotional 
                  materials and other information we may send. However, you may opt out of receiving any, or all, of these 
                  communications from us by following the unsubscribe link or instructions provided in any email we send.
                </p>
              </section>
              
              <section className="mb-6">
                <h2 className="text-xl font-semibold mb-3">3. Purchases</h2>
                <p>
                  If you wish to purchase any product or service made available through the Service ("Purchase"), you may be 
                  asked to supply certain information relevant to your Purchase including, without limitation, your credit 
                  card number, the expiration date of your credit card, your billing address, and your shipping information.
                </p>
                <p className="mt-2">
                  You represent and warrant that: (i) you have the legal right to use any credit card(s) or other payment 
                  method(s) in connection with any Purchase; and that (ii) the information you supply to us is true, correct, 
                  and complete.
                </p>
              </section>
              
              <section className="mb-6">
                <h2 className="text-xl font-semibold mb-3">4. Content</h2>
                <p>
                  Our Service allows you to post, link, store, share and otherwise make available certain information, text, 
                  graphics, videos, or other material ("Content"). You are responsible for the Content that you post on or 
                  through the Service, including its legality, reliability, and appropriateness.
                </p>
                <p className="mt-2">
                  By posting Content on or through the Service, You represent and warrant that: (i) the Content is yours (you 
                  own it) and/or you have the right to use it and the right to grant us the rights and license as provided in 
                  these Terms, and (ii) that the posting of your Content on or through the Service does not violate the 
                  privacy rights, publicity rights, copyrights, contract rights or any other rights of any person or entity.
                </p>
              </section>
              
              <section className="mb-6">
                <h2 className="text-xl font-semibold mb-3">5. Accounts</h2>
                <p>
                  When you create an account with us, you guarantee that you are above the age of 18, and that the information 
                  you provide us is accurate, complete, and current at all times. Inaccurate, incomplete, or obsolete 
                  information may result in the immediate termination of your account on the Service.
                </p>
                <p className="mt-2">
                  You are responsible for maintaining the confidentiality of your account and password, including but not 
                  limited to the restriction of access to your computer and/or account. You agree to accept responsibility 
                  for any and all activities or actions that occur under your account and/or password.
                </p>
              </section>
              
              <section className="mb-6">
                <h2 className="text-xl font-semibold mb-3">6. Intellectual Property</h2>
                <p>
                  The Service and its original content (excluding Content provided by users), features, and functionality are 
                  and will remain the exclusive property of Your Nepal App and its licensors. The Service is protected by 
                  copyright, trademark, and other laws of both Nepal and foreign countries. Our trademarks and trade dress may 
                  not be used in connection with any product or service without the prior written consent of Your Nepal App.
                </p>
              </section>
              
              <section className="mb-6">
                <h2 className="text-xl font-semibold mb-3">7. Termination</h2>
                <p>
                  We may terminate or suspend your account and bar access to the Service immediately, without prior notice or 
                  liability, under our sole discretion, for any reason whatsoever and without limitation, including but not 
                  limited to a breach of the Terms.
                </p>
                <p className="mt-2">
                  If you wish to terminate your account, you may simply discontinue using the Service.
                </p>
              </section>
              
              <section className="mb-6">
                <h2 className="text-xl font-semibold mb-3">8. Limitation of Liability</h2>
                <p>
                  In no event shall Your Nepal App, nor its directors, employees, partners, agents, suppliers, or affiliates, 
                  be liable for any indirect, incidental, special, consequential or punitive damages, including without 
                  limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from (i) your access 
                  to or use of or inability to access or use the Service; (ii) any conduct or content of any third party on 
                  the Service; (iii) any content obtained from the Service; and (iv) unauthorized access, use or alteration of 
                  your transmissions or content, whether based on warranty, contract, tort (including negligence) or any other 
                  legal theory, whether or not we have been informed of the possibility of such damage.
                </p>
              </section>
              
              <section className="mb-6">
                <h2 className="text-xl font-semibold mb-3">9. Disclaimer</h2>
                <p>
                  Your use of the Service is at your sole risk. The Service is provided on an "AS IS" and "AS AVAILABLE" basis. 
                  The Service is provided without warranties of any kind, whether express or implied, including, but not 
                  limited to, implied warranties of merchantability, fitness for a particular purpose, non-infringement or 
                  course of performance.
                </p>
              </section>
              
              <section className="mb-6">
                <h2 className="text-xl font-semibold mb-3">10. Governing Law</h2>
                <p>
                  These Terms shall be governed and construed in accordance with the laws of Nepal, without regard to its 
                  conflict of law provisions.
                </p>
                <p className="mt-2">
                  Our failure to enforce any right or provision of these Terms will not be considered a waiver of those rights. 
                  If any provision of these Terms is held to be invalid or unenforceable by a court, the remaining provisions 
                  of these Terms will remain in effect.
                </p>
              </section>
              
              <section>
                <h2 className="text-xl font-semibold mb-3">11. Contact Us</h2>
                <p>
                  If you have any questions about these Terms, please contact us at devendrashah@outlook.my.
                </p>
              </section>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default TermsOfService;
