let idCounter = 0;

const createAttribute = () => `data-hash-${idCounter++}`;
const getByAttribute = (attribute) => document.querySelector(`[${attribute}]`);

export const on = (eventName, handler) => {
  const attribute = createAttribute();

  requestAnimationFrame(() => {
    getByAttribute(attribute).addEventListener(eventName, handler);
  });

  return attribute;
};

export const onAppear = (handler) => {
  const attribute = createAttribute();

  requestAnimationFrame(() => {
    handler(getByAttribute(attribute));
  });

  return attribute;
};
