import React from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

function Home() {
  const navigate = useNavigate();

  const features = [
    {
      title: "User Accounts",
      description:
        "Students and instructors can create accounts and sign in securely.",
    },
    {
      title: "Lesson Videos",
      description:
        "Users can access educational videos uploaded by instructors.",
    },
    {
      title: "Subjects & Topics",
      description:
        "Lessons are organized by subject and topic for easy learning.",
    },
    {
      title: "Comments & Questions",
      description: "Students can ask questions and leave comments on lessons.",
    },
    {
      title: "Ratings",
      description: "Users can rate how helpful and informative each lesson is.",
    },
    {
      title: "Search",
      description:
        "Find videos by subject, instructor, upload date, or rating.",
    },
  ];

  return (
    <div className="page">
      <section className="hero">
        <div className="hero-content">
          <p className="tag">Educational Learning Platform</p>
          <h1>Educational Video Database</h1>
          <p className="hero-text">
            A simple website where students and instructors can share, organize,
            and explore educational video lessons.
          </p>
          <p className="members">Group Members: Hilton, Lam, Khai, Poe</p>

          <div className="button-row">
            <button className="primary-btn" onClick={() => navigate("/signup")}>
              Get Started
            </button>
            <button
              className="secondary-btn"
              onClick={() => navigate("/login")}
            >
              Log In
            </button>
          </div>
        </div>
      </section>

      <section className="section">
        <h2>About Our Project</h2>
        <p className="section-text">
          This project is an educational database website where users create an
          account to access learning videos uploaded by instructors. Videos are
          organized by subject and topic. Users can be students or instructors,
          comment on lessons, ask questions, and rate how informative each
          lesson is.
        </p>
      </section>

      <section className="section">
        <h2>Main Features</h2>
        <div className="card-grid">
          {features.map((feature, index) => (
            <div className="card" key={index}>
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <h2>Who Uses This Website?</h2>
        <div className="two-column">
          <div className="card">
            <h3>Students</h3>
            <p>
              Watch lessons, search videos, ask questions, comment, and rate
              content.
            </p>
          </div>
          <div className="card">
            <h3>Instructors</h3>
            <p>
              Upload videos, organize lessons, and support students through
              interaction.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
