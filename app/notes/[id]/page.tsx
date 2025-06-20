import { fetchNoteById } from '@/lib/api';
import NoteDetailsClient from './NoteDetails.client';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';

type NoteDetailsProps = {
  params: Promise<{ id: number }>;
};

const NoteDetails = async ({ params }: NoteDetailsProps) => {
  const res = await params;

  const queryClient = new QueryClient();

  queryClient.prefetchQuery({
    queryKey: ['note', res.id],
    queryFn: () => fetchNoteById(res.id),
  });

  return (
    <div>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <NoteDetailsClient />
      </HydrationBoundary>
    </div>
  );
};

export default NoteDetails;
