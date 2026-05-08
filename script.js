/* AUTH REMOVED - open access site (login/logout removed) */

// Previously the site required authentication using localStorage.
// That logic was removed so the library is open to all visitors.

/* SEARCH, FILTER, AND CLICKABLE RESULTS */

const searchInput = document.getElementById("searchInput");
const searchResults = document.getElementById("searchResults");
const bookCards = document.querySelectorAll(".book-card");
const filterButtons = document.querySelectorAll(".filter-btn");

let selectedCategory = "All";

if (searchInput) {
  searchInput.addEventListener("input", () => {
    filterBooks();
    showSearchResults();
  });
}

filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    filterButtons.forEach(btn => btn.classList.remove("active"));
    button.classList.add("active");

    selectedCategory = button.dataset.category;
    filterBooks();
    showSearchResults();
  });
});

function filterBooks() {
  if (!searchInput) return;

  const searchText = searchInput.value.toLowerCase().trim();

  bookCards.forEach(card => {
    const title = card.dataset.title.toLowerCase();
    const category = card.dataset.category.toLowerCase();
    const license = card.dataset.license.toLowerCase();
    const description = card.querySelector("p").textContent.toLowerCase();

    const matchesSearch =
      title.includes(searchText) ||
      category.includes(searchText) ||
      license.includes(searchText) ||
      description.includes(searchText);

    const matchesCategory =
      selectedCategory === "All" ||
      card.dataset.category === selectedCategory;

    card.style.display =
      matchesSearch && matchesCategory ? "block" : "none";
  });
}

function showSearchResults() {
  if (!searchInput || !searchResults) return;

  const searchText = searchInput.value.toLowerCase().trim();

  searchResults.innerHTML = "";

  if (searchText === "") {
    searchResults.style.display = "none";
    return;
  }

  const matches = Array.from(bookCards).filter(card => {
    const title = card.dataset.title.toLowerCase();
    const category = card.dataset.category.toLowerCase();
    const license = card.dataset.license.toLowerCase();
    const description = card.querySelector("p").textContent.toLowerCase();

    const matchesSearch =
      title.includes(searchText) ||
      category.includes(searchText) ||
      license.includes(searchText) ||
      description.includes(searchText);

    const matchesCategory =
      selectedCategory === "All" ||
      card.dataset.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  if (matches.length === 0) {
    searchResults.innerHTML = `
      <div class="no-result">
        No available book found.
      </div>
    `;
    searchResults.style.display = "block";
    return;
  }

  matches.forEach(card => {
    const title = card.dataset.title;
    const category = card.dataset.category;
    const link = card.querySelector(".actions a").getAttribute("href");

    const resultItem = document.createElement("div");
    resultItem.className = "search-result-item";

    resultItem.innerHTML = `
      <h4>${title}</h4>
      <p>${category} · Click to open this material</p>
    `;

    resultItem.addEventListener("click", () => {
      window.location.href = link;
    });

    searchResults.appendChild(resultItem);
  });

  searchResults.style.display = "block";
}

/* DARK / LIGHT MODE */

const themeToggle = document.getElementById("themeToggle");

if (themeToggle) {
  const savedTheme = localStorage.getItem("theme");

  if (savedTheme === "dark") {
    document.body.classList.add("dark");
    themeToggle.textContent = "☀ Light Mode";
  }

  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {
      themeToggle.textContent = "☀ Light Mode";
      localStorage.setItem("theme", "dark");
    } else {
      themeToggle.textContent = "🌙 Dark Mode";
      localStorage.setItem("theme", "light");
    }
  });
}

/* READER PAGE DATA */

