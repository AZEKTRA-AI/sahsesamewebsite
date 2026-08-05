import Link from 'next/link'
import Image from 'next/image'

export default function Footer() {
  return (
    <footer className="bg-sah-charcoal text-white py-16">
      <div className="container-wide">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Image
                src="https://res.cloudinary.com/pjhvvbam/image/upload/v1785958262/sah-marketing/sahlogo.png"
                alt="SAH Company"
                width={40}
                height={40}
                className="h-10 w-auto"
              />
            </div>
            <h3 className="font-bold text-lg mb-3">Sain Abdul Hakim & Company</h3>
            <p className="text-gray-300 text-sm mb-4">
              Pakistan-based supplier of sesame seeds, pulses and rice, backed by family trading roots dating to 1992.
            </p>
            <div className="flex gap-4">
              <a
                href="https://wa.me/923000959524"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-sah-gold transition-colors"
                aria-label="WhatsApp"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004a9.87 9.87 0 00-5.031 1.378c-3.055 2.364-3.905 6.75-1.905 10.23.846 1.668 2.355 2.913 4.568 3.557.987.243 2.468.271 3.617.045l.3-.047c1.013-.188 1.969-.644 2.757-1.289.832-.639 1.432-1.613 1.846-2.613.414-1 .645-2.094.645-3.231 0-2.59-1.039-5.02-2.614-6.76-1.575-1.74-3.716-2.747-5.925-2.747zm10.906-9.142c-3.857-3.6-9.648-4.211-14.143-1.432C.904.757-1.25 4.469.825 8.31c1.054 1.93 2.94 3.398 5.228 4.118 2.287.72 4.882.545 6.931-.52 1.339-.688 2.440-1.553 3.268-2.66 1.27-1.7 1.708-3.887 1.241-5.993-.467-2.106-1.609-3.976-3.27-5.195z" />
                </svg>
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-sah-gold transition-colors"
                aria-label="LinkedIn"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Products */}
          <div>
            <h4 className="font-bold text-lg mb-4">Products</h4>
            <ul className="space-y-3 text-gray-300">
              <li>
                <Link href="/products/sesame" className="hover:text-sah-gold transition-colors">
                  Sesame Seeds
                </Link>
              </li>
              <li>
                <Link href="/products/pulses" className="hover:text-sah-gold transition-colors">
                  Pulses
                </Link>
              </li>
              <li>
                <Link href="/products/rice" className="hover:text-sah-gold transition-colors">
                  Rice
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-3 text-gray-300">
              <li>
                <Link href="/about" className="hover:text-sah-gold transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/quality-process" className="hover:text-sah-gold transition-colors">
                  Quality & Process
                </Link>
              </li>
              <li>
                <Link href="/packaging-logistics" className="hover:text-sah-gold transition-colors">
                  Packaging & Logistics
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-sah-gold transition-colors">
                  Request a Quote
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-bold text-lg mb-4">Contact</h4>
            <div className="space-y-4 text-gray-300 text-sm">
              <div>
                <p className="text-sah-gold font-medium mb-1">Address</p>
                <p>Office No. 170, New Grain Market,<br />Dijkot Road, Faisalabad, Pakistan</p>
              </div>
              <div>
                <p className="text-sah-gold font-medium mb-1">Phone</p>
                <p>+92 300 0959524<br />+92 300 8663396</p>
              </div>
              <div>
                <p className="text-sah-gold font-medium mb-1">Email</p>
                <p>info@sahcompany.com</p>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              &copy; {new Date().getFullYear()} Sain Abdul Hakim and Company. All rights reserved.
            </p>
            <div className="flex gap-6 text-gray-400 text-sm">
              <Link href="/privacy-policy" className="hover:text-sah-gold transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms-conditions" className="hover:text-sah-gold transition-colors">
                Terms & Conditions
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
