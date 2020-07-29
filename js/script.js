$(document).ready(function () {
  $(".dropdown-trigger").dropdown();
  $(".tabs").tabs();
  $("select").formSelect();
});

/**********CHILD CARE CENTER**********/


//GLOBAL VARIABLES
var classTotal = (childTotal = 0);
var totalFTEmployeeFCC;


//SIZE OF CENTER GLOBAL VARIABLES
var infantClassrooms,
    toddlerClassrooms,  
    pre3Classrooms,
    pre4Classrooms,
    infantChildren,
    toddlerChildren,
    pre3Children,
    pre4Children,
    stateSelected, 
    selectedRatio;


//STAFFING GLOBAL VARIABLES

var salaryLevelFamilyCare,
    salaryLevelChildCare,
    adminStaffTotalWage,
    teachingStaffTotalWage,
    staffTotalWage,
    totalsalaryDirectors,
    salaryAssistantDirectors,
    salaryAdministrativeAssistants,
    salaryLeadTeachers,
    salaryAssistantTeachers,
    salarySubsTeachers,
    noOfProgramDirectors,
    noOfAssistantDirectors,
    noOfAdministrativeAssistants,
    noOfLeadTeachers,
    noOfAssistantTeachers,
    noOfSubstituteTeachers,
    totalTeachers;


/**STATE VARIABLES ARRAY**/

var statesVarArray = [
  {
    ratios_current_infant: 5,
    groupsize_current_infant: 10,
    ratios_current_toddler: 8,
    groupsize_current_toddler: 16,
    ratios_current_pre3: 11,
    groupsize_current_pre3: 22,
    ratios_current_pre4: 11,
    groupsize_current_pre4: 22,
    ratios_covid_infant: 5,
    groupsize_covid_infant: 10,
    ratios_covid_toddler: 8,
    groupsize_covid_toddler: 11,
    ratios_covid_pre3: 11,
    groupsize_covid_pre3: 11,
    ratios_covid_pre4: 11,
    groupsize_covid_pre4: 11,
    wages_bls_director: 46910.0,
    wages_bls_assistantdirector: 37528.0,
    wages_bls_adminassistant: 15080.0,
    wages_bls_leadteacher: 24470.0,
    wages_bls_assistantteacher: 20770.0,
    wages_bls_floater: 15080.0,
    wages_bls_mentalhealthprof: 41090.0,
    wages_kg_director: 83710.0,
    wages_kg_assistantdirector: 66968.0,
    wages_kg_adminassistant: 25540.0,
    wages_kg_leadteacher: 46190.0,
    wages_kg_assistantteacher: 39206.0,
    wages_kg_floater: 31200.0,
    wages_kg_mentalhealthprof: 41090.0,
    health_insurance: 4636.0,
    sub_staff_leave: 4176.0,
    sub_sick_leave: 4176.0,
    sanitation_supplies: 2880.0,
    cost_per_child: 20340.0,
    ctc_facilities:1643,
    ctc_slots:98597,
    fcc_facilities:866,
    fcc_slots:6928
  },
];




//FUNCTION TO GET STATE
function getState() {
  stateSelected = $("select").val();
  checkState();
  
}

//FUNCTION TO CHECK IF STATE IS SELECTED
function checkState(){

  if (stateSelected == undefined) {
    $("#stateAlert").show(800);
    return false;
  } else {
    $("#stateAlert").hide(500);
    return true;
  }


}


//FUNCTION TO GET SELECTED RATIO
function getRatio() {
  

  if(!checkState()){
    return;
  }
  selectedRatio = $("input[name='ratios']:checked").val();

  if (stateSelected == "AL") {
    if (selectedRatio == "current") {
      //populating ratios column
      $("input[name='infantRatio']").val(
        statesVarArray[0].ratios_current_infant
      );
      $("input[name='toddlerRatio']").val(
        statesVarArray[0].ratios_current_toddler
      );
      $("input[name='pre3Ratio']").val(statesVarArray[0].ratios_current_pre3);
      $("input[name='pre4Ratio']").val(statesVarArray[0].ratios_current_pre4);

      //populating groupsize column
      $("input[name='infantGroupSize']").val(
        statesVarArray[0].groupsize_current_infant
      );
      $("input[name='toddlerGroupSize']").val(
        statesVarArray[0].groupsize_current_toddler
      );
      $("input[name='pre3GroupSize']").val(
        statesVarArray[0].groupsize_current_pre3
      );
      $("input[name='pre4GroupSize']").val(
        statesVarArray[0].groupsize_current_pre4
      );
    } else if (selectedRatio == "covid") {
      //populating ratios column
      $("input[name='infantRatio']").val(statesVarArray[0].ratios_covid_infant);
      $("input[name='toddlerRatio']").val(
        statesVarArray[0].ratios_covid_toddler
      );
      $("input[name='pre3Ratio']").val(statesVarArray[0].ratios_covid_pre3);
      $("input[name='pre4Ratio']").val(statesVarArray[0].ratios_covid_pre4);

      //populating groupsize column
      $("input[name='infantGroupSize']").val(
        statesVarArray[0].groupsize_covid_infant
      );
      $("input[name='toddlerGroupSize']").val(
        statesVarArray[0].groupsize_covid_toddler
      );
      $("input[name='pre3GroupSize']").val(
        statesVarArray[0].groupsize_covid_pre3
      );
      $("input[name='pre4GroupSize']").val(
        statesVarArray[0].groupsize_covid_pre4
      );
    }
  }

  
  //populating base values for classrooms
  if($("input[name='infantClassrooms']").val() == ""){
    $("input[name='infantClassrooms']").val(1);
  }

  if($("input[name='toddlerClassrooms']").val() == ""){
    $("input[name='toddlerClassrooms']").val(1);
  }

  if($("input[name='pre3Classrooms']").val() == ""){
    $("input[name='pre3Classrooms']").val(1);
  }

  if($("input[name='pre4Classrooms']").val() == ""){
    $("input[name='pre4Classrooms']").val(1);
  }

  calculateTotal();
  
}





