const submit = document.getElementById('submit');

submit.addEventListener('click', function () {
  const population = document.getElementById('population').value;
  const reportedCases = document.getElementById('reported-cases').value;
  const beds = document.getElementById('beds').value;
  const timeToElapse = document.getElementById('time-to-elapse').value;
  const periods = document.getElementById('period').value;
  const avgI = document.getElementById('average-daily-income').value;
  const avgIP = document.getElementById('average-daily-income-population').value;
  const data = {
        region: {
            name: "Africa",
            avgAge: 19.7,
            avgDailyIncomeInUSD: avgI,
            avgDailyIncomePopulation: avgIP
        },
        periodType: periods,
        timeToElapse: timeToElapse,
        reportedCases: reportedCases,
        population: population,
        totalHospitalBeds: beds
    }
    document.getElementById('landing').style.display = 'none';
    document.getElementById('result').style.display = 'block';

    const result = covid19ImpactEstimator(data)
    console.log(covid19ImpactEstimator(data))
    document.getElementById('currently-infected').textContent = result.impact.currentlyInfected.toLocaleString()
    document.getElementById('infections-by-requested-time').textContent = result.impact.infectionsByRequestedTime.toLocaleString();
    document.getElementById('severe-cases-by-requested-time').textContent = result.impact.severeCasesByRequestedTime.toLocaleString();
    document.getElementById('hospital-beds').textContent = result.impact.hospitalBedsByRequestedTime.toLocaleString();
    document.getElementById('ventilators').textContent = result.impact.casesForVentilatorsByRequestedTime.toLocaleString();
    document.getElementById('icu').textContent = result.impact.casesForICUByRequestedTime.toLocaleString();
    document.getElementById('dollars-in-flight').textContent = "$ " + result.impact.dollarsInFlight.toLocaleString();
})

const covid19ImpactEstimator = (data) => {
    let { region, periodType, timeToElapse, reportedCases, population, totalHospitalBeds } = data;
    let power = timeToElapse / 3;
    power = Math.floor(power)
    impactCurrentlyInfected = reportedCases * 10;
    severeImpactCurrentlyInfected = reportedCases * 50;
    let rt = impactCurrentlyInfected * (Math.pow(2, power));
    let st = severeImpactCurrentlyInfected * (Math.pow(2, power));
    bedsAvailable = Math.floor(totalHospitalBeds * 0.35);
    let impact = {
        currentlyInfected: impactCurrentlyInfected,
        infectionsByRequestedTime: rt,
        severeCasesByRequestedTime: rt * 0.15,
        hospitalBedsByRequestedTime: bedsAvailable - rt * 0.15,
        casesForVentilatorsByRequestedTime: rt * 0.02,
        casesForICUByRequestedTime: (rt) * 0.05,
        dollarsInFlight: ((rt * region.avgDailyIncomePopulation) * region.avgDailyIncomeInUSD) * timeToElapse,
    }
    let severeImpact = {
        currentlyInfected: severeImpactCurrentlyInfected,
        infectionsByRequestedTime: st,
        severeCasesByRequestedTime: st * 0.15,
        hospitalBedsByRequestedTime: bedsAvailable - st * 0.15,
        casesForVentilatorsByRequestedTime: st * 0.02,
        casesForICUByRequestedTime: (st) * 0.05,
        dollarsInFlight: ((st * region.avgDailyIncomePopulation) * region.avgDailyIncomeInUSD) * timeToElapse,
    }


    return {
        data,
        impact,
        severeImpact
    }
};

//   export default covid19ImpactEstimator;