import React, { useCallback, useState, useEffect } from 'react';
import DataTable from 'react-data-table-component';
import Spinner from './Spinner';
import { useDebounce } from 'use-debounce';

interface Props {
  newFetch: (duration: string) => void;
}

const Search: React.FC<Props> = ({ newFetch }) => {

  const getAuthors = (authors: string[] = []) => {
    // in some responses the author_name array is null or undefined
    if (!authors || authors.length === 0) {
      return '';
    }
    // author_name is returned as an array, assume multiple authors 
    return authors.length > 1 ? authors.join(', ') : authors[0];
  };

  interface Document {
    author_name: string[];
    title: string;
    edition_count: number;
    first_publish_year: number;
  }
    
  const columns = [
      {
          name: 'Author',
          selector: (row: { author_name: string[]; }) => getAuthors(row?.author_name),
          sortable: true,
      },
      {
          name: 'Title',
          selector: (row: { title: string; }) => row.title,
          sortable: true,
      },
      {
          name: 'Editions',
          selector: (row: { edition_count: number; }) => row.edition_count,
          sortable: true,
      },
      {
          name: 'First published',
          selector: (row: { first_publish_year: number; }) => row.first_publish_year,
          sortable: true,
      },
  ];

  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedQuery] = useDebounce(searchTerm, 500);

  const handleBookQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    console.log('handleBookQuery', value)
    setSearchTerm(value);
  };

  const refetchBooks = (event: React.MouseEvent<HTMLButtonElement>) => fetchBooks()

  const [rows, setRows] =  useState<Document[]>([])
  const [page, setPage] = useState<number>(1);
  const [perPage, setPerPage] = useState<number>(25);
  const [totalRows, setTotalRows] = useState<number>(0);

  const [pending, setPending] = useState(false);
  const [error, setError] = useState('');

  const fetchBooks = useCallback(async () => {
    if (!searchTerm) return;
    const startTime = performance.now();
    setPending(true)
    try {
      const response = await fetch(`https://openlibrary.org/search.json?q=${searchTerm}&page=${page}&limit=${perPage}`);
      const data = await response.json();
      const endTime = performance.now();
      const duration = ((endTime - startTime) / 1000).toFixed(2);  // fetch time in seconds as string
      setTotalRows(data.numFound)
      setRows(data.docs);
      newFetch(duration)
      setPending(false)
      setError('');
    } catch (err) {
      setError('Error fetching data from Open Library');
    }
  }, [debouncedQuery, page, perPage]);

  //Add 500 ms debounce before fetching books
  useEffect(() => {
    if (debouncedQuery) {
      fetchBooks()
    }
  }, [debouncedQuery, fetchBooks]);


  return (
    <div className="search-container">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search for books..."
          className="search-input"
          value={searchTerm}
          onChange={handleBookQuery}
        />
        <button onClick={refetchBooks} className="button">Search</button>
      </div>

      <div className="table">
          <DataTable
            columns={columns}
            data={rows}
            fixedHeader
            pagination
            noDataComponent={<div>No data available</div>}
            progressPending={pending}
            paginationDefaultPage={1}
            paginationPerPage={perPage}
            paginationTotalRows={totalRows}
            paginationRowsPerPageOptions={[10, 25, 50]}
            onChangePage={(page: number) => {
              setPage(page);
              fetchBooks();
            }}
            onChangeRowsPerPage={(newPerPage: number) => {
              setPerPage(newPerPage);
              setPage(1)
              fetchBooks();
            }}
          />
      </div>
      {pending && <Spinner />}
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default Search;
