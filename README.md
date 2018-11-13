# Gatsby Tutorials

[Gatsby Tutorials](https://www.gatsbytutorials.com) is a website that lists every GatsbyJS learning resource currently available online. 🎉

You can find tutorials that interest you in several ways:

- **Browse** the list (recent tutorials are listed first) 👀
- **Search** for specific words or phrases 📝
- **Filter** by format (🎧, ✍️ or 📺)
- **Filter** by topic 🤷‍♂️
- **Filter** by author 👩‍🏫
- **Filter** by source 🗞️

Know of a GatsbyJS tutorial that is missing from the list? Please add it! 🙏

## How do I add a tutorial?

1. Add it to `src/data/tutorials.yml` 📜
2. Submit a pull request. 📤

**Please use this format and indentation:**

```yaml
- title: 'GatsbyJS: How to Create the Fastest Sites in the World'
  link: https://www.youtube.com/watch?v=Gtd-Ht-D0sg
  format: video
  date: 2017-10-01
  length: '24:52'
  author: Kyle Mathews
  source: ReactNext 2017
  topics:
    - performance
```

- `title` - Title of tutorial (`string`; required)
- `link` - Working URL where tutorial can be found (`string`; required)
- `format` - Media format of tutorial (`string` with the value `video`, `audio` or `text`; required)
- `date` - Date tutorial was originally published (`string` in `YYYY-MM-DD` format; required)
- `length` - Length of tutorial, if applicable (`string`; optional)
- `author` - Name of author or speaker (`string`; required)
- `source` - Name of YouTube channel, podcast, conference, blog, etc. if different from the author's name (`string`; optional)
- `topics` - Array of primary topics covered by the tutorial (`array` of `strings`; optional)

---

Happy learning! 🤓