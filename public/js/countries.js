$(document).ready(function() {
    $('#countries').DataTable({
        lengthMenu: [[10, 25, 50, 100, 200, -1], [10, 25, 50, 100, 200, "All"]], // galimybė naudotojui pasirinkti po kiek įrašų rodyti
        pageLength: 25,         // pagal nutylėjimą po kiek įrašų rodyti viename puslapyje
        order: [[1, 'asc']],    // pagal nutylėjimą rūšiuoti pirmą stulpelį didėjimo tvarka
        columns: [              // šitas parametras nurodomas, nes norim, kad Actions stulpelis neturėtų rūšiavimo ir paieškos galimybių
            {data: 'id'},
            {data: 'alpha-2_code'},
            {data: 'latitude'},
            {data: 'longitude'},
            {data: 'country'},
            {data: 'actions', orderable: false, searchable: false},
        ],
    });
});