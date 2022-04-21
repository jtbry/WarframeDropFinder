import PartialItem from '../models/PartialItem';

function ItemRowPreview(props: { item: PartialItem }) {
  const { item } = props;
  return (
    <a
      href={`Item${item.uniqueName}`}
      className="flex flex-row items-center p-2 space-x-4 content-middle hover:bg-primary-700"
    >
      <img
        alt={item.name}
        src={`https://cdn.warframestat.us/img/${item.imageName}`}
        className="w-10 h-10 text-sm"
      />
      <p className="text-lg">{item.name}</p>
      {/* TODO: tags */}
    </a>
  );
}

export default ItemRowPreview;
