 // Function to load a section
 function loadSection(sectionName) {
    fetch(`${sectionName}.html`)
    .then(response => response.text())
    .then(html => {
        document.getElementById('main-content').innerHTML += html;
    });
}

// Load all sections
loadSection('hero');
loadSection('simulator');
loadSection('documentation');

// {/* <script src="https://cdn.jsdelivr.net/npm/chart.js"></script> */}


// let xValue = 0; #一旦グラフのことは考えないでおく
    let currentAgent = null;
    let donations = {};
      // donationsの中には、各エージェントの寄付額の値が入る
      // `donations[0]`は、中身がintでargent0の寄付額が入っている
    let initialized = false;


    const clusters = [
      { sets: ['L2'], nodes: ['argent0'] },
      { sets: ['DeFi'], nodes: ['argent1', 'argent2'] },
      { sets: ['NFT'], nodes: ['argent2', 'argent3', 'argent4', 'argent5'] },
      { sets: ['Public Goods'], nodes: ['argent6'] }
    ];


let myLineChart;

//added
// let lineChartData = {
//   labels: Array.from({length: 101}, (_, i) => i),  // 0 to 100
//   datasets: [{
//     label: 'Matched Amount',
//     data: Array(101).fill(0),  // Initialize with zeros
//     borderColor: 'rgba(75, 192, 192, 1)',
//     borderWidth: 1,
//     fill: false,
//     pointBackgroundColor: Array(101).fill('rgba(75, 192, 192, 1)'),  // Initialize point colors
//   }]
// };



// function drawLineChart() {
//   const ctx = document.getElementById("myLineChart").getContext("2d");
//   return new Chart(ctx, {
//     type: 'line',
//     data: lineChartData
//   });
// }


function initLineChart() {
  myLineChart = new Chart(document.getElementById("myLineChart").getContext("2d"), {
    type: 'line',
    data: {
      labels: Array.from({length: 101}, (_, i) => i),  // 0 to 100
      datasets: [{
        label: 'Matched amount',
        data: Array.from({length: 101}, () => 0),  // Initialize with zeros
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
        fill: false,
        pointRadius: Array.from({length: 101}, () => 0)  // Initialize point radii with zeros
      }]
    },
    options: {
      scales: {
        x: {
          title: {
            display: true,
            text: 'X: Donation Amount (input by slider)'
          }
        },
        y: {
          title: {
            display: true,
            text: 'Y: Matched Amount'
          }
        }
      },
      plugins: {
      tooltip: {
        callbacks: {
          label: function(tooltipItem) {
            const tableRow = document.getElementById('amountsTable').getElementsByTagName('tbody')[0].rows;
            let matchedAmount = null;
            for (let i = 0; i < tableRow.length; i++) {
              if (tableRow[i].cells[0].innerHTML === currentAgent) {
                matchedAmount = tableRow[i].cells[2].innerHTML;
                break;
              }
            }
            return `Matched Amount: ${matchedAmount}`;
          }
        }
      }
    }
    }
  });
}


// function updateLineChart() {
//   const otherDonations = {...donations};
//   delete otherDonations[currentAgent];
//   const xData = [];

//   for (let i = 0; i <= 100; i++) {
//     otherDonations[currentAgent] = i;
//     const contributions = Object.entries(otherDonations).map(([node, amount]) => ({ node, amount }));
//     const matchedAmounts = calculateMatchingFunds(100, clusters, contributions);
//     const currentMatchedAmount = matchedAmounts.find(m => m.node === currentAgent).amount || 0;
//     xData.push(currentMatchedAmount);
//   }

//   // Update X-axis data
//   myLineChart.data.datasets[0].data = xData;

//   // Highlight the current donation amount on the graph
//   myLineChart.data.datasets[0].pointRadius = Array.from({length: 101}, (_, i) => i === donations[currentAgent] ? 5 : 0);

//   myLineChart.update();
// }

// function calculateYDataForLineChart(otherDonations, matchingPool, clusters) {
//   const yData = [];
//   for (let i = 0; i <= 100; i++) {
//     otherDonations[currentAgent] = i;
//     const contributions = Object.entries(otherDonations).map(([node, amount]) => ({ node, amount }));
//     const matchedAmounts = calculateMatchingFunds(matchingPool, clusters, contributions);
//     const currentMatchedAmount = matchedAmounts.find(m => m.node === currentAgent).amount || 0;
//     yData.push(currentMatchedAmount);
//   }
//   return yData;
// }


// function updateLineChart() {
//   const otherDonations = {...donations};
//   delete otherDonations[currentAgent];
//   const xData = [];

