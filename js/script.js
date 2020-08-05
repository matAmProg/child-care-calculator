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
  totalTeachers  ;

  var eduProgram = occupancy = progAndAdmin = 0;

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
    ctc_facilities: 1643,
    ctc_slots: 98597,
    fcc_facilities: 866,
    fcc_slots: 6928,
  },
];

//FUNCTION TO GET STATE
function getState() {
  stateSelected = $("select").val();
  checkState();
}

//FUNCTION TO CHECK IF STATE IS SELECTED
function checkState() {
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
  if (!checkState()) {
    return;
  }
  selectedRatio = $("input[name='ratios']:checked").val();

  //POPULATING BASE VALUES FOR CLASSROOMS
  if ($("input[name='infantClassrooms']").val() == "") {
    $("input[name='infantClassrooms']").val(1);
  }

  if ($("input[name='toddlerClassrooms']").val() == "") {
    $("input[name='toddlerClassrooms']").val(1);
  }

  if ($("input[name='pre3Classrooms']").val() == "") {
    $("input[name='pre3Classrooms']").val(1);
  }

  if ($("input[name='pre4Classrooms']").val() == "") {
    $("input[name='pre4Classrooms']").val(1);
  }

  populateSizeOfCenter(stateSelected);
  calculateTotal();
  getSalaryLevel();
  
}

/**FUNCTION TO POPULATE SIZE OF CENTER RATIO AND GROUPSIZE FIELDS**/
function populateSizeOfCenter(state) {
  if (selectedRatio == "current") {
    $.getJSON("json/child_care_center.json", function (data) {
      //POPULATING RATIOS COLUMN
      $("input[name='infantRatio']").val(data[state].pre_covid_infant_ratio);
      $("input[name='toddlerRatio']").val(data[state].pre_covid_toddler_ratio);
      $("input[name='pre3Ratio']").val(data[state].pre_covid_pre3_ratio);
      $("input[name='pre4Ratio']").val(data[state].pre_covid_pre4_ratio);

      //POPULATING GROUPSIZE COLUMN
      $("input[name='infantGroupSize']").val(
        data[state].pre_covid_infant_groupsize
      );
      $("input[name='toddlerGroupSize']").val(
        data[state].pre_covid_toddler_groupsize
      );
      $("input[name='pre3GroupSize']").val(
        data[state].pre_covid_pre3_groupsize
      );
      $("input[name='pre4GroupSize']").val(
        data[state].pre_covid_pre4_groupsize
      );
    });
  }

  if (selectedRatio == "covid") {
    $.getJSON("json/child_care_center.json", function (data) {
      //POPULATING RATIOS COLUMN
      $("input[name='infantRatio']").val(data[state].covid_infant_ratio);
      $("input[name='toddlerRatio']").val(data[state].covid_toddler_ratio);
      $("input[name='pre3Ratio']").val(data[state].covid_pre3_ratio);
      $("input[name='pre4Ratio']").val(data[state].covid_pre4_ratio);

      //POPULATING GROUPSIZE COLUMN
      $("input[name='infantGroupSize']").val(
        data[state].covid_infant_groupsize
      );
      $("input[name='toddlerGroupSize']").val(
        data[state].covid_toddler_groupsize
      );
      $("input[name='pre3GroupSize']").val(data[state].covid_pre3_groupsize);
      $("input[name='pre4GroupSize']").val(data[state].covid_pre4_groupsize);
    });
  }
}

//FUNCTION TO CALCULATE TOTAL CLASSROOMS AND CHILDREN
function calculateTotal() {
  infantClassrooms = parseInt($("input[name='infantClassrooms']").val());
  toddlerClassrooms = parseInt($("input[name='toddlerClassrooms']").val());
  pre3Classrooms = parseInt($("input[name='pre3Classrooms']").val());
  pre4Classrooms = parseInt($("input[name='pre4Classrooms']").val());

  classTotal =
    infantClassrooms + toddlerClassrooms + pre3Classrooms + pre4Classrooms;

  if (!isNaN(classTotal)) {
    document.getElementById("classTotal").innerHTML =
      "<strong>" + classTotal + "</strong>";
  }

  if (selectedRatio == "covid") {
    $.getJSON("json/child_care_center.json", function (data) {
      if (!isNaN(infantClassrooms)) {
        infantChildren =
          infantClassrooms * data[stateSelected].covid_infant_groupsize;
        $("input[name='infantChildren']").val(infantChildren);
      }

      if (!isNaN(toddlerClassrooms)) {
        toddlerChildren =
          toddlerClassrooms * data[stateSelected].covid_toddler_groupsize;
        $("input[name='toddlerChildren']").val(toddlerChildren);
      }

      if (!isNaN(pre3Classrooms)) {
        pre3Children =
          pre3Classrooms * data[stateSelected].covid_pre3_groupsize;
        $("input[name='pre3Children']").val(pre3Children);
      }

      if (!isNaN(pre4Classrooms)) {
        pre4Children =
          pre4Classrooms * data[stateSelected].covid_pre4_groupsize;
        $("input[name='pre4Children']").val(pre4Children);
      }

      childTotal =
        infantChildren + toddlerChildren + pre3Children + pre4Children;
      $("#childTotal").html(childTotal);
    });
  }

  if (selectedRatio == "current") {
    $.getJSON("json/child_care_center.json", function (data) {
      if (!isNaN(infantClassrooms)) {
        infantChildren =
          infantClassrooms * data[stateSelected].pre_covid_infant_groupsize;
        $("input[name='infantChildren']").val(infantChildren);
      }

      if (!isNaN(toddlerClassrooms)) {
        toddlerChildren =
          toddlerClassrooms * data[stateSelected].pre_covid_toddler_groupsize;
        $("input[name='toddlerChildren']").val(toddlerChildren);
      }

      if (!isNaN(pre3Classrooms)) {
        pre3Children =
          pre3Classrooms * data[stateSelected].pre_covid_pre3_groupsize;
        $("input[name='pre3Children']").val(pre3Children);
      }

      if (!isNaN(pre4Classrooms)) {
        pre4Children =
          pre4Classrooms * data[stateSelected].pre_covid_pre4_groupsize;
        $("input[name='pre4Children']").val(pre4Children);
      }

      childTotal =
        infantChildren + toddlerChildren + pre3Children + pre4Children;
      $("#childTotal").html(childTotal);
    });
  }
}

