import React from "react";

export default function Terms() {
  return (
    <div className="max-w-4xl mx-auto py-16 px-6">
      <h1 className="text-4xl font-bold text-purple-600 mb-6">
        Terms & Conditions
      </h1>

      <p className="text-gray-700 mb-4">
        Last Updated: {new Date().toLocaleDateString()}
      </p>

      <p className="text-gray-600 mb-6">
        Welcome to <span className="font-semibold text-purple-500">JobFinder</span>. 
        By accessing or using our platform, you agree to comply with these terms and conditions.
      </p>

      {/* Section 1 */}
      <h2 className="text-2xl font-semibold text-purple-500 mb-3">
        1. User Responsibilities
      </h2>
      <ul className="list-disc pl-6 text-gray-600 space-y-2 mb-6">
        <li>Provide accurate and complete information when using the platform.</li>
        <li>Do not post or share harmful, illegal, or inappropriate content.</li>
        <li>Do not misuse the platform or attempt to hack or damage it.</li>
      </ul>

      {/* Section 2 */}
      <h2 className="text-2xl font-semibold text-purple-500 mb-3">
        2. Platform Responsibilities
      </h2>
      <p className="text-gray-600 mb-6">
        We strive to provide authentic job listings, maintain security, and remove fraudulent posts when identified.
      </p>

      {/* Section 3 */}
      <h2 className="text-2xl font-semibold text-purple-500 mb-3">
        3. Limitation of Liability
      </h2>
      <p className="text-gray-600 mb-6">
        JobFinder is not responsible for employment outcomes or disputes between employers and candidates. All job listings come from third-party employers and we cannot guarantee accuracy.
      </p>

      {/* Section 4 */}
      <h2 className="text-2xl font-semibold text-purple-500 mb-3">
        4. Account Termination
      </h2>
      <p className="text-gray-600 mb-6">
        We reserve the right to suspend or terminate accounts that violate these terms or post harmful content.
      </p>

      <h2 className="text-2xl font-semibold text-purple-500 mb-3">
        5. Contact Us
      </h2>
      <p className="text-gray-600 mb-6">
        For any questions regarding these terms, please contact us at: 
        <strong className="text-purple-600"> support@jobfinder.com</strong>
      </p>

      <p className="text-gray-500 text-sm italic">
        Thank you for using JobFinder responsibly.
      </p>
    </div>
  );
}
