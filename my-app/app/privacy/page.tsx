export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white shadow-lg rounded-lg p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Privacy Policy</h1>

          <div className="prose prose-gray max-w-none">
            <p className="text-gray-600 mb-6">
              Last updated: {new Date().toLocaleDateString()}
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">1. Information We Collect</h2>
            <p className="text-gray-700 mb-4">
              We collect information you provide directly to us, such as when you create an account, make a request for services, or contact us.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Personal Information</h3>
            <p className="text-gray-700 mb-4">
              This may include your name, email address, phone number, postal address, and any other information you choose to provide.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Usage Information</h3>
            <p className="text-gray-700 mb-4">
              We collect information about how you use our services, including your IP address, browser type, operating system, and pages visited.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">2. How We Use Your Information</h2>
            <p className="text-gray-700 mb-4">We use the information we collect to:</p>
            <ul className="list-disc list-inside text-gray-700 mb-4 ml-4">
              <li>Provide, maintain, and improve our services</li>
              <li>Process transactions and send related information</li>
              <li>Send technical notices, updates, security alerts, and support messages</li>
              <li>Respond to your comments, questions, and customer service requests</li>
              <li>Communicate with you about products, services, offers, and events</li>
              <li>Monitor and analyze trends, usage, and activities in connection with our services</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">3. Information Sharing and Disclosure</h2>
            <p className="text-gray-700 mb-4">
              We do not sell, trade, or otherwise transfer your personal information to third parties without your consent, except as described in this policy.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Service Providers</h3>
            <p className="text-gray-700 mb-4">
              We may share your information with third-party service providers who perform services on our behalf, such as payment processing, email delivery, and analytics.
            </p>

            <h3 className="text-xl font-semibold text-gray-900 mt-6 mb-3">Legal Requirements</h3>
            <p className="text-gray-700 mb-4">
              We may disclose your information if required to do so by law or in response to valid requests by public authorities.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">4. Data Security</h2>
            <p className="text-gray-700 mb-4">
              We take reasonable measures to help protect your personal information from loss, theft, misuse, unauthorized access, disclosure, alteration, and destruction.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">5. Data Retention</h2>
            <p className="text-gray-700 mb-4">
              We retain your personal information for as long as necessary to provide our services, comply with legal obligations, resolve disputes, and enforce our agreements.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">6. Your Rights and Choices</h2>
            <p className="text-gray-700 mb-4">You have the right to:</p>
            <ul className="list-disc list-inside text-gray-700 mb-4 ml-4">
              <li>Access and update your personal information</li>
              <li>Request deletion of your personal information</li>
              <li>Object to processing of your personal information</li>
              <li>Request restriction of processing your personal information</li>
              <li>Data portability</li>
              <li>Withdraw consent</li>
            </ul>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">7. Cookies and Tracking Technologies</h2>
            <p className="text-gray-700 mb-4">
              We use cookies and similar tracking technologies to track activity on our service and store certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">8. Children's Privacy</h2>
            <p className="text-gray-700 mb-4">
              Our services are not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">9. International Data Transfers</h2>
            <p className="text-gray-700 mb-4">
              Your information may be transferred to and processed in countries other than your own. We will take appropriate measures to ensure that your personal information receives an adequate level of protection.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">10. Changes to This Privacy Policy</h2>
            <p className="text-gray-700 mb-4">
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
            </p>

            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">11. Contact Us</h2>
            <p className="text-gray-700 mb-4">
              If you have any questions about this Privacy Policy, please contact us through our contact page.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}