//FUNCTION TO GET SALARY
function getSalaryLevel() {
  var familyCareForm = document.forms["familyCareForm"];
  salaryLevelFamilyCare = familyCareForm.elements["salary"].value;

  var childCareForm = document.forms["childCareForm"];
  salaryLevelChildCare = childCareForm.elements["salary"].value;

  console.log(salaryLevelChildCare + " --> salaryLevelChildcare");
  

  //POPULATING BASE VALUES FOR STAFF FIELD
  if ($("#noOfProgramDirectors").val() == "") {
    $("#noOfProgramDirectors").val(1);
  }
  if ($("#noOfAssistantDirectors").val() == "") {
    $("#noOfAssistantDirectors").val(1);
  }
  if ($("#noOfAdministrativeAssistants").val() == "") {
    $("#noOfAdministrativeAssistants").val(1);
  }
  if ($("#noOfLeadTeachers").val() == "") {
    $("#noOfLeadTeachers").val(classTotal);
  }
  if ($("#noOfAssistantTeachers").val() == "") {
    noOfAssistantTeachers = infantClassrooms + toddlerClassrooms;
    $("#noOfAssistantTeachers").val(noOfAssistantTeachers);
  }

  populateStaff(salaryLevelChildCare);

  //populating Sick days and Paid leave fields
  if ($("#sickdays").val() == "") {
    $.getJSON("json/child_care_center.json", function (data) {
      $("#sickdays").val(data[stateSelected].sick_days);
    });
  }

  if ($("#paidLeave").val() == "") {
    $.getJSON("json/child_care_center.json", function (data) {
      $("#paidLeave").val(data[stateSelected].paid_leave);
    });
  }

  //COST PER FT EMPLOYEE
  if ($("input[type='checkbox']").prop("checked") == true) {
    $.getJSON("json/child_care_center.json", function (data) {
      $("input[name='costOfFTEmployee']").val(
        data[stateSelected].health_insurance
      );
    });
  }

  calcTotalPersonnelCost();
  calcTotalNonPersonnelCost();

  //TOTAL COST OF PERSONNEL & NON PERSONNEL
  totalPersonnel = personnelSubtotal + nonpersonnelSubtotal;
  

  //reserve fund
  reserveFundPercentage = 0.05;
  reserveFund = reserveFundPercentage * totalPersonnel;
  

  //Total expense
  totalExpense = totalPersonnel + reserveFund;
 

  //Cost per child calculations
  calcInfantsCost();
  calcToddlersCost();
  calcPre3Cost();
  calcPre4Cost();
}

