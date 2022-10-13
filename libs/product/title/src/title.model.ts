export interface ProductTitleOptions {
  /**
   * Specifies the html tag that is used to render the title.
   *
   * On a PDP, the product title is most likely rendered in a H1 to
   * get the best indexing from search engines. However, at other
   * places, the title might be rendered in a H3 or different.
   */
  tag?: string;

  /**
   * Indicates whether the text should truncate after a number of lines.
   */
  truncateAfter?: number;

  /**
   * Indicates whether to generate a link to the Product Detail Page.
   */
  link?: boolean;
}
