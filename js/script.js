$(document).ready(function () {
  $(".dropdown-trigger").dropdown();
  $(".tabs").tabs();
  $("select").formSelect();
});

//GLOBAL VARIABLES
var stateSelected,
  ratioSelected,
  infantClassrooms,
  toddlerClassrooms,
  pre3Classrooms,
  pre4Classrooms,
  classTotal,
  infantGroupSize,
  toddlerGroupSize,
  pre3GroupSize,
  pre4GroupSize,
  infantChildren,
  toddlerChildren,
  pre3Children,
  pre4Children,
  childTotal,
  salaryLevelCC,
  noOfAssistantTeachers,
  noOfProgramDirectors,
  noOfAssistantDirectors,
  noOfAdministrativeAssistants,
  noOfLeadTeachers,
  noOfSubstituteTeachers,
  salaryProgramDirectors,
  salaryAssistantDirectors,
  salaryAdministrativeAssistants,
  salaryLeadTeachers,
  salaryAssistantTeachers,
  salarySubsTeachers,
  wageProgramDirectors,
  wageAssistantDirectors,
  wageAdministrativeAssistants,
  wageLeadTeachers,
  wageAssistantTeachers,
  wageSubsTeachers,
  totalTeachers,
  sickDays,
  paidLeave,
  costPerFTEmployee,
  adminStaffTotalWage,
  teachingStaffTotalWage,
  staffTotalWage,
  totalTeachingStaff,
  subsCostForPaidLeave,
  subsCostForSickLeave,
  subsCostForLeaveTotal,
  subTotalWages,
  mandatoryBenefitsVal,
  mandatoryBenefitsSalary,
  totalStaff,
  additionalBenefits,
  personnelSubtotal,
  costPerClassroom,
  sanitationCost,
  eduProgram,
  occupancy,
  progAndAdmin,
  nonpersonnelSubtotal,
  totalPersonnel,
  reserveFundPercentage,
  reserveFund,
  totalExpense;

//Infant Cost Variables
var infant_adminPersonnel,
  infantRatio,
  infantTeachers,
  leadSalary,
  infant_classPersonnel,
  infant_floaters,
  benefitsPerChild,
  infant_subs,
  NP_ed_program,
  infant_NP_occupancy,
  NP_admin,
  infant_cleaning,
  op_reserve,
  infant_cost;

//FAMILY HOME VARIABLES
var salaryLevelFCC;

//CONSTANT VARIABLES
var dailyCoverage = 0.2;

//json variables
var dataC, dataF, dataS;

//Reading Child Care JSON file
$.getJSON("json/child_care_center.json", function (data) {
  dataC = data;
  console.log(dataC);
});

//Reading Family Care JSON file
$.getJSON("json/family_care_center.json", function (data) {
  dataF = data;
  console.log(dataF);
});

//Reading System Cost JSON file
$.getJSON("json/system_costs.json", function (data) {
  dataS = data;
  console.log(dataS);
});

//FUNCTION TO GET STATE
function getState() {
  stateSelected = $("select").val();
  console.log(stateSelected + " --Selected State");
}

//FUNCTION TO CHECK IF STATE IS SELECTED
function checkState() {
  if (stateSelected == undefined) {
    $("#stateAlert").show(500);
    return false;
  } else {
    $("#stateAlert").hide(500);
    return true;
  }
}

//FUNCTION TO GET RATIOS
function getRatio() {
  ratioSelected = $("input[name='ratios']:checked").val();
  if(ratioSelected == "precovid"){

    $("input[type='checkbox']").prop("checked", false);
    $("input[name='costOfFTEmployee']").val(0);
    $("#costOfFTEmployeeFCC").val(0);

  }

  if(ratioSelected == "covid"){

    $("input[type='checkbox']").prop("checked", true);
    $("input[name='costOfFTEmployee']").val(dataC[stateSelected].health_insurance);
    $("#costOfFTEmployeeFCC").val(dataF[stateSelected].health_insurance);


  }
  console.log(ratioSelected + " --> Ratio Selected!");
}

/**********CHILD CARE CENTER***********/

