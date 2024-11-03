# MRT Rail Transit and Ticketing Management System

## 📜 Table of Contents

1. 💿 [About This Project](#about)
2. 💚 [Tech Stack](#techStack)
3. 💡 [Features](#features)
4. 📐 [Dev Notes](#notes)

## <a name="about"> About the Project </a>

"MRTOnline" is a full stack web application created to simulate the work operations of MRT Line 3. Allow commuters to view stations, tap in/out with their beep card number or thru a QR scanner via the [Mobile App](https://github.com/mikeeDaw/mrtMobile), and allow admin operations to manage the system.

## <a name="techStack"> Tech Stack </a>

- MongoDB
- Express
- React.js
- Node.js
- Tailwind CSS

## <a name="features"> Features </a>

1. 🎈 **Easy Admin Controls**: Easily manage the operations of the whole system using the dashboard.

   - Add and Manage Stations
   - Create and Manage Beep Cards
   - Load Beep cards
   - Change to Maintenance and Operational Mode
   - Change pricing and other system constants.

2. ## 🎈 **Secure Admin Credentials**

   - Usage of JWT to make the admin sessions and requests to server secure.
   - encrypting and salting of password on the database for added user security.

3. 🎈 **Ease Commuting Experience**

   - Tap In/Out Easily by scanning the QR code through the mobile App or entering the card number.
   - View The stations and route of the transit line.
   - View fare, distance, and other information about your journey.

4. 🎈 **Great User Experience**

   - Responsive layout for different screen sizes
   - Visually appealing design and clear display of data

## <a name="notes"> Developer Notes </a>

- Backend is moved to [this repo](https://github.com/mikeeDaw/mrt-backend)
