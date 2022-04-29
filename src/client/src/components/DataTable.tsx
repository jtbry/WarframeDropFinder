interface DataTableProps {
  data: any[];
  keys?: string[];
  transformDisplayHeader?: (header: string) => string;
  transformFieldValue?: { [key: string]: (value: any) => any };
}

function DataTable(props: DataTableProps) {
  const keys = props.keys ? props.keys : Object.keys(props.data[0]);
  const displayHeaders = keys.map((header, index) =>
    props.transformDisplayHeader ? (
      <th key={index}>{props.transformDisplayHeader(header)}</th>
    ) : (
      <th key={index}>{header}</th>
    )
  );

  return (
    <div className="overflow-x-auto">
      <div className="py-2 inline-block min-w-full">
        <div className="overflow-hidden rounded-t-md">
          <table className="min-w-full text-left bg-primary-50">
            <thead className="border-b border-primary-400">
              <tr>{displayHeaders}</tr>
            </thead>
            <tbody>
              {props.data.map((row) => (
                <tr className="border-b border-primary-400">
                  {keys.map((key) => {
                    let displayValue = row[key];
                    if (
                      props.transformFieldValue &&
                      props.transformFieldValue[key]
                    )
                      displayValue =
                        props.transformFieldValue[key](displayValue);
                    return <td>{displayValue}</td>;
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default DataTable;
