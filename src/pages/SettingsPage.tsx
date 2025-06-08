import React from 'react';
import NavigationMenu from '@/components/layout/NavigationMenu';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const settingsSchema = z.object({
  fullName: z.string().min(2, { message: "Full name must be at least 2 characters." }),
  email: z.string().email({ message: "Invalid email address." }),
  enableNotifications: z.boolean().default(false),
  darkMode: z.boolean().default(false),
});

type SettingsFormValues = z.infer<typeof settingsSchema>;

const SettingsPage: React.FC = () => {
  console.log('SettingsPage loaded');

  const { register, handleSubmit, formState: { errors }, watch, setValue } = useForm<SettingsFormValues>({
    resolver: zodResolver(settingsSchema),
    defaultValues: {
      fullName: 'Demo User',
      email: 'demo@example.com',
      enableNotifications: true,
      darkMode: false,
    }
  });

  const onSubmit: SubmitHandler<SettingsFormValues> = (data) => {
    console.log('Settings saved:', data);
    // Here you would typically call an API to save the settings
    alert('Settings saved successfully! (Check console for data)');
  };

  const enableNotifications = watch('enableNotifications');
  const darkMode = watch('darkMode');


  return (
    <div className="flex min-h-screen bg-background">
      <NavigationMenu />
      <div className="flex-1 flex flex-col ml-64">
        <Header pageTitle="Settings" />
        <main className="flex-grow p-6">
          <div className="max-w-2xl mx-auto space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>Update your personal details.</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div>
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input id="fullName" {...register('fullName')} />
                    {errors.fullName && <p className="text-sm text-red-500 mt-1">{errors.fullName.message}</p>}
                  </div>
                  <div>
                    <Label htmlFor="email">Email Address</Label>
                    <Input id="email" type="email" {...register('email')} />
                    {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>}
                  </div>
                  
                  <CardTitle className="pt-4">Preferences</CardTitle>
                   <CardDescription>Customize your dashboard experience.</CardDescription>
                  
                  <div className="flex items-center justify-between pt-2">
                    <Label htmlFor="enableNotifications" className="flex flex-col space-y-1">
                      <span>Email Notifications</span>
                      <span className="font-normal leading-snug text-muted-foreground">
                        Receive updates and alerts via email.
                      </span>
                    </Label>
                    <Switch
                      id="enableNotifications"
                      checked={enableNotifications}
                      onCheckedChange={(checked) => setValue('enableNotifications', checked)}
                    />
                  </div>
                   {errors.enableNotifications && <p className="text-sm text-red-500 mt-1">{errors.enableNotifications.message}</p>}

                  <div className="flex items-center justify-between">
                     <Label htmlFor="darkMode" className="flex flex-col space-y-1">
                      <span>Dark Mode</span>
                      <span className="font-normal leading-snug text-muted-foreground">
                        Enable the dark theme for the dashboard.
                      </span>
                    </Label>
                    <Switch
                      id="darkMode"
                      checked={darkMode}
                      onCheckedChange={(checked) => setValue('darkMode', checked)}
                    />
                  </div>
                  {errors.darkMode && <p className="text-sm text-red-500 mt-1">{errors.darkMode.message}</p>}
                  
                  <div className="pt-4">
                    <Button type="submit">Save Changes</Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default SettingsPage;