//FUNCTION TO POPULATE SIZE OF CENTER FIELDS

function populateSizeOfCenter() {
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

  if (ratioSelected == "covid") {
    //POPULATING RATIOS COLUMN
    $("input[name='infantRatio']").val(dataC[stateSelected].covid_infant_ratio);
    $("input[name='toddlerRatio']").val(
      dataC[stateSelected].covid_toddler_ratio
    );
    $("input[name='pre3Ratio']").val(dataC[stateSelected].covid_pre3_ratio);
    $("input[name='pre4Ratio']").val(dataC[stateSelected].covid_pre4_ratio);

    //POPULATING GROUPSIZE COLUMN
    $("input[name='infantGroupSize']").val(
      dataC[stateSelected].covid_infant_groupsize
    );
    $("input[name='toddlerGroupSize']").val(
      dataC[stateSelected].covid_toddler_groupsize
    );
    $("input[name='pre3GroupSize']").val(
      dataC[stateSelected].covid_pre3_groupsize
    );
    $("input[name='pre4GroupSize']").val(
      dataC[stateSelected].covid_pre4_groupsize
    );
  }

  if (ratioSelected == "precovid") {
    //POPULATING RATIOS COLUMN
    $("input[name='infantRatio']").val(
      dataC[stateSelected].pre_covid_infant_ratio
    );
    $("input[name='toddlerRatio']").val(
      dataC[stateSelected].pre_covid_toddler_ratio
    );
    $("input[name='pre3Ratio']").val(dataC[stateSelected].pre_covid_pre3_ratio);
    $("input[name='pre4Ratio']").val(dataC[stateSelected].pre_covid_pre4_ratio);

    //POPULATING GROUPSIZE COLUMN
    $("input[name='infantGroupSize']").val(
      dataC[stateSelected].pre_covid_infant_groupsize
    );
    $("input[name='toddlerGroupSize']").val(
      dataC[stateSelected].pre_covid_toddler_groupsize
    );
    $("input[name='pre3GroupSize']").val(
      dataC[stateSelected].pre_covid_pre3_groupsize
    );
    $("input[name='pre4GroupSize']").val(
      dataC[stateSelected].pre_covid_pre4_groupsize
    );
  }

  calcTotalChildren();
}

//FUNCTION TO CALCULATE TOTAL NO OF CHILDREN
function calcTotalChildren() {
  infantClassrooms = parseInt($("input[name='infantClassrooms']").val());
  toddlerClassrooms = parseInt($("input[name='toddlerClassrooms']").val());
  pre3Classrooms = parseInt($("input[name='pre3Classrooms']").val());
  pre4Classrooms = parseInt($("input[name='pre4Classrooms']").val());

  infantGroupSize = parseInt($("input[name='infantGroupSize']").val());
  toddlerGroupSize = parseInt($("input[name='toddlerGroupSize']").val());
  pre3GroupSize = parseInt($("input[name='pre3GroupSize']").val());
  pre4GroupSize = parseInt($("input[name='pre4GroupSize']").val());

  classTotal =
    infantClassrooms + toddlerClassrooms + pre3Classrooms + pre4Classrooms;

  $("#classTotal").html(classTotal);

  //POPULATING TOTAL CHILDREN COLUMN
  infantChildren = infantClassrooms * infantGroupSize;
  $("input[name='infantChildren']").val(infantChildren);

  toddlerChildren = toddlerClassrooms * toddlerGroupSize;
  $("input[name='toddlerChildren']").val(toddlerChildren);

  pre3Children = pre3Classrooms * pre3GroupSize;
  $("input[name='pre3Children']").val(pre3Children);

  pre4Children = pre4Classrooms * pre4GroupSize;
  $("input[name='pre4Children']").val(pre4Children);

  childTotal = infantChildren + toddlerChildren + pre3Children + pre4Children;
  $("#childTotal").html(childTotal);
}

