var firebaseConfig = {
  apiKey: "AIzaSyC1yoygCPmW4uEpKs9_Xb-LsHyU6lgtPPQ",
  authDomain: "covid-19-4e31b.firebaseapp.com",
  databaseURL: "https://covid-19-4e31b-default-rtdb.firebaseio.com",
  projectId: "covid-19-4e31b",
  storageBucket: "covid-19-4e31b.appspot.com",
  messagingSenderId: "716760131754",
  appId: "1:716760131754:web:f21db2b0aad3afc70d08d3"
};
firebase.initializeApp(firebaseConfig);

var UserInputsRef=firebase.database().ref('UserInputs')
document.getElementById('testForm').addEventListener('submit',submitForm);
function submitForm(e){
  e.preventDefault();
  var fname =getInputVal('firstname');
  var lname =getInputVal('lastname');
  var mobile =getInputVal('mobile');
  var state =getInputVal('state');
  state=state.toLowerCase();
  readState(state);
  var email =getInputVal('email');
  var emailstatus=validateEmail();
  var profession =getInputVal('profession');
  var dateofbirth =getInputVal('dateofbirth');
  var symptomsList =getSelectedCheckboxValues('symptoms');
  var selectedOption = document.querySelector('input[name = option]:checked').value;
  if(emailstatus)
  saveMessages(lname+ " " +fname,mobile,email,profession,dateofbirth,state,selectedOption,symptomsList);
}

function readState(state){
  var centers;
  var ref = firebase.database().ref(state);
  ref.on('value', (data) => {
   centers = data.val();
   document.getElementById("result").innerHTML ="<br>"+centers.toUpperCase();
})

}
function getInputVal(id){
  return document.getElementById(id).value;
}

function saveMessages(name,mobile,email,profession,dateofbirth,state,selectedOption,symptomsList){
  var newuserInputsRef = UserInputsRef.push();
  newuserInputsRef.set({
      name:name,
      mobile:mobile,
      email:email,
      profession:profession,
      dateofbirth:dateofbirth,
      selectedOption:selectedOption,
      state:state, 
      symptomsList:symptomsList
  })
  alert("Thank you, find the list of centers nearby!  ");
}

function getSelectedCheckboxValues(name) {
  const checkboxes = document.querySelectorAll(`input[name="${name}"]:checked`);
  let values = [];
  checkboxes.forEach((checkbox) => {
      values.push(checkbox.value);
  });
  return values;
}

function validateEmail() 
{
if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(testForm.email.value))
{
  return (true)
}
  alert("You have entered an invalid email address!")
  return (false)
}