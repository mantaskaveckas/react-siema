export default (() => {
    const { transform } = document.documentElement.style;
    if (typeof transform === 'string') {
        return 'transform';
    }
    return 'WebkitTransform';
})();
