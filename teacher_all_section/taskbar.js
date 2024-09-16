let position = localStorage.getItem('user');
console.log(position);

var adminElements = document.getElementsByClassName('admin');
var staffElements = document.getElementsByClassName('staff');
var classElement = document.getElementById('class');
var courseElement = document.getElementById('course');

if (position === null) {
  for (var i = 0; i < staffElements.length; i++) {
    staffElements[i].style.display = 'none';
  }
  classElement.style.display = 'none';
  courseElement.style.display = 'none';
}
else {
  for (var i = 0; i < adminElements.length; i++) {
    adminElements[i].style.display = 'none';
  }

  if (position !== 'teachersList') classElement.style.display = 'none';
  else courseElement.style.display = 'none';
}
