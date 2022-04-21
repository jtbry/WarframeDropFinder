import { useSearchParams } from 'react-router-dom';

function ItemPage() {
  const [searchParams] = useSearchParams();
  const uniqueName = searchParams.get('uniqueName');
  return <h1>Hello {uniqueName}</h1>;
}

export default ItemPage;
