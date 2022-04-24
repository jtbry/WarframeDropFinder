import Component from './Component';
import DropSource from './DropSource';
import Patchlog from './Patchlog';

interface Item {
  uniqueName: string;
  name: string;
  description: string;
  category: string;
  tradable: boolean;
  wikiaUrl: string;
  imageName: string;
  vaulted: boolean;
  patchlogs: Patchlog[];
  drops: DropSource[];
  components: Component[];
}

export default Item;
