import React from 'react';
import {useLocation} from '@docusaurus/router';
import DocCardList from '@theme/DocCardList';
import {useCurrentSidebarSiblings} from '@docusaurus/plugin-content-docs/client';

/**
 * DocCardList wrapper that filters out the card pointing to the current page.
 * Drop-in replacement: <FilteredDocCardList /> instead of <DocCardList />.
 */
export default function FilteredDocCardList(): React.JSX.Element {
  const items = useCurrentSidebarSiblings();
  const {pathname} = useLocation();

  const filtered = items.filter((item) => {
    if (item.type === 'link') {
      return item.href !== pathname;
    }
    if (item.type === 'category' && item.href) {
      return item.href !== pathname;
    }
    return true;
  });

  return <DocCardList items={filtered} />;
}
