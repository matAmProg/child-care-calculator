
$(document).ready(function(){

  $('.dropdown-trigger').dropdown();
  $('.tabs').tabs();
  $('select').formSelect();

 
  

  
});





/**Child Care Center Form  */

//function to calculate total
function calculateTotal(){

  var childCareForm = document.forms["childCareForm"];

  var infantClassrooms = parseInt(childCareForm.elements["infantClassrooms"].value);
  var toddlerClassrooms = parseInt(childCareForm.elements["toddlerClassrooms"].value);
  var pre3Classrooms = parseInt(childCareForm.elements["pre3Classrooms"].value);
  var pre4Classrooms = parseInt(childCareForm.elements["pre4Classrooms"].value);

  var classTotal =  infantClassrooms + toddlerClassrooms + pre3Classrooms + pre4Classrooms;

 if(!isNaN(classTotal)){

    document.getElementById("classTotal").innerHTML = "<strong>"+classTotal+"</strong>";

 }

 var infantChildren, toddlerChildren, pre3Children, pre4Children,childTotal;

 if(selectedRatio == "covid"){

  if(!isNaN(infantClassrooms)){
    infantChildren = infantClassrooms * statesVarArray[0].groupsize_covid_infant;
    $("input[name='infantChildren']").val(infantChildren);
  }

  if(!isNaN(toddlerClassrooms)){
    toddlerChildren = toddlerClassrooms * statesVarArray[0].groupsize_covid_toddler;
    $("input[name='toddlerChildren']").val(toddlerChildren);
  }

  if(!isNaN(pre3Classrooms)){
    pre3Children = pre3Classrooms * statesVarArray[0].groupsize_covid_pre3;
    $("input[name='pre3Children']").val(pre3Children);
  }

  if(!isNaN(pre4Classrooms)){
    pre4Children = pre4Classrooms * statesVarArray[0].groupsize_covid_pre4;
    $("input[name='pre4Children']").val(pre4Children);
  }

  childTotal = infantChildren + toddlerChildren + pre3Children + pre4Children;
  $("#childTotal").html(childTotal);
  console.log(childTotal);


 }

 if(selectedRatio == "current"){

  if(!isNaN(infantClassrooms)){
    infantChildren = infantClassrooms * statesVarArray[0].groupsize_current_infant;
    $("input[name='infantChildren']").val(infantChildren);
  }

  if(!isNaN(toddlerClassrooms)){
    toddlerChildren = toddlerClassrooms * statesVarArray[0].groupsize_current_toddler;
    $("input[name='toddlerChildren']").val(toddlerChildren);
  }

  if(!isNaN(pre3Classrooms)){
    pre3Children = pre3Classrooms * statesVarArray[0].groupsize_current_pre3;
    $("input[name='pre3Children']").val(pre3Children);
  }

  if(!isNaN(pre4Classrooms)){
    pre4Children = pre4Classrooms * statesVarArray[0].groupsize_current_pre4;
    $("input[name='pre4Children']").val(pre4Children);
  }

  childTotal = infantChildren + toddlerChildren + pre3Children + pre4Children;
  $("#childTotal").html(childTotal);
  console.log(childTotal);


 }


  


}





var stateSelected,selectedRatio;



/**State variables array */

var statesVarArray = [

  {
    "ratios_current_infant": 5,
    "groupsize_current_infant": 10,
    "ratios_current_toddler": 8,
    "groupsize_current_toddler": 16,
    "ratios_current_pre3": 11,
    "groupsize_current_pre3": 22,
    "ratios_current_pre4": 11,
    "groupsize_current_pre4": 22,
    "ratios_covid_infant": 5,
    "groupsize_covid_infant": 10,
    "ratios_covid_toddler": 8,
    "groupsize_covid_toddler": 11,
    "ratios_covid_pre3": 11,
    "groupsize_covid_pre3": 11,
    "ratios_covid_pre4": 11,
    "groupsize_covid_pre4": 11,
    "wages_bls_director": 46910.00,
    "wages_bls_assistantdirector": 37528.00,
    "wages_bls_adminassistant": 15080.00,
    "wages_bls_leadteacher": 24470.00,
    "wages_bls_assistantteacher": 20770.00,
    "wages_bls_floater": 15080.00,
    "wages_bls_mentalhealthprof": 41090.00,
    "wages_kg_director": 83710.00,
    "wages_kg_assistantdirector": 66968.00,
    "wages_kg_adminassistant": 25540.00,
    "wages_kg_leadteacher": 46190.00,
    "wages_kg_assistantteacher": 21800.00,
    "wages_kg_floater": 31200.00,
    "wages_kg_mentalhealthprof": 41090.00,
    "health_insurance": 4636.00,
    "sub_staff_leave": 4176.00,
    "sub_sick_leave": 4176.00,
    "sanitation_supplies": 2880.00,
    "cost_per_child":20340.00


  }

];


//function to get state 
function getState(){

  
  stateSelected = $('select').val();
  
}




