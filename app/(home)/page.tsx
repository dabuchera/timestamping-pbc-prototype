import Link from 'next/link';

import { Button, buttonVariants } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { cn } from '@/lib/utils';

export default function IndexPage() {
  return (
    <>
      <section className="space-y-6 pt-32">
        <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
          {/* <Button
            onClick={() =>
              toast({
                title: 'Scheduled: Catch up',
                description: 'Friday, February 10, 2023 at 5:57 PM',
                variant: 'success',
              })
            }
          >
            Test Button
          </Button> */}
          <h1 className="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl">An example app built using Next.js 13 server components.</h1>
          <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
            I&apos;m building a web app with Next.js 13 and open sourcing everything. Follow along as we figure this out together.
          </p>
          <div className="space-x-4">
            <Link href="/login" className={cn(buttonVariants({ size: 'lg' }))}>
              Get Started
            </Link>
            <Link href="/login" target="_blank" rel="noreferrer" className={cn(buttonVariants({ variant: 'outline', size: 'lg' }))}>
              GitHub
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
