# ReactSiema - Lightweight and simple carousel for React

ReactSiema is a lightweight carousel plugin for React. It's a wrapper based on decent library [Siema](https://github.com/pawelgrzybek/siema).

## Demo

- [ReactSiema](https://kaveckas.github.io/react-siema/)

## Download on npm

- [ReactSiema package on npm](https://www.npmjs.com/package/react-siema)

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

## Options

Component comes with some default settings, that can be adjusted via props.

```
resizeDebounce: 250
duration: 200
easing: 'ease-out'
perPage: 1
startIndex: 0
draggable: true
threshold: 20
loop: false
```

Example of passing custom options:

```
const Slide = (props) => <img {...props} alt="slide" />

const options = {
    duration: 500,
    loop: true
}

const App = () => <ReactSiema {...options}>
    <Slide src="#" />
    <Slide src="#" />
    <Slide src="#" />
</ReactSiema>
```

## API

Most of the API comes from [Siema](https://github.com/pawelgrzybek/siema) library mentioned above.

- `next()` - go to next slide
- `prev()` - go to previous slide
- `goTo(index)` - go to a specific slide
- `currentSlide` - index of the current active slide (read only)

## Example of API usage

API is accessible via refs.

```
const Slide = (props) => <img {...props} alt="slide" />

const App = () => {
    let slider
    
    return (
        <div>
            <ReactSiema ref={siema => slider = siema}>
                <Slide src="#" />
                <Slide src="#" />
                <Slide src="#" />
            </ReactSiema>
            <button onClick={() => slider.prev()}>prev</button>
            <button onClick={() => slider.next()}>next</button>
        </div>
    )
}
```