const materials = {
  software: {
    title: "Types of Software",
    subtitle: "System, Application, Programming, DevOps, and Embedded Software",
    file: "books/types-of-software.pdf",
    license: "License: Teacher-Created Material",
    summary:
      "This material explains the different types of software used in digital systems. It discusses system software, application software, programming software, DevOps and automation software, and embedded software.",
    topics: [
      "System Software: operating systems, device drivers, and utility software",
      "Application Software: productivity tools, multimedia software, web browsers, and communication apps",
      "Programming Software: code editors, compilers, interpreters, and debuggers",
      "DevOps and Automation Software: CI/CD tools, monitoring tools, and containerization tools",
      "Embedded Software: firmware and real-time operating systems"
    ],
    videos: [
      "https://www.youtube.com/embed/BTB86HeZVwk"
    ]
  },

  sdlc: {
    title: "Types of SDLC",
    subtitle: "Software Development Life Cycle Models",
    file: "books/types-of-sdlc.pdf",
    license: "License: Teacher-Created Material",
    summary:
      "This material explains the major types of Software Development Life Cycle or SDLC models. It includes Waterfall, Agile, Spiral, Prototype, Incremental, RAD, V-Model, DevOps, and Big Bang. Each model has a different approach depending on the project needs, risks, timeline, and flexibility.",
    topics: [
      "Waterfall Model: a step-by-step model with fixed phases",
      "Agile Model: an iterative and flexible model based on feedback",
      "Spiral Model: a risk-driven model for complex projects",
      "Prototype Model: uses sample versions to clarify requirements",
      "Incremental Model: builds the system in small usable parts",
      "RAD Model: focuses on fast development and user feedback",
      "V-Model: connects each development phase with a testing phase",
      "DevOps Model: combines development and operations for continuous delivery",
      "Big Bang Model: starts coding with minimal planning but has higher risk"
    ],
    videos: [
      "https://www.youtube.com/embed/Fi3_BjVzpqk"
    ]
  },

  firebase: {
    title: "Google Firebase",
    subtitle: "Cloud-Based Backend Platform for Web and Mobile Applications",
    file: "books/google-firebase.pdf",
    license: "License: Teacher-Created Material",
    summary:
      "This material introduces Google Firebase as a cloud-based backend-as-a-service platform that helps developers build, manage, and scale mobile and web applications. It provides ready-made backend tools such as authentication, databases, storage, hosting, cloud functions, analytics, and messaging.",
    topics: [
      "Firebase as a Backend-as-a-Service platform",
      "Cloud Firestore for storing and syncing data",
      "Firebase Authentication for secure user sign-in",
      "Cloud Storage for user-generated content",
      "Firebase Hosting for fast and secure web hosting",
      "Cloud Functions for running backend code without managing servers"
    ],
    videos: [
      "https://www.youtube.com/embed/hLBnTCPRDB0",
      "https://www.youtube.com/embed/TStttJRAPhE"
    ]
  },

  firebaseauth: {
    title: "Creating Authenticated Log In & Sign Up Page Using Firebase",
    subtitle: "Firebase Authentication with Android Studio",
    file: "books/firebase-auth-login-signup.pdf",
    license: "License: Teacher-Created Material",
    summary:
      "This material provides a step-by-step guide for creating an authenticated login and sign-up page using Firebase and Android Studio. It explains how to create an Android Studio project, connect it to Firebase, register the app, download the configuration file, add the Firebase SDK, and enable authentication.",
    topics: [
      "Creating a project in Android Studio",
      "Connecting the project to Firebase Console",
      "Adding Firebase to an Android app",
      "Using package name and SHA-1 key",
      "Downloading and placing the google-services.json file",
      "Adding Firebase SDK dependencies",
      "Enabling Firebase Authentication"
    ],
    videos: [
      "https://www.youtube.com/embed/sYh8or9zq0M"
    ]
  },

  appdev: {
    title: "Introduction to App Development",
    subtitle: "Application Development and Emerging Technologies",
    file: "books/intro-to-app-development.pdf",
    license: "License: Teacher-Created Material",
    summary:
      "This material introduces application development and emerging technologies. It discusses what software is, the major classes of software, basic software principles, and the laws of software evolution. It also includes case analysis activities about how software systems change, grow, and require maintenance over time.",
    topics: [
      "Meaning of software and its role in accomplishing tasks",
      "System software, application software, and programming software",
      "Basic principles of software",
      "Continuing change and increasing complexity",
      "Conservation of familiarity and continuing growth",
      "Reducing quality, feedback system, self-regulation, and organizational stability",
      "Case analysis on software evolution"
    ],
    videos: [
      "https://www.youtube.com/embed/sYh8or9zq0M"
    ]
  },

  mit: {
    title: "MIT App Inventor",
    subtitle: "Blocks-Based Mobile App Development",
    file: "books/mit-app-inventor.pdf",
    license: "License: Teacher-Created Material",
    summary:
      "This material introduces MIT App Inventor as a free, cloud-based, visual programming environment for creating mobile applications. It uses blocks-based coding to help beginners build apps easily. The material also includes a sample Tic-Tac-Toe game tutorial that explains screen design, global variables, game routines, winner checking, button programming, testing, and APK installation.",
    topics: [
      "MIT App Inventor history and purpose",
      "Blocks-based coding for beginners",
      "Cloud-based and free app development",
      "Live testing using the MIT AI2 Companion app",
      "Tic-Tac-Toe game screen design",
      "Global variables and new game routine",
      "Checking for winner and programming playable buttons",
      "Testing and downloading the APK file"
    ],
    videos: [
      "https://www.youtube.com/embed/drk91OoXyYU",
      "https://www.youtube.com/embed/kGdcbYSvhnY"
    ]
  },

  aiappdev: {
    title: "AI Application Development",
    subtitle: "Artificial Intelligence in Modern Software Development",
    file: "books/ai-application-development.pdf",
    license: "License: Teacher-Created Material",
    summary:
      "This material explains how Artificial Intelligence is used in modern software development. It discusses AI coding assistants, debugging, testing automation, refactoring, code explanation, documentation generation, UI/UX design support, and responsible AI practices. The lesson also explains machine learning, natural language processing, generative AI, and agentic AI technologies used in application development.",
    topics: [
      "AI-assisted code generation",
      "Automated debugging and testing",
      "AI-powered refactoring and documentation",
      "Code explanation and summarization",
      "UI/UX design assistance",
      "Machine learning in development",
      "Natural language processing",
      "Generative AI and agentic AI",
      "Responsible AI and data privacy",
      "Mitigating model bias and explainability"
    ],
    videos: [
      "https://www.youtube.com/embed/XPXKU-zAxAQ"
    ]
  },

  crossplatform: {
    title: "Cross Platform Mobile Application Development",
    subtitle: "Developing Apps for Multiple Platforms",
    file: "books/cross-platform-application-development.pdf",
    license: "License: Teacher-Created Material",
    summary:
      "This material introduces Cross Platform Mobile Application Development, where developers create one application compatible with multiple operating systems such as Android and iOS. It explains the need for cross-platform development, popular frameworks like React Native, Flutter, Xamarin, and Ionic, and discusses the advantages and disadvantages of this approach.",
    topics: [
      "Difference between Android and iOS development",
      "Meaning of Cross-Platform Development",
      "Need for cross-platform solutions",
      "React Native framework",
      "Flutter framework",
      "Xamarin framework",
      "Ionic framework",
      "Advantages of code reusability and faster development",
      "Uniform design and easier maintenance",
      "Performance and design limitations"
    ],
    videos: [
      "https://www.youtube.com/embed/dWhZKlgBMPc"
    ]
  }
};

