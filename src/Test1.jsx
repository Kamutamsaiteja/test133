import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

const jsonData = {
  projectName: "Test1",
  author: "Stuart Ritchie",
  projectTypeOptions: ["Standard Project", "Simulation Project"],
  categoryOptions: ["Controller"],
  deviceOptions: ["NJ501"],
  modelOptions: ["1500"],
  versionOptions: ["1.41", "1.42"]
};

const SideMenu = ({ activeTab, setActiveTab }) => {
  const menu = [
    {
      title: "Offline",
      items: ["New Project", "Open Project", "Import", "Export"]
    },
    {
      title: "Online",
      items: ["Connect to Device"]
    },
    {
      title: "Version Control",
      items: ["Version Control Explorer"]
    },
    {
      title: "License",
      items: ["License"]
    }
  ];

  return (
    <div className="bg-secondary p-3 rounded">
      {menu.map((section) => (
        <div key={section.title}>
          <h4 className="mt-4">{section.title}</h4>
          <ul className="list-unstyled">
            {section.items.map((item) => (
              <li
                key={item}
                className={`p-2 ${activeTab === item ? "bg-primary text-white" : "text-white"}`}
                style={{ cursor: "pointer" }}
                onClick={() => setActiveTab(item)}
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

const NewProject = ({ data, projectData, setProjectData, handleCreate }) => {
  return (
    <div className="bg-secondary p-4 rounded">
      <h2 className="mb-4">Project Properties</h2>
      <input
        type="text"
        className="form-control mb-3"
        placeholder="Project Name"
        value={projectData.projectName}
        onChange={(e) => setProjectData({ ...projectData, projectName: e.target.value })}
      />
      <input
        type="text"
        className="form-control mb-3"
        placeholder="Author"
        value={projectData.author}
        onChange={(e) => setProjectData({ ...projectData, author: e.target.value })}
      />
      <input
        type="text"
        className="form-control mb-3"
        placeholder="Comment"
        value={projectData.comment}
        onChange={(e) => setProjectData({ ...projectData, comment: e.target.value })}
      />

      <select
        className="form-select mb-3"
        value={projectData.projectType}
        onChange={(e) => setProjectData({ ...projectData, projectType: e.target.value })}
      >
        {data.projectTypeOptions.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>

      <div className="row mb-3">
        <div className="col">
          <select
            className="form-select"
            value={projectData.category}
            onChange={(e) => setProjectData({ ...projectData, category: e.target.value })}
          >
            {data.categoryOptions.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </div>
        <div className="col">
          <select
            className="form-select"
            value={projectData.device}
            onChange={(e) => setProjectData({ ...projectData, device: e.target.value })}
          >
            {data.deviceOptions.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </div>
        <div className="col">
          <select
            className="form-select"
            value={projectData.model}
            onChange={(e) => setProjectData({ ...projectData, model: e.target.value })}
          >
            {data.modelOptions.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </div>
      </div>

      <select
        className="form-select mb-3"
        value={projectData.version}
        onChange={(e) => setProjectData({ ...projectData, version: e.target.value })}
      >
        {data.versionOptions.map((option) => (
          <option key={option}>{option}</option>
        ))}
      </select>

      <button className="btn btn-primary w-100" onClick={handleCreate}>Create</button>
    </div>
  );
};

const PlaceholderPanel = ({ title }) => (
  <div className="bg-secondary p-4 rounded">
    <h2 className="text-white">{title}</h2>
    <p className="text-white">This is a placeholder panel for {title}.</p>
  </div>
);

const Test1 = () => {
  const [activeTab, setActiveTab] = useState("New Project");
  const [projectData, setProjectData] = useState({
    projectName: "",
    author: "",
    comment: "",
    projectType: "",
    category: "",
    device: "",
    model: "",
    version: ""
  });

  useEffect(() => {
    setProjectData({
      projectName: jsonData.projectName,
      author: jsonData.author,
      comment: "",
      projectType: jsonData.projectTypeOptions[0],
      category: jsonData.categoryOptions[0],
      device: jsonData.deviceOptions[0],
      model: jsonData.modelOptions[0],
      version: jsonData.versionOptions[0]
    });
  }, []);

  const handleCreate = () => {
    console.log("Project Created:", projectData);
    alert("Project created successfully!");
  };

  const renderPanel = () => {
    if (activeTab === "New Project") {
      return (
        <NewProject
          data={jsonData}
          projectData={projectData}
          setProjectData={setProjectData}
          handleCreate={handleCreate}
        />
      );
    } else {
      return <PlaceholderPanel title={activeTab} />;
    }
  };

  return (
    <div className="container-fluid bg-dark text-white min-vh-100 py-5">
      <div className="row">
        <div className="col-md-3">
          <SideMenu activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>
        <div className="col-md-9">{renderPanel()}</div>
      </div>
    </div>
  );
};

export default Test1;
