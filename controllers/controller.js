const fs = require('fs');
const path = require('path');

const createDriverController = (Driver) => {
    return {
        createDriver: async (req, res) => {

            try {
                const { firstName, lastName, nationality, team, championshipsWon } = req.body;

                if (!firstName || !lastName || !nationality) {
                    return res.status(400).json({ error: 'First name, last name, nationality y date of birth son campos obligatorios' });
                }

                const newDriver = {
                    firstName,
                    lastName,
                    nationality,
                    team: team || null,
                    championshipsWon: championshipsWon || 0,
                };

                if (req.file) {
                    newDriver.photo = req.file.path; // Asumiendo que quieres almacenar una foto
                }

                const driver = await Driver.create(newDriver);
                res.status(201).json(driver);
            } catch (error) {
                console.error('Error al crear piloto:', error);
                res.status(500).json({ error: 'Error al crear el piloto' });
            }
        },

        getAllDrivers: async (req, res) => {
            try {
                const drivers = await Driver.findAll();
                res.status(200).json(drivers);
            } catch (error) {
                console.error('Error al obtener pilotos:', error);
                res.status(500).json({ error: 'Error al obtener los pilotos' });
            }
        },

        getDriverById: async (req, res) => {
            try {
                const { id } = req.params;
                const driver = await Driver.findByPk(id);

                if (!driver) {
                    return res.status(404).json({ error: 'Piloto no encontrado' });
                }

                res.status(200).json(driver);
            } catch (error) {
                console.error('Error al obtener piloto por ID:', error);
                res.status(500).json({ error: 'Error al obtener el piloto' });
            }
        },

        updateDriver: async (req, res) => {
            try {
                const { id } = req.params;
                const { firstName, lastName, nationality, team, championshipsWon } = req.body;

                const driver = await Driver.findByPk(id);

                if (!driver) {
                    return res.status(404).json({ error: 'Piloto no encontrado' });
                }

                const updatedData = {
                    firstName: firstName || driver.firstName,
                    lastName: lastName || driver.lastName,
                    nationality: nationality || driver.nationality,
                    team: team !== undefined ? team : driver.team,
                    championshipsWon: championshipsWon !== undefined ? championshipsWon : driver.championshipsWon,
                };

                if (req.file) {
                    if (driver.photo) {
                        try {
                            fs.unlinkSync(driver.photo);
                        } catch (err) {
                            console.error('Error al eliminar foto anterior:', err);
                        }
                    }
                    updatedData.photo = req.file.path;
                }

                await driver.update(updatedData);

                const updatedDriver = await Driver.findByPk(id);
                res.status(200).json(updatedDriver);
            } catch (error) {
                console.error('Error al actualizar piloto:', error);
                res.status(500).json({ error: 'Error al actualizar el piloto' });
            }
        },

        deleteDriver: async (req, res) => {
            try {
                const { id } = req.params;
                const driver = await Driver.findByPk(id);

                if (!driver) {
                    return res.status(404).json({ error: 'Piloto no encontrado' });
                }

                if (driver.photo) {
                    try {
                        fs.unlinkSync(driver.photo);
                    } catch (err) {
                        console.error('Error al eliminar foto:', err);
                    }
                }

                await driver.destroy();
                res.status(200).json({ message: 'Piloto eliminado correctamente' });
            } catch (error) {
                console.error('Error al eliminar piloto:', error);
                res.status(500).json({ error: 'Error al eliminar el piloto' });
            }
        }
    };
};

module.exports = createDriverController;
