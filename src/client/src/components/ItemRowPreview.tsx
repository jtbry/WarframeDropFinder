import { Link } from 'react-router-dom';
import PartialItem from '../models/PartialItem';

interface ItemRowPreviewProps {
  item: PartialItem;
}

function ItemTag({ tag }: { tag: string }) {
  return (
    <span className="inline-block bg-secondary-200 rounded-full px-3 py-1 text-sm font-semibold text-secondary-700 mr-2">
      {tag}
    </span>
  );
}

function ItemRowPreview(props: ItemRowPreviewProps) {
  const { item } = props;
  return (
    <Link
      to={`/Item?uniqueName=${item.uniqueName}`}
      className="flex flex-row items-center p-2 space-x-4 content-middle hover:bg-primary-700"
    >
      <img
        alt={item.name}
        src={`https://cdn.warframestat.us/img/${item.imageName}`}
        className="w-10 h-10 text-sm"
      />
      <p className="text-lg">{item.name}</p>
      <ItemTag tag={item.category} />
    </Link>
  );
}

export default ItemRowPreview;
