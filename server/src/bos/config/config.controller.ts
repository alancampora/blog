import { Request, Response } from 'express';
import Config from './config.model';
import { IUser } from '@common/User';

interface AuthRequest extends Request {
  user?: IUser;
}


export const updateOrCreateConfig = async (req: AuthRequest, res: Response): Promise<void> => {

  console.log('updateOrCreateConfig');

  const { id } = req.params;
  const { handle, active, theme, blogTitle, blogDescription } = req.body;
  const userId = req.user?._id;

  console.log('updateOrCreateConfig', req.body);

  try {
    let handleTakenByUser = await Config.findOne({ handle });

    console.log('handleTakenByUser', handleTakenByUser);
    console.log('userId', userId);

    if (handleTakenByUser && handleTakenByUser.userId.toString() !== userId.toString()) {
      res.status(400).json({ message: 'Handle already taken' });
      return;
    }

    let config = await Config.findOneAndUpdate(
      { userId },
      { handle, active, theme, blogTitle, blogDescription },
      { new: true, runValidators: true }
    );

    console.log('config', config);

    if (config) {
      res.json(config);
    }

    if (!config) {
      config = new Config({
        _id: id,
        handle,
        active,
        theme: null,
        userId,
        blogTitle,
        blogDescription
      });

      await config.save();

      res.status(201).json(config); // Return 201 status for created
    }

  } catch (error) {
    res.status(500).json({ message: 'Error updating or creating blog', error: error.message });
  }
};

export const getConfig = async (req: AuthRequest, res: Response): Promise<void> => {
  console.log('getConfig');
  console.log(req.user);
  const userId = req.user?._id;

  try {
    const config = await Config.findOne({ userId });

    if (!config) {
      res.status(404).json({ message: 'Config not found' });
      return;
    }

    res.json(config);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching config', error: error.message });
  }
};

export const updateConfig = async (req: AuthRequest, res: Response): Promise<void> => {

  const { id } = req.params;
  const { handle, active, theme, blogTitle, blogDescription } = req.body;
  const userId = req.user?._id;

  let config = await Config.findOneAndUpdate(
    { userId, _id: id },
    { handle, active, theme, blogTitle, blogDescription },
    { new: true, runValidators: true }
  );

  await config.save();

  res.status(200).json(config);

}
