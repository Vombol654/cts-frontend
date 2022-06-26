import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import axios from "axios";
import queryString from "query-string";
import "../../Styles/filter.css";
import Layout from "./Filres/Layout";
import Pagenition from "./Filres/Pagenition";
const Filter = () => {
  const [isFilterVisible, setIsFilterVisible] = useState(true);
  const [mentordetails, setmentordetails] = useState([]);
  const [language, setlanguage] = useState("");
  const [languageI, setlanguageI] = useState("");
  const [feature, setfeatures] = useState([]);
  const [sort, setsort] = useState(1);
  const [lcost, setlcost] = useState("");
  const [hcost, sethcost] = useState("");
  const [page, setpage] = useState(1);
  const [pageCount, setpageCount] = useState(1);
  const filterHandler = () => {
    setIsFilterVisible((prevState) => !prevState);
  };
  const location = useLocation();
  const qs = queryString.parse(location.search);
  const { course_type, languageId } = qs;
  // console.log(course_type);
  const filterObj = {
    coursetype: course_type,
    language: languageId,
  };
  useEffect(() => {
    axios({
      url: "http://localhost:8085/filter",
      method: "POST",
      headers: { "Content-Type": "application/json" },
      data: filterObj,
    })
      .then((res) => {
        setmentordetails(res.data.mentor);
        // setCoursetype(course_type)
        setpageCount(res.data.Data);
      })
      .catch((err) => {
        console.log(err);
      });
    axios({
      url: "http://localhost:8085/language",
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => {
        setlanguage(res.data.language);
        setpageCount(res.data.Data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const handleSortChange = (sort) => {
    const filterSortObj = {
      coursetype: course_type,
      language: languageId ? languageId : languageI,
      feature: feature.length > 0 ? feature : "",
      lcost,
      hcost,
      sort: sort,
      page,
    };
    axios({
      url: "http://localhost:8085/filter",
      method: "POST",
      headers: { "Content-Type": "application/json" },
      data: filterSortObj,
    })
      .then((res) => {
        setmentordetails(res.data.mentor);
        setsort(sort);
        setpageCount(res.data.Data);
      })
      .catch((err) => {
        console.log(err);
      });
    // console.log(filterSortObj)
  };
  const handleCostChange = (lcost, hcost) => {
    const filterCostObj = {
      coursetype: course_type,
      language: languageId ? languageId : languageI,
      feature: feature.length > 0 ? feature : "",
      lcost,
      hcost,
      sort: sort,
      page,
    };
    axios({
      url: "http://localhost:8085/filter",
      method: "POST",
      headers: { "Content-Type": "application/json" },
      data: filterCostObj,
    })
      .then((res) => {
        setmentordetails(res.data.mentor);
        sethcost(hcost);
        setlcost(lcost);
        setpageCount(res.data.Data);
      })
      .catch((err) => {
        console.log(err);
      });
    console.log(filterCostObj);
  };
  const handleLanguageChange = (event) => {
    const language_id = event.target.value;
    const filterLangObj = {
      coursetype: course_type,
      language: language_id,
      feature: feature.length > 0 ? feature : "",
      lcost,
      hcost,
      sort: sort,
      page,
    };
    axios({
      url: "http://localhost:8085/filter",
      method: "POST",
      headers: { "Content-Type": "application/json" },
      data: filterLangObj,
    })
      .then((res) => {
        setmentordetails(res.data.mentor);
        setlanguageI(language_id);
        setpageCount(res.data.Data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleFeature = (mentorId) => {
    const index = feature.indexOf(mentorId);
    if (index >= 0) {
      feature.splice(index, 1);
    } else {
      feature.push(mentorId);
    }
    const filterFeatureObj = {
      coursetype: course_type,
      language: languageId ? languageId : languageI,
      feature: feature.length > 0 ? feature : "",
      lcost,
      hcost,
      sort: sort,
    };

    axios({
      url: "http://localhost:8085/filter",
      method: "POST",
      headers: { "Content-Type": "application/json" },
      data: filterFeatureObj,
    })
      .then((res) => {
        setmentordetails(res.data.mentor);
        setfeatures(feature);
        setpageCount(res.data.Data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handlePageClick = (pageNo) => {
    const filterPageObj = {
      coursetype: course_type,
      language: languageId ? languageId : languageI,
      feature: feature.length > 0 ? feature : "",
      lcost,
      hcost,
      sort: sort,
      page: pageNo,
    };
    axios({
      url: "http://localhost:8085/filter",
      method: "POST",
      headers: { "Content-Type": "application/json" },
      data: filterPageObj,
    })
      .then((res) => {
        setmentordetails(res.data.mentor);
        setpage(pageNo);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="filter-page">
      <div className="filter">
        <div className="filter-content">
          <h3>
            Filter
            <i className="fa-solid fa-angle-down" onClick={filterHandler}></i>
          </h3>
        </div>
        <div className={isFilterVisible ? "filter-main-content" : "visible"}>
          <div className="filter-lang">
            <select defaultValue={0} onChange={handleLanguageChange}>
              <option value="0" disabled>
                select Language
              </option>
              {language &&
                language.map((item, index) => {
                  return (
                    <option value={item.language_id} key={index}>
                      {item.name}
                    </option>
                  );
                })}
            </select>
          </div>
          <div className="filter-feature">
            <h5>Features:</h5>
            <div className="filter-checkbox-container">
              <div className="filter-checkbox">
                <label>
                  <input type="checkbox" onChange={() => handleFeature(1)} />{" "}
                  Chat
                </label>
              </div>
              <div className="filter-checkbox">
                <label>
                  <input type="checkbox" onChange={() => handleFeature(2)} />{" "}
                  Call
                </label>
              </div>
              <div className="filter-checkbox">
                <label>
                  <input type="checkbox" onChange={() => handleFeature(3)} />{" "}
                  Task
                </label>
              </div>
              <div className="filter-checkbox">
                <label>
                  <input type="checkbox" onChange={() => handleFeature(4)} />{" "}
                  HandsOn
                </label>
              </div>
            </div>
          </div>
          <div className="filter-cost">
            <h5>Cost per Session</h5>
            <div className="filter-radio-container">
              <div className="filter-radio">
                <label>
                  <input
                    type="radio"
                    name="cost"
                    onChange={() => handleCostChange(1, 499)}
                  />{" "}
                  less than 500
                </label>
              </div>
              <div className="filter-radio">
                <label>
                  <input
                    type="radio"
                    name="cost"
                    onChange={() => handleCostChange(500, 999)}
                  />{" "}
                  500-999
                </label>
              </div>
              <div className="filter-radio">
                <label>
                  <input
                    type="radio"
                    name="cost"
                    onChange={() => handleCostChange(1500, 2499)}
                  />{" "}
                  1000-1499
                </label>
              </div>
              <div className="filter-radio">
                <label>
                  <input
                    type="radio"
                    name="cost"
                    onChange={() => handleCostChange(1500, 2499)}
                  />{" "}
                  1500-2499
                </label>
              </div>
              <div className="filter-radio">
                <label>
                  <input
                    type="radio"
                    name="cost"
                    onChange={() => handleCostChange(2500, 9999)}
                  />{" "}
                  2500+
                </label>
              </div>
            </div>
          </div>
          <div className="filter-sort">
            <h5>Sort</h5>
            <div className="filter-sort-container">
              <div className="sort">
                <label>
                  <input
                    type="radio"
                    name="sort"
                    onChange={() => handleSortChange(1)}
                  />{" "}
                  Price low to high
                </label>
              </div>
              <div className="sort">
                <label>
                  <input
                    type="radio"
                    name="sort"
                    onChange={() => handleSortChange(-1)}
                  />{" "}
                  Price high to low
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="layout-grid">
        {mentordetails.length > 0 ? (
          mentordetails.map((item) => {
            return <Layout mentorData={item} key={item._id} />;
          })
        ) : (
          <p className="no-result">No Result!</p>
        )}
      </div>
      {pageCount > 1 || mentordetails.length > 0 ? (
        <Pagenition onPageChange={handlePageClick} totalPages={pageCount} />
      ) : null}
    </div>
  );
};
export default Filter;
