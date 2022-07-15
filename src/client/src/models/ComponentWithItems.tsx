import Component from './Component';
import PartialItem from './PartialItem';

export default interface ComponentWithItems {
  component: Component;
  items: PartialItem[];
}
