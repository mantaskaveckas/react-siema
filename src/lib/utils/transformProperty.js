export default (() => {
    if (typeof document === 'undefined') return;

    const { transform } = document.documentElement.style;
    if (typeof transform === 'string') {
        return 'transform';
    }
    return 'WebkitTransform';
})();
