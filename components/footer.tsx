import Link from "next/link";
import { Keyboard, Github, Instagram, Youtube, Facebook } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Keyboard className="h-5 w-5" />
              <span className="font-bold text-lg">Typingtunes</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Improve your typing speed and accuracy with our modern typing practice application.
            </p>
          </div>
          
          <div>
            <h3 className="font-medium mb-3">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/challenges" className="text-muted-foreground hover:text-primary transition-colors">
                  Challenges
                </Link>
              </li>
              <li>
                <Link href="/lessons" className="text-muted-foreground hover:text-primary transition-colors">
                  Lessons
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium mb-3">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-primary transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-muted-foreground hover:text-primary transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-muted-foreground hover:text-primary transition-colors">
                  terms of service
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium mb-3">Connect</h3>
            <div className="flex space-x-3">
            <a
                href="https://github.com/Areesha213"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground/60 hover:text-foreground"
              >
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </a>
              <a
                href="https://www.instagram.com/areesha___213/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground/60 hover:text-foreground"
              >
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instragram</span>
              </a>
              <a
                href="https://www.facebook.com/profile.php?id=100087150199054"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground/60 hover:text-foreground"
              >
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </a>
              <a
                href="https://www.youtube.com/channel/UCjI8000OflT_eVF3CgI9k6g"
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground/60 hover:text-foreground"
              >
                <Youtube className="h-5 w-5" />
                <span className="sr-only">Youtube</span>
              </a>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Typingtunes. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;