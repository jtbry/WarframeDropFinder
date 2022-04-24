import { Link } from 'react-router-dom';
import PartialItem from '../models/PartialItem';

function ItemCardPreview({ item }: { item: PartialItem }) {
  console.log(item);
  return (
    <div className="bg-primary-600 p-2 rounded-md text-center">
      <img
        alt={item.name}
        src={`https://cdn.warframestat.us/img/${item.imageName}`}
        className="w-16 h-16 text-sm mx-auto m-2"
      />
      <Link
        to={`/Item?uniqueName=${item.uniqueName}`}
        className="text-xl font-bold"
      >
        {item.name}
      </Link>
    </div>
  );
}

export default ItemCardPreview;
