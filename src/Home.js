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
import React, { useState, useCallback, useEffect } from "react";
import { connect } from "react-redux";
import { addSession, deleteSession } from "./redux/sessionReducer";
import allUsers from "./data";
import { Link } from "react-router-dom";

function Home(props) {
  // const {
  //   username,
  //   setUsername,
  //   isLoading,
  //   setIsLoading,
  //   value,
  //   setValue,
  //   details,
  //   setDetails,
  //   message,
  //   setMessage,
  //   fieldErrors,
  //   setFieldErrors,
  // } = props;

  // console.log(props);

  // debugger;

  const [isLoading, setIsLoading] = useState(false);
  const [value, setValue] = useState("");
  const [users, setUsers] = useState([]);
  const [details, setDetails] = useState({});
  const [message, setMessage] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});

  var options = {
    headers: {
      Authorization: `Bearer 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`,
    },
  };

  // useEffect(() => {
  //   users.forEach((user) => {
  //     fetch(`https://api.github.com/users/${user}`)
  //       .then((response) => response.json())
  //       .then((response) => console.log(response));
  //   });
  // }, [users]);

  function handleSubmit(event) {
    event.preventDefault();

    setDetails({});
    setMessage("");
    setFieldErrors({});
    if (!value) {
      setFieldErrors({ username: "username field is required" });
      return;
    }
    props.addSession({ username: value });

    setIsLoading(true);
    fetch(`https://api.github.com/users/${value}`, options)
      .then((response) => response.json())
      .then((response) => {
        // debugger;
        console.log(response);
        if (response.message) {
          throw new Error(response.message);
        }
        setDetails(response);
        props.addSession({ username: response.login });
      })
      .catch((error) => {
        // alert(error);
        setMessage(error.toString());
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  const handleChange = useCallback((newValue) => {
    setValue(newValue);
    // setUsers(allUsers.filter((item) => item.includes(newValue)));
  }, []);

  return (
    <Page fullWidth>
      <Layout>
        <Layout.Section>
          {/* <form> */}

          {message.length > 0 && (
            <Card sectioned>
              <div>{message}</div>
            </Card>
          )}

          <Card title="Online store dashboard" sectioned>
            <form onSubmit={handleSubmit}>
              <TextField
                label="Enter username"
                value={value}
                onChange={handleChange}
                autoComplete="off"
              />
              {fieldErrors.username && (
                <InlineError
                  message={fieldErrors.username}
                  fieldID="myFieldID"
                />
              )}

              <br />
              <Button submit>Submit</Button>
            </form>
          </Card>
          {/* </form> */}

          {isLoading && (
            <div>
              <Frame>
                <Loading />
              </Frame>
            </div>
          )}

          {Object.keys(details).length > 0 && (
            <Card>
              <ResourceList
                resourceName={{ singular: "customer", plural: "customers" }}
                items={[
                  {
                    id: 145,
                    // url: "customers/145",
                    avatarSource: details.avatar_url,
                    name: "Yi So-Yeon",
                    location: "Gwangju, South Korea",
                    lastOrder: "Emerald Silk Gown",
                  },
                ]}
                renderItem={(item) => {
                  const { id, url, avatarSource, name, location, lastOrder } =
                    item;
                  return (
                    <ResourceItem
                      verticalAlignment="center"
                      id={id}
                      url={url}
                      media={
                        <Avatar
                          customer
                          size="large"
                          name={name}
                          source={avatarSource}
                        />
                      }
                      accessibilityLabel={`View details for ${name}`}
                      name={name}
                    >
                      <h3>
                        Name:
                        <TextStyle variation="strong">{details.name}</TextStyle>
                      </h3>
                      <h3>
                        Bio:
                        <TextStyle variation="strong">
                          {details.bio ?? "N/A"}
                        </TextStyle>
                      </h3>
                      <div>Followers: {details.followers}</div>
                      <div>Following: {details.following}</div>
                      <div>Following: {details.following}</div>
                      <div>Public Repos: {details.public_repos}</div>
                      <div>Location: {details.location}</div>
                      <div>Company: {details.company}</div>
                      <div>Blog: {details.blog}</div>
                      <div>
                        GitHub Link: <Link to="/details">View Details</Link>
                      </div>
                    </ResourceItem>
                  );
                }}
              />
            </Card>
          )}
        </Layout.Section>
      </Layout>
    </Page>
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

export default connect(mapStateToProps, mapDispatchToProps)(Home);

// export default Home;
//
