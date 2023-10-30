# PushNote Documentation

## Introduction
Welcome to **PushNote**, a task management application designed specifically for small and medium-scale organizations. Built using React and optimized for mobile devices, PushNote streamlines your workflow and enhances productivity.

## User Roles and Functionalities
PushNote caters to three distinctive user roles: Admins, Managers, and Employees. Each role is equipped with specific functionalities to ensure seamless task allocation and monitoring within the organization.

### Admins
Admins are the focal point of control, responsible for overseeing the organization's cloud storage and managing task assignments. They can effortlessly add tasks, assign them to specific managers, and monitor the real-time progress of each task across the entire organization.

### Managers
Managers play a pivotal role in task distribution and supervision. They can effortlessly add employees to the system, assign tasks to their team members, and conveniently track the status of these tasks. Managers can also update the status of their own tasks, ensuring clear communication and real-time progress updates for the Admin's overview.

### Employees
Employees are the key workforce responsible for executing the assigned tasks. With easy access to their task lists, employees can efficiently update task statuses, ensuring transparent communication and streamlined progress tracking within the organization.

## Authentication
PushNote prioritizes security by implementing a robust Firebase-based authentication system. Users can seamlessly register and log in using their Google accounts, ensuring a secure and hassle-free experience.

## Stress Relief Feature
In addition to its task management capabilities, PushNote cares about the well-being of its users. We have integrated a stress relief meditation audio feature, allowing users to take a moment to relax and rejuvenate, promoting a healthier and more productive work environment.

## Enabling Mobile Mode on Desktop
Although PushNote is optimized for mobile devices, you can still access it on your desktop by enabling mobile mode in your browser's developer tools. Here's how you can do it:

1. Open **Developer Tools** in your browser (usually by pressing `F12` or `Ctrl+Shift+I`).
2. Click on the **Toggle Device Toolbar** button (or press `Ctrl+Shift+M`).
3. Select a mobile device from the dropdown list at the top of the screen.
4. Refresh the page.

Now you can use PushNote on your desktop as if you were on a mobile device!

## Here are the steps to run the React app locally:

1. **Clone the repository**: Use the command `git clone <repository-url>` to clone the PushNote repository to your local machine.

2. **Navigate to the project directory**: Use the command `cd <project-directory>` to navigate into the cloned repository.

3. **Install npm**: If not already installed, you will need npm. You can download Node.js from their [official website](https://nodejs.org/) and npm is included in the installation.

4. **Install dependencies**: Run `npm install` in the project directory. This will install all the necessary dependencies listed in your `package.json` file.

5. **Start the server**: Run `npm start` to start the development server. By default, this will run the app in development mode on [http://localhost:3000](http://localhost:3000).

6. **Open in a browser**: Open [http://localhost:3000](http://localhost:3000) in a browser to view your app.

Remember, any changes you make to the source code will automatically reload the app in your browser. If you encounter any errors, they will be displayed in the console.

Happy coding! 😊
