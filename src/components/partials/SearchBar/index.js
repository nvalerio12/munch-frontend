import { useState } from "react";
import { Button, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import './searchBar.css';
import axios from "axios";

const { REACT_APP_SERVER_URL } = process.env;

const SearchBar = (props) => {

  const [results, setResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  // Autocomplete Search
  const handleInputChange = e => {
    setSearchQuery(e.target.value);
    const query = e.target.value;
    // Don't want empty querys;
    if (query === '') return setResults([]);

    const url = `${REACT_APP_SERVER_URL}/find?search=${query}`

    axios
      .get(url)
      .then(response => {
        const { results } = response.data;
        setResults(results);
        setIsLoading(false);
      })
      .catch(error => {
        console.error(error);
        setIsLoading(false);
      });
  }

  // When Focused, Show when there are no search results
  const handleFocus = e => {
    setIsSearching(true);
    setIsLoading(true);
    setResults([]);
  }

  // When not focused, remove that line.
  const handleBlur = e => {
    setIsSearching(false);
    e.target.value= "";
  }

  let resultArray = results.map(result => {
    
    // No social aspect, therefore no user results.
    if (result.type === 'user') {
      return undefined;
    }

    return (
      <Link to={`/feed?search=${result.word}`}>
        <li className="list-group-item search-item d-flex justify-content-between">
          <span className="text-capitalize">{result.word}</span>
          <span className="text-capitalize">Type: {result.type}</span>
        </li>
      </Link>
    );
  });

  if (resultArray.length < 1 && isSearching && !isLoading) {
    resultArray = (
      <li className="list-group-item search-item d-flex justify-content-between">
        <span>None Found!</span>
      </li>
    );
  } else if (isLoading && isSearching) {
    resultArray = (
      <li className="list-group-item search-item d-flex justify-content-between">
          <strong>Loading...</strong>
          <div className="spinner-border ms-auto" role="status" aria-hidden="true"></div>
      </li>
    )
  }

  return (
    <div className="hp-search-container">
      <Row>
        <Col className="px-0">
          <input
            onFocus={handleFocus}
            onBlur={handleBlur}
            onChange={handleInputChange}
            type="text"
            placeholder="Restaurant or Category"
            className="hp-search"
          />
          <ul className="list-group autocomplete-target position-absolute">
            {resultArray}
          </ul>
        </Col>
        <Col className="px-0">
          <Link to={`/feed?search=${searchQuery}`}>
            <button className="outline-success hp-search-btn">
              Let's Find Food
            </button>
          </Link>
        </Col>
      </Row>
    </div>
  );
}

export default SearchBar;