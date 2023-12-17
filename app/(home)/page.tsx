
import Link from 'next/link';

import { Icons } from '@/components/icons';
import { Button, buttonVariants } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { cn } from '@/lib/utils';
import { ReloadIcon } from '@radix-ui/react-icons';

export default async function IndexPage() {
  return (
    <>
      <section className="space-y-6 pt-32">
        <div className="container flex max-w-[64rem] flex-col items-center gap-4 text-center">
          <h1 className="font-heading text-3xl sm:text-5xl md:text-6xl lg:text-7xl">An example app built using Next.js 13 server components.</h1>
          <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
            I&apos;m building a web app with Next.js 13 and open sourcing everything. Follow along as we figure this out together.
          </p>
          <div className="space-x-4">
            <Link href="/login" className={cn(buttonVariants({ size: 'lg' }))}>
              Get Started
            </Link>
            <Button variant="outline" size="lg">
              <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
              Please wait
            </Button>
            <Link href="/login" target="_blank" rel="noreferrer" className={cn(buttonVariants({ variant: 'outline', size: 'lg' }))}>
              GitHub
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
