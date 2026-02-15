// VULNERABLE JAVASCRIPT - FOR DEMO PURPOSES ONLY
// This file contains intentional security vulnerabilities for hackathon demonstration

// CRITICAL: eval() with user input - Code Injection
function processUserInput(userInput) {
    return eval(userInput);  // CRITICAL: Arbitrary code execution
}

// CRITICAL: innerHTML without sanitization - XSS
function displayMessage(message) {
    document.getElementById('output').innerHTML = message;  // CRITICAL: XSS vulnerability
}

// CRITICAL: SQL injection risk
function getUserData(username) {
    const query = `SELECT * FROM users WHERE username = '${username}'`;  // CRITICAL: SQL injection
    return database.query(query);
}

// CRITICAL: Command injection
function executeCommand(userCommand) {
    const { exec } = require('child_process');
    exec(`ls ${userCommand}`, (error, stdout) => {  // CRITICAL: Command injection
        console.log(stdout);
    });
}

// Hardcoded credentials
const API_KEY = 'sk-1234567890abcdef';  // CRITICAL: Exposed API key
const PASSWORD = 'admin123';  // CRITICAL: Hardcoded password

module.exports = {
    processUserInput,
    displayMessage,
    getUserData,
    executeCommand
};

