'use client';

import { useState } from 'react';
import { useDebounce } from 'use-debounce';
import { useQuery, keepPreviousData } from '@tanstack/react-query';

import SearchBox from '../../components/SearchBox/SearchBox';
import NoteList from '../../components/NoteList/NoteList';
import NoteModal from '../../components/NoteModal/NoteModal';
import Pagination from '../../components/Pagination/Pagination';

import { fetchNotes } from '@/lib/api';
import type { Note } from '@/types/note';

import css from './NotesPage.module.css';

type NotesClientProps = {
  initialQuery: string;
  initialPage: number;
};

export default function NotesClient({
  initialQuery,
  initialPage,
}: NotesClientProps) {
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [debouncedQuery] = useDebounce(searchQuery, 500);
  const [page, setPage] = useState(initialPage);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data, isLoading, isError } = useQuery<{
    notes: Note[];
    totalPages: number;
  }>({
    queryKey: ['notes', debouncedQuery, page],
    queryFn: () => fetchNotes(page, debouncedQuery),
    placeholderData: keepPreviousData
  });

  const handleSearch = (value: string) => {
    setSearchQuery(value);
    setPage(1);
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox value={searchQuery} onSearch={handleSearch} />
        <button className={css.button} onClick={openModal}>
          Create note +
        </button>
      </header>

      {!isLoading && !isError && (
        <>
          <NoteList notes={data?.notes ?? []} />

          {data?.totalPages && data.totalPages > 1 && (
            <Pagination
              page={page}
              totalPages={data.totalPages}
              onPageChange={setPage}
            />
          )}
        </>
      )}

      {isModalOpen && <NoteModal onClose={closeModal} />}
    </div>
  );
}
