import { useState } from 'react';

interface DataTableProps {
  data: any[];
  keys?: string[];
  transformFieldValue?: { [key: string]: (value: any, root: any) => any };
  headerAlias?: { [key: string]: string };
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
      proposedEnd > props.data.length + props.rowsPerPage - 1
    )
      return;
    setState({ page: state.page + value });
  };

  return (
    <div
      className={`relative overflow-x-auto shadow-md sm:rounded-lg ${props.className}`}
    >
      <table className="w-full text-sm text-left">
        <thead className="text-xs uppercase bg-primary-50 dark:bg-primary-900 border-b dark:border-b-slate-700">
          <tr>
            {keys.map((key, index) => (
              <th key={index} scope="col" className="px-6 py-3">
                {props.headerAlias && props.headerAlias[key]
                  ? props.headerAlias[key]
                  : key}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {displayData.map((row, index) => {
            return (
              <tr
                key={index}
                className="bg-primary-100 dark:bg-primary-800 border-b dark:border-b-slate-700"
              >
                {keys.map((key, index) => {
                  let value = row[key];
                  if (
                    props.transformFieldValue &&
                    props.transformFieldValue[key]
                  )
                    value = props.transformFieldValue[key](value, row);
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
        <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between p-4 bg-primary-50 dark:bg-primary-900">
          <div>
            <p className="text-sm">
              Showing {state.page * props.rowsPerPage + 1} to{' '}
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
                className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-primary-800 text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-700"
                onClick={() => changePageValueBy(-1)}
              >
                Previous
              </button>
              <button
                className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-primary-800 text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-700"
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
