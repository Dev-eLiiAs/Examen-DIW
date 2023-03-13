var map = L.map('mapa',).setView([36.72071131817986, -4.420041081375409], 19);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 17,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

fetch('https://raw.githubusercontent.com/FRomero999/ExamenDIW2022/main/rutas_arqueologicas.json')
    .then(res => res.json())
    .then(data => {
        console.log(data); //asi puedo ver el array del json
        const tbody = document.querySelector("#listajson");
        const template = document.querySelector('#elementojson');
        for (let i = 0; i < data.length; i++) {
            const clone = template.content.cloneNode(true);
            let nombre = clone.getElementById('nombre')
            let horario = clone.getElementById('horario')
            let direccion = clone.getElementById('direccion')
            let telf = clone.getElementById('telefono')
            telf.textContent = data[i].properties.telefono;
            if (telf.textContent != "") {
                telf.classList.add('subrayado')
            }
            nombre.textContent = data[i].properties.nombre;
            horario.textContent = data[i].properties.horario;
            direccion.textContent = data[i].properties.direccion;


            tbody.appendChild(clone);

            var marcador = L.marker([data[i].properties.x, data[i].properties.y]).addTo(map);
            marcador.bindPopup(`<h5>${data[i].properties.nombre}</h5>` + '<br>' + `${data[i].properties.direccion}`);
        }
    })