/* LOAD READER CONTENT */

const readerTitle = document.getElementById("readerTitle");
const readerSubtitle = document.getElementById("readerSubtitle");
const readerSummary = document.getElementById("readerSummary");
const readerTopics = document.getElementById("readerTopics");
const readerLicense = document.getElementById("readerLicense");
const pdfViewer = document.getElementById("pdfViewer");
const downloadBtn = document.getElementById("downloadBtn");
const videoGrid = document.getElementById("videoGrid");

if (readerTitle) {
  const params = new URLSearchParams(window.location.search);
  const topic = params.get("topic");

  const selectedMaterial = materials[topic] || materials.software;

  readerTitle.textContent = selectedMaterial.title;
  readerSubtitle.textContent = selectedMaterial.subtitle;
  readerSummary.textContent = selectedMaterial.summary;
  readerLicense.textContent = selectedMaterial.license;

  pdfViewer.src = selectedMaterial.file;
  downloadBtn.href = selectedMaterial.file;

  readerTopics.innerHTML = "";

  selectedMaterial.topics.forEach(item => {
    const li = document.createElement("li");
    li.textContent = item;
    readerTopics.appendChild(li);
  });

  if (videoGrid && selectedMaterial.videos) {
    videoGrid.innerHTML = "";

    selectedMaterial.videos.forEach(video => {
      const videoCard = document.createElement("div");
      videoCard.className = "video-card";

     videoCard.innerHTML = `

  <div class="video-link-card">

    <div class="video-icon">
      ▶
    </div>

    <div class="video-info">

      <h3>Watch Video Lesson</h3>

      <p>
        Open this learning resource on YouTube to better understand the topic.
      </p>

      <a
        class="watch-video-btn"
        href="${video.replace('/embed/', '/watch?v=')}"
        target="_blank">

        Watch on YouTube

      </a>

    </div>

  </div>

`;

      videoGrid.appendChild(videoCard);
    });
  }
}

/* HELP BUTTON */

const helpBtn = document.getElementById("helpBtn");
const helpBox = document.getElementById("helpBox");
const closeHelp = document.getElementById("closeHelp");

