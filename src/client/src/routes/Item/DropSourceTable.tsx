import { createPercent } from '../../api/Utilities';
import CardBackground from '../../components/CardBackground';
import DataTable from '../../components/DataTable';
import DropSource from '../../models/DropSource';

interface DropTableProps {
  data: DropSource[];
}

export default function DropSourceTable({ data }: DropTableProps) {
  if (data.length === 0) return <></>;
  return (
    <CardBackground className="w-full md:w-1/2">
      <div className="flex flex-col space-y-1">
        <h1 className="text-xl font-bold">Drop Sources</h1>
        <DataTable
          data={data.sort((a, b) => b.chance - a.chance)}
          keys={['chance', 'location', 'type']}
          transformFieldValue={{
            chance: (value: number) => `${createPercent(1, value, 2)}%`,
          }}
          rowsPerPage={10}
          headerAlias={{ location: 'Source' }}
        />
      </div>
    </CardBackground>
  );
}