//function to get ratio selected
function getRatio(){


  selectedRatio = $("input[type='radio']:checked").val();

  if(stateSelected == "AL"){

    if(selectedRatio == "current"){

      //populating ratios column
      $("input[name='infantRatio']").val(statesVarArray[0].ratios_current_infant);
      $("input[name='toddlerRatio']").val(statesVarArray[0].ratios_current_toddler);
      $("input[name='pre3Ratio']").val(statesVarArray[0].ratios_current_pre3);
      $("input[name='pre4Ratio']").val(statesVarArray[0].ratios_current_pre4);

      //populating groupsize column
      $("input[name='infantGroupSize']").val(statesVarArray[0].groupsize_current_infant);
      $("input[name='toddlerGroupSize']").val(statesVarArray[0].groupsize_current_toddler);
      $("input[name='pre3GroupSize']").val(statesVarArray[0].groupsize_current_pre3);
      $("input[name='pre4GroupSize']").val(statesVarArray[0].groupsize_current_pre4);
      
    }

    else if(selectedRatio == "covid"){

      //populating ratios column
      $("input[name='infantRatio']").val(statesVarArray[0].ratios_covid_infant);
      $("input[name='toddlerRatio']").val(statesVarArray[0].ratios_covid_toddler);
      $("input[name='pre3Ratio']").val(statesVarArray[0].ratios_covid_pre3);
      $("input[name='pre4Ratio']").val(statesVarArray[0].ratios_covid_pre4);

      //populating groupsize column
      $("input[name='infantGroupSize']").val(statesVarArray[0].groupsize_covid_infant);
      $("input[name='toddlerGroupSize']").val(statesVarArray[0].groupsize_covid_toddler);
      $("input[name='pre3GroupSize']").val(statesVarArray[0].groupsize_covid_pre3);
      $("input[name='pre4GroupSize']").val(statesVarArray[0].groupsize_covid_pre4);



    }


  }




  
  
  
  

}





/**Family Care Center */

var salaryLevelFamilyCare, salaryLevelChildCare;

function getSalaryLevel(){

  var familyCareForm = document.forms["familyCareForm"];
  salaryLevelFamilyCare = familyCareForm.elements["salary"].value;
 

  var childCareForm = document.forms["childCareForm"];
  salaryLevelChildCare =childCareForm.elements["salary"].value;
  
  

}





function calculateSalary(){


  //code for child care form
  
  if(salaryLevelChildCare == "BLS"){

    var noOfProgramDirectors = $("#noOfProgramDirectors").val();
    var noOfAssistantDirectors = $("#noOfAssistantDirectors").val();
    var noOAdministrativeAssistants = $("#noOAdministrativeAssistants").val();
    var noOfLeadTeachers = $("#noOfLeadTeachers").val();
    var noOfAssistantTeachers = $("#noOfAssistantTeachers").val();
    if(!isNaN(noOfProgramDirectors)){

      var totalWageDirectors = noOfProgramDirectors * statesVarArray[0].wages_bls_director;

      $("#wageProgramDirectors").val(totalWageDirectors);


    }
    
    if(!isNaN(noOfAssistantDirectors)){

      var wageAssistantDirector = noOfAssistantDirectors * statesVarArray[0].wages_bls_assistantdirector;
      $("#wageAssistantDirectors").val(wageAssistantDirector);

    } 

    if(!isNaN(noOAdministrativeAssistants)){

      var wageAdministrativeAssistants = noOAdministrativeAssistants * statesVarArray[0].wages_bls_adminassistant;
      $("#wageAdministrativeAssistants").val(wageAdministrativeAssistants);


    } 

    if(!isNaN(noOfLeadTeachers)){

      var wageLeadTeachers = noOfLeadTeachers * statesVarArray[0].wages_bls_leadteacher;
      $("#wageLeadTeachers").val(wageLeadTeachers);

    }

    if(!isNaN(noOfAssistantTeachers)){

      var wageAssistantTeachers = noOfAssistantTeachers * statesVarArray[0].wages_bls_assistantteacher;
      $("#wageAssistantTeachers").val(wageAssistantTeachers);

    }

      



    }

  


  if(salaryLevelFamilyCare == "BLS"){

    var noOfProvider = $("#noOfProvider").val();
    if(!isNaN(noOfProvider)){

      var totalWageProvider = noOfProvider * statesVarArray[0].wages_bls_leadteacher;

      $("#salaryOfProvider").val(totalWageProvider);


    }



  }


}









/**function to add custom field */

function addInput(divName){

  var newRow = document.createElement('tr');
 
  newRow.innerHTML = "<td><div class='input-field'><input type='text' placeholder='Staff Name' name='customStaffName'></div></td><td><div class='input-field'><input type='text'    id='noOfCustomStaff'></div></td><td><div class='input-field'><input type='text' id='wageCustomStaff'></div></td>";
  
  document.getElementById(divName).appendChild(newRow);


}
