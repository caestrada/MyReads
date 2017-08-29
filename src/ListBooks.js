import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import * as api from './BooksAPI';
import BooksGrid from './BooksGrid';

class ListBooks extends Component {
  state = {
    books: []
  }

  changeShelf = (event, bookId) => {
    const booksUpdated = this.state.books.map(book => {
      if(book.id === bookId) {
        book.bookShelf = event.target.value;
      }
      return book;
    });

    this.setState({ books: booksUpdated })
  }

  componentDidMount() {
    api.getAll()
    .then( (books) => {
      const updatedBooks = books.map((book) => {
        book.bookShelf = 'currentlyReading';        
        return book;
      });

      this.setState({
        books: updatedBooks
      })
    });
  }

  render() {
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Currently Reading</h2>
              <div className="bookshelf-books">
                <BooksGrid 
                  shelf="currentlyReading"
                  books={this.state.books} 
                  toggleBookShelf={this.changeShelf}
                />
              </div>
            </div>

            <div className="bookshelf">
              <h2 className="bookshelf-title">Want to Read</h2>
              <div className="bookshelf-books">
                <BooksGrid 
                  shelf="wantToRead"
                  books={this.state.books}
                  toggleBookShelf={this.changeShelf}
                />
              </div>
            </div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Read</h2>
              <div className="bookshelf-books">
                <BooksGrid 
                  shelf="read"
                  books={this.state.books}
                  toggleBookShelf={this.changeShelf}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="open-search">
          <Link to="/search">Add a book</Link>
        </div>
      </div>
    )
  }
}

export default ListBooks