if (helpBtn) {
  helpBtn.addEventListener("click", () => {
    helpBox.classList.toggle("show");
  });
}

if (closeHelp) {
  closeHelp.addEventListener("click", () => {
    helpBox.classList.remove("show");
  });
}

/* TOPIC QUIZZES */

const quizzes = {
  software: [
    { q: "What type of software manages hardware and system resources?", a: "System Software", options: ["Application Software", "System Software", "Multimedia Software"] },
    { q: "Which of the following is an example of an operating system?", a: "Windows", options: ["Google Docs", "Windows", "Photoshop"] },
    { q: "What software helps users perform specific tasks?", a: "Application Software", options: ["Application Software", "Device Driver", "Firmware"] },
    { q: "Which software is used by developers to write code?", a: "Programming Software", options: ["Programming Software", "Utility Software", "Communication Software"] },
    { q: "What software helps hardware communicate with the operating system?", a: "Device Driver", options: ["Spreadsheet", "Device Driver", "Browser"] },
    { q: "Which tool helps find and fix errors in code?", a: "Debugger", options: ["Debugger", "Antivirus", "File Compressor"] },
    { q: "What software is built into devices like routers and washing machines?", a: "Embedded Software", options: ["Embedded Software", "Presentation Software", "Web Browser"] },
    { q: "Which software helps protect a computer from viruses?", a: "Utility Software", options: ["Utility Software", "Game Software", "Compiler"] },
    { q: "Which is an example of application software?", a: "Microsoft Word", options: ["Microsoft Word", "BIOS", "Device Driver"] },
    { q: "DevOps tools are mainly used for what purpose?", a: "Automation and deployment", options: ["Photo editing", "Automation and deployment", "Typing documents"] }
  ],

  sdlc: [
    { q: "What does SDLC stand for?", a: "Software Development Life Cycle", options: ["System Design Logic Code", "Software Development Life Cycle", "Software Data Link Control"] },
    { q: "Which SDLC model follows a step-by-step sequence?", a: "Waterfall", options: ["Waterfall", "Agile", "Big Bang"] },
    { q: "Which model is flexible and uses iterations?", a: "Agile", options: ["Agile", "V-Model", "Waterfall"] },
    { q: "Which model focuses heavily on risk analysis?", a: "Spiral", options: ["Spiral", "Prototype", "RAD"] },
    { q: "Which model creates a sample version before the final system?", a: "Prototype", options: ["Prototype", "DevOps", "Big Bang"] },
    { q: "Which model builds the system part by part?", a: "Incremental", options: ["Incremental", "Waterfall", "V-Model"] },
    { q: "Which SDLC model connects development phases with testing phases?", a: "V-Model", options: ["V-Model", "RAD", "Big Bang"] },
    { q: "Which model combines development and operations?", a: "DevOps", options: ["DevOps", "Prototype", "Waterfall"] },
    { q: "Which model has minimal planning and high risk?", a: "Big Bang", options: ["Big Bang", "Agile", "Spiral"] },
    { q: "RAD focuses on what?", a: "Fast development and user feedback", options: ["No planning", "Fast development and user feedback", "Strict sequence"] }
  ],

  firebase: [
    { q: "What is Firebase?", a: "Backend-as-a-Service platform", options: ["Design tool", "Backend-as-a-Service platform", "Operating system"] },
    { q: "Who owns Firebase?", a: "Google", options: ["Microsoft", "Google", "Apple"] },
    { q: "Which Firebase service stores and syncs data?", a: "Cloud Firestore", options: ["Cloud Firestore", "Photoshop", "Excel"] },
    { q: "Which Firebase service handles login and sign-in?", a: "Firebase Authentication", options: ["Firebase Hosting", "Firebase Authentication", "Cloud Storage"] },
    { q: "Which Firebase service stores photos and videos?", a: "Cloud Storage", options: ["Cloud Storage", "Firestore Rules", "Analytics"] },
    { q: "Firebase Hosting is used for what?", a: "Hosting web apps", options: ["Hosting web apps", "Editing images", "Writing essays"] },
    { q: "Cloud Functions allow developers to run what?", a: "Server-side code", options: ["Server-side code", "Games only", "PDF files"] },
    { q: "Firebase helps developers avoid managing what?", a: "Backend infrastructure", options: ["Fonts", "Backend infrastructure", "Screen size"] },
    { q: "Firebase supports Android and iOS.", a: "True", options: ["True", "False", "Not sure"] },
    { q: "Firebase is useful for building what?", a: "Mobile and web apps", options: ["Mobile and web apps", "Only documents", "Only videos"] }
  ],

  firebaseauth: [
    { q: "Firebase Authentication is mainly used for what?", a: "User login and sign-up", options: ["User login and sign-up", "Photo editing", "Video rendering"] },
    { q: "What IDE is used in the lesson?", a: "Android Studio", options: ["Android Studio", "Photoshop", "MS Word"] },
    { q: "What file is downloaded from Firebase and added to the app folder?", a: "google-services.json", options: ["index.html", "google-services.json", "style.css"] },
    { q: "What key is needed when registering an Android app in Firebase?", a: "SHA-1", options: ["QR Code", "SHA-1", "PDF key"] },
    { q: "Where do you create a Firebase project?", a: "Firebase Console", options: ["Firebase Console", "Google Drive", "YouTube Studio"] },
    { q: "What should be enabled for login features?", a: "Authentication", options: ["Authentication", "Bluetooth", "Camera"] },
    { q: "Firebase SDK is added to what part of the project?", a: "Gradle files", options: ["Gradle files", "Image folder", "Downloads only"] },
    { q: "Android package name is needed when adding Firebase to an app.", a: "True", options: ["True", "False", "Not sure"] },
    { q: "Sync Now is clicked after adding dependencies.", a: "True", options: ["True", "False", "Not sure"] },
    { q: "The lesson focuses on authenticated login and sign-up.", a: "True", options: ["True", "False", "Not sure"] }
  ],

  appdev: [
    { q: "Software gives instructions to what?", a: "Hardware", options: ["Hardware", "Paper", "Chairs"] },
    { q: "Which software helps run the computer system?", a: "System Software", options: ["System Software", "Game Software", "Movie Software"] },
    { q: "Which software helps users do tasks like browsing or typing?", a: "Application Software", options: ["Application Software", "Device Driver", "BIOS"] },
    { q: "Which software helps developers write programs?", a: "Programming Software", options: ["Programming Software", "Music Player", "Antivirus"] },
    { q: "A software system must adapt to real-world changes. What law is this?", a: "Continuing Change", options: ["Continuing Change", "Reducing Quality", "Self Regulation"] },
    { q: "When software becomes harder to manage as it grows, this refers to what?", a: "Increasing Complexity", options: ["Increasing Complexity", "Uniform Design", "Fast Coding"] },
    { q: "Software quality may decline if not maintained.", a: "True", options: ["True", "False", "Not sure"] },
    { q: "Feedback helps improve software systems.", a: "True", options: ["True", "False", "Not sure"] },
    { q: "Software evolution means software can change over time.", a: "True", options: ["True", "False", "Not sure"] },
    { q: "Maintenance is important for software systems.", a: "True", options: ["True", "False", "Not sure"] }
  ],

  mit: [
    { q: "MIT App Inventor uses what type of coding?", a: "Blocks-based coding", options: ["Blocks-based coding", "Only Java", "Only Python"] },
    { q: "MIT App Inventor is mainly beginner-friendly.", a: "True", options: ["True", "False", "Not sure"] },
    { q: "What app is used for live testing?", a: "MIT AI2 Companion", options: ["MIT AI2 Companion", "TikTok", "Google Meet"] },
    { q: "MIT App Inventor is accessed through what?", a: "Web browser", options: ["Web browser", "Calculator", "Notepad only"] },
    { q: "The sample game in the material is what?", a: "Tic-Tac-Toe", options: ["Tic-Tac-Toe", "Chess", "Snake"] },
    { q: "What component is used to show pop-up messages?", a: "Notifier", options: ["Notifier", "Button", "TextBox"] },
    { q: "The Tic-Tac-Toe game uses how many playable buttons?", a: "Nine", options: ["Nine", "Three", "Twelve"] },
    { q: "The reset button starts a new game.", a: "True", options: ["True", "False", "Not sure"] },
    { q: "MIT App Inventor can build APK files.", a: "True", options: ["True", "False", "Not sure"] },
    { q: "Blocks-based coding is helpful for beginners.", a: "True", options: ["True", "False", "Not sure"] }
  ],

  aiappdev: [
    { q: "AI application development uses what technology?", a: "Artificial Intelligence", options: ["Artificial Intelligence", "Manual typing only", "Paper forms"] },
    { q: "AI coding assistants can help generate what?", a: "Code", options: ["Code", "Chairs", "Electricity"] },
    { q: "AI can help find bugs.", a: "True", options: ["True", "False", "Not sure"] },
    { q: "AI can help automate testing.", a: "True", options: ["True", "False", "Not sure"] },
    { q: "AI can explain code in simpler language.", a: "True", options: ["True", "False", "Not sure"] },
    { q: "Which AI technology understands human language?", a: "Natural Language Processing", options: ["Natural Language Processing", "Photoshop", "Bluetooth"] },
    { q: "Which AI can generate code, text, or designs?", a: "Generative AI", options: ["Generative AI", "Antivirus", "File Explorer"] },
    { q: "Responsible AI includes data privacy.", a: "True", options: ["True", "False", "Not sure"] },
    { q: "AI should replace all developers completely.", a: "False", options: ["True", "False", "Not sure"] },
    { q: "AI can improve developer productivity.", a: "True", options: ["True", "False", "Not sure"] }
  ],

  crossplatform: [
    { q: "Cross-platform development allows apps to run on how many platforms?", a: "More than one", options: ["Only one", "More than one", "None"] },
    { q: "Android apps are commonly built using Java or what?", a: "Kotlin", options: ["Kotlin", "Swift", "HTML only"] },
    { q: "iOS apps commonly use what language?", a: "Swift", options: ["Swift", "Kotlin", "PHP"] },
    { q: "React Native is a cross-platform framework.", a: "True", options: ["True", "False", "Not sure"] },
    { q: "Flutter was created by what company?", a: "Google", options: ["Google", "Facebook", "Microsoft"] },
    { q: "Xamarin uses C# and .NET.", a: "True", options: ["True", "False", "Not sure"] },
    { q: "Ionic uses web technologies like HTML, CSS, and JavaScript.", a: "True", options: ["True", "False", "Not sure"] },
    { q: "One advantage of cross-platform development is code reusability.", a: "True", options: ["True", "False", "Not sure"] },
    { q: "Cross-platform apps always perform better than native apps.", a: "False", options: ["True", "False", "Not sure"] },
    { q: "Cross-platform development can reduce cost and development time.", a: "True", options: ["True", "False", "Not sure"] }
  ]
};

