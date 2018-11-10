/*

PreCSS is powered by the following plugins (in this order):

1. postcss-extend-rule
2. postcss-advanced-variables
3. postcss-preset-env
4. postcss-atroot
5. postcss-property-lookup
6. postcss-nested

*/

module.exports = {
  plugins: [
    require(`precss`),
    require(`tailwindcss`)(`./src/styles/tailwind.js`),
    require(`autoprefixer`)()
  ]
}
