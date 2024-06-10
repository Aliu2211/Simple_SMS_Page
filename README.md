# Personalized SMS Messaging App

This project is a web application that allows hospital staffs to send SMS messages to pacients using a specified template. It also handles delivery status notifications via a callback URL.

## Features

- Send SMS messages to  pacients.
- Automatically receive delivery status notifications.
- Simple and intuitive user interface.

## Prerequisites

- Node.js and yarn
- Git
- A GitHub account
- An SMS API key from [SMSOnlineGH](https://smsonlinegh.com/)

## Installation

1. Clone the repository:

    ```sh
   git clone git@github.com:Aliu2211/Simple_SMS_Page.git
    cd Simple_SMS_Page
    ```
  

### Backend Setup

2. Navigate to the backend branch and install dependencies:

    ```sh
    git checkout frontend
    cd SMS_Project
    cd backend
    yarn install
    ```
 3. Set up environment variables:

    Create a `.env` file in the root directory and add your API key and sender ID:

    ```env
    SMS_API_KEY=your_sms_api_key
    SENDER_ID=your_sender_id
    ```
   
make sure to run the backend on different window.    

4. Start the backend server:

    ```sh
    node index.js
    ```

### Frontend Setup

5. Navigate to the frontend branch and install dependencies:

    ```sh
    git checkout frontend
    cd SMS_Project
    yarn install
    ```

6. Start the frontend development server:

    ```sh
    yarn start
    ```

## Usage

1. Open your browser and navigate to `http://localhost:3000`.
2. Enter the patient's number and your message.
3. Click "Send" to send the SMS message.
4. Check the delivery status notifications in the console (backend server logs).