/* LOAD QUIZ */

const quizContainer = document.getElementById("quizContainer");
const submitQuiz = document.getElementById("submitQuiz");
const quizScore = document.getElementById("quizScore");

if (quizContainer && readerTitle) {
  const params = new URLSearchParams(window.location.search);
  const topic = params.get("topic");
  const selectedQuiz = quizzes[topic] || quizzes.software;

  quizContainer.innerHTML = "";

  selectedQuiz.forEach((item, index) => {
    const questionDiv = document.createElement("div");
    questionDiv.className = "quiz-question";

    questionDiv.innerHTML = `
      <h3>${index + 1}. ${item.q}</h3>

      ${item.options.map(option => `
        <label>
          <input type="radio" name="question${index}" value="${option}">
          ${option}
        </label>
      `).join("")}
    `;

    quizContainer.appendChild(questionDiv);
  });

  submitQuiz.addEventListener("click", () => {

  let score = 0;

  selectedQuiz.forEach((item, index) => {

    const selectedAnswer = document.querySelector(
      `input[name="question${index}"]:checked`
    );

    if (selectedAnswer && selectedAnswer.value === item.a) {
      score++;
    }
  });

  let remarks = "";
  let feedback = "";

  if (score === 10) {

    remarks = "Outstanding!";
    feedback =
      "You have an excellent understanding of this topic and mastered all key concepts.";

    quizScore.style.color = "#2FA084";

  } else if (score >= 8) {

    remarks = "Very Good!";
    feedback =
      "You understood most of the lessons and only missed a few concepts.";

    quizScore.style.color = "#2FA084";

  } else if (score >= 5) {

    remarks = "Good Attempt!";
    feedback =
      "You have a basic understanding of the topic, but reviewing the materials and videos is recommended.";

    quizScore.style.color = "#d48b00";

  } else {

    remarks = "Needs Improvement";
    feedback =
      "You may need to review the topic again by reading the material and watching the related video lessons.";

    quizScore.style.color = "crimson";
  }

  quizScore.innerHTML = `

    <div class="quiz-result-box">

      <h3>${remarks}</h3>

      <p>
        Your score: <strong>${score}</strong> out of
        <strong>${selectedQuiz.length}</strong>
      </p>

      <p>${feedback}</p>

    </div>

  `;
});
}