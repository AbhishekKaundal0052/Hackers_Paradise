// Mock lesson data - extracted to avoid SWC parser issues with large template literals in page
export const mockLesson = {
  id: '1',
  title: 'Introduction to Ethical Hacking',
  description: 'Learn the fundamental principles and methodologies of ethical hacking.',
  type: 'video',
  duration: 1800, // 30 minutes in seconds
  content: `
# Introduction to Ethical Hacking

## What is Ethical Hacking?

Ethical hacking, also known as penetration testing or white-hat hacking, involves authorized attempts to gain unauthorized access to computer systems, applications, or data to identify security vulnerabilities.

## Key Principles

1. **Authorization**: Always obtain proper permission before testing
2. **Scope**: Clearly define what systems can be tested
3. **Documentation**: Maintain detailed records of all activities
4. **Responsibility**: Report findings responsibly and securely

## The Hacking Methodology

### 1. Reconnaissance
- Passive information gathering
- Active information gathering
- Social engineering techniques

### 2. Scanning and Enumeration
- Network scanning
- Port scanning
- Service enumeration

### 3. Gaining Access
- Exploiting vulnerabilities
- Password attacks
- Social engineering

### 4. Maintaining Access
- Backdoors
- Rootkits
- Trojans

### 5. Covering Tracks
- Log manipulation
- File hiding
- Evidence removal
  `,
  codeExamples: [
    {
      language: 'python',
      title: 'Basic Port Scanner',
      code: `import socket
import sys

def scan_port(host, port):
    try:
        sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        sock.settimeout(1)
        result = sock.connect_ex((host, port))
        sock.close()
        return result == 0
    except:
        return False

def scan_host(host, start_port=1, end_port=1024):
    open_ports = []
    for port in range(start_port, end_port + 1):
        if scan_port(host, port):
            open_ports.append(port)
            print(f"Port {port} is open")
    return open_ports

# Usage
host = "192.168.1.1"
open_ports = scan_host(host)
print(f"Found {len(open_ports)} open ports")`
    }
  ],
  quiz: {
    questions: [
      {
        id: '1',
        question: 'What is the primary goal of ethical hacking?',
        options: [
          'To cause damage to systems',
          'To identify and fix security vulnerabilities',
          'To steal sensitive information',
          'To disrupt services'
        ],
        correctAnswer: 1
      }
    ]
  }
};
