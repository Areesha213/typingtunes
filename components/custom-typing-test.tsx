"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Volume2, VolumeX, Play, Pause, Save, Trophy, Star, AlertCircle, Keyboard } from "lucide-react";
import { cn } from "@/lib/utils";

// Music tracks
const musicTracks = [
  {
    title: "Ambient Flow",
    src: "https://files.freemusicarchive.org/storage-freemusicarchive-org/music/no_curator/Kevin_MacLeod/Impact/Kevin_MacLeod_-_Cipher.mp3"
  },
  {
    title: "Focus Beat",
    src: "https://files.freemusicarchive.org/storage-freemusicarchive-org/music/ccCommunity/Kai_Engel/Satin/Kai_Engel_-_04_-_Sentinel.mp3"
  },
  {
    title: "Calm Typing",
    src: "https://files.freemusicarchive.org/storage-freemusicarchive-org/music/ccCommunity/Chad_Crouch/Arps/Chad_Crouch_-_Algorithms.mp3"
  }
];

// Sound effects
const keyPressSound = "/key-press.mp3";
const errorSound = "/error.mp3";
const completionSound = "/completion.mp3";

interface CustomTypingTestProps {
  initialText?: string;
  onSave?: (title: string, content: string) => void;
  onComplete?: (stats: { wpm: number; accuracy: number; errors: number }) => void;
}

