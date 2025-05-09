import { redirect } from 'next/navigation';
import { resetAppSettings } from '~/actions/reset';
import { containerClasses } from '~/components/ContainerClasses';
import SubmitButton from '~/components/ui/SubmitButton';
import { env } from '~/env';
import { isAppExpired } from '~/queries/appSettings';

export default async function Page() {
  const isExpired = await isAppExpired();

  if (!isExpired) {
    redirect('/');
  }

  return (
    <div className={containerClasses}>
      <h1 className="mb-4 text-2xl font-bold">Installation expired</h1>
      <p className="mb-6">
        You did not configure this deployment of Fresco in time, and it has now
        been locked down for your security.
      </p>
      <p>
        Please redeploy a new instance of Fresco to continue using the software.
      </p>
      {env.NODE_ENV === 'development' && (
        <form action={() => void resetAppSettings()}>
          <SubmitButton className="mt-6 max-w-[20rem]" type="submit">
            Dev mode: Reset Configuration
          </SubmitButton>
        </form>
      )}
    </div>
  );
}
