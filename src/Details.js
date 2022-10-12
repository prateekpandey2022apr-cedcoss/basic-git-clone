import {
  Page,
  Layout,
  Card,
  TextField,
  Tag,
  MediaCard,
  List,
  ResourceList,
  ResourceItem,
  Avatar,
  TextStyle,
  Button,
  Frame,
  Loading,
  InlineError,
} from "@shopify/polaris";
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { addSession, deleteSession } from "./redux/sessionReducer";
import "./App.css";
import Loader from "./Loader";
import Navbar from "./components/Navbar";
import TabsExample from "./components/TabsExample";

function Details(props) {
  // debugger;
  const [isLoading, setIsLoading] = useState(false);
  const [isRepoLoading, setIsRepoLoading] = useState(false);
  const [details, setDetails] = useState({});
  const [repos, setRepos] = useState([]);

  console.log(props.details.username);

  var options = {
    headers: {
      Authorization: `Bearer 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`,
    },
  };

  useEffect(() => {
    if (isRepoLoading) {
      debugger;
      fetch(`https://api.github.com/users/${props.details.username}/repos`)
        .then((response) => response.json())
        .then((response) => {
          console.log(response);

          if (response.message) {
            throw new Error(response.message);
          }

          setRepos([...response]);
        })
        .catch((error) => {
          alert(error.toString());
        })
        .finally(() => {
          setIsRepoLoading(false);
        });
    }
  }, [isRepoLoading]);

  useEffect(() => {
    debugger;
    if (props.details.username) {
      fetch(`https://api.github.com/users/${props.details.username}`, options)
        .then((response) => response.json())
        .then((response) => {
          setIsLoading(false);
          debugger;
          // console.log(response);
          if (response.message) {
            throw new Error(response.message);
          }
          setDetails({ ...response });
          // props.addSession({ username: response.login });
          setIsRepoLoading(true);
        })
        .catch((error) => {
          alert(error.toSting());
          // setMessage(error.toString());
        })
        .finally(() => {
          setIsLoading(false);
          // setIsRepoLoading(true);
        });
    }
  }, []);

  return (
    <>
      <Navbar />
      {isLoading ? (
        <div>
          <Frame>
            <Loading />
          </Frame>
        </div>
      ) : (
        <>
          {Object.keys(details).length > 0 && (
            <>
              <div className="row">
                <div className="col-4">{/* <a href="/">Back</a> */}</div>
              </div>
              <div className="row">
                <div className="col-1">
                  <div className="person-name">
                    {/* <h3>{details.name}</h3> */}
                  </div>
                  <div>
                    <img src={details.avatar_url} />
                  </div>
                  <div className="bio">{details.bio ?? "N/A"}</div>
                  <div className="additional-info">
                    <ul>
                      <li>Followers: {details.followers}</li>
                      <li>Folowing: {details.following}</li>
                      <li>Public Repos: {details.public_repos}</li>
                      <li>Public Gists: {details.public_gists}</li>
                      <li>Location: {details.location}</li>
                    </ul>
                  </div>
                </div>
                <div className="col-1-3">
                  <div className="intro">Hello I am {details.name}</div>
                  <TabsExample repos={repos} isRepoLoading={isRepoLoading} />

                  {/* <div className="repos">
                    <div>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Vivamus faucibus nulla tortor, porta maximus erat luctus
                      eu. Vivamus feugiat sollicitudin mauris nec placerat.
                      Morbi pulvinar placerat ullamcorper. Duis commodo vitae
                      lacus et tincidunt. Pellentesque sed risus porttitor,
                      mollis nunc pretium, lobortis leo. Suspendisse vitae augue
                      tellus. Integer tincidunt gravida leo a lobortis.
                    </div>
                    <div className="repo-list">
                      {isRepoLoading ? (
                        <Loader />
                      ) : (
                        <>
                          <Card.Section>
                            <h1>My Popular Repos</h1>
                            {repos.map((item) => {
                              return (
                                <li>
                                  <a href={item.html_url}>{item.full_name}</a>
                                </li>
                              );
                            })}
                          </Card.Section>
                        </>
                      )}
                    </div>
                  </div> */}
                </div>
              </div>
            </>
          )}
        </>
      )}
    </>
  );
}

const mapStateToProps = (state) => {
  console.log(state);
  return {
    details: state.details,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addSession: (session) => dispatch(addSession(session)),
    deleteSession: () => dispatch(deleteSession()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Details);
