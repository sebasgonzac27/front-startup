import { useState } from 'react';
import { Table, Pagination } from 'react-bootstrap';

function PaginatedTable({ data, itemsPerPage, renderRow, headers }) {
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const totalPageCount = Math.ceil(data.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedData = data.slice(startIndex, endIndex);

  return (
    <div className='table-responsive'>
      <Table striped bordered  responsive>
        <thead>
        <tr>
            <th>#</th>
            {headers.map((header, index) => (
              <th key={index}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {displayedData.map((item, index) => (
            <tr key={index}>
            <td>{startIndex + index + 1}</td>
            {renderRow(item)}
          </tr>
          ))}
        </tbody>
      </Table>
      <Pagination>
        {Array.from({ length: totalPageCount }).map((_, index) => (
          <Pagination.Item
            key={index}
            active={index + 1 === currentPage}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </Pagination.Item>
        ))}
      </Pagination>
    </div>
  );
}

export default PaginatedTable;