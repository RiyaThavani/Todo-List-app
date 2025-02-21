

const AboutPage = () => {
 
  return (
    <>
   
    <div className="about-container">
      <div className="about">
        <div className="about-text" >
          <h1>About ToDo</h1>
          <div className="row"></div>
        </div>
        <div className="pera" >
          A to-do list is a list of items that
          <span className="red"> need to be completed</span>
          . The items on the list can range from simple activities like replying
          to an email, to more complex tasks like creating project briefs.
        </div>
        <div className= "pera" >
          The items on a to-do list are usually
          <span className="red"> action-oriented</span>, such as “Schedule a
          meet with the R&D team” or “Call back customer X.” Some lists include
          more abstract goals, such as “improve your time management skills” or
          “learn how to use a new software program.”
        </div>
      </div>
    </div>
    </>
  );
};

export default AboutPage;
