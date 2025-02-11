import { toast } from '@/components/ui/toast';

export function handleError(error: unknown) {
  if (error instanceof Error) {
    toast({
      title: 'Error',
      description: error.message,
      variant: 'destructive',
    });
  } else {
    toast({
      title: 'Error',
      description: 'An unexpected error occurred',
      variant: 'destructive',
    });
  }
  console.error(error);
} 