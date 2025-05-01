
const apiUrl = '/api/f1';
const driverForm = document.getElementById('driverForm');
const driversTable = document.getElementById('driversTable');
const submitBtn = document.getElementById('submitBtn');

driverForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const id = document.getElementById('driverId').value;
    const driverData = {
        firstName: document.getElementById('firstName').value,
        lastName: document.getElementById('lastName').value,
        nationality: document.getElementById('nationality').value,
        team: document.getElementById('team').value,
        championshipsWon: document.getElementById('championshipsWon').value,
    };

    if (id) {

        await fetch(`${apiUrl}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(driverData),
        });
    } else {
        // Crear piloto
        await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(driverData),
        });
    }

    driverForm.reset();
    document.getElementById('driverId').value = '';
    submitBtn.textContent = 'Crear Piloto';
    loadDrivers();
});

async function loadDrivers() {
    const res = await fetch(apiUrl);
    const drivers = await res.json();

    driversTable.innerHTML = '';

    drivers.forEach(driver => {
        const row = document.createElement('tr');
        row.innerHTML = `
<td>${driver.id}</td>
<td>${driver.firstName}</td>
<td>${driver.lastName}</td>
<td>${driver.nationality}</td>
<td>${driver.team || ''}</td>
<td>${driver.championshipsWon}</td>
<td>
<button class="edit" onclick="editDriver(${driver.id})">Editar</button>
<button class="delete" onclick="deleteDriver(${driver.id})">Eliminar</button>
</td>
`;
        driversTable.appendChild(row);
    });
}

async function editDriver(id) {
    const res = await fetch(`${apiUrl}/${id}`);
    const driver = await res.json();

    document.getElementById('driverId').value = driver.id;
    document.getElementById('firstName').value = driver.firstName;
    document.getElementById('lastName').value = driver.lastName;
    document.getElementById('nationality').value = driver.nationality;
    document.getElementById('team').value = driver.team || '';
    document.getElementById('championshipsWon').value = driver.championshipsWon;

    submitBtn.textContent = 'Actualizar Piloto';
}

async function deleteDriver(id) {
    if (confirm('¿Estás seguro de eliminar este piloto?')) {
        await fetch(`${apiUrl}/${id}`, { method: 'DELETE' });
        loadDrivers();
    }
}


loadDrivers();