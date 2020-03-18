/* Use the HTTP GET method to retrieve information from a database of patient medical records. Query https://jsonmock.hackerrank.com/api/medical_records to find all the records. The query result is paginated and can be further accessed by appending to the query string ?&page=num where num is the page number.

The query response from the API is a JSON with the following five fields:

page: the current page
per_page: the maximum number of results per page
total: the total number of records in the search result
total_pages: the total number of pages which must be queried to get all the results
data: an array of JSON objects that contain medical records
The data field in the response contains a list of medical records with the following schema:

id: The unique ID of the record
timestamp: the timestamp when the record was generated (In UTC as milliseconds)
userId: the id of the user for whom the transaction has been recorded
userName: the name of the patient/user for whom the transaction has been recorded
userDob: the date of birth of user in format DD-MM-YYYY
vitals: object, the vitals of the user
vitals.bloodPressureDiastole: the diastolic pressure reading of the user, mmHg
vitals.bloodPressureSystole: the systolic pressure reading of the user, mmHg
vitals.pulse: the pulse rate of the user, beats per minute
vitals.breathingRate: The breathing rate of the user, breaths per minute
vitals.bodyTemperature: The body temperature of the user, degrees Fahrenheit
diagnosis.id: the id of the diagnosis
diagnosis.name: the name of the condition diagnosed
diagnosis.severity: the severity of the condition diagnosed
doctor: object, the doctor who diagnosed the condition
doctor.id: the id of the doctor who diagnosed the condition
doctor.name: the name of the doctor who diagnosed the condition
meta: object, the meta information of the user
meta.height: the current height of the user, centimeters
meta.weight: the current weight of the user, pounds
Fetch all medical records and filter based on the following criteria:

ageStart ≤ the age of the user at the time of the record creation timestamp ≤ ageEnd
For the users matching the first criteria, bloodPressureDiastole - bloodPressureSystole > bpDiff

Complete the getRecordsByAgeGroup function. The function is expected to return an INTEGER_ARRAY.

   getRecordsByAgeGroup has the following parameter(s):

        1. int ageStart: the minimum age requirement (inclusive)

        2. int ageEnd: the maximum age requirement (inclusive)

        3. int bpDiff: the difference in systolic and diastolic pressures must be less than this value

    
getRecordsByAgeGroup should return int[]: a sorted array of ids of the records matching the above criteria. If no records are matched, return [-1].

Constraints:
0 ≤ ageStart, ageEnd, bpDiff ≤ 102 */

const axios = require("axios");

const fetchRecords = async(pageNum, matchesCriteria) => {
  try {
     const { data } = await axios.get(`https://jsonmock.hackerrank.com/api/medical_records?page=${pageNum}`);
     let records = [];
     let totalPages;
     if(pageNum === 1) totalPages = data[`total_pages`];
     let recordsArr = data.data;
     for(let i = 0; i < recordsArr.length; i++) {
        let { timestamp, vitals, userDob } = recordsArr[i];
        let currAge = getAgeFromDob(timestamp, userDob);
        if(matchesCriteria(currAge, vitals.bloodPressureDiastole, vitals.bloodPressureSystole)) {
            records.push(recordsArr[i]);
          }
        }
     return { records: records, totalPages: totalPages }       
  } catch(err) {
    console.error(err);      
  }
}

const matchesCriteria = (ageStart, ageEnd, bpDiff) => (age, bpd, bps) => {
  if(age >= ageStart && age <= ageEnd) {
    return (bpDiff < (bpd - bps));
  } else {
    return false;
  }
}

const getAgeFromDob = (timestamp, dob) => {
  let dateCreated = new Date(timestamp);
  let [ bDay, bMonth, bYear ] = dob.split("-");
  let age = +bYear - dateCreated.getFullYear();
  if(+bMonth < (dateCreated.getMonth() + 1 || +bDay < dateCreated.getDate())) age--;
  return Math.abs(age);
}

const getRecordsByAgeGroup = async(ageStart, ageEnd, bpDiff) => {
  let matchingRecords = [];
  let pageNum = 1;
  let checkCriteria = matchesCriteria(ageStart, ageEnd, bpDiff)
  let { records, totalPages } = await fetchRecords(pageNum++, checkCriteria);
  matchingRecords.push(...records);
  for(let i = pageNum; i <= totalPages; i++) {
    let { records } = await fetchRecords(i, checkCriteria);
    matchingRecords.push(...records);
  }
  matchingRecords.sort((a, b) => a.id - b.id)
  return matchingRecords;
}