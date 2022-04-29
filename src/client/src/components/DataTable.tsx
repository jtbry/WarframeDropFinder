interface DataTableProps {
  data: any[];
  keys?: string[];
  transformFieldValue?: { [key: string]: (value: any) => any };
  className?: string;
}

function DataTable(props: DataTableProps) {
  const keys = props.keys ? props.keys : Object.keys(props.data[0]);

  return (
    <div
      className={`relative overflow-x-auto shadow-md sm:rounded-lg ${props.className}`}
    >
      <table className="w-full text-sm text-left text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-primary-50 border-b">
          <tr>
            {keys.map((key) => (
              <th scope="col" className="px-6 py-3">
                {key}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {props.data.map((row) => {
            return (
              <tr className="bg-primary-100 border-b">
                {keys.map((key) => {
                  let value = row[key];
                  if (
                    props.transformFieldValue &&
                    props.transformFieldValue[key]
                  )
                    value = props.transformFieldValue[key](value);
                  return (
                    <td className="px-6 py-4 whitespace-no-wrap">{value}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default DataTable;
