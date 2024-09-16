document.getElementById('option').addEventListener('click', function () {
  modal.style.display = "block";
});

var modal = document.getElementById("myModal");

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
