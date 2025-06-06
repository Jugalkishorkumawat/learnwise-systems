import { useState, useRef, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import Sidebar from '@/components/layout/Sidebar';
import PageTransition from '@/components/layout/PageTransition';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui-custom/Card';
import { Input } from "@/components/ui/input";
import { Button } from '@/components/ui-custom/Button';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Send, 
  Bot, 
  User, 
  Calendar, 
  InfoIcon,
  AlertCircle,
  Lightbulb,
  HelpCircle,
  ExternalLink,
  ThumbsUp,
  ThumbsDown,
  Clock,
  X,
  Menu
} from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/components/ui/use-toast";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

// Mock chatbot conversations
const initialMessages = [
  { id: '1', role: 'bot', content: 'Hello! I\'m your college assistant. How can I help you today?', timestamp: new Date().toISOString() },
];

// Predefined quick questions
const quickQuestions = [
  { id: '1', text: 'What\'s my attendance in CS101?', category: 'attendance' },
  { id: '2', text: 'When is the next exam?', category: 'exams' },
  { id: '3', text: 'How do I pay my fees?', category: 'fees' },
  { id: '4', text: 'Library opening hours?', category: 'facilities' },
  { id: '5', text: 'How to access my grades?', category: 'grades' },
  { id: '6', text: 'Report an issue with my hostel room', category: 'hostel' },
];

// Mock AI responses for demonstration
const mockResponses: Record<string, string> = {
  'attendance': 'Your current attendance in CS101 - Introduction to Computer Science is 85%. You need to maintain at least 75% attendance to be eligible for the final exam.',
  'exams': 'The next exam is a Mid-Term scheduled for November 25, 2023. It covers units 1-3 of your syllabus.',
  'fees': 'You can pay your fees online through the Student Portal or at the Accounts office. The deadline for the current semester is December 1, 2023.',
  'library': 'The library is open from 8:00 AM to 10:00 PM on weekdays and 9:00 AM to 6:00 PM on weekends.',
  'grades': 'You can access your grades by logging into the Student Portal and navigating to the "Academic Records" section.',
  'help': 'I can help with questions about attendance, exams, grades, fee payment, library, hostel, and other campus facilities. Just ask away!'
};

