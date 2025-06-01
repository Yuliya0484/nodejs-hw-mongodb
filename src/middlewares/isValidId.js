import { isValidObjectId } from 'mongoose';
import createHttpError from 'http-errors';

export function isValidId(req, _res, next) {
  const { contactId } = req.params;

  if (!isValidObjectId(contactId)) {
    return next(createHttpError.BadRequest('ID is not valid'));
  }

  next();
}
