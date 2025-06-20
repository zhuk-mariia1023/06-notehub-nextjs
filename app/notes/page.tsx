import { fetchNotes } from '@/lib/api';
import NotesClient from './Notes.client';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';

export default async function NotesPage() {
  const queryClient = new QueryClient();
  const initialPage = 1;
  const initialQuery = '';

  await queryClient.prefetchQuery({
    queryKey: ['notes', initialQuery, initialPage],
    queryFn: () => fetchNotes(initialPage, initialQuery),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <main>
        <h1>Notes</h1>
        <NotesClient initialQuery={initialQuery} initialPage={initialPage} />
      </main>
    </HydrationBoundary>
  );
}
