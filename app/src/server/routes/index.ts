import { Router } from 'express';

import health from './health';
import example from './applicationSettings.routes';


import { notFound, errorHandler } from '../middleware';

const router: Router = Router();

router.use('/health', health);
router.use('/api/applicationSettings', example)


router.use(errorHandler);
router.get('*', notFound);

export = router;
