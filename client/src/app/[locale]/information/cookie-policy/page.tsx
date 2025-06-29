'use client';
import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Card, CardContent } from '@/components/ui/card';
import { AlertTriangle, Info } from 'lucide-react';

type HeadingTag = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

interface SectionTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  as?: HeadingTag;
  children: React.ReactNode;
}

const SectionTitle: React.FC<SectionTitleProps> = ({
  children,
  className = '',
  as: Tag = 'h2',
  ...props
}) => {
  const HeadingTag = Tag as React.ElementType;
  
  return (
    <HeadingTag 
      className={`text-xl font-semibold text-primary mt-8 mb-4 ${className}`}
      {...props}
    >
      {children}
    </HeadingTag>
  );
};

const CookiePolicy: React.FC = () => {
  const lastUpdated = 'June 7, 2025';

  return (
    <>
      <Head>
        <title>Cookie Policy - Minas Phone</title>
        <meta
          name="description"
          content="Learn about how Minas Phone uses cookies on our website to improve your browsing experience."
        />
        <meta name="robots" content="index, follow" />
      </Head>

      <div className="container max-w-5xl mx-auto py-8 px-4">
        <Card className="p-6 md:p-8 mb-6">
          <CardContent className="p-0">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold mb-2">Cookie Policy</h1>
              <p className="text-lg text-muted-foreground">Minas Phone</p>
              <p className="text-sm text-muted-foreground mt-1">
                Last updated: {lastUpdated}
              </p>
            </div>

            <Alert className="mb-6">
              <Info className="h-5 w-5" />
              <AlertTitle>Information</AlertTitle>
              <AlertDescription>
                This Cookie Policy explains how Minas Phone uses cookies and similar
                technologies when you visit our website at www.minasphone.gr
              </AlertDescription>
            </Alert>

            <hr className="my-6 border-border" />

            <SectionTitle>What Are Cookies?</SectionTitle>
            <p className="text-foreground mb-4">
              Cookies are small text files that are placed on your computer or
              mobile device when you visit a website. They are widely used to make
              websites work more efficiently and to provide information to website
              owners.
            </p>

            <SectionTitle>How We Use Cookies</SectionTitle>
            <p className="text-foreground mb-4">
              We use cookies to enhance your browsing experience, analyze website
              traffic, and understand where our visitors are coming from. The
              cookies we use fall into the following categories:
            </p>

            <div className="rounded-md border overflow-hidden my-6">
              <div className="w-full">
                <div className="grid grid-cols-4 bg-primary text-primary-foreground p-2 font-semibold">
                  <div>Cookie Type</div>
                  <div>Purpose</div>
                  <div>Duration</div>
                  <div>Required</div>
                </div>
                <div className="divide-y">
                  <div className="grid grid-cols-4 p-2 gap-2">
                    <div>
                      <span className="inline-flex items-center rounded-full bg-destructive/10 px-2.5 py-0.5 text-xs font-medium text-destructive">
                        Essential
                      </span>
                    </div>
                    <div>
                      Necessary for the website to function properly. These
                      cookies enable basic website functionality.
                    </div>
                    <div>Session/Persistent</div>
                    <div>
                      <span className="inline-flex items-center rounded-full bg-destructive/10 px-2.5 py-0.5 text-xs font-medium text-destructive">
                        Yes
                      </span>
                    </div>
                  </div>
                  <div className="grid grid-cols-4 p-2 gap-2">
                    <div>
                      <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                        Analytics
                      </span>
                    </div>
                    <div>
                      Help us understand how visitors interact with our website by
                      collecting and reporting information anonymously.
                    </div>
                    <div>Up to 2 years</div>
                    <div>
                      <span className="inline-flex items-center rounded-full bg-success/10 px-2.5 py-0.5 text-xs font-medium text-success">
                        No
                      </span>
                    </div>
                  </div>
                  <div className="grid grid-cols-4 p-2 gap-2">
                    <div>
                      <span className="inline-flex items-center rounded-full bg-secondary/10 px-2.5 py-0.5 text-xs font-medium text-secondary-foreground">
                        Performance
                      </span>
                    </div>
                    <div>
                      Allow us to count visits and traffic sources to measure and
                      improve website performance.
                    </div>
                    <div>Up to 1 year</div>
                    <div>
                      <span className="inline-flex items-center rounded-full bg-success/10 px-2.5 py-0.5 text-xs font-medium text-success">
                        No
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <SectionTitle>Third-Party Cookies</SectionTitle>
            <p className="text-foreground mb-4">
              We use Google Analytics to analyze website usage and improve our
              services. Google Analytics uses cookies to collect information about
              your use of our website.
            </p>

            <div className="bg-muted/50 p-6 rounded-lg my-6">
              <h3 className="text-lg font-semibold mb-4">Google Analytics Cookies</h3>
              <ul className="space-y-3 mb-4">
                <li>
                  <p className="font-medium">_ga</p>
                  <p className="text-sm text-muted-foreground">Distinguishes unique users. Expires after 2 years.</p>
                </li>
                <li>
                  <p className="font-medium">_ga_[ID]</p>
                  <p className="text-sm text-muted-foreground">Used to persist session state. Expires after 2 years.</p>
                </li>
                <li>
                  <p className="font-medium">_gid</p>
                  <p className="text-sm text-muted-foreground">Distinguishes users. Expires after 24 hours.</p>
                </li>
              </ul>
              <p className="text-sm text-muted-foreground">
                For more information about Google Analytics cookies, visit:{' '}
                <Link
                  href="https://developers.google.com/analytics/devguides/collection/analyticsjs/cookie-usage"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  Google Analytics Cookie Usage
                </Link>
              </p>
            </div>

            <SectionTitle>Managing Your Cookie Preferences</SectionTitle>
            <p className="text-foreground mb-4">
              You can control and manage cookies in various ways:
            </p>

            <ul className="space-y-4 mb-6">
              <li>
                <p className="font-medium">Browser Settings</p>
                <p className="text-muted-foreground text-sm">
                  Most web browsers allow you to control cookies through their settings preferences.
                </p>
              </li>
              <li>
                <p className="font-medium">Opt-out Tools</p>
                <p className="text-muted-foreground text-sm">
                  You can opt-out of Google Analytics by installing the Google Analytics Opt-out Browser Add-on.
                </p>
              </li>
              <li>
                <p className="font-medium">Third-party Tools</p>
                <p className="text-muted-foreground text-sm">
                  Various third-party tools are available to help you manage cookies across different websites.
                </p>
              </li>
            </ul>

            <Alert variant="destructive" className="my-6">
              <AlertTriangle className="h-5 w-5" />
              <AlertTitle>Note</AlertTitle>
              <AlertDescription>
                Please note that disabling cookies may affect the functionality of
                our website and your user experience may be limited.
              </AlertDescription>
            </Alert>

            <SectionTitle>Updates to This Policy</SectionTitle>
            <p className="text-foreground mb-6">
              We may update this Cookie Policy from time to time to reflect
              changes in our practices or for other operational, legal, or
              regulatory reasons. We will notify you of any material changes by
              posting the updated policy on our website.
            </p>

            <SectionTitle>Contact Information</SectionTitle>
            <p className="text-foreground mb-4">
              If you have any questions about this Cookie Policy or our use of
              cookies, please contact us:
            </p>

            <div className="bg-primary/5 p-6 rounded-lg mt-4">
              <p className="font-medium mb-2">Minas Phone</p>
              <p className="text-muted-foreground text-sm">
                Address: Dimitrakopoulou 87, Athens - Koukaki 11741, Attika, Greece
              </p>
              <p className="text-muted-foreground text-sm">
                Website: www.minasphone.gr
              </p>
            </div>

            <hr className="my-8 border-border" />

            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                This policy is effective as of {lastUpdated} and was last updated
                on {lastUpdated}.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default CookiePolicy;
