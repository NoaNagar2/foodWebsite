const newData = (data) => {
  const newDataInput = {
    name: data.name,
    description: data.description,
    category: data.category,
    Ingredients: data.Ingredients,
    steps: data.steps,
    level: data.level,
    url: data.url,
    alt: data.alt,
  };
  return newDataInput;
};

export { newData };
