
export interface HoverExpandItem {
  id: string | number;
  label: string;
  year: string;
  image: string;
  alt?: string;
}

export interface HoverExpandProps {
  /** Array of items to display. Defaults to the 17 showcase items */
  items?: HoverExpandItem[];
  /** Initially active (expanded) index. Defaults to 15 */
  defaultActiveIndex?: number;
  /** Active index controlled externally */
  activeIndex?: number;
  /** Callback fired whenever the expanded item changes */
  onActiveChange?: (index: number, item: HoverExpandItem) => void;
  /** Optional custom CSS class for the outermost container */
  className?: string;
  /** Custom width for expanded card on desktop (defaults to '28rem') */
  expandedWidth?: string;
  /** Custom width for collapsed card on desktop (defaults to '4rem') */
  collapsedWidth?: string;
  /** Custom height for expanded card on mobile (defaults to '500px') */
  expandedHeightMobile?: string;
  /** Custom height for collapsed card on mobile (defaults to '4rem') */
  collapsedHeightMobile?: string;
}

export type Skiper35Props = HoverExpandProps;
