const express = require("express");
const router = express.Router();

// Route handler for the root path ('/')
router.get('/', (req, res) => {
    res.send('Express app is running');
});

module.exports = router;