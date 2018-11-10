# Component classes

_Add custom component classes to this folder (they will be imported by styles.css)_

## Tips

1. Don't extract components until necessary (i.e. the same cluster is reused elsewhere). Avoid premature optimization!

2. If this file gets too long, move component classes to separate files.

3. Name component classes as universally as possible (to maximize reuse).

4. Use `@apply` to compose components out of existing utility classes.

5. Use `@screen` to create media queries that reference my custom breakpoints

   * see: https://tailwindcss.com/docs/functions-and-directives#screen

6. Don't bake layout styles into reusable components that would need to be overriden later (e.g. margins, positioning, height/width).

   * see: https://www.youtube.com/watch?v=XR6eM_5pAb0 (at 19:30)
   * (If I want to keep the layout styles consistent, try extracting them into their own modifier component...)
