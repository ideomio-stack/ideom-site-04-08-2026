import { motion } from 'motion/react';
import { ArrowUpRight, X, Menu } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function PrivacyPolicy() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen font-sans">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4 border-b border-black bg-[#F5F5F5] shadow-sm">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link
            to="/"
            className="text-4xl font-bold tracking-tighter text-black flex items-center leading-none"
            style={{ fontFamily: "var(--font-circular)" }}
          >
            ideom<span className="text-[#1F2F2A] text-[0.92em] translate-y-[14px] leading-none">*</span>
          </Link>

          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-[#6B6B6B]">
            <Link to="/#services" className="hover:text-black transition-colors">Services</Link>
            <Link to="/#work" className="hover:text-black transition-colors">Work</Link>
            <Link to="/#about" className="hover:text-black transition-colors">About</Link>
          </div>

          <div className="hidden md:flex items-center gap-6">
            <Link to="/free-guide" className="text-sm font-semibold text-black hover:text-black transition-colors">
              Free Guide
            </Link>
            <Link
              to="/#contact"
              className="inline-flex items-center gap-4 bg-[#eaeaea] p-[12px] px-[18px] rounded-[20px] border border-black/10 group cursor-pointer transition-all duration-300 scale-90 origin-left"
            >
              <div className="w-12 h-12 rounded-[14px] flex items-center justify-center bg-white shadow-sm overflow-hidden">
                <span className="text-4xl font-bold leading-none select-none text-[#1F2F2A]" style={{ marginTop: '0.22em' }}>*</span>
              </div>
              <span className="text-[20px] font-medium tracking-tight text-black whitespace-nowrap pr-2">Let's Collaborate</span>
            </Link>
          </div>

          <button
            className="md:hidden p-2 text-[#6B6B6B] hover:text-black"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 bg-[#F5F5F5] pt-24 px-6 md:hidden">
          <div className="flex flex-col gap-6 text-2xl font-medium text-black">
            <Link to="/#services" onClick={() => setIsMenuOpen(false)}>Services</Link>
            <Link to="/#work" onClick={() => setIsMenuOpen(false)}>Work</Link>
            <Link to="/#about" onClick={() => setIsMenuOpen(false)}>About</Link>
            <Link to="/free-guide" onClick={() => setIsMenuOpen(false)} className="text-[#1F2F2A]">Free Guide</Link>
          </div>
        </div>
      )}

      {/* Content */}
      <main className="max-w-4xl mx-auto pt-32 pb-24 px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Header */}
          <div className="mb-16">
            <div className="inline-block px-4 py-1.5 bg-black text-white text-xs font-bold tracking-wider uppercase mb-6">
              Legal
            </div>
            <h1 className="text-5xl md:text-7xl font-medium tracking-tight mb-4 text-black">
              Privacy <span className="font-serif italic text-[#6B6B6B]">Policy</span>
            </h1>
            <p className="text-[#6B6B6B] text-sm font-medium">Last updated: March 31, 2026</p>
          </div>

          {/* Intro */}
          <div className="mb-12">
            <p className="text-lg text-[#6B6B6B] leading-relaxed">
              At IDEOM ("we," "our," "us"), your privacy matters. This Privacy Policy explains how we collect, use, and protect your information when you visit our website, communicate with us, or use our marketing services.
            </p>
          </div>

          {/* Sections */}
          <div className="space-y-12">
            {/* Section 1 */}
            <section className="border-t border-black/10 pt-8">
              <div className="flex items-baseline gap-4 mb-6">
                <span className="text-6xl font-serif italic text-black/10">01</span>
                <h2 className="text-2xl font-medium text-black">Information We Collect</h2>
              </div>
              <p className="text-[#6B6B6B] leading-relaxed mb-4">We collect information in three ways:</p>
              <ul className="space-y-4 text-[#6B6B6B] leading-relaxed">
                <li className="flex gap-3">
                  <span className="w-1.5 h-1.5 bg-black rounded-full mt-2.5 shrink-0" />
                  <span><strong className="text-black">Information you provide directly,</strong> such as when you fill out a contact form, subscribe to our newsletter, or book a consultation (includes your name, email, company name, and phone number).</span>
                </li>
                <li className="flex gap-3">
                  <span className="w-1.5 h-1.5 bg-black rounded-full mt-2.5 shrink-0" />
                  <span><strong className="text-black">Information collected automatically,</strong> such as cookies, IP address, browser type, and usage data to understand how you interact with our site.</span>
                </li>
                <li className="flex gap-3">
                  <span className="w-1.5 h-1.5 bg-black rounded-full mt-2.5 shrink-0" />
                  <span><strong className="text-black">Information from third parties,</strong> including analytics or advertising partners that help us measure performance and reach.</span>
                </li>
              </ul>
            </section>

            {/* Section 2 */}
            <section className="border-t border-black/10 pt-8">
              <div className="flex items-baseline gap-4 mb-6">
                <span className="text-6xl font-serif italic text-black/10">02</span>
                <h2 className="text-2xl font-medium text-black">How We Use Your Information</h2>
              </div>
              <p className="text-[#6B6B6B] leading-relaxed mb-4">We use your data to:</p>
              <ul className="space-y-3 text-[#6B6B6B] leading-relaxed">
                <li className="flex gap-3">
                  <span className="w-1.5 h-1.5 bg-black rounded-full mt-2.5 shrink-0" />
                  Communicate with you about services, partnerships, or inquiries.
                </li>
                <li className="flex gap-3">
                  <span className="w-1.5 h-1.5 bg-black rounded-full mt-2.5 shrink-0" />
                  Deliver and improve our marketing campaigns and website experience.
                </li>
                <li className="flex gap-3">
                  <span className="w-1.5 h-1.5 bg-black rounded-full mt-2.5 shrink-0" />
                  Customize content and ads.
                </li>
                <li className="flex gap-3">
                  <span className="w-1.5 h-1.5 bg-black rounded-full mt-2.5 shrink-0" />
                  Maintain compliance with legal and contractual obligations.
                </li>
              </ul>
            </section>

            {/* Section 3 */}
            <section className="border-t border-black/10 pt-8">
              <div className="flex items-baseline gap-4 mb-6">
                <span className="text-6xl font-serif italic text-black/10">03</span>
                <h2 className="text-2xl font-medium text-black">Sharing of Information</h2>
              </div>
              <p className="text-[#6B6B6B] leading-relaxed mb-4">
                We do not sell your data. We may share limited information with:
              </p>
              <ul className="space-y-3 text-[#6B6B6B] leading-relaxed mb-4">
                <li className="flex gap-3">
                  <span className="w-1.5 h-1.5 bg-black rounded-full mt-2.5 shrink-0" />
                  Trusted service providers (e.g., analytics, email delivery, or CRM systems).
                </li>
                <li className="flex gap-3">
                  <span className="w-1.5 h-1.5 bg-black rounded-full mt-2.5 shrink-0" />
                  Legal authorities, if required by law or to protect our rights.
                </li>
              </ul>
              <p className="text-[#6B6B6B] leading-relaxed">
                All partners are required to maintain strict confidentiality and security standards.
              </p>
            </section>

            {/* Section 4 */}
            <section className="border-t border-black/10 pt-8">
              <div className="flex items-baseline gap-4 mb-6">
                <span className="text-6xl font-serif italic text-black/10">04</span>
                <h2 className="text-2xl font-medium text-black">Cookies and Tracking</h2>
              </div>
              <p className="text-[#6B6B6B] leading-relaxed">
                Our site uses cookies and tracking tools to enhance performance, analyze trends, and personalize ads. You can disable cookies in your browser settings.
              </p>
            </section>

            {/* Section 5 */}
            <section className="border-t border-black/10 pt-8">
              <div className="flex items-baseline gap-4 mb-6">
                <span className="text-6xl font-serif italic text-black/10">05</span>
                <h2 className="text-2xl font-medium text-black">Data Security</h2>
              </div>
              <p className="text-[#6B6B6B] leading-relaxed">
                We implement appropriate technical and organizational measures to protect your information from unauthorized access, misuse, or loss.
              </p>
            </section>

            {/* Section 6 */}
            <section className="border-t border-black/10 pt-8">
              <div className="flex items-baseline gap-4 mb-6">
                <span className="text-6xl font-serif italic text-black/10">06</span>
                <h2 className="text-2xl font-medium text-black">Your Rights</h2>
              </div>
              <p className="text-[#6B6B6B] leading-relaxed mb-4">
                Depending on your location, you may have the right to:
              </p>
              <ul className="space-y-3 text-[#6B6B6B] leading-relaxed mb-6">
                <li className="flex gap-3">
                  <span className="w-1.5 h-1.5 bg-black rounded-full mt-2.5 shrink-0" />
                  Access, update, or delete your personal data.
                </li>
                <li className="flex gap-3">
                  <span className="w-1.5 h-1.5 bg-black rounded-full mt-2.5 shrink-0" />
                  Withdraw marketing consent at any time.
                </li>
                <li className="flex gap-3">
                  <span className="w-1.5 h-1.5 bg-black rounded-full mt-2.5 shrink-0" />
                  File a complaint with a data protection authority.
                </li>
              </ul>
              <p className="text-[#6B6B6B] leading-relaxed">
                To exercise these rights, contact us at{' '}
                <a href="mailto:privacy@ideom.agency" className="text-black font-medium hover:underline">privacy@ideom.agency</a>.
              </p>
            </section>

            {/* Section 7 */}
            <section className="border-t border-black/10 pt-8">
              <div className="flex items-baseline gap-4 mb-6">
                <span className="text-6xl font-serif italic text-black/10">07</span>
                <h2 className="text-2xl font-medium text-black">Retention Policy</h2>
              </div>
              <p className="text-[#6B6B6B] leading-relaxed">
                We retain data only for as long as necessary to fulfill the purposes stated above or as required by law.
              </p>
            </section>

            {/* Section 8 */}
            <section className="border-t border-black/10 pt-8">
              <div className="flex items-baseline gap-4 mb-6">
                <span className="text-6xl font-serif italic text-black/10">08</span>
                <h2 className="text-2xl font-medium text-black">Updates to This Policy</h2>
              </div>
              <p className="text-[#6B6B6B] leading-relaxed">
                We may update this Privacy Policy from time to time. The latest version will always be posted on this page.
              </p>
            </section>
          </div>
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="border-t border-black/10 pt-20 pb-10 px-6 bg-[#F5F5F5] backdrop-blur-sm">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
            <div className="lg:col-span-2">
              <Link to="/" className="text-3xl font-bold tracking-tighter block mb-6 text-black">
                ideom<span className="text-[#1F2F2A]">.</span>
              </Link>
              <p className="text-[#6B6B6B] max-w-sm mb-8">
                Empowering businesses with innovative digital marketing solutions. Let's create something amazing together.
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-6 text-black">Sitemap</h4>
              <ul className="space-y-4 text-[#6B6B6B]">
                <li><Link to="/#about" className="hover:text-black transition-colors">About us</Link></li>
                <li><Link to="/#work" className="hover:text-black transition-colors">Work</Link></li>
                <li><Link to="/#services" className="hover:text-black transition-colors">Services</Link></li>
                <li><Link to="/free-guide" className="hover:text-black transition-colors">Free Guide</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-6 text-black">Contact</h4>
              <ul className="space-y-4 text-[#6B6B6B]">
                <li>info@ideom.io</li>
                <li>+1 647-969-5294</li>
                <li>92 Main St, Erin, ON<br />N0B 1T0</li>
              </ul>
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-between pt-8 border-t border-black/10 text-sm text-[#6B6B6B]">
            <p>© 2025 Ideom Digital Marketing. All Rights Reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <Link to="/privacy-policy" className="hover:text-black transition-colors">Privacy Policy</Link>
              <Link to="/terms-of-service" className="hover:text-black transition-colors">Terms of Service</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
