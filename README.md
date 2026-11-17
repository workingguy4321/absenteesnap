# AbsenteeSnap — Fast Absentee Reporter

A 100% offline-ready Progressive Web App (PWA) tailored for Class Representatives (CRs) to quickly track period-by-period class attendance and generate copy-paste ready reports.

## Features

- **100% Offline (Android & iOS)**: Fully functioning offline PWA powered by Service Workers and LocalStorage. Works without any internet or backend server.
- **Fast Absentee Entry**: Just type absent roll numbers (e.g. `01, 11, 12, 18`) or tap student cards in the visual grid.
- **Copy-Paste Formats**: Standardized formats like `[Roll, Name]` and `Roll - Name` ready to paste into WhatsApp, Telegram, or email.
- **Class Customization**: Configure CR Name, Department, Year, Semester, Section, and Total Student count in Settings.
- **Period Transition & History**: Jump to the next hour (`1st Hr` → `2nd Hr`) with 1 tap while saving records to the attendance log.

## Free Deployment on GitHub Pages

1. Push this repository to GitHub:
   ```sh
   git init
   git add .
   git commit -m "Initial commit of AbsenteeSnap"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<your-repo-name>.git
   git push -u origin main
   ```
2. In your GitHub repository:
   - Go to **Settings** → **Pages**.
   - Under **Build and deployment**, select **Source: Deploy from a branch**.
   - Select branch `main` and folder `/ (root)`.
   - Click **Save**.
3. Your app will be live at `https://<your-username>.github.io/<your-repo-name>/`!

## License
MIT
