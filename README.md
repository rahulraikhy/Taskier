# Project 4: Taskier - A Simple Task Managing Tool

<!-- ABOUT THE PROJECT -->

## Project Overview

For my fourth project as part of General Assembly's Software Engineering Immersive programme, we were instructed to individually build a full-stack application using the MERN stack, due to extenuating circumstances, I had 3 days to complete this.

![Screenshot 2023-09-03 at 22 39 24](https://github.com/rahulraikhy/Taskier/assets/121837375/f33cce8b-0bf6-448b-aff7-36c183b65224)

## Launch the App

<strong><p><a href="https://taskier-b3be2ded42fa.herokuapp.com/">Click here to try Taskier!</a></p></strong>

## About the App

Welcome to Taskier, a simple task managing site.

My goal was to create a user-friendly, task-managing website that enables users to effectively organize, track, and complete their daily tasks and long-term projects.

![ezgif com-optimize (4)](https://github.com/rahulraikhy/Taskier/assets/121837375/1b54a5f1-acdd-4197-8ae9-5a8918d4237a)


**Built With**

For this project we built a fullstack application using these tools:

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Heroku](https://img.shields.io/badge/Heroku-430098?style=for-the-badge&logo=heroku&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)

<!-- ROADMAP -->

## Project Brief

- Working MERN stack app.
- Token-based authentication implemented (sign-up, login & logout)
- Navigation dynamically responds to the login status of the user.
- Authorization is implemented that restricts access to CRUD functionality from anonymous users
- Have a consistent and polished user interface.
- App has full Create/Read/Update/Delete and/or consumes an API, has admin user functionality or real time communication.
- Be deployed online via Heroku

## Planning

Due to a limited timeframe, I put together a plan for a simple project that could be scaled up exponentially, hence the decision to build a Task Manager app using React as the front-end. React's massive community and large amount of resources allowed for exponetial growth on the front-end of a simple app, as long as the CRUD functionality, authentication, and user authorization limiting CUD functionality could be implemented quickly. As a result, I opted for a simple ERD, choosing to maximise my time efficiency over all else.

## ERD

![Screenshot 2023-09-03 at 22 23 48](https://github.com/rahulraikhy/Taskier/assets/121837375/e878fb84-a90f-413d-b201-4951f2c4c034)

## MVP - Minimum Viable Product

- [x] A way to login and logout
- [x] Create a new task
- [x] Submit and edit said task
- [x] Ability to delete tasks
- [x] Navigate to All Tasks Page to see all user's tasks

## NTH - Nice to have

- [ ] Implement drag and drop functionality across tasks
- [ ] Allow other users to comment and contribute to tasks
- [ ] Improve UI and User experience to a higher standard
- [ ] Add API to tasks (i.e. weather API to demonstrate weather in local area to aid with planning for events)

## Getting Started

The first step was to skeleton the pages and components for the app, as this was a relatively small app, this was a quick process and I could begin coding. I initialised the authentication and signup processes immediately, after creating an AuthPage, I utilised a send-request.js file in utilities to contain my "fetch" function to send API requests in order to facilitate my CRUD functionality:

```
export default async function sendRequest(url, method = 'GET', payload = null) {
    // Fetch accepts an options object as the 2nd argument
    // used to include a data payload, set headers, etc. 
    const options = { method };
    if (payload) {
        options.headers = { 'Content-Type': 'application/json' };
        options.body = JSON.stringify(payload);
    }
    const token = getToken();
    if (token) {
        // Ensure that headers object exists
        options.headers = options.headers || {};
        options.headers.Authorization = `Bearer ${token}`;
    }
    const res = await fetch(url, options);
    if (res.ok) return res.json();
    throw new Error('Bad Request');
```

In order to complete my MVP, I wanted to create CRUD functionality that was very simple, but also could allow a quick sort method to order the tasks based on urgency needed for completion (ranked from 1-5, 1 being the least urgent, 5 being the most), as well as be split into separate task departments (not started, in progress, or completed), so I set up my task schema in my models to reflect this:

```
const taskSchema = new mongoose.Schema({
    task: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['not started', 'In Progress', 'completed'],
        default: 'not started'
    },
    urgency: {
        type: String,
        enum: ['1', '2', '3', '4', '5'],
        default: '1'
    },
    description: {
        type: String,
        maxlength: 1000,
        trim: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'user'
    }
}, {
    timestamps: true,
})

module.exports = mongoose.model('task', taskSchema)
```

And creating CRUD functionality of this base was a simple feature at this point in our course, as demonstrated by the edit function below:

```
async function editTask(req, res) {
    const { task, status, description, urgency } = req.body;

    try {
        const updatedTask = await TaskModel.findByIdAndUpdate(
            req.params.id,
            { task, status, description, urgency },
            { new: true }
        );

        if (!updatedTask) {
            return res.status(404).json({ message: 'Task not found' });
        }

        res.status(200).json({ message: 'Task updated successfully', task: updatedTask });
    } catch (err) {
        res.status(500).json({ message: 'Error updating task' });
    }
}
```

Initially destructuring the request body to extract task, status, description, and urgency, used the Mongoose model "findByIdAndUpdate" to search for a task by its ID ("req.params.id") and update it, the following lines:

```
            { task, status, description, urgency },
            { new: true }
```

are what was used to select the data that would be used to update the task and update the document once done. Keeping the code block in a try block, if the task with the provided ID was not located, the "task not found" message would be displayed, if the task was successfully updated, "task updated successfully" would be displayed

The backend was set up using Express and had the following routes:

```
const express = require('express');
const router = express.Router();
const tasksCtrl = require('../../controllers/api/tasks')

router.get('/', tasksCtrl.getTasks);
router.post('/', tasksCtrl.createTask);
router.delete('/:id', tasksCtrl.removeTask);
router.put('/:id', tasksCtrl.editTask);

module.exports = router;
```

Similar to how I built the Task Page and New Task Page, the main App.jsx Page used the NavBar component:

**App.jsx**
```
import { useState } from 'react'
import './App.css';
import AuthPage from '../AuthPage/AuthPage';
import NewTaskPage from '../NewTaskPage/NewTaskPage';
import NavBar from '../../components/NavBar/NavBar';
import { getUser } from '../../utilities/users-service';
import TasksPage from '../TasksPage/TasksPage';

import { Routes, Route } from 'react-router-dom';

export default function App() {
  const [user, setUser] = useState(getUser())
  return (
    <>
      <header>
        {user ?
          <>
            <NavBar user={user} setUser={setUser} />
            <Routes>
              <Route path='task/new' element={<NewTaskPage />} />
              <Route path='tasks/' element={<TasksPage />} />
            </Routes>
          </>
          :
          <AuthPage setUser={setUser} />
        }
      </header>
    </>
  );
}
```

**NavBar.jsx Component**
```
import { Link } from "react-router-dom"
import './NavBar.css'
import * as userService from '../../utilities/users-service'

export default function NavBar({ user, setUser }) {
    function handleLogOut() {
        userService.logOut();
        setUser(null);
    }

    return (
        <nav className="navbar">
            <div className="nav-container">
                <Link to="/tasks" className="nav-link">
                    All {user.name}'s Tasks
                </Link>
                <span className="separator">|</span>
                <Link to="/task/new" className="nav-link">
                    Create A New Task
                </Link>
                <span className="separator">|</span>
                <p className="nav-greeting">Signed in as, {user.name}</p>
                <span className="separator">|</span>
                <Link to="" onClick={handleLogOut} className="nav-link logout">
                    Log Out
                </Link>
            </div>
        </nav>

    )
}
```
I incorporated this method of using components across my other pages to also build out my New Task and Tasks Pages (see code).

Some of the most enjoyable and rewarding parts of this project came from seeing how flexible React was to allowing me to create a visually pleasing and dynamic UI

For example:

```
 <div
            key={task._id}
            className={`task-card urgency-${task.urgency} ${task.status === 'completed' ? 'completed-task-card' : ''}`}
        >
```

```
/* Only apply urgency styles if the task is not completed */
:not(.completed-task-card).urgency-5 {
    border-color: red;
    background-color: rgba(255, 0, 0, 0.1);
}

:not(.completed-task-card).urgency-4 {
    border-color: darkorange;
    background-color: rgba(255, 140, 0, 0.1);
}

:not(.completed-task-card).urgency-3 {
    border-color: orange;
    background-color: rgba(255, 165, 0, 0.1);
}

:not(.completed-task-card).urgency-2 {
    border-color: yellow;
    background-color: rgba(255, 255, 0, 0.1);
}

:not(.completed-task-card).urgency-1 {
    border-color: lightyellow;
    background-color: rgba(255, 255, 224, 0.1);
}
```

This allowed me to specifically target tasks based on their urgency level and only if they were not completed, ensuring tasks marked as "in progress" or "not started" gained increasing intensity of colors(/colours depending on your country of origin) as they were marked as more and more urgent. However, tasks marked "completed" were unaffected

## Biggest Challenge

Implementing the drag and drop functionality. This was something I was very keen to implement once the MVP was reached, and fortunately, I completed the MVP within 2 days, and began writing out the code for drag and drop functionality, I was very keen to remove sorting logic for urgency and completion and allow a user to move an object from "in progress" to "completed" themselves, as this is a significant boost for the user in completing tasks (inspired by Trello)

Unfortunately, I was unable to make this code work before the deadline:

```
// import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

export default function TasksPage() {
    const [tasks, setTasks] = useState([]);
    const [editTask, setEditTask] = useState(null);

    // const handleDragEnd = (result) => {
    //     if (!result.destination) return;

    //     const reorderedTasks = Array.from(tasks);
    //     const [movedTask] = reorderedTasks.splice(result.source.index, 1);
    //     reorderedTasks.splice(result.destination.index, 0, movedTask);

    //     setTasks(reorderedTasks);
    // };
```

## Next Steps

- Improve UI/User Experience
- Implement the drag and drop functionality
- Introduce API that enhances the user experience (i.e. weather API if a user is planning an outdoor task)
- Allow friends to collaborate on tasks

## Wins

- Creating a responsive and interactive front end app using React
- Following on from project 2, creating an MVP and achieving it within a very short amount of time and being able to improve on it

## Mistakes / Bugs

- **Mobile responsivity** I was able to enable this for the edit tasks feature, but unfortunately, not the rest of the app yet
- The create task function has an error when creating a task on 1 urgency and not started

## Key Learnings

My final project taught me that no matter how simple an idea, a well styled and polished UI can truly make the world of difference. Even with limited time, React's wide array of front-end tools gave me a lot of options to improve the UI experience, on a desktop and mobile responsive level. Having now had more experience with React, my key takeaway would be researching as many clever ways to make the front-end more interactive whilst maintaining a clean and polished UI as possible, as even the most complicated app with poor UI/UX won't match up with the simplest app with a well designed and professional UI.

- Mobile responsiveness first
- Managing and utilising state and effect
- Implementing and utilising secure token-based user authentication and authorization
- Create a well polished product with a simple idea over an overly complicated app with limited styling and UI build

<!-- CONTRIBUTING -->

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<!-- CONTACT -->

## Contact

Rahul Raikhy - [LinkedIn](https://www.linkedin.com/in/rahul-raikhy-31ab62197//) - rlraikhy@gmail.com 

<!-- ACKNOWLEDGMENTS -->

## Acknowledgments

These resources helped me greatly in the completion of my project.

- [Img Shields](https://shields.io)
- [Trello](https://trello.com/)
- [EZ gif](https://ezgif.com/)
