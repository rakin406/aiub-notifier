# AIUB Notifier

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

**AIUB Notifier** is a program that emails you the latest AIUB notice. 
It is designed to run in the background using a cron job. Node.js is 
needed for this program to run. Refer to `.env.example`.

## Prerequisites

- **Node.js**
- **Resend API key:** Create a [Resend](https://resend.com/) account and copy the API key.

## Installation

1. **Clone the repository:**  
   ```bash
   git clone https://github.com/rakin406/aiub-notifier.git
   cd aiub-notifier
   ```
2. **Install the program:**  
   ```bash
   pnpm install -g .
   ```  

## Linux Usage

On Linux, you need a [cron](https://en.wikipedia.org/wiki/Cron) implementation installed.
Enable the service provided by the installed package. For example, *cronie* uses `cronie.service`.

First of all, get the path to the program:
```bash
which aiub-notifier
```

Edit your crontab:
```bash
crontab -e
```

Paste this:
```
*/10 * * * * RESEND_API_KEY=your-resend-api-key EMAIL=your-email-account <path-to-aiub-notifier> >/dev/null 2>&1
```

`*/10 * * * *` is a cron schedule expressing "at every 10th minute". That means
the program will run every 10 minutes on your computer. You can use any
duration as you wish. If you want to create your own schedule, you can use [crontab guru](https://crontab.guru/)
to generate cron schedule expressions.

Replace `your-resend-api-key` with your API key and `your-email-account` with
the email you used to register on Resend.

To prevent the sending of output and stop email alert, `>/dev/null 2>&1` is 
added at the end of the line to redirect output to /dev/null.

To view your crontabs:
```bash
crontab -l
```

Logs are saved to `~/.local/share/aiub-notifier/logs`.

## Contributing

Contributions, bug reports, and feature requests are welcome! Feel free to open an issue or submit a pull request on GitHub.

## Contact

Rakin Rahman - rakinrahman406@gmail.com

## License

This project is licensed under the **MIT License**. See the [LICENSE](./LICENSE) file for details.
