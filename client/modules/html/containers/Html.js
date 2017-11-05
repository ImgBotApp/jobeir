//  Global Variables
let $localCurrencyOptions = {
    localeMatcher: 'best fit',
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 2,
    minimumFractionDigits: 2,
  },
  $curBalance,
  $curBalance2;

//  Budget Calulator Function
function budget() {
  // Get Values Of All
  const $day = calValues('.daily.count');
  const $week = calValues('.weekly.count');
  const $month = calValues('.monthly.count');
  let $daily, $weekly, $monthly, $yearly;

  // Month to yearly
  $monthly = $month;
  $yearly = $monthly * 12;

  // Daily to yearly
  $daily = $day;
  $monthly += $daily * 365 / 12;
  $yearly += $daily * 365;

  // Weekly to monthly to yearly
  $weekly = $week;
  $monthly += $weekly / 7 * 365 / 12;
  $yearly += $weekly * 52;

  const $extraDaily = $('#extraDaily').val() * 1;
  const $extraWeekly = $('#extraWeekly').val() * 1;
  const $extraMonthly = $('#extraMonthly').val() * 1;

  // This is the out put for the math
  $('.monthlySavings').html(
    $monthly.toLocaleString('en-EN', $localCurrencyOptions),
  );
  $('.year1Savings').html(
    $yearly.toLocaleString('en-EN', $localCurrencyOptions),
  );
  $('.year5Savings').html(
    ($yearly * 5).toLocaleString('en-EN', $localCurrencyOptions),
  );

  // Drop Titles Into A List After Submit
  let inputs = [];
  inputs = $('input[type="checkbox"].count').parent();
  const names = inputs
    .map(function() {
      return `<li>${this.innerText}</li>`;
    })
    .get()
    .join('');
  const namesCleam = inputs
    .map(function() {
      return this.innerText;
    })
    .get()
    .join(', ');

  $('.cut')
    .empty()
    .append(names);

  // Other Amounts You Cut
  $('.dailyCut, .weeklyCut, .monthlyCut').empty();
  $('.dailyCut').append(
    `<strong>Daily:</strong> ${$extraDaily.toLocaleString(
      'en-EN',
      $localCurrencyOptions,
    )}`,
  );
  $('.weeklyCut').append(
    `<strong>Weekly:</strong> ${$extraWeekly.toLocaleString(
      'en-EN',
      $localCurrencyOptions,
    )}`,
  );
  $('.monthlyCut').append(
    `<strong>Monthly:</strong> ${$extraMonthly.toLocaleString(
      'en-EN',
      $localCurrencyOptions,
    )}`,
  );

  // Open Modal Window On Submit
  $.magnificPopup.open({
    items: {
      src: '#post-calc',
      type: 'inline',
    },
    preloader: false,
    overflowY: 'auto',
  });

  // Update Monthly Savings
  $('[name="monthly_savings"]')
    .val($monthly.toLocaleString('en-EN', $localCurrencyOptions))
    .trigger('change');
  // Update Year 1 Savings
  $('[name="year_1_savings"]')
    .val($yearly.toLocaleString('en-EN', $localCurrencyOptions))
    .trigger('change');
  // Update Year 2 Savings
  $('[name="year_5_savings"]')
    .val(($yearly * 5).toLocaleString('en-EN', $localCurrencyOptions))
    .trigger('change');

  // Update Cut Out
  $('[name="cut_out"]')
    .val(namesCleam)
    .trigger('change');

  // Update Other Daily Amounts
  $('[name="other_daily_amounts"]')
    .val($extraDaily.toLocaleString('en-EN', $localCurrencyOptions))
    .trigger('change');
  // Update Other Weekly Amounts
  $('[name="other_weekly_ammounts"]')
    .val($extraWeekly.toLocaleString('en-EN', $localCurrencyOptions))
    .trigger('change');
  // Update Other Monthly Amounts
  $('[name="other_monthly_amounts"]')
    .val($extraMonthly.toLocaleString('en-EN', $localCurrencyOptions))
    .trigger('change');
}

