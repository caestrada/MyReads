import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import BooksGrid from './BooksGrid';
import * as BooksAPI from './BooksAPI'

class SearchBooks extends Component {
  state = {
    query: '',
    books: []
  }

  queryBooks = (query) => {
    this.setState({ query: query }, () => {
      if(query === '') {
        this.setState({ books: [] })
      }
      else {
        const myBooks_promise = BooksAPI.getAll();
        const mySearch_promise = BooksAPI.search(query, 100);

        Promise.all([
          myBooks_promise,
          mySearch_promise
        ])
        .then( data => {
          const myBooks = data[0];
          const mySearch = data[1];
          return mySearch
            .filter(book => {
              let showBook = true;
              myBooks.forEach((b) => {
                if(b.id === book.id) { showBook = false; }
              });
              return showBook;
            })
            .map(book => {
              book.shelf = 'none';
              return book;
            });
        })
        .then(books => {
          this.setState({ books: books });
        })
        .catch(err => {
          this.setState({ books: [] })
        })
      }
    });
  }

  addBook = (event, book) => {
    this.props.updateBookShelf(book, event.target.value);
    setTimeout(() => { this.queryBooks(this.state.query); }, 100);
  }

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">Close</Link>
          <div className="search-books-input-wrapper">
            <input 
              type="text" 
              placeholder="Search by title or author"
              value={this.state.query}
              onChange={(event) => (this.queryBooks(event.target.value))}
            />
            
          </div>
        </div>
        <div className="search-books-results">
          <BooksGrid 
            shelf="none"
            books={this.state.books}
            toggleBookShelf={this.addBook}
          />
        </div>
      </div>
    )
  }
}

export default SearchBooks