//   for (let i = 0; i <= 100; i++) {
//     otherDonations[currentAgent] = i;
//     const contributions = Object.entries(otherDonations).map(([node, amount]) => ({ node, amount }));
//     const matchedAmounts = calculateMatchingFunds(100, clusters, contributions);
//     const currentMatchedAmount = matchedAmounts.find(m => m.node === currentAgent).amount || 0;
//     xData.push(currentMatchedAmount);
//   }

//   // Update X-axis data
//   myLineChart.data.datasets[0].data = xData;

//   // Highlight the current donation amount on the graph
//   const currentDonation = donations[currentAgent] || 0; // Use 0 if the donation amount is not set
//   myLineChart.data.datasets[0].pointRadius = Array.from({length: 101}, (_, i) => i === currentDonation ? 5 : 0);

//   myLineChart.update();
// }

// function updateLineChart() {
//   const matchingPool = parseFloat(document.getElementById('matchingPool').value) || 0;  // Matching Poolを取得
//   const otherDonations = {...donations};  // 現在の全エージェントの寄付額をコピー
//   delete otherDonations[currentAgent];  // 操作中のエージェントの寄付額を削除
//   const yData = [];

//   // 寄付額が0から100に変わる場合のMatched Amountを計算
//   for (let i = 0; i <= 100; i++) {
//     otherDonations[currentAgent] = i;  // 操作中のエージェントの寄付額を設定
//     const contributions = Object.entries(otherDonations).map(([node, amount]) => ({ node, amount }));
//     const matchedAmounts = calculateMatchingFunds(matchingPool, clusters, contributions);
//     const currentMatchedAmount = matchedAmounts.find(m => m.node === currentAgent).amount || 0;
//     yData.push(currentMatchedAmount);
//   }

//   // Y軸データを更新
//   myLineChart.data.datasets[0].data = yData;

//   // 現在の寄付額にポイントを表示
//   const currentDonation = donations[currentAgent] || 0;
//   myLineChart.data.datasets[0].pointRadius = Array.from({length: 101}, (_, i) => i === currentDonation ? 5 : 0);

//   myLineChart.update();  // グラフを更新
// }

function updateLineChart() {
  const matchingPool = parseFloat(document.getElementById('matchingPool').value) || 0;  // Matching Poolを取得
  const otherDonations = {...donations};  // 現在の全エージェントの寄付額をコピー
  delete otherDonations[currentAgent];  // 操作中のエージェントの寄付額を削除
  const yData = [];

  for (let i = 0; i <= 100; i++) {
    otherDonations[currentAgent] = i;
    const contributions = Object.entries(otherDonations).map(([node, amount]) => ({ node, amount }));
    let matchedAmounts = calculateMatchingFunds(matchingPool, clusters, contributions);

    // Calculate the total Matched Amounts
    let totalMatchedAmount = matchedAmounts.reduce((sum, {amount}) => sum + amount, 0);

    // Normalize the Matched Amounts so they don't exceed the Matching Pool
    matchedAmounts = matchedAmounts.map(({node, amount}) => ({
      node,
      amount: (amount / totalMatchedAmount) * matchingPool
    }));

    const currentMatchedAmount = matchedAmounts.find(m => m.node === currentAgent).amount || 0;
    yData.push(currentMatchedAmount);
  }

    const currentDonation = donations[currentAgent] || 0;
  myLineChart.data.datasets[0].pointRadius = Array.from({length: 101}, (_, i) => i === currentDonation ? 5 : 0);

  // Update the chart data
  myLineChart.data.datasets[0].data = yData;
  myLineChart.update();
  
  showAgentInfo(currentAgent);
}











    // 一番最初に各エージェントの寄付額が0であることを確定する
    function initializeDonations() {
      for (let i = 0; i <= 6; i++) {
        donations[`argent${i}`] = 0;
      }
      initialized = true;
    }
    
    
    //追加
    function calculateMembershipsAndFriendship(agentId) {
  let memberships = 0;
  let friendshipCount = 0;

  // memberships（クラスターメンバーシップ数）を計算
  clusters.forEach(cluster => {
    if (cluster.nodes.includes(agentId)) {
      memberships++;
    }
  });

  // friendshipCount（友達数）を計算
  clusters.forEach(cluster => {
    if (cluster.nodes.includes(agentId)) {
      friendshipCount += cluster.nodes.length - 1; // 自分自身を除く
    }
  });

  return { memberships, friendshipCount };
}

