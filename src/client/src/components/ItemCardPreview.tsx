import { Link } from 'react-router-dom';
import PartialItem from '../models/PartialItem';

function ItemCardPreview({
  item,
  className,
}: {
  className?: string;
  item: PartialItem;
}) {
  return (
    <Link to={`/Item?uniqueName=${item.uniqueName}`}>
      <div className={`bg-primary-200 p-2 rounded-md text-center ${className}`}>
        <img
          alt={item.name}
          src={`https://cdn.warframestat.us/img/${item.imageName}`}
          className="w-16 h-16 text-sm mx-auto m-2"
        />
        <h1 className="text-xl font-bold">{item.name}</h1>
      </div>
    </Link>
  );
}

export default ItemCardPreview;
