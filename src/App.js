import React from 'react';
import { Route } from 'react-router-dom';
import ListBooks from './ListBooks';
import SearchBooks from './SearchBooks';
import * as BooksAPI from './BooksAPI';
import './App.css'

class BooksApp extends React.Component {
  state = {
    books: []
  }

  componentDidMount() {
    BooksAPI.getAll()
    .then( books => {
      console.log('books', books);
      this.setState({books: books})
    });
  }

  updateBookShelf = (book, shelf) => {
    BooksAPI.update(book, shelf)
    .then(res => {
      return BooksAPI.getAll();
    })
    .then( books => {
      this.setState({books: books})
    });
  }

  render() {
    return (
      <div className="app">
        <Route 
          path="/" exact 
          render={(props) => <ListBooks books={this.state.books} updateBookShelf={this.updateBookShelf} />} 
        />
        <Route path="/search" component={SearchBooks} />
      </div>
    )
  }
}

export default BooksApp
