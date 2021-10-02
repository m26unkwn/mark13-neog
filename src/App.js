import "./App.css";
import { useState } from "react";
function App() {
  const [birthDay, setBirthDay] = useState(0);
  const [status, setStatus] = useState("");

  function reverseStr(str) {
    var reverse = str.split("").reverse().join("");
    return reverse;
  }

  function isPalindrome(str) {
    var reverse = reverseStr(str);
    return str === reverse;
  }

  function convertDateToStr(date) {
    let dateStr = {
      day: "",
      month: "",
      year: "",
    };

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
  }

  function getAllDateFormats(date) {
    var dateStr = convertDateToStr(date);

    var ddmmyyyy = dateStr.day + dateStr.month + dateStr.year;
    var mmddyyyy = dateStr.month + dateStr.day + dateStr.year;
    var yyyymmdd = dateStr.year + dateStr.month + dateStr.day;
    var ddmmyy = dateStr.day + dateStr.month + dateStr.year.slice(-2);
    var mmddyy = dateStr.month + dateStr.day + dateStr.year.slice(-2);
    var yymmdd = dateStr.year.slice(-2) + dateStr.month + dateStr.day;

    return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd];
  }

  function checkPalindromeForAllDateFormats(date) {
    var allDateFormats = getAllDateFormats(date);
    var flag = false;

    for (var i = 0; i < allDateFormats.length; i++) {
      if (isPalindrome(allDateFormats[i])) {
        flag = true;
        break;
      }
    }

    return flag;
  }

  function isLeapYear(year) {
    if (year % 4 === 0) {
      if (year % 100 === 0) {
        if (year % 400 === 0) {
          return true;
        } else {
          return false;
        }
      } else {
        return true;
      }
    } else {
      return false;
    }
  }

  function getNextDate(date) {
    var day = date.day + 1;
    var month = date.month;
    var year = date.year;

    var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    if (month === 2) {
      if (isLeapYear(year)) {
        if (day > 29) {
          day = 1;
          month++;
        }
      } else {
        if (day > 28) {
          day = 1;
          month++;
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

  // ex 6
  function getNextPalindromeDate(date) {
    var daysForNextPalindromeDate = 0;
    var nextDate = getNextDate(date);

    while (true) {
      daysForNextPalindromeDate++;
      var isNextDatePalindrome = checkPalindromeForAllDateFormats(nextDate);
      if (isNextDatePalindrome) {
        break;
      }
      nextDate = getNextDate(nextDate);
    }

    return [daysForNextPalindromeDate, nextDate];
  }

  const clickHandler = (date) => {
    if (date !== "") {
      var dateOfBirthArray = date.split("-");
      var date2 = {
        day: Number(dateOfBirthArray[2]),
        month: Number(dateOfBirthArray[1]),
        year: Number(dateOfBirthArray[0]),
      };
      var isPalindrome = checkPalindromeForAllDateFormats(date2);
      if (isPalindrome) {
        setStatus(`Your Birthday ${date} is Palindrome`);
      } else {
        var [daysForNextPalindromeDate, nextDate] =
          getNextPalindromeDate(date2);
        var nextDayOrDays = daysForNextPalindromeDate === 1 ? "day" : "days";
        setStatus(
          `Your Birthday ${date} is not Planidrome. The Next Palindrome is ${nextDate.year}- ${nextDate.month}- ${nextDate.day}. You missed it by ${daysForNextPalindromeDate} ${nextDayOrDays}`
        );
      }
    } else {
      alert("Enter the Date Of Birthday");
    }
  };
  return (
    <div className='App'>
      <header>
        <h1> 🎂 IS YOUR BIRTHDAY IS PALINDROME ? 🎂</h1>
      </header>
      <main>
        <div>
          <h3>Date Of Birth</h3>
          <input
            type='date'
            value={birthDay}
            onChange={(e) => setBirthDay(e.target.value)}
          />
        </div>

        <button className='btn' onClick={() => clickHandler(birthDay)}>
          Check
        </button>
        <h3>{status}</h3>
      </main>
      <div id='privacy-notice'>
        <h2 style={{ color: "#ff5200" }}>Privacy Notice :</h2>{" "}
        <h3>
          We do not store your data. So, no need to worry about your data
          misuse! 🙂
        </h3>
      </div>
    </div>
  );
}

export default App;
