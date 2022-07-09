import CardBackground from '../../components/CardBackground';
import DataTable from '../../components/DataTable';
import Patchlog from '../../models/Patchlog';

interface PatchlogTableProps {
  data: Patchlog[];
}

export default function PatchlogTable({ data }: PatchlogTableProps) {
  if (data.length === 0) return <></>;
  return (
    <CardBackground className="w-full md:w-1/2">
      <div className="flex flex-col space-y-1">
        <h1 className="text-xl font-bold">Patchlogs</h1>
        <DataTable
          data={data}
          keys={['name', 'date']}
          rowsPerPage={5}
          transformFieldValue={{
            date: (value: any) => new Date(value).toLocaleDateString(),
            name: (value: string, root: Patchlog) => (
              <a
                className="hover:text-blue-400"
                href={root.url}
                target="_blank"
                rel="noreferrer"
              >
                {value}
              </a>
            ),
          }}
        />
      </div>
    </CardBackground>
  );
}
