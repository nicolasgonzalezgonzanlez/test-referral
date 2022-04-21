import { Router } from 'express';
import { Request, Response, NextFunction } from 'express';
import { authRestrict } from '../middleware';
import { ok } from '../../constants/statusCode';
import applicationSetting from '../controller/applicationSettingController'
// @ts-ignore
//import logger from '@telecom-argentina/logger';

const router: Router = Router();
const controller = new applicationSetting();


router.post('/',  async (req: Request, res: Response, next: NextFunction) => {
  try {
    const responseDto = await controller.insertApplicationSettings(req.body);
    res.status(ok).json(responseDto);
  } catch (ex) {
    next(ex);
  }
});



router.get('/',  async (req: Request, res: Response, next: NextFunction) => {
  try {
    const responseDto = await controller.getAllApplicationSettings();
    res.status(ok).json(responseDto);
  } catch (ex) {
    next(ex);
  }
});


export = router;
