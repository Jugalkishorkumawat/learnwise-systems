
import { useState, useRef, useEffect } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import PageTransition from '@/components/layout/PageTransition';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui-custom/Card';
import { Input } from "@/components/ui/input";
import { Button } from '@/components/ui-custom/Button';
import { Badge } from "@/components/ui/badge";
import { 
  Send, 
  Bot, 
  User, 
  Image, 
  Paperclip, 
  Mic, 
  ThumbsUp, 
  ThumbsDown,
  Copy,
  Bookmark
} from 'lucide-react';
import { toast } from "@/components/ui/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useAuth } from '@/contexts/AuthContext';

// Define the message type
interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

// Mock suggested questions
const suggestedQuestions = [
  "What's my attendance in Computer Science?",
  "When is the next exam?",
  "How do I apply for a scholarship?",
  "What are the library hours?",
  "How can I reset my student portal password?",
  "What's the cafeteria menu today?",
];

const Chatbot = () => {
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // Initial greeting from the bot
  useEffect(() => {
    const initialMessage: Message = {
      id: '1',
      content: `Hello ${user?.name || 'there'}! I'm EduBot, your virtual assistant. How can I help you today?`,
      sender: 'bot',
      timestamp: new Date(),
    };
    setMessages([initialMessage]);
  }, [user]);
  
  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  const handleSendMessage = () => {
    if (!input.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: 'user',
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);
    
    // Simulate bot response after a short delay
    setTimeout(() => {
      const botResponses: Record<string, string> = {
        "hi": `Hello ${user?.name || 'there'}! How can I assist you today?`,
        "hello": `Hi ${user?.name || 'there'}! How can I help you?`,
        "attendance": "Your overall attendance is 87%. You have been present for 35 out of 40 classes this semester.",
        "exam": "Your next exam is the Mid-Term Exam scheduled on November 25, 2023.",
        "scholarship": "To apply for a scholarship, visit the Financial Aid office or submit an application through the student portal by December 1st.",
        "library": "The library is open Monday to Friday from 8:00 AM to 9:00 PM, and on weekends from 10:00 AM to 6:00 PM.",
        "password": "To reset your password, go to the login page and click on 'Forgot Password'. Follow the instructions sent to your registered email.",
        "cafeteria": "Today's cafeteria special is Vegetable Biryani with Raita. Regular menu items are also available.",
        "thanks": "You're welcome! Feel free to ask if you need anything else.",
        "thank you": "You're welcome! Is there anything else I can help you with?",
      };
      
      let botResponse = "I'm not sure how to answer that. Could you please provide more details or ask another question?";
      
      // Check if the input matches any key in botResponses
      for (const key in botResponses) {
        if (input.toLowerCase().includes(key)) {
          botResponse = botResponses[key];
          break;
        }
      }
      
      const botMessage: Message = {
        id: Date.now().toString(),
        content: botResponse,
        sender: 'bot',
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1500);
  };
  
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  
  const handleSuggestedQuestion = (question: string) => {
    setInput(question);
    // Focus on input after selecting a suggested question
    const inputElement = document.getElementById('chat-input');
    if (inputElement) {
      inputElement.focus();
    }
  };
  
  const handleCopyMessage = (content: string) => {
    navigator.clipboard.writeText(content);
    toast({
      title: "Message Copied",
      description: "The message has been copied to your clipboard.",
    });
  };
  
  const handleSaveMessage = (content: string) => {
    // In a real app, this would save to user's bookmarks
    toast({
      title: "Message Saved",
      description: "The message has been saved to your bookmarks.",
    });
  };
  
  const formatMessageContent = (content: string) => {
    // Simple formatting - could be expanded for more complex formatting
    return content.split('\n').map((line, i) => (
      <span key={i}>
        {line}
        {i < content.split('\n').length - 1 && <br />}
      </span>
    ));
  };
  
  return (
    <PageTransition>
      <div className="min-h-screen flex bg-secondary/20">
        <Sidebar />
        
        <div className="flex-1 ml-16 md:ml-64 pt-16">
          <main className="px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
              <div>
                <h1 className="text-2xl font-bold tracking-tight">EduBot</h1>
                <p className="text-muted-foreground">Your personal AI assistant for campus queries</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* Chatbot Main Interface */}
              <Card className="lg:col-span-3 overflow-hidden">
                <CardHeader className="pb-4 border-b">
                  <div className="flex items-center">
                    <Avatar className="h-10 w-10 mr-3">
                      <AvatarImage src="/placeholder.svg" />
                      <AvatarFallback className="bg-primary/10 text-primary">
                        <Bot className="h-6 w-6" />
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle>EduBot</CardTitle>
                      <CardDescription>AI Campus Assistant</CardDescription>
                    </div>
                    <Badge className="ml-auto bg-green-100 text-green-800">Online</Badge>
                  </div>
                </CardHeader>
                <div className="flex flex-col h-[500px]">
                  <ScrollArea className="flex-1 p-4">
                    <div className="space-y-4">
                      {messages.map((message) => (
                        <div 
                          key={message.id} 
                          className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                          <div 
                            className={`relative max-w-md p-4 rounded-lg ${
                              message.sender === 'user' 
                                ? 'bg-primary text-primary-foreground'
                                : 'bg-muted'
                            }`}
                          >
                            <div className="flex items-start gap-3">
                              {message.sender === 'bot' && (
                                <Avatar className="h-8 w-8">
                                  <AvatarFallback className="bg-primary/10 text-primary">
                                    <Bot className="h-4 w-4" />
                                  </AvatarFallback>
                                </Avatar>
                              )}
                              
                              <div className="space-y-2">
                                <div className="text-sm">
                                  {formatMessageContent(message.content)}
                                </div>
                                <div className={`text-xs ${message.sender === 'user' ? 'text-primary-foreground/70' : 'text-muted-foreground'}`}>
                                  {message.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                                </div>
                              </div>
                              
                              {message.sender === 'user' && (
                                <Avatar className="h-8 w-8">
                                  <AvatarImage src={`https://ui-avatars.com/api/?name=${user?.name?.replace(/\s+/g, '+') || 'User'}&background=random`} />
                                  <AvatarFallback>
                                    <User className="h-4 w-4" />
                                  </AvatarFallback>
                                </Avatar>
                              )}
                            </div>
                            
                            {message.sender === 'bot' && (
                              <div className="absolute right-1 top-1 opacity-0 group-hover:opacity-100 flex space-x-1">
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  className="h-6 w-6 p-0 rounded-full"
                                  onClick={() => handleCopyMessage(message.content)}
                                >
                                  <Copy className="h-3 w-3" />
                                  <span className="sr-only">Copy</span>
                                </Button>
                                <Button 
                                  variant="ghost" 
                                  size="sm" 
                                  className="h-6 w-6 p-0 rounded-full"
                                  onClick={() => handleSaveMessage(message.content)}
                                >
                                  <Bookmark className="h-3 w-3" />
                                  <span className="sr-only">Save</span>
                                </Button>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                      
                      {isTyping && (
                        <div className="flex justify-start">
                          <div className="bg-muted p-4 rounded-lg">
                            <div className="flex items-center space-x-2">
                              <div className="w-2 h-2 rounded-full bg-muted-foreground/70 animate-bounce" style={{ animationDelay: '0ms' }}></div>
                              <div className="w-2 h-2 rounded-full bg-muted-foreground/70 animate-bounce" style={{ animationDelay: '300ms' }}></div>
                              <div className="w-2 h-2 rounded-full bg-muted-foreground/70 animate-bounce" style={{ animationDelay: '600ms' }}></div>
                            </div>
                          </div>
                        </div>
                      )}
                      
                      <div ref={messagesEndRef} />
                    </div>
                  </ScrollArea>
                  
                  <div className="p-4 border-t">
                    <div className="flex items-end gap-2">
                      <Button variant="outline" size="icon" className="rounded-full h-10 w-10 flex-shrink-0">
                        <Paperclip className="h-5 w-5" />
                        <span className="sr-only">Attach</span>
                      </Button>
                      <Button variant="outline" size="icon" className="rounded-full h-10 w-10 flex-shrink-0">
                        <Image className="h-5 w-5" />
                        <span className="sr-only">Image</span>
                      </Button>
                      <Button variant="outline" size="icon" className="rounded-full h-10 w-10 flex-shrink-0">
                        <Mic className="h-5 w-5" />
                        <span className="sr-only">Voice</span>
                      </Button>
                      
                      <div className="relative flex-1">
                        <Input
                          id="chat-input"
                          placeholder="Type your message..."
                          className="pr-10"
                          value={input}
                          onChange={(e) => setInput(e.target.value)}
                          onKeyDown={handleKeyDown}
                        />
                        <Button 
                          className="absolute right-0 top-0 h-full px-3 rounded-l-none"
                          onClick={handleSendMessage}
                          disabled={!input.trim()}
                        >
                          <Send className="h-4 w-4" />
                          <span className="sr-only">Send</span>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
              
              {/* Sidebar with Suggested Questions */}
              <Card className="lg:col-span-1">
                <CardHeader>
                  <CardTitle className="text-lg">Suggested Questions</CardTitle>
                  <CardDescription>Frequently asked questions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {suggestedQuestions.map((question, index) => (
                      <Button 
                        key={index} 
                        variant="outline" 
                        className="w-full justify-start text-sm h-auto py-2"
                        onClick={() => handleSuggestedQuestion(question)}
                      >
                        {question}
                      </Button>
                    ))}
                  </div>
                  
                  <div className="mt-6">
                    <h4 className="font-medium text-sm mb-3">How was your experience?</h4>
                    <div className="flex gap-2">
                      <Button variant="outline" className="flex-1">
                        <ThumbsUp className="mr-2 h-4 w-4" />
                        Helpful
                      </Button>
                      <Button variant="outline" className="flex-1">
                        <ThumbsDown className="mr-2 h-4 w-4" />
                        Improve
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </main>
        </div>
      </div>
    </PageTransition>
  );
};

export default Chatbot;
