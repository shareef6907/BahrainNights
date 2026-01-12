import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Shield, Users, Camera, MapPin, AlertTriangle, Scale, Mail } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Terms of Service | BahrainNights',
  description: 'Terms of Service and Content Guidelines for BahrainNights - Bahrain\'s premier events and lifestyle platform.',
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-600/20 to-pink-600/20 border-b border-gray-800">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-amber-400 hover:text-amber-300 mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          <h1 className="text-4xl font-bold text-white mb-2">Terms of Service</h1>
          <p className="text-gray-400">Last updated: January 2026</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">

        {/* Introduction */}
        <section className="mb-12">
          <p className="text-lg text-gray-300 leading-relaxed">
            Welcome to BahrainNights. By accessing or using our platform, you agree to be bound by these
            Terms of Service. Please read them carefully before using our services.
          </p>
        </section>

        {/* Section 1: Content Responsibility & Liability - CRITICAL */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-red-500/20 rounded-lg">
              <Shield className="w-6 h-6 text-red-400" />
            </div>
            <h2 className="text-2xl font-bold text-white">1. Content Responsibility & Liability Disclaimer</h2>
          </div>

          <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-6 mb-6">
            <h3 className="text-lg font-bold text-red-400 mb-4 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5" />
              IMPORTANT: Please Read Carefully
            </h3>
            <div className="space-y-4 text-gray-300">
              <p>
                By submitting any content (including venue information, event details, images, descriptions, or any other materials) to BahrainNights.com, you acknowledge and agree to the following:
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="text-red-400 font-bold mt-1">•</span>
                  <span><strong className="text-white">Content Ownership:</strong> You confirm that you have the legal right to submit this information and any associated images, and that the content does not infringe upon any third-party intellectual property rights, trademarks, or copyrights.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-400 font-bold mt-1">•</span>
                  <span><strong className="text-white">Accuracy & Truthfulness:</strong> You are solely responsible for ensuring all submitted information is accurate, current, and truthful. BahrainNights.com does not independently verify the accuracy of user-submitted content.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-400 font-bold mt-1">•</span>
                  <span><strong className="text-white">No Liability:</strong> BahrainNights.com and its operators, owners, directors, employees, and affiliates accept no responsibility or liability whatsoever for any content submitted by users. This includes but is not limited to inaccurate information, misleading descriptions, inappropriate content, or any claims arising from such content.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-400 font-bold mt-1">•</span>
                  <span><strong className="text-white">Indemnification:</strong> You agree to indemnify, defend, and hold harmless BahrainNights.com, its operators, owners, directors, employees, agents, and affiliates from and against any and all claims, demands, damages, costs, expenses (including reasonable legal fees), liabilities, and losses arising from or related to your submitted content, your breach of these terms, or your violation of any law or third-party rights.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-400 font-bold mt-1">•</span>
                  <span><strong className="text-white">Content Moderation Rights:</strong> BahrainNights.com reserves the absolute right to review, edit, modify, or remove any submitted content at its sole discretion without prior notice and without providing any reason.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-400 font-bold mt-1">•</span>
                  <span><strong className="text-white">Legal Compliance:</strong> You agree that your submission complies with all applicable laws, regulations, and ordinances in the Kingdom of Bahrain and any other relevant jurisdictions.</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Section 2: About BahrainNights */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-amber-500/20 rounded-lg">
              <MapPin className="w-6 h-6 text-amber-400" />
            </div>
            <h2 className="text-2xl font-bold text-white">2. About BahrainNights</h2>
          </div>
          <div className="pl-12 space-y-4 text-gray-300">
            <p>
              BahrainNights is Bahrain&apos;s premier events and lifestyle platform, connecting visitors and residents
              with the best venues, events, entertainment, and experiences across the Kingdom of Bahrain.
            </p>
            <p>
              Our platform helps businesses reach a wider audience while offering users a comprehensive
              guide to what&apos;s happening in Bahrain.
            </p>
          </div>
        </section>

        {/* Section 3: User Accounts */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-blue-500/20 rounded-lg">
              <Users className="w-6 h-6 text-blue-400" />
            </div>
            <h2 className="text-2xl font-bold text-white">3. User Accounts</h2>
          </div>
          <div className="pl-12 space-y-4 text-gray-300">
            <h3 className="text-lg font-semibold text-white">3.1 Public Users</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Users may sign in using Google authentication to access features like venue likes and favorites</li>
              <li>By signing in, you agree to allow BahrainNights to store your basic profile information</li>
              <li>You are responsible for maintaining the security of your account</li>
            </ul>

            <h3 className="text-lg font-semibold text-white mt-6">3.2 Venue Owners</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Venue registration requires a valid Bahraini Commercial Registration (CR) number</li>
              <li>All venue information must be accurate and up-to-date</li>
              <li>Venue owners are responsible for the accuracy of their listings</li>
              <li>Changes to venue profiles are subject to admin approval</li>
            </ul>
          </div>
        </section>

        {/* Section 4: Content Guidelines - IMPORTANT */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-red-500/20 rounded-lg">
              <AlertTriangle className="w-6 h-6 text-red-400" />
            </div>
            <h2 className="text-2xl font-bold text-white">4. Content Guidelines</h2>
          </div>

          {/* Highlighted Box */}
          <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-6 mb-6">
            <h3 className="text-lg font-bold text-red-400 mb-4 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5" />
              IMPORTANT: Content Rules for Bahrain
            </h3>
            <p className="text-gray-300 mb-4">
              All content on BahrainNights must comply with the laws and cultural norms of the Kingdom of Bahrain.
              Failure to comply may result in content removal or account termination.
            </p>
          </div>

          <div className="pl-12 space-y-6 text-gray-300">

            <div>
              <h3 className="text-lg font-semibold text-white mb-3">4.1 Prohibited Content (Bahrain Law Compliance)</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="text-red-400 font-bold">✗</span>
                  <span><strong>No alcohol bottles or branded drinks:</strong> Do not display alcohol bottles, beer cans, branded alcoholic beverages, or people visibly drinking alcohol. <span className="text-green-400">(Cocktail glasses and mocktails are acceptable)</span></span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-400 font-bold">✗</span>
                  <span><strong>No excessive skin exposure:</strong> Photos must show appropriate dress. No revealing clothing, swimwear in non-beach contexts, or suggestive poses.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-400 font-bold">✗</span>
                  <span><strong>No drugs or drug-related imagery:</strong> Any content depicting illegal substances, drug paraphernalia, or promoting drug use is strictly prohibited.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-400 font-bold">✗</span>
                  <span><strong>No nudity or sexual content:</strong> Nudity, sexually suggestive content, or explicit material is strictly prohibited.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-400 font-bold">✗</span>
                  <span><strong>No offensive content:</strong> Content must not violate Bahrain laws, regulations, or cultural sensitivities.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-400 font-bold">✗</span>
                  <span><strong>No political content:</strong> Political statements, propaganda, or politically charged content is not permitted.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-400 font-bold">✗</span>
                  <span><strong>No religious content:</strong> Religious debates, controversial religious statements, or content that may offend religious sensibilities is not allowed.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-400 font-bold">✗</span>
                  <span><strong>No hate speech:</strong> Content promoting discrimination, hatred, or violence against any group is not permitted.</span>
                </li>
              </ul>

              {/* What's Allowed */}
              <div className="mt-6 bg-green-500/10 border border-green-500/30 rounded-lg p-4">
                <p className="text-green-400 font-semibold mb-2">✓ What IS Allowed:</p>
                <ul className="text-gray-300 space-y-1">
                  <li>• Cocktail glasses and mocktails (without visible alcohol branding)</li>
                  <li>• Professional venue and event photography</li>
                  <li>• Food and beverage presentations</li>
                  <li>• People in appropriate attire for the venue type</li>
                  <li>• Entertainment and ambiance shots</li>
                  <li>• Beach/pool venues with appropriate swimwear coverage</li>
                </ul>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-white mb-3">4.2 Dress Code in Photos</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="text-amber-400 font-bold">!</span>
                  <span>All photos must show decent dress code appropriate for Bahrain</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-amber-400 font-bold">!</span>
                  <span>Nightlife venue photos must be particularly mindful of dress standards</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-amber-400 font-bold">!</span>
                  <span>Beach and pool venue photos should show appropriate swimwear coverage</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-white mb-3">4.3 Image Format Requirements</h3>
              <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 mb-4">
                <p className="text-blue-400 font-semibold mb-2">Supported File Formats:</p>
                <ul className="text-gray-300 space-y-1">
                  <li>• <strong>JPG / JPEG</strong> - Recommended for photos</li>
                  <li>• <strong>PNG</strong> - Good for logos and graphics</li>
                  <li>• <strong>WebP</strong> - Modern format, smaller file size</li>
                  <li>• <strong>Maximum file size:</strong> 10MB per image</li>
                  <li>• <strong>Minimum resolution:</strong> 800x600 pixels recommended</li>
                  <li>• <strong>Maximum gallery images:</strong> 20 per venue</li>
                </ul>
              </div>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="text-green-400 font-bold">✓</span>
                  <span>Images must be high quality and relevant to your venue/event</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-400 font-bold">✓</span>
                  <span>You must own or have rights to use all uploaded images</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-400 font-bold">✓</span>
                  <span>Images will be automatically optimized and converted to WebP format</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-400 font-bold">✗</span>
                  <span>HEIC, TIFF, BMP, GIF formats are NOT supported</span>
                </li>
              </ul>
            </div>

            <div className="mt-6">
              <h3 className="text-lg font-semibold text-white mb-3">4.4 AI Content Moderation</h3>
              <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-4">
                <p className="text-purple-400 font-semibold mb-2">🤖 Automated Content Review</p>
                <p className="text-gray-300 mb-3">
                  All uploaded images are automatically scanned by our AI moderation system to ensure compliance
                  with Bahrain laws and our content guidelines. Images that violate our policies will be
                  automatically rejected or removed without notice.
                </p>
                <p className="text-gray-400 text-sm">
                  Our AI detects: inappropriate content, excessive skin exposure, alcohol bottles/glasses,
                  drug-related imagery, offensive symbols, and other prohibited content.
                </p>
              </div>
            </div>

          </div>
        </section>

        {/* Section 5: Photo & Media Guidelines */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-purple-500/20 rounded-lg">
              <Camera className="w-6 h-6 text-purple-400" />
            </div>
            <h2 className="text-2xl font-bold text-white">5. Photo & Media Guidelines</h2>
          </div>
          <div className="pl-12 space-y-4 text-gray-300">
            <p>
              By uploading photos and media to BahrainNights, you:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Grant BahrainNights a non-exclusive, royalty-free license to use, display, and distribute your content on our platform</li>
              <li>Confirm you own the rights to all uploaded content or have obtained necessary permissions</li>
              <li>Agree that your images may be watermarked for platform identification</li>
              <li>Understand that BahrainNights may compress or resize images for optimization</li>
              <li>Accept that BahrainNights reserves the right to remove any content without notice</li>
            </ul>
          </div>
        </section>

        {/* Section 6: Venue Listing Terms */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-green-500/20 rounded-lg">
              <Shield className="w-6 h-6 text-green-400" />
            </div>
            <h2 className="text-2xl font-bold text-white">6. Venue Listing Terms</h2>
          </div>
          <div className="pl-12 space-y-4 text-gray-300">

            <h3 className="text-lg font-semibold text-white">6.1 Venue Listings</h3>
            <p>
              BahrainNights provides venue listings to support local businesses in Bahrain. This includes:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Venue profile with description, contact information, and location</li>
              <li>Photo gallery (up to 20 images)</li>
              <li>Opening hours display</li>
              <li>Event listings for your venue</li>
              <li>Customer reviews and ratings (coming soon)</li>
            </ul>

            <h3 className="text-lg font-semibold text-white mt-6">6.2 Premium Advertising</h3>
            <p>
              Premium placement options are available for venues seeking additional visibility:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Homepage slider advertisements</li>
              <li>Featured venue placement</li>
              <li>Category page promotions</li>
              <li>Contact us for pricing and availability</li>
            </ul>

            <h3 className="text-lg font-semibold text-white mt-6">6.3 Approval Process</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>All new venue registrations are subject to admin review</li>
              <li>Approval typically takes 24-48 hours</li>
              <li>Venues may be rejected if they don&apos;t meet our guidelines</li>
              <li>Rejected venues will receive an email with the reason for rejection</li>
              <li>You may resubmit after addressing the issues</li>
            </ul>

            <h3 className="text-lg font-semibold text-white mt-6">6.4 Profile Changes</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Changes to venue profiles must be submitted for admin approval</li>
              <li>This ensures all content continues to meet our guidelines</li>
              <li>Approved changes will be reflected immediately on the platform</li>
            </ul>

          </div>
        </section>

        {/* Section 7: Event Listing Terms */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-pink-500/20 rounded-lg">
              <Scale className="w-6 h-6 text-pink-400" />
            </div>
            <h2 className="text-2xl font-bold text-white">7. Event Listing Terms</h2>
          </div>
          <div className="pl-12 space-y-4 text-gray-300">
            <ul className="list-disc pl-6 space-y-2">
              <li>Events must be real, scheduled activities taking place in Bahrain</li>
              <li>Event information must be accurate (date, time, venue, pricing)</li>
              <li>All events are subject to admin approval before being published</li>
              <li>BahrainNights is not responsible for event cancellations or changes</li>
              <li>Venues are responsible for updating event information if changes occur</li>
            </ul>
          </div>
        </section>

        {/* Section 8: Prohibited Activities */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-red-500/20 rounded-lg">
              <AlertTriangle className="w-6 h-6 text-red-400" />
            </div>
            <h2 className="text-2xl font-bold text-white">8. Prohibited Activities</h2>
          </div>
          <div className="pl-12 space-y-4 text-gray-300">
            <p>Users and venues must NOT:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Provide false or misleading information</li>
              <li>Use fake CR numbers or impersonate other businesses</li>
              <li>Upload content that infringes on others&apos; intellectual property</li>
              <li>Attempt to manipulate the like/ranking system</li>
              <li>Use automated tools to scrape or access the platform</li>
              <li>Spam or send unsolicited communications through the platform</li>
              <li>Interfere with the proper functioning of the platform</li>
              <li>Violate any applicable local, national, or international laws</li>
            </ul>
          </div>
        </section>

        {/* Section 9: Disclaimer */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-gray-500/20 rounded-lg">
              <Shield className="w-6 h-6 text-gray-400" />
            </div>
            <h2 className="text-2xl font-bold text-white">9. Disclaimer</h2>
          </div>
          <div className="pl-12 space-y-4 text-gray-300">
            <ul className="list-disc pl-6 space-y-2">
              <li>BahrainNights is a platform that connects users with venues and events</li>
              <li>We do not own, operate, or control any listed venues or events</li>
              <li>We are not responsible for the quality, safety, or legality of listed venues or events</li>
              <li>Venue information is provided by venue owners and may not always be current</li>
              <li>Users visit venues and attend events at their own risk</li>
              <li>BahrainNights is not liable for any damages arising from use of the platform</li>
            </ul>
          </div>
        </section>

        {/* Section 10: Termination */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-orange-500/20 rounded-lg">
              <AlertTriangle className="w-6 h-6 text-orange-400" />
            </div>
            <h2 className="text-2xl font-bold text-white">10. Termination</h2>
          </div>
          <div className="pl-12 space-y-4 text-gray-300">
            <p>BahrainNights reserves the right to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Remove any content that violates these terms without notice</li>
              <li>Suspend or terminate venue accounts for violations</li>
              <li>Ban users who abuse the platform or violate guidelines</li>
              <li>Modify or discontinue any aspect of the service at any time</li>
            </ul>
          </div>
        </section>

        {/* Section 11: Changes to Terms */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-blue-500/20 rounded-lg">
              <Scale className="w-6 h-6 text-blue-400" />
            </div>
            <h2 className="text-2xl font-bold text-white">11. Changes to Terms</h2>
          </div>
          <div className="pl-12 space-y-4 text-gray-300">
            <p>
              BahrainNights may update these Terms of Service from time to time. We will notify users of
              significant changes by posting a notice on our platform. Continued use of the platform after
              changes constitutes acceptance of the new terms.
            </p>
          </div>
        </section>

        {/* Section 12: Contact */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-amber-500/20 rounded-lg">
              <Mail className="w-6 h-6 text-amber-400" />
            </div>
            <h2 className="text-2xl font-bold text-white">12. Contact Us</h2>
          </div>
          <div className="pl-12 space-y-4 text-gray-300">
            <p>
              If you have questions about these Terms of Service, please contact us:
            </p>
            <div className="bg-gray-900 rounded-xl p-6 mt-4">
              <p className="font-semibold text-white mb-2">BahrainNights</p>
              <p>Email: <a href="mailto:info@bahrainnights.com" className="text-amber-400 hover:underline">info@bahrainnights.com</a></p>
              <p>Website: <a href="https://bahrainnights.com" className="text-amber-400 hover:underline">bahrainnights.com</a></p>
              <p className="mt-4 text-gray-400">Manama, Kingdom of Bahrain</p>
            </div>
          </div>
        </section>

        {/* Agreement Box */}
        <section className="mt-16">
          <div className="bg-gradient-to-r from-amber-500/10 to-pink-500/10 border border-amber-500/30 rounded-xl p-8 text-center">
            <h3 className="text-xl font-bold text-white mb-4">Agreement</h3>
            <p className="text-gray-300 mb-6">
              By using BahrainNights, registering a venue, or submitting content, you acknowledge that you have
              read, understood, and agree to be bound by these Terms of Service.
            </p>
            <Link
              href="/register-venue"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 text-black font-semibold px-6 py-3 rounded-lg hover:from-amber-400 hover:to-amber-500 transition-all"
            >
              Register Your Venue
            </Link>
          </div>
        </section>

      </div>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-8 mt-12">
        <div className="max-w-4xl mx-auto px-4 text-center text-gray-500">
          <p>© 2026 BahrainNights. All rights reserved.</p>
          <div className="flex justify-center gap-6 mt-4">
            <Link href="/privacy" className="hover:text-amber-400 transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-amber-400 transition-colors">Terms of Service</Link>
            <Link href="/contact" className="hover:text-amber-400 transition-colors">Contact</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
