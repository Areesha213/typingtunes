import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Keyboard, Clock, Trophy, GraduationCap, Volume2, Laptop, Smartphone, Accessibility } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">About Typingtunes</h1>
          <p className="text-xl text-muted-foreground">
            A modern typing practice application designed to help you improve your typing speed and accuracy
          </p>
        </div>

        <div className="space-y-12">
          {/* Introduction */}
          <section>
            <Card>
              <CardHeader>
                <CardTitle>Our Mission</CardTitle>
                <CardDescription>
                  Helping people become more efficient and productive through better typing skills
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="leading-relaxed">
                  Typingtunes was created with a simple goal: to provide a beautiful, engaging, and effective platform for people to improve their typing skills. In today's digital world, typing efficiently is more important than ever, whether you're a student, professional, or casual computer user.
                </p>
                <p className="mt-4 leading-relaxed">
                  Our application combines modern design principles with proven typing practice methodologies to create an experience that's not just educational, but enjoyable. We believe that the best way to learn is through consistent practice in an environment that provides immediate feedback and encouragement.
                </p>
              </CardContent>
            </Card>
          </section>

          {/* Features */}
          <section>
            <h2 className="text-2xl font-bold mb-6">Key Features</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center gap-4">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Keyboard className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle>Real-time Feedback</CardTitle>
                    <CardDescription>Immediate visual and audio cues</CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <p>
                    Get instant feedback on your typing with character-by-character highlighting. Correct characters turn green, while mistakes are highlighted in red. Audio cues provide additional feedback to enhance the learning experience.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center gap-4">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Clock className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle>Timed Challenges</CardTitle>
                    <CardDescription>Test your skills under pressure</CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <p>
                    Challenge yourself with timed typing tests ranging from 1 to 15 minutes. These exercises help you build speed while maintaining accuracy, simulating real-world typing scenarios.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center gap-4">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <GraduationCap className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle>Learning Mode</CardTitle>
                    <CardDescription>Progressive skill development</CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <p>
                    Our structured learning path takes you from basic finger positioning to advanced typing techniques. Each lesson builds upon previous skills, ensuring a solid foundation for typing proficiency.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center gap-4">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Trophy className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle>Custom Practice</CardTitle>
                    <CardDescription>Personalized typing exercises</CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <p>
                    Practice with your own text to focus on specific areas that need improvement. This feature is perfect for professionals who want to practice industry-specific terminology or students preparing for exams.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center gap-4">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Volume2 className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle>Background Music</CardTitle>
                    <CardDescription>Enhance focus and concentration</CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <p>
                    Choose from a selection of copyright-free background music designed to improve focus and create a pleasant typing environment. Adjust volume or mute according to your preference.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center gap-4">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Accessibility className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <CardTitle>Accessibility</CardTitle>
                    <CardDescription>Inclusive design for all users</CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <p>
                    Typingtunes is built with accessibility in mind, following WCAG guidelines to ensure that everyone can benefit from our typing practice tools, regardless of ability or assistive technology needs.
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* How to Use */}
          <section>
            <h2 className="text-2xl font-bold mb-6">How to Use Typingtunes</h2>
            <Card>
              <CardContent className="pt-6">
                <ol className="space-y-4">
                  <li className="flex gap-4">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm text-primary-foreground">
                      1
                    </span>
                    <div>
                      <h3 className="font-medium">Choose a Practice Mode</h3>
                      <p className="text-muted-foreground">
                        Select from Random Text, Timed Challenge, Custom Text, or Learning Mode based on your goals.
                      </p>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm text-primary-foreground">
                      2
                    </span>
                    <div>
                      <h3 className="font-medium">Start Typing</h3>
                      <p className="text-muted-foreground">
                        Begin typing the displayed text. The current character will be highlighted, and you'll receive immediate feedback on your accuracy.
                      </p>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm text-primary-foreground">
                      3
                    </span>
                    <div>
                      <h3 className="font-medium">Monitor Your Progress</h3>
                      <p className="text-muted-foreground">
                        Keep an eye on your WPM, accuracy percentage, and error count to track your improvement in real-time.
                      </p>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm text-primary-foreground">
                      4
                    </span>
                    <div>
                      <h3 className="font-medium">Complete the Exercise</h3>
                      <p className="text-muted-foreground">
                        Finish the typing test to see your final results, then try again to beat your previous score.
                      </p>
                    </div>
                  </li>
                  <li className="flex gap-4">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm text-primary-foreground">
                      5
                    </span>
                    <div>
                      <h3 className="font-medium">Practice Regularly</h3>
                      <p className="text-muted-foreground">
                        Consistent practice is key to improving typing skills. Even 10-15 minutes daily can lead to significant improvement over time.
                      </p>
                    </div>
                  </li>
                </ol>
              </CardContent>
            </Card>
          </section>
        </div>
      </div>
    </div>
  );
}