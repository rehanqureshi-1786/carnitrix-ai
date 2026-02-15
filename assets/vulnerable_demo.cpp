#include <stdio.h>
#include <string.h>

// VULNERABLE CODE - FOR DEMO PURPOSES ONLY
// This file contains intentional security vulnerabilities for hackathon demonstration

void vulnerable_function() {
    char buffer[8];  // Small buffer - vulnerable to overflow
    
    printf("Enter your name: ");
    gets(buffer);  // CRITICAL: Unbounded read - classic buffer overflow
    
    printf("Hello, %s!\n", buffer);
}

void unsafe_copy(char* input) {
    char dest[16];
    strcpy(dest, input);  // CRITICAL: No bounds checking
    printf("Copied: %s\n", dest);
}

void command_injection(char* user_input) {
    char command[256];
    sprintf(command, "echo %s", user_input);  // CRITICAL: Command injection risk
    system(command);  // CRITICAL: Direct system call with user input
}

int main() {
    printf("=== CARNITRIX DEMO - VULNERABLE CODE ===\n");
    printf("This code contains intentional vulnerabilities\n\n");
    
    vulnerable_function();
    
    return 0;
}