//FUNCTION TO GET SALARY LEVEL OF THE STAFF
function getSalaryLevelCC() {
  salaryLevelCC = $("input[name='salary']:checked").val();

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
  populateStaff();
  populateBenefits();
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

//FUNCTION TO POPULATE STAFF
function populateStaff() {
  noOfProgramDirectors = parseInt($("#noOfProgramDirectors").val());
  noOfAssistantDirectors = parseInt($("#noOfAssistantDirectors").val());
  noOfAdministrativeAssistants = parseInt(
    $("#noOfAdministrativeAssistants").val()
  );
  noOfLeadTeachers = parseInt($("#noOfLeadTeachers").val());
  noOfAssistantTeachers = parseInt($("#noOfAssistantTeachers").val());

  if (salaryLevelCC == "bls") {
    //Program Director
    salaryProgramDirectors =
      noOfProgramDirectors * dataC[stateSelected].bls_director_salary;
    $("#salaryProgramDirectors").val(
      accounting.formatMoney(dataC[stateSelected].bls_director_salary).slice(0, -3)
    );
    wageProgramDirectors = dataC[stateSelected].bls_director_salary / 2080;
    $("#wageProgramDirectors").val(
      accounting.formatMoney(wageProgramDirectors)
    );

    //Assistant Director
    salaryAssistantDirectors =
      noOfAssistantDirectors *
      dataC[stateSelected].bls_assistant_director_salary;
    $("#salaryAssistantDirectors").val(
      accounting.formatMoney(dataC[stateSelected].bls_assistant_director_salary).slice(0, -3)
    );
    wageAssistantDirectors = dataC[stateSelected].bls_assistant_director_salary / 2080;
    $("#wageAssistantDirectors").val(
      accounting.formatMoney(wageAssistantDirectors)
    );

    //Administrative Assistant
    salaryAdministrativeAssistants =
      noOfAdministrativeAssistants *
      dataC[stateSelected].bls_administrative_assistant_salary;
    $("#salaryAdministrativeAssistants").val(
      accounting.formatMoney(dataC[stateSelected].bls_administrative_assistant_salary).slice(0, -3)
    );
    wageAdministrativeAssistants = dataC[stateSelected].bls_administrative_assistant_salary / 2080;
    $("#wageAdministrativeAssistants").val(
      accounting.formatMoney(wageAdministrativeAssistants)
    );

    //Lead Teacher
    salaryLeadTeachers =
      noOfLeadTeachers * dataC[stateSelected].bls_lead_teacher_salary;
    $("#salaryLeadTeachers").val(
      accounting.formatMoney(dataC[stateSelected].bls_lead_teacher_salary).slice(0, -3)
    );
    wageLeadTeachers = dataC[stateSelected].bls_lead_teacher_salary / 2080;
    $("#wageLeadTeachers").val(accounting.formatMoney(wageLeadTeachers));

    //Assistant Teacher
    salaryAssistantTeachers =
      noOfAssistantTeachers * dataC[stateSelected].bls_assistant_teacher_salary;
    $("#salaryAssistantTeachers").val(
      accounting.formatMoney(dataC[stateSelected].bls_assistant_teacher_salary).slice(0, -3)
    );
    wageAssistantTeachers = dataC[stateSelected].bls_assistant_teacher_salary / 2080;
    $("#wageAssistantTeachers").val(
      accounting.formatMoney(wageAssistantTeachers)
    );

    //Substitute Teacher
    totalTeachers = noOfLeadTeachers + noOfAssistantTeachers;

    //TO calc total no of floaters
    noOfSubstituteTeachers = totalTeachers * dailyCoverage;
    $("#noOfSubstituteTeachers").val(noOfSubstituteTeachers.toFixed(1));

    salarySubsTeachers =
      noOfSubstituteTeachers * dataC[stateSelected].bls_floater_salary;
    $("#salarySubsTeachers").val(
      accounting.formatMoney(dataC[stateSelected].bls_floater_salary).slice(0, -3)
    );

    wageSubsTeachers = dataC[stateSelected].bls_floater_salary / 2080;
    $("#wageSubsTeachers").val(accounting.formatMoney(wageSubsTeachers));
  }

  if (salaryLevelCC == "kg") {
    //Program Director
    salaryProgramDirectors =
      noOfProgramDirectors * dataC[stateSelected].Kg_director_salary;
    $("#salaryProgramDirectors").val(
      accounting.formatMoney(dataC[stateSelected].Kg_director_salary).slice(0, -3)
    );
    wageProgramDirectors = dataC[stateSelected].Kg_director_salary / 2080;
    $("#wageProgramDirectors").val(
      accounting.formatMoney(wageProgramDirectors)
    );

    //Assistant Director
    salaryAssistantDirectors =
      noOfAssistantDirectors *
      dataC[stateSelected].Kg_assistant_director_salary;
    $("#salaryAssistantDirectors").val(
      accounting.formatMoney(dataC[stateSelected].Kg_assistant_director_salary).slice(0, -3)
    );
    wageAssistantDirectors = dataC[stateSelected].Kg_assistant_director_salary / 2080;
    $("#wageAssistantDirectors").val(
      accounting.formatMoney(wageAssistantDirectors)
    );

    //Administrative Assistant
    salaryAdministrativeAssistants =
      noOfAdministrativeAssistants *
      dataC[stateSelected].Kg_administrative_assistant_salary;
    $("#salaryAdministrativeAssistants").val(
      accounting.formatMoney(dataC[stateSelected].Kg_administrative_assistant_salary).slice(0, -3)
    );
    wageAdministrativeAssistants = dataC[stateSelected].Kg_administrative_assistant_salary / 2080;
    $("#wageAdministrativeAssistants").val(
      accounting.formatMoney(wageAdministrativeAssistants)
    );

    //Lead Teacher
    salaryLeadTeachers =
      noOfLeadTeachers * dataC[stateSelected].Kg_lead_teacher_salary;
    $("#salaryLeadTeachers").val(
      accounting.formatMoney(dataC[stateSelected].Kg_lead_teacher_salary).slice(0, -3)
    );
    wageLeadTeachers = dataC[stateSelected].Kg_lead_teacher_salary / 2080;
    $("#wageLeadTeachers").val(accounting.formatMoney(wageLeadTeachers));

    //Assistant Teacher
    salaryAssistantTeachers =
      noOfAssistantTeachers * dataC[stateSelected].Kg_assistant_teacher_salary;
    $("#salaryAssistantTeachers").val(
      accounting.formatMoney(dataC[stateSelected].Kg_assistant_teacher_salary).slice(0, -3)
    );
    wageAssistantTeachers = dataC[stateSelected].Kg_assistant_teacher_salary / 2080;
    $("#wageAssistantTeachers").val(
      accounting.formatMoney(wageAssistantTeachers)
    );

    //Substitute Teacher
    totalTeachers = noOfLeadTeachers + noOfAssistantTeachers;

    //TO calc total no of floaters
    noOfSubstituteTeachers = totalTeachers * dailyCoverage;
    $("#noOfSubstituteTeachers").val(noOfSubstituteTeachers.toFixed(1));

    salarySubsTeachers =
      noOfSubstituteTeachers * dataC[stateSelected].Kg_floater_salary;
    $("#salarySubsTeachers").val(
      accounting.formatMoney(dataC[stateSelected].Kg_floater_salary).slice(0, -3)
    );

    wageSubsTeachers = dataC[stateSelected].Kg_floater_salary / 2080;
    $("#wageSubsTeachers").val(accounting.formatMoney(wageSubsTeachers));
  }
}

//FUNCTION TO CONVERT SALARY TO WAGE
function salaryConverter(id) {
  if ($("#salary" + id).val() != "") {
    var salary = accounting.unformat($("#salary" + id).val());
    var wage = salary / 2080;
    $("#wage" + id).val(accounting.formatMoney(wage));
  }
}

//FUNCTION TO CONVERT WAGE TO SALARY
function wageConverter(id) {
  if ($("#wage" + id).val() != "") {
    var wage = accounting.unformat($("#wage" + id).val());
    var salary = wage * 2080;
    $("#salary" + id).val(accounting.formatMoney(salary).slice(0, -3));
  }
}

//FUNCTION TO ADD CUSTOM FIELD

function addRow(divName) {
  var newRow = document.createElement("tr");
  $("#removeBtn").css("display", "block");
  $("#removeBtn2").css("display", "block");

  newRow.innerHTML =
    "<td><div class='input-field'><input type='text' placeholder='Staff Name' class='customStaffName'></div></td><td><div class='input-field'><input type='text'    id='noOfCustomStaff'></div></td><td><div class='input-field'><input type='text' class='salaryCustomStaff'></div></td><td><div class='input-field'><input type='text' class='wageCustomStaff'></div></td>";

  document.getElementById(divName).appendChild(newRow);
}

//FUNCTION TO REMOVE CUSTOM FIELD

function removeRow(divName) {
  $("#" + divName + " tr")
    .last()
    .remove();
}

//FUNCTION TO POPULATE BENEFITS

function populateBenefits() {
  //SICK DAYS

  sickDays = dataC[stateSelected].sick_days;
  $("#sickdays").val(sickDays);

  //PAID LEAVE

  paidLeave = dataC[stateSelected].paid_leave;
  $("#paidLeave").val(paidLeave);

  //COST PER FT EMPLOYEE
  if ($("input[type='checkbox']").prop("checked") == true) {
    costPerFTEmployee = dataC[stateSelected].health_insurance;
    $("input[name='costOfFTEmployee']").val(costPerFTEmployee);
  }

  //Additional expenses
  if ($("input[name='deepCleaningCost']").val() == "") {
    $("input[name='deepCleaningCost']").val(4);
  }

  if ($("#costPerCleaning").val() == "") {
    $("#costPerCleaning").val(
      dataC[stateSelected].covid_sanitation_cost_per_cleaning
    );
  }

  //CONST cost per classroom
  costPerClassroom =
    dataC[stateSelected].covid_sanitation_cost_per_classroom_per_month;

  sanitationCost = costPerClassroom * classTotal;

  $("#sanitationCost").val(sanitationCost);

  if ($("#miscCost").val() != "") {
    miscCost = parseInt($("#miscCost").val());
  } else {
    $("#miscCost").val(0);
  }
}

//FUNCTION TO CHECK FOR CHECKBOX
function checkHealth() {
  if ($("input[type='checkbox']").prop("checked") == false) {
    $("input[name='costOfFTEmployee']").val(0);
  } else {
    $("input[name='costOfFTEmployee']").val(
      dataC[stateSelected].health_insurance
    );
  }

    if ($("#checkboxFCC").prop("checked") == false) {
      $("#costOfFTEmployeeFCC").val(0);
    } else{
      $("#costOfFTEmployeeFCC").val(dataF[stateSelected].health_insurance);
    }
}

//FUNCTION TO CALC TOTAL PERSONNEL COST
function calcTotalPersonnelCost() {
  //total admin staff wage

  costPerFTEmployee = parseInt($("input[name='costOfFTEmployee']").val());
  sickDays = parseInt($("#sickdays").val());
  paidLeave = parseInt($("#paidLeave").val());
  adminStaffTotalWage =
    salaryProgramDirectors +
    salaryAssistantDirectors +
    salaryAdministrativeAssistants;

  //total teaching staff wage
  teachingStaffTotalWage =
    salaryLeadTeachers + salaryAssistantTeachers + salarySubsTeachers;

  //total staff wage
  staffTotalWage = adminStaffTotalWage + teachingStaffTotalWage;

  //total no of teaching staff
  totalTeachingStaff = totalTeachers + noOfSubstituteTeachers;

  subsCostForPaidLeave =
    totalTeachingStaff * paidLeave * 8 * (salarySubsTeachers / 2080);

  //sub cost for sick leave
  subsCostForSickLeave =
    totalTeachingStaff * sickDays * 8 * (salarySubsTeachers / 2080);

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

  additionalBenefits = totalStaff * costPerFTEmployee;

  //Subtotal Personnel
  personnelSubtotal =
    subTotalWages + mandatoryBenefitsSalary + additionalBenefits;
}

//FUNCTION TO CALCULATE TOTAL NONPERSONNEL COST
function calcTotalNonPersonnelCost() {
  //Total additional cleaning

  sanitationCost = parseInt($("#sanitationCost").val());
  console.log(sanitationCost);
  totalAdditionalCleaning =
    (parseInt($("input[name='deepCleaningCost']").val()) *
      parseInt($("#costPerCleaning").val()) +
      sanitationCost) *
    12;

  //CONST Nonpersonnel expenses

  eduProgram =
    dataC[stateSelected].NP_Education_program_for_children_and_staff *
    childTotal;

  occupancy = dataC[stateSelected].NP_Occupancy * classTotal;

  progAndAdmin =
    dataC[stateSelected].NP_Program_management_and_administration * childTotal;

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
    (leadSalary + (infantTeachers - 1) * assistantTeacherSalary) /
    infantChildren;

  infant_floaters = salarySubsTeachers / classTotal / infantChildren;

  benefitsPerChild =
    (mandatoryBenefitsSalary + additionalBenefits) / childTotal;

  infant_subs = subsCostForLeaveTotal / classTotal / infantChildren;

  NP_ed_program = Math.round(eduProgram / childTotal);

  infant_NP_occupancy = Math.round(occupancy / classTotal / infantChildren);

  NP_admin = Math.round(progAndAdmin / childTotal);

  infant_cleaning = totalAdditionalCleaning / classTotal / infantChildren;

  miscCost = parseInt($("#miscCost").val());

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
    (leadSalary + (toddlerTeachers - 1) * assistantTeacherSalary) /
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

  miscCost = parseInt($("#miscCost").val());

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

  pre3Ratio = parseInt($("input[name='pre3Ratio']").val());

  pre3Teachers = pre3Children / pre3Ratio;

  pre3_classPersonnel = (
    (leadSalary + (pre3Teachers - 1) * assistantTeacherSalary) /
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

  miscCost = parseInt($("#miscCost").val());

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

  pre4Ratio = parseInt($("input[name='pre4Ratio']").val());

  pre4Teachers = pre4Children / pre4Ratio;

  pre4_classPersonnel = (
    (leadSalary + (pre4Teachers - 1) * assistantTeacherSalary) /
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

  miscCost = parseInt($("#miscCost").val());

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

/**********FAMILY CHILD CARE HOMES**********/

function getSalaryLevelFCC() {
  salaryLevelFCC = $("input[name='salaryFCC']:checked").val();
}

//FUNCTION TO POPULATE FAMILY CARE FIELDS
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

  getSalaryLevelFCC();

  if (salaryLevelFCC == "BLS") {
    salaryOfProvider =
      parseInt($("#noOfProvider").val()) *
      dataF[stateSelected].bls_lead_teacher_salary;

    $("#salaryOfProvider").val(
      accounting.formatMoney(dataF[stateSelected].bls_lead_teacher_salary).slice(0, -3)
    );

    wageOfProvider = dataF[stateSelected].bls_lead_teacher_salary / 2080;
    $("#wageOfProvider").val(accounting.formatMoney(wageOfProvider));

    salaryOfAssistantTeachersFCC =
      $("#noOfAssistantTeachersFCC").val() *
      dataF[stateSelected].bls_assistant_teacher_salary;

    $("#salaryOfAssistantTeachersFCC").val(
      accounting.formatMoney(dataF[stateSelected].bls_assistant_teacher_salary).slice(0, -3)
    );

    wageOfAssistantTeachersFCC = dataF[stateSelected].bls_assistant_teacher_salary / 2080;
    $("#wageOfAssistantTeachersFCC").val(
      accounting.formatMoney(wageOfAssistantTeachersFCC)
    );

    wageFloaterFCC = dataC[stateSelected].bls_floater_salary / 2080;
  }

  if (salaryLevelFCC == "Kindergarten") {
    salaryOfProvider =
      parseInt($("#noOfProvider").val()) *
      dataF[stateSelected].kg_lead_teacher_salary;

    $("#salaryOfProvider").val(
      accounting.formatMoney(salaryOfProvider).slice(0, -3)
    );

    wageOfProvider = salaryOfProvider / 2080;
    $("#wageOfProvider").val(accounting.formatMoney(wageOfProvider));

    salaryOfAssistantTeachersFCC =
      $("#noOfAssistantTeachersFCC").val() *
      dataF[stateSelected].kg_assistant_teacher_salary;

    $("#salaryOfAssistantTeachersFCC").val(
      accounting.formatMoney(salaryOfAssistantTeachersFCC).slice(0, -3)
    );

    wageOfAssistantTeachersFCC = salaryOfAssistantTeachersFCC / 2080;
    $("#wageOfAssistantTeachersFCC").val(
      accounting.formatMoney(wageOfAssistantTeachersFCC)
    );

    wageFloaterFCC = dataC[stateSelected].Kg_floater_salary / 2080;
  }

  totalFTEmployeeFCC =
    parseInt($("#noOfProvider").val()) +
    parseInt($("#noOfAssistantTeachersFCC").val());

  $(".totalFTEmployee").html(totalFTEmployeeFCC);

  if ($("input[name='sickdaysFCC']").val() == "") {
    sickDaysFCC = dataF[stateSelected].sick_days;
    $("input[name='sickdaysFCC']").val(sickDaysFCC);
  }

  if ($("input[name='paidLeaveFCC']").val() == "") {
    paidLeaveFCC = dataF[stateSelected].paid_leave;
    $("input[name='paidLeaveFCC']").val(paidLeaveFCC);
  }

  if ($("#checkboxFCC").prop("checked") == true) {
    $("#costOfFTEmployeeFCC").val(dataF[stateSelected].health_insurance);
  }

  if ($("input[name='deepCleaningCostFCC']").val() == "") {
    $("input[name='deepCleaningCostFCC']").val(4);
  }

  if ($("input[name='costPerCleaningFCC']").val() == "") {
    $("input[name='costPerCleaningFCC']").val(
      dataF[stateSelected].covid_sanitation_cost_per_cleaning
    );
  }

  if ($("input[name='sanitationCostFCC']").val() == "") {
    $("input[name='sanitationCostFCC']").val(
      dataF[stateSelected].covid_sanitation_cost_per_month
    );
  }

  if ($("input[name='miscCostFCC']").val() == "") {
    $("input[name='miscCostFCC']").val(0);
  }

  childTotalFCC =
    parseInt($("#noOfInfant").val()) +
    parseInt($("#noOfToddler").val()) +
    parseInt($("#noOfPre3").val()) +
    parseInt($("#noOfPre4").val());

  $(".childTotalFCC").html(childTotalFCC);

  calcTotalWagesAndBenefitsFCC();
  calcInfantFCC();
  calcToddlerFCC();
  calcPre3FCC();
  calcPre4FCC();
}

//FUNCTION TO CALCULATE WAGES AND BENEFITS TOTAL
function calcTotalWagesAndBenefitsFCC() {
  providerSalary = salaryOfProvider;
  console.log(providerSalary);
  assistantSalary = salaryOfAssistantTeachersFCC;

  console.log(assistantSalary);
  totalWagesFCC = providerSalary + assistantSalary;

  console.log(totalWagesFCC);
  mandatoryBenefitsFCC = (
    mandatoryBenefitsVal *
    (totalWagesFCC - providerSalary)
  ).toFixed(0);

  console.log(mandatoryBenefitsFCC);

  assistantTeacherUnitCostFCC = (
    assistantSalary / parseInt($("#noOfAssistantTeachersFCC").val())
  ).toFixed(0);
  
  console.log(assistantTeacherUnitCostFCC);
  sickDaysCostFCC = Math.round(
    parseInt($("input[name='sickdaysFCC']").val()) *
      (assistantTeacherUnitCostFCC / 2080) *
      10
  );
  console.log(sickDaysCostFCC);  
  paidLeaveCostFCC = Math.round(
    parseInt($("input[name='paidLeaveFCC']").val()) * wageFloaterFCC * 10
  );

  console.log(paidLeaveCostFCC);

  totalSickDaysCostFCC = sickDaysCostFCC * totalFTEmployeeFCC;
  totalPaidLeaveCostFCC = paidLeaveCostFCC * totalFTEmployeeFCC;

  console.log(totalSickDaysCostFCC);
  console.log(totalPaidLeaveCostFCC);
  healthInsuranceFCC = parseInt($("#costOfFTEmployeeFCC").val());

  totalHealthFCC = healthInsuranceFCC * totalFTEmployeeFCC;
  console.log(totalHealthFCC);
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

  costPerClassroom =  parseInt($("input[name='sanitationCostFCC']").val());
  //Additional Cleaning Cost
  totalCleaningCostFCC =
    parseInt(costPerClassroom) +
    parseInt($("input[name='deepCleaningCostFCC']").val()) *
      parseInt($("input[name='costPerCleaningFCC']").val());
  
  miscCostFCC = parseInt($("input[name='miscCostFCC']").val());    

  totalOtherExpensesFCC =
    parseInt(np_adminFCC) +
    parseInt(np_programFCC) +
    parseInt(np_occupancyFCC) +
    parseInt(totalCleaningCostFCC)+
    parseInt(miscCostFCC);

  totalExpensesFCC =
    parseInt(totalWagesAndBenefitsFCC) + parseInt(totalOtherExpensesFCC);

    console.log(totalExpensesFCC);  
  costPerChildFCC = parseInt(totalExpensesFCC) / parseInt(childTotalFCC);
  console.log(costPerChildFCC); 
}

//FUNCTION TO CALCULATE INFANT COST
function calcInfantFCC() {
  totalInfantCostFCC = Math.round(costPerChildFCC);
  console.log(accounting.formatMoney(totalInfantCostFCC));
  $("#infantAnnualCostFCC").html(accounting.formatMoney(totalInfantCostFCC));
  $("#infantMonthlyCostFCC").html(
    accounting.formatMoney(totalInfantCostFCC / 12)
  );
  $("#infantWeeklyCostFCC").html(
    accounting.formatMoney(totalInfantCostFCC / 52)
  );
}

//FUNCTION TO CALCULATE TODDLER COST
function calcToddlerFCC() {
  totalToddlerCostFCC = Math.round(costPerChildFCC);

  $("#toddlerAnnualCostFCC").html(accounting.formatMoney(totalToddlerCostFCC));
  $("#toddlerMonthlyCostFCC").html(
    accounting.formatMoney(totalToddlerCostFCC / 12)
  );
  $("#toddlerWeeklyCostFCC").html(
    accounting.formatMoney(totalToddlerCostFCC / 52)
  );
}

//FUNCTION TO CALCULATE PRE3 COST
function calcPre3FCC() {
  totalPre3CostFCC = Math.round(costPerChildFCC);

  $("#pre3AnnualCostFCC").html(accounting.formatMoney(totalPre3CostFCC));
  $("#pre3MonthlyCostFCC").html(accounting.formatMoney(totalPre3CostFCC / 12));
  $("#pre3WeeklyCostFCC").html(accounting.formatMoney(totalPre3CostFCC / 52));
}

//FUNCTION TO CALCULATE PRE4 COST
function calcPre4FCC() {
  totalPre4CostFCC = Math.round(costPerChildFCC);

  $("#pre4AnnualCostFCC").html(accounting.formatMoney(totalPre4CostFCC));
  $("#pre4MonthlyCostFCC").html(accounting.formatMoney(totalPre4CostFCC / 12));
  $("#pre4WeeklyCostFCC").html(accounting.formatMoney(totalPre4CostFCC / 52));
}

/**********SYSTEM COSTS**********/

//FUNCTION TO POPULATE SYSTEM FIELDS
function populateSC() {
  $("#childCareFacilities").val(dataS[stateSelected].centers_programs);

  $("#childCareSlots").val(dataS[stateSelected].centers_slots);

  $("#familyHomeFacilities").val(dataS[stateSelected].FCC_programs);

  $("#familyHomeSlots").val(dataS[stateSelected].FCC_slots);

  $("input[name='fixedCost']").val(40);

  $("input[name='operatingCost']").val(60);

  calcFixedCost();
  calcOpCost();
}

//FUNCTION TO CALC FIXED COST
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
  
  //FUNCTION TO CALC OPERATING COST
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
  
    opCostPercentage = (parseInt($("input[name='operatingCost']").val()) / 100).toFixed(2);
  
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