//FUNCTION TO POPULATE STAFF FIELDS
function populateStaff(salaryLevel) {
  noOfProgramDirectors = $("#noOfProgramDirectors").val();
  noOfAssistantDirectors = $("#noOfAssistantDirectors").val();
  noOfAdministrativeAssistants = $("#noOfAdministrativeAssistants").val();
  noOfLeadTeachers = $("#noOfLeadTeachers").val();
  noOfAssistantTeachers = $("#noOfAssistantTeachers").val();

  if (salaryLevel == "bls") {
    $.getJSON("json/child_care_center.json", function (data) {
      if (!isNaN(noOfProgramDirectors)) {
        totalsalaryDirectors =
          noOfProgramDirectors * data[stateSelected].bls_director_salary;
          

        $("#salaryProgramDirectors").val(
          (accounting.formatMoney(totalsalaryDirectors)).slice(0, -3)
        );

        wageProgramDirectors = totalsalaryDirectors / 2080;
        $("#wageProgramDirectors").val(
          accounting.formatMoney(wageProgramDirectors)
        );
      }

      if (!isNaN(noOfAssistantDirectors)) {
        salaryAssistantDirectors =
          noOfAssistantDirectors *
          data[stateSelected].bls_assistant_director_salary;
        $("#salaryAssistantDirectors").val(
          (accounting.formatMoney(salaryAssistantDirectors)).slice(0,-3)
        );

        wageAssistantDirectors = salaryAssistantDirectors / 2080;
        $("#wageAssistantDirectors").val(
          accounting.formatMoney(wageAssistantDirectors)
        );
      }

      if (!isNaN(noOfAdministrativeAssistants)) {
        salaryAdministrativeAssistants =
          noOfAdministrativeAssistants *
          data[stateSelected].bls_administrative_assistant_salary;
        $("#salaryAdministrativeAssistants").val(
          (accounting.formatMoney(salaryAdministrativeAssistants)).slice(0, -3)
        );
        wageAdministrativeAssistants = salaryAdministrativeAssistants / 2080;
        $("#wageAdministrativeAssistants").val(
          accounting.formatMoney(wageAdministrativeAssistants)
        );
      }

      if (!isNaN(noOfLeadTeachers)) {
        salaryLeadTeachers =
          noOfLeadTeachers * data[stateSelected].bls_lead_teacher_salary;

        $("#salaryLeadTeachers").val(
          (accounting.formatMoney(salaryLeadTeachers)).slice(0, -3)
        );
        
        wageLeadTeachers = salaryLeadTeachers / 2080;
        $("#wageLeadTeachers").val(accounting.formatMoney(wageLeadTeachers));
      }

      if (!isNaN(noOfAssistantTeachers)) {
        salaryAssistantTeachers =
          noOfAssistantTeachers * data[stateSelected].bls_assistant_teacher_salary;
        $("#salaryAssistantTeachers").val(
          (accounting.formatMoney(salaryAssistantTeachers)).slice(0, -3)
        );

        wageAssistantTeachers = salaryAssistantTeachers / 2080;
        $("#wageAssistantTeachers").val(
          accounting.formatMoney(wageAssistantTeachers)
        );
      }

      totalTeachers =
        parseInt(noOfLeadTeachers) + parseInt(noOfAssistantTeachers);

      console.log(totalTeachers + " --> total teachers");  
      var dailyCoverage = 0.2;
      
      noOfSubstituteTeachers = totalTeachers * dailyCoverage;

      $("#noOfSubstituteTeachers").val(noOfSubstituteTeachers.toFixed(1));

      if (!isNaN(noOfSubstituteTeachers)) {
        salarySubsTeachers =
          noOfSubstituteTeachers * data[stateSelected].bls_floater_salary;
        $("#salarySubsTeachers").val(
          (accounting.formatMoney(salarySubsTeachers)).slice(0, -3)
        );

        wageSubsTeachers = salarySubsTeachers / 2080
        $("#wageSubsTeachers").val(accounting.formatMoney(wageSubsTeachers));
      }
    });
  }


  if (salaryLevel == "kg") {
    $.getJSON("json/child_care_center.json", function (data) {
      if (!isNaN(noOfProgramDirectors)) {
        totalsalaryDirectors =
          noOfProgramDirectors * data[stateSelected].Kg_director_salary;
          

        $("#salaryProgramDirectors").val(
          (accounting.formatMoney(totalsalaryDirectors)).slice(0, -3)
        );

        wageProgramDirectors = totalsalaryDirectors / 2080;
        $("#wageProgramDirectors").val(
          accounting.formatMoney(wageProgramDirectors)
        );
      }

      if (!isNaN(noOfAssistantDirectors)) {
        salaryAssistantDirectors =
          noOfAssistantDirectors *
          data[stateSelected].Kg_assistant_director_salary;
        $("#salaryAssistantDirectors").val(
          (accounting.formatMoney(salaryAssistantDirectors)).slice(0,-3)
        );

        wageAssistantDirectors = salaryAssistantDirectors / 2080;
        $("#wageAssistantDirectors").val(
          accounting.formatMoney(wageAssistantDirectors)
        );
      }

      if (!isNaN(noOfAdministrativeAssistants)) {
        salaryAdministrativeAssistants =
          noOfAdministrativeAssistants *
          data[stateSelected].Kg_administrative_assistant_salary;
        $("#salaryAdministrativeAssistants").val(
          (accounting.formatMoney(salaryAdministrativeAssistants)).slice(0, -3)
        );
        wageAdministrativeAssistants = salaryAdministrativeAssistants / 2080;
        $("#wageAdministrativeAssistants").val(
          accounting.formatMoney(wageAdministrativeAssistants)
        );
      }

      if (!isNaN(noOfLeadTeachers)) {
        salaryLeadTeachers =
          noOfLeadTeachers * data[stateSelected].Kg_lead_teacher_salary;

        $("#salaryLeadTeachers").val(
          (accounting.formatMoney(salaryLeadTeachers)).slice(0, -3)
        );
        
        wageLeadTeachers = salaryLeadTeachers / 2080;
        $("#wageLeadTeachers").val(accounting.formatMoney(wageLeadTeachers));
      }

      if (!isNaN(noOfAssistantTeachers)) {
        salaryAssistantTeachers =
          noOfAssistantTeachers * data[stateSelected].Kg_assistant_teacher_salary;
        $("#salaryAssistantTeachers").val(
          (accounting.formatMoney(salaryAssistantTeachers)).slice(0, -3)
        );

        wageAssistantTeachers = salaryAssistantTeachers / 2080;
        $("#wageAssistantTeachers").val(
          accounting.formatMoney(wageAssistantTeachers)
        );
      }

      totalTeachers =
        parseInt(noOfLeadTeachers) + parseInt(noOfAssistantTeachers);
      var dailyCoverage = 0.2;
      
      noOfSubstituteTeachers = totalTeachers * dailyCoverage;

      $("#noOfSubstituteTeachers").val(noOfSubstituteTeachers.toFixed(1));

      if (!isNaN(noOfSubstituteTeachers)) {
        salarySubsTeachers =
          noOfSubstituteTeachers * data[stateSelected].Kg_floater_salary;
        $("#salarySubsTeachers").val(
          (accounting.formatMoney(salarySubsTeachers)).slice(0, -3)
        );

        wageSubsTeachers = salarySubsTeachers / 2080;
        $("#wageSubsTeachers").val(accounting.formatMoney(wageSubsTeachers));
      }
    });
  }
}

