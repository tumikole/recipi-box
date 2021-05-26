function submit(event) {
    event.preventDefault()
    var submit = document.getElementsByClassName('fav-container').innerHTML = ;
    console.log(submit())


}

var loadFile = function(event) {
    var image = document.getElementById('output');
    image.src = URL.createObjectURL(event.target.files[0]);
};

// function myFunction() {
//     var input, filter, table, tr, td, i, txtValue;
//     input = document.getElementById("myInput");
//     filter = input.value.toUpperCase();
//     favMeal = document.getElementsByClassName("fav-container");
//     li = favMeal.getElementsByTagName("li");
//     for (i = 0; i < tr.length; i++) {
//         td = tr[i].getElementsByTagName("td")[0];
//         if (td) {
//             txtValue = td.textContent || td.innerText;
//             if (txtValue.toUpperCase().indexOf(filter) > -1) {
//                 tr[i].style.display = "";
//             } else {
//                 tr[i].style.display = "none";
//             }
//         }
//     }
// }