'use client'

import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';

export default function IndexPage() {
  return (
    <div>
      <h1>This is the testing Page</h1>
      <Button
        onClick={() =>
          toast({
            title: 'Scheduled: Catch up',
            description: 'Friday, February 10, 2023 at 5:57 PM',
            variant: 'success',
          })
        }
      >
        Test Button
      </Button>
    </div>
  )
}
