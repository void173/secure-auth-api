const axios = require('axios');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const BASE_URL = 'http://localhost:3000'; // Update with your localtunnel/HTTPS URL if testing remotely

async function simulate(endpoint, payload, attempts) {
  for (let i = 1; i <= attempts; i++) {
    try {
      const res = await axios.post(`${BASE_URL}${endpoint}`, payload);
      console.log(`Attempt ${i}: ${res.status} ${res.statusText}`);
    } catch (error) {
      if (error.response) {
        console.log(`Attempt ${i}: ${error.response.status} - ${error.response.data.message}`);
      } else {
        console.log(`Attempt ${i}: Failed - ${error.message}`);
      }
    }
  }
}

rl.question("Endpoint (e.g. /auth/login): ", (endpoint) => {
  rl.question("Email: ", (email) => {
    rl.question("Password: ", (password) => {
      rl.question("Number of attempts: ", async (count) => {
        const payload = { email, password };
        await simulate(endpoint, payload, parseInt(count));
        rl.close();
      });
    });
  });
});
