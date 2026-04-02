import { motion } from 'motion/react';
import { X, Menu } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function TermsOfService() {
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
              Terms of <span className="font-serif italic text-[#6B6B6B]">Service</span>
            </h1>
            <p className="text-[#6B6B6B] text-sm font-medium">Last updated: March 31, 2026</p>
          </div>

          {/* Intro */}
          <div className="mb-12">
            <p className="text-lg text-[#6B6B6B] leading-relaxed">
              Welcome to IDEOM. By accessing or using our website and services, you agree to these Terms of Service ("Terms"). Please read them carefully.
            </p>
          </div>

          {/* Sections */}
          <div className="space-y-12">
            {/* Section 1 */}
            <section className="border-t border-black/10 pt-8">
              <div className="flex items-baseline gap-4 mb-6">
                <span className="text-6xl font-serif italic text-black/10">01</span>
                <h2 className="text-2xl font-medium text-black">Acceptance of Terms</h2>
              </div>
              <p className="text-[#6B6B6B] leading-relaxed">
                By engaging with IDEOM — whether through our site, email correspondence, or any service engagement — you confirm your understanding and acceptance of these Terms.
              </p>
            </section>

            {/* Section 2 */}
            <section className="border-t border-black/10 pt-8">
              <div className="flex items-baseline gap-4 mb-6">
                <span className="text-6xl font-serif italic text-black/10">02</span>
                <h2 className="text-2xl font-medium text-black">Description of Services</h2>
              </div>
              <p className="text-[#6B6B6B] leading-relaxed">
                IDEOM provides marketing, branding, and lead generation services. Specific services, timelines, and deliverables are outlined in individual client agreements or project scopes.
              </p>
            </section>

            {/* Section 3 */}
            <section className="border-t border-black/10 pt-8">
              <div className="flex items-baseline gap-4 mb-6">
                <span className="text-6xl font-serif italic text-black/10">03</span>
                <h2 className="text-2xl font-medium text-black">Use of Website</h2>
              </div>
              <p className="text-[#6B6B6B] leading-relaxed">
                You agree not to misuse our website or engage in any activity that could harm its operation, security, or reputation. Unauthorized scraping, hacking, or reverse engineering is prohibited.
              </p>
            </section>

            {/* Section 4 */}
            <section className="border-t border-black/10 pt-8">
              <div className="flex items-baseline gap-4 mb-6">
                <span className="text-6xl font-serif italic text-black/10">04</span>
                <h2 className="text-2xl font-medium text-black">Intellectual Property</h2>
              </div>
              <p className="text-[#6B6B6B] leading-relaxed">
                All materials on this site (logos, content, images, frameworks, etc.) are owned by IDEOM or licensed to us. You may not reproduce, distribute, or use our content without express permission.
              </p>
            </section>

            {/* Section 5 */}
            <section className="border-t border-black/10 pt-8">
              <div className="flex items-baseline gap-4 mb-6">
                <span className="text-6xl font-serif italic text-black/10">05</span>
                <h2 className="text-2xl font-medium text-black">Client Agreements</h2>
              </div>
              <p className="text-[#6B6B6B] leading-relaxed">
                When engaging IDEOM, clients sign separate agreements detailing deliverables, payment terms, and intellectual property rights for produced work. In case of conflict, the client agreement overrides these general Terms.
              </p>
            </section>

            {/* Section 6 */}
            <section className="border-t border-black/10 pt-8">
              <div className="flex items-baseline gap-4 mb-6">
                <span className="text-6xl font-serif italic text-black/10">06</span>
                <h2 className="text-2xl font-medium text-black">Limitation of Liability</h2>
              </div>
              <p className="text-[#6B6B6B] leading-relaxed">
                IDEOM is not liable for indirect, incidental, or consequential damages arising from the use of our website or services. We make no guarantees that marketing results will meet specific performance metrics unless contractually stated.
              </p>
            </section>

            {/* Section 7 */}
            <section className="border-t border-black/10 pt-8">
              <div className="flex items-baseline gap-4 mb-6">
                <span className="text-6xl font-serif italic text-black/10">07</span>
                <h2 className="text-2xl font-medium text-black">Payment & Refunds</h2>
              </div>
              <p className="text-[#6B6B6B] leading-relaxed">
                Unless otherwise agreed, all payments are due per invoice terms. Refunds are issued only in cases of non-performance explicitly outlined in a signed agreement.
              </p>
            </section>

            {/* Section 8 */}
            <section className="border-t border-black/10 pt-8">
              <div className="flex items-baseline gap-4 mb-6">
                <span className="text-6xl font-serif italic text-black/10">08</span>
                <h2 className="text-2xl font-medium text-black">Termination</h2>
              </div>
              <p className="text-[#6B6B6B] leading-relaxed">
                We reserve the right to suspend or terminate services or site access at any time if a user violates these Terms or behaves unlawfully.
              </p>
            </section>

            {/* Section 9 */}
            <section className="border-t border-black/10 pt-8">
              <div className="flex items-baseline gap-4 mb-6">
                <span className="text-6xl font-serif italic text-black/10">09</span>
                <h2 className="text-2xl font-medium text-black">Governing Law</h2>
              </div>
              <p className="text-[#6B6B6B] leading-relaxed">
                These Terms are governed by the laws of Ontario, Canada. Any disputes will be handled in Ontario courts.
              </p>
            </section>

            {/* Section 10 */}
            <section className="border-t border-black/10 pt-8">
              <div className="flex items-baseline gap-4 mb-6">
                <span className="text-6xl font-serif italic text-black/10">10</span>
                <h2 className="text-2xl font-medium text-black">Contact</h2>
              </div>
              <p className="text-[#6B6B6B] leading-relaxed">
                For any questions regarding these Terms, contact{' '}
                <a href="mailto:legal@ideom.agency" className="text-black font-medium hover:underline">legal@ideom.agency</a>.
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
