"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { GraduationCap, Keyboard, Hand, Layers, Award, CheckCircle } from "lucide-react";
import LessonTypingTest from "@/components/lesson-typing-test";

// Lesson data
const lessons = {
  fundamentals: [
    {
      id: "f1",
      title: "Proper Posture & Hand Position",
      description: "Learn the correct way to sit and position your hands for efficient typing",
      duration: "5 minutes",
      progress: 0,
      icon: <Hand className="h-5 w-5" />,
      steps: [
        "Sit up straight with feet flat on the floor",
        "Keep wrists elevated and relaxed",
        "Position fingers on the home row (ASDF JKL;)",
        "Use thumbs for the space bar",
        "Practice basic finger movements"
      ]
    },
    {
      id: "f2",
      title: "Home Row Mastery",
      description: "Build muscle memory for the home row keys (ASDF JKL;)",
      duration: "10 minutes",
      progress: 0,
      icon: <Keyboard className="h-5 w-5" />,
      steps: [
        "Learn finger placement for home row keys",
        "Practice simple home row combinations",
        "Type without looking at the keyboard",
        "Focus on accuracy over speed",
        "Complete home row exercises"
      ]
    },
    {
      id: "f3",
      title: "Top Row Introduction",
      description: "Expand your reach to the top row keys (QWERTY UIOP)",
      duration: "15 minutes",
      progress: 0,
      icon: <Layers className="h-5 w-5" />,
      steps: [
        "Learn finger placement for top row keys",
        "Practice reaching from home row to top row",
        "Type simple words using home and top rows",
        "Focus on smooth transitions between rows",
        "Complete top row exercises"
      ]
    },
  ],
  intermediate: [
    {
      id: "i1",
      title: "Bottom Row Practice",
      description: "Master the bottom row keys (ZXCVBNM)",
      duration: "15 minutes",
      progress: 0,
      icon: <Layers className="h-5 w-5" />,
      steps: [
        "Learn finger placement for bottom row keys",
        "Practice reaching from home row to bottom row",
        "Type words combining all three rows",
        "Focus on maintaining proper finger positioning",
        "Complete bottom row exercises"
      ]
    },
    {
      id: "i2",
      title: "Numbers & Symbols",
      description: "Learn to type numbers and common symbols efficiently",
      duration: "20 minutes",
      progress: 0,
      icon: <Keyboard className="h-5 w-5" />,
      steps: [
        "Learn finger placement for number row",
        "Practice typing numbers in sequence",
        "Learn common symbols and their finger positions",
        "Practice combining letters, numbers, and symbols",
        "Complete number and symbol exercises"
      ]
    },
    {
      id: "i3",
      title: "Building Speed",
      description: "Techniques to increase your typing speed while maintaining accuracy",
      duration: "25 minutes",
      progress: 0,
      icon: <Award className="h-5 w-5" />,
      steps: [
        "Focus on rhythm and flow while typing",
        "Practice common word combinations",
        "Learn to look ahead while typing",
        "Gradually increase speed with timed exercises",
        "Complete speed-building drills"
      ]
    },
  ],
  advanced: [
    {
      id: "a1",
      title: "Advanced Accuracy",
      description: "Refine your typing to minimize errors even at high speeds",
      duration: "30 minutes",
      progress: 0,
      icon: <CheckCircle className="h-5 w-5" />,
      steps: [
        "Identify and address common error patterns",
        "Practice difficult key combinations",
        "Learn techniques for maintaining accuracy at speed",
        "Focus on problem areas with targeted exercises",
        "Complete accuracy-focused challenges"
      ]
    },
    {
      id: "a2",
      title: "Specialized Typing",
      description: "Master typing for specific contexts like coding or data entry",
      duration: "35 minutes",
      progress: 0,
      icon: <Keyboard className="h-5 w-5" />,
      steps: [
        "Learn programming-specific symbols and patterns",
        "Practice typing code snippets",
        "Master number pad usage for data entry",
        "Learn keyboard shortcuts for efficiency",
        "Complete specialized typing exercises"
      ]
    },
    {
      id: "a3",
      title: "Touch Typing Mastery",
      description: "Achieve professional-level typing with advanced techniques",
      duration: "40 minutes",
      progress: 0,
      icon: <GraduationCap className="h-5 w-5" />,
      steps: [
        "Refine technique for maximum efficiency",
        "Practice with complex, varied text",
        "Build typing stamina with longer exercises",
        "Learn to type without conscious thought",
        "Complete mastery-level challenges"
      ]
    },
  ],
};

