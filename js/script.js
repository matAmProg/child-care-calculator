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

  //populating base values for classrooms
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

  populateSizeOfCenter();
  calculateTotal();
}

/**FUNCTION TO POPULATE SIZE OF CENTER FIELDS**/

function populateSizeOfCenter() {
  if (selectedRatio == "current") {
    switch (stateSelected) {
      case "AL":
        console.log("this is alabama!!");
        $.getJSON("json/child_care_center.json", function (data) {
          //populating ratios column
          $("input[name='infantRatio']").val(
            data.Alabama.pre_covid_infant_ratio
          );
          $("input[name='toddlerRatio']").val(
            data.Alabama.pre_covid_toddler_ratio
          );
          $("input[name='pre3Ratio']").val(data.Alabama.pre_covid_pre3_ratio);
          $("input[name='pre4Ratio']").val(data.Alabama.pre_covid_pre4_ratio);

          //populating groupsize column
          $("input[name='infantGroupSize']").val(
            data.Alabama.pre_covid_infant_groupsize
          );
          $("input[name='toddlerGroupSize']").val(
            data.Alabama.pre_covid_toddler_groupsize
          );
          $("input[name='pre3GroupSize']").val(
            data.Alabama.pre_covid_pre3_groupsize
          );
          $("input[name='pre4GroupSize']").val(
            data.Alabama.pre_covid_pre4_groupsize
          );
        });
        break;

      case "AK":
        console.log("this is AK!!");
        $.getJSON("json/child_care_center.json", function (data) {
          //populating ratios column
          $("input[name='infantRatio']").val(
            data.Alaska.pre_covid_infant_ratio
          );
          $("input[name='toddlerRatio']").val(
            data.Alaska.pre_covid_toddler_ratio
          );
          $("input[name='pre3Ratio']").val(data.Alaska.pre_covid_pre3_ratio);
          $("input[name='pre4Ratio']").val(data.Alaska.pre_covid_pre4_ratio);

          //populating groupsize column
          $("input[name='infantGroupSize']").val(
            data.Alaska.pre_covid_infant_groupsize
          );
          $("input[name='toddlerGroupSize']").val(
            data.Alaska.pre_covid_toddler_groupsize
          );
          $("input[name='pre3GroupSize']").val(
            data.Alaska.pre_covid_pre3_groupsize
          );
          $("input[name='pre4GroupSize']").val(
            data.Alaska.pre_covid_pre4_groupsize
          );
        });
        break;

      case "AZ":
        console.log("this is AZ!!");
        $.getJSON("json/child_care_center.json", function (data) {
          //populating ratios column
          $("input[name='infantRatio']").val(
            data.Arizona.pre_covid_infant_ratio
          );
          $("input[name='toddlerRatio']").val(
            data.Arizona.pre_covid_toddler_ratio
          );
          $("input[name='pre3Ratio']").val(data.Arizona.pre_covid_pre3_ratio);
          $("input[name='pre4Ratio']").val(data.Arizona.pre_covid_pre4_ratio);

          //populating groupsize column
          $("input[name='infantGroupSize']").val(
            data.Arizona.pre_covid_infant_groupsize
          );
          $("input[name='toddlerGroupSize']").val(
            data.Arizona.pre_covid_toddler_groupsize
          );
          $("input[name='pre3GroupSize']").val(
            data.Arizona.pre_covid_pre3_groupsize
          );
          $("input[name='pre4GroupSize']").val(
            data.Arizona.pre_covid_pre4_groupsize
          );
        });
        break;

      case "AR":
        console.log("this is AR!!");
        $.getJSON("json/child_care_center.json", function (data) {
          //populating ratios column
          $("input[name='infantRatio']").val(
            data.Arkansas.pre_covid_infant_ratio
          );
          $("input[name='toddlerRatio']").val(
            data.Arkansas.pre_covid_toddler_ratio
          );
          $("input[name='pre3Ratio']").val(data.Arkansas.pre_covid_pre3_ratio);
          $("input[name='pre4Ratio']").val(data.Arkansas.pre_covid_pre4_ratio);

          //populating groupsize column
          $("input[name='infantGroupSize']").val(
            data.Arkansas.pre_covid_infant_groupsize
          );
          $("input[name='toddlerGroupSize']").val(
            data.Arkansas.pre_covid_toddler_groupsize
          );
          $("input[name='pre3GroupSize']").val(
            data.Arkansas.pre_covid_pre3_groupsize
          );
          $("input[name='pre4GroupSize']").val(
            data.Arkansas.pre_covid_pre4_groupsize
          );
        });
        break;

      case "CA":
        console.log("this is CA!!");
        $.getJSON("json/child_care_center.json", function (data) {
          //populating ratios column
          $("input[name='infantRatio']").val(
            data.California.pre_covid_infant_ratio
          );
          $("input[name='toddlerRatio']").val(
            data.California.pre_covid_toddler_ratio
          );
          $("input[name='pre3Ratio']").val(
            data.California.pre_covid_pre3_ratio
          );
          $("input[name='pre4Ratio']").val(
            data.California.pre_covid_pre4_ratio
          );

          //populating groupsize column
          $("input[name='infantGroupSize']").val(
            data.California.pre_covid_infant_groupsize
          );
          $("input[name='toddlerGroupSize']").val(
            data.California.pre_covid_toddler_groupsize
          );
          $("input[name='pre3GroupSize']").val(
            data.California.pre_covid_pre3_groupsize
          );
          $("input[name='pre4GroupSize']").val(
            data.California.pre_covid_pre4_groupsize
          );
        });
        break;

      case "CO":
        console.log("this is CO!!");
        $.getJSON("json/child_care_center.json", function (data) {
          //populating ratios column
          $("input[name='infantRatio']").val(
            data.Colorado.pre_covid_infant_ratio
          );
          $("input[name='toddlerRatio']").val(
            data.Colorado.pre_covid_toddler_ratio
          );
          $("input[name='pre3Ratio']").val(data.Colorado.pre_covid_pre3_ratio);
          $("input[name='pre4Ratio']").val(data.Colorado.pre_covid_pre4_ratio);

          //populating groupsize column
          $("input[name='infantGroupSize']").val(
            data.Colorado.pre_covid_infant_groupsize
          );
          $("input[name='toddlerGroupSize']").val(
            data.Colorado.pre_covid_toddler_groupsize
          );
          $("input[name='pre3GroupSize']").val(
            data.Colorado.pre_covid_pre3_groupsize
          );
          $("input[name='pre4GroupSize']").val(
            data.Colorado.pre_covid_pre4_groupsize
          );
        });
        break;

      case "CT":
        console.log("this is CT!!");
        $.getJSON("json/child_care_center.json", function (data) {
          //populating ratios column
          $("input[name='infantRatio']").val(
            data.Connecticut.pre_covid_infant_ratio
          );
          $("input[name='toddlerRatio']").val(
            data.Connecticut.pre_covid_toddler_ratio
          );
          $("input[name='pre3Ratio']").val(
            data.Connecticut.pre_covid_pre3_ratio
          );
          $("input[name='pre4Ratio']").val(
            data.Connecticut.pre_covid_pre4_ratio
          );

          //populating groupsize column
          $("input[name='infantGroupSize']").val(
            data.Connecticut.pre_covid_infant_groupsize
          );
          $("input[name='toddlerGroupSize']").val(
            data.Connecticut.pre_covid_toddler_groupsize
          );
          $("input[name='pre3GroupSize']").val(
            data.Connecticut.pre_covid_pre3_groupsize
          );
          $("input[name='pre4GroupSize']").val(
            data.Connecticut.pre_covid_pre4_groupsize
          );
        });
        break;

      case "DE":
        console.log("this is DE!!");
        $.getJSON("json/child_care_center.json", function (data) {
          //populating ratios column
          $("input[name='infantRatio']").val(
            data.Delaware.pre_covid_infant_ratio
          );
          $("input[name='toddlerRatio']").val(
            data.Delaware.pre_covid_toddler_ratio
          );
          $("input[name='pre3Ratio']").val(data.Delaware.pre_covid_pre3_ratio);
          $("input[name='pre4Ratio']").val(data.Delaware.pre_covid_pre4_ratio);

          //populating groupsize column
          $("input[name='infantGroupSize']").val(
            data.Delaware.pre_covid_infant_groupsize
          );
          $("input[name='toddlerGroupSize']").val(
            data.Delaware.pre_covid_toddler_groupsize
          );
          $("input[name='pre3GroupSize']").val(
            data.Delaware.pre_covid_pre3_groupsize
          );
          $("input[name='pre4GroupSize']").val(
            data.Delaware.pre_covid_pre4_groupsize
          );
        });
        break;

      case "FL":
        console.log("this is FL!!");
        $.getJSON("json/child_care_center.json", function (data) {
          //populating ratios column
          $("input[name='infantRatio']").val(
            data.Florida.pre_covid_infant_ratio
          );
          $("input[name='toddlerRatio']").val(
            data.Florida.pre_covid_toddler_ratio
          );
          $("input[name='pre3Ratio']").val(data.Florida.pre_covid_pre3_ratio);
          $("input[name='pre4Ratio']").val(data.Florida.pre_covid_pre4_ratio);

          //populating groupsize column
          $("input[name='infantGroupSize']").val(
            data.Florida.pre_covid_infant_groupsize
          );
          $("input[name='toddlerGroupSize']").val(
            data.Florida.pre_covid_toddler_groupsize
          );
          $("input[name='pre3GroupSize']").val(
            data.Florida.pre_covid_pre3_groupsize
          );
          $("input[name='pre4GroupSize']").val(
            data.Florida.pre_covid_pre4_groupsize
          );
        });
        break;

      case "GA":
        console.log("this is GA!!");
        $.getJSON("json/child_care_center.json", function (data) {
          //populating ratios column
          $("input[name='infantRatio']").val(
            data.Georgia.pre_covid_infant_ratio
          );
          $("input[name='toddlerRatio']").val(
            data.Georgia.pre_covid_toddler_ratio
          );
          $("input[name='pre3Ratio']").val(data.Georgia.pre_covid_pre3_ratio);
          $("input[name='pre4Ratio']").val(data.Georgia.pre_covid_pre4_ratio);

          //populating groupsize column
          $("input[name='infantGroupSize']").val(
            data.Georgia.pre_covid_infant_groupsize
          );
          $("input[name='toddlerGroupSize']").val(
            data.Georgia.pre_covid_toddler_groupsize
          );
          $("input[name='pre3GroupSize']").val(
            data.Georgia.pre_covid_pre3_groupsize
          );
          $("input[name='pre4GroupSize']").val(
            data.Georgia.pre_covid_pre4_groupsize
          );
        });
        break;

      case "HI":
        console.log("this is HI!!");
        $.getJSON("json/child_care_center.json", function (data) {
          //populating ratios column
          $("input[name='infantRatio']").val(
            data.Hawaii.pre_covid_infant_ratio
          );
          $("input[name='toddlerRatio']").val(
            data.Hawaii.pre_covid_toddler_ratio
          );
          $("input[name='pre3Ratio']").val(data.Hawaii.pre_covid_pre3_ratio);
          $("input[name='pre4Ratio']").val(data.Hawaii.pre_covid_pre4_ratio);

          //populating groupsize column
          $("input[name='infantGroupSize']").val(
            data.Hawaii.pre_covid_infant_groupsize
          );
          $("input[name='toddlerGroupSize']").val(
            data.Hawaii.pre_covid_toddler_groupsize
          );
          $("input[name='pre3GroupSize']").val(
            data.Hawaii.pre_covid_pre3_groupsize
          );
          $("input[name='pre4GroupSize']").val(
            data.Hawaii.pre_covid_pre4_groupsize
          );
        });
        break;

      case "ID":
        console.log("this is ID!!");
        $.getJSON("json/child_care_center.json", function (data) {
          //populating ratios column
          $("input[name='infantRatio']").val(data.Idaho.pre_covid_infant_ratio);
          $("input[name='toddlerRatio']").val(
            data.Idaho.pre_covid_toddler_ratio
          );
          $("input[name='pre3Ratio']").val(data.Idaho.pre_covid_pre3_ratio);
          $("input[name='pre4Ratio']").val(data.Idaho.pre_covid_pre4_ratio);

          //populating groupsize column
          $("input[name='infantGroupSize']").val(
            data.Idaho.pre_covid_infant_groupsize
          );
          $("input[name='toddlerGroupSize']").val(
            data.Idaho.pre_covid_toddler_groupsize
          );
          $("input[name='pre3GroupSize']").val(
            data.Idaho.pre_covid_pre3_groupsize
          );
          $("input[name='pre4GroupSize']").val(
            data.Idaho.pre_covid_pre4_groupsize
          );
        });
        break;

      case "IL":
        console.log("this is IL!!");
        $.getJSON("json/child_care_center.json", function (data) {
          //populating ratios column
          $("input[name='infantRatio']").val(
            data.Illinois.pre_covid_infant_ratio
          );
          $("input[name='toddlerRatio']").val(
            data.Illinois.pre_covid_toddler_ratio
          );
          $("input[name='pre3Ratio']").val(data.Illinois.pre_covid_pre3_ratio);
          $("input[name='pre4Ratio']").val(data.Illinois.pre_covid_pre4_ratio);

          //populating groupsize column
          $("input[name='infantGroupSize']").val(
            data.Illinois.pre_covid_infant_groupsize
          );
          $("input[name='toddlerGroupSize']").val(
            data.Illinois.pre_covid_toddler_groupsize
          );
          $("input[name='pre3GroupSize']").val(
            data.Illinois.pre_covid_pre3_groupsize
          );
          $("input[name='pre4GroupSize']").val(
            data.Illinois.pre_covid_pre4_groupsize
          );
        });
        break;

      case "IN":
        console.log("this is IN!!");
        $.getJSON("json/child_care_center.json", function (data) {
          //populating ratios column
          $("input[name='infantRatio']").val(
            data.Indiana.pre_covid_infant_ratio
          );
          $("input[name='toddlerRatio']").val(
            data.Indiana.pre_covid_toddler_ratio
          );
          $("input[name='pre3Ratio']").val(data.Indiana.pre_covid_pre3_ratio);
          $("input[name='pre4Ratio']").val(data.Indiana.pre_covid_pre4_ratio);

          //populating groupsize column
          $("input[name='infantGroupSize']").val(
            data.Indiana.pre_covid_infant_groupsize
          );
          $("input[name='toddlerGroupSize']").val(
            data.Indiana.pre_covid_toddler_groupsize
          );
          $("input[name='pre3GroupSize']").val(
            data.Indiana.pre_covid_pre3_groupsize
          );
          $("input[name='pre4GroupSize']").val(
            data.Indiana.pre_covid_pre4_groupsize
          );
        });
        break;

      case "IA":
        console.log("this is IA!!");
        $.getJSON("json/child_care_center.json", function (data) {
          //populating ratios column
          $("input[name='infantRatio']").val(data.Iowa.pre_covid_infant_ratio);
          $("input[name='toddlerRatio']").val(
            data.Iowa.pre_covid_toddler_ratio
          );
          $("input[name='pre3Ratio']").val(data.Iowa.pre_covid_pre3_ratio);
          $("input[name='pre4Ratio']").val(data.Iowa.pre_covid_pre4_ratio);

          //populating groupsize column
          $("input[name='infantGroupSize']").val(
            data.Iowa.pre_covid_infant_groupsize
          );
          $("input[name='toddlerGroupSize']").val(
            data.Iowa.pre_covid_toddler_groupsize
          );
          $("input[name='pre3GroupSize']").val(
            data.Iowa.pre_covid_pre3_groupsize
          );
          $("input[name='pre4GroupSize']").val(
            data.Iowa.pre_covid_pre4_groupsize
          );
        });
        break;

      case "KS":
        console.log("this is KS!!");
        $.getJSON("json/child_care_center.json", function (data) {
          //populating ratios column
          $("input[name='infantRatio']").val(
            data.Kansas.pre_covid_infant_ratio
          );
          $("input[name='toddlerRatio']").val(
            data.Kansas.pre_covid_toddler_ratio
          );
          $("input[name='pre3Ratio']").val(data.Kansas.pre_covid_pre3_ratio);
          $("input[name='pre4Ratio']").val(data.Kansas.pre_covid_pre4_ratio);

          //populating groupsize column
          $("input[name='infantGroupSize']").val(
            data.Kansas.pre_covid_infant_groupsize
          );
          $("input[name='toddlerGroupSize']").val(
            data.Kansas.pre_covid_toddler_groupsize
          );
          $("input[name='pre3GroupSize']").val(
            data.Kansas.pre_covid_pre3_groupsize
          );
          $("input[name='pre4GroupSize']").val(
            data.Kansas.pre_covid_pre4_groupsize
          );
        });
        break;

      case "KN":
        console.log("this is KN!!");
        $.getJSON("json/child_care_center.json", function (data) {
          //populating ratios column
          $("input[name='infantRatio']").val(
            data.Kentucky.pre_covid_infant_ratio
          );
          $("input[name='toddlerRatio']").val(
            data.Kentucky.pre_covid_toddler_ratio
          );
          $("input[name='pre3Ratio']").val(data.Kentucky.pre_covid_pre3_ratio);
          $("input[name='pre4Ratio']").val(data.Kentucky.pre_covid_pre4_ratio);

          //populating groupsize column
          $("input[name='infantGroupSize']").val(
            data.Kentucky.pre_covid_infant_groupsize
          );
          $("input[name='toddlerGroupSize']").val(
            data.Kentucky.pre_covid_toddler_groupsize
          );
          $("input[name='pre3GroupSize']").val(
            data.Kentucky.pre_covid_pre3_groupsize
          );
          $("input[name='pre4GroupSize']").val(
            data.Kentucky.pre_covid_pre4_groupsize
          );
        });
        break;

      case "LA":
        console.log("this is LA!!");
        $.getJSON("json/child_care_center.json", function (data) {
          //populating ratios column
          $("input[name='infantRatio']").val(
            data.Louisiana.pre_covid_infant_ratio
          );
          $("input[name='toddlerRatio']").val(
            data.Louisiana.pre_covid_toddler_ratio
          );
          $("input[name='pre3Ratio']").val(data.Louisiana.pre_covid_pre3_ratio);
          $("input[name='pre4Ratio']").val(data.Louisiana.pre_covid_pre4_ratio);

          //populating groupsize column
          $("input[name='infantGroupSize']").val(
            data.Louisiana.pre_covid_infant_groupsize
          );
          $("input[name='toddlerGroupSize']").val(
            data.Louisiana.pre_covid_toddler_groupsize
          );
          $("input[name='pre3GroupSize']").val(
            data.Louisiana.pre_covid_pre3_groupsize
          );
          $("input[name='pre4GroupSize']").val(
            data.Louisiana.pre_covid_pre4_groupsize
          );
        });
        break;

      case "ME":
        console.log("this is ME!!");
        $.getJSON("json/child_care_center.json", function (data) {
          //populating ratios column
          $("input[name='infantRatio']").val(data.Maine.pre_covid_infant_ratio);
          $("input[name='toddlerRatio']").val(
            data.Maine.pre_covid_toddler_ratio
          );
          $("input[name='pre3Ratio']").val(data.Maine.pre_covid_pre3_ratio);
          $("input[name='pre4Ratio']").val(data.Maine.pre_covid_pre4_ratio);

          //populating groupsize column
          $("input[name='infantGroupSize']").val(
            data.Maine.pre_covid_infant_groupsize
          );
          $("input[name='toddlerGroupSize']").val(
            data.Maine.pre_covid_toddler_groupsize
          );
          $("input[name='pre3GroupSize']").val(
            data.Maine.pre_covid_pre3_groupsize
          );
          $("input[name='pre4GroupSize']").val(
            data.Maine.pre_covid_pre4_groupsize
          );
        });
        break;

      case "MD":
        console.log("this is MD!!");
        $.getJSON("json/child_care_center.json", function (data) {
          //populating ratios column
          $("input[name='infantRatio']").val(
            data.Maryland.pre_covid_infant_ratio
          );
          $("input[name='toddlerRatio']").val(
            data.Maryland.pre_covid_toddler_ratio
          );
          $("input[name='pre3Ratio']").val(data.Maryland.pre_covid_pre3_ratio);
          $("input[name='pre4Ratio']").val(data.Maryland.pre_covid_pre4_ratio);

          //populating groupsize column
          $("input[name='infantGroupSize']").val(
            data.Maryland.pre_covid_infant_groupsize
          );
          $("input[name='toddlerGroupSize']").val(
            data.Maryland.pre_covid_toddler_groupsize
          );
          $("input[name='pre3GroupSize']").val(
            data.Maryland.pre_covid_pre3_groupsize
          );
          $("input[name='pre4GroupSize']").val(
            data.Maryland.pre_covid_pre4_groupsize
          );
        });
        break;

      case "MI":
        console.log("this is MI!!");
        $.getJSON("json/child_care_center.json", function (data) {
          //populating ratios column
          $("input[name='infantRatio']").val(
            data.Michigan.pre_covid_infant_ratio
          );
          $("input[name='toddlerRatio']").val(
            data.Michigan.pre_covid_toddler_ratio
          );
          $("input[name='pre3Ratio']").val(data.Michigan.pre_covid_pre3_ratio);
          $("input[name='pre4Ratio']").val(data.Michigan.pre_covid_pre4_ratio);

          //populating groupsize column
          $("input[name='infantGroupSize']").val(
            data.Michigan.pre_covid_infant_groupsize
          );
          $("input[name='toddlerGroupSize']").val(
            data.Michigan.pre_covid_toddler_groupsize
          );
          $("input[name='pre3GroupSize']").val(
            data.Michigan.pre_covid_pre3_groupsize
          );
          $("input[name='pre4GroupSize']").val(
            data.Michigan.pre_covid_pre4_groupsize
          );
        });
        break;

      case "MN":
        console.log("this is MN!!");
        $.getJSON("json/child_care_center.json", function (data) {
          //populating ratios column
          $("input[name='infantRatio']").val(
            data.Minnesota.pre_covid_infant_ratio
          );
          $("input[name='toddlerRatio']").val(
            data.Minnesota.pre_covid_toddler_ratio
          );
          $("input[name='pre3Ratio']").val(data.Minnesota.pre_covid_pre3_ratio);
          $("input[name='pre4Ratio']").val(data.Minnesota.pre_covid_pre4_ratio);

          //populating groupsize column
          $("input[name='infantGroupSize']").val(
            data.Minnesota.pre_covid_infant_groupsize
          );
          $("input[name='toddlerGroupSize']").val(
            data.Minnesota.pre_covid_toddler_groupsize
          );
          $("input[name='pre3GroupSize']").val(
            data.Minnesota.pre_covid_pre3_groupsize
          );
          $("input[name='pre4GroupSize']").val(
            data.Minnesota.pre_covid_pre4_groupsize
          );
        });
        break;

      case "MS":
        console.log("this is MS!!");
        $.getJSON("json/child_care_center.json", function (data) {
          //populating ratios column
          $("input[name='infantRatio']").val(
            data.Mississippi.pre_covid_infant_ratio
          );
          $("input[name='toddlerRatio']").val(
            data.Mississippi.pre_covid_toddler_ratio
          );
          $("input[name='pre3Ratio']").val(
            data.Mississippi.pre_covid_pre3_ratio
          );
          $("input[name='pre4Ratio']").val(
            data.Mississippi.pre_covid_pre4_ratio
          );

          //populating groupsize column
          $("input[name='infantGroupSize']").val(
            data.Mississippi.pre_covid_infant_groupsize
          );
          $("input[name='toddlerGroupSize']").val(
            data.Mississippi.pre_covid_toddler_groupsize
          );
          $("input[name='pre3GroupSize']").val(
            data.Mississippi.pre_covid_pre3_groupsize
          );
          $("input[name='pre4GroupSize']").val(
            data.Mississippi.pre_covid_pre4_groupsize
          );
        });
        break;

      case "MO":
        console.log("this is MO!!");
        $.getJSON("json/child_care_center.json", function (data) {
          //populating ratios column
          $("input[name='infantRatio']").val(
            data.Missouri.pre_covid_infant_ratio
          );
          $("input[name='toddlerRatio']").val(
            data.Missouri.pre_covid_toddler_ratio
          );
          $("input[name='pre3Ratio']").val(data.Missouri.pre_covid_pre3_ratio);
          $("input[name='pre4Ratio']").val(data.Missouri.pre_covid_pre4_ratio);

          //populating groupsize column
          $("input[name='infantGroupSize']").val(
            data.Missouri.pre_covid_infant_groupsize
          );
          $("input[name='toddlerGroupSize']").val(
            data.Missouri.pre_covid_toddler_groupsize
          );
          $("input[name='pre3GroupSize']").val(
            data.Missouri.pre_covid_pre3_groupsize
          );
          $("input[name='pre4GroupSize']").val(
            data.Missouri.pre_covid_pre4_groupsize
          );
        });
        break;

      case "MT":
        console.log("this is MT!!");
        $.getJSON("json/child_care_center.json", function (data) {
          //populating ratios column
          $("input[name='infantRatio']").val(
            data.Montana.pre_covid_infant_ratio
          );
          $("input[name='toddlerRatio']").val(
            data.Montana.pre_covid_toddler_ratio
          );
          $("input[name='pre3Ratio']").val(data.Montana.pre_covid_pre3_ratio);
          $("input[name='pre4Ratio']").val(data.Montana.pre_covid_pre4_ratio);

          //populating groupsize column
          $("input[name='infantGroupSize']").val(
            data.Montana.pre_covid_infant_groupsize
          );
          $("input[name='toddlerGroupSize']").val(
            data.Montana.pre_covid_toddler_groupsize
          );
          $("input[name='pre3GroupSize']").val(
            data.Montana.pre_covid_pre3_groupsize
          );
          $("input[name='pre4GroupSize']").val(
            data.Montana.pre_covid_pre4_groupsize
          );
        });
        break;

      case "NE":
        console.log("this is NE!!");
        $.getJSON("json/child_care_center.json", function (data) {
          //populating ratios column
          $("input[name='infantRatio']").val(
            data.Nebraska.pre_covid_infant_ratio
          );
          $("input[name='toddlerRatio']").val(
            data.Nebraska.pre_covid_toddler_ratio
          );
          $("input[name='pre3Ratio']").val(data.Nebraska.pre_covid_pre3_ratio);
          $("input[name='pre4Ratio']").val(data.Nebraska.pre_covid_pre4_ratio);

          //populating groupsize column
          $("input[name='infantGroupSize']").val(
            data.Nebraska.pre_covid_infant_groupsize
          );
          $("input[name='toddlerGroupSize']").val(
            data.Nebraska.pre_covid_toddler_groupsize
          );
          $("input[name='pre3GroupSize']").val(
            data.Nebraska.pre_covid_pre3_groupsize
          );
          $("input[name='pre4GroupSize']").val(
            data.Nebraska.pre_covid_pre4_groupsize
          );
        });
        break;

      case "NV":
        console.log("this is NV!!");
        $.getJSON("json/child_care_center.json", function (data) {
          //populating ratios column
          $("input[name='infantRatio']").val(
            data.Nevada.pre_covid_infant_ratio
          );
          $("input[name='toddlerRatio']").val(
            data.Nevada.pre_covid_toddler_ratio
          );
          $("input[name='pre3Ratio']").val(data.Nevada.pre_covid_pre3_ratio);
          $("input[name='pre4Ratio']").val(data.Nevada.pre_covid_pre4_ratio);

          //populating groupsize column
          $("input[name='infantGroupSize']").val(
            data.Nevada.pre_covid_infant_groupsize
          );
          $("input[name='toddlerGroupSize']").val(
            data.Nevada.pre_covid_toddler_groupsize
          );
          $("input[name='pre3GroupSize']").val(
            data.Nevada.pre_covid_pre3_groupsize
          );
          $("input[name='pre4GroupSize']").val(
            data.Nevada.pre_covid_pre4_groupsize
          );
        });
        break;

      case "NH":
        console.log("this is NH!!");
        $.getJSON("json/child_care_center.json", function (data) {
          //populating ratios column
          $("input[name='infantRatio']").val(
            data.New_Hampshire.pre_covid_infant_ratio
          );
          $("input[name='toddlerRatio']").val(
            data.New_Hampshire.pre_covid_toddler_ratio
          );
          $("input[name='pre3Ratio']").val(
            data.New_Hampshire.pre_covid_pre3_ratio
          );
          $("input[name='pre4Ratio']").val(
            data.New_Hampshire.pre_covid_pre4_ratio
          );

          //populating groupsize column
          $("input[name='infantGroupSize']").val(
            data.New_Hampshire.pre_covid_infant_groupsize
          );
          $("input[name='toddlerGroupSize']").val(
            data.New_Hampshire.pre_covid_toddler_groupsize
          );
          $("input[name='pre3GroupSize']").val(
            data.New_Hampshire.pre_covid_pre3_groupsize
          );
          $("input[name='pre4GroupSize']").val(
            data.New_Hampshire.pre_covid_pre4_groupsize
          );
        });
        break;

      case "NJ":
        console.log("this is NJ!!");
        $.getJSON("json/child_care_center.json", function (data) {
          //populating ratios column
          $("input[name='infantRatio']").val(
            data.New_Jersey.pre_covid_infant_ratio
          );
          $("input[name='toddlerRatio']").val(
            data.New_Jersey.pre_covid_toddler_ratio
          );
          $("input[name='pre3Ratio']").val(
            data.New_Jersey.pre_covid_pre3_ratio
          );
          $("input[name='pre4Ratio']").val(
            data.New_Jersey.pre_covid_pre4_ratio
          );

          //populating groupsize column
          $("input[name='infantGroupSize']").val(
            data.New_Jersey.pre_covid_infant_groupsize
          );
          $("input[name='toddlerGroupSize']").val(
            data.New_Jersey.pre_covid_toddler_groupsize
          );
          $("input[name='pre3GroupSize']").val(
            data.New_Jersey.pre_covid_pre3_groupsize
          );
          $("input[name='pre4GroupSize']").val(
            data.New_Jersey.pre_covid_pre4_groupsize
          );
        });
        break;

      case "NW":
        console.log("this is NW!!");
        $.getJSON("json/child_care_center.json", function (data) {
          //populating ratios column
          $("input[name='infantRatio']").val(
            data.New_Mexico.pre_covid_infant_ratio
          );
          $("input[name='toddlerRatio']").val(
            data.New_Mexico.pre_covid_toddler_ratio
          );
          $("input[name='pre3Ratio']").val(
            data.New_Mexico.pre_covid_pre3_ratio
          );
          $("input[name='pre4Ratio']").val(
            data.New_Mexico.pre_covid_pre4_ratio
          );

          //populating groupsize column
          $("input[name='infantGroupSize']").val(
            data.New_Mexico.pre_covid_infant_groupsize
          );
          $("input[name='toddlerGroupSize']").val(
            data.New_Mexico.pre_covid_toddler_groupsize
          );
          $("input[name='pre3GroupSize']").val(
            data.New_Mexico.pre_covid_pre3_groupsize
          );
          $("input[name='pre4GroupSize']").val(
            data.New_Mexico.pre_covid_pre4_groupsize
          );
        });
        break;

      case "NY":
        console.log("this is NY!!");
        $.getJSON("json/child_care_center.json", function (data) {
          //populating ratios column
          $("input[name='infantRatio']").val(
            data.New_York.pre_covid_infant_ratio
          );
          $("input[name='toddlerRatio']").val(
            data.New_York.pre_covid_toddler_ratio
          );
          $("input[name='pre3Ratio']").val(data.New_York.pre_covid_pre3_ratio);
          $("input[name='pre4Ratio']").val(data.New_York.pre_covid_pre4_ratio);

          //populating groupsize column
          $("input[name='infantGroupSize']").val(
            data.New_York.pre_covid_infant_groupsize
          );
          $("input[name='toddlerGroupSize']").val(
            data.New_York.pre_covid_toddler_groupsize
          );
          $("input[name='pre3GroupSize']").val(
            data.New_York.pre_covid_pre3_groupsize
          );
          $("input[name='pre4GroupSize']").val(
            data.New_York.pre_covid_pre4_groupsize
          );
        });
        break;

      case "NC":
        console.log("this is NC!!");
        $.getJSON("json/child_care_center.json", function (data) {
          //populating ratios column
          $("input[name='infantRatio']").val(
            data.North_Carolina.pre_covid_infant_ratio
          );
          $("input[name='toddlerRatio']").val(
            data.North_Carolina.pre_covid_toddler_ratio
          );
          $("input[name='pre3Ratio']").val(
            data.North_Carolina.pre_covid_pre3_ratio
          );
          $("input[name='pre4Ratio']").val(
            data.North_Carolina.pre_covid_pre4_ratio
          );

          //populating groupsize column
          $("input[name='infantGroupSize']").val(
            data.North_Carolina.pre_covid_infant_groupsize
          );
          $("input[name='toddlerGroupSize']").val(
            data.North_Carolina.pre_covid_toddler_groupsize
          );
          $("input[name='pre3GroupSize']").val(
            data.North_Carolina.pre_covid_pre3_groupsize
          );
          $("input[name='pre4GroupSize']").val(
            data.North_Carolina.pre_covid_pre4_groupsize
          );
        });
        break;

      case "ND":
        console.log("this is ND!!");
        $.getJSON("json/child_care_center.json", function (data) {
          //populating ratios column
          $("input[name='infantRatio']").val(
            data.North_Dakota.pre_covid_infant_ratio
          );
          $("input[name='toddlerRatio']").val(
            data.North_Dakota.pre_covid_toddler_ratio
          );
          $("input[name='pre3Ratio']").val(
            data.North_Dakota.pre_covid_pre3_ratio
          );
          $("input[name='pre4Ratio']").val(
            data.North_Dakota.pre_covid_pre4_ratio
          );

          //populating groupsize column
          $("input[name='infantGroupSize']").val(
            data.North_Dakota.pre_covid_infant_groupsize
          );
          $("input[name='toddlerGroupSize']").val(
            data.North_Dakota.pre_covid_toddler_groupsize
          );
          $("input[name='pre3GroupSize']").val(
            data.North_Dakota.pre_covid_pre3_groupsize
          );
          $("input[name='pre4GroupSize']").val(
            data.North_Dakota.pre_covid_pre4_groupsize
          );
        });
        break;

      case "OH":
        console.log("this is OH!!");
        $.getJSON("json/child_care_center.json", function (data) {
          //populating ratios column
          $("input[name='infantRatio']").val(data.Ohio.pre_covid_infant_ratio);
          $("input[name='toddlerRatio']").val(
            data.Ohio.pre_covid_toddler_ratio
          );
          $("input[name='pre3Ratio']").val(data.Ohio.pre_covid_pre3_ratio);
          $("input[name='pre4Ratio']").val(data.Ohio.pre_covid_pre4_ratio);

          //populating groupsize column
          $("input[name='infantGroupSize']").val(
            data.Ohio.pre_covid_infant_groupsize
          );
          $("input[name='toddlerGroupSize']").val(
            data.Ohio.pre_covid_toddler_groupsize
          );
          $("input[name='pre3GroupSize']").val(
            data.Ohio.pre_covid_pre3_groupsize
          );
          $("input[name='pre4GroupSize']").val(
            data.Ohio.pre_covid_pre4_groupsize
          );
        });
        break;

      case "OK":
        console.log("this is OK!!");
        $.getJSON("json/child_care_center.json", function (data) {
          //populating ratios column
          $("input[name='infantRatio']").val(
            data.Oklahoma.pre_covid_infant_ratio
          );
          $("input[name='toddlerRatio']").val(
            data.Oklahoma.pre_covid_toddler_ratio
          );
          $("input[name='pre3Ratio']").val(data.Oklahoma.pre_covid_pre3_ratio);
          $("input[name='pre4Ratio']").val(data.Oklahoma.pre_covid_pre4_ratio);

          //populating groupsize column
          $("input[name='infantGroupSize']").val(
            data.Oklahoma.pre_covid_infant_groupsize
          );
          $("input[name='toddlerGroupSize']").val(
            data.Oklahoma.pre_covid_toddler_groupsize
          );
          $("input[name='pre3GroupSize']").val(
            data.Oklahoma.pre_covid_pre3_groupsize
          );
          $("input[name='pre4GroupSize']").val(
            data.Oklahoma.pre_covid_pre4_groupsize
          );
        });
        break;

      case "PA":
        console.log("this is PA!!");
        $.getJSON("json/child_care_center.json", function (data) {
          //populating ratios column
          $("input[name='infantRatio']").val(
            data.Pennsylvania.pre_covid_infant_ratio
          );
          $("input[name='toddlerRatio']").val(
            data.Pennsylvania.pre_covid_toddler_ratio
          );
          $("input[name='pre3Ratio']").val(
            data.Pennsylvania.pre_covid_pre3_ratio
          );
          $("input[name='pre4Ratio']").val(
            data.Pennsylvania.pre_covid_pre4_ratio
          );

          //populating groupsize column
          $("input[name='infantGroupSize']").val(
            data.Pennsylvania.pre_covid_infant_groupsize
          );
          $("input[name='toddlerGroupSize']").val(
            data.Pennsylvania.pre_covid_toddler_groupsize
          );
          $("input[name='pre3GroupSize']").val(
            data.Pennsylvania.pre_covid_pre3_groupsize
          );
          $("input[name='pre4GroupSize']").val(
            data.Pennsylvania.pre_covid_pre4_groupsize
          );
        });
        break;

      case "RI":
        console.log("this is RI!!");
        $.getJSON("json/child_care_center.json", function (data) {
          //populating ratios column
          $("input[name='infantRatio']").val(
            data.Rhode_Island.pre_covid_infant_ratio
          );
          $("input[name='toddlerRatio']").val(
            data.Rhode_Island.pre_covid_toddler_ratio
          );
          $("input[name='pre3Ratio']").val(
            data.Rhode_Island.pre_covid_pre3_ratio
          );
          $("input[name='pre4Ratio']").val(
            data.Rhode_Island.pre_covid_pre4_ratio
          );

          //populating groupsize column
          $("input[name='infantGroupSize']").val(
            data.Rhode_Island.pre_covid_infant_groupsize
          );
          $("input[name='toddlerGroupSize']").val(
            data.Rhode_Island.pre_covid_toddler_groupsize
          );
          $("input[name='pre3GroupSize']").val(
            data.Rhode_Island.pre_covid_pre3_groupsize
          );
          $("input[name='pre4GroupSize']").val(
            data.Rhode_Island.pre_covid_pre4_groupsize
          );
        });
        break;

      case "SC":
        console.log("this is SC!!");
        $.getJSON("json/child_care_center.json", function (data) {
          //populating ratios column
          $("input[name='infantRatio']").val(
            data.South_Carolina.pre_covid_infant_ratio
          );
          $("input[name='toddlerRatio']").val(
            data.South_Carolina.pre_covid_toddler_ratio
          );
          $("input[name='pre3Ratio']").val(
            data.South_Carolina.pre_covid_pre3_ratio
          );
          $("input[name='pre4Ratio']").val(
            data.South_Carolina.pre_covid_pre4_ratio
          );

          //populating groupsize column
          $("input[name='infantGroupSize']").val(
            data.South_Carolina.pre_covid_infant_groupsize
          );
          $("input[name='toddlerGroupSize']").val(
            data.South_Carolina.pre_covid_toddler_groupsize
          );
          $("input[name='pre3GroupSize']").val(
            data.South_Carolina.pre_covid_pre3_groupsize
          );
          $("input[name='pre4GroupSize']").val(
            data.South_Carolina.pre_covid_pre4_groupsize
          );
        });
        break;

      case "SD":
        console.log("this is SD!!");
        $.getJSON("json/child_care_center.json", function (data) {
          //populating ratios column
          $("input[name='infantRatio']").val(
            data.South_Dakota.pre_covid_infant_ratio
          );
          $("input[name='toddlerRatio']").val(
            data.South_Dakota.pre_covid_toddler_ratio
          );
          $("input[name='pre3Ratio']").val(
            data.South_Dakota.pre_covid_pre3_ratio
          );
          $("input[name='pre4Ratio']").val(
            data.South_Dakota.pre_covid_pre4_ratio
          );

          //populating groupsize column
          $("input[name='infantGroupSize']").val(
            data.South_Dakota.pre_covid_infant_groupsize
          );
          $("input[name='toddlerGroupSize']").val(
            data.South_Dakota.pre_covid_toddler_groupsize
          );
          $("input[name='pre3GroupSize']").val(
            data.South_Dakota.pre_covid_pre3_groupsize
          );
          $("input[name='pre4GroupSize']").val(
            data.South_Dakota.pre_covid_pre4_groupsize
          );
        });
        break;

      case "TN":
        console.log("this is TN!!");
        $.getJSON("json/child_care_center.json", function (data) {
          //populating ratios column
          $("input[name='infantRatio']").val(
            data.Tennessee.pre_covid_infant_ratio
          );
          $("input[name='toddlerRatio']").val(
            data.Tennessee.pre_covid_toddler_ratio
          );
          $("input[name='pre3Ratio']").val(data.Tennessee.pre_covid_pre3_ratio);
          $("input[name='pre4Ratio']").val(data.Tennessee.pre_covid_pre4_ratio);

          //populating groupsize column
          $("input[name='infantGroupSize']").val(
            data.Tennessee.pre_covid_infant_groupsize
          );
          $("input[name='toddlerGroupSize']").val(
            data.Tennessee.pre_covid_toddler_groupsize
          );
          $("input[name='pre3GroupSize']").val(
            data.Tennessee.pre_covid_pre3_groupsize
          );
          $("input[name='pre4GroupSize']").val(
            data.Tennessee.pre_covid_pre4_groupsize
          );
        });
        break;

      case "TX":
        console.log("this is TX!!");
        $.getJSON("json/child_care_center.json", function (data) {
          //populating ratios column
          $("input[name='infantRatio']").val(data.Texas.pre_covid_infant_ratio);
          $("input[name='toddlerRatio']").val(
            data.Texas.pre_covid_toddler_ratio
          );
          $("input[name='pre3Ratio']").val(data.Texas.pre_covid_pre3_ratio);
          $("input[name='pre4Ratio']").val(data.Texas.pre_covid_pre4_ratio);

          //populating groupsize column
          $("input[name='infantGroupSize']").val(
            data.Texas.pre_covid_infant_groupsize
          );
          $("input[name='toddlerGroupSize']").val(
            data.Texas.pre_covid_toddler_groupsize
          );
          $("input[name='pre3GroupSize']").val(
            data.Texas.pre_covid_pre3_groupsize
          );
          $("input[name='pre4GroupSize']").val(
            data.Texas.pre_covid_pre4_groupsize
          );
        });
        break;

      case "UT":
        console.log("this is UT!!");
        $.getJSON("json/child_care_center.json", function (data) {
          //populating ratios column
          $("input[name='infantRatio']").val(data.Utah.pre_covid_infant_ratio);
          $("input[name='toddlerRatio']").val(
            data.Utah.pre_covid_toddler_ratio
          );
          $("input[name='pre3Ratio']").val(data.Utah.pre_covid_pre3_ratio);
          $("input[name='pre4Ratio']").val(data.Utah.pre_covid_pre4_ratio);

          //populating groupsize column
          $("input[name='infantGroupSize']").val(
            data.Utah.pre_covid_infant_groupsize
          );
          $("input[name='toddlerGroupSize']").val(
            data.Utah.pre_covid_toddler_groupsize
          );
          $("input[name='pre3GroupSize']").val(
            data.Utah.pre_covid_pre3_groupsize
          );
          $("input[name='pre4GroupSize']").val(
            data.Utah.pre_covid_pre4_groupsize
          );
        });
        break;

      case "VT":
        console.log("this is VT!!");
        $.getJSON("json/child_care_center.json", function (data) {
          //populating ratios column
          $("input[name='infantRatio']").val(
            data.Vermont.pre_covid_infant_ratio
          );
          $("input[name='toddlerRatio']").val(
            data.Vermont.pre_covid_toddler_ratio
          );
          $("input[name='pre3Ratio']").val(data.Vermont.pre_covid_pre3_ratio);
          $("input[name='pre4Ratio']").val(data.Vermont.pre_covid_pre4_ratio);

          //populating groupsize column
          $("input[name='infantGroupSize']").val(
            data.Vermont.pre_covid_infant_groupsize
          );
          $("input[name='toddlerGroupSize']").val(
            data.Vermont.pre_covid_toddler_groupsize
          );
          $("input[name='pre3GroupSize']").val(
            data.Vermont.pre_covid_pre3_groupsize
          );
          $("input[name='pre4GroupSize']").val(
            data.Vermont.pre_covid_pre4_groupsize
          );
        });
        break;

      case "VA":
        console.log("this is VA!!");
        $.getJSON("json/child_care_center.json", function (data) {
          //populating ratios column
          $("input[name='infantRatio']").val(
            data.Virginia.pre_covid_infant_ratio
          );
          $("input[name='toddlerRatio']").val(
            data.Virginia.pre_covid_toddler_ratio
          );
          $("input[name='pre3Ratio']").val(data.Virginia.pre_covid_pre3_ratio);
          $("input[name='pre4Ratio']").val(data.Virginia.pre_covid_pre4_ratio);

          //populating groupsize column
          $("input[name='infantGroupSize']").val(
            data.Virginia.pre_covid_infant_groupsize
          );
          $("input[name='toddlerGroupSize']").val(
            data.Virginia.pre_covid_toddler_groupsize
          );
          $("input[name='pre3GroupSize']").val(
            data.Virginia.pre_covid_pre3_groupsize
          );
          $("input[name='pre4GroupSize']").val(
            data.Virginia.pre_covid_pre4_groupsize
          );
        });
        break;

      case "WA":
        console.log("this is WA!!");
        $.getJSON("json/child_care_center.json", function (data) {
          //populating ratios column
          $("input[name='infantRatio']").val(
            data.Washington.pre_covid_infant_ratio
          );
          $("input[name='toddlerRatio']").val(
            data.Washington.pre_covid_toddler_ratio
          );
          $("input[name='pre3Ratio']").val(
            data.Washington.pre_covid_pre3_ratio
          );
          $("input[name='pre4Ratio']").val(
            data.Washington.pre_covid_pre4_ratio
          );

          //populating groupsize column
          $("input[name='infantGroupSize']").val(
            data.Washington.pre_covid_infant_groupsize
          );
          $("input[name='toddlerGroupSize']").val(
            data.Washington.pre_covid_toddler_groupsize
          );
          $("input[name='pre3GroupSize']").val(
            data.Washington.pre_covid_pre3_groupsize
          );
          $("input[name='pre4GroupSize']").val(
            data.Washington.pre_covid_pre4_groupsize
          );
        });
        break;

      case "WV":
        console.log("this is WV!!");
        $.getJSON("json/child_care_center.json", function (data) {
          //populating ratios column
          $("input[name='infantRatio']").val(
            data.West_Virginia.pre_covid_infant_ratio
          );
          $("input[name='toddlerRatio']").val(
            data.West_Virginia.pre_covid_toddler_ratio
          );
          $("input[name='pre3Ratio']").val(
            data.West_Virginia.pre_covid_pre3_ratio
          );
          $("input[name='pre4Ratio']").val(
            data.West_Virginia.pre_covid_pre4_ratio
          );

          //populating groupsize column
          $("input[name='infantGroupSize']").val(
            data.West_Virginia.pre_covid_infant_groupsize
          );
          $("input[name='toddlerGroupSize']").val(
            data.West_Virginia.pre_covid_toddler_groupsize
          );
          $("input[name='pre3GroupSize']").val(
            data.West_Virginia.pre_covid_pre3_groupsize
          );
          $("input[name='pre4GroupSize']").val(
            data.West_Virginia.pre_covid_pre4_groupsize
          );
        });
        break;

      case "WI":
        console.log("this is WI!!");
        $.getJSON("json/child_care_center.json", function (data) {
          //populating ratios column
          $("input[name='infantRatio']").val(
            data.Wisconsin.pre_covid_infant_ratio
          );
          $("input[name='toddlerRatio']").val(
            data.Wisconsin.pre_covid_toddler_ratio
          );
          $("input[name='pre3Ratio']").val(data.Wisconsin.pre_covid_pre3_ratio);
          $("input[name='pre4Ratio']").val(data.Wisconsin.pre_covid_pre4_ratio);

          //populating groupsize column
          $("input[name='infantGroupSize']").val(
            data.Wisconsin.pre_covid_infant_groupsize
          );
          $("input[name='toddlerGroupSize']").val(
            data.Wisconsin.pre_covid_toddler_groupsize
          );
          $("input[name='pre3GroupSize']").val(
            data.Wisconsin.pre_covid_pre3_groupsize
          );
          $("input[name='pre4GroupSize']").val(
            data.Wisconsin.pre_covid_pre4_groupsize
          );
        });
        break;

      case "WY":
        console.log("this is WY!!");
        $.getJSON("json/child_care_center.json", function (data) {
          //populating ratios column
          $("input[name='infantRatio']").val(
            data.Wyoming.pre_covid_infant_ratio
          );
          $("input[name='toddlerRatio']").val(
            data.Wyoming.pre_covid_toddler_ratio
          );
          $("input[name='pre3Ratio']").val(data.Wyoming.pre_covid_pre3_ratio);
          $("input[name='pre4Ratio']").val(data.Wyoming.pre_covid_pre4_ratio);

          //populating groupsize column
          $("input[name='infantGroupSize']").val(
            data.Wyoming.pre_covid_infant_groupsize
          );
          $("input[name='toddlerGroupSize']").val(
            data.Wyoming.pre_covid_toddler_groupsize
          );
          $("input[name='pre3GroupSize']").val(
            data.Wyoming.pre_covid_pre3_groupsize
          );
          $("input[name='pre4GroupSize']").val(
            data.Wyoming.pre_covid_pre4_groupsize
          );
        });
        break;

      case "MA":
        console.log("this is MA!!");
        $.getJSON("json/child_care_center.json", function (data) {
          //populating ratios column
          $("input[name='infantRatio']").val(
            data.Massachusetts.pre_covid_infant_ratio
          );
          $("input[name='toddlerRatio']").val(
            data.Massachusetts.pre_covid_toddler_ratio
          );
          $("input[name='pre3Ratio']").val(
            data.Massachusetts.pre_covid_pre3_ratio
          );
          $("input[name='pre4Ratio']").val(
            data.Massachusetts.pre_covid_pre4_ratio
          );

          //populating groupsize column
          $("input[name='infantGroupSize']").val(
            data.Massachusetts.pre_covid_infant_groupsize
          );
          $("input[name='toddlerGroupSize']").val(
            data.Massachusetts.pre_covid_toddler_groupsize
          );
          $("input[name='pre3GroupSize']").val(
            data.Massachusetts.pre_covid_pre3_groupsize
          );
          $("input[name='pre4GroupSize']").val(
            data.Massachusetts.pre_covid_pre4_groupsize
          );
        });
        break;

      case "OR":
        console.log("this is OR!!");
        $.getJSON("json/child_care_center.json", function (data) {
          //populating ratios column
          $("input[name='infantRatio']").val(
            data.Oregon.pre_covid_infant_ratio
          );
          $("input[name='toddlerRatio']").val(
            data.Oregon.pre_covid_toddler_ratio
          );
          $("input[name='pre3Ratio']").val(data.Oregon.pre_covid_pre3_ratio);
          $("input[name='pre4Ratio']").val(data.Oregon.pre_covid_pre4_ratio);

          //populating groupsize column
          $("input[name='infantGroupSize']").val(
            data.Oregon.pre_covid_infant_groupsize
          );
          $("input[name='toddlerGroupSize']").val(
            data.Oregon.pre_covid_toddler_groupsize
          );
          $("input[name='pre3GroupSize']").val(
            data.Oregon.pre_covid_pre3_groupsize
          );
          $("input[name='pre4GroupSize']").val(
            data.Oregon.pre_covid_pre4_groupsize
          );
        });
        break;

      case "DC":
        console.log("this is DC!!");
        $.getJSON("json/child_care_center.json", function (data) {
          //populating ratios column
          $("input[name='infantRatio']").val(
            data.District_of_Columbia.pre_covid_infant_ratio
          );
          $("input[name='toddlerRatio']").val(
            data.District_of_Columbia.pre_covid_toddler_ratio
          );
          $("input[name='pre3Ratio']").val(
            data.District_of_Columbia.pre_covid_pre3_ratio
          );
          $("input[name='pre4Ratio']").val(
            data.District_of_Columbia.pre_covid_pre4_ratio
          );

          //populating groupsize column
          $("input[name='infantGroupSize']").val(
            data.District_of_Columbia.pre_covid_infant_groupsize
          );
          $("input[name='toddlerGroupSize']").val(
            data.District_of_Columbia.pre_covid_toddler_groupsize
          );
          $("input[name='pre3GroupSize']").val(
            data.District_of_Columbia.pre_covid_pre3_groupsize
          );
          $("input[name='pre4GroupSize']").val(
            data.District_of_Columbia.pre_covid_pre4_groupsize
          );
        });
        break;

      default:
        break;
    }
  }

  /*******COVID SCENARIO*******/

  if (selectedRatio == "covid") {
    switch (stateSelected) {
      case "AL":
        console.log("this is alabama!!");
        $.getJSON("json/child_care_center.json", function (data) {
          //populating ratios column
          $("input[name='infantRatio']").val(data.Alabama.covid_infant_ratio);
          $("input[name='toddlerRatio']").val(data.Alabama.covid_toddler_ratio);
          $("input[name='pre3Ratio']").val(data.Alabama.covid_pre3_ratio);
          $("input[name='pre4Ratio']").val(data.Alabama.covid_pre4_ratio);

          //populating groupsize column
          $("input[name='infantGroupSize']").val(
            data.Alabama.covid_infant_groupsize
          );
          $("input[name='toddlerGroupSize']").val(
            data.Alabama.covid_toddler_groupsize
          );
          $("input[name='pre3GroupSize']").val(
            data.Alabama.covid_pre3_groupsize
          );
          $("input[name='pre4GroupSize']").val(
            data.Alabama.covid_pre4_groupsize
          );
        });
        break;

      case "AK":
        console.log("this is AK!!");
        $.getJSON("json/child_care_center.json", function (data) {
          //populating ratios column
          $("input[name='infantRatio']").val(data.Alaska.covid_infant_ratio);
          $("input[name='toddlerRatio']").val(data.Alaska.covid_toddler_ratio);
          $("input[name='pre3Ratio']").val(data.Alaska.covid_pre3_ratio);
          $("input[name='pre4Ratio']").val(data.Alaska.covid_pre4_ratio);

          //populating groupsize column
          $("input[name='infantGroupSize']").val(
            data.Alaska.covid_infant_groupsize
          );
          $("input[name='toddlerGroupSize']").val(
            data.Alaska.covid_toddler_groupsize
          );
          $("input[name='pre3GroupSize']").val(
            data.Alaska.covid_pre3_groupsize
          );
          $("input[name='pre4GroupSize']").val(
            data.Alaska.covid_pre4_groupsize
          );
        });
        break;

      case "AZ":
        console.log("this is AZ!!");
        $.getJSON("json/child_care_center.json", function (data) {
          //populating ratios column
          $("input[name='infantRatio']").val(data.Arizona.covid_infant_ratio);
          $("input[name='toddlerRatio']").val(data.Arizona.covid_toddler_ratio);
          $("input[name='pre3Ratio']").val(data.Arizona.covid_pre3_ratio);
          $("input[name='pre4Ratio']").val(data.Arizona.covid_pre4_ratio);

          //populating groupsize column
          $("input[name='infantGroupSize']").val(
            data.Arizona.covid_infant_groupsize
          );
          $("input[name='toddlerGroupSize']").val(
            data.Arizona.covid_toddler_groupsize
          );
          $("input[name='pre3GroupSize']").val(
            data.Arizona.covid_pre3_groupsize
          );
          $("input[name='pre4GroupSize']").val(
            data.Arizona.covid_pre4_groupsize
          );
        });
        break;

      case "AR":
        console.log("this is AR!!");
        $.getJSON("json/child_care_center.json", function (data) {
          //populating ratios column
          $("input[name='infantRatio']").val(data.Arkansas.covid_infant_ratio);
          $("input[name='toddlerRatio']").val(
            data.Arkansas.covid_toddler_ratio
          );
          $("input[name='pre3Ratio']").val(data.Arkansas.covid_pre3_ratio);
          $("input[name='pre4Ratio']").val(data.Arkansas.covid_pre4_ratio);

          //populating groupsize column
          $("input[name='infantGroupSize']").val(
            data.Arkansas.covid_infant_groupsize
          );
          $("input[name='toddlerGroupSize']").val(
            data.Arkansas.covid_toddler_groupsize
          );
          $("input[name='pre3GroupSize']").val(
            data.Arkansas.covid_pre3_groupsize
          );
          $("input[name='pre4GroupSize']").val(
            data.Arkansas.covid_pre4_groupsize
          );
        });
        break;

      case "CA":
        console.log("this is CA!!");
        $.getJSON("json/child_care_center.json", function (data) {
          //populating ratios column
          $("input[name='infantRatio']").val(
            data.California.covid_infant_ratio
          );
          $("input[name='toddlerRatio']").val(
            data.California.covid_toddler_ratio
          );
          $("input[name='pre3Ratio']").val(data.California.covid_pre3_ratio);
          $("input[name='pre4Ratio']").val(data.California.covid_pre4_ratio);

          //populating groupsize column
          $("input[name='infantGroupSize']").val(
            data.California.covid_infant_groupsize
          );
          $("input[name='toddlerGroupSize']").val(
            data.California.covid_toddler_groupsize
          );
          $("input[name='pre3GroupSize']").val(
            data.California.covid_pre3_groupsize
          );
          $("input[name='pre4GroupSize']").val(
            data.California.covid_pre4_groupsize
          );
        });
        break;

      case "CO":
        console.log("this is CO!!");
        $.getJSON("json/child_care_center.json", function (data) {
          //populating ratios column
          $("input[name='infantRatio']").val(data.Colorado.covid_infant_ratio);
          $("input[name='toddlerRatio']").val(
            data.Colorado.covid_toddler_ratio
          );
          $("input[name='pre3Ratio']").val(data.Colorado.covid_pre3_ratio);
          $("input[name='pre4Ratio']").val(data.Colorado.covid_pre4_ratio);

          //populating groupsize column
          $("input[name='infantGroupSize']").val(
            data.Colorado.covid_infant_groupsize
          );
          $("input[name='toddlerGroupSize']").val(
            data.Colorado.covid_toddler_groupsize
          );
          $("input[name='pre3GroupSize']").val(
            data.Colorado.covid_pre3_groupsize
          );
          $("input[name='pre4GroupSize']").val(
            data.Colorado.covid_pre4_groupsize
          );
        });
        break;

      case "CT":
        console.log("this is CT!!");
        $.getJSON("json/child_care_center.json", function (data) {
          //populating ratios column
          $("input[name='infantRatio']").val(
            data.Connecticut.covid_infant_ratio
          );
          $("input[name='toddlerRatio']").val(
            data.Connecticut.covid_toddler_ratio
          );
          $("input[name='pre3Ratio']").val(data.Connecticut.covid_pre3_ratio);
          $("input[name='pre4Ratio']").val(data.Connecticut.covid_pre4_ratio);

          //populating groupsize column
          $("input[name='infantGroupSize']").val(
            data.Connecticut.covid_infant_groupsize
          );
          $("input[name='toddlerGroupSize']").val(
            data.Connecticut.covid_toddler_groupsize
          );
          $("input[name='pre3GroupSize']").val(
            data.Connecticut.covid_pre3_groupsize
          );
          $("input[name='pre4GroupSize']").val(
            data.Connecticut.covid_pre4_groupsize
          );
        });
        break;

      case "DE":
        console.log("this is DE!!");
        $.getJSON("json/child_care_center.json", function (data) {
          //populating ratios column
          $("input[name='infantRatio']").val(data.Delaware.covid_infant_ratio);
          $("input[name='toddlerRatio']").val(
            data.Delaware.covid_toddler_ratio
          );
          $("input[name='pre3Ratio']").val(data.Delaware.covid_pre3_ratio);
          $("input[name='pre4Ratio']").val(data.Delaware.covid_pre4_ratio);

          //populating groupsize column
          $("input[name='infantGroupSize']").val(
            data.Delaware.covid_infant_groupsize
          );
          $("input[name='toddlerGroupSize']").val(
            data.Delaware.covid_toddler_groupsize
          );
          $("input[name='pre3GroupSize']").val(
            data.Delaware.covid_pre3_groupsize
          );
          $("input[name='pre4GroupSize']").val(
            data.Delaware.covid_pre4_groupsize
          );
        });
        break;

      case "FL":
        console.log("this is FL!!");
        $.getJSON("json/child_care_center.json", function (data) {
          //populating ratios column
          $("input[name='infantRatio']").val(data.Florida.covid_infant_ratio);
          $("input[name='toddlerRatio']").val(data.Florida.covid_toddler_ratio);
          $("input[name='pre3Ratio']").val(data.Florida.covid_pre3_ratio);
          $("input[name='pre4Ratio']").val(data.Florida.covid_pre4_ratio);

          //populating groupsize column
          $("input[name='infantGroupSize']").val(
            data.Florida.covid_infant_groupsize
          );
          $("input[name='toddlerGroupSize']").val(
            data.Florida.covid_toddler_groupsize
          );
          $("input[name='pre3GroupSize']").val(
            data.Florida.covid_pre3_groupsize
          );
          $("input[name='pre4GroupSize']").val(
            data.Florida.covid_pre4_groupsize
          );
        });
        break;

      case "GA":
        console.log("this is GA!!");
        $.getJSON("json/child_care_center.json", function (data) {
          //populating ratios column
          $("input[name='infantRatio']").val(data.Georgia.covid_infant_ratio);
          $("input[name='toddlerRatio']").val(data.Georgia.covid_toddler_ratio);
          $("input[name='pre3Ratio']").val(data.Georgia.covid_pre3_ratio);
          $("input[name='pre4Ratio']").val(data.Georgia.covid_pre4_ratio);

          //populating groupsize column
          $("input[name='infantGroupSize']").val(
            data.Georgia.covid_infant_groupsize
          );
          $("input[name='toddlerGroupSize']").val(
            data.Georgia.covid_toddler_groupsize
          );
          $("input[name='pre3GroupSize']").val(
            data.Georgia.covid_pre3_groupsize
          );
          $("input[name='pre4GroupSize']").val(
            data.Georgia.covid_pre4_groupsize
          );
        });
        break;

      case "HI":
        console.log("this is HI!!");
        $.getJSON("json/child_care_center.json", function (data) {
          //populating ratios column
          $("input[name='infantRatio']").val(data.Hawaii.covid_infant_ratio);
          $("input[name='toddlerRatio']").val(data.Hawaii.covid_toddler_ratio);
          $("input[name='pre3Ratio']").val(data.Hawaii.covid_pre3_ratio);
          $("input[name='pre4Ratio']").val(data.Hawaii.covid_pre4_ratio);

          //populating groupsize column
          $("input[name='infantGroupSize']").val(
            data.Hawaii.covid_infant_groupsize
          );
          $("input[name='toddlerGroupSize']").val(
            data.Hawaii.covid_toddler_groupsize
          );
          $("input[name='pre3GroupSize']").val(
            data.Hawaii.covid_pre3_groupsize
          );
          $("input[name='pre4GroupSize']").val(
            data.Hawaii.covid_pre4_groupsize
          );
        });
        break;

      case "ID":
        console.log("this is ID!!");
        $.getJSON("json/child_care_center.json", function (data) {
          //populating ratios column
          $("input[name='infantRatio']").val(data.Idaho.covid_infant_ratio);
          $("input[name='toddlerRatio']").val(data.Idaho.covid_toddler_ratio);
          $("input[name='pre3Ratio']").val(data.Idaho.covid_pre3_ratio);
          $("input[name='pre4Ratio']").val(data.Idaho.covid_pre4_ratio);

          //populating groupsize column
          $("input[name='infantGroupSize']").val(
            data.Idaho.covid_infant_groupsize
          );
          $("input[name='toddlerGroupSize']").val(
            data.Idaho.covid_toddler_groupsize
          );
          $("input[name='pre3GroupSize']").val(data.Idaho.covid_pre3_groupsize);
          $("input[name='pre4GroupSize']").val(data.Idaho.covid_pre4_groupsize);
        });
        break;

      case "IL":
        console.log("this is IL!!");
        $.getJSON("json/child_care_center.json", function (data) {
          //populating ratios column
          $("input[name='infantRatio']").val(data.Illinois.covid_infant_ratio);
          $("input[name='toddlerRatio']").val(
            data.Illinois.covid_toddler_ratio
          );
          $("input[name='pre3Ratio']").val(data.Illinois.covid_pre3_ratio);
          $("input[name='pre4Ratio']").val(data.Illinois.covid_pre4_ratio);

          //populating groupsize column
          $("input[name='infantGroupSize']").val(
            data.Illinois.covid_infant_groupsize
          );
          $("input[name='toddlerGroupSize']").val(
            data.Illinois.covid_toddler_groupsize
          );
          $("input[name='pre3GroupSize']").val(
            data.Illinois.covid_pre3_groupsize
          );
          $("input[name='pre4GroupSize']").val(
            data.Illinois.covid_pre4_groupsize
          );
        });
        break;

      case "IN":
        console.log("this is IN!!");
        $.getJSON("json/child_care_center.json", function (data) {
          //populating ratios column
          $("input[name='infantRatio']").val(data.Indiana.covid_infant_ratio);
          $("input[name='toddlerRatio']").val(data.Indiana.covid_toddler_ratio);
          $("input[name='pre3Ratio']").val(data.Indiana.covid_pre3_ratio);
          $("input[name='pre4Ratio']").val(data.Indiana.covid_pre4_ratio);

          //populating groupsize column
          $("input[name='infantGroupSize']").val(
            data.Indiana.covid_infant_groupsize
          );
          $("input[name='toddlerGroupSize']").val(
            data.Indiana.covid_toddler_groupsize
          );
          $("input[name='pre3GroupSize']").val(
            data.Indiana.covid_pre3_groupsize
          );
          $("input[name='pre4GroupSize']").val(
            data.Indiana.covid_pre4_groupsize
          );
        });
        break;

      case "IA":
        console.log("this is IA!!");
        $.getJSON("json/child_care_center.json", function (data) {
          //populating ratios column
          $("input[name='infantRatio']").val(data.Iowa.covid_infant_ratio);
          $("input[name='toddlerRatio']").val(data.Iowa.covid_toddler_ratio);
          $("input[name='pre3Ratio']").val(data.Iowa.covid_pre3_ratio);
          $("input[name='pre4Ratio']").val(data.Iowa.covid_pre4_ratio);

          //populating groupsize column
          $("input[name='infantGroupSize']").val(
            data.Iowa.covid_infant_groupsize
          );
          $("input[name='toddlerGroupSize']").val(
            data.Iowa.covid_toddler_groupsize
          );
          $("input[name='pre3GroupSize']").val(data.Iowa.covid_pre3_groupsize);
          $("input[name='pre4GroupSize']").val(data.Iowa.covid_pre4_groupsize);
        });
        break;

      case "KS":
        console.log("this is KS!!");
        $.getJSON("json/child_care_center.json", function (data) {
          //populating ratios column
          $("input[name='infantRatio']").val(data.Kansas.covid_infant_ratio);
          $("input[name='toddlerRatio']").val(data.Kansas.covid_toddler_ratio);
          $("input[name='pre3Ratio']").val(data.Kansas.covid_pre3_ratio);
          $("input[name='pre4Ratio']").val(data.Kansas.covid_pre4_ratio);

          //populating groupsize column
          $("input[name='infantGroupSize']").val(
            data.Kansas.covid_infant_groupsize
          );
          $("input[name='toddlerGroupSize']").val(
            data.Kansas.covid_toddler_groupsize
          );
          $("input[name='pre3GroupSize']").val(
            data.Kansas.covid_pre3_groupsize
          );
          $("input[name='pre4GroupSize']").val(
            data.Kansas.covid_pre4_groupsize
          );
        });
        break;

      case "KN":
        console.log("this is KN!!");
        $.getJSON("json/child_care_center.json", function (data) {
          //populating ratios column
          $("input[name='infantRatio']").val(data.Kentucky.covid_infant_ratio);
          $("input[name='toddlerRatio']").val(
            data.Kentucky.covid_toddler_ratio
          );
          $("input[name='pre3Ratio']").val(data.Kentucky.covid_pre3_ratio);
          $("input[name='pre4Ratio']").val(data.Kentucky.covid_pre4_ratio);

          //populating groupsize column
          $("input[name='infantGroupSize']").val(
            data.Kentucky.covid_infant_groupsize
          );
          $("input[name='toddlerGroupSize']").val(
            data.Kentucky.covid_toddler_groupsize
          );
          $("input[name='pre3GroupSize']").val(
            data.Kentucky.covid_pre3_groupsize
          );
          $("input[name='pre4GroupSize']").val(
            data.Kentucky.covid_pre4_groupsize
          );
        });
        break;

      case "LA":
        console.log("this is LA!!");
        $.getJSON("json/child_care_center.json", function (data) {
          //populating ratios column
          $("input[name='infantRatio']").val(data.Louisiana.covid_infant_ratio);
          $("input[name='toddlerRatio']").val(
            data.Louisiana.covid_toddler_ratio
          );
          $("input[name='pre3Ratio']").val(data.Louisiana.covid_pre3_ratio);
          $("input[name='pre4Ratio']").val(data.Louisiana.covid_pre4_ratio);

          //populating groupsize column
          $("input[name='infantGroupSize']").val(
            data.Louisiana.covid_infant_groupsize
          );
          $("input[name='toddlerGroupSize']").val(
            data.Louisiana.covid_toddler_groupsize
          );
          $("input[name='pre3GroupSize']").val(
            data.Louisiana.covid_pre3_groupsize
          );
          $("input[name='pre4GroupSize']").val(
            data.Louisiana.covid_pre4_groupsize
          );
        });
        break;

      case "ME":
        console.log("this is ME!!");
        $.getJSON("json/child_care_center.json", function (data) {
          //populating ratios column
          $("input[name='infantRatio']").val(data.Maine.covid_infant_ratio);
          $("input[name='toddlerRatio']").val(data.Maine.covid_toddler_ratio);
          $("input[name='pre3Ratio']").val(data.Maine.covid_pre3_ratio);
          $("input[name='pre4Ratio']").val(data.Maine.covid_pre4_ratio);

          //populating groupsize column
          $("input[name='infantGroupSize']").val(
            data.Maine.covid_infant_groupsize
          );
          $("input[name='toddlerGroupSize']").val(
            data.Maine.covid_toddler_groupsize
          );
          $("input[name='pre3GroupSize']").val(data.Maine.covid_pre3_groupsize);
          $("input[name='pre4GroupSize']").val(data.Maine.covid_pre4_groupsize);
        });
        break;

      case "MD":
        console.log("this is MD!!");
        $.getJSON("json/child_care_center.json", function (data) {
          //populating ratios column
          $("input[name='infantRatio']").val(data.Maryland.covid_infant_ratio);
          $("input[name='toddlerRatio']").val(
            data.Maryland.covid_toddler_ratio
          );
          $("input[name='pre3Ratio']").val(data.Maryland.covid_pre3_ratio);
          $("input[name='pre4Ratio']").val(data.Maryland.covid_pre4_ratio);

          //populating groupsize column
          $("input[name='infantGroupSize']").val(
            data.Maryland.covid_infant_groupsize
          );
          $("input[name='toddlerGroupSize']").val(
            data.Maryland.covid_toddler_groupsize
          );
          $("input[name='pre3GroupSize']").val(
            data.Maryland.covid_pre3_groupsize
          );
          $("input[name='pre4GroupSize']").val(
            data.Maryland.covid_pre4_groupsize
          );
        });
        break;

      case "MI":
        console.log("this is MI!!");
        $.getJSON("json/child_care_center.json", function (data) {
          //populating ratios column
          $("input[name='infantRatio']").val(data.Michigan.covid_infant_ratio);
          $("input[name='toddlerRatio']").val(
            data.Michigan.covid_toddler_ratio
          );
          $("input[name='pre3Ratio']").val(data.Michigan.covid_pre3_ratio);
          $("input[name='pre4Ratio']").val(data.Michigan.covid_pre4_ratio);

          //populating groupsize column
          $("input[name='infantGroupSize']").val(
            data.Michigan.covid_infant_groupsize
          );
          $("input[name='toddlerGroupSize']").val(
            data.Michigan.covid_toddler_groupsize
          );
          $("input[name='pre3GroupSize']").val(
            data.Michigan.covid_pre3_groupsize
          );
          $("input[name='pre4GroupSize']").val(
            data.Michigan.covid_pre4_groupsize
          );
        });
        break;

      case "MN":
        console.log("this is MN!!");
        $.getJSON("json/child_care_center.json", function (data) {
          //populating ratios column
          $("input[name='infantRatio']").val(data.Minnesota.covid_infant_ratio);
          $("input[name='toddlerRatio']").val(
            data.Minnesota.covid_toddler_ratio
          );
          $("input[name='pre3Ratio']").val(data.Minnesota.covid_pre3_ratio);
          $("input[name='pre4Ratio']").val(data.Minnesota.covid_pre4_ratio);

          //populating groupsize column
          $("input[name='infantGroupSize']").val(
            data.Minnesota.covid_infant_groupsize
          );
          $("input[name='toddlerGroupSize']").val(
            data.Minnesota.covid_toddler_groupsize
          );
          $("input[name='pre3GroupSize']").val(
            data.Minnesota.covid_pre3_groupsize
          );
          $("input[name='pre4GroupSize']").val(
            data.Minnesota.covid_pre4_groupsize
          );
        });
        break;

      case "MS":
        console.log("this is MS!!");
        $.getJSON("json/child_care_center.json", function (data) {
          //populating ratios column
          $("input[name='infantRatio']").val(
            data.Mississippi.covid_infant_ratio
          );
          $("input[name='toddlerRatio']").val(
            data.Mississippi.covid_toddler_ratio
          );
          $("input[name='pre3Ratio']").val(data.Mississippi.covid_pre3_ratio);
          $("input[name='pre4Ratio']").val(data.Mississippi.covid_pre4_ratio);

          //populating groupsize column
          $("input[name='infantGroupSize']").val(
            data.Mississippi.covid_infant_groupsize
          );
          $("input[name='toddlerGroupSize']").val(
            data.Mississippi.covid_toddler_groupsize
          );
          $("input[name='pre3GroupSize']").val(
            data.Mississippi.covid_pre3_groupsize
          );
          $("input[name='pre4GroupSize']").val(
            data.Mississippi.covid_pre4_groupsize
          );
        });
        break;

      case "MO":
        console.log("this is MO!!");
        $.getJSON("json/child_care_center.json", function (data) {
          //populating ratios column
          $("input[name='infantRatio']").val(data.Missouri.covid_infant_ratio);
          $("input[name='toddlerRatio']").val(
            data.Missouri.covid_toddler_ratio
          );
          $("input[name='pre3Ratio']").val(data.Missouri.covid_pre3_ratio);
          $("input[name='pre4Ratio']").val(data.Missouri.covid_pre4_ratio);

          //populating groupsize column
          $("input[name='infantGroupSize']").val(
            data.Missouri.covid_infant_groupsize
          );
          $("input[name='toddlerGroupSize']").val(
            data.Missouri.covid_toddler_groupsize
          );
          $("input[name='pre3GroupSize']").val(
            data.Missouri.covid_pre3_groupsize
          );
          $("input[name='pre4GroupSize']").val(
            data.Missouri.covid_pre4_groupsize
          );
        });
        break;

      case "MT":
        console.log("this is MT!!");
        $.getJSON("json/child_care_center.json", function (data) {
          //populating ratios column
          $("input[name='infantRatio']").val(data.Montana.covid_infant_ratio);
          $("input[name='toddlerRatio']").val(data.Montana.covid_toddler_ratio);
          $("input[name='pre3Ratio']").val(data.Montana.covid_pre3_ratio);
          $("input[name='pre4Ratio']").val(data.Montana.covid_pre4_ratio);

          //populating groupsize column
          $("input[name='infantGroupSize']").val(
            data.Montana.covid_infant_groupsize
          );
          $("input[name='toddlerGroupSize']").val(
            data.Montana.covid_toddler_groupsize
          );
          $("input[name='pre3GroupSize']").val(
            data.Montana.covid_pre3_groupsize
          );
          $("input[name='pre4GroupSize']").val(
            data.Montana.covid_pre4_groupsize
          );
        });
        break;

      case "NE":
        console.log("this is NE!!");
        $.getJSON("json/child_care_center.json", function (data) {
          //populating ratios column
          $("input[name='infantRatio']").val(data.Nebraska.covid_infant_ratio);
          $("input[name='toddlerRatio']").val(
            data.Nebraska.covid_toddler_ratio
          );
          $("input[name='pre3Ratio']").val(data.Nebraska.covid_pre3_ratio);
          $("input[name='pre4Ratio']").val(data.Nebraska.covid_pre4_ratio);

          //populating groupsize column
          $("input[name='infantGroupSize']").val(
            data.Nebraska.covid_infant_groupsize
          );
          $("input[name='toddlerGroupSize']").val(
            data.Nebraska.covid_toddler_groupsize
          );
          $("input[name='pre3GroupSize']").val(
            data.Nebraska.covid_pre3_groupsize
          );
          $("input[name='pre4GroupSize']").val(
            data.Nebraska.covid_pre4_groupsize
          );
        });
        break;

      case "NV":
        console.log("this is NV!!");
        $.getJSON("json/child_care_center.json", function (data) {
          //populating ratios column
          $("input[name='infantRatio']").val(data.Nevada.covid_infant_ratio);
          $("input[name='toddlerRatio']").val(data.Nevada.covid_toddler_ratio);
          $("input[name='pre3Ratio']").val(data.Nevada.covid_pre3_ratio);
          $("input[name='pre4Ratio']").val(data.Nevada.covid_pre4_ratio);

          //populating groupsize column
          $("input[name='infantGroupSize']").val(
            data.Nevada.covid_infant_groupsize
          );
          $("input[name='toddlerGroupSize']").val(
            data.Nevada.covid_toddler_groupsize
          );
          $("input[name='pre3GroupSize']").val(
            data.Nevada.covid_pre3_groupsize
          );
          $("input[name='pre4GroupSize']").val(
            data.Nevada.covid_pre4_groupsize
          );
        });
        break;

      case "NH":
        console.log("this is NH!!");
        $.getJSON("json/child_care_center.json", function (data) {
          //populating ratios column
          $("input[name='infantRatio']").val(
            data.New_Hampshire.covid_infant_ratio
          );
          $("input[name='toddlerRatio']").val(
            data.New_Hampshire.covid_toddler_ratio
          );
          $("input[name='pre3Ratio']").val(data.New_Hampshire.covid_pre3_ratio);
          $("input[name='pre4Ratio']").val(data.New_Hampshire.covid_pre4_ratio);

          //populating groupsize column
          $("input[name='infantGroupSize']").val(
            data.New_Hampshire.covid_infant_groupsize
          );
          $("input[name='toddlerGroupSize']").val(
            data.New_Hampshire.covid_toddler_groupsize
          );
          $("input[name='pre3GroupSize']").val(
            data.New_Hampshire.covid_pre3_groupsize
          );
          $("input[name='pre4GroupSize']").val(
            data.New_Hampshire.covid_pre4_groupsize
          );
        });
        break;

      case "NJ":
        console.log("this is NJ!!");
        $.getJSON("json/child_care_center.json", function (data) {
          //populating ratios column
          $("input[name='infantRatio']").val(
            data.New_Jersey.covid_infant_ratio
          );
          $("input[name='toddlerRatio']").val(
            data.New_Jersey.covid_toddler_ratio
          );
          $("input[name='pre3Ratio']").val(data.New_Jersey.covid_pre3_ratio);
          $("input[name='pre4Ratio']").val(data.New_Jersey.covid_pre4_ratio);

          //populating groupsize column
          $("input[name='infantGroupSize']").val(
            data.New_Jersey.covid_infant_groupsize
          );
          $("input[name='toddlerGroupSize']").val(
            data.New_Jersey.covid_toddler_groupsize
          );
          $("input[name='pre3GroupSize']").val(
            data.New_Jersey.covid_pre3_groupsize
          );
          $("input[name='pre4GroupSize']").val(
            data.New_Jersey.covid_pre4_groupsize
          );
        });
        break;

      case "NW":
        console.log("this is NW!!");
        $.getJSON("json/child_care_center.json", function (data) {
          //populating ratios column
          $("input[name='infantRatio']").val(
            data.New_Mexico.covid_infant_ratio
          );
          $("input[name='toddlerRatio']").val(
            data.New_Mexico.covid_toddler_ratio
          );
          $("input[name='pre3Ratio']").val(data.New_Mexico.covid_pre3_ratio);
          $("input[name='pre4Ratio']").val(data.New_Mexico.covid_pre4_ratio);

          //populating groupsize column
          $("input[name='infantGroupSize']").val(
            data.New_Mexico.covid_infant_groupsize
          );
          $("input[name='toddlerGroupSize']").val(
            data.New_Mexico.covid_toddler_groupsize
          );
          $("input[name='pre3GroupSize']").val(
            data.New_Mexico.covid_pre3_groupsize
          );
          $("input[name='pre4GroupSize']").val(
            data.New_Mexico.covid_pre4_groupsize
          );
        });
        break;

      case "NY":
        console.log("this is NY!!");
        $.getJSON("json/child_care_center.json", function (data) {
          //populating ratios column
          $("input[name='infantRatio']").val(data.New_York.covid_infant_ratio);
          $("input[name='toddlerRatio']").val(
            data.New_York.covid_toddler_ratio
          );
          $("input[name='pre3Ratio']").val(data.New_York.covid_pre3_ratio);
          $("input[name='pre4Ratio']").val(data.New_York.covid_pre4_ratio);

          //populating groupsize column
          $("input[name='infantGroupSize']").val(
            data.New_York.covid_infant_groupsize
          );
          $("input[name='toddlerGroupSize']").val(
            data.New_York.covid_toddler_groupsize
          );
          $("input[name='pre3GroupSize']").val(
            data.New_York.covid_pre3_groupsize
          );
          $("input[name='pre4GroupSize']").val(
            data.New_York.covid_pre4_groupsize
          );
        });
        break;

      case "NC":
        console.log("this is NC!!");
        $.getJSON("json/child_care_center.json", function (data) {
          //populating ratios column
          $("input[name='infantRatio']").val(
            data.North_Carolina.covid_infant_ratio
          );
          $("input[name='toddlerRatio']").val(
            data.North_Carolina.covid_toddler_ratio
          );
          $("input[name='pre3Ratio']").val(
            data.North_Carolina.covid_pre3_ratio
          );
          $("input[name='pre4Ratio']").val(
            data.North_Carolina.covid_pre4_ratio
          );

          //populating groupsize column
          $("input[name='infantGroupSize']").val(
            data.North_Carolina.covid_infant_groupsize
          );
          $("input[name='toddlerGroupSize']").val(
            data.North_Carolina.covid_toddler_groupsize
          );
          $("input[name='pre3GroupSize']").val(
            data.North_Carolina.covid_pre3_groupsize
          );
          $("input[name='pre4GroupSize']").val(
            data.North_Carolina.covid_pre4_groupsize
          );
        });
        break;

      case "ND":
        console.log("this is ND!!");
        $.getJSON("json/child_care_center.json", function (data) {
          //populating ratios column
          $("input[name='infantRatio']").val(
            data.North_Dakota.covid_infant_ratio
          );
          $("input[name='toddlerRatio']").val(
            data.North_Dakota.covid_toddler_ratio
          );
          $("input[name='pre3Ratio']").val(data.North_Dakota.covid_pre3_ratio);
          $("input[name='pre4Ratio']").val(data.North_Dakota.covid_pre4_ratio);

          //populating groupsize column
          $("input[name='infantGroupSize']").val(
            data.North_Dakota.covid_infant_groupsize
          );
          $("input[name='toddlerGroupSize']").val(
            data.North_Dakota.covid_toddler_groupsize
          );
          $("input[name='pre3GroupSize']").val(
            data.North_Dakota.covid_pre3_groupsize
          );
          $("input[name='pre4GroupSize']").val(
            data.North_Dakota.covid_pre4_groupsize
          );
        });
        break;

      case "OH":
        console.log("this is OH!!");
        $.getJSON("json/child_care_center.json", function (data) {
          //populating ratios column
          $("input[name='infantRatio']").val(data.Ohio.covid_infant_ratio);
          $("input[name='toddlerRatio']").val(data.Ohio.covid_toddler_ratio);
          $("input[name='pre3Ratio']").val(data.Ohio.covid_pre3_ratio);
          $("input[name='pre4Ratio']").val(data.Ohio.covid_pre4_ratio);

          //populating groupsize column
          $("input[name='infantGroupSize']").val(
            data.Ohio.covid_infant_groupsize
          );
          $("input[name='toddlerGroupSize']").val(
            data.Ohio.covid_toddler_groupsize
          );
          $("input[name='pre3GroupSize']").val(data.Ohio.covid_pre3_groupsize);
          $("input[name='pre4GroupSize']").val(data.Ohio.covid_pre4_groupsize);
        });
        break;

      case "OK":
        console.log("this is OK!!");
        $.getJSON("json/child_care_center.json", function (data) {
          //populating ratios column
          $("input[name='infantRatio']").val(data.Oklahoma.covid_infant_ratio);
          $("input[name='toddlerRatio']").val(
            data.Oklahoma.covid_toddler_ratio
          );
          $("input[name='pre3Ratio']").val(data.Oklahoma.covid_pre3_ratio);
          $("input[name='pre4Ratio']").val(data.Oklahoma.covid_pre4_ratio);

          //populating groupsize column
          $("input[name='infantGroupSize']").val(
            data.Oklahoma.covid_infant_groupsize
          );
          $("input[name='toddlerGroupSize']").val(
            data.Oklahoma.covid_toddler_groupsize
          );
          $("input[name='pre3GroupSize']").val(
            data.Oklahoma.covid_pre3_groupsize
          );
          $("input[name='pre4GroupSize']").val(
            data.Oklahoma.covid_pre4_groupsize
          );
        });
        break;

      case "PA":
        console.log("this is PA!!");
        $.getJSON("json/child_care_center.json", function (data) {
          //populating ratios column
          $("input[name='infantRatio']").val(
            data.Pennsylvania.covid_infant_ratio
          );
          $("input[name='toddlerRatio']").val(
            data.Pennsylvania.covid_toddler_ratio
          );
          $("input[name='pre3Ratio']").val(data.Pennsylvania.covid_pre3_ratio);
          $("input[name='pre4Ratio']").val(data.Pennsylvania.covid_pre4_ratio);

          //populating groupsize column
          $("input[name='infantGroupSize']").val(
            data.Pennsylvania.covid_infant_groupsize
          );
          $("input[name='toddlerGroupSize']").val(
            data.Pennsylvania.covid_toddler_groupsize
          );
          $("input[name='pre3GroupSize']").val(
            data.Pennsylvania.covid_pre3_groupsize
          );
          $("input[name='pre4GroupSize']").val(
            data.Pennsylvania.covid_pre4_groupsize
          );
        });
        break;

      case "RI":
        console.log("this is RI!!");
        $.getJSON("json/child_care_center.json", function (data) {
          //populating ratios column
          $("input[name='infantRatio']").val(
            data.Rhode_Island.covid_infant_ratio
          );
          $("input[name='toddlerRatio']").val(
            data.Rhode_Island.covid_toddler_ratio
          );
          $("input[name='pre3Ratio']").val(data.Rhode_Island.covid_pre3_ratio);
          $("input[name='pre4Ratio']").val(data.Rhode_Island.covid_pre4_ratio);

          //populating groupsize column
          $("input[name='infantGroupSize']").val(
            data.Rhode_Island.covid_infant_groupsize
          );
          $("input[name='toddlerGroupSize']").val(
            data.Rhode_Island.covid_toddler_groupsize
          );
          $("input[name='pre3GroupSize']").val(
            data.Rhode_Island.covid_pre3_groupsize
          );
          $("input[name='pre4GroupSize']").val(
            data.Rhode_Island.covid_pre4_groupsize
          );
        });
        break;

      case "SC":
        console.log("this is SC!!");
        $.getJSON("json/child_care_center.json", function (data) {
          //populating ratios column
          $("input[name='infantRatio']").val(
            data.South_Carolina.covid_infant_ratio
          );
          $("input[name='toddlerRatio']").val(
            data.South_Carolina.covid_toddler_ratio
          );
          $("input[name='pre3Ratio']").val(
            data.South_Carolina.covid_pre3_ratio
          );
          $("input[name='pre4Ratio']").val(
            data.South_Carolina.covid_pre4_ratio
          );

          //populating groupsize column
          $("input[name='infantGroupSize']").val(
            data.South_Carolina.covid_infant_groupsize
          );
          $("input[name='toddlerGroupSize']").val(
            data.South_Carolina.covid_toddler_groupsize
          );
          $("input[name='pre3GroupSize']").val(
            data.South_Carolina.covid_pre3_groupsize
          );
          $("input[name='pre4GroupSize']").val(
            data.South_Carolina.covid_pre4_groupsize
          );
        });
        break;

      case "SD":
        console.log("this is SD!!");
        $.getJSON("json/child_care_center.json", function (data) {
          //populating ratios column
          $("input[name='infantRatio']").val(
            data.South_Dakota.covid_infant_ratio
          );
          $("input[name='toddlerRatio']").val(
            data.South_Dakota.covid_toddler_ratio
          );
          $("input[name='pre3Ratio']").val(data.South_Dakota.covid_pre3_ratio);
          $("input[name='pre4Ratio']").val(data.South_Dakota.covid_pre4_ratio);

          //populating groupsize column
          $("input[name='infantGroupSize']").val(
            data.South_Dakota.covid_infant_groupsize
          );
          $("input[name='toddlerGroupSize']").val(
            data.South_Dakota.covid_toddler_groupsize
          );
          $("input[name='pre3GroupSize']").val(
            data.South_Dakota.covid_pre3_groupsize
          );
          $("input[name='pre4GroupSize']").val(
            data.South_Dakota.covid_pre4_groupsize
          );
        });
        break;

      case "TN":
        console.log("this is TN!!");
        $.getJSON("json/child_care_center.json", function (data) {
          //populating ratios column
          $("input[name='infantRatio']").val(data.Tennessee.covid_infant_ratio);
          $("input[name='toddlerRatio']").val(
            data.Tennessee.covid_toddler_ratio
          );
          $("input[name='pre3Ratio']").val(data.Tennessee.covid_pre3_ratio);
          $("input[name='pre4Ratio']").val(data.Tennessee.covid_pre4_ratio);

          //populating groupsize column
          $("input[name='infantGroupSize']").val(
            data.Tennessee.covid_infant_groupsize
          );
          $("input[name='toddlerGroupSize']").val(
            data.Tennessee.covid_toddler_groupsize
          );
          $("input[name='pre3GroupSize']").val(
            data.Tennessee.covid_pre3_groupsize
          );
          $("input[name='pre4GroupSize']").val(
            data.Tennessee.covid_pre4_groupsize
          );
        });
        break;

      case "TX":
        console.log("this is TX!!");
        $.getJSON("json/child_care_center.json", function (data) {
          //populating ratios column
          $("input[name='infantRatio']").val(data.Texas.covid_infant_ratio);
          $("input[name='toddlerRatio']").val(data.Texas.covid_toddler_ratio);
          $("input[name='pre3Ratio']").val(data.Texas.covid_pre3_ratio);
          $("input[name='pre4Ratio']").val(data.Texas.covid_pre4_ratio);

          //populating groupsize column
          $("input[name='infantGroupSize']").val(
            data.Texas.covid_infant_groupsize
          );
          $("input[name='toddlerGroupSize']").val(
            data.Texas.covid_toddler_groupsize
          );
          $("input[name='pre3GroupSize']").val(data.Texas.covid_pre3_groupsize);
          $("input[name='pre4GroupSize']").val(data.Texas.covid_pre4_groupsize);
        });
        break;

      case "UT":
        console.log("this is UT!!");
        $.getJSON("json/child_care_center.json", function (data) {
          //populating ratios column
          $("input[name='infantRatio']").val(data.Utah.covid_infant_ratio);
          $("input[name='toddlerRatio']").val(data.Utah.covid_toddler_ratio);
          $("input[name='pre3Ratio']").val(data.Utah.covid_pre3_ratio);
          $("input[name='pre4Ratio']").val(data.Utah.covid_pre4_ratio);

          //populating groupsize column
          $("input[name='infantGroupSize']").val(
            data.Utah.covid_infant_groupsize
          );
          $("input[name='toddlerGroupSize']").val(
            data.Utah.covid_toddler_groupsize
          );
          $("input[name='pre3GroupSize']").val(data.Utah.covid_pre3_groupsize);
          $("input[name='pre4GroupSize']").val(data.Utah.covid_pre4_groupsize);
        });
        break;

      case "VT":
        console.log("this is VT!!");
        $.getJSON("json/child_care_center.json", function (data) {
          //populating ratios column
          $("input[name='infantRatio']").val(data.Vermont.covid_infant_ratio);
          $("input[name='toddlerRatio']").val(data.Vermont.covid_toddler_ratio);
          $("input[name='pre3Ratio']").val(data.Vermont.covid_pre3_ratio);
          $("input[name='pre4Ratio']").val(data.Vermont.covid_pre4_ratio);

          //populating groupsize column
          $("input[name='infantGroupSize']").val(
            data.Vermont.covid_infant_groupsize
          );
          $("input[name='toddlerGroupSize']").val(
            data.Vermont.covid_toddler_groupsize
          );
          $("input[name='pre3GroupSize']").val(
            data.Vermont.covid_pre3_groupsize
          );
          $("input[name='pre4GroupSize']").val(
            data.Vermont.covid_pre4_groupsize
          );
        });
        break;

      case "VA":
        console.log("this is VA!!");
        $.getJSON("json/child_care_center.json", function (data) {
          //populating ratios column
          $("input[name='infantRatio']").val(data.Virginia.covid_infant_ratio);
          $("input[name='toddlerRatio']").val(
            data.Virginia.covid_toddler_ratio
          );
          $("input[name='pre3Ratio']").val(data.Virginia.covid_pre3_ratio);
          $("input[name='pre4Ratio']").val(data.Virginia.covid_pre4_ratio);

          //populating groupsize column
          $("input[name='infantGroupSize']").val(
            data.Virginia.covid_infant_groupsize
          );
          $("input[name='toddlerGroupSize']").val(
            data.Virginia.covid_toddler_groupsize
          );
          $("input[name='pre3GroupSize']").val(
            data.Virginia.covid_pre3_groupsize
          );
          $("input[name='pre4GroupSize']").val(
            data.Virginia.covid_pre4_groupsize
          );
        });
        break;

      case "WA":
        console.log("this is WA!!");
        $.getJSON("json/child_care_center.json", function (data) {
          //populating ratios column
          $("input[name='infantRatio']").val(
            data.Washington.covid_infant_ratio
          );
          $("input[name='toddlerRatio']").val(
            data.Washington.covid_toddler_ratio
          );
          $("input[name='pre3Ratio']").val(data.Washington.covid_pre3_ratio);
          $("input[name='pre4Ratio']").val(data.Washington.covid_pre4_ratio);

          //populating groupsize column
          $("input[name='infantGroupSize']").val(
            data.Washington.covid_infant_groupsize
          );
          $("input[name='toddlerGroupSize']").val(
            data.Washington.covid_toddler_groupsize
          );
          $("input[name='pre3GroupSize']").val(
            data.Washington.covid_pre3_groupsize
          );
          $("input[name='pre4GroupSize']").val(
            data.Washington.covid_pre4_groupsize
          );
        });
        break;

      case "WV":
        console.log("this is WV!!");
        $.getJSON("json/child_care_center.json", function (data) {
          //populating ratios column
          $("input[name='infantRatio']").val(
            data.West_Virginia.covid_infant_ratio
          );
          $("input[name='toddlerRatio']").val(
            data.West_Virginia.covid_toddler_ratio
          );
          $("input[name='pre3Ratio']").val(data.West_Virginia.covid_pre3_ratio);
          $("input[name='pre4Ratio']").val(data.West_Virginia.covid_pre4_ratio);

          //populating groupsize column
          $("input[name='infantGroupSize']").val(
            data.West_Virginia.covid_infant_groupsize
          );
          $("input[name='toddlerGroupSize']").val(
            data.West_Virginia.covid_toddler_groupsize
          );
          $("input[name='pre3GroupSize']").val(
            data.West_Virginia.covid_pre3_groupsize
          );
          $("input[name='pre4GroupSize']").val(
            data.West_Virginia.covid_pre4_groupsize
          );
        });
        break;

      case "WI":
        console.log("this is WI!!");
        $.getJSON("json/child_care_center.json", function (data) {
          //populating ratios column
          $("input[name='infantRatio']").val(data.Wisconsin.covid_infant_ratio);
          $("input[name='toddlerRatio']").val(
            data.Wisconsin.covid_toddler_ratio
          );
          $("input[name='pre3Ratio']").val(data.Wisconsin.covid_pre3_ratio);
          $("input[name='pre4Ratio']").val(data.Wisconsin.covid_pre4_ratio);

          //populating groupsize column
          $("input[name='infantGroupSize']").val(
            data.Wisconsin.covid_infant_groupsize
          );
          $("input[name='toddlerGroupSize']").val(
            data.Wisconsin.covid_toddler_groupsize
          );
          $("input[name='pre3GroupSize']").val(
            data.Wisconsin.covid_pre3_groupsize
          );
          $("input[name='pre4GroupSize']").val(
            data.Wisconsin.covid_pre4_groupsize
          );
        });
        break;

      case "WY":
        console.log("this is WY!!");
        $.getJSON("json/child_care_center.json", function (data) {
          //populating ratios column
          $("input[name='infantRatio']").val(data.Wyoming.covid_infant_ratio);
          $("input[name='toddlerRatio']").val(data.Wyoming.covid_toddler_ratio);
          $("input[name='pre3Ratio']").val(data.Wyoming.covid_pre3_ratio);
          $("input[name='pre4Ratio']").val(data.Wyoming.covid_pre4_ratio);

          //populating groupsize column
          $("input[name='infantGroupSize']").val(
            data.Wyoming.covid_infant_groupsize
          );
          $("input[name='toddlerGroupSize']").val(
            data.Wyoming.covid_toddler_groupsize
          );
          $("input[name='pre3GroupSize']").val(
            data.Wyoming.covid_pre3_groupsize
          );
          $("input[name='pre4GroupSize']").val(
            data.Wyoming.covid_pre4_groupsize
          );
        });
        break;

      case "MA":
        console.log("this is MA!!");
        $.getJSON("json/child_care_center.json", function (data) {
          //populating ratios column
          $("input[name='infantRatio']").val(
            data.Massachusetts.covid_infant_ratio
          );
          $("input[name='toddlerRatio']").val(
            data.Massachusetts.covid_toddler_ratio
          );
          $("input[name='pre3Ratio']").val(data.Massachusetts.covid_pre3_ratio);
          $("input[name='pre4Ratio']").val(data.Massachusetts.covid_pre4_ratio);

          //populating groupsize column
          $("input[name='infantGroupSize']").val(
            data.Massachusetts.covid_infant_groupsize
          );
          $("input[name='toddlerGroupSize']").val(
            data.Massachusetts.covid_toddler_groupsize
          );
          $("input[name='pre3GroupSize']").val(
            data.Massachusetts.covid_pre3_groupsize
          );
          $("input[name='pre4GroupSize']").val(
            data.Massachusetts.covid_pre4_groupsize
          );
        });
        break;

      case "OR":
        console.log("this is OR!!");
        $.getJSON("json/child_care_center.json", function (data) {
          //populating ratios column
          $("input[name='infantRatio']").val(data.Oregon.covid_infant_ratio);
          $("input[name='toddlerRatio']").val(data.Oregon.covid_toddler_ratio);
          $("input[name='pre3Ratio']").val(data.Oregon.covid_pre3_ratio);
          $("input[name='pre4Ratio']").val(data.Oregon.covid_pre4_ratio);

          //populating groupsize column
          $("input[name='infantGroupSize']").val(
            data.Oregon.covid_infant_groupsize
          );
          $("input[name='toddlerGroupSize']").val(
            data.Oregon.covid_toddler_groupsize
          );
          $("input[name='pre3GroupSize']").val(
            data.Oregon.covid_pre3_groupsize
          );
          $("input[name='pre4GroupSize']").val(
            data.Oregon.covid_pre4_groupsize
          );
        });
        break;

      case "DC":
        console.log("this is DC!!");
        $.getJSON("json/child_care_center.json", function (data) {
          //populating ratios column
          $("input[name='infantRatio']").val(
            data.District_of_Columbia.covid_infant_ratio
          );
          $("input[name='toddlerRatio']").val(
            data.District_of_Columbia.covid_toddler_ratio
          );
          $("input[name='pre3Ratio']").val(
            data.District_of_Columbia.covid_pre3_ratio
          );
          $("input[name='pre4Ratio']").val(
            data.District_of_Columbia.covid_pre4_ratio
          );

          //populating groupsize column
          $("input[name='infantGroupSize']").val(
            data.District_of_Columbia.covid_infant_groupsize
          );
          $("input[name='toddlerGroupSize']").val(
            data.District_of_Columbia.covid_toddler_groupsize
          );
          $("input[name='pre3GroupSize']").val(
            data.District_of_Columbia.covid_pre3_groupsize
          );
          $("input[name='pre4GroupSize']").val(
            data.District_of_Columbia.covid_pre4_groupsize
          );
        });
        break;

      default:
        break;
    }
  }
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
function salaryConverter(id) {
  if ($("#salary" + id).val() != "") {
    $("#wage" + id).val(($("#salary" + id).val() / 2080).toFixed(2));
  }
}

//FUNCTION TO CONVERT WAGE TO SALARY
function wageConverter(id) {
  if ($("#wage" + id).val() != "") {
    $("#salary" + id).val(($("#wage" + id).val() * 2080).toFixed(0));
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

//FUNCTION TO POPULATE STAFF FIELDS
function populateStaff(salaryLevel) {
  noOfProgramDirectors = $("#noOfProgramDirectors").val();
  noOfAssistantDirectors = $("#noOfAssistantDirectors").val();
  noOfAdministrativeAssistants = $("#noOfAdministrativeAssistants").val();
  noOfLeadTeachers = $("#noOfLeadTeachers").val();
  noOfAssistantTeachers = $("#noOfAssistantTeachers").val();

  if (salaryLevel == "bls") {
    if (!isNaN(noOfProgramDirectors)) {
      totalsalaryDirectors =
        noOfProgramDirectors * statesVarArray[0].wages_bls_director;

      $("#salaryProgramDirectors").val(
        accounting.formatMoney(totalsalaryDirectors)
      );
      $("#wageProgramDirectors").val((totalsalaryDirectors / 2080).toFixed(2));
    }

    if (!isNaN(noOfAssistantDirectors)) {
      salaryAssistantDirectors =
        noOfAssistantDirectors * statesVarArray[0].wages_bls_assistantdirector;
      $("#salaryAssistantDirectors").val(
        accounting.formatMoney(salaryAssistantDirectors)
      );
      $("#wageAssistantDirectors").val(
        (salaryAssistantDirectors / 2080).toFixed(2)
      );
    }

    if (!isNaN(noOfAdministrativeAssistants)) {
      salaryAdministrativeAssistants =
        noOfAdministrativeAssistants *
        statesVarArray[0].wages_bls_adminassistant;
      $("#salaryAdministrativeAssistants").val(
        accounting.formatMoney(salaryAdministrativeAssistants)
      );
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
      $("#salaryAssistantTeachers").val(
        accounting.formatMoney(salaryAssistantTeachers)
      );
      $("#wageAssistantTeachers").val(
        (salaryAssistantTeachers / 2080).toFixed(2)
      );
    }

    totalTeachers =
      parseInt(noOfLeadTeachers) + parseInt(noOfAssistantTeachers);
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
function calcTotalPersonnelCost() {
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
  console.log(sanitationCost);
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
    $("#sickdays").val(10);
  }

  if ($("#paidLeave").val() == "") {
    $("#paidLeave").val(10);
  }

  //cost per FT employee
  if ($("input[type='checkbox']").prop("checked") == true) {
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
function calcInfantsCost() {
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

  if (miscCost != 0) {
    miscCost = miscCost / childTotal;
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
function calcToddlersCost() {
  //toddlers cost
  toddler_adminPersonnel = (adminStaffTotalWage / childTotal).toFixed(2);
  console.log(toddler_adminPersonnel + "admin personnel");

  toddlerTeachers = 2;

  toddler_classPersonnel = (
    (statesVarArray[0].wages_bls_leadteacher +
      (toddlerTeachers - 1) * statesVarArray[0].wages_bls_assistantteacher) /
    toddlerChildren
  ).toFixed(2);
  console.log(toddler_classPersonnel);

  toddler_floaters = (
    salarySubsTeachers /
    classTotal /
    toddlerChildren
  ).toFixed(2);
  console.log(toddler_floaters);

  benefitsPerChild = (
    (mandatoryBenefitsSalary + additionalBenefits) /
    childTotal
  ).toFixed(2);
  console.log(benefitsPerChild);

  toddler_subs = (subsCostForLeaveTotal / classTotal / toddlerChildren).toFixed(
    2
  );
  console.log(toddler_subs);

  NP_ed_program = Math.round(eduProgram / childTotal);
  console.log(NP_ed_program);

  toddler_NP_occupancy = Math.round(occupancy / classTotal / toddlerChildren);
  console.log(toddler_NP_occupancy);

  NP_admin = Math.round(progAndAdmin / childTotal);
  console.log(NP_admin);

  toddler_cleaning = Math.round(
    totalAdditionalCleaning / classTotal / toddlerChildren
  );
  console.log(toddler_cleaning);

  miscCost = $("#miscCost").val();

  if (miscCost != 0) {
    miscCost = miscCost / childTotal;
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
function calcPre3Cost() {
  //pre3 cost
  pre3_adminPersonnel = (adminStaffTotalWage / childTotal).toFixed(2);
  console.log(toddler_adminPersonnel + "admin personnel");

  pre3Teachers = pre3Children / statesVarArray[0].ratios_current_pre3;

  pre3_classPersonnel = (
    (statesVarArray[0].wages_bls_leadteacher +
      (pre3Teachers - 1) * statesVarArray[0].wages_bls_assistantteacher) /
    pre3Children
  ).toFixed(2);
  console.log(pre3_classPersonnel);

  pre3_floaters = (salarySubsTeachers / classTotal / pre3Children).toFixed(2);
  console.log(pre3_floaters);

  benefitsPerChild = (
    (mandatoryBenefitsSalary + additionalBenefits) /
    childTotal
  ).toFixed(2);
  console.log(benefitsPerChild);

  pre3_subs = (subsCostForLeaveTotal / classTotal / pre3Children).toFixed(2);
  console.log(pre3_subs);

  NP_ed_program = Math.round(eduProgram / childTotal);
  console.log(NP_ed_program);

  pre3_NP_occupancy = Math.round(occupancy / classTotal / pre3Children);
  console.log(pre3_NP_occupancy);

  NP_admin = Math.round(progAndAdmin / childTotal);
  console.log(NP_admin);

  pre3_cleaning = Math.round(
    totalAdditionalCleaning / classTotal / pre3Children
  );
  console.log(pre3_cleaning);

  miscCost = $("#miscCost").val();

  if (miscCost != 0) {
    miscCost = miscCost / childTotal;
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
function calcPre4Cost() {
  //pre4 cost
  pre4_adminPersonnel = (adminStaffTotalWage / childTotal).toFixed(2);
  console.log(pre4_adminPersonnel + "admin personnel");

  pre4Teachers = pre4Children / statesVarArray[0].ratios_current_pre4;

  pre4_classPersonnel = (
    (statesVarArray[0].wages_bls_leadteacher +
      (pre4Teachers - 1) * statesVarArray[0].wages_bls_assistantteacher) /
    pre4Children
  ).toFixed(2);
  console.log(pre4_classPersonnel);

  pre4_floaters = (salarySubsTeachers / classTotal / pre4Children).toFixed(2);
  console.log(pre4_floaters);

  benefitsPerChild = (
    (mandatoryBenefitsSalary + additionalBenefits) /
    childTotal
  ).toFixed(2);
  console.log(benefitsPerChild);

  pre4_subs = (subsCostForLeaveTotal / classTotal / pre4Children).toFixed(2);
  console.log(pre4_subs);

  NP_ed_program = Math.round(eduProgram / childTotal);
  console.log(NP_ed_program);

  pre4_NP_occupancy = Math.round(occupancy / classTotal / pre4Children);
  console.log(pre4_NP_occupancy);

  NP_admin = Math.round(progAndAdmin / childTotal);
  console.log(NP_admin);

  pre4_cleaning = Math.round(
    totalAdditionalCleaning / classTotal / pre4Children
  );
  console.log(toddler_cleaning);

  miscCost = $("#miscCost").val();

  if (miscCost != 0) {
    miscCost = miscCost / childTotal;
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

  console.log(salaryLevelFamilyCare);

  if (salaryLevelFamilyCare == "Kindergarten") {
    if ($("#noOfProvider").val() == "") {
      $("#noOfProvider").val(1);
    }

    if ($("#noOfAssistantTeachersFCC").val() == "") {
      $("#noOfAssistantTeachersFCC").val(1);
    }

    $("#salaryOfProvider").val(
      $("#noOfProvider").val() * statesVarArray[0].wages_kg_leadteacher
    );

    $("#salaryOfAssistantTeachersFCC").val(
      $("#noOfAssistantTeachersFCC").val() *
        statesVarArray[0].wages_kg_assistantteacher
    );

    $("#wageOfProvider").val(
      (
        ($("#noOfProvider").val() * statesVarArray[0].wages_kg_leadteacher) /
        2080
      ).toFixed(2)
    );

    $("#wageOfAssistantTeachersFCC").val(
      (
        ($("#noOfAssistantTeachersFCC").val() *
          statesVarArray[0].wages_kg_assistantteacher) /
        2080
      ).toFixed(2)
    );

    totalFTEmployeeFCC =
      parseInt($("#noOfProvider").val()) +
      parseInt($("#noOfAssistantTeachersFCC").val());
  }

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
  totalWagesFCC =
    parseInt($("#salaryOfProvider").val()) +
    parseInt($("#salaryOfAssistantTeachersFCC").val());

  mandatoryBenefitsFCC = (
    mandatoryBenefitsVal *
    (totalWagesFCC - parseInt($("#salaryOfProvider").val()))
  ).toFixed(0);

  assistantTeacherUnitCostFCC = (
    parseInt($("#salaryOfAssistantTeachersFCC").val()) /
    parseInt($("#noOfAssistantTeachersFCC").val())
  ).toFixed(0);

  sickDaysCostFCC = Math.round(
    $("input[name='sickdaysFCC']").val() *
      (assistantTeacherUnitCostFCC / 2080) *
      10
  );

  paidLeaveCostFCC = Math.round(
    $("input[name='paidLeaveFCC']").val() *
      (statesVarArray[0].wages_kg_floater / 2080) *
      10
  );

  totalSickDaysCostFCC = sickDaysCostFCC * totalFTEmployeeFCC;
  totalPaidLeaveCostFCC = paidLeaveCostFCC * totalFTEmployeeFCC;
  totalHealthFCC = statesVarArray[0].health_insurance * totalFTEmployeeFCC;

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

  console.log(costPerChildFCC);
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
  if (stateSelected == "AL") {
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
  console.log(totalFixedCost);

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

  console.log(avgCostPerChild);

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
