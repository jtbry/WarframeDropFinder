import Component from './Component';
import PartialItem from './PartialItem';

interface ComponentWithItems {
  component: Component;
  items: PartialItem[];
}

export default ComponentWithItems;
