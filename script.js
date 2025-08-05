///////////////////////////////////////////////////////////
// Smooth scrolling animation

// const allLinks = document.querySelectorAll("a:link");

// allLinks.forEach(function (link) {
//   link.addEventListener("click", function (e) {
//     e.preventDefault();
//     const href = link.getAttribute("href");

//     // Scroll back to top
//     if (href === "#")
//       window.scrollTo({
//         top: 0,
//         behavior: "smooth",
//       });

//     // Scroll to other links
//     if (href !== "#" && href.startsWith("#")) {
//       const sectionEl = document.querySelector(href);
//       sectionEl.scrollIntoView({ behavior: "smooth" });
//     }

//     // Close mobile naviagtion
//     if (link.classList.contains("main-nav-link"))
//       headerEl.classList.toggle("nav-open");
//   });
// });

///////////////////////////////////////////////////////////
// Sticky navigation

// const sectionHeroEl = document.querySelector(".section-hero");

// const obs = new IntersectionObserver(
//   function (entries) {
//     const ent = entries[0];
//     console.log(ent);

//     if (ent.isIntersecting === false) {
//       document.body.classList.add("sticky");
//     }

//     if (ent.isIntersecting === true) {
//       document.body.classList.remove("sticky");
//     }
//   },
//   {
//     root: null,
//     threshold: 0,
//     rootMargin: "-80px",
//   }
// );
// obs.observe(sectionHeroEl);

///////////////////////////////////////////////////////////
// Fixing flexbox gap property missing in some Safari versions
function checkFlexGap () {
  var flex = document.createElement('div')
  flex.style.display = 'flex'
  flex.style.flexDirection = 'column'
  flex.style.rowGap = '1px'

  flex.appendChild(document.createElement('div'))
  flex.appendChild(document.createElement('div'))

  document.body.appendChild(flex)
  var isSupported = flex.scrollHeight === 1
  flex.parentNode.removeChild(flex)

  if (!isSupported) document.body.classList.add('no-flexbox-gap')
}
checkFlexGap()

/////////////////////////////////////////////////////
////!SECTION-- NavBar Js
const openMenuBtn = document.getElementById('openMenuBtn')
const closeMenuBtn = document.getElementById('closeMenuBtn')
const mainMenu = document.getElementById('mainMenu')
const body = document.body

const dropdowns = document.querySelectorAll('.header .menu .dropdown')

function toggleMainMenu () {
  mainMenu.classList.toggle('active')
  openMenuBtn.classList.toggle('active')
  body.classList.toggle('menu-active')
  document.documentElement.classList.toggle('menu-active')
}

openMenuBtn.addEventListener('click', toggleMainMenu)
closeMenuBtn.addEventListener('click', toggleMainMenu)

function closeAllDropdowns () {
  dropdowns.forEach(dropdown => {
    dropdown.classList.remove('active')
    const subMenu = dropdown.querySelector('.sub-menu')
    if (subMenu) {
      subMenu.classList.remove('active')
    }
    const dropdownIcon = dropdown.querySelector('.dropdown-icon')
    if (dropdownIcon) {
      dropdownIcon.style.transform = 'rotate(0deg)'
    }
  })
}

dropdowns.forEach(dropdown => {
  const dropdownLink = dropdown.querySelector('a')
  const subMenu = dropdown.querySelector('.sub-menu')
  const dropdownIcon = dropdownLink.querySelector('.dropdown-icon')

  if (subMenu) {
    dropdownLink.addEventListener('click', event => {
      if (window.innerWidth <= 1191) {
        event.preventDefault()

        const isActive = dropdown.classList.contains('active')

        const parentUl = dropdown.closest('ul')
        if (parentUl) {
          Array.from(parentUl.children).forEach(siblingLi => {
            if (
              siblingLi !== dropdown &&
              siblingLi.classList.contains('dropdown') &&
              siblingLi.classList.contains('active')
            ) {
              siblingLi.classList.remove('active')
              const siblingSubMenu = siblingLi.querySelector('.sub-menu')
              if (siblingSubMenu) {
                siblingSubMenu.classList.remove('active')
              }
              const siblingIcon = siblingLi.querySelector('.dropdown-icon')
              if (siblingIcon) {
                siblingIcon.style.transform = 'rotate(0deg)'
              }
            }
          })
        }

        dropdown.classList.toggle('active', !isActive)
        subMenu.classList.toggle('active', !isActive)
        if (dropdownIcon) {
          dropdownIcon.style.transform = !isActive
            ? 'rotate(180deg)'
            : 'rotate(0deg)'
        }
      }
    })
  }
})