//  Debt Calculator Function
function debt() {
  // Grab Form Fields
  let $startBalance = $('[name="card_balance"]').val() * 1, // Balance Starting
    $intRate = $('[name="interest_rate"]').val() * 1, // APR
    $min_pay_perc = $('[name="min_pay_calc"]').val() * 1, // Min Monthly Payment Percentage
    $minPay = $('[name="min_pay_calc"]').val() * 1, // Min monthly payment
    $fixAmount = $('[name="fixed_amt"]').val() * 1; // Fixed payment monthly

  // Starting Balance for Min Pay and Fixed Pay
  $curBalance = $startBalance;
  $curBalance2 = $startBalance;

  // Minimum Payment Percentage into the table
  $('.starting_bal').html(
    $startBalance.toLocaleString('en-EN', $localCurrencyOptions),
  );

  // Minimum Payment Percentage into the table
  $('.min_pay_calc').text(`${$min_pay_perc}%`);
  // Fixed Payment Amount into the table
  $('.fixed_amt').text(
    $fixAmount.toLocaleString('en-EN', $localCurrencyOptions),
  );

  // Place Interest Rate In Table
  $('.int_rate').text(`${$intRate}%`);

  // Calculate DCP Payments
  const $dcpPayments = $startBalance / 48;
  $('.dcp_payment').text(
    $dcpPayments.toLocaleString('en-EN', $localCurrencyOptions),
  );

  let count = 1,
    $totalInterest = 0,
    overText = '';
  let count2 = 1,
    $totalInterest2 = 0,
    overText2 = '';

  // Empty the tables on resubmit
  $('.fixed__amoritization > tbody, .min-pay__amoritization > tbody').empty();

  // Min Pay While Loop
  // Prepend Opening Payment To Table
  $('.min-pay__amoritization > tbody').append(
    `${'<tr class="tabel-row">' +
      '<td class="table-cell" title="Months">0</td>' +
      '<td class="table-cell" title="Payment">-</td>' +
      '<td class="table-cell" title="Payment To Interest">-</td>' +
      '<td class="table-cell" title="Payment To Principle">-</td>' +
      '<td class="table-cell" title="Balance">'}${$curBalance.toLocaleString(
      'en-EN',
      $localCurrencyOptions,
    )}</td>` + `</tr>`,
  );

  while ($curBalance >= 0 || count <= 301) {
    // Call the Minimum Payment Function
    const calc = new calcRem($curBalance, $intRate, $minPay, $totalInterest);

    // Append the payments to the table.
    $('.min-pay__amoritization > tbody').append(
      `${'<tr class="tabel-row">' +
        '<td class="table-cell" title="Months">'}${count++}</td>` +
        `<td class="table-cell" title="Payment">${calc.$payment.toLocaleString(
          'en-EN',
          $localCurrencyOptions,
        )}</td>` +
        `<td class="table-cell" title="Payment To Interest">${calc.$interest.toLocaleString(
          'en-EN',
          $localCurrencyOptions,
        )}</td>` +
        `<td class="table-cell" title="Payment To Principle">${calc.$principle.toLocaleString(
          'en-EN',
          $localCurrencyOptions,
        )}</td>` +
        `<td class="table-cell" title="Balance">${calc.$curBalance.toLocaleString(
          'en-EN',
          $localCurrencyOptions,
        )}</td>` +
        `</tr>`,
    );

    // Grab All Interest Paid
    $totalInterest = calc.$totalInterest;

    // on the last loop do stuff
    if ($curBalance <= 0 || count == 301) {
      if (count == 301) {
        overText = 'Over ';

        $('.min-pay__amoritization > tbody').append(
          '<tr class="tabel-row alert">' +
            '<td class="table-cell" colspan="5">It Will Take <b>Over 300 Months</b> To Pay This Off.</td>' +
            '</tr>',
        );
      }

      if ($curBalance == 0) {
        $('.min-pay__amoritization > tbody').append(
          `${'<tr class="tabel-row success">' +
            '<td class="table-cell" colspan="5">It Is Paid Off In <b>'}${count -
            1}</b> Months!</td>` + `</tr>`,
        );
      }

      $('.time_1').text(`${overText}${count - 1}`);
      $('.total_interest_1').text(
        `${overText}${$totalInterest.toLocaleString(
          'en-EN',
          $localCurrencyOptions,
        )}`,
      );
      break;
    }
  }

  // // Fixed Pay loop
  // Prepend Opening Payment To Table
  $('.fixed__amoritization > tbody').append(
    `${'<tr class="tabel-row">' +
      '<td class="table-cell" title="Months">0</td>' +
      '<td class="table-cell" title="Payment">-</td>' +
      '<td class="table-cell" title="Payment To Interest">-</td>' +
      '<td class="table-cell" title="Payment To Principle">-</td>' +
      '<td class="table-cell" title="Balance">'}${$curBalance2.toLocaleString(
      'en-EN',
      $localCurrencyOptions,
    )}</td>` + `</tr>`,
  );

  while ($curBalance2 >= 0 || count2 <= 301) {
    // Call The Fixed payment Ammount
    const calc2 = new calcFixedRem(
      $curBalance2,
      $intRate,
      $fixAmount,
      $totalInterest2,
    );

    // Append the payemnts to the table.
    $('.fixed__amoritization > tbody').append(
      `${'<tr class="tabel-row">' +
        '<td class="table-cell" title="Months">'}${count2++}</td>` +
        `<td class="table-cell" title="Payment">${calc2.$payment2.toLocaleString(
          'en-EN',
          $localCurrencyOptions,
        )}</td>` +
        `<td class="table-cell" title="Payment To Interest">${calc2.$interest2.toLocaleString(
          'en-EN',
          $localCurrencyOptions,
        )}</td>` +
        `<td class="table-cell" title="Payment To Principle">${calc2.$principle2.toLocaleString(
          'en-EN',
          $localCurrencyOptions,
        )}</td>` +
        `<td class="table-cell" title="Balance">${calc2.$curBalance2.toLocaleString(
          'en-EN',
          $localCurrencyOptions,
        )}</td>` +
        `</tr>`,
    );
    // Grab All Interest Paid
    $totalInterest2 = calc2.$totalInterest2;

    // on the last loop do stuff.
    if ($curBalance2 <= 0 || count2 >= 301) {
      if (count2 == 301) {
        overText2 = 'Over ';

        $('.fixed__amoritization > tbody').append(
          '<tr class="tabel-row alert">' +
            '<td class="table-cell" colspan="5">It Will Take <b>Over 300 Months</b> To Pay This Off.</td>' +
            '</tr>',
        );
      }

      if ($curBalance2 == 0) {
        $('.fixed__amoritization > tbody').append(
          `${'<tr class="tabel-row success">' +
            '<td class="table-cell" colspan="5">It Is Paid Off In <b>'}${count2 -
            1}</b> Months!</td>` + `</tr>`,
        );
      }
      $('.time_2').text(`${overText2}${count2 - 1}`);
      $('.total_interest_2').text(
        overText2 +
          $totalInterest2.toLocaleString('en-EN', $localCurrencyOptions),
      );

      break;
    }
  }
}

