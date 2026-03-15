import React from "react";
import "../App.css";

function Home() {
  return (
    <div className="home-container">
      <header className="hero-section">
        <h1>Educational Database Website</h1>
        <p className="subtitle">
          A simple platform for students and instructors to share, organize,
          and explore learning videos.
        </p>
        <p className="group-members">
          Group Members: Hilton, Lam, Khai, Poe
        </p>
      </header>

      <section className="about-section">
        <h2>About Our Project</h2>
        <p>
          This website is designed to help students learn through videos created
          by instructors. Users can create accounts, browse lessons by subject,
          ask questions, comment on lessons, and rate how helpful each lesson is.
        </p>
      </section>

      <section className="features-section">
        <h2>Main Features</h2>
        <div className="features-grid">
          <div className="feature-card">
            <h3>User Accounts</h3>
            <p>Students and instructors can sign up, log in, and manage profiles.</p>
          </div>

          <div className="feature-card">
            <h3>Lesson Videos</h3>
            <p>Store learning videos with title, description, upload date, and URL.</p>
          </div>

          <div className="feature-card">
            <h3>Subjects & Topics</h3>
            <p>Organize videos into different subjects and related topics.</p>
          </div>

          <div className="feature-card">
            <h3>Comments & Questions</h3>
            <p>Users can interact by asking questions and leaving comments.</p>
          </div>

          <div className="feature-card">
            <h3>Ratings</h3>
            <p>Students can rate lessons based on how informative they are.</p>
          </div>

          <div className="feature-card">
            <h3>Search</h3>
            <p>Find lessons by subject, instructor, upload date, or rating.</p>
          </div>
        </div>
      </section>

      <section className="roles-section">
        <h2>Who Uses This Website?</h2>
        <div className="roles-grid">
          <div className="role-card">
            <h3>Students</h3>
            <p>Watch lessons, ask questions, comment, and rate videos.</p>
          </div>

          <div className="role-card">
            <h3>Instructors</h3>
            <p>Upload educational videos and help students learn better.</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;
