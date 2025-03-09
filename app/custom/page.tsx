"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Save, Trash2 } from "lucide-react";
import CustomTypingTest from "@/components/custom-typing-test";

// Sample templates
const templates = [
  {
    id: "t1",
    title: "Programming",
    content: "function calculateFactorial(n) {\n  if (n === 0 || n === 1) {\n    return 1;\n  }\n  return n * calculateFactorial(n - 1);\n}\n\nconst result = calculateFactorial(5);\nconsole.log(`The factorial of 5 is ${result}`);",
  },
  {
    id: "t2",
    title: "Business",
    content: "Dear Mr. Johnson,\n\nThank you for your inquiry regarding our premium services. We are pleased to offer you a 15% discount on your first order. Please use the code WELCOME15 at checkout.\n\nIf you have any questions, please don't hesitate to contact our customer service team.\n\nBest regards,\nSarah Williams\nCustomer Relations",
  },
  {
    id: "t3",
    title: "Academic",
    content: "The analysis of climate data reveals significant trends in global temperature patterns. According to recent studies, the average global temperature has increased by approximately 1.1°C since the pre-industrial era. This warming trend is attributed primarily to anthropogenic factors, particularly the emission of greenhouse gases such as carbon dioxide (CO2) and methane (CH4).",
  },
];

export default function CustomPage() {
  const [customText, setCustomText] = useState("");
  const [savedTexts, setSavedTexts] = useState<{ id: string; title: string; content: string }[]>([]);
  const [activeTab, setActiveTab] = useState("create");
  const [practiceMode, setPracticeMode] = useState(false);
  const [selectedTemplateId, setSelectedTemplateId] = useState<string | null>(null);
  const [selectedSavedTextId, setSelectedSavedTextId] = useState<string | null>(null);

  const handleSaveText = (title: string, content: string) => {
    if (content.trim() && title.trim()) {
      const newSavedText = {
        id: `custom-${Date.now()}`,
        title: title,
        content: content,
      };
      
      setSavedTexts([...savedTexts, newSavedText]);
    }
  };

  const handleDeleteSavedText = (id: string) => {
    setSavedTexts(savedTexts.filter(text => text.id !== id));
  };

  const handleLoadTemplate = (templateId: string) => {
    setSelectedTemplateId(templateId);
    const template = templates.find(t => t.id === templateId);
    if (template) {
      setCustomText(template.content);
      setActiveTab("create");
    }
  };

  const handleLoadSavedText = (id: string) => {
    setSelectedSavedTextId(id);
    const savedText = savedTexts.find(t => t.id === id);
    if (savedText) {
      setCustomText(savedText.content);
      setActiveTab("create");
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Custom Typing Practice</h1>
          <p className="text-xl text-muted-foreground">
            Create and practice with your own custom text
          </p>
        </div>

        {practiceMode ? (
          <div className="space-y-6">
            <Button variant="outline" onClick={() => setPracticeMode(false)}>
              ← Back to Editor
            </Button>
            <Card>
              <CardHeader>
                <CardTitle>Practice Mode</CardTitle>
                <CardDescription>
                  Type the custom text you've created
                </CardDescription>
              </CardHeader>
              <CardContent>
                <CustomTypingTest 
                  initialText={customText}
                  onSave={handleSaveText}
                  onComplete={() => {}}
                />
              </CardContent>
            </Card>
          </div>
        ) : (
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="create">Create</TabsTrigger>
              <TabsTrigger value="templates">Templates</TabsTrigger>
              <TabsTrigger value="saved">Saved Texts</TabsTrigger>
            </TabsList>
            
            <TabsContent value="create" className="mt-6">
              <CustomTypingTest 
                initialText={customText}
                onSave={handleSaveText}
                onComplete={() => setPracticeMode(true)}
              />
            </TabsContent>
            
            <TabsContent value="templates" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {templates.map((template) => (
                  <Card key={template.id} className="overflow-hidden">
                    <CardHeader className="pb-3">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                          <FileText className="h-4 w-4 text-primary" />
                        </div>
                        <CardTitle className="text-lg">{template.title}</CardTitle>
                      </div>
                      <CardDescription>
                        {template.content.length > 100
                          ? template.content.substring(0, 100) + "..."
                          : template.content}
                      </CardDescription>
                    </CardHeader>
                    <CardFooter>
                      <Button 
                        className="w-full" 
                        variant="outline"
                        onClick={() => handleLoadTemplate(template.id)}
                      >
                        Use Template
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="saved" className="mt-6">
              {savedTexts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {savedTexts.map((text) => (
                    <Card key={text.id} className="overflow-hidden">
                      <CardHeader className="pb-3">
                        <div className="flex justify-between items-start">
                          <div className="flex items-center gap-2">
                            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                              <FileText className="h-4 w-4 text-primary" />
                            </div>
                            <CardTitle className="text-lg">{text.title}</CardTitle>
                          </div>
                          <Button 
                            variant="ghost" 
                            size="icon"
                            onClick={() => handleDeleteSavedText(text.id)}
                          >
                            <Trash2 className="h-4 w-4 text-muted-foreground" />
                          </Button>
                        </div>
                        <CardDescription>
                          {text.content.length > 100
                            ? text.content.substring(0, 100) + "..."
                            : text.content}
                        </CardDescription>
                      </CardHeader>
                      <CardFooter>
                        <Button 
                          className="w-full" 
                          variant="outline"
                          onClick={() => handleLoadSavedText(text.id)}
                        >
                          Load Text
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card>
                  <CardContent className="pt-6 pb-6 text-center">
                    <div className="flex flex-col items-center gap-2 mb-4">
                      <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center">
                        <FileText className="h-6 w-6 text-muted-foreground" />
                      </div>
                      <p className="text-lg font-medium">No saved texts yet</p>
                    </div>
                    <p className="text-muted-foreground mb-4">
                      Create and save custom texts to practice with them later
                    </p>
                    <Button variant="outline" onClick={() => setActiveTab("create")}>
                      Create New Text
                    </Button>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        )}
      </div>
    </div>
  );
}