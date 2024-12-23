# DriveMe - Vehicle Ownership and Driver Management System

**DriveMe** is a web application designed to manage and track vehicle ownership and driver history, with a focus on role-based access. The system provides two different dashboards based on the user's role: vehicle owner or driver.

## Features

### 1. **Vehicle Owner Dashboard**

- As a **vehicle owner**, you are directed to the **Owner's Dashboard**, where you can **transfer control** of your vehicle to another user.

![Owner Dashboard](https://raw.githubusercontent.com/ayu-g22/VRVAssignment/main/images/image-1.png)

- A **Transfer** button is available on the dashboard. Upon clicking it, you will be prompted to select from your acquaintances (which can be added via the settings page).

#### Transfer Request UI:
![Transfer Request UI](https://raw.githubusercontent.com/ayu-g22/VRVAssignment/main/images/transfer-request.png)

### 2. **Driver Dashboard**

- As a **driver**, there is no transfer control button. Instead, you will receive transfer requests from vehicle owners if they wish to transfer control of their vehicle to you.

![Driver Dashboard](https://raw.githubusercontent.com/ayu-g22/VRVAssignment/main/images/image.png)

- Transfer requests are implemented using **Socket.IO**, allowing real-time communication between the owner and driver.

#### Driver Transfer Request UI:
![Driver Transfer Request](https://raw.githubusercontent.com/ayu-g22/VRVAssignment/main/images/driver-transfer-request.png)

## Instructions for Testing

Follow the steps below to set up the application locally:

### 1. **Frontend Setup**

- Open the `DriveMe` folder in your preferred code editor.
- Navigate to the `frontend` directory in your terminal:

     ```bash
     cd frontend
     ```

- Install the necessary dependencies:

     ```bash
     npm install
     ```

- Start the frontend development server:

     ```bash
     npm start
     ```

### 2. **Backend Setup**

- In another terminal window, navigate to the root directory and then to the backend folder:

     ```bash
     cd ..
     ```
     ```bash 
     cd backend
     ```
     

- Install the backend dependencies:

     ```bash
     npm install
     ```

- Start the backend development server:

     ```bash
     npm run dev
     ```

Once both the frontend and backend are running, you can access the application on [http://localhost:3000](http://localhost:3000).