export default function LessonsPage() {
  const [selectedLesson, setSelectedLesson] = useState<string | null>(null);
  const [activeStep, setActiveStep] = useState(0);
  const [lessonProgress, setLessonProgress] = useState<Record<string, number>>({});

  const handleStartLesson = (lessonId: string) => {
    setSelectedLesson(lessonId);
    setActiveStep(0);
  };

  const handleBackToList = () => {
    setSelectedLesson(null);
  };

  const handleNextStep = () => {
    const currentLesson = Object.values(lessons).flat().find(l => l.id === selectedLesson);
    if (currentLesson && activeStep < currentLesson.steps.length - 1) {
      setActiveStep(activeStep + 1);
    }
  };

  const handlePreviousStep = () => {
    if (activeStep > 0) {
      setActiveStep(activeStep - 1);
    }
  };

  const handleLessonComplete = (stats: { wpm: number; accuracy: number; errors: number }) => {
    if (selectedLesson) {
      // Update progress for this lesson
      setLessonProgress(prev => ({
        ...prev,
        [selectedLesson]: Math.min(100, (prev[selectedLesson] || 0) + 20)
      }));
    }
  };

  const currentLesson = selectedLesson 
    ? Object.values(lessons).flat().find(l => l.id === selectedLesson) 
    : null;

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Typing Lessons</h1>
          <p className="text-xl text-muted-foreground">
            Structured lessons to build your typing skills from the ground up
          </p>
        </div>

        {selectedLesson && currentLesson ? (
          <div className="space-y-6">
            <Button variant="outline" onClick={handleBackToList}>
              ← Back to Lessons
            </Button>
            
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      {currentLesson.icon}
                    </div>
                    <div>
                      <CardTitle>{currentLesson.title}</CardTitle>
                      <CardDescription>{currentLesson.description}</CardDescription>
                    </div>
                  </div>
                  <Badge variant="outline">{currentLesson.duration}</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Progress</span>
                    <span>Step {activeStep + 1} of {currentLesson.steps.length}</span>
                  </div>
                  <Progress value={((activeStep + 1) / currentLesson.steps.length) * 100} />
                </div>
                
                <div className="bg-muted/50 p-6 rounded-lg">
                  <h3 className="text-lg font-medium mb-4">Step {activeStep + 1}: {currentLesson.steps[activeStep]}</h3>
                  
                  <div className="space-y-4">
                    <p className="text-muted-foreground">
                      Practice this step with the exercise below:
                    </p>
                    <LessonTypingTest 
                      lessonId={selectedLesson}
                      stepIndex={activeStep}
                      onComplete={handleLessonComplete}
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button 
                  variant="outline" 
                  onClick={handlePreviousStep}
                  disabled={activeStep === 0}
                >
                  Previous Step
                </Button>
                <Button 
                  onClick={handleNextStep}
                  disabled={activeStep === currentLesson.steps.length - 1}
                >
                  Next Step
                </Button>
              </CardFooter>
            </Card>
          </div>
        ) : (
          <Tabs defaultValue="fundamentals">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="fundamentals">Fundamentals</TabsTrigger>
              <TabsTrigger value="intermediate">Intermediate</TabsTrigger>
              <TabsTrigger value="advanced">Advanced</TabsTrigger>
            </TabsList>
            
            <TabsContent value="fundamentals" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {lessons.fundamentals.map((lesson) => (
                  <Card key={lesson.id} className="overflow-hidden">
                    <CardHeader className="pb-3">
                      <div className="flex justify-between items-start">
                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                          {lesson.icon}
                        </div>
                        <Badge variant="outline">{lesson.duration}</Badge>
                      </div>
                      <CardTitle>{lesson.title}</CardTitle>
                      <CardDescription>{lesson.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="pb-3">
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Progress</span>
                          <span>{lessonProgress[lesson.id] || 0}%</span>
                        </div>
                        <Progress value={lessonProgress[lesson.id] || 0} />
                      </div>
                      <Accordion type="single" collapsible className="w-full mt-4">
                        <AccordionItem value="steps">
                          <AccordionTrigger>Lesson Steps</AccordionTrigger>
                          <AccordionContent>
                            <ol className="space-y-2 pl-5 list-decimal">
                              {lesson.steps.map((step, index) => (
                                <li key={index}>{step}</li>
                              ))}
                            </ol>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    </CardContent>
                    <CardFooter>
                      <Button 
                        className="w-full" 
                        onClick={() => handleStartLesson(lesson.id)}
                      >
                        Start Lesson
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="intermediate" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {lessons.intermediate.map((lesson) => (
                  <Card key={lesson.id} className="overflow-hidden">
                    <CardHeader className="pb-3">
                      <div className="flex justify-between items-start">
                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                          {lesson.icon}
                        </div>
                        <Badge variant="outline">{lesson.duration}</Badge>
                      </div>
                      <CardTitle>{lesson.title}</CardTitle>
                      <CardDescription>{lesson.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="pb-3">
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Progress</span>
                          <span>{lessonProgress[lesson.id] || 0}%</span>
                        </div>
                        <Progress value={lessonProgress[lesson.id] || 0} />
                      </div>
                      <Accordion type="single" collapsible className="w-full mt-4">
                        <AccordionItem value="steps">
                          <AccordionTrigger>Lesson Steps</AccordionTrigger>
                          <AccordionContent>
                            <ol className="space-y-2 pl-5 list-decimal">
                              {lesson.steps.map((step, index) => (
                                <li key={index}>{step}</li>
                              ))}
                            </ol>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    </CardContent>
                    <CardFooter>
                      <Button 
                        className="w-full" 
                        onClick={() => handleStartLesson(lesson.id)}
                      >
                        Start Lesson
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="advanced" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {lessons.advanced.map((lesson) => (
                  <Card key={lesson.id} className="overflow-hidden">
                    <CardHeader className="pb-3">
                      <div className="flex justify-between items-start">
                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                          {lesson.icon}
                        </div>
                        <Badge variant="outline">{lesson.duration}</Badge>
                      </div>
                      <CardTitle>{lesson.title}</CardTitle>
                      <CardDescription>{lesson.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="pb-3">
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Progress</span>
                          <span>{lessonProgress[lesson.id] || 0}%</span>
                        </div>
                        <Progress value={lessonProgress[lesson.id] || 0} />
                      </div>
                      <Accordion type="single" collapsible className="w-full mt-4">
                        <AccordionItem value="steps">
                          <AccordionTrigger>Lesson Steps</AccordionTrigger>
                          <AccordionContent>
                            <ol className="space-y-2 pl-5 list-decimal">
                              {lesson.steps.map((step, index) => (
                                <li key={index}>{step}</li>
                              ))}
                            </ol>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    </CardContent>
                    <CardFooter>
                      <Button 
                        className="w-full" 
                        onClick={() => handleStartLesson(lesson.id)}
                      >
                        Start Lesson
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        )}
      </div>
    </div>
  );
}