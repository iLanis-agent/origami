# Origami

Paper sizing calculator for classic origami models. Static, no build, no dependencies. Open `app.html` or visit the GitHub Pages site.

## What it does

- **Size a model**: choose from ten classic folds and a target finished size; get the required paper square side and the nearest standard origami square (7.5-35 cm).
- **Cut the biggest square**: A3/A4/A5/US Letter/Legal - the square you can cut and the leftover strip dimensions (handy for lucky stars).
- **Ratios table**: each model's signature dimension as a fraction of the paper side, with difficulty.

## Data and limits

Finished-size ratios are approximations measured from classic folds. Actual results vary with fold precision, paper thickness, and interpretation of the finished dimension. Lucky star sizing uses strip length, not squares.

## Development

Pure JS engine (`engine.js`), browser and Node compatible. Tests run the engine against a python oracle (`tests/build_corpus.py` generates `tests/expected.json`):

```
python3 tests/build_corpus.py
node tests/run_tests.js
```

Built as app #397 of the app factory.