window.addEventListener('resize', () => {
  if (window.innerWidth > 1191) {
    mainMenu.classList.remove('active')
    openMenuBtn.classList.remove('active')
    body.classList.remove('menu-active')
    document.documentElement.classList.remove('menu-active')

    closeAllDropdowns()
  }
})

// Testimonial carousel functionality with auto-scroll

document.addEventListener('DOMContentLoaded', () => {
  const slidesContainer = document.getElementById('testimonialsGrid')
  const slides = slidesContainer?.querySelectorAll('.testimonial-card') || []
  const prevBtn = document.getElementById('prev-btn')
  const nextBtn = document.getElementById('next-btn')

  let currentSlideIndex = 0
  const totalSlides = slides.length
  let autoPlayInterval
  const autoPlayDelay = 3000

  function getGapValue (container) {
    const style = window.getComputedStyle(container)
    const gap = parseFloat(style.getPropertyValue('gap')) || 0
    return gap
  }

  function showSlide (index) {
    if (!slidesContainer || totalSlides === 0) return

    currentSlideIndex = (index + totalSlides) % totalSlides // wrap index

    const gap = getGapValue(slidesContainer)
    const cardWidth = slides[0]?.offsetWidth || 0
    const scrollPosition = currentSlideIndex * (cardWidth + gap)

    slidesContainer.scrollTo({
      left: scrollPosition,
      behavior: 'smooth'
    })
  }

  function startAutoPlay () {
    if (totalSlides <= 1) return

    stopAutoPlay() // Reset first
    autoPlayInterval = setInterval(() => {
      showSlide(currentSlideIndex + 1)
    }, autoPlayDelay)
  }

  function stopAutoPlay () {
    clearInterval(autoPlayInterval)
  }

  function handleNavigationClick (direction) {
    stopAutoPlay()
    showSlide(currentSlideIndex + direction)
    setTimeout(startAutoPlay, 1000)
  }

  prevBtn?.addEventListener('click', () => handleNavigationClick(-1))
  nextBtn?.addEventListener('click', () => handleNavigationClick(1))

  window.addEventListener('resize', () => {
    showSlide(currentSlideIndex)
  })

  showSlide(currentSlideIndex)
  startAutoPlay()
})

///////////////////////////////////////////////////////////
//GRAPH
let amortizationChart

