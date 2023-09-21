import { Check } from 'lucide-react';
import { useState } from 'react';
import ProtocolUploader from '~/app/(dashboard)/dashboard/_components/ProtocolUploader';
import { Button } from '~/components/ui/Button';
import { Switch } from '~/components/ui/switch';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

function ManageParticipants() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentStep = searchParams.get('step') as string;
  const [participantsUploaded, setParticipantsUploaded] = useState(false);
  const router = useRouter();

  const handleParticipantsUploaded = () => {
    setParticipantsUploaded(true);
    // will be replaced with participants uplodaing handling participants upload
  };

  const handleNextStep = () => {
    router.replace(`${pathname}?step=${parseInt(currentStep) + 1}`);
  };

  const allowAnonymousRecruitment = () => {
    // will be replaced with switch handling
  };

  return (
    <div className="max-w-[30rem]">
      <div className="mb-4 flex flex-col">
        <h1 className="text-3xl font-bold">Configure Participation</h1>
        <p className="mb-4 mt-4">
          You can now optionally upload a CSV file containing the details of
          participants you wish to recruit for your study. You can also choose
          to allow anonymous recruitment of participants. Both options can be
          configured later from the dashboard.
        </p>
      </div>
      <div className="mb-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-bold">Anonymous Recruitment</h3>
            <p className="text-sm text-gray-600">
              Allow anonymous recruitment of participants.
            </p>
          </div>
          <Switch onCheckedChange={allowAnonymousRecruitment} />
        </div>
      </div>
      <div className="mb-4">
        <div className="flex justify-between">
          <div>
            <h3 className="font-bold">Upload Participants</h3>
            <p className="text-sm text-gray-600">
              Upload a CSV file of participants.
            </p>
          </div>
          {participantsUploaded && <Check />}
        </div>
        {!participantsUploaded && <ProtocolUploader />}
        {!participantsUploaded && (
          <button onClick={handleParticipantsUploaded}>Confirm Uploaded</button>
        )}
      </div>
      <div className="flex justify-start">
        <Button onClick={handleNextStep}>
          {participantsUploaded ? 'Next' : 'Skip'}
        </Button>
      </div>
    </div>
  );
}

export default ManageParticipants;
