document.addEventListener("DOMContentLoaded", function () {
  const words = [
    {
      word: "apple",
      definition: "A fruit that is typically round and red, green, or yellow.",
      example: "I ate an apple for breakfast.",
      image: "images/apple.jpg",
      options: ["苹果", "香蕉", "樱桃", "枣"],
      correctOption: "苹果"
    },
    {
      word: "banana",
      definition: "A long curved fruit that grows in clusters and has soft pulpy flesh and yellow skin when ripe.",
      example: "Bananas are rich in potassium.",
      image: "images/banana.jpg",
      options: ["苹果", "香蕉", "樱桃", "枣"],
      correctOption: "香蕉"
    }
  ];

  let currentWordIndex = 0;

  function showWord(index) {
    const wordData = words[index];
    document.querySelector('.word-card h2').textContent = wordData.word;
    document.querySelector('.word-card p.definition').textContent = wordData.definition;
    document.querySelector('.word-card p.example').textContent = wordData.example;
    document.querySelector('.word-card img').src = wordData.image;

    const optionsContainer = document.querySelector('.options-container');
    optionsContainer.innerHTML = ''; // Clear existing options

    wordData.options.forEach(option => {
      const button = document.createElement('button');
      button.textContent = option;
      button.addEventListener('click', function () {
        if (option === wordData.correctOption) {
          currentWordIndex++;
          if (currentWordIndex < words.length) {
            showWord(currentWordIndex);
          } else {
            alert('You have completed all the words!');
          }
        } else {
          alert('Incorrect! Try again.');
        }
      });
      optionsContainer.appendChild(button);
    });
  }

  showWord(currentWordIndex);

  // Initialize Chart.js for the recent words chart
  const recentWordsCtx = document.getElementById('recent-words-chart').getContext('2d');
  const recentWordsChart = new Chart(recentWordsCtx, {
    type: 'line',
    data: {
      labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'],
      datasets: [{
        label: 'Words Learned',
        data: [5, 10, 15, 20, 25, 30, 35],
        backgroundColor: 'rgba(0, 123, 255, 0.2)',
        borderColor: 'rgba(0, 123, 255, 1)',
        borderWidth: 2,
        fill: true
      }]
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });

  // Initialize Chart.js for the Ebbinghaus curve chart
  const ebbinghausCurveCtx = document.getElementById('ebbinghaus-curve-chart').getContext('2d');
  const ebbinghausCurveChart = new Chart(ebbinghausCurveCtx, {
    type: 'line',
    data: {
      labels: ['0', '1', '2', '4', '7', '14', '21', '28'],
      datasets: [{
        label: 'Memory Retention',
        data: [100, 80, 60, 45, 30, 20, 10, 5],
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 2,
        fill: true
      }]
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
          max: 100
        }
      }
    }
  });
});