document.addEventListener('DOMContentLoaded', () => {
  const purchaseAmountInput = document.getElementById('purchaseAmount')
  const downPaymentInput = document.getElementById('downPayment')
  const interestRateInput = document.getElementById('interestRate')
  const mortgageTermInput = document.getElementById('mortgageTerm')
  const paymentIntervalSelect = document.getElementById('paymentInterval')
  const calculateBtn = document.getElementById('calculateBtn')

  const displayLoanAmount = document.getElementById('displayLoanAmount')
  const displayMonthlyPayment = document.getElementById('displayMonthlyPayment')
  const displayInterestRate = document.getElementById('displayInterestRate')
  const displayTotalPayments = document.getElementById('displayTotalPayments')
  const displayMortgageTerm = document.getElementById('displayMortgageTerm')
  const displayTotalAmountPaid = document.getElementById(
    'displayTotalAmountPaid'
  )
  const displayTotalInterestPaid = document.getElementById(
    'displayTotalInterestPaid'
  )

  const ctx = document.getElementById('amortizationChart').getContext('2d')

  function calculateMortgage () {
    const purchaseAmount = parseFloat(purchaseAmountInput.value)
    const downPayment = parseFloat(downPaymentInput.value)
    let annualInterestRate = parseFloat(interestRateInput.value) / 100
    const mortgageTermYears = parseFloat(mortgageTermInput.value)
    const paymentInterval = paymentIntervalSelect.value

    if (
      isNaN(purchaseAmount) ||
      isNaN(downPayment) ||
      isNaN(annualInterestRate) ||
      isNaN(mortgageTermYears) ||
      purchaseAmount <= 0
    ) {
      displayMonthlyPayment.textContent = '$0.00'
      displayTotalPayments.textContent = '0'
      displayTotalAmountPaid.textContent = '$0.00'
      displayTotalInterestPaid.textContent = '$0.00'
      updateChart([], [], [], [])
      return
    }

    const loanAmount = purchaseAmount - downPayment

    let paymentsPerYear
    switch (paymentInterval) {
      case 'monthly':
        paymentsPerYear = 12
        break
      case 'semi-monthly':
        paymentsPerYear = 24 // 2 payments per month * 12 months
        break
      case 'bi-weekly':
        paymentsPerYear = 26
        break
      case 'weekly':
        paymentsPerYear = 52
        break
      default:
        paymentsPerYear = 12
    }

    const periodicInterestRate = annualInterestRate / paymentsPerYear
    const numberOfPayments = mortgageTermYears * paymentsPerYear

    let periodicPayment
    if (periodicInterestRate === 0) {
      periodicPayment = loanAmount / numberOfPayments
    } else {
      periodicPayment =
        (loanAmount *
          (periodicInterestRate *
            Math.pow(1 + periodicInterestRate, numberOfPayments))) /
        (Math.pow(1 + periodicInterestRate, numberOfPayments) - 1)
    }

    const totalAmountPaid = periodicPayment * numberOfPayments
    const totalInterestPaid = totalAmountPaid - loanAmount

    displayLoanAmount.textContent = `$${loanAmount.toFixed(2)}`
    displayMonthlyPayment.textContent = `$${periodicPayment.toFixed(2)}`
    displayInterestRate.textContent = `${(annualInterestRate * 100).toFixed(
      2
    )}%`
    displayTotalPayments.textContent = Math.round(numberOfPayments)
    displayMortgageTerm.textContent = `${mortgageTermYears} years`
    displayTotalAmountPaid.textContent = `$${totalAmountPaid.toFixed(2)}`
    displayTotalInterestPaid.textContent = `$${totalInterestPaid.toFixed(2)}`

    const amortizationSchedule = []
    let remainingBalance = loanAmount
    let totalPrincipalPaidForChart = 0
    let cumulativeInterest = 0

    for (let i = 0; i <= numberOfPayments; i++) {
      const currentBalance = remainingBalance
      const interestPayment = currentBalance * periodicInterestRate
      let principalPayment = periodicPayment - interestPayment

      if (i === numberOfPayments) {
        principalPayment = currentBalance
      }
      if (principalPayment < 0) principalPayment = 0

      remainingBalance -= principalPayment
      totalPrincipalPaidForChart += principalPayment
      cumulativeInterest += interestPayment

      amortizationSchedule.push({
        period: i,
        balance: remainingBalance,
        interestPaid: interestPayment,
        principalPaid: principalPayment,
        equity: downPayment + totalPrincipalPaidForChart,
        cumulativeInterest: cumulativeInterest
      })
    }

    const chartLabels = []
    const chartDebtData = []
    const chartInterestData = []
    const chartEquityData = []

    const intervalYears = 2.5
    const totalYears = mortgageTermYears

    for (let year = 0; year <= totalYears; year += intervalYears) {
      const targetPaymentIndex = Math.round(year * paymentsPerYear)
      const dataPoint =
        amortizationSchedule[Math.min(targetPaymentIndex, numberOfPayments)]

      if (dataPoint) {
        chartLabels.push(year.toFixed(1))
        chartDebtData.push(dataPoint.balance)
        chartInterestData.push(dataPoint.cumulativeInterest)
        chartEquityData.push(dataPoint.equity)
      }
    }

    updateChart(chartLabels, chartDebtData, chartInterestData, chartEquityData)
  }

  function updateChart (labels, debtData, interestData, equityData) {
    if (amortizationChart) {
      amortizationChart.destroy()
    }

    amortizationChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Debt',
            data: debtData,
            borderColor: 'red',
            backgroundColor: 'rgba(255, 0, 0, 0.1)',
            fill: false,
            pointRadius: 3,
            pointBackgroundColor: 'red',
            pointBorderColor: 'red',
            tension: 0.1
          },
          {
            label: 'Interest',
            data: interestData,
            borderColor: 'orange',
            backgroundColor: 'rgba(255, 165, 0, 0.1)',
            fill: false,
            pointRadius: 3,
            pointBackgroundColor: 'orange',
            pointBorderColor: 'orange',
            tension: 0.1
          },
          {
            label: 'Equity',
            data: equityData,
            borderColor: 'green',
            backgroundColor: 'rgba(0, 128, 0, 0.1)',
            fill: false,
            pointRadius: 3,
            pointBackgroundColor: 'green',
            pointBorderColor: 'green',
            tension: 0.1
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          x: {
            title: {
              display: true,
              text: 'Years',
              font: {
                size: 14,
                family: 'Mukta'
              },
              color: '#555'
            },
            ticks: {
              font: {
                family: 'Mukta'
              },
              color: '#555'
            }
          },
          y: {
            title: {
              display: true,
              text: 'Amount ($)',
              font: {
                size: 14,
                family: 'Mukta'
              },
              color: '#555'
            },
            ticks: {
              callback: function (value) {
                return '$' + value.toLocaleString()
              },
              font: {
                family: 'Mukta'
              },
              color: '#555'
            },
            min: 0
          }
        },
        plugins: {
          legend: {
            position: 'top',
            labels: {
              font: {
                size: 14,
                family: 'Mukta'
              },
              color: '#333',
              usePointStyle: true,
              boxWidth: 10
            }
          },
          tooltip: {
            callbacks: {
              label: function (context) {
                let label = context.dataset.label || ''
                if (label) {
                  label += ': '
                }
                if (context.parsed.y !== null) {
                  label += new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: 'USD'
                  }).format(context.parsed.y)
                }
                return label
              }
            }
          }
        }
      }
    })
  }

  calculateMortgage()

  purchaseAmountInput.addEventListener('input', calculateMortgage)
  downPaymentInput.addEventListener('input', calculateMortgage)
  interestRateInput.addEventListener('input', calculateMortgage)
  mortgageTermInput.addEventListener('input', calculateMortgage)
  paymentIntervalSelect.addEventListener('change', calculateMortgage)
  calculateBtn.addEventListener('click', calculateMortgage)
})

// JavaScript to trigger the animation when the element is visible in the viewport

// JavaScript to trigger the animation when the element is visible in the viewport
document.addEventListener('DOMContentLoaded', function () {
  const buttonsSection = document.querySelector('.buttons-section')
  const statsSection = document.querySelector('.stats-section') // Assuming .stats-section will have .animate-stats-bottom

  const observerOptions = {
    threshold: 0.5
  }

  // Observer for .buttons-section
  const buttonsObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible')
        observer.unobserve(entry.target)
      }
    })
  }, observerOptions)

  if (buttonsSection) {
    buttonsObserver.observe(buttonsSection)
  }

  const statsObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible')
        observer.unobserve(entry.target)
      }
    })
  }, observerOptions)

  const elementsToAnimateStats = document.querySelectorAll(
    '.animate-stats-bottom'
  )
  elementsToAnimateStats.forEach(element => {
    statsObserver.observe(element)
  })
})