const Chatbot = () => {
  const { user } = useAuth();
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [suggestedQuestions, setSuggestedQuestions] = useState<typeof quickQuestions>([]);
  const [isSuggestionsOpen, setIsSuggestionsOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  const handleSendMessage = (messageText: string = input) => {
    if (!messageText.trim()) return;
    
    // Add user message
    const userMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: messageText,
      timestamp: new Date().toISOString()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);
    setSuggestedQuestions([]);
    
    // Simulate API delay
    setTimeout(() => {
      let responseMessage = '';
      let suggestedFollow = [];
      
      // Simple keyword matching for demo purposes
      if (messageText.toLowerCase().includes('attendance')) {
        responseMessage = mockResponses.attendance;
        suggestedFollow = quickQuestions.filter(q => q.category === 'attendance' || q.category === 'exams');
      } else if (messageText.toLowerCase().includes('exam')) {
        responseMessage = mockResponses.exams;
        suggestedFollow = quickQuestions.filter(q => q.category === 'exams' || q.category === 'grades');
      } else if (messageText.toLowerCase().includes('fee') || messageText.toLowerCase().includes('pay')) {
        responseMessage = mockResponses.fees;
        suggestedFollow = quickQuestions.filter(q => q.category === 'fees');
      } else if (messageText.toLowerCase().includes('library')) {
        responseMessage = mockResponses.library;
        suggestedFollow = quickQuestions.filter(q => q.category === 'facilities');
      } else if (messageText.toLowerCase().includes('grade')) {
        responseMessage = mockResponses.grades;
        suggestedFollow = quickQuestions.filter(q => q.category === 'grades');
      } else if (messageText.toLowerCase().includes('hostel') || messageText.toLowerCase().includes('room')) {
        responseMessage = 'To report an issue with your hostel room, please visit the Hostel Administration office or use the "Report Issue" feature in the Hostel Management section of the portal.';
        suggestedFollow = quickQuestions.filter(q => q.category === 'hostel');
      } else if (messageText.toLowerCase().includes('help')) {
        responseMessage = mockResponses.help;
        suggestedFollow = quickQuestions.slice(0, 3);
      } else {
        responseMessage = "I'm not sure I understand your question. Could you please rephrase or select from one of the suggested topics?";
        suggestedFollow = quickQuestions.slice(0, 4);
      }
      
      const botResponse = {
        id: (Date.now() + 1).toString(),
        role: 'bot',
        content: responseMessage,
        timestamp: new Date().toISOString()
      };
      
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
      setSuggestedQuestions(suggestedFollow);
    }, 1500);
  };
  
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  
  const handleFeedback = (messageId: string, isPositive: boolean) => {
    toast({
      title: isPositive ? "Feedback Received" : "We'll Improve",
      description: isPositive 
        ? "Thank you for your positive feedback!" 
        : "Thanks for letting us know. We'll work on improving our responses.",
    });
  };
  
  const clearChat = () => {
    setMessages(initialMessages);
    setSuggestedQuestions([]);
    toast({
      title: "Chat Cleared",
      description: "All conversation history has been cleared.",
    });
  };
  
  const SuggestedTopicsSheet = () => (
    <Sheet open={isSuggestionsOpen} onOpenChange={setIsSuggestionsOpen}>
      <SheetContent side="left" className="w-80 p-0">
        <div className="p-4 border-b">
          <h2 className="text-lg font-semibold">Suggested Topics</h2>
        </div>
        <div className="p-4 space-y-4 overflow-y-auto h-full">
          <div>
            <h3 className="text-sm font-medium mb-2 flex items-center">
              <Calendar className="h-4 w-4 mr-1 text-muted-foreground" />
              Academics
            </h3>
            <div className="space-y-2">
              <Button variant="ghost" size="sm" className="w-full justify-start text-xs" onClick={() => { handleSendMessage("What's my attendance in CS101?"); setIsSuggestionsOpen(false); }}>
                View my attendance
              </Button>
              <Button variant="ghost" size="sm" className="w-full justify-start text-xs" onClick={() => { handleSendMessage("When is the next exam?"); setIsSuggestionsOpen(false); }}>
                Exam schedule
              </Button>
              <Button variant="ghost" size="sm" className="w-full justify-start text-xs" onClick={() => { handleSendMessage("How to access my grades?"); setIsSuggestionsOpen(false); }}>
                Access my grades
              </Button>
            </div>
          </div>
          
          <Separator />
          
          <div>
            <h3 className="text-sm font-medium mb-2 flex items-center">
              <InfoIcon className="h-4 w-4 mr-1 text-muted-foreground" />
              Administrative
            </h3>
            <div className="space-y-2">
              <Button variant="ghost" size="sm" className="w-full justify-start text-xs" onClick={() => { handleSendMessage("How do I pay my fees?"); setIsSuggestionsOpen(false); }}>
                Fee payment
              </Button>
              <Button variant="ghost" size="sm" className="w-full justify-start text-xs" onClick={() => { handleSendMessage("How to get a bonafide certificate?"); setIsSuggestionsOpen(false); }}>
                Certificates
              </Button>
              <Button variant="ghost" size="sm" className="w-full justify-start text-xs" onClick={() => { handleSendMessage("What's the procedure for applying for leave?"); setIsSuggestionsOpen(false); }}>
                Leave application
              </Button>
            </div>
          </div>
          
          <Separator />
          
          <div>
            <h3 className="text-sm font-medium mb-2 flex items-center">
              <HelpCircle className="h-4 w-4 mr-1 text-muted-foreground" />
              Facilities
            </h3>
            <div className="space-y-2">
              <Button variant="ghost" size="sm" className="w-full justify-start text-xs" onClick={() => { handleSendMessage("Library opening hours?"); setIsSuggestionsOpen(false); }}>
                Library timings
              </Button>
              <Button variant="ghost" size="sm" className="w-full justify-start text-xs" onClick={() => { handleSendMessage("Report an issue with my hostel room"); setIsSuggestionsOpen(false); }}>
                Hostel support
              </Button>
              <Button variant="ghost" size="sm" className="w-full justify-start text-xs" onClick={() => { handleSendMessage("How to book a sports facility?"); setIsSuggestionsOpen(false); }}>
                Sports facilities
              </Button>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
  
  return (
    <PageTransition>
      <div className="min-h-screen flex bg-secondary/20">
        <Sidebar />
        
        <div className="flex-1 ml-16 md:ml-64 pt-16">
          <main className="px-2 sm:px-4 lg:px-8 py-4 sm:py-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 sm:mb-8">
              <div className="mb-4 sm:mb-0">
                <h1 className="text-xl sm:text-2xl font-bold tracking-tight">AI College Assistant</h1>
                <p className="text-sm text-muted-foreground">Get instant answers to your questions about college</p>
              </div>
              
              <div className="flex items-center gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="lg:hidden"
                  onClick={() => setIsSuggestionsOpen(true)}
                >
                  <Menu className="h-4 w-4 mr-2" />
                  Topics
                </Button>
                <Button variant="outline" size="sm" onClick={clearChat}>
                  <X className="mr-2 h-4 w-4" />
                  Clear
                </Button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 lg:gap-6">
              {/* Desktop Sidebar with suggested topics */}
              <Card className="hidden lg:block lg:col-span-1 h-[calc(100vh-12rem)]">
                <CardHeader>
                  <CardTitle className="text-lg">Suggested Topics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm font-medium mb-2 flex items-center">
                        <Calendar className="h-4 w-4 mr-1 text-muted-foreground" />
                        Academics
                      </h3>
                      <div className="space-y-2">
                        <Button variant="ghost" size="sm" className="w-full justify-start" onClick={() => handleSendMessage("What's my attendance in CS101?")}>
                          View my attendance
                        </Button>
                        <Button variant="ghost" size="sm" className="w-full justify-start" onClick={() => handleSendMessage("When is the next exam?")}>
                          Exam schedule
                        </Button>
                        <Button variant="ghost" size="sm" className="w-full justify-start" onClick={() => handleSendMessage("How to access my grades?")}>
                          Access my grades
                        </Button>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <h3 className="text-sm font-medium mb-2 flex items-center">
                        <InfoIcon className="h-4 w-4 mr-1 text-muted-foreground" />
                        Administrative
                      </h3>
                      <div className="space-y-2">
                        <Button variant="ghost" size="sm" className="w-full justify-start" onClick={() => handleSendMessage("How do I pay my fees?")}>
                          Fee payment
                        </Button>
                        <Button variant="ghost" size="sm" className="w-full justify-start" onClick={() => handleSendMessage("How to get a bonafide certificate?")}>
                          Certificates
                        </Button>
                        <Button variant="ghost" size="sm" className="w-full justify-start" onClick={() => handleSendMessage("What's the procedure for applying for leave?")}>
                          Leave application
                        </Button>
                      </div>
                    </div>
                    
                    <Separator />
                    
                    <div>
                      <h3 className="text-sm font-medium mb-2 flex items-center">
                        <HelpCircle className="h-4 w-4 mr-1 text-muted-foreground" />
                        Facilities
                      </h3>
                      <div className="space-y-2">
                        <Button variant="ghost" size="sm" className="w-full justify-start" onClick={() => handleSendMessage("Library opening hours?")}>
                          Library timings
                        </Button>
                        <Button variant="ghost" size="sm" className="w-full justify-start" onClick={() => handleSendMessage("Report an issue with my hostel room")}>
                          Hostel support
                        </Button>
                        <Button variant="ghost" size="sm" className="w-full justify-start" onClick={() => handleSendMessage("How to book a sports facility?")}>
                          Sports facilities
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {/* Main Chat Interface */}
              <Card className="lg:col-span-3 flex flex-col h-[calc(100vh-10rem)] sm:h-[calc(100vh-12rem)]">
                <CardHeader className="pb-3 px-3 sm:px-6">
                  <div className="flex items-center">
                    <Avatar className="h-8 w-8 sm:h-10 sm:w-10 mr-3">
                      <AvatarImage src="/placeholder.svg" />
                      <AvatarFallback>
                        <Bot className="h-4 w-4 sm:h-5 sm:w-5" />
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-base sm:text-lg">College Assistant</CardTitle>
                      <CardDescription>
                        <Badge className="bg-green-100 text-green-800 text-xs" variant="outline">
                          Online
                        </Badge>
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                
                <CardContent className="flex-grow overflow-y-auto pb-0 px-3 sm:px-6">
                  <div className="space-y-3 sm:space-y-4">
                    {messages.map((message) => (
                      <div 
                        key={message.id} 
                        className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div 
                          className={`max-w-[85%] sm:max-w-[80%] rounded-lg p-2 sm:p-3 ${
                            message.role === 'user' 
                              ? 'bg-primary text-primary-foreground ml-4 sm:ml-12' 
                              : 'bg-secondary mr-4 sm:mr-12'
                          }`}
                        >
                          <div className="flex items-start mb-1">
                            {message.role === 'bot' && (
                              <Avatar className="h-5 w-5 sm:h-6 sm:w-6 mr-2">
                                <AvatarFallback>
                                  <Bot className="h-3 w-3" />
                                </AvatarFallback>
                              </Avatar>
                            )}
                            <span className="text-xs font-medium">
                              {message.role === 'user' ? `${user?.name || 'You'}` : 'AI Assistant'}
                            </span>
                          </div>
                          <div className="mt-1 text-sm sm:text-base">{message.content}</div>
                          <div className="mt-2 flex justify-between items-center">
                            <span className="text-xs opacity-70">
                              <Clock className="h-3 w-3 inline mr-1" />
                              {new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                            </span>
                            
                            {message.role === 'bot' && (
                              <div className="flex space-x-1">
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  className="h-6 w-6 p-0 rounded-full"
                                  onClick={() => handleFeedback(message.id, true)}
                                >
                                  <ThumbsUp className="h-3 w-3" />
                                </Button>
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  className="h-6 w-6 p-0 rounded-full"
                                  onClick={() => handleFeedback(message.id, false)}
                                >
                                  <ThumbsDown className="h-3 w-3" />
                                </Button>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                    
                    {isTyping && (
                      <div className="flex justify-start">
                        <div className="bg-secondary rounded-lg p-2 sm:p-3 max-w-[85%] sm:max-w-[80%]">
                          <div className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                            <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                            <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '600ms' }}></div>
                          </div>
                        </div>
                      </div>
                    )}
                    
                    {!isTyping && suggestedQuestions.length > 0 && (
                      <div className="pt-4">
                        <p className="text-sm font-medium mb-2 flex items-center">
                          <Lightbulb className="h-4 w-4 mr-1 text-yellow-500" />
                          Suggested Questions
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {suggestedQuestions.map((question) => (
                            <Button 
                              key={question.id} 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleSendMessage(question.text)}
                              className="text-xs"
                            >
                              {question.text}
                            </Button>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    <div ref={messagesEndRef} />
                  </div>
                </CardContent>
                
                <CardFooter className="pt-3 sm:pt-4 pb-4 sm:pb-6 px-3 sm:px-6">
                  <div className="relative w-full">
                    <Input
                      placeholder="Type your message..."
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={handleKeyPress}
                      className="pr-12 text-sm sm:text-base"
                    />
                    <Button 
                      size="sm"
                      className="absolute right-1 top-1 h-6 w-6 sm:h-8 sm:w-8 p-0"
                      onClick={() => handleSendMessage()}
                      disabled={!input.trim()}
                    >
                      <Send className="h-3 w-3 sm:h-4 sm:w-4" />
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            </div>
          </main>
        </div>
      </div>
      
      {/* Mobile Suggestions Sheet */}
      <SuggestedTopicsSheet />
    </PageTransition>
  );
};

export default Chatbot;
