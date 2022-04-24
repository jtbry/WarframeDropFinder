import DropSource from './DropSource';

interface Component {
  uniqueName: string;
  name: string;
  description: string;
  imageName: string;
  tradable: boolean;
  itemCount: number;
  drops: DropSource[];
}

export default Component;
