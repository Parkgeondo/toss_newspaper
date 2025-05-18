const Interpolation = (setter, currentValue, target) => {
  const animate = () => {
    const distance = target - currentValue;
    const step = distance * 0.2;

    const nextValue = currentValue + step;

    if (Math.abs(distance) < 1) {
      setter(target);
      return;
    }

    setter(nextValue);
    requestAnimationFrame(() => animate(setter, nextValue, target));
  };

  animate();
};

export default Interpolation;