const dob = document.getElementById("input--dob");
const checkBtn = document.getElementById("btn--check");
const error = document.getElementById("error--msg")

const showError = (message) => {
    error.innerText = message;
    error.style.display = "block"
}

const hideError = () => {
    error.style.display = "none"
}

checkBtn.addEventListener("click", () => {
    let dateOfBirth = dob.value;
    if (dateOfBirth != '') {
        let dateSplit = dateOfBirth.split("-")
        let date = {
            day: Number(dateSplit[2]),
            month: Number(dateSplit[1]),
            year: Number(dateSplit[0]),
        };
        let isPalindrome = checkPalindromeForAllDateFormats(date);
        if (isPalindrome) {
            showError("Yaay!! Your birthday is a palindrome!! 🎉🎉");
        } else {
            let [ctr, nextDate] = getNextPalindromeDate(date);

            showError(
                `Sorry, You missed it by ${ctr} days. The next palindrome date is ${nextDate.day}-${nextDate.month}-${nextDate.year}`
            );
        }
    }
    else {
        showError("Please select date of birth")
    }
})

const checkPalindromeForAllDateFormats = (date) => {
    let listOfPalindromes = getAllDateFormats(date);

    let flag = false;

    for (let i = 0; i < listOfPalindromes.length; i++) {
        if (isPalindrome(listOfPalindromes[i])) {
            flag = true;
            break;
        }
    }

    return flag;
};

const getAllDateFormats = (date) => {
    let dateStr = convertDateToStr(date);

    let ddmmyyyy = dateStr.day + dateStr.month + dateStr.year;
    let mmddyyyy = dateStr.month + dateStr.day + dateStr.year;
    let yyyymmdd = dateStr.year + dateStr.month + dateStr.day;
    let ddmmyy = dateStr.day + dateStr.month + dateStr.year.slice(-2);
    let mmddyy = dateStr.month + dateStr.day + dateStr.year.slice(-2);
    let yymmdd = dateStr.year.slice(-2) + dateStr.month + dateStr.day;

    return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd];
};

const convertDateToStr = (date) => {
    let dateStr = { day: "", month: "", year: "" };

    if (date.day < 10) {
        dateStr.day = "0" + date.day;
    } else {
        dateStr.day = date.day.toString();
    }

    if (date.month < 10) {
        dateStr.month = "0" + date.month;
    } else {
        dateStr.month = date.month.toString();
    }

    dateStr.year = date.year.toString();
    return dateStr;
};

const isPalindrome = (str) => {
    let reverse = reverseStr(str);
    return str === reverse;
};

const getNextPalindromeDate = (date) => {
    let ctr = 0;
    let nextDate = getNextDate(date);

    while (1) {
        ctr++;
        let isPalindrome = checkPalindromeForAllDateFormats(nextDate);
        if (isPalindrome) {
            break;
        }
        nextDate = getNextDate(nextDate);
    }
    return [ctr, nextDate];
};

const getNextDate = (date) => {
    let day = date.day + 1; // increment the day  => 32
    let month = date.month;
    let year = date.year;

    let daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]; // 0 - 11

    // check for february
    if (month === 2) {
        // check for leap year
        if (isLeapYear(year)) {
            // 2020 => true
            if (day > 29) {
                // false
                day = 1;
                month++; // increment the month
            }
        } else {
            if (day > 28) {
                day = 1;
                month++; // increment the month
            }
        }
    }
    // check for other months
    else {
        //  check if the day exceeds the max days in month
        if (day > daysInMonth[month - 1]) {
            day = 1;
            month++; // increment the month
        }
    }

    // increment the year if month is greater than 12
    if (month > 12) {
        month = 1;
        year++;
    }

    return {
        day: day,
        month: month,
        year: year,
    };
};

const isLeapYear = (year) => {
    if (year % 400 === 0) {
        return true;
    }
    if (year % 100 === 0) {
        return false;
    }
    if (year % 4 === 0) {
        return true;
    }
    return false;
};



const reverseStr = (str) => {
    let listOfChars = str.split("");
    let reverseListOfChars = listOfChars.reverse();
    let reversedStr = reverseListOfChars.join("");
    return reversedStr;