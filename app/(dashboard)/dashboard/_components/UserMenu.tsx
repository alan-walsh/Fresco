'use client';

import { Loader } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { trpc } from '~/app/_trpc/client';
import { Button } from '~/components/ui/Button';
import { useSession } from '~/contexts/SessionPrivider';

const UserMenu = () => {
  const router = useRouter();

  const { mutate: doSignout, isLoading: isSigningOut } =
    trpc.signOut.useMutation({
      onSuccess: () => {
        router.push('/');
      },
    });

  const { session, isLoading } = useSession();

  return (
    <div className="flex flex-row items-center gap-6">
      {isLoading ? 'Loading...' : session.user.username}
      <Button
        onClick={() => void doSignout()}
        disabled={isLoading || isSigningOut}
      >
        {isSigningOut && <Loader className="mr-2 h-4 w-4 animate-spin" />}
        Sign out
      </Button>
    </div>
  );
};

export default UserMenu;
