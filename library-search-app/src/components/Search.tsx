import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../state/store';
import { fetchBooks, setPage, setLimit } from '../state/books/booksSlice';
import DataTable from 'react-data-table-component';
import Spinner from './Spinner';
import { useDebounce } from 'use-debounce';

const Search = () => {
  const dispatch = useDispatch<AppDispatch>();
  const getAuthors = (authors: string[] = []) => {
    // in some responses the author_name array is null or undefined
    if (!authors || authors.length === 0) {
      return '';
    }
    // author_name is returned as an array, assume multiple authors 
    return authors.length > 1 ? authors.join(', ') : authors[0];
  };

  const { books, loading, error, page, totalRows, limit } = useSelector((state: RootState) => state.books);
    
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
    setSearchTerm(value);
  };

  const refetchBooks = (event: React.MouseEvent<HTMLButtonElement>) => dispatch(fetchBooks({ searchTerm, page, limit }));

  //add 500 ms input delay before fetching books
  useEffect(() => {
    if (debouncedQuery) {
      dispatch(fetchBooks({ searchTerm, page, limit }));
    }
  }, [debouncedQuery]);


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
            data={books}
            fixedHeader
            pagination
            paginationServer
            noDataComponent={<p>No data available</p>}
            progressPending={loading}
            paginationDefaultPage={page}
            paginationPerPage={limit}
            paginationTotalRows={totalRows}
            paginationRowsPerPageOptions={[10, 25, 50, 100]}
            onChangePage={(page: number) => {
              dispatch(setPage(page));
              dispatch(fetchBooks({ searchTerm, page: page, limit }));
            }}
            onChangeRowsPerPage={(newPerPage: number) => {
              dispatch(setLimit(newPerPage));
              dispatch(fetchBooks({ searchTerm, page, limit: newPerPage }))
            }}
          />
      </div>
      {loading && <Spinner />}
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default Search;