const CustomTypingTest = ({ initialText = "", onSave, onComplete }: CustomTypingTestProps) => {
  const [text, setText] = useState(initialText);
  const [textTitle, setTextTitle] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [errors, setErrors] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [wpm, setWpm] = useState(0);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [isCompleted, setIsCompleted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(50);
  const [isMuted, setIsMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [isEditing, setIsEditing] = useState(!initialText);
  const [showResults, setShowResults] = useState(false);
  const [suggestion, setSuggestion] = useState("");
  const [grade, setGrade] = useState<"excellent" | "good" | "average" | "needsPractice">("average");

  const textContainerRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const keyPressAudioRef = useRef<HTMLAudioElement | null>(null);
  const errorAudioRef = useRef<HTMLAudioElement | null>(null);
  const completionAudioRef = useRef<HTMLAudioElement | null>(null);

  // Focus management
  useEffect(() => {
    if (!isEditing && textContainerRef.current) {
      textContainerRef.current.focus();
    }
  }, [isEditing]);

  // Handle music player
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
      audioRef.current.muted = isMuted;
      
      if (isPlaying) {
        audioRef.current.play().catch(() => {
          console.log("Audio play failed, using silent mode");
        });
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, volume, isMuted, currentTrack]);

  // Calculate WPM in real-time
  useEffect(() => {
    if (startTime && !isCompleted) {
      const interval = setInterval(() => {
        const currentTime = Date.now();
        const elapsedMinutes = (currentTime - startTime) / 60000;
        if (elapsedMinutes > 0) {
          const words = currentIndex / 5; // Standard: 5 characters = 1 word
          const currentWpm = Math.round(words / elapsedMinutes);
          setWpm(currentWpm);
        }
      }, 500);
      
      return () => clearInterval(interval);
    }
  }, [startTime, currentIndex, isCompleted]);

  const getPerformanceGrade = (wpm: number, accuracy: number) => {
    if (wpm >= 60 && accuracy >= 95) return "excellent";
    if (wpm >= 40 && accuracy >= 90) return "good";
    if (wpm >= 30 && accuracy >= 85) return "average";
    return "needsPractice";
  };

  const getSuggestion = (wpm: number, accuracy: number, errors: number) => {
    if (accuracy < 90) {
      return "Focus on accuracy before speed. Take your time and make sure each keystroke is correct. Try practicing shorter texts until you can maintain high accuracy.";
    } else if (wpm < 30) {
      return "Your accuracy is good, but try to build up your speed. Practice regularly with familiar texts and gradually increase your pace while maintaining accuracy.";
    } else if (errors > wpm / 4) {
      return "You have good speed but make frequent errors. Try slowing down slightly and focus on making clean keystrokes. Remember, accuracy is more important than raw speed.";
    } else if (wpm >= 60 && accuracy >= 95) {
      return "Excellent performance! To further improve, try challenging yourself with more complex texts or longer practice sessions to build stamina.";
    }
    return "Keep practicing regularly to build muscle memory and improve both speed and accuracy. Try to maintain a steady rhythm while typing.";
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (isCompleted || isEditing) return;

    // Start timer on first keypress
    if (!startTime) {
      setStartTime(Date.now());
    }

    // Handle special keys
    if (e.key === 'Enter') {
      e.preventDefault();
      const expectedChar = text[currentIndex];
      if (expectedChar === '\n') {
        handleCorrectKey();
      } else {
        handleIncorrectKey();
      }
      return;
    }

    // Handle regular keys
    if (e.key.length === 1) {
      e.preventDefault();
      const expectedChar = text[currentIndex];
      
      if (e.key === expectedChar) {
        handleCorrectKey();
      } else {
        handleIncorrectKey();
      }
    }
  };

  const handleCorrectKey = () => {
    // Play key press sound
    if (keyPressAudioRef.current && !isMuted) {
      keyPressAudioRef.current.currentTime = 0;
      keyPressAudioRef.current.play().catch(() => {});
    }
    
    setCurrentIndex(prevIndex => {
      const newIndex = prevIndex + 1;
      const newProgress = (newIndex / text.length) * 100;
      setProgress(newProgress);
      
      // Check if test is completed
      if (newIndex >= text.length) {
        completeTest();
      }
      
      return newIndex;
    });
  };

  const handleIncorrectKey = () => {
    // Play error sound
    if (errorAudioRef.current && !isMuted) {
      errorAudioRef.current.currentTime = 0;
      errorAudioRef.current.play().catch(() => {});
    }
    
    setErrors(prev => {
      const newErrors = prev + 1;
      const totalAttempts = currentIndex + newErrors;
      const newAccuracy = Math.max(0, Math.round(((totalAttempts - newErrors) / totalAttempts) * 100));
      setAccuracy(newAccuracy);
      return newErrors;
    });
  };

  const completeTest = () => {
    if (!isCompleted) {
      setIsCompleted(true);
      
      // Play completion sound
      if (completionAudioRef.current && !isMuted) {
        completionAudioRef.current.play().catch(() => {});
      }
      
      // Calculate final stats
      if (startTime) {
        const elapsedMinutes = (Date.now() - startTime) / 60000;
        const words = currentIndex / 5;
        const finalWpm = Math.round(words / elapsedMinutes);
        setWpm(finalWpm);
        
        // Set grade and suggestion
        const grade = getPerformanceGrade(finalWpm, accuracy);
        setGrade(grade);
        setSuggestion(getSuggestion(finalWpm, accuracy, errors));
        
        // Show results modal
        setShowResults(true);
        
        if (onComplete) {
          onComplete({
            wpm: finalWpm,
            accuracy,
            errors
          });
        }
      }
    }
  };

  const getGradeColor = () => {
    switch (grade) {
      case "excellent": return "text-green-500 dark:text-green-400";
      case "good": return "text-blue-500 dark:text-blue-400";
      case "average": return "text-yellow-500 dark:text-yellow-400";
      case "needsPractice": return "text-red-500 dark:text-red-400";
      default: return "text-primary";
    }
  };

  const getGradeText = () => {
    switch (grade) {
      case "excellent": return "Excellent!";
      case "good": return "Good Job!";
      case "average": return "Keep Going!";
      case "needsPractice": return "Keep Practicing!";
      default: return "Results";
    }
  };

  const resetTest = () => {
    setCurrentIndex(0);
    setErrors(0);
    setAccuracy(100);
    setWpm(0);
    setStartTime(null);
    setIsCompleted(false);
    setProgress(0);
    
    if (textContainerRef.current) {
      textContainerRef.current.focus();
    }
  };

  const handleStartPractice = () => {
    if (text.trim()) {
      setIsEditing(false);
      resetTest();
    }
  };

  const handleSaveText = () => {
    if (text.trim() && textTitle.trim() && onSave) {
      onSave(textTitle, text);
      setTextTitle("");
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const changeTrack = (index: number) => {
    setCurrentTrack(index);
    setIsPlaying(true);
  };

  return (
    <div className="space-y-6">
      {isEditing ? (
        <Card>
          <CardHeader>
            <CardTitle>Create Custom Text</CardTitle>
            <CardDescription>
              Enter or paste the text you want to practice with
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="relative">
              <textarea
                placeholder="Type or paste your custom text here..."
                className="w-full min-h-[200px] p-3 border rounded-md bg-background font-mono resize-y"
                value={text}
                onChange={(e) => setText(e.target.value)}
                spellCheck="false"
                autoCorrect="off"
              />
              <div className="absolute bottom-2 right-2 text-sm text-muted-foreground">
                {text.length} characters
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Give your text a title (required to save)"
                  className="w-full p-2 border rounded-md"
                  value={textTitle}
                  onChange={(e) => setTextTitle(e.target.value)}
                />
              </div>
              <Button
                onClick={handleSaveText}
                disabled={!text.trim() || !textTitle.trim()}
                className="flex items-center gap-2"
              >
                <Save className="h-4 w-4" />
                Save Text
              </Button>
            </div>
            
            <Button 
              className="w-full" 
              onClick={handleStartPractice}
              disabled={!text.trim()}
            >
              Start Practicing
            </Button>
          </CardContent>
        </Card>
      ) : (
        <>
          {/* Stats Display */}
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-card rounded-lg p-4 text-center border">
              <p className="text-sm text-muted-foreground">WPM</p>
              <p className="text-3xl font-bold">{wpm}</p>
            </div>
            <div className="bg-card rounded-lg p-4 text-center border">
              <p className="text-sm text-muted-foreground">Accuracy</p>
              <p className="text-3xl font-bold">{accuracy}%</p>
            </div>
            <div className="bg-card rounded-lg p-4 text-center border">
              <p className="text-sm text-muted-foreground">Errors</p>
              <p className="text-3xl font-bold">{errors}</p>
            </div>
          </div>

          {/* Progress Bar */}
          <Progress value={progress} className="h-2" />

          {/* Text Display and Input Area */}
          <div 
            ref={textContainerRef}
            tabIndex={0}
            onKeyDown={handleKeyDown}
            className={cn(
              "bg-card p-6 rounded-lg border shadow-sm outline-none transition-colors relative min-h-[200px] overflow-auto",
              "focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background",
              isCompleted && "pointer-events-none opacity-50"
            )}
          >
            <pre className="text-lg font-mono select-none whitespace-pre-wrap break-words">
              {text.split('').map((char, index) => {
                let className = "";
                
                if (index < currentIndex) {
                  className = "text-green-500 dark:text-green-400"; // Correct
                } else if (index === currentIndex) {
                  className = "bg-primary/20 text-primary underline"; // Current
                }
                
                // Special handling for whitespace characters
                const displayChar = char === '\n' ? '↵\n' : 
                                  char === ' ' ? ' ' : 
                                  char === '\t' ? '→   ' : char;
                
                return (
                  <span key={index} className={className}>
                    {displayChar}
                  </span>
                );
              })}
            </pre>
          </div>

          {/* Control Buttons */}
          <div className="flex justify-between gap-4">
            <Button variant="outline" onClick={() => setIsEditing(true)}>
              Edit Text
            </Button>
            {isCompleted && (
              <Button onClick={resetTest}>
                Try Again
              </Button>
            )}
          </div>

          {/* Music Player */}
          <div className="bg-card p-4 rounded-lg border mt-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium">Background Music</h3>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" onClick={togglePlayPause}>
                  {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                </Button>
                <Button variant="ghost" size="icon" onClick={toggleMute}>
                  {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                </Button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-4">
              {musicTracks.map((track, index) => (
                <Button
                  key={index}
                  variant={currentTrack === index ? "default" : "outline"}
                  size="sm"
                  onClick={() => changeTrack(index)}
                  className={cn(
                    "justify-start overflow-hidden",
                    currentTrack === index && isPlaying ? "animate-pulse" : ""
                  )}
                >
                  {track.title}
                </Button>
              ))}
            </div>
            
            <div className="flex items-center gap-4">
              <Volume2 className="h-4 w-4 text-muted-foreground" />
              <Slider
                value={[volume]}
                max={100}
                step={1}
                onValueChange={(value) => setVolume(value[0])}
                className="flex-1"
              />
            </div>
          </div>

          {/* Audio Elements */}
          <audio ref={audioRef} src={musicTracks[currentTrack].src} loop />
          <audio ref={keyPressAudioRef} src={keyPressSound} />
          <audio ref={errorAudioRef} src={errorSound} />
          <audio ref={completionAudioRef} src={completionSound} />

          {/* Results Modal */}
          <Dialog open={showResults} onOpenChange={setShowResults}>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <Trophy className={cn("h-6 w-6", getGradeColor())} />
                  {getGradeText()}
                </DialogTitle>
              </DialogHeader>
              
              <div className="space-y-6">
                {/* Performance Stats */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-card rounded-lg p-4 text-center border">
                    <div className="flex items-center justify-center mb-2">
                      <Keyboard className="h-5 w-5 text-primary" />
                    </div>
                    <p className="text-sm text-muted-foreground">WPM</p>
                    <p className="text-3xl font-bold">{wpm}</p>
                  </div>
                  <div className="bg-card rounded-lg p-4 text-center border">
                    <div className="flex items-center justify-center mb-2">
                      <Star className="h-5 w-5 text-primary" />
                    </div>
                    <p className="text-sm text-muted-foreground">Accuracy</p>
                    <p className="text-3xl font-bold">{accuracy}%</p>
                  </div>
                  <div className="bg-card rounded-lg p-4 text-center border">
                    <div className="flex items-center justify-center mb-2">
                      <AlertCircle className="h-5 w-5 text-primary" />
                    </div>
                    <p className="text-sm text-muted-foreground">Errors</p>
                    <p className="text-3xl font-bold">{errors}</p>
                  </div>
                </div>

                {/* Performance Rating */}
                <div className="flex justify-center">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={cn(
                          "h-6 w-6",
                          i < (grade === "excellent" ? 5 : grade === "good" ? 4 : grade === "average" ? 3 : 2)
                            ? "text-yellow-500 fill-yellow-500"
                            : "text-muted-foreground"
                        )}
                      />
                    ))}
                  </div>
                </div>

                {/* Suggestion */}
                <div className="bg-muted/30 p-4 rounded-lg">
                  <p className="text-sm leading-relaxed">{suggestion}</p>
                </div>

                {/* Actions */}
                <div className="flex justify-end gap-4">
                  <Button variant="outline" onClick={() => setShowResults(false)}>
                    Close
                  </Button>
                  <Button onClick={() => {
                    setShowResults(false);
                    resetTest();
                  }}>
                    Try Again
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </>
      )}
    </div>
  );
};

export default CustomTypingTest;