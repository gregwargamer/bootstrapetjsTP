let nbAdultes = 1;
let nbEnfants = 0;
let nbChambres = 1;
let lieuSejour = "";
let voyageTravail = 0;

function updateAdultes(change) {
  nbAdultes += change;
  if (nbAdultes < 1) nbAdultes = 1;
  document.getElementById('nb_adultes').value = nbAdultes;
}

function updateEnfants(change) {
  let oldValue = nbEnfants;
  nbEnfants += change;
  if (nbEnfants < 0) nbEnfants = 0;
  document.getElementById('nb_enfants').value = nbEnfants;
  
  if (nbEnfants > oldValue) {
    addAgeInput();
  } else if (nbEnfants < oldValue) {
    removeAgeInput();
  }
}

function updateChambres(change) {
  nbChambres += change;
  if (nbChambres < 1) nbChambres = 1;
  document.getElementById('nb_chambres').value = nbChambres;
}

function addAgeInput() {
  let table = document.querySelector('.table');
  let newRow = document.createElement('tr');
  newRow.className = 'age-enfant-row';
  newRow.innerHTML = `
    <td colspan="2">Âge enfant ${nbEnfants}</td>
    <td colspan="2"><input type="number" class="form-control" min="0" max="17" placeholder="Âge"></td>
  `;
  let travailRow = document.getElementById('checkbox-travail').closest('tr');
  table.insertBefore(newRow, travailRow);
}

function removeAgeInput() {
  let ageRows = document.querySelectorAll('.age-enfant-row');
  if (ageRows.length > 0) {
    ageRows[ageRows.length - 1].remove();
  }
}

document.getElementById('btn-plus-adult').addEventListener('click', function() {
  updateAdultes(1);
});

document.getElementById('btn-minus-adult').addEventListener('click', function() {
  updateAdultes(-1);
});

document.getElementById('btn-plus-enfant').addEventListener('click', function() {
  updateEnfants(1);
});

document.getElementById('btn-minus-enfant').addEventListener('click', function() {
  updateEnfants(-1);
});

document.getElementById('btn-plus-chambre').addEventListener('click', function() {
  updateChambres(1);
});

document.getElementById('btn-minus-chambre').addEventListener('click', function() {
  updateChambres(-1);
});

document.getElementById('lieux').addEventListener('input', function() {
  lieuSejour = this.value;
});

document.getElementById('checkbox-travail').addEventListener('change', function() {
  voyageTravail = this.checked ? 1 : 0;
});

function getAgesEnfants() {
  let ages = [];
  let ageInputs = document.querySelectorAll('.age-enfant-row input');
  ageInputs.forEach(input => {
    if (input.value) {
      ages.push(input.value);
    }
  });
  return ages;
}

function rechercherReservation() {
  let lieu = document.getElementById('lieux').value || 'Non spécifié';
  let dateDepart = document.getElementById('date-depart').value || 'Non spécifiée';
  let dateArrivee = document.getElementById('date-arrivee').value || 'Non spécifiée';
  let adultes = document.getElementById('nb_adultes').value;
  let enfants = document.getElementById('nb_enfants').value;
  let chambres = document.getElementById('nb_chambres').value;
  let travail = document.getElementById('checkbox-travail').checked;
  let agesEnfants = getAgesEnfants();
  
  let resume = `
    <tr><td><h5>Récapitulatif</h5></td></tr>
    <tr><td><strong>Lieu :</strong> ${lieu}</td></tr>
    <tr><td><strong>Départ :</strong> ${dateDepart}</td></tr>
    <tr><td><strong>Arrivée :</strong> ${dateArrivee}</td></tr>
    <tr><td><strong>Adultes :</strong> ${adultes}</td></tr>
    <tr><td><strong>Enfants :</strong> ${enfants}</td></tr>
  `;
  
  if (agesEnfants.length > 0) {
    resume += `<tr><td><strong>Âges enfants :</strong> ${agesEnfants.join(', ')} ans</td></tr>`;
  }
  
  resume += `
    <tr><td><strong>Chambres :</strong> ${chambres}</td></tr>
    <tr><td><strong>Voyage professionnel :</strong> ${travail ? 'Oui' : 'Non'}</td></tr>
  `;
  
  let recapTable = document.querySelector('.col-md-4:last-child .table');
  recapTable.innerHTML = resume;
}

function reinitialiserFormulaire() {
  document.getElementById('lieux').value = '';
  document.getElementById('date-depart').value = '';
  document.getElementById('date-arrivee').value = '';
  document.getElementById('nb_adultes').value = '1';
  document.getElementById('nb_enfants').value = '0';
  document.getElementById('nb_chambres').value = '1';
  document.getElementById('checkbox-travail').checked = false;
  
  nbAdultes = 1;
  nbEnfants = 0;
  nbChambres = 1;
  lieuSejour = "";
  voyageTravail = 0;
  
  let ageRows = document.querySelectorAll('.age-enfant-row');
  ageRows.forEach(row => row.remove());
  
  let recapTable = document.querySelector('.col-md-4:last-child .table');
  recapTable.innerHTML = '<tr><td><h5>Récapitulatif</h5></td></tr>';
}

document.getElementById('btn-rechercher').addEventListener('click', rechercherReservation);
document.getElementById('btn-reinitialiser').addEventListener('click', reinitialiserFormulaire);
