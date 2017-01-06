# ReactSiema - Lightweight and simple carousel for React

ReactSiema is a lightweight carousel plugin for React. It's a wrapper based on decent library [Siema](https://github.com/pawelgrzybek/siema).

## Setup

```
npm install react-siema --save
```

```
import ReactSiema from 'react-siema'

const Slide = (props) => <img {...props} alt="slide" />

const App = () => <ReactSiema>
  <Slide src="#" />
  <Slide src="#" />
  <Slide src="#" />
</ReactSiema>
```
If you want to run a demo:

- Clone the repo
- run ```npm install```
- run ```npm start```, which will setup a development server with sample gallery

## API

Most of the API comes from [Siema](https://github.com/pawelgrzybek/siema) library mentioned above.

- `next()` - go to next slide
- `prev()` - go to previous slide
- `goTo(index)` - go to a specific slide
- `currentSlide` - index of the current active slide (read only)
