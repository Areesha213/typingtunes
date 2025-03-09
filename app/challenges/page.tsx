"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Clock, Trophy, Zap, BarChart, Brain, Keyboard } from "lucide-react";
import ChallengeTypingTest from "@/components/challenge-typing-test";

// Challenge data
const challenges = {
  beginner: [
    {
      id: "b1",
      title: "Home Row Mastery",
      description: "Focus on the home row keys (ASDF JKL;) to build muscle memory",
      duration: "1 minute",
      difficulty: "Easy",
      icon: <Keyboard className="h-5 w-5" />,
    },
    {
      id: "b2",
      title: "Common Words",
      description: "Practice typing the most frequently used words in English",
      duration: "2 minutes",
      difficulty: "Easy",
      icon: <Zap className="h-5 w-5" />,
    },
    {
      id: "b3",
      title: "Simple Sentences",
      description: "Type complete but simple sentences to build rhythm",
      duration: "5 minutes",
      difficulty: "Easy",
      icon: <Clock className="h-5 w-5" />,
    },
  ],
  intermediate: [
    {
      id: "i1",
      title: "Speed Builder",
      description: "Push your WPM with moderately complex text passages",
      duration: "2 minutes",
      difficulty: "Medium",
      icon: <BarChart className="h-5 w-5" />,
    },
    {
      id: "i2",
      title: "Accuracy Focus",
      description: "Concentrate on reducing errors while maintaining speed",
      duration: "5 minutes",
      difficulty: "Medium",
      icon: <Trophy className="h-5 w-5" />,
    },
    {
      id: "i3",
      title: "Numbers & Symbols",
      description: "Improve your ability to type non-alphabetic characters",
      duration: "3 minutes",
      difficulty: "Medium",
      icon: <Keyboard className="h-5 w-5" />,
    },
  ],
  advanced: [
    { 
      id: "a1",
      title: "Code Snippets",
      description: "Practice typing programming code with precise syntax",
      duration: "5 minutes",
      difficulty: "Hard",
      icon: <Brain className="h-5 w-5" />,
    },
    {
      id: "a2",
      title: "Speed Marathon",
      description: "Extended typing session to build stamina and consistency",
      duration: "15 minutes",
      difficulty: "Hard",
      icon: <Clock className="h-5 w-5" />,
    },
    {
      id: "a3",
      title: "Technical Writing",
      description: "Complex passages with technical terminology and punctuation",
      duration: "10 minutes",
      difficulty: "Hard",
      icon: <BarChart className="h-5 w-5" />,
    },
  ],
};

export default function ChallengesPage() {
  const [selectedChallenge, setSelectedChallenge] = useState<string | null>(null);

  const handleStartChallenge = (challengeId: string) => {
    setSelectedChallenge(challengeId);
  };

  const handleBackToList = () => {
    setSelectedChallenge(null);
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Typing Challenges</h1>
          <p className="text-xl text-muted-foreground">
            Test your skills with our curated typing challenges
          </p>
        </div>

        {selectedChallenge ? (
          <div className="space-y-6">
            <Button variant="outline" onClick={handleBackToList}>
              ← Back to Challenges
            </Button>
            <Card>
              <CardHeader>
                <CardTitle>
                  {Object.values(challenges).flat().find(c => c.id === selectedChallenge)?.title}
                </CardTitle>
                <CardDescription>
                  {Object.values(challenges).flat().find(c => c.id === selectedChallenge)?.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ChallengeTypingTest 
                  challengeId={selectedChallenge} 
                  onComplete={() => {}} 
                />
              </CardContent>
            </Card>
          </div>
        ) : (
          <Tabs defaultValue="beginner">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="beginner">Beginner</TabsTrigger>
              <TabsTrigger value="intermediate">Intermediate</TabsTrigger>
              <TabsTrigger value="advanced">Advanced</TabsTrigger>
            </TabsList>
            
            <TabsContent value="beginner" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {challenges.beginner.map((challenge) => (
                  <Card key={challenge.id} className="overflow-hidden">
                    <CardHeader className="pb-3">
                      <div className="flex justify-between items-start">
                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                          {challenge.icon}
                        </div>
                        <Badge variant="outline">{challenge.duration}</Badge>
                      </div>
                      <CardTitle>{challenge.title}</CardTitle>
                      <CardDescription>{challenge.description}</CardDescription>
                    </CardHeader>
                    <CardFooter className="pt-3">
                      <Button 
                        className="w-full" 
                        onClick={() => handleStartChallenge(challenge.id)}
                      >
                        Start Challenge
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="intermediate" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {challenges.intermediate.map((challenge) => (
                  <Card key={challenge.id} className="overflow-hidden">
                    <CardHeader className="pb-3">
                      <div className="flex justify-between items-start">
                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                          {challenge.icon}
                        </div>
                        <Badge variant="outline">{challenge.duration}</Badge>
                      </div>
                      <CardTitle>{challenge.title}</CardTitle>
                      <CardDescription>{challenge.description}</CardDescription>
                    </CardHeader>
                    <CardFooter className="pt-3">
                      <Button 
                        className="w-full" 
                        onClick={() => handleStartChallenge(challenge.id)}
                      >
                        Start Challenge
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="advanced" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {challenges.advanced.map((challenge) => (
                  <Card key={challenge.id} className="overflow-hidden">
                    <CardHeader className="pb-3">
                      <div className="flex justify-between items-start">
                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                          {challenge.icon}
                        </div>
                        <Badge variant="outline">{challenge.duration}</Badge>
                      </div>
                      <CardTitle>{challenge.title}</CardTitle>
                      <CardDescription>{challenge.description}</CardDescription>
                    </CardHeader>
                    <CardFooter className="pt-3">
                      <Button 
                        className="w-full" 
                        onClick={() => handleStartChallenge(challenge.id)}
                      >
                        Start Challenge
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