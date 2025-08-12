import { Request, Response, NextFunction } from 'express';
import { ObjectSchema} from 'joi';

export const validate = (schema: ObjectSchema) => (req: Request, res: Response, next: NextFunction) => {
  return(req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req.body);

    if (error) {
      const errors = error.details.map(detail => detail.message);
      return res.status(400).json({ errors });
    };

    next();
  };
};