//  calculate for minimum payment percentage
function calcRem(bal, int, pay, totInt) {
  let $balance = parseFloat(bal.toFixed(2)),
    $rate = int / 12 / 100,
    $balanceForward = $balance + $balance * $rate,
    $interestPayment = $balance * $rate,
    $totalInterest = totInt,
    $payment = pay / 100,
    $min,
    $monthlyPayment,
    $principle;

  $totalInterest += $interestPayment;

  // Calculate minimum payment
  // Calculated as Minimum payment rate * Balance of CC
  $min = $balance * $payment;

  // If Minimium Payment is less than 15 make it 15
  if ($min <= 10) {
    $min = 10;
  }

  if ($balanceForward <= $min) {
    $min = $balanceForward;
  }

  $monthlyPayment = $min;

  // Subtract Minimim Payment
  $balanceForward -= $min;

  $principle = $monthlyPayment - $balance * $rate;

  // Re Assign $curMinPayBalance to
  $curBalance = $balanceForward;

  if ($curBalance <= 0) {
    $curBalance = 0;
  }

  return {
    $balance,
    $curBalance,
    $payment: $monthlyPayment,
    $interest: $interestPayment,
    $totalInterest,
    $principle,
  };
}
//  calculate for fixed payment
function calcFixedRem(bal, int, pay, totInt) {
  let $balance2 = parseFloat(bal.toFixed(2)),
    $rate2 = int / 12 / 100,
    $balanceForward2 = $balance2 + $balance2 * $rate2,
    $interestPayment2 = $balance2 * $rate2,
    $totalInterest2 = totInt,
    $payment2 = pay,
    $min2,
    $monthlyPayment2,
    $principle2;

  $totalInterest2 += $interestPayment2;

  // Calculate minimum payment
  $min2 = $payment2;

  // If Minimium Payment is less than 15 make it 15
  // if ($min <= 15) {
  //     $min = 15;
  // }
  if ($balanceForward2 <= $min2) {
    $min2 = $balanceForward2;
  }

  $monthlyPayment2 = $min2;
  // Subtract Minimim Payment
  $balanceForward2 -= $min2;

  $principle2 = $monthlyPayment2 - $balance2 * $rate2;

  // Subtract Fixed paYment
  $curBalance2 = $balanceForward2;

  if ($curBalance2 <= 0) {
    $curBalance2 = 0;
  }

  return {
    $curBalance2,
    $payment2: $monthlyPayment2,
    $interest2: $interestPayment2,
    $totalInterest2,
    $principle2,
  };
}

//  Used for after to send the information
//  from the form to the client and to CC
$(document).on('click', '.email-me', e => {
  e.preventDefault();

  console.log('test');

  $.magnificPopup.open({
    items: {
      src: '#emailme',
      type: 'inline',
    },
    mainClass: 'emailme',
    preloader: true,
    overflowY: 'auto',
  });
});

function calValues(el) {
  let amount = 0;

  $(el).each(function() {
    amount += $(this).val() * 1;
  });

  return amount;
}
