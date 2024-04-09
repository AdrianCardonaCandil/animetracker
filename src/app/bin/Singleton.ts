const singleton= (() => {
  let instance: any;
  return (fn: any) => {
    if (!instance) instance = fn();
    return instance;
  };
})();

export default singleton;
