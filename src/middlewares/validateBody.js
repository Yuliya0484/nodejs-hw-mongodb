import createHttpError from 'http-errors';

export function validateBody(schema) {
  return async (req, _res, next) => {
    try {
      await schema.validateAsync(req.body, {
        abortEarly: false,
      });
      next();
    } catch (error) {
      const errors = error.details.map((detail) => detail.message).join(', ');
      next(createHttpError(400, errors));
    }
  };
}
