# deduplicate-anki-cards

I often export cards from some websites or scrape them. This utility allows me to find duplicates and generate a .csv of stuff I only want to import - the diff.

```
npm run deduplicate
```

it assumes you have two files: base.csv and new.csv. It will generate new file - diff.csv.
It will compare second field of the entries, because it's my use case for now.
