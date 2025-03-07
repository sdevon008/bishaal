
import React from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const AboutUs = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to homepage after a brief delay
    const redirectTimer = setTimeout(() => {
      navigate('/');
    }, 100);

    return () => clearTimeout(redirectTimer);
  }, [navigate]);

  return (
    <div>
      <Helmet>
        <title>About Us | Your Nepal App</title>
        <meta name="robots" content="noindex,nofollow" />
        <meta name="description" content="Learn about Your Nepal App and our mission to provide useful tools and services for Nepal." />
      </Helmet>
      {/* This content won't be visible due to the redirect */}
      <div className="container mx-auto py-12">
        <h1 className="text-3xl font-bold mb-6">About Us</h1>
        <p className="mb-4">
          Welcome to Your Nepal App, your comprehensive resource for Nepali utilities and tools.
        </p>
        <p className="mb-4">
          Founded in 2023, we aim to provide accessible digital services that simplify everyday tasks for Nepali citizens and anyone interested in Nepal.
        </p>
        <p className="mb-4">
          Our tools include Nepali date conversion, calendar information, load shedding schedules, currency conversion, and much more.
        </p>
        <p>
          For any inquiries or feedback, please contact us at support@yournepalapp.com.
        </p>
      </div>
    </div>
  );
};

export default AboutUs;
