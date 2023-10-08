const form = document.querySelector('form')
const submitButton = document.querySelector('.submit')
const bDay = document.querySelector('.birthday-text')

const daySmall = document.querySelector('.day-small')
const monthSmall = document.querySelector('.month-small')
const yearSmall = document.querySelector('.year-small')

const dayLabel = document.getElementById('day-label')
const monthLabel = document.getElementById('month-label')
const yearLabel = document.getElementById('year-label')

const dayInput = document.getElementById('day')
const monthInput = document.getElementById('month')
const yearInput = document.getElementById('year')

const dayOutput = document.querySelector('.days')
const monthOutput = document.querySelector('.months')
const yearOutput = document.querySelector('.years')

const currentDate = new Date()
let currentDay = currentDate.getDate()
let currentMonth = 1 + currentDate.getMonth()
let currentYear = currentDate.getFullYear()
const daysInMonths = [31,29,31,30,31,30,31,31,30,31,30,31]
let inputMonth = 0

monthInput.addEventListener("focus", () => {
    monthLabel.style.color = 'black'
    monthInput.style.borderColor = 'black'
    monthInput.style.color = 'black'
    monthSmall.innerText = ""
})
dayInput.addEventListener("focus", () => {
    dayLabel.style.color = 'black'
    dayInput.style.borderColor = 'black'
    dayInput.style.color = 'black'
    daySmall.innerText = ""
})
yearInput.addEventListener("focus", () => {
    yearLabel.style.color = 'black'
    yearInput.style.borderColor = 'black'
    yearInput.style.color = 'black'
    yearSmall.innerText = ""
})

form.addEventListener('submit', function(e) {
    e.preventDefault()

    const dayInputString = dayInput.value
    const monthInputString = monthInput.value
    const yearInputString = yearInput.value

    const monthRegex = /^\d{2}$/
    if (!monthRegex.test(monthInputString)) {
        monthSmall.innerText = "2 digits is required"
        monthLabel.style.color = 'red'
        monthInput.style.borderColor = 'red'
        monthInput.style.color = 'red'
        return
    } else if (monthInputString > 12 || monthInputString == 0) {
        monthSmall.innerText = "Enter valid month"
        monthLabel.style.color = 'red'
        monthInput.style.borderColor = 'red'
        monthInput.style.color = 'red'
        return
    } else {
        monthLabel.style.color = 'black'
        monthInput.style.borderColor = 'black'
        monthInput.style.color = 'black'
        monthSmall.innerText = ""
        inputMonth = daysInMonths[monthInputString - 1]
    }
    const dayRegex = /^\d{2}$/
    if (!dayRegex.test(dayInputString)) {
        daySmall.innerText = "This field is INVALID."
        dayLabel.style.color = 'red'
        dayInput.style.borderColor = 'red'
        dayInput.style.color = 'red'
        return
    } else if (dayInputString > inputMonth || dayInputString == 0){
        daySmall.innerText = "Enter valid day"
        dayLabel.style.color = 'red'
        dayInput.style.borderColor = 'red'
        dayInput.style.color = 'red'
        return
    } else {
        dayLabel.style.color = 'black'
        dayInput.style.borderColor = 'black'
        dayInput.style.color = 'black'
        daySmall.innerText = ""
    }
    const yearRegex = /^\d{4}$/
    if (!yearRegex.test(yearInputString)) {
        yearSmall.innerText = "4 digits is required"
        yearLabel.style.color = 'red'
        yearInput.style.borderColor = 'red'
        yearInput.style.color = 'red'
        return
    } else if (yearInputString > currentYear.getFullYear){
        yearSmall.innerText = "Enter valid year"
        yearLabel.style.color = 'red'
        yearInput.style.borderColor = 'red'
        yearInput.style.color = 'red'
        return
    } else {
        yearLabel.style.color = 'black'
        yearInput.style.borderColor = 'black'
        yearInput.style.color = 'black'
        yearSmall.innerText = ""
    }

    if (dayInputString == currentDay && monthInputString == currentMonth && yearInputString == currentYear) {
        bDay.innerText = "Welcome to Life"
        dayOutput.innerText = "🎉"
        monthOutput.innerText = "!!"
        yearOutput.innerText = "!!"
        return
    } else if (dayInputString == currentDay && monthInputString == currentMonth) {
        bDay.innerText = "🎉 Happy Birthday!!! 🎉"
    }

    if (dayInputString > currentDay) {
        currentDay = currentDay + daysInMonths[currentMonth - 1];
        currentMonth = currentMonth -1
    }
    if (monthInputString > currentMonth) {
        currentMonth = currentMonth + 12
        currentYear = currentYear - 1
    }

    const dayResult = currentDay - dayInputString
    const monthResult = currentMonth - monthInputString
    const yearResult = currentYear - yearInputString

    dayOutput.innerHTML = dayResult
    dayOutput.setAttribute('data-val', dayResult)
    monthOutput.innerHTML = monthResult
    monthOutput.setAttribute('data-val', monthResult)
    yearOutput.innerHTML = yearResult
    yearOutput.setAttribute('data-val', yearResult)

    if(yearResult < 0) {
        bDay.innerText = "Are you from the future??"
        dayOutput.innerHTML = "?!"
        monthOutput.innerHTML = "?!"
        yearOutput.innerHTML = "?!"
        return
    }

    let valueDisplays = document.querySelectorAll('.result-number')
    let interval = 300

    valueDisplays.forEach((valueDisplay) => {
        let startValue = 0
        let endValue = parseInt(valueDisplay.getAttribute("data-val"))
        let duration = Math.floor(interval / endValue)
        let counter = setInterval(function () {
            if (endValue <= 0) {
                return
            }
            startValue += 1
            valueDisplay.textContent = startValue
            if (startValue == endValue) {
                clearInterval(counter)
            }
        }, duration)
    })
    
    submitButton.disabled = true
})

form.addEventListener('reset', function() {
    location.reload()
})