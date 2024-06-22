'use-client';

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { toast } from '@/components/ui/use-toast';
import { deleteShortcut } from '@/lib/actions';
import { ShortcutType } from '@/lib/types';

export function ButtonsActions({ shortcut }: { shortcut: ShortcutType }) {
  console.log('---  🚀 ---> | shortcut:', shortcut);

  const handleDeleteShortcut = async (id: string) => {
    await deleteShortcut(id);
    window.location.reload();
  };

  return (
    <div>
      <AlertDialogCancel
        onClick={() => {
          toast({
            title: 'Operation Cancelled! ❌',
            description: `Phew! 😮‍💨 Crisis averted. You successfully cancelled the operation.`,
            variant: 'destructive',
          });
        }}
      >
        Cancel
      </AlertDialogCancel>
      <AlertDialogAction
        onClick={() => {
          if (shortcut) {
            handleDeleteShortcut(shortcut.id);
            console.log('DELETED WAS CLICKED');
            toast({
              title: 'Asset gone! 💀',
              description: `The Shortcut ${shortcut.name} has been successfully deleted!`,
              variant: 'dark',
            });
          }
        }}
      >
        Continue
      </AlertDialogAction>
    </div>
  );
}