//FUNCTION TO CALCULATE TOTAL CLASSROOMS AND CHILDREN
function calculateTotal() {
  var childCareForm = document.forms["childCareForm"];

  infantClassrooms = parseInt(childCareForm.elements["infantClassrooms"].value);
  toddlerClassrooms = parseInt(
    childCareForm.elements["toddlerClassrooms"].value
  );
  pre3Classrooms = parseInt(childCareForm.elements["pre3Classrooms"].value);
  pre4Classrooms = parseInt(childCareForm.elements["pre4Classrooms"].value);

  classTotal =
    infantClassrooms + toddlerClassrooms + pre3Classrooms + pre4Classrooms;

  if (!isNaN(classTotal)) {
    document.getElementById("classTotal").innerHTML =
      "<strong>" + classTotal + "</strong>";
  }

  if (selectedRatio == "covid") {
    if (!isNaN(infantClassrooms)) {
      infantChildren =
        infantClassrooms * statesVarArray[0].groupsize_covid_infant;
      $("input[name='infantChildren']").val(infantChildren);
    }

    if (!isNaN(toddlerClassrooms)) {
      toddlerChildren =
        toddlerClassrooms * statesVarArray[0].groupsize_covid_toddler;
      $("input[name='toddlerChildren']").val(toddlerChildren);
    }

    if (!isNaN(pre3Classrooms)) {
      pre3Children = pre3Classrooms * statesVarArray[0].groupsize_covid_pre3;
      $("input[name='pre3Children']").val(pre3Children);
    }

    if (!isNaN(pre4Classrooms)) {
      pre4Children = pre4Classrooms * statesVarArray[0].groupsize_covid_pre4;
      $("input[name='pre4Children']").val(pre4Children);
    }

    childTotal = infantChildren + toddlerChildren + pre3Children + pre4Children;
    $("#childTotal").html(childTotal);
    console.log(childTotal);
  }

  if (selectedRatio == "current") {
    if (!isNaN(infantClassrooms)) {
      infantChildren =
        infantClassrooms * statesVarArray[0].groupsize_current_infant;
      $("input[name='infantChildren']").val(infantChildren);
    }

    if (!isNaN(toddlerClassrooms)) {
      toddlerChildren =
        toddlerClassrooms * statesVarArray[0].groupsize_current_toddler;
      $("input[name='toddlerChildren']").val(toddlerChildren);
    }

    if (!isNaN(pre3Classrooms)) {
      pre3Children = pre3Classrooms * statesVarArray[0].groupsize_current_pre3;
      $("input[name='pre3Children']").val(pre3Children);
    }

    if (!isNaN(pre4Classrooms)) {
      pre4Children = pre4Classrooms * statesVarArray[0].groupsize_current_pre4;
      $("input[name='pre4Children']").val(pre4Children);
    }

    childTotal = infantChildren + toddlerChildren + pre3Children + pre4Children;
    $("#childTotal").html(childTotal);
    console.log(childTotal);
  }
}


//FUNCTION TO CONVERT SALARY TO WAGE
function salaryConverter(id){

  if($("#salary"+id).val() != ""){

    
    $("#wage"+id).val(($("#salary"+id).val()/2080).toFixed(2));
    

  }




}


//FUNCTION TO CONVERT WAGE TO SALARY
function wageConverter(id){

  if($("#wage"+id).val() != ""){

    
    $("#salary"+id).val(($("#wage"+id).val()*2080).toFixed(0));
    

  }



}

//FUNCTION TO CHECK FOR CHECKBOX
function checkHealth(){

  if($("input[type='checkbox']").prop("checked") == false){

    $("input[name='costOfFTEmployee']").val(0);
    

  }

  else{

    $("input[name='costOfFTEmployee']").val(statesVarArray[0].health_insurance);
    


  }

  if($("#checkboxFCC").prop("checked") == false){
    $("#costOfFTEmployeeFCC").val(0);
  }
  else{
    $("#costOfFTEmployeeFCC").val(statesVarArray[0].health_insurance);
  }


}

