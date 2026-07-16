import { MessageCircle } from 'lucide-react';

export const NoConversationFound = () => {
  return (
    <div className="flex flex-col items-center px-6 py-12 text-center">
      <div className="mb-3 flex size-10 items-center justify-center rounded-full bg-muted text-muted-foreground">
        <MessageCircle className="size-5" />
      </div>
      <p className="font-medium">Start the consultation</p>
      <p className="mt-1 max-w-md text-sm leading-6 text-muted-foreground">
        Use this thread to clarify requirements, scope, timing, and next steps.
      </p>
    </div>
  );
};
