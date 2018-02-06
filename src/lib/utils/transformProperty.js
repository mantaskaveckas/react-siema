export default (() => {
    const transform = typeof window !== 'undefined' && window.document.documentElement.style.transform;
    if (typeof transform === 'string') {
        return 'transform';
    }
    return 'WebkitTransform';
})();