//FUNCTION TO POPULATE STAFF FIELDS
function populateStaff(salaryLevel){

  noOfProgramDirectors = $("#noOfProgramDirectors").val();
  noOfAssistantDirectors = $("#noOfAssistantDirectors").val();
  noOfAdministrativeAssistants = $("#noOfAdministrativeAssistants").val();
  noOfLeadTeachers = $("#noOfLeadTeachers").val();
  noOfAssistantTeachers = $("#noOfAssistantTeachers").val();

  if (salaryLevel == "bls") {
    
    if (!isNaN(noOfProgramDirectors)) {
      totalsalaryDirectors =
        noOfProgramDirectors * statesVarArray[0].wages_bls_director;

      $("#salaryProgramDirectors").val(accounting.formatMoney(totalsalaryDirectors));
      $("#wageProgramDirectors").val((totalsalaryDirectors / 2080).toFixed(2));
    }

    if (!isNaN(noOfAssistantDirectors)) {
      salaryAssistantDirectors =
        noOfAssistantDirectors * statesVarArray[0].wages_bls_assistantdirector;
      $("#salaryAssistantDirectors").val(accounting.formatMoney(salaryAssistantDirectors));
      $("#wageAssistantDirectors").val(
        (salaryAssistantDirectors / 2080).toFixed(2)
      );
    }

    if (!isNaN(noOfAdministrativeAssistants)) {
      salaryAdministrativeAssistants =
        noOfAdministrativeAssistants *
        statesVarArray[0].wages_bls_adminassistant;
      $("#salaryAdministrativeAssistants").val(accounting.formatMoney(salaryAdministrativeAssistants));
      $("#wageAdministrativeAssistants").val(
        (salaryAdministrativeAssistants / 2080).toFixed(2)
      );
    }

    if (!isNaN(noOfLeadTeachers)) {
      salaryLeadTeachers =
        noOfLeadTeachers * statesVarArray[0].wages_bls_leadteacher;
      $("#salaryLeadTeachers").val(accounting.formatMoney(salaryLeadTeachers));
      $("#wageLeadTeachers").val((salaryLeadTeachers / 2080).toFixed(2));
    }

    if (!isNaN(noOfAssistantTeachers)) {
      salaryAssistantTeachers =
        noOfAssistantTeachers * statesVarArray[0].wages_bls_assistantteacher;
      $("#salaryAssistantTeachers").val(accounting.formatMoney(salaryAssistantTeachers));
      $("#wageAssistantTeachers").val(
        (salaryAssistantTeachers / 2080).toFixed(2)
      );
    }

    totalTeachers = parseInt(noOfLeadTeachers) + parseInt(noOfAssistantTeachers);
    var dailyCoverage = 0.2;
    console.log(totalTeachers);
    noOfSubstituteTeachers = totalTeachers * dailyCoverage;
    $("#noOfSubstituteTeachers").val(noOfSubstituteTeachers.toFixed(1));

    if (!isNaN(noOfSubstituteTeachers)) {
      salarySubsTeachers =
        noOfSubstituteTeachers * statesVarArray[0].wages_bls_floater;
      $("#salarySubsTeachers").val(accounting.formatMoney(salarySubsTeachers));
      $("#wageSubsTeachers").val((salarySubsTeachers / 2080).toFixed(2));
    }
  }
  

  



}


//FUNCTION TO CALCULATE TOTAL PERSONNEL COST
function calcTotalPersonnelCost(){

  //total admin staff wage
  adminStaffTotalWage =
    totalsalaryDirectors +
    salaryAssistantDirectors +
    salaryAdministrativeAssistants;
  console.log(adminStaffTotalWage);

  //total teaching staff wage
  teachingStaffTotalWage =
    salaryLeadTeachers + salaryAssistantTeachers + salarySubsTeachers;
  console.log(teachingStaffTotalWage);

  //total staff wage
  staffTotalWage = adminStaffTotalWage + teachingStaffTotalWage;
  console.log(staffTotalWage);

  //total no of teaching staff
  totalTeachingStaff = totalTeachers + noOfSubstituteTeachers;
  console.log(totalTeachingStaff);

  paidLeave = $("#paidLeave").val();
  sickdays = $("#sickdays").val();

  //sub cost for paid leave
  subsCostForPaidLeave =
    totalTeachingStaff *
    paidLeave *
    8 *
    (statesVarArray[0].wages_bls_floater / 2080);
  console.log(subsCostForPaidLeave);

  //sub cost for sick leave
  subsCostForSickLeave =
    totalTeachingStaff *
    sickdays *
    8 *
    (statesVarArray[0].wages_bls_floater / 2080);
  console.log(subsCostForSickLeave);

  //total subs cost
  subsCostForLeaveTotal = subsCostForSickLeave + subsCostForPaidLeave;
  console.log(subsCostForLeaveTotal);

  //total staff wage
  subTotalWages = staffTotalWage + subsCostForLeaveTotal;
  console.log(subTotalWages);

  //CONST Mandatory benefits value
  mandatoryBenefitsVal = 0.1065;
  mandatoryBenefitsSalary = mandatoryBenefitsVal * subTotalWages;
  console.log(Math.round(mandatoryBenefitsSalary));

  //Total staff 
  totalStaff =
    totalTeachingStaff +
    parseInt($("#noOfProgramDirectors").val()) +
    parseInt($("#noOfAssistantDirectors").val()) +
    parseInt($("#noOfAdministrativeAssistants").val());
  console.log(totalStaff);

  //Additional Benefits
  additionalBenefits = totalStaff * statesVarArray[0].health_insurance;
  console.log(Math.round(additionalBenefits));

  //Subtotal Personnel
  personnelSubtotal =
    subTotalWages + mandatoryBenefitsSalary + additionalBenefits;
  console.log(Math.round(personnelSubtotal));



}

