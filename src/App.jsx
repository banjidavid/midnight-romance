
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, MailOpen, RotateCcw, CalendarDays, MapPin } from "lucide-react";
import confetti from "canvas-confetti";
import "./App.css";

const dateIdeas = {
  "Romantic dinner": [
    { name: "ALDO'S Restaurant", area: "Jabi, Abuja" },
    { name: "Zaitoun Rooftop Café", area: "Wuse 2, Abuja" },
    { name: "Tar Tar", area: "Wuse 2, Abuja" },
  ],
  "Picnic date": [
    { name: "Millennium Park", area: "Maitama, Abuja" },
    { name: "Jabi Lake Waterfront", area: "Jabi, Abuja" },
  ],
  "Coffee & dessert": [
    { name: "Café de vie", area: "Maitama, Abuja" },
    { name: "Taj Café", area: "Wuse 2, Abuja" },
  ],
  "Fun & adventure": [
    { name: "Trukadero Bowling", area: "Wuse 2, Abuja" },
    { name: "Jabi Lake Mall", area: "Jabi, Abuja" },
  ],
};

function App() {
  const [opened, setOpened] = useState(false);
  const [envelopeOpening, setEnvelopeOpening] = useState(false);
  const [accepted, setAccepted] = useState(false);
  const [date, setDate] = useState("");
  const [dateConfirmed, setDateConfirmed] = useState(false);
  const [dateType, setDateType] = useState("");
  const [dateSpot, setDateSpot] = useState(null);
  const [noPosition, setNoPosition] = useState({ x: 0, y: 0 });
  const [attempts, setAttempts] = useState(0);

  const messages = [
    "Are you sure? 🥺",
    "Think again!",
    "That wasn't the right button 😂",
    "Please reconsider ❤️",
    "You can't catch me!",
    "Just press YES already 😭",
  ];

  const openEnvelope = () => {
    if (envelopeOpening) return;

    setEnvelopeOpening(true);

    setTimeout(() => {
      setOpened(true);
    }, 1200);
  };

  const moveNoButton = () => {
    const randomX = Math.floor(Math.random() * 300) - 150;
    const randomY = Math.floor(Math.random() * 200) - 100;

    setNoPosition({ x: randomX, y: randomY });
    setAttempts((prev) => prev + 1);
  };

  const handleYes = () => {
    setAccepted(true);

    confetti({
      particleCount: 180,
      spread: 110,
      origin: { y: 0.6 },
      colors: ["#a66b72", "#d8c7b1", "#ffffff", "#792d43"],
    });

    setTimeout(() => {
      confetti({
        particleCount: 100,
        spread: 120,
        origin: { y: 0.5 },
        colors: ["#a66b72", "#ffffff", "#792d43"],
      });
    }, 500);
  };

  const handleDateType = (type) => {
    setDateType(type);

    const suggestions = dateIdeas[type];
    const randomSpot =
      suggestions[Math.floor(Math.random() * suggestions.length)];

    setDateSpot(randomSpot);
  };

  const formattedDate = date
    ? new Date(`${date}T00:00:00`).toLocaleDateString("en-NG", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    : "";

  const restart = () => {
    setOpened(false);
    setEnvelopeOpening(false);
    setAccepted(false);
    setDate("");
    setDateConfirmed(false);
    setDateType("");
    setDateSpot(null);
    setAttempts(0);
    setNoPosition({ x: 0, y: 0 });
  };

  return (
    <div className="app">
      <div className="glow glow-one"></div>
      <div className="glow glow-two"></div>

      <div className="content">

        <div className="top-label">
          <Heart size={14} />
          <span>A LITTLE SOMETHING FOR YOU</span>
        </div>

        <AnimatePresence mode="wait">

          {!opened ? (

            <motion.div
              className="welcome"
              key="welcome"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <p className="eyebrow">A LETTER FOR YOU</p>

              <h1>
                Something special
                <br />
                <span>awaits inside.</span>
              </h1>

              <p className="description">
                I've got something to tell you.
                <br />
                Take a moment and open this.
              </p>

              <motion.div
                className={`envelope ${envelopeOpening ? "is-open" : ""}`}
                animate={envelopeOpening ? { y: -12 } : { y: [0, -7, 0] }}
                transition={
                  envelopeOpening
                    ? { duration: 0.7 }
                    : { duration: 3, repeat: Infinity, ease: "easeInOut" }
                }
              >
                <div className="envelope-letter">
                  <Heart size={25} fill="currentColor" />
                  <span>For you, with love</span>
                </div>

                <div className="envelope-flap"></div>
                <div className="envelope-front"></div>

                <div className="envelope-seal">
                  <Heart size={19} fill="currentColor" />
                </div>
              </motion.div>

              <button
                className="open-button"
                onClick={openEnvelope}
                disabled={envelopeOpening}
              >
                <MailOpen size={18} />
                {envelopeOpening ? "Opening your letter..." : "Open your letter"}
              </button>

              <p className="hint">TAKE A MOMENT · NO RUSH</p>
            </motion.div>

          ) : !accepted ? (

            <motion.div
              className="welcome question"
              key="question"
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Heart size={35} className="main-heart" />

              <p className="eyebrow">HERE GOES NOTHING...</p>

              <h1>
                Will you be
                <br />
                <span>my baby?</span>
              </h1>

              <p className="description">
                {attempts === 0
                  ? "I really hope your answer is yes. ❤️"
                  : messages[(attempts - 1) % messages.length]}
              </p>

              <div className="answer-buttons">
                <button className="yes-button" onClick={handleYes}>
                  YES ❤️
                </button>

                <motion.button
                  className="no-button"
                  animate={noPosition}
                  transition={{
                    type: "spring",
                    stiffness: 400,
                    damping: 15,
                  }}
                  onMouseEnter={moveNoButton}
                  onClick={moveNoButton}
                  onTouchStart={(e) => {
                    e.preventDefault();
                    moveNoButton();
                  }}
                >
                  NO
                </motion.button>
              </div>
            </motion.div>

          ) : !dateConfirmed ? (

            <motion.div
              className="welcome celebration"
              key="celebration"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
            >
              <motion.div
                className="celebration-heart"
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 10, -10, 0],
                }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <Heart size={55} fill="currentColor" />
              </motion.div>

              <p className="eyebrow">
                THIS IS THE BEGINNING OF SOMETHING BEAUTIFUL
              </p>

              <h1>
                You just made
                <br />
                <span>me so happy!</span>
              </h1>

              <p className="description">
                I was hoping you'd say yes. ❤️
                <br />
                I can't wait to make beautiful memories with you.
              </p>

              <div className="final-message">
                <span>SO...</span>
                <h2>When am I taking you out? 🥰</h2>
                <p>Pick a date. I'll make it special.</p>

                <div className="date-input-wrapper">
                  <CalendarDays size={18} />

                  <input
                    type="date"
                    value={date}
                    min={new Date().toLocaleDateString("en-CA")}
                    onChange={(e) => setDate(e.target.value)}
                  />
                </div>

                <button
                  className="open-button date-continue"
                  disabled={!date}
                  onClick={() => setDateConfirmed(true)}
                >
                  Let's plan our date ❤️
                </button>
              </div>
            </motion.div>

          ) : !dateType ? (

            <motion.div
              className="welcome date-selection"
              key="date-selection"
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <p className="eyebrow">NOW FOR THE FUN PART</p>

              <h1>
                What kind of
                <br />
                <span>date are we having?</span>
              </h1>

              <p className="description">
                Choose the kind of experience you'd love.
              </p>

              <div className="date-options">
                {Object.keys(dateIdeas).map((type) => (
                  <button
                    key={type}
                    className="date-option"
                    onClick={() => handleDateType(type)}
                  >
                    <Heart size={17} />
                    <span>{type}</span>
                    <span className="option-arrow">→</span>
                  </button>
                ))}
              </div>

              <p className="hint">
                YOUR WISH IS MY COMMAND ❤️
              </p>
            </motion.div>

          ) : (

            <motion.div
              className="welcome date-result"
              key="date-result"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7 }}
            >
              <div className="celebration-heart">
                <Heart size={45} fill="currentColor" />
              </div>

              <p className="eyebrow">IT'S A DATE THEN!</p>

              <h1>
                Our little
                <br />
                <span>adventure awaits.</span>
              </h1>

              <div className="date-card">
                <div className="date-detail">
                  <CalendarDays size={19} />
                  <div>
                    <small>OUR DATE</small>
                    <p>{formattedDate}</p>
                  </div>
                </div>

                <div className="date-divider"></div>

                <div className="date-detail">
                  <Heart size={19} />
                  <div>
                    <small>THE EXPERIENCE</small>
                    <p>{dateType}</p>
                  </div>
                </div>

                <div className="date-divider"></div>

                <div className="date-detail">
                  <MapPin size={19} />
                  <div>
                    <small>YOUR ABUJA DATE SPOT</small>
                    <p>{dateSpot?.name}</p>
                    <span>{dateSpot?.area}</span>
                  </div>
                </div>
              </div>

              <p className="description">
                Sounds like a plan. See you there! ❤️
              </p>

              <button className="restart-button" onClick={restart}>
                <RotateCcw size={15} />
                Experience again
              </button>
            </motion.div>

          )}

        </AnimatePresence>

        <footer>
          MADE WITH <Heart size={12} fill="currentColor" />
          AND A LITTLE COURAGE
        </footer>

      </div>
    </div>
  );
}

export default App;
