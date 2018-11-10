# Plugin styles

_Add custom styles for third-party plugins to this folder (they will be imported by styles.css)_

## Tips

1. Add plugin styles to separate files (by plugin)

2. Use `@apply` to style plugins using existing utility classes (add `!important` as needed)

   * see: https://tailwindcss.com/docs/functions-and-directives#apply

3. Use `@screen` to create media queries that reference my custom breakpoints

   * see: https://tailwindcss.com/docs/functions-and-directives#screen

4. Scope styles to specific plugin instances using an `id` or `data-attribute`
