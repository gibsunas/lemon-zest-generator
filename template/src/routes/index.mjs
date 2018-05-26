import express from 'express';
var router = express.Router();

/* GET home page. */
router.get('/health', function(req, res) {
    res.status = 201;
    res.json({});
});

export default router;