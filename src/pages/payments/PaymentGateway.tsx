
import { useState } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import PageTransition from '@/components/layout/PageTransition';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui-custom/Card';
import { Button } from '@/components/ui-custom/Button';
import { Input } from '@/components/ui/input';
import { CreditCard, CheckCircle2 } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { useAuth } from '@/contexts/AuthContext';

const PaymentGateway = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [amount, setAmount] = useState('');
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!cardNumber || !cardName || !expiryDate || !cvv || !amount) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive"
      });
      return;
    }
    
    setProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setProcessing(false);
      setSuccess(true);
      
      toast({
        title: "Payment Successful",
        description: `Payment of ₹${amount} has been processed successfully.`,
      });
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setCardNumber('');
        setCardName('');
        setExpiryDate('');
        setCvv('');
        setAmount('');
        setSuccess(false);
      }, 3000);
    }, 2000);
  };

  // Format card number with spaces
  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    
    if (parts.length) {
      return parts.join(' ');
    } else {
      return value;
    }
  };

  // Format expiry date
  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    
    if (v.length >= 2) {
      return `${v.substring(0, 2)}/${v.substring(2, 4)}`;
    }
    
    return v;
  };

  return (
    <PageTransition>
      <div className="min-h-screen flex bg-secondary/20">
        <Sidebar />
        
        <div className="flex-1 ml-16 md:ml-64 pt-16">
          <main className="px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
              <div>
                <h1 className="text-2xl font-bold tracking-tight">Payment Gateway</h1>
                <p className="text-muted-foreground">Make secure payments for your fees and services</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Make a Payment</CardTitle>
                  <CardDescription>
                    Enter your card details to process your payment securely
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {success ? (
                    <div className="flex flex-col items-center justify-center py-8">
                      <CheckCircle2 className="h-16 w-16 text-green-500 mb-4" />
                      <h3 className="text-xl font-medium text-center">Payment Successful!</h3>
                      <p className="text-muted-foreground text-center mt-2">
                        Your payment of ₹{amount} has been processed successfully.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit}>
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <label htmlFor="cardNumber" className="block text-sm font-medium">
                            Card Number
                          </label>
                          <div className="relative">
                            <Input
                              id="cardNumber"
                              placeholder="1234 5678 9012 3456"
                              value={cardNumber}
                              onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                              maxLength={19}
                              className="pl-10"
                            />
                            <CreditCard className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <label htmlFor="cardName" className="block text-sm font-medium">
                            Cardholder Name
                          </label>
                          <Input
                            id="cardName"
                            placeholder="John Doe"
                            value={cardName}
                            onChange={(e) => setCardName(e.target.value)}
                          />
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <label htmlFor="expiryDate" className="block text-sm font-medium">
                              Expiry Date
                            </label>
                            <Input
                              id="expiryDate"
                              placeholder="MM/YY"
                              value={expiryDate}
                              onChange={(e) => setExpiryDate(formatExpiryDate(e.target.value))}
                              maxLength={5}
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <label htmlFor="cvv" className="block text-sm font-medium">
                              CVV
                            </label>
                            <Input
                              id="cvv"
                              placeholder="123"
                              value={cvv}
                              onChange={(e) => setCvv(e.target.value.replace(/\D/g, ''))}
                              maxLength={3}
                              type="password"
                            />
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <label htmlFor="amount" className="block text-sm font-medium">
                            Amount (₹)
                          </label>
                          <Input
                            id="amount"
                            placeholder="Enter amount"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value.replace(/\D/g, ''))}
                            type="number"
                          />
                        </div>
                      </div>
                      
                      <Button type="submit" className="w-full mt-6" disabled={processing}>
                        {processing ? 'Processing...' : 'Pay Now'}
                      </Button>
                    </form>
                  )}
                </CardContent>
              </Card>
              
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Payment Methods</CardTitle>
                    <CardDescription>
                      We accept various payment methods for your convenience
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-4">
                      <div className="border rounded-md px-4 py-2 flex items-center space-x-2">
                        <CreditCard className="h-5 w-5 text-primary" />
                        <span>Credit Card</span>
                      </div>
                      <div className="border rounded-md px-4 py-2 flex items-center space-x-2">
                        <CreditCard className="h-5 w-5 text-primary" />
                        <span>Debit Card</span>
                      </div>
                      <div className="border rounded-md px-4 py-2 flex items-center space-x-2">
                        <CreditCard className="h-5 w-5 text-primary" />
                        <span>Net Banking</span>
                      </div>
                      <div className="border rounded-md px-4 py-2 flex items-center space-x-2">
                        <CreditCard className="h-5 w-5 text-primary" />
                        <span>UPI</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Fee Information</CardTitle>
                    <CardDescription>
                      Details about your pending fees and dues
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span>Tuition Fee</span>
                        <span>₹45,000</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Library Fee</span>
                        <span>₹5,000</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Lab Fee</span>
                        <span>₹10,000</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Hostel Fee</span>
                        <span>₹7,500</span>
                      </div>
                      <div className="border-t pt-2 flex justify-between font-medium">
                        <span>Total Due</span>
                        <span>₹67,500</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <p className="text-sm text-muted-foreground">
                      Due date: June 30, 2024
                    </p>
                  </CardFooter>
                </Card>
              </div>
            </div>
          </main>
        </div>
      </div>
    </PageTransition>
  );
};

export default PaymentGateway;
