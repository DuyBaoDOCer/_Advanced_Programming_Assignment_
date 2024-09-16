import { initializeApp } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-analytics.js";
import { getDatabase, ref, set, child, get, onChildRemoved } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyBsfqC3q_PzXZZOAksa2JXva6I8cIJnHBY",
  authDomain: "advancedprogrammingassig-ff7c2.firebaseapp.com",
  databaseURL: "https://advancedprogrammingassig-ff7c2-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "advancedprogrammingassig-ff7c2",
  storageBucket: "advancedprogrammingassig-ff7c2.appspot.com",
  messagingSenderId: "284171849969",
  appId: "1:284171849969:web:9e852a830806ad97871950",
  measurementId: "G-VVCXTQCT7B"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getDatabase(app);

let key = JSON.parse(localStorage.getItem('key'));
//let config = JSON.parse(localStorage.getItem('config'));
//console.log(key);
function storeStudentsList(studentsList) {
  set(ref(db, 'management/coursesList/' + key + '/studentsList'), {
    studentsList: studentsList
  });
}


async function printStudentsList(contenable) {
  let index = 1;
  const dbRef = ref(db);
  get(child(dbRef, `management/coursesList/${key}/studentsList`)).then((snapshot) => {
    if (snapshot.exists()) {
      let listStudents = snapshot.val();

      const tbody = document.getElementById("data");
      tbody.innerHTML = "";

      for (let studentId in listStudents) {
        if (listStudents.hasOwnProperty(studentId)) {
          let studentDetails = listStudents[studentId];
          const row = document.createElement("tr");
          row.innerHTML += `<td>${index}</td>
                                    <td>${studentDetails.name}</td>
                                    <td>${studentId}</td>
                                    <td contenteditable=${contenable}>${studentDetails.mark}</td>`;
          tbody.appendChild(row);
          index++;

        }
      }

    } else {
      console.log("No data available");
    }
  }).catch((error) => {
    console.error(error);
  });

}




document.getElementById('Students').addEventListener('click', () => {
  //update_Students.parentNode.removeChildu(pdate_Students);
  //see_all_document.parentNode.removeChild(see_all_document);

  printStudentsList(true);

  let td = document.querySelector('td'); // replace this with your actual selector
  td.addEventListener('input', function (e) {
    let value = parseFloat(this.innerText);
    if (isNaN(value) || value < 1 || value > 10) {
      e.preventDefault();
      this.innerText = '';
    }
  });


  var saveAllButton = document.createElement('button');
  saveAllButton.id = "saveAll";
  saveAllButton.innerText = "Lưu";
  document.body.appendChild(saveAllButton);

  document.getElementById('saveAll').addEventListener('click', () => {
    if (confirm('Bạn có chắc muốn lưu những thay đổi ?')) {
      const rows = document.querySelectorAll('#myTable tr');

      let newData = {};
      for (let i = 2; i < rows.length; i++) {
        let cells = rows[i].querySelectorAll('td');
        let studentId = cells[1].innerText;
        newData[studentId] = {
          full_name: cells[0].innerText,
          mark: cells[2].innerText
        };

      }
      storeStudentsList(newData);
      printStudentsList(false);
    }

    saveAllButton.parentNode.removeChild(saveAllButton);
    document.body.appendChild(update_Students);
    document.body.appendChild(see_all_document);
  });
});


document.getElementById("document").onclick = function () {
  window.location.href = "/teacher_all_section/subject_for_all/document.html"
}

printStudentsList(false);


