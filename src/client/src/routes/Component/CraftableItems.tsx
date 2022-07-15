import { useNavigate } from 'react-router-dom';
import CardBackground from '../../components/CardBackground';
import DataTable from '../../components/DataTable';
import PartialItem from '../../models/PartialItem';

interface CraftableItemsProps {
  data: PartialItem[];
}

export default function CraftableItems({ data }: CraftableItemsProps) {
  const navigate = useNavigate();

  if (data.length === 0) return <></>;
  return (
    <CardBackground className="w-full md:w-1/2">
      <div className="flex flex-col space-y-1">
        <h1 className="text-xl font-bold">Craftable Items</h1>
        <DataTable
          data={data}
          keys={['imageName', 'name', 'category']}
          transformFieldValue={{
            imageName: (value: string, root: PartialItem) => (
              <img
                alt={root.name}
                src={`https://cdn.warframestat.us/img/${value}`}
                className="w-10 h-10 text-sm"
              />
            ),
          }}
          rowsPerPage={10}
          headerAlias={{ imageName: 'Image' }}
          clickableRows={(row: PartialItem) =>
            navigate(`/Item?uniqueName=${row.uniqueName}`)
          }
        />
      </div>
    </CardBackground>
  );
}
