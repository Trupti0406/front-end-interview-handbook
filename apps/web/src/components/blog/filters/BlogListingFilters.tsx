import clsx from 'clsx';

import type { BlogLevel, BlogMetadata } from '~/components/blog/BlogTypes';
import type { BlogFilter } from '~/components/blog/filters/BlogFilterType';
import type { FilterItemGap } from '~/components/blog/filters/items/BlogListingFilterItem';
import BlogListingFilterItem from '~/components/blog/filters/items/BlogListingFilterItem';
import { themeBorderColor, themeDivideColor } from '~/components/ui/theme';

type Props = Readonly<{
  itemGap: FilterItemGap;
  levelFilterOptions: BlogFilter<BlogLevel, BlogMetadata>;
  levelFilters: Set<BlogLevel>;
  mode?: 'default' | 'framework';
  tagFilterOptions: BlogFilter<string, BlogMetadata>;
  tagFilters: Set<string>;
}>;

export default function BlogListingFilters({
  levelFilterOptions,
  levelFilters,
  tagFilterOptions,
  tagFilters,
  itemGap,
}: Props) {
  return (
    <form
      className={clsx(
        'flex flex-col divide-y border-y',
        themeBorderColor,
        themeDivideColor,
      )}>
      <BlogListingFilterItem
        itemGap={itemGap}
        section={levelFilterOptions}
        values={levelFilters}
      />
      <BlogListingFilterItem
        itemGap={itemGap}
        section={tagFilterOptions}
        values={tagFilters}
      />
    </form>
  );
}