//FUNCTION TO CALCULATE TOTAL NONPERSONNEL COST
function calcTotalNonPersonnelCost(){

  //Additional expenses
  if($("input[name='deepCleaningCost']").val() == ""){
    $("input[name='deepCleaningCost']").val(4);
  }
  
  if($("#costPerCleaning").val() == ""){
    $("#costPerCleaning").val(500);
  }
  

  //CONST cost per classroom
  costPerClassroom = 720;

  sanitationCost = costPerClassroom * classTotal;
  console.log(sanitationCost);
  $("#sanitationCost").val(sanitationCost);

  if($("#miscCost").val() != ""){
    miscCost = parseInt($("#miscCost").val());
  
  }

  else{
    $("#miscCost").val(0);
  }

  miscCost = miscCost;
  //Total additional cleaning
  totalAdditionalCleaning =
    (parseInt($("input[name='deepCleaningCost']").val()) *
      parseInt($("#costPerCleaning").val()) +
      sanitationCost) *
    12;
  console.log(totalAdditionalCleaning);

  //CONST Nonpersonnel expenses 
  eduProgram = 1895;
  occupancy = 35744;
  progAndAdmin = 17030;

  //Total Nonpersonnel Cost
  nonpersonnelSubtotal =
    totalAdditionalCleaning + eduProgram + occupancy + progAndAdmin;
  console.log(nonpersonnelSubtotal);




}



//FUNCTION TO GET SALARY
function getSalaryLevel() {
  var familyCareForm = document.forms["familyCareForm"];
  salaryLevelFamilyCare = familyCareForm.elements["salary"].value;

  var childCareForm = document.forms["childCareForm"];
  salaryLevelChildCare = childCareForm.elements["salary"].value;

  //populating number of staff fields
  if($("#noOfProgramDirectors").val()==""){

    $("#noOfProgramDirectors").val(1);

  }
  if($("#noOfAssistantDirectors").val()==""){

    $("#noOfAssistantDirectors").val(1);

  }
  if($("#noOfAdministrativeAssistants").val()==""){

    $("#noOfAdministrativeAssistants").val(1);

  }
  if($("#noOfLeadTeachers").val()==""){

  $("#noOfLeadTeachers").val(classTotal);
  

  }
  if($("#noOfAssistantTeachers").val()==""){

    noOfAssistantTeachers = infantClassrooms + toddlerClassrooms;
    $("#noOfAssistantTeachers").val(noOfAssistantTeachers);

  }
  
  populateStaff(salaryLevelChildCare);

  //populating Sick days and Paid leave fields
  if($("#sickdays").val()==""){
    $("#sickdays").val(10);
  }

  if($("#paidLeave").val()==""){
    $("#paidLeave").val(10);
  }

  //cost per FT employee
  if($("input[type='checkbox']").prop("checked")==true){
    $("input[name='costOfFTEmployee']").val(statesVarArray[0].health_insurance);
  }
  
 

  
  calcTotalPersonnelCost();
  calcTotalNonPersonnelCost();
  
  //TOTAL COST OF PERSONNEL & NON PERSONNEL
  totalPersonnel = personnelSubtotal + nonpersonnelSubtotal;
  console.log(Math.round(totalPersonnel));

  //reserve fund
  reserveFundPercentage = 0.05;
  reserveFund = reserveFundPercentage * totalPersonnel;
  console.log(Math.round(reserveFund));

  //Total expense
  totalExpense = totalPersonnel + reserveFund;
  console.log(Math.round(totalExpense));

  //Cost per child calculations
  calcInfantsCost();
  calcToddlersCost();
  calcPre3Cost();
  calcPre4Cost();

  
}


