import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Camera, Image, FileImage, CheckCircle, XCircle, AlertTriangle, Sparkles } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Content Guidelines | BahrainNights',
  description: 'Content and image guidelines for submitting venues and events to BahrainNights - Bahrain\'s premier events and lifestyle platform.',
};

export default function ContentGuidelinesPage() {
  return (
    <div className="min-h-screen bg-gray-950 text-gray-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 border-b border-gray-800">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          <h1 className="text-4xl font-bold text-white mb-2">Content Guidelines</h1>
          <p className="text-gray-400">Last updated: January 2026</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-12">

        {/* Introduction */}
        <section className="mb-12">
          <p className="text-lg text-gray-300 leading-relaxed">
            These guidelines help ensure all content on BahrainNights maintains high quality standards and
            complies with the laws and cultural norms of the Kingdom of Bahrain. Please review these
            guidelines carefully before submitting any content.
          </p>
        </section>

        {/* Section 1: Image Quality Standards */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-purple-500/20 rounded-lg">
              <Camera className="w-6 h-6 text-purple-400" />
            </div>
            <h2 className="text-2xl font-bold text-white">1. Image Quality Standards</h2>
          </div>
          <div className="pl-12 space-y-6 text-gray-300">

            {/* Required Standards */}
            <div className="bg-green-500/10 border border-green-500/30 rounded-xl p-6">
              <h3 className="text-lg font-bold text-green-400 mb-4 flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                Required Standards
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="text-green-400 font-bold mt-1">✓</span>
                  <span><strong className="text-white">High Resolution:</strong> Minimum 800x600 pixels. Higher resolution images (1920x1080 or above) are preferred for best display quality.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-400 font-bold mt-1">✓</span>
                  <span><strong className="text-white">Clear & Sharp:</strong> Images must be in focus, well-lit, and clearly show your venue or event.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-400 font-bold mt-1">✓</span>
                  <span><strong className="text-white">Professional Quality:</strong> Photos should represent your venue in its best light. Avoid amateur or poorly composed shots.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-400 font-bold mt-1">✓</span>
                  <span><strong className="text-white">Current & Accurate:</strong> Images should accurately represent the current state of your venue.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-400 font-bold mt-1">✓</span>
                  <span><strong className="text-white">Proper Orientation:</strong> Images should be properly oriented (not rotated or upside down).</span>
                </li>
              </ul>
            </div>

            {/* Not Acceptable */}
            <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-6">
              <h3 className="text-lg font-bold text-red-400 mb-4 flex items-center gap-2">
                <XCircle className="w-5 h-5" />
                Not Acceptable
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="text-red-400 font-bold mt-1">✗</span>
                  <span>Blurry, pixelated, or low-resolution images</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-400 font-bold mt-1">✗</span>
                  <span>Images with excessive watermarks or text overlays</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-400 font-bold mt-1">✗</span>
                  <span>Screenshots or photos of screens</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-400 font-bold mt-1">✗</span>
                  <span>Heavily filtered or distorted images</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-400 font-bold mt-1">✗</span>
                  <span>Stock photos that don't represent your actual venue</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-400 font-bold mt-1">✗</span>
                  <span>Images with visible borders or frames</span>
                </li>
              </ul>
            </div>

          </div>
        </section>

        {/* Section 2: File Format Requirements */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-blue-500/20 rounded-lg">
              <FileImage className="w-6 h-6 text-blue-400" />
            </div>
            <h2 className="text-2xl font-bold text-white">2. File Format Requirements</h2>
          </div>
          <div className="pl-12 space-y-4 text-gray-300">

            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-blue-400 mb-4">Supported Formats</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="font-semibold text-white mb-2">Accepted:</p>
                  <ul className="space-y-1 text-gray-300">
                    <li>• <strong>JPG / JPEG</strong> - Recommended for photos</li>
                    <li>• <strong>PNG</strong> - Good for logos and graphics</li>
                    <li>• <strong>WebP</strong> - Modern format, smaller size</li>
                  </ul>
                </div>
                <div>
                  <p className="font-semibold text-white mb-2">Not Accepted:</p>
                  <ul className="space-y-1 text-gray-400">
                    <li>• HEIC (iPhone format)</li>
                    <li>• TIFF</li>
                    <li>• BMP</li>
                    <li>• GIF</li>
                    <li>• RAW formats</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-gray-800/50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-white mb-4">Size Limits</h3>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-center gap-2">
                  <span className="text-purple-400">•</span>
                  <strong>Maximum file size:</strong> 10MB per image
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-purple-400">•</span>
                  <strong>Logo:</strong> Square format recommended (1:1 ratio)
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-purple-400">•</span>
                  <strong>Cover image:</strong> 1200x600 pixels recommended (2:1 ratio)
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-purple-400">•</span>
                  <strong>Gallery images:</strong> Up to 10 images per venue
                </li>
              </ul>
            </div>

          </div>
        </section>

        {/* Section 3: Content Compliance */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-red-500/20 rounded-lg">
              <AlertTriangle className="w-6 h-6 text-red-400" />
            </div>
            <h2 className="text-2xl font-bold text-white">3. Content Compliance (Bahrain Laws)</h2>
          </div>

          <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-6 mb-6">
            <h3 className="text-lg font-bold text-red-400 mb-4 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5" />
              IMPORTANT: All content must comply with Bahrain laws
            </h3>
            <p className="text-gray-300">
              Content that violates these rules will be automatically rejected or removed without notice.
              Repeated violations may result in account termination.
            </p>
          </div>

          <div className="pl-12 space-y-6 text-gray-300">

            <div>
              <h3 className="text-lg font-semibold text-white mb-3">Strictly Prohibited Content:</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="text-red-400 font-bold">✗</span>
                  <span><strong className="text-white">Alcohol Bottles/Branding:</strong> Do not show alcohol bottles, beer cans, or branded alcoholic beverages. Cocktail glasses and mocktails without visible alcohol branding are acceptable.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-400 font-bold">✗</span>
                  <span><strong className="text-white">Inappropriate Dress:</strong> Photos must show appropriate dress code. No revealing clothing, excessive skin exposure, or suggestive poses.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-400 font-bold">✗</span>
                  <span><strong className="text-white">Drugs/Drug Imagery:</strong> Any content depicting illegal substances or drug paraphernalia.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-400 font-bold">✗</span>
                  <span><strong className="text-white">Nudity/Sexual Content:</strong> Any nudity, sexually suggestive, or explicit material.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-400 font-bold">✗</span>
                  <span><strong className="text-white">Political Content:</strong> Political statements, propaganda, or politically charged imagery.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-400 font-bold">✗</span>
                  <span><strong className="text-white">Religious Controversy:</strong> Content that may offend religious sensibilities or promote religious debate.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-400 font-bold">✗</span>
                  <span><strong className="text-white">Hate Speech:</strong> Content promoting discrimination, hatred, or violence.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-400 font-bold">✗</span>
                  <span><strong className="text-white">Copyright Infringement:</strong> Images you don't own or don't have permission to use.</span>
                </li>
              </ul>
            </div>

            <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4">
              <p className="text-green-400 font-semibold mb-2">What IS Acceptable:</p>
              <ul className="text-gray-300 space-y-1">
                <li>• Professional venue and event photography</li>
                <li>• Cocktail glasses and mocktails (no visible alcohol branding)</li>
                <li>• Food and beverage presentations</li>
                <li>• People in appropriate attire for the venue type</li>
                <li>• Entertainment and ambiance shots</li>
                <li>• Beach/pool venues with appropriate swimwear coverage</li>
              </ul>
            </div>

          </div>
        </section>

        {/* Section 4: Description Guidelines */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-amber-500/20 rounded-lg">
              <Sparkles className="w-6 h-6 text-amber-400" />
            </div>
            <h2 className="text-2xl font-bold text-white">4. Description Guidelines</h2>
          </div>
          <div className="pl-12 space-y-4 text-gray-300">

            <div className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-amber-400 mb-4">Writing Your Description</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="text-green-400 font-bold mt-1">✓</span>
                  <span><strong className="text-white">Be Accurate:</strong> Describe your venue or event honestly and accurately.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-400 font-bold mt-1">✓</span>
                  <span><strong className="text-white">Be Professional:</strong> Use proper grammar and spelling. Avoid excessive capitalization or punctuation.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-400 font-bold mt-1">✓</span>
                  <span><strong className="text-white">Be Informative:</strong> Include relevant details like cuisine type, atmosphere, special features, etc.</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-green-400 font-bold mt-1">✓</span>
                  <span><strong className="text-white">Be Engaging:</strong> Write in a way that attracts potential visitors while remaining truthful.</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-white mb-3">Do NOT include:</h3>
              <ul className="space-y-2 text-gray-300">
                <li className="flex items-start gap-3">
                  <span className="text-red-400 font-bold">✗</span>
                  <span>False or misleading claims</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-400 font-bold">✗</span>
                  <span>Contact information in descriptions (use proper fields)</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-400 font-bold">✗</span>
                  <span>Promotional codes or special offers (unless in designated areas)</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-400 font-bold">✗</span>
                  <span>Links to external websites</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-400 font-bold">✗</span>
                  <span>Profanity or inappropriate language</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-red-400 font-bold">✗</span>
                  <span>References to alcohol promotions or pricing</span>
                </li>
              </ul>
            </div>

          </div>
        </section>

        {/* Section 5: AI Content Moderation */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-purple-500/20 rounded-lg">
              <Image className="w-6 h-6 text-purple-400" />
            </div>
            <h2 className="text-2xl font-bold text-white">5. AI Content Moderation</h2>
          </div>
          <div className="pl-12 space-y-4 text-gray-300">

            <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-6">
              <p className="text-purple-400 font-semibold mb-3">Automated Review System</p>
              <p className="mb-4">
                All uploaded images are automatically scanned by our AI moderation system to ensure
                compliance with Bahrain laws and our content guidelines.
              </p>
              <p className="text-gray-400 text-sm">
                Our AI detects: inappropriate content, excessive skin exposure, alcohol bottles/glasses,
                drug-related imagery, offensive symbols, copyrighted content, and other prohibited material.
              </p>
            </div>

            <p>
              Images that violate our policies will be automatically rejected. You will receive a notification
              if your image is rejected, and you may submit a new image that meets our guidelines.
            </p>

          </div>
        </section>

        {/* Section 6: Rights & Ownership */}
        <section className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-green-500/20 rounded-lg">
              <CheckCircle className="w-6 h-6 text-green-400" />
            </div>
            <h2 className="text-2xl font-bold text-white">6. Rights & Ownership</h2>
          </div>
          <div className="pl-12 space-y-4 text-gray-300">
            <p>By uploading content to BahrainNights, you:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Confirm you own the rights to all uploaded content or have obtained necessary permissions</li>
              <li>Grant BahrainNights a non-exclusive, royalty-free license to use, display, and distribute your content on our platform</li>
              <li>Agree that your images may be watermarked for platform identification</li>
              <li>Understand that BahrainNights may compress, resize, or optimize images</li>
              <li>Accept that BahrainNights reserves the right to remove any content without notice</li>
            </ul>
          </div>
        </section>

        {/* Agreement Box */}
        <section className="mt-16">
          <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-xl p-8 text-center">
            <h3 className="text-xl font-bold text-white mb-4">Ready to Submit?</h3>
            <p className="text-gray-300 mb-6">
              By submitting content to BahrainNights, you confirm that you have read, understood, and agree
              to follow these Content Guidelines.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/register-venue"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500 to-purple-600 text-white font-semibold px-6 py-3 rounded-lg hover:from-purple-400 hover:to-purple-500 transition-all"
              >
                Register Your Venue
              </Link>
              <Link
                href="/submit-venue"
                className="inline-flex items-center gap-2 bg-gray-700 text-white font-semibold px-6 py-3 rounded-lg hover:bg-gray-600 transition-all"
              >
                Suggest a Venue
              </Link>
            </div>
          </div>
        </section>

        {/* Related Links */}
        <section className="mt-12">
          <h3 className="text-lg font-semibold text-white mb-4">Related Pages</h3>
          <div className="flex flex-wrap gap-4">
            <Link href="/terms" className="text-purple-400 hover:underline">Terms of Service</Link>
            <Link href="/privacy" className="text-purple-400 hover:underline">Privacy Policy</Link>
            <Link href="/contact" className="text-purple-400 hover:underline">Contact Us</Link>
          </div>
        </section>

      </div>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-8 mt-12">
        <div className="max-w-4xl mx-auto px-4 text-center text-gray-500">
          <p>&copy; 2026 BahrainNights. All rights reserved.</p>
          <div className="flex justify-center gap-6 mt-4">
            <Link href="/privacy" className="hover:text-purple-400 transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-purple-400 transition-colors">Terms of Service</Link>
            <Link href="/contact" className="hover:text-purple-400 transition-colors">Contact</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
