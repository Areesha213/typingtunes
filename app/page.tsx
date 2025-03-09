import Link from "next/link";
import { Button } from "@/components/ui/button";
import TypingTest from "@/components/typing-test";
import { Keyboard, Trophy, GraduationCap, Clock } from "lucide-react";

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="py-12 md:py-20 text-center">
        <div className="max-w-3xl mx-auto space-y-6">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
            Master Your <span className="text-primary">Typing Skills</span>
          </h1>
          <p className="text-xl text-muted-foreground">
            Improve your speed and accuracy with our modern, interactive typing practice platform
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-4">
            <Button size="lg" asChild>
              <Link href="#quick-start">Quick Start</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/lessons">View Lessons</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 md:py-20 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold">Practice Modes</h2>
          <p className="text-muted-foreground mt-2">Choose how you want to improve your typing skills</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-card rounded-lg p-6 shadow-sm border flex flex-col items-center text-center">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <Keyboard className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-medium mb-2">Quick Start</h3>
            <p className="text-muted-foreground mb-4">Jump right in with random text for immediate practice</p>
            <Button variant="ghost" className="mt-auto" asChild>
              <Link href="#quick-start">Try Now</Link>
            </Button>
          </div>

          <div className="bg-card rounded-lg p-6 shadow-sm border flex flex-col items-center text-center">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <Clock className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-medium mb-2">Timed Challenges</h3>
            <p className="text-muted-foreground mb-4">Test your skills with 1, 2, 5, or 15-minute exercises</p>
            <Button variant="ghost" className="mt-auto" asChild>
              <Link href="/challenges">View Challenges</Link>
            </Button>
          </div>

          <div className="bg-card rounded-lg p-6 shadow-sm border flex flex-col items-center text-center">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
              <Trophy className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-medium mb-2">Custom Text</h3>
            <p className="text-muted-foreground mb-4">Practice with your own content for personalized training</p>
            <Button variant="ghost" className="mt-auto" asChild>
              <Link href="/custom">Customize</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Quick Start Section */}
      <section id="quick-start" className="py-12 md:py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold">Quick Start</h2>
          <p className="text-muted-foreground mt-2">Start typing immediately with this sample text</p>
        </div>

        <div className="max-w-4xl mx-auto">
          <TypingTest />
        </div>
      </section>
    </div>
  );
}