//FUNCTION TO CALCULATE INFANT COST PER CHILD
function calcInfantsCost(){

  //infants cost
  infant_adminPersonnel = (adminStaffTotalWage / childTotal).toFixed(2);
  console.log(infant_adminPersonnel);

  infantTeachers = infantChildren / statesVarArray[0].ratios_covid_infant;
  console.log(infantTeachers);

  infant_classPersonnel =
    (statesVarArray[0].wages_bls_leadteacher +
      (infantTeachers - 1) * statesVarArray[0].wages_bls_assistantteacher) /
    infantChildren;
  console.log(infant_classPersonnel);

  infant_floaters = salarySubsTeachers / classTotal / infantChildren;
  console.log(infant_floaters.toFixed(2));

  benefitsPerChild =
    (mandatoryBenefitsSalary + additionalBenefits) / childTotal;
  console.log(benefitsPerChild.toFixed(2));

  infant_subs = subsCostForLeaveTotal / classTotal / infantChildren;
  console.log(infant_subs.toFixed(2));

  NP_ed_program = Math.round(eduProgram / childTotal);
  console.log(NP_ed_program);

  infant_NP_occupancy = Math.round(occupancy / classTotal / infantChildren);
  console.log(infant_NP_occupancy);

  NP_admin = Math.round(progAndAdmin / childTotal);
  console.log(NP_admin);

  infant_cleaning = totalAdditionalCleaning / classTotal / infantChildren;
  console.log(infant_cleaning.toFixed(2));
  
  miscCost = $("#miscCost").val();

  if(miscCost != 0){
    miscCost = miscCost/childTotal;
    console.log(miscCost + "This is misc");
  }

  
  
  
  op_reserve = Math.round(reserveFund / childTotal);
  console.log(op_reserve);

  infant_cost =
    parseFloat(infant_adminPersonnel) +
    parseFloat(infant_classPersonnel) +
    parseFloat(infant_floaters) +
    parseFloat(benefitsPerChild) +
    parseFloat(infant_subs) +
    parseInt(NP_ed_program) +
    parseInt(infant_NP_occupancy) +
    parseInt(NP_admin) +
    parseInt(infant_cleaning) +
    parseInt(miscCost) +
    parseInt(op_reserve);
  console.log(infant_cost.toFixed(0));

  $("#infantAnnualCost").html(accounting.formatMoney(infant_cost));
  $("#infantMonthlyCost").html(accounting.formatMoney(infant_cost / 12));
  $("#infantWeeklyCost").html(accounting.formatMoney(infant_cost / 52));




}

//FUNCTION TO CALCULATE INFANT COST PER CHILD
function calcToddlersCost(){

  //toddlers cost
  toddler_adminPersonnel = (adminStaffTotalWage / childTotal).toFixed(2);
  console.log(toddler_adminPersonnel+"admin personnel");

  toddlerTeachers = 2;

  toddler_classPersonnel =
    ((statesVarArray[0].wages_bls_leadteacher +
      (toddlerTeachers - 1) * statesVarArray[0].wages_bls_assistantteacher) /
      toddlerChildren).toFixed(2);
  console.log(toddler_classPersonnel);

  toddler_floaters = (salarySubsTeachers / classTotal / toddlerChildren).toFixed(2);
  console.log(toddler_floaters);

  benefitsPerChild =
    ((mandatoryBenefitsSalary + additionalBenefits) / childTotal).toFixed(2);
  console.log(benefitsPerChild);

  toddler_subs = (subsCostForLeaveTotal / classTotal / toddlerChildren).toFixed(2);
  console.log(toddler_subs);

  NP_ed_program = Math.round(eduProgram / childTotal);
  console.log(NP_ed_program);

  toddler_NP_occupancy = Math.round(occupancy / classTotal / toddlerChildren);
  console.log(toddler_NP_occupancy);

  NP_admin = Math.round(progAndAdmin / childTotal);
  console.log(NP_admin);

  toddler_cleaning = Math.round(totalAdditionalCleaning / classTotal / toddlerChildren);
  console.log(toddler_cleaning);

  miscCost = $("#miscCost").val();

  if(miscCost != 0){
    miscCost = miscCost/childTotal;
    console.log(miscCost + "This is misc");
  }
 
  op_reserve = Math.round(reserveFund / childTotal);
  console.log(op_reserve);

  toddler_cost =
    parseFloat(toddler_adminPersonnel) +
    parseFloat(toddler_classPersonnel) +
    parseFloat(toddler_floaters) +
    parseFloat(benefitsPerChild) +
    parseFloat(toddler_subs) +
    parseInt(NP_ed_program) +
    parseInt(toddler_NP_occupancy) +
    parseInt(NP_admin) +
    parseInt(toddler_cleaning) +
    parseInt(miscCost) +
    parseInt(op_reserve);
  console.log(toddler_cost.toFixed(0));

  $("#toddlerAnnualCost").html(accounting.formatMoney(toddler_cost));
  $("#toddlerMonthlyCost").html(accounting.formatMoney(toddler_cost / 12));
  $("#toddlerWeeklyCost").html(accounting.formatMoney(toddler_cost / 52));




}


