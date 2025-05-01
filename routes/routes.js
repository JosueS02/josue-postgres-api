const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');



const configurarRutas = (router, controller, dbType) => {
    

    router.post('/', controller.createDriver);
    router.get('/', controller.getAllDrivers);
    router.get('/:id', controller.getDriverById);
    router.put('/:id', controller.updateDriver);
    router.delete('/:id', controller.deleteDriver);

    return router;
};

module.exports = {
    configurarRutas
};
