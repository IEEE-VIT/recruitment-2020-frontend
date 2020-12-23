import React, { useEffect, useState } from "react";
import "./FormComponent2.css";

const FormComponent2 = ({
  domains,
  setDomains,
  coreDomains,
  setCoreDomains,
}) => {
  const domainMap = {
    Tech: ["Web", "App", "ML", "CyberSecurity", "Electronics", "AR/VR"],
    Design: ["UI/UX", "VFX", "GraphicDesign", "  3D"],
    Management: ["Management"],
  };
  async function changeDomains() {
    let coreDomainsObj = [];
    for (let i = 0; i < domains.length; i++) {
      if (
        domainMap["Tech"].includes(domains[i]) &&
        !coreDomainsObj.includes("Tech")
      ) {
        coreDomainsObj.push("Tech");
      } else if (
        domainMap["Design"].includes(domains[i]) &&
        !coreDomainsObj.includes("Design")
      ) {
        coreDomainsObj.push("Design");
      } else if (
        domainMap["Management"].includes(domains[i]) &&
        !coreDomainsObj.includes("Management")
      ) {
        coreDomainsObj.push("Management");
      }
    }
    setCoreDomains(coreDomainsObj);
  }
  useEffect(() => {
    changeDomains();
    // eslint-disable-next-line
  }, [domains]);
  const [classNames, setClassNames] = useState([
    "domain-container",
    "domain-container",
    "domain-container",
    "domain-container",
    "domain-container",
    "domain-container",
    "domain-container",
    "domain-container",
    "domain-container",
    "domain-container",
    "domain-container",
  ]);
  const [error, setError] = useState("");
  function addDomain(domain) {
    setError("");
    if (domains.includes(domain)) {
      setDomains(
        domains.filter((item) => {
          return item !== domain;
        })
      );
      switch (domain) {
        case "Management":
          setClassNames(
            classNames.map((item, index) => {
              if (index === 0) {
                return "domain-container";
              } else {
                return item;
              }
            })
          );
          break;
        case "Web":
          setClassNames(
            classNames.map((item, index) => {
              if (index === 1) {
                return "domain-container";
              } else {
                return item;
              }
            })
          );
          break;
        case "ML":
          setClassNames(
            classNames.map((item, index) => {
              if (index === 2) {
                return "domain-container";
              } else {
                return item;
              }
            })
          );
          break;
        case "App":
          setClassNames(
            classNames.map((item, index) => {
              if (index === 3) {
                return "domain-container";
              } else {
                return item;
              }
            })
          );
          break;
        case "UI/UX":
          setClassNames(
            classNames.map((item, index) => {
              if (index === 4) {
                return "domain-container";
              } else {
                return item;
              }
            })
          );
          break;
        case "CyberSecurity":
          setClassNames(
            classNames.map((item, index) => {
              if (index === 5) {
                return "domain-container";
              } else {
                return item;
              }
            })
          );
          break;
        case "Electronics":
          setClassNames(
            classNames.map((item, index) => {
              if (index === 6) {
                return "domain-container";
              } else {
                return item;
              }
            })
          );
          break;
        case "VFX":
          setClassNames(
            classNames.map((item, index) => {
              if (index === 7) {
                return "domain-container";
              } else {
                return item;
              }
            })
          );
          break;
        case "GraphicDesign":
          setClassNames(
            classNames.map((item, index) => {
              if (index === 8) {
                return "domain-container";
              } else {
                return item;
              }
            })
          );
          break;
        case "AR/VR":
          setClassNames(
            classNames.map((item, index) => {
              if (index === 9) {
                return "domain-container";
              } else {
                return item;
              }
            })
          );
          break;
        case "  3D":
          setClassNames(
            classNames.map((item, index) => {
              if (index === 10) {
                return "domain-container";
              } else {
                return item;
              }
            })
          );
          break;
        default:
          return null;
      }
    } else {
      if (domains.length === 2) {
        setError("You can select a max of 2 domains.*");
      } else {
        setDomains([...domains, domain]);
        switch (domain) {
          case "Management":
            setClassNames(
              classNames.map((item, index) => {
                if (index === 0) {
                  return "domain-container selected-domain";
                } else {
                  return item;
                }
              })
            );
            break;
          case "Web":
            setClassNames(
              classNames.map((item, index) => {
                if (index === 1) {
                  return "domain-container selected-domain";
                } else {
                  return item;
                }
              })
            );
            break;
          case "ML":
            setClassNames(
              classNames.map((item, index) => {
                if (index === 2) {
                  return "domain-container selected-domain";
                } else {
                  return item;
                }
              })
            );
            break;
          case "App":
            setClassNames(
              classNames.map((item, index) => {
                if (index === 3) {
                  return "domain-container selected-domain";
                } else {
                  return item;
                }
              })
            );
            break;
          case "UI/UX":
            setClassNames(
              classNames.map((item, index) => {
                if (index === 4) {
                  return "domain-container selected-domain";
                } else {
                  return item;
                }
              })
            );
            break;
          case "CyberSecurity":
            setClassNames(
              classNames.map((item, index) => {
                if (index === 5) {
                  return "domain-container selected-domain";
                } else {
                  return item;
                }
              })
            );
            break;
          case "Electronics":
            setClassNames(
              classNames.map((item, index) => {
                if (index === 6) {
                  return "domain-container selected-domain";
                } else {
                  return item;
                }
              })
            );
            break;
          case "VFX":
            setClassNames(
              classNames.map((item, index) => {
                if (index === 7) {
                  return "domain-container selected-domain";
                } else {
                  return item;
                }
              })
            );
            break;
          case "GraphicDesign":
            setClassNames(
              classNames.map((item, index) => {
                if (index === 8) {
                  return "domain-container selected-domain";
                } else {
                  return item;
                }
              })
            );
            break;
          case "AR/VR":
            setClassNames(
              classNames.map((item, index) => {
                if (index === 9) {
                  return "domain-container selected-domain";
                } else {
                  return item;
                }
              })
            );
            break;
          case "  3D":
            setClassNames(
              classNames.map((item, index) => {
                if (index === 10) {
                  return "domain-container selected-domain";
                } else {
                  return item;
                }
              })
            );
            break;
          default:
            return null;
        }
      }
    }
  }
  return (
    <div id="comp2-container">
      <h3>
        3. Choose your preferred domains.<span style={{ color: "red" }}>*</span>
      </h3>
      <div id="domains-container">
        <div
          className={classNames[0]}
          onClick={() => {
            addDomain("Management");
          }}
        >
          Management
        </div>
        <div
          className={classNames[1]}
          onClick={() => {
            addDomain("Web");
          }}
        >
          Web Development
        </div>
        <div
          className={classNames[2]}
          onClick={() => {
            addDomain("ML");
          }}
        >
          Machine Learning
        </div>
        <div
          className={classNames[3]}
          onClick={() => {
            addDomain("App");
          }}
        >
          App Development
        </div>
        <div
          className={classNames[4]}
          onClick={() => {
            addDomain("UI/UX");
          }}
        >
          UI/UX Design
        </div>
        <div
          className={classNames[5]}
          onClick={() => {
            addDomain("CyberSecurity");
          }}
        >
          Cyber Security
        </div>
        <div
          className={classNames[6]}
          onClick={() => {
            addDomain("Electronics");
          }}
        >
          Electronics
        </div>
        <div
          className={classNames[7]}
          onClick={() => {
            addDomain("VFX");
          }}
        >
          Video Editing / VFX
        </div>
        <div
          className={classNames[8]}
          onClick={() => {
            addDomain("GraphicDesign");
          }}
        >
          Graphic Designing
        </div>
        <div
          className={classNames[9]}
          onClick={() => {
            addDomain("AR/VR");
          }}
        >
          AR
        </div>
        <div
          className={classNames[10]}
          onClick={() => {
            addDomain("  3D");
          }}
        >
          3D Designing
        </div>
      </div>
      <div id="error-message">{error}</div>
    </div>
  );
};

export default FormComponent2;
