import { Link } from 'react-router-dom';
import PartialItem from '../models/PartialItem';
import BubbleLabel from './BubbleLabel';

interface ItemRowPreviewProps {
  item: PartialItem;
  onClick?: () => void;
}

function ItemRowPreview(props: ItemRowPreviewProps) {
  const { item, onClick } = props;
  return (
    <Link
      to={`/Item?uniqueName=${item.uniqueName}`}
      className="flex flex-row items-center p-2 space-x-4 content-middle hover:bg-primary-300 dark:hover:bg-primary-500"
      onClick={onClick}
    >
      <img
        alt={item.name}
        src={`https://cdn.warframestat.us/img/${item.imageName}`}
        className="w-10 h-10 text-sm"
      />
      <p className="text-lg">{item.name}</p>
      <BubbleLabel>{item.category}</BubbleLabel>
    </Link>
  );
}

export default ItemRowPreview;
