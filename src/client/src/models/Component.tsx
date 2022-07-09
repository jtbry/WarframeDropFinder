import DropSource from './DropSource';

export default interface Component {
  uniqueName: string;
  name: string;
  description: string;
  imageName: string;
  tradable: boolean;
  itemCount: number;
  drops: DropSource[];
}
