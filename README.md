A full-stack application for CRM. 
After a phone conversation, it makes a summary and a list of actions for follow-up.

## Table of Contents
- [About the App](#about-the-app)
    - Features
- [Architecture](#architecture)
    - Services
- [Technical Stacks](#technical-stacks)
    - Backend
    - Frontend
    - Database
    - AWS Cloud Services

# About the App
## Features
- **Record Simulated Phone Conversations**: Allows users to record simulated phone conversations directly on their computers.
- **Save Audio Files on AWS S3**: Stores recorded audio files securely in an AWS S3 bucket.
- **Transcribe Audio to Text**: Utilizes AWS Transcribe to convert audio recordings into text format.
- **Summarize Text and Generate Actions**: Uses Claude AI to summarize the transcribed text and generate a list of actionable items.
- **Send Summaries and Actions to Users**: Delivers the generated summaries and action lists to the users.
- **Query Summary History of Clients**: Provides a feature to query and review the summary history of clients.
- **Streamlined Operations**: Simplifies operations such as adding new summaries to existing or new clients with a single button click.

# Architecture
![image](https://github.com/Xujia118/Voice2Task/assets/116283847/f609745a-b512-4de0-94fd-7bb944a9e7e3)

# Technical Stacks
### Backend - Services
- **Node.js**: Utilized for server-side scripting and handling backend logic.
- **Express.js**: Employed to create a RESTful API for managing requests and routing.
- **AWS SDK**: Integrated for interaction with various AWS services, such as S3 and Transcribe.
- **Claude AI**: Used to generate summaries and action items from transcribed text.

### Database
- **MySQL**: Utilized MySQL for the database.

### Frontend
- **React**: Developed a dynamic and responsive user interface for an intuitive user experience.
- **MUI (Material-UI)**: Designed the UI with Material-UI for a consistent and attractive design.

### AWS Cloud Services
- **AWS S3**: Used for highly durable and available storage of audio files.
- **AWS Transcribe**: Employed for accurate and efficient speech-to-text conversion.
- **AWS RDS MySQL**: Utilized for a highly available and durable relational database.

## Further Developments
- Capture internal audio in computer regardless software source
- Expand functions, for example, to give CRM managers a way to visualize team performance
