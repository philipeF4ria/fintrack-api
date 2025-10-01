export const badRequest = (body) => {
  return {
    statusCode: 400,
    body,
  };
};

export const created = (body) => {
  return {
    statusCode: 201,
    body,
  };
};

export const internalServerError = (body) => {
  return {
    statusCode: 500,
    body,
  };
};
