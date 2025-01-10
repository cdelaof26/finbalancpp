# FinbalanC++ `[Front]`

FinbalanC++ es una aplicación para el manejo de 
finanzas personales. Esta herramienta permite 
a los usuarios administrar todas sus finanzas 
en un solo lugar de manera organizada.

Esta aplicación utiliza las siguientes tecnologías:
- HTML
- [React](https://react.dev)
  - [Next.js](https://nextjs.org)
- [TailwindCSS](https://tailwindcss.com)
- [Tauri](https://v2.tauri.app)

### License

At the moment no license is present.
All rights reserved [@cdelaof26](https://github.com/cdelaof26/)

### Development

> [!NOTE]
> Tauri requires Rust installed

```bash
# Clone this repo
git clone https://github.com/cdelaof26/finbalancpp

# Navigate to the project directory
cd finbalancpp

# Install all the dependencies in package.json
npm install

# Run the development server
# Open http://localhost:3000 with your browser to see the webpage
npm run dev

# Or Run using Tauri (desktop app)
npm run tauri dev
```

### Building from source

```bash
# Clone this repo
git clone https://github.com/cdelaof26/finbalancpp

# Navigate to the project directory
cd finbalancpp

# Install all the dependencies in package.json
npm install

# Build using Tauri
npm run tauri build
```

### Versioning

#### v0.0.10
- Fixed `EarningsEditor`
- Now earnings will update based on earnings added
- `debit_n_debt` is now _almost_ functional
  - Fixed overflow

#### v0.0.9
- Fixed exit button
- `EarningsEditor` is now _somewhat_ functional
  - Fixed overflow
- Added error message

#### v0.0.8
- Massive rewrite to fix `npm run build`
- Fixed links in `home` and `debit_n_debt`

#### v0.0.7
- Budgets, investments and tips pages
  - _Not working yet_

#### v0.0.6
- Cards, debit and debt page
  - _Not working yet_

#### v0.0.5
- Earnings page
  - _Not working yet_
  - Missing cards section

#### v0.0.4
- My account page
  - _Not working yet_
- All app colores are defined in the tailwind config file
- Improved `IconButton` component
- Now `Earnings.CardSection` component can receive custom parameters
- Reworked `GetSVG`

#### v0.0.3
- Home page
  - _Not working yet_
- Set minimum width and height for the app
- _Some_ app colors are now defined in the tailwind config file

#### v0.0.2
- Login, sign up and help page
  - _Not working yet_
- Removed DaisyUI as dependency

#### v0.0.1
- Initial project - `Hello World!`
