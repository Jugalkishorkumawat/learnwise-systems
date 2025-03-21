
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import Sidebar from '@/components/layout/Sidebar';
import PageTransition from '@/components/layout/PageTransition';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui-custom/Card';
import { Button } from '@/components/ui-custom/Button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "@/components/ui/use-toast";
import { CreditCard, AlertCircle, ChevronDown, ChevronUp, Receipt, Download } from 'lucide-react';

const PaymentStatusBadge = ({ status }: { status: 'paid' | 'pending' | 'overdue' }) => {
  const statusConfig = {
    paid: { class: "bg-green-100 text-green-800 hover:bg-green-100", label: "Paid" },
    pending: { class: "bg-yellow-100 text-yellow-800 hover:bg-yellow-100", label: "Pending" },
    overdue: { class: "bg-red-100 text-red-800 hover:bg-red-100", label: "Overdue" }
  };
  
  const config = statusConfig[status];
  
  return (
    <Badge className={config.class} variant="outline">
      {config.label}
    </Badge>
  );
};

const StudentPayments = () => {
  const { getPayments } = useAuth();
  const [showDetails, setShowDetails] = useState(false);
  
  const payments = getPayments();
  
  // Calculate payment statistics
  const totalFees = payments.reduce((sum, payment) => sum + payment.amount, 0);
  const paidAmount = payments
    .filter(payment => payment.status === 'paid')
    .reduce((sum, payment) => sum + payment.amount, 0);
  const pendingAmount = payments
    .filter(payment => payment.status === 'pending' || payment.status === 'overdue')
    .reduce((sum, payment) => sum + payment.amount, 0);
  
  const paymentPercentage = totalFees > 0 
    ? Math.round((paidAmount / totalFees) * 100) 
    : 0;
  
  const handleMakePayment = (paymentId: string) => {
    toast({
      title: "Payment Initiated",
      description: "You will be redirected to the payment gateway.",
    });
  };
  
  const handleDownloadReceipt = (paymentId: string) => {
    toast({
      title: "Receipt Downloaded",
      description: "Payment receipt has been downloaded successfully.",
    });
  };
  
  return (
    <PageTransition>
      <div className="min-h-screen flex bg-secondary/20">
        <Sidebar />
        
        <div className="flex-1 ml-16 md:ml-64 pt-16">
          <main className="px-4 sm:px-6 lg:px-8 py-8">
            <div className="mb-8">
              <h1 className="text-2xl font-bold tracking-tight">My Payments</h1>
              <p className="text-muted-foreground">View and manage your fee payments</p>
            </div>
            
            {/* Payment Summary */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <Card className="overflow-hidden">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Total Fees</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">₹{totalFees.toLocaleString()}</div>
                </CardContent>
              </Card>
              
              <Card className="overflow-hidden">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Paid Amount</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">₹{paidAmount.toLocaleString()}</div>
                  <div className="text-xs text-muted-foreground mt-1">{paymentPercentage}% of total fees</div>
                </CardContent>
              </Card>
              
              <Card className="overflow-hidden">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Pending Amount</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-red-600">₹{pendingAmount.toLocaleString()}</div>
                  <div className="text-xs text-muted-foreground mt-1">{100 - paymentPercentage}% of total fees</div>
                </CardContent>
              </Card>
            </div>
            
            {/* Fee Structure Info Card */}
            <Card className="mb-8">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle>Fee Structure</CardTitle>
                  <Button variant="ghost" size="sm" onClick={() => setShowDetails(!showDetails)}>
                    {showDetails ? (
                      <>
                        <ChevronUp className="h-4 w-4 mr-2" />
                        Hide Details
                      </>
                    ) : (
                      <>
                        <ChevronDown className="h-4 w-4 mr-2" />
                        Show Details
                      </>
                    )}
                  </Button>
                </div>
                <CardDescription>
                  Academic Year 2023-2024
                </CardDescription>
              </CardHeader>
              
              {showDetails && (
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Fee Type</TableHead>
                        <TableHead>Amount (₹)</TableHead>
                        <TableHead>Due Date</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>Tuition Fee (Fall Semester)</TableCell>
                        <TableCell>45,000</TableCell>
                        <TableCell>September 1, 2023</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Library Fee</TableCell>
                        <TableCell>5,000</TableCell>
                        <TableCell>September 15, 2023</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Laboratory Fee</TableCell>
                        <TableCell>10,000</TableCell>
                        <TableCell>October 1, 2023</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Hostel Fee (Monthly)</TableCell>
                        <TableCell>7,500</TableCell>
                        <TableCell>1st of each month</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Tuition Fee (Spring Semester)</TableCell>
                        <TableCell>45,000</TableCell>
                        <TableCell>January 1, 2024</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                  
                  <div className="mt-4 p-4 border rounded-md bg-blue-50 border-blue-200 flex items-start">
                    <AlertCircle className="h-5 w-5 text-blue-600 mr-3 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-blue-800">Payment Information</h4>
                      <p className="text-sm text-blue-700 mt-1">
                        A late fee of 5% will be charged for payments made after the due date. All payments are non-refundable.
                      </p>
                    </div>
                  </div>
                </CardContent>
              )}
            </Card>
            
            {/* Payment History & Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Payment History</CardTitle>
                <CardDescription>
                  Record of all your fee transactions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Amount (₹)</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {payments.map((payment) => (
                      <TableRow key={payment.id}>
                        <TableCell>{payment.date}</TableCell>
                        <TableCell>{payment.description}</TableCell>
                        <TableCell>{payment.amount.toLocaleString()}</TableCell>
                        <TableCell>
                          <PaymentStatusBadge status={payment.status} />
                        </TableCell>
                        <TableCell>
                          {payment.status === 'pending' || payment.status === 'overdue' ? (
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button size="sm" variant="outline">
                                  <CreditCard className="h-4 w-4 mr-2" />
                                  Pay Now
                                </Button>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>Make Payment</DialogTitle>
                                  <DialogDescription>
                                    You'll be redirected to the payment gateway to complete your payment of ₹{payment.amount.toLocaleString()}.
                                  </DialogDescription>
                                </DialogHeader>
                                <div className="py-4">
                                  <div className="rounded-lg border p-4 mb-4">
                                    <h4 className="font-medium mb-2">Payment Details</h4>
                                    <div className="grid grid-cols-2 gap-2 text-sm">
                                      <div className="text-muted-foreground">Description:</div>
                                      <div>{payment.description}</div>
                                      <div className="text-muted-foreground">Amount:</div>
                                      <div>₹{payment.amount.toLocaleString()}</div>
                                      <div className="text-muted-foreground">Due Date:</div>
                                      <div>{payment.date}</div>
                                    </div>
                                  </div>
                                </div>
                                <DialogFooter>
                                  <Button variant="outline">Cancel</Button>
                                  <Button onClick={() => handleMakePayment(payment.id)}>
                                    Continue to Payment
                                  </Button>
                                </DialogFooter>
                              </DialogContent>
                            </Dialog>
                          ) : (
                            <Button size="sm" variant="outline" onClick={() => handleDownloadReceipt(payment.id)}>
                              <Receipt className="h-4 w-4 mr-2" />
                              Receipt
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
              <CardFooter className="flex justify-between border-t p-4">
                <div className="text-sm text-muted-foreground">
                  Showing {payments.length} payment records
                </div>
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Export History
                </Button>
              </CardFooter>
            </Card>
          </main>
        </div>
      </div>
    </PageTransition>
  );
};

export default StudentPayments;
