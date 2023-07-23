import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [todos, setTodos] = useState([]);
  const [postPerPage, setPostPerPage] = useState(15);
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(todos.length / postPerPage);

  const pages = [...Array(totalPages + 1).keys()].slice(1);

  const lastIndex = currentPage * postPerPage;
  const startIndex = lastIndex - postPerPage;
  const filterTodas = todos.slice(startIndex, lastIndex);

  // let pages = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const handlePrev = () => {
    if (currentPage != 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  const handleNext = () => {
    if (currentPage != pages.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/posts")
      .then((res) => setTodos(res.data));
  }, []);

  return (
    <div>
      <hr />
      <h1>Pagination</h1>
      <hr />
      {filterTodas.map((todo) => (
        <h4>{todo.title}</h4>
      ))}

      <div className="pagination">
        <hr />{" "}
        <span
          style={currentPage == 1 ? { color: "grey" } : {}}
          onClick={() => handlePrev()}
        >
          Prev
        </span>
        {pages.map((page) => (
          <span
            className={currentPage == page ? "active" : ""}
            onClick={() => setCurrentPage(page)}
          >
            {page}
          </span>
        ))}
        <span
          style={currentPage == pages.length ? { color: "grey" } : {}}
          onClick={() => handleNext()}
        >
          Next
        </span>
        <hr />
      </div>
    </div>
  );
}

export default App;