//FUNCTION TO CALCULATE PRE-SCHOOL 3 COST PER CHILD
function calcPre3Cost(){

  //pre3 cost
  pre3_adminPersonnel = (adminStaffTotalWage / childTotal).toFixed(2);
  console.log(toddler_adminPersonnel+"admin personnel");

  pre3Teachers =  pre3Children / statesVarArray[0].ratios_current_pre3;

  pre3_classPersonnel =
    ((statesVarArray[0].wages_bls_leadteacher +
      (pre3Teachers - 1) * statesVarArray[0].wages_bls_assistantteacher) /
      pre3Children).toFixed(2);
  console.log(pre3_classPersonnel);

  pre3_floaters = (salarySubsTeachers / classTotal / pre3Children).toFixed(2);
  console.log(pre3_floaters);

  benefitsPerChild =
    ((mandatoryBenefitsSalary + additionalBenefits) / childTotal).toFixed(2);
  console.log(benefitsPerChild);

  pre3_subs = (subsCostForLeaveTotal / classTotal / pre3Children).toFixed(2);
  console.log(pre3_subs);

  NP_ed_program = Math.round(eduProgram / childTotal);
  console.log(NP_ed_program);

  pre3_NP_occupancy = Math.round(occupancy / classTotal / pre3Children);
  console.log(pre3_NP_occupancy);

  NP_admin = Math.round(progAndAdmin / childTotal);
  console.log(NP_admin);

  pre3_cleaning = Math.round(totalAdditionalCleaning / classTotal / pre3Children);
  console.log(pre3_cleaning);

  miscCost = $("#miscCost").val();

  if(miscCost != 0){
    miscCost = miscCost/childTotal;
    console.log(miscCost + "This is misc");
  }

  op_reserve = Math.round(reserveFund / childTotal);
  console.log(op_reserve);

  pre3_cost =
    parseFloat(pre3_adminPersonnel) +
    parseFloat(pre3_classPersonnel) +
    parseFloat(pre3_floaters) +
    parseFloat(benefitsPerChild) +
    parseFloat(pre3_subs) +
    parseInt(NP_ed_program) +
    parseInt(pre3_NP_occupancy) +
    parseInt(NP_admin) +
    parseInt(pre3_cleaning) +
    parseInt(miscCost) +
    parseInt(op_reserve);
  console.log(pre3_cost.toFixed(0));

  $("#pre3AnnualCost").html(accounting.formatMoney(pre3_cost));
  $("#pre3MonthlyCost").html(accounting.formatMoney(pre3_cost / 12));
  $("#pre3WeeklyCost").html(accounting.formatMoney(pre3_cost / 52));




}

//FUNCTION TO CALCULATE PRE SCHOOL 4 COST PER CHILD
function calcPre4Cost(){

  //pre4 cost
  pre4_adminPersonnel = (adminStaffTotalWage / childTotal).toFixed(2);
  console.log(pre4_adminPersonnel+"admin personnel");

  pre4Teachers =  pre4Children / statesVarArray[0].ratios_current_pre4;

  pre4_classPersonnel =
    ((statesVarArray[0].wages_bls_leadteacher +
      (pre4Teachers - 1) * statesVarArray[0].wages_bls_assistantteacher) /
      pre4Children).toFixed(2);
  console.log(pre4_classPersonnel);

  pre4_floaters = (salarySubsTeachers / classTotal / pre4Children).toFixed(2);
  console.log(pre4_floaters);

  benefitsPerChild =
    ((mandatoryBenefitsSalary + additionalBenefits) / childTotal).toFixed(2);
  console.log(benefitsPerChild);

  pre4_subs = (subsCostForLeaveTotal / classTotal / pre4Children).toFixed(2);
  console.log(pre4_subs);

  NP_ed_program = Math.round(eduProgram / childTotal);
  console.log(NP_ed_program);

  pre4_NP_occupancy = Math.round(occupancy / classTotal / pre4Children);
  console.log(pre4_NP_occupancy);

  NP_admin = Math.round(progAndAdmin / childTotal);
  console.log(NP_admin);

  pre4_cleaning = Math.round(totalAdditionalCleaning / classTotal / pre4Children);
  console.log(toddler_cleaning);

  miscCost = $("#miscCost").val();

  if(miscCost != 0){
    miscCost = miscCost/childTotal;
    console.log(miscCost + "This is misc");
  }


  op_reserve = Math.round(reserveFund / childTotal);
  console.log(op_reserve);

  pre4_cost =
    parseFloat(pre4_adminPersonnel) +
    parseFloat(pre4_classPersonnel) +
    parseFloat(pre4_floaters) +
    parseFloat(benefitsPerChild) +
    parseFloat(pre4_subs) +
    parseInt(NP_ed_program) +
    parseInt(pre4_NP_occupancy) +
    parseInt(NP_admin) +
    parseInt(pre4_cleaning) +
    parseInt(miscCost) +
    parseInt(op_reserve);
  console.log(pre4_cost.toFixed(0));

  $("#pre4AnnualCost").html(accounting.formatMoney(pre4_cost));
  $("#pre4MonthlyCost").html(accounting.formatMoney(pre4_cost / 12));
  $("#pre4WeeklyCost").html(accounting.formatMoney(pre4_cost / 52));




}




function setToUserAdded() {
  $("input[value='userAdded']").prop("checked", true);
}



/**function to add custom field */

function addInput(divName) {
  var newRow = document.createElement("tr");

  newRow.innerHTML =
    "<td><div class='input-field'><input type='text' placeholder='Staff Name' name='customStaffName'></div></td><td><div class='input-field'><input type='text'    id='noOfCustomStaff'></div></td><td><div class='input-field'><input type='text' id='salaryCustomStaff'></div></td><td><div class='input-field'><input type='text' id='wageCustomStaff'></div></td>";

  document.getElementById(divName).appendChild(newRow);
}


/**********FAMILY CHILD CARE HOMES**********/


//GLOBAL VARIABLES