function showAgentInfo(agentId) {
  const { memberships, friendshipCount } = calculateMembershipsAndFriendship(agentId);

  const currentDonation = donations[agentId] || 0;
  // const currentMatchedAmount = // 現在のMatched Amountを取得するロジック

  const influenceScore = Math.sqrt(currentDonation) * friendshipCount;

  document.getElementById('membershipCount').innerText = `Number of cluster: ${memberships}`;
  document.getElementById('friendshipCount').innerText = `Friendship Count: ${friendshipCount}`;
  // document.getElementById('currentMatchedAmount').innerText = `Matched Amount: ${currentMatchedAmount}`;
  document.getElementById('currentDonation').innerText = `Donation Amount: ${currentDonation}`;
  document.getElementById('influenceScore').innerText = `Influence Score: ${influenceScore.toFixed(2)}`;
}


    // 各エージェントのボタンをクリックするとこの関数が発火する、押されたエージェントによってargentIdの値が変わる。argent0なら`argent0`という値が伝えられる。
    function showSlider(agentId) {
        if (currentAgent) {
            document.getElementById(currentAgent).classList.remove('selected');
        }

        currentAgent = agentId;
        document.getElementById(agentId).classList.add('selected');

        document.getElementById('slider-container').style.display = 'block';
        currentAgent = agentId;

        // Initialize donations if not already initialized
        if (!initialized) {
            initializeDonations();
        }

        const currentDonation = donations[agentId] || 0; // Use 0 if the donation amount is not set
        document.getElementById('slider').value = currentDonation;
        document.getElementById('slidervalue').textContent = currentDonation;

        updateLineChart();

        //added
        // showAgentInfo(agentId);

    }




    function updateDonationAndCalculate() {
      const sliderValue = parseFloat(document.getElementById('slider').value);
      document.getElementById('slidervalue').textContent = sliderValue;
      donations[currentAgent] = sliderValue;
      updateTable();
      calculateMatchedAmounts();
      //graph
      // updateLineChart();
      updateLineChart();
      showAgentInfo(agentId);
    }

    function updateTable() {
      const tbody = document.getElementById('amountsTable').getElementsByTagName('tbody')[0];
      tbody.innerHTML = '';

      for (const [agent, donation] of Object.entries(donations)) {
        const row = tbody.insertRow();
        row.insertCell(0).innerHTML = agent;
        row.insertCell(1).innerHTML = donation;
        row.insertCell(2).innerHTML = '';
      }
    }



    function calculateMatchedAmounts() {
      const matchingPool = parseFloat(document.getElementById('matchingPool').value) || 0;
      const contributions = Object.entries(donations).map(([node, amount]) => ({ node, amount }));
      let matchedAmounts = calculateMatchingFunds(matchingPool, clusters, contributions);

      // Calculate the total Matched Amounts
      let totalMatchedAmount = matchedAmounts.reduce((sum, {amount}) => sum + amount, 0);

      // Normalize the Matched Amounts so they don't exceed the Matching Pool
      matchedAmounts = matchedAmounts.map(({node, amount}) => ({
        node,
        amount: (amount / totalMatchedAmount) * matchingPool
      }));

      const tbody = document.getElementById('amountsTable').getElementsByTagName('tbody')[0];
      matchedAmounts.forEach(({ node, amount }, index) => {
        tbody.rows[index].cells[2].innerHTML = amount.toFixed(2);
      });

      updateLineChart();
      // showAgentInfo(agentId);

      //added 
      const matchedAmountsObj = {};

  matchedAmounts.forEach(({ node, amount }, index) => {
    tbody.rows[index].cells[2].innerHTML = amount.toFixed(2);
    matchedAmountsObj[node] = amount;
  });

  updateLineChart();
  // showAgentInfo(agentId);
  
  return matchedAmountsObj;

    }

  

    function calculateMatchingFunds(totalAmount, clusters, contributions) {
  const sqrt = Math.sqrt;
  let sqrtSums = {};
  clusters.forEach(cluster => {
      const sets = cluster['sets'].sort().toString();
      sqrtSums[sets] = sqrtSums[sets] || 0;
      cluster['nodes'].forEach(node => {
          const amount = contributions.find(con => con.node === node)?.amount || 0;  // 0をデフォルト値として設定
          sqrtSums[sets] += sqrt(amount);
      });
  });


    let matchingFunds = [];
  contributions.forEach(contribution => {
      const node = contribution.node;
      const amount = contribution.amount;
      const cluster = clusters.find(cluster => cluster.nodes.includes(node));
      const sets = cluster['sets'].sort().toString();
      const matchedAmount = sqrtSums[sets] !== 0 ? (sqrt(amount) / sqrtSums[sets]) * (totalAmount) : 0;  // sqrtSumsが0でない場合だけ計算
      matchingFunds.push({ node, amount: matchedAmount });
  });

  // Check if the total matched amounts exceed the total pool
  const totalMatched = matchingFunds.reduce((acc, val) => acc + val.amount, 0);
  if (totalMatched > totalAmount) {
      console.error("Total matched amounts exceed the total pool. Please check the logic.");
  }

  return matchingFunds;

}
window.onload = function() {
  initLineChart();
  // Other initialization code
};


