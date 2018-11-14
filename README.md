# Gatsby Tutorials

[Gatsby Tutorials](https://www.gatsbytutorials.com) is a website that aims to list every GatsbyJS learning resource currently available online. 🎉

You can find tutorials that interest you in several ways:

- **Browse** the list (recent tutorials are listed first) 👀
- **Search** for specific words or phrases 🕵️‍♀️
- **Filter** by format (🎧, ✍️ or 📺)
- **Filter** by topic 🤷‍♂️
- **Filter** by author 👩‍🏫
- **Filter** by source 🗞️

Notice a tutorial is missing from the list? Please add it! 🙏

## How do I add a tutorial?

The easiest approach is to use the make your changes here on the GitHub website:

1. **Open** the [`src/data/tutorials.yml` file on GitHub](https://github.com/ooloth/gatsby-tutorials/blob/master/src/data/tutorials.yml) 📂
2. Use the **file editor** to add a new tutorial (or edit existing ones) ✏️
3. **Preview** your changes 👓
3. **Commit** your changes 👍
4. Create a **pull request** 📤

**Please follow this format and indentation:**

```yaml
- title: 'GatsbyJS: How to Create the Fastest Sites in the World'
  link: https://www.youtube.com/watch?v=Gtd-Ht-D0sg
  format: video
  language: en
  date: 2017-10-01
  length: '24:52'
  authors: 
    - Kyle Mathews
  source: ReactNext 2017
  topics:
    - introduction
    - performance
```

- `title` - Title of tutorial (`string`; required)
- `link` - Working URL where tutorial can be found (`string`; required)
- `format` - Media format of tutorial (`string` with the value `video`, `audio` or `text`; required)
- `language` - Spoken/written language of the tutorial (`string` with a two-letter [ISO 639-1 language code](https://en.wikipedia.org/wiki/List_of_ISO_639-1_codes); required)
- `date` - Date tutorial was originally published (`string` in `YYYY-MM-DD` format; optional)
- `length` - Length of tutorial, if applicable (`string`; optional)
- `authors` - Name of author(s) or speaker(s) (`array` of `strings`; optional)
- `source` - Name of YouTube channel, podcast, conference, blog, etc. if different from author's name (`string`; optional)
- `topics` - Main topic(s) covered by the tutorial (`array` of `strings`; required)

Where possible, please add tutorial series as one entry with a link to the series homepage.

## Coming Soon

### Better filters 🏷

- [ ] Filter tutorials by language
- [ ] Filter by multiple topics at once
- [ ] Cancel active filter by clicking it again

### Better performance ⚡️

- [ ] Paginate tutorials (and search results)
- [ ] Generate filter lists at build time

### Better search 🕵️‍♂️

- [ ] Implement fuzzy search to allow non-sequential search terms
- [ ] Highlight search string in search results

---

Happy learning! 🤓