function populateFCC(){


  if($("#noOfInfant").val() == ""){
    $("#noOfInfant").val(2);
  }

  if($("#noOfToddler").val() == ""){
    $("#noOfToddler").val(1);
  }

  if($("#noOfPre3").val() == ""){
    $("#noOfPre3").val(1);
  }

  if($("#noOfPre4").val() == ""){
    $("#noOfPre4").val(2);
  }

  console.log(salaryLevelFamilyCare);

  if(salaryLevelFamilyCare == "Kindergarten"){
    if($("#noOfProvider").val() == ""){
      $("#noOfProvider").val(1);
    }

    if($("#noOfAssistantTeachersFCC").val() == ""){
      $("#noOfAssistantTeachersFCC").val(1);
    }

    
      $("#salaryOfProvider").val($("#noOfProvider").val() * statesVarArray[0].wages_kg_leadteacher);
    

   
      $("#salaryOfAssistantTeachersFCC").val($("#noOfAssistantTeachersFCC").val() * statesVarArray[0].wages_kg_assistantteacher);
    

    
      $("#wageOfProvider").val((($("#noOfProvider").val() * statesVarArray[0].wages_kg_leadteacher)/2080).toFixed(2));
    

  
      $("#wageOfAssistantTeachersFCC").val((($("#noOfAssistantTeachersFCC").val() * statesVarArray[0].wages_kg_assistantteacher)/2080).toFixed(2));


      totalFTEmployeeFCC = parseInt($("#noOfProvider").val()) + parseInt($("#noOfAssistantTeachersFCC").val());

     

   

  }

  $(".totalFTEmployee").html(totalFTEmployeeFCC);

  if($("input[name='sickdaysFCC']").val() == ""){
    $("input[name='sickdaysFCC']").val(10);
  }

  if($("input[name='paidLeaveFCC']").val() == ""){
    $("input[name='paidLeaveFCC']").val(10);
  }

  if($("#checkboxFCC").prop("checked") == true){
    $("#costOfFTEmployeeFCC").val(statesVarArray[0].health_insurance);
  }

  if($("input[name='deepCleaningCostFCC']").val() == ""){
    $("input[name='deepCleaningCostFCC']").val(4);
  }

  if($("input[name='costPerCleaningFCC']").val() == ""){
    $("input[name='costPerCleaningFCC']").val(250);
  }

  if($("input[name='sanitationCostFCC']").val() == ""){
    $("input[name='sanitationCostFCC']").val(720);
  }

  if($("input[name='miscCostFCC']").val() == ""){
    $("input[name='miscCostFCC']").val(0);
  }

  childTotalFCC = parseInt($("#noOfInfant").val()) + parseInt($("#noOfToddler").val()) + parseInt($("#noOfPre3").val()) + parseInt($("#noOfPre4").val());
  
  calcTotalWagesAndBenefitsFCC();
  calcInfantFCC();
  calcToddlerFCC();
  calcPre3FCC();
  calcPre4FCC();






}

function calcTotalWagesAndBenefitsFCC(){

  totalWagesFCC = parseInt($("#salaryOfProvider").val()) + parseInt($("#salaryOfAssistantTeachersFCC").val());

  mandatoryBenefitsFCC = (mandatoryBenefitsVal * (totalWagesFCC - parseInt($("#salaryOfProvider").val()))).toFixed(0);

  assistantTeacherUnitCostFCC = (parseInt($("#salaryOfAssistantTeachersFCC").val()) / parseInt($("#noOfAssistantTeachersFCC").val())).toFixed(0);

  sickDaysCostFCC = Math.round($("input[name='sickdaysFCC']").val() *  (assistantTeacherUnitCostFCC/2080) * 10);

  paidLeaveCostFCC = Math.round($("input[name='paidLeaveFCC']").val() *  (statesVarArray[0].wages_kg_floater/2080) * 10);

  totalSickDaysCostFCC = sickDaysCostFCC * totalFTEmployeeFCC;
  totalPaidLeaveCostFCC = paidLeaveCostFCC * totalFTEmployeeFCC;
  totalHealthFCC = statesVarArray[0].health_insurance * totalFTEmployeeFCC;

  discretionaryBenefits = totalSickDaysCostFCC + totalPaidLeaveCostFCC + totalHealthFCC;
  

  totalWagesAndBenefitsFCC = parseInt(totalWagesFCC) + parseInt(mandatoryBenefitsFCC) + parseInt(discretionaryBenefits);
  console.log(totalWagesAndBenefitsFCC);


  //CONST VALUES
  np_adminFCC = 3725;
  np_programFCC = 7250;
  np_occupancyFCC = 3731;

  
 

  //Additional Cleaning Cost
  totalCleaningCostFCC = parseInt(costPerClassroom) + (parseInt($("input[name='deepCleaningCostFCC']").val()) * parseInt($("input[name='costPerCleaningFCC']").val()) );

  totalOtherExpensesFCC = parseInt(np_adminFCC) + parseInt(np_programFCC) + parseInt(np_occupancyFCC) + parseInt(totalCleaningCostFCC);

  totalExpensesFCC = parseInt(totalWagesAndBenefitsFCC) + parseInt(totalOtherExpensesFCC);

  costPerChildFCC = parseInt(totalExpensesFCC)/parseInt(childTotalFCC);

  console.log(costPerChildFCC);



}

