const oldData = (data) => {
  const oldDataObj = {
    title: data.title,
    subtitle: data.subtitle,
    date: data.date,
    time: data.time,
    address: data.address,
    url: data.url,
    alt: data.alt,
  };
  return oldDataObj;
};

export { oldData };
