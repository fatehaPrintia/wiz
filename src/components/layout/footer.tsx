import Link from 'next/link';
import { Facebook, Twitter, Instagram, Linkedin, Youtube } from 'lucide-react'; // Added Youtube

export function Footer() {
  return (
    <footer className="bg-[#361354] text-primary-foreground py-12"> {/* Updated background color & Ensure base text is light */}
      <div className="container mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-sm"> {/* Applied text-sm to the grid container */}

        {/* Anghorag & Social Column (Moved to the left) */}
        <div>
           {/* Logo */}
           <Link href="/" className="flex items-center mb-4">
           <img src="/logo.png" alt="Logo" className="h-8 w-28 mr-2" />
              {/* Removed text span to only show logo */}
           </Link>

            <p className="mb-2">Phone: <a href="tel:13234774464" className="hover:text-primary-foreground/80">13234-774464</a></p>
           <p className="mb-4">Email: <a href="mailto:anghorag@support.gmail.com" className="hover:text-primary-foreground/80">anghorag@support.gmail.com</a></p>

          <h3 className="text-lg font-semibold mb-4 text-primary-foreground">Join our social links</h3> {/* Keep heading larger */}
           <div className="flex space-x-4">
             {/* Updated social links color */}
            <a href="#" aria-label="Facebook" className="text-primary-foreground/80 hover:text-primary-foreground">
               <Facebook className="h-5 w-5" /> {/* Reduced icon size */}
             </a>
            <a href="#" aria-label="Twitter" className="text-primary-foreground/80 hover:text-primary-foreground">
               <Twitter className="h-5 w-5" /> {/* Reduced icon size */}
             </a>
            <a href="#" aria-label="Instagram" className="text-primary-foreground/80 hover:text-primary-foreground">
               <Instagram className="h-5 w-5" /> {/* Reduced icon size */}
             </a>
            <a href="#" aria-label="LinkedIn" className="text-primary-foreground/80 hover:text-primary-foreground">
               <Linkedin className="h-5 w-5" /> {/* Reduced icon size */}
             </a>
             <a href="#" aria-label="YouTube" className="text-primary-foreground/80 hover:text-primary-foreground">
               <Youtube className="h-5 w-5" /> {/* Reduced icon size */}
             </a>
           </div>
         </div>

        {/* Categories Column */}
        <div>
          {/* Updated Category heading color */}
          <h3 className="text-lg font-semibold mb-4 text-[hsl(var(--cart-pink))]">Categories</h3> {/* Keep heading larger, changed color */}
          <ul className="space-y-2">
            <li><Link href="/?category=Makeup" className="hover:text-primary-foreground/80">Makeup</Link></li>
            <li><Link href="/?category=Skin%20Care" className="hover:text-primary-foreground/80">Skin Care</Link></li>
            <li><Link href="/?category=Bath%20and%20Body" className="hover:text-primary-foreground/80">Bath and Body</Link></li>
            <li><Link href="/?category=Hair%20Care" className="hover:text-primary-foreground/80">Hair Care</Link></li>
            <li><Link href="/?category=Personal%20Care" className="hover:text-primary-foreground/80">Personal Care</Link></li>
             <li><Link href="/?category=Sexual%20Wellness" className="hover:text-primary-foreground/80">Sexual Wellness</Link></li>
          </ul>
        </div>

        {/* Quick Links Column */}
        <div>
          {/* Updated Quick Links heading color */}
          <h3 className="text-lg font-semibold mb-4 text-[hsl(var(--cart-pink))]">Quick Links</h3> {/* Keep heading larger, changed color */}
          <ul className="space-y-2">
            <li><Link href="#" className="hover:text-primary-foreground/80">Offers</Link></li>
            <li><Link href="#" className="hover:text-primary-foreground/80">Seller Picks</Link></li>
            <li><Link href="#" className="hover:text-primary-foreground/80">Campaigns</Link></li>
            <li><Link href="/?category=Hair%20Care" className="hover:text-primary-foreground/80">Hair Care</Link></li> {/* Duplicate Hair Care? Consider removing/correcting */}
             <li><Link href="/contact" className="hover:text-primary-foreground/80">Contact Us</Link></li> {/* Added Contact Us */}
          </ul>
        </div>

        {/* Support Column */}
        <div>
           {/* Updated Support heading color */}
          <h3 className="text-lg font-semibold mb-4 text-[hsl(var(--cart-pink))]">Support</h3> {/* Keep heading larger, changed color */}
          <ul className="space-y-2">
            <li><Link href="/return-policy" className="hover:text-primary-foreground/80">Return Policy</Link></li>
            <li><Link href="/terms" className="hover:text-primary-foreground/80">Terms of Use</Link></li>
            <li><Link href="/privacy" className="hover:text-primary-foreground/80">Privacy Policy</Link></li>
            <li><Link href="/faq" className="hover:text-primary-foreground/80">FAQS</Link></li>
            <li><Link href="/shipping" className="hover:text-primary-foreground/80">Shipping & Delivery</Link></li>
          </ul>
        </div>

      </div>

      {/* Copyright Notice */}
      <div className="border-t border-border/20 mt-8 pt-6 text-center text-xs text-primary-foreground/70"> {/* Adjusted border color and font color */}
        <p>&copy; {new Date().getFullYear()} Anghorag. All rights reserved.</p> {/* Updated copyright name */}
      </div>
    </footer>
  );
}
