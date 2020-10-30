// Your code here

// createEmployeeRecord
function createEmployeeRecord(array){
const employeeRecord={
    firstName:array[0],
    familyName:array[1],
    title:array[2],
    payPerHour:array[3],
    timeInEvents:[],
    timeOutEvents:[]
}
return employeeRecord;
}

// createEmployeeRecords
function createEmployeeRecords(arrOfArr){
    return arrOfArr.map(array=>createEmployeeRecord(array) )
}

// createTimeInEvent
function createTimeInEvent(employeeRecord,dateStamp){
  let [date, hour] = dateStamp.split(" ");
employeeRecord.timeInEvents.push({ 
        type:"TimeIn",
        hour:parseInt(hour,10),
        date,
    })
return employeeRecord;
}

// createTimeOutEvent
function createTimeOutEvent(employeeRecord, dateStamp) {
  let [date,hour] = dateStamp.split(" ");
  employeeRecord.timeOutEvents.push({
    type: "TimeOut",
    hour: parseInt(hour,10),
    date,
  });
  return employeeRecord;
}

// hoursWorkedOnDate
function hoursWorkedOnDate(employeeRecord, date) {
const timeIn=employeeRecord.timeInEvents.find(timeInEvent => timeInEvent.date ===date);
const timeOut = employeeRecord.timeOutEvents.find(timeOutEvent=> timeOutEvent.date===date);
const result = (timeOut.hour- timeIn.hour)/100;
return result;
}


// wagesEarnedOnDate
function wagesEarnedOnDate(employeeRecord, dateStamp) {
let payRate=employeeRecord.payPerHour;    
return payRate*hoursWorkedOnDate(employeeRecord, dateStamp);

}


// allWagesFor
function allWagesFor(employeeRecord) {
return employeeRecord.timeInEvents.reduce(
  (sum, dateStamp) => wagesEarnedOnDate(employeeRecord, dateStamp.date)+sum,
  0);

}

// findEmployeeByFirstName
function findEmployeeByFirstName(employeeRecords,firstName) {
return employeeRecords.find(
  (employeeRecord) => employeeRecord.firstName === firstName
);

}


// calculatePayroll
function calculatePayroll(employeeRecords) {
let payRoll= employeeRecords.reduce((sum,employeeRecord)=>allWagesFor(employeeRecord)+sum,0);
return payRoll;
}

