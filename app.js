const form = document.getElementById('f1Form');
const tableBody = document.querySelector('#f1Table tbody');

form.addEventListener('submit', (e) => {

    const season = document.getElementById('season').value;
    const round = document.getElementById('round').value;

    tableBody.innerHTML = '';

    fetch(`https://ergast.com/api/f1/${season}/${round}/driverStandings.json`)
        .then(response => response.json())
        .then(data => {
            const driverStandings = data.MRData.StandingsTable.StandingsLists[0].DriverStandings;

            for (let i = 0; i < 7; i++) {
                const driver = driverStandings[i];

                const row = document.createElement('tr');

                const positionCell = document.createElement('td');
                positionCell.textContent = driver.position;
                row.appendChild(positionCell);

                const driverCell = document.createElement('td');
                driverCell.textContent = `${driver.Driver.givenName} ${driver.Driver.familyName}`;
                row.appendChild(driverCell);

                const nationalityCell = document.createElement('td');
                nationalityCell.textContent = driver.Driver.nationality;
                row.appendChild(nationalityCell);

                const constructorCell = document.createElement('td');
                constructorCell.textContent = driver.Constructors[0].name;
                row.appendChild(constructorCell);

                tableBody.appendChild(row);
            }
        })
});
