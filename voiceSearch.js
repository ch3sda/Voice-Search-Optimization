const searchInput = document.getElementById('searchInput');
const startBtn = document.getElementById('startBtn');
const stopBtn = document.getElementById('stopBtn');
const result = document.getElementById('result');

if (!('webkitSpeechRecognition' in window)) {
  alert('Your browser does not support speech recognition.');
} else {
  const recognition = new webkitSpeechRecognition();
  recognition.continuous = false;
  recognition.interimResults = false;
  recognition.lang = 'en-US';

  // Start listening
  startBtn.addEventListener('click', () => {
    recognition.start();
    result.textContent = 'Listening...';
    console.log('Voice recognition started...');
    startBtn.disabled = true;
    stopBtn.disabled = false;
  });

  // Stop listening
  stopBtn.addEventListener('click', () => {
    recognition.stop();
    result.textContent = 'Listening stopped.';
    console.log('Voice recognition stopped.');
    startBtn.disabled = false;
    stopBtn.disabled = true;
  });

  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    searchInput.value = transcript; 
    result.textContent = `You said: "${transcript}"`;
    console.log(`Recognized speech: "${transcript}"`); 
  };

  recognition.onerror = (event) => {
    result.textContent = `Error occurred: ${event.error}`;
    console.error(`Speech recognition error: ${event.error}`);
    startBtn.disabled = false;
    stopBtn.disabled = true;
  };

  recognition.onend = () => {
    console.log('Voice recognition session ended.');
    startBtn.disabled = false;
    stopBtn.disabled = true;
    filterTable();    
  };

  // Filter the fruit table based on search input
    function filterTable() {
        const searchValue = document.getElementById('searchInput').value.toLowerCase();
        const tableRows = document.getElementById('fruitTable').getElementsByTagName('tr');

        for (let i = 0; i < tableRows.length; i++) {
            const fruitName = tableRows[i].getElementsByTagName('td')[0];
            if (fruitName) {
                const textValue = fruitName.textContent || fruitName.innerText;
                tableRows[i].style.display = textValue.toLowerCase().includes(searchValue) ? '' : 'none';
            }
        }
    }
}
