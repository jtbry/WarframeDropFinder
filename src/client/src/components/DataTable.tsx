import { useState } from 'react';

interface DataTableProps {
  data: any[];
  keys?: string[];
  transformFieldValue?: { [key: string]: (value: any) => any };
  className?: string;
  rowsPerPage?: number;
}

interface DataTableState {
  page: number;
}

function DataTable(props: DataTableProps) {
  const [state, setState] = useState<DataTableState>({ page: 0 });
  const keys = props.keys ? props.keys : Object.keys(props.data[0]);

  // Paginate data if needed
  let displayData = props.data;
  if (props.rowsPerPage) {
    // Paginate data
    const start = state.page * props.rowsPerPage;
    let end = start + props.rowsPerPage;
    if (end > props.data.length) {
      end = props.data.length;
    }
    displayData = props.data.slice(start, end);
  }

  const changePageValueBy = (value: number) => {
    if (!props.rowsPerPage) return;
    const proposedStart = (state.page + value) * props.rowsPerPage;
    const proposedEnd = proposedStart + props.rowsPerPage;
    if (
      proposedStart < 0 ||
      proposedEnd > props.data.length + props.rowsPerPage
    )
      return;
    setState({ page: state.page + value });
  };

  return (
    <div
      className={`relative overflow-x-auto shadow-md sm:rounded-lg ${props.className}`}
    >
      <table className="w-full text-sm text-left text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-primary-50 border-b">
          <tr>
            {keys.map((key, index) => (
              <th key={index} scope="col" className="px-6 py-3">
                {key}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {displayData.map((row, index) => {
            return (
              <tr key={index} className="bg-primary-100 border-b">
                {keys.map((key, index) => {
                  let value = row[key];
                  if (
                    props.transformFieldValue &&
                    props.transformFieldValue[key]
                  )
                    value = props.transformFieldValue[key](value);
                  return (
                    <td key={index} className="px-6 py-4 whitespace-no-wrap">
                      {value}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      {props.rowsPerPage && (
        <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between p-4 bg-primary-50">
          <div>
            <p className="text-sm text-gray-700">
              Showing {state.page * props.rowsPerPage} to{' '}
              {state.page * props.rowsPerPage + props.rowsPerPage >
              props.data.length
                ? props.data.length
                : state.page * props.rowsPerPage + props.rowsPerPage}{' '}
              of {props.data.length} results
            </p>
          </div>
          <div>
            <nav
              className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
              aria-label="Pagination"
            >
              <button
                className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                onClick={() => changePageValueBy(-1)}
              >
                Previous
              </button>
              <button
                className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                onClick={() => changePageValueBy(1)}
              >
                Next
              </button>
            </nav>
          </div>
        </div>
      )}
    </div>
  );
}

export default DataTable;
