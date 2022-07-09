import { Link } from 'react-router-dom';
import PartialItem from '../models/PartialItem';
import CardBackground from './CardBackground';

interface ItemCardPreviewProps {
  item: PartialItem;
  className?: string;
}

export default function ItemCardPreview({
  item,
  className,
}: ItemCardPreviewProps) {
  return (
    <Link to={`/Item?uniqueName=${item.uniqueName}`} className={`${className}`}>
      <CardBackground className={`text-center`}>
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
