import { Card, Tabs } from "@shopify/polaris";
import { useState, useCallback } from "react";
import Loader from "../Loader";

export default function TabsExample(props) {
  const [selected, setSelected] = useState(0);

  const handleTabChange = useCallback(
    (selectedTabIndex) => setSelected(selectedTabIndex),
    []
  );

  const tabs = [
    {
      id: "all-customers-1",
      content: "Overview",
      accessibilityLabel: "All customers",
      panelID: "all-customers-content-1",
    },
    {
      id: "accepts-marketing-1",
      content: "Accepts marketing",
      panelID: "accepts-marketing-content-1",
    },
    {
      id: "repeat-customers-1",
      content: "Repeat customers",
      panelID: "repeat-customers-content-1",
    },
    {
      id: "prospects-1",
      content: "Prospects",
      panelID: "prospects-content-1",
    },
  ];

  return (
    <Card>
      <Tabs tabs={tabs} selected={selected} onSelect={handleTabChange}>
        <div className="repo-list">
          {props.isRepoLoading ? (
            <>
              <Loader />
            </>
          ) : (
            <>
              <Card.Section title={tabs[selected].content}>
                {/* <p>Tab {selected} selected</p> */}
                {props.repos.map((item) => {
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
      </Tabs>
    </Card>
  );
}
