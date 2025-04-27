import react from "react";
import search from './search.png';
import cross from './cross.png';
import { useEffect, useState } from "react";
import { preconnect } from "react-dom";
import Header from './header.js';
import Footer from './footer.js';
import app from './App.module.css';

function Pricingpage() {

      useEffect(() => {
    console.log("useEffect запущен");
    fetch("http://localhost:3001/dataLoad", {
      method: "GET",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    })
      .then((r) => r.json())
      .then((r) => {setTable_data(r.data); setInitialData(r.data)});

  }, []);


    const plans = [
        {
          title: "Free",
          price: "$0 USD",
          description: "Free for up to 10 collaborators Workspace",
          subDescription: "Capture your to-dos, get organized, and get sh*t done.",
          buttonText: "Get started",
          features: [
            {cs: false, name: "Unlimited cards"},
            {cs: false, name: "Up to 10 boards per"},
            {cs: true, name: "Quick capture"},
            {cs: true, name: "Inbox"},
            {cs: false, name: "Unlimited Power-Ups per board"},
            {cs: false, name: "Unlimited storage (10MB/file)"},
            {cs: false, name: "250 Workspace command runs per month"},
            {cs: false, name: "Custom backgrounds & stickers"},
            {cs: false, name: "Unlimited activity log"},
            {cs: false, name: "Assignee and due dates"},
            {cs: false, name: "iOS and Android mobile apps"},
            {cs: false, name: "2-factor authentication"}
            ]
        },
        {
          title: "Standart",
          price: "$5 USD",
          description: "Per user/month if billed annually ($60 monthly)",
          subDescription: "Get more stuff done with unlimited boards, card mirroring, and more views.",
          buttonText: "Sign up now",
          features: [
            {cs: false, name: "Unlimited boards"},
            {cs: true, name: "Planner"},
            {cs: false, name: "Advanced checklists"},
            {cs: false, name: "Card mirroring"},
            {cs: false, name: "Custom Fields"},
            {cs: false, name: "Unlimited storage (250MB/file)"},
            {cs: false, name: "1,000 Workspace command runs per month"},
            {cs: false, name: "Single board guests"},
            {cs: false, name: "Saved searches"}
        ]
        },
        {
          title: "Premium",
          price: "$10 USD",
          description: "Per user/month if billed annually ($125.50 monthly)",
          subDescription: "Add AI to your boards and toolkit. Plus, get more perspective with more views.",
          buttonText: "Try for free",
          features: [
            {cs: false, name: "Atlassian Intelligence (AI)"},
            {cs: false, name: "Views: Calendar, Timeline, Table, Dashboard, and Map"},
            {cs: false, name: "Workspace views: Table and Calendar"},
            {cs: false, name: "Unlimited Workspace command runs"},
            {cs: false, name: "Admin and security features"},
            {cs: false, name: "Workspace-level templates"},
            {cs: false, name: "Collections"},
            {cs: false, name: "Observers"},
            {cs: false, name: "Simple data export"},
        ],
        },
        {
          title: "Enterprice",
          price: "$17.50 USD",
          description: "Per user/month - billed annually price per user ($210.00)",
          subDescription: "Add enterprise-grade security and controls. This plan includes Atlassian Guard Standard and Enterprise Admin support.",
          buttonText: "Contact sales",
          features: [
            {cs: false, name: "Unlimited Workspaces"},
            {cs: false, name: "Organization-wide permissions"},
            {cs: false, name: "Organization-visible boards"},
            {cs: false, name: "Public board management"},
            {cs: false, name: "Multi-board guests"},
            {cs: false, name: "Attachment permissions"},
            {cs: false, name: "Power-Up administration"},
            {cs: false, name: "Free SSO and user provisioning with Atlassian Guard"},
        ],
        },
      ];

      const FAQ_answers = [
        {
          answer: "Does Trello offer a Premium free trial?",
          request: (
            <>
              We sure do. All users can enroll their Workspace in a <a href="#">free trial of Trello Premium</a>. With that trial your Workspace will get access
              to create unlimited Trello boards, automate as much as you’d like, take advantage of Timeline, Dashboard, and other new views, and much more!
            </>
          )
        },
        {
          answer: "Do you offer any discounted plans?",
          request: (
            <>
              Yes! Trello offers both a <a href="#">non-profit community discount</a> as well as an <a href="#">education discount</a>.
            </>
          )
        },
        {
          answer: "What payment methods do you accept?",
          request: (
            <>
              You can purchase a monthly or annual Trello Standard or Premium subscription with any major credit card. We offer more options for Enterprise customers,
              if you’re interested in learning more about Trello Enterprise <a href="#">contact our sales team</a>.
            </>
          )
        },
        {
          answer: "How do I cancel my Trello Standard or Premium subscription?",
          request: (
            <>
              If you aren’t 100% satisfied with Trello Standard or Premium you may downgrade at any time. When a team downgrades from Standard or Premium, it retains
              its Standard or Premium features and unlimited boards until the end of its prepaid service period. At the end of its prepaid service period, it becomes
              a free Trello Workspace that can hold 10 boards. Learn more about canceling your Standard or Premium subscription <a href="#">here</a>.
            </>
          )
        },{
          answer: "How are users counted towards billing?",
          request: (
            <>
              A Trello user who is added as a member to a Workspace—either as a normal member or as a team admin—is considered a billable team member that is included
              in the cost of Trello Standard or Premium. Any Guest that is on more than one board within the Workspace is considered a Multi-Board Guest and is billed
              at the same rate as Standard or Premium Workspace members. <a href="#">See this page</a> for more information on Multi-Board Guests.
            </>
          )
        },{
          answer: "Is there an on-premises version of Trello?",
          request: "Trello is proudly a cloud-only product. We offer access via the web, desktop, and our awesome mobile apps."
        },{
          answer: "Can I have Trello Standard or Premium just for my own account?",
          request: "Trello Standard and Premium are designed for all teams—even teams of one! To upgrade to Standard or Premium you’ll need to create a Workspace and then upgrade that Workspace."
        },{
          answer: "How secure is Trello?",
          request: "Trello, Inc. (“we”, “us” or “our”) is SOC2 Type 2 certified—we receive and review our data hosting providers’ SOC1 and SOC2 reports every 6 months under NDA. Trello is ISO/IEC 27001 certified which validates our information security management system (ISMS) and the implementation of our security controls. More information is available on the Atlassian Trust Management System. Trello is PCI-DSS certified. Learn more about Trello’s security protocols here."
        },
      ]

      const [val, setVal] = useState('');
      const [isVisCross, setIsVisCross] = useState(false);
      const [table_data, setTable_data] = useState([]);
      const [initialData, setInitialData] = useState([]);
      const [activeIndex, setActiveIndex] = useState([]);
      const [progress, setProgress] = useState(50);
      //const [monthPrice, setMonthPrice] = useState(210);
      const minPrice = 7.38;
      const maxPrice = 17.50;
      const minMP = 88.50;
      const maxMP = 210;
      
      const averagePrice = (maxPrice - ((progress - 50) / (5000 - 50)) * (maxPrice - minPrice) + 0.00001).toFixed(2);
      const monthPrice = (maxMP - ((progress - 50) / (5000 - 50) * (maxMP - minMP))).toFixed(2);

      const handleInputChange = async (e) => {
        const inputValue = e.target.value;
        setVal(inputValue);
        if(inputValue === ''){
          setIsVisCross(false);
          setTable_data(initialData);
        } else{
          setIsVisCross(true);
        }

        await fetch("http://localhost:3001/searchInPricingTable",
          {
            method:"POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({val: inputValue})
          }
         ) .then((r)=> r.json())
         .then((r)=> {setTable_data(r.data); console.log("r2",r)})

        return
      }

      const FAQ = (index) => {
        setActiveIndex(prev =>
          prev.includes(index)
            ? prev.filter(i => i !== index)
            : [...prev, index]);
      }

      const handleChangeprogress = (e) => {
        let val = e.target.value;
        if (val.includes('-')) {
          return;
        }
        if (val > 5000) val = 5000;
        if (val < 0) val = 50;        
        if (val[0] === "0") {
          return;
        }
        setProgress(val);
      };

     const onBlurr = () => {
      let val = progress;
      if(val < 50) val = 50;
      setProgress(val);
     } 

      const handleSliderChange = (e) => {
        const newValue = Number(e.target.value);
        setProgress(newValue);
      };

      



    return<>
    <Header/>
    <div className={app.page_container}>
        <div className={app.pricing_box}>
            <div className={app.pricing_content}>
                <p1 className={app.p1}>Trello your way.</p1>
                <h4 className={app.h4}>Trusted by millions, Trello powers teams all around the world.</h4>
                <h5 className={app.h5}>Explore which option is right for you.</h5>
                <div className={app.subscription_box}>
                    {plans.map((plan, index) => (
                        <div key={index} className={`${app.plan_card} ${plan.title.toLowerCase()}`}>
                        <h3>{plan.title}</h3>
                        <h2>{plan.price === "$17.50 USD" ? <>$ {averagePrice} USD</> : plan.price}</h2>

                        
                        <p className={app.description}>
                        
                          {index === 3 ? `Per user/month - billed annually price per user ($ ${monthPrice} monthly)` : plan.description}
                        
                        </p>
                        
                        
                        <p className={app.sub_description}>{plan.subDescription}
                        {plan.title === "Enterprice" && <>
                          <div className={app.zxc}><p>Est. cost for  <input
                            type="number"
                            maxLength={4}
                            min={50}
                            max={5000} 
                            inputmode="numeric"
                            value={progress} 
                            className={app.progress_input} 
                            onBlur={onBlurr}
                            onChange={e => handleChangeprogress(e)}/>users</p>
                          <input
                            type="range"
                            min={50}
                            max={5000}
                            value={progress}
                            onChange={handleSliderChange}
                            className={app.slider}
                          /></div>
                        </>}
                        </p>
                        
                        

                        <button className={app.bt}>{plan.buttonText}</button>
                        <div className={app.line}></div>
                        <div className={app.features}>
                          <p className={app.features_title}>
                            {plan.title === "FREE" ? "INCLUDED IN FREE:" : `EVERYTHING IN ${plans[index - 1]?.title || "FREE"}, PLUS:`}
                          </p>
                          <ul>
                            {plan.features.map((feature, idx) => (
                              <li key={idx}>
                                <div className={app.checkmark}>✔</div>
                                {feature.name}
                                {feature.cs && <div className={app.coming_soon}> COMING SOON</div>}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <a href="#" className={app.pricing_card_learnmore}>{plan.title !== "Free" && `learn more about ${plan.title}`}</a>
                      </div>
                    ))}  
                </div>
                <h1 className={app.margin}>Compare our plans</h1>
                <div className={app.search_prices_features_box}>
                    <input className={app.searchprices_features_input} value={val} placeholder="Search" type="text" onChange={e => handleInputChange(e)}></input>
                    <img className={app.img2} src={search}/>
                    {isVisCross && <img className={app.img3} onClick={() => {setVal('');  setIsVisCross(false); setTable_data(initialData)}} src={cross}/>}
                </div>
                <div className={app.pricing_table}>
                    <table className={app.table}>
                    <thead>
                        <tr>
                          <th className={app.th1}>Features</th>
                          <th className={app.th2}>Free</th>
                          <th className={app.th2}>Standard</th>
                          <th className={app.th2}>Premium</th>
                          <th className={app.th2}>Enterprise</th>
                        </tr>
                      </thead>
                      <tbody>
                          {table_data.map((data, index) => (
                            <tr key={index} className={app.tr}>
                              <td>
                                <div className={app.boxx}>
                                  <div className={app.q33}>
                                    {data.title && <p className={app.data_title}>{data.title}</p>}
                                    {data.cs && <div className={app.coming_soon_2}> COMING SOON</div>}
                                  </div>
                                  {data.info && <h7>{data.info}</h7>}
                                </div>
                              </td>
                              <td>{typeof data.free === "boolean" ? (data.free ? "✔" : "") : data.free}</td>
                              <td>{typeof data.standard === "boolean" ? (data.standard ? '✔' : '') : data.standard}</td>
                              <td>{typeof data.premium === "boolean" ? (data.premium ? '✔' : '') : data.premium}</td>
                              <td>{typeof data.enterprise === "boolean" ? (data.enterprise ? '✔' : '') : data.enterprise}</td>
                            </tr>
                          ))}          
                      </tbody>
                    </table>
                </div>
                <p className={app.d4}>Didn’t find what you were looking for?</p>
                <button className={app.d4_button}>Make a suggestion</button>
                <p className={app.d4_2}>Frequently asked questions</p>
                <div className={app.FAQ_box}>
                        <ul>
                            {FAQ_answers.map((data, index)=> <li key={index}>
                              <button onClick={() => FAQ(index)}>{activeIndex.includes(index) ? "−" : "+"}&nbsp;{data.answer}</button>
                              <div className={`${app.faq_req_wrapper} ${activeIndex.includes(index) ? app.active : ""}`}>
                                <div className={app.faq_req}>{data.request}</div>
                              </div>
                              <div className={index === FAQ_answers.length - 1 ? app.last_item : app.w}></div>
                            </li>)}
                        </ul>
                </div>
            </div>
        </div>
        <div className={app.gray_prefooter}></div>
        </div>  
        <Footer/>
    </>
}
export default Pricingpage;