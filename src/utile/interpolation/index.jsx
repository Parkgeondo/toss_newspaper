const Interpolation = (element, target) => {
  const animate = () => {
    const current = element.scrollTop;
    const distance = target - current;
    const step = distance * 0.2; // 부드러운 이동 비율

    if (Math.abs(distance) < 1) {
      element.scrollTop = target; // 도달 시 종료
      return;
    }

    element.scrollTop = current + step;

    requestAnimationFrame(animate);
  };

  animate();
};

export default Interpolation;