import { Link } from 'react-router-dom';
import PartialItem from '../models/PartialItem';
import CardBackground from './CardBackground';

function ItemCardPreview({
  item,
  className,
}: {
  className?: string;
  item: PartialItem;
}) {
  return (
    <Link to={`/Item?uniqueName=${item.uniqueName}`}>
      <CardBackground className={`text-center ${className}`}>
        <img
          alt={item.name}
          src={`https://cdn.warframestat.us/img/${item.imageName}`}
          className="w-16 h-16 text-sm mx-auto m-2"
        />
        <h1 className="text-xl font-bold">{item.name}</h1>
      </CardBackground>
    </Link>
  );
}

export default ItemCardPreview;
