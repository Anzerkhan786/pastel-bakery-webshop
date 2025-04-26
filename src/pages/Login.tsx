
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import { useAuth } from '../context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';

const Login = () => {
  const [tab, setTab] = useState<string>('user');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const { login, adminLogin, loading } = useAuth();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast.error("Please enter both email and password");
      return;
    }
    
    try {
      if (tab === 'user') {
        await login(email, password);
      } else {
        await adminLogin(email, password);
      }
    } catch (error) {
      // Error is already handled in the auth context
      console.error("Login submission error", error);
    }
  };
  
  return (
    <Layout>
      <div className="py-12 px-4">
        <div className="container max-w-md mx-auto">
          <Card className="shadow-card">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl font-serif">Welcome Back</CardTitle>
              <CardDescription>Sign in to your account</CardDescription>
            </CardHeader>
            
            <Tabs value={tab} onValueChange={setTab} className="w-full">
              <TabsList className="grid grid-cols-2 mb-4 mx-4">
                <TabsTrigger value="user">Customer</TabsTrigger>
                <TabsTrigger value="admin">Administrator</TabsTrigger>
              </TabsList>
              
              <TabsContent value="user">
                <form onSubmit={handleSubmit}>
                  <CardContent className="space-y-4">
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
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="password">Password</Label>
                        <Link 
                          to="/forgot-password" 
                          className="text-xs text-primary-foreground hover:underline"
                        >
                          Forgot password?
                        </Link>
                      </div>
                      <Input 
                        id="password" 
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>
                  </CardContent>
                  
                  <CardFooter className="flex flex-col">
                    <Button 
                      className="w-full bakery-button bakery-button-primary" 
                      disabled={loading}
                    >
                      {loading ? 'Signing in...' : 'Sign In'}
                    </Button>
                    
                    <p className="text-sm text-center text-muted-foreground mt-4">
                      Don't have an account?{' '}
                      <Link to="/register" className="text-primary-foreground hover:underline">
                        Sign up
                      </Link>
                    </p>
                  </CardFooter>
                </form>
              </TabsContent>
              
              <TabsContent value="admin">
                <form onSubmit={handleSubmit}>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="admin-email">Email</Label>
                      <Input 
                        id="admin-email" 
                        type="email" 
                        placeholder="admin@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="admin-password">Password</Label>
                        <Link 
                          to="/forgot-password" 
                          className="text-xs text-primary-foreground hover:underline"
                        >
                          Forgot password?
                        </Link>
                      </div>
                      <Input 
                        id="admin-password" 
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>
                  </CardContent>
                  
                  <CardFooter>
                    <Button 
                      className="w-full bakery-button bakery-button-primary" 
                      disabled={loading}
                    >
                      {loading ? 'Signing in...' : 'Admin Sign In'}
                    </Button>
                  </CardFooter>
                </form>
              </TabsContent>
            </Tabs>
          </Card>
          
          <div className="mt-6 text-center text-sm text-muted-foreground">
            <p>
              For demo purposes:
              <br />
              Customer: user@example.com / password123
              <br />
              Admin: admin@example.com / admin123
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Login;
