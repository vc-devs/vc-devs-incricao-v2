export const cleanUp = (value: string) => {
  return value.toString().replace(/\D/g, '');
};
