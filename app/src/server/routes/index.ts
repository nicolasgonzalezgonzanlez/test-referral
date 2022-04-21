import { Router } from 'express';

import health from './health';
import applicationSetting from './applicationSetting.routes';


import { notFound, errorHandler } from '../middleware';

const router: Router = Router();

router.use('/health', health);
router.use('/api/applicationSetting', applicationSetting)


router.use(errorHandler);
router.get('*', notFound);

export = router;
