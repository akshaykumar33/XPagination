/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [allDatas, setAllDatas] = useState([]);
  const [pageDatas, setPageDatas] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [disabledPrev, setDisabledPrev] = useState(true);
  const [disabledNext, setDisabledNext] = useState(false);

  const itemsPerPage = 10;

  useEffect(() => {
    fetch('https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json')
      .then((res) => {
        if (!res.ok) {
          alert('failed to fetch data');
        }
        return res.json();
      })
      .then((data) => {
        setAllDatas(data);
        updatePageData(data, currentPage);
      })
      .catch((err) => console.log("Error while fetching employees", err));
  }, [currentPage]);

  useEffect(() => {
    setDisabledPrev(currentPage === 1);
    setDisabledNext(currentPage === Math.ceil(allDatas.length / itemsPerPage));
  }, [currentPage, allDatas.length]);

  const updatePageData = (data, page) => {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    setPageDatas(data.slice(startIndex, endIndex));
  };

  const handlePrevious = () => {
    setCurrentPage(currentPage - 1);
  };

  const handleNext = () => {
    setCurrentPage(currentPage + 1);
  };

  return (
    <>
      <div className="card">
        <h1>Employee Data Table</h1>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {pageDatas.map((d) => (
              <tr key={d.id}>
                <td>{d.id}</td>
                <td>{d.name}</td>
                <td>{d.email}</td>
                <td>{d.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className='pagination'>
          <button onClick={handlePrevious} disabled={disabledPrev}>Previous</button>
          <p>{currentPage}</p>
          <button onClick={handleNext} disabled={disabledNext}>Next</button>
        </div>
      </div>
    </>
  );
}

export default App;
