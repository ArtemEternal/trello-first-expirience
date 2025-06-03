const express = require("express");
const app = express();
const port = 3001;
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const crypto = require("node:crypto");
const cors = require('cors');
const db = require('./db');

app.use(
    require("cors")({
      origin: "http://localhost:3000",
      credentials: true,
    })
  );
  
  app.use(bodyParser.json());
  app.use(cookieParser());
  app.use(cors());
  app.use(express.json());


  app.get("/", (req, res) => {
    console.log("Сервер работает!");
  });


  
  const table_data = [
    { title: "Unlimited cards", 
        free: true,
        standard: true, 
        premium: true, 
        enterprise: true,
        info: "", 
        cs: false
    },
    {title: "Quick capture", 
        free: true,
        standard: true, 
        premium: true, 
        enterprise: true,
        info: "Capture to-dos, notes, and messages, from email and Slack instantly.", 
        cs: true
    },
    {title: "Inbox", 
        free: true,
        standard: true, 
        premium: true, 
        enterprise: true,
        info: "Gather messages and to-dos in this personal space before organizing them into your boards.", 
        cs: true
    },
    {title: "Planner (view-only)", 
        free: true,
        standard: true, 
        premium: true, 
        enterprise: true,
        info: "View your scheduled cards on a calendar and synchronize events from your favorite tools.", 
        cs: true
    },
    {title: "Planner (full access)", 
        free: false,
        standard: true, 
        premium: true, 
        enterprise: true,
        info: "Drag and drop cards on a calendar to block any available time. Sync with more events in your favorite tools.", 
        cs: true
    },
      {
        title: "Card Mirroring",
        free: false,
        standard: false,
        premium: true,
        enterprise: true,
        info: "View your cards from different boards with access to all information.",
        cs: false
      },
      {
        title: "Custom Fields",
        free: false,
        standard: false,
        premium: true,
        enterprise: true,
        info: "Bring process and formality to your workflow by structuring information on Trello cards to the task at hand with Custom Fields.",
        cs: false
      },
      {
        title: "Atlassian Intelligence (AI)",
        free: false,
        standard: false,
        premium: true,
        enterprise: true,
        info: "Enhance Trello card descriptions and comments effortlessly with AI-driven content generation, grammar correction, and brainstorming.",
        cs: true
      },
      {
        title: "Map View",
        free: false,
        standard: false,
        premium: true,
        enterprise: true,
        info: "Plan an offsite, scout new office locations, or manage product distribution points by adding locations to your cards and visualizing them geographically on a map.",
        cs: true
      },
      {
        title: "Table View",
        free: false,
        standard: false,
        premium: true,
        enterprise: true,
        info: "Bring a clearer perspective to all the work happening across a single board in a list format where you can create and edit cards in just a few clicks.",
        cs: true
      },
      {
        title: "Workspace Table View",
        free: false,
        standard: false,
        premium: false,
        enterprise: true,
        info: "See your projects and tasks across Workspaces and boards in a spreadsheet-style list that can be sorted and filtered to drill down to exactly the cards you need to see.",
        cs: false
      }, {
        title: "Workspace Calendar View",
        free: false,
        standard: false,
        premium: true,
        enterprise: true,
        info: "Workspace calendar displays items with start dates and due dates across your projects and boards, so you can see what lies ahead for all your teamwork.",
        cs: true
      },
      {
        title: "Workspace-Level Templates",
        free: false,
        standard: false,
        premium: true,
        enterprise: true,
        info: "",
        cs: false
      },
      {
        title: "Command Run Administration",
        free: false,
        standard: false,
        premium: true,
        enterprise: true,
        info: "Premium or Enterprise administrators can disable commands on behalf of other users, and perform other command maintenance.",
        cs: false
      },
      {
        title: "Board Collections",
        free: false,
        standard: false,
        premium: true,
        enterprise: true,
        info: "Premium and Enterprise teams can use Board Collections to easily group boards together whether by Workspace, department, or major project.",
        cs: false
      },
      {
        title: "Observers",
        free: false,
        standard: false,
        premium: true,
        enterprise: true,
        info: "Observers are a Premium security setting that limit a user’s actions within a board.",
        cs: false
      },
      {
        title: "Domain-Restricted Invites",
        free: false,
        standard: false,
        premium: false,
        enterprise: true,
        info: "",
        cs: false
      },
      {
        title: "Deactivate Members",
        free: false,
        standard: false,
        premium: false,
        enterprise: true,
        info: "",
        cs: false
      },
      {
        title: "Simple Data Export",
        free: false,
        standard: false,
        premium: false,
        enterprise: true,
        info: "",
        cs: false
      },
      {
        title: "Unlimited Command Runs",
        free: false,
        standard: false,
        premium: false,
        enterprise: true,
        info: "",
        cs: false
      },
      {
        title: "SAML SSO via Atlassian Guard",
        free: "AVAILABLE",
        standard: "AVAILABLE",
        premium: "AVAILABLE",
        enterprise: true,
        info: "Atlassian Guard is a separate subscription that your company can enable across all your Atlassian products and starts at $4/month/user.",
        cs: true
      },
      {
        title: "Unlimited Workspaces",
        free: false,
        standard: false,
        premium: false,
        enterprise: true,
        info: "",
        cs: false
      },
      {
        title: "Power-Up Administration",
        free: false,
        standard: false,
        premium: false,
        enterprise: true,
        info: "",
        cs: false
      },
      {
        title: "Attachment Restrictions",
        free: false,
        standard: false,
        premium: false,
        enterprise: true,
        info: "",
        cs: false
      }, {
        title: "Organization Wide Permissions",
        free: false,
        standard: false,
        premium: false,
        enterprise: true,
        info: "",
        cs: false
      },
      {
        title: "Organization Visible Boards",
        free: false,
        standard: false,
        premium: false,
        enterprise: true,
        info: "",
        cs: false
      },
      {
        title: "Public Board Management",
        free: false,
        standard: false,
        premium: false,
        enterprise: true,
        info: "",
        cs: false
      },
      {
        title: "Support",
        free: "Community Support",
        standard: "Local Business Hours",
        premium: "24/5 Premium Support",
        enterprise: "24/7 Enterprise Admin Support",
        info: "",
        cs: false
      }
  ];

  app.get("/dataLoad", (req, res) => {
    const data = table_data; 

    console.log("обработал")

    res.send({data});
  })


  app.post("/searchInPricingTable", (req, res) => {
    const val = req.body.val.toLowerCase(); 


    const filteredData = table_data.filter((data) => {
        const title = data.title.toLowerCase();
        const info = data.info ? data.info.toLowerCase() : "";
        return title.includes(val) || info.includes(val);
      });


    res.send({data: filteredData})
  })


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })