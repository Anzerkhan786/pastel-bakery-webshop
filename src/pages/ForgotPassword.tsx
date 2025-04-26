
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import { useAuth } from '../context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { ArrowLeft } from 'lucide-react';

const ForgotPassword = () => {
  const [email, setEmail] = useState<string>('');
  const [submitted, setSubmitted] = useState<boolean>(false);
  const { forgotPassword } = useAuth();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await forgotPassword(email);
    setSubmitted(true);
  };
  
  return (
    <Layout>
      <div className="py-12 px-4">
        <div className="container max-w-md mx-auto">
          <Card className="shadow-card">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-serif">Reset Your Password</CardTitle>
              <CardDescription>
                Enter your email and we'll send you a password reset link
              </CardDescription>
            </CardHeader>
            
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-4">
                {!submitted ? (
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="your.email@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                ) : (
                  <div className="bg-bakery-green bg-opacity-20 p-4 rounded-md text-accent-foreground">
                    <p className="text-sm">
                      If an account exists with the email <strong>{email}</strong>, you will
                      receive a password reset link shortly. Please check your email.
                    </p>
                  </div>
                )}
              </CardContent>
              
              <CardFooter className="flex flex-col">
                {!submitted ? (
                  <Button 
                    type="submit"
                    className="w-full bakery-button bakery-button-primary"
                  >
                    Send Reset Link
                  </Button>
                ) : (
                  <Button 
                    type="button"
                    className="w-full bakery-button bakery-button-secondary"
                    onClick={() => setSubmitted(false)}
                  >
                    Send Again
                  </Button>
                )}
                
                <Link 
                  to="/login" 
                  className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mt-4"
                >
                  <ArrowLeft className="mr-1 h-4 w-4" />
                  Back to Sign In
                </Link>
              </CardFooter>
            </form>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default ForgotPassword;
