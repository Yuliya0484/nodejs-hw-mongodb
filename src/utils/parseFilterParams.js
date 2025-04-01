const parseContactType = (type) => {
  const isString = typeof type === 'string';
  if (!isString) return;

  const isValidType = ['work', 'home', 'personal'].includes(type);
  if (isValidType) return type;
};

const parseBoolean = (value) => {
  if (value === 'true') return true;
  if (value === 'false') return false;
  return;
};

export const parseFilterParams = (query) => {
  const { contactType, isFavourite } = query;

  const parsedType = parseContactType(contactType);
  const parsedIsFavourite = parseBoolean(isFavourite);

  return {
    contactType: parsedType,
    isFavourite: parsedIsFavourite,
  };
};