function calcInfantFCC(){


  totalInfantCostFCC = costPerChildFCC * $("#noOfInfant").val();
  
  $("#infantAnnualCostFCC").html(accounting.formatMoney(totalInfantCostFCC));
  $("#infantMonthlyCostFCC").html(accounting.formatMoney(totalInfantCostFCC/12));
  $("#infantWeeklyCostFCC").html(accounting.formatMoney(totalInfantCostFCC/52));


}

function calcToddlerFCC(){

  totalToddlerCostFCC = costPerChildFCC * $("#noOfToddler").val();
  
  $("#toddlerAnnualCostFCC").html(accounting.formatMoney(totalToddlerCostFCC));
  $("#toddlerMonthlyCostFCC").html(accounting.formatMoney(totalToddlerCostFCC/12));
  $("#toddlerWeeklyCostFCC").html(accounting.formatMoney(totalToddlerCostFCC/52));


}

function calcPre3FCC(){

  totalPre3CostFCC = costPerChildFCC * $("#noOfPre3").val();
  
  $("#pre3AnnualCostFCC").html(accounting.formatMoney(totalPre3CostFCC));
  $("#pre3MonthlyCostFCC").html(accounting.formatMoney(totalPre3CostFCC/12));
  $("#pre3WeeklyCostFCC").html(accounting.formatMoney(totalPre3CostFCC/52));



}

function calcPre4FCC(){

  totalPre4CostFCC = costPerChildFCC * $("#noOfPre4").val();
  
  $("#pre4AnnualCostFCC").html(accounting.formatMoney(totalPre4CostFCC));
  $("#pre4MonthlyCostFCC").html(accounting.formatMoney(totalPre4CostFCC/12));
  $("#pre4WeeklyCostFCC").html(accounting.formatMoney(totalPre4CostFCC/52));



}

/**********SYSTEM COSTS**********/

function populateSC(){


  if(stateSelected == "AL"){

    if($("#childCareFacilities").val()==""){

      $("#childCareFacilities").val(statesVarArray[0].ctc_facilities);

    }

    if($("#childCareSlots").val()==""){

      $("#childCareSlots").val(statesVarArray[0].ctc_slots);

    }

    if($("#familyHomeFacilities").val()==""){

      $("#familyHomeFacilities").val(statesVarArray[0].fcc_facilities);

    }

    if($("#familyHomeSlots").val()==""){

      $("#familyHomeSlots").val(statesVarArray[0].fcc_slots);

    }
    
  }

  if($("input[name='fixedCost']").val()==""){
    $("input[name='fixedCost']").val(40);
  }

  if($("input[name='operatingCost']").val()==""){
    $("input[name='operatingCost']").val(60);
  }

  calcFixedCost();
  calcOpCost();



}


function calcFixedCost(){

  //CONST VAL

  fixedCostCTC = 48474;
  fixedCostFCC = 6772;

  fixedCostPercentage = ($("input[name='fixedCost']").val()/100).toFixed(2);
  
  total_ctc_fixedCost = fixedCostPercentage * parseInt($("#childCareFacilities").val()) * fixedCostCTC;



  total_fcc_fixedCost = fixedCostPercentage * parseInt($("#familyHomeFacilities").val()) * fixedCostFCC;

  totalFixedCost = parseInt(total_ctc_fixedCost) + parseInt(total_fcc_fixedCost);
  console.log(totalFixedCost);

  $("#totalFixedCosts").html(accounting.formatMoney(totalFixedCost/12));
  $("#totalChildCareFixedCost").html(accounting.formatMoney(total_ctc_fixedCost/12));
  $("#totalFamilyHomeFixedCost").html(accounting.formatMoney(total_fcc_fixedCost/12));


}

function calcOpCost(){

  infantMonthly = $("#infantMonthlyCost").html().substring(1);
  toddlerMonthly = $("#toddlerMonthlyCost").html().substring(1);
  preMonthly = $("#pre3MonthlyCost").html().substring(1);
  
  avgCostPerChild = Math.round((parseInt(infantMonthly) + parseInt(toddlerMonthly) + parseInt(preMonthly))/3);

  console.log(avgCostPerChild);

  opCostPercentage = ($("input[name='operatingCost']").val()/100).toFixed(2);

  total_ctc_opCost = parseInt($("#childCareSlots").val()) * opCostPercentage * avgCostPerChild;
  total_fcc_opCost = parseInt($("#familyHomeSlots").val()) * opCostPercentage * (costPerChildFCC/12).toFixed(2);

  
  totalOpCost = parseInt(total_ctc_opCost) + parseInt(total_fcc_opCost);
  
  $("#totalOperatingCosts").html(accounting.formatMoney(totalOpCost/12));
  $("#totalChildCareOperatingCost").html(accounting.formatMoney(total_ctc_opCost/12));
  $("#totalFamilyHomeOperatingCost").html(accounting.formatMoney(total_fcc_opCost/12));

}