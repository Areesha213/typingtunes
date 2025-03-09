"use client";

import { useToast } from "@/components/ui/use-toast";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MessageSquare, Mail, Phone, MapPin } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Contact Us</h1>
          <p className="text-xl text-muted-foreground">
            Have questions or feedback? We'd love to hear from you!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Contact Information */}
          <Card>
            <CardHeader className="flex flex-row items-center gap-4 pb-2">
              <Mail className="h-5 w-5 text-primary" />
              <CardTitle className="text-lg">Email</CardTitle>
            </CardHeader>
            <CardContent>
              <a
                href="mailto:aqrsh213@gmail.com"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                contact@Typingtunes.com
              </a>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center gap-4 pb-2">
              <MessageSquare className="h-5 w-5 text-primary" />
              <CardTitle className="text-lg">Social Media</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex flex-wrap gap-4">
                  <a
                    href="https://www.instagram.com/areesha___213/"
                    className="flex items-center text-muted-foreground hover:text-primary transition-colors"
                  >
                    <MessageSquare className="h-4 w-4 mr-2" /> Instagram
                  </a>
                  <a
                    href="https://www.linkedin.com/in/areesha-qureshi-106917268/"
                    className="flex items-center text-muted-foreground hover:text-primary transition-colors"
                  >
                    <MessageSquare className="h-4 w-4 mr-2" /> LinkedIn
                  </a>
                  <a
                    href="https://github.com/Areesha213"
                    className="flex items-center text-muted-foreground hover:text-primary transition-colors"
                  >
                    <MessageSquare className="h-4 w-4 mr-2" /> GitHub
                  </a>
                  <a
                    href="https://www.youtube.com/channel/UCjI8000OflT_eVF3CgI9k6g"
                    className="flex items-center text-muted-foreground hover:text-primary transition-colors"
                  >
                    <MessageSquare className="h-4 w-4 mr-2" /> YouTube
                  </a>
                  <a
                    href="https://www.pinterest.com/Areesha_Tunes/"
                    className="flex items-center text-muted-foreground hover:text-primary transition-colors"
                  >
                    <MessageSquare className="h-4 w-4 mr-2" /> Pinterest
                  </a>
                  <a
                    href="https://www.facebook.com/profile.php?id=100087150199054"
                    className="flex items-center text-muted-foreground hover:text-primary transition-colors"
                  >
                    <MessageSquare className="h-4 w-4 mr-2" /> Facebook
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
