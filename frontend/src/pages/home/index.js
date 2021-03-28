import React from "react";
import { Container, Button, Box } from "@material-ui/core";

export default function SignIn() {
  
    return (
        <Container>
                <Box display="flex" flexDirection="row-reverse">
                    <Box mx={3} mt={3}>
                    <Button variant="outlined"color="primary" >
                    Login
                    </Button>
                    </Box>
                    <Box mt={3}>
                    <Button variant="outlined" color="primary">
                    Sign Up
                    </Button>
                    </Box>
                </Box>
                
                <h1>Welcome to The VOTE</h1>

                

            <h2>Project Outline</h2>
            <p>The Virtual Organizational Training Experience is
                 focusing on large corporate organizations that are looking to improve their training experience. 
                 The training experience is envisioned to eventually become a platform where companies can create their own XR training modules however, due to the time constraints of Software Studio 3A/3B, 
                  we will focus on creating the webapp component of the product, and one specific training scenario (as an example) for now. </p>

            <p>Our team has developed an interactive and intuitive web application that has three levels of authentication:
                <ul>
                <li>Create an example of an immersive training experience module in XR </li>
                <li>Expandable for use as a platform to create training modules</li>
                <li>Create a webapp that links into the XR modules so users can access them and be assessed</li>
                </ul>
            </p>

            <h2>Users and Permissions</h2>
            
            <ul>
                <li>User Stories</li>
                <ul>
                    <li>
                    As a supervisor, I would like to be able to create viewable training modules so that employees can easily know what they need to learn. 
                    </li>
                    <li>
                    As a supervisor, I want to create tasks for employees so that I can instruct the employees for the things they need to learn. 
                    </li>
                    <li>
                    As a supervisor, I want to have our own company subdivision so that I can choose what features and create training modules specifically for our company.
                    </li>
                    <li>
                    As an employee, I want to have an engaging interaction with the XR training session so that I have a good and beneficial training experience.
                    </li>
                    <li>
                    As a supervisor, I want the system to have checkpoints so that I can mark the employee training.
                    </li>
                    <li>
                    As a supervisor, I want to have a grading system so that I can determine if the employee has passed the training.
                    </li>
                    <li>
                    As a user, I want to sign up and login so that I can have access and use the platform.
                    </li>
                    <li>
                    As a supervisor, I want to create my own XR training course without any technical expertise so that I can easily tailor the training experience to what I want. 
                    </li>
                    <li>
                    As a supervisor, I want to view an employee training session by video footage so that I can assess and review the employee. 
                    </li>
                    <li>
                    As an employee, I want to view my statistics so that I can review my training session. 
                    </li>
                    <li>
                    As an employee, I want the system to store my statistics from training sessions so that I can have information about my performance.
                    </li>
                    <li>
                    As an employee, I want to see my training completion progress so that I can see how well I am progressing with my training. 
                    </li>
                </ul>
            </ul>


            <h2>Storing Information</h2>
            <p>
            This system employs a database using MongoDB to store employee and supervisor information, including their credentials for authentication and training progress . 
            </p>

            <h2>Team Communication</h2>
            <p>
                All tasks were split and assigned to team members on Trello so that it was always transparent which tasks were being worked on, have been completed or still required additional progress.  
            </p>
            <p>
                Microsoft Teams was the main form of communication used for collaborating and holding meetings, while Facebook Messenger was used for general communication. 
                The code for this project can be found at our <a href="https://github.com/Agid-Kaharuba/XRT-Project">GitHub repository</a>.
            </p>

            <h2>Team Structure</h2>

            <h4>Unity Team</h4>
            <ul>
                <li>Agid Kaharuba: Leader, Unity Lead</li>
                <li>Andy Lee: Project Manager, Unity Developer</li>
                <li>Brendon Tong: Unity Developer, Backend</li>
            </ul>

            <h4>Design Team</h4>
            <ul>
                <li>Andrew Do: UI Design, Frontend Lead</li>
                <li>Vanisha Singh: Design Lead, General Developer</li>
                <li>Herrick Feng: UI Design, Frontend Lead</li>
            </ul>

            <h4>Frontend Team</h4>
            <ul>
                <li>Bryan Dinh: Frontend Developer</li>
                <li>Kelvin Luong: Frontend Developer</li>
            </ul>

            <h4>Backend Team</h4>
            <ul>
                <li>Mitchell Murphy: Backend Lead</li>
                <li>Calvin Dong: Backend Developer</li>
                <li>Lakshay Sharma: Backend Developer</li>
            </ul>

            </Container>);
}
