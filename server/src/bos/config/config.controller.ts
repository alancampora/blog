import { Request, Response } from 'express';
import { Config } from './config.model';
import { IUser } from '@common/User';

interface AuthRequest extends Request {
  user?: IUser;
}


export const updateOrCreateConfig = async (req: AuthRequest, res: Response): Promise<void> => {

  console.log('updateOrCreateConfig');

  const { id } = req.params;
  const { blogName, active } = req.body;
  const userId = (req as any).user.id;

  console.log('updateOrCreateConfig', req.body);

  try {
    let isBlogNameTaken = await Config.findOne({ blogName });

    if (isBlogNameTaken) {
      return res.status(400).json({ message: 'Blog name already taken' });
    }

    let config = await Config.findOneAndUpdate(
      { userId },
      { blogName, active },
      { new: true, runValidators: true }
    );

    console.log('config', config);

    if (config) {
      res.json(config);
    }

    if (!config) {
      config = new Config({
        _id: id,
        blogName,
        active,
        userId
      });

      await config.save();

      res.status(201).json(config); // Return 201 status for created
    }

  } catch (error) {
    res.status(500).json({ message: 'Error updating or creating blog', error: error.message });
  }
};

export const getConfig = async (req: AuthRequest, res: Response): Promise<void> => {
  const userId = (req as any).user.id;

  try {
    const config = await Config.findOne({ userId });

    if (!config) {
      return res.status(404).json({ message: 'Config not found' });
    }

    res.json(config);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching config', error: error.message });
  }
};