//FUNCTION TO CONVERT SALARY TO WAGE
function salaryConverter(id) {
  if ($("#salary" + id).val() != "") {

    var salary = accounting.unformat($("#salary" + id).val());
    var wage = salary/2080;
    $("#wage" + id).val(accounting.formatMoney(wage));
  }
}

//FUNCTION TO CONVERT WAGE TO SALARY
function wageConverter(id) {
  if ($("#wage" + id).val() != "") {

    var wage = accounting.unformat($("#wage" + id).val());
    var salary = wage * 2080;
    $("#salary" + id).val((accounting.formatMoney(salary)).slice(0, -3));
  }
}

//FUNCTION TO CHECK FOR CHECKBOX
function checkHealth() {
  if ($("input[type='checkbox']").prop("checked") == false) {
    $("input[name='costOfFTEmployee']").val(0);
  } else {
    $("input[name='costOfFTEmployee']").val(statesVarArray[0].health_insurance);
  }

  if ($("#checkboxFCC").prop("checked") == false) {
    $("#costOfFTEmployeeFCC").val(0);
  } else {
    $("#costOfFTEmployeeFCC").val(statesVarArray[0].health_insurance);
  }
}

//FUNCTION TO CALCULATE TOTAL PERSONNEL COST
function calcTotalPersonnelCost() {
  //total admin staff wage

  
  
  adminStaffTotalWage =
    totalsalaryDirectors +
    salaryAssistantDirectors +
    salaryAdministrativeAssistants;
  

  //total teaching staff wage
  teachingStaffTotalWage =
    salaryLeadTeachers + salaryAssistantTeachers + salarySubsTeachers;
 

  //total staff wage
  staffTotalWage = adminStaffTotalWage + teachingStaffTotalWage;
  

  //total no of teaching staff
  totalTeachingStaff = totalTeachers + noOfSubstituteTeachers;
  

  paidLeave = $("#paidLeave").val();
  sickdays = $("#sickdays").val();

  //sub cost for paid leave

  var floaterWage = accounting.unformat($("#salarySubsTeachers").val());
  console.log(floaterWage + "floater wage");
  var floaterNo = $("#noOfSubstituteTeachers").val();

  var floaterSalary = floaterWage/floaterNo;
  console.log(floaterSalary+"floater sal");

  subsCostForPaidLeave =
    totalTeachingStaff *
    paidLeave *
    8 *
    (floaterSalary / 2080);
  

  //sub cost for sick leave
  subsCostForSickLeave =
    totalTeachingStaff *
    sickdays *
    8 *
    (floaterSalary / 2080);
  

  //total subs cost
  subsCostForLeaveTotal = subsCostForSickLeave + subsCostForPaidLeave;
  

  //total staff wage
  subTotalWages = staffTotalWage + subsCostForLeaveTotal;
  

  //CONST Mandatory benefits value
  mandatoryBenefitsVal = 0.1065;
  mandatoryBenefitsSalary = mandatoryBenefitsVal * subTotalWages;
  

  //Total staff
  totalStaff =
    totalTeachingStaff +
    parseInt($("#noOfProgramDirectors").val()) +
    parseInt($("#noOfAssistantDirectors").val()) +
    parseInt($("#noOfAdministrativeAssistants").val());
  

  //Additional Benefits
  additionalBenefits = totalStaff * statesVarArray[0].health_insurance;
  

  //Subtotal Personnel
  personnelSubtotal =
    subTotalWages + mandatoryBenefitsSalary + additionalBenefits;
  
}

