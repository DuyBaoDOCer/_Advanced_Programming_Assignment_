import { initializeApp } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-analytics.js";
import { getDatabase, ref, set, onValue, child, get, update } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-database.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
//----------------------------------------------------------------------------------------------------//
let position = localStorage.getItem('user');
let id = localStorage.getItem("id");
const path = `management/${position}/${id}/profile`;
const dbRef = ref(db);

class staff {
    constructor() {
        this.ready = new Promise((resolve, reject) => {
            get(child(dbRef, path)).then((snapshot) => {
                const data = snapshot.val();
                console.log(data);
                this.name = data.name;
                this.dob = data.dob;
                this.phone = data.phone;
                this.email = data.email;
                this.id = id;
                this.gender = data.gender;

                if (position === 'teachersList') {
                    this.rank = data.rank;
                    this.arank = data.arank;
                }
                resolve();
            });
        });
    }

    async printProfile() {
        await this.ready;
        console.log(this.id);
        document.getElementById("id").innerHTML = this.id;
        document.getElementById("name").innerHTML = this.name;
        document.getElementById("gender").innerHTML = this.gender;
        document.getElementById("DoB").innerHTML = this.dob;
        document.getElementById("phone").innerHTML = this.phone;
        document.getElementById("email").innerHTML = this.email;
    }
}

class teacher extends staff {
    constructor() {
        super();
    }

    async printProfile() {
        await super.printProfile();
        document.getElementById("rank").innerHTML = this.rank;
        document.getElementById("arank").innerHTML = this.arank;
    }
}
class student extends staff {
    constructor() {
        super();
    }

    async printProfile() {
        var elements = document.getElementsByClassName("ot");
        for (var i = 0; i < elements.length; i++) {
            elements[i].style.display = 'none';
        }
        await super.printProfile();
    }
}

let person;

if (position === 'teachersList')
    person = new teacher();
else
    person = new student();

person.printProfile();
// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("change-profile");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
btn.onclick = function () {
    modal.style.display = "block";
    var elements = document.getElementsByClassName("blur");
    for (var i = 0; i < elements.length; i++) {
        elements[i].style.filter = 'blur(10px)';
    }
    document.getElementById("ifc").innerHTML = id;
    if (position !== 'teachersList') {
        document.getElementById('rank').hidden = true;
        document.getElementById('Arank').hidden = true;
    }
}
// When the user clicks on <span> (x), close the modal
span.onclick = function () {
    modal.style.display = "none";
    var elements = document.getElementsByClassName("blur");
    for (var i = 0; i < elements.length; i++) {
        elements[i].style.filter = 'none';
    }

}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
        var elements = document.getElementsByClassName("blur");
        for (var i = 0; i < elements.length; i++) {
            elements[i].style.filter = 'none';
        }
    }
}
document.getElementById('btnConfirm').onclick = async function () {
    var Name = document.getElementById("name_in").value;
    var PhoneNumber = document.getElementById("PhoneNumber").value;
    var sex = document.getElementById("sex").value;
    var DateofBirth = document.getElementById("DateofBirth").value;
    var email = document.getElementById("email_in").value;
    var Rank, Arank;

    if (position === 'teachersList') {
        Rank = document.getElementById("rank_in").value;
        Arank = document.getElementById("Arank").value;
    }

    if (Name == "" || PhoneNumber == "" || email == "" || DateofBirth == "" || sex == "" || (position === 'teachersList' && (Rank == "" || Arank == "")))
        alert("Vui lòng nhập đầy đủ thông tin !!!!")
    else {
        var data = {
            name: Name,
            email: email,
            dob: DateofBirth,
            phone: PhoneNumber,
            gender: sex
        };

        if (position === 'teachersList') {
            data.rank = Rank;
            data.arank = Arank;
        }
        console.log(data);

        await set(ref(db, path), data)
            .catch((error) => {
                console.error("Error writing to Firebase: ", error);
            });
        alert('Thông tin đã được thay đổi')
        location.reload();
    }
}


