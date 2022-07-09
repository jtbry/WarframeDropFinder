import { Link } from 'react-router-dom';
import CardBackground from '../../components/CardBackground';
import DataTable from '../../components/DataTable';
import Component from '../../models/Component';
import Item from '../../models/Item';

interface ComponentTableProps {
  data: Component[];
  parent: Item;
}

export default function ComponentTable({ data, parent }: ComponentTableProps) {
  if (data.length === 0) return <></>;
  return (
    <CardBackground className="w-full md:w-1/2">
      <div className="flex flex-col space-y-1">
        <h1 className="text-xl font-bold">Components</h1>
        <DataTable
          data={data}
          keys={['name', 'itemCount', 'tradable']}
          headerAlias={{ itemCount: 'Item Count' }}
          transformFieldValue={{
            name: (value: any, root: Component) => (
              <Link
                className="hover:text-blue-400"
                to={`/Component?uniqueName=${root.uniqueName}&parent=${parent.uniqueName}`}
              >
                {value}
              </Link>
            ),
            tradable: (value: any) => (value ? 'YES' : 'NO'),
          }}
        />
      </div>
    </CardBackground>
  );
}