//FUNCTION TO CALCULATE TOTAL NONPERSONNEL COST
function calcTotalNonPersonnelCost() {
  //Additional expenses
  if ($("input[name='deepCleaningCost']").val() == "") {
    $("input[name='deepCleaningCost']").val(4);
  }

  if ($("#costPerCleaning").val() == "") {
    $("#costPerCleaning").val(500);
  }

  //CONST cost per classroom
  costPerClassroom = 720;

  sanitationCost = costPerClassroom * classTotal;
  
  $("#sanitationCost").val(sanitationCost);

  if ($("#miscCost").val() != "") {
    miscCost = parseInt($("#miscCost").val());
  } else {
    $("#miscCost").val(0);
  }

  miscCost = miscCost;
  //Total additional cleaning
  totalAdditionalCleaning =
    (parseInt($("input[name='deepCleaningCost']").val()) *
      parseInt($("#costPerCleaning").val()) +
      sanitationCost) *
    12;
  

  //CONST Nonpersonnel expenses
  

  $.getJSON("json/child_care_center.json", function(data){

    eduProgram = data[stateSelected].NP_Education_program_for_children_and_staff * childTotal;
    console.log(eduProgram + " edu");

    occupancy = data[stateSelected].NP_Occupancy * classTotal;
    console.log(occupancy);

    progAndAdmin = data[stateSelected].NP_Program_management_and_administration * childTotal;
    console.log(progAndAdmin+" prog");


  });

  console.log(eduProgram + " eduprog")
  

  //Total Nonpersonnel Cost
  nonpersonnelSubtotal =
    totalAdditionalCleaning + eduProgram + occupancy + progAndAdmin;
  
}

//FUNCTION TO CALCULATE INFANT COST PER CHILD
function calcInfantsCost() {
  //infants cost
  infant_adminPersonnel = (adminStaffTotalWage / childTotal).toFixed(2);
  
  infantRatio = parseInt($("input[name='infantRatio']").val());
  
  infantTeachers = infantChildren / infantRatio;
  
  leadSalary = salaryLeadTeachers / noOfLeadTeachers;
  assistantTeacherSalary = salaryAssistantTeachers / noOfAssistantTeachers;
  
  infant_classPersonnel =
    (leadSalary +
      (infantTeachers - 1) * assistantTeacherSalary) /
    infantChildren;
  

  infant_floaters = salarySubsTeachers / classTotal / infantChildren;
  

  benefitsPerChild =
    (mandatoryBenefitsSalary + additionalBenefits) / childTotal;
  

  infant_subs = subsCostForLeaveTotal / classTotal / infantChildren;
  

  NP_ed_program = Math.round(eduProgram / childTotal);
  

  infant_NP_occupancy = Math.round(occupancy / classTotal / infantChildren);
  

  NP_admin = Math.round(progAndAdmin / childTotal);
  

  infant_cleaning = totalAdditionalCleaning / classTotal / infantChildren;
  

  miscCost = $("#miscCost").val();

  if (miscCost != 0) {
    miscCost = miscCost / childTotal;
    
  }

  op_reserve = Math.round(reserveFund / childTotal);
  

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
  

  $("#infantAnnualCost").html(accounting.formatMoney(infant_cost));
  $("#infantMonthlyCost").html(accounting.formatMoney(infant_cost / 12));
  $("#infantWeeklyCost").html(accounting.formatMoney(infant_cost / 52));
}

//FUNCTION TO CALCULATE INFANT COST PER CHILD
function calcToddlersCost() {
  //toddlers cost
  toddler_adminPersonnel = (adminStaffTotalWage / childTotal).toFixed(2);
  

  toddlerTeachers = 2;

  toddler_classPersonnel = (
    (leadSalary +
      (toddlerTeachers - 1) * assistantTeacherSalary) /
    toddlerChildren
  ).toFixed(2);
  

  toddler_floaters = (
    salarySubsTeachers /
    classTotal /
    toddlerChildren
  ).toFixed(2);
  

  benefitsPerChild = (
    (mandatoryBenefitsSalary + additionalBenefits) /
    childTotal
  ).toFixed(2);
  

  toddler_subs = (subsCostForLeaveTotal / classTotal / toddlerChildren).toFixed(
    2
  );
  

  NP_ed_program = Math.round(eduProgram / childTotal);
 

  toddler_NP_occupancy = Math.round(occupancy / classTotal / toddlerChildren);
  

  NP_admin = Math.round(progAndAdmin / childTotal);
  

  toddler_cleaning = Math.round(
    totalAdditionalCleaning / classTotal / toddlerChildren
  );
  

  miscCost = $("#miscCost").val();

  if (miscCost != 0) {
    miscCost = miscCost / childTotal;
    
  }

  op_reserve = Math.round(reserveFund / childTotal);
  

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
  

  $("#toddlerAnnualCost").html(accounting.formatMoney(toddler_cost));
  $("#toddlerMonthlyCost").html(accounting.formatMoney(toddler_cost / 12));
  $("#toddlerWeeklyCost").html(accounting.formatMoney(toddler_cost / 52));
}

