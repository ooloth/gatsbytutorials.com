# Gatsby Tutorials

[Gatsby Tutorials](https://www.gatsbytutorials.com) is a website that aims to list every
GatsbyJS learning resource currently available online. 🎉

You can find tutorials that interest you in several ways:

- **Browse** the list (recent tutorials are listed first) 👀
- **Search** for specific words or phrases 🕵️‍♀️
- **Filter** by format (🎧, ✍️ or 📺)
- **Filter** by topic 🤷‍♂️
- **Filter** by author 👩‍🏫
- **Filter** by source 🗞️

Notice a tutorial is missing from the list? Please add it! 🙏

## How do I add a tutorial?

The easiest approach is to use the make your changes here on GitHub:

1. **Open** the [`src/data/tutorials.yml` file on GitHub](https://github.com/ooloth/gatsby-tutorials/blob/master/src/data/tutorials.yml) 📂
2. Use the **file editor** to add a new tutorial (or edit existing ones) ✏️
3. **Preview** your changes 👓
4. **Commit** your changes 👍
5. Create a **pull request** 📤

**Please follow this format and indentation:**

```yaml
- title: 'GatsbyJS: How to Create the Fastest Sites in the World'
  link: https://www.youtube.com/watch?v=Gtd-Ht-D0sg
  formats:
    - video
    - text
  language: en
  date: 2017-10-01
  authors:
    - Kyle Mathews
  source: ReactNext 2017
  topics:
    - introduction
    - performance
```

- `title` - Title of tutorial (`string`; required)
- `link` - Working URL where tutorial can be found (`string`; required)
- `formats` - Media format of tutorial (`array` of `strings` with values `video`,
  `audio` or `text`; required)
- `language` - Spoken/written language of the tutorial (`string` with a two-letter
  [ISO 639-1 language code](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes);
  required)
- `date` - Date tutorial was published (`string` in `YYYY-MM-DD` format; optional)
- `authors` - Name of author(s) or speaker(s) (`array` of `strings`; optional)
- `source` - Name of YouTube channel, podcast, conference, blog, etc. if different from
  author's name (`string`; optional)
- `topics` - Main topic(s) covered by the tutorial (`array` of `strings`; required)

### What if the tutorial is part of a series?

Rather than adding every tutorial in the series separately, please add the entire series
as one entry that links to the series homepage (or the first tutorial in the series).

## Coming Soon

### Better filters 🏷

- [ ] Filter tutorials by language
- [ ] Filter by multiple topics at once
- [x] ~Cancel active filter by clicking it again~

### Better performance ⚡️

- [x] ~Limit initial length of tutorials list~
- [x] ~Generate filter lists at build time~

### Better search 🕵️‍♂️

- [x] ~Allow non-sequential search terms~
- [ ] Highlight search terms in search results

---

Happy learning! 🤓
