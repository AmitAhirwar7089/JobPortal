import React from "react";

export default function Privacy() {
  return (
    <div className="max-w-4xl mx-auto py-16 px-6">
      <h1 className="text-4xl font-bold text-purple-600 mb-6">
        Privacy Policy
      </h1>

      <p className="text-gray-700 mb-4">
        Last Updated: {new Date().toLocaleDateString()}
      </p>

      <p className="text-gray-600 mb-6">
        At <span className="font-semibold text-purple-500">JobFinder</span>, we value
        your privacy and are committed to protecting your personal data.  
        This Privacy Policy explains how we collect, use, and safeguard your information.
      </p>

      {/* Section 1 */}
      <h2 className="text-2xl font-semibold text-purple-500 mb-3">
        1. Information We Collect
      </h2>
      <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
        <li>Personal information such as name, email, phone number.</li>
        <li>Resume or job-related documents.</li>
        <li>Usage data including IP address and browsing activity.</li>
        <li>Job preferences and profile information.</li>
      </ul>

      {/* Section 2 */}
      <h2 className="text-2xl font-semibold text-purple-500 mb-3">
        2. How We Use Your Information
      </h2>
      <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
        <li>To help you find jobs that match your skills.</li>
        <li>To improve the performance and quality of our platform.</li>
        <li>To communicate updates, job alerts, and notifications.</li>
        <li>To protect our platform from fraud or misuse.</li>
      </ul>

      {/* Section 3 */}
      <h2 className="text-2xl font-semibold text-purple-500 mb-3">
        3. Sharing of Information
      </h2>
      <p className="text-gray-600 mb-6">
        We may share your information with:
      </p>
      <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
        <li>Employers and recruiters</li>
        <li>Verified third-party service providers</li>
        <li>Government authorities (only when required by law)</li>
      </ul>

      {/* Section 4 */}
      <h2 className="text-2xl font-semibold text-purple-500 mb-3">
        4. Your Rights
      </h2>
      <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
        <li>Access your personal information</li>
        <li>Request correction or deletion</li>
        <li>Withdraw consent anytime</li>
      </ul>

      {/* Section 5 */}
      <h2 className="text-2xl font-semibold text-purple-500 mb-3">
        5. Contact Us
      </h2>
      <p className="text-gray-600 mb-10">
        If you have any questions about our Privacy Policy, feel free to contact us at:  
        <br />
        <strong className="text-purple-600">support@jobfinder.com</strong>
      </p>

      <p className="text-gray-500 text-sm italic">
        Thank you for trusting JobFinder with your information.
      </p>
    </div>
  );
}