//FUNCTION TO CALCULATE PRE-SCHOOL 3 COST PER CHILD
function calcPre3Cost() {
  //pre3 cost
  pre3_adminPersonnel = (adminStaffTotalWage / childTotal).toFixed(2);
  
  pre3Teachers = pre3Children / statesVarArray[0].ratios_current_pre3;

  pre3_classPersonnel = (
    (leadSalary +
      (pre3Teachers - 1) * assistantTeacherSalary) /
    pre3Children
  ).toFixed(2);
  

  pre3_floaters = (salarySubsTeachers / classTotal / pre3Children).toFixed(2);
  

  benefitsPerChild = (
    (mandatoryBenefitsSalary + additionalBenefits) /
    childTotal
  ).toFixed(2);
  

  pre3_subs = (subsCostForLeaveTotal / classTotal / pre3Children).toFixed(2);
  

  NP_ed_program = Math.round(eduProgram / childTotal);
  

  pre3_NP_occupancy = Math.round(occupancy / classTotal / pre3Children);
  

  NP_admin = Math.round(progAndAdmin / childTotal);
  

  pre3_cleaning = Math.round(
    totalAdditionalCleaning / classTotal / pre3Children
  );
  

  miscCost = $("#miscCost").val();

  if (miscCost != 0) {
    miscCost = miscCost / childTotal;
    
  }

  op_reserve = Math.round(reserveFund / childTotal);
  

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
  

  $("#pre3AnnualCost").html(accounting.formatMoney(pre3_cost));
  $("#pre3MonthlyCost").html(accounting.formatMoney(pre3_cost / 12));
  $("#pre3WeeklyCost").html(accounting.formatMoney(pre3_cost / 52));
}

