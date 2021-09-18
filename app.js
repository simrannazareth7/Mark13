const dateOfBirth = document.querySelector("#date-of-birth");
const checkBtn = document.querySelector("#btn-check-number");
const outputBox = document.querySelector("#output-box");

checkBtn.addEventListener("click", checkpalin);

function  checkpalin(){


    function reverseString(str) {
        let listOfChars = str.split("");
        let reversedListOfChar = listOfChars.reverse();
        let reversedString = reversedListOfChar.join("");
        return reversedString;
      }
      
      function isStringPalindrome(str) {
        let reversedString = reverseString(str);
        return str === reversedString;
      }
      
      function getDateAsString(date) {
        let dateInStr = { day: "", month: "", year: "" };
      
        if (date.day < 10) {
          dateInStr.day = "0" + date.day;
        } else {
          dateInStr.day = date.day.toString();
        }
      
        if (date.month < 10) {
          dateInStr.month = "0" + date.month;
        } else {
          dateInStr.month = date.month.toString();
        }
      
        dateInStr.year = date.year.toString();
        return dateInStr;
      }
      
      function getDateInAllFormats(date) {
        let ddmmyyyy = date.day + date.month + date.year;
        let mmddyyyy = date.month + date.day + date.year;
        let yyyymmdd = date.year + date.month + date.day;
        let ddmmyy = date.day + date.month + date.year.slice(-2);
        let mmddyy = date.month + date.day + date.year.slice(-2);
        let yyddmm = date.year.slice(-2) + date.day + date.month;
      
        return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yyddmm];
      }
      
      function checkPalindromeForAllDateFormats(date) {
        let dateFormatList = getDateInAllFormats(date);
        let palindromeList = [];
      
        for (let i = 0; i < dateFormatList.length; i++) {
          let result = isStringPalindrome(dateFormatList[i]);
          palindromeList.push(result);
        }
        return palindromeList;
      }
      
      function isLeapYear(year) {
        if (year % 400 === 0) return true;
      
        if (year % 100 === 0) return false;
      
        if (year % 4 === 0) return true;
      
        return false;
      }
      
      function getNextDate(date) {
        let day = date.day + 1;
        let month = date.month;
        let year = date.year;
      
        let daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
      
        if (month === 2) {
          if (isLeapYear(year)) {
            if (day > 29) {
              day = 1;
              month = 3;
            }
          } else {
            if (day > 28) {
              day = 1;
              month = 3;
            }
          }
        } else {
          if (day > daysInMonth[month - 1]) {
            day = 1;
            month++;
          }
        }
      
        if (month > 12) {
          month = 1;
          year++;
        }
      
        return {
          day: day,
          month: month,
          year: year,
        };
      }
      
      function getNextPalindromeDate(date) {
        let nextDate = getNextDate(date);
        let ctr = 0;
      
        while (1) {
          ctr++;
          let dateStr = getDateAsString(nextDate);
          let resultList = checkPalindromeForAllDateFormats(dateStr);
      
          for (let i = 0; i < resultList.length; i++) {
            if (resultList[i]) {
              return [ctr, nextDate];
            }
          }
          nextDate = getNextDate(nextDate);
        }
      }
      
      function getPreviousDate(date) {
        let day = date.day - 1;
        let month = date.month;
        let year = date.year;
      
        let daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
      
        if (day === 0) {
          month--;
      
          if (month === 0) {
            month = 12;
            day = 31;
            year--;
          } else if (month === 2) {
            if (isLeapYear(year)) {
              day = 29;
            } else {
              day = 28;
            }
          } else {
            day = daysInMonth[month - 1];
          }
        }
      
        return {
          day: day,
          month: month,
          year: year,
        };
      }
      
      function getPreviousPalindromeDate(date) {
        let previousDate = getPreviousDate(date);
        let ctr = 0;
      
        while (1) {
          ctr++;
          let dateStr = getDateAsString(previousDate);
          let resultList = checkPalindromeForAllDateFormats(dateStr);
      
          for (let i = 0; i < resultList.length; i++) {
            if (resultList[i]) {
              return [ctr, previousDate];
            }
          }
          previousDate = getPreviousDate(previousDate);
        }
      }
      
      function clickHandler(e) {
        console.log("Button Clicked");
        let bdayString = dateOfBirth.value;
      
        if (bdayString !== "") {
          let date = bdayString.split("-");
          let yyyy = date[0];
          let mm = date[1];
          let dd = date[2];
      
          date = {
            day: Number(dd),
            month: Number(mm),
            year: Number(yyyy),
          };
      
          let dateStr = getDateAsString(date);
          let list = checkPalindromeForAllDateFormats(dateStr);
          let isPalindrome = false;
      
          for (let i = 0; i < list.length; i++) {
            if (list[i]) {
              isPalindrome = true;
              break;
            }
          }
      
          if (!isPalindrome) {
            const [ctr1, nextDate] = getNextPalindromeDate(date);
            const [ctr2, prevDate] = getPreviousPalindromeDate(date);
      
            if (ctr1 > ctr2) {
              resultDiv.innerText = `The nearest palindrome date is ${prevDate.day}-${prevDate.month}-${prevDate.year}, you missed by ${ctr2} days.`;
            } else {
              resultDiv.innerText = `The nearest palindrome date is ${nextDate.day}-${nextDate.month}-${nextDate.year}, you missed by ${ctr1} days.`;
            }
          } else {
            resultDiv.innerText = "Hooray! Your birthday is palindrome!";
          }
        }
      }
}