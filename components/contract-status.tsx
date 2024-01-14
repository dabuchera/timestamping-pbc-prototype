'use client'

import Link from 'next/link';
import { useEffect, useState } from 'react';

import { ContractOperations } from '@/components/contract-operations';
import { Skeleton } from '@/components/ui/skeleton';
import { handleVerify } from '@/lib/dcrtime';
import { cn, formatDate, getStatus } from '@/lib/utils';
import { Contract } from '@prisma/client';

import { Icons } from './icons';
import { toast } from './ui/use-toast';

interface ContractStatusProps {
  contract: Pick<Contract, 'id' | 'digest'>
}

export function ContractStatus({ contract }: ContractStatusProps) {
  const [status, setStatus] = useState<string>('Loading');

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      if (contract.digest.length === 0) {
        setStatus('Not Timestamped');
        return;
      }

      try {
        const verifyRes = await handleVerify([{ digest: contract.digest, id: contract.id, payload: 'null' }]);
        console.log(verifyRes)
        if (isMounted) {
          const newStatus = getStatus(verifyRes.digests[0]);
          setStatus(newStatus);
        }
      } catch (error) {
        console.error('Error fetching contract status:', error);
        setStatus('Error');
      }
    };

    // Fetch data immediately when mounted
    fetchData();

    // Poll for data every 30 seconds
    const intervalId = setInterval(fetchData, 30000);

    // Clean up when unmounted
    return () => {
      isMounted = false;
      clearInterval(intervalId);
    };
  }, [contract.digest]);

  const renderStatusIcon = () => {
    switch (status) {
      case 'Timestamped':
        return <Icons.timestamped className="mr-2 h-4 w-4" />;
      case 'Awaiting Anchoring Time':
        return <Icons.spinner className="animate-spin mr-2 h-4 w-4" />;
      case 'Pending':
        return <Icons.loader className="animate-spin mr-2 h-4 w-4" />;
      case 'Not Timestamped':
        return <Icons.nottimestamped className="mr-2 h-4 w-4" />;
      default:
        return null;
    }
  };

  const renderLink = () => {
    if (status === 'Not Timestamped') {
      return (
        <span className="group flex items-center rounded-md px-3 py-2 text-sm font-medium cursor-default">
          {renderStatusIcon()}
          <span>{status}</span>
        </span>
      );
    }

    return (
      <Link href="" onClick={onClick}>
        <span
          className={cn(
            'group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:text-accent-foreground',
            // Always
            true ? 'hover:bg-accent' : 'cursor-default'
          )}
        >
          {renderStatusIcon()}
          <span>{status}</span>
        </span>
      </Link>
    );
  };

  const onClick = async () => {
    if (contract.digest) {
      try {
        const verifyRes = await handleVerify([{ digest: contract.digest, id: contract.id, payload: 'null' }]);
        console.log(verifyRes);
        const stat = getStatus(verifyRes.digests[0]);
        console.log(stat);
      } catch (error) {
        console.error('Error verifying contract:', error);
        toast({
          title: 'Verification Error',
          description: 'There was an error while verifying the contract.',
          variant: 'destructive',
        });
      }
    }
  };

  return <>{renderLink()}</>;
}