//FUNCTION TO CALCULATE PRE SCHOOL 4 COST PER CHILD
function calcPre4Cost() {
  //pre4 cost
  pre4_adminPersonnel = (adminStaffTotalWage / childTotal).toFixed(2);
  

  pre4Teachers = pre4Children / statesVarArray[0].ratios_current_pre4;

  pre4_classPersonnel = (
    (leadSalary +
      (pre4Teachers - 1) * assistantTeacherSalary) /
    pre4Children
  ).toFixed(2);
  

  pre4_floaters = (salarySubsTeachers / classTotal / pre4Children).toFixed(2);
  

  benefitsPerChild = (
    (mandatoryBenefitsSalary + additionalBenefits) /
    childTotal
  ).toFixed(2);
  

  pre4_subs = (subsCostForLeaveTotal / classTotal / pre4Children).toFixed(2);
  

  NP_ed_program = Math.round(eduProgram / childTotal);
  

  pre4_NP_occupancy = Math.round(occupancy / classTotal / pre4Children);
  

  NP_admin = Math.round(progAndAdmin / childTotal);
  

  pre4_cleaning = Math.round(
    totalAdditionalCleaning / classTotal / pre4Children
  );
  

  miscCost = $("#miscCost").val();

  if (miscCost != 0) {
    miscCost = miscCost / childTotal;
    
  }

  op_reserve = Math.round(reserveFund / childTotal);
  

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

function populateFCC() {
  if ($("#noOfInfant").val() == "") {
    $("#noOfInfant").val(2);
  }

  if ($("#noOfToddler").val() == "") {
    $("#noOfToddler").val(1);
  }

  if ($("#noOfPre3").val() == "") {
    $("#noOfPre3").val(1);
  }

  if ($("#noOfPre4").val() == "") {
    $("#noOfPre4").val(2);
  }

  if ($("#noOfProvider").val() == "") {
    $("#noOfProvider").val(1);
  }

  if ($("#noOfAssistantTeachersFCC").val() == "") {
    $("#noOfAssistantTeachersFCC").val(1);
  }

  

  if (salaryLevelFamilyCare == "Kindergarten") {

    $.getJSON("json/child_care_center.json", function (data){

     salaryOfProvider =  $("#noOfProvider").val() * data[stateSelected].Kg_lead_teacher_salary;
      $("#salaryOfProvider").val((accounting.formatMoney(salaryOfProvider)).slice(0,-3));
      

      wageOfProvider = salaryOfProvider / 2080;
      $("#wageOfProvider").val(accounting.formatMoney(wageOfProvider));

      salaryOfAssistantTeachersFCC =  $("#noOfAssistantTeachersFCC").val() * data[stateSelected].Kg_assistant_teacher_salary;

      $("#salaryOfAssistantTeachersFCC").val((accounting.formatMoney(salaryOfAssistantTeachersFCC)).slice(0,-3));
      

      wageOfAssistantTeachersFCC = salaryOfAssistantTeachersFCC / 2080;
      $("#wageOfAssistantTeachersFCC").val(accounting.formatMoney(wageOfAssistantTeachersFCC));

      wageFloaterFCC = data[stateSelected].Kg_floater_salary / 2080;

    });

    

    
  }

  if (salaryLevelFamilyCare == "BLS") {

    $.getJSON("json/child_care_center.json", function (data){

     salaryOfProvider =  $("#noOfProvider").val() * data[stateSelected].bls_lead_teacher_salary;
      $("#salaryOfProvider").val((accounting.formatMoney(salaryOfProvider)).slice(0,-3));
      

      wageOfProvider = salaryOfProvider / 2080;
      $("#wageOfProvider").val(accounting.formatMoney(wageOfProvider));

      salaryOfAssistantTeachersFCC =  $("#noOfAssistantTeachersFCC").val() * data[stateSelected].bls_assistant_teacher_salary;

      $("#salaryOfAssistantTeachersFCC").val((accounting.formatMoney(salaryOfAssistantTeachersFCC)).slice(0,-3));
      

      wageOfAssistantTeachersFCC = salaryOfAssistantTeachersFCC / 2080;
      $("#wageOfAssistantTeachersFCC").val(accounting.formatMoney(wageOfAssistantTeachersFCC));

      wageFloaterFCC = data[stateSelected].bls_floater_salary / 2080;

    });

    

    
  }

  

  totalFTEmployeeFCC =
      parseInt($("#noOfProvider").val()) +
      parseInt($("#noOfAssistantTeachersFCC").val());

  $(".totalFTEmployee").html(totalFTEmployeeFCC);

  if ($("input[name='sickdaysFCC']").val() == "") {
    $("input[name='sickdaysFCC']").val(10);
  }

  if ($("input[name='paidLeaveFCC']").val() == "") {
    $("input[name='paidLeaveFCC']").val(10);
  }

  if ($("#checkboxFCC").prop("checked") == true) {
    $("#costOfFTEmployeeFCC").val(statesVarArray[0].health_insurance);
  }

  if ($("input[name='deepCleaningCostFCC']").val() == "") {
    $("input[name='deepCleaningCostFCC']").val(4);
  }

  if ($("input[name='costPerCleaningFCC']").val() == "") {
    $("input[name='costPerCleaningFCC']").val(250);
  }

  if ($("input[name='sanitationCostFCC']").val() == "") {
    $("input[name='sanitationCostFCC']").val(720);
  }

  if ($("input[name='miscCostFCC']").val() == "") {
    $("input[name='miscCostFCC']").val(0);
  }

  childTotalFCC =
    parseInt($("#noOfInfant").val()) +
    parseInt($("#noOfToddler").val()) +
    parseInt($("#noOfPre3").val()) +
    parseInt($("#noOfPre4").val());

  calcTotalWagesAndBenefitsFCC();
  calcInfantFCC();
  calcToddlerFCC();
  calcPre3FCC();
  calcPre4FCC();
}

function calcTotalWagesAndBenefitsFCC() {

  providerSalary = accounting.unformat($("#salaryOfProvider").val());
  
  assistantSalary = accounting.unformat($("#salaryOfAssistantTeachersFCC").val());

  totalWagesFCC =
  providerSalary +
  assistantSalary;

  console.log(totalWagesFCC) ; 
  mandatoryBenefitsFCC = (
    mandatoryBenefitsVal *
    (totalWagesFCC - providerSalary)
  ).toFixed(0);

  console.log(mandatoryBenefitsFCC);

  assistantTeacherUnitCostFCC = (
    assistantSalary /
    parseInt($("#noOfAssistantTeachersFCC").val())
  ).toFixed(0);

  sickDaysCostFCC = Math.round(
    $("input[name='sickdaysFCC']").val() *
      (assistantTeacherUnitCostFCC / 2080) *
      10
  );

  paidLeaveCostFCC = Math.round(
    $("input[name='paidLeaveFCC']").val() *
      (wageFloaterFCC) *
      10
  );

  totalSickDaysCostFCC = sickDaysCostFCC * totalFTEmployeeFCC;
  totalPaidLeaveCostFCC = paidLeaveCostFCC * totalFTEmployeeFCC;

  $.getJSON("json/child_care_center.json", function (data){

    healthInsuranceFCC = data[stateSelected].health_insurance;

  });
  totalHealthFCC = healthInsuranceFCC * totalFTEmployeeFCC;

  discretionaryBenefits =
    totalSickDaysCostFCC + totalPaidLeaveCostFCC + totalHealthFCC;

  totalWagesAndBenefitsFCC =
    parseInt(totalWagesFCC) +
    parseInt(mandatoryBenefitsFCC) +
    parseInt(discretionaryBenefits);

    console.log(totalWagesAndBenefitsFCC);
  

  //CONST VALUES
  np_adminFCC = 3725;
  np_programFCC = 7250;
  np_occupancyFCC = 3731;

  //Additional Cleaning Cost
  totalCleaningCostFCC =
    parseInt(costPerClassroom) +
    parseInt($("input[name='deepCleaningCostFCC']").val()) *
      parseInt($("input[name='costPerCleaningFCC']").val());

  totalOtherExpensesFCC =
    parseInt(np_adminFCC) +
    parseInt(np_programFCC) +
    parseInt(np_occupancyFCC) +
    parseInt(totalCleaningCostFCC);

  totalExpensesFCC =
    parseInt(totalWagesAndBenefitsFCC) + parseInt(totalOtherExpensesFCC);

  costPerChildFCC = parseInt(totalExpensesFCC) / parseInt(childTotalFCC);

  
}

function calcInfantFCC() {
  totalInfantCostFCC = costPerChildFCC * $("#noOfInfant").val();

  $("#infantAnnualCostFCC").html(accounting.formatMoney(totalInfantCostFCC));
  $("#infantMonthlyCostFCC").html(
    accounting.formatMoney(totalInfantCostFCC / 12)
  );
  $("#infantWeeklyCostFCC").html(
    accounting.formatMoney(totalInfantCostFCC / 52)
  );
}

function calcToddlerFCC() {
  totalToddlerCostFCC = costPerChildFCC * $("#noOfToddler").val();

  $("#toddlerAnnualCostFCC").html(accounting.formatMoney(totalToddlerCostFCC));
  $("#toddlerMonthlyCostFCC").html(
    accounting.formatMoney(totalToddlerCostFCC / 12)
  );
  $("#toddlerWeeklyCostFCC").html(
    accounting.formatMoney(totalToddlerCostFCC / 52)
  );
}

function calcPre3FCC() {
  totalPre3CostFCC = costPerChildFCC * $("#noOfPre3").val();

  $("#pre3AnnualCostFCC").html(accounting.formatMoney(totalPre3CostFCC));
  $("#pre3MonthlyCostFCC").html(accounting.formatMoney(totalPre3CostFCC / 12));
  $("#pre3WeeklyCostFCC").html(accounting.formatMoney(totalPre3CostFCC / 52));
}

function calcPre4FCC() {
  totalPre4CostFCC = costPerChildFCC * $("#noOfPre4").val();

  $("#pre4AnnualCostFCC").html(accounting.formatMoney(totalPre4CostFCC));
  $("#pre4MonthlyCostFCC").html(accounting.formatMoney(totalPre4CostFCC / 12));
  $("#pre4WeeklyCostFCC").html(accounting.formatMoney(totalPre4CostFCC / 52));
}

/**********SYSTEM COSTS**********/

function populateSC() {
  if (stateSelected == "Alabama") {
    if ($("#childCareFacilities").val() == "") {
      $("#childCareFacilities").val(statesVarArray[0].ctc_facilities);
    }

    if ($("#childCareSlots").val() == "") {
      $("#childCareSlots").val(statesVarArray[0].ctc_slots);
    }

    if ($("#familyHomeFacilities").val() == "") {
      $("#familyHomeFacilities").val(statesVarArray[0].fcc_facilities);
    }

    if ($("#familyHomeSlots").val() == "") {
      $("#familyHomeSlots").val(statesVarArray[0].fcc_slots);
    }
  }

  if ($("input[name='fixedCost']").val() == "") {
    $("input[name='fixedCost']").val(40);
  }

  if ($("input[name='operatingCost']").val() == "") {
    $("input[name='operatingCost']").val(60);
  }

  calcFixedCost();
  calcOpCost();
}

function calcFixedCost() {
  //CONST VAL

  fixedCostCTC = 48474;
  fixedCostFCC = 6772;

  fixedCostPercentage = ($("input[name='fixedCost']").val() / 100).toFixed(2);

  total_ctc_fixedCost =
    fixedCostPercentage *
    parseInt($("#childCareFacilities").val()) *
    fixedCostCTC;

  total_fcc_fixedCost =
    fixedCostPercentage *
    parseInt($("#familyHomeFacilities").val()) *
    fixedCostFCC;

  totalFixedCost =
    parseInt(total_ctc_fixedCost) + parseInt(total_fcc_fixedCost);
  

  $("#totalFixedCosts").html(accounting.formatMoney(totalFixedCost / 12));
  $("#totalChildCareFixedCost").html(
    accounting.formatMoney(total_ctc_fixedCost / 12)
  );
  $("#totalFamilyHomeFixedCost").html(
    accounting.formatMoney(total_fcc_fixedCost / 12)
  );
}

function calcOpCost() {
  infantMonthly = $("#infantMonthlyCost").html().substring(1);
  toddlerMonthly = $("#toddlerMonthlyCost").html().substring(1);
  preMonthly = $("#pre3MonthlyCost").html().substring(1);

  avgCostPerChild = Math.round(
    (parseInt(infantMonthly) +
      parseInt(toddlerMonthly) +
      parseInt(preMonthly)) /
      3
  );

  

  opCostPercentage = ($("input[name='operatingCost']").val() / 100).toFixed(2);

  total_ctc_opCost =
    parseInt($("#childCareSlots").val()) * opCostPercentage * avgCostPerChild;
  total_fcc_opCost =
    parseInt($("#familyHomeSlots").val()) *
    opCostPercentage *
    (costPerChildFCC / 12).toFixed(2);

  totalOpCost = parseInt(total_ctc_opCost) + parseInt(total_fcc_opCost);

  $("#totalOperatingCosts").html(accounting.formatMoney(totalOpCost / 12));
  $("#totalChildCareOperatingCost").html(
    accounting.formatMoney(total_ctc_opCost / 12)
  );
  $("#totalFamilyHomeOperatingCost").html(
    accounting.formatMoney(total_fcc_opCost / 